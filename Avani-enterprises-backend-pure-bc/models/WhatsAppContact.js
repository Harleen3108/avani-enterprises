const mongoose = require("mongoose");

/**
 * One row per WhatsApp customer we have spoken to.
 *
 * This exists to answer one question the catalogue flow depends on: is this a
 * new customer? Without it, "send the catalogue to new customers" degrades into
 * "send the catalogue on every single message", which is how a helpful
 * automation turns into spam.
 *
 * PRIVACY: `waId` is the customer's phone number and is the join key, so it is
 * stored as-is — the same posture as the existing Lead and AvaniForm models,
 * which store the numbers people type into the website forms. Logs mask it
 * (see config.maskPhone); the database does not, because a business needs to
 * be able to call back the person who enquired.
 */
const whatsAppContactSchema = new mongoose.Schema(
  {
    // Meta's wa_id: the customer's number in international format, digits only.
    waId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // Which of our numbers they messaged. Lets a second (production) number be
    // added later without the rows becoming ambiguous.
    phoneNumberId: { type: String, default: "" },
    profileName: { type: String, default: "" },

    firstSeenAt: { type: Date, default: Date.now },
    lastMessageAt: { type: Date, default: Date.now },
    messageCount: { type: Number, default: 0 },
    callCount: { type: Number, default: 0 },

    // Drives the resend window. Null means they have never received it.
    catalogueSentAt: { type: Date, default: null },
    catalogueSendCount: { type: Number, default: 0 },

    lastIntent: { type: String, default: "" },
    // Set when someone says "stop". Every automated send checks this first.
    optedOut: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WhatsAppContact", whatsAppContactSchema);
