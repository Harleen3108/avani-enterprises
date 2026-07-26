const mongoose = require("mongoose");

const avaniFormSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phoneNu: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    projectDetails: {
      type: String,
      trim: true,
    },
    otherService: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    // Where the enquiry came from, so the admin table can say "/contact"
    // rather than leaving you to guess.
    pagePath: { type: String, default: "", trim: true },
    pageUrl: { type: String, default: "", trim: true },
    referrer: { type: String, default: "", trim: true },
    // Set by the spam heuristic in index.js. Flagged, never rejected — a
    // false positive should cost you a click, not a customer.
    isSpam: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AvaniForm", avaniFormSchema);
