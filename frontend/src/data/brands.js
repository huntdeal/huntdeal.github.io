/**
 * Brand index (mock).
 *
 * DEMO DATA — these are fictional house brands invented for the frontend so
 * that demo prices and ratings are never attached to a real manufacturer.
 * Replace with the brand list from the backend feed.
 */

import { products } from "./products.js";

const BRAND_BLURBS = {
  Aurex: "Audio — headphones, speakers, soundbars",
  Nexio: "Phones, tablets and everyday carry",
  Corewave: "Computing, displays and storage",
  "Pulsar Labs": "Gaming peripherals and rigs",
  Kraftline: "Home, kitchen and organisation",
  "Lumen & Co": "Skincare and daily routine",
  Mira: "Personal care devices",
  Northbound: "Apparel, footwear and travel",
  Volt9: "Power, cables and connectivity",
  "Zenith Optics": "Cameras and optics",
};

/** Brands with their live deal count and best available discount. */
export const brands = Object.entries(
  products.reduce((acc, product) => {
    const entry = acc[product.brand] ?? { count: 0, bestDiscount: 0 };
    entry.count += 1;
    entry.bestDiscount = Math.max(entry.bestDiscount, product.discount);
    acc[product.brand] = entry;
    return acc;
  }, {}),
)
  .map(([name, stats]) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    blurb: BRAND_BLURBS[name] ?? "Featured brand",
    dealCount: stats.count,
    bestDiscount: stats.bestDiscount,
  }))
  .sort((a, b) => b.dealCount - a.dealCount || a.name.localeCompare(b.name));
