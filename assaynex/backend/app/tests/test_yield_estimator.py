import numpy as np

from app.services.tbp_interpolation import build_tbp_interpolator
from app.services.yield_estimator import estimate_yields


def test_yields_sum_to_100():
    temp = np.array([40, 100, 180, 240, 360, 400, 520])
    vol = np.array([5, 18, 35, 48, 72, 80, 100])
    interpolator = build_tbp_interpolator(temp, vol)
    yields = estimate_yields(interpolator)
    assert round(sum(yields.values()), 1) == 100.0
    assert yields["Diesel"] > 0
