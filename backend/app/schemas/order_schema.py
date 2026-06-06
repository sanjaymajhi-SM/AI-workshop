from pydantic import BaseModel
from typing import Any, List, Optional


class Order(BaseModel):
    customer: str
    items: List[Any]
    total: float
    status: str = "pending"
    created_at: Optional[str] = None
