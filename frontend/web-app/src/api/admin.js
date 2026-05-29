import api from "./client";

const adminApi = (method, url, data) => {
  const token = localStorage.getItem("adminToken");
  const headers = { "x-admin-token": token };
  if (method === "get" || method === "delete") {
    return api[method](url, { headers });
  }
  return api[method](url, data, { headers });
};

export const adminLogin = (token) => api.post("/api/admin/login", { token });

// Image upload
export const adminUploadImage = (file) => {
  const token = localStorage.getItem("adminToken");
  const formData = new FormData();
  formData.append("image", file);
  return api.post("/api/admin/upload-image", formData, {
    headers: { "x-admin-token": token, "Content-Type": "multipart/form-data" },
  });
};

// Products
export const adminGetProducts = (params) => {
  const token = localStorage.getItem("adminToken");
  return api.get("/api/admin/products", {
    params,
    headers: { "x-admin-token": token },
  });
};
export const adminCreateProduct = (data) =>
  adminApi("post", "/api/admin/products", data);
export const adminUpdateProduct = (id, data) =>
  adminApi("put", `/api/admin/products/${id}`, data);
export const adminDeleteProduct = (id) =>
  adminApi("delete", `/api/admin/products/${id}`);

// Orders
export const adminGetOrders = (params) => {
  const token = localStorage.getItem("adminToken");
  return api.get("/api/admin/orders", {
    params,
    headers: { "x-admin-token": token },
  });
};
export const adminUpdateOrderStatus = (id, status) =>
  adminApi("patch", `/api/admin/orders/${id}/status`, { status });

// CMS Pages
export const adminGetCmsPages = () => {
  const token = localStorage.getItem("adminToken");
  return api.get("/api/admin/cms-pages", {
    headers: { "x-admin-token": token },
  });
};
export const adminCreateCmsPage = (data) =>
  adminApi("post", "/api/admin/cms-pages", data);
export const adminUpdateCmsPage = (id, data) =>
  adminApi("put", `/api/admin/cms-pages/${id}`, data);
export const adminDeleteCmsPage = (id) =>
  adminApi("delete", `/api/admin/cms-pages/${id}`);

// Homepage Sections
export const adminGetHomepageSections = () => {
  const token = localStorage.getItem("adminToken");
  return api.get("/api/admin/homepage-sections", {
    headers: { "x-admin-token": token },
  });
};
export const adminCreateHomepageSection = (data) =>
  adminApi("post", "/api/admin/homepage-sections", data);
export const adminUpdateHomepageSection = (id, data) =>
  adminApi("put", `/api/admin/homepage-sections/${id}`, data);
export const adminDeleteHomepageSection = (id) =>
  adminApi("delete", `/api/admin/homepage-sections/${id}`);

// Bank Details
export const adminGetBankDetails = () => {
  const token = localStorage.getItem("adminToken");
  return api.get("/api/admin/bank-details", {
    headers: { "x-admin-token": token },
  });
};
export const adminUpsertBankDetails = (data) =>
  adminApi("put", "/api/admin/bank-details", data);

// Pincodes
export const adminGetPincodes = (params) => {
  const token = localStorage.getItem("adminToken");
  return api.get("/api/admin/pincodes", {
    params,
    headers: { "x-admin-token": token },
  });
};
export const adminCreatePincode = (data) =>
  adminApi("post", "/api/admin/pincodes", data);
export const adminUpdatePincode = (id, data) =>
  adminApi("put", `/api/admin/pincodes/${id}`, data);
export const adminDeletePincode = (id) =>
  adminApi("delete", `/api/admin/pincodes/${id}`);
