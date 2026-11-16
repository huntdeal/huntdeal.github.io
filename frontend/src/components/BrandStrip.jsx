import { Link } from "react-router-dom";
import { Store } from "lucide-react";

import SectionHeader from "./SectionHeader.jsx";
import { brands } from "../data/brands.js";

/**
 * Popular brands. Brand names are fictional demo labels — see data/brands.js.
 * Each tile searches the catalogue for that brand.
 */
export default function BrandStrip({ limit = 10 }) {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeader
          eyebrow="Popular brands"
          eyebrowIcon={Store}
          title="Brands people are hunting"
          subtitle="Demo brand labels while the catalogue runs on sample data."
          action={{ label: "All deals", to: "/deals" }}
        />

        <div className="brand-grid">
          {brands.slice(0, limit).map((brand) => (
            <Link
              key={brand.slug}
              to={`/search?q=${encodeURIComponent(brand.name)}`}
              className="brand-pill"
            >
              <span className="brand-pill__name">{brand.name}</span>
              <span className="brand-pill__meta">{brand.blurb}</span>
              <span className="badge badge--teal" style={{ marginTop: 6 }}>
                {brand.dealCount} deals · up to {brand.bestDiscount}%
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
