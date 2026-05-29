import { useEffect, useState } from "react";
import { adminGetOrders, adminUpdateOrderStatus } from "../../api/admin";
import toast from "react-hot-toast";

const STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [data, setData] = useState({ orders: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const load = () => {
    setLoading(true);
    const params = { page, limit: 20 };
    if (filter) params.status = filter;
    adminGetOrders(params).then((r) => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(load, [page, filter]);

  const updateStatus = async (id, status) => {
    try {
      await adminUpdateOrderStatus(id, status);
      toast.success("Status updated");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Orders ({data.total})</h1>
        <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {data.orders.map((o) => (
                <tr key={o._id}>
                  <td><strong>{o.orderId}</strong></td>
                  <td>{o.userSnapshot?.businessName || o.userSnapshot?.email}</td>
                  <td>{o.items.length}</td>
                  <td>₹{o.totalAmount}</td>
                  <td><span className={`status-badge status-${o.status}`}>{o.status}</span></td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
