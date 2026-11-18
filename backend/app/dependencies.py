from collections.abc import Callable

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.security import read_access_token

bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Autenticação necessária.")
    try:
        user_id = read_access_token(credentials.credentials)
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Sessão inválida ou expirada.")
    user = db.get(User, user_id)
    if user is None or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Conta indisponível.")
    return user


def require_roles(*roles: str) -> Callable:
    def role_checker(user: User = Depends(get_current_user)) -> User:
        if user.role != "ceo" and user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Não tens permissão para esta operação.")
        return user
    return role_checker


def require_ceo(user: User = Depends(get_current_user)) -> User:
    if user.role != "ceo":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Apenas o CEO pode gerir utilizadores.")
    return user
