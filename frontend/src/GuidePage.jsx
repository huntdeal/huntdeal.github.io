import "./App.css";
import Header from "./Header";
import Footer from "./Footer";

const guideData = {
  "everyday-useful-products": {
    label: "HUNTDEAL BUYING GUIDE",
    title: "Useful Products for Everyday Life",
    intro:
      "Everyday products do not always need to be expensive or complicated. The right tools and accessories can make cooking, organizing, cleaning, working, studying, and travelling easier.",
    note: "A practical buying guide for shoppers in India.",

    sections: [
      {
        title: "What Makes an Everyday Product Useful?",
        paragraphs: [
          "A useful product should solve a real problem without creating unnecessary complexity. Before buying, consider how often you will use the product, how much space it requires, how easy it is to maintain, and whether it is compatible with your existing setup.",
        ],
      },
      {
        title: "1. Kitchen & Cooking",
        paragraphs: [
          "Kitchen accessories can make everyday cooking and storage more convenient. Useful categories include storage containers, kitchen organizers, measuring tools, reusable accessories, and basic cooking tools.",
          "Before buying, check dimensions, material, cleaning requirements, heat resistance where relevant, and whether the product fits your available kitchen space.",
        ],
      },
      {
        title: "2. Home Organization",
        paragraphs: [
          "Organization products can help make better use of drawers, wardrobes, shelves, desks, and other limited spaces.",
          "Consider drawer organizers, storage boxes, cable organizers, wardrobe organizers, and desk storage solutions based on the specific space you need to organize.",
        ],
      },
      {
        title: "3. Cleaning & Maintenance",
        paragraphs: [
          "Small cleaning and maintenance tools can make regular household tasks easier. Examples include cleaning brushes, microfiber products, dusting tools, and compact maintenance accessories.",
          "Look at the material, durability, cleaning method, and intended surface before choosing a product.",
        ],
      },
      {
        title: "4. Work & Study",
        paragraphs: [
          "People who work or study from home can benefit from simple desk and device accessories that improve organization and comfort.",
          "Categories worth exploring include laptop stands, cable management accessories, desk organizers, USB accessories, and stationery storage.",
        ],
      },
      {
        title: "5. Travel & Daily Carry",
        paragraphs: [
          "Travel accessories can help keep frequently used items organized and easier to carry.",
          "Useful categories include travel organizers, toiletry bags, luggage accessories, and compact storage solutions.",
        ],
      },
    ],

    checklist: [
      "Check the product's actual dimensions.",
      "Consider the material and expected durability.",
      "Check compatibility with your existing products.",
      "Look at maintenance and cleaning requirements.",
      "Consider whether you will actually use the product regularly.",
      "Do not choose a product only because it appears discounted.",
    ],
  },

  "kitchen-essentials": {
    label: "HUNTDEAL BUYING GUIDE",
    title: "Kitchen Essentials: What to Consider Before Buying",
    intro:
      "A practical guide to choosing everyday kitchen products based on how you cook, store food, organize your space, and maintain your kitchen.",
    note: "A practical buying guide for shoppers in India.",

    sections: [
      {
        title: "Why Kitchen Essentials Matter",
        paragraphs: [
          "Kitchen products are used frequently, so small differences in size, material, design, and maintenance can make a noticeable difference over time.",
          "Instead of choosing an item only because it looks useful, first consider the task it needs to solve and the space available in your kitchen.",
        ],
      },
      {
        title: "1. Food Storage",
        paragraphs: [
          "Food storage products can help keep ingredients organized and make better use of available cabinet and refrigerator space.",
          "When choosing containers, consider their dimensions, material, lid design, cleaning requirements, and whether they are suitable for the way you plan to store food.",
        ],
      },
      {
        title: "2. Cooking Tools",
        paragraphs: [
          "Everyday cooking tools should be selected according to the type of cooking you actually do. Basic tools can be useful when they are comfortable to handle and easy to clean.",
          "Pay attention to the material, handle design, heat resistance where relevant, and storage requirements before buying.",
        ],
      },
      {
        title: "3. Measuring & Preparation",
        paragraphs: [
          "Measuring and preparation tools can make cooking tasks more consistent and organized.",
          "Consider whether the measurements are easy to read, whether the tool is easy to clean, and whether its size is practical for your kitchen.",
        ],
      },
      {
        title: "4. Kitchen Organization",
        paragraphs: [
          "Organizers can help make drawers, shelves, cabinets, and countertops easier to manage.",
          "Before buying an organizer, measure the available space. A product that fits well is usually more useful than one chosen only for its appearance.",
        ],
      },
      {
        title: "5. Cleaning & Maintenance",
        paragraphs: [
          "Kitchen products need regular cleaning, so maintenance should be part of the buying decision.",
          "Look for products that are practical to clean and consider whether the material and construction are suitable for regular kitchen use.",
        ],
      },
      {
        title: "6. Material & Safety Considerations",
        paragraphs: [
          "For products that come into contact with food or heat, pay attention to the manufacturer's stated material and intended use.",
          "Follow the product's care instructions and avoid using an item outside the purpose specified by its manufacturer.",
        ],
      },
    ],

    checklist: [
      "Measure the space where the product will be stored or used.",
      "Check the material and manufacturer's stated intended use.",
      "Consider how frequently the product will be used.",
      "Check cleaning and maintenance requirements.",
      "Consider whether the product works with your existing kitchen setup.",
      "Avoid choosing a product solely because it appears inexpensive or discounted.",
    ],
  },

  "home-organization": {
  label: "HUNTDEAL BUYING GUIDE",
  title: "Home Organization: What to Consider Before Buying",
  intro:
    "A practical guide to choosing organizers and storage products for drawers, wardrobes, shelves, desks, and other everyday spaces.",
  note: "A practical buying guide for shoppers in India.",

  sections: [
    {
      title: "Why Home Organization Matters",
      paragraphs: [
        "Good organization can make frequently used spaces easier to manage and help you make better use of the space you already have.",
        "Before buying an organizer, identify the specific problem you want to solve and measure the available space.",
      ],
    },
    {
      title: "1. Drawer & Cabinet Organization",
      paragraphs: [
        "Drawer and cabinet organizers can help separate frequently used items and make smaller spaces easier to manage.",
        "Check the internal dimensions of the drawer or cabinet before choosing an organizer.",
      ],
    },
    {
      title: "2. Wardrobe Organization",
      paragraphs: [
        "Wardrobe organizers can be useful for clothing, accessories, footwear, and other personal items.",
        "Consider the available shelf and hanging space, the weight of the items you plan to store, and how frequently you will access them.",
      ],
    },
    {
      title: "3. Desk & Workspace Organization",
      paragraphs: [
        "A well-organized desk can make commonly used work and study items easier to find.",
        "Useful categories include desk organizers, cable-management products, stationery storage, and compact shelves.",
      ],
    },
    {
      title: "4. Shelf & Open-Space Storage",
      paragraphs: [
        "Storage boxes, baskets, and shelf organizers can help group similar items together.",
        "Consider the dimensions, accessibility, and appearance of the storage solution before buying.",
      ],
    },
    {
      title: "5. Cable & Small-Item Management",
      paragraphs: [
        "Small accessories can quickly create clutter when cables, chargers, stationery, or other frequently used items are left loose.",
        "Choose a storage or organization method based on the number and type of items you need to manage.",
      ],
    },
  ],

  checklist: [
    "Measure the available space before buying.",
    "Check the product's dimensions carefully.",
    "Consider the weight and type of items being stored.",
    "Think about how frequently you need access to the stored items.",
    "Choose materials that suit the intended environment and use.",
    "Avoid buying an organizer without first identifying the problem it needs to solve.",
  ],
},

"cleaning-maintenance": {
  label: "HUNTDEAL BUYING GUIDE",
  title: "Cleaning & Maintenance: What to Consider Before Buying",
  intro:
    "A practical guide to choosing everyday cleaning tools and household maintenance products based on the surfaces, tasks, and frequency of use.",
  note: "A practical buying guide for shoppers in India.",

  sections: [
    {
      title: "Why Cleaning Tools Matter",
      paragraphs: [
        "Cleaning products are used regularly, so the right tool can make routine household tasks easier and more manageable.",
        "Before buying, identify the surface or task you need the product for rather than choosing an item only because it looks convenient.",
      ],
    },
    {
      title: "1. Surface Cleaning",
      paragraphs: [
        "Different household surfaces may require different types of cleaning tools. Useful categories include microfiber products, cleaning cloths, brushes, and surface-specific accessories.",
        "Consider the surface you intend to clean and follow the manufacturer's instructions for both the tool and the surface.",
      ],
    },
    {
      title: "2. Bathroom Cleaning",
      paragraphs: [
        "Bathroom cleaning often involves corners, tiles, fixtures, and other areas that can be difficult to reach.",
        "When choosing a cleaning tool, consider its shape, reach, ease of cleaning, and how comfortable it is to use.",
      ],
    },
    {
      title: "3. Kitchen Cleaning",
      paragraphs: [
        "Kitchen cleaning products should be practical for the surfaces and areas where food preparation takes place.",
        "Look for tools that are easy to wash, store, and reuse when appropriate.",
      ],
    },
    {
      title: "4. Dusting & Hard-to-Reach Areas",
      paragraphs: [
        "Dust can collect on shelves, corners, furniture, and other less accessible areas.",
        "For these tasks, consider the reach and flexibility of the cleaning tool and whether it can be stored conveniently after use.",
      ],
    },
    {
      title: "5. Household Maintenance",
      paragraphs: [
        "Basic maintenance accessories can help with small recurring household tasks.",
        "Choose products based on the specific job they are designed for and check the manufacturer's instructions before using them.",
      ],
    },
  ],

  checklist: [
    "Identify the exact cleaning task before buying.",
    "Check whether the product is suitable for the intended surface.",
    "Consider the material and durability.",
    "Look at cleaning and storage requirements for the tool itself.",
    "Consider reach, size, and ease of handling.",
    "Follow the manufacturer's instructions for intended use.",
  ],
},

"work-from-home-accessories": {
  label: "HUNTDEAL BUYING GUIDE",
  title: "Work From Home Accessories: What to Consider Before Buying",
  intro:
    "A practical guide to choosing useful accessories for a more organized and comfortable work or study space at home.",
  note: "A practical buying guide for shoppers in India.",

  sections: [
    {
      title: "Why Workspace Accessories Matter",
      paragraphs: [
        "A home workspace does not need to be complicated. A few practical accessories can help organize devices, cables, documents, and frequently used items.",
        "Before buying anything, consider your available desk space and identify the specific problem you want the accessory to solve.",
      ],
    },
    {
      title: "1. Laptop & Device Stands",
      paragraphs: [
        "A laptop or device stand can help create a more organized workspace and free up some desk space.",
        "Check the stand's dimensions, supported device size, stability, adjustability, and how much space it occupies when choosing one.",
      ],
    },
    {
      title: "2. Cable Management",
      paragraphs: [
        "Charging cables and device wires can quickly make a workspace look cluttered.",
        "Cable clips, organizers, sleeves, and other cable-management products can help keep frequently used cables organized.",
      ],
    },
    {
      title: "3. Desk Organization",
      paragraphs: [
        "Desk organizers can be useful for keeping stationery, documents, chargers, and other frequently used items within easy reach.",
        "Choose an organizer according to the number of items you need to store and the amount of desk space available.",
      ],
    },
    {
      title: "4. Lighting & Workspace Comfort",
      paragraphs: [
        "Good workspace lighting can make a desk more practical for reading, writing, and computer-based work.",
        "When considering a desk light, look at its size, placement options, controls, and whether it suits the space where you intend to use it.",
      ],
    },
    {
      title: "5. Device Connectivity & Accessories",
      paragraphs: [
        "People working with laptops and other devices may need accessories for connecting peripherals and managing their workspace.",
        "Before buying connectivity accessories, check the ports available on your device and confirm compatibility with the accessory.",
      ],
    },
    {
      title: "6. Work & Study Storage",
      paragraphs: [
        "Small storage solutions can help keep notebooks, documents, stationery, and other work or study materials organized.",
        "Consider how frequently you use the items and whether you need open-access storage or something that keeps items enclosed.",
      ],
    },
  ],

  checklist: [
    "Measure your available desk space before buying.",
    "Check compatibility with your laptop, phone, or other devices.",
    "Consider the material, stability, and expected durability.",
    "Check cable and connector compatibility where relevant.",
    "Choose accessories that solve an actual workspace problem.",
    "Avoid adding unnecessary accessories that make the workspace more crowded.",
  ],
},

"travel-accessories": {
  label: "HUNTDEAL BUYING GUIDE",
  title: "Travel Accessories: What to Consider Before Buying",
  intro:
    "A practical guide to choosing travel accessories that help organize luggage, personal items, documents, electronics, and everyday essentials.",
  note: "A practical buying guide for shoppers in India.",

  sections: [
    {
      title: "Why Travel Accessories Matter",
      paragraphs: [
        "Travel accessories can make packing and carrying everyday essentials more organized. The right accessories can help separate items and make frequently used things easier to access.",
        "Before buying, think about the type of travel you usually do, the amount of luggage you carry, and which items tend to be difficult to organize.",
      ],
    },
    {
      title: "1. Luggage Organization",
      paragraphs: [
        "Packing organizers can help separate clothing and other belongings inside a suitcase or travel bag.",
        "Consider the dimensions, number of compartments, material, and how the organizer will fit inside your existing luggage.",
      ],
    },
    {
      title: "2. Toiletry Organization",
      paragraphs: [
        "Toiletry organizers can keep personal-care items together and make them easier to find while travelling.",
        "Look for practical compartments and consider whether the size is suitable for the products you normally carry.",
      ],
    },
    {
      title: "3. Electronics & Cable Organization",
      paragraphs: [
        "Chargers, cables, earphones, adapters, and other small electronics can become difficult to manage during travel.",
        "A compact electronics organizer can help keep these items together. Check the available compartments and make sure they fit the accessories you actually carry.",
      ],
    },
    {
      title: "4. Documents & Important Items",
      paragraphs: [
        "Travel documents and other important small items should be easy to access while remaining organized.",
        "When considering a document organizer, think about the types and sizes of documents you carry and how frequently you need to access them.",
      ],
    },
    {
      title: "5. Space-Saving Accessories",
      paragraphs: [
        "Travellers with limited luggage space may benefit from accessories designed to organize or compress belongings.",
        "Consider whether the accessory genuinely saves space in your particular packing setup rather than adding another item to carry.",
      ],
    },
    {
      title: "6. Daily Carry During Travel",
      paragraphs: [
        "Small bags and organizers can help keep frequently used items together during day trips and local travel.",
        "Choose the size and compartments according to what you normally carry, such as a phone, wallet, keys, documents, or other essentials.",
      ],
    },
  ],

  checklist: [
    "Consider the type and frequency of your travel.",
    "Check dimensions before buying luggage organizers.",
    "Make sure compartments fit the items you actually carry.",
    "Consider material, durability, and ease of cleaning.",
    "Avoid accessories that add unnecessary bulk.",
    "Choose products based on a real packing or organization problem.",
  ],
},

"laptop-mobile-accessories": {
  label: "HUNTDEAL BUYING GUIDE",
  title: "Laptop & Mobile Accessories: What to Consider Before Buying",
  intro:
    "A practical guide to choosing useful accessories for laptops, smartphones, tablets, and other everyday devices.",
  note: "A practical buying guide for shoppers in India.",

  sections: [
    {
      title: "Why Device Accessories Matter",
      paragraphs: [
        "The right accessory can make everyday device use more convenient, organized, and practical.",
        "Before buying, identify the specific problem you want to solve and check compatibility with your device instead of choosing an accessory only because it looks useful.",
      ],
    },
    {
      title: "1. Laptop Stands & Supports",
      paragraphs: [
        "Laptop stands can help organize a workspace and raise the position of a laptop from the desk.",
        "Check the stand's dimensions, supported laptop size, stability, adjustability, and how much desk space it requires.",
      ],
    },
    {
      title: "2. Laptop Bags & Sleeves",
      paragraphs: [
        "A laptop bag or sleeve can help protect and organize a laptop while carrying it between home, work, college, or other locations.",
        "Check the internal dimensions and compare them with your laptop before buying. Also consider compartments for chargers, documents, and other accessories.",
      ],
    },
    {
      title: "3. Mobile & Tablet Stands",
      paragraphs: [
        "Phone and tablet stands can be useful for desks, video calls, reading, watching content, or keeping a device visible while working.",
        "Consider device size, stand stability, viewing angles, adjustability, and how much space the stand occupies.",
      ],
    },
    {
      title: "4. Charging & Connectivity Accessories",
      paragraphs: [
        "Charging and connectivity accessories can make it easier to connect devices and manage everyday setups.",
        "Before buying, check the ports available on your device and confirm that the accessory supports the required connector or connection type.",
      ],
    },
    {
      title: "5. Keyboard, Mouse & Desk Accessories",
      paragraphs: [
        "External keyboards, mice, mouse pads, and similar accessories can be useful for people who regularly work or study on a laptop.",
        "Choose accessories according to your workspace, usage frequency, available desk space, and the devices you intend to use with them.",
      ],
    },
    {
      title: "6. Cable & Device Organization",
      paragraphs: [
        "Multiple charging cables and small device accessories can quickly make a workspace or travel bag cluttered.",
        "Cable organizers, clips, pouches, and small storage solutions can help keep frequently used accessories together and easier to find.",
      ],
    },
  ],

  checklist: [
    "Check compatibility with your exact device model where required.",
    "Measure your laptop, tablet, or available desk space before buying.",
    "Check connector and port compatibility for connectivity accessories.",
    "Consider material, stability, and expected durability.",
    "Choose accessories based on your actual usage rather than adding unnecessary items.",
    "Check what is included in the package before purchasing.",
  ],
},

"storage-solutions": {
  label: "HUNTDEAL BUYING GUIDE",
  title: "Storage Solutions: What to Consider Before Buying",
  intro:
    "A practical guide to choosing storage products that help organize clothing, documents, kitchen items, accessories, and everyday household belongings.",
  note: "A practical buying guide for shoppers in India.",

  sections: [
    {
      title: "Why Storage Solutions Matter",
      paragraphs: [
        "Good storage can make everyday spaces easier to organize and help keep frequently used items accessible.",
        "Before buying a storage product, identify what you need to store, where it will be placed, and how often you need access to the items.",
      ],
    },
    {
      title: "1. Clothing & Fabric Storage",
      paragraphs: [
        "Storage boxes, organizers, and similar products can help keep clothing and other fabric items separated and organized.",
        "Consider the size, material, ventilation where relevant, and whether the storage solution can fit comfortably in your wardrobe or available space.",
      ],
    },
    {
      title: "2. Kitchen Storage",
      paragraphs: [
        "Kitchen organizers can help arrange containers, utensils, pantry items, and other frequently used products.",
        "Check the dimensions carefully and consider whether the material and design are suitable for the intended kitchen environment.",
      ],
    },
    {
      title: "3. Document & Paper Storage",
      paragraphs: [
        "Documents, bills, certificates, and other papers can become difficult to find when stored without a system.",
        "Folders, document boxes, and organizers can help separate important papers. Choose a format that matches the quantity and type of documents you need to store.",
      ],
    },
    {
      title: "4. Small Item Organization",
      paragraphs: [
        "Small accessories such as stationery, cables, tools, and personal items can benefit from dedicated compartments or small storage boxes.",
        "Choose organizers with compartments that match the size and quantity of the items you normally keep together.",
      ],
    },
    {
      title: "5. Under-Bed & Space-Saving Storage",
      paragraphs: [
        "When floor or cupboard space is limited, storage products designed for unused spaces can provide additional organization.",
        "Measure the available space before buying and check the product dimensions, access method, and capacity.",
      ],
    },
    {
      title: "6. Shelves, Baskets & Containers",
      paragraphs: [
        "Shelves, baskets, and containers can help divide larger storage areas into smaller, more manageable sections.",
        "Consider the weight of the items you plan to store and check the product's size, construction, and intended load before using it.",
      ],
    },
  ],

  checklist: [
    "Measure the available storage space before buying.",
    "Identify exactly what you need to store.",
    "Check the product dimensions and capacity.",
    "Consider material, durability, and ease of cleaning.",
    "Choose compartments or sections that match your items.",
    "Consider how frequently you need to access the stored items.",
  ],
},

"budget-friendly-home-products": {
  label: "HUNTDEAL BUYING GUIDE",
  title: "Budget-Friendly Home Products: What to Consider Before Buying",
  intro:
    "A practical guide to choosing useful home products while balancing price, quality, durability, and everyday usefulness.",
  note: "A practical buying guide for shoppers in India.",

  sections: [
    {
      title: "Why Budget-Friendly Doesn't Mean Cheapest",
      paragraphs: [
        "A lower-priced product is not always the most economical choice. A product that is useful, durable, and suitable for regular use may provide better value over time.",
        "Before buying, focus on the actual problem you want to solve and compare the features that matter for that particular product.",
      ],
    },
    {
      title: "1. Identify the Actual Need",
      paragraphs: [
        "Start by identifying what you need the product for and how frequently you expect to use it.",
        "Avoid buying products simply because they appear inexpensive or offer features that you are unlikely to use.",
      ],
    },
    {
      title: "2. Compare Materials & Build Quality",
      paragraphs: [
        "Material and construction can affect how a household product performs and how long it remains useful.",
        "Look at the intended use, construction, moving parts, and maintenance requirements before making a decision.",
      ],
    },
    {
      title: "3. Consider Size & Available Space",
      paragraphs: [
        "A product may be useful but still unsuitable if it takes up more space than you have available.",
        "Measure the intended area before buying storage products, organizers, kitchen items, furniture accessories, or other larger household products.",
      ],
    },
    {
      title: "4. Look at Long-Term Use",
      paragraphs: [
        "Think about how often the product will be used and whether it is designed for that level of use.",
        "For frequently used items, durability and ease of maintenance can be more important than saving a small amount at the time of purchase.",
      ],
    },
    {
      title: "5. Avoid Unnecessary Features",
      paragraphs: [
        "Extra features can make a product more complicated or expensive without necessarily making it more useful for your needs.",
        "Focus on the features that directly solve your problem and ignore specifications that you are unlikely to use.",
      ],
    },
    {
      title: "6. Check Before You Buy",
      paragraphs: [
        "Before purchasing, check the product specifications, dimensions, compatibility where relevant, included items, and the manufacturer's instructions.",
        "When comparing products, consider the overall value of the item rather than focusing on a single advertised feature.",
      ],
    },
  ],

  checklist: [
    "Identify the actual problem the product needs to solve.",
    "Compare useful features rather than the number of features.",
    "Check material, construction, and expected durability.",
    "Measure the available space before buying larger products.",
    "Consider maintenance and long-term use.",
    "Check specifications and included items before purchasing.",
  ],
},

"how-to-find-genuine-deals": {
  label: "HUNTDEAL BUYING GUIDE",
  title: "How to Find Genuine Deals: What to Check Before Buying",
  intro:
    "A practical guide to evaluating online deals by checking the product, offer details, specifications, and overall value before making a purchase.",
  note: "A practical buying guide for shoppers in India.",

  sections: [
    {
      title: "What Makes a Deal Worth Considering?",
      paragraphs: [
        "A deal is not only about seeing a large discount percentage. A useful deal should match your actual needs and offer suitable features, specifications, and overall value.",
        "Before buying, look beyond the headline offer and check the product and purchase details carefully.",
      ],
    },
    {
      title: "1. Check the Product Details",
      paragraphs: [
        "Start by checking the exact product name, model, size, variant, and specifications.",
        "Different variants of a product can have different features or specifications, so make sure the product you are considering is the one you actually need.",
      ],
    },
    {
      title: "2. Check the Current Offer",
      paragraphs: [
        "Read the offer details carefully and check whether any conditions apply.",
        "Some offers may depend on payment methods, coupons, memberships, quantities, or other requirements. Make sure you understand the conditions before purchasing.",
      ],
    },
    {
      title: "3. Don't Rely Only on the Discount Percentage",
      paragraphs: [
        "A large advertised discount does not automatically mean that a product is the right purchase for you.",
        "Consider the product's features, intended use, specifications, and the current offer together instead of focusing only on the discount figure.",
      ],
    },
    {
      title: "4. Check Seller & Product Information",
      paragraphs: [
        "Before completing a purchase, review the seller and product information available on the retailer's website.",
        "Also check the product description, included items, warranty information where applicable, and other purchase details.",
      ],
    },
    {
      title: "5. Check the Final Purchase Details",
      paragraphs: [
        "The amount and conditions shown during the final purchase process are the details that matter before placing an order.",
        "Check the current price, applicable offers, delivery information, and other charges or conditions before completing the purchase.",
      ],
    },
    {
      title: "6. Compare Before Buying",
      paragraphs: [
        "If you are unsure about a product, compare similar options based on specifications, features, intended use, and overall value.",
        "Taking a few moments to compare can help you avoid buying a product simply because an offer looks attractive at first glance.",
      ],
    },
    {
      title: "7. Recheck the Deal on the Retailer's Website",
      paragraphs: [
        "Online offers can change, so always verify the latest product and offer information on the retailer's website before purchasing.",
        "HuntDeal helps users discover products and deals, but the retailer's website is the place to confirm the current purchase details.",
      ],
    },
  ],

  checklist: [
    "Check the exact product model, size, and variant.",
    "Read the offer conditions before purchasing.",
    "Don't judge a deal only by its advertised discount.",
    "Check seller, warranty, and product information where applicable.",
    "Review the final purchase details on the retailer's website.",
    "Compare similar products when you are unsure.",
    "Always verify the latest information before completing a purchase.",
  ],
},

};

