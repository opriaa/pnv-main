require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret-in-production",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "winexe09@gmail.com",
  FROM_EMAIL: process.env.FROM_EMAIL || "noreply@pnventerprises.in",
  OTP_EXPIRY_MINUTES: 10,
  ADMIN_TOKEN: process.env.ADMIN_TOKEN || "admin-secret-token",
  IMAGEKIT_ID: process.env.IMAGEKIT_ID || "sljqsazoe",
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY || "",
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY || "",
};
