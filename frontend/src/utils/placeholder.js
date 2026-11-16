/**
 * Deterministic SVG placeholder artwork.
 *
 * HuntDeal does not host product photography — the catalogue is an affiliate
 * index, and real imagery arrives with the backend (`product.imageUrl`).
 * Until then every card renders a generated, on-palette placeholder instead of
 * a broken image or an unrelated stock photo. The output is a data URI, so it
 * never produces a network request and can never 404.
 */

const PALETTES = {
  electronics: ["#EEF0FF", "#D9DCFB", "#5B5CE2"],
  mobiles: ["#E9F6F4", "#CDEAE6", "#17A398"],
  laptops: ["#EDF1F8", "#D8E0EE", "#3C5A8A"],
  fashion: ["#FDEFF3", "#F7D9E3", "#C2567F"],
  "home-kitchen": ["#FFF5E8", "#FBE4C8", "#D98B2B"],
  gaming: ["#F0ECFD", "#DED6FA", "#7A4FE0"],
  beauty: ["#FBEEF8", "#F3DAEE", "#A854A0"],
  accessories: ["#EAF3FA", "#D2E6F3", "#2D7FA8"],
  blog: ["#EEF0FF", "#DDE1FA", "#4A4BCB"],
  default: ["#F0F2F9", "#DFE3EF", "#667085"],
};

/** Stable 32-bit hash so the same input always yields the same artwork. */
function hash(input = "") {
  let value = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return Math.abs(value);
}

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** One of four abstract compositions, picked by hash. */
function shapesFor(variant, accent) {
  switch (variant) {
    case 0:
      return `
        <rect x="250" y="170" width="300" height="200" rx="26" fill="${accent}" opacity="0.16"/>
        <rect x="286" y="206" width="228" height="128" rx="16" fill="${accent}" opacity="0.3"/>
        <circle cx="400" cy="270" r="40" fill="${accent}" opacity="0.5"/>`;
    case 1:
      return `
        <circle cx="400" cy="270" r="118" fill="${accent}" opacity="0.14"/>
        <circle cx="400" cy="270" r="78" fill="${accent}" opacity="0.26"/>
        <rect x="358" y="150" width="84" height="240" rx="42" fill="${accent}" opacity="0.4"/>`;
    case 2:
      return `
        <rect x="282" y="140" width="236" height="260" rx="34" fill="${accent}" opacity="0.16"/>
        <rect x="318" y="182" width="164" height="118" rx="14" fill="${accent}" opacity="0.34"/>
        <rect x="344" y="326" width="112" height="18" rx="9" fill="${accent}" opacity="0.46"/>`;
    default:
      return `
        <path d="M300 380 L400 150 L500 380 Z" fill="${accent}" opacity="0.18"/>
        <circle cx="400" cy="246" r="62" fill="${accent}" opacity="0.32"/>
        <rect x="296" y="372" width="208" height="16" rx="8" fill="${accent}" opacity="0.44"/>`;
  }
}

/**
 * @param {object} options
 * @param {string} options.seed   Stable key (product id/slug).
 * @param {string} [options.label] Small caption drawn on the artwork.
 * @param {string} [options.category] Palette key.
 * @param {number} [options.variant] Force a composition (0-3).
 * @returns {string} An `data:image/svg+xml` URI.
 */
export function placeholderImage({
  seed = "huntdeal",
  label = "",
  category = "default",
  variant,
} = {}) {
  const [from, to, accent] = PALETTES[category] ?? PALETTES.default;
  const h = hash(`${seed}:${category}`);
  const shapeIndex = variant ?? h % 4;
  const gradientId = `g${h % 100000}`;
  const caption = escapeXml(label).slice(0, 34);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img">
  <defs>
    <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#${gradientId})"/>
  <circle cx="92" cy="86" r="120" fill="${accent}" opacity="0.07"/>
  <circle cx="724" cy="520" r="150" fill="${accent}" opacity="0.07"/>
  ${shapesFor(shapeIndex, accent)}
  ${
    caption
      ? `<text x="400" y="486" text-anchor="middle" font-family="Plus Jakarta Sans, Inter, Segoe UI, sans-serif" font-size="26" font-weight="700" fill="${accent}" opacity="0.72">${caption}</text>`
      : ""
  }
  <text x="400" y="524" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="17" letter-spacing="3" fill="${accent}" opacity="0.5">HUNTDEAL</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Gallery of N placeholder angles for a single product. */
export function placeholderGallery(seed, label, category, count = 4) {
  return Array.from({ length: count }, (_, index) =>
    placeholderImage({
      seed: `${seed}-${index}`,
      label: index === 0 ? label : "",
      category,
      variant: index % 4,
    }),
  );
}

/** Wide artwork for blog/editorial cards. */
export function placeholderArticle(seed, label) {
  return placeholderImage({ seed, label, category: "blog" });
}
