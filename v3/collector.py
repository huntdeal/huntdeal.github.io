import asyncio
import os
import re
import pandas as pd
from datetime import datetime
from playwright.async_api import async_playwright
from dotenv import load_dotenv
from pathlib import Path
from supabase import create_client
from urllib.parse import (
    parse_qsl,
    urlencode,
    urljoin,
    urlsplit,
    urlunsplit,
)


load_dotenv()

AMAZON_ASSOCIATE_TAG = os.getenv("AMAZON_ASSOCIATE_TAG")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL:
    raise RuntimeError("SUPABASE_URL is missing from .env")

if not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_KEY is missing from .env")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)

# ============================================================
# CONFIGURATION
# ============================================================

AMAZON_DEALS_URL = "https://www.amazon.in/deals"

# V3 testing target
MAX_PRODUCTS = 10

# Maximum times we continue when nothing new appears
IDLE_LIMIT = 5

# Environment variable containing your Amazon Associates tag
#
# Windows PowerShell example:
# $env:AMAZON_ASSOCIATE_TAG="yourtag-21"
#
# DO NOT put your real tag directly into this source file
# if you plan to upload the code to GitHub.
AMAZON_ASSOCIATE_TAG = os.getenv(
    "AMAZON_ASSOCIATE_TAG",
    ""
)

# Output location
BASE_DIR = Path(__file__).resolve().parent

OUTPUT_DIR = BASE_DIR / "output"

OUTPUT_FILE = (
    OUTPUT_DIR
    / "amazon_deals_v3.xlsx"
)


# ============================================================
# STORAGE
# ============================================================

products = {}

api_response_count = 0


# ============================================================
# SAFE NESTED VALUE
# ============================================================

def get_value(data, *keys, default=None):

    current = data

    for key in keys:

        if not isinstance(current, dict):
            return default

        current = current.get(key)

        if current is None:
            return default

    return current


# ============================================================
# DISCOUNT
# ============================================================

def get_discount(product):

    # --------------------------------------------------------
    # First try Amazon's displayed deal badge
    # --------------------------------------------------------

    fragments = get_value(
        product,
        "dealBadge",
        "label",
        "content",
        "fragments",
        default=[]
    )

    if isinstance(fragments, list):

        for fragment in fragments:

            if not isinstance(fragment, dict):
                continue

            text = fragment.get(
                "text",
                ""
            )

            match = re.search(
                r"(\d+(?:\.\d+)?)\s*%\s*off",
                text,
                re.IGNORECASE
            )

            if match:

                return float(
                    match.group(1)
                )

    # --------------------------------------------------------
    # Fallback: calculate from MRP and deal price
    # --------------------------------------------------------

    deal_price = get_value(
        product,
        "price",
        "priceToPay",
        "price"
    )

    mrp = get_value(
        product,
        "price",
        "basisPrice",
        "price"
    )

    try:

        deal_price = float(
            deal_price
        )

        mrp = float(
            mrp
        )

        if mrp > 0:

            return round(
                (
                    (mrp - deal_price)
                    / mrp
                ) * 100,
                2
            )

    except (
        TypeError,
        ValueError
    ):

        pass

    return None


# ============================================================
# IMAGE URL
# ============================================================

def get_image(product):

    image = get_value(
        product,
        "image",
        "hiRes",
        default={}
    )

    if not isinstance(
        image,
        dict
    ):
        return None

    base_url = image.get(
        "baseUrl"
    )

    extension = image.get(
        "extension"
    )

    if not base_url:

        return None

    if extension:

        extension = str(
            extension
        ).strip()

        # Amazon may return "jpg"
        # instead of ".jpg"

        if not extension.startswith("."):

            extension = (
                "."
                + extension
            )

        # Prevent accidental duplicate
        # extension

        if not base_url.lower().endswith(
            extension.lower()
        ):

            return (
                base_url
                + extension
            )

    return base_url


# ============================================================
# COUPON INFORMATION
# ============================================================

def get_coupon_info(product):

    fragments = get_value(
        product,
        "coupon",
        "label",
        "fragments",
        default=[]
    )

    if not isinstance(
        fragments,
        list
    ):

        return None, None

    amount = None

    message_parts = []

    for fragment in fragments:

        if not isinstance(
            fragment,
            dict
        ):

            continue

        # ----------------------------------------------------
        # Coupon money amount
        # ----------------------------------------------------

        money = fragment.get(
            "money"
        )

        if isinstance(
            money,
            dict
        ):

            value = money.get(
                "amount"
            )

            if value is not None:

                amount = value

        # ----------------------------------------------------
        # Coupon text
        # ----------------------------------------------------

        text = fragment.get(
            "text"
        )

        if text:

            message_parts.append(
                str(text)
            )

    message = (
        " ".join(
            message_parts
        ).strip()
        or None
    )

    try:

        amount = float(
            amount
        )

    except (
        TypeError,
        ValueError
    ):

        amount = None

    return amount, message


