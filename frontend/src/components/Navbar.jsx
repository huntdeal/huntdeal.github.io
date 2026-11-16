import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, Tag, X } from "lucide-react";

import SearchBar from "./SearchBar.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { MAIN_NAV } from "../utils/constants.js";

function BrandMark({ inverse = false }) {
  return (
    <Link to="/" className={`brand ${inverse ? "brand--inverse" : ""}`}>
      <span className="brand__mark" aria-hidden="true">
        <Tag size={18} />
      </span>
      <span className="brand__text">
        <span className="brand__name">
          Hunt<em>Deal</em>
        </span>
        <span className="brand__tag">Deal discovery, daily</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const wishlist = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const routeKey = `${location.pathname}${location.search}`;

  /**
   * Panels remember the route they were opened on, so a navigation closes
   * them without an effect that would re-render the whole header.
   */
  const [panel, setPanel] = useState({ menu: false, search: false, at: routeKey });
  const menuOpen = panel.menu && panel.at === routeKey;
  const searchOpen = panel.search && panel.at === routeKey;

  const setMenuOpen = (value) =>
    setPanel({
      menu: typeof value === "function" ? value(menuOpen) : value,
      search: false,
      at: routeKey,
    });

  const setSearchOpen = (value) =>
    setPanel({
      menu: false,
      search: typeof value === "function" ? value(searchOpen) : value,
      at: routeKey,
    });

  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    function onScroll() {
      setStuck(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function runSearch(term) {
    const query = term.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
    setSearchOpen(false);
  }

  return (
    <>
      <div className="announce">
        <div className="shell announce__inner">
          <span>
            Demo build — prices and availability are sample data.{" "}
            <strong>Always confirm on Amazon before buying.</strong>
          </span>
        </div>
      </div>

      <header className="navbar" data-stuck={stuck}>
        <div className="shell navbar__inner">
          <BrandMark />

          <nav className="navbar__links" aria-label="Main">
            {MAIN_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="nav-link"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>

            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <Heart size={19} />
              {wishlist.count > 0 && (
                <span className="icon-btn__count">{wishlist.count}</span>
              )}
            </Link>

            <Link to="/deals" className="btn btn--primary btn--sm navbar__cta">
              Today&apos;s deals
            </Link>

            <button
              type="button"
              className="icon-btn navbar__burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="shell" style={{ paddingBottom: "var(--sp-4)" }}>
            <SearchBar
              autoFocus
              defaultValue=""
              onSubmit={runSearch}
              placeholder="Search deals, brands or categories"
            />
          </div>
        )}
      </header>

      {menuOpen && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="drawer__head">
              <BrandMark />
              <button
                type="button"
                className="icon-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer__body">
              <SearchBar onSubmit={runSearch} placeholder="Search deals" />

              <nav className="drawer__nav" aria-label="Mobile">
                {MAIN_NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className="drawer__link"
                  >
                    {item.label}
                  </NavLink>
                ))}
                <NavLink to="/wishlist" className="drawer__link">
                  Wishlist
                  {wishlist.count > 0 && (
                    <span className="badge badge--brand">{wishlist.count}</span>
                  )}
                </NavLink>
                <NavLink to="/faq" className="drawer__link">
                  FAQ
                </NavLink>
                <NavLink to="/contact" className="drawer__link">
                  Contact
                </NavLink>
              </nav>
            </div>

            <div className="drawer__foot">
              <Link to="/deals" className="btn btn--primary btn--block">
                Browse today&apos;s deals
              </Link>
              <Link to="/admin/login" className="btn btn--ghost btn--block">
                Admin panel
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
