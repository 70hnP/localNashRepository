from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "ASSAYNEX v1 API"
    secret_key: str = "change_me"
    access_token_expire_minutes: int = 60
    database_url: str = "sqlite:///./assaynex.db"

    class Config:
        env_file = ".env"


settings = Settings()