# ============================================================
# AMAZON PRODUCT URL
# ============================================================

def get_product_url(product):

    url = product.get(
        "link"
    )

    if not url:

        return None

    # Convert relative Amazon URL
    # into absolute URL

    return urljoin(
        "https://www.amazon.in",
        url
    )


# ============================================================
# AFFILIATE URL
# ============================================================

def build_affiliate_url(
    product_url
):

    if not product_url:

        return None

    # If tag isn't configured, don't
    # generate a fake affiliate URL.

    if not AMAZON_ASSOCIATE_TAG:

        return None

    parts = urlsplit(
        product_url
    )

    query_params = dict(
        parse_qsl(
            parts.query,
            keep_blank_values=True
        )
    )

    # Remove an existing tag first.
    # This prevents duplicate tags.

    query_params.pop(
        "tag",
        None
    )

    # Add our Associates tag

    query_params["tag"] = (
        AMAZON_ASSOCIATE_TAG
    )

    new_query = urlencode(
        query_params
    )

    return urlunsplit(
        (
            parts.scheme,
            parts.netloc,
            parts.path,
            new_query,
            parts.fragment
        )
    )


# ============================================================
# DEAL TYPE
# ============================================================

def get_deal_type(product):

    value = get_value(
        product,
        "dealDetails",
        "type"
    )

    if value is None:

        return None

    return str(
        value
    )


# ============================================================
# DEAL STATUS
# ============================================================

def get_deal_status(product):

    value = get_value(
        product,
        "dealDetails",
        "state"
    )

    if value is None:

        return None

    return str(
        value
    )


# ============================================================
# CLEAN PRODUCT
# ============================================================

def clean_product(product):

    asin = product.get(
        "asin"
    )

    if not asin:

        return None

    # --------------------------------------------------------
    # Price
    # --------------------------------------------------------

    deal_price = get_value(
        product,
        "price",
        "priceToPay",
        "price"
    )

    mrp = get_value(
        product,
        "price",
        "basisPrice",
        "price"
    )

    try:

        deal_price = float(
            deal_price
        )

    except (
        TypeError,
        ValueError
    ):

        deal_price = None

    try:

        mrp = float(
            mrp
        )

    except (
        TypeError,
        ValueError
    ):

        mrp = None

    # --------------------------------------------------------
    # Discount
    # --------------------------------------------------------

    discount = get_discount(
        product
    )

    # --------------------------------------------------------
    # Savings
    # --------------------------------------------------------

    savings = None

    if (
        deal_price is not None
        and mrp is not None
    ):

        savings = round(
            mrp - deal_price,
            2
        )

    # --------------------------------------------------------
    # Coupon
    # --------------------------------------------------------

    coupon_amount, coupon_message = (
        get_coupon_info(
            product
        )
    )

    # --------------------------------------------------------
    # Product URL
    # --------------------------------------------------------

    product_url = get_product_url(
        product
    )

    # --------------------------------------------------------
    # Affiliate URL
    # --------------------------------------------------------

    affiliate_url = (
        build_affiliate_url(
            product_url
        )
    )

    # --------------------------------------------------------
    # IMPORTANT:
    #
    # We are NOT automatically calculating
    # final price from coupon.
    #
    # Coupon applicability needs to be
    # confirmed separately.
    # --------------------------------------------------------

    final_price = None

    # --------------------------------------------------------
    # Category
    # --------------------------------------------------------

    category = get_value(
        product,
        "productCategory",
        "symbol"
    )

    # --------------------------------------------------------
    # Product
    # --------------------------------------------------------

    return {

        "ASIN": asin,

        "Product Name": product.get(
            "title"
        ),

        "Category": category,

        "Deal Price": deal_price,

        "MRP": mrp,

        "Discount %": discount,

        "Savings": savings,

        "Coupon": coupon_amount,

        "Coupon Message": coupon_message,

        "Final Price": final_price,

        "Deal Type": get_deal_type(
            product
        ),

        "Deal Status": get_deal_status(
            product
        ),

        "Product URL": product_url,

        "Affiliate URL": affiliate_url,

        "Image URL": get_image(
            product
        ),

        "Collected At": datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    }


