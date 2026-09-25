import "./App.css";
import Header from "./Header";
import Footer from "./Footer";

const guides = [
  {
    title: "Useful Products for Everyday Life",
    description:
      "A practical guide to everyday products for cooking, organizing, cleaning, working, studying, and travelling.",
    path: "/guides/everyday-useful-products",
  },
  {
    title: "Kitchen Essentials",
    description:
      "Things to consider when choosing useful kitchen tools, storage products, and everyday cooking accessories.",
    path: "/guides/kitchen-essentials",
  },
  {
    title: "Home Organization",
    description:
      "Practical ideas for organizing drawers, wardrobes, desks, shelves, and limited spaces.",
    path: "/guides/home-organization",
  },
  {
    title: "Cleaning & Maintenance",
    description:
      "A guide to choosing useful cleaning tools and household maintenance accessories.",
    path: "/guides/cleaning-maintenance",
  },
  {
    title: "Work From Home Accessories",
    description:
      "Useful categories to consider when setting up a practical home workspace.",
    path: "/guides/work-from-home-accessories",
  },
  {
    title: "Travel Accessories",
    description:
      "Things to consider when choosing organizers, luggage accessories, and travel essentials.",
    path: "/guides/travel-accessories",
  },
  {
    title: "Laptop & Mobile Accessories",
    description:
      "A buying guide for everyday accessories used with laptops, phones, and other devices.",
    path: "/guides/laptop-mobile-accessories",
  },
  {
    title: "Storage Solutions",
    description:
      "Ideas for choosing storage products for homes, wardrobes, desks, and everyday spaces.",
    path: "/guides/storage-solutions",
  },
  {
    title: "Budget-Friendly Home Products",
    description:
      "How to evaluate useful home products without choosing something only because it appears inexpensive.",
    path: "/guides/budget-friendly-home-products",
  },
  {
    title: "How to Find Genuine Deals",
    description:
      "Practical things to check before buying a product online and evaluating an advertised deal.",
    path: "/guides/how-to-find-genuine-deals",
  },
];

function GuideIndex() {
  return (
    <div className="guide-page">

      <Header />

      <main className="container guides-index">

        <p className="eyebrow">HUNTDEAL GUIDES</p>

        <h1>Buying Guides</h1>

        <p className="guides-intro">
          Practical guides to help you understand what to look for
          before buying everyday products online.
        </p>

        <div className="guides-grid">
          {guides.map((guide) => (
            <article className="guide-card" key={guide.title}>
              <p className="guide-card-label">
                BUYING GUIDE
              </p>

              <h2>{guide.title}</h2>

              <p>{guide.description}</p>

              {guide.path === "#" ? (
                <span className="guide-coming-soon">
                  Coming soon
                </span>
              ) : (
                <a
                  className="guide-card-link"
                  href={guide.path}
                >
                  Read guide →
                </a>
              )}
            </article>
          ))}
        </div>

      </main>

      <Footer />

    </div>
  );
}

export default GuideIndex;