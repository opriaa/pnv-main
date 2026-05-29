import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { sendOtp, verifyOtp } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function AuthPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Enter your email");
    setLoading(true);
    try {
      await sendOtp(email);
      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return toast.error("Enter 6-digit OTP");
    setLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      login(res.data.token, res.data.user);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-pad">
      <div className="auth-card">
        <h1>Login / Sign Up</h1>
        <p className="text-muted">Enter your business email to continue</p>

        {step === "email" ? (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <p>OTP sent to <strong>{email}</strong></p>
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                autoFocus
              />
            </div>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button type="button" className="btn btn-link btn-block" onClick={() => { setStep("email"); setOtp(""); }}>
              ← Change email
            </button>
          </form>
        )}
        <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
          <Link to="/admin/login" className="btn-link" style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Admin Login →</Link>
        </div>
      </div>
    </div>
  );
}
