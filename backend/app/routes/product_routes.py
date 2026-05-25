from fastapi import APIRouter
from app.schemas.product_schema import Product
from app.database.supabase import supabase

router = APIRouter(prefix="/products", tags=["Products"])


# GET ALL PRODUCTS
@router.get("/")
def get_products():
    response = supabase.table("products").select("*").execute()
    return response.data


# GET SINGLE PRODUCT (optional but useful)
@router.get("/{product_id}")
def get_product(product_id: int):
    response = (
        supabase.table("products")
        .select("*")
        .eq("id", product_id)
        .execute()
    )
    return response.data


# CREATE PRODUCT
@router.post("/")
def create_product(product: Product):

    data = {
        "name": product.name,
        "quantity": product.quantity,
        "price": product.price
    }

    response = supabase.table("products").insert(data).execute()

    return {
        "message": "Product added successfully",
        "data": response.data
    }


# UPDATE PRODUCT
@router.put("/{product_id}")
def update_product(product_id: int, product: Product):

    data = {
        "name": product.name,
        "quantity": product.quantity,
        "price": product.price
    }

    response = (
        supabase.table("products")
        .update(data)
        .eq("id", product_id)
        .execute()
    )

    return {
        "message": "Product updated successfully",
        "data": response.data
    }


# DELETE PRODUCT
@router.delete("/{product_id}")
def delete_product(product_id: int):

    response = (
        supabase.table("products")
        .delete()
        .eq("id", product_id)
        .execute()
    )

    return {
        "message": "Product deleted successfully",
        "data": response.data
    }