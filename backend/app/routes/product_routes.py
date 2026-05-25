from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..schemas.product import ProductCreate, ProductRead, ProductUpdate
from ..services.product_service import (
    create_product,
    delete_product,
    get_product,
    list_products,
    update_product,
)

router = APIRouter(prefix="/products", tags=["Products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[ProductRead])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return list_products(db, skip=skip, limit=limit)


@router.get("/{product_id}", response_model=ProductRead)
def read_product(product_id: int, db: Session = Depends(get_db)):
    return get_product(db, product_id)


@router.post("/", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def create_new_product(payload: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, payload)


@router.put("/{product_id}", response_model=ProductRead)
def update_existing_product(
    product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)
):
    return update_product(db, product_id, payload)


@router.delete("/{product_id}", response_model=ProductRead)
def delete_existing_product(product_id: int, db: Session = Depends(get_db)):
    return delete_product(db, product_id)
