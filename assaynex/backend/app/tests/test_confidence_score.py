from app.services.recommendation_engine import calculate_confidence_score


def test_confidence_score_bounds():
    score = calculate_confidence_score(True, 35, 7, False, 2, 0.1)
    assert 0 <= score <= 100
    assert score == 100
