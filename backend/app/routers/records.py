from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.audit import write_audit
from app.database import get_db
from app.dependencies import require_roles
from app.models import Record, User
from app.schemas import RecordCreate, RecordOutput, RecordUpdate

router = APIRouter(prefix="/records", tags=["records"])

ALLOWED_KINDS = {
    "leads", "clients", "projects", "proposals", "meetings",
    "services", "portfolio", "maintenance", "financial",
}
STAFF_ROLES = ("admin", "collaborator")


def check_kind(kind: str, user: User, write: bool = False) -> None:
    if kind not in ALLOWED_KINDS:
        raise HTTPException(status_code=404, detail="Módulo não encontrado.")
    if kind == "financial" and user.role not in {"ceo", "admin"}:
        raise HTTPException(status_code=403, detail="Sem permissão para consultar dados financeiros.")
    if write and user.role == "client":
        raise HTTPException(status_code=403, detail="Sem permissão para alterar registos.")


@router.get("", response_model=list[RecordOutput])
def list_records(
    kind: str = Query(..., min_length=2, max_length=32),
    search: str | None = Query(default=None, max_length=120),
    limit: int = Query(default=100, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
    user: User = Depends(require_roles(*STAFF_ROLES)),
) -> list[Record]:
    check_kind(kind, user)
    query = select(Record).where(Record.kind == kind).order_by(Record.updated_at.desc())
    if search:
        query = query.where(Record.name.ilike(f"%{search.strip()}%"))
    query = query.offset(offset).limit(limit)
    return list(db.scalars(query).all())


@router.post("", response_model=RecordOutput, status_code=status.HTTP_201_CREATED)
def create_record(
    kind: str = Query(..., min_length=2, max_length=32),
    payload: RecordCreate = ...,
    db: Session = Depends(get_db),
    user: User = Depends(require_roles(*STAFF_ROLES)),
) -> Record:
    check_kind(kind, user, write=True)
    record = Record(kind=kind, created_by_id=user.id, **payload.model_dump())
    db.add(record)
    db.flush()
    write_audit(db, user, "create", kind, record.id, {"name": record.name})
    db.commit()
    db.refresh(record)
    return record


@router.get("/{record_id}", response_model=RecordOutput)
def get_record(
    record_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(require_roles(*STAFF_ROLES)),
) -> Record:
    record = db.get(Record, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Registo não encontrado.")
    check_kind(record.kind, user)
    return record


@router.patch("/{record_id}", response_model=RecordOutput)
def update_record(
    record_id: int,
    payload: RecordUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(require_roles(*STAFF_ROLES)),
) -> Record:
    record = db.get(Record, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Registo não encontrado.")
    check_kind(record.kind, user, write=True)
    changes = payload.model_dump(exclude_unset=True)
    if any(value is None for key, value in changes.items() if key in {"name", "status", "extra_data"}):
        raise HTTPException(status_code=422, detail="Nome, estado e metadados não podem ficar vazios.")
    for key, value in changes.items():
        setattr(record, key, value)
    write_audit(db, user, "update", record.kind, record.id, {"fields": list(changes.keys())})
    db.commit()
    db.refresh(record)
    return record


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_record(
    record_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("admin")),
) -> Response:
    record = db.get(Record, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Registo não encontrado.")
    check_kind(record.kind, user, write=True)
    write_audit(db, user, "delete", record.kind, record.id, {"name": record.name})
    db.delete(record)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
