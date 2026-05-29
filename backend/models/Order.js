const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: true },
    slug: String,
    sku: String,
    price: { type: Number, required: true },
    discountPrice: Number,
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, default: "piece" },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userSnapshot: {
      email: String,
      businessName: String,
      contactPerson: String,
      phone: String,
      gstNumber: String,
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
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true },
);

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model("Order", orderSchema);
