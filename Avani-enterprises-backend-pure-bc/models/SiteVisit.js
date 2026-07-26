const mongoose = require("mongoose");

/**
 * One document per anonymous pageview (INTEGRATION-SPEC section 5).
 *
 * Privacy notes:
 * - The raw IP is NEVER stored. Only `ipHash` (see services/requestContext.hashIp).
 * - country/region/city/lat/lng come from geoip-lite and are CITY-LEVEL AND
 *   APPROXIMATE. A VPN or mobile carrier NAT will place a visitor in the wrong
 *   city entirely. Anything user-facing built on these fields must say
 *   "approximate location". Unknown values stay '' / null — never guessed.
 *
 * Hostility note: every field here is fed by POST /api/analytics/track, which is
 * public and unauthenticated. routes/analytics.js sanitises first; the setters
 * below are the second line of defence, so a direct or malformed write still
 * cannot store an unbounded string, a NaN, or an out-of-range coordinate. They
 * coerce instead of rejecting — a validation throw inside a request handler is
 * exactly what "analytics must never break the site" forbids.
 */

// --- sanitising setters ------------------------------------------------------

// C0 controls + DEL. Stripped so a payload cannot forge log lines or smuggle
// terminal escapes into the admin UI. Built from a string so the source file
// stays plain ASCII.
const CONTROL_CHARS = new RegExp("[\\u0000-\\u001F\\u007F]+", "g");

/** Strips control characters, trims, caps length. Non-strings become ''. */
function capped(max) {
  return function capString(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "number" && Number.isFinite(value)) value = String(value);
    if (typeof value === "boolean") value = String(value);
    if (typeof value !== "string") return "";
    const cleaned = value.replace(CONTROL_CHARS, " ").trim();
    return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
  };
}

/** Whole number inside [min, max]. Anything non-finite collapses to `min`. */
function clamped(min, max) {
  return function clampNumber(value) {
    const n = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, Math.round(n)));
  };
}

/**
 * A coordinate, or null. Out-of-range and non-finite values become null
 * (unknown) rather than being clamped onto a real place we have no evidence
 * for, so no NaN/Infinity can reach the dashboard or the world map.
 */
function coordinate(limit) {
  return function castCoordinate(value) {
    if (value === null || value === undefined || value === "") return null;
    const n = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(n)) return null;
    if (n < -limit || n > limit) return null;
    return n;
  };
}

const SOURCES = ["direct", "organic", "social", "referral", "ai"];
const capSource = capped(20);

// Unknown sources fall back to 'direct' instead of failing validation mid-request.
function normaliseSource(value) {
  const v = capSource(value).toLowerCase();
  return SOURCES.indexOf(v) !== -1 ? v : "direct";
}

// A single background tab must not be able to claim hours of attention.
const MAX_DURATION_MS = 30 * 60 * 1000;

const siteVisitSchema = new mongoose.Schema(
  {
    // --- identity (client-generated, anonymous) ---------------------------
    // visitorId lives in localStorage, sessionId in sessionStorage.
    visitorId: { type: String, default: "", trim: true, set: capped(64) },
    sessionId: { type: String, default: "", trim: true, set: capped(64) },

    // --- page ------------------------------------------------------------
    path: { type: String, default: "", trim: true, set: capped(512) },
    title: { type: String, default: "", trim: true, set: capped(300) },

    // --- referrer / attribution ------------------------------------------
    referrer: { type: String, default: "", trim: true, set: capped(1024) },
    referrerDomain: { type: String, default: "", trim: true, set: capped(253) },
    source: {
      type: String,
      enum: SOURCES,
      default: "direct",
      set: normaliseSource,
    },
    // Empty when not applicable. Google strips the query from the Referer
    // header, so an empty searchQuery on an organic Google visit is expected
    // and correct — it is never back-filled with a placeholder.
    searchEngine: { type: String, default: "", trim: true, set: capped(40) },
    searchQuery: { type: String, default: "", trim: true, set: capped(200) },
    aiAssistant: { type: String, default: "", trim: true, set: capped(40) },

    // --- campaign tagging (first-touch, captured on the client) ----------
    utmSource: { type: String, default: "", trim: true, set: capped(150) },
    utmMedium: { type: String, default: "", trim: true, set: capped(150) },
    utmCampaign: { type: String, default: "", trim: true, set: capped(150) },
    utmContent: { type: String, default: "", trim: true, set: capped(150) },
    utmTerm: { type: String, default: "", trim: true, set: capped(150) },
    gclid: { type: String, default: "", trim: true, set: capped(255) },
    fbclid: { type: String, default: "", trim: true, set: capped(255) },

    // First path of the session.
    landingPage: { type: String, default: "", trim: true, set: capped(512) },

    // --- approximate geo (geoip-lite, city level) ------------------------
    country: { type: String, default: "", trim: true, set: capped(8) },
    countryName: { type: String, default: "", trim: true, set: capped(80) },
    region: { type: String, default: "", trim: true, set: capped(100) },
    city: { type: String, default: "", trim: true, set: capped(120) },
    lat: { type: Number, default: null, set: coordinate(90) },
    lng: { type: Number, default: null, set: coordinate(180) },
    timezone: { type: String, default: "", trim: true, set: capped(64) },

    // --- client ----------------------------------------------------------
    device: { type: String, default: "", trim: true, set: capped(20) },
    browser: { type: String, default: "", trim: true, set: capped(60) },
    os: { type: String, default: "", trim: true, set: capped(60) },
    userAgent: { type: String, default: "", trim: true, set: capped(512) },
    // sha256(ip + IP_HASH_SALT), truncated. The raw IP is never persisted, and
    // there is deliberately no `ip` field on this schema to store one in.
    ipHash: { type: String, default: "", trim: true, set: capped(64) },

    // --- engagement ------------------------------------------------------
    isNewVisitor: { type: Boolean, default: false },
    durationMs: {
      type: Number,
      default: 0,
      min: 0,
      max: MAX_DURATION_MS,
      set: clamped(0, MAX_DURATION_MS),
    },
    maxScroll: { type: Number, default: 0, min: 0, max: 100, set: clamped(0, 100) },

    // --- filtering -------------------------------------------------------
    isBot: { type: Boolean, default: false },
    // Set by POST /api/analytics/exclude so a visitor (e.g. staff) can be
    // removed from every dashboard aggregation without deleting history.
    excluded: { type: Boolean, default: false },
  },
  { timestamps: true } // createdAt + updatedAt
);

// Lookups by anonymous identity.
siteVisitSchema.index({ visitorId: 1 });
siteVisitSchema.index({ sessionId: 1 });

// Per-page reporting.
siteVisitSchema.index({ path: 1 });

// Every dashboard aggregation filters on excluded/isBot and sorts by recency.
siteVisitSchema.index({ excluded: 1, createdAt: -1 });
siteVisitSchema.index({ isBot: 1, createdAt: -1 });

// Retention: raw pageviews self-delete after 1 year (31536000 seconds).
siteVisitSchema.index({ createdAt: 1 }, { expireAfterSeconds: 31536000 });

// Re-requiring this file (tests, hot reload) must not throw OverwriteModelError.
module.exports =
  mongoose.models.SiteVisit || mongoose.model("SiteVisit", siteVisitSchema);
