// routes/adminSecurity.js
// Admin credential management + login security log.
// Mounted at /admin/security. Every route requires a valid admin JWT, and every
// credential change re-verifies the current password with bcrypt first.
//
// Passwords and admin codes are stored as bcrypt hashes only and are never
// returned by any route in this file.

const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/User");
const LoginAttempt = require("../models/LoginAttempt");
const loginSecurity = require("../services/loginSecurity");
const requestContext = require("../services/requestContext");

const router = express.Router();

// The integration spec names `middleware/authMiddleware`. In this repo the JWT
// verifier currently lives inline in index.js and the extracted copy is
// `middleware/auth.js`. Prefer the spec'd path, fall back to the file that
// actually exists so mounting cannot crash the server. Only a genuinely missing
// module is tolerated; a module that exists but throws is re-thrown.
let authMiddleware;
try {
  authMiddleware = require("../middleware/authMiddleware");
} catch (err) {
  if (err && err.code === "MODULE_NOT_FOUND" && /authMiddleware/.test(err.message || "")) {
    authMiddleware = require("../middleware/auth");
  } else {
    throw err;
  }
}

const BCRYPT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;
// Every free-text field is capped before it reaches bcrypt, a regex or the
// database. bcrypt only consumes the first 72 bytes anyway, so a ceiling costs
// nothing and stops a megabyte body from burning CPU or memory.
const MAX_PASSWORD_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 maximum path length
const MIN_ADMIN_CODE_LENGTH = 4;
const MAX_ADMIN_CODE_LENGTH = 64;
const MAX_IP_HASH_LENGTH = 64;
const DEFAULT_LOG_LIMIT = 100;
const MAX_LOG_LIMIT = 500;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Locations in this file come from IP geolocation. They are city-level at best
// and a VPN or mobile carrier NAT will place someone in the wrong city
// entirely. Any surface that shows them must say so.
const LOCATION_NOTE =
  "Locations are approximate, derived from the IP address. A VPN, corporate network or mobile carrier can place a visitor in the wrong city or country.";

/* ------------------------------------------------------------------ *
 * helpers
 * ------------------------------------------------------------------ */

// Anything that is not a plain string is rejected outright rather than
// coerced — that is what keeps an object like { $ne: null } out of a query.
function normaliseEmail(value) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_EMAIL_LENGTH).toLowerCase();
}

// A coordinate only leaves this file if it is a real finite number. NaN and
// Infinity become null so the UI never has to render "NaN".
function finiteOrNull(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

// ipHash is produced by requestContext.hashIp (12 hex chars). Accept only that
// shape so the value cannot be used to smuggle an operator into a query.
function cleanIpHash(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_IP_HASH_LENGTH) return "";
  return /^[a-f0-9]+$/i.test(trimmed) ? trimmed : "";
}

// Only ever expose non-secret fields. Never password, never adminCodeHash.
function publicUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    hasAdminCode: Boolean(user.adminCodeHash),
  };
}

// Geo + UA facts for the current request, with the raw IP hashed immediately.
// The raw IP is never returned and never persisted.
function requestFacts(req) {
  const userAgent = req.headers["user-agent"] || "";
  let ip = "";
  let geo = {};
  let ua = {};

  try {
    ip = requestContext.clientIp(req) || "";
  } catch (err) {
    ip = "";
  }
  try {
    geo = requestContext.geoFromIp(ip) || {};
  } catch (err) {
    geo = {};
  }
  try {
    ua = requestContext.parseUa(userAgent) || {};
  } catch (err) {
    ua = {};
  }

  let ipHash = "";
  try {
    ipHash = ip ? requestContext.hashIp(ip) || "" : "";
  } catch (err) {
    ipHash = "";
  }

  return { ipHash, geo, ua, userAgent };
}

// Build the approximate-location label for a stored attempt document.
function describe(doc) {
  const geo = {
    country: doc.country || "",
    countryName: doc.countryName || "",
    region: doc.region || "",
    city: doc.city || "",
    lat: finiteOrNull(doc.lat),
    lng: finiteOrNull(doc.lng),
    timezone: doc.timezone || "",
  };

  let label = "";
  try {
    label = requestContext.describeLocation(geo) || "";
  } catch (err) {
    label = "";
  }

  return { geo, label };
}

