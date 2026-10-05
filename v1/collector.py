import asyncio
import re
from datetime import datetime
from pathlib import Path

import pandas as pd
from playwright.async_api import async_playwright


AMAZON_DEALS_URL = "https://www.amazon.in/deals"

MAX_PRODUCTS = 30

OUTPUT_FILE = Path("output/amazon_deals_v1.xlsx")


products = {}


def get_value(data, *keys, default=None):

    current = data

    for key in keys:

        if not isinstance(current, dict):
            return default

        current = current.get(key)

        if current is None:
            return default

    return current


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

    return base_url + (extension or "")


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
        savings = round(mrp - price, 2)

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
        "Product Name": product.get("title"),
        "Deal Price": price,
        "MRP": mrp,
        "Discount %": discount,
        "Savings": savings,
        "Coupon": coupon,
        "Final Price": final_price,
        "Deal Type": deal_type,
        "Deal Status": deal_status,
        "Product URL": product.get("link"),
        "Image URL": get_image(product),
        "Collected At": datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    }


async def handle_response(response):

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

    if not isinstance(amazon_products, list):
        return

    print()
    print("=" * 60)
    print("AMAZON API RESPONSE")
    print("=" * 60)

    print("Status:", response.status)
    print("Start Index:", data.get("startIndex"))
    print("Next Index:", data.get("nextIndex"))
    print("Products:", len(amazon_products))

    for product in amazon_products:

        asin = product.get("asin")

        if asin:
            products[asin] = product

    print(
        "Unique products collected:",
        len(products)
    )


async def main():

    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    async with async_playwright() as p:

        browser = await p.chromium.launch(
            headless=False
        )

        page = await browser.new_page()

        page.on(
            "response",
            handle_response
        )

        print()
        print("Opening Amazon Deals...")

        await page.goto(
            AMAZON_DEALS_URL,
            wait_until="domcontentloaded",
            timeout=60000
        )

        print("Amazon Deals opened.")

        # Wait for initial API requests
        await page.wait_for_timeout(10000)

        # Small scroll
        await page.mouse.wheel(
            0,
            1500
        )

        await page.wait_for_timeout(5000)

        # --------------------------------------------------
        # V1: collect only first 30 unique products
        # --------------------------------------------------

        if len(products) >= MAX_PRODUCTS:

            print()
            print(
                f"V1 target reached: {MAX_PRODUCTS}"
            )

        else:

            print()
            print(
                "Only",
                len(products),
                "products were captured."
            )

        # --------------------------------------------------
        # Clean data
        # --------------------------------------------------

        rows = []

        for product in list(
            products.values()
        )[:MAX_PRODUCTS]:

            cleaned = clean_product(
                product
            )

            if cleaned:
                rows.append(cleaned)

        # --------------------------------------------------
        # Excel
        # --------------------------------------------------

        if rows:

            df = pd.DataFrame(rows)

            df.to_excel(
                OUTPUT_FILE,
                index=False,
                engine="openpyxl"
            )

            print()
            print("=" * 60)
            print("V1 TEST SUCCESS")
            print("=" * 60)

            print(
                "Products:",
                len(df)
            )

            print(
                "Excel:",
                OUTPUT_FILE
            )

        else:

            print()
            print("=" * 60)
            print("NO PRODUCTS CAPTURED")
            print("=" * 60)

        await browser.close()


if __name__ == "__main__":

    asyncio.run(main())