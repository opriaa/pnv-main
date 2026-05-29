const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const adminAuth = (req, res, next) => {
  const token = req.headers["x-admin-token"];
  if (!token || token !== env.ADMIN_TOKEN) {
    return next(new ApiError(403, "Admin access denied"));
  }
  next();
};

module.exports = adminAuth;
