import api from "./client";

export const sendOtp = (email) => api.post("/api/auth/send-otp", { email });
export const verifyOtp = (email, otp) =>
  api.post("/api/auth/verify-otp", { email, otp });
