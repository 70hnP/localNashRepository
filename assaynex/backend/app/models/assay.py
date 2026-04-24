from pydantic import BaseModel, Field, field_validator


class AssayMetadata(BaseModel):
    crude_name: str = Field(min_length=1)
    api: float = Field(gt=0)
    sulfur_wt_pct: float = Field(ge=0)
    viscosity_cst: float = Field(ge=0)
    fot_current: float = Field(ge=0)
    fot_base: float = Field(default=350, ge=0)
    reflux_current: float = Field(ge=0)
    mass_flow_kg_h: float = Field(gt=0)

    @field_validator("api")
    @classmethod
    def validate_api_range(cls, value: float) -> float:
        if not 5 <= value <= 60:
            raise ValueError("API debe estar entre 5 y 60")
        return value


class AssayPoint(BaseModel):
    temperature_c: float
    cumulative_volume_pct: float
