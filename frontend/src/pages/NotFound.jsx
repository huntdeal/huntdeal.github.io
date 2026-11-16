import { Link, useLocation } from "react-router-dom";
import { Compass, Home, Search } from "lucide-react";

import { categories } from "../data/categories.js";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="shell notfound">
      <span className="eyebrow">
        <Compass size={14} aria-hidden="true" />
        Page not found
      </span>
      <span className="notfound__code" aria-hidden="true">
        404
      </span>
      <h1>This page is not part of HuntDeal</h1>
      <p className="lede" style={{ textAlign: "center" }}>
        Nothing lives at <code>{pathname}</code>. The link may be out of date,
        or the page may have been renamed.
      </p>

      <div className="row row--wrap" style={{ justifyContent: "center" }}>
        <Link to="/" className="btn btn--primary">
          <Home size={16} aria-hidden="true" />
          Back to home
        </Link>
        <Link to="/deals" className="btn btn--outline">
          Browse today&apos;s deals
        </Link>
        <Link to="/search" className="btn btn--ghost">
          <Search size={16} aria-hidden="true" />
          Search
        </Link>
      </div>

      <div className="chip-row" style={{ justifyContent: "center", marginTop: "var(--sp-6)" }}>
        {categories.map((category) => (
          <Link key={category.slug} to={`/categories/${category.slug}`} className="chip">
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
