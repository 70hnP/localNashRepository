from __future__ import annotations

from dataclasses import dataclass


CUTS = {
    "LPG": (0, 40),
    "Naphtha": (40, 180),
    "Kerosene": (180, 240),
    "Diesel": (240, 360),
    "AGO": (360, 400),
    "Residue": (400, 700),
}


@dataclass
class YieldConfig:
    alpha: float = 0.01
    kd: float = 0.5
    kr: float = 0.4


def estimate_yields(interpolator) -> dict:
    yields = {}
    for cut, (t_min, t_max) in CUTS.items():
        v_min = float(interpolator(t_min))
        v_max = float(interpolator(t_max))
        yields[cut] = max(0.0, (v_max - v_min))
    total = sum(yields.values()) or 1
    return {k: round((v / total) * 100, 2) for k, v in yields.items()}


def apply_severity_correction(base_yields: dict, severity: float, kd: float = 0.5, kr: float = 0.4) -> dict:
    corrected = base_yields.copy()
    corrected["Diesel"] = round(max(0.0, corrected["Diesel"] + kd * severity), 2)
    corrected["Residue"] = round(max(0.0, corrected["Residue"] - kr * severity), 2)
    return corrected
