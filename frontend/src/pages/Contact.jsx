import { Link } from "react-router-dom";
import {
  Mail,
  MessageCircle,
  ArrowRight,
  Send,
} from "lucide-react";

function Contact() {
  return (
    <main className="contact-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </div>

        {/* HERO */}

        <section className="contact-hero">

          <div>
            <span className="section-label">
              CONTACT US
            </span>

            <h1>
              Have a question?
              <br />
              <span>Let's talk.</span>
            </h1>

            <p>
              Have a question about a deal, product or HuntDeal?
              Send us a message and we'll get back to you.
            </p>
          </div>

          <div className="contact-hero-badge">
            <div className="contact-badge-icon">
              <MessageCircle size={25} />
            </div>

            <strong>
              We're here to help
            </strong>

            <span>
              Questions, feedback or suggestions are welcome.
            </span>
          </div>

        </section>

        {/* CONTACT CONTENT */}

        <section className="contact-content">

          {/* FORM */}

          <div className="contact-form-card">

            <div className="contact-card-heading">
              <span className="section-label">
                SEND A MESSAGE
              </span>

              <h2>
                Tell us what you need.
              </h2>

              <p>
                Fill in the form below and we'll review your
                message.
              </p>
            </div>

            <form
              className="contact-form"
              onSubmit={(e) => e.preventDefault()}
            >

              <div className="contact-form-row">

                <div className="contact-field">
                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

              </div>

              <div className="contact-field">

                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="What is your message about?"
                />

              </div>

              <div className="contact-field">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  rows="6"
                  placeholder="Write your message here..."
                ></textarea>

              </div>

              <button
                type="submit"
                className="contact-submit-button"
              >
                Send Message
                <Send size={16} />
              </button>

            </form>

          </div>

          {/* CONTACT INFO */}

          <aside className="contact-info">

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <Mail size={21} />
              </div>

              <div>
                <span>
                  Email
                </span>

                <h3>
                  support@huntdeal.in
                </h3>

                <p>
                  For general questions and support.
                </p>
              </div>

            </div>

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <MessageCircle size={21} />
              </div>

              <div>
                <span>
                  Feedback
                </span>

                <h3>
                  Tell us what you think
                </h3>

                <p>
                  Suggestions help us improve HuntDeal.
                </p>
              </div>

            </div>

            <div className="contact-info-card">

              <div className="contact-info-icon">
                <ArrowRight size={21} />
              </div>

              <div>
                <span>
                  Looking for deals?
                </span>

                <h3>
                  Explore today's deals
                </h3>

                <p>
                  Discover products and offers on HuntDeal.
                </p>

                <Link
                  to="/deals"
                  className="contact-deals-link"
                >
                  Explore Deals
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>

            {/* SOCIAL */}

            <div className="contact-social-card">

              <span className="section-label">
                FOLLOW HUNTDEAL
              </span>

              <h3>
                Stay connected.
              </h3>

              <div className="contact-socials">

                <a href="#" aria-label="Instagram">
                  <img
                    src="/assets/social-icons/instagram.png"
                    alt="Instagram"
                  />
                </a>

                <a href="#" aria-label="Facebook">
                  <img
                    src="/assets/social-icons/facebook.png"
                    alt="Facebook"
                  />
                </a>

                <a href="#" aria-label="YouTube">
                  <img
                    src="/assets/social-icons/youtube.png"
                    alt="YouTube"
                  />
                </a>

              </div>

            </div>

          </aside>

        </section>

        {/* FAQ CTA */}

        <section className="contact-faq-cta">

          <div>

            <span className="section-label">
              NEED QUICK HELP?
            </span>

            <h2>
              Check our <span>FAQ.</span>
            </h2>

            <p>
              Find answers to common questions about HuntDeal,
              products and affiliate links.
            </p>

          </div>

          <Link
            to="/faq"
            className="contact-faq-button"
          >
            Visit FAQ
            <ArrowRight size={16} />
          </Link>

        </section>

      </div>
    </main>
  );
}

export default Contact;