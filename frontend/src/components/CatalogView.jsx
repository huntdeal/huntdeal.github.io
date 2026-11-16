import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import FilterPanel from "./FilterPanel.jsx";
import Pagination from "./Pagination.jsx";
import ProductGrid from "./ProductGrid.jsx";
import SearchBar from "./SearchBar.jsx";
import SortDropdown from "./SortDropdown.jsx";
import { formatNumber } from "../utils/format.js";

/**
 * The shared listing experience: search + filters + sort + grid + pagination.
 * Used by Today's Deals, Category details and Search, so the three stay
 * consistent and only differ in their headers and copy.
 */
export default function CatalogView({
  query,
  searchPlaceholder = "Search within these deals",
  brands = [],
  hideCategories = false,
  emptyState,
  footerSlot,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const {
    state,
    facets,
    update,
    toggleInList,
    clearFilters,
    activeFilterCount,
    results,
    total,
    page,
    pageCount,
    loading,
    error,
    reload,
  } = query;

  const from = total === 0 ? 0 : (page - 1) * (query.query.pageSize ?? 12) + 1;
  const to = Math.min(total, from + results.length - 1);

  return (
    <div className="catalog-layout">
      <div
        className="catalog-layout__aside"
        data-collapsed={!filtersOpen}
      >
        <FilterPanel
          state={state}
          facets={facets}
          brands={brands}
          hideCategories={hideCategories}
          activeCount={activeFilterCount}
          onToggle={toggleInList}
          onUpdate={update}
          onClear={clearFilters}
          onClose={filtersOpen ? () => setFiltersOpen(false) : undefined}
        />
      </div>

      <div>
        <div className="toolbar">
          <div className="toolbar__search">
            <SearchBar
              value={state.search}
              onChange={(value) => update({ search: value })}
              onSubmit={(value) => update({ search: value })}
              placeholder={searchPlaceholder}
            />
          </div>

          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            data-filter-toggle
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="badge badge--brand">{activeFilterCount}</span>
            )}
          </button>

          <SortDropdown
            value={state.sort}
            onChange={(value) => update({ sort: value })}
          />
        </div>

        <div className="result-bar">
          <span>
            {loading
              ? "Loading deals…"
              : total === 0
                ? "No deals found"
                : `Showing ${from}–${to} of ${formatNumber(total)} deals`}
          </span>
          {activeFilterCount > 0 && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </div>

        <ProductGrid
          products={results}
          loading={loading}
          error={error}
          onRetry={reload}
          empty={emptyState}
        />

        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={(next) => update({ page: next }, { resetPage: false })}
        />

        {footerSlot}
      </div>
    </div>
  );
}
