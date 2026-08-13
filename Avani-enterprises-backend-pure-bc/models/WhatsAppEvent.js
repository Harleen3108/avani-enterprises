const mongoose = require("mongoose");

/**
 * One row per webhook event we have already acted on.
 *
 * Meta retries a webhook delivery whenever it does not get a prompt 200 — and
 * it will happily redeliver an event we already handled. Without this table a
 * retried "Hi" sends the catalogue twice, and a retried call event sends it
 * again on top of that.
 *
 * The claim is the UNIQUE INDEX, not a find-then-insert: two Render instances
 * (or two retries landing at the same millisecond) both attempt the insert and
 * exactly one wins. A read-then-write check would let both through.
 *
 * Rows self-delete after 3 days. Meta stops retrying long before that, and
 * keeping them forever would grow an index nobody reads.
 */
const whatsAppEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // "message" | "call" | "status" — for debugging only, never branched on.
    kind: {
      type: String,
      default: "message",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 3,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("WhatsAppEvent", whatsAppEventSchema);
