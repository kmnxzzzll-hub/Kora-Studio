from datetime import date, datetime
from decimal import Decimal
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


Role = Literal["admin", "collaborator", "client"]


class LoginInput(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=256)


class TokenOutput(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class UserOutput(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    display_name: str
    email: str
    role: str
    is_active: bool
    created_at: datetime


class UserCreate(BaseModel):
    display_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=14, max_length=128)
    role: Role = "collaborator"


class UserUpdate(BaseModel):
    display_name: str | None = Field(default=None, min_length=2, max_length=120)
    role: Role | None = None
    is_active: bool | None = None


class RecordCreate(BaseModel):
    name: str = Field(min_length=2, max_length=180)
    description: str | None = Field(default=None, max_length=5000)
    status: str = Field(default="Novo", min_length=1, max_length=48)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=48)
    country: str | None = Field(default=None, max_length=80)
    currency: str | None = Field(default=None, max_length=8)
    amount: Decimal | None = Field(default=None, ge=0, le=999999999999)
    start_date: date | None = None
    due_date: date | None = None
    extra_data: dict[str, Any] = Field(default_factory=dict)


class RecordUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=180)
    description: str | None = Field(default=None, max_length=5000)
    status: str | None = Field(default=None, min_length=1, max_length=48)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=48)
    country: str | None = Field(default=None, max_length=80)
    currency: str | None = Field(default=None, max_length=8)
    amount: Decimal | None = Field(default=None, ge=0, le=999999999999)
    start_date: date | None = None
    due_date: date | None = None
    extra_data: dict[str, Any] | None = None


class RecordOutput(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    kind: str
    name: str
    description: str | None
    status: str
    email: str | None
    phone: str | None
    country: str | None
    currency: str | None
    amount: Decimal | None
    start_date: date | None
    due_date: date | None
    extra_data: dict[str, Any]
    created_by_id: int | None
    created_at: datetime
    updated_at: datetime


class PublicInquiryInput(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    country: str = Field(min_length=2, max_length=80)
    message: str = Field(min_length=10, max_length=5000)
    consent: bool
    website: str | None = Field(default="", max_length=200)