# ============================================================
# SAVE CLEANED PRODUCT TO SUPABASE
# ============================================================

def save_product_to_supabase(product):
    """
    Save one cleaned V3 product to:

    1. products
    2. product_deals
    3. price_history
    """

    asin = product.get("ASIN")

    if not asin:
        print("⚠ Skipping product: ASIN missing")
        return False

    # ========================================================
    # 1. PRODUCTS
    # ========================================================

    product_data = {
        "asin": asin,
        "title": product.get("Product Name"),
        "product_url": product.get("Product URL"),
        "affiliate_url": product.get("Affiliate URL"),
        "image_url": product.get("Image URL"),
        "product_type": None,
        "is_active": True,
    }

    product_response = (
        supabase
        .table("products")
        .upsert(
            product_data,
            on_conflict="asin"
        )
        .select("id, asin")
        .execute()
    )

    if not product_response.data:
        raise RuntimeError(
            f"Failed to save product: {asin}"
        )

    product_id = product_response.data[0]["id"]

    # ========================================================
    # 2. PRODUCT DEAL
    # ========================================================

    deal_data = {
        "product_id": product_id,
        "source": "amazon",

        "deal_price": product.get("Deal Price"),
        "mrp": product.get("MRP"),
        "discount_percent": product.get("Discount %"),

        "discount_text": None,

        "coupon_price": product.get("Coupon"),
        "coupon_message": product.get("Coupon Message"),

        "deal_status": product.get("Deal Status"),
        "deal_type": product.get("Deal Type"),
        "deal_id": None,

        "affiliate_url": product.get("Affiliate URL"),

        "is_active": True,

        "starts_at": None,
        "ends_at": None,

        "raw_data": None,
    }

    deal_response = (
        supabase
        .table("product_deals")
        .upsert(
            deal_data,
            on_conflict="product_id,source"
        )
        .select("id")
        .execute()
    )

    if not deal_response.data:
        raise RuntimeError(
            f"Failed to save deal: {asin}"
        )

    # ========================================================
    # 3. PRICE HISTORY
    # ========================================================

    current_price = product.get("Deal Price")
    current_mrp = product.get("MRP")
    current_discount = product.get("Discount %")

    history_response = (
        supabase
        .table("price_history")
        .select(
            "id, price, mrp, discount_percent"
        )
        .eq(
            "product_id",
            product_id
        )
        .order(
            "recorded_at",
            desc=True
        )
        .limit(1)
        .execute()
    )

    last_history = (
        history_response.data[0]
        if history_response.data
        else None
    )

    price_changed = True

    if last_history:

        if (
            last_history.get("price") == current_price
            and last_history.get("mrp") == current_mrp
            and last_history.get("discount_percent") == current_discount
        ):
            price_changed = False

    if price_changed:

        supabase.table("price_history").insert({
            "product_id": product_id,
            "price": current_price,
            "mrp": current_mrp,
            "discount_percent": current_discount,
            "source": "amazon",
        }).execute()

    return True



# ============================================================
# PROCESS AMAZON API RESPONSE
# ============================================================

async def process_response(
    response
):

    global api_response_count

    # Only process Amazon's internal
    # deals API.

    if (
        "/d2b/api/v1/products/search"
        not in response.url
    ):

        return

    # Only successful responses

    if response.status != 200:

        return

    try:

        data = await response.json()

    except Exception:

        return

    amazon_products = data.get(
        "products",
        []
    )

    if not isinstance(
        amazon_products,
        list
    ):

        return

    api_response_count += 1

    start_index = data.get(
        "startIndex"
    )

    next_index = data.get(
        "nextIndex"
    )

    print()
    print(
        "=" * 70
    )

    print(
        f"API RESPONSE #{api_response_count}"
    )

    print(
        "Start Index:",
        start_index
    )

    print(
        "Next Index:",
        next_index
    )

    print(
        "Products:",
        len(amazon_products)
    )

    new_products = 0

    for product in amazon_products:

        asin = product.get(
            "asin"
        )

        if not asin:

            continue

        if asin not in products:

            products[asin] = product

            new_products += 1

    print(
        "New products:",
        new_products
    )

    print(
        "Total unique:",
        len(products)
    )

    print(
        "=" * 70
    )


# ============================================================
# FIND "VIEW MORE DEALS"
# ============================================================

