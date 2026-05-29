import { useEffect, useState, useRef } from "react";
import { adminGetProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, adminUploadImage } from "../../api/admin";
import toast from "react-hot-toast";

const empty = { name: "", description: "", price: "", discountPrice: "", unit: "piece", minOrderQty: 1, stock: 0, sku: "", category: "", images: [], isActive: true };

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | product obj
  const [form, setForm] = useState({ ...empty });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const load = () => {
    setLoading(true);
    adminGetProducts({ limit: 100 }).then((r) => setProducts(r.data.products)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const remaining = 5 - (form.images?.length || 0);
    if (files.length > remaining) {
      toast.error(`You can only add ${remaining} more image${remaining !== 1 ? "s" : ""}`);
      return;
    }
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        const res = await adminUploadImage(file);
        urls.push(res.data.url);
      }
      setForm((p) => ({ ...p, images: [...(p.images || []), ...urls] }));
      toast.success(`${urls.length} image${urls.length > 1 ? "s" : ""} uploaded`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (idx) => {
    setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));
  };

  const moveImage = (idx, direction) => {
    setForm((p) => {
      const imgs = [...p.images];
      const target = idx + direction;
      if (target < 0 || target >= imgs.length) return p;
      [imgs[idx], imgs[target]] = [imgs[target], imgs[idx]];
      return { ...p, images: imgs };
    });
  };

  const handleSave = async () => {
    try {
      const data = { ...form, price: Number(form.price), discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined, minOrderQty: Number(form.minOrderQty), stock: Number(form.stock) };
      if (editing === "new") {
        await adminCreateProduct(data);
        toast.success("Product created");
      } else {
        await adminUpdateProduct(editing._id, data);
        toast.success("Product updated");
      }
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await adminDeleteProduct(id);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  const startEdit = (p) => {
    setForm({
      name: p.name, description: p.description || "", price: p.price, discountPrice: p.discountPrice || "",
      unit: p.unit, minOrderQty: p.minOrderQty, stock: p.stock, sku: p.sku || "", category: p.category || "",
      images: p.images || [], isActive: p.isActive,
    });
    setEditing(p);
  };

  const startNew = () => { setForm({ ...empty }); setEditing("new"); };

  if (editing) {
    return (
      <div className="admin-page">
        <h1>{editing === "new" ? "New Product" : "Edit Product"}</h1>
        <div className="admin-form">
          <div className="form-row">
            <div className="form-group"><label>Name *</label><input value={form.name} onChange={(e) => handleChange("name", e.target.value)} /></div>
            <div className="form-group"><label>SKU</label><input value={form.sku} onChange={(e) => handleChange("sku", e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Description</label><textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} rows={3} /></div>
          <div className="form-row">
            <div className="form-group"><label>Price *</label><input type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} /></div>
            <div className="form-group"><label>Discount Price</label><input type="number" value={form.discountPrice} onChange={(e) => handleChange("discountPrice", e.target.value)} /></div>
            <div className="form-group"><label>Unit</label><input value={form.unit} onChange={(e) => handleChange("unit", e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Min Order Qty</label><input type="number" value={form.minOrderQty} onChange={(e) => handleChange("minOrderQty", e.target.value)} /></div>
            <div className="form-group"><label>Stock</label><input type="number" value={form.stock} onChange={(e) => handleChange("stock", e.target.value)} /></div>
            <div className="form-group"><label>Category</label><input value={form.category} onChange={(e) => handleChange("category", e.target.value)} /></div>
          </div>
          <div className="form-group checkbox-group">
            <label><input type="checkbox" checked={form.isActive} onChange={(e) => handleChange("isActive", e.target.checked)} /> Active</label>
          </div>
          <div className="form-group">
            <label>Product Images (max 5, first = main image)</label>
            {form.images?.length > 0 && (
              <div className="image-preview-grid">
                {form.images.map((url, idx) => (
                  <div key={url} className={`image-preview-item${idx === 0 ? " main-image" : ""}`}>
                    <img src={url} alt={`Product ${idx + 1}`} />
                    <div className="image-preview-actions">
                      {idx === 0 && <span className="image-badge">Main</span>}
                      <button type="button" className="btn btn-xs btn-outline" onClick={() => moveImage(idx, -1)} disabled={idx === 0} title="Move left">←</button>
                      <button type="button" className="btn btn-xs btn-outline" onClick={() => moveImage(idx, 1)} disabled={idx === form.images.length - 1} title="Move right">→</button>
                      <button type="button" className="btn btn-xs btn-danger" onClick={() => removeImage(idx)} title="Remove">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {(form.images?.length || 0) < 5 && (
              <div style={{ marginTop: "0.5rem" }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading && <span className="text-muted" style={{ marginLeft: "0.5rem" }}>Uploading...</span>}
              </div>
            )}
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header"><h1>Products</h1><button className="btn btn-primary btn-sm" onClick={startNew}>+ Add Product</button></div>
      {loading ? <p>Loading...</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.images?.[0] ? <img src={p.images[0]} alt={p.name} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }} /> : "—"}</td>
                  <td>{p.name}</td>
                  <td>₹{p.discountPrice || p.price}</td>
                  <td>{p.stock}</td>
                  <td>{p.category || "—"}</td>
                  <td>{p.isActive ? "✓" : "✕"}</td>
                  <td>
                    <button className="btn btn-outline btn-xs" onClick={() => startEdit(p)}>Edit</button>{" "}
                    <button className="btn btn-danger btn-xs" onClick={() => handleDelete(p._id)}>Delete</button>
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
