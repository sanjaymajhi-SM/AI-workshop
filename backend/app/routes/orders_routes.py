from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from typing import Optional

from app.schemas.order_schema import Order
from app.database.supabase import supabase

router = APIRouter(prefix="/orders", tags=["Orders"])


# GET ALL ORDERS
@router.get("/")
def get_orders(status: Optional[str] = Query(None)):
    query = supabase.table("orders").select("*")
    if status:
        query = query.eq("status", status)
    response = query.execute()
    return response.data


# GET SINGLE ORDER
@router.get("/{order_id}")
def get_order(order_id: int):
    response = supabase.table("orders").select("*").eq("id", order_id).execute()
    return response.data


# CREATE ORDER
@router.post("/")
def create_order(order: Order):
    data = {
        "customer": order.customer,
        "items": order.items,
        "total": order.total,
        "status": order.status,
    }
    response = supabase.table("orders").insert(data).execute()
    return {"message": "Order created", "data": response.data}


# UPDATE ORDER
@router.put("/{order_id}")
def update_order(order_id: int, order: Order):
    data = {
        "customer": order.customer,
        "items": order.items,
        "total": order.total,
        "status": order.status,
    }
    response = supabase.table("orders").update(data).eq("id", order_id).execute()
    return {"message": "Order updated", "data": response.data}


# DELETE ORDER
@router.delete("/{order_id}")
def delete_order(order_id: int):
    response = supabase.table("orders").delete().eq("id", order_id).execute()
    return {"message": "Order deleted", "data": response.data}


# CSV export (basic)
@router.get("/export/csv")
def export_orders_csv(start_date: Optional[str] = None, end_date: Optional[str] = None):
    query = supabase.table("orders").select("*")
    if start_date:
        query = query.gte("created_at", start_date)
    if end_date:
        query = query.lte("created_at", end_date)
    response = query.execute()
    data = response.data or []
    # Build CSV string
    if not data:
        return {"csv": ""}

    headers = list(data[0].keys())
    rows = [",".join(headers)]
    for item in data:
        row = []
        for h in headers:
            v = item.get(h, "")
            row.append(str(v).replace(",", "\\,"))
        rows.append(",".join(row))

    csv_text = "\n".join(rows)
    return {"csv": csv_text}
