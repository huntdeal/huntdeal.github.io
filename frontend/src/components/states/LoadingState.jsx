/** Skeleton grid that matches the deal-card footprint, plus a plain spinner. */

export function ProductGridSkeleton({ count = 8, className = "" }) {
  return (
    <div className={`product-grid ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton-card__media" />
          <div
            className="skeleton skeleton-card__line"
            style={{ width: "40%", marginTop: 4 }}
          />
          <div className="skeleton skeleton-card__line" style={{ width: "88%" }} />
          <div className="skeleton skeleton-card__line" style={{ width: "60%" }} />
          <div
            className="skeleton skeleton-card__line"
            style={{ width: "50%", height: 18 }}
          />
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ rows = 5 }) {
  return (
    <div className="stack stack-3" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div
          className="skeleton"
          key={index}
          style={{ height: 64, borderRadius: "var(--r-md)" }}
        />
      ))}
    </div>
  );
}

export default function LoadingState({ label = "Loading…" }) {
  return (
    <div className="loading-inline" role="status">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
