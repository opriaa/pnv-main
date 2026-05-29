import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import Logo from "../ui/Logo";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="logo">
          <Logo size={32} />
          <span style={{ marginLeft: "8px" }}>PNV Enterprises</span>
        </Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart{totalItems > 0 && <span className="badge">{totalItems}</span>}
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>
                My Orders
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button
                className="btn-link"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
