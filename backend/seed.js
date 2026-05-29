require("dotenv").config();
const mongoose = require("mongoose");
const Pincode = require("./models/Pincode");
const Product = require("./models/Product");
const CmsPage = require("./models/CmsPage");
const HomepageSection = require("./models/HomepageSection");
const BankDetails = require("./models/BankDetails");

const pincodes = [
  // Uttar Pradesh
  {
    pincode: "201301",
    state: "Uttar Pradesh",
    city: "Noida",
    deliveryAvailable: true,
    deliveryDays: 2,
  },
  {
    pincode: "201302",
    state: "Uttar Pradesh",
    city: "Noida",
    deliveryAvailable: true,
    deliveryDays: 2,
  },
  {
    pincode: "201303",
    state: "Uttar Pradesh",
    city: "Noida",
    deliveryAvailable: true,
    deliveryDays: 2,
  },
  {
    pincode: "201304",
    state: "Uttar Pradesh",
    city: "Greater Noida",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "201305",
    state: "Uttar Pradesh",
    city: "Greater Noida",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "201306",
    state: "Uttar Pradesh",
    city: "Greater Noida",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "226001",
    state: "Uttar Pradesh",
    city: "Lucknow",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "226002",
    state: "Uttar Pradesh",
    city: "Lucknow",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "226003",
    state: "Uttar Pradesh",
    city: "Lucknow",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "208001",
    state: "Uttar Pradesh",
    city: "Kanpur",
    deliveryAvailable: true,
    deliveryDays: 4,
  },
  {
    pincode: "208002",
    state: "Uttar Pradesh",
    city: "Kanpur",
    deliveryAvailable: true,
    deliveryDays: 4,
  },
  {
    pincode: "221001",
    state: "Uttar Pradesh",
    city: "Varanasi",
    deliveryAvailable: true,
    deliveryDays: 4,
  },
  {
    pincode: "221002",
    state: "Uttar Pradesh",
    city: "Varanasi",
    deliveryAvailable: true,
    deliveryDays: 4,
  },
  {
    pincode: "282001",
    state: "Uttar Pradesh",
    city: "Agra",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "282002",
    state: "Uttar Pradesh",
    city: "Agra",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "250001",
    state: "Uttar Pradesh",
    city: "Meerut",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "250002",
    state: "Uttar Pradesh",
    city: "Meerut",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "211001",
    state: "Uttar Pradesh",
    city: "Prayagraj",
    deliveryAvailable: true,
    deliveryDays: 4,
  },
  {
    pincode: "241001",
    state: "Uttar Pradesh",
    city: "Bareilly",
    deliveryAvailable: true,
    deliveryDays: 5,
  },
  {
    pincode: "273001",
    state: "Uttar Pradesh",
    city: "Gorakhpur",
    deliveryAvailable: false,
    deliveryDays: 7,
  },

  // Uttarakhand
  {
    pincode: "248001",
    state: "Uttarakhand",
    city: "Dehradun",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "248002",
    state: "Uttarakhand",
    city: "Dehradun",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "248003",
    state: "Uttarakhand",
    city: "Dehradun",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "249401",
    state: "Uttarakhand",
    city: "Haridwar",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "249402",
    state: "Uttarakhand",
    city: "Haridwar",
    deliveryAvailable: true,
    deliveryDays: 3,
  },
  {
    pincode: "263001",
    state: "Uttarakhand",
    city: "Nainital",
    deliveryAvailable: true,
    deliveryDays: 5,
  },
  {
    pincode: "263002",
    state: "Uttarakhand",
    city: "Nainital",
    deliveryAvailable: true,
    deliveryDays: 5,
  },
  {
    pincode: "244001",
    state: "Uttarakhand",
    city: "Moradabad",
    deliveryAvailable: true,
    deliveryDays: 4,
  },
  {
    pincode: "246001",
    state: "Uttarakhand",
    city: "Pauri Garhwal",
    deliveryAvailable: false,
    deliveryDays: 7,
  },
  {
    pincode: "249001",
    state: "Uttarakhand",
    city: "Mussoorie",
    deliveryAvailable: true,
    deliveryDays: 5,
  },
];

