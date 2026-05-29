const jwt = require("jsonwebtoken");
const env = require("../config/env");
const otpRepository = require("../repositories/otpRepository");
const userRepository = require("../repositories/userRepository");
const { generateOTP, hashOTP } = require("../utils/otp");
const { sendEmail } = require("../utils/email");
const { otpEmailTemplate } = require("../utils/emailTemplates");
const ApiError = require("../utils/ApiError");

const sendOtp = async (email) => {
  if (!email) throw new ApiError(400, "Email is required");

  const otp = generateOTP();
  const otpHash = hashOTP(otp);
  const expiresAt = new Date(Date.now() + env.OTP_EXPIRY_MINUTES * 60 * 1000);

  await otpRepository.create({ email, otpHash, expiresAt });

  await sendEmail(email, "Your Login OTP", otpEmailTemplate(otp));

  return { message: "OTP sent successfully" };
};

const verifyOtp = async (email, otp) => {
  if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

  const otpRecord = await otpRepository.findLatestByEmail(email);

  if (!otpRecord) {
    throw new ApiError(400, "No OTP request found. Please request a new OTP.");
  }

  if (otpRecord.attempts >= 5) {
    throw new ApiError(429, "Too many attempts. Please request a new OTP.");
  }

  if (new Date() > otpRecord.expiresAt) {
    throw new ApiError(400, "OTP has expired. Please request a new OTP.");
  }

  const incomingHash = hashOTP(otp);
  if (incomingHash !== otpRecord.otpHash) {
    await otpRepository.incrementAttempts(otpRecord._id);
    throw new ApiError(400, "Invalid OTP");
  }

  await otpRepository.markVerified(otpRecord._id);

  let user = await userRepository.findByEmail(email);
  if (!user) {
    user = await userRepository.create({ email });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { token, user };
};

module.exports = { sendOtp, verifyOtp };
