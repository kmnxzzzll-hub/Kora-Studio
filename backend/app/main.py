from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import Base, engine
from app import models  # noqa: F401 - registers SQLAlchemy models
from app.routers.audit import router as audit_router
from app.routers.auth import router as auth_router
from app.routers.dashboard import router as dashboard_router
from app.routers.health import router as health_router
from app.routers.public import router as public_router
from app.routers.records import router as records_router
from app.routers.users import router as users_router

settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI):
    if settings.app_env.lower() == "production" and (settings.jwt_secret == "development-only-change-this-secret" or len(settings.jwt_secret) < 48):
        raise RuntimeError("Define JWT_SECRET aleatório com pelo menos 48 caracteres antes de iniciar em produção.")
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title=settings.app_name,
    version="0.2.0",
    description="API operacional da KORA AI: autenticação, equipa, registos e indicadores.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(health_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(audit_router, prefix="/api")
app.include_router(records_router, prefix="/api")
app.include_router(public_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(users_router, prefix="/api")


@app.get("/")
async def root() -> dict[str, str]:
    return {"name": settings.app_name, "environment": settings.app_env, "docs": "/docs"}
