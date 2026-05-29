import { useEffect, useState } from "react";
import { adminGetCmsPages, adminCreateCmsPage, adminUpdateCmsPage, adminDeleteCmsPage } from "../../api/admin";
import toast from "react-hot-toast";

const empty = { title: "", slug: "", content: "", metaTitle: "", metaDescription: "", isPublished: false };

export default function AdminCmsPagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...empty });

  const load = () => { setLoading(true); adminGetCmsPages().then((r) => setPages(r.data)).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(load, []);

  const handleChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    try {
      if (editing === "new") { await adminCreateCmsPage(form); toast.success("Page created"); }
      else { await adminUpdateCmsPage(editing._id, form); toast.success("Page updated"); }
      setEditing(null); load();
    } catch (err) { toast.error(err.response?.data?.message || "Save failed"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this page?")) return;
    try { await adminDeleteCmsPage(id); toast.success("Deleted"); load(); } catch { toast.error("Delete failed"); }
  };

  const startEdit = (p) => { setForm({ title: p.title, slug: p.slug, content: p.content || "", metaTitle: p.metaTitle || "", metaDescription: p.metaDescription || "", isPublished: p.isPublished }); setEditing(p); };

  if (editing) {
    return (
      <div className="admin-page">
        <h1>{editing === "new" ? "New CMS Page" : "Edit Page"}</h1>
        <div className="admin-form">
          <div className="form-row">
            <div className="form-group"><label>Title *</label><input value={form.title} onChange={(e) => handleChange("title", e.target.value)} /></div>
            <div className="form-group"><label>Slug</label><input value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Content (HTML)</label><textarea value={form.content} onChange={(e) => handleChange("content", e.target.value)} rows={10} /></div>
          <div className="form-row">
            <div className="form-group"><label>Meta Title</label><input value={form.metaTitle} onChange={(e) => handleChange("metaTitle", e.target.value)} /></div>
            <div className="form-group"><label>Meta Description</label><input value={form.metaDescription} onChange={(e) => handleChange("metaDescription", e.target.value)} /></div>
          </div>
          <div className="form-group checkbox-group"><label><input type="checkbox" checked={form.isPublished} onChange={(e) => handleChange("isPublished", e.target.checked)} /> Published</label></div>
          <div className="form-actions"><button className="btn btn-primary" onClick={handleSave}>Save</button><button className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header"><h1>CMS Pages</h1><button className="btn btn-primary btn-sm" onClick={() => { setForm({ ...empty }); setEditing("new"); }}>+ Add Page</button></div>
      {loading ? <p>Loading...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Slug</th><th>Published</th><th>Actions</th></tr></thead>
            <tbody>{pages.map((p) => (
              <tr key={p._id}><td>{p.title}</td><td>{p.slug}</td><td>{p.isPublished ? "✓" : "✕"}</td><td><button className="btn btn-outline btn-xs" onClick={() => startEdit(p)}>Edit</button>{" "}<button className="btn btn-danger btn-xs" onClick={() => handleDelete(p._id)}>Delete</button></td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
