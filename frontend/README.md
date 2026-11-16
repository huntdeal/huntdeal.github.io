# HuntDeal — Frontend

A shopping-discovery frontend for Amazon affiliate deals: browse today's deals,
explore categories, search, save a wishlist, read buying guides — plus a
separate admin panel for the catalogue, analytics, users and settings.

This is a **frontend-only** build. Everything runs on mock data behind a service
layer that the real backend plugs into without touching a single component.

---

## Running it

```bash
npm install --prefix frontend
```

```bash
npm run dev --prefix frontend
```

The dev server prints a local URL (default `http://localhost:5173`).

Other scripts, all from the `frontend` directory:

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over the whole project |

### Deploying

`npm run build` produces a static `dist/`. Because the app uses client-side
routing, the host must rewrite unknown paths to `index.html`, or a refresh on
`/categories/gaming` will 404. On GitHub Pages the usual trick is to copy
`dist/index.html` to `dist/404.html`.

---

## Stack

React 19 · Vite · React Router 7 · lucide-react (icons) · Recharts (admin
charts) · plain CSS with design tokens. No CSS framework and no state library —
neither earned its weight here.

---

## Project structure

```
src/
  styles/        design tokens + global stylesheets (tokens, base, layout,
                 components, chrome, pages, admin), imported from styles/index.css
  data/          mock catalogue: products, categories, brands, blog, faqs,
                 analytics, users
  services/      API layer — the ONLY place that knows where data comes from
  context/       Wishlist, Toast, AdminAuth providers
  hooks/         useAsync, useProductQuery, useDebouncedValue, useLocalStorage
  utils/         formatting, placeholder artwork, constants
  layouts/       PublicLayout (navbar + footer), AdminLayout (sidebar shell)
  components/    reusable public components (+ ui/ primitives, states/)
  admin/         admin-only components and pages
  pages/         public pages
```

### Design system

All visual decisions live in `src/styles/tokens.css`: colour scales, semantic
surfaces, type scale, spacing, radii, shadows and motion. Change a token there
and the whole site follows.

- Background `#F7F8FC`, surfaces white, text `#172033`
- Primary `#5B5CE2`, secondary `#17A398`, highlight `#FFB547`
- Plus Jakarta Sans for headings, Inter for body text

### Product imagery

There is no product photography in the repo, so `src/utils/placeholder.js`
generates on-palette SVG artwork per product as a data URI — no network
request, no broken images, deterministic per product. When the backend supplies
`product.imageUrl`, `ProductImage` uses it and falls back to the generated
artwork only if the real image fails to load.

---

## Routes

### Public

| Route | Page |
| --- | --- |
| `/` | Home — hero, featured, today's best, trending, categories, top discounts, recently added, benefits, brands, newsletter |
| `/deals` | Today's Deals — search, filters, sorting, pagination |
| `/categories` | Category directory |
| `/categories/:categorySlug` | Category page (electronics, mobiles, laptops, fashion, home-kitchen, gaming, beauty, accessories) |
| `/product/:productId` | Product details — gallery, price, features, specs, related |
| `/search?q=` | Search across names, brands, categories and descriptions |
| `/trending` | Trending — podium, categories, popular products |
| `/wishlist` | Saved deals (localStorage) |
| `/blog` | Blog listing with featured article, search and topics |
| `/blog/:postSlug` | Article with related posts |
| `/about` | What HuntDeal is, how it works, affiliate transparency |
| `/contact` | Contact form with client-side validation |
| `/faq` | FAQ with topic navigation, search and accordions |
| `*` | 404 |

### Admin (`/admin`)

| Route | Page |
| --- | --- |
| `/admin/login` | Mock sign-in with demo accounts |
| `/admin/dashboard` | Stats, click chart, category split, top deals, recent products |
| `/admin/products` | Table with search, filters, status toggle, delete |
| `/admin/products/new` | Add product (live card preview) |
| `/admin/products/:productId/edit` | Edit product |
| `/admin/analytics` | Daily/weekly/monthly clicks, category and product performance |
| `/admin/users` | Role matrix, user table, invite flow |
| `/admin/settings` | Profile, site info, affiliate disclosure, preferences |

**Demo accounts** (any password of six characters or more):

- `admin@huntdeal.example` — Admin, full access
- `ritika@huntdeal.example` — Product Manager, catalogue only

---

## ⚠️ What is mock and what is not

