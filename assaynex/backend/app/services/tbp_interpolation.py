from __future__ import annotations

import numpy as np
from scipy.interpolate import interp1d


def build_tbp_interpolator(temperature_c: np.ndarray, cumulative_volume_pct: np.ndarray):
    return interp1d(
        temperature_c,
        cumulative_volume_pct,
        kind="linear",
        bounds_error=False,
        fill_value="extrapolate",
    )


def interpolate_tbp_curve(temperature_c: np.ndarray, cumulative_volume_pct: np.ndarray, num_points: int = 100):
    interpolator = build_tbp_interpolator(temperature_c, cumulative_volume_pct)
    t_new = np.linspace(float(np.min(temperature_c)), float(np.max(temperature_c)), num_points)
    v_new = interpolator(t_new)
    return t_new, np.clip(v_new, 0, 100)
