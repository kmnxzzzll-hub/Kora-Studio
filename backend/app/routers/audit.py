from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import AuditLog, User

router = APIRouter(prefix="/audit", tags=["audit"])


@router.get("")
def list_audit(
    limit: int = Query(default=50, ge=1, le=200),
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin")),
) -> list[dict]:
    entries = db.scalars(
        select(AuditLog).order_by(AuditLog.created_at.desc()).limit(limit)
    ).all()
    return [
        {
            "id": entry.id,
            "user_id": entry.user_id,
            "user_name": entry.user.display_name if entry.user else "Website público",
            "action": entry.action,
            "entity": entry.entity,
            "entity_id": entry.entity_id,
            "details": entry.details,
            "created_at": entry.created_at.isoformat(),
        }
        for entry in entries
    ]
