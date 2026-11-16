import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cable,
  CookingPot,
  Gamepad2,
  Headphones,
  Laptop,
  Shirt,
  Smartphone,
  Sparkles,
  Tag,
} from "lucide-react";

import { formatPrice } from "../utils/format.js";

/** Icon names are stored as strings in the category data. */
const ICONS = {
  Headphones,
  Smartphone,
  Laptop,
  Shirt,
  CookingPot,
  Gamepad2,
  Sparkles,
  Cable,
};

export default function CategoryCard({ category, compact = false }) {
  const Icon = ICONS[category.icon] ?? Tag;

  return (
    <Link
      to={`/categories/${category.slug}`}
      className={`cat-card ${compact ? "cat-card--compact" : ""}`}
      style={{ "--cat-tint": category.tint, "--cat-solid": category.solid }}
    >
      <span className="cat-card__icon" aria-hidden="true">
        <Icon size={22} />
      </span>

      <div className="cat-card__body">
        <span className="cat-card__name">{category.name}</span>
        {compact ? (
          <span className="text-xs text-muted">{category.tagline}</span>
        ) : (
          <p className="cat-card__desc">{category.description}</p>
        )}

        <span className="cat-card__count">
          <span>
            {category.dealCount ?? 0} deals
            {category.startingPrice
              ? ` · from ${formatPrice(category.startingPrice)}`
              : ""}
          </span>
          <ArrowRight size={16} className="cat-card__arrow" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
