import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Star,
  ExternalLink,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

const products = {
  1: {
    title: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: "₹2,499",
    oldPrice: "₹4,999",
    discount: "50% OFF",
    rating: "4.4",
    reviews: "1,248",
    emoji: "🎧",
    description:
      "Experience immersive sound with wireless noise cancelling headphones designed for music, calls and everyday use.",
    features: [
      "Active Noise Cancellation",
      "Wireless Bluetooth connectivity",
      "Long battery life",
      "Built-in microphone",
      "Comfortable over-ear design",
    ],
  },

  2: {
    title: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: "₹1,299",
    oldPrice: "₹2,499",
    discount: "48% OFF",
    rating: "4.3",
    reviews: "842",
    emoji: "🔊",
    description:
      "Enjoy powerful audio wherever you go with this compact portable Bluetooth speaker.",
    features: [
      "Bluetooth connectivity",
      "Portable design",
      "Powerful sound",
      "Long battery backup",
      "Easy controls",
    ],
  },

  3: {
    title: "4K Action Camera",
    category: "Electronics",
    price: "₹3,999",
    oldPrice: "₹6,999",
    discount: "43% OFF",
    rating: "4.5",
    reviews: "623",
    emoji: "📷",
    description:
      "Capture your adventures with high-quality video and a compact action camera design.",
    features: [
      "4K video recording",
      "Wide-angle lens",
      "Compact design",
      "Multiple shooting modes",
      "Digital stabilization",
    ],
  },

  4: {
    title: "27-inch Full HD Monitor",
    category: "Electronics",
    price: "₹8,499",
    oldPrice: "₹12,999",
    discount: "35% OFF",
    rating: "4.4",
    reviews: "936",
    emoji: "🖥️",
    description:
      "A large Full HD display suitable for work, entertainment and everyday computing.",
    features: [
      "27-inch display",
      "Full HD resolution",
      "Wide viewing angle",
      "Slim design",
      "Multiple connectivity options",
    ],
  },

  5: {
    title: "Wireless Gaming Headset",
    category: "Electronics",
    price: "₹2,799",
    oldPrice: "₹4,499",
    discount: "38% OFF",
    rating: "4.2",
    reviews: "517",
    emoji: "🎮",
    description:
      "A wireless gaming headset designed for immersive gaming and clear communication.",
    features: [
      "Wireless connectivity",
      "Gaming audio",
      "Built-in microphone",
      "Comfortable ear cushions",
      "Low-latency connection",
    ],
  },

  6: {
    title: "Smart LED Desk Lamp",
    category: "Electronics",
    price: "₹999",
    oldPrice: "₹1,799",
    discount: "44% OFF",
    rating: "4.1",
    reviews: "384",
    emoji: "💡",
    description:
      "A modern LED desk lamp for study, work and everyday lighting needs.",
    features: [
      "LED lighting",
      "Adjustable brightness",
      "Modern design",
      "Flexible positioning",
      "Energy efficient",
    ],
  },
};

function ProductDetails() {
  const { productId } = useParams();

  const product = products[productId];

  if (!product) {
    return (
      <main className="inner-page">
        <div className="container not-found-product">
          <h1>Product Not Found</h1>

          <p>
            This product is no longer available or the product ID is invalid.
          </p>

          <Link to="/deals" className="btn btn-primary">
            <ArrowLeft size={17} />
            Back to Deals
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>

          <Link to="/categories">Categories</Link>
          <span>/</span>

          <Link to="/categories/electronics">
            {product.category}
          </Link>

          <span>/</span>

          <span>Product</span>
        </div>

        {/* PRODUCT */}

        <section className="product-details">

          {/* LEFT - IMAGE */}

          <div className="product-details-gallery">

            <div className="main-product-image">

              <span className="details-discount">
                {product.discount}
              </span>

              <button className="details-wishlist">
                <Heart size={19} />
              </button>

              <div className="main-product-emoji">
                {product.emoji}
              </div>

            </div>

          </div>

          {/* RIGHT - INFO */}

          <div className="product-details-info">

            <span className="product-details-category">
              {product.category}
            </span>

            <h1>{product.title}</h1>

            {/* RATING */}

            <div className="product-details-rating">

              <div className="stars">
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
              </div>

              <strong>{product.rating}</strong>

              <span>
                ({product.reviews} reviews)
              </span>

            </div>

            {/* PRICE */}

            <div className="product-details-price">

              <strong>{product.price}</strong>

              <del>{product.oldPrice}</del>

              <span>{product.discount}</span>

            </div>

            <p className="product-description">
              {product.description}
            </p>

            {/* FEATURES */}

            <div className="product-features">

              <h3>Key Features</h3>

              <ul>
                {product.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>

            </div>

            {/* AMAZON BUTTON */}

            <a
              href="#"
              className="amazon-deal-button"
              onClick={(event) => event.preventDefault()}
            >
              View Deal on Amazon
              <ExternalLink size={17} />
            </a>

            <p className="affiliate-note">
              As an Amazon Associate I earn from qualifying purchases.
            </p>

          </div>

        </section>

        {/* BENEFITS */}

        <section className="product-benefits">

          <div className="product-benefit">

            <Truck size={22} />

            <div>
              <strong>Check Delivery</strong>
              <span>See availability on Amazon</span>
            </div>

          </div>

          <div className="product-benefit">

            <ShieldCheck size={22} />

            <div>
              <strong>Verified Deal</strong>
              <span>Deal information checked</span>
            </div>

          </div>

          <div className="product-benefit">

            <RotateCcw size={22} />

            <div>
              <strong>Amazon Returns</strong>
              <span>Check seller return policy</span>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

export default ProductDetails;