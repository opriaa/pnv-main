import { useEffect, useState } from "react";
import { adminGetPincodes, adminCreatePincode, adminUpdatePincode, adminDeletePincode } from "../../api/admin";
import toast from "react-hot-toast";

const empty = { pincode: "", state: "", city: "", deliveryAvailable: true, deliveryDays: 3 };

export default function AdminPincodesPage() {
  const [pincodes, setPincodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...empty });

  const load = () => { setLoading(true); adminGetPincodes({ limit: 100 }).then((r) => setPincodes(r.data)).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(load, []);

  const handleChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    try {
      const data = { ...form, deliveryDays: Number(form.deliveryDays) };
      if (editing === "new") { await adminCreatePincode(data); toast.success("Pincode added"); }
      else { await adminUpdatePincode(editing._id, data); toast.success("Pincode updated"); }
      setEditing(null); load();
    } catch (err) { toast.error(err.response?.data?.message || "Save failed"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this pincode?")) return;
    try { await adminDeletePincode(id); toast.success("Deleted"); load(); } catch { toast.error("Delete failed"); }
  };

  const startEdit = (p) => { setForm({ pincode: p.pincode, state: p.state, city: p.city || "", deliveryAvailable: p.deliveryAvailable, deliveryDays: p.deliveryDays }); setEditing(p); };

  if (editing) {
    return (
      <div className="admin-page">
        <h1>{editing === "new" ? "Add Pincode" : "Edit Pincode"}</h1>
        <div className="admin-form">
          <div className="form-row">
            <div className="form-group"><label>Pincode *</label><input value={form.pincode} onChange={(e) => handleChange("pincode", e.target.value)} maxLength={6} /></div>
            <div className="form-group"><label>State *</label><input value={form.state} onChange={(e) => handleChange("state", e.target.value)} /></div>
            <div className="form-group"><label>City</label><input value={form.city} onChange={(e) => handleChange("city", e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Delivery Days</label><input type="number" value={form.deliveryDays} onChange={(e) => handleChange("deliveryDays", e.target.value)} /></div>
            <div className="form-group checkbox-group" style={{ paddingTop: "1.5rem" }}><label><input type="checkbox" checked={form.deliveryAvailable} onChange={(e) => handleChange("deliveryAvailable", e.target.checked)} /> Delivery Available</label></div>
          </div>
          <div className="form-actions"><button className="btn btn-primary" onClick={handleSave}>Save</button><button className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header"><h1>Pincodes</h1><button className="btn btn-primary btn-sm" onClick={() => { setForm({ ...empty }); setEditing("new"); }}>+ Add Pincode</button></div>
      {loading ? <p>Loading...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Pincode</th><th>City</th><th>State</th><th>Days</th><th>Available</th><th>Actions</th></tr></thead>
            <tbody>{pincodes.map((p) => (
              <tr key={p._id}><td>{p.pincode}</td><td>{p.city || "—"}</td><td>{p.state}</td><td>{p.deliveryDays}</td><td>{p.deliveryAvailable ? "✓" : "✕"}</td><td><button className="btn btn-outline btn-xs" onClick={() => startEdit(p)}>Edit</button>{" "}<button className="btn btn-danger btn-xs" onClick={() => handleDelete(p._id)}>Delete</button></td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
