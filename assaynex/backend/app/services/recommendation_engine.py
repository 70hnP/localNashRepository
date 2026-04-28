from __future__ import annotations

from .severity_model import calculate_severity
from .yield_estimator import apply_severity_correction


def calculate_confidence_score(
    has_required_metadata: bool,
    api: float,
    tbp_points: int,
    used_extrapolation: bool,
    fot_shift: float,
    reflux_shift: float,
) -> float:
    score = 100.0
    if not has_required_metadata:
        score -= 20
    if not 5 <= api <= 60:
        score -= 30
    if tbp_points < 6:
        score -= 15
    if used_extrapolation:
        score -= 10
    if abs(fot_shift) > 15:
        score -= 10
    if abs(reflux_shift) > 0.5:
        score -= 10
    return max(0.0, round(score, 2))


def generate_recommendations(
    base_yields: dict,
    fot_current: float,
    fot_base: float,
    reflux_current: float,
    alpha: float = 0.01,
    kd: float = 0.5,
    kr: float = 0.4,
    beta: float = 2.0,
    gamma: float = 0.1,
) -> dict:
    severity = calculate_severity(fot_current, fot_base, alpha=alpha)
    corrected_yields = apply_severity_correction(base_yields, severity, kd=kd, kr=kr)

    yield_error = corrected_yields["Diesel"] - base_yields["Diesel"]
    cut_shift = corrected_yields["Residue"] - base_yields["Residue"]

    fot_new = fot_current + beta * yield_error
    reflux_new = reflux_current + gamma * cut_shift

    warnings = []
    if abs(fot_new - fot_current) > 10:
        warnings.append("Cambio de FOT significativo, validar capacidad térmica.")
    if corrected_yields["Residue"] < 10:
        warnings.append("Residuo estimado bajo, revisar estabilidad de fondo de columna.")

    return {
        "fot_recommended": round(fot_new, 2),
        "reflux_recommended": round(reflux_new, 3),
        "diesel_yield_adjusted_pct": corrected_yields["Diesel"],
        "residue_yield_adjusted_pct": corrected_yields["Residue"],
        "severity_factor": round(severity, 4),
        "confidence_score": None,
        "warnings": warnings,
        "disclaimer": "Advisory output only. Operator validation required.",
        "corrected_yields": corrected_yields,
    }
