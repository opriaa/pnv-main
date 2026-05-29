const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many OTP requests. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.body.email || ipKeyGenerator(req),
});

module.exports = { otpRateLimiter };
