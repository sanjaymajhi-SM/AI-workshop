from sqlalchemy import Column, Integer, String, Boolean

from ..database import Base


class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    theme = Column(String(20), nullable=False, default="dark")
    notifications_enabled = Column(Boolean, nullable=False, default=True)
