import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        {/* MAIN FOOTER */}

        <div className="footer-main">

          {/* BRAND */}

          <div className="footer-brand">

            <Link to="/" className="footer-logo">
              <span className="footer-logo-box">H</span>

              <span>
                Hunt<span>Deal</span>
              </span>
            </Link>

            <p>
              Your place to discover hand-picked deals
              and smarter savings.
            </p>

            <p className="footer-tagline">
              Don't miss out.
            </p>

          </div>

          {/* EXPLORE */}

          <div className="footer-column">

            <h4>Explore</h4>

            <Link to="/deals">
              Today's Deals
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link to="/trending">
              Trending
            </Link>

            <Link to="/blog">
              Blog
            </Link>

          </div>

          {/* COMPANY */}

          <div className="footer-column">

            <h4>Company</h4>

            <Link to="/about">
              About Us
            </Link>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/faq">
              FAQ
            </Link>

          </div>

          {/* LEGAL */}

          <div className="footer-column">

            <h4>Legal</h4>

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms
            </Link>

            <Link to="/affiliate-disclosure">
              Affiliate Disclosure
            </Link>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="footer-bottom">

          <span>
            © 2026 HuntDeal. All rights reserved.
          </span>

          <span>
            As an Amazon Associate I earn from qualifying purchases.
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;