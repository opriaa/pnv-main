import api from "./client";

export const checkPincode = (code) => api.get(`/api/pincode/${code}`);
