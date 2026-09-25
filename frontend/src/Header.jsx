import { useState } from "react";

const Header = ({ searchTerm, setSearchTerm }) => {
  const [localSearch, setLocalSearch] = useState("");
  const value = searchTerm ?? localSearch;

  const updateSearch = (nextValue) => {
    if (setSearchTerm) setSearchTerm(nextValue);
    else setLocalSearch(nextValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = value.trim();

    if (setSearchTerm) {
      setSearchTerm(query);
      window.history.replaceState(
        {},
        "",
        query ? `/?search=${encodeURIComponent(query)}#deals` : "/#deals"
      );
      document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.href = query
      ? `/?search=${encodeURIComponent(query)}#deals`
      : "/#deals";
  };

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <a href="/" className="site-brand" aria-label="HuntDeal home">
          <span className="site-brand-icon" aria-hidden="true">🔥</span>
          <span>HuntDeal</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="/#deals">Today's Deals</a>
          <a href="/#categories">Categories</a>
          <a href="/guides">Buying Guides</a>
        </nav>

        <form className="site-search" onSubmit={handleSubmit} role="search">
          <input
            type="search"
            aria-label="Search deals"
            placeholder="Search deals..."
            value={value}
            onChange={(event) => updateSearch(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
