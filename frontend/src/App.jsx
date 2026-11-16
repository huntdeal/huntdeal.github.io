import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";
import LoadingState from "./components/states/LoadingState.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";

import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import Categories from "./pages/Categories.jsx";
import CategoryDetails from "./pages/CategoryDetails.jsx";
import Contact from "./pages/Contact.jsx";
import Deals from "./pages/Deals.jsx";
import FAQ from "./pages/FAQ.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Trending from "./pages/Trending.jsx";
import Wishlist from "./pages/Wishlist.jsx";

/**
 * Admin screens load on demand. They pull in Recharts and the whole admin
 * stylesheet's worth of behaviour, which no public visitor should download.
 */
const AdminAnalytics = lazy(() => import("./admin/pages/AdminAnalytics.jsx"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard.jsx"));
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin.jsx"));
const AdminProductEditor = lazy(
  () => import("./admin/pages/AdminProductEditor.jsx"),
);
const AdminProducts = lazy(() => import("./admin/pages/AdminProducts.jsx"));
const AdminSettings = lazy(() => import("./admin/pages/AdminSettings.jsx"));
const AdminUsers = lazy(() => import("./admin/pages/AdminUsers.jsx"));

/**
 * Route map.
 *
 * Public routes render inside PublicLayout (navbar + footer).
 * Admin routes render inside AdminLayout, which shares no chrome with the
 * public site. /admin/login sits outside both so it can be full-bleed.
 */
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <WishlistProvider>
          <AdminAuthProvider>
            <ScrollToTop />
            <Suspense fallback={<LoadingState label="Loading…" />}>
              <Routes>
                {/* Public ------------------------------------------------ */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route
                    path="/categories/:categorySlug"
                    element={<CategoryDetails />}
                  />
                  <Route
                    path="/product/:productId"
                    element={<ProductDetails />}
                  />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/trending" element={<Trending />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:postSlug" element={<BlogDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin ------------------------------------------------- */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route
                    index
                    element={<Navigate to="/admin/dashboard" replace />}
                  />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route
                    path="products/new"
                    element={<AdminProductEditor mode="create" />}
                  />
                  <Route
                    path="products/:productId/edit"
                    element={<AdminProductEditor mode="edit" />}
                  />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Routes>
            </Suspense>
          </AdminAuthProvider>
        </WishlistProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
