from app.services.recommendation_engine import generate_recommendations


def test_recommendation_engine_outputs():
    rec = generate_recommendations(
        base_yields={"LPG": 5, "Naphtha": 20, "Kerosene": 15, "Diesel": 25, "AGO": 10, "Residue": 25},
        fot_current=360,
        fot_base=350,
        reflux_current=1.2,
    )
    assert "fot_recommended" in rec
    assert "reflux_recommended" in rec
    assert rec["disclaimer"].startswith("Advisory output only")
