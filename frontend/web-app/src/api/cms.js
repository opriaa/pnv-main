import api from "./client";

export const getHomepage = () => api.get("/api/cms/home");
export const getCmsPage = (slug) => api.get(`/api/cms/page/${slug}`);
