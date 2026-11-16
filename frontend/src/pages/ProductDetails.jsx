import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  ExternalLink,
  Info,
  PackageSearch,
  ShieldCheck,
  Share2,
  Truck,
} from "lucide-react";

import AffiliateDisclosure from "../components/AffiliateDisclosure.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductImage from "../components/ProductImage.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import WishlistButton from "../components/WishlistButton.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Price from "../components/ui/Price.jsx";
import Rating from "../components/ui/Rating.jsx";
import EmptyState from "../components/states/EmptyState.jsx";
import LoadingState from "../components/states/LoadingState.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useAsync } from "../hooks/useAsync.js";
import {
  getProduct,
  getRelatedProducts,
  trackAffiliateClick,
} from "../services/productService.js";
import { formatCompact, formatPrice, timeAgo } from "../utils/format.js";

export default function ProductDetails() {
  const { productId } = useParams();
  const toast = useToast();

  const product = useAsync(() => getProduct(productId), [productId]);
  const related = useAsync(() => getRelatedProducts(productId, 4), [productId]);

  // The selected thumbnail is tied to the product, so moving to another
  // product resets it without needing an effect.
  const [selection, setSelection] = useState({ id: productId, index: 0 });
  const activeImage = selection.id === productId ? selection.index : 0;
  const setActiveImage = (index) => setSelection({ id: productId, index });

  if (product.loading) {
    return (
      <section className="section">
        <div className="shell">
          <LoadingState label="Loading product…" />
        </div>
      </section>
    );
  }

  // Only a genuinely unknown id reaches this state.
  if (product.error || !product.data) {
    return (
      <section className="section">
        <div className="shell">
          <EmptyState
            icon={PackageSearch}
            title="Product not found"
            message={`No product in the catalogue matches "${productId}". The deal may have been removed, or the link may be out of date.`}
            action={{ label: "Browse all deals", to: "/deals" }}
            secondaryAction={{ label: "Go home", to: "/" }}
          />
        </div>
      </section>
    );
  }

  const item = product.data;
  const gallery = item.imageUrl ? [item.imageUrl, ...item.images] : item.images;

  function onAffiliateClick() {
    trackAffiliateClick(item.id).catch(() => {});
  }

  async function onShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: item.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not share this link");
    }
  }

  return (
    <>
      <section className="section section--tight">
        <div className="shell">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Categories", to: "/categories" },
              { label: item.categoryName, to: `/categories/${item.category}` },
              { label: item.name },
            ]}
          />
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-y)" }}>
        <div className="shell pdp">
          {/* Gallery ---------------------------------------------------- */}
          <div className="pdp__gallery">
            <div className="pdp__stage">
              <ProductImage
                product={item}
                src={gallery[activeImage]}
                index={activeImage}
                loading="eager"
                alt={`${item.name} — view ${activeImage + 1}`}
              />
              {item.discount > 0 && (
                <span className="pdp__stage-flag">
                  <span className="deal-card__discount">{item.discount}% OFF</span>
                </span>
              )}
            </div>

            <div className="pdp__thumbs">
              {gallery.slice(0, 4).map((image, index) => (
                <button
                  key={`view-${index}`}
                  type="button"
                  className="pdp__thumb"
                  aria-current={index === activeImage}
                  aria-label={`Show view ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt="" loading="lazy" />
                </button>
              ))}
            </div>

            <p className="text-xs text-muted">
              Placeholder artwork. Product photography arrives with the live
              Amazon feed.
            </p>
          </div>

          {/* Info ------------------------------------------------------- */}
          <div className="pdp__info">
            <div className="stack stack-3">
              <div className="row row--wrap">
                <Link to={`/categories/${item.category}`}>
                  <Badge tone="brand" uppercase>
                    {item.categoryName}
                  </Badge>
                </Link>
                <Badge tone="neutral">{item.brand}</Badge>
                {item.isTrending && <Badge tone="amber">Trending</Badge>}
              </div>

              <h1 className="pdp__title">{item.name}</h1>

              <div className="pdp__meta-row">
                <Rating value={item.rating} count={item.reviewCount} />
                <span className="text-xs text-muted">
                  {formatCompact(item.clicks)} views · added{" "}
                  {timeAgo(item.createdAt)}
                </span>
              </div>
            </div>

            <div className="pdp__price-card">
              <Price
                price={item.price}
                originalPrice={item.originalPrice}
                discount={item.discount}
                size="lg"
              />
              {item.savings > 0 && (
                <span className="pdp__save">
                  <Check size={16} aria-hidden="true" />
                  You save {formatPrice(item.savings)} against the listed
                  original price
                </span>
              )}
              <p className="text-xs text-muted">
                Price and availability are demo data and can change on Amazon at
                any time. Confirm both on the Amazon page before buying.
              </p>
            </div>

            <div className="pdp__actions">
              <Button
                variant="primary"
                size="lg"
                href={item.affiliateUrl}
                icon={ExternalLink}
                onClick={onAffiliateClick}
              >
                View deal on Amazon
              </Button>
              <WishlistButton product={item} variant="wide" />
              <Button variant="outline" icon={Share2} onClick={onShare}>
                Share
              </Button>
            </div>

            <p>{item.description}</p>

            {item.features.length > 0 && (
              <div className="stack stack-3">
                <h2 className="panel-title">Key features</h2>
                <div className="pdp__features">
                  {item.features.map((feature) => (
                    <p className="pdp__feature" key={feature}>
                      <Check size={16} aria-hidden="true" />
                      <span>{feature}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="stack stack-3">
              <h2 className="panel-title">Product information</h2>
              <div className="spec-list">
                {Object.entries(item.specs).map(([label, value]) => (
                  <div className="spec-list__row" key={label}>
                    <span className="spec-list__label">{label}</span>
                    <span className="spec-list__value">{value}</span>
                  </div>
                ))}
                <div className="spec-list__row">
                  <span className="spec-list__label">Availability</span>
                  <span className="spec-list__value">{item.availability}</span>
                </div>
                <div className="spec-list__row">
                  <span className="spec-list__label">Listed price</span>
                  <span className="spec-list__value">{formatPrice(item.price)}</span>
                </div>
                <div className="spec-list__row">
                  <span className="spec-list__label">Original price</span>
                  <span className="spec-list__value">
                    {formatPrice(item.originalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="stack stack-3">
              <p className="pdp__feature">
                <Truck size={16} aria-hidden="true" />
                <span>
                  Delivery, payment and returns are handled entirely by Amazon
                  and its sellers.
                </span>
              </p>
              <p className="pdp__feature">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>
                  HuntDeal never takes payment and never holds your order.
                </span>
              </p>
              <p className="pdp__feature">
                <Info size={16} aria-hidden="true" />
                <span>
                  Figures on this page are demo data for the frontend build.
                </span>
              </p>
            </div>

            <AffiliateDisclosure />
          </div>
        </div>
      </section>

      {/* Related ------------------------------------------------------- */}
      <section className="section section--muted">
        <div className="shell">
          <SectionHeader
            title="Related deals"
            subtitle={`More from ${item.categoryName}, and other deals at a similar discount.`}
            action={{ label: `All ${item.categoryName}`, to: `/categories/${item.category}` }}
          />
          <ProductGrid
            products={related.data ?? []}
            loading={related.loading}
            error={related.error}
            onRetry={related.reload}
            skeletonCount={4}
          />
        </div>
      </section>
    </>
  );
}
