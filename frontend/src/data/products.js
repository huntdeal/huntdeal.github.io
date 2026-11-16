/**
 * Mock product catalogue.
 *
 * DEMO DATA — brands, prices, ratings and click counts below are invented for
 * the frontend build. They are not live Amazon values and must be replaced by
 * the real backend feed (see `src/services/productService.js`).
 *
 * Raw rows stay terse; `enrich()` derives everything the UI needs (slug,
 * discount, gallery, affiliate URL, popularity) so a row is cheap to add.
 */

import { placeholderGallery } from "../utils/placeholder.js";
import { discountPercent, slugify } from "../utils/format.js";
import { categoryBySlug } from "./categories.js";

/** Affiliate tag placeholder — swap for the real Associates tag at launch. */
export const AFFILIATE_TAG = "huntdeal-21";

/**
 * Builds a working Amazon search URL carrying the affiliate tag. Real ASIN
 * deep links (`/dp/<ASIN>?tag=`) arrive with the backend feed; until then a
 * search link is honest about what we actually know.
 */
export function buildAffiliateUrl(name, asin) {
  if (asin) {
    return `https://www.amazon.in/dp/${asin}?tag=${AFFILIATE_TAG}`;
  }
  return `https://www.amazon.in/s?k=${encodeURIComponent(name)}&tag=${AFFILIATE_TAG}`;
}

/* ------------------------------------------------------------------ *
 * Raw rows
 * p = price, m = MRP/original, r = rating, rv = reviews,
 * c = demo click count, d = days since added
 * ------------------------------------------------------------------ */

