import { useEffect, useState } from "react";
import { adminGetBankDetails, adminUpsertBankDetails } from "../../api/admin";
import toast from "react-hot-toast";

export default function AdminBankDetailsPage() {
  const [form, setForm] = useState({ bankName: "", accountName: "", accountNumber: "", ifscCode: "", branch: "", upiId: "", notes: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminGetBankDetails().then((r) => {
      if (r.data && r.data.bankName) setForm(r.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminUpsertBankDetails(form);
      toast.success("Bank details saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="admin-page"><p>Loading...</p></div>;

  return (
    <div className="admin-page">
      <h1>Bank Details</h1>
      <div className="admin-form">
        <div className="form-row">
          <div className="form-group"><label>Bank Name *</label><input value={form.bankName} onChange={(e) => handleChange("bankName", e.target.value)} /></div>
          <div className="form-group"><label>Account Name *</label><input value={form.accountName} onChange={(e) => handleChange("accountName", e.target.value)} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Account Number *</label><input value={form.accountNumber} onChange={(e) => handleChange("accountNumber", e.target.value)} /></div>
          <div className="form-group"><label>IFSC Code *</label><input value={form.ifscCode} onChange={(e) => handleChange("ifscCode", e.target.value)} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Branch</label><input value={form.branch} onChange={(e) => handleChange("branch", e.target.value)} /></div>
          <div className="form-group"><label>UPI ID</label><input value={form.upiId} onChange={(e) => handleChange("upiId", e.target.value)} /></div>
        </div>
        <div className="form-group"><label>Notes</label><textarea value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} rows={2} /></div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
      </div>
    </div>
  );
}
