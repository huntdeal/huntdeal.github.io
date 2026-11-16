import { SlidersHorizontal, X } from "lucide-react";

import { categories } from "../data/categories.js";
import {
  DISCOUNT_BUCKETS,
  PRICE_BUCKETS,
  RATING_BUCKETS,
} from "../utils/constants.js";

/**
 * Filter sidebar shared by Deals, Category and Search pages.
 * State lives in the URL via useProductQuery; this component is presentational.
 */
export default function FilterPanel({
  state,
  facets,
  onToggle,
  onUpdate,
  onClear,
  activeCount = 0,
  hideCategories = false,
  brands = [],
  onClose,
}) {
  return (
    <aside className="filters" aria-label="Filter deals">
      <div className="filters__head">
        <span className="row" style={{ gap: "var(--sp-2)" }}>
          <SlidersHorizontal size={16} aria-hidden="true" />
          <span className="panel-title">Filters</span>
          {activeCount > 0 && <span className="badge badge--brand">{activeCount}</span>}
        </span>

        <span className="row" style={{ gap: "var(--sp-1)" }}>
          {activeCount > 0 && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={onClear}>
              Clear
            </button>
          )}
          {onClose && (
            <button
              type="button"
              className="icon-btn"
              onClick={onClose}
              aria-label="Hide filters"
            >
              <X size={16} />
            </button>
          )}
        </span>
      </div>

      {!hideCategories && (
        <fieldset className="filters__group">
          <legend className="filters__legend">Category</legend>
          <div className="filters__list">
            {categories.map((category) => {
              const count = facets?.categories?.[category.slug] ?? 0;
              return (
                <label className="filters__option" key={category.slug}>
                  <span className="checkbox">
                    <input
                      type="checkbox"
                      checked={state.categories.includes(category.slug)}
                      disabled={count === 0}
                      onChange={() => onToggle("categories", category.slug)}
                    />
                    <span>{category.name}</span>
                  </span>
                  <span className="filters__option-count">{count}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {brands.length > 0 && (
        <fieldset className="filters__group">
          <legend className="filters__legend">Brand</legend>
          <div className="filters__list">
            {brands.map((brand) => {
              const count = facets?.brands?.[brand] ?? 0;
              return (
                <label className="filters__option" key={brand}>
                  <span className="checkbox">
                    <input
                      type="checkbox"
                      checked={state.brands.includes(brand)}
                      disabled={count === 0}
                      onChange={() => onToggle("brands", brand)}
                    />
                    <span>{brand}</span>
                  </span>
                  <span className="filters__option-count">{count}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <fieldset className="filters__group">
        <legend className="filters__legend">Price</legend>
        <div className="filters__list">
          {PRICE_BUCKETS.map((bucket) => (
            <label className="checkbox" key={bucket.value}>
              <input
                type="checkbox"
                checked={state.priceRanges.includes(bucket.value)}
                onChange={() => onToggle("priceRanges", bucket.value)}
              />
              <span>{bucket.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend className="filters__legend">Discount</legend>
        <div className="filters__list">
          {DISCOUNT_BUCKETS.map((bucket) => (
            <label className="radio" key={bucket.value}>
              <input
                type="radio"
                name="discount"
                checked={String(state.minDiscount) === bucket.value}
                onChange={() => onUpdate({ minDiscount: Number(bucket.value) })}
              />
              <span>{bucket.label}</span>
            </label>
          ))}
          <label className="radio">
            <input
              type="radio"
              name="discount"
              checked={!state.minDiscount}
              onChange={() => onUpdate({ minDiscount: 0 })}
            />
            <span>Any discount</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend className="filters__legend">Customer rating</legend>
        <div className="filters__list">
          {RATING_BUCKETS.map((bucket) => (
            <label className="radio" key={bucket.value}>
              <input
                type="radio"
                name="rating"
                checked={String(state.minRating) === bucket.value}
                onChange={() => onUpdate({ minRating: Number(bucket.value) })}
              />
              <span>{bucket.label}</span>
            </label>
          ))}
          <label className="radio">
            <input
              type="radio"
              name="rating"
              checked={!state.minRating}
              onChange={() => onUpdate({ minRating: 0 })}
            />
            <span>Any rating</span>
          </label>
        </div>
      </fieldset>
    </aside>
  );
}
