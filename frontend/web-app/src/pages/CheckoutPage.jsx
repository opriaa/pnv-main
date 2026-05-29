import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getProfile } from "../api/profile";
import { createOrder } from "../api/orders";
import Loader from "../components/ui/Loader";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isLoggedIn) { navigate("/auth", { state: { from: "/checkout" } }); return; }
    if (items.length === 0) { navigate("/cart"); return; }
    getProfile()
      .then((res) => setProfile(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isLoggedIn, items.length, navigate]);

  const handlePlaceOrder = async () => {
    if (!profile?.phone || !profile?.shippingAddress?.line1) {
      toast.error("Please complete your profile (phone + shipping address) before placing an order.");
      navigate("/profile");
      return;
    }
    setPlacing(true);
    try {
      const orderItems = items.map((i) => ({ productId: i.productId, quantity: i.quantity }));
      const res = await createOrder({ items: orderItems, notes });
      clearCart();
      toast.success(`Order placed! ID: ${res.data.orderId}`);
      navigate("/cart", { state: { orderSuccess: true, orderId: res.data.orderId } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <Loader />;

  const addr = profile?.shippingAddress;
  const missingProfile = !profile?.phone || !addr?.line1;

  return (
    <div className="container page-pad">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <div className="checkout-info">
          <div className="checkout-section">
            <h2>Delivery Details</h2>
            {missingProfile ? (
              <div className="alert alert-warning">
                <p>Please complete your profile before checking out.</p>
                <Link to="/profile" className="btn btn-outline btn-sm">Complete Profile</Link>
              </div>
            ) : (
              <div className="address-preview">
                <p><strong>{profile.contactPerson || profile.businessName}</strong></p>
                <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                <p>Phone: {profile.phone}</p>
                <Link to="/profile" className="btn-link">Edit</Link>
              </div>
            )}
          </div>
          <div className="checkout-section">
            <h2>Order Notes (optional)</h2>
            <textarea
              placeholder="Any special instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div key={item.productId} className="summary-item">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
          <p className="text-muted" style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>
            Payment: Bank transfer. We'll verify your order via phone.
          </p>
          <button
            className="btn btn-primary btn-block"
            onClick={handlePlaceOrder}
            disabled={placing || missingProfile}
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
