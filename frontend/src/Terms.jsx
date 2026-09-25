import Header from "./Header";
import Footer from "./Footer";
const Terms = () => {
  return (
    <div className="guide-page">
      <Header />

      <main className="guide-content">
        <p className="eyebrow">HUNTDEAL</p>

        <h1>Terms & Disclaimer</h1>

        <p className="guide-intro">
          These terms explain the general conditions for using HuntDeal
          and the nature of the information provided on this website.
        </p>

        <p className="guide-updated">
          Last updated: September 2026
        </p>

        <section>
          <h2>1. Use of HuntDeal</h2>

          <p>
            HuntDeal is a deal discovery and buying guide website that
            helps users discover products and online offers.
          </p>

          <p>
            By using this website, you agree to use the website for
            lawful purposes and not to misuse, disrupt, or attempt to
            gain unauthorized access to the website or its services.
          </p>
        </section>

        <section>
          <h2>2. Deal & Product Information</h2>

          <p>
            HuntDeal provides product and deal information for
            informational and discovery purposes. Product information,
            offers, availability, and other details may change over
            time.
          </p>

          <p>
            We make reasonable efforts to provide useful information,
            but we do not guarantee that every product detail, offer,
            availability status, or other information will always be
            complete, current, or error-free.
          </p>
        </section>

        <section>
          <h2>3. Verify Before Purchasing</h2>

          <p>
            Users should always verify the latest product information,
            availability, applicable offers, delivery details, and
            purchase conditions on the retailer's website before
            completing an order.
          </p>

          <p>
            HuntDeal is not responsible for changes made by retailers
            after information is displayed on this website.
          </p>
        </section>

        <section>
          <h2>4. Amazon Associates Disclosure</h2>

          <p>
            HuntDeal participates in the Amazon Associates Program, an
            affiliate advertising program designed to provide a means
            for websites to earn advertising fees by advertising and
            linking to Amazon.in.
          </p>

          <p>
            Some links on HuntDeal are affiliate links. If you click an
            affiliate link and make a qualifying purchase, HuntDeal may
            earn a commission at no additional cost to you.
          </p>

          <p>
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Websites</h2>

          <p>
            HuntDeal may provide links to third-party websites,
            including Amazon.in. These websites are operated independently
            from HuntDeal.
          </p>

          <p>
            Once you leave HuntDeal and visit a third-party website,
            that website's own terms, policies, pricing, availability,
            and conditions apply.
          </p>
        </section>

        <section>
          <h2>6. No Guarantee of Availability</h2>

          <p>
            Online products and offers can become unavailable or change
            without notice. HuntDeal does not guarantee that a product
            or offer displayed on the website will remain available when
            you visit the retailer's website.
          </p>
        </section>

        <section>
          <h2>7. Buying Decisions</h2>

          <p>
            The buying guides published on HuntDeal are intended to
            provide general information and considerations for shoppers.
          </p>

          <p>
            Users are responsible for evaluating products and deciding
            whether a product is suitable for their individual needs
            before making a purchase.
          </p>
        </section>

        <section>
          <h2>8. Intellectual Property</h2>

          <p>
            Unless otherwise stated, the original text, design,
            branding, and other content created for HuntDeal belong to
            HuntDeal or are used with appropriate rights.
          </p>

          <p>
            Third-party trademarks, product names, logos, and other
            materials remain the property of their respective owners.
          </p>
        </section>

        <section>
          <h2>9. Changes to These Terms</h2>

          <p>
            HuntDeal may update these Terms & Disclaimer from time to
            time to reflect changes to the website, services, or
            applicable requirements.
          </p>

          <p>
            Updated terms will be published on this page with a revised
            update date.
          </p>
        </section>

        <section className="affiliate-note">
          <h2>10. Contact Us</h2>

          <p>
            If you have questions about these Terms & Disclaimer,
            please contact us at:
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

export default Terms;