const products = [
  {
    name: "Premium Basmati Rice 25kg",
    slug: "premium-basmati-rice-25kg",
    description:
      "Extra-long grain premium basmati rice, ideal for restaurants and catering businesses. Aged for 2 years for enhanced aroma.",
    images: [],
    price: 2500,
    discountPrice: 2250,
    unit: "bag",
    minOrderQty: 5,
    stock: 500,
    sku: "RICE-BAS-25",
    category: "Grains & Rice",
    isActive: true,
  },
  {
    name: "Refined Sunflower Oil 15L",
    slug: "refined-sunflower-oil-15l",
    description:
      "Pure refined sunflower cooking oil in bulk pack. Light and healthy for commercial kitchens.",
    images: [],
    price: 1800,
    discountPrice: 1650,
    unit: "can",
    minOrderQty: 2,
    stock: 300,
    sku: "OIL-SUN-15",
    category: "Oils & Ghee",
    isActive: true,
  },
  {
    name: "Whole Wheat Flour 50kg",
    slug: "whole-wheat-flour-50kg",
    description:
      "Stone-ground whole wheat atta, perfect for chapatis and rotis. Bulk pack for commercial use.",
    images: [],
    price: 1600,
    discountPrice: null,
    unit: "bag",
    minOrderQty: 10,
    stock: 200,
    sku: "FLOUR-WW-50",
    category: "Grains & Rice",
    isActive: true,
  },
  {
    name: "Toor Dal 30kg",
    slug: "toor-dal-30kg",
    description:
      "Premium quality toor dal (arhar dal), polished and cleaned. Staple for Indian kitchens.",
    images: [],
    price: 3200,
    discountPrice: 2900,
    unit: "bag",
    minOrderQty: 3,
    stock: 150,
    sku: "DAL-TOOR-30",
    category: "Pulses & Lentils",
    isActive: true,
  },
  {
    name: "White Sugar 50kg",
    slug: "white-sugar-50kg",
    description:
      "Fine grain white sugar for commercial and industrial use. FSSAI certified.",
    images: [],
    price: 2100,
    discountPrice: 1950,
    unit: "bag",
    minOrderQty: 5,
    stock: 400,
    sku: "SUG-WHT-50",
    category: "Sugar & Sweeteners",
    isActive: true,
  },
  {
    name: "Turmeric Powder 5kg",
    slug: "turmeric-powder-5kg",
    description:
      "Pure Lakadong turmeric powder with high curcumin content. Rich golden color and pungent aroma.",
    images: [],
    price: 650,
    discountPrice: null,
    unit: "pack",
    minOrderQty: 5,
    stock: 100,
    sku: "SPC-TUR-5",
    category: "Spices & Masala",
    isActive: true,
  },
  {
    name: "Red Chilli Powder 5kg",
    slug: "red-chilli-powder-5kg",
    description:
      "Hot Guntur red chilli powder. Deep red color with intense heat for commercial cooking.",
    images: [],
    price: 750,
    discountPrice: 700,
    unit: "pack",
    minOrderQty: 3,
    stock: 120,
    sku: "SPC-CHL-5",
    category: "Spices & Masala",
    isActive: true,
  },
  {
    name: "Salt Iodized 25kg",
    slug: "salt-iodized-25kg",
    description:
      "Refined iodized salt for food processing and commercial kitchens. Free-flowing and pure white.",
    images: [],
    price: 320,
    discountPrice: null,
    unit: "bag",
    minOrderQty: 10,
    stock: 600,
    sku: "SALT-IOD-25",
    category: "Essentials",
    isActive: true,
  },
  {
    name: "Mustard Oil 15L",
    slug: "mustard-oil-15l",
    description:
      "Pure cold-pressed kachi ghani mustard oil. Traditional extraction for authentic North Indian cooking.",
    images: [],
    price: 2200,
    discountPrice: 2000,
    unit: "can",
    minOrderQty: 2,
    stock: 180,
    sku: "OIL-MUS-15",
    category: "Oils & Ghee",
    isActive: true,
  },
  {
    name: "Cumin Seeds 5kg",
    slug: "cumin-seeds-5kg",
    description:
      "Whole cumin seeds (jeera), sourced from Rajasthan. Essential spice for Indian cuisine.",
    images: [],
    price: 900,
    discountPrice: 850,
    unit: "pack",
    minOrderQty: 2,
    stock: 90,
    sku: "SPC-CUM-5",
    category: "Spices & Masala",
    isActive: true,
  },
];

