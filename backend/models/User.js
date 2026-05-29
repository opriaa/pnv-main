const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    businessName: { type: String, trim: true },
    gstNumber: { type: String, trim: true },
    contactPerson: { type: String, trim: true },
    phone: { type: String, trim: true },
    billingAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
    },
    shippingAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
