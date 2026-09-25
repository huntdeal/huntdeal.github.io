import Header from "./Header";
import Footer from "./Footer";
const PrivacyPolicy = () => {
  return (
    <div className="guide-page">
      <Header />

      <main className="guide-content">
        <p className="eyebrow">HUNTDEAL</p>

        <h1>Privacy Policy</h1>

        <p className="guide-intro">
          This Privacy Policy explains how HuntDeal handles information
          when you visit and use this website.
        </p>

        <p className="guide-updated">
          Last updated: September 2026
        </p>

        <section>
          <h2>1. Information We Collect</h2>

          <p>
            HuntDeal is a deal discovery website. We do not require
            visitors to create an account or provide personal information
            to browse the website.
          </p>

          <p>
            If you contact us by email, we may receive the information
            that you choose to include in your message, such as your
            email address and the contents of your message.
          </p>
        </section>

        <section>
          <h2>2. How We Use Information</h2>

          <p>
            Information provided directly to us by email may be used to
            respond to questions, feedback, suggestions, or website
            issues.
          </p>

          <p>
            We do not use information submitted through email for
            unrelated purposes.
          </p>
        </section>

        <section>
          <h2>3. Affiliate Links</h2>

          <p>
            HuntDeal participates in the Amazon Associates Program.
            Some links on this website are affiliate links. If you
            click an affiliate link and make a qualifying purchase,
            HuntDeal may earn a commission at no additional cost to you.
          </p>

          <p>
            As an Amazon Associate I earn from qualifying purchases.
          </p>

          <p>
            Affiliate links may contain tracking information that allows
            Amazon to associate a visit or qualifying purchase with
            HuntDeal.
          </p>
        </section>

        <section>
          <h2>4. Third-Party Websites</h2>

          <p>
            HuntDeal may link to third-party websites, including
            Amazon.in. When you leave HuntDeal and visit a third-party
            website, that website's own privacy policy and terms may
            apply.
          </p>

          <p>
            HuntDeal does not control the privacy practices, content,
            or policies of third-party websites.
          </p>
        </section>

        <section>
          <h2>5. Cookies and Similar Technologies</h2>

          <p>
            Third-party services or websites linked from HuntDeal may
            use cookies or similar technologies according to their own
            policies.
          </p>

          <p>
            HuntDeal does not require visitors to create an account or
            provide personal information to browse the site's guides
            and deal listings.
          </p>
        </section>

        <section>
          <h2>6. Data Security</h2>

          <p>
            We take reasonable steps to protect information that is
            voluntarily provided to us. However, no method of
            transmission or electronic storage can be guaranteed to be
            completely secure.
          </p>
        </section>

        <section>
          <h2>7. Children's Privacy</h2>

          <p>
            HuntDeal is not intended to knowingly collect personal
            information from children. We do not knowingly request
            personal information from children through this website.
          </p>
        </section>

        <section>
          <h2>8. Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time to
            reflect changes to the website, services, or applicable
            requirements.
          </p>

          <p>
            Any updated version will be published on this page with a
            revised update date.
          </p>
        </section>

        <section className="affiliate-note">
          <h2>9. Contact Us</h2>

          <p>
            If you have questions about this Privacy Policy or how
            HuntDeal handles information, please contact us at:
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

export default PrivacyPolicy;