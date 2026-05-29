const mongoose = require("mongoose");

const pincodeSchema = new mongoose.Schema(
  {
    pincode: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    city: { type: String },
    deliveryAvailable: { type: Boolean, default: true },
    deliveryDays: { type: Number, default: 3 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pincode", pincodeSchema);
