from typing import List, Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..models.product import Product
from ..schemas.product import ProductCreate, ProductUpdate


def list_products(db: Session, skip: int = 0, limit: int = 100) -> List[Product]:
    return db.query(Product).offset(skip).limit(limit).all()


def get_product(db: Session, product_id: int) -> Optional[Product]:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id={product_id} not found.",
        )
    return product


def create_product(db: Session, payload: ProductCreate) -> Product:
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def update_product(db: Session, product_id: int, payload: ProductUpdate) -> Product:
    product = get_product(db, product_id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(product, field, value)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def delete_product(db: Session, product_id: int) -> Product:
    product = get_product(db, product_id)
    db.delete(product)
    db.commit()
    return product
