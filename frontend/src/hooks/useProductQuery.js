import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { listProducts } from "../services/productService.js";
import { PAGE_SIZE } from "../utils/constants.js";
import { useAsync } from "./useAsync.js";
import { useDebouncedValue } from "./useDebouncedValue.js";

/**
 * URL keys. Filters live in the query string so a filtered view can be
 * shared, bookmarked and survives a browser refresh on a nested route.
 */
const KEYS = {
  search: "q",
  sort: "sort",
  page: "page",
  categories: "cat",
  brands: "brand",
  priceRanges: "price",
  minDiscount: "disc",
  minRating: "rating",
};

function readList(params, key) {
  const value = params.get(key);
  return value ? value.split(",").filter(Boolean) : [];
}

/**
 * Shared catalogue query state for Deals, Category and Search pages.
 *
 * @param {object} [options]
 * @param {string[]} [options.lockedCategories] Category slugs forced on
 *   (used by /categories/:slug, where the category is part of the route).
 * @param {number} [options.pageSize]
 */
export function useProductQuery({ lockedCategories, pageSize = PAGE_SIZE } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(
    () => ({
      search: searchParams.get(KEYS.search) ?? "",
      sort: searchParams.get(KEYS.sort) ?? "popular",
      page: Number(searchParams.get(KEYS.page) ?? 1) || 1,
      categories: lockedCategories ?? readList(searchParams, KEYS.categories),
      brands: readList(searchParams, KEYS.brands),
      priceRanges: readList(searchParams, KEYS.priceRanges),
      minDiscount: Number(searchParams.get(KEYS.minDiscount) ?? 0) || 0,
      minRating: Number(searchParams.get(KEYS.minRating) ?? 0) || 0,
    }),
    [searchParams, lockedCategories],
  );

  /** Debounced so typing in the search box does not fire a request per key. */
  const debouncedSearch = useDebouncedValue(state.search, 260);

  const query = useMemo(
    () => ({ ...state, search: debouncedSearch, pageSize }),
    [state, debouncedSearch, pageSize],
  );

  const { data, loading, error, reload } = useAsync(
    () => listProducts(query),
    [JSON.stringify(query)],
  );

  /** Patch one or more values; any change except `page` resets to page 1. */
  const update = useCallback(
    (patch, { resetPage = true } = {}) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          Object.entries(patch).forEach(([field, value]) => {
            const key = KEYS[field] ?? field;
            const isEmpty =
              value === "" ||
              value === null ||
              value === undefined ||
              value === 0 ||
              (Array.isArray(value) && value.length === 0);

            if (isEmpty) next.delete(key);
            else next.set(key, Array.isArray(value) ? value.join(",") : String(value));
          });
          if (resetPage && !("page" in patch)) next.delete(KEYS.page);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  /** Adds/removes one value in a multi-select filter. */
  const toggleInList = useCallback(
    (field, value) => {
      const current = state[field] ?? [];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      update({ [field]: next });
    },
    [state, update],
  );

  const clearFilters = useCallback(() => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams();
        const keep = current.get(KEYS.search);
        if (keep) next.set(KEYS.search, keep);
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const activeFilterCount =
    (lockedCategories ? 0 : state.categories.length) +
    state.brands.length +
    state.priceRanges.length +
    (state.minDiscount ? 1 : 0) +
    (state.minRating ? 1 : 0);

  return {
    state,
    query,
    update,
    toggleInList,
    clearFilters,
    activeFilterCount,
    results: data?.items ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? state.page,
    pageCount: data?.pageCount ?? 1,
    facets: data?.facets ?? { categories: {}, brands: {} },
    loading,
    error,
    reload,
  };
}
