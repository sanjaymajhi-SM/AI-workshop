from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from .database import init_db
from .routes.product_routes import router as product_router
from .routes.orders_routes import router as orders_router
from .routes.reports_routes import router as reports_router
from .routes.settings_routes import router as settings_router

# 1. FastAPI is already initialized here (with better metadata!)
app = FastAPI(
    title="Inventory Management API",
    version="1.0.0",
    description="Scalable backend for inventory management.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. The router is already included here!
app.include_router(product_router)
app.include_router(orders_router)
app.include_router(reports_router)
app.include_router(settings_router)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


# 3. The home route is already here!
@app.get("/")
def home() -> dict:
    return {"message": "Inventory API Running"}


@app.exception_handler(StarletteHTTPException)
def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail or "HTTP error occurred."},
    )


@app.exception_handler(RequestValidationError)
def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )


@app.exception_handler(Exception)
def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error."},
    )