/** FAQ content grouped by topic. Rendered by the accordion on /faq. */

export const faqGroups = [
  {
    id: "huntdeal",
    title: "About HuntDeal",
    items: [
      {
        q: "What exactly is HuntDeal?",
        a: "HuntDeal is a deal discovery platform. We collect discounts and offers on products listed on Amazon, organise them by category, and link you to the Amazon page where the purchase happens. We are a search and discovery layer, not a shop.",
      },
      {
        q: "Does HuntDeal sell products directly?",
        a: "No. HuntDeal has no cart and no checkout. Every purchase is completed on Amazon, under Amazon's own pricing, payment, delivery and returns policies.",
      },
      {
        q: "Does it cost anything to use?",
        a: "No. HuntDeal is free to use and does not require an account to browse deals, search, or save items to your wishlist.",
      },
      {
        q: "Do I need an account?",
        a: "Not for browsing. Your wishlist is stored in your own browser, so it stays on the device you saved it from and is cleared if you clear your browser data.",
      },
    ],
  },
  {
    id: "deals",
    title: "Deals and products",
    items: [
      {
        q: "How are deals selected?",
        a: "Deals are selected on discount depth, product rating and category balance, so that one category does not crowd out the rest. No brand pays for placement.",
      },
      {
        q: "Why does a deal sometimes disappear?",
        a: "Offers expire and stock runs out. When an offer is no longer live on Amazon, it stops being listed here. Clicking through to Amazon is always the way to confirm a deal is still running.",
      },
      {
        q: "Can I suggest a product or report a wrong price?",
        a: "Yes — use the contact form and include the product link. Pricing corrections are the most useful reports we receive.",
      },
      {
        q: "Is the product data on this site live?",
        a: "Not yet. The current build runs on demo data for the catalogue, prices, ratings and engagement figures while the backend integration is completed. Anything shown here should be verified on the Amazon product page before buying.",
      },
    ],
  },
  {
    id: "affiliate",
    title: "Amazon affiliate links",
    items: [
      {
        q: "How does HuntDeal make money?",
        a: "Through the Amazon Associates programme. If you follow a link from HuntDeal to Amazon and make a qualifying purchase, Amazon may pay us a small commission. As an Amazon Associate I earn from qualifying purchases.",
      },
      {
        q: "Does using an affiliate link cost me more?",
        a: "No. The price you pay on Amazon is the same whether you arrive through HuntDeal or go to Amazon directly. The commission is paid by Amazon out of its own margin.",
      },
      {
        q: "Does commission influence which deals you show?",
        a: "No. Listings and ranking are based on discount, rating and category coverage. We do not sell placement, and commission rates are not an input to ranking.",
      },
      {
        q: "Where is the disclosure shown?",
        a: "In the site footer, on every product detail page, and in our About page. The Associates programme requires it, and it is good practice regardless.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing, discounts and availability",
    items: [
      {
        q: "Why does the Amazon price differ from the one shown here?",
        a: "Amazon prices change continuously. The figure on HuntDeal reflects the last time that deal was recorded, which is why every deal page links through so you can confirm the current price before buying.",
      },
      {
        q: "How is the discount percentage calculated?",
        a: "It is the difference between the listed original price and the current price, as a percentage of the original. Bank offers, coupons and exchange values are not included in that number.",
      },
      {
        q: "Do you track price history?",
        a: "Not in this release. Price history is on the roadmap and will arrive with the backend integration.",
      },
      {
        q: "Is availability guaranteed?",
        a: "No. Stock is managed entirely by Amazon and its sellers. We never claim an item is in stock — only that it was listed when the deal was recorded.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy and data",
    items: [
      {
        q: "What data does HuntDeal store about me?",
        a: "Browsing HuntDeal does not require an account. Your wishlist and newsletter preference are stored locally in your browser, not on our servers.",
      },
      {
        q: "Do you share data with Amazon?",
        a: "Following an affiliate link tells Amazon that the visit came from HuntDeal, which is how the programme attributes a sale. Amazon's own privacy policy governs what happens after you arrive there.",
      },
      {
        q: "Do you use tracking cookies?",
        a: "This build uses browser local storage for your wishlist and preferences, and no third-party advertising trackers.",
      },
    ],
  },
  {
    id: "support",
    title: "Contact and support",
    items: [
      {
        q: "How do I get in touch?",
        a: "Use the contact form, or email the address listed on the contact page. Most messages receive a reply within two working days.",
      },
      {
        q: "I have a problem with an order. Can you help?",
        a: "Orders are placed with Amazon, so Amazon customer service handles delivery, returns and refunds. We can help with anything wrong on HuntDeal itself — a broken link, an incorrect price, a miscategorised product.",
      },
      {
        q: "Do you accept partnership enquiries?",
        a: "Yes. Send the details through the contact form with 'Partnership' as the subject.",
      },
    ],
  },
];
