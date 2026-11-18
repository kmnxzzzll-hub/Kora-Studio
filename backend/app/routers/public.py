from collections import defaultdict
from time import monotonic

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.audit import write_audit
from app.database import get_db
from app.models import Record
from app.schemas import PublicInquiryInput

router = APIRouter(prefix="/public", tags=["public"])
WINDOW_SECONDS = 3600
MAX_REQUESTS_PER_WINDOW = 5
_requests: dict[str, list[float]] = defaultdict(list)


@router.post("/inquiries", status_code=status.HTTP_201_CREATED)
def create_public_inquiry(
    payload: PublicInquiryInput,
    request: Request,
    db: Session = Depends(get_db),
) -> dict[str, str | int]:
    # A honeypot catches unsophisticated bots without exposing a visible CAPTCHA.
    if payload.website:
        return {"message": "Pedido recebido.", "id": 0}

    client_ip = request.client.host if request.client else "unknown"
    now = monotonic()
    valid_times = [stamp for stamp in _requests[client_ip] if now - stamp < WINDOW_SECONDS]
    if len(valid_times) >= MAX_REQUESTS_PER_WINDOW:
        raise HTTPException(status_code=429, detail="Foram enviados demasiados pedidos. Tenta novamente mais tarde.")
    valid_times.append(now)
    _requests[client_ip] = valid_times

    if not payload.consent:
        raise HTTPException(status_code=422, detail="É necessário consentimento para enviar o pedido.")

    record = Record(
        kind="leads",
        name=payload.name.strip(),
        description=payload.message.strip(),
        status="Novo",
        email=payload.email.lower(),
        country=payload.country.strip(),
        extra_data={"source": "public_website"},
    )
    db.add(record)
    db.flush()
    write_audit(db, None, "public_inquiry", "leads", record.id, {"source": "website"})
    db.commit()
    return {"message": "Pedido recebido com sucesso.", "id": record.id}
