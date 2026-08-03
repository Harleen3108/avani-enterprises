const mongoose = require("mongoose");

/**
 * Turn anything into a URL-safe slug.
 *
 * Eight of the nineteen newsletters were created with the title used verbatim
 * as the slug, producing URLs like
 *   /newsletters/Top AI Content Creator Services in India
 *   /newsletters/How One Business Generated ₹30L Revenue in Just 4 Months
 * Spaces and the rupee sign have to be percent-encoded, so the URL a person
 * sees, the one Google crawls and the one that gets shared all differ. Google
 * reported several of these as separate crawled URLs.
 *
 * The create route passed req.body.slug straight through, so normalising here
 * covers every write path — create, update, and any script — rather than one
 * endpoint that the next endpoint forgets.
 */
function slugify(value) {
  return String(value == null ? "" : value)
    .normalize("NFKD")                  // strip accents to their base letters
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[₹$€£]/g, "")             // currency signs carry no meaning in a URL
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")        // everything else becomes a single hyphen
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

const newsletterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // Applied on every write, so a bad slug cannot reach the database again.
      set: slugify,
    },
    content: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },

    // Slugs this newsletter used to live at, so old links and anything Google
    // already crawled can be 301'd instead of 404'ing.
    previousSlugs: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Newsletter", newsletterSchema);
module.exports.slugify = slugify;
