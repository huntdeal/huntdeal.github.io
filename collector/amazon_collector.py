import subprocess
import json
from datetime import datetime
from pathlib import Path
import os
import sqlite3


# ============================================================
# CONFIGURATION
# ============================================================

COLLECTOR_DIR = Path(__file__).resolve().parent
PROJECT_DIR = COLLECTOR_DIR.parent

DATA_DIR = PROJECT_DIR / "data"
DEALS_FILE = DATA_DIR / "deals.json"

# Local SQLite is kept as a migration/source option.
DB_PATH = PROJECT_DIR / "database" / "huntdeal.db"


# ============================================================
# HELPERS
# ============================================================

def now_iso():
    return datetime.now().isoformat(timespec="seconds")


def load_json(path, default):
    if not path.exists():
        return default

    try:
        with path.open("r", encoding="utf-8") as file:
            return json.load(file)
    except (json.JSONDecodeError, OSError):
        print(f"Warning: Could not read {path}")
        return default


def save_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)

    temp_path = path.with_suffix(path.suffix + ".tmp")

    with temp_path.open("w", encoding="utf-8") as file:
        json.dump(
            data,
            file,
            ensure_ascii=False,
            indent=2
        )

    temp_path.replace(path)


# ============================================================
# MIGRATE EXISTING SQLITE ON FIRST RUN
# ============================================================

