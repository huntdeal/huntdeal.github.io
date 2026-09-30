import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Deals from "./pages/Deals";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import ProductDetails from "./pages/ProductDetails";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
        
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/deals" element={<Deals />} />

        <Route path="/categories" element={<Categories />} />

        <Route
          path="/categories/:categorySlug"
          element={<CategoryDetails />}
        />

        <Route
          path="/product/:productId"
          element={<ProductDetails />}
        />

        <Route path="/trending" element={<Trending />} />

        <Route path="/search" element={<Search />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;