import Header from "./Header";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="guide-page">

      <Header />

      <main className="guide-content">

        <p className="eyebrow">
          HUNTDEAL
        </p>

        <h1>
          About HuntDeal
        </h1>

        <p className="guide-intro">
          HuntDeal is a deal discovery website created to help shoppers
          discover useful products and online offers in a simple way.
        </p>

        <section>
          <h2>What is HuntDeal?</h2>

          <p>
            HuntDeal brings together product deals and useful buying
            guides so that shoppers can explore different products and
            categories in one place.
          </p>

          <p>
            Our goal is to make deal discovery simpler while giving
            shoppers useful information to consider before making a
            purchase.
          </p>
        </section>

        <section>
          <h2>Our Buying Guides</h2>

          <p>
            HuntDeal publishes practical buying guides covering everyday
            categories such as home products, kitchen essentials,
            storage solutions, travel accessories, and device
            accessories.
          </p>

          <p>
            These guides focus on factors such as compatibility,
            dimensions, materials, usability, and the specific needs
            that shoppers should consider before buying.
          </p>
        </section>

        <section>
          <h2>How HuntDeal Works</h2>

          <p>
            HuntDeal helps users discover products and then provides
            links to retailer websites where users can find the latest
            product and purchase information.
          </p>

          <p>
            Product availability, offers, and other information can
            change. Users should always verify the latest details on
            the retailer's website before purchasing.
          </p>
        </section>

        <section>
          <h2>Amazon Associates</h2>

          <p>
            HuntDeal participates in the Amazon Associates Program.
            Some links on the website are affiliate links, which means
            HuntDeal may earn a commission from qualifying purchases at
            no additional cost to the customer.
          </p>

          <p>
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </section>

        <section className="affiliate-note">
          <h2>Contact HuntDeal</h2>

          <p>
            Have feedback, suggestions, or questions about HuntDeal?
            We'd be happy to hear from you.
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:Praveenkumardheeran@gmail.com">
              Praveenkumardheeran@gmail.com
            </a>
          </p>
        </section>

      </main>

      <Footer />

    </div>
  );
};

export default About;