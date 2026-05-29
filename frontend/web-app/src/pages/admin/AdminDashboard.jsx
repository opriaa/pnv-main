import { useEffect, useState } from "react";
import { adminGetProducts, adminGetOrders } from "../../api/admin";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    Promise.all([
      adminGetProducts({ limit: 1 }),
      adminGetOrders({ limit: 1 }),
    ]).then(([pRes, oRes]) => {
      setStats({ products: pRes.data.total || 0, orders: oRes.data.total || 0 });
    }).catch(() => {});
  }, []);

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <div className="admin-stats">
        <div className="stat-card"><h2>{stats.products}</h2><p>Products</p></div>
        <div className="stat-card"><h2>{stats.orders}</h2><p>Orders</p></div>
      </div>
    </div>
  );
}
