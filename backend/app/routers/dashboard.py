from collections import defaultdict

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import Record, User
from app.routers.records import ALLOWED_KINDS

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("admin", "collaborator")),
) -> dict:
    visible_kinds = sorted(ALLOWED_KINDS)
    if user.role not in {"ceo", "admin"}:
        visible_kinds = [kind for kind in visible_kinds if kind != "financial"]
    counts = {
        kind: int(db.scalar(select(func.count(Record.id)).where(Record.kind == kind)) or 0)
        for kind in visible_kinds
    }
    by_status: dict[str, int] = defaultdict(int)
    rows = db.execute(
        select(Record.status, func.count(Record.id))
        .where(Record.kind == "leads")
        .group_by(Record.status)
    ).all()
    for state, count in rows:
        by_status[state] = int(count)

    recent_query = select(Record).order_by(Record.updated_at.desc()).limit(8)
    if user.role == "collaborator":
        recent_query = recent_query.where(Record.kind != "financial")
    recent = [
        {
            "id": item.id,
            "kind": item.kind,
            "name": item.name,
            "status": item.status,
            "updated_at": item.updated_at.isoformat(),
        }
        for item in db.scalars(recent_query).all()
    ]
    return {
        "counts": counts,
        "leads_by_status": dict(by_status),
        "recent": recent,
        "analytics_connected": False,
        "note": "As visitas e conversões do website só estarão disponíveis após ligar uma ferramenta de analytics e instalar os eventos de medição.",
    }
