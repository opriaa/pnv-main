import { Link } from "react-router-dom";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Logo size={28} /> PNV Enterprises
          </h3>
          <p>
            Manufacturing & Supply of Industrial Chemicals, Polymers & Lab
            Solutions.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/products">Products</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/bank-details">Bank Details</Link>
        </div>
        <div>
          <h4>Policies</h4>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/shipping-policy">Shipping Policy</Link>
          <Link to="/refund-policy">Cancellation & Refund Policy</Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>
          &copy; {new Date().getFullYear()} PNV Enterprises. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
