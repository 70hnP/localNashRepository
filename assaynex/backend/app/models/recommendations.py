from pydantic import BaseModel


class Recommendations(BaseModel):
    fot_recommended: float
    reflux_recommended: float
    diesel_yield_adjusted_pct: float
    residue_yield_adjusted_pct: float
    severity_factor: float
    confidence_score: float
    warnings: list[str]
    disclaimer: str = "Advisory output only. Operator validation required."
