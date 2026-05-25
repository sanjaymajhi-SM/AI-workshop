from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, conint, confloat


class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    description: Optional[str] = None
    quantity: conint(ge=0) = 0
    price: confloat(ge=0) = 0.0
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=120)
    description: Optional[str] = None
    quantity: Optional[conint(ge=0)] = None
    price: Optional[confloat(ge=0)] = None
    is_active: Optional[bool] = None


class ProductRead(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
