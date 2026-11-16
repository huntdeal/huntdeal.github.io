import { useCallback } from "react";
import { Heart, Trash2 } from "lucide-react";

import AffiliateDisclosure from "../components/AffiliateDisclosure.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Button from "../components/ui/Button.jsx";
import ConfirmationModal from "../components/ui/ConfirmationModal.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { getProductsByIds } from "../services/productService.js";
import { formatPrice } from "../utils/format.js";
import { useState } from "react";

export default function Wishlist() {
  const wishlist = useWishlist();
  const toast = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const key = wishlist.ids.join(",");
  const fetcher = useCallback(() => getProductsByIds(wishlist.ids), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const { data, loading, error, reload } = useAsync(fetcher, [key], {
    enabled: wishlist.ids.length > 0,
    initialData: [],
  });

  // Keep the saved order (most recently added first).
  const items = wishlist.ids
    .map((id) => (data ?? []).find((product) => product.id === id))
    .filter(Boolean);

  const totalNow = items.reduce((sum, item) => sum + item.price, 0);
  const totalWas = items.reduce((sum, item) => sum + item.originalPrice, 0);

  function clearAll() {
    wishlist.clear();
    setConfirmOpen(false);
    toast.notify("Wishlist cleared");
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Wishlist" }]}
        eyebrow={
          <>
            <Heart size={14} aria-hidden="true" />
            Saved deals
          </>
        }
        title="Your wishlist"
        description="Saved deals live in this browser only — there is no account needed, and nothing is stored on our servers. Clearing your browser data clears this list."
        meta={
          <>
            <span>
              {wishlist.count} {wishlist.count === 1 ? "item" : "items"} saved
            </span>
            {items.length > 0 && (
              <>
                <span>·</span>
                <span>
                  {formatPrice(totalNow)} total, down from {formatPrice(totalWas)}
                </span>
              </>
            )}
          </>
        }
      />

      <section className="section">
        <div className="shell">
          {items.length > 0 && (
            <div className="wishlist-bar">
              <div>
                <strong>
                  You would save {formatPrice(Math.max(0, totalWas - totalNow))}
                </strong>
                <p className="text-xs text-muted">
                  Against the listed original prices. Confirm each price on
                  Amazon before buying.
                </p>
              </div>
              <div className="row">
                <Button variant="outline" to="/deals">
                  Keep browsing
                </Button>
                <Button
                  variant="danger"
                  icon={Trash2}
                  onClick={() => setConfirmOpen(true)}
                >
                  Clear wishlist
                </Button>
              </div>
            </div>
          )}

          <ProductGrid
            products={items}
            loading={loading && wishlist.ids.length > 0}
            error={error}
            onRetry={reload}
            empty={{
              title: "Your wishlist is empty",
              message:
                "Tap the heart on any deal to save it here. The list survives a refresh because it is stored in your browser.",
              action: { label: "Browse today's deals", to: "/deals" },
              secondaryAction: { label: "See what's trending", to: "/trending" },
            }}
          />

          {items.length > 0 && (
            <div style={{ marginTop: "var(--sp-10)" }}>
              <AffiliateDisclosure withDemoNote />
            </div>
          )}
        </div>
      </section>

      <ConfirmationModal
        open={confirmOpen}
        title="Clear your wishlist?"
        message={`This removes all ${wishlist.count} saved items from this browser. It cannot be undone.`}
        confirmLabel="Clear wishlist"
        onConfirm={clearAll}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}
