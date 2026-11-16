import {
  BadgeCheck,
  BellRing,
  Filter,
  LineChart,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import SectionHeader from "./SectionHeader.jsx";

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "Discounts you can check",
    text: "Every listing shows the current price beside the original, so the percentage is something you can verify rather than trust.",
  },
  {
    icon: Filter,
    title: "Filters that actually narrow",
    text: "Price bands, discount depth, rating and brand combine — and the result stays in the URL, so a filtered view can be shared.",
  },
  {
    icon: Wallet,
    title: "Free, with no checkout",
    text: "HuntDeal never handles payment. You buy on Amazon, under Amazon's pricing, delivery and returns policies.",
  },
  {
    icon: LineChart,
    title: "Ranked by interest, not by payment",
    text: "Nothing here is a paid placement. Ranking comes from discount depth, rating and category balance.",
  },
  {
    icon: ShieldCheck,
    title: "Plain affiliate disclosure",
    text: "We earn a commission when you buy through a link, it costs you nothing, and we say so on every page.",
  },
  {
    icon: BellRing,
    title: "Save without an account",
    text: "Your wishlist lives in your browser. No sign-up, no email required, nothing stored on our servers.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="section section--muted">
      <div className="shell">
        <SectionHeader
          eyebrow="Why HuntDeal"
          eyebrowIcon={BadgeCheck}
          title="A deal site that shows its working"
          subtitle="Discovery tools built around one idea: a discount is only useful if you can tell it is real."
        />

        <div className="benefit-grid">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
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
  );
}
