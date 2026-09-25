import Header from "./Header";
import Footer from "./Footer";
const ContactPage = () => {
  return (
    <div className="guide-page">
      <Header />

      <main className="guide-content">
        <p className="eyebrow">HUNTDEAL</p>

        <h1>Contact Us</h1>

        <p className="guide-intro">
          Have a question, suggestion, or feedback about HuntDeal?
          We'd like to hear from you.
        </p>

        <section>
          <h2>Get in Touch</h2>

          <p>
            If you have feedback about the website, notice an issue with
            a deal, or have a suggestion that could make HuntDeal more
            useful, you can contact us by email.
          </p>

          <p>
            We also welcome suggestions about new categories, useful
            buying guides, and improvements to the website.
          </p>
        </section>

        <section className="affiliate-note">
          <h2>Email</h2>

          <p>
            <strong>Contact:</strong>{" "}
            <a href="mailto:Praveenkumardheeran@gmail.com">
              Praveenkumardheeran@gmail.com
            </a>
          </p>

          <p>
            Please include enough information about your question or
            issue so that we can understand and respond to it.
          </p>
        </section>

        <section>
          <h2>About Deal Information</h2>

          <p>
            HuntDeal helps users discover products and deals available
            online. Product information, availability, and offers can
            change, so users should verify the latest details on the
            retailer's website before making a purchase.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;