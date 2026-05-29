const authService = require("../services/authService");

const sendOtp = async (req, res, next) => {
  try {
    const result = await authService.sendOtp(req.body.email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyOtp(email, otp);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { sendOtp, verifyOtp };
