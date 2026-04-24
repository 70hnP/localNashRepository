from __future__ import annotations

import json
from pathlib import Path

import pandas as pd
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse, Response

from app.models.assay import AssayMetadata
from app.services.assay_parser import parse_assay_file
from app.services.crude_characterization import characterize_crude
from app.services.energy_model import calculate_energy_impact
from app.services.recommendation_engine import calculate_confidence_score, generate_recommendations
from app.services.report_generator import generate_pdf_report
from app.services.tbp_interpolation import build_tbp_interpolator, interpolate_tbp_curve
from app.services.yield_estimator import estimate_yields

router = APIRouter()
SAMPLE_DIR = Path(__file__).resolve().parent.parent / "sample_data"


@router.get("/health")
def health():
    return {"status": "OK"}


@router.get("/api/sample-data")
def sample_data():
    return {"samples": [f.name for f in SAMPLE_DIR.glob("*.csv")]}


def _analyze_from_df(df: pd.DataFrame, metadata: AssayMetadata):
    temp = df["temperature_c"].to_numpy()
    vol = df["cumulative_volume_pct"].to_numpy()
    interpolator = build_tbp_interpolator(temp, vol)
    t_smooth, v_smooth = interpolate_tbp_curve(temp, vol)
    yields = estimate_yields(interpolator)

    recommendations = generate_recommendations(
        yields,
        metadata.fot_current,
        metadata.fot_base,
        metadata.reflux_current,
    )
    recommendations["confidence_score"] = calculate_confidence_score(
        has_required_metadata=True,
        api=metadata.api,
        tbp_points=len(df),
        used_extrapolation=False,
        fot_shift=recommendations["fot_recommended"] - metadata.fot_current,
        reflux_shift=recommendations["reflux_recommended"] - metadata.reflux_current,
    )

    energy = calculate_energy_impact(
        metadata.mass_flow_kg_h,
        metadata.api,
        metadata.fot_current,
        recommendations["fot_recommended"],
    )

    return {
        "crude_name": metadata.crude_name,
        "crude_properties": characterize_crude(metadata.api, metadata.sulfur_wt_pct, metadata.viscosity_cst),
        "tbp_interpolation": [
            {"temperature_c": round(float(t), 2), "cumulative_volume_pct": round(float(v), 2)}
            for t, v in zip(t_smooth, v_smooth)
        ],
        "yields": yields,
        "energy_impact": energy,
        "recommendations": recommendations,
    }


@router.post("/api/assay/analyze")
async def analyze_assay(
    assay_file: UploadFile = File(...),
    metadata: str = Form(...),
):
    try:
        metadata_model = AssayMetadata.model_validate(json.loads(metadata))
        content = await assay_file.read()
        df = parse_assay_file(content, assay_file.filename)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return _analyze_from_df(df, metadata_model)


@router.post("/api/assay/compare")
async def compare_assays(
    current_file: UploadFile = File(...),
    new_file: UploadFile = File(...),
    current_metadata: str = Form(...),
    new_metadata: str = Form(...),
):
    try:
        current_meta = AssayMetadata.model_validate(json.loads(current_metadata))
        new_meta = AssayMetadata.model_validate(json.loads(new_metadata))
        current_df = parse_assay_file(await current_file.read(), current_file.filename)
        new_df = parse_assay_file(await new_file.read(), new_file.filename)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    current_analysis = _analyze_from_df(current_df, current_meta)
    new_analysis = _analyze_from_df(new_df, new_meta)

    delta_yields = {
        cut: round(new_analysis["yields"][cut] - current_analysis["yields"][cut], 2)
        for cut in current_analysis["yields"]
    }

    delta_recommendations = {
        "fot_delta": round(
            new_analysis["recommendations"]["fot_recommended"]
            - current_analysis["recommendations"]["fot_recommended"],
            2,
        ),
        "reflux_delta": round(
            new_analysis["recommendations"]["reflux_recommended"]
            - current_analysis["recommendations"]["reflux_recommended"],
            3,
        ),
    }

    advisory = "Switch feasible with operator validation."
    if delta_recommendations["fot_delta"] > 10:
        advisory = "Switch requires thermal capacity review before execution."

    return {
        "current": current_analysis,
        "new": new_analysis,
        "delta_yields": delta_yields,
        "delta_recommendations": delta_recommendations,
        "crude_switching_advisory": advisory,
        "disclaimer": "Advisory output only. Operator validation required.",
    }


@router.post("/api/report/pdf")
async def report_pdf(payload: dict):
    pdf_bytes = generate_pdf_report(payload)
    return Response(content=pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=assaynex_report.pdf"})


@router.get("/api/sample-data/{filename}")
def get_sample_file(filename: str):
    path = SAMPLE_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    return FileResponse(path)
