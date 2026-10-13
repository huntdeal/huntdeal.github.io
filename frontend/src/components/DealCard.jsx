import { Link } from "react-router-dom";
import { Heart, ExternalLink } from "lucide-react";

function DealCard({ product }) {
  return (
    <article className="deal-card">
      <div className="deal-card-image">
        {product.rank && (
        <span className="trending-rank">
            #{product.rank}
        </span>
        )}
        
        {product.image ? (
        <img src={product.image} alt={product.title} />
        ) : (
        <span>{product.emoji}</span>
        )}


        {product.discount && (
          <span className="deal-badge">
            {product.discount}
          </span>
        )}

        <button
          className="deal-wishlist"
          type="button"
          aria-label="Add to wishlist"
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="deal-card-content">
        {product.category && (
          <span className="deal-category">
            {product.category}
          </span>
        )}

        <h3 className="deal-title">
          {product.title}
        </h3>

        <div className="deal-price-row">
          <span className="deal-price">
            {product.price}
          </span>

          {(product.originalPrice || product.oldPrice) && (
            <span className="deal-original-price">
                {product.originalPrice || product.oldPrice}
            </span>
            )}
        </div>

        {product.rating && (
          <div className="deal-rating">
            ⭐ {product.rating}
          </div>
        )}

        <div className="deal-card-actions">
          <Link
            to={`/product/${product.id}`}
            className="deal-details-btn"
          >
            View Details
          </Link>

          <a
            href={product.amazonLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="deal-amazon-btn"
          >
            <ExternalLink size={16} />
            View Deal
          </a>
        </div>
      </div>
    </article>
  );
}

export default DealCard;