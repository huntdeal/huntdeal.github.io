from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json
from typing import Any


# ============================================================
# CONFIGURATION
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent

DATA_DIR = PROJECT_DIR / "data"
DEALS_FILE = DATA_DIR / "deals.json"


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="HuntDeal API",
    description="Product discovery API for HuntDeal",
    version="3.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# JSON DATA HELPER
# ============================================================

def load_deals_data() -> dict[str, Any]:

    if not DEALS_FILE.exists():
        return {
            "updated_at": None,
            "count": 0,
            "deals": []
        }

    try:

        with DEALS_FILE.open(
            "r",
            encoding="utf-8"
        ) as file:

            data = json.load(file)

        if isinstance(data, list):

            return {
                "updated_at": None,
                "count": len(data),
                "deals": data
            }

        return data

    except (json.JSONDecodeError, OSError):

        return {
            "updated_at": None,
            "count": 0,
            "deals": []
        }


# ============================================================
# ROOT / HEALTH
# ============================================================

@app.get("/")
def home():

    return {
        "message": "Welcome to HuntDeal API",
        "status": "running",
        "version": "3.0.0",
        "storage": "GitHub JSON"
    }


@app.get("/api/health")
def health_check():

    return {
        "status": "healthy",
        "storage": "json",
        "deals_file": DEALS_FILE.exists()
    }


# ============================================================
# GET ALL PRODUCTS
# ============================================================

@app.get("/api/deals")
def get_deals():

    deals_data = load_deals_data()

    raw_deals = deals_data.get(
        "deals",
        []
    )

    deals = []

    for deal in raw_deals:

        asin = deal.get("asin")

        if not asin:
            continue

        deal_result = {
            "asin": asin,
            "title": deal.get("title"),
            "brand": deal.get("brand"),
            "category": deal.get("category"),
            "image_url": deal.get("image_url"),
            "created_at": deal.get("created_at"),
            "updated_at": deal.get("updated_at")
        }

        deals.append(deal_result)

    return {
        "count": len(deals),
        "updated_at": deals_data.get(
            "updated_at"
        ),
        "deals": deals
    }


# ============================================================
# GET SINGLE PRODUCT
# ============================================================

@app.get("/api/products/{asin}")
def get_product(asin: str):

    deals_data = load_deals_data()

    for deal in deals_data.get(
        "deals",
        []
    ):

        if deal.get("asin") == asin:

            return {
                "asin": deal.get("asin"),
                "title": deal.get("title"),
                "brand": deal.get("brand"),
                "category": deal.get("category"),
                "image_url": deal.get("image_url"),
                "created_at": deal.get("created_at"),
                "updated_at": deal.get("updated_at")
            }

    raise HTTPException(
        status_code=404,
        detail="Product not found."
    )


# ============================================================
# DATA STATISTICS
# ============================================================

@app.get("/api/stats")
def get_stats():

    deals_data = load_deals_data()

    products = deals_data.get(
        "deals",
        []
    )

    return {
        "products": len(products),
        "updated_at": deals_data.get(
            "updated_at"
        )
    }