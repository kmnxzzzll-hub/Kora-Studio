from fastapi import APIRouter

router = APIRouter(tags=["system"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Basic availability check; it does not verify external integrations."""
    return {
        "status": "ok",
        "service": "kora-ai-api",
        "stage": "foundation",
    }
