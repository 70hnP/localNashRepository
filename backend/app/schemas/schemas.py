from pydantic import BaseModel, Field, EmailStr
from typing import Literal

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    role: Literal["admin", "engineer", "viewer"]

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ScenarioCreate(BaseModel):
    name: str
    feed_api: float = Field(gt=0)
    sulfur_pct: float = Field(ge=0, le=10)
    naphtha_cut: float = Field(ge=0, le=100)
    diesel_cut: float = Field(ge=0, le=100)
