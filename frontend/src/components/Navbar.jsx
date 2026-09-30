import { Link, NavLink } from "react-router-dom";
import {
  Search,
  Heart,
  User,
} from "lucide-react";

function Navbar() {
  return (
    <header className="site-navbar">
      <div className="navbar-container">

        {/* LOGO */}

        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-box">H</span>

          <span>
            Hunt<span>Deal</span>
          </span>
        </Link>

        {/* NAVIGATION */}

        <nav className="navbar-links">

          <NavLink to="/deals">
            Today's Deals
          </NavLink>

          <NavLink to="/categories">
            Categories
          </NavLink>

          <NavLink to="/trending">
            Trending
          </NavLink>

          <NavLink to="/blog">
            Blog
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>

        </nav>

        {/* ACTIONS */}

        <div className="navbar-actions">

          <Link
            to="/search"
            className="navbar-icon"
            aria-label="Search"
          >
            <Search size={18} />
          </Link>

          <Link
            to="/"
            className="navbar-icon"
            aria-label="Wishlist"
          >
            <Heart size={18} />
          </Link>

          <Link
            to="/admin/login"
            className="navbar-icon"
            aria-label="Admin"
          >
            <User size={18} />
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;