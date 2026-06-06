from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func

from ..database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer = Column(String(120), nullable=False)
    items = Column(Text, nullable=True)
    total = Column(Float, nullable=False, default=0.0)
    status = Column(String(40), nullable=False, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
