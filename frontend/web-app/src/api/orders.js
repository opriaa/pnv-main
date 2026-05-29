import api from "./client";

export const createOrder = (data) => api.post("/api/orders", data);
export const getMyOrders = (params) => api.get("/api/orders/my", { params });
export const getOrder = (id) => api.get(`/api/orders/${id}`);
