import { Star } from "lucide-react";

import { formatCompact } from "../../utils/format.js";

/** Star rating with an accessible text equivalent. */
export default function Rating({ value = 0, count, showStars = true, size = 13 }) {
  const rounded = Math.round(value);

  return (
    <span className="rating">
      {showStars && (
        <span className="rating__stars" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={size}
              fill={index < rounded ? "currentColor" : "none"}
              strokeWidth={index < rounded ? 0 : 1.8}
              color={index < rounded ? "currentColor" : "var(--c-ink-300)"}
            />
          ))}
        </span>
      )}
      <span className="rating__value">{Number(value).toFixed(1)}</span>
      {count !== undefined && count !== null && (
        <span>({formatCompact(count)})</span>
      )}
      <span className="sr-only">
        Rated {Number(value).toFixed(1)} out of 5
        {count ? ` from ${count} reviews` : ""}
      </span>
    </span>
  );
}
