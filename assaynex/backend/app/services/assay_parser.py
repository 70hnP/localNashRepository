from __future__ import annotations

from io import BytesIO

import pandas as pd

REQUIRED_COLUMNS = ["temperature_c", "cumulative_volume_pct"]


def parse_assay_file(content: bytes, filename: str) -> pd.DataFrame:
    if filename.lower().endswith(".csv"):
        df = pd.read_csv(BytesIO(content))
    elif filename.lower().endswith((".xlsx", ".xls")):
        df = pd.read_excel(BytesIO(content))
    else:
        raise ValueError("Formato no soportado. Use CSV o Excel.")

    missing = [c for c in REQUIRED_COLUMNS if c not in df.columns]
    if missing:
        raise ValueError(f"Faltan columnas requeridas: {missing}")

    df = df[REQUIRED_COLUMNS].copy()
    if df.isna().any().any():
        raise ValueError("El archivo contiene valores nulos")
    if (df < 0).any().any():
        raise ValueError("No se aceptan valores negativos")
    if not df["temperature_c"].is_monotonic_increasing:
        raise ValueError("Las temperaturas TBP deben ser crecientes")
    if df["cumulative_volume_pct"].iloc[0] < 0 or df["cumulative_volume_pct"].iloc[-1] > 100:
        raise ValueError("Cumulative volume debe ir de 0 a 100")
    if not df["cumulative_volume_pct"].is_monotonic_increasing:
        raise ValueError("Cumulative volume debe ser creciente")
    return df
