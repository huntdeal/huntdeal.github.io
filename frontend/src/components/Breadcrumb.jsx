import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/** @param {{label: string, to?: string}[]} items — last item is the current page. */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="row" style={{ gap: "var(--sp-2)" }}>
            {isLast || !item.to ? (
              <span className="breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.to}>{item.label}</Link>
            )}
            {!isLast && (
              <ChevronRight size={13} className="breadcrumb__sep" aria-hidden="true" />
            )}
          </span>
        );
      })}
    </nav>
  );
}