def migrate_sqlite_if_json_missing():
    """
    If JSON files do not exist and the old local SQLite database exists,
    import its current products and price history once.

    This preserves the existing HuntDeal data when moving to Option A.
    """

    if DEALS_FILE.exists(): 
        return

    if not DB_PATH.exists():
        print("No existing SQLite database found.")
        return

    print("Existing SQLite database found.")
    print("Migrating current data to JSON...")

    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                asin,
                title,
                brand,
                category,
                price,
                mrp,
                discount_percent,
                rank,
                rating,
                review_count,
                image_url,
                created_at,
                updated_at
            FROM products
        """)

        product_rows = cursor.fetchall()

        deals = []

        for row in product_rows:
            deals.append(dict(row))



        conn.close()

        timestamp = now_iso()

        if not DEALS_FILE.exists():
            save_json(
                DEALS_FILE,
                {
                    "updated_at": timestamp,
                    "count": len(deals),
                    "deals": deals
                }
            )


        print(
            f"Migrated {len(deals)} products "
        )

    except sqlite3.Error as error:
        print(f"SQLite migration failed: {error}")


# ============================================================
# AMAZON CLI HELPER
# ============================================================

def run_amazon_command(command):
    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "utf-8"

    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            env=env,
            check=True
        )

        return result.stdout

    except subprocess.CalledProcessError as error:
        print("\nAmazon CLI error:")

        if error.stdout:
            print(error.stdout)

        if error.stderr:
            print(error.stderr)

        return None

    except FileNotFoundError:
        print("\nERROR: 'amz' command not found.")
        return None


# ============================================================
# GET AMAZON DEALS
# ============================================================

def get_amazon_deals(limit=50, min_discount=0):
    command = [
        "amz",
        "deals",
        "--min-discount",
        str(min_discount),
        "--limit",
        str(limit),
        "--json"
    ]

    print("Running Amazon deals command...")

    output = run_amazon_command(command)

    if not output:
        return []

    try:
        deals = json.loads(output)

        if isinstance(deals, list):
            return deals

        print("Unexpected deals response.")
        return []

    except json.JSONDecodeError as error:
        print("Could not parse deals JSON.")
        print(error)
        return []


# ============================================================
# GET PRODUCT DETAILS
# ============================================================

def get_product_details(asin):
    command = [
        "amz",
        "product",
        asin,
        "--json"
    ]

    output = run_amazon_command(command)

    if not output:
        return None

    try:
        return json.loads(output)

    except json.JSONDecodeError:
        print(
            f"Could not parse product JSON for {asin}"
        )
        return None


# ============================================================
# CATEGORY DETECTION
# ============================================================

def detect_category(product):
    title = (
        product.get("title") or ""
    ).lower()

    specs = product.get("specs") or {}

    item_type = (
        specs.get("Item Type Name", "") or ""
    ).lower()

    text = f"{title} {item_type}"

    fashion_keywords = [
        "laptop bag",
        "laptop backpack",
        "backpack",
        "raincoat",
        "rain coat",
        "umbrella",
        "shoes",
        "shoe",
        "sandals",
        "slippers",
        "crocs",
        "shirt",
        "t-shirt",
        "jeans",
        "dress",
        "saree",
        "kurta",
        "jacket",
        "wallet",
        "handbag",
        "travel bag"
    ]

    if any(keyword in text for keyword in fashion_keywords):
        return "Fashion"

    electronics_keywords = [
        "mobile",
        "smartphone",
        "iphone",
        "laptop",
        "tablet",
        "monitor",
        "keyboard",
        "mouse",
        "headphone",
        "earbuds",
        "speaker",
        "camera",
        "television",
        "tv",
        "smartwatch",
        "printer",
        "router",
        "ssd",
        "hard disk",
        "power bank",
        "charger"
    ]

    if any(keyword in text for keyword in electronics_keywords):
        return "Electronics"

    home_keywords = [
        "towel",
        "mop",
        "cleaning",
        "geyser",
        "water heater",
        "iron",
        "dry iron",
        "mosquito",
        "insect killer",
        "drying stand",
        "cloth dryer",
        "bedsheet",
        "pillow",
        "blanket",
        "curtain",
        "storage",
        "rack",
        "organizer",
        "moisture absorber",
        "dehumidifier",
        "dehumidier",
        "vacuum"
    ]

    if any(keyword in text for keyword in home_keywords):
        return "Home"

    kitchen_keywords = [
        "pressure cooker",
        "water bottle",
        "lunch box",
        "chopper",
        "air fryer",
        "microwave",
        "toaster",
        "kettle",
        "mixer grinder",
        "cookware",
        "pan",
        "frying pan"
    ]

    if any(keyword in text for keyword in kitchen_keywords):
        return "Kitchen"

    beauty_keywords = [
        "face wash",
        "shampoo",
        "conditioner",
        "serum",
        "moisturizer",
        "lipstick",
        "makeup",
        "perfume",
        "beauty",
        "skin care",
        "skincare",
        "body lotion"
    ]

    if any(keyword in text for keyword in beauty_keywords):
        return "Beauty"

    sports_keywords = [
        "cricket",
        "football",
        "badminton",
        "gym",
        "fitness",
        "yoga",
        "exercise",
        "sports",
        "dumbbell",
        "treadmill"
    ]

    if any(keyword in text for keyword in sports_keywords):
        return "Sports"

    return "Other"


# ============================================================
# BRAND FALLBACK
# ============================================================

def detect_brand_from_title(title):
    title_lower = (title or "").lower()

    known_brands = {
        "maxoshine": "MAXOSHINE",
        "limetro steel": "LiMETRO STEEL",
        "flyngo": "FLYNGO",
        "spotzero": "Spotzero By Milton",
        "milton": "Milton",
        "american tourister": "American Tourister",
        "destinio": "Destinio",
        "citizen": "Citizen",
        "ifb": "IFB",
        "ao smith": "A. O. Smith",
        "a. o. smith": "A. O. Smith",
        "hit": "HIT",
        "crocs": "Crocs",
        "zeel": "ZEEL",
        "bajaj": "Bajaj",
        "absorbia": "Absorbia"
    }

    for keyword, brand in known_brands.items():
        if keyword in title_lower:
            return brand

    return None


# ============================================================
# UPDATE JSON DATA
# ============================================================

def save_deals_to_json(deals):
    deals_data = load_json(
        DEALS_FILE,
        {
            "updated_at": None,
            "count": 0,
            "deals": []
        }
    )

    existing_deals = {
    }

    now = now_iso()

    saved = 0

    for deal in deals:
        asin = deal.get("asin")

        if not asin:
            continue

        print(
            f"\nGetting product details: {asin}"
        )

        product = get_product_details(asin)

        if product:
            title = (
                product.get("title")
                or deal.get("title")
                or ""
            )

            brand = product.get("brand")

            if not brand:
                brand = detect_brand_from_title(title)

            category = detect_category(product)

            image_url = product.get(
                "image_url",
                deal.get("image_url")
            )

        else:
            title = deal.get("title") or ""

            brand = detect_brand_from_title(title)

            category = detect_category({
                "title": title,
                "specs": {}
            })

            image_url = deal.get("image_url")

        old = existing_deals.get(asin, {})

        product_record = {
            "asin": asin,
            "title": title,
            "brand": brand,
            "category": category,

            # Kept temporarily so the current frontend
            # does not break. We will handle image sourcing
            # separately.
            "image_url": image_url,

            "created_at": old.get("created_at") or now,
            "updated_at": now
        }

        existing_deals[asin] = product_record

        saved += 1

    final_deals = list(existing_deals.values())

    # Keep a stable order.
    final_deals.sort(
        key=lambda item: (
            item.get("category") or "Other",
            item.get("title") or ""
        )
    )

    save_json(
        DEALS_FILE,
        {
            "updated_at": now,
            "count": len(final_deals),
            "deals": final_deals
        }
    )

    return saved

# ============================================================
# DISPLAY
# ============================================================

def display_deals(deals):
    print("\n===================================")
    print("          SAMPLE DEALS")
    print("===================================\n")

    for index, deal in enumerate(
        deals[:5],
        start=1
    ):
        print(
            f"{index}. "
            f"{deal.get('title', 'Unknown')[:70]}"
        )

        print(
            f"   ASIN: {deal.get('asin')}"
        )

        print()


# ============================================================
# MAIN
# ============================================================

def main():
    print("===================================")
    print("       HuntDeal Amazon Collector")
    print("===================================")

    DATA_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    print("\nChecking existing HuntDeal data...")

    migrate_sqlite_if_json_missing()

    print("\nFetching Amazon deals...")

    deals = get_amazon_deals(
        limit=50,
        min_discount=0
    )

    if not deals:
        print("\nNo deals collected.")
        return

    print(
        f"\nFound {len(deals)} deals."
    )

    saved = save_deals_to_json(
        deals
    )

    print(
        f"\nSaved/updated {saved} products."
    )

    display_deals(deals)

    print("\n===================================")
    print("          JSON DATA SUMMARY")
    print("===================================")

    deals_data = load_json(
        DEALS_FILE,
        {"deals": []}
    )

    print(
        f"Products: "
        f"{len(deals_data.get('deals', []))}"
    )

    print(
        f"\nDeals file: {DEALS_FILE}"
    )

    print("\n===================================")
    print("      COLLECTION COMPLETED")
    print("===================================")


if __name__ == "__main__":
    main()
