/** App-wide constants shared by pages, services and the admin panel. */

export const SITE = {
  name: "HuntDeal",
  tagline: "Deal discovery, daily",
  description:
    "HuntDeal is a shopping discovery platform that surfaces the best Amazon deals, discounts and trending products across every category.",
  email: "hello@huntdeal.example",
  supportEmail: "support@huntdeal.example",
  phone: "+91 80 4000 1234",
  address: "WeWork Prestige Central, Bengaluru 560001, India",
  affiliateDisclosure:
    "As an Amazon Associate I earn from qualifying purchases.",
  demoDataNotice:
    "Prices, ratings and availability shown here are demo data and are not live Amazon values.",
};

export const SOCIAL_LINKS = [
  { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  { id: "x", label: "X", href: "https://x.com" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com" },
  { id: "facebook", label: "Facebook", href: "https://facebook.com" },
  { id: "pinterest", label: "Pinterest", href: "https://pinterest.com" },
];

export const MAIN_NAV = [
  { label: "Home", to: "/" },
  { label: "Today's Deals", to: "/deals" },
  { label: "Categories", to: "/categories" },
  { label: "Trending", to: "/trending" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
];

export const FOOTER_NAV = {
  Explore: [
    { label: "Today's Deals", to: "/deals" },
    { label: "Categories", to: "/categories" },
    { label: "Trending Now", to: "/trending" },
    { label: "Wishlist", to: "/wishlist" },
  ],
  Company: [
    { label: "About HuntDeal", to: "/about" },
    { label: "Shopping Guides", to: "/blog" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ],
  Support: [
    { label: "How it works", to: "/about#how-it-works" },
    { label: "Affiliate disclosure", to: "/about#affiliate" },
    { label: "Deal accuracy", to: "/faq" },
    { label: "Report a problem", to: "/contact" },
  ],
};

export const SORT_OPTIONS = [
  { value: "popular", label: "Most popular" },
  { value: "newest", label: "Newest first" },
  { value: "discount", label: "Biggest discount" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
];

export const DISCOUNT_BUCKETS = [
  { value: "10", label: "10% and above" },
  { value: "25", label: "25% and above" },
  { value: "40", label: "40% and above" },
  { value: "50", label: "50% and above" },
  { value: "60", label: "60% and above" },
];

export const PRICE_BUCKETS = [
  { value: "0-1000", label: "Under ₹1,000", min: 0, max: 1000 },
  { value: "1000-3000", label: "₹1,000 – ₹3,000", min: 1000, max: 3000 },
  { value: "3000-10000", label: "₹3,000 – ₹10,000", min: 3000, max: 10000 },
  { value: "10000-30000", label: "₹10,000 – ₹30,000", min: 10000, max: 30000 },
  { value: "30000-", label: "Above ₹30,000", min: 30000, max: Infinity },
];

export const RATING_BUCKETS = [
  { value: "4.5", label: "4.5 and above" },
  { value: "4", label: "4.0 and above" },
  { value: "3.5", label: "3.5 and above" },
];

export const PAGE_SIZE = 12;

export const PRODUCT_STATUSES = [
  { value: "active", label: "Active", tone: "success" },
  { value: "paused", label: "Paused", tone: "amber" },
  { value: "draft", label: "Draft", tone: "neutral" },
];

export const ROLES = {
  ADMIN: "admin",
  PRODUCT_MANAGER: "product_manager",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Admin",
  [ROLES.PRODUCT_MANAGER]: "Product Manager",
};

/**
 * Frontend permission map. This drives what the admin UI *shows*.
 * Real authorization must be enforced by the backend as well — the UI can
 * only hide controls, it cannot protect data.
 */
export const PERMISSIONS = {
  [ROLES.ADMIN]: [
    "dashboard.view",
    "products.view",
    "products.create",
    "products.edit",
    "products.delete",
    "analytics.view",
    "users.manage",
    "settings.manage",
  ],
  [ROLES.PRODUCT_MANAGER]: [
    "dashboard.view",
    "products.view",
    "products.create",
    "products.edit",
  ],
};

export const PERMISSION_LABELS = {
  "dashboard.view": "View dashboard overview",
  "products.view": "View product listings",
  "products.create": "Add new products",
  "products.edit": "Edit permitted product fields",
  "products.delete": "Delete products",
  "analytics.view": "View click analytics",
  "users.manage": "Manage users and roles",
  "settings.manage": "Manage site settings",
};

export const STORAGE_KEYS = {
  wishlist: "huntdeal.wishlist.v1",
  adminSession: "huntdeal.admin.session.v1",
  adminProducts: "huntdeal.admin.products.v1",
  adminSettings: "huntdeal.admin.settings.v1",
  newsletter: "huntdeal.newsletter.v1",
  recentSearches: "huntdeal.recent-searches.v1",
};
