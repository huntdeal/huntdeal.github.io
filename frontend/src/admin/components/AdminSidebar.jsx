import { Link, NavLink } from "react-router-dom";
import {
  BarChart3,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Lock,
  Package,
  Settings,
  Tag,
  Users,
  X,
} from "lucide-react";

import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { initials } from "../../utils/format.js";

const NAV = [
  {
    label: "Overview",
    items: [
      { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, permission: "dashboard.view" },
      { to: "/admin/analytics", label: "Click analytics", icon: BarChart3, permission: "analytics.view" },
    ],
  },
  {
    label: "Catalogue",
    items: [
      { to: "/admin/products", label: "Products", icon: Package, permission: "products.view" },
    ],
  },
  {
    label: "Administration",
    items: [
      { to: "/admin/users", label: "Users & roles", icon: Users, permission: "users.manage" },
      { to: "/admin/settings", label: "Settings", icon: Settings, permission: "settings.manage" },
    ],
  },
];

/**
 * Admin navigation. Items the current role cannot access are shown locked
 * rather than hidden, so a Product Manager can see the boundary exists.
 * The backend must enforce the same rules — hiding a link protects nothing.
 */
export default function AdminSidebar({ open, onClose }) {
  const { user, roleLabel, can, signOut } = useAdminAuth();

  return (
    <aside className="admin-sidebar" data-open={open}>
      <div className="admin-sidebar__head">
        <Link to="/admin/dashboard" className="brand brand--inverse">
          <span className="brand__mark" aria-hidden="true">
            <Tag size={17} />
          </span>
          <span className="brand__text">
            <span className="brand__name">
              Hunt<em>Deal</em>
            </span>
            <span className="brand__tag">Admin panel</span>
          </span>
        </Link>
        {onClose && (
          <button
            type="button"
            className="icon-btn admin-sidebar__close"
            style={{ color: "rgba(255,255,255,.7)" }}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="admin-sidebar__nav" aria-label="Admin">
        {NAV.map((group) => (
          <div key={group.label}>
            <div className="admin-sidebar__label">{group.label}</div>
            {group.items.map((item) => {
              const allowed = can(item.permission);
              if (!allowed) {
                return (
                  <span
                    key={item.to}
                    className="admin-nav-link"
                    data-locked="true"
                    title={`${roleLabel} accounts cannot access this section`}
                    aria-disabled="true"
                  >
                    <item.icon size={17} aria-hidden="true" />
                    {item.label}
                    <Lock size={13} className="admin-nav-link__badge" aria-hidden="true" />
                  </span>
                );
              }
              return (
                <NavLink key={item.to} to={item.to} className="admin-nav-link" onClick={onClose}>
                  <item.icon size={17} aria-hidden="true" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        ))}

        <div>
          <div className="admin-sidebar__label">Public site</div>
          <a
            href="/"
            className="admin-nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={17} aria-hidden="true" />
            View website
          </a>
        </div>
      </nav>

      <div className="admin-sidebar__foot">
        <div className="admin-user">
          <span className="avatar" aria-hidden="true">
            {initials(user?.name ?? "HD")}
          </span>
          <span className="stack" style={{ minWidth: 0 }}>
            <span className="admin-user__name">{user?.name}</span>
            <span className="admin-user__role">{roleLabel}</span>
          </span>
        </div>
        <button
          type="button"
          className="admin-nav-link"
          onClick={signOut}
          style={{ width: "100%" }}
        >
          <LogOut size={17} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
