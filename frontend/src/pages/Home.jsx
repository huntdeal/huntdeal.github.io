import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Search,
  User,
  Heart,
  Menu,
  X,
  ChevronRight,
  Zap,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import "../App.css";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: "💻",
  },
  {
    name: "Mobiles",
    slug: "mobiles",
    icon: "📱",
  },
  {
    name: "Laptops",
    slug: "laptops",
    icon: "💻",
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: "👟",
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    icon: "🏠",
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: "🎮",
  },
  {
    name: "Beauty",
    slug: "beauty",
    icon: "✨",
  },
  {
    name: "Accessories",
    slug: "accessories",
    icon: "🎧",
  },
];

const deals = [
  {
    title: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: "₹2,499",
    oldPrice: "₹4,999",
    discount: "50% OFF",
    rating: "4.4",
    emoji: "🎧",
  },
  {
    title: "Smart Watch with AMOLED Display",
    category: "Wearables",
    price: "₹1,799",
    oldPrice: "₹3,099",
    discount: "42% OFF",
    rating: "4.3",
    emoji: "⌚",
  },
  {
    title: "Mechanical Gaming Keyboard",
    category: "Gaming",
    price: "₹2,199",
    oldPrice: "₹3,999",
    discount: "45% OFF",
    rating: "4.5",
    emoji: "⌨️",
  },
  {
    title: "Air Fryer Digital 4.5L",
    category: "Home & Kitchen",
    price: "₹3,499",
    oldPrice: "₹5,999",
    discount: "42% OFF",
    rating: "4.2",
    emoji: "🍳",
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container nav-inner">
          <a href="#" className="logo">
            <span className="logo-mark">H</span>
            <span>Hunt<span>Deal</span></span>
          </a>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/deals">Today's Deals</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/trending">Trending</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" aria-label="Search">
              <Search size={19} />
            </button>

            <button className="icon-btn desktop-only" aria-label="Account">
              <User size={19} />
            </button>

            <button className="icon-btn desktop-only" aria-label="Wishlist">
              <Heart size={19} />
            </button>

            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero">
          <div className="hero-glow glow-one"></div>
          <div className="hero-glow glow-two"></div>

          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow">
                <Zap size={15} />
                <span>Deals worth hunting</span>
              </div>

              <h1>
                Find the <span>Best Deals.</span>
                <br />
                Before They’re Gone.
              </h1>

              <p>
                Discover hand-picked deals, trending products and huge
                discounts — all in one place.
              </p>

              <div className="hero-buttons">
                <a href="#deals" className="btn btn-primary">
                  Explore Deals
                  <ChevronRight size={18} />
                </a>

                <a href="#categories" className="btn btn-secondary">
                  Browse Categories
                </a>
              </div>

              <div className="hero-trust">
                <div>
                  <strong>1,000+</strong>
                  <span>Deals Found</span>
                </div>

                <div>
                  <strong>50K+</strong>
                  <span>Deal Hunters</span>
                </div>

                <div>
                  <strong>Daily</strong>
                  <span>Updates</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-orbit orbit-one"></div>
              <div className="hero-orbit orbit-two"></div>

              <div className="deal-card-floating">
                <div className="floating-badge">🔥 HOT DEAL</div>

                <div className="floating-product">🎧</div>

                <div className="floating-info">
                  <span>Wireless Headphones</span>
                  <strong>₹2,499</strong>
                  <del>₹4,999</del>
                </div>

                <div className="floating-discount">50% OFF</div>
              </div>

              <div className="floating-small-card card-top">
                <TrendingUp size={17} />
                <span>Trending Now</span>
              </div>

              <div className="floating-small-card card-bottom">
                <ShieldCheck size={17} />
                <span>Verified Deals</span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div className="container feature-grid">
            <div className="feature-item">
              <Zap size={22} />
              <div>
                <strong>Updated Daily</strong>
                <span>Fresh deals every day</span>
              </div>
            </div>

            <div className="feature-item">
              <ShieldCheck size={22} />
              <div>
                <strong>Verified Deals</strong>
                <span>Hand-picked offers</span>
              </div>
            </div>

            <div className="feature-item">
              <TrendingUp size={22} />
              <div>
                <strong>Big Discounts</strong>
                <span>Find better prices</span>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section" id="categories">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">EXPLORE</span>
                <h2>Shop by Category</h2>
              </div>

              <Link to="/categories" className="view-all">
                View All <ChevronRight size={17} />
                </Link>
            </div>

            <div className="category-grid">
              {categories.map((category) => (
                <Link
                    to={`/categories/${category.slug}`}
                    className="category-card"
                    key={category.name}
                >
                  <div className="category-icon">{category.icon}</div>
                  <span>{category.name}</span>
                  <ChevronRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DEALS */}
        <section className="section deals-section" id="deals">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">TODAY'S PICKS</span>
                <h2>Today's Best Deals</h2>
              </div>

                <Link to="/deals" className="view-all">
                    See All Deals <ChevronRight size={17} />
                </Link>
            </div>

            <div className="deal-grid">
              {deals.map((deal) => (
                <article className="product-card" key={deal.title}>
                  <div className="product-image">
                    <span className="discount-badge">
                      {deal.discount}
                    </span>

                    <button className="wishlist-btn">
                      <Heart size={17} />
                    </button>

                    <div className="product-emoji">{deal.emoji}</div>
                  </div>

                  <div className="product-content">
                    <span className="product-category">
                      {deal.category}
                    </span>

                    <h3>{deal.title}</h3>

                    <div className="rating">
                      <span>★</span>
                      {deal.rating}
                    </div>

                    <div className="price-row">
                      <strong>{deal.price}</strong>
                      <del>{deal.oldPrice}</del>
                    </div>

                    <a href="#" className="deal-button">
                      View Deal
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="trending">
          <div className="container">
            <div className="cta-box">
              <div>
                <span className="section-label">DON'T MISS OUT</span>
                <h2>More deals are waiting for you.</h2>
                <p>
                  Keep hunting. Keep saving. Find your next great deal with
                  HuntDeal.
                </p>
              </div>

              <a href="#deals" className="btn btn-primary">
                Explore All Deals
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div>
            <a href="#" className="logo footer-logo">
              <span className="logo-mark">H</span>
              <span>Hunt<span>Deal</span></span>
            </a>

            <p>
              Your place to discover hand-picked deals and smarter savings.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <a href="#deals">Today's Deals</a>
            <a href="#categories">Categories</a>
            <a href="#trending">Trending</a>
          </div>

          <div id="about">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="#">FAQ</a>
          </div>

          <div>
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Affiliate Disclosure</a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 HuntDeal. All rights reserved.</span>
          <span>As an Amazon Associate I earn from qualifying purchases.</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;