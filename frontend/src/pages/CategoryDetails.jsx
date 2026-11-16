import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PackageSearch } from "lucide-react";

import AffiliateDisclosure from "../components/AffiliateDisclosure.jsx";
import CatalogView from "../components/CatalogView.jsx";
import PageHeader from "../components/PageHeader.jsx";
import EmptyState from "../components/states/EmptyState.jsx";
import LoadingState from "../components/states/LoadingState.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { useProductQuery } from "../hooks/useProductQuery.js";
import { getCategory } from "../services/categoryService.js";

export default function CategoryDetails() {
  const { categorySlug } = useParams();

  const category = useAsync(() => getCategory(categorySlug), [categorySlug]);

  // The category is part of the route, so it is locked rather than filterable.
  const lockedCategories = useMemo(() => [categorySlug], [categorySlug]);
  const query = useProductQuery({ lockedCategories });

  if (category.loading) {
    return (
      <section className="section">
        <div className="shell">
          <LoadingState label="Loading category…" />
        </div>
      </section>
    );
  }

  if (category.error) {
    return (
      <section className="section">
        <div className="shell">
          <EmptyState
            icon={PackageSearch}
            title="That category does not exist"
            message={`We do not have a category at "/categories/${categorySlug}". It may have been renamed.`}
            action={{ label: "All categories", to: "/categories" }}
            secondaryAction={{ label: "Browse all deals", to: "/deals" }}
          />
        </div>
      </section>
    );
  }

  const data = category.data;

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Categories", to: "/categories" },
          { label: data.name },
        ]}
        eyebrow={data.tagline}
        title={`${data.name} deals`}
        description={data.description}
        meta={
          <>
            <span>{data.dealCount} deals in this category</span>
            {data.bestDiscount > 0 && (
              <>
                <span>·</span>
                <span>Up to {data.bestDiscount}% off</span>
              </>
            )}
            {data.brands.length > 0 && (
              <>
                <span>·</span>
                <span>{data.brands.length} brands</span>
              </>
            )}
          </>
        }
      />

      <section className="section">
        <div className="shell">
          <CatalogView
            query={query}
            hideCategories
            brands={data.brands}
            searchPlaceholder={`Search within ${data.name}`}
            emptyState={{
              title: `No ${data.name} deals match those filters`,
              message:
                "This category has deals, but none that fit every filter at once. Try clearing the price or discount filter.",
              action: { label: "Clear filters", onClick: query.clearFilters },
              secondaryAction: { label: "All categories", to: "/categories" },
            }}
            footerSlot={
              <div style={{ marginTop: "var(--sp-10)" }}>
                <AffiliateDisclosure withDemoNote />
              </div>
            }
          />
        </div>
      </section>
    </>
  );
}
