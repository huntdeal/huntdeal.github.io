import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Calendar,
  Search,
} from "lucide-react";

function Blog() {
  const posts = [
    {
      category: "DEAL HUNTING",
      title: "How to Find Better Deals Online",
      description:
        "Simple ways to compare products, spot discounts and make smarter buying decisions.",
      date: "Sep 24, 2026",
      readTime: "5 min read",
      image: "/assets/banners/banner-main.png",
    },
    {
      category: "BUYING GUIDE",
      title: "What to Check Before Buying Electronics",
      description:
        "Important things to consider before choosing headphones, laptops, monitors and other electronics.",
      date: "Sep 20, 2026",
      readTime: "6 min read",
      image: "/assets/categories/electronics.png",
    },
    {
      category: "SMART SHOPPING",
      title: "How to Compare Products Before Buying",
      description:
        "A practical checklist for comparing features, prices and product information.",
      date: "Sep 17, 2026",
      readTime: "4 min read",
      image: "/assets/categories/laptops.png",
    },
    {
      category: "DEALS",
      title: "Understanding Discounts and Sale Prices",
      description:
        "Learn how to look beyond the discount percentage and evaluate the actual deal.",
      date: "Sep 13, 2026",
      readTime: "5 min read",
      image: "/assets/badges/discount-50.png",
    },
    {
      category: "TECH",
      title: "Best Things to Look for in Wireless Headphones",
      description:
        "Noise cancellation, battery life, comfort and connectivity — what actually matters?",
      date: "Sep 09, 2026",
      readTime: "7 min read",
      image: "/assets/product-placeholders/headphones.png",
    },
    {
      category: "HOME & KITCHEN",
      title: "Things to Consider Before Buying an Air Fryer",
      description:
        "Capacity, features and everyday usability to consider when choosing an air fryer.",
      date: "Sep 05, 2026",
      readTime: "5 min read",
      image: "/assets/product-placeholders/airfryer.png",
    },
  ];

  return (
    <main className="blog-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Blog</span>
        </div>

        {/* HERO */}

        <section className="blog-hero">

          <div>
            <span className="section-label">
              HUNT SMARTER
            </span>

            <h1>
              Deal tips.
              <br />
              <span>Shopping smarter.</span>
            </h1>

            <p>
              Helpful guides, buying tips and insights to help
              you discover better products and make informed
              shopping decisions.
            </p>
          </div>

          <div className="blog-hero-card">

            <div className="blog-hero-icon">
              <Search size={25} />
            </div>

            <strong>
              Hunt before you buy.
            </strong>

            <span>
              Discover useful shopping tips and deal insights.
            </span>

          </div>

        </section>

        {/* SEARCH */}

        <div className="blog-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search articles..."
          />

        </div>

        {/* FEATURED */}

        <section className="blog-featured">

          <div className="blog-section-heading">

            <div>
              <span className="section-label">
                FEATURED
              </span>

              <h2>
                Latest from HuntDeal
              </h2>
            </div>

            <Link to="/deals">
              Explore Deals
              <ArrowRight size={15} />
            </Link>

          </div>

          <article className="blog-featured-card">

            <div className="blog-featured-image">

              <img
                src={posts[0].image}
                alt={posts[0].title}
              />

            </div>

            <div className="blog-featured-content">

              <span className="blog-category">
                {posts[0].category}
              </span>

              <h2>
                {posts[0].title}
              </h2>

              <p>
                {posts[0].description}
              </p>

              <div className="blog-meta">

                <span>
                  <Calendar size={13} />
                  {posts[0].date}
                </span>

                <span>
                  <Clock size={13} />
                  {posts[0].readTime}
                </span>

              </div>

              <Link
                to="#"
                className="blog-read-button"
              >
                Read Article
                <ArrowRight size={15} />
              </Link>

            </div>

          </article>

        </section>

        {/* ARTICLES */}

        <section className="blog-articles">

          <div className="blog-section-heading">

            <div>
              <span className="section-label">
                FROM THE BLOG
              </span>

              <h2>
                Latest Articles
              </h2>
            </div>

          </div>

          <div className="blog-grid">

            {posts.slice(1).map((post, index) => (

              <article
                className="blog-card"
                key={index}
              >

                <div className="blog-card-image">

                  <img
                    src={post.image}
                    alt={post.title}
                  />

                </div>

                <div className="blog-card-content">

                  <span className="blog-category">
                    {post.category}
                  </span>

                  <h3>
                    {post.title}
                  </h3>

                  <p>
                    {post.description}
                  </p>

                  <div className="blog-meta">

                    <span>
                      <Calendar size={12} />
                      {post.date}
                    </span>

                    <span>
                      <Clock size={12} />
                      {post.readTime}
                    </span>

                  </div>

                  <Link
                    to="#"
                    className="blog-read-link"
                  >
                    Read Article
                    <ArrowRight size={14} />
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* CTA */}

        <section className="blog-cta">

          <div>

            <span className="section-label">
              START HUNTING
            </span>

            <h2>
              Your next great deal{" "}
              <span>might be here.</span>
            </h2>

            <p>
              Explore the latest deals and discover products
              worth checking out.
            </p>

          </div>

          <Link
            to="/deals"
            className="blog-cta-button"
          >
            Explore All Deals
            <ArrowRight size={16} />
          </Link>

        </section>

      </div>
    </main>
  );
}

export default Blog;