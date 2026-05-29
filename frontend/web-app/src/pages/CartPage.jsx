import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalAmount, totalItems } = useCart();
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const orderSuccess = location.state?.orderSuccess;
  const orderId = location.state?.orderId;

  if (items.length === 0) {
    return (
      <div className="container page-pad empty-state">
        {orderSuccess ? (
          <div className="order-success">
            <h1 style={{ color: "#059669" }}>Order Placed Successfully!</h1>
            <p className="order-id">Order ID: <strong>{orderId}</strong></p>
            <div className="expect-steps">
              <h3>What Happens Next?</h3>
              <ol>
                <li><strong>Order Confirmation Call</strong> — We will call you shortly on your registered phone number to confirm your order details.</li>
                <li><strong>Order Processing</strong> — Once confirmed, we will prepare and pack your order.</li>
                <li><strong>Delivery</strong> — Your order will be shipped to your registered shipping address.</li>
                <li><strong>Payment</strong> — Payment can be made via bank transfer or will be collected at the time of delivery.</li>
              </ol>
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/profile" className="btn btn-primary">View My Orders</Link>
              <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <>
            <h1>Your Cart</h1>
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="container page-pad">
      <h1>Your Cart ({totalItems} items)</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.productId} className="cart-item">
              <div className="cart-item-img">
                {item.image ? <img src={item.image} alt={item.name} /> : <div className="cart-item-placeholder">📦</div>}
              </div>
              <div className="cart-item-info">
                <Link to={`/products/${item.slug}`}><h3>{item.name}</h3></Link>
                <p className="text-muted">₹{item.price} / {item.unit}</p>
              </div>
              <div className="cart-item-qty">
                <div className="qty-control">
                  <button onClick={() => updateQuantity(item.productId, Math.max(item.minOrderQty, item.quantity - 1))}>−</button>
                  <input
                    type="number"
                    value={item.quantity}
                    min={item.minOrderQty}
                    max={item.stock}
                    onChange={(e) => updateQuantity(item.productId, Math.max(item.minOrderQty, Number(e.target.value)))}
                  />
                  <button onClick={() => updateQuantity(item.productId, Math.min(item.stock, item.quantity + 1))}>+</button>
                </div>
              </div>
              <div className="cart-item-total">
                <strong>₹{item.price * item.quantity}</strong>
                <button className="btn-link text-error" onClick={() => removeItem(item.productId)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
          {isLoggedIn ? (
            <Link to="/checkout" className="btn btn-primary btn-block">Proceed to Checkout</Link>
          ) : (
            <Link to="/auth" state={{ from: "/checkout" }} className="btn btn-primary btn-block">Login to Checkout</Link>
          )}
        </div>
      </div>
    </div>
  );
}
