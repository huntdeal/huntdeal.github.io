import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** Title + optional eyebrow, subtitle and a "see all" link. */
export default function SectionHeader({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  subtitle,
  action,
  as: Tag = "h2",
}) {
  return (
    <header className="section-head">
      <div className="section-head__text">
        {eyebrow && (
          <span className="eyebrow">
            {EyebrowIcon && <EyebrowIcon size={14} aria-hidden="true" />}
            {eyebrow}
          </span>
        )}
        <Tag className="section-head__title">{title}</Tag>
        {subtitle && <p className="section-head__sub">{subtitle}</p>}
      </div>

      {action && (
        <Link to={action.to} className="btn btn--outline btn--sm">
          {action.label}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
    </header>
  );
}
