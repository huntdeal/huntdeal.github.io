/**
 * Mock analytics for the admin panel.
 *
 * DEMO DATA — every figure here is generated from a fixed seed so charts stay
 * stable between renders. None of it represents real user activity. Replace
 * with the backend analytics endpoints (see `src/services/analyticsService.js`).
 */

import { products } from "./products.js";
import { categories } from "./categories.js";

/** Deterministic pseudo-random in [0, 1) — same seed, same series. */
function seeded(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const REFERENCE_DATE = new Date("2026-11-16T00:00:00Z");
const DAY_MS = 86400000;

function dayLabel(date) {
  return date.toISOString().slice(0, 10);
}

/** Daily clicks for the last `days` days, with a weekend dip baked in. */
export function buildDailyClicks(days = 30) {
  const random = seeded(4242);
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(REFERENCE_DATE.getTime() - (days - 1 - index) * DAY_MS);
    const weekend = [0, 6].includes(date.getUTCDay());
    const base = 1180 + index * 14;
    const noise = random() * 420 - 160;
    const clicks = Math.max(240, Math.round(base + noise - (weekend ? 240 : 0)));
    return {
      date: dayLabel(date),
      label: date.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      clicks,
      visitors: Math.round(clicks * (2.4 + random() * 0.5)),
    };
  });
}

export const dailyClicks = buildDailyClicks(30);

export const weeklyClicks = (() => {
  const weeks = [];
  for (let i = 0; i < dailyClicks.length; i += 7) {
    const chunk = dailyClicks.slice(i, i + 7);
    if (!chunk.length) break;
    weeks.push({
      label: `Week ${weeks.length + 1}`,
      clicks: chunk.reduce((sum, day) => sum + day.clicks, 0),
      visitors: chunk.reduce((sum, day) => sum + day.visitors, 0),
    });
  }
  return weeks;
})();

export const monthlyClicks = [
  { label: "Jun", clicks: 24180, visitors: 58120 },
  { label: "Jul", clicks: 26740, visitors: 61480 },
  { label: "Aug", clicks: 25310, visitors: 59210 },
  { label: "Sep", clicks: 31980, visitors: 72340 },
  { label: "Oct", clicks: 38420, visitors: 86110 },
  { label: "Nov", clicks: 34260, visitors: 79840 },
];

/** Clicks aggregated per category, derived from the product catalogue. */
export const categoryPerformance = categories
  .map((category) => {
    const items = products.filter((p) => p.category === category.slug);
    const clicks = items.reduce((sum, p) => sum + p.clicks, 0);
    return {
      slug: category.slug,
      name: category.name,
      color: category.solid,
      products: items.length,
      clicks,
      avgDiscount: items.length
        ? Math.round(items.reduce((s, p) => s + p.discount, 0) / items.length)
        : 0,
    };
  })
  .sort((a, b) => b.clicks - a.clicks);

/** Top clicked products across the catalogue. */
export const topProducts = [...products]
  .sort((a, b) => b.clicks - a.clicks)
  .slice(0, 8)
  .map((product) => ({
    id: product.id,
    name: product.name,
    category: product.categoryName,
    image: product.images[0],
    clicks: product.clicks,
    discount: product.discount,
    rating: product.rating,
    /** Demo conversion proxy — not measured. */
    conversion: Number((2.1 + (product.rating - 4) * 1.4).toFixed(1)),
  }));

/** Clicks vs. discount scatter/bar source for the performance chart. */
export const productPerformance = [...products]
  .sort((a, b) => b.clicks - a.clicks)
  .slice(0, 10)
  .map((product) => ({
    name: product.name.split(" ").slice(0, 3).join(" "),
    fullName: product.name,
    clicks: product.clicks,
    discount: product.discount,
  }));

const totalClicks = products.reduce((sum, product) => sum + product.clicks, 0);
const last7 = dailyClicks.slice(-7).reduce((s, d) => s + d.clicks, 0);
const prev7 = dailyClicks.slice(-14, -7).reduce((s, d) => s + d.clicks, 0);

export const dashboardSummary = {
  totalProducts: products.length,
  activeDeals: products.filter((p) => p.status === "active").length,
  totalClicks,
  trendingProducts: products.filter((p) => p.isTrending).length,
  clicksLast7: last7,
  clicksPrev7: prev7,
  clickChange: prev7 ? Number((((last7 - prev7) / prev7) * 100).toFixed(1)) : 0,
  avgDiscount: Math.round(
    products.reduce((sum, p) => sum + p.discount, 0) / products.length,
  ),
  avgRating: Number(
    (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(2),
  ),
};

export const recentlyAdded = [...products]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 6);

/** Admin bell notifications (mock). */
export const notifications = [
  {
    id: "n1",
    title: "12 deals expired overnight",
    body: "Run a catalogue refresh to clear expired offers.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Click spike on Gaming",
    body: "Gaming clicks are up 34% against last week.",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: "n3",
    title: "New product manager invited",
    body: "Ritika Shah accepted the Product Manager invitation.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "n4",
    title: "Weekly report ready",
    body: "The performance summary for last week is available.",
    time: "2 days ago",
    unread: false,
  },
];
