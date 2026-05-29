/**
 * Seed script to ensure all Razorpay-required CMS pages exist.
 *
 * Usage:
 *   node scripts/seedCmsPages.js
 *
 * - Creates pages only if they don't already exist (safe to run repeatedly).
 * - Pages are created as published with placeholder content you should
 *   update from the admin panel.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const CmsPage = require("../models/CmsPage");

const REQUIRED_PAGES = [
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    content: `<h1>Privacy Policy</h1>
<p><strong>Effective Date:</strong> [Date]</p>

<h2>1. Information We Collect</h2>
<p>We collect personal information you provide when placing orders, creating an account, or contacting us. This includes your name, business name, email address, phone number, GST number, and shipping/billing addresses.</p>

<h2>2. How We Use Your Information</h2>
<p>Your information is used to process orders, communicate order updates, improve our services, and comply with legal obligations.</p>

<h2>3. Information Sharing</h2>
<p>We do not sell your personal data. We may share information with logistics partners for order delivery and with payment processors to complete transactions.</p>

<h2>4. Data Security</h2>
<p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

<h2>5. Cookies</h2>
<p>Our website uses cookies to enhance your browsing experience. You may disable cookies in your browser settings.</p>

<h2>6. Your Rights</h2>
<p>You can request access to, correction of, or deletion of your personal data by contacting us.</p>

<h2>7. Contact Us</h2>
<p>For privacy-related queries, email us at <strong>[your email]</strong> or call <strong>[your phone]</strong>.</p>`,
  },
  {
    title: "Terms and Conditions",
    slug: "terms-and-conditions",
    content: `<h1>Terms &amp; Conditions</h1>
<p><strong>Effective Date:</strong> [Date]</p>

<h2>1. Introduction</h2>
<p>These Terms &amp; Conditions govern your use of the PNV Enterprises website and any purchases made through it. By using this website, you agree to these terms.</p>

<h2>2. Products &amp; Pricing</h2>
<p>All product descriptions and prices are subject to change without notice. Prices are listed in Indian Rupees (INR) and are exclusive of applicable taxes unless stated otherwise.</p>

<h2>3. Orders</h2>
<p>Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order. Order confirmation will be sent via email.</p>

<h2>4. Payment</h2>
<p>We accept payments via bank transfer and online payment methods. Full payment must be received before order dispatch unless credit terms have been agreed upon.</p>

<h2>5. Intellectual Property</h2>
<p>All content on this website, including text, images, and logos, is the property of PNV Enterprises and may not be reproduced without permission.</p>

<h2>6. Limitation of Liability</h2>
<p>PNV Enterprises shall not be liable for any indirect or consequential damages arising from the use of our products or website.</p>

<h2>7. Governing Law</h2>
<p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in [Your City].</p>

<h2>8. Contact</h2>
<p>For questions about these terms, contact us at <strong>[your email]</strong>.</p>`,
  },
  {
    title: "Shipping Policy",
    slug: "shipping-policy",
    content: `<h1>Shipping Policy</h1>
<p><strong>Effective Date:</strong> [Date]</p>

<h2>1. Shipping Coverage</h2>
<p>We ship across India to serviceable pin codes. You can check delivery availability by entering your pin code on the product page.</p>

<h2>2. Processing Time</h2>
<p>Orders are typically processed within 1–3 business days after confirmation. You will receive an update once your order is dispatched.</p>

<h2>3. Delivery Time</h2>
<p>Standard delivery takes 5–10 business days depending on your location. Remote areas may take additional time.</p>

<h2>4. Shipping Charges</h2>
<p>Shipping charges vary based on order weight, volume, and delivery location. The applicable shipping cost will be communicated before order confirmation.</p>

<h2>5. Order Tracking</h2>
<p>Once shipped, tracking details will be shared via email or phone. You can also check your order status from the My Orders page.</p>

<h2>6. Delays</h2>
<p>While we strive for timely delivery, delays may occur due to unforeseen circumstances such as weather, logistics issues, or holidays. We will keep you informed of any significant delays.</p>

<h2>7. Contact</h2>
<p>For shipping inquiries, contact us at <strong>[your email]</strong> or call <strong>[your phone]</strong>.</p>`,
  },
  {
    title: "Cancellation and Refund Policy",
    slug: "refund-policy",
    content: `<h1>Cancellation &amp; Refund Policy</h1>
<p><strong>Effective Date:</strong> [Date]</p>

<h2>1. Order Cancellation</h2>
<p>You may request cancellation of an order before it has been shipped by contacting us. Once an order is dispatched, it cannot be cancelled.</p>

<h2>2. Refund Eligibility</h2>
<p>Refunds are applicable in the following cases:</p>
<ul>
  <li>Order cancelled before dispatch</li>
  <li>Product received is damaged or defective</li>
  <li>Wrong product delivered</li>
</ul>

<h2>3. Refund Process</h2>
<p>To request a refund, contact us within 48 hours of delivery with your order ID and photographs of the issue (if applicable). We will review your request and respond within 3–5 business days.</p>

<h2>4. Refund Timeline</h2>
<p>Approved refunds will be processed within 7–10 business days. The refund will be credited to your original payment method or via bank transfer.</p>

<h2>5. Non-Refundable Items</h2>
<p>Custom or made-to-order products are non-refundable unless defective.</p>

<h2>6. Contact</h2>
<p>For cancellation or refund queries, email us at <strong>[your email]</strong> or call <strong>[your phone]</strong>.</p>`,
  },
  {
    title: "Contact Us",
    slug: "contact-us",
    content: `<h1>Contact Us</h1>

<h2>PNV Enterprises</h2>

<p><strong>Address:</strong><br/>[Your full address]</p>

<p><strong>Phone:</strong> [Your phone number]</p>

<p><strong>Email:</strong> [Your email address]</p>

<p><strong>Business Hours:</strong><br/>Monday – Saturday: 9:00 AM – 6:00 PM<br/>Sunday: Closed</p>

<p>For order inquiries, bulk orders, or general questions, feel free to reach out to us via phone or email. We typically respond within 24 hours.</p>`,
  },
];

async function seed() {
  await connectDB();

  let created = 0;
  let skipped = 0;

  for (const page of REQUIRED_PAGES) {
    const exists = await CmsPage.findOne({ slug: page.slug });
    if (exists) {
      console.log(`  ✓ "${page.title}" already exists — skipped`);
      skipped++;
    } else {
      await CmsPage.create({ ...page, isPublished: true });
      console.log(`  + "${page.title}" created`);
      created++;
    }
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
