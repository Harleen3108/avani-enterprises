const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, trim: true },
    section: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    seoHeading: { type: String, trim: true, default: "" },
    metaDescription: { type: String, trim: true, default: "" },
    metaKeywords: { type: String, trim: true, default: "" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seo", seoSchema);
