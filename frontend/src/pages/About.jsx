import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Compass,
  Filter,
  Info,
  Link2,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import NewsletterSection from "../components/NewsletterSection.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { getCatalogueStats } from "../services/productService.js";
import { SITE } from "../utils/constants.js";

const STEPS = [
  {
    icon: Search,
    title: "We collect the offers",
    text: "Discounts across eight categories are gathered into one catalogue, with the current price recorded next to the original.",
  },
  {
    icon: Filter,
    title: "You narrow it down",
    text: "Filter by price band, discount depth, rating and brand, then sort by what matters to you — not by what pays us most.",
  },
  {
    icon: Link2,
    title: "You buy on Amazon",
    text: "Every deal links through to the Amazon listing. Payment, delivery and returns are handled entirely by Amazon.",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Discounts you can verify",
    text: "We always show the original price next to the current one. A percentage with nothing to compare against is marketing, not information.",
  },
  {
    icon: ShieldCheck,
    title: "No paid placement",
    text: "No brand can buy a position in our listings. Ranking is discount depth, rating and category balance.",
  },
  {
    icon: BadgeCheck,
    title: "Honest about what we know",
    text: "We never claim live stock or a guaranteed price. Both are confirmed on Amazon, which is where the purchase happens.",
  },
];

export default function About() {
  const stats = useAsync(() => getCatalogueStats(), []);

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
        eyebrow={
          <>
            <Compass size={14} aria-hidden="true" />
            About HuntDeal
          </>
        }
        title="A shorter path between a discount and a decision"
        description="HuntDeal is a deal discovery platform for Amazon shoppers. We organise the offers, show the maths, and get out of the way."
      />

      {/* The problem ------------------------------------------------------ */}
      <section className="section">
        <div className="shell about-split">
          <div className="stack stack-4">
            <span className="eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              The problem
            </span>
            <h2>Finding a real discount takes longer than it should</h2>
            <p className="lede">
              Sale season produces thousands of badges and very little
              information. Prices move daily, original prices are often
              optimistic, and the only way to tell a genuine price drop from a
              rearranged number is to track it yourself.
            </p>
            <p className="lede">
              That is tedious work, and it is the same work for everyone.
              HuntDeal does it once: collects the offers, puts the current price
              next to the original, and gives you tools to narrow thousands of
              listings down to the handful worth opening.
            </p>
          </div>

          <div className="stat-band">
            <div>
              <div className="hero__stat-value">{stats.data?.products ?? 0}</div>
              <div className="hero__stat-label">Deals in the catalogue</div>
            </div>
            <div>
              <div className="hero__stat-value">{stats.data?.categories ?? 8}</div>
              <div className="hero__stat-label">Categories covered</div>
            </div>
            <div>
              <div className="hero__stat-value">{stats.data?.avgDiscount ?? 0}%</div>
              <div className="hero__stat-label">Average discount</div>
            </div>
            <div>
              <div className="hero__stat-value">₹0</div>
              <div className="hero__stat-label">Cost to use</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works ------------------------------------------------------ */}
      <section className="section section--muted" id="how-it-works">
        <div className="shell">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps, no checkout"
            subtitle="HuntDeal is a discovery layer on top of Amazon. We never take payment and never hold an order."
          />

          <div className="step-list">
            {STEPS.map((step, index) => (
              <article className="step" key={step.title}>
                <span className="step__num" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="benefit__title">
                  <step.icon
                    size={16}
                    aria-hidden="true"
                    style={{ verticalAlign: "-2px", marginRight: 8, color: "var(--accent)" }}
                  />
                  {step.title}
                </h3>
                <p className="benefit__text">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why use it -------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <SectionHeader
            eyebrow="Why use HuntDeal"
            title="What we commit to"
            subtitle="Three rules that decide how the catalogue is built and ranked."
          />
          <div className="value-grid">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <article className="benefit" key={title}>
                <span className="benefit__icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3 className="benefit__title">{title}</h3>
                <p className="benefit__text">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate transparency -------------------------------------------- */}
      <section className="section section--muted" id="affiliate">
        <div className="shell about-split">
          <div className="stack stack-4">
            <span className="eyebrow">
              <Info size={14} aria-hidden="true" />
              Affiliate transparency
            </span>
            <h2>How HuntDeal makes money</h2>
            <p className="lede">
              HuntDeal participates in the Amazon Associates programme.{" "}
              <strong>{SITE.affiliateDisclosure}</strong> When you follow a link
              from a deal page and buy something, Amazon may pay us a small
              commission on that sale.
            </p>
            <p className="lede">
              It costs you nothing. The price on Amazon is the same whether you
              arrive through HuntDeal or type the address yourself — the
              commission comes out of Amazon&apos;s margin. Commission rates are
              not an input to what we list or how we rank it, and no brand can
              pay for a position.
            </p>
            <p className="lede">
              We also do not sell products, take payment, or hold inventory.
              There is no cart and no checkout on this site by design.
            </p>
          </div>

          <div className="card card--pad stack stack-4">
            <h3 className="panel-title">Current build status</h3>
            <p className="text-sm text-muted">
              This is the frontend release. The catalogue, prices, ratings and
              engagement figures are demo data used to build and test the
              interface — they are not live Amazon values. Deal collection and
              live pricing arrive with the backend integration.
            </p>
            <p className="text-sm text-muted">
              Until then, treat every figure on this site as illustrative and
              confirm it on the Amazon product page.
            </p>
            <div className="row row--wrap">
              <Link to="/faq" className="btn btn--outline btn--sm">
                Read the FAQ
              </Link>
              <Link to="/contact" className="btn btn--primary btn--sm">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