async def find_view_more(
    page
):

    selectors = [

        "text=View more deals",

        "text=View more Deals",

        "text=View More Deals",

        "button:has-text('View more deals')",

        "button:has-text('View more Deals')",

        "a:has-text('View more deals')",

    ]

    for selector in selectors:

        try:

            locator = page.locator(
                selector
            )

            count = await locator.count()

            if count == 0:

                continue

            for index in range(
                count
            ):

                element = (
                    locator.nth(index)
                )

                try:

                    if await element.is_visible():

                        return element

                except Exception:

                    continue

        except Exception:

            continue

    return None


# ============================================================
# CLICK "VIEW MORE DEALS"
# ============================================================

async def click_view_more(
    page
):

    button = await find_view_more(
        page
    )

    if button is None:

        return False

    print()
    print(
        "✓ View more deals found"
    )

    try:

        await button.scroll_into_view_if_needed()

        print(
            "Clicking View more deals..."
        )

        # Wait for the Amazon API
        # response caused by this click.

        async with page.expect_response(
            lambda response:
                (
                    "/d2b/api/v1/products/search"
                    in response.url
                    and response.status == 200
                ),
            timeout=15000
        ) as response_info:

            await button.click()

        response = await response_info.value

        print(
            "✓ New Amazon API response received"
        )

        try:

            data = await response.json()

            new_products = data.get(
                "products",
                []
            )

            for product in new_products:

                asin = product.get(
                    "asin"
                )

                if asin:

                    products[asin] = product

            print(
                "Products in clicked response:",
                len(new_products)
            )

            print(
                "Total unique:",
                len(products)
            )

        except Exception as error:

            print(
                "Could not process clicked response:"
            )

            print(error)

        return True

    except Exception as error:

        print(
            "Could not click/wait for API response:"
        )

        print(error)

        return False


# ============================================================
# SCROLL + COLLECT
# ============================================================

async def collect_products(
    page
):

    print()
    print(
        "=" * 70
    )

    print(
        "STARTING V3 COLLECTION"
    )

    print(
        f"Target: {MAX_PRODUCTS} products"
    )

    print(
        "=" * 70
    )

    idle_rounds = 0

    previous_count = 0

    while len(products) < MAX_PRODUCTS:

        # ----------------------------------------------------
        # Scroll
        # ----------------------------------------------------

        await page.mouse.wheel(
            0,
            1500
        )

        await page.wait_for_timeout(
            2000
        )

        # ----------------------------------------------------
        # Try View More button
        # ----------------------------------------------------

        clicked = await click_view_more(
            page
        )

        if clicked:

            idle_rounds = 0

            await page.wait_for_timeout(
                2000
            )

            continue

        # ----------------------------------------------------
        # Check current product count
        # ----------------------------------------------------

        current_count = len(
            products
        )

        print()
        print(
            f"Progress: "
            f"{current_count}/"
            f"{MAX_PRODUCTS}"
        )

        if current_count == previous_count:

            idle_rounds += 1

        else:

            idle_rounds = 0

        previous_count = current_count

        # ----------------------------------------------------
        # Additional scroll
        # ----------------------------------------------------

        await page.mouse.wheel(
            0,
            1200
        )

        await page.wait_for_timeout(
            1500
        )

        # ----------------------------------------------------
        # Stop if nothing changes repeatedly
        # ----------------------------------------------------

        if idle_rounds >= IDLE_LIMIT:

            print()
            print(
                "No new products found."
            )

            print(
                "Stopping collection."
            )

            break


# ============================================================
# SAVE EXCEL
# ============================================================

