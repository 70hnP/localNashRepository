from __future__ import annotations


def api_to_sg(api: float) -> float:
    return 141.5 / (api + 131.5)


def sg_to_density(sg: float) -> float:
    return sg * 1000


def estimate_cp(api: float) -> float:
    return 1.8 + 0.01 * api


def characterize_crude(api: float, sulfur_wt_pct: float, viscosity_cst: float) -> dict:
    sg = api_to_sg(api)
    density = sg_to_density(sg)
    cp = estimate_cp(api)
    return {
        "api": api,
        "specific_gravity": round(sg, 4),
        "density_kg_m3": round(density, 2),
        "sulfur_wt_pct": sulfur_wt_pct,
        "viscosity_cst": viscosity_cst,
        "cp_kj_kgk": round(cp, 3),
    }
