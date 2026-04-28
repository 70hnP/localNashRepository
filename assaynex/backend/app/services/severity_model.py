from __future__ import annotations


def calculate_severity(fot_current: float, fot_base: float, alpha: float = 0.01) -> float:
    return alpha * (fot_current - fot_base)
