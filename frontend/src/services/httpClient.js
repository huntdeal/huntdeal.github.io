/**
 * Thin fetch wrapper used by every service module.
 *
 * UI components never call this directly — they call a service, the service
 * decides between mock data and the network. That is the single seam the real
 * backend plugs into.
 */

import { API_BASE_URL, DEFAULT_HEADERS, MOCK_LATENCY } from "./apiConfig.js";

export class ApiError extends Error {
  constructor(message, { status = 0, details = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/** Resolves after the mock latency so loading states are exercised. */
export function delay(ms = MOCK_LATENCY) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Wraps a mock value in a promise that behaves like a network call. */
export async function mockResponse(value, { ms, fail } = {}) {
  await delay(ms);
  if (fail) {
    throw new ApiError(typeof fail === "string" ? fail : "Mock request failed", {
      status: 500,
    });
  }
  return typeof value === "function" ? value() : value;
}

function buildUrl(path, params) {
  const url = new URL(
    `${API_BASE_URL.replace(/\/$/, "")}${path}`,
    API_BASE_URL || window.location.origin,
  );
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
  });
  return url.toString();
}

/**
 * Performs a real HTTP request. Only reached once USE_MOCK_API is false.
 * No authentication token is read from or written to this module — token
 * handling belongs with the backend contract once it exists.
 */
export async function request(
  path,
  { method = "GET", body, params, headers, signal } = {},
) {
  let response;
  try {
    response = await fetch(buildUrl(path, params), {
      method,
      signal,
      headers: { ...DEFAULT_HEADERS, ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "include",
    });
  } catch (cause) {
    throw new ApiError("Network request failed. Check your connection.", {
      details: cause,
    });
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiError(payload?.message ?? `Request failed (${response.status})`, {
      status: response.status,
      details: payload,
    });
  }

  return payload;
}

export const http = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  put: (path, body, options) => request(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) =>
    request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};
