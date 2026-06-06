from fastapi import APIRouter
from typing import Any

from app.database.supabase import supabase

router = APIRouter(prefix="/settings", tags=["Settings"])


@router.get("/")
def get_settings():
    response = supabase.table("settings").select("*").limit(1).execute()
    data = response.data or []
    return data[0] if data else {"theme": "dark", "notifications_enabled": True}


@router.put("/")
def update_settings(settings: dict):
    # For simplicity, upsert into settings table keyed by id=1
    existing = supabase.table("settings").select("*").limit(1).execute()
    if existing.data:
        resp = supabase.table("settings").update(settings).eq("id", existing.data[0].get("id")).execute()
    else:
        resp = supabase.table("settings").insert(settings).execute()
    return {"message": "Settings updated", "data": resp.data}
