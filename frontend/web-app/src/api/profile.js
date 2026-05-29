import api from "./client";

export const getProfile = () => api.get("/api/profile");
export const updateProfile = (data) => api.post("/api/profile", data);
