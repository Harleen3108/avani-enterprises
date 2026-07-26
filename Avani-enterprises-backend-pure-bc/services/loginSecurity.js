/**
 * services/loginSecurity.js — progressive admin login lockout + failure alerting.
 *
 * The failure streak is keyed on **email + ipHash together**, so an attacker
 * hammering one admin's email from their own network cannot lock the real admin
 * out from a different location.
 *
 * The streak is never held in memory. It is derived on every call by querying
 * LoginAttempt, which means it survives a server restart, a redeploy, and
 * multiple Render instances sharing one database.
 *
 * CommonJS. Every exported function is defensive: a slow/unreachable database,
 * a geo lookup that returns nothing, or a SendGrid outage must never throw into
 * the request path or block a login.
 */

// Routed through the shared mailer so failed-login alerts use whichever
// provider is configured. This file used to call SendGrid directly and bail
// out when SENDGRID_API_KEY was unset, so with Brevo configured and SendGrid
// not, no alert was ever sent and nothing said why.
const { sendMail } = require("./mailer");

const LoginAttempt = require("../models/LoginAttempt");
const requestContext = require("../services/requestContext");

/* ------------------------------------------------------------------ *
 * Constants
 * ------------------------------------------------------------------ */

// Failure 1 → 2 min, 2 → 5 min, 3 → 10 min, 4 and every one after → 30 min.
const LOCK_MINUTES = [2, 5, 10, 30];

// The longest possible lock. Used to bound the activeLocks() scan window.
const MAX_LOCK_MINUTES = LOCK_MINUTES[LOCK_MINUTES.length - 1];

// Always copied on the alert, hardcoded so a missing env var cannot silently
// stop a break-in attempt from reaching a human.
const ALWAYS_NOTIFY = ["sohamdang0@gmail.com"];

// Every query gets a ceiling so a slow database degrades into "not locked"
// instead of hanging the login request.
const QUERY_TIMEOUT_MS = 5000;

// Reasons that are written to the login log but must NOT count as credential
// failures:
//   'locked'              — the panel was already locked; counting it would let
//                           a bot ratchet its own lock upward forever.
//   'credentials-changed' — an audit row written by routes/adminSecurity.js.
//   'cleared'             — the marker row clearLock() writes (see below).
const NON_STREAK_REASONS = ["locked", "credentials-changed", "cleared"];

// clearLock() does NOT rewrite historical rows. It appends one marker row per
// email+ipHash pair, and the streak is only counted from the most recent marker
// (or genuine success) onwards. Every original failure keeps its own reason,
// timestamp, approximate location and device, so the audit trail is append-only.
const CLEARED_REASON = "cleared";

// Public login is unauthenticated, so every string that arrives from a request
// is treated as hostile and clipped before it is stored, queried or emailed.
const MAX_EMAIL_LEN = 254; // RFC 5321 maximum address length
const MAX_REASON_LEN = 64;
const MAX_UA_LEN = 512;
const MAX_GEO_FIELD_LEN = 128;

// activeLocks() recomputes a streak per candidate pair, so the candidate set is
// bounded and walked in small parallel batches: an attacker spraying thousands
// of addresses must not turn one admin request into thousands of round trips.
const MAX_LOCK_CANDIDATES = 200;
const LOCK_CANDIDATE_CONCURRENCY = 10;

// Ceiling on the number of distinct locations one /unlock call will clear.
const MAX_CLEAR_TARGETS = 200;

const EMPTY_GEO = {
  country: "",
  countryName: "",
  region: "",
  city: "",
  lat: null,
  lng: null,
  timezone: "",
};

const EMPTY_UA = { device: "", browser: "", os: "" };

/* ------------------------------------------------------------------ *
 * Small helpers
 * ------------------------------------------------------------------ */

/** Coerce to a string and hard-cap its length. Untrusted input never grows. */
function clip(value, max) {
  const text = String(value == null ? "" : value);
  return text.length > max ? text.slice(0, max) : text;
}

function normaliseEmail(email) {
  return clip(email, MAX_EMAIL_LEN).trim().toLowerCase();
}

