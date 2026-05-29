import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMyOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAddress(addr) {
  if (!addr) return null;
  const parts = [addr.line1, addr.line2, addr.city, addr.state, addr.pincode].filter(Boolean);
  return parts.join(", ");
}

export default function OrdersPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth", { state: { from: "/orders" } });
      return;
    }
    getMyOrders({})
      .then((res) => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isLoggedIn, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="container page-pad">
      <div className="orders-page-header">
        <h1>My Orders</h1>
        <p className="text-muted">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="orders-detail-list">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order._id;
            return (
              <div key={order._id} className={`order-detail-card ${isExpanded ? "expanded" : ""}`}>
                {/* Header row */}
                <div className="order-detail-header" onClick={() => setExpandedOrder(isExpanded ? null : order._id)}>
                  <div className="order-detail-header-left">
                    <div className="order-detail-id">
                      <strong>{order.orderId}</strong>
                      <span className={`status-badge status-${order.status}`}>{order.status}</span>
                    </div>
                    <span className="text-muted">Placed on {formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-detail-header-right">
                    <span className="order-detail-total">{"₹"}{order.totalAmount.toLocaleString("en-IN")}</span>
                    <span className="order-detail-count">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                    <span className={`order-expand-icon ${isExpanded ? "open" : ""}`}>&#9662;</span>
                  </div>
                </div>

                {/* Items summary (always visible) */}
                <div className="order-detail-items-summary">
                  {order.items.slice(0, 3).map((item, i) => (
                    <span key={i} className="order-item-chip">{item.name} x{item.quantity}</span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="order-item-chip order-item-chip-more">+{order.items.length - 3} more</span>
                  )}
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="order-detail-body">
                    {/* Full items table */}
                    <div className="order-detail-section">
                      <h3>Items</h3>
                      <div className="order-items-table-wrap">
                        <table className="order-items-table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>SKU</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, i) => {
                              const unitPrice = item.discountPrice || item.price;
                              return (
                                <tr key={i}>
                                  <td>
                                    {item.slug ? (
                                      <Link to={`/products/${item.slug}`} className="order-item-link">{item.name}</Link>
                                    ) : (
                                      item.name
                                    )}
                                  </td>
                                  <td className="text-muted">{item.sku || "—"}</td>
                                  <td>{item.quantity} {item.unit !== "piece" ? item.unit : ""}</td>
                                  <td>
                                    {"₹"}{unitPrice}
                                    {item.discountPrice && item.discountPrice < item.price && (
                                      <span className="price-original" style={{ marginLeft: "0.3rem" }}>{"₹"}{item.price}</span>
                                    )}
                                  </td>
                                  <td>{"₹"}{(unitPrice * item.quantity).toLocaleString("en-IN")}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={4} style={{ textAlign: "right", fontWeight: 700 }}>Total</td>
                              <td style={{ fontWeight: 700 }}>{"₹"}{order.totalAmount.toLocaleString("en-IN")}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    {/* Addresses */}
                    {order.userSnapshot && (
                      <div className="order-detail-addresses">
                        {order.userSnapshot.shippingAddress && (
                          <div className="order-detail-section">
                            <h3>Shipping Address</h3>
                            <p>{formatAddress(order.userSnapshot.shippingAddress)}</p>
                          </div>
                        )}
                        {order.userSnapshot.billingAddress && (
                          <div className="order-detail-section">
                            <h3>Billing Address</h3>
                            <p>{formatAddress(order.userSnapshot.billingAddress)}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Notes */}
                    {order.notes && (
                      <div className="order-detail-section">
                        <h3>Notes</h3>
                        <p>{order.notes}</p>
                      </div>
                    )}

                    {/* Timestamps */}
                    <div className="order-detail-meta">
                      <span className="text-muted">Ordered: {formatDateTime(order.createdAt)}</span>
                      {order.updatedAt !== order.createdAt && (
                        <span className="text-muted">Last updated: {formatDateTime(order.updatedAt)}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
