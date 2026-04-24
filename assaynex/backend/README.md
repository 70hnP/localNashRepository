# ASSAYNEX Backend

## Setup
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run API
```bash
uvicorn app.main:app --reload --port 8000
```

## Tests
```bash
PYTHONPATH=. pytest app/tests -q
```

## Sample data
Available under `app/sample_data/` and from `GET /api/sample-data`.
