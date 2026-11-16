import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgePercent,
  Flame,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import SearchBar from "./SearchBar.jsx";
import { formatCompact } from "../utils/format.js";

const SUGGESTIONS = ["headphones", "air fryer", "laptop", "serum", "keyboard"];

/**
 * Homepage hero. Deliberately type-led: layered data tiles and a soft
 * gradient field instead of one large product photograph.
 */
export default function HeroSection({ stats, topDiscount }) {
  const navigate = useNavigate();

  function onSearch(term) {
    const query = term.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/deals");
  }

  const sparkHeights = [38, 52, 30, 61, 44, 72, 56, 84];

  return (
    <section className="hero">
      <div className="shell hero__inner">
        <div className="hero__content">
          <span className="eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            {stats?.products ?? 0} deals tracked across {stats?.categories ?? 8}{" "}
            categories
          </span>

          <h1 className="hero__title">
            Stop scrolling. <br />
            Start <em>hunting deals</em>.
          </h1>

          <p className="hero__sub">
            HuntDeal gathers the discounts worth your attention — sorted,
            filtered and checked against the original price — then sends you
            straight to the Amazon listing to buy.
          </p>

          <SearchBar
            variant="hero"
            onSubmit={onSearch}
            placeholder="Search a product, brand or category"
            submitLabel="Find deals"
          />

          <p className="hero__suggest">
            <span>Popular:</span>
            {SUGGESTIONS.map((term) => (
              <Link
                key={term}
                to={`/search?q=${encodeURIComponent(term)}`}
                className="chip"
              >
                {term}
              </Link>
            ))}
          </p>

          <div className="hero__cta">
            <Link to="/deals" className="btn btn--primary btn--lg">
              Explore today&apos;s deals
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/categories" className="btn btn--outline btn--lg">
              Browse categories
            </Link>
          </div>

          <dl className="hero__stats">
            <div>
              <dd className="hero__stat-value">{stats?.products ?? 0}</dd>
              <dt className="hero__stat-label">Live deals listed</dt>
            </div>
            <div>
              <dd className="hero__stat-value">{stats?.avgDiscount ?? 0}%</dd>
              <dt className="hero__stat-label">Average discount</dt>
            </div>
            <div>
              <dd className="hero__stat-value">{stats?.brands ?? 0}</dd>
              <dt className="hero__stat-label">Brands covered</dt>
            </div>
          </dl>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero-tile">
            <span
              className="hero-tile__icon"
              style={{ "--tile-bg": "var(--c-amber-50)", "--tile-fg": "var(--c-amber-600)" }}
            >
              <BadgePercent size={19} />
            </span>
            <span className="hero-tile__label">Biggest drop</span>
            <span className="hero-tile__value">
              {stats?.maxDiscount ?? 0}% off
            </span>
            <span className="hero-tile__foot">
              {topDiscount?.categoryName ?? "Across all categories"}
            </span>
          </div>

          <div className="hero-tile hero-tile--offset">
            <span
              className="hero-tile__icon"
              style={{ "--tile-bg": "var(--c-teal-50)", "--tile-fg": "var(--c-teal-600)" }}
            >
              <Flame size={19} />
            </span>
            <span className="hero-tile__label">Trending today</span>
            <span className="hero-tile__value">
              {formatCompact(topDiscount?.clicks ?? 0)}
            </span>
            <span className="hero-tile__foot">views on the top deal</span>
          </div>

          <div className="hero-tile hero-tile--wide">
            <div className="row row--between">
              <span className="hero-tile__label">Deal activity this week</span>
              <span className="badge badge--brand">
                <TrendingUp size={12} /> Demo data
              </span>
            </div>
            <div className="hero-spark">
              {sparkHeights.map((height, index) => (
                <span
                  key={index}
                  style={{
                    height: `${height}%`,
                    animationDelay: `${index * 60}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
