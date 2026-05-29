const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema(
  {
    bankName: { type: String, required: true },
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    branch: { type: String },
    upiId: { type: String },
    notes: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BankDetails", bankDetailsSchema);
