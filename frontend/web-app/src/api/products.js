import api from "./client";

export const getProducts = (params) => api.get("/api/products", { params });
export const getProductBySlug = (slug) => api.get(`/api/products/${slug}`);
export const getCategories = () => api.get("/api/products/categories");
