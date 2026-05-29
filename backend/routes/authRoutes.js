const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { otpRateLimiter } = require("../middlewares/rateLimiter");
const {
  validate,
  sendOtpSchema,
  verifyOtpSchema,
} = require("../middlewares/validate");

router.post(
  "/send-otp",
  otpRateLimiter,
  validate(sendOtpSchema),
  authController.sendOtp,
);

router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);

module.exports = router;
