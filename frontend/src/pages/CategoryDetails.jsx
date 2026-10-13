import { Link, useParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import DealCard from "../components/DealCard";

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
    category: "Gaming",
    price: "₹2,799",
    oldPrice: "₹4,499",
    discount: "38% OFF",
    rating: "4.2",
    emoji: "🎮",
  },
  {
    id: 6,
    title: "Digital Air Fryer",
    category: "Home & Kitchen",
    price: "₹3,499",
    oldPrice: "₹5,999",
    discount: "42% OFF",
    rating: "4.2",
    emoji: "🍳",
  },
  {
    id: 7,
    title: "Android Smartphone",
    category: "Mobiles",
    price: "₹12,999",
    oldPrice: "₹17,999",
    discount: "28% OFF",
    rating: "4.3",
    emoji: "📱",
  },
  {
    id: 8,
    title: "Fast Charging Adapter",
    category: "Mobiles",
    price: "₹799",
    oldPrice: "₹1,299",
    discount: "38% OFF",
    rating: "4.2",
    emoji: "🔌",
  },
  {
    id: 9,
    title: "Everyday Laptop",
    category: "Laptops",
    price: "₹39,999",
    oldPrice: "₹49,999",
    discount: "20% OFF",
    rating: "4.4",
    emoji: "💻",
  },
  {
    id: 10,
    title: "Wireless Gaming Mouse",
    category: "Gaming",
    price: "₹1,499",
    oldPrice: "₹2,499",
    discount: "40% OFF",
    rating: "4.3",
    emoji: "🖱️",
  },
  {
    id: 11,
    title: "Casual Sneakers",
    category: "Fashion",
    price: "₹1,499",
    oldPrice: "₹2,999",
    discount: "50% OFF",
    rating: "4.1",
    emoji: "👟",
  },
  {
    id: 12,
    title: "Smart LED Desk Lamp",
    category: "Home & Kitchen",
    price: "₹999",
    oldPrice: "₹1,799",
    discount: "44% OFF",
    rating: "4.1",
    emoji: "💡",
  },
  {
    id: 13,
    title: "Face Care Essentials",
    category: "Beauty",
    price: "₹599",
    oldPrice: "₹999",
    discount: "40% OFF",
    rating: "4.2",
    emoji: "✨",
  },
  {
    id: 14,
    title: "Wireless Earbuds",
    category: "Accessories",
    price: "₹1,199",
    oldPrice: "₹2,499",
    discount: "52% OFF",
    rating: "4.3",
    emoji: "🎧",
  },
];


function CategoryDetails() {
  const { categorySlug } = useParams();

  const category = categoryData[categorySlug];
  const categoryProducts = products.filter(
  (product) =>
    product.category.toLowerCase() === category.name.toLowerCase()
);

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
  {products
  .filter((product) => product.category === category.name)
  .map((product) => {
    
const productImages = {
  1: "/assets/product-placeholders/headphones.png",
  2: "/assets/product-placeholders/speaker.png",
  3: "/assets/product-placeholders/camera.png",
  4: "/assets/product-placeholders/monitor.png",
  5: "/assets/product-placeholders/headphones.png",
  6: "/assets/product-placeholders/airfryer.png",
  7: "/assets/product-placeholders/phone.png",
  8: "/assets/product-placeholders/earbuds.png",
  9: "/assets/product-placeholders/laptop.png",
  10: "/assets/product-placeholders/keyboard.png",
  11: "/assets/product-placeholders/shoes.png",
  12: "/assets/product-placeholders/smartwatch.png",
  13: "/assets/product-placeholders/earbuds.png",
  14: "/assets/product-placeholders/earbuds.png",
};

    return (
      <DealCard
        key={product.id}
        product={{
          id: product.id,
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
    );
  })}
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