import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  Heart,
  ExternalLink,
} from "lucide-react";

const products = [
  {
    id: 1,
    title: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: "₹2,499",
    oldPrice: "₹4,999",
    discount: "50% OFF",
    rating: "4.4",
    emoji: "🎧",
  },
  {
    id: 2,
    title: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: "₹1,299",
    oldPrice: "₹2,499",
    discount: "48% OFF",
    rating: "4.3",
    emoji: "🔊",
  },
  {
    id: 3,
    title: "Smart Watch with AMOLED Display",
    category: "Wearables",
    price: "₹1,799",
    oldPrice: "₹3,099",
    discount: "42% OFF",
    rating: "4.3",
    emoji: "⌚",
  },
  {
    id: 4,
    title: "Mechanical Gaming Keyboard",
    category: "Gaming",
    price: "₹2,199",
    oldPrice: "₹3,999",
    discount: "45% OFF",
    rating: "4.5",
    emoji: "⌨️",
  },
  {
    id: 5,
    title: "4K Action Camera",
    category: "Electronics",
    price: "₹3,999",
    oldPrice: "₹6,999",
    discount: "43% OFF",
    rating: "4.5",
    emoji: "📷",
  },
  {
    id: 6,
    title: "Air Fryer Digital 4.5L",
    category: "Home & Kitchen",
    price: "₹3,499",
    oldPrice: "₹5,999",
    discount: "42% OFF",
    rating: "4.2",
    emoji: "🍳",
  },
  {
    id: 7,
    title: "27-inch Full HD Monitor",
    category: "Electronics",
    price: "₹8,499",
    oldPrice: "₹12,999",
    discount: "35% OFF",
    rating: "4.4",
    emoji: "🖥️",
  },
  {
    id: 8,
    title: "Wireless Gaming Headset",
    category: "Gaming",
    price: "₹2,799",
    oldPrice: "₹4,499",
    discount: "38% OFF",
    rating: "4.2",
    emoji: "🎮",
  },
];

function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const searchText = query.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    if (!searchText) return true;

    return (
      product.title.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="search-results-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Search</span>
        </div>

        {/* HEADER */}

        <section className="search-results-header">

          <div>
            <span className="section-label">
              SEARCH RESULTS
            </span>

            <h1>
              Search <span>Deals</span>
            </h1>

            {query ? (
              <p>
                Showing results for{" "}
                <strong>"{query}"</strong>
              </p>
            ) : (
              <p>
                Search thousands of hand-picked deals and
                discover products worth buying.
              </p>
            )}
          </div>

          <div className="search-results-count">
            <strong>{filteredProducts.length}</strong>
            <span>
              {filteredProducts.length === 1
                ? "Result"
                : "Results"}
            </span>
          </div>

        </section>

        {/* SEARCH BAR */}

        <section className="search-results-toolbar">

          <form
            className="search-results-search"
            onSubmit={(event) => {
              event.preventDefault();

              const input =
                event.currentTarget.elements.search.value;

              window.history.pushState(
                {},
                "",
                `/search?q=${encodeURIComponent(input)}`
              );

              window.location.reload();
            }}
          >

            <Search size={18} />

            <input
              name="search"
              defaultValue={query}
              placeholder="Search products, categories..."
            />

            <button type="submit">
              Search
            </button>

          </form>

          <div className="search-results-actions">

            <button>
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <button>
              Sort: Popular
              <ChevronDown size={16} />
            </button>

          </div>

        </section>

        {/* CATEGORY FILTERS */}

        <div className="search-category-filters">

          <button className="active">
            All
          </button>

          <button>Electronics</button>
          <button>Mobiles</button>
          <button>Laptops</button>
          <button>Gaming</button>
          <button>Fashion</button>
          <button>Home & Kitchen</button>

        </div>

        {/* RESULTS */}

        {filteredProducts.length > 0 ? (

          <section className="search-products-grid">

            {filteredProducts.map((product) => (
              <article
                className="search-product-card"
                key={product.id}
              >

                <div className="search-product-image">

                  <span className="search-discount">
                    {product.discount}
                  </span>

                  <button
                    className="search-heart"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={17} />
                  </button>

                  <div className="search-product-emoji">
                    {product.emoji}
                  </div>

                </div>

                <div className="search-product-content">

                  <span className="search-product-category">
                    {product.category}
                  </span>

                  <h2>{product.title}</h2>

                  <div className="search-product-rating">
                    <span>★</span>
                    {product.rating}
                  </div>

                  <div className="search-product-price">

                    <strong>{product.price}</strong>

                    <del>{product.oldPrice}</del>

                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="search-view-button"
                  >
                    View Deal
                    <ExternalLink size={15} />
                  </Link>

                </div>

              </article>
            ))}

          </section>

        ) : (

          /* NO RESULTS */

          <section className="no-search-results">

            <div className="no-results-icon">
              <Search size={32} />
            </div>

            <h2>No deals found</h2>

            <p>
              We couldn't find any deals matching
              <strong> "{query}"</strong>.
            </p>

            <Link
              to="/deals"
              className="no-results-button"
            >
              Explore Today's Deals
              <ChevronRight size={16} />
            </Link>

          </section>

        )}

        {/* PAGINATION */}

        {filteredProducts.length > 0 && (
          <div className="search-pagination">

            <button disabled>
              <ChevronRight
                size={17}
                style={{
                  transform: "rotate(180deg)",
                }}
              />
            </button>

            <button className="active">1</button>
            <button>2</button>
            <button>3</button>

            <button>
              <ChevronRight size={17} />
            </button>

          </div>
        )}

      </div>
    </main>
  );
}

export default SearchPage;