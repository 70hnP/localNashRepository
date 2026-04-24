import numpy as np

from app.services.tbp_interpolation import build_tbp_interpolator


def test_tbp_interpolation_linear_value():
    temp = np.array([40, 180, 240])
    vol = np.array([5, 35, 48])
    interpolator = build_tbp_interpolator(temp, vol)
    assert round(float(interpolator(100)), 2) == 17.86
