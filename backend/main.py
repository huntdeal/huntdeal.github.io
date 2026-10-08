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
    amazon_category: Optional[str] = None
    huntdeal_category: Optional[str] = None


class DealsResponse(BaseModel):
    data: list[Deal]
    count: int

class ProductDeal(BaseModel):
    id: int
    price: Optional[float] = None
    mrp: Optional[float] = None
    discount_percent: Optional[float] = None
    coupon_price: Optional[float] = None
    coupon_message: Optional[str] = None
    deal_status: Optional[str] = None
    deal_type: Optional[str] = None
    source: str


class ProductDetail(BaseModel):
    id: int
    asin: str
    title: Optional[str] = None
    image_url: Optional[str] = None
    product_url: Optional[str] = None
    affiliate_url: Optional[str] = None
    product_type: Optional[str] = None
    amazon_category: Optional[str] = None
    huntdeal_category: Optional[str] = None
    deal: Optional[ProductDeal] = None


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
                    image_url,
                    amazon_category,
                    huntdeal_category
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

                "amazon_category": product.get("amazon_category"),
                "huntdeal_category": product.get("huntdeal_category"),

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


# ============================================================
# GET SINGLE DEAL
# ============================================================

@app.get(
    "/api/deals/{deal_id}",
    response_model=Deal
)
def get_deal(deal_id: int):

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
            .eq("id", deal_id)
            .eq("source", "amazon")
            .eq("is_active", True)
            .limit(1)
            .execute()
        )

        if not response.data:

            raise HTTPException(
                status_code=404,
                detail="Deal not found"
            )

        row = response.data[0]
        product = row.get("products") or {}

        return {
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
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch deal: {str(e)}"
        )


# ============================================================
# GET PRODUCT DETAIL
# ============================================================

@app.get(
    "/api/products/{product_id}",
    response_model=ProductDetail
)
def get_product(product_id: int):

    try:

        response = (
            supabase
            .table("products")
            .select("""
                id,
                asin,
                title,
                product_url,
                affiliate_url,
                image_url,
                product_type,
                amazon_category,
                huntdeal_category,
                product_deals (
                    id,
                    source,
                    deal_price,
                    mrp,
                    discount_percent,
                    coupon_price,
                    coupon_message,
                    deal_status,
                    deal_type,
                    affiliate_url,
                    is_active
                )
            """)
            .eq("id", product_id)
            .limit(1)
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        row = response.data[0]

        deals = [
            deal
            for deal in (row.get("product_deals") or [])
            if deal.get("source") == "amazon"
            and deal.get("is_active") is True
        ]

        deal_data = None

        if deals:
            deal = deals[0]

            deal_data = {
                "id": deal["id"],
                "price": deal.get("deal_price"),
                "mrp": deal.get("mrp"),
                "discount_percent": deal.get(
                    "discount_percent"
                ),
                "coupon_price": deal.get(
                    "coupon_price"
                ),
                "coupon_message": deal.get(
                    "coupon_message"
                ),
                "deal_status": deal.get(
                    "deal_status"
                ),
                "deal_type": deal.get(
                    "deal_type"
                ),
                "source": deal.get("source")
            }

        return {
            "id": row["id"],
            "asin": row["asin"],
            "title": row.get("title"),
            "image_url": row.get("image_url"),
            "product_url": row.get("product_url"),
            "affiliate_url": (
                row.get("affiliate_url")
                or (
                    deals[0].get("affiliate_url")
                    if deals
                    else None
                )
            ),
            "product_type": row.get("product_type"),
            "amazon_category": row.get(
                "amazon_category"
            ),
            "huntdeal_category": row.get(
                "huntdeal_category"
            ),
            "deal": deal_data
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch product: {str(e)}"
        )
    