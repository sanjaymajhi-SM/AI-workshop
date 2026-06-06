from fastapi import APIRouter, Query
from datetime import datetime
from typing import Optional
import json

from app.database.supabase import supabase
from app.database import SessionLocal
from app.models.order import Order as OrderModel

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/sales")
def sales_report(start_date: Optional[str] = Query(None), end_date: Optional[str] = Query(None)):
    # Try Supabase first
    try:
        query = supabase.table("orders").select("total,items,created_at")
        if start_date:
            query = query.gte("created_at", start_date)
        if end_date:
            query = query.lte("created_at", end_date)
        response = query.execute()
        data = response.data or []
    except Exception:
        db = SessionLocal()
        try:
            rows = db.query(OrderModel).all()
            data = []
            for r in rows:
                data.append({
                    "total": r.total,
                    "items": json.loads(r.items) if r.items else [],
                    "created_at": r.created_at.isoformat() if r.created_at else None,
                })
        finally:
            db.close()

    total_sales = 0.0
    total_items = 0
    for row in data:
        try:
            total_sales += float(row.get("total") or 0)
            items = row.get("items") or []
            total_items += len(items)
        except Exception:
            continue

    return {
        "start_date": start_date,
        "end_date": end_date,
        "total_sales": total_sales,
        "total_orders": len(data),
        "total_items": total_items,
    }
