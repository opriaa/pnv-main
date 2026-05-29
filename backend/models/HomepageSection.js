const mongoose = require("mongoose");

const homepageSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    type: {
      type: String,
      enum: ["banner", "featured", "categories", "text", "cta", "custom"],
      default: "custom",
    },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

homepageSectionSchema.index({ order: 1 });

module.exports = mongoose.model("HomepageSection", homepageSectionSchema);
