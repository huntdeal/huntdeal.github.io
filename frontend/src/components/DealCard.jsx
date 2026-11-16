import { Link } from "react-router-dom";
import { ExternalLink, TrendingUp } from "lucide-react";

import ProductImage from "./ProductImage.jsx";
import WishlistButton from "./WishlistButton.jsx";
import Price from "./ui/Price.jsx";
import Rating from "./ui/Rating.jsx";
import { trackAffiliateClick } from "../services/productService.js";
import { formatCompact } from "../utils/format.js";

/**
 * The product card used across every listing.
 *
 * @param {object} props.product
 * @param {number} [props.rank]        Shows a ranking badge (trending lists).
 * @param {boolean} [props.showEngagement] Shows the demo interest bar.
 * @param {"grid"|"row"} [props.layout]
 */
export default function DealCard({
  product,
  rank,
  showEngagement = false,
  maxClicks,
  layout = "grid",
}) {
  const detailPath = `/product/${product.id}`;

  function onAffiliateClick() {
    // Records the outbound click locally so admin charts have data to show.
    trackAffiliateClick(product.id).catch(() => {});
  }

  return (
    <article className={`deal-card ${layout === "row" ? "deal-card--row" : ""}`}>
      <Link
        to={detailPath}
        className="deal-card__media"
        aria-label={`View details for ${product.name}`}
      >
        <ProductImage product={product} />
        <span className="deal-card__flags">
          {rank && <span className="deal-card__rank">#{rank}</span>}
          {product.discount > 0 && (
            <span className="deal-card__discount">{product.discount}% OFF</span>
          )}
        </span>
      </Link>

      <span className="deal-card__wish">
        <WishlistButton product={product} />
      </span>

      <div className="deal-card__body">
        <div className="deal-card__meta">
          <Link to={`/categories/${product.category}`} className="deal-card__cat">
            {product.categoryName}
          </Link>
          <Rating value={product.rating} showStars={false} />
        </div>

        <h3 className="deal-card__title">
          <Link to={detailPath}>{product.name}</Link>
        </h3>

        <span className="deal-card__brand">{product.brand}</span>

        {showEngagement && (
          <div className="engagement" title="Demo engagement data">
            <TrendingUp size={12} aria-hidden="true" />
            <span className="engagement__bar">
              <span
                className="engagement__fill"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((product.clicks / (maxClicks || product.clicks || 1)) * 100),
                  )}%`,
                }}
              />
            </span>
            <span>{formatCompact(product.clicks)} views</span>
          </div>
        )}

        <div className="deal-card__price">
          <Price
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
          />
        </div>

        <div className="deal-card__actions">
          <Link to={detailPath} className="btn btn--outline btn--sm">
            Details
          </Link>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn btn--primary btn--sm"
            onClick={onAffiliateClick}
          >
            <ExternalLink size={14} aria-hidden="true" />
            View deal
          </a>
        </div>
      </div>
    </article>
  );
}
