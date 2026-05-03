# ASSAYNEX v1 (FastAPI + React + SQLite)

## 1) Arquitectura
- **Backend**: FastAPI modular (`app/api`, `app/services`, `app/engines`, `app/models`).
- **Motor técnico**: wrapper de `ASSAYNEX_v3_Enterprise.py` y `CDU_Evolution.py` como núcleo de simulación CDU.
- **Auth**: JWT email/password con roles `admin`, `engineer`, `viewer`.
- **DB**: SQLite (SQLAlchemy), preparada para migrar cambiando `DATABASE_URL`.
- **Frontend**: React + Vite, login, ejecución de escenarios, dashboard y gráfica comparativa.

## 2) Estructura de carpetas
```txt
backend/
  app/
    api/routes.py
    core/config.py
    db/session.py
    engines/ASSAYNEX_v3_Enterprise.py
    engines/CDU_Evolution.py
    models/models.py
    schemas/schemas.py
    services/auth.py
    main.py
  tests/test_api.py
  requirements.txt
  .env.example
frontend/
  src/main.jsx
  src/main.test.js
  package.json
  vite.config.js
docker-compose.yml
```

## 3) Instalación local (sin Docker)
### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 4) Ejecución con Docker
```bash
docker compose up --build
```

## 5) Seed inicial
Registrar usuario admin:
```bash
curl -X POST http://localhost:8000/api/auth/register -H 'content-type: application/json' -d '{"email":"admin@test.com","password":"secret12","role":"admin"}'
```

## 6) Pruebas
### Backend (unit/integration API flow)
```bash
cd backend
pytest
```

### Frontend (unit smoke)
```bash
cd frontend
npm test
```

## 7) Troubleshooting
- **401 Invalid token**: valida que envíes `Authorization: Bearer <token>`.
- **CORS / conexión**: verifica backend en `http://localhost:8000`.
- **DB lock SQLite**: cierra procesos duplicados de backend.

## 8) Checklist de puesta en marcha
- [ ] Dependencias instaladas (Python + Node).
- [ ] `.env` creado desde `.env.example`.
- [ ] Backend responde `GET /health`.
- [ ] Usuario admin registrado.
- [ ] Login exitoso y JWT recibido.
- [ ] Escenario CDU ejecutado y guardado.
- [ ] Dashboard muestra escenarios y gráfico.
- [ ] Tests backend/frontend en verde.
