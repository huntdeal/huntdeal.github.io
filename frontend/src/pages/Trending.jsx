import { Link } from "react-router-dom";
import {
  TrendingUp,
  ChevronRight,
  Flame,
} from "lucide-react";
import DealCard from "../components/DealCard";

const trendingProducts = [
  {
    id: 3,
    rank: "01",
    title: "Smart Watch with AMOLED Display",
    category: "Wearables",
    price: "₹1,799",
    oldPrice: "₹3,099",
    discount: "42% OFF",
    rating: "4.3",
    emoji: "⌚",
    clicks: "2.4K clicks",
  },
  {
    id: 1,
    rank: "02",
    title: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: "₹2,499",
    oldPrice: "₹4,999",
    discount: "50% OFF",
    rating: "4.4",
    emoji: "🎧",
    clicks: "2.1K clicks",
  },
  {
    id: 4,
    rank: "03",
    title: "Mechanical Gaming Keyboard",
    category: "Gaming",
    price: "₹2,199",
    oldPrice: "₹3,999",
    discount: "45% OFF",
    rating: "4.5",
    emoji: "⌨️",
    clicks: "1.8K clicks",
  },
  {
    id: 6,
    rank: "04",
    title: "Air Fryer Digital 4.5L",
    category: "Home & Kitchen",
    price: "₹3,499",
    oldPrice: "₹5,999",
    discount: "42% OFF",
    rating: "4.2",
    emoji: "🍳",
    clicks: "1.6K clicks",
  },
  {
    id: 2,
    rank: "05",
    title: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: "₹1,299",
    oldPrice: "₹2,499",
    discount: "48% OFF",
    rating: "4.3",
    emoji: "🔊",
    clicks: "1.4K clicks",
  },
  {
    id: 5,
    rank: "06",
    title: "4K Action Camera",
    category: "Electronics",
    price: "₹3,999",
    oldPrice: "₹6,999",
    discount: "43% OFF",
    rating: "4.5",
    emoji: "📷",
    clicks: "1.2K clicks",
  },
  {
    id: 7,
    rank: "07",
    title: "27-inch Full HD Monitor",
    category: "Electronics",
    price: "₹8,499",
    oldPrice: "₹12,999",
    discount: "35% OFF",
    rating: "4.4",
    emoji: "🖥️",
    clicks: "980 clicks",
  },
  {
    id: 8,
    rank: "08",
    title: "Wireless Gaming Headset",
    category: "Gaming",
    price: "₹2,799",
    oldPrice: "₹4,499",
    discount: "38% OFF",
    rating: "4.2",
    emoji: "🎮",
    clicks: "870 clicks",
  },
];

function Trending() {
  return (
    <main className="trending-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Trending</span>
        </div>

        {/* HERO */}

        <section className="trending-header">

          <div className="trending-header-content">

            <div className="trending-label">
              <TrendingUp size={14} />
              TRENDING NOW
            </div>

            <h1>
              What's <span>Trending</span>
            </h1>

            <p>
              Discover the products and deals getting the most
              attention from deal hunters right now.
            </p>

          </div>

          <div className="trending-stat">

            <strong>24H</strong>
            <span>Trending Data</span>

          </div>

        </section>

        {/* TRENDING NOTICE */}

        <div className="trending-notice">

          <Flame size={19} />

          <div>
            <strong>Popular right now</strong>

            <span>
              These deals are currently receiving high engagement
              on HuntDeal.
            </span>
          </div>

        </div>

        {/* PRODUCTS */}

        
{/* PRODUCTS */}

<section className="trending-grid">
  {trendingProducts.map((product) => {
    const productImages = {
      1: "/assets/product-placeholders/headphones.png",
      2: "/assets/product-placeholders/speaker.png",
      3: "/assets/product-placeholders/smartwatch.png",
      4: "/assets/product-placeholders/keyboard.png",
      5: "/assets/product-placeholders/camera.png",
      6: "/assets/product-placeholders/airfryer.png",
      7: "/assets/product-placeholders/monitor.png",
      8: "/assets/product-placeholders/headphones.png",
    };

    return (
      <div className="trending-card-wrapper" key={product.id}>

        <DealCard
          product={{
            id: product.id,
            rank: product.rank,
            title: product.title,
            category: product.category,
            price: product.price,
            originalPrice: product.oldPrice,
            discount: product.discount,
            rating: product.rating,
            image: productImages[product.id],
            amazonLink: "#",
          }}
        />

        <div className="trending-clicks">
          <TrendingUp size={13} />
          {product.clicks}
        </div>
      </div>
    );
  })}
</section>


        {/* VIEW ALL */}

        <div className="trending-footer">

          <Link to="/deals">
            Explore All Deals
            <ChevronRight size={17} />
          </Link>

        </div>

      </div>
    </main>
  );
}

export default Trending;