from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.cfg_config import settings


def _postgres_url(url: str) -> str:
    """Normaliza URLs PostgreSQL para Supabase/Railway sin exponer secretos."""
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    if url.startswith("postgresql://") and "sslmode=" not in url:
        separator = "&" if "?" in url else "?"
        return f"{url}{separator}sslmode=require"
    return url


engine = create_engine(
    _postgres_url(settings.DATABASE_URL),
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Conexion secundaria al nucleo bancario (bd_core_financiero) ---
# Usada solo por el servicio de promocion (sync_outbox -> core).
core_engine = create_engine(
    _postgres_url(settings.CORE_DATABASE_URL),
    pool_pre_ping=True,
    pool_size=2,
    max_overflow=4,
)

SessionLocalCore = sessionmaker(autocommit=False, autoflush=False, bind=core_engine)
