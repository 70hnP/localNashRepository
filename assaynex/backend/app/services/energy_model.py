from __future__ import annotations

from .crude_characterization import estimate_cp


def calculate_energy_impact(mass_flow_kg_h: float, api: float, fot_current: float, fot_new: float) -> dict:
    cp = estimate_cp(api)
    delta_t = fot_new - fot_current
    q_kj_h = mass_flow_kg_h * cp * delta_t
    return {
        "cp_kj_kgk": round(cp, 3),
        "delta_t_c": round(delta_t, 2),
        "q_kj_h": round(q_kj_h, 2),
    }
