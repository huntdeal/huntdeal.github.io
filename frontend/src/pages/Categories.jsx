import { LayoutGrid } from "lucide-react";

import CategoryCard from "../components/CategoryCard.jsx";
import NewsletterSection from "../components/NewsletterSection.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ErrorState from "../components/states/ErrorState.jsx";
import { ProductGridSkeleton } from "../components/states/LoadingState.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { listCategories } from "../services/categoryService.js";

export default function Categories() {
  const { data, loading, error, reload } = useAsync(() => listCategories(), []);
  const totalDeals = (data ?? []).reduce(
    (sum, category) => sum + category.dealCount,
    0,
  );

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Categories" }]}
        eyebrow={
          <>
            <LayoutGrid size={14} aria-hidden="true" />
            Browse by category
          </>
        }
        title="Every category we track"
        description="Each category has its own page with filters, sorting and a deal count — so you can narrow to the aisle you actually need."
        meta={
          <>
            <span>{data?.length ?? 0} categories</span>
            <span>·</span>
            <span>{totalDeals} deals in total</span>
          </>
        }
      />

      <section className="section">
        <div className="shell">
          {loading && <ProductGridSkeleton count={8} />}
          {error && <ErrorState error={error} onRetry={reload} />}

          {!loading && !error && (
            <div className="grid-auto">
              {(data ?? []).map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
