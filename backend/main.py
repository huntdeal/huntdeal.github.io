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
HISTORY_FILE = DATA_DIR / "price_history.json"


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="HuntDeal API",
    description="Deal aggregation API for HuntDeal",
    version="2.0.0"
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
# JSON DATA HELPERS
# ============================================================

def load_deals_data() -> dict[str, Any]:
    if not DEALS_FILE.exists():
        return {"updated_at": None, "count": 0, "deals": []}

    try:
        with DEALS_FILE.open("r", encoding="utf-8") as file:
            data = json.load(file)

        if isinstance(data, list):
            return {
                "updated_at": None,
                "count": len(data),
                "deals": data
            }

        return data

    except (json.JSONDecodeError, OSError):
        return {"updated_at": None, "count": 0, "deals": []}


def load_history_data() -> dict[str, Any]:
    if not HISTORY_FILE.exists():
        return {"updated_at": None, "history": {}}

    try:
        with HISTORY_FILE.open("r", encoding="utf-8") as file:
            data = json.load(file)

        if isinstance(data, dict) and "history" in data:
            return data

        return {"updated_at": None, "history": data}

    except (json.JSONDecodeError, OSError):
        return {"updated_at": None, "history": {}}


# ============================================================
# DEAL SCORE
# ============================================================

def calculate_deal_score(
    discount,
    rating,
    review_count,
    price,
    lowest_price,
    history_count
):
    """
    HuntDeal Score out of 100.

    - Discount: 35
    - Rating: 25
    - Reviews: 15
    - Price history: 25
    """

    discount = float(discount or 0)
    rating = float(rating or 0)
    review_count = int(review_count or 0)
    price = float(price or 0)
    lowest_price = float(lowest_price or 0)
    history_count = int(history_count or 0)

    discount_score = min(discount / 70 * 35, 35)
    rating_score = min(rating / 5 * 25, 25)

    if review_count >= 10000:
        review_score = 15
    elif review_count >= 5000:
        review_score = 13
    elif review_count >= 1000:
        review_score = 11
    elif review_count >= 500:
        review_score = 9
    elif review_count >= 100:
        review_score = 7
    elif review_count >= 10:
        review_score = 4
    else:
        review_score = 1

    if history_count >= 2 and lowest_price > 0 and price > 0:
        if price <= lowest_price:
            history_score = 25
        else:
            price_ratio = lowest_price / price
            history_score = max(0, min(price_ratio * 25, 25))
    else:
        history_score = 12.5

    return round(
        discount_score
        + rating_score
        + review_score
        + history_score
    )


def get_deal_label(score):
    if score >= 85:
        return "Excellent Deal"
    if score >= 70:
        return "Strong Deal"
    if score >= 55:
        return "Good Deal"
    if score >= 40:
        return "Fair Deal"
    return "Weak Deal"


# ============================================================
# PRICE INTELLIGENCE
# ============================================================

def get_price_intelligence(price, history):
    price = float(price or 0)

    history = history or []

    prices = []
    for item in history:
        try:
            prices.append(float(item.get("price", 0)))
        except (TypeError, ValueError):
            pass

    prices = [value for value in prices if value > 0]

    lowest_price = min(prices) if prices else price

    previous_price = (
        prices[-2]
        if len(prices) >= 2
        else None
    )

    history_count = len(prices)

    result = {
        "lowest_price": lowest_price,
        "previous_price": previous_price,
        "price_difference": 0,
        "percent_above_lowest": 0,
        "price_change_percent": 0,
        "is_lowest_price": False,
        "price_trend": "Unknown",
        "history_count": history_count
    }

    if price <= 0:
        return result

    if lowest_price > 0:
        result["price_difference"] = round(
            price - lowest_price,
            2
        )

        if price <= lowest_price:
            result["is_lowest_price"] = True
            result["percent_above_lowest"] = 0
        else:
            result["percent_above_lowest"] = round(
                ((price - lowest_price) / lowest_price) * 100,
                2
            )

    if previous_price is not None and previous_price > 0:
        change_percent = (
            (price - previous_price) / previous_price
        ) * 100

        result["price_change_percent"] = round(
            change_percent,
            2
        )

        if price < previous_price:
            result["price_trend"] = "Falling"
        elif price > previous_price:
            result["price_trend"] = "Rising"
        else:
            result["price_trend"] = "Stable"

    elif history_count >= 1:
        result["price_trend"] = "Stable"

    return result