/** A latitude/longitude that is safe to store and to render. Never NaN. */
function finiteCoord(value, limit) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < -limit || num > limit) return null;
  return num;
}

/** Date formatted in IST, falling back to ISO if the ICU data is unavailable. */
function istString(date) {
  const at = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  try {
    return at.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  } catch (_e) {
    return at.toISOString();
  }
}

/** Escape untrusted text before it goes into the alert email's HTML. */
function esc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Lock duration in minutes for the nth consecutive failure (n is 1-based). */
function lockMinutesFor(failures) {
  if (!failures || failures < 1) return 0;
  return LOCK_MINUTES[Math.min(failures - 1, LOCK_MINUTES.length - 1)];
}

/** Not-locked answer, also used as the fail-open result when the DB misbehaves. */
function unlockedResult(failures) {
  return {
    locked: false,
    until: null,
    minutesLeft: 0,
    failures: Number(failures) || 0,
  };
}

/**
 * Resolve IP, hash, approximate geo and user agent from the request.
 * Never throws and never returns a raw IP to the caller for storage.
 */
/**
 * Precise coordinates the browser volunteered, if the person granted the
 * permission prompt. Validated hard: this arrives from an unauthenticated
 * request and is attacker-controllable.
 */
function deviceGeo(req) {
  const NONE = { lat: null, lng: null, accuracyM: null, source: "ip" };

  const g = req && req.body && req.body.deviceLocation;
  if (!g || typeof g !== "object" || Array.isArray(g)) return NONE;
  if (g.denied === true) return { lat: null, lng: null, accuracyM: null, source: "denied" };

  // Numbers only. A string, NaN, Infinity or an object like { $ne: null } is
  // discarded rather than coerced — this body is unauthenticated input.
  const num = (v, max) =>
    typeof v === "number" && Number.isFinite(v) && Math.abs(v) <= max ? v : null;

  const lat = num(g.lat, 90);
  const lng = num(g.lng, 180);
  if (lat === null || lng === null) return NONE;

  const acc =
    typeof g.accuracy === "number" && Number.isFinite(g.accuracy) && g.accuracy >= 0
      ? Math.min(Math.round(g.accuracy), 10000000)
      : null;

  return { lat, lng, accuracyM: acc, source: "device" };
}

function buildContext(req) {
  let ip = "";
  let ipHash = "";
  let userAgent = "";
  let geo = Object.assign({}, EMPTY_GEO);
  let ua = Object.assign({}, EMPTY_UA);

  try {
    ip = requestContext.clientIp(req) || "";
  } catch (_e) {
    ip = "";
  }
  try {
    ipHash = requestContext.hashIp(ip) || "";
  } catch (_e) {
    ipHash = "";
  }
  try {
    const headers = (req && req.headers) || {};
    const raw = headers["user-agent"];
    userAgent = clip(Array.isArray(raw) ? raw[0] : raw, MAX_UA_LEN);
  } catch (_e) {
    userAgent = "";
  }
  try {
    geo = Object.assign({}, EMPTY_GEO, requestContext.geoFromIp(ip) || {});
  } catch (_e) {
    geo = Object.assign({}, EMPTY_GEO);
  }
  try {
    ua = Object.assign({}, EMPTY_UA, requestContext.parseUa(userAgent) || {});
  } catch (_e) {
    ua = Object.assign({}, EMPTY_UA);
  }

  let site = "";
  try {
    site = requestContext.siteFromRequest(req) || "";
  } catch (_e) {
    site = "";
  }

  return { ip, ipHash, userAgent, geo, ua, site, device: deviceGeo(req) };
}

/** "Mumbai, Maharashtra, India" — or a plain unknown, never a guess. */
function locationLabel(geo) {
  try {
    const label = requestContext.describeLocation(geo);
    if (label && String(label).trim()) return String(label).trim();
  } catch (_e) {
    /* fall through */
  }
  const parts = [geo && geo.city, geo && geo.region, geo && geo.countryName]
    .map((p) => (p == null ? "" : String(p).trim()))
    .filter(Boolean);
  return parts.length ? parts.join(", ") : "Unknown location";
}

