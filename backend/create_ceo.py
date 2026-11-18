"""Create the first CEO account from environment variables.

Example:
  KORA_CEO_EMAIL=owner@example.com KORA_CEO_PASSWORD='a-long-unique-password' \
    python backend/create_ceo.py
"""
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from sqlalchemy import select

from app.database import Base, SessionLocal, engine
from app.models import User
from app.security import hash_password


def main() -> None:
    email = os.environ.get("KORA_CEO_EMAIL", "").strip().lower()
    password = os.environ.get("KORA_CEO_PASSWORD", "")
    display_name = os.environ.get("KORA_CEO_NAME", "CEO KORA AI").strip()

    if not email or "@" not in email:
        raise SystemExit("Define KORA_CEO_EMAIL com um endereço válido.")
    if len(password) < 14:
        raise SystemExit("KORA_CEO_PASSWORD deve ter pelo menos 14 caracteres.")

    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        if db.scalar(select(User).where(User.role == "ceo")):
            raise SystemExit("Já existe uma conta CEO. Não foi criada outra.")
        if db.scalar(select(User).where(User.email == email)):
            raise SystemExit("Já existe uma conta com esse email.")
        user = User(
            display_name=display_name or "CEO KORA AI",
            email=email,
            password_hash=hash_password(password),
            role="ceo",
            is_active=True,
        )
        db.add(user)
        db.commit()
        print("Conta CEO criada. Guarda a palavra-passe num gestor de palavras-passe.")


if __name__ == "__main__":
    main()
