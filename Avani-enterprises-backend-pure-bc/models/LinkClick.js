const mongoose = require("mongoose");

const linkClickSchema = new mongoose.Schema(
  {
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },
    linkTitle: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "Unknown",
    },
    city: {
      type: String,
      default: "Unknown",
    },
    referrer: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    clickDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      index: true,
    },
    platform: {
      type: String,
      default: "link",
      enum: ["link", "social"],
    },
  },
  { timestamps: true }
);

// Create compound index for efficient day-wise analytics queries
linkClickSchema.index({ clickDate: 1, linkTitle: 1 });
linkClickSchema.index({ clickDate: 1 });

module.exports = mongoose.model("LinkClick", linkClickSchema);