// Shape a LoginAttempt document for the UI. No IP, no secrets.
function presentAttempt(doc) {
  const { geo, label } = describe(doc);
  return {
    _id: doc._id,
    email: doc.email || "",
    success: Boolean(doc.success),
    reason: doc.reason || "",
    approximateLocation: label,
    country: geo.country,
    countryName: geo.countryName,
    region: geo.region,
    city: geo.city,
    lat: geo.lat,
    lng: geo.lng,
    timezone: geo.timezone,
    device: doc.device || "",
    browser: doc.browser || "",
    os: doc.os || "",
    userAgent: doc.userAgent || "",
    ipHash: doc.ipHash || "",
    createdAt: doc.createdAt,
  };
}

// Audit trail: a successful credential change is written into the same log the
// login attempts go to, with location, so the change itself is visible there.
// This runs after the change has already been committed, so it must never
// throw into the request path.
async function writeCredentialAudit(email, req) {
  try {
    const { ipHash, geo, ua, userAgent } = requestFacts(req);
    await LoginAttempt.create({
      email: normaliseEmail(email),
      success: true,
      reason: "credentials-changed",
      ip: "", // never store a raw IP
      ipHash,
      country: geo.country || "",
      countryName: geo.countryName || "",
      region: geo.region || "",
      city: geo.city || "",
      lat: finiteOrNull(geo.lat),
      lng: finiteOrNull(geo.lng),
      timezone: geo.timezone || "",
      device: ua.device || "",
      browser: ua.browser || "",
      os: ua.os || "",
      userAgent,
    });
  } catch (err) {
    console.error("adminSecurity: failed to write credentials-changed audit:", err.message || err);
  }
}

// Load the logged-in admin from the JWT payload ({ _id, role }).
// A malformed id is "not found"; a database failure is deliberately NOT
// swallowed, so an outage surfaces as a 500 instead of lying with a 404.
async function loadCurrentUser(req) {
  const raw = req.user && (req.user._id || req.user.id);
  if (!raw) return null;
  const id = String(raw);
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return User.findById(id);
}

/**
 * Re-verify the current password before any credential change.
 *
 * Returns true when the password is correct. On any failure it has ALREADY
 * sent the response and returns false, so callers must simply stop.
 *
 * A wrong password here is treated exactly like a failed login: it is recorded
 * through loginSecurity so it appears in the log, counts toward the progressive
 * lockout, and fires the alert email.
 *
 * The lockout is also ENFORCED here, not merely recorded. Holding a valid JWT
 * must not buy an attacker an unmetered oracle for guessing the password: a
 * stolen token would otherwise allow unlimited guesses through this route while
 * the login form itself stayed locked.
 *
 * Status codes matter: the admin app logs the user out on any 401, so a wrong
 * *current* password (the session itself is still perfectly valid) answers 403,
 * and a lockout answers 429. Only authMiddleware may emit 401 here.
 */
async function requireCurrentPassword(req, res, user, currentPassword) {
  if (typeof currentPassword !== "string" || !currentPassword) {
    res.status(400).json({ message: "Current password is required." });
    return false;
  }

  // Cap before bcrypt so an oversized body cannot be used to burn CPU.
  if (currentPassword.length > MAX_PASSWORD_LENGTH) {
    res.status(400).json({
      message: `Current password must be at most ${MAX_PASSWORD_LENGTH} characters.`,
    });
    return false;
  }

  const { ipHash } = requestFacts(req);

  // Already locked out from this location? Refuse before touching bcrypt, and
  // log the blocked attempt with reason 'locked' — loginSecurity treats that as
  // a non-streak reason, so retries cannot ratchet the lock upward forever.
  let existing = null;
  try {
    existing = await loginSecurity.checkLock({ email: user.email, ipHash });
  } catch (err) {
    // checkLock already fails open internally; treat a throw the same way.
    existing = null;
  }

  if (existing && existing.locked) {
    try {
      await loginSecurity.recordFailure({ email: user.email, reason: "locked", req });
    } catch (err) {
      console.error("adminSecurity: could not log locked attempt:", err.message || err);
    }
    res.status(429).json({
      locked: true,
      until: existing.until,
      minutesLeft: existing.minutesLeft,
      message: `Too many failed attempts. Try again in about ${existing.minutesLeft} minute(s).`,
    });
    return false;
  }

  let valid = false;
  try {
    valid = await bcrypt.compare(currentPassword, user.password || "");
  } catch (err) {
    valid = false;
  }

  if (valid) return true;

  let lock = null;
  try {
    lock = await loginSecurity.recordFailure({
      email: user.email,
      reason: "bad-password",
      req,
    });
  } catch (err) {
    console.error("adminSecurity: recordFailure failed:", err.message || err);
  }

  const body = { message: "Current password is incorrect." };
  if (lock && lock.locked) {
    body.locked = true;
    body.until = lock.until;
    body.minutesLeft = lock.minutesLeft;
    body.message =
      "Current password is incorrect. Too many failed attempts — the panel is temporarily locked.";
  }

  res.status(403).json(body);
  return false;
}

