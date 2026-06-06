from fastapi import APIRouter, Query
from datetime import datetime
from typing import Optional

from app.database.supabase import supabase

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/sales")
def sales_report(start_date: Optional[str] = Query(None), end_date: Optional[str] = Query(None)):
    # Basic sales aggregation over orders table
    query = supabase.table("orders").select("total,items,created_at")
    if start_date:
        query = query.gte("created_at", start_date)
    if end_date:
        query = query.lte("created_at", end_date)
    response = query.execute()
    data = response.data or []

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
