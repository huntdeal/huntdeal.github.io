import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

import CatalogView from "../components/CatalogView.jsx";
import PageHeader from "../components/PageHeader.jsx";
import EmptyState from "../components/states/EmptyState.jsx";
import { brands } from "../data/brands.js";
import { categories } from "../data/categories.js";
import { useProductQuery } from "../hooks/useProductQuery.js";
import { formatNumber } from "../utils/format.js";

const IDEAS = ["headphones", "air fryer", "laptop", "serum", "keyboard", "power bank"];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const term = searchParams.get("q") ?? "";
  const query = useProductQuery();

  const hasTerm = term.trim().length > 0;

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Search" }]}
        eyebrow={
          <>
            <SearchIcon size={14} aria-hidden="true" />
            Search
          </>
        }
        title={hasTerm ? `Results for “${term}”` : "Search every deal"}
        description={
          hasTerm
            ? "Matching on product name, brand, category and description."
            : "Search across product names, brands and categories. Your search stays in the address bar, so results can be shared."
        }
        meta={
          hasTerm ? (
            <span>
              {query.loading
                ? "Searching…"
                : `${formatNumber(query.total)} ${
                    query.total === 1 ? "result" : "results"
                  }`}
            </span>
          ) : null
        }
      />

      <section className="section">
        <div className="shell">
          <CatalogView
            query={query}
            brands={brands.map((brand) => brand.name)}
            searchPlaceholder="Search products, brands or categories"
            emptyState={{
              title: hasTerm
                ? `No results for “${term}”`
                : "No deals match those filters",
              message: hasTerm
                ? "Check the spelling, try a shorter term, or browse by category instead."
                : "Try a search term, or clear the filters to see everything.",
              action: { label: "Browse all deals", to: "/deals" },
              secondaryAction: { label: "Clear filters", onClick: query.clearFilters },
            }}
            footerSlot={
              !hasTerm && !query.loading ? (
                <div className="card card--pad" style={{ marginTop: "var(--sp-10)" }}>
                  <h2 className="panel-title">Not sure what to search?</h2>
                  <p className="text-sm text-muted" style={{ marginTop: 6 }}>
                    Start with one of these, or jump into a category.
                  </p>
                  <div className="chip-row" style={{ marginTop: "var(--sp-4)" }}>
                    {IDEAS.map((idea) => (
                      <Link
                        key={idea}
                        className="chip"
                        to={`/search?q=${encodeURIComponent(idea)}`}
                      >
                        {idea}
                      </Link>
                    ))}
                  </div>
                  <div className="chip-row" style={{ marginTop: "var(--sp-3)" }}>
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        className="chip"
                        to={`/categories/${category.slug}`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null
            }
          />
        </div>
      </section>
    </>
  );
}

/** Exported for reuse if a route ever needs the bare no-results panel. */
export function SearchEmpty({ term }) {
  return (
    <EmptyState
      icon={SearchIcon}
      title={`No results for “${term}”`}
      message="Try a different spelling or a broader term."
      action={{ label: "Browse all deals", to: "/deals" }}
    />
  );
}
