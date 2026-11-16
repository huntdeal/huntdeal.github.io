/**
 * Product service — the only module the UI goes through for product data.
 *
 * Today every function resolves from the mock catalogue. When the backend
 * arrives, each function keeps its signature and return shape; only the body
 * switches to `http.*` against the matching entry in ENDPOINTS.
 */

import { products as seedProducts, buildAffiliateUrl } from "../data/products.js";
import { categoryBySlug } from "../data/categories.js";
import { PAGE_SIZE, PRICE_BUCKETS, STORAGE_KEYS } from "../utils/constants.js";
import { discountPercent, slugify } from "../utils/format.js";
import { placeholderGallery } from "../utils/placeholder.js";
import { mockResponse, ApiError } from "./httpClient.js";
import { USE_MOCK_API } from "./apiConfig.js";

/* ------------------------------------------------------------------ *
 * Mock store — seeded from data, persisted so admin edits survive a
 * refresh. Replaced wholesale by the backend.
 * ------------------------------------------------------------------ */

function readStore() {
  if (typeof window === "undefined") return [...seedProducts];
  try {
    const saved = window.localStorage.getItem(STORAGE_KEYS.adminProducts);
    if (!saved) return [...seedProducts];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...seedProducts];
  } catch {
    return [...seedProducts];
  }
}

let store = readStore();
const listeners = new Set();

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEYS.adminProducts,
      JSON.stringify(store),
    );
  } catch {
    /* storage full or blocked — mock data simply stops persisting */
  }
  listeners.forEach((listener) => listener(store));
}

/** Subscribe to mock-store changes (used by admin screens). */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Restores the catalogue to its shipped demo state. */
export function resetMockCatalogue() {
  store = [...seedProducts];
  persist();
  return mockResponse(store.length);
}

/* ------------------------------------------------------------------ *
 * Query helpers (pure, exported for tests and for the search page)
 * ------------------------------------------------------------------ */

const SORTERS = {
  popular: (a, b) => b.popularity - a.popularity,
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  discount: (a, b) => b.discount - a.discount,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
};

function matchesSearch(product, term) {
  if (!term) return true;
  const needle = term.trim().toLowerCase();
  if (!needle) return true;
  return (
    product.name.toLowerCase().includes(needle) ||
    product.brand.toLowerCase().includes(needle) ||
    product.categoryName.toLowerCase().includes(needle) ||
    product.category.includes(needle) ||
    product.description.toLowerCase().includes(needle)
  );
}

function matchesPrice(product, buckets) {
  if (!buckets?.length) return true;
  return buckets.some((value) => {
    const bucket = PRICE_BUCKETS.find((b) => b.value === value);
    if (!bucket) return true;
    return product.price >= bucket.min && product.price < bucket.max;
  });
}

/** Applies every filter; used by both the public pages and the admin table. */
export function filterProducts(items, query = {}) {
  const {
    search = "",
    categories = [],
    brands = [],
    priceRanges = [],
    minDiscount = 0,
    minRating = 0,
    status = null,
  } = query;

  return items.filter((product) => {
    if (!matchesSearch(product, search)) return false;
    if (categories.length && !categories.includes(product.category)) return false;
    if (brands.length && !brands.includes(product.brand)) return false;
    if (!matchesPrice(product, priceRanges)) return false;
    if (minDiscount && product.discount < Number(minDiscount)) return false;
    if (minRating && product.rating < Number(minRating)) return false;
    if (status && product.status !== status) return false;
    return true;
  });
}

export function sortProducts(items, sort = "popular") {
  return [...items].sort(SORTERS[sort] ?? SORTERS.popular);
}

/** Counts available for each filter option, so empty options can be disabled. */
export function buildFacets(items) {
  const categoryCounts = {};
  const brandCounts = {};
  items.forEach((product) => {
    categoryCounts[product.category] = (categoryCounts[product.category] ?? 0) + 1;
    brandCounts[product.brand] = (brandCounts[product.brand] ?? 0) + 1;
  });
  return {
    categories: categoryCounts,
    brands: brandCounts,
    priceBounds: items.length
      ? {
          min: Math.min(...items.map((p) => p.price)),
          max: Math.max(...items.map((p) => p.price)),
        }
      : { min: 0, max: 0 },
  };
}

