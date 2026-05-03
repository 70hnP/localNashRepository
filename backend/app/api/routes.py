import json
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from app.db.session import get_db
from app.models.models import User, Scenario
from app.schemas.schemas import UserCreate, LoginRequest, ScenarioCreate
from app.services.auth import hash_password, verify_password, create_access_token
from app.core.config import settings
from app.engines.ASSAYNEX_v3_Enterprise import run_simulation

router = APIRouter(prefix="/api")

def current_user(authorization: str = Header(...), db: Session = Depends(get_db)):
    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.email == payload.get("sub")).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def require_roles(allowed):
    def checker(user=Depends(current_user)):
        if user.role not in allowed:
            raise HTTPException(status_code=403, detail="Forbidden")
        return user
    return checker

@router.post('/auth/register')
def register(body: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(status_code=400, detail='Email already registered')
    user = User(email=body.email, password_hash=hash_password(body.password), role=body.role)
    db.add(user); db.commit();
    return {"message": "registered"}

@router.post('/auth/login')
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail='Bad credentials')
    return {"access_token": create_access_token({"sub": user.email, "role": user.role}), "role": user.role}

@router.post('/scenarios/run')
def run_and_save(body: ScenarioCreate, db: Session = Depends(get_db), user=Depends(require_roles(["admin","engineer"]))):
    result = run_simulation(body.model_dump())
    row = Scenario(**body.model_dump(), created_by=user.id, result_json=json.dumps(result))
    db.add(row); db.commit(); db.refresh(row)
    return {"id": row.id, "result": result}

@router.get('/scenarios')
def list_scenarios(db: Session = Depends(get_db), user=Depends(current_user)):
    rows = db.query(Scenario).order_by(Scenario.created_at.desc()).all()
    return [{"id": r.id, "name": r.name, "result": json.loads(r.result_json)} for r in rows]

@router.get('/scenarios/compare')
def compare(a: int, b: int, db: Session = Depends(get_db), user=Depends(current_user)):
    one = db.query(Scenario).filter(Scenario.id == a).first(); two = db.query(Scenario).filter(Scenario.id == b).first()
    if not one or not two:
        raise HTTPException(404, 'Scenario not found')
    r1, r2 = json.loads(one.result_json), json.loads(two.result_json)
    return {"a": r1, "b": r2, "delta_total": round(r1['total_liquid_yield'] - r2['total_liquid_yield'], 3)}