# ============================================================
# ROOT / HEALTH
# ============================================================

@app.get("/")
def home():
    return {
        "message": "Welcome to HuntDeal API",
        "status": "running",
        "version": "2.0.0",
        "storage": "GitHub JSON"
    }


@app.get("/api/health")
def health_check():
    deals_exists = DEALS_FILE.exists()
    history_exists = HISTORY_FILE.exists()

    return {
        "status": "healthy",
        "storage": "json",
        "deals_file": deals_exists,
        "history_file": history_exists
    }


# ============================================================
# GET ALL DEALS
# ============================================================

@app.get("/api/deals")
def get_deals():
    deals_data = load_deals_data()
    history_data = load_history_data()

    raw_deals = deals_data.get("deals", [])
    history_map = history_data.get("history", {})

    deals = []

    for deal in raw_deals:
        asin = deal.get("asin")

        if not asin:
            continue

        history = history_map.get(asin, [])

        price = deal.get("price", 0)

        intelligence = get_price_intelligence(
            price=price,
            history=history
        )

        deal_score = calculate_deal_score(
            discount=deal.get("discount_percent"),
            rating=deal.get("rating"),
            review_count=deal.get("review_count"),
            price=price,
            lowest_price=intelligence["lowest_price"],
            history_count=intelligence["history_count"]
        )

        deal_result = {
            "asin": asin,
            "title": deal.get("title"),
            "brand": deal.get("brand"),
            "category": deal.get("category"),
            "price": price,
            "mrp": deal.get("mrp"),
            "discount_percent": deal.get("discount_percent"),
            "rank": deal.get("rank"),
            "rating": deal.get("rating"),
            "review_count": deal.get("review_count"),
            "image_url": deal.get("image_url"),
            "created_at": deal.get("created_at"),
            "updated_at": deal.get("updated_at"),

            "deal_score": deal_score,
            "deal_label": get_deal_label(deal_score),

            "lowest_price": intelligence["lowest_price"],
            "previous_price": intelligence["previous_price"],
            "price_difference": intelligence["price_difference"],
            "percent_above_lowest": intelligence["percent_above_lowest"],
            "price_change_percent": intelligence["price_change_percent"],
            "is_lowest_price": intelligence["is_lowest_price"],
            "price_trend": intelligence["price_trend"],
            "history_count": intelligence["history_count"]
        }

        deals.append(deal_result)

    deals.sort(
        key=lambda item: float(
            item.get("discount_percent") or 0
        ),
        reverse=True
    )

    return {
        "count": len(deals),
        "updated_at": deals_data.get("updated_at"),
        "deals": deals
    }


# ============================================================
# GET SINGLE PRODUCT
# ============================================================

@app.get("/api/products/{asin}")
def get_product(asin: str):
    deals_data = load_deals_data()

    for deal in deals_data.get("deals", []):
        if deal.get("asin") == asin:
            return deal

    raise HTTPException(
        status_code=404,
        detail="Product not found."
    )


# ============================================================
# GET PRICE HISTORY
# ============================================================

@app.get("/api/products/{asin}/history")
def get_price_history(asin: str):
    deals_data = load_deals_data()
    history_data = load_history_data()

    exists = any(
        deal.get("asin") == asin
        for deal in deals_data.get("deals", [])
    )

    if not exists:
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )

    history = history_data.get("history", {}).get(
        asin,
        []
    )

    return {
        "asin": asin,
        "count": len(history),
        "history": history
    }


# ============================================================
# DATABASE / DATA STATISTICS
# ============================================================

@app.get("/api/stats")
def get_stats():
    deals_data = load_deals_data()
    history_data = load_history_data()

    history_map = history_data.get("history", {})

    history_count = sum(
        len(items)
        for items in history_map.values()
        if isinstance(items, list)
    )

    return {
        "products": len(deals_data.get("deals", [])),
        "price_history_records": history_count,
        "updated_at": deals_data.get("updated_at")
    }