/* ------------------------------------------------------------------ *
 * Public read API
 * ------------------------------------------------------------------ */

/**
 * @returns {Promise<{items: object[], total: number, page: number,
 *   pageCount: number, facets: object}>}
 */
export async function listProducts(query = {}) {
  if (!USE_MOCK_API) {
    // TODO(backend): GET ENDPOINTS.products.list with the same query shape.
    throw new ApiError("Live product API is not configured yet.", { status: 501 });
  }

  const { page = 1, pageSize = PAGE_SIZE, sort = "popular" } = query;
  const visible = query.includeInactive
    ? store
    : store.filter((product) => product.status === "active");

  const filtered = filterProducts(visible, query);
  const sorted = sortProducts(filtered, sort);
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;

  return mockResponse({
    items: sorted.slice(start, start + pageSize),
    total: sorted.length,
    page: safePage,
    pageCount,
    pageSize,
    facets: buildFacets(visible),
  });
}

export async function getProduct(id) {
  if (!USE_MOCK_API) {
    throw new ApiError("Live product API is not configured yet.", { status: 501 });
  }
  const product =
    store.find((item) => item.id === id) ||
    store.find((item) => String(item.numericId) === String(id));

  if (!product) {
    throw new ApiError("We could not find that product.", { status: 404 });
  }
  return mockResponse(product);
}

export async function getRelatedProducts(id, limit = 4) {
  const product = store.find((item) => item.id === id);
  if (!product) return mockResponse([]);

  const sameCategory = store.filter(
    (item) =>
      item.id !== id && item.category === product.category && item.status === "active",
  );
  const fallback = store.filter(
    (item) => item.id !== id && item.category !== product.category,
  );

  return mockResponse(
    [...sortProducts(sameCategory, "popular"), ...sortProducts(fallback, "discount")]
      .slice(0, limit),
  );
}

export async function getFeaturedProducts(limit = 8) {
  const featured = store.filter((p) => p.isFeatured && p.status === "active");
  const filler = store.filter((p) => !p.isFeatured && p.status === "active");
  return mockResponse(
    [...sortProducts(featured, "discount"), ...sortProducts(filler, "popular")].slice(
      0,
      limit,
    ),
  );
}

export async function getTrendingProducts(limit = 8) {
  const trending = store.filter((p) => p.isTrending && p.status === "active");
  const filler = store.filter((p) => !p.isTrending && p.status === "active");
  return mockResponse(
    [...sortProducts(trending, "popular"), ...sortProducts(filler, "popular")]
      .slice(0, limit)
      .map((product, index) => ({ ...product, rank: index + 1 })),
  );
}

export async function getTopDiscounts(limit = 6) {
  return mockResponse(
    sortProducts(
      store.filter((p) => p.status === "active"),
      "discount",
    ).slice(0, limit),
  );
}

export async function getRecentProducts(limit = 8) {
  return mockResponse(
    sortProducts(
      store.filter((p) => p.status === "active"),
      "newest",
    ).slice(0, limit),
  );
}

export async function getTodaysDeals(limit = 8) {
  return mockResponse(
    sortProducts(
      store.filter((p) => p.status === "active" && p.discount >= 40),
      "discount",
    ).slice(0, limit),
  );
}

export async function searchProducts(term, query = {}) {
  return listProducts({ ...query, search: term });
}

export async function getProductsByIds(ids = []) {
  const wanted = new Set(ids);
  return mockResponse(store.filter((product) => wanted.has(product.id)));
}

