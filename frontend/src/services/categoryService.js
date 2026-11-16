/** Category service. Mock-backed; mirrors ENDPOINTS.categories. */

import { categories, categoryBySlug } from "../data/categories.js";
import { ApiError, mockResponse } from "./httpClient.js";
import { getStoreSnapshot, listProducts } from "./productService.js";

/** Categories with their live deal count and best discount. */
export async function listCategories() {
  const products = getStoreSnapshot().filter((p) => p.status === "active");

  return mockResponse(
    categories.map((category) => {
      const items = products.filter((p) => p.category === category.slug);
      return {
        ...category,
        dealCount: items.length,
        bestDiscount: items.length
          ? Math.max(...items.map((item) => item.discount))
          : 0,
        startingPrice: items.length
          ? Math.min(...items.map((item) => item.price))
          : null,
      };
    }),
  );
}

export async function getCategory(slug) {
  const category = categoryBySlug[slug];
  if (!category) {
    throw new ApiError("Unknown category.", { status: 404 });
  }
  const items = getStoreSnapshot().filter(
    (product) => product.category === slug && product.status === "active",
  );

  return mockResponse({
    ...category,
    dealCount: items.length,
    bestDiscount: items.length ? Math.max(...items.map((i) => i.discount)) : 0,
    brands: [...new Set(items.map((item) => item.brand))].sort(),
  });
}

/** Paged products inside one category — same shape as listProducts. */
export async function getCategoryProducts(slug, query = {}) {
  return listProducts({ ...query, categories: [slug] });
}
