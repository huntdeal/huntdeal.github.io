/**
 * API configuration.
 *
 * The frontend currently runs entirely on mock data. Nothing here points at a
 * real server, and no endpoint below has been invented as fact — these are the
 * named integration slots to be confirmed against the real backend.
 *
 * To switch the app onto the real API:
 *   1. Put the base URL in `.env` as VITE_API_BASE_URL.
 *   2. Set VITE_USE_MOCK_API=false.
 *   3. Confirm/adjust the paths in ENDPOINTS to match the backend routes.
 * No UI component needs to change — only the service modules.
 */

const env = import.meta.env ?? {};

export const API_BASE_URL = env.VITE_API_BASE_URL ?? "";

/**
 * Mock mode is ON unless a base URL is configured and mocks are explicitly
 * disabled, so the app can never silently call a server that does not exist.
 */
export const USE_MOCK_API =
  env.VITE_USE_MOCK_API === "false" ? !!API_BASE_URL : true;

/** Simulated latency (ms) for mock calls, so loading states are real. */
export const MOCK_LATENCY = 260;

/**
 * Endpoint slots. Paths are placeholders to be reconciled with the backend
 * once its route list is available — they are not live routes today.
 */
export const ENDPOINTS = {
  products: {
    list: "/products",
    detail: (id) => `/products/${id}`,
    create: "/products",
    update: (id) => `/products/${id}`,
    remove: (id) => `/products/${id}`,
    search: "/products/search",
    trending: "/products/trending",
    featured: "/products/featured",
    related: (id) => `/products/${id}/related`,
    trackClick: (id) => `/products/${id}/clicks`,
  },
  categories: {
    list: "/categories",
    detail: (slug) => `/categories/${slug}`,
    products: (slug) => `/categories/${slug}/products`,
  },
  blog: {
    list: "/posts",
    detail: (slug) => `/posts/${slug}`,
  },
  analytics: {
    summary: "/analytics/summary",
    clicks: "/analytics/clicks",
    categories: "/analytics/categories",
    topProducts: "/analytics/top-products",
  },
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    session: "/auth/session",
  },
  users: {
    list: "/users",
    create: "/users",
    update: (id) => `/users/${id}`,
    remove: (id) => `/users/${id}`,
  },
  settings: {
    get: "/settings",
    update: "/settings",
  },
  contact: "/contact",
  newsletter: "/newsletter/subscribe",
};

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
