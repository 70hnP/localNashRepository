from app.engines.CDU_Evolution import evolve

def run_simulation(payload: dict) -> dict:
    base = evolve(payload["feed_api"], payload["sulfur_pct"], payload["naphtha_cut"], payload["diesel_cut"])
    base["total_liquid_yield"] = round(base["naphtha_yield"] + base["diesel_yield"], 3)
    return base
