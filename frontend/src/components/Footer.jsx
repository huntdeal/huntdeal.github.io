import { Link } from "react-router-dom";
import { AtSign, Camera, Info, PlayCircle, Tag, Users } from "lucide-react";

import { FOOTER_NAV, SITE } from "../utils/constants.js";

/**
 * lucide-react v1 dropped brand glyphs, so these use neutral icons with the
 * platform name carried by the accessible label.
 */
const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: Camera },
  { label: "X", href: "https://x.com", Icon: AtSign },
  { label: "YouTube", href: "https://youtube.com", Icon: PlayCircle },
  { label: "Facebook", href: "https://facebook.com", Icon: Users },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell footer__top">
        <div className="footer__about">
          <Link to="/" className="brand brand--inverse">
            <span className="brand__mark" aria-hidden="true">
              <Tag size={18} />
            </span>
            <span className="brand__text">
              <span className="brand__name">
                Hunt<em>Deal</em>
              </span>
              <span className="brand__tag">Deal discovery, daily</span>
            </span>
          </Link>

          <p style={{ fontSize: "var(--fs-sm)" }}>
            HuntDeal collects discounts and offers from Amazon and organises
            them so you can find a genuine deal without scrolling for an hour.
            We do not sell products ourselves.
          </p>

          <div className="footer__socials">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                className="footer__social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_NAV).map(([title, links]) => (
          <div key={title}>
            <h3 className="footer__col-title">{title}</h3>
            <ul className="footer__list">
              {links.map((link) => (
                <li key={`${title}-${link.label}`}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="shell" style={{ paddingBottom: "var(--sp-6)" }}>
        <p className="footer__disclosure">
          <Info size={16} aria-hidden="true" />
          <span>
            <strong>Affiliate disclosure.</strong> {SITE.affiliateDisclosure}{" "}
            HuntDeal earns a commission when you buy through our links, at no
            extra cost to you. {SITE.demoDataNotice}
          </span>
        </p>
      </div>

      <div className="shell footer__bottom">
        <span>
          © {year} {SITE.name}. Not affiliated with, or endorsed by, Amazon
          beyond the Associates programme.
        </span>
        <nav className="footer__bottom-links" aria-label="Legal">
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          <Link to="/admin/login">Admin</Link>
        </nav>
      </div>
    </footer>
  );
}
