from fastapi import APIRouter
from typing import Any
import json

from app.database.supabase import supabase
from app.database import SessionLocal
from app.models.settings import Settings as SettingsModel

router = APIRouter(prefix="/settings", tags=["Settings"])


@router.get("/")
def get_settings():
    try:
        response = supabase.table("settings").select("*").limit(1).execute()
        data = response.data or []
        return data[0] if data else {"theme": "dark", "notifications_enabled": True}
    except Exception:
        db = SessionLocal()
        try:
            s = db.query(SettingsModel).first()
            if not s:
                return {"theme": "dark", "notifications_enabled": True}
            return {"theme": s.theme, "notifications_enabled": s.notifications_enabled}
        finally:
            db.close()


@router.put("/")
def update_settings(settings: dict):
    # Try supabase first
    try:
        existing = supabase.table("settings").select("*").limit(1).execute()
        if existing.data:
            resp = supabase.table("settings").update(settings).eq("id", existing.data[0].get("id")).execute()
        else:
            resp = supabase.table("settings").insert(settings).execute()
        return {"message": "Settings updated", "data": resp.data}
    except Exception:
        db = SessionLocal()
        try:
            s = db.query(SettingsModel).first()
            if s:
                s.theme = settings.get("theme", s.theme)
                s.notifications_enabled = settings.get("notifications_enabled", s.notifications_enabled)
            else:
                s = SettingsModel(
                    theme=settings.get("theme", "dark"),
                    notifications_enabled=settings.get("notifications_enabled", True),
                )
                db.add(s)
            db.commit()
            return {"message": "Settings updated", "data": {"id": s.id}}
        finally:
            db.close()
