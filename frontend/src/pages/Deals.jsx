import { Tag } from "lucide-react";

import AffiliateDisclosure from "../components/AffiliateDisclosure.jsx";
import CatalogView from "../components/CatalogView.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { brands } from "../data/brands.js";
import { useProductQuery } from "../hooks/useProductQuery.js";
import { formatNumber } from "../utils/format.js";

export default function Deals() {
  const query = useProductQuery();

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Today's Deals" }]}
        eyebrow={
          <>
            <Tag size={14} aria-hidden="true" />
            Today&apos;s deals
          </>
        }
        title="Every deal we are tracking today"
        description="Search, filter and sort the full catalogue. Filters stay in the address bar, so a view you like can be bookmarked or shared."
        meta={
          <>
            <span>{formatNumber(query.total)} deals listed</span>
            <span>·</span>
            <span>Updated daily</span>
            <span>·</span>
            <span>Prices shown are demo data</span>
          </>
        }
      />

      <section className="section">
        <div className="shell">
          <CatalogView
            query={query}
            brands={brands.map((brand) => brand.name)}
            searchPlaceholder="Search all deals"
            emptyState={{
              title: "No deals match those filters",
              message:
                "Nothing in the catalogue fits every filter at once. Clearing the price or discount filter usually opens it back up.",
              action: { label: "Clear filters", onClick: query.clearFilters },
              secondaryAction: { label: "Browse categories", to: "/categories" },
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
