import asyncio
import re
from datetime import datetime
from pathlib import Path
from urllib.parse import urljoin

import pandas as pd
from playwright.async_api import async_playwright


# ============================================================
# CONFIG
# ============================================================

AMAZON_DEALS_URL = "https://www.amazon.in/deals"

MAX_PRODUCTS = 300

IDLE_LIMIT = 5

OUTPUT_FILE = (
    Path(__file__).resolve().parent
    / "output"
    / "amazon_deals_v2.xlsx"
)


# ============================================================
# STORAGE
# ============================================================

products = {}

api_responses = 0


# ============================================================
# SAFE VALUE
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

            text = fragment.get("text", "")

            match = re.search(
                r"(\d+(?:\.\d+)?)\s*%\s*off",
                text,
                re.IGNORECASE
            )

            if match:
                return float(match.group(1))

    # Fallback calculation

    price = get_value(
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

        price = float(price)
        mrp = float(mrp)

        if mrp > 0:

            return round(
                ((mrp - price) / mrp) * 100,
                2
            )

    except (TypeError, ValueError):

        pass

    return None


# ============================================================
# IMAGE
# ============================================================

def get_image(product):

    image = get_value(
        product,
        "image",
        "hiRes",
        default={}
    )

    if not isinstance(image, dict):
        return None

    base_url = image.get("baseUrl")
    extension = image.get("extension")

    if not base_url:
        return None

    if extension:
        return base_url + extension

    return base_url


# ============================================================
# COUPON
# ============================================================

def get_coupon(product):

    fragments = get_value(
        product,
        "coupon",
        "label",
        "fragments",
        default=[]
    )

    if not isinstance(fragments, list):
        return None

    for fragment in fragments:

        if not isinstance(fragment, dict):
            continue

        money = fragment.get("money")

        if isinstance(money, dict):

            amount = money.get("amount")

            if amount is not None:
                return amount

    return None


# ============================================================
# PRODUCT URL
# ============================================================

def get_product_url(product):

    url = product.get("link")

    if not url:
        return None

    return urljoin(
        "https://www.amazon.in",
        url
    )


# ============================================================
# CLEAN PRODUCT
# ============================================================

def clean_product(product):

    asin = product.get("asin")

    if not asin:
        return None

    price = get_value(
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
        price = float(price)
    except (TypeError, ValueError):
        price = None

    try:
        mrp = float(mrp)
    except (TypeError, ValueError):
        mrp = None

    discount = get_discount(product)

    savings = None

    if price is not None and mrp is not None:

        savings = round(
            mrp - price,
            2
        )

    coupon = get_coupon(product)

    try:
        coupon = float(coupon)
    except (TypeError, ValueError):
        coupon = None

    final_price = price

    if price is not None and coupon is not None:

        final_price = max(
            0,
            round(price - coupon, 2)
        )

    deal_type = get_value(
        product,
        "dealDetails",
        "type"
    )

    deal_status = get_value(
        product,
        "dealDetails",
        "state"
    )

    return {

        "ASIN": asin,

        "Product Name": product.get(
            "title"
        ),

        "Deal Price": price,

        "MRP": mrp,

        "Discount %": discount,

        "Savings": savings,

        "Coupon": coupon,

        "Final Price": final_price,

        "Deal Type": deal_type,

        "Deal Status": deal_status,

        "Product URL": get_product_url(
            product
        ),

        "Image URL": get_image(
            product
        ),

        "Collected At": datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    }


# ============================================================
# PROCESS API RESPONSE
# ============================================================

async def process_response(response):

    global api_responses

    if "/d2b/api/v1/products/search" not in response.url:
        return

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

    api_responses += 1

    start_index = data.get(
        "startIndex"
    )

    next_index = data.get(
        "nextIndex"
    )

    print()
    print("=" * 70)

    print(
        f"API RESPONSE #{api_responses}"
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

        asin = product.get("asin")

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

    print("=" * 70)


# ============================================================
# FIND VIEW MORE BUTTON
# ============================================================

async def find_view_more(page):

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

            for i in range(count):

                item = locator.nth(i)

                try:

                    if await item.is_visible():

                        return item

                except Exception:

                    continue

        except Exception:

            continue

    return None


# ============================================================
# CLICK VIEW MORE
# ============================================================

async def click_view_more(page):

    button = await find_view_more(
        page
    )

    if button is None:

        print()
        print(
            "View more deals button not found."
        )

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

        # Wait specifically for Amazon's API
        # response caused by the click.

        async with page.expect_response(
            lambda response:
                "/d2b/api/v1/products/search"
                in response.url
                and response.status == 200,
            timeout=15000
        ) as response_info:

            await button.click()

        response = await response_info.value

        print(
            "✓ New Amazon API response received"
        )

        try:

            data = await response.json()

            amazon_products = data.get(
                "products",
                []
            )

            for product in amazon_products:

                asin = product.get(
                    "asin"
                )

                if asin:
                    products[asin] = product

            print(
                "Products in new response:",
                len(amazon_products)
            )

            print(
                "Total unique:",
                len(products)
            )

        except Exception as error:

            print(
                "Could not process clicked response:",
                error
            )

        return True

    except Exception as error:

        print(
            "Could not click/wait for response:"
        )

        print(error)

        return False


# ============================================================
# SCROLL
# ============================================================

async def scroll_page(page):

    print()
    print("=" * 70)
    print("STARTING DEAL COLLECTION")
    print("=" * 70)

    idle_rounds = 0

    previous_count = len(
        products
    )

    while len(products) < MAX_PRODUCTS:

        # Scroll down

        await page.mouse.wheel(
            0,
            1500
        )

        await page.wait_for_timeout(
            2000
        )

        # Check View More

        clicked = await click_view_more(
            page
        )

        if clicked:

            idle_rounds = 0

            await page.wait_for_timeout(
                2000
            )

            continue

        # Check whether new products appeared

        current_count = len(
            products
        )

        print()
        print(
            f"Progress: "
            f"{current_count}/{MAX_PRODUCTS}"
        )

        if current_count == previous_count:

            idle_rounds += 1

        else:

            idle_rounds = 0

        previous_count = current_count

        # Additional scrolling

        await page.mouse.wheel(
            0,
            1200
        )

        await page.wait_for_timeout(
            1500
        )

        if idle_rounds >= IDLE_LIMIT:

            print()
            print(
                "No new products or View More button."
            )

            print(
                "Stopping collection."
            )

            break


# ============================================================
# SAVE EXCEL
# ============================================================

def save_excel():

    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    rows = []

    for product in products.values():

        cleaned = clean_product(
            product
        )

        if cleaned:

            rows.append(
                cleaned
            )

    if not rows:

        print(
            "No products to save."
        )

        return

    df = pd.DataFrame(
        rows
    )

    # Numeric columns

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

    # Independent discount

    df["Calculated Discount %"] = (
        (
            df["MRP"]
            - df["Deal Price"]
        )
        / df["MRP"]
        * 100
    )

    df["Calculated Discount %"] = (
        df["Calculated Discount %"]
        .round(2)
    )

    # Sort

    df = df.sort_values(
        by="Discount %",
        ascending=False,
        na_position="last"
    )

    # Save

    df.to_excel(
        OUTPUT_FILE,
        index=False,
        engine="openpyxl"
    )

    print()
    print("=" * 70)
    print("V2 EXCEL CREATED")
    print("=" * 70)

    print(
        "Products:",
        len(df)
    )

    print(
        "File:",
        OUTPUT_FILE
    )


# ============================================================
# MAIN
# ============================================================

async def main():

    print()
    print("=" * 70)
    print("AMAZON DEAL COLLECTOR V2")
    print("=" * 70)

    async with async_playwright() as p:

        browser = await p.chromium.launch(
            headless=False
        )

        page = await browser.new_page()

        # Listen to API responses

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

        # Wait for initial requests

        await page.wait_for_timeout(
            10000
        )

        # Start collection

        await scroll_page(
            page
        )

        # Give final responses time

        await page.wait_for_timeout(
            5000
        )

        # Save

        save_excel()

        print()
        print(
            "Closing browser..."
        )

        await browser.close()

        print()
        print("=" * 70)
        print("V2 FINISHED")
        print("=" * 70)


if __name__ == "__main__":

    asyncio.run(
        main()
    )