const raw = [
  /* ----------------------------- Electronics ----------------------------- */
  {
    name: "Aurex H9 Wireless Noise Cancelling Headphones",
    category: "electronics",
    brand: "Aurex",
    p: 8499,
    m: 15990,
    r: 4.5,
    rv: 2841,
    c: 4820,
    d: 2,
    featured: true,
    trending: true,
    description:
      "Over-ear headphones with hybrid active noise cancellation and a 40-hour battery, aimed at commuters who want quiet without carrying a case the size of a lunchbox.",
    features: [
      "Hybrid ANC with three transparency levels",
      "40-hour playback, 10-minute quick charge",
      "Multipoint pairing across two devices",
      "Memory-foam earcups rated for all-day wear",
    ],
    specs: { Connectivity: "Bluetooth 5.3", Weight: "253 g", Warranty: "1 year" },
  },
  {
    name: "Aurex SoundBar 300 Compact Home Theatre",
    category: "electronics",
    brand: "Aurex",
    p: 11499,
    m: 19990,
    r: 4.3,
    rv: 1120,
    c: 2410,
    d: 9,
    description:
      "A 2.1-channel soundbar with a wireless subwoofer, sized for apartments where a full surround set would be overkill.",
    features: [
      "2.1 channels with wireless subwoofer",
      "HDMI eARC and optical input",
      "Night mode that flattens dynamic range",
    ],
    specs: { Output: "320 W peak", Inputs: "HDMI, Optical, BT", Warranty: "1 year" },
  },
  {
    name: "Zenith Optics V5 4K Action Camera",
    category: "electronics",
    brand: "Zenith Optics",
    p: 12999,
    m: 21999,
    r: 4.4,
    rv: 876,
    c: 3190,
    d: 5,
    trending: true,
    description:
      "A pocket action camera shooting 4K60 with in-body stabilisation, waterproof to 10 m without an external housing.",
    features: [
      "4K60 and 1080p240 slow motion",
      "Electronic stabilisation with horizon lock",
      "Waterproof to 10 m, no case required",
      "Front-facing preview screen",
    ],
    specs: { Sensor: "1/1.9 inch", Battery: "1750 mAh", Warranty: "1 year" },
  },
  {
    name: "Corewave 27-inch QHD IPS Monitor",
    category: "electronics",
    brand: "Corewave",
    p: 17490,
    m: 26999,
    r: 4.6,
    rv: 1543,
    c: 2880,
    d: 12,
    featured: true,
    description:
      "A 27-inch 1440p IPS panel at 100 Hz with USB-C power delivery — the simple upgrade for a laptop-only desk.",
    features: [
      "2560 × 1440 at 100 Hz",
      "65 W USB-C power delivery to a laptop",
      "Height, tilt and pivot adjustment",
      "Factory sRGB calibration report included",
    ],
    specs: { Panel: "IPS, 27 inch", Ports: "USB-C, 2× HDMI, DP", Warranty: "3 years" },
  },
  {
    name: "Aurex Pebble Portable Bluetooth Speaker",
    category: "electronics",
    brand: "Aurex",
    p: 2299,
    m: 4499,
    r: 4.2,
    rv: 3902,
    c: 5120,
    d: 1,
    trending: true,
    description:
      "A palm-sized speaker rated IP67 that pairs two units into a stereo set, built for balconies and short trips.",
    features: [
      "IP67 dust and water resistance",
      "14-hour battery at moderate volume",
      "Stereo pairing between two speakers",
    ],
    specs: { Output: "20 W", Battery: "14 hours", Warranty: "1 year" },
  },
  {
    name: "Nexio AirBuds Pro ANC Earbuds",
    category: "electronics",
    brand: "Nexio",
    p: 3499,
    m: 7999,
    r: 4.1,
    rv: 6410,
    c: 7340,
    d: 3,
    featured: true,
    trending: true,
    description:
      "True wireless earbuds with adaptive ANC and low-latency gaming mode, at the price where earbuds usually stop having either.",
    features: [
      "Adaptive ANC with ambient mode",
      "8 + 30 hours with the charging case",
      "55 ms low-latency gaming mode",
      "Wireless charging case",
    ],
    specs: { Drivers: "11 mm", Codec: "AAC, SBC, LDAC", Warranty: "1 year" },
  },

  /* ------------------------------- Mobiles ------------------------------- */
  {
    name: "Nexio 12 Pro 5G Smartphone 256 GB",
    category: "mobiles",
    brand: "Nexio",
    p: 38999,
    m: 54999,
    r: 4.4,
    rv: 2210,
    c: 6120,
    d: 4,
    featured: true,
    trending: true,
    description:
      "A flagship-class 5G phone with a 6.7-inch 120 Hz AMOLED display and a 50 MP main sensor, discounted hardest around launch anniversaries.",
    features: [
      "6.7-inch 120 Hz LTPO AMOLED",
      "50 MP main with optical stabilisation",
      "5000 mAh battery, 80 W wired charging",
      "Four years of OS updates promised",
    ],
    specs: { Storage: "256 GB", Display: "6.7 inch AMOLED", Warranty: "1 year" },
  },
  {
    name: "Nexio Lite 5G Smartphone 128 GB",
    category: "mobiles",
    brand: "Nexio",
    p: 14999,
    m: 21999,
    r: 4.2,
    rv: 5841,
    c: 4410,
    d: 7,
    description:
      "The mid-range model that holds the sweet spot: clean software, a 5000 mAh battery and no carrier bloat.",
    features: [
      "6.4-inch 90 Hz AMOLED",
      "5000 mAh battery, two-day typical use",
      "Dedicated microSD slot",
    ],
    specs: { Storage: "128 GB", Display: "6.4 inch AMOLED", Warranty: "1 year" },
  },
  {
    name: "Corewave Tab S11 11-inch Tablet",
    category: "mobiles",
    brand: "Corewave",
    p: 24999,
    m: 36999,
    r: 4.3,
    rv: 932,
    c: 2180,
    d: 14,
    description:
      "An 11-inch tablet with a 120 Hz display and stylus support, positioned for note-taking rather than media alone.",
    features: [
      "11-inch 120 Hz LCD, 500 nits",
      "Stylus included in the box",
      "Quad speakers tuned for video calls",
    ],
    specs: { Storage: "128 GB", Battery: "8000 mAh", Warranty: "1 year" },
  },
  {
    name: "Volt9 65 W GaN Fast Charger",
    category: "mobiles",
    brand: "Volt9",
    p: 1799,
    m: 3299,
    r: 4.5,
    rv: 4120,
    c: 3980,
    d: 2,
    trending: true,
    description:
      "A three-port GaN charger small enough to leave in a bag, able to run a laptop and two phones at once.",
    features: [
      "65 W total across USB-C ×2 and USB-A",
      "GaN internals, noticeably cooler",
      "Foldable pins for travel",
    ],
    specs: { Output: "65 W", Ports: "2× USB-C, 1× USB-A", Warranty: "18 months" },
  },
  {
    name: "Nexio Shield Rugged Case for Nexio 12 Series",
    category: "mobiles",
    brand: "Nexio",
    p: 699,
    m: 1499,
    r: 4.0,
    rv: 1890,
    c: 1410,
    d: 18,
    description:
      "A drop-rated case with raised camera lips, for people who have replaced one screen too many.",
    features: [
      "Military drop rating to 2 m",
      "Raised bezel around lenses",
      "Wireless charging compatible",
    ],
    specs: { Material: "TPU + polycarbonate", Fit: "Nexio 12 / 12 Pro", Warranty: "6 months" },
  },
  {
    name: "Volt9 20000 mAh Power Bank 22.5 W",
    category: "mobiles",
    brand: "Volt9",
    p: 2199,
    m: 3999,
    r: 4.3,
    rv: 7230,
    c: 5210,
    d: 6,
    featured: true,
    description:
      "A 20000 mAh pack with a usable 22.5 W output and a display that shows the real remaining percentage.",
    features: [
      "20000 mAh, airline carry-on friendly",
      "22.5 W output, 18 W input",
      "Digital charge display",
    ],
    specs: { Capacity: "20000 mAh", Output: "22.5 W", Warranty: "1 year" },
  },

  /* ------------------------------- Laptops ------------------------------- */
  {
    name: "Corewave Air 14 Thin & Light Laptop",
    category: "laptops",
    brand: "Corewave",
    p: 54990,
    m: 74990,
    r: 4.4,
    rv: 1310,
    c: 4620,
    d: 3,
    featured: true,
    trending: true,
    description:
      "A 1.2 kg 14-inch notebook with a 2.8K display, built around battery life rather than benchmark charts.",
    features: [
      "14-inch 2.8K 90 Hz display",
      "1.24 kg with a 70 Wh battery",
      "Backlit keyboard and large glass trackpad",
      "Two Thunderbolt-class USB-C ports",
    ],
    specs: { RAM: "16 GB", Storage: "512 GB SSD", Warranty: "1 year onsite" },
  },
  {
    name: "Corewave Studio 16 Creator Laptop",
    category: "laptops",
    brand: "Corewave",
    p: 109990,
    m: 139990,
    r: 4.6,
    rv: 486,
    c: 2110,
    d: 11,
    description:
      "A 16-inch workstation with a colour-accurate panel and a discrete GPU, for editing timelines rather than spreadsheets.",
    features: [
      "16-inch 4K OLED, 100% DCI-P3",
      "Discrete 8 GB GPU",
      "Dual SSD slots, user replaceable",
    ],
    specs: { RAM: "32 GB", Storage: "1 TB SSD", Warranty: "2 years onsite" },
  },
  {
    name: "Pulsar Labs Raptor 15 Gaming Laptop",
    category: "laptops",
    brand: "Pulsar Labs",
    p: 86990,
    m: 114990,
    r: 4.2,
    rv: 742,
    c: 3340,
    d: 8,
    trending: true,
    description:
      "A 15-inch gaming laptop with a 165 Hz panel and a cooling design that keeps the keyboard deck usable.",
    features: [
      "15.6-inch 165 Hz, 300 nits",
      "Vapour chamber cooling",
      "Per-key RGB keyboard",
    ],
    specs: { RAM: "16 GB", Storage: "1 TB SSD", Warranty: "1 year" },
  },
  {
    name: "Corewave USB-C Docking Station 11-in-1",
    category: "laptops",
    brand: "Corewave",
    p: 4999,
    m: 8999,
    r: 4.1,
    rv: 1021,
    c: 1620,
    d: 21,
    description:
      "One cable to the laptop, eleven ports on the desk — including dual display output and gigabit ethernet.",
    features: [
      "Dual HDMI output at 4K30",
      "100 W power pass-through",
      "Gigabit ethernet and SD reader",
    ],
    specs: { Ports: "11", "Power pass-through": "100 W", Warranty: "1 year" },
  },
  {
    name: "Kraftline Adjustable Laptop Riser",
    category: "laptops",
    brand: "Kraftline",
    p: 1299,
    m: 2499,
    r: 4.4,
    rv: 2840,
    c: 1980,
    d: 16,
    description:
      "An aluminium stand with six height stops, the cheapest fix for a neck that hurts by Thursday.",
    features: [
      "Six height positions",
      "Folds flat for a bag",
      "Open base for airflow",
    ],
    specs: { Material: "Aluminium", "Max load": "8 kg", Warranty: "6 months" },
  },
  {
    name: "Corewave 1 TB NVMe Portable SSD",
    category: "laptops",
    brand: "Corewave",
    p: 6999,
    m: 11999,
    r: 4.5,
    rv: 1890,
    c: 2460,
    d: 13,
    featured: true,
    description:
      "A pocket SSD sustaining around 1000 MB/s, fast enough to edit footage straight off the drive.",
    features: [
      "Up to 1050 MB/s read",
      "Aluminium shell, shock resistant",
      "USB-C cable and USB-A adapter included",
    ],
    specs: { Capacity: "1 TB", Interface: "USB 3.2 Gen 2", Warranty: "3 years" },
  },

  /* ------------------------------- Fashion ------------------------------- */
  {
    name: "Northbound Everyday Running Shoes",
    category: "fashion",
    brand: "Northbound",
    p: 2499,
    m: 5999,
    r: 4.2,
    rv: 5210,
    c: 4310,
    d: 2,
    featured: true,
    trending: true,
    description:
      "A neutral daily trainer with a breathable knit upper, priced for the runner who replaces shoes on schedule.",
    features: [
      "Knit upper with reinforced heel",
      "14 mm foam drop",
      "Removable insole",
    ],
    specs: { Sizes: "UK 6–12", Weight: "268 g", Warranty: "3 months" },
  },
  {
    name: "Northbound Water-Resistant Travel Backpack 30 L",
    category: "fashion",
    brand: "Northbound",
    p: 1999,
    m: 4299,
    r: 4.4,
    rv: 3180,
    c: 3010,
    d: 5,
    description:
      "A 30-litre pack with a padded 16-inch laptop sleeve and a luggage pass-through strap.",
    features: [
      "Fits a 16-inch laptop",
      "Water-resistant 600D fabric",
      "Hidden anti-theft rear pocket",
    ],
    specs: { Capacity: "30 L", Material: "600D polyester", Warranty: "1 year" },
  },
  {
    name: "Northbound Chronograph Steel Watch",
    category: "fashion",
    brand: "Northbound",
    p: 3499,
    m: 8999,
    r: 4.0,
    rv: 1420,
    c: 2240,
    d: 10,
    description:
      "A 42 mm chronograph on a steel bracelet — the kind of watch that is discounted twice a year, reliably.",
    features: [
      "42 mm case, 5 ATM rated",
      "Sapphire-coated mineral glass",
      "Quick-release bracelet pins",
    ],
    specs: { Case: "42 mm steel", "Water rating": "5 ATM", Warranty: "2 years" },
  },
  {
    name: "Northbound Merino Blend Crew Sweater",
    category: "fashion",
    brand: "Northbound",
    p: 1799,
    m: 3999,
    r: 4.3,
    rv: 980,
    c: 1240,
    d: 24,
    description:
      "A merino-blend crew that survives a wash cycle without losing shape, in four colours that stay in stock.",
    features: [
      "40% merino blend",
      "Machine washable, cold cycle",
      "Ribbed cuffs that keep tension",
    ],
    specs: { Sizes: "S–XXL", Care: "Machine wash cold", Warranty: "—" },
  },
  {
    name: "Northbound Polarised Sunglasses",
    category: "fashion",
    brand: "Northbound",
    p: 1299,
    m: 2999,
    r: 4.1,
    rv: 2110,
    c: 1760,
    d: 19,
    description:
      "Polarised lenses with UV400 protection and a hinge that does not loosen after a month in a glovebox.",
    features: [
      "Polarised UV400 lenses",
      "Lightweight TR90 frame",
      "Hard case and cloth included",
    ],
    specs: { Lens: "Polarised UV400", Frame: "TR90", Warranty: "6 months" },
  },
  {
    name: "Northbound Leather Bifold Wallet",
    category: "fashion",
    brand: "Northbound",
    p: 899,
    m: 2199,
    r: 4.2,
    rv: 3640,
    c: 1520,
    d: 27,
    description:
      "A slim bifold in full-grain leather with RFID-blocking lining and six card slots.",
    features: [
      "Full-grain leather",
      "RFID-blocking lining",
      "Six card slots, two note sleeves",
    ],
    specs: { Material: "Full-grain leather", Slots: "6 cards", Warranty: "6 months" },
  },

  /* ---------------------------- Home & Kitchen --------------------------- */
  {
    name: "Kraftline 4.5 L Digital Air Fryer",
    category: "home-kitchen",
    brand: "Kraftline",
    p: 5499,
    m: 10999,
    r: 4.4,
    rv: 8120,
    c: 6420,
    d: 1,
    featured: true,
    trending: true,
    description:
      "A 4.5-litre air fryer with eight presets and a basket that actually fits in a standard dishwasher.",
    features: [
      "4.5 L basket, feeds three to four",
      "Eight presets with manual override",
      "Dishwasher-safe basket and tray",
      "Auto shut-off with cool-down fan",
    ],
    specs: { Capacity: "4.5 L", Power: "1400 W", Warranty: "2 years" },
  },
  {
    name: "Kraftline 1.7 L Glass Electric Kettle",
    category: "home-kitchen",
    brand: "Kraftline",
    p: 1499,
    m: 2999,
    r: 4.3,
    rv: 4210,
    c: 2310,
    d: 8,
    description:
      "A borosilicate glass kettle with a concealed element, so limescale stays visible rather than mysterious.",
    features: [
      "1.7 L borosilicate glass body",
      "Concealed stainless element",
      "Boil-dry protection",
    ],
    specs: { Capacity: "1.7 L", Power: "1500 W", Warranty: "1 year" },
  },
  {
    name: "Kraftline Robot Vacuum with Mop",
    category: "home-kitchen",
    brand: "Kraftline",
    p: 18999,
    m: 32999,
    r: 4.2,
    rv: 1140,
    c: 3720,
    d: 6,
    trending: true,
    description:
      "A LiDAR-mapping robot vacuum with a mopping plate, strong enough for tile and short-pile rugs.",
    features: [
      "LiDAR mapping with no-go zones",
      "4000 Pa suction",
      "Scheduling through the app",
    ],
    specs: { Suction: "4000 Pa", Battery: "5200 mAh", Warranty: "1 year" },
  },
  {
    name: "Kraftline Stainless Mixer Grinder 750 W",
    category: "home-kitchen",
    brand: "Kraftline",
    p: 3299,
    m: 5999,
    r: 4.1,
    rv: 6210,
    c: 2010,
    d: 15,
    description:
      "A 750 W mixer with three jars and an overload cutout, the workhorse appliance of an Indian kitchen.",
    features: [
      "Three stainless jars",
      "Overload protection cutout",
      "Five-year motor warranty",
    ],
    specs: { Power: "750 W", Jars: "3", Warranty: "5 years on motor" },
  },
  {
    name: "Kraftline Ceramic Non-Stick Cookware Set of 5",
    category: "home-kitchen",
    brand: "Kraftline",
    p: 4199,
    m: 8499,
    r: 4.0,
    rv: 1820,
    c: 1310,
    d: 22,
    description:
      "A five-piece induction-ready set with a ceramic coating free of PFOA, including two lids.",
    features: [
      "PFOA-free ceramic coating",
      "Induction and gas compatible",
      "Two tempered glass lids",
    ],
    specs: { Pieces: "5", Base: "Induction ready", Warranty: "1 year" },
  },
  {
    name: "Mira Smart LED Desk Lamp with Wireless Charging",
    category: "home-kitchen",
    brand: "Mira",
    p: 2499,
    m: 4999,
    r: 4.3,
    rv: 1420,
    c: 1890,
    d: 12,
    description:
      "A desk lamp with five colour temperatures and a 10 W wireless charging pad built into the base.",
    features: [
      "Five colour temperatures, ten levels",
      "10 W wireless charging base",
      "Memory for the last setting",
    ],
    specs: { Power: "12 W", Charging: "10 W Qi", Warranty: "1 year" },
  },

  /* -------------------------------- Gaming ------------------------------- */
  {
    name: "Pulsar Labs TKL Mechanical Gaming Keyboard",
    category: "gaming",
    brand: "Pulsar Labs",
    p: 3999,
    m: 7999,
    r: 4.5,
    rv: 2310,
    c: 4120,
    d: 3,
    featured: true,
    trending: true,
    description:
      "A hot-swappable tenkeyless board with linear switches and PBT caps, which is unusual at this price.",
    features: [
      "Hot-swappable switch sockets",
      "Double-shot PBT keycaps",
      "Detachable USB-C cable",
      "Per-key RGB with onboard profiles",
    ],
    specs: { Layout: "87-key TKL", Switches: "Linear, hot-swap", Warranty: "1 year" },
  },
  {
    name: "Pulsar Labs 8K Wireless Gaming Mouse",
    category: "gaming",
    brand: "Pulsar Labs",
    p: 4499,
    m: 7499,
    r: 4.4,
    rv: 1180,
    c: 3240,
    d: 7,
    description:
      "A 58 g wireless mouse with an 8000 Hz polling receiver, aimed at shooters rather than spreadsheets.",
    features: [
      "58 g shell, no honeycomb holes",
      "8000 Hz polling receiver",
      "90-hour battery at 1000 Hz",
    ],
    specs: { Weight: "58 g", Sensor: "26K DPI", Warranty: "2 years" },
  },
  {
    name: "Pulsar Labs Wireless Controller for PC & Console",
    category: "gaming",
    brand: "Pulsar Labs",
    p: 3299,
    m: 5999,
    r: 4.2,
    rv: 2640,
    c: 2810,
    d: 9,
    description:
      "A controller with hall-effect sticks that will not drift, plus two remappable back paddles.",
    features: [
      "Hall-effect sticks, drift resistant",
      "Two remappable back paddles",
      "Works over USB-C, BT and 2.4 GHz",
    ],
    specs: { Battery: "1000 mAh", Compatibility: "PC, consoles", Warranty: "1 year" },
  },
  {
    name: "Pulsar Labs Surround Gaming Headset",
    category: "gaming",
    brand: "Pulsar Labs",
    p: 2799,
    m: 5499,
    r: 4.1,
    rv: 3910,
    c: 2440,
    d: 14,
    description:
      "A wired headset with virtual 7.1 and a detachable boom mic that teammates can actually hear.",
    features: [
      "Virtual 7.1 surround over USB",
      "Detachable noise-cancelling boom mic",
      "Fabric earcups for long sessions",
    ],
    specs: { Drivers: "50 mm", Connection: "USB + 3.5 mm", Warranty: "1 year" },
  },
  {
    name: "Pulsar Labs Ergonomic Gaming Chair",
    category: "gaming",
    brand: "Pulsar Labs",
    p: 12999,
    m: 24999,
    r: 4.0,
    rv: 870,
    c: 1920,
    d: 20,
    description:
      "A chair with 4D armrests and real lumbar adjustment rather than a loose cushion on a strap.",
    features: [
      "4D armrests",
      "Built-in adjustable lumbar",
      "Class-4 gas lift, 150 kg rated",
    ],
    specs: { "Max load": "150 kg", Recline: "90–160°", Warranty: "2 years" },
  },
  {
    name: "Pulsar Labs 1 TB Console Expansion SSD",
    category: "gaming",
    brand: "Pulsar Labs",
    p: 8999,
    m: 14999,
    r: 4.6,
    rv: 640,
    c: 1610,
    d: 17,
    description:
      "An NVMe drive with a heatsink pre-fitted to console tolerances, so it drops in without filing anything down.",
    features: [
      "Pre-fitted low-profile heatsink",
      "7000 MB/s sequential read",
      "Five-year limited warranty",
    ],
    specs: { Capacity: "1 TB", Read: "7000 MB/s", Warranty: "5 years" },
  },

  /* -------------------------------- Beauty ------------------------------- */
  {
    name: "Lumen & Co Vitamin C Brightening Serum 30 ml",
    category: "beauty",
    brand: "Lumen & Co",
    p: 849,
    m: 1799,
    r: 4.3,
    rv: 9210,
    c: 5310,
    d: 2,
    featured: true,
    trending: true,
    description:
      "A 10% vitamin C serum in an opaque pump bottle, which matters more than the percentage on the label.",
    features: [
      "10% stabilised vitamin C",
      "Opaque airless pump",
      "Fragrance-free formulation",
    ],
    specs: { Volume: "30 ml", "Skin type": "All", Warranty: "—" },
  },
  {
    name: "Lumen & Co Ceramide Repair Moisturiser 50 g",
    category: "beauty",
    brand: "Lumen & Co",
    p: 699,
    m: 1399,
    r: 4.4,
    rv: 6120,
    c: 3110,
    d: 6,
    description:
      "A ceramide and niacinamide cream for barrier repair, light enough to wear under sunscreen.",
    features: [
      "Three ceramides with niacinamide",
      "Non-comedogenic",
      "No added fragrance",
    ],
    specs: { Volume: "50 g", "Skin type": "Dry to normal", Warranty: "—" },
  },
  {
    name: "Mira Ionic Hair Dryer 1800 W",
    category: "beauty",
    brand: "Mira",
    p: 2199,
    m: 4499,
    r: 4.2,
    rv: 2840,
    c: 2210,
    d: 11,
    description:
      "An ionic dryer with a cool-shot button and two concentrator nozzles, quieter than the category average.",
    features: [
      "Ionic conditioning",
      "Three heat and two speed settings",
      "Two concentrator nozzles",
    ],
    specs: { Power: "1800 W", Cord: "2.5 m", Warranty: "2 years" },
  },
  {
    name: "Mira Rechargeable Beard & Body Trimmer",
    category: "beauty",
    brand: "Mira",
    p: 1399,
    m: 2999,
    r: 4.1,
    rv: 7120,
    c: 2640,
    d: 13,
    description:
      "A washable trimmer with 20 length settings and 90 minutes of runtime from a one-hour charge.",
    features: [
      "20 length settings, 0.5–10 mm",
      "Fully washable head",
      "90-minute runtime, USB-C charging",
    ],
    specs: { Runtime: "90 min", Charging: "USB-C", Warranty: "2 years" },
  },
  {
    name: "Lumen & Co Broad Spectrum SPF 50 Sunscreen",
    category: "beauty",
    brand: "Lumen & Co",
    p: 499,
    m: 999,
    r: 4.5,
    rv: 11200,
    c: 4210,
    d: 4,
    trending: true,
    description:
      "An SPF 50 PA++++ sunscreen with no white cast, in the gel-cream texture that people actually reapply.",
    features: [
      "SPF 50 PA++++",
      "Gel-cream finish, no white cast",
      "Safe under makeup",
    ],
    specs: { Volume: "50 ml", SPF: "50 PA++++", Warranty: "—" },
  },
  {
    name: "Lumen & Co Everyday Skincare Gift Set",
    category: "beauty",
    brand: "Lumen & Co",
    p: 1799,
    m: 3499,
    r: 4.2,
    rv: 1420,
    c: 1310,
    d: 26,
    description:
      "Cleanser, serum, moisturiser and sunscreen in travel sizes — the sensible way to test a routine.",
    features: [
      "Four travel-size products",
      "Routine card included",
      "Recyclable packaging",
    ],
    specs: { Pieces: "4", "Skin type": "All", Warranty: "—" },
  },

  /* ----------------------------- Accessories ----------------------------- */
  {
    name: "Volt9 Braided USB-C to USB-C Cable 2 m",
    category: "accessories",
    brand: "Volt9",
    p: 549,
    m: 1299,
    r: 4.4,
    rv: 8210,
    c: 3110,
    d: 3,
    featured: true,
    description:
      "A 100 W rated braided cable with a strain relief collar, which is where cheap cables fail first.",
    features: [
      "100 W power delivery rated",
      "Braided nylon with strain relief",
      "480 Mbps data transfer",
    ],
    specs: { Length: "2 m", Rating: "100 W", Warranty: "18 months" },
  },
  {
    name: "Volt9 Aluminium Phone Stand",
    category: "accessories",
    brand: "Volt9",
    p: 399,
    m: 999,
    r: 4.3,
    rv: 4120,
    c: 1210,
    d: 23,
    description:
      "A weighted aluminium stand that holds a phone at call height without sliding across the desk.",
    features: [
      "Weighted non-slip base",
      "Adjustable viewing angle",
      "Cable cut-out for charging",
    ],
    specs: { Material: "Aluminium", Fits: "Up to 7 inch", Warranty: "6 months" },
  },
  {
    name: "Volt9 7-in-1 USB-C Hub",
    category: "accessories",
    brand: "Volt9",
    p: 2299,
    m: 4499,
    r: 4.2,
    rv: 2140,
    c: 1840,
    d: 10,
    description:
      "A seven-port hub with 4K HDMI and 100 W pass-through, in a shell that stays cool under load.",
    features: [
      "4K30 HDMI output",
      "100 W power pass-through",
      "SD and microSD readers",
    ],
    specs: { Ports: "7", HDMI: "4K30", Warranty: "1 year" },
  },
  {
    name: "Volt9 Qi2 15 W Magnetic Wireless Charger",
    category: "accessories",
    brand: "Volt9",
    p: 1699,
    m: 3299,
    r: 4.1,
    rv: 1620,
    c: 2110,
    d: 8,
    trending: true,
    description:
      "A magnetic 15 W pad that holds alignment, with a stand angle usable as a bedside clock.",
    features: [
      "Qi2 magnetic alignment at 15 W",
      "Stand doubles as a clock dock",
      "Case-friendly to 3 mm",
    ],
    specs: { Output: "15 W", Standard: "Qi2", Warranty: "1 year" },
  },
  {
    name: "Kraftline Cable Management Box & Clips Kit",
    category: "accessories",
    brand: "Kraftline",
    p: 799,
    m: 1799,
    r: 4.0,
    rv: 3210,
    c: 980,
    d: 29,
    description:
      "A fire-retardant box for a power strip plus twelve adhesive clips, the unglamorous fix for a cable nest.",
    features: [
      "Fire-retardant ABS box",
      "Twelve adhesive cable clips",
      "Ventilated base",
    ],
    specs: { Size: "40 × 16 × 13 cm", Clips: "12", Warranty: "6 months" },
  },
  {
    name: "Volt9 Laptop Sleeve 14-inch Water Repellent",
    category: "accessories",
    brand: "Volt9",
    p: 999,
    m: 2199,
    r: 4.3,
    rv: 1810,
    c: 1120,
    d: 25,
    description:
      "A padded 14-inch sleeve with a water-repellent shell and a front pocket sized for a charger.",
    features: [
      "8 mm padding on all faces",
      "Water-repellent outer shell",
      "Front pocket for a GaN charger",
    ],
    specs: { Fits: "14 inch", Material: "Polyester blend", Warranty: "6 months" },
  },
];

