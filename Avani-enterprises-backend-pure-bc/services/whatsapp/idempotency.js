/**
 * Duplicate-webhook protection.
 *
 * Meta retries a webhook delivery on any non-200, on a slow 200, and
 * occasionally for no visible reason at all. Every side effect in this feature
 * (catalogue send, AI reply, greeting) therefore runs behind a one-time claim
 * keyed on Meta's own message/call id.
 *
 * PRIMARY PATH — MongoDB. The project already runs Mongoose, so idempotency
 * costs one indexed insert and survives restarts and multiple Render instances.
 * The claim is the unique-index violation on insert, not a findOne-then-insert:
 * a read-then-write check has a race window in which two concurrent retries
 * both see "not processed" and both send.
 *
 * FALLBACK — in-process Map. Used only when Mongo is not connected (local dev
 * without MONGO_URI, or a blip). It is per-process and dies with the process,
 * so it cannot deduplicate across two Render instances. That is acceptable for
 * development and is called out in the README; production idempotency is the
 * Mongo path and requires nothing extra to be set up.
 */

const mongoose = require("mongoose");
const WhatsAppEvent = require("../../models/WhatsAppEvent");

const MEMORY_TTL_MS = 1000 * 60 * 60 * 6;
const MEMORY_MAX_ENTRIES = 5000;

/** eventId -> epoch ms of the claim. */
const memoryClaims = new Map();

function pruneMemory(now = Date.now()) {
  for (const [key, ts] of memoryClaims) {
    if (now - ts > MEMORY_TTL_MS) memoryClaims.delete(key);
  }
  // Hard ceiling so a flood of unique ids cannot grow this without bound.
  // Map preserves insertion order, so the oldest keys go first.
  while (memoryClaims.size > MEMORY_MAX_ENTRIES) {
    const oldest = memoryClaims.keys().next().value;
    if (oldest === undefined) break;
    memoryClaims.delete(oldest);
  }
}

function mongoReady() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

function claimInMemory(eventId) {
  const now = Date.now();
  pruneMemory(now);
  if (memoryClaims.has(eventId)) return false;
  memoryClaims.set(eventId, now);
  return true;
}

/**
 * Try to claim `eventId` for processing.
 *
 * @returns {Promise<boolean>} true if THIS call won the claim and should do the
 *   work; false if the event was already claimed and must be skipped.
 */
async function claimEvent(eventId, kind = "message") {
  if (!eventId) return false;

  if (!mongoReady()) return claimInMemory(eventId);

  try {
    await WhatsAppEvent.create({ eventId, kind });
    return true;
  } catch (err) {
    // 11000 is the duplicate-key error: someone else already claimed it. This
    // is the expected, healthy outcome of a retry — not something to log loudly.
    if (err && (err.code === 11000 || err.code === 11001)) return false;

    // Any other Mongo failure must not silence the webhook. Degrade to the
    // in-memory claim so the customer still gets an answer.
    console.warn(`⚠️ WhatsApp idempotency store unavailable, using in-memory claim: ${err.message}`);
    return claimInMemory(eventId);
  }
}

/**
 * Release a claim so a genuinely failed attempt can be retried by Meta's next
 * delivery. Called when processing threw before anything was sent.
 */
async function releaseEvent(eventId) {
  if (!eventId) return;
  memoryClaims.delete(eventId);
  if (!mongoReady()) return;
  try {
    await WhatsAppEvent.deleteOne({ eventId });
  } catch (err) {
    console.warn(`⚠️ Could not release WhatsApp event claim: ${err.message}`);
  }
}

function describeStore() {
  return {
    backend: mongoReady() ? "mongodb" : "memory",
    persistent: mongoReady(),
    inMemoryEntries: memoryClaims.size,
  };
}

module.exports = { claimEvent, releaseEvent, describeStore };
