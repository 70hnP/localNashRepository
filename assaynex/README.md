# ASSAYNEX MVP

ASSAYNEX es una capa **advisory event-based** para CDU (no APC de lazo cerrado). Convierte assay TBP en recomendaciones operacionales durante crude switching.

## Funcionalidades MVP
- Carga de assay CSV/Excel.
- Caracterización básica del crudo (API, SG, densidad, Cp).
- Interpolación de curva TBP.
- Estimación de yields atmosféricos por corte.
- Comparación de crudo actual vs nuevo.
- Recomendaciones FOT/reflux con warnings y confidence score.
- Exportación de reporte PDF.
- Dashboard web con charts.
- Pruebas unitarias backend.

## Requisitos
- Python 3.11+
- Node.js 20+

## Instalación
### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## Ejecución local
### 1) Levantar backend
```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

### 2) Levantar frontend
```bash
cd frontend
npm run dev
```

Abrir: `http://localhost:5173`

## Tests backend
```bash
cd backend
source .venv/bin/activate
PYTHONPATH=. pytest app/tests -q
```

## Uso sample data
Archivos disponibles:
- `backend/app/sample_data/crude_light.csv`
- `backend/app/sample_data/crude_heavy.csv`

También vía API:
- `GET /api/sample-data`

## Endpoints
- `GET /health`
- `POST /api/assay/analyze`
- `POST /api/assay/compare`
- `GET /api/sample-data`
- `POST /api/report/pdf`

## Disclaimer
**Advisory output only. Operator validation required.**
