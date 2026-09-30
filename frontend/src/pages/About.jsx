import { Link } from "react-router-dom";
import {
  Target,
  ShieldCheck,
  Search,
  RefreshCw,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

function About() {
  return (
    <main className="about-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>About</span>
        </div>

        {/* HERO */}

        <section className="about-hero">

          <div className="about-hero-content">

            <span className="section-label">
              ABOUT HUNTDEAL
            </span>

            <h1>
              We Hunt Deals.
              <br />
              <span>You Save More.</span>
            </h1>

            <p>
              HuntDeal is a deals discovery platform built to help
              shoppers discover interesting products, discounts and
              offers in one simple place.
            </p>

            <div className="about-hero-buttons">

              <Link
                to="/deals"
                className="about-primary-button"
              >
                Explore Deals
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/contact"
                className="about-secondary-button"
              >
                Contact Us
              </Link>

            </div>

          </div>

          <div className="about-hero-visual">

            <div className="about-glow"></div>

            <div className="about-visual-card">

              <div className="about-visual-icon">
                🔥
              </div>

              <strong>
                Deals Worth Hunting
              </strong>

              <span>
                Hand-picked products and offers
              </span>

            </div>

          </div>

        </section>

        {/* STATS */}

        <section className="about-stats">

          <div>
            <strong>1,000+</strong>
            <span>Deals Discovered</span>
          </div>

          <div>
            <strong>50K+</strong>
            <span>Deal Hunters</span>
          </div>

          <div>
            <strong>Daily</strong>
            <span>Updates</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Deal Discovery</span>
          </div>

        </section>

        {/* MISSION */}

        <section className="about-section">

          <div className="about-section-heading">

            <span className="section-label">
              OUR MISSION
            </span>

            <h2>
              Making deal discovery
              <span> simpler.</span>
            </h2>

            <p>
              Finding a good deal shouldn't require checking
              dozens of websites and comparing endless listings.
              HuntDeal brings useful deal information together
              so shoppers can discover products more easily.
            </p>

          </div>

          <div className="about-mission-grid">

            <div className="about-info-card">

              <div className="about-card-icon">
                <Target size={21} />
              </div>

              <h3>
                Discover
              </h3>

              <p>
                Find interesting products and deals across
                different categories.
              </p>

            </div>

            <div className="about-info-card">

              <div className="about-card-icon">
                <Search size={21} />
              </div>

              <h3>
                Compare
              </h3>

              <p>
                Review available deal information before
                deciding where to shop.
              </p>

            </div>

            <div className="about-info-card">

              <div className="about-card-icon">
                <ShieldCheck size={21} />
              </div>

              <h3>
                Shop with Information
              </h3>

              <p>
                We aim to make product and deal information
                easier to understand.
              </p>

            </div>

          </div>

        </section>

        {/* HOW IT WORKS */}

        <section className="about-section about-how-section">

          <div className="about-section-heading">

            <span className="section-label">
              HOW IT WORKS
            </span>

            <h2>
              From discovery
              <span> to checkout.</span>
            </h2>

          </div>

          <div className="about-steps">

            <div className="about-step">

              <div className="about-step-number">
                01
              </div>

              <div>
                <h3>
                  Discover a Deal
                </h3>

                <p>
                  Browse categories, today's deals or trending
                  products.
                </p>
              </div>

            </div>

            <div className="about-step">

              <div className="about-step-number">
                02
              </div>

              <div>
                <h3>
                  Review the Product
                </h3>

                <p>
                  Check the available product information,
                  pricing and deal details.
                </p>
              </div>

            </div>

            <div className="about-step">

              <div className="about-step-number">
                03
              </div>

              <div>
                <h3>
                  Visit the Retailer
                </h3>

                <p>
                  When you choose to continue, you'll be
                  redirected to the retailer's website.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* TRUST */}

        <section className="about-trust">

          <div className="about-trust-icon">
            <RefreshCw size={25} />
          </div>

          <div>

            <span className="section-label">
              DEAL INFORMATION
            </span>

            <h2>
              Deals can change.
            </h2>

            <p>
              Product prices, availability, discounts and other
              information may change on the retailer's website.
              Always verify the current information before making
              a purchase.
            </p>

          </div>

        </section>

        {/* AFFILIATE DISCLOSURE */}

        <section className="about-affiliate">

          <div className="about-affiliate-icon">
            <ExternalLink size={22} />
          </div>

          <div>

            <h2>
              Affiliate Disclosure
            </h2>

            <p>
              Some links on HuntDeal may be affiliate links.
              If you make a qualifying purchase after clicking
              one of these links, we may earn a commission at
              no additional cost to you.
            </p>

            <p className="about-affiliate-note">
              As an Amazon Associate I earn from qualifying
              purchases.
            </p>

          </div>

        </section>

        {/* CTA */}

        <section className="about-cta">

          <div>

            <span className="section-label">
              START HUNTING
            </span>

            <h2>
              Your next great deal
              <span> might be here.</span>
            </h2>

            <p>
              Explore our latest deals and discover products
              worth checking out.
            </p>

          </div>

          <Link
            to="/deals"
            className="about-cta-button"
          >
            Explore All Deals
            <ArrowRight size={17} />
          </Link>

        </section>

      </div>
    </main>
  );
}

export default About;