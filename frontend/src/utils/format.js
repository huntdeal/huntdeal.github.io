/**
 * Formatting helpers. All money in the UI is Indian Rupees because HuntDeal
 * tracks Amazon.in deals; change CURRENCY/LOCALE here when that changes.
 */

export const LOCALE = "en-IN";
export const CURRENCY = "INR";

const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat(LOCALE);

const compactFormatter = new Intl.NumberFormat(LOCALE, {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** 2499 -> "₹2,499" */
export function formatPrice(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }
  return currencyFormatter.format(Number(value));
}

/** 12480 -> "12,480" */
export function formatNumber(value) {
  if (value === null || value === undefined) return "—";
  return numberFormatter.format(Number(value));
}

/** 12480 -> "12.5K" */
export function formatCompact(value) {
  if (value === null || value === undefined) return "—";
  return compactFormatter.format(Number(value));
}

/** 0.4231 -> "42%" (expects a ratio) */
export function formatPercent(ratio, digits = 0) {
  return `${(Number(ratio) * 100).toFixed(digits)}%`;
}

/** Discount percentage from a price pair, rounded to a whole number. */
export function discountPercent(price, originalPrice) {
  const now = Number(price);
  const was = Number(originalPrice);
  if (!was || was <= now) return 0;
  return Math.round(((was - now) / was) * 100);
}

/** "2026-02-11" -> "11 Feb 2026" */
export function formatDate(value, opts) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...opts,
  }).format(date);
}

/** Relative age in plain words: "3 days ago". */
export function timeAgo(value, now = Date.now()) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  const diffMs = now - date.getTime();
  if (Number.isNaN(diffMs)) return "—";

  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;

  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  const years = Math.round(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

/** "Home & Kitchen" -> "home-kitchen" */
export function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Initials for avatars: "Divya Chouhan" -> "DC" */
export function initials(name = "") {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Trim a string to a word boundary with an ellipsis. */
export function truncate(text = "", max = 120) {
  const value = String(text);
  if (value.length <= max) return value;
  return `${value.slice(0, value.lastIndexOf(" ", max))}…`;
}

/** Rough reading time for article bodies. */
export function readingTime(text = "") {
  const words = String(text).trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
