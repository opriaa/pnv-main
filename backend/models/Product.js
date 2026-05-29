const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    images: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    unit: { type: String, default: "piece" },
    minOrderQty: { type: Number, default: 1, min: 1 },
    stock: { type: Number, default: 0, min: 0 },
    sku: { type: String, unique: true, sparse: true },
    category: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });

module.exports = mongoose.model("Product", productSchema);
