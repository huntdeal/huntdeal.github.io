import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import AdminSidebar from "../admin/components/AdminSidebar.jsx";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

/**
 * Admin shell. Deliberately shares nothing with the public layout: its own
 * sidebar, its own header, no public navbar or footer.
 *
 * The route guard below is a UI convenience only. It keeps the panel tidy for
 * a signed-out visitor; it is not a security boundary, because all of this
 * runs in the browser.
 */
export default function AdminLayout() {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="admin">
      <AdminSidebar open={navOpen} onClose={() => setNavOpen(false)} />
      {navOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="admin__main">
        <Outlet context={{ openNav: () => setNavOpen(true) }} />
      </div>
    </div>
  );
}
