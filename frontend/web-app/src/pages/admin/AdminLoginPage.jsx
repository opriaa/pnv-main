import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/admin";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await adminLogin(token);
      localStorage.setItem("adminToken", token);
      toast.success("Admin logged in");
      navigate("/admin/dashboard");
    } catch {
      toast.error("Invalid admin token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-pad">
      <div className="auth-card">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Admin Token</label>
            <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter admin token" required />
          </div>
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
