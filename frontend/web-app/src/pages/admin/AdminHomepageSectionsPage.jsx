import { useEffect, useState } from "react";
import { adminGetHomepageSections, adminCreateHomepageSection, adminUpdateHomepageSection, adminDeleteHomepageSection } from "../../api/admin";
import toast from "react-hot-toast";

const empty = { title: "", slug: "", type: "custom", content: {}, order: 0, isActive: true };

export default function AdminHomepageSectionsPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...empty });
  const [contentJson, setContentJson] = useState("{}");

  const load = () => { setLoading(true); adminGetHomepageSections().then((r) => setSections(r.data)).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(load, []);

  const handleChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    try {
      const data = { ...form, content: JSON.parse(contentJson), order: Number(form.order) };
      if (editing === "new") { await adminCreateHomepageSection(data); toast.success("Section created"); }
      else { await adminUpdateHomepageSection(editing._id, data); toast.success("Section updated"); }
      setEditing(null); load();
    } catch (err) {
      if (err instanceof SyntaxError) { toast.error("Invalid JSON in content"); return; }
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this section?")) return;
    try { await adminDeleteHomepageSection(id); toast.success("Deleted"); load(); } catch { toast.error("Delete failed"); }
  };

  const startEdit = (s) => { setForm({ title: s.title, slug: s.slug, type: s.type, order: s.order, isActive: s.isActive }); setContentJson(JSON.stringify(s.content, null, 2)); setEditing(s); };

  if (editing) {
    return (
      <div className="admin-page">
        <h1>{editing === "new" ? "New Section" : "Edit Section"}</h1>
        <div className="admin-form">
          <div className="form-row">
            <div className="form-group"><label>Title *</label><input value={form.title} onChange={(e) => handleChange("title", e.target.value)} /></div>
            <div className="form-group"><label>Slug</label><input value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Type</label>
              <select value={form.type} onChange={(e) => handleChange("type", e.target.value)}>
                {["banner", "featured", "categories", "text", "cta", "custom"].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Order</label><input type="number" value={form.order} onChange={(e) => handleChange("order", e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Content (JSON)</label><textarea value={contentJson} onChange={(e) => setContentJson(e.target.value)} rows={10} style={{ fontFamily: "monospace" }} /></div>
          <div className="form-group checkbox-group"><label><input type="checkbox" checked={form.isActive} onChange={(e) => handleChange("isActive", e.target.checked)} /> Active</label></div>
          <div className="form-actions"><button className="btn btn-primary" onClick={handleSave}>Save</button><button className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header"><h1>Homepage Sections</h1><button className="btn btn-primary btn-sm" onClick={() => { setForm({ ...empty }); setContentJson("{}"); setEditing("new"); }}>+ Add Section</button></div>
      {loading ? <p>Loading...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Type</th><th>Order</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>{sections.map((s) => (
              <tr key={s._id}><td>{s.title}</td><td>{s.type}</td><td>{s.order}</td><td>{s.isActive ? "✓" : "✕"}</td><td><button className="btn btn-outline btn-xs" onClick={() => startEdit(s)}>Edit</button>{" "}<button className="btn btn-danger btn-xs" onClick={() => handleDelete(s._id)}>Delete</button></td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
