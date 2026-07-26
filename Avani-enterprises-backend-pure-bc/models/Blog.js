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

    // ── Scheduling ──────────────────────────────────────────────────────────
    // A post with isPublished:true and a FUTURE publishedAt is scheduled, not
    // live. The public endpoints filter `publishedAt: { $lte: new Date() }`, so
    // a queue of future-dated posts reveals itself one at a time with no cron
    // and no scheduler process. Admin routes deliberately do NOT filter, so the
    // whole queue stays visible and editable in the dashboard.
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },

    // ── SEO / AEO ───────────────────────────────────────────────────────────
    // Previously derived at snapshot time by guessing from tags and the title.
    // Stored explicitly now so a seeded post controls its own categorisation
    // and metadata instead of relying on a heuristic.
    category: { type: String, default: "", trim: true },
    metaTitle: { type: String, default: "", trim: true },
    metaDescription: { type: String, default: "", trim: true },
    metaKeywords: { type: [String], default: [] },
    canonical: { type: String, default: "", trim: true },
    readTime: { type: Number, default: 0 },

    // Answer-engine optimisation. keyTakeaways renders as the callout card at
    // the top of the article; faqs render as an accordion AND become FAQPage
    // schema, which is what gets a post quoted by AI answer engines.
    keyTakeaways: { type: [String], default: [] },
    faqs: {
      type: [
        {
          q: { type: String, required: true, trim: true },
          a: { type: String, required: true, trim: true },
          _id: false,
        },
      ],
      default: [],
    },

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
