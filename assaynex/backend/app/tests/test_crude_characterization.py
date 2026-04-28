from app.services.crude_characterization import api_to_sg


def test_api_to_sg_conversion():
    sg = api_to_sg(35)
    assert round(sg, 4) == 0.8498
