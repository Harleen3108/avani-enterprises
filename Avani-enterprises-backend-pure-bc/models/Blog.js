const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    author: { type: String, default: "Admin" },
    tags: { type: [String], default: [] },
    featuredImage: { type: String, default: "" },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },

    // ── Engagement ──────────────────────────────────────────────────────────
    // Mirrors the Avani Business OS blog: a view counter, likes, and comments
    // shown on the post and on the index.
    likes: { type: Number, default: 0 },
    comments: [
      {
        name: { type: String, required: true, trim: true, maxlength: 80 },
        // Stored for moderation and reply, never rendered publicly.
        email: { type: String, trim: true, maxlength: 160 },
        body: { type: String, required: true, trim: true, maxlength: 2000 },
        // Comments are held until approved — an open comment form on a site
        // recovering from a content penalty is a spam-link liability.
        approved: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
