import pytest

from app.services.assay_parser import parse_assay_file


def test_csv_validation_increasing_temperature():
    bad_csv = b"temperature_c,cumulative_volume_pct\n100,10\n80,20\n"
    with pytest.raises(ValueError, match="temperaturas TBP"):
        parse_assay_file(bad_csv, "bad.csv")