/* ------------------------------------------------------------------ *
 * POST /change-password
 * ------------------------------------------------------------------ */

router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};

    const user = await loadCurrentUser(req);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Verify the current password before looking at anything else, so a bad
    // password is always recorded and alerted on — it must not be possible to
    // probe passwords by pairing them with a deliberately invalid new value.
    const ok = await requireCurrentPassword(req, res, user, currentPassword);
    if (!ok) return undefined;

    if (typeof newPassword !== "string" || newPassword.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        message: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      });
    }

    if (newPassword.length > MAX_PASSWORD_LENGTH) {
      return res.status(400).json({
        message: `New password must be at most ${MAX_PASSWORD_LENGTH} characters.`,
      });
    }

    if (newPassword === currentPassword) {
      return res
        .status(400)
        .json({ message: "New password must be different from the current one." });
    }

    // Guard against re-submitting the stored password through a different code
    // path (e.g. a password manager filling a stale value).
    let same = false;
    try {
      same = await bcrypt.compare(newPassword, user.password || "");
    } catch (err) {
      same = false;
    }
    if (same) {
      return res
        .status(400)
        .json({ message: "New password must be different from the current one." });
    }

    const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    await writeCredentialAudit(user.email, req);

    return res.status(200).json({
      message: "Password updated. Use the new password at your next login.",
      user: publicUser(user),
    });
  } catch (err) {
    console.error("adminSecurity /change-password:", err.message || err);
    // The detail stays in the server log. Echoing err.message can leak schema,
    // duplicate-key values or connection strings to the browser.
    return res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------------------------------------------------ *
 * POST /change-email
 * ------------------------------------------------------------------ */

router.post("/change-email", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newEmail } = req.body || {};

    const user = await loadCurrentUser(req);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Password first — see the note in /change-password.
    const ok = await requireCurrentPassword(req, res, user, currentPassword);
    if (!ok) return undefined;

    // normaliseEmail already truncates to MAX_EMAIL_LENGTH, which also bounds
    // the work EMAIL_RE can do on a hostile string.
    if (typeof newEmail === "string" && newEmail.trim().length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({ message: "That email address is too long." });
    }

    const email = normaliseEmail(newEmail);
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address." });
    }

    const previousEmail = normaliseEmail(user.email);
    if (email === previousEmail) {
      return res
        .status(400)
        .json({ message: "That is already the email on this account." });
    }

    const taken = await User.findOne({ email, _id: { $ne: user._id } }).select("_id");
    if (taken) {
      return res
        .status(409)
        .json({ message: "That email is already in use by another account." });
    }

    user.email = email;
    try {
      await user.save();
    } catch (err) {
      // Unique index is the authoritative check; a race can still land here.
      if (err && err.code === 11000) {
        return res
          .status(409)
          .json({ message: "That email is already in use by another account." });
      }
      throw err;
    }

    // Record the change against both addresses so it is visible whichever one
    // the log is filtered by.
    await writeCredentialAudit(email, req);
    if (previousEmail) await writeCredentialAudit(previousEmail, req);

    return res.status(200).json({
      message: "Email updated. Log in with the new address next time.",
      user: publicUser(user),
    });
  } catch (err) {
    console.error("adminSecurity /change-email:", err.message || err);
    // The detail stays in the server log. Echoing err.message can leak schema,
    // duplicate-key values or connection strings to the browser.
    return res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------------------------------------------------ *
 * POST /change-admin-code
 * ------------------------------------------------------------------ */

router.post("/change-admin-code", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newAdminCode } = req.body || {};

    const user = await loadCurrentUser(req);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Password first — see the note in /change-password.
    const ok = await requireCurrentPassword(req, res, user, currentPassword);
    if (!ok) return undefined;

    const code = typeof newAdminCode === "string" ? newAdminCode.trim() : "";
    if (code.length < MIN_ADMIN_CODE_LENGTH || code.length > MAX_ADMIN_CODE_LENGTH) {
      return res.status(400).json({
        message: `Admin code must be between ${MIN_ADMIN_CODE_LENGTH} and ${MAX_ADMIN_CODE_LENGTH} characters.`,
      });
    }

    // The admin code is a second secret; it must not simply mirror the password.
    let mirrorsPassword = false;
    try {
      mirrorsPassword = await bcrypt.compare(code, user.password || "");
    } catch (err) {
      mirrorsPassword = false;
    }
    if (mirrorsPassword) {
      return res
        .status(400)
        .json({ message: "Admin code must be different from your password." });
    }

    // Hashed exactly like a password — the clear code is never stored.
    const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
    user.adminCodeHash = await bcrypt.hash(code, salt);
    await user.save();

    await writeCredentialAudit(user.email, req);

    return res.status(200).json({
      message: "Admin code updated.",
      user: publicUser(user),
    });
  } catch (err) {
    console.error("adminSecurity /change-admin-code:", err.message || err);
    // The detail stays in the server log. Echoing err.message can leak schema,
    // duplicate-key values or connection strings to the browser.
    return res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------------------------------------------------ *
 * GET /login-log?limit=&email=
 * ------------------------------------------------------------------ */

router.get("/login-log", authMiddleware, async (req, res) => {
  try {
    const parsed = parseInt(req.query.limit, 10);
    const limit = Number.isFinite(parsed)
      ? Math.min(Math.max(parsed, 1), MAX_LOG_LIMIT)
      : DEFAULT_LOG_LIMIT;

    const email = normaliseEmail(req.query.email);

    const attempts = await loginSecurity.recentAttempts(
      email ? { limit, email } : { limit }
    );

    const rows = Array.isArray(attempts) ? attempts.map(presentAttempt) : [];

    return res.status(200).json({
      count: rows.length,
      limit,
      email: email || null,
      note: LOCATION_NOTE,
      attempts: rows,
    });
  } catch (err) {
    console.error("adminSecurity /login-log:", err.message || err);
    // The detail stays in the server log. Echoing err.message can leak schema,
    // duplicate-key values or connection strings to the browser.
    return res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------------------------------------------------ *
 * GET /locks
 * ------------------------------------------------------------------ */

router.get("/locks", authMiddleware, async (req, res) => {
  try {
    const locks = await loginSecurity.activeLocks();

    const rows = (Array.isArray(locks) ? locks : []).map((lock) => {
      const { geo, label } = describe(lock || {});
      return {
        email: lock.email || "",
        ipHash: lock.ipHash || "",
        failures: typeof lock.failures === "number" ? lock.failures : null,
        until: lock.until || null,
        minutesLeft: typeof lock.minutesLeft === "number" ? lock.minutesLeft : null,
        approximateLocation: label,
        country: geo.country,
        countryName: geo.countryName,
        region: geo.region,
        city: geo.city,
        lastAttemptAt: lock.lastAttemptAt || lock.createdAt || null,
      };
    });

    return res.status(200).json({
      count: rows.length,
      note: LOCATION_NOTE,
      locks: rows,
    });
  } catch (err) {
    console.error("adminSecurity /locks:", err.message || err);
    // The detail stays in the server log. Echoing err.message can leak schema,
    // duplicate-key values or connection strings to the browser.
    return res.status(500).json({ message: "Server error" });
  }
});

/* ------------------------------------------------------------------ *
 * POST /unlock
 * ------------------------------------------------------------------ */

router.post("/unlock", authMiddleware, async (req, res) => {
  try {
    const { email, ipHash } = req.body || {};
    const target = normaliseEmail(email);

    if (!target) {
      return res.status(400).json({ message: "An email is required to unlock." });
    }

    // ipHash is optional: omit it to clear every locked location for the email.
    // Anything that is not a clean hash is treated as "not supplied" rather
    // than passed through to the query.
    const scope = cleanIpHash(ipHash);

    const result = await loginSecurity.clearLock({
      email: target,
      ipHash: scope || undefined,
    });

    const cleared = (result && Number(result.cleared)) || 0;

    return res.status(200).json({
      message: scope
        ? "Lock cleared. Sign-in is available again from that location."
        : "Lock cleared. Sign-in is available again from every location for this account.",
      email: target,
      ipHash: scope || null,
      cleared,
    });
  } catch (err) {
    console.error("adminSecurity /unlock:", err.message || err);
    // The detail stays in the server log. Echoing err.message can leak schema,
    // duplicate-key values or connection strings to the browser.
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