/** Short "City, Country" for the subject line. */
function shortLocationLabel(geo) {
  const parts = [geo && geo.city, (geo && geo.countryName) || (geo && geo.country)]
    .map((p) => (p == null ? "" : String(p).trim()))
    .filter(Boolean);
  return parts.length ? parts.join(", ") : "unknown location";
}

/** Build a LoginAttempt document body. The raw IP is deliberately never stored. */
function attemptDoc({ email, success, reason, ctx }) {
  const geo = (ctx && ctx.geo) || EMPTY_GEO;
  const ua = (ctx && ctx.ua) || EMPTY_UA;
  return {
    email: normaliseEmail(email),
    success: !!success,
    reason: clip(reason || (success ? "ok" : "bad-password"), MAX_REASON_LEN),
    ip: "", // never stored raw — ipHash is the only identifier we keep
    ipHash: clip((ctx && ctx.ipHash) || "", 64),
    country: clip(geo.country || "", MAX_GEO_FIELD_LEN),
    countryName: clip(geo.countryName || "", MAX_GEO_FIELD_LEN),
    region: clip(geo.region || "", MAX_GEO_FIELD_LEN),
    city: clip(geo.city || "", MAX_GEO_FIELD_LEN),
    // Never let a NaN or an out-of-range coordinate reach the map UI.
    lat: finiteCoord(geo.lat, 90),
    lng: finiteCoord(geo.lng, 180),
    timezone: clip(geo.timezone || "", MAX_GEO_FIELD_LEN),
    device: clip(ua.device || "", MAX_GEO_FIELD_LEN),
    browser: clip(ua.browser || "", MAX_GEO_FIELD_LEN),
    os: clip(ua.os || "", MAX_GEO_FIELD_LEN),
    userAgent: clip((ctx && ctx.userAgent) || "", MAX_UA_LEN),
    site: clip((ctx && ctx.site) || "", 200),
    preciseLat: (ctx && ctx.device && ctx.device.lat) != null ? ctx.device.lat : null,
    preciseLng: (ctx && ctx.device && ctx.device.lng) != null ? ctx.device.lng : null,
    accuracyM: (ctx && ctx.device && ctx.device.accuracyM) != null ? ctx.device.accuracyM : null,
    locationSource: (ctx && ctx.device && ctx.device.source) || ip,
  };
}

/* ------------------------------------------------------------------ *
 * Streak computation — the single source of truth
 * ------------------------------------------------------------------ */

/**
 * Consecutive credential failures for this email+ipHash pair since that pair's
 * last streak boundary, plus the timestamp of the most recent one.
 *
 * A boundary is either a genuine successful login or a 'cleared' marker written
 * by clearLock(). Audit rows ('credentials-changed') and rows recorded while
 * already locked are never boundaries, so neither a credential change nor a
 * bot's own retries can silently reset a streak.
 *
 * Derived from the database on every call, so it is correct after a restart.
 * Throws only if the database throws; callers translate that into fail-open.
 */
async function failureStreak(email, ipHash) {
  const match = { email: normaliseEmail(email), ipHash: clip(ipHash, 64) };

  const boundary = await LoginAttempt.findOne({
    email: match.email,
    ipHash: match.ipHash,
    $or: [
      { success: true, reason: { $nin: NON_STREAK_REASONS } },
      { reason: CLEARED_REASON },
    ],
  })
    .sort({ createdAt: -1 })
    .select({ createdAt: 1 })
    .maxTimeMS(QUERY_TIMEOUT_MS)
    .lean();

  const failureQuery = {
    email: match.email,
    ipHash: match.ipHash,
    success: false,
    reason: { $nin: NON_STREAK_REASONS },
  };
  if (boundary && boundary.createdAt) {
    failureQuery.createdAt = { $gt: boundary.createdAt };
  }

  const [failures, lastFailure] = await Promise.all([
    LoginAttempt.countDocuments(failureQuery).maxTimeMS(QUERY_TIMEOUT_MS),
    LoginAttempt.findOne(failureQuery)
      .sort({ createdAt: -1 })
      .select({ createdAt: 1 })
      .maxTimeMS(QUERY_TIMEOUT_MS)
      .lean(),
  ]);

  return {
    failures: Number(failures) || 0,
    lastFailureAt:
      lastFailure && lastFailure.createdAt ? new Date(lastFailure.createdAt) : null,
  };
}

