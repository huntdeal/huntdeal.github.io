import { Link } from "react-router-dom";
import { Flame, Info, TrendingUp } from "lucide-react";

import NewsletterSection from "../components/NewsletterSection.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { listCategories } from "../services/categoryService.js";
import { getTrendingProducts } from "../services/productService.js";
import { getCategoryPerformance } from "../services/analyticsService.js";
import { formatCompact } from "../utils/format.js";

export default function Trending() {
  const trending = useAsync(() => getTrendingProducts(12), []);
  const categoryStats = useAsync(() => getCategoryPerformance(), []);
  const categories = useAsync(() => listCategories(), []);

  const items = trending.data ?? [];
  const podium = items.slice(0, 3);
  const rest = items.slice(3);
  const totalViews = items.reduce((sum, item) => sum + item.clicks, 0);

  return (
    <>
      <section className="section section--tight">
        <div className="shell stack stack-6">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Trending" }]} />

          <div className="trend-hero">
            <div className="trend-hero__inner">
              <div className="stack stack-4">
                <span className="eyebrow" style={{ color: "var(--highlight)" }}>
                  <Flame size={14} aria-hidden="true" />
                  Trending now
                </span>
                <h1 className="trend-hero__title">
                  The deals getting the most attention
                </h1>
                <p style={{ fontSize: "var(--fs-sm)", maxWidth: "52ch" }}>
                  Ranked by how often a deal is opened. These figures are demo
                  engagement data generated for the frontend build — they do not
                  represent real visitor activity yet.
                </p>
                <p
                  className="row"
                  style={{ fontSize: "var(--fs-xs)", color: "rgba(255,255,255,0.6)" }}
                >
                  <Info size={14} aria-hidden="true" />
                  Live analytics arrive with the backend integration.
                </p>
              </div>

              <div className="trend-metrics">
                <div className="trend-metric">
                  <div className="trend-metric__value">{items.length}</div>
                  <div className="trend-metric__label">Deals ranked</div>
                </div>
                <div className="trend-metric">
                  <div className="trend-metric__value">
                    {formatCompact(totalViews)}
                  </div>
                  <div className="trend-metric__label">Demo views</div>
                </div>
                <div className="trend-metric">
                  <div className="trend-metric__value">
                    {categoryStats.data?.[0]?.name ?? "—"}
                  </div>
                  <div className="trend-metric__label">Hottest category</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podium ---------------------------------------------------------- */}
      <section className="section section--tight">
        <div className="shell">
          <SectionHeader
            eyebrow="Top three"
            eyebrowIcon={TrendingUp}
            title="Most opened this week"
            subtitle="The three deals with the highest demo engagement."
          />

          <div className="podium">
            {trending.loading &&
              Array.from({ length: 3 }, (_, index) => (
                <div className="skeleton" key={index} style={{ height: 380 }} />
              ))}

            {podium.map((product, index) => (
              <div className={`podium__item podium__item--${index + 1}`} key={product.id}>
                <ProductGrid
                  products={[{ ...product, rank: index + 1 }]}
                  showRank
                  showEngagement
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending categories --------------------------------------------- */}
      <section className="section section--muted">
        <div className="shell">
          <SectionHeader
            eyebrow="Trending categories"
            title="Where the interest is concentrated"
            subtitle="Categories ordered by total demo engagement across their deals."
            action={{ label: "All categories", to: "/categories" }}
          />

          <div className="grid-auto">
            {(categoryStats.data ?? []).slice(0, 4).map((stat, index) => {
              const category = (categories.data ?? []).find(
                (item) => item.slug === stat.slug,
              );
              return (
                <Link
                  to={`/categories/${stat.slug}`}
                  key={stat.slug}
                  className="cat-card cat-card--compact"
                  style={{
                    "--cat-tint": category?.tint,
                    "--cat-solid": category?.solid,
                  }}
                >
                  <span className="cat-card__icon" aria-hidden="true">
                    <span style={{ fontWeight: 800 }}>#{index + 1}</span>
                  </span>
                  <div className="cat-card__body">
                    <span className="cat-card__name">{stat.name}</span>
                    <span className="text-xs text-muted">
                      {formatCompact(stat.clicks)} demo views · avg{" "}
                      {stat.avgDiscount}% off
                    </span>
                    <span className="cat-card__count">
                      <span>{stat.products} deals</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Remaining popular products -------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeader
            eyebrow="Popular products"
            title="Also getting a lot of attention"
            subtitle="Ranked four and below, by the same demo engagement measure."
            action={{ label: "Sort all deals by popularity", to: "/deals?sort=popular" }}
          />
          <ProductGrid
            products={rest}
            loading={trending.loading}
            error={trending.error}
            onRetry={trending.reload}
            skeletonCount={8}
            showRank
            showEngagement
          />
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
