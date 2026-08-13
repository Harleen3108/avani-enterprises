const mongoose = require("mongoose");

/**
 * A single settings document ({ key: "default" }) holding the values an admin
 * may want to change without a redeploy — above all the catalogue URL.
 *
 * These are OVERRIDES, not the source of truth. Every field is empty/null by
 * default and the resolver in services/whatsapp/catalogue.js falls back to the
 * environment variables. That ordering matters: the env vars stay the documented
 * Phase-1 configuration (CATALOGUE_PDF_URL and friends), and this collection is
 * the optional admin-panel layer on top. Nothing breaks if the collection is
 * empty, or if MongoDB is briefly unreachable.
 *
 * No credential is ever stored here — tokens and API keys live only in the
 * environment.
 */
const whatsAppSettingSchema = new mongoose.Schema(
  {
    key: { type: String, default: "default", unique: true, index: true },

    // Catalogue overrides. `catalogueMediaId` wins over `cataloguePdfUrl`.
    cataloguePdfUrl: { type: String, default: "" },
    catalogueMediaId: { type: String, default: "" },
    catalogueFilename: { type: String, default: "" },
    catalogueCaption: { type: String, default: "" },

    // Copy overrides, so wording can be tuned without a deploy.
    greetingText: { type: String, default: "" },
    fallbackText: { type: String, default: "" },

    // Kill switches. Null = "defer to the environment variable".
    automationEnabled: { type: Boolean, default: null },
    aiEnabled: { type: Boolean, default: null },

    updatedBy: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WhatsAppSetting", whatsAppSettingSchema);
