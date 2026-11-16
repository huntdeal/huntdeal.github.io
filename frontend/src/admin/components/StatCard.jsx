import { Minus, TrendingDown, TrendingUp } from "lucide-react";

/**
 * Dashboard metric tile.
 * @param {number} [change] Percentage change; omit for no trend pill.
 */
export default function StatCard({
  label,
  value,
  icon: Icon,
  change,
  caption,
  tone = "brand",
}) {
  const TONES = {
    brand: ["var(--accent-soft)", "var(--accent)"],
    teal: ["var(--c-teal-50)", "var(--c-teal-600)"],
    amber: ["var(--c-amber-50)", "var(--c-amber-600)"],
    success: ["var(--c-success-50)", "var(--c-success-600)"],
  };
  const [bg, fg] = TONES[tone] ?? TONES.brand;

  const direction =
    change === undefined || change === null
      ? null
      : change > 0
        ? "up"
        : change < 0
          ? "down"
          : "flat";
  const TrendIcon =
    direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;

  return (
    <article className="stat-card">
      <div className="stat-card__top">
        <span className="stat-card__label">{label}</span>
        {Icon && (
          <span
            className="stat-card__icon"
            style={{ "--stat-bg": bg, "--stat-fg": fg }}
            aria-hidden="true"
          >
            <Icon size={18} />
          </span>
        )}
      </div>

      <div className="stat-card__value">{value}</div>

      <div className="stat-card__foot">
        {direction && (
          <span className={`trend-pill trend-pill--${direction}`}>
            <TrendIcon size={11} aria-hidden="true" />
            {Math.abs(change)}%
          </span>
        )}
        {caption && <span>{caption}</span>}
      </div>
    </article>
  );
}