function GuidePage({ slug }) {
  const guide = guideData[slug];

  if (!guide) {
    return (
      <div className="guide-page">
        <main className="container guide-content">
          <h1>Guide Not Found</h1>
          <a className="guide-amazon-button" href="/guides">
            ← Back to Guides
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="guide-page">

      <Header />

      <main className="container guide-content">

        <p className="eyebrow">{guide.label}</p>

        <h1>{guide.title}</h1>

        <p className="guide-intro">
          {guide.intro}
        </p>

        <p className="guide-updated">
          {guide.note}
        </p>

        {guide.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section>
          <h2>What to Check Before Buying</h2>

          <ul>
            {guide.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>How HuntDeal Helps</h2>

          <p>
            HuntDeal helps shoppers discover products available on
            Amazon India. We organize products into useful categories
            so shoppers can spend less time searching and more time
            exploring relevant options.
          </p>

          <a className="guide-amazon-button" href="/#deals">
            Browse HuntDeal →
          </a>
        </section>

        <section className="affiliate-note">
          <h2>Affiliate Disclosure</h2>

          <p>
            HuntDeal is an Amazon Associate and may earn from
            qualifying purchases made through Amazon links on this
            website.
          </p>

          <p>
            Product prices and availability can change. Always verify
            the latest information on Amazon before making a purchase.
          </p>
        </section>

      </main>

      <footer className="footer">
        <div className="container">
          <strong>HuntDeal</strong>
          <p>Deal discovery made simple.</p>

          <p className="amazon-disclosure">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default GuidePage;