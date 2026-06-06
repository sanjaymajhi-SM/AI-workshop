from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from typing import Optional
import json

from app.schemas.order_schema import Order
from app.database.supabase import supabase
from app.database import SessionLocal
from app.models.order import Order as OrderModel

router = APIRouter(prefix="/orders", tags=["Orders"])


def _serialize_order_row(row: dict):
    if not row:
        return None
    return {**row}


# GET ALL ORDERS
@router.get("/")
def get_orders(status: Optional[str] = Query(None)):
    # Try Supabase first
    try:
        query = supabase.table("orders").select("*")
        if status:
            query = query.eq("status", status)
        response = query.execute()
        return response.data
    except Exception:
        # Fallback to local DB
        db = SessionLocal()
        try:
            q = db.query(OrderModel)
            if status:
                q = q.filter(OrderModel.status == status)
            rows = q.all()
            result = []
            for r in rows:
                result.append({
                    "id": r.id,
                    "customer": r.customer,
                    "items": json.loads(r.items) if r.items else [],
                    "total": r.total,
                    "status": r.status,
                    "created_at": r.created_at.isoformat() if r.created_at else None,
                })
            return result
        finally:
            db.close()


# GET SINGLE ORDER
@router.get("/{order_id}")
def get_order(order_id: int):
    try:
        response = supabase.table("orders").select("*").eq("id", order_id).execute()
        return response.data
    except Exception:
        db = SessionLocal()
        try:
            r = db.query(OrderModel).filter(OrderModel.id == order_id).first()
            if not r:
                raise HTTPException(status_code=404, detail="Order not found")
            return {
                "id": r.id,
                "customer": r.customer,
                "items": json.loads(r.items) if r.items else [],
                "total": r.total,
                "status": r.status,
                "created_at": r.created_at.isoformat() if r.created_at else None,
            }
        finally:
            db.close()


# CREATE ORDER
@router.post("/")
def create_order(order: Order):
    data = {
        "customer": order.customer,
        "items": order.items,
        "total": order.total,
        "status": order.status,
    }
    try:
        response = supabase.table("orders").insert(data).execute()
        return {"message": "Order created", "data": response.data}
    except Exception:
        db = SessionLocal()
        try:
            item = OrderModel(
                customer=order.customer,
                items=json.dumps(order.items),
                total=order.total,
                status=order.status,
            )
            db.add(item)
            db.commit()
            db.refresh(item)
            return {"message": "Order created", "data": {"id": item.id}}
        finally:
            db.close()


# UPDATE ORDER
@router.put("/{order_id}")
def update_order(order_id: int, order: Order):
    data = {
        "customer": order.customer,
        "items": order.items,
        "total": order.total,
        "status": order.status,
    }
    try:
        response = supabase.table("orders").update(data).eq("id", order_id).execute()
        return {"message": "Order updated", "data": response.data}
    except Exception:
        db = SessionLocal()
        try:
            r = db.query(OrderModel).filter(OrderModel.id == order_id).first()
            if not r:
                raise HTTPException(status_code=404, detail="Order not found")
            r.customer = order.customer
            r.items = json.dumps(order.items)
            r.total = order.total
            r.status = order.status
            db.commit()
            return {"message": "Order updated", "data": {"id": r.id}}
        finally:
            db.close()


# DELETE ORDER
@router.delete("/{order_id}")
def delete_order(order_id: int):
    try:
        response = supabase.table("orders").delete().eq("id", order_id).execute()
        return {"message": "Order deleted", "data": response.data}
    except Exception:
        db = SessionLocal()
        try:
            r = db.query(OrderModel).filter(OrderModel.id == order_id).first()
            if not r:
                raise HTTPException(status_code=404, detail="Order not found")
            db.delete(r)
            db.commit()
            return {"message": "Order deleted", "data": {"id": order_id}}
        finally:
            db.close()


# CSV export (basic)
@router.get("/export/csv")
def export_orders_csv(start_date: Optional[str] = None, end_date: Optional[str] = None):
    try:
        query = supabase.table("orders").select("*")
        if start_date:
            query = query.gte("created_at", start_date)
        if end_date:
            query = query.lte("created_at", end_date)
        response = query.execute()
        data = response.data or []
    except Exception:
        db = SessionLocal()
        try:
            q = db.query(OrderModel)
            rows = q.all()
            data = []
            for r in rows:
                data.append({
                    "id": r.id,
                    "customer": r.customer,
                    "items": json.loads(r.items) if r.items else [],
                    "total": r.total,
                    "status": r.status,
                    "created_at": r.created_at.isoformat() if r.created_at else None,
                })
        finally:
            db.close()

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
