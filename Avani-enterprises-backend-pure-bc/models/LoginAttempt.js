/**
 * models/LoginAttempt.js
 *
 * One document per admin login attempt — successful or failed. Drives the
 * progressive lockout in services/loginSecurity.js and the security log UI.
 * See INTEGRATION-SPEC.md section 2.
 *
 * PRIVACY
 * -------
 * The raw IP address is NEVER persisted. `ip` exists only so nothing downstream
 * breaks on a missing field; it is always written as ''. Identification is done
 * through `ipHash` (salted, truncated sha256 — see services/requestContext.js).
 *
 * The location fields are APPROXIMATE, city-level, and derived from a static
 * IP database. A VPN, corporate proxy or mobile carrier NAT will record the
 * wrong city or country. Anything that surfaces these values to a human must
 * label them "approximate".
 *
 * RETENTION
 * ---------
 * Documents self-delete 180 days after `createdAt` via a TTL index.
 */

const mongoose = require('mongoose');

const TTL_SECONDS = 15552000; // 180 days

/**
 * Truncating setter factory.
 *
 * Several of these fields are written straight from a hostile source: `email`
 * comes from the public login body and `userAgent` from a request header, both
 * unbounded. A `maxlength` validator would THROW on oversize input, and that
 * throw would land inside the login path — an attacker could break their own
 * audit trail (or the login route) by sending a 10 MB email field. Truncating
 * is the safe direction: the row is always written, just bounded.
 */
function capped(max) {
  return function truncate(value) {
    if (value === null || value === undefined) return '';
    const out = String(value);
    return out.length > max ? out.slice(0, max) : out;
  };
}

/**
 * Coordinates must be a real number in range or null. NaN and Infinity survive
 * a `type: Number` cast and would reach the world map as a broken bubble, so
 * anything non-finite or out of range is stored as null instead.
 */
function coordinate(limit) {
  return function normalise(value) {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    if (!Number.isFinite(num)) return null;
    if (num < -limit || num > limit) return null;
    return num;
  };
}

const loginAttemptSchema = new mongoose.Schema(
  {
    // Lowercased, exactly as typed by whoever attempted the login. This is not
    // guaranteed to match an existing user — failed attempts record unknown
    // addresses too (reason: 'no-user').
    // Attacker-controlled: this is whatever was typed into the login form,
    // including for accounts that do not exist. Capped at 320 characters, the
    // maximum length of an RFC 5321 address.
    email: {
      type: String,
      default: '',
      lowercase: true,
      trim: true,
      set: capped(320),
    },

    success: {
      type: Boolean,
      default: false,
    },

    // 'ok' | 'bad-password' | 'no-user' | 'unverified' | 'locked'
    // Also used for audit rows written on credential changes
    // (reason: 'credentials-changed').
    reason: {
      type: String,
      default: '',
      trim: true,
      set: capped(64),
    },

    // ALWAYS ''. The raw IP is never persisted, and this setter enforces that
    // at the schema level so no present or future caller can write one here
    // by mistake. Identification is done through ipHash alone.
    ip: {
      type: String,
      default: '',
      set: () => '',
    },

    // Salted, truncated sha256 of the client IP. Combined with `email` this is
    // the lockout key, so one attacker cannot lock a legitimate admin out from
    // their own location.
    ipHash: {
      type: String,
      default: '',
      set: capped(64),
    },

    // ---- Approximate location (see header note) ----
    country: { type: String, default: '', set: capped(2) }, // ISO 3166-1 alpha-2
    countryName: { type: String, default: '', set: capped(64) },
    region: { type: String, default: '', set: capped(128) },
    city: { type: String, default: '', set: capped(128) },
    lat: { type: Number, default: null, set: coordinate(90) },
    lng: { type: Number, default: null, set: coordinate(180) },
    timezone: { type: String, default: '', set: capped(64) },

    // ---- Client ----
    // 'desktop' | 'mobile' | 'tablet'
    device: { type: String, default: '', set: capped(32) },
    browser: { type: String, default: '', set: capped(64) },
    os: { type: String, default: '', set: capped(64) },
    // Straight from a request header — unbounded and untrusted.
    userAgent: { type: String, default: '', set: capped(512) },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // createdAt is declared explicitly above so the TTL index can hang off it;
    // there is nothing to update on an immutable audit row, so no updatedAt.
    timestamps: false,
  }
);

// Security log filtered by account, newest first.
loginAttemptSchema.index({ email: 1, createdAt: -1 });

// "Show me recent failures" / "recent successes", newest first.
loginAttemptSchema.index({ success: 1, createdAt: -1 });

// Retention: drop attempts 180 days after they were recorded.
loginAttemptSchema.index({ createdAt: 1 }, { expireAfterSeconds: TTL_SECONDS });

// Guarded against OverwriteModelError: this model is required from both
// services/loginSecurity.js and routes/adminSecurity.js, and a second
// compilation (module cache miss on a differently-cased path, or a test that
// re-requires) would otherwise throw at require time and stop the server boot.
module.exports =
  mongoose.models.LoginAttempt ||
  mongoose.model('LoginAttempt', loginAttemptSchema);
