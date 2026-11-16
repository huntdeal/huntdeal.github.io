/**
 * Editorial content (mock).
 * Article bodies are plain blocks so they can be swapped for CMS output
 * without touching the rendering components.
 */

import { placeholderArticle } from "../utils/placeholder.js";
import { slugify } from "../utils/format.js";

export const blogCategories = [
  "Buying Guides",
  "Deal Strategy",
  "Product Picks",
  "Money Saving",
];

const raw = [
  {
    title: "How to tell a real Amazon discount from an inflated MRP",
    category: "Deal Strategy",
    author: "Ananya Rao",
    date: "2026-11-12",
    featured: true,
    excerpt:
      "A 70% badge means nothing on its own. Here is the three-step check that separates a genuine price drop from a list price nobody ever paid.",
    blocks: [
      {
        type: "p",
        text: "Every large sale produces the same screenshot: a product with a crossed-out price, a bright percentage badge and a countdown timer. The badge is arithmetic, not evidence. It compares the current price against a list price the seller chose, and the seller is free to choose a flattering one.",
      },
      { type: "h2", text: "1. Compare against the trailing price, not the MRP" },
      {
        type: "p",
        text: "The number worth knowing is what the product actually sold for over the last ninety days. If a kettle spent most of the quarter at ₹1,699 and now shows ₹1,499 against an MRP of ₹2,999, the real saving is ₹200 — a fair deal, but not the 50% on the badge.",
      },
      { type: "h2", text: "2. Watch how long the price has held" },
      {
        type: "p",
        text: "A price that has been flat for weeks and then drops during a sale event is usually a genuine promotion. A price that oscillates every few days is a pricing algorithm, and waiting a week often costs nothing.",
      },
      {
        type: "quote",
        text: "The fastest way to overpay in a sale is to measure the discount against a number the seller invented.",
      },
      { type: "h2", text: "3. Separate the deal from the product" },
      {
        type: "p",
        text: "A genuinely discounted product you do not need is still a full-price mistake. Decide what you are buying before the sale begins, then let the discount decide only the timing.",
      },
      { type: "h3", text: "A quick checklist" },
      {
        type: "ul",
        items: [
          "Note the price today, before the sale starts.",
          "Check whether the seller is Amazon or a third party.",
          "Read the two-star reviews, not the five-star ones.",
          "Confirm the warranty terms for the specific listing.",
        ],
      },
      {
        type: "p",
        text: "HuntDeal exists to make the first step easy: we track what we list, show the discount plainly, and link you to the Amazon page so you can verify everything yourself before buying.",
      },
    ],
  },
  {
    title: "Wireless earbuds under ₹5,000: what you actually give up",
    category: "Buying Guides",
    author: "Dev Mehta",
    date: "2026-11-08",
    excerpt:
      "Budget earbuds have closed most of the gap on sound. The remaining compromises are in microphones, codecs and how long the battery survives year two.",
    blocks: [
      {
        type: "p",
        text: "Five years ago, a pair of earbuds under ₹5,000 meant accepting thin sound and a connection that dropped in crowded places. That is no longer true. What has not changed is the set of compromises hiding behind the spec sheet.",
      },
      { type: "h2", text: "Microphones are the real gap" },
      {
        type: "p",
        text: "Playback quality at this price is good. Call quality is where the budget goes. Cheaper buds use fewer microphones and simpler beamforming, which is fine in a quiet room and poor on a street.",
      },
      { type: "h2", text: "Active noise cancellation varies wildly" },
      {
        type: "p",
        text: "ANC on a budget pair usually handles low, constant noise — an aircraft cabin, an air conditioner — and does little about voices. If your reason for buying is an open-plan office, test before committing.",
      },
      { type: "h2", text: "Battery ageing is the hidden cost" },
      {
        type: "ul",
        items: [
          "Expect 70–80% of original battery life after two years of daily use.",
          "Cases degrade faster than the buds themselves.",
          "Replaceable ear tips extend comfort far more than they cost.",
        ],
      },
      {
        type: "p",
        text: "Buy for the microphone and the fit. Everything else at this price is close enough that the discount should decide.",
      },
    ],
  },
  {
    title: "The sale calendar: when each category is actually cheapest",
    category: "Money Saving",
    author: "Ananya Rao",
    date: "2026-11-03",
    excerpt:
      "Televisions, laptops and kitchen appliances bottom out at different points in the year. A short map of when to buy and when to wait.",
    blocks: [
      {
        type: "p",
        text: "Discounts are not random. Retail pricing follows inventory cycles, and those cycles are predictable enough to plan around if you are not in a hurry.",
      },
      { type: "h2", text: "Laptops follow the academic year" },
      {
        type: "p",
        text: "Prices soften before term starts and again when a new chip generation is announced, because retailers need the previous generation off the shelf.",
      },
      { type: "h2", text: "Large appliances move with festival season" },
      {
        type: "p",
        text: "Refrigerators, washing machines and televisions see their deepest cuts during festival sales, paired with exchange offers and bank cashbacks that often matter more than the headline price.",
      },
      { type: "h2", text: "Small electronics are event-driven" },
      {
        type: "ul",
        items: [
          "Earbuds and speakers: around major sale events, roughly quarterly.",
          "Power banks and cables: consistently discounted, rarely worth waiting for.",
          "Cameras: after a successor model is announced.",
        ],
      },
      {
        type: "p",
        text: "If a purchase can wait a quarter, the calendar is usually worth more than any single coupon.",
      },
    ],
  },
  {
    title: "Five kitchen appliances worth the counter space",
    category: "Product Picks",
    author: "Ritika Shah",
    date: "2026-10-27",
    excerpt:
      "Most kitchen gadgets are used twice and stored forever. These five earn their footprint — and all of them discount predictably.",
    blocks: [
      {
        type: "p",
        text: "Counter space is the scarcest resource in a small kitchen. An appliance has to be used weekly to justify it, which rules out most of what gets heavily marketed.",
      },
      { type: "h2", text: "1. Air fryer" },
      {
        type: "p",
        text: "Earns its place if you reheat often. A 4–5 litre basket suits a household of three or four; anything smaller requires cooking in batches, which defeats the convenience.",
      },
      { type: "h2", text: "2. Electric kettle" },
      {
        type: "p",
        text: "The cheapest appliance on this list and probably the most used. A glass body makes limescale visible, which is the main reason kettles get replaced.",
      },
      { type: "h2", text: "3. Mixer grinder" },
      {
        type: "p",
        text: "Non-negotiable in most Indian kitchens. Buy on motor warranty rather than wattage; the motor is what fails.",
      },
      { type: "h2", text: "4. Induction hob" },
      {
        type: "p",
        text: "A useful second burner that pays for itself during gas-cylinder gaps and outperforms gas for precise simmering.",
      },
      { type: "h2", text: "5. Food storage set" },
      {
        type: "p",
        text: "Not exciting, but the difference between cooking once and eating twice. Buy one stackable system rather than accumulating mismatched boxes.",
      },
    ],
  },
  {
    title: "Affiliate links, explained plainly",
    category: "Deal Strategy",
    author: "HuntDeal Team",
    date: "2026-10-20",
    excerpt:
      "How HuntDeal makes money, what it costs you (nothing), and why it does not change which deals we list.",
    blocks: [
      {
        type: "p",
        text: "HuntDeal is free to use and carries no advertising. When you follow a link from a deal page to Amazon and buy something, Amazon may pay us a small commission on that sale.",
      },
      { type: "h2", text: "What it costs you" },
      {
        type: "p",
        text: "Nothing. The commission comes out of Amazon's margin, not your total. The price on the Amazon page is the price you would pay arriving from anywhere else.",
      },
      { type: "h2", text: "What it does not change" },
      {
        type: "ul",
        items: [
          "Commission rates do not decide what we list or how we rank it.",
          "We do not accept payment from brands for placement.",
          "Prices and availability are confirmed on Amazon, not here.",
        ],
      },
      {
        type: "quote",
        text: "As an Amazon Associate I earn from qualifying purchases.",
      },
      {
        type: "p",
        text: "That disclosure appears in our footer and on every deal page, as the Associates programme requires.",
      },
    ],
  },
  {
    title: "A practical guide to buying your first mechanical keyboard",
    category: "Buying Guides",
    author: "Dev Mehta",
    date: "2026-10-14",
    excerpt:
      "Switch types, layouts and the two specifications that matter more than RGB. Written for someone buying one keyboard, not starting a collection.",
    blocks: [
      {
        type: "p",
        text: "Mechanical keyboards are an enthusiast category with a beginner problem: almost all the available advice is written by people on their seventh board.",
      },
      { type: "h2", text: "Pick a switch family, not a switch" },
      {
        type: "p",
        text: "Linear switches are smooth and quiet enough for shared spaces. Tactile switches give a bump at the actuation point and suit typing. Clicky switches are loud; if you share a room, the decision is made for you.",
      },
      { type: "h2", text: "Layout is a long-term commitment" },
      {
        type: "p",
        text: "Tenkeyless removes the number pad and returns desk space. If you enter numbers all day, keep the pad. Switching layouts costs weeks of accuracy.",
      },
      { type: "h2", text: "The two specifications that matter" },
      {
        type: "ul",
        items: [
          "Hot-swap sockets: lets you change switches without soldering.",
          "PBT keycaps: resist the shine that ABS develops within a year.",
        ],
      },
      {
        type: "p",
        text: "Everything else — lighting, software, metal cases — is preference. Buy hot-swap and PBT, and a mid-range board will outlast two cheap ones.",
      },
    ],
  },
];

function toPost(row, index) {
  const slug = slugify(row.title);
  const wordCount = row.blocks.reduce((total, block) => {
    if (block.type === "ul") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    return total + String(block.text ?? "").split(/\s+/).length;
  }, 0);

  return {
    id: slug,
    slug,
    numericId: index + 1,
    title: row.title,
    category: row.category,
    author: row.author,
    publishedAt: row.date,
    excerpt: row.excerpt,
    featured: Boolean(row.featured),
    blocks: row.blocks,
    readingMinutes: Math.max(2, Math.round(wordCount / 200)),
    image: placeholderArticle(slug, row.category),
  };
}

export const posts = raw.map(toPost);

export const postById = Object.fromEntries(posts.map((post) => [post.id, post]));
