import { Link, useParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Heart,
  ExternalLink,
} from "lucide-react";

const categoryData = {
  electronics: {
    name: "Electronics",
    description:
      "Discover headphones, speakers, cameras, monitors and other electronics deals.",
  },

  mobiles: {
    name: "Mobiles",
    description:
      "Find smartphones, chargers, cases and mobile accessories.",
  },

  laptops: {
    name: "Laptops",
    description:
      "Explore laptops, notebooks and computer accessories.",
  },

  fashion: {
    name: "Fashion",
    description:
      "Discover shoes, clothing, watches and fashion accessories.",
  },

  "home-kitchen": {
    name: "Home & Kitchen",
    description:
      "Find useful appliances and home essentials at great prices.",
  },

  gaming: {
    name: "Gaming",
    description:
      "Gaming keyboards, mice, controllers and other gaming accessories.",
  },

  beauty: {
    name: "Beauty",
    description:
      "Explore skincare, beauty and personal care deals.",
  },

  accessories: {
    name: "Accessories",
    description:
      "Discover everyday gadgets and useful accessories.",
  },
};

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
    title: "4K Action Camera",
    category: "Electronics",
    price: "₹3,999",
    oldPrice: "₹6,999",
    discount: "43% OFF",
    rating: "4.5",
    emoji: "📷",
  },
  {
    id: 4,
    title: "27-inch Full HD Monitor",
    category: "Electronics",
    price: "₹8,499",
    oldPrice: "₹12,999",
    discount: "35% OFF",
    rating: "4.4",
    emoji: "🖥️",
  },
  {
    id: 5,
    title: "Wireless Gaming Headset",
    category: "Electronics",
    price: "₹2,799",
    oldPrice: "₹4,499",
    discount: "38% OFF",
    rating: "4.2",
    emoji: "🎮",
  },
  {
    id: 6,
    title: "Smart LED Desk Lamp",
    category: "Electronics",
    price: "₹999",
    oldPrice: "₹1,799",
    discount: "44% OFF",
    rating: "4.1",
    emoji: "💡",
  },
];

function CategoryDetails() {
  const { categorySlug } = useParams();

  const category = categoryData[categorySlug];

  if (!category) {
    return (
      <main className="inner-page">
        <div className="container">
          <h1>Category Not Found</h1>

          <Link to="/categories" className="btn btn-primary">
            <ArrowLeft size={17} />
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="category-details-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="breadcrumb">
          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/categories">
            Categories
          </Link>

          <span>/</span>

          <span>{category.name}</span>
        </div>

        {/* HEADER */}

        <section className="category-details-header">

          <div>
            <span className="section-label">
              CATEGORY DEALS
            </span>

            <h1>
              {category.name} <span>Deals</span>
            </h1>

            <p>
              {category.description}
            </p>
          </div>

          <div className="deal-count-box">
            <strong>{products.length}</strong>
            <span>Deals Found</span>
          </div>

        </section>

        {/* TOOLBAR */}

        <section className="category-toolbar">

          <div className="category-search">
            <Search size={18} />

            <input
              type="text"
              placeholder={`Search ${category.name} deals...`}
            />
          </div>

          <div className="toolbar-actions">

            <button className="filter-button">
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <button className="sort-button">
              Sort: Popular
              <ChevronDown size={16} />
            </button>

          </div>

        </section>

        {/* PRODUCTS */}

        <section className="category-product-grid">

          {products.map((product) => (
            <article
              className="category-product-card"
              key={product.id}
            >

              {/* IMAGE */}

              <div className="category-product-image">

                <span className="product-discount">
                  {product.discount}
                </span>

                <button
                  className="product-heart"
                  aria-label="Add to wishlist"
                >
                  <Heart size={17} />
                </button>

                <div className="category-product-emoji">
                  {product.emoji}
                </div>

              </div>

              {/* CONTENT */}

              <div className="category-product-content">

                <span className="category-product-category">
                  {product.category}
                </span>

                <h2>{product.title}</h2>

                <div className="category-product-rating">
                  <span>★</span>
                  {product.rating}
                </div>

                <div className="category-product-price">

                  <strong>{product.price}</strong>

                  <del>{product.oldPrice}</del>

                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="category-view-button"
                >
                  View Deal
                  <ExternalLink size={15} />
                </Link>

              </div>

            </article>
          ))}

        </section>

        {/* PAGINATION */}

        <div className="pagination">

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

export default CategoryDetails;