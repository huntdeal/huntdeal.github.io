import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgePercent,
  Clock3,
  Flame,
  LayoutGrid,
  Sparkles,
  Star,
} from "lucide-react";

import BenefitsSection from "../components/BenefitsSection.jsx";
import BrandStrip from "../components/BrandStrip.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import HeroSection from "../components/HeroSection.jsx";
import NewsletterSection from "../components/NewsletterSection.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductImage from "../components/ProductImage.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import Price from "../components/ui/Price.jsx";
import { ListSkeleton } from "../components/states/LoadingState.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { listCategories } from "../services/categoryService.js";
import {
  getCatalogueStats,
  getFeaturedProducts,
  getRecentProducts,
  getTodaysDeals,
  getTopDiscounts,
  getTrendingProducts,
} from "../services/productService.js";

export default function Home() {
  const stats = useAsync(() => getCatalogueStats(), []);
  const featured = useAsync(() => getFeaturedProducts(8), []);
  const todays = useAsync(() => getTodaysDeals(4), []);
  const trending = useAsync(() => getTrendingProducts(4), []);
  const topDiscounts = useAsync(() => getTopDiscounts(6), []);
  const recent = useAsync(() => getRecentProducts(4), []);
  const categories = useAsync(() => listCategories(), []);

  const headlineDeal = topDiscounts.data?.[0];

  return (
    <>
      <HeroSection stats={stats.data} topDiscount={headlineDeal} />

      {/* Featured deals -------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeader
            eyebrow="Featured"
            eyebrowIcon={Star}
            title="Deals we would send to a friend"
            subtitle="Hand-picked from the catalogue for discount depth and rating together, not one or the other."
            action={{ label: "See all deals", to: "/deals" }}
          />
          <ProductGrid
            products={featured.data ?? []}
            loading={featured.loading}
            error={featured.error}
            onRetry={featured.reload}
            skeletonCount={8}
          />
        </div>
      </section>

      {/* Today's best + trending ----------------------------------------- */}
      <section className="section section--muted">
        <div className="shell">
          <SectionHeader
            eyebrow="Today's best"
            eyebrowIcon={Clock3}
            title="Biggest price drops today"
            subtitle="Everything here is discounted 40% or more against its listed original price."
            action={{ label: "Today's deals", to: "/deals?disc=40" }}
          />
          <ProductGrid
            products={todays.data ?? []}
            loading={todays.loading}
            error={todays.error}
            onRetry={todays.reload}
            skeletonCount={4}
          />

          <div style={{ marginTop: "var(--sp-16)" }}>
            <SectionHeader
              eyebrow="Trending now"
              eyebrowIcon={Flame}
              title="What other hunters are opening"
              subtitle="Ranked by demo engagement data while analytics are being connected."
              action={{ label: "See trending", to: "/trending" }}
            />
            <ProductGrid
              products={trending.data ?? []}
              loading={trending.loading}
              error={trending.error}
              onRetry={trending.reload}
              skeletonCount={4}
              showRank
              showEngagement
            />
          </div>
        </div>
      </section>

      {/* Categories ------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeader
            eyebrow="Shop by category"
            eyebrowIcon={LayoutGrid}
            title="Start where you already know you need something"
            subtitle="Eight categories, each with its own filters, sorting and deal count."
            action={{ label: "All categories", to: "/categories" }}
          />

          <div className="grid-auto">
            {(categories.data ?? []).slice(0, 8).map((category) => (
              <CategoryCard key={category.slug} category={category} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Top discounts ---------------------------------------------------- */}
      <section className="section section--muted">
        <div className="shell split">
          <aside className="split__aside">
            <span className="eyebrow" style={{ color: "var(--highlight)" }}>
              <BadgePercent size={14} aria-hidden="true" />
              Top discounts
            </span>
            <h2>The deepest cuts in the catalogue right now</h2>
            <p style={{ fontSize: "var(--fs-sm)" }}>
              Sorted purely by percentage off the original price. Big
              percentages are worth a second look — check the original price on
              Amazon before deciding.
            </p>
            <div className="hero__stat-value" style={{ marginTop: "var(--sp-4)" }}>
              Up to {stats.data?.maxDiscount ?? 0}% off
            </div>
            <Link
              to="/deals?sort=discount"
              className="btn btn--primary"
              style={{ alignSelf: "flex-start", marginTop: "var(--sp-4)" }}
            >
              Browse by discount
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>

          <div className="rank-list">
            {topDiscounts.loading && <ListSkeleton rows={6} />}
            {topDiscounts.data?.map((product, index) => (
              <Link
                to={`/product/${product.id}`}
                className="rank-row"
                key={product.id}
              >
                <span className="rank-row__index">{index + 1}</span>
                <ProductImage product={product} className="rank-row__img" />
                <span className="rank-row__body">
                  <span className="rank-row__name">{product.name}</span>
                  <span className="rank-row__meta">
                    {product.categoryName} · {product.brand}
                  </span>
                </span>
                <span className="rank-row__price">
                  <Price
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently added --------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeader
            eyebrow="Just added"
            eyebrowIcon={Sparkles}
            title="Recently added deals"
            subtitle="The newest entries in the catalogue, newest first."
            action={{ label: "Sort by newest", to: "/deals?sort=newest" }}
          />
          <ProductGrid
            products={recent.data ?? []}
            loading={recent.loading}
            error={recent.error}
            onRetry={recent.reload}
            skeletonCount={4}
          />
        </div>
      </section>

      <BenefitsSection />
      <BrandStrip />
      <NewsletterSection />
    </>
  );
}