def save_excel():

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    rows = []

    # --------------------------------------------------------
    # Only take MAX_PRODUCTS
    # --------------------------------------------------------

    selected_products = list(
        products.values()
    )[
        :MAX_PRODUCTS
    ]

    for product in selected_products:

        cleaned = clean_product(
            product
        )

        if cleaned:

            rows.append(
                cleaned
            )

            # ----------------------------------------------------
            # Save to Supabase
            # ----------------------------------------------------

            try:

                save_product_to_supabase(
                    cleaned
                )

                print(
                    f"✓ Supabase saved: "
                    f"{cleaned.get('ASIN')}"
                )

            except Exception as e:

                print(
                    f"✗ Supabase save failed: "
                    f"{cleaned.get('ASIN')}"
                )

                print(
                    f"  Error: {e}"
                )

    if not rows:

        print()
        print(
            "No products available to save."
        )

        return None

    df = pd.DataFrame(
        rows
    )

    # --------------------------------------------------------
    # Numeric columns
    # --------------------------------------------------------

    numeric_columns = [

        "Deal Price",

        "MRP",

        "Discount %",

        "Savings",

        "Coupon",

        "Final Price"

    ]

    for column in numeric_columns:

        df[column] = pd.to_numeric(
            df[column],
            errors="coerce"
        )

    # --------------------------------------------------------
    # Independently calculated discount
    # --------------------------------------------------------

    df["Calculated Discount %"] = None

    valid_prices = (
        df["MRP"].notna()
        & df["Deal Price"].notna()
        & (df["MRP"] > 0)
    )

    df.loc[
        valid_prices,
        "Calculated Discount %"
    ] = (
        (
            (
                df.loc[
                    valid_prices,
                    "MRP"
                ]
                -
                df.loc[
                    valid_prices,
                    "Deal Price"
                ]
            )
            /
            df.loc[
                valid_prices,
                "MRP"
            ]
        )
        * 100
    ).round(2)

    # --------------------------------------------------------
    # Sort
    # --------------------------------------------------------

    df = df.sort_values(
        by="Discount %",
        ascending=False,
        na_position="last"
    )

    # --------------------------------------------------------
    # Column order
    # --------------------------------------------------------

    columns = [

        "ASIN",

        "Product Name",

        "Category",

        "Deal Price",

        "MRP",

        "Discount %",

        "Calculated Discount %",

        "Savings",

        "Coupon",

        "Coupon Message",

        "Final Price",

        "Deal Type",

        "Deal Status",

        "Product URL",

        "Affiliate URL",

        "Image URL",

        "Collected At"
    ]

    df = df[
        [
            column
            for column in columns
            if column in df.columns
        ]
    ]

    # --------------------------------------------------------
    # Save
    # --------------------------------------------------------

    df.to_excel(
        OUTPUT_FILE,
        index=False,
        engine="openpyxl"
    )

    # --------------------------------------------------------
    # Summary
    # --------------------------------------------------------

    print()
    print(
        "=" * 70
    )

    print(
        "V3 EXCEL CREATED"
    )

    print(
        "=" * 70
    )

    print(
        "Products:",
        len(df)
    )

    print(
        "Unique ASINs:",
        df["ASIN"].nunique()
    )

    print(
        "Affiliate URLs:",
        df["Affiliate URL"].notna().sum()
    )

    print(
        "Coupons:",
        df["Coupon"].notna().sum()
    )

    print(
        "Image URLs:",
        df["Image URL"].notna().sum()
    )

    print(
        "Product URLs:",
        df["Product URL"].notna().sum()
    )

    print()
    print(
        "Excel:",
        OUTPUT_FILE
    )

    return df


# ============================================================
# MAIN
# ============================================================

async def main():

    print()
    print(
        "=" * 70
    )

    print(
        "AMAZON DEAL COLLECTOR V3"
    )

    print(
        "=" * 70
    )

    # --------------------------------------------------------
    # Check affiliate configuration
    # --------------------------------------------------------

    if AMAZON_ASSOCIATE_TAG:

        print()
        print(
            "Affiliate tag: CONFIGURED"
        )

    else:

        print()
        print(
            "Affiliate tag: NOT CONFIGURED"
        )

        print(
            "Affiliate URL column will remain blank."
        )

        print()
        print(
            "Set it before running the affiliate test:"
        )

        print(
            '$env:AMAZON_ASSOCIATE_TAG="yourtag-21"'
        )

    # --------------------------------------------------------
    # Launch browser
    # --------------------------------------------------------

    async with async_playwright() as p:

        browser = await p.chromium.launch(
            headless=True
        )

        page = await browser.new_page()

        # ----------------------------------------------------
        # Listen to Amazon API responses
        # ----------------------------------------------------

        page.on(
            "response",
            process_response
        )

        print()
        print(
            "Opening Amazon Deals..."
        )

        await page.goto(
            AMAZON_DEALS_URL,
            wait_until="domcontentloaded",
            timeout=60000
        )

        print(
            "Amazon Deals opened."
        )

        # ----------------------------------------------------
        # Initial API requests
        # ----------------------------------------------------

        await page.wait_for_timeout(
            10000
        )

        # ----------------------------------------------------
        # Collect
        # ----------------------------------------------------

        await collect_products(
            page
        )

        # ----------------------------------------------------
        # Allow final responses
        # ----------------------------------------------------

        await page.wait_for_timeout(
            5000
        )

        # ----------------------------------------------------
        # Save
        # ----------------------------------------------------

        save_excel()

        # ----------------------------------------------------
        # Close
        # ----------------------------------------------------

        print()
        print(
            "Closing browser..."
        )

        await browser.close()

    print()
    print(
        "=" * 70
    )

    print(
        "V3 FINISHED"
    )

    print(
        "=" * 70
    )


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    asyncio.run(
        main()
    )
