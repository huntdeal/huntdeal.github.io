import { Outlet } from "react-router-dom";

import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

/** Shell for every public page. The admin panel deliberately does not use it. */
export default function PublicLayout() {
  return (
    <div className="page-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="page-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