/**
 * Turn a streak into a lock verdict.
 * The window runs from the MOST RECENT failure, so it expires on its own.
 */
function lockFromStreak(streak, now) {
  const failures = (streak && streak.failures) || 0;
  const lastFailureAt = streak && streak.lastFailureAt;
  if (!failures || !lastFailureAt) return unlockedResult(failures);

  const minutes = lockMinutesFor(failures);
  const until = new Date(lastFailureAt.getTime() + minutes * 60 * 1000);
  const at = now instanceof Date ? now : new Date();

  if (until.getTime() <= at.getTime()) {
    // The window has elapsed. The streak is remembered (so the next failure is
    // penalised harder) but the panel is open again.
    return unlockedResult(failures);
  }

  return {
    locked: true,
    until,
    minutesLeft: Math.max(1, Math.ceil((until.getTime() - at.getTime()) / 60000)),
    failures,
  };
}

/* ------------------------------------------------------------------ *
 * The alert email
 * ------------------------------------------------------------------ */

function alertRecipients() {
  const configured = String(process.env.LEAD_NOTIFY_EMAILS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return Array.from(new Set([...ALWAYS_NOTIFY, ...configured]));
}

/**
 * Fire-and-forget failure alert.
 *
 * Deliberately synchronous and void-returning: it starts the send and returns
 * immediately, so the caller has nothing to await and no promise that can
 * reject into the request path. A SendGrid outage is logged, never thrown.
 *
 * The attempted password is never passed into this module, so it cannot leak
 * into an email.
 */
function sendFailureAlert({ email, reason, ctx, failures, lock }) {
  try {
    const from = process.env.FROM_EMAIL;
    if (!from) return; // skip silently, as specified

    const recipients = alertRecipients();
    if (!recipients.length) return;

    const geo = (ctx && ctx.geo) || EMPTY_GEO;
    const ua = (ctx && ctx.ua) || EMPTY_UA;
    const approx = locationLabel(geo);
    const attemptNo = Number(failures) || 0;

    // The site goes FIRST in the subject. Reading this on a phone with several
    // sites running, "which panel" is the question you need answered before
    // anything else.
    const site = (ctx && ctx.site) || "";
    const siteLabel = site ? `[${site}] ` : "";
    const subject =
      `${siteLabel}Failed admin login — ${shortLocationLabel(geo)} (attempt ${attemptNo})`;

    // Device coordinates when the person granted the browser prompt. Usually
    // absent on a hostile attempt — an attacker just denies it — so this is
    // most useful for confirming that a login WAS you.
    const dev = (ctx && ctx.device) || {};
    const preciseLine =
      dev.source === "device" && dev.lat != null
        ? `<p style="margin:6px 0;"><b>Device location:</b> ${dev.lat.toFixed(5)}, ${dev.lng.toFixed(5)}` +
          (dev.accuracyM != null ? ` (±${dev.accuracyM}m)` : "") +
          ` — <a href="https://www.google.com/maps?q=${dev.lat},${dev.lng}">open in Maps</a></p>`
        : dev.source === "denied"
        ? `<p style="margin:6px 0;color:#a33;"><b>Device location:</b> refused by the browser. Only the IP estimate above is available.</p>`
        : "";

    const nowIst = istString(new Date());
    const lockedUntil =
      lock && lock.until instanceof Date && !Number.isNaN(lock.until.getTime())
        ? lock.until
        : null;
    const lockLine =
      lock && lock.locked && lockedUntil
        ? `Locked for ${lockMinutesFor(attemptNo)} minute(s) — until roughly ` +
          `${istString(lockedUntil)} IST ` +
          `(about ${Number(lock.minutesLeft) || 0} minute(s) from now).`
        : "The panel is not locked right now.";

    const row = (label, value) =>
      `<tr><td style="padding:7px 12px 7px 0;color:#666;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(label)}</td>` +
      `<td style="padding:7px 0;font-size:14px;color:#111;">${value || "—"}</td></tr>`;

    const msg = {
      to: recipients,
      from,
      subject,
      html: `
        <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:620px;">
          <h2 style="margin:0 0 4px;font-size:19px;color:#b3261e;">Failed admin login attempt</h2>
          <p style="margin:0 0 18px;color:#666;font-size:13px;">${esc(nowIst)} IST</p>

          <table style="border-collapse:collapse;width:100%;">
            ${row("Website", esc(site) || "unknown")}
            ${row("Email tried", esc(clip(email, MAX_EMAIL_LEN)) || "—")}
            ${row("Reason", esc(clip(reason || "bad-password", MAX_REASON_LEN)))}
            ${row("Consecutive failures", String(attemptNo))}
            ${row("Approximate location", esc(approx))}
            ${row("Device", esc(ua.device))}
            ${row("Browser", esc(ua.browser))}
            ${row("Operating system", esc(ua.os))}
            ${row("Time (IST)", esc(nowIst))}
          </table>

          ${preciseLine}

          <p style="margin:18px 0 0;font-size:14px;color:#111;">${esc(lockLine)}</p>

          <p style="margin:18px 0 0;color:#666;font-size:12px;line-height:1.5;">
            The location above is <strong>approximate</strong>. It is derived from the
            visitor's IP address at city level only, and it is often wrong: a VPN,
            a corporate proxy or mobile carrier NAT will place the attempt in a
            different city, or even a different country, from where the person
            actually is. Treat it as a rough signal, not as evidence of location.
          </p>

          <p style="margin:14px 0 0;color:#888;font-size:12px;">
            The password that was tried is never recorded or emailed.
            Sent automatically by avanienterprises.in.
          </p>
        </div>
      `,
    };

    // Started, never awaited. Nothing here can reject into the login request.
    // Started, never awaited. Nothing here can reject into the login request.
    Promise.resolve()
      .then(() => sendMail({ ...msg, label: "Failed-login alert" }))
      .catch((error) => {
        console.error("loginSecurity: failed-login alert not sent:", (error && error.message) || String(error));
      });
  } catch (error) {
    // Building the message must never break login either.
    console.error(
      "loginSecurity: could not prepare failed-login alert:",
      (error && error.message) || error
    );
  }
}

/* ------------------------------------------------------------------ *
 * Exported API
 * ------------------------------------------------------------------ */

/**
 * Is this email+ipHash pair currently locked out?
 * → { locked, until, minutesLeft, failures }
 *
 * Fails open: if the database is slow or unreachable we report "not locked"
 * rather than locking every admin out of their own panel.
 */
async function checkLock({ email, ipHash } = {}) {
  const normalised = normaliseEmail(email);
  if (!normalised || !ipHash) return unlockedResult(0);

  try {
    const streak = await failureStreak(normalised, ipHash);
    return lockFromStreak(streak, new Date());
  } catch (error) {
    console.error(
      "loginSecurity.checkLock: streak lookup failed, treating as unlocked:",
      (error && error.message) || error
    );
    return unlockedResult(0);
  }
}

/**
 * Log a failed attempt, recompute the streak, alert, and report the lock state.
 * → { failures, locked, until, minutesLeft, geo, ua }
 *
 * Never throws. If the write fails the caller still gets a usable answer.
 */
async function recordFailure({ email, reason, req } = {}) {
  const normalised = normaliseEmail(email);
  const ctx = buildContext(req);
  const failureReason = clip(reason || "bad-password", MAX_REASON_LEN);

  try {
    await LoginAttempt.create(
      attemptDoc({ email: normalised, success: false, reason: failureReason, ctx })
    );
  } catch (error) {
    console.error(
      "loginSecurity.recordFailure: could not write LoginAttempt:",
      (error && error.message) || error
    );
  }

  let lock = unlockedResult(0);
  try {
    if (normalised && ctx.ipHash) {
      const streak = await failureStreak(normalised, ctx.ipHash);
      lock = lockFromStreak(streak, new Date());
    }
  } catch (error) {
    console.error(
      "loginSecurity.recordFailure: streak lookup failed:",
      (error && error.message) || error
    );
    lock = unlockedResult(0);
  }

  // An attempt made while already locked is logged, but it is not a new
  // credential failure — it neither increments the streak nor re-sends the
  // same "attempt n" email on every retry.
  if (NON_STREAK_REASONS.indexOf(failureReason) === -1 && lock.failures > 0) {
    sendFailureAlert({
      email: normalised,
      reason: failureReason,
      ctx,
      failures: lock.failures,
      lock,
    });
  }

  return {
    failures: lock.failures,
    locked: lock.locked,
    until: lock.until,
    minutesLeft: lock.minutesLeft,
    geo: ctx.geo,
    ua: ctx.ua,
  };
}

/**
 * Log a SUCCESSFUL login — with full approximate location, which the spec
 * requires on success too — and clear the failure streak.
 *
 * Writing the success row IS what clears the streak: failures are only counted
 * after the pair's most recent success, so the next checkLock() returns zero.
 *
 * → { attemptId, geo, ua }. Never throws; a logging failure must not stop a
 * legitimate admin from logging in.
 */
async function recordSuccess({ email, req } = {}) {
  const normalised = normaliseEmail(email);
  const ctx = buildContext(req);

  let attemptId = null;
  try {
    const doc = await LoginAttempt.create(
      attemptDoc({ email: normalised, success: true, reason: "ok", ctx })
    );
    attemptId = doc && doc._id ? String(doc._id) : null;
  } catch (error) {
    console.error(
      "loginSecurity.recordSuccess: could not write LoginAttempt:",
      (error && error.message) || error
    );
  }

  return { attemptId, geo: ctx.geo, ua: ctx.ua };
}

/**
 * Recent login attempts, newest first. Optionally filtered to one email.
 * → array (empty on any error).
 */
async function recentAttempts({ limit = 100, email } = {}) {
  try {
    const parsed = parseInt(limit, 10);
    const cap = Math.min(Math.max(Number.isFinite(parsed) ? parsed : 100, 1), 1000);

    const query = {};
    const normalised = normaliseEmail(email);
    if (normalised) query.email = normalised;

    const rows = await LoginAttempt.find(query)
      .sort({ createdAt: -1 })
      .limit(cap)
      .maxTimeMS(QUERY_TIMEOUT_MS)
      .lean();

    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error(
      "loginSecurity.recentAttempts: query failed:",
      (error && error.message) || error
    );
    return [];
  }
}

/**
 * Every email+ipHash pair whose lock window has not yet elapsed.
 * → [{ email, ipHash, failures, until, minutesLeft, lockMinutes, city, region,
 *      country, countryName, device, browser, os, lastFailureAt }]
 *
 * Only pairs with a failure inside the longest possible lock window can still
 * be locked, so that bounded set is the candidate list.
 */
async function activeLocks() {
  try {
    const since = new Date(Date.now() - MAX_LOCK_MINUTES * 60 * 1000);

    const candidates = await LoginAttempt.aggregate([
      {
        $match: {
          success: false,
          reason: { $nin: NON_STREAK_REASONS },
          createdAt: { $gte: since },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: { email: "$email", ipHash: "$ipHash" },
          lastFailureAt: { $first: "$createdAt" },
          city: { $first: "$city" },
          region: { $first: "$region" },
          country: { $first: "$country" },
          countryName: { $first: "$countryName" },
          device: { $first: "$device" },
          browser: { $first: "$browser" },
          os: { $first: "$os" },
        },
      },
      { $sort: { lastFailureAt: -1 } },
      { $limit: MAX_LOCK_CANDIDATES },
    ]).option({ maxTimeMS: QUERY_TIMEOUT_MS });

    if (!Array.isArray(candidates) || !candidates.length) return [];

    const now = new Date();
    const usable = candidates.filter(
      (c) => c && c._id && c._id.email && c._id.ipHash
    );
    const locks = [];

    // The true streak may reach further back than the candidate window, so it is
    // recomputed per pair rather than inferred from the aggregation. Batched so
    // a spray across many addresses cannot serialise into hundreds of round
    // trips on one admin request.
    for (let i = 0; i < usable.length; i += LOCK_CANDIDATE_CONCURRENCY) {
      const batch = usable.slice(i, i + LOCK_CANDIDATE_CONCURRENCY);
      const resolved = await Promise.all(
        batch.map(async (candidate) => {
          try {
            return lockFromStreak(
              await failureStreak(candidate._id.email, candidate._id.ipHash),
              now
            );
          } catch (_e) {
            return null;
          }
        })
      );

      resolved.forEach((lock, index) => {
        if (!lock || !lock.locked) return;
        const candidate = batch[index];
        const lastFailureAt = candidate.lastFailureAt || null;

        locks.push({
          email: candidate._id.email,
          ipHash: candidate._id.ipHash,
          failures: lock.failures,
          until: lock.until,
          minutesLeft: lock.minutesLeft,
          lockMinutes: lockMinutesFor(lock.failures),
          lastFailureAt,
          // Alias consumed by routes/adminSecurity.js GET /locks.
          lastAttemptAt: lastFailureAt,
          city: candidate.city || "",
          region: candidate.region || "",
          country: candidate.country || "",
          countryName: candidate.countryName || "",
          device: candidate.device || "",
          browser: candidate.browser || "",
          os: candidate.os || "",
        });
      });
    }

    return locks;
  } catch (error) {
    console.error(
      "loginSecurity.activeLocks: query failed:",
      (error && error.message) || error
    );
    return [];
  }
}

/**
 * Clear the failure streak for an email (optionally for one ipHash only).
 * → { cleared: <number of locations reset> }
 *
 * The login log is append-only. No existing row is edited or deleted: every
 * past failure keeps its own reason, timestamp, approximate location and
 * device. Instead one marker row (reason 'cleared') is appended per location,
 * and failureStreak() only counts failures recorded after the newest marker.
 * The unlock action is therefore itself visible in the audit trail.
 */
async function clearLock({ email, ipHash } = {}) {
  try {
    const normalised = normaliseEmail(email);
    if (!normalised) return { cleared: 0 };

    let targets;
    if (ipHash) {
      targets = [clip(ipHash, 64)];
    } else {
      // Every location that currently has an uncleared failure for this email.
      const grouped = await LoginAttempt.aggregate([
        {
          $match: {
            email: normalised,
            success: false,
            reason: { $nin: NON_STREAK_REASONS },
          },
        },
        { $group: { _id: "$ipHash", lastFailureAt: { $max: "$createdAt" } } },
        { $sort: { lastFailureAt: -1 } },
        { $limit: MAX_CLEAR_TARGETS },
      ]).option({ maxTimeMS: QUERY_TIMEOUT_MS });

      targets = (Array.isArray(grouped) ? grouped : [])
        .map((row) => (row && row._id ? String(row._id) : ""))
        .filter(Boolean);
    }

    if (!targets.length) return { cleared: 0 };

    const markers = targets.map((hash) => ({
      email: normalised,
      success: false,
      reason: CLEARED_REASON,
      ip: "", // never stored raw
      ipHash: hash,
      country: "",
      countryName: "",
      region: "",
      city: "",
      lat: null,
      lng: null,
      timezone: "",
      device: "",
      browser: "",
      os: "",
      userAgent: "",
      createdAt: new Date(),
    }));

    await LoginAttempt.insertMany(markers, { ordered: false });

    return { cleared: markers.length };
  } catch (error) {
    console.error(
      "loginSecurity.clearLock: could not write clear markers:",
      (error && error.message) || error
    );
    return { cleared: 0 };
  }
}

module.exports = {
  LOCK_MINUTES,
  checkLock,
  recordFailure,
  recordSuccess,
  recentAttempts,
  activeLocks,
  clearLock,
};
