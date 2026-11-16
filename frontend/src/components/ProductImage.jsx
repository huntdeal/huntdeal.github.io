import { useState } from "react";

import { placeholderImage } from "../utils/placeholder.js";

/**
 * Product artwork with a guaranteed fallback.
 *
 * Order: an explicit `src`, then the product's backend `imageUrl`, then the
 * generated placeholder. If a real URL fails to load we fall back rather than
 * showing a broken image icon.
 */
export default function ProductImage({
  product,
  src,
  index = 0,
  alt,
  className = "",
  loading = "lazy",
  ...rest
}) {
  const fallback =
    product?.images?.[index] ??
    placeholderImage({
      seed: product?.id ?? "huntdeal",
      label: product?.categoryName ?? "",
      category: product?.category,
    });

  const preferred = src ?? product?.imageUrl ?? fallback;

  // Remember which URL failed rather than overwriting the source, so a new
  // product (or a new src) is always attempted fresh.
  const [failedSrc, setFailedSrc] = useState(null);
  const current = failedSrc === preferred ? fallback : preferred;

  return (
    <img
      src={current}
      alt={alt ?? product?.name ?? ""}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => {
        if (preferred !== fallback) setFailedSrc(preferred);
      }}
      {...rest}
    />
  );
}