/** Site-wide counters used by the hero and the about page. */
export async function getCatalogueStats() {
  const active = store.filter((p) => p.status === "active");
  return mockResponse({
    products: active.length,
    categories: new Set(active.map((p) => p.category)).size,
    brands: new Set(active.map((p) => p.brand)).size,
    avgDiscount: active.length
      ? Math.round(active.reduce((sum, p) => sum + p.discount, 0) / active.length)
      : 0,
    maxDiscount: active.length ? Math.max(...active.map((p) => p.discount)) : 0,
  });
}

/**
 * Records an affiliate click. In mock mode this only bumps a local counter so
 * the admin charts have something to move; it is not real analytics.
 */
export async function trackAffiliateClick(id) {
  store = store.map((product) =>
    product.id === id ? { ...product, clicks: product.clicks + 1 } : product,
  );
  persist();
  return mockResponse({ ok: true });
}

/* ------------------------------------------------------------------ *
 * Admin write API (mock CRUD)
 * ------------------------------------------------------------------ */

/** Normalises form input into a catalogue record. */
function toProductRecord(input, existing) {
  const name = input.name?.trim() ?? "";
  const price = Number(input.price) || 0;
  const originalPrice = Number(input.originalPrice) || price;
  const category = input.category || "electronics";
  const slug = existing?.slug ?? slugify(name);
  const now = new Date().toISOString();

  return {
    ...(existing ?? {}),
    id: existing?.id ?? slug,
    slug,
    numericId: existing?.numericId ?? store.length + 1,
    name,
    brand: input.brand?.trim() || "HuntDeal",
    category,
    categoryName: categoryBySlug[category]?.name ?? category,
    description: input.description?.trim() ?? "",
    features: Array.isArray(input.features)
      ? input.features.filter(Boolean)
      : String(input.features ?? "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
    specs: existing?.specs ?? {},
    price,
    originalPrice,
    discount: input.discount
      ? Number(input.discount)
      : discountPercent(price, originalPrice),
    savings: Math.max(0, originalPrice - price),
    rating: Number(input.rating) || 0,
    reviewCount: existing?.reviewCount ?? 0,
    clicks: existing?.clicks ?? 0,
    popularity: existing?.popularity ?? 0,
    imageUrl: input.imageUrl?.trim() || null,
    images:
      input.imageUrl?.trim()
        ? [input.imageUrl.trim(), ...(existing?.images ?? []).slice(1)]
        : existing?.images ??
          placeholderGallery(slug, categoryBySlug[category]?.name ?? "", category),
    affiliateUrl: input.affiliateUrl?.trim() || buildAffiliateUrl(name),
    availability: existing?.availability ?? "Listed on Amazon (demo data)",
    isFeatured: Boolean(input.isFeatured),
    isTrending: Boolean(input.isTrending),
    status: input.status ?? "draft",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export async function createProduct(input) {
  const record = toProductRecord(input);
  if (!record.name) {
    throw new ApiError("Product name is required.", { status: 422 });
  }
  if (store.some((product) => product.id === record.id)) {
    record.id = `${record.id}-${Date.now().toString(36)}`;
    record.slug = record.id;
  }
  store = [record, ...store];
  persist();
  return mockResponse(record);
}

export async function updateProduct(id, input) {
  const existing = store.find((product) => product.id === id);
  if (!existing) {
    throw new ApiError("That product no longer exists.", { status: 404 });
  }
  const record = toProductRecord(input, existing);
  store = store.map((product) => (product.id === id ? record : product));
  persist();
  return mockResponse(record);
}

export async function deleteProduct(id) {
  const exists = store.some((product) => product.id === id);
  if (!exists) {
    throw new ApiError("That product no longer exists.", { status: 404 });
  }
  store = store.filter((product) => product.id !== id);
  persist();
  return mockResponse({ ok: true, id });
}

export async function setProductStatus(id, status) {
  store = store.map((product) =>
    product.id === id
      ? { ...product, status, updatedAt: new Date().toISOString() }
      : product,
  );
  persist();
  return mockResponse(store.find((product) => product.id === id));
}

/** Synchronous snapshot for admin screens that need data without a round trip. */
export function getStoreSnapshot() {
  return store;
}
