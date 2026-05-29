const mongoose = require("mongoose");

const cmsPageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, default: "" },
    metaTitle: { type: String },
    metaDescription: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("CmsPage", cmsPageSchema);
