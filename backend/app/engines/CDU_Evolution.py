def evolve(feed_api: float, sulfur_pct: float, naphtha_cut: float, diesel_cut: float) -> dict:
    severity = max(0.8, min(1.2, 1 - sulfur_pct / 10))
    return {
        "naphtha_yield": round(feed_api * 0.6 * (naphtha_cut / 100) * severity, 3),
        "diesel_yield": round(feed_api * 0.9 * (diesel_cut / 100) * severity, 3),
    }
