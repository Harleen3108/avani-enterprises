const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Newsletter", newsletterSchema);
