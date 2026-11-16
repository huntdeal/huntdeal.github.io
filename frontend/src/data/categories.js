/**
 * Category catalogue (mock).
 * `slug` is the URL segment: /categories/<slug>
 * `tint`/`solid` feed the CSS custom properties on CategoryCard.
 */

export const categories = [
  {
    slug: "electronics",
    name: "Electronics",
    icon: "Headphones",
    tint: "#EEF0FF",
    solid: "#5B5CE2",
    tagline: "Audio, cameras, displays",
    description:
      "Headphones, speakers, cameras, monitors and the everyday electronics that go on offer most often.",
  },
  {
    slug: "mobiles",
    name: "Mobiles",
    icon: "Smartphone",
    tint: "#E9F6F4",
    solid: "#17A398",
    tagline: "Phones, tablets, chargers",
    description:
      "Smartphones, tablets, fast chargers and the accessories that keep them running.",
  },
  {
    slug: "laptops",
    name: "Laptops",
    icon: "Laptop",
    tint: "#EDF1F8",
    solid: "#3C5A8A",
    tagline: "Notebooks and desk setups",
    description:
      "Thin-and-light notebooks, creator machines, docks and the gear that completes a desk.",
  },
  {
    slug: "fashion",
    name: "Fashion",
    icon: "Shirt",
    tint: "#FDEFF3",
    solid: "#C2567F",
    tagline: "Everyday wear and footwear",
    description:
      "Clothing, footwear, bags and watches — the categories where seasonal discounts run deepest.",
  },
  {
    slug: "home-kitchen",
    name: "Home & Kitchen",
    icon: "CookingPot",
    tint: "#FFF5E8",
    solid: "#D98B2B",
    tagline: "Appliances and essentials",
    description:
      "Kitchen appliances, cleaning gear and storage that make a home run with less effort.",
  },
  {
    slug: "gaming",
    name: "Gaming",
    icon: "Gamepad2",
    tint: "#F0ECFD",
    solid: "#7A4FE0",
    tagline: "Consoles, peripherals, chairs",
    description:
      "Controllers, mechanical keyboards, headsets and the rest of a competitive setup.",
  },
  {
    slug: "beauty",
    name: "Beauty",
    icon: "Sparkles",
    tint: "#FBEEF8",
    solid: "#A854A0",
    tagline: "Skincare and grooming",
    description:
      "Skincare, haircare and grooming devices from brands that discount predictably.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    icon: "Cable",
    tint: "#EAF3FA",
    solid: "#2D7FA8",
    tagline: "Cables, power, small gear",
    description:
      "Power banks, cables, hubs and the small upgrades that are easy to overpay for.",
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
);

export function getCategoryName(slug) {
  return categoryBySlug[slug]?.name ?? slug;
}
