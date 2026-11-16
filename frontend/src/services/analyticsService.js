/**
 * Analytics service (admin).
 *
 * All figures returned here are clearly-labelled mock analytics. Nothing is
 * measured from real visitors. Swap each function for the matching
 * ENDPOINTS.analytics call once the backend exposes it.
 */

import {
  dailyClicks,
  weeklyClicks,
  monthlyClicks,
  categoryPerformance,
  topProducts,
  productPerformance,
  dashboardSummary,
  recentlyAdded,
  notifications,
} from "../data/analytics.js";
import { mockResponse } from "./httpClient.js";
import { getStoreSnapshot } from "./productService.js";

/** Flag the UI reads to label every chart as demo data. */
export const ANALYTICS_IS_MOCK = true;

export async function getDashboardSummary() {
  const store = getStoreSnapshot();
  return mockResponse({
    ...dashboardSummary,
    totalProducts: store.length,
    activeDeals: store.filter((product) => product.status === "active").length,
    trendingProducts: store.filter((product) => product.isTrending).length,
    totalClicks: store.reduce((sum, product) => sum + product.clicks, 0),
  });
}

/** @param {"daily"|"weekly"|"monthly"} range */
export async function getClickSeries(range = "daily") {
  if (range === "weekly") return mockResponse(weeklyClicks);
  if (range === "monthly") return mockResponse(monthlyClicks);
  return mockResponse(dailyClicks);
}

export async function getClickTotals() {
  const today = dailyClicks.at(-1)?.clicks ?? 0;
  const week = dailyClicks.slice(-7).reduce((sum, day) => sum + day.clicks, 0);
  const month = dailyClicks.reduce((sum, day) => sum + day.clicks, 0);
  const prevWeek = dailyClicks
    .slice(-14, -7)
    .reduce((sum, day) => sum + day.clicks, 0);

  return mockResponse({
    today,
    week,
    month,
    allTime: getStoreSnapshot().reduce((sum, p) => sum + p.clicks, 0),
    weekChange: prevWeek
      ? Number((((week - prevWeek) / prevWeek) * 100).toFixed(1))
      : 0,
  });
}

export async function getCategoryPerformance() {
  return mockResponse(categoryPerformance);
}

export async function getTopProducts(limit = 8) {
  return mockResponse(topProducts.slice(0, limit));
}

export async function getProductPerformance(limit = 10) {
  return mockResponse(productPerformance.slice(0, limit));
}

export async function getRecentlyAdded(limit = 6) {
  return mockResponse(
    [...getStoreSnapshot()]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit),
  );
}

export async function getNotifications() {
  return mockResponse(notifications);
}

export { recentlyAdded };
