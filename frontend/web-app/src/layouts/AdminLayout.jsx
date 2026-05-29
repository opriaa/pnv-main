import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token && location.pathname !== "/admin/login") {
      navigate("/admin/login");
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }

  const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/cms-pages", label: "CMS Pages" },
    { to: "/admin/homepage-sections", label: "Homepage" },
    { to: "/admin/bank-details", label: "Bank Details" },
    { to: "/admin/pincodes", label: "Pincodes" },
  ];

  return (
    <div className="admin-layout">
      <button
        className="admin-sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"} Admin
      </button>
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)}>
            PNV Enterprises Admin
          </Link>
        </div>
        <nav>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={location.pathname === l.to ? "active" : ""}
              onClick={() => setSidebarOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            ← View Site
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}
