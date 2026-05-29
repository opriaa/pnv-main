const crypto = require("crypto");

const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

module.exports = { generateOrderId };
