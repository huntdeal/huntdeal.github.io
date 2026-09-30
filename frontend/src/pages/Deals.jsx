import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  Heart,
  ExternalLink,
} from "lucide-react";

const deals = [
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

function Deals() {
  return (
    <main className="deals-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Today's Deals</span>
        </div>

        {/* HEADER */}

        <section className="deals-page-header">

          <div>
            <span className="section-label">
              TODAY'S PICKS
            </span>

            <h1>
              Today's <span>Best Deals</span>
            </h1>

            <p>
              Discover today's hand-picked deals, discounts and
              trending products.
            </p>
          </div>

          <div className="deals-count">
            <strong>{deals.length}</strong>
            <span>Deals Today</span>
          </div>

        </section>

        {/* TOOLBAR */}

        <section className="deals-toolbar">

          <div className="deals-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search today's deals..."
            />
          </div>

          <div className="deals-toolbar-actions">

            <button className="deals-filter">
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <button className="deals-sort">
              Sort: Popular
              <ChevronDown size={16} />
            </button>

          </div>

        </section>

        {/* CATEGORY FILTERS */}

        <div className="deal-category-filters">

          <button className="deal-filter-active">
            All Deals
          </button>

          <button>Electronics</button>

          <button>Mobiles</button>

          <button>Laptops</button>

          <button>Gaming</button>

          <button>Home & Kitchen</button>

          <button>Fashion</button>

        </div>

        {/* PRODUCTS */}

        <section className="deals-product-grid">

          {deals.map((deal) => (
            <article
              className="deals-product-card"
              key={deal.id}
            >

              <div className="deals-product-image">

                <span className="deals-discount">
                  {deal.discount}
                </span>

                <button
                  className="deals-heart"
                  aria-label="Add to wishlist"
                >
                  <Heart size={17} />
                </button>

                <div className="deals-product-emoji">
                  {deal.emoji}
                </div>

              </div>

              <div className="deals-product-content">

                <span className="deals-product-category">
                  {deal.category}
                </span>

                <h2>{deal.title}</h2>

                <div className="deals-rating">
                  <span>★</span>
                  {deal.rating}
                </div>

                <div className="deals-price">

                  <strong>{deal.price}</strong>

                  <del>{deal.oldPrice}</del>

                </div>

                <Link
                  to={`/product/${deal.id}`}
                  className="deals-view-button"
                >
                  View Deal
                  <ExternalLink size={15} />
                </Link>

              </div>

            </article>
          ))}

        </section>

        {/* PAGINATION */}

        <div className="deals-pagination">

          <button disabled>
            <ChevronRight
              size={17}
              style={{ transform: "rotate(180deg)" }}
            />
          </button>

          <button className="active">1</button>
          <button>2</button>
          <button>3</button>

          <button>
            <ChevronRight size={17} />
          </button>

        </div>

      </div>
    </main>
  );
}

export default Deals;