  import { useEffect, useMemo, useState } from "react";
  import "./App.css";

  const API_URL = "https://huntdeal-backend.onrender.com";

  function App() {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Search
    const [searchTerm, setSearchTerm] = useState("");

    // Discount filter
    const [discountFilter, setDiscountFilter] = useState("all");

    // Sorting
    const [sortBy, setSortBy] = useState("discount");
    
    // Price Filter
    const [priceFilter, setPriceFilter] = useState("all");
    
    // Category Filter
    const [categoryFilter, setCategoryFilter] = useState("all");

    // Selected Deal
    const [selectedDeal, setSelectedDeal] = useState(null);

    // Price History
    const [priceHistory, setPriceHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    useEffect(() => {
      fetch(`${API_URL}/api/deals`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch deals");
          }

          return response.json();
        })
        .then((data) => {
          setDeals(data.deals || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(
            "Unable to load deals. Make sure the backend is running."
          );
          setLoading(false);
        });
    }, []);

    // ============================================================
    // SEARCH + FILTER + SORT
    // ============================================================

    const categories = useMemo(() => {
      const uniqueCategories = [
        ...new Set(
          deals
            .map((deal) => deal.category)
            .filter(Boolean)
        ),
      ];

      return uniqueCategories.sort();
    }, [deals]);

    const filteredDeals = useMemo(() => {
      let result = [...deals];

      // ----------------------------------------------------------
      // SEARCH
      // ----------------------------------------------------------

      const search = searchTerm.trim().toLowerCase();

      if (search) {
        result = result.filter((deal) =>
          deal.title?.toLowerCase().includes(search)
        );
      }

      // ----------------------------------------------------------
      // DISCOUNT FILTER
      // ----------------------------------------------------------

      if (discountFilter !== "all") {
        const minimumDiscount = Number(discountFilter);

        result = result.filter(
          (deal) =>
            Number(deal.discount_percent || 0) >= minimumDiscount
        );
      }


      // ----------------------------------------------------------
      // PRICE FILTER
      // ----------------------------------------------------------

      if (priceFilter !== "all") {
        result = result.filter((deal) => {
          const price = Number(deal.price || 0);

          if (priceFilter === "under-500") {
            return price < 500;
          }

          if (priceFilter === "500-1000") {
            return price >= 500 && price <= 1000;
          }

          if (priceFilter === "1000-2500") {
            return price > 1000 && price <= 2500;
          }

          if (priceFilter === "2500-5000") {
            return price > 2500 && price <= 5000;
          }

          if (priceFilter === "5000-plus") {
            return price > 5000;
          }

          return true;
        });
      }

      // ----------------------------------------------------------
      // CATEGORY FILTER
      // ----------------------------------------------------------

      if (categoryFilter !== "all") {
        result = result.filter(
          (deal) => deal.category === categoryFilter
        );
      }

      // ----------------------------------------------------------
      // SORT
      // ----------------------------------------------------------

      if (sortBy === "discount") {
        result.sort(
          (a, b) =>
            Number(b.discount_percent || 0) -
            Number(a.discount_percent || 0)
        );
      }

      if (sortBy === "price-low") {
        result.sort(
          (a, b) =>
            Number(a.price || 0) -
            Number(b.price || 0)
        );
      }

      if (sortBy === "price-high") {
        result.sort(
          (a, b) =>
            Number(b.price || 0) -
            Number(a.price || 0)
        );
      }

      if (sortBy === "rating") {
        result.sort(
          (a, b) =>
            Number(b.rating || 0) -
            Number(a.rating || 0)
        );
      }

      return result;
    }, [
      deals,
      searchTerm,
      discountFilter,
      priceFilter,
      categoryFilter,
      sortBy,
    ]);

    // ============================================================
    // OPEN DEAL DETAILS
    // ============================================================

    const openDealDetails = async (deal) => {
      setSelectedDeal(deal);
      setPriceHistory([]);
      setHistoryLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/api/products/${deal.asin}/history`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch price history");
        }

        const data = await response.json();

        setPriceHistory(data.history || []);
      } catch (error) {
        console.error(error);
        setPriceHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    // ============================================================
    // OPEN DEAL DETAILS
    // ============================================================
    const closeDealDetails = () => {
    setSelectedDeal(null);
    setPriceHistory([]);
    };
    
    // ============================================================
    // CLEAR FILTERS
    // ============================================================

    const clearFilters = () => {
    setSearchTerm("");
    setDiscountFilter("all");
    setPriceFilter("all");
    setCategoryFilter("all");
    setSortBy("discount");
    };

    return (
      <div className="app">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <header className="header">

          <div className="container header-inner">

            <div className="logo">
              <span className="logo-icon">🔥</span>
              <span>HuntDeal</span>
            </div>

            <nav>
              <a href="#deals">Today's Deals</a>
              <a href="#categories">Categories</a>
            </nav>

            {/* SEARCH */}

            <div className="search">

              <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              <button>
                Search
              </button>

            </div>

          </div>

        </header>


        {/* ======================================================
            HERO
        ====================================================== */}

        <section className="hero">

          <div className="container">

            <p className="eyebrow">
              DEALS FROM AMAZON
            </p>

            <h1>
              Find the deals.
              <br />
              <span>Skip the hunting.</span>
            </h1>

            <p className="hero-text">
              HuntDeal finds interesting discounts so you don't
              have to search through thousands of products.
            </p>

          </div>

        </section>


        {/* ======================================================
            DEALS
        ====================================================== */}

        <main
          className="container deals-section"
          id="deals"
        >

          <div className="section-heading">

            <div>

              <p className="section-label">
                LATEST
              </p>

              <h2>
                Today's Deals
              </h2>

            </div>

            <span className="deal-count">
              {filteredDeals.length} of {deals.length} deals
            </span>

          </div>


          {/* ==================================================
              FILTER BAR
          ================================================== */}

          {!loading && !error && (

            <div className="filter-bar">

              {/* CATEGORY */}

              <div className="filter-group">

                <span className="filter-title">
                  Category
                </span>

                <button
                  className={
                    categoryFilter === "all"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setCategoryFilter("all")}
                >
                  All
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    className={
                      categoryFilter === category
                        ? "filter-button active"
                        : "filter-button"
                    }
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </button>
                ))}

              </div>

              {/* PRICE */}

              <div className="filter-group">

                <span className="filter-title">
                  Price
                </span>

                <button
                  className={
                    priceFilter === "all"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setPriceFilter("all")}
                >
                  All
                </button>

                <button
                  className={
                    priceFilter === "under-500"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setPriceFilter("under-500")}
                >
                  Under ₹500
                </button>

                <button
                  className={
                    priceFilter === "500-1000"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setPriceFilter("500-1000")}
                >
                  ₹500–₹1,000
                </button>

                <button
                  className={
                    priceFilter === "1000-2500"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setPriceFilter("1000-2500")}
                >
                  ₹1,000–₹2,500
                </button>

                <button
                  className={
                    priceFilter === "2500-5000"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setPriceFilter("2500-5000")}
                >
                  ₹2,500–₹5,000
                </button>

                <button
                  className={
                    priceFilter === "5000-plus"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setPriceFilter("5000-plus")}
                >
                  ₹5,000+
                </button>

              </div>

              {/* DISCOUNT */}

              <div className="filter-group">

                <span className="filter-title">
                  Discount
                </span>

                <button
                  className={
                    discountFilter === "all"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() =>
                    setDiscountFilter("all")
                  }
                >
                  All
                </button>

                <button
                  className={
                    discountFilter === "50"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() =>
                    setDiscountFilter("50")
                  }
                >
                  50%+
                </button>

                <button
                  className={
                    discountFilter === "40"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() =>
                    setDiscountFilter("40")
                  }
                >
                  40%+
                </button>

                <button
                  className={
                    discountFilter === "30"
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() =>
                    setDiscountFilter("30")
                  }
                >
                  30%+
                </button>

              </div>


              {/* SORT */}

              <div className="sort-group">

                <label htmlFor="sort">
                  Sort by
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                >

                  <option value="discount">
                    Highest Discount
                  </option>

                  <option value="price-low">
                    Lowest Price
                  </option>

                  <option value="price-high">
                    Highest Price
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>

                </select>

              </div>


              {/* CLEAR */}

              {(searchTerm ||
                discountFilter !== "all" ||
                priceFilter !== "all" ||
                categoryFilter !== "all" ||
                sortBy !== "discount") && (

                <button
                  className="clear-button"
                  onClick={clearFilters}
                >
                  Clear
                </button>

              )}

            </div>

          )}


          {/* ==================================================
              LOADING
          ================================================== */}

          {loading && (

            <div className="message">

              <div className="spinner"></div>

              <p>
                Hunting for deals...
              </p>

            </div>

          )}


          {/* ==================================================
              ERROR
          ================================================== */}

          {!loading && error && (

            <div className="message error">

              <p>
                {error}
              </p>

            </div>

          )}


          {/* ==================================================
              NO RESULTS
          ================================================== */}

          {!loading &&
            !error &&
            filteredDeals.length === 0 && (

              <div className="message">

                <p className="no-results-icon">
                  🔎
                </p>

                <h3>
                  No deals found
                </h3>

                <p>
                  Try another search or remove your filters.
                </p>

                <button
                  className="reset-button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>

            )}


          {/* ==================================================
              DEAL GRID
          ================================================== */}

          {!loading &&
            !error &&
            filteredDeals.length > 0 && (

              <div className="deal-grid">

                {filteredDeals.map((deal) => (

                  <article
                    className="deal-card"
                    key={deal.asin}
                  >

                    {/* IMAGE */}

                    <div className="image-wrapper">

                      <img
                        src={deal.image_url}
                        alt={deal.title}
                        loading="lazy"
                      />

                      <span className="discount-badge">
                        {deal.discount_percent}% OFF
                      </span>

                    </div>


                    {/* CONTENT */}

                    <div className="deal-content">

                      <p className="asin">
                        {deal.asin}
                      </p>

                      <h3 title={deal.title}>
                        {deal.title}
                      </h3>


                      {/* PRICE */}

                      <div className="price-row">

                        <span className="price">
                          ₹{Number(deal.price).toLocaleString("en-IN")}
                        </span>

                        {deal.mrp && (
                          <span className="mrp">
                            ₹{Number(deal.mrp).toLocaleString("en-IN")}
                          </span>
                        )}

                      </div>


                      {/* META */}

                      <div className="meta">

                        <span>
                          ⭐ {deal.rating || "N/A"}
                        </span>

                        <span>
                          {deal.review_count || 0} reviews
                        </span>

                      </div>
                      <div className="deal-score">
                        <span>🔥 HuntDeal Score</span>
                        <strong>{deal.deal_score}/100</strong>
                      </div>


                      {/* AMAZON */}

                      <div className="deal-actions">

                        <button
                          className="details-button"
                          onClick={() => openDealDetails(deal)}
                        >
                          View Details
                        </button>

                        <a
                          className="deal-button"
                          href={`https://www.amazon.in/dp/${deal.asin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Amazon →
                        </a>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            )}

        </main>

        {/* ============================================================
            DEAL DETAILS MODAL
        ============================================================ */}

        {selectedDeal && (

          <div
            className="modal-overlay"
            onClick={closeDealDetails}
          >

            <div
              className="deal-modal"
              onClick={(event) => event.stopPropagation()}
            >

              {/* CLOSE */}

              <button
                className="modal-close"
                onClick={closeDealDetails}
                aria-label="Close"
              >
                ×
              </button>


              {/* PRODUCT */}

              <div className="modal-product">

                <div className="modal-image">

                  <img
                    src={selectedDeal.image_url}
                    alt={selectedDeal.title}
                  />

                </div>


                <div className="modal-info">

                  <p className="modal-brand">
                    {selectedDeal.brand || "Brand unavailable"}
                  </p>

                  <h2>
                    {selectedDeal.title}
                  </h2>


                  <div className="modal-price">

                    <strong>
                      ₹{Number(selectedDeal.price).toLocaleString("en-IN")}
                    </strong>

                    {selectedDeal.mrp > 0 && (
                      <span>
                        ₹{Number(selectedDeal.mrp).toLocaleString("en-IN")}
                      </span>
                    )}

                  </div>


                  <div className="modal-meta">

                    <span>
                      🔥 {selectedDeal.discount_percent}% OFF
                    </span>

                    <span>
                      ⭐ {selectedDeal.rating || "N/A"}
                    </span>

                    <span>
                      {selectedDeal.review_count || 0} reviews
                    </span>

                  </div>
                  <div className="modal-score">
                    <div>
                      <span>🔥 HuntDeal Score</span>

                      <strong className="modal-score-label">
                        {selectedDeal.deal_label || "Deal Score"}
                      </strong>

                      <small>
                        Based on discount, rating, reviews & price history
                      </small>
                    </div>

                    <strong className="modal-score-number">
                      {selectedDeal.deal_score}/100
                    </strong>
                  </div>


                  <div className="modal-details">

                    <p>
                      <strong>Category:</strong>{" "}
                      {selectedDeal.category || "Other"}
                    </p>

                    <p>
                      <strong>ASIN:</strong>{" "}
                      {selectedDeal.asin}
                    </p>

                  </div>


                  <a
                    className="modal-amazon-button"
                    href={`https://www.amazon.in/dp/${selectedDeal.asin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Amazon →
                  </a>

                </div>

              </div>

              {/* PRICE INTELLIGENCE */}

              <div className="price-intelligence">

                <div className="intelligence-heading">
                  <h3>📉 Price Intelligence</h3>

                  <span>
                    {selectedDeal.price_trend === "Falling"
                      ? "Price Falling"
                      : selectedDeal.price_trend === "Rising"
                      ? "Price Rising"
                      : selectedDeal.is_lowest_price
                      ? "Lowest Tracked"
                      : "Price Stable"}
                  </span>
                </div>

                <div className="intelligence-grid">

                  <div className="intelligence-item">
                    <span>Current Price</span>
                    <strong>
                      ₹{Number(selectedDeal.price).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="intelligence-item">
                    <span>Lowest Tracked</span>
                    <strong>
                      ₹{Number(
                        selectedDeal.lowest_price || selectedDeal.price
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="intelligence-item">
                    <span>Difference</span>
                    <strong>
                      ₹{Number(
                        selectedDeal.price_difference || 0
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="intelligence-item">
                    <span>Above Lowest</span>
                    <strong>
                      {Number(
                        selectedDeal.percent_above_lowest || 0
                      ).toFixed(1)}%
                    </strong>
                  </div>

                </div>

                {selectedDeal.is_lowest_price ? (
                  <div className="lowest-price-message">
                    ✓ This is the lowest price tracked by HuntDeal.
                  </div>
                ) : (
                  <div className="price-status-message">
                    Current price is{" "}
                    {Number(
                      selectedDeal.percent_above_lowest || 0
                    ).toFixed(1)}% above the lowest tracked price.
                  </div>
                )}

                {selectedDeal.history_count < 2 && (
                  <div className="limited-history-message">
                    ⚠ Price history is limited. HuntDeal needs more observations
                    for a stronger historical comparison.
                  </div>
                )}

              </div>

              
              {/* PRICE HISTORY */}

              <div className="price-history">

                <div className="history-heading">

                  <h3>
                    📈 Price History
                  </h3>

                  <span>
                    {priceHistory.length} observations
                  </span>

                </div>


                {historyLoading && (

                  <div className="history-loading">
                    Loading price history...
                  </div>

                )}


                {!historyLoading &&
                  priceHistory.length === 0 && (

                    <div className="history-empty">
                      No price history available yet.
                    </div>

                  )}


                {!historyLoading &&
                  priceHistory.length > 0 && (

                    <div className="history-chart">

                      {priceHistory.length === 1 ? (

                        <div className="single-price">

                          <div className="single-price-value">
                            ₹{Number(
                              priceHistory[0].price
                            ).toLocaleString("en-IN")}
                          </div>

                          <div className="single-price-date">
                            {new Date(
                              priceHistory[0].recorded_at
                            ).toLocaleString("en-IN")}
                          </div>

                          <div className="single-price-message">
                            More observations are needed to show a price trend.
                          </div>

                        </div>

                      ) : (

                        <div className="chart-wrapper">

                        {(() => {
                          const prices = priceHistory.map(
                            (item) => Number(item.price)
                          );

                          const minPrice = Math.min(...prices);
                          const maxPrice = Math.max(...prices);

                          const padding = Math.max(
                            (maxPrice - minPrice) * 0.2,
                            20
                          );

                          const chartMin = Math.max(
                            0,
                            minPrice - padding
                          );

                          const chartMax =
                            maxPrice + padding;

                          const chartRange =
                            chartMax - chartMin || 1;

                          const getX = (index) =>
                            70 +
                            (index /
                              (priceHistory.length - 1)) *
                              590;

                          const getY = (price) =>
                            250 -
                            ((price - chartMin) /
                              chartRange) *
                              200;

                          return (
                            <>
                              {/* CHART */}

                              <div className="price-chart-area">

                                <svg
                                  viewBox="0 0 700 300"
                                  className="price-svg"
                                >

                                  {/* Y AXIS */}

                                  <text
                                    x="5"
                                    y="35"
                                    className="y-axis-label"
                                  >
                                    ₹{Math.round(chartMax).toLocaleString("en-IN")}
                                  </text>

                                  <text
                                    x="5"
                                    y="155"
                                    className="y-axis-label"
                                  >
                                    ₹{Math.round(
                                      (chartMax + chartMin) / 2
                                    ).toLocaleString("en-IN")}
                                  </text>

                                  <text
                                    x="5"
                                    y="255"
                                    className="y-axis-label"
                                  >
                                    ₹{Math.round(chartMin).toLocaleString("en-IN")}
                                  </text>


                                  {/* GRID */}

                                  <line
                                    x1="70"
                                    y1="30"
                                    x2="680"
                                    y2="30"
                                    className="chart-grid"
                                  />

                                  <line
                                    x1="70"
                                    y1="150"
                                    x2="680"
                                    y2="150"
                                    className="chart-grid"
                                  />

                                  <line
                                    x1="70"
                                    y1="250"
                                    x2="680"
                                    y2="250"
                                    className="chart-grid"
                                  />


                                  {/* PRICE LINE */}

                                  <polyline
                                    points={priceHistory
                                      .map((record, index) => {

                                        const price =
                                          Number(record.price);

                                        return `${getX(index)},${getY(price)}`;
                                      })
                                      .join(" ")}
                                    className="price-line"
                                  />


                                  {/* PRICE POINTS + LABELS */}

                                  {priceHistory.map(
                                    (record, index) => {

                                      const price =
                                        Number(record.price);

                                      const x = getX(index);
                                      const y = getY(price);

                                      const isLowest =
                                        price === minPrice;

                                      return (
                                        <g
                                          key={`${record.recorded_at}-${index}`}
                                        >

                                          {/* LOWEST PRICE MARKER */}

                                          {isLowest && (
                                            <circle
                                              cx={x}
                                              cy={y}
                                              r="10"
                                              className="lowest-point-ring"
                                            />
                                          )}

                                          {/* OUTER POINT */}

                                          <circle
                                            cx={x}
                                            cy={y}
                                            r="7"
                                            className="price-point-outer"
                                          />

                                          {/* INNER POINT */}

                                          <circle
                                            cx={x}
                                            cy={y}
                                            r="4"
                                            className="price-point"
                                          />

                                          {/* PRICE LABEL */}

                                          <text
                                            x={x}
                                            y={y - 15}
                                            textAnchor="middle"
                                            className="price-label"
                                          >
                                            ₹{price.toLocaleString("en-IN")}
                                          </text>

                                          {/* LOWEST LABEL */}

                                          {isLowest && (
                                            <text
                                              x={x}
                                              y={y + 25}
                                              textAnchor="middle"
                                              className="lowest-label"
                                            >
                                              Lowest
                                            </text>
                                          )}

                                        </g>
                                      );
                                    }
                                  )}

                                </svg>

                              </div>


                              {/* DATE LABELS */}

                              <div className="chart-labels">

                                <span>
                                  {new Date(
                                    priceHistory[0].recorded_at
                                  ).toLocaleDateString("en-IN")}
                                </span>

                                <span>
                                  {priceHistory.length} observations
                                </span>

                                <span>
                                  {new Date(
                                    priceHistory[
                                      priceHistory.length - 1
                                    ].recorded_at
                                  ).toLocaleDateString("en-IN")}
                                </span>

                              </div>


                              {/* HISTORY LIST */}

                              <div className="history-list">

                                {priceHistory
                                  .slice()
                                  .reverse()
                                  .map((record, index) => (

                                    <div
                                      className="history-row"
                                      key={`${record.recorded_at}-${index}`}
                                    >

                                      <span>
                                        {new Date(
                                          record.recorded_at
                                        ).toLocaleString("en-IN")}
                                      </span>

                                      <strong>
                                        ₹{Number(
                                          record.price
                                        ).toLocaleString("en-IN")}
                                      </strong>

                                    </div>

                                  ))}

                              </div>

                            </>
                          );
                        })()}

                      </div>

                      )}

                    </div>

                                  )}

            </div>

          </div>

        </div>

      )}

      {/* ======================================================
          FOOTER
      ====================================================== */}

        <footer className="footer">

          <div className="container">
        
            <strong>
              HuntDeal
            </strong>
        
            <p>
              Deal discovery made simple.
            </p>
        
            <p className="amazon-disclosure">
              As an Amazon Associate I earn from qualifying purchases.
            </p>
        
            <small>
              Prices and availability may change. Always verify
              details on the retailer's website.
            </small>
        
          </div>
        
        </footer>

      </div>
    );
  }

  export default App;
