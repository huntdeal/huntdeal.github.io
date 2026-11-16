import DealCard from "./DealCard.jsx";
import EmptyState from "./states/EmptyState.jsx";
import ErrorState from "./states/ErrorState.jsx";
import { ProductGridSkeleton } from "./states/LoadingState.jsx";

/**
 * Renders a list of products with its loading, error and empty states, so no
 * page has to re-implement that triage.
 */
export default function ProductGrid({
  products = [],
  loading = false,
  error = null,
  onRetry,
  skeletonCount = 8,
  columns = "4",
  showRank = false,
  showEngagement = false,
  layout = "grid",
  empty,
}) {
  if (loading) return <ProductGridSkeleton count={skeletonCount} />;
  if (error) return <ErrorState error={error} onRetry={onRetry} />;

  if (!products.length) {
    return (
      <EmptyState
        title={empty?.title ?? "No deals match these filters"}
        message={
          empty?.message ??
          "Try removing a filter or widening the price range — new deals are added every day."
        }
        action={empty?.action}
        secondaryAction={empty?.secondaryAction}
      />
    );
  }

  const maxClicks = Math.max(...products.map((product) => product.clicks || 0), 1);

  return (
    <div
      className={[
        "product-grid",
        columns === "3" ? "product-grid--3" : "",
        layout === "row" ? "product-grid--list" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {products.map((product, index) => (
        <DealCard
          key={product.id}
          product={product}
          layout={layout}
          rank={showRank ? (product.rank ?? index + 1) : undefined}
          showEngagement={showEngagement}
          maxClicks={maxClicks}
        />
      ))}
    </div>
  );
}
