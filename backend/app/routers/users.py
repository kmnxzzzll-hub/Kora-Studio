from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.audit import write_audit
from app.database import get_db
from app.dependencies import require_ceo
from app.models import User
from app.schemas import UserCreate, UserOutput, UserUpdate
from app.security import hash_password

router = APIRouter(prefix="/users", tags=["team"])


@router.get("", response_model=list[UserOutput])
def list_users(db: Session = Depends(get_db), _: User = Depends(require_ceo)) -> list[User]:
    return list(db.scalars(select(User).order_by(User.created_at.desc())).all())


@router.post("", response_model=UserOutput, status_code=status.HTTP_201_CREATED)
def create_user(
    payload: UserCreate,
    db: Session = Depends(get_db),
    actor: User = Depends(require_ceo),
) -> User:
    email = payload.email.lower()
    if db.scalar(select(User).where(User.email == email)):
        raise HTTPException(status_code=409, detail="Já existe uma conta com esse email.")
    user = User(
        display_name=payload.display_name,
        email=email,
        password_hash=hash_password(payload.password),
        role=payload.role,
        is_active=True,
    )
    db.add(user)
    db.flush()
    write_audit(db, actor, "create", "user", user.id, {"email": user.email, "role": user.role})
    db.commit()
    db.refresh(user)
    return user


@router.patch("/{user_id}", response_model=UserOutput)
def update_user(
    user_id: int,
    payload: UserUpdate,
    db: Session = Depends(get_db),
    actor: User = Depends(require_ceo),
) -> User:
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado.")
    changes = payload.model_dump(exclude_unset=True)
    if any(value is None for value in changes.values()):
        raise HTTPException(status_code=422, detail="Os campos enviados não podem conter valores vazios.")
    if user.id == actor.id and changes.get("is_active") is False:
        raise HTTPException(status_code=400, detail="Não podes desactivar a tua própria conta.")
    if user.role == "ceo" and changes.get("is_active") is False:
        active_ceos = db.scalar(select(func.count(User.id)).where(User.role == "ceo", User.is_active.is_(True))) or 0
        if active_ceos <= 1:
            raise HTTPException(status_code=400, detail="Não podes desactivar o último CEO.")
    for key, value in changes.items():
        setattr(user, key, value)
    write_audit(db, actor, "update", "user", user.id, {"fields": list(changes.keys())})
    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def deactivate_user(
    user_id: int,
    db: Session = Depends(get_db),
    actor: User = Depends(require_ceo),
) -> Response:
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Utilizador não encontrado.")
    if user.id == actor.id:
        raise HTTPException(status_code=400, detail="Não podes desactivar a tua própria conta.")
    if user.role == "ceo" and user.is_active:
        active_ceos = db.scalar(select(func.count(User.id)).where(User.role == "ceo", User.is_active.is_(True))) or 0
        if active_ceos <= 1:
            raise HTTPException(status_code=400, detail="Não podes desactivar o último CEO.")
    user.is_active = False
    write_audit(db, actor, "deactivate", "user", user.id, {"email": user.email})
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
