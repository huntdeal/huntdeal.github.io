import { formatPrice } from "../../utils/format.js";

/** Current price, original price and the saving, in one consistent block. */
export default function Price({ price, originalPrice, discount, size = "md" }) {
  const hasOriginal = Number(originalPrice) > Number(price);

  return (
    <div className={`price ${size === "lg" ? "price--lg" : ""}`}>
      <span className="price__now">{formatPrice(price)}</span>
      {hasOriginal && (
        <>
          <span className="price__was">{formatPrice(originalPrice)}</span>
          {discount > 0 && <span className="price__off">{discount}% off</span>}
        </>
      )}
    </div>
  );
}
