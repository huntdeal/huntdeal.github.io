import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./Header";
import GuidePage from "./GuidePage";
import GuideIndex from "./GuideIndex";
import ContactPage from "./ContactPage";
import PrivacyPolicy from "./PrivacyPolicy";
import Terms from "./Terms";
import Footer from "./Footer";
import About from "./About";

const API_URL = "https://huntdeal-backend.onrender.com";

const categoryIcon = (category = "") => {
  const value = category.toLowerCase();
  if (value.includes("elect")) return "💻";
  if (value.includes("fashion") || value.includes("cloth")) return "👕";
  if (value.includes("home")) return "🏠";
  if (value.includes("kitchen")) return "🍳";
  if (value.includes("beauty")) return "✨";
  if (value.includes("sports")) return "🏃";
  if (value.includes("grocery")) return "🛒";
  return "🛍️";
};

function HomePage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(
    () => new URLSearchParams(window.location.search).get("search") || ""
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/deals`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch deals");
        return response.json();
      })
      .then((data) => {
        setDeals(data.deals || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load deals right now. Please try again later.");
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    return [...new Set(deals.map((deal) => deal.category).filter(Boolean))].sort();
  }, [deals]);

  const filteredDeals = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesSearch =
        !search || deal.title?.toLowerCase().includes(search);
      const matchesCategory =
        categoryFilter === "all" || deal.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [deals, searchTerm, categoryFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    window.history.replaceState({}, "", "/#deals");
  };

  const openDealDetails = (deal) => setSelectedDeal(deal);
  const closeDealDetails = () => setSelectedDeal(null);

  return (
    <div className="app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">AMAZON DEAL DISCOVERY</p>
          <h1>
            Find useful deals.
            <br />
            <span>Skip the hunting.</span>
          </h1>
          <p className="hero-text">
            HuntDeal helps you discover products worth checking on Amazon.
            Always verify the latest price and availability on Amazon before purchasing.
          </p>
          <a className="hero-button" href="#deals">Explore Today's Deals</a>
        </div>
      </section>

      <main>
        <section className="container categories-section" id="categories">
          <div className="section-heading">
            <div>
              <p className="section-label">BROWSE</p>
              <h2>Shop by Category</h2>
            </div>
            <span className="section-note">
              {categories.length} categories
            </span>
          </div>

          <div className="category-grid">
            <button
              className={`category-card ${categoryFilter === "all" ? "active" : ""}`}
              onClick={() => {
                setCategoryFilter("all");
                document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="category-icon">🛍️</span>
              <span>All Deals</span>
            </button>

            {categories.map((category) => (
              <button
                className={`category-card ${categoryFilter === category ? "active" : ""}`}
                key={category}
                onClick={() => {
                  setCategoryFilter(category);
                  document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="category-icon">{categoryIcon(category)}</span>
                <span>{category}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="container deals-section" id="deals">
          <div className="section-heading">
            <div>
              <p className="section-label">LATEST</p>
              <h2>Today's Deals</h2>
            </div>
            <span className="deal-count">
              {filteredDeals.length} of {deals.length} deals
            </span>
          </div>

          {!loading && !error && (
            <div className="filter-bar">
              <div className="filter-group">
                <span className="filter-title">Category</span>
                <button
                  className={`filter-button ${categoryFilter === "all" ? "active" : ""}`}
                  onClick={() => setCategoryFilter("all")}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    className={`filter-button ${categoryFilter === category ? "active" : ""}`}
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {(searchTerm || categoryFilter !== "all") && (
                <button className="clear-button" onClick={clearFilters}>
                  Clear
                </button>
              )}
            </div>
          )}

          {loading && (
            <div className="message">
              <div className="spinner" />
              <p>Hunting for deals...</p>
            </div>
          )}

          {!loading && error && (
            <div className="message error"><p>{error}</p></div>
          )}

          {!loading && !error && filteredDeals.length === 0 && (
            <div className="message">
              <p className="no-results-icon">🔎</p>
              <h3>No deals found</h3>
              <p>Try another search or remove your filters.</p>
              <button className="reset-button" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}

          {!loading && !error && filteredDeals.length > 0 && (
            <div className="deal-grid">
              {filteredDeals.map((deal) => (
                <article className="deal-card" key={deal.asin}>
                  <div className="image-wrapper">
                    <img
                      src={deal.image_url}
                      alt={deal.title}
                    />
                  </div>

                  <div className="deal-content">
                    <p className="deal-category">{deal.category || "Other"}</p>
                    <p className="asin">{deal.asin}</p>
                    <h3 title={deal.title}>{deal.title}</h3>

                    <div className="price-row">
                      <span className="price">Check latest price on Amazon</span>
                    </div>

                    <p className="verification-note">
                      Verify price & availability on Amazon before purchasing.
                    </p>

                    <div className="deal-actions">
                      <button
                        className="details-button"
                        onClick={() => openDealDetails(deal)}
                      >
                        View Details
                      </button>

                      <div className="amazon-link-wrapper">
                        <a
                          className="deal-button"
                          href={`https://www.amazon.in/dp/${deal.asin}?tag=huntdeal01-21`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Amazon →
                        </a>
                        <small className="affiliate-disclosure">(paid link)</small>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="value-section">
          <div className="container value-grid">
            <div>
              <p className="section-label">WHY HUNTDEAL</p>
              <h2>A simpler way to discover products worth checking.</h2>
            </div>
            <div className="value-items">
              <div><strong>Curated discovery</strong><span>Browse a focused selection instead of endless product pages.</span></div>
              <div><strong>Useful organization</strong><span>Explore deals through categories and buying guides.</span></div>
              <div><strong>Amazon verification</strong><span>We send you to Amazon to check the current price and availability.</span></div>
            </div>
          </div>
        </section>

        <section className="container guides-promo">
          <div>
            <p className="section-label">BUYING GUIDES</p>
            <h2>Make better-informed product choices.</h2>
            <p>Read practical guides covering everyday products, kitchen essentials, home organization and more.</p>
          </div>
          <a className="secondary-button" href="/guides">Explore Guides →</a>
        </section>
      </main>

      {selectedDeal && (
        <div className="modal-overlay" onClick={closeDealDetails}>
          <div className="deal-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={closeDealDetails} aria-label="Close">×</button>

            <div className="modal-product">
              <div className="modal-image">
                <img src={selectedDeal.image_url} alt={selectedDeal.title} />
              </div>

              <div className="modal-info">
                <p className="modal-brand">{selectedDeal.brand || "Brand unavailable"}</p>
                <h2>{selectedDeal.title}</h2>
                <div className="modal-price">Check latest price on Amazon</div>

                <div className="modal-details">
                  <p><strong>Category:</strong> {selectedDeal.category || "Other"}</p>
                  <p><strong>ASIN:</strong> {selectedDeal.asin}</p>
                </div>

                <p className="verification-note">
                  Price and availability can change. Verify the current details on Amazon.
                </p>

                <a
                  className="modal-amazon-button"
                  href={`https://www.amazon.in/dp/${selectedDeal.asin}?tag=huntdeal01-21`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Amazon →
                </a>
                <small className="affiliate-disclosure">(paid link)</small>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function App() {
  const path = window.location.pathname;

  if (path === "/contact") return <ContactPage />;
  if (path === "/about") return <About />;
  if (path === "/terms") return <Terms />;
  if (path === "/privacy-policy") return <PrivacyPolicy />;
  if (path === "/guides") return <GuideIndex />;
  if (path.startsWith("/guides/")) {
    return <GuidePage slug={path.replace("/guides/", "")} />;
  }

  return <HomePage />;
}

export default App;
