const jwt = require("jsonwebtoken");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authentication required"));
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

module.exports = auth;