const cmsPages = [
  {
    title: "About Us",
    slug: "about-us",
    content:
      "<h1>About UIOP</h1><p>UIOP is a leading B2B wholesale marketplace for groceries, spices, and essential commodities. We connect manufacturers and distributors with retail businesses across Uttar Pradesh and Uttarakhand.</p><h2>Our Mission</h2><p>To simplify bulk procurement for small and medium businesses by providing quality products at competitive wholesale prices with reliable delivery.</p><h2>Why Choose Us?</h2><ul><li>Direct from manufacturers</li><li>Competitive wholesale pricing</li><li>Reliable delivery across UP &amp; Uttarakhand</li><li>Quality verified products</li><li>Dedicated support team</li></ul>",
    metaTitle: "About Us - UIOP Wholesale",
    metaDescription:
      "Learn about UIOP, the leading B2B wholesale marketplace for groceries and essentials in UP and Uttarakhand.",
    isPublished: true,
  },
  {
    title: "Terms & Conditions",
    slug: "terms-and-conditions",
    content:
      "<h1>Terms & Conditions</h1><p>By using UIOP services, you agree to the following terms:</p><h2>1. Orders</h2><p>All orders are subject to verification. Minimum order quantities apply per product. Prices are subject to change without notice.</p><h2>2. Payment</h2><p>Payment is to be made via bank transfer before or on delivery. No online payment processing.</p><h2>3. Delivery</h2><p>Delivery timelines are estimates and may vary. We deliver to serviceable pincodes in UP and Uttarakhand only.</p><h2>4. Returns</h2><p>Returns are accepted within 24 hours of delivery for damaged or incorrect items only. Contact our support for return requests.</p>",
    metaTitle: "Terms & Conditions - UIOP",
    metaDescription:
      "Read the terms and conditions for using UIOP wholesale marketplace.",
    isPublished: true,
  },
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    content:
      "<h1>Privacy Policy</h1><p>UIOP respects your privacy. This policy describes how we handle your personal information.</p><h2>Information We Collect</h2><p>We collect business name, contact information, GST number, and order history to provide our services.</p><h2>How We Use It</h2><p>Your information is used to process orders, communicate updates, and improve our services. We do not sell your data to third parties.</p><h2>Data Security</h2><p>We use industry-standard security measures to protect your data.</p>",
    metaTitle: "Privacy Policy - UIOP",
    metaDescription:
      "UIOP privacy policy - learn how we protect your business information.",
    isPublished: true,
  },
  {
    title: "Contact Us",
    slug: "contact-us",
    content:
      "<h1>Contact Us</h1><p>We'd love to hear from you!</p><h2>Phone</h2><p>+91 98765 43210</p><h2>Email</h2><p>support@uiop.com</p><h2>Address</h2><p>123 Wholesale Market, Sector 62, Noida, Uttar Pradesh - 201301</p><h2>Business Hours</h2><p>Monday - Saturday: 9:00 AM - 7:00 PM<br/>Sunday: Closed</p>",
    metaTitle: "Contact Us - UIOP",
    metaDescription: "Get in touch with UIOP wholesale marketplace.",
    isPublished: true,
  },
];

const homepageSections = [
  {
    title: "Hero Banner",
    slug: "hero-banner",
    type: "banner",
    content: {
      heading: "Wholesale Groceries at Your Doorstep",
      subheading: "Bulk orders for businesses across UP & Uttarakhand",
      ctaText: "Browse Products",
      ctaLink: "/products",
      backgroundImage: "",
    },
    order: 1,
    isActive: true,
  },
  {
    title: "Featured Categories",
    slug: "featured-categories",
    type: "categories",
    content: {
      categories: [
        {
          name: "Grains & Rice",
          image: "",
          link: "/products?category=Grains+%26+Rice",
        },
        {
          name: "Oils & Ghee",
          image: "",
          link: "/products?category=Oils+%26+Ghee",
        },
        {
          name: "Pulses & Lentils",
          image: "",
          link: "/products?category=Pulses+%26+Lentils",
        },
        {
          name: "Spices & Masala",
          image: "",
          link: "/products?category=Spices+%26+Masala",
        },
        {
          name: "Sugar & Sweeteners",
          image: "",
          link: "/products?category=Sugar+%26+Sweeteners",
        },
        {
          name: "Essentials",
          image: "",
          link: "/products?category=Essentials",
        },
      ],
    },
    order: 2,
    isActive: true,
  },
  {
    title: "Why Choose Us",
    slug: "why-choose-us",
    type: "text",
    content: {
      heading: "Why Businesses Trust UIOP",
      items: [
        {
          title: "Best Wholesale Prices",
          description:
            "Direct sourcing from manufacturers ensures the lowest market rates.",
        },
        {
          title: "Verified Quality",
          description: "Every product is FSSAI certified and quality tested.",
        },
        {
          title: "Fast Delivery",
          description: "Delivery within 2-5 days across UP and Uttarakhand.",
        },
        {
          title: "Bulk Order Support",
          description:
            "Dedicated team for large volume orders and custom requirements.",
        },
      ],
    },
    order: 3,
    isActive: true,
  },
  {
    title: "Call to Action",
    slug: "cta-section",
    type: "cta",
    content: {
      heading: "Ready to Order in Bulk?",
      description:
        "Register your business and start ordering at wholesale prices today.",
      ctaText: "Get Started",
      ctaLink: "/auth",
    },
    order: 4,
    isActive: true,
  },
];

const bankDetails = {
  bankName: "State Bank of India",
  accountName: "UIOP Trading Pvt Ltd",
  accountNumber: "39876543210",
  ifscCode: "SBIN0001234",
  branch: "Sector 62, Noida",
  upiId: "uiop@sbi",
  notes: "Please use your Order ID as the payment reference.",
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Seed pincodes
    await Pincode.deleteMany({});
    await Pincode.insertMany(pincodes);
    console.log(`📍 Seeded ${pincodes.length} pincodes`);

    // Seed products
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`📦 Seeded ${products.length} products`);

    // Seed CMS pages
    await CmsPage.deleteMany({});
    await CmsPage.insertMany(cmsPages);
    console.log(`📄 Seeded ${cmsPages.length} CMS pages`);

    // Seed homepage sections
    await HomepageSection.deleteMany({});
    await HomepageSection.insertMany(homepageSections);
    console.log(`🏠 Seeded ${homepageSections.length} homepage sections`);

    // Seed bank details
    await BankDetails.deleteMany({});
    await BankDetails.create(bankDetails);
    console.log("🏦 Seeded bank details");

    console.log("\n✅ All seed data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seed();