/* ------------------------------------------------------------------ *
 * Enrichment
 * ------------------------------------------------------------------ */

const DAY_MS = 24 * 60 * 60 * 1000;
/** Fixed reference date keeps "added" dates stable across renders. */
const REFERENCE_DATE = new Date("2026-11-16T09:00:00Z").getTime();

function enrich(row, index) {
  const slug = slugify(row.name);
  const category = categoryBySlug[row.category];
  const discount = discountPercent(row.p, row.m);

  return {
    id: slug,
    numericId: index + 1,
    slug,
    name: row.name,
    brand: row.brand,
    category: row.category,
    categoryName: category?.name ?? row.category,
    description: row.description,
    features: row.features ?? [],
    specs: row.specs ?? {},

    price: row.p,
    originalPrice: row.m,
    discount,
    savings: row.m - row.p,

    rating: row.r,
    reviewCount: row.rv,

    /** Demo engagement counter — not real user activity. */
    clicks: row.c,
    popularity: Math.round(row.c * 0.7 + row.rv * 0.2 + row.r * 120),

    /** Generated artwork; backend `imageUrl` takes priority when present. */
    imageUrl: null,
    images: placeholderGallery(slug, category?.name ?? "HuntDeal", row.category),

    affiliateUrl: buildAffiliateUrl(row.name, row.asin),
    availability: "Listed on Amazon (demo data)",

    isFeatured: Boolean(row.featured),
    isTrending: Boolean(row.trending),
    status: "active",
    createdAt: new Date(REFERENCE_DATE - row.d * DAY_MS).toISOString(),
    updatedAt: new Date(REFERENCE_DATE - Math.max(0, row.d - 1) * DAY_MS).toISOString(),
  };
}

export const products = raw.map(enrich);

export const productById = Object.fromEntries(
  products.map((product) => [product.id, product]),
);

/** Count of active deals per category slug. */
export const categoryCounts = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] ?? 0) + 1;
  return acc;
}, {});
