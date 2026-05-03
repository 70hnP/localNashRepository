from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.db.session import Base, engine

app = FastAPI(title="ASSAYNEX v1 API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
Base.metadata.create_all(bind=engine)
app.include_router(router)

@app.get('/health')
def health():
    return {"status": "ok"}
