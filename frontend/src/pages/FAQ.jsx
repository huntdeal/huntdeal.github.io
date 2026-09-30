import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, ArrowRight, MessageCircle } from "lucide-react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      category: "General",
      question: "What is HuntDeal?",
      answer:
        "HuntDeal is a deal discovery platform that helps shoppers discover products, discounts and interesting offers in one place.",
    },
    {
      category: "General",
      question: "How does HuntDeal work?",
      answer:
        "You can browse deals by category, search for products or explore trending offers. When you choose a deal, you can continue to the retailer's website to complete your purchase.",
    },
    {
      category: "Deals",
      question: "Are the prices shown on HuntDeal always accurate?",
      answer:
        "Product prices, availability and discounts can change on the retailer's website. Always verify the current price and availability before making a purchase.",
    },
    {
      category: "Deals",
      question: "How often are deals updated?",
      answer:
        "Deals are reviewed and updated regularly. Availability and pricing may change at any time depending on the retailer.",
    },
    {
      category: "Amazon",
      question: "Does HuntDeal sell the products directly?",
      answer:
        "No. HuntDeal is a deal discovery platform. Purchases are completed on the retailer's website.",
    },
    {
      category: "Amazon",
      question: "Why am I redirected to Amazon?",
      answer:
        "When a product is available on Amazon, the View Deal button can take you to Amazon so you can review the current product information and complete your purchase there.",
    },
    {
      category: "Affiliate",
      question: "Does HuntDeal use affiliate links?",
      answer:
        "Yes. Some links on HuntDeal may be affiliate links. If you make a qualifying purchase after clicking one of these links, HuntDeal may earn a commission at no additional cost to you.",
    },
    {
      category: "Affiliate",
      question: "Does using an affiliate link cost me extra?",
      answer:
        "No. Using an affiliate link does not add an extra cost to your purchase. The retailer's normal pricing and terms apply.",
    },
    {
      category: "Support",
      question: "I found an incorrect deal. How can I report it?",
      answer:
        "You can contact us through the Contact page and tell us which product or deal needs attention.",
    },
    {
      category: "Support",
      question: "How can I contact HuntDeal?",
      answer:
        "You can reach us through our Contact page with your question, feedback or suggestion.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const search = searchTerm.toLowerCase();

    return (
      faq.question.toLowerCase().includes(search) ||
      faq.answer.toLowerCase().includes(search) ||
      faq.category.toLowerCase().includes(search)
    );
  });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="faq-page">
      <div className="container">

        {/* BREADCRUMB */}

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>FAQ</span>
        </div>

        {/* HERO */}

        <section className="faq-hero">

          <div>
            <span className="section-label">
              FREQUENTLY ASKED QUESTIONS
            </span>

            <h1>
              Questions?
              <br />
              <span>We've got answers.</span>
            </h1>

            <p>
              Find answers to common questions about HuntDeal,
              deals, products and affiliate links.
            </p>
          </div>

          <div className="faq-hero-card">

            <div className="faq-hero-icon">
              <MessageCircle size={26} />
            </div>

            <strong>
              Need more help?
            </strong>

            <span>
              Can't find what you're looking for?
            </span>

            <Link to="/contact">
              Contact Us
              <ArrowRight size={14} />
            </Link>

          </div>

        </section>

        {/* SEARCH */}

        <section className="faq-search-section">

          <div className="faq-search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setOpenIndex(null);
              }}
            />

          </div>

        </section>

        {/* FAQ LIST */}

        <section className="faq-content">

          <div className="faq-heading">

            <div>
              <span className="section-label">
                HELP CENTER
              </span>

              <h2>
                Frequently asked questions
              </h2>
            </div>

            <span className="faq-count">
              {filteredFaqs.length} Questions
            </span>

          </div>

          <div className="faq-list">

            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (

                <div
                  className={`faq-item ${
                    openIndex === index ? "active" : ""
                  }`}
                  key={`${faq.question}-${index}`}
                >

                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openIndex === index}
                  >

                    <div>

                      <span className="faq-category">
                        {faq.category}
                      </span>

                      <h3>
                        {faq.question}
                      </h3>

                    </div>

                    <span className="faq-chevron">
                      <ChevronDown size={19} />
                    </span>

                  </button>

                  {openIndex === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}

                </div>

              ))
            ) : (

              <div className="faq-empty">

                <Search size={28} />

                <h3>
                  No questions found
                </h3>

                <p>
                  Try searching with a different keyword.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* CONTACT CTA */}

        <section className="faq-contact-cta">

          <div>

            <span className="section-label">
              STILL HAVE QUESTIONS?
            </span>

            <h2>
              We're here to <span>help.</span>
            </h2>

            <p>
              If you couldn't find your answer, send us a
              message and we'll help you out.
            </p>

          </div>

          <Link
            to="/contact"
            className="faq-contact-button"
          >
            Contact Us
            <ArrowRight size={16} />
          </Link>

        </section>

      </div>
    </main>
  );
}

export default FAQ;