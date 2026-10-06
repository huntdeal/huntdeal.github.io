import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client



# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL:
    raise RuntimeError("SUPABASE_URL is missing")

if not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_KEY is missing")


# ============================================================
# SUPABASE CLIENT
# ============================================================

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="HuntDeal API",
    version="1.0.0",
    description="Backend API for HuntDeal deals and products."
)


# ============================================================
# CORS
# ============================================================

ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


# ============================================================
# RESPONSE MODELS
# ============================================================

class Deal(BaseModel):
    id: int
    asin: str
    title: Optional[str] = None
    image_url: Optional[str] = None
    product_url: Optional[str] = None
    affiliate_url: Optional[str] = None

    price: Optional[float] = None
    mrp: Optional[float] = None
    discount_percent: Optional[float] = None

    coupon_price: Optional[float] = None
    coupon_message: Optional[str] = None

    deal_status: Optional[str] = None
    deal_type: Optional[str] = None
    source: str


class DealsResponse(BaseModel):
    data: list[Deal]
    count: int


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "HuntDeal API is running",
        "version": "1.0.0"
    }


# ============================================================
# GET DEALS
# ============================================================

@app.get(
    "/api/deals",
    response_model=DealsResponse
)
def get_deals():

    try:

        response = (
            supabase
            .table("product_deals")
            .select("""
                id,
                product_id,
                source,
                deal_price,
                mrp,
                discount_percent,
                coupon_price,
                coupon_message,
                deal_status,
                deal_type,
                affiliate_url,
                products (
                    id,
                    asin,
                    title,
                    product_url,
                    affiliate_url,
                    image_url
                )
            """)
            .eq("source", "amazon")
            .eq("is_active", True)
            .order(
                "discount_percent",
                desc=True
            )
            .limit(20)
            .execute()
        )

        deals = []

        for row in response.data:

            product = row.get("products") or {}

            deals.append({
                "id": row["id"],
                "asin": product.get("asin"),
                "title": product.get("title"),
                "image_url": product.get("image_url"),
                "product_url": product.get("product_url"),

                "affiliate_url": (
                    row.get("affiliate_url")
                    or product.get("affiliate_url")
                ),

                "price": row.get("deal_price"),
                "mrp": row.get("mrp"),
                "discount_percent": row.get(
                    "discount_percent"
                ),

                "coupon_price": row.get(
                    "coupon_price"
                ),

                "coupon_message": row.get(
                    "coupon_message"
                ),

                "deal_status": row.get(
                    "deal_status"
                ),

                "deal_type": row.get(
                    "deal_type"
                ),

                "source": row.get("source")
            })

        return {
            "data": deals,
            "count": len(deals)
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch deals: {str(e)}"
        )