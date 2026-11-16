import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, UserCog } from "lucide-react";

import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { useAsync } from "../../hooks/useAsync.js";
import { getNotifications } from "../../services/analyticsService.js";
import { initials } from "../../utils/format.js";

/** Closes a popover on outside click or Escape. */
function useDismiss(ref, onDismiss) {
  useEffect(() => {
    function onPointerDown(event) {
      if (ref.current && !ref.current.contains(event.target)) onDismiss();
    }
    function onKeyDown(event) {
      if (event.key === "Escape") onDismiss();
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, onDismiss]);
}

export default function AdminHeader({ title, subtitle, actions, onMenuClick, onSearch }) {
  const { user, roleLabel, signOut } = useAdminAuth();
  const { data: notifications } = useAsync(() => getNotifications(), []);

  const [openPanel, setOpenPanel] = useState(null);
  const [seen, setSeen] = useState(false);
  const bellRef = useRef(null);
  const profileRef = useRef(null);

  useDismiss(bellRef, () => setOpenPanel((p) => (p === "bell" ? null : p)));
  useDismiss(profileRef, () => setOpenPanel((p) => (p === "profile" ? null : p)));

  const unread = seen
    ? 0
    : (notifications ?? []).filter((item) => item.unread).length;

  return (
    <header className="admin-header">
      <button
        type="button"
        className="icon-btn admin-header__burger"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="admin-header__titles">
        <span className="admin-header__title">{title}</span>
        {subtitle && <span className="admin-header__sub">{subtitle}</span>}
      </div>

      <div className="admin-header__spacer" />

      {onSearch && (
        <div className="admin-header__search">
          <div className="input-group">
            <span className="input-group__icon">
              <Search size={16} />
            </span>
            <input
              type="search"
              className="input"
              placeholder="Search products"
              onChange={(event) => onSearch(event.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>
      )}

      {actions}

      {/* Notifications ---------------------------------------------------- */}
      <div className="popover-wrap" ref={bellRef}>
        <button
          type="button"
          className="icon-btn"
          aria-label="Notifications"
          aria-expanded={openPanel === "bell"}
          onClick={() => {
            setOpenPanel((p) => (p === "bell" ? null : "bell"));
            setSeen(true);
          }}
        >
          <Bell size={19} />
          {unread > 0 && <span className="icon-btn__count">{unread}</span>}
        </button>

        {openPanel === "bell" && (
          <div className="popover" role="dialog" aria-label="Notifications">
            <div className="popover__head">
              <span>Notifications</span>
              <span className="badge badge--neutral">Demo</span>
            </div>
            <div className="popover__list">
              {(notifications ?? []).map((item) => (
                <div
                  className="popover__item"
                  key={item.id}
                  data-unread={!seen && item.unread}
                >
                  <span className="popover__dot" aria-hidden="true" />
                  <span className="stack" style={{ gap: 2 }}>
                    <strong style={{ fontSize: "var(--fs-sm)" }}>{item.title}</strong>
                    <span className="text-xs text-muted">{item.body}</span>
                    <span className="popover__time">{item.time}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile ---------------------------------------------------------- */}
      <div className="popover-wrap" ref={profileRef}>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          aria-expanded={openPanel === "profile"}
          onClick={() => setOpenPanel((p) => (p === "profile" ? null : "profile"))}
        >
          <span className="avatar avatar--sm" aria-hidden="true">
            {initials(user?.name ?? "HD")}
          </span>
          <ChevronDown size={14} aria-hidden="true" />
        </button>

        {openPanel === "profile" && (
          <div className="popover" role="dialog" aria-label="Account">
            <div className="popover__head" style={{ display: "block" }}>
              <div style={{ fontWeight: 700 }}>{user?.name}</div>
              <div className="text-xs text-muted">{user?.email}</div>
              <span className="badge badge--brand" style={{ marginTop: 8 }}>
                {roleLabel}
              </span>
            </div>
            <div className="popover__menu">
              <Link to="/admin/settings" className="popover__menu-item">
                <UserCog size={16} aria-hidden="true" />
                Profile &amp; settings
              </Link>
              <Link to="/admin/settings" className="popover__menu-item">
                <Settings size={16} aria-hidden="true" />
                Site configuration
              </Link>
              <button type="button" className="popover__menu-item" onClick={signOut}>
                <LogOut size={16} aria-hidden="true" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
