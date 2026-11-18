from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.audit import write_audit
from app.database import get_db
from app.dependencies import get_current_user
from app.models import User
from app.schemas import LoginInput, TokenOutput, UserOutput
from app.security import create_access_token, verify_password

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/login", response_model=TokenOutput)
def login(payload: LoginInput, db: Session = Depends(get_db)) -> TokenOutput:
    user = db.scalar(select(User).where(User.email == payload.email.lower()))
    if user is None or not user.is_active or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email ou palavra-passe incorrectos.")
    token, expires_in = create_access_token(user.id)
    write_audit(db, user, "login", "session", user.id)
    db.commit()
    return TokenOutput(access_token=token, expires_in=expires_in)


@router.get("/me", response_model=UserOutput)
def me(user: User = Depends(get_current_user)) -> User:
    return user
