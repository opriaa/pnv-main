import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile, updateProfile } from "../api/profile";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";
import toast from "react-hot-toast";

const emptyAddress = { line1: "", line2: "", city: "", state: "", pincode: "" };

function AddressFields({ type, label, form, onChange }) {
  return (
    <fieldset className="form-fieldset">
      <legend>{label}</legend>
      <div className="form-group">
        <label>Address Line 1</label>
        <input value={form[type].line1} onChange={(e) => onChange(type, "line1", e.target.value)} />
      </div>
      <div className="form-group">
        <label>Address Line 2</label>
        <input value={form[type].line2} onChange={(e) => onChange(type, "line2", e.target.value)} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>City</label>
          <input value={form[type].city} onChange={(e) => onChange(type, "city", e.target.value)} />
        </div>
        <div className="form-group">
          <label>State</label>
          <input value={form[type].state} onChange={(e) => onChange(type, "state", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Pincode</label>
          <input value={form[type].pincode} onChange={(e) => onChange(type, "pincode", e.target.value)} maxLength={6} />
        </div>
      </div>
    </fieldset>
  );
}

export default function ProfilePage() {
  const { isLoggedIn, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    gstNumber: "",
    contactPerson: "",
    phone: "",
    billingAddress: { ...emptyAddress },
    shippingAddress: { ...emptyAddress },
  });

  useEffect(() => {
    if (!isLoggedIn) { navigate("/auth", { state: { from: "/profile" } }); return; }
    getProfile()
      .then((profileRes) => {
        const p = profileRes.data;
        setForm({
          businessName: p.businessName || "",
          gstNumber: p.gstNumber || "",
          contactPerson: p.contactPerson || "",
          phone: p.phone || "",
          billingAddress: p.billingAddress || { ...emptyAddress },
          shippingAddress: p.shippingAddress || { ...emptyAddress },
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isLoggedIn, navigate]);

  const handleChange = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleAddressChange = (type, field, value) => {
    setForm((p) => ({
      ...p,
      [type]: { ...p[type], [field]: value },
      ...(sameAddress && type === "billingAddress" ? { shippingAddress: { ...p.billingAddress, [field]: value } } : {}),
    }));
  };

  const handleSameAddress = (checked) => {
    setSameAddress(checked);
    if (checked) setForm((p) => ({ ...p, shippingAddress: { ...p.billingAddress } }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfile(form);
      updateUser(res.data);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container page-pad">
      <h1>My Profile</h1>
      <form onSubmit={handleSave} className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Business Name</label>
            <input value={form.businessName} onChange={(e) => handleChange("businessName", e.target.value)} />
          </div>
          <div className="form-group">
            <label>GST Number</label>
            <input value={form.gstNumber} onChange={(e) => handleChange("gstNumber", e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Contact Person</label>
            <input value={form.contactPerson} onChange={(e) => handleChange("contactPerson", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          </div>
        </div>
        <AddressFields type="billingAddress" label="Billing Address" form={form} onChange={handleAddressChange} />
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" checked={sameAddress} onChange={(e) => handleSameAddress(e.target.checked)} />
            Shipping address same as billing
          </label>
        </div>
        {!sameAddress && <AddressFields type="shippingAddress" label="Shipping Address" form={form} onChange={handleAddressChange} />}
        <button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/orders" className="btn btn-outline">View My Orders &rarr;</Link>
      </div>
    </div>
  );
}
