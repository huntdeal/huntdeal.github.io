import { Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowLeft,
  Flame,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: "💻",
    deals: "120+ Deals",
    description: "Headphones, speakers, cameras, monitors and more.",
  },
  {
    name: "Mobiles",
    slug: "mobiles",
    icon: "📱",
    deals: "85+ Deals",
    description: "Smartphones, chargers, cases and mobile accessories.",
  },
  {
    name: "Laptops",
    slug: "laptops",
    icon: "💻",
    deals: "60+ Deals",
    description: "Laptops, notebooks and computer accessories.",
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: "👟",
    deals: "150+ Deals",
    description: "Shoes, clothing, watches and fashion accessories.",
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    icon: "🏠",
    deals: "100+ Deals",
    description: "Kitchen appliances and useful home essentials.",
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: "🎮",
    deals: "75+ Deals",
    description: "Gaming keyboards, mice, controllers and accessories.",
  },
  {
    name: "Beauty",
    slug: "beauty",
    icon: "✨",
    deals: "90+ Deals",
    description: "Beauty, skincare and personal care products.",
  },
  {
    name: "Accessories",
    slug: "accessories",
    icon: "🎧",
    deals: "110+ Deals",
    description: "Everyday gadgets, accessories and useful products.",
  },
];

function Categories() {
  return (
    <main className="categories-page">
      <div className="container">

        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <Link to="/">
            <ArrowLeft size={14} />
            Home
          </Link>

          <span>/</span>

          <span>Categories</span>
        </div>

        {/* HEADER */}
        <section className="categories-header">

          <div className="categories-title">
            <div className="category-page-label">
              <Flame size={14} />
              EXPLORE DEALS
            </div>

            <h1>
              Shop by <span>Category</span>
            </h1>

            <p>
              Explore hand-picked deals across different categories
              and discover products worth buying.
            </p>
          </div>

          <div className="category-count">
            <strong>8</strong>
            <span>Categories</span>
          </div>

        </section>

        {/* CATEGORY GRID */}
        <section className="all-categories-grid">

          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="category-page-card"
            >

              <div className="category-card-top">

                <div className="category-large-icon">
                  {category.icon}
                </div>

                <div className="category-arrow">
                  <ChevronRight size={18} />
                </div>

              </div>

              <div className="category-card-content">

                <h2>{category.name}</h2>

                <p>{category.description}</p>

                <div className="category-card-bottom">

                  <span>{category.deals}</span>

                  <strong>
                    Explore
                    <ChevronRight size={14} />
                  </strong>

                </div>

              </div>

            </Link>
          ))}

        </section>

      </div>
    </main>
  );
}

export default Categories;