| Area | Status |
| --- | --- |
| Products, prices, ratings, availability | Demo data. Not live Amazon values. |
| Brands | Fictional house brands, so demo prices are never attached to a real manufacturer. |
| Click counts, trending ranks, all admin analytics | Generated from a fixed seed. Not real user activity. |
| Admin sign-in | **Not authentication.** A session object in localStorage; any 6+ character password is accepted. |
| Role permissions | UI visibility only. The backend must enforce authorization independently. |
| Contact form, newsletter | Validated, then not delivered anywhere. |
| Admin product CRUD | Writes to a localStorage-backed mock store. "Reset demo data" restores the shipped catalogue. |

The UI states all of this to the visitor as well — in the announcement bar, on
product pages, and on every analytics screen.

---

## Backend integration points

Components never call the network. They call a service; the service decides
between mock data and HTTP. To go live:

1. Add `VITE_API_BASE_URL` to `frontend/.env`
2. Set `VITE_USE_MOCK_API=false`
3. Reconcile the paths in `src/services/apiConfig.js` with the real routes
4. Replace each service function body with the matching `http.*` call

No UI component changes. Each function below keeps its signature and return
shape.

### `productService.js`
| Function | Endpoint slot | Returns |
| --- | --- | --- |
| `listProducts(query)` | `products.list` | `{ items, total, page, pageCount, pageSize, facets }` |
| `getProduct(id)` | `products.detail` | product |
| `getRelatedProducts(id, limit)` | `products.related` | product[] |
| `getFeaturedProducts(limit)` | `products.featured` | product[] |
| `getTrendingProducts(limit)` | `products.trending` | product[] with `rank` |
| `getTopDiscounts`, `getRecentProducts`, `getTodaysDeals` | `products.list` with sort params | product[] |
| `searchProducts(term, query)` | `products.search` | same as `listProducts` |
| `getProductsByIds(ids)` | `products.list` by id | product[] (wishlist hydration) |
| `getCatalogueStats()` | — | `{ products, categories, brands, avgDiscount, maxDiscount }` |
| `trackAffiliateClick(id)` | `products.trackClick` | `{ ok }` |
| `createProduct`, `updateProduct`, `deleteProduct`, `setProductStatus` | `products.create/update/remove` | product |

### `categoryService.js`
`listCategories()`, `getCategory(slug)`, `getCategoryProducts(slug, query)` →
`categories.list` / `.detail` / `.products`

### `blogService.js`
`listPosts(query)`, `getPost(slug)`, `getRelatedPosts(slug)`,
`getFeaturedPost()` → `blog.list` / `.detail`

### `analyticsService.js`
`getDashboardSummary()`, `getClickSeries(range)`, `getClickTotals()`,
`getCategoryPerformance()`, `getTopProducts()`, `getProductPerformance()`,
`getRecentlyAdded()`, `getNotifications()` → `analytics.*`

Flip `ANALYTICS_IS_MOCK` to `false` once these are real, and the "demo data"
labels can come down.

### `authService.js`
`login({ email, password, remember })`, `logout()`, `readSession()` →
`auth.login` / `.logout` / `.session`. **Replace this first.** The current
implementation is a demo and provides no security.

### `userService.js`
`listUsers`, `inviteUser`, `updateUserRole`, `updateUserStatus`, `removeUser` →
`users.*`

### `siteService.js`
`submitContactMessage`, `subscribeToNewsletter`, `getSettings`, `saveSettings`
→ `contact`, `newsletter`, `settings.*`

### Product shape expected by the UI

```js
{
  id, slug, name, brand,
  category,          // slug, e.g. "home-kitchen"
  categoryName,      // display name
  description, features: [], specs: {},
  price, originalPrice, discount, savings,
  rating, reviewCount, clicks, popularity,
  imageUrl,          // real image, or null
  images: [],        // gallery (generated when imageUrl is null)
  affiliateUrl, availability,
  isFeatured, isTrending,
  status,            // "active" | "paused" | "draft"
  createdAt, updatedAt
}
```

### Affiliate tag

`AFFILIATE_TAG` in `src/data/products.js` is a placeholder. The real Associates
tag belongs in backend configuration — never commit credentials or API keys to
this repo.

---

## Amazon Associates compliance

- The disclosure *"As an Amazon Associate I earn from qualifying purchases"*
  appears in the footer, on product pages and in the FAQ.
- Affiliate links open in a new tab with `rel="noopener noreferrer sponsored"`.
- No cart, no checkout — HuntDeal never claims to sell anything.
- No claims of live stock or guaranteed prices; every deal page tells the
  visitor to confirm on Amazon.
