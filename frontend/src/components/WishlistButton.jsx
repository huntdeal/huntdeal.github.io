import { Heart } from "lucide-react";

import { useToast } from "../context/ToastContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

/**
 * Toggles a product in the wishlist.
 * `variant="wide"` renders the labelled version used on product pages.
 */
export default function WishlistButton({
  product,
  variant = "icon",
  className = "",
}) {
  const wishlist = useWishlist();
  const toast = useToast();
  const active = wishlist.has(product.id);

  function onClick(event) {
    event.preventDefault();
    event.stopPropagation();
    wishlist.toggle(product.id);
    toast.notify(
      active ? "Removed from wishlist" : "Saved to your wishlist",
      { tone: active ? "info" : "success" },
    );
  }

  const label = active ? "Remove from wishlist" : "Save to wishlist";

  return (
    <button
      type="button"
      className={[
        "wish-btn",
        variant === "wide" ? "wish-btn--wide" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-active={active}
      onClick={onClick}
      aria-pressed={active}
      aria-label={variant === "wide" ? undefined : label}
      title={label}
    >
      <Heart size={variant === "wide" ? 16 : 17} aria-hidden="true" />
      {variant === "wide" && <span>{active ? "Saved" : "Save"}</span>}
    </button>
  );
}
