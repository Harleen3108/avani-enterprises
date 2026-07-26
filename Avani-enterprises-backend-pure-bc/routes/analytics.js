// routes/analytics.js — public, unauthenticated first-party analytics collector.
// Mounted at /api/analytics (wiring happens in index.js, not here).
//
// Section 7 of INTEGRATION-SPEC.md:
//   POST /track     -> {} for staff and bots, { id } otherwise
//   POST /duration  -> { id, durationMs, maxScroll }, must survive sendBeacon
//   POST /exclude   -> { visitorId }, marks every doc for that visitor excluded
//
// Three standing rules drive most of the defensive code below:
//   1. Every byte of input is attacker-controlled. Nothing is stored unvalidated
//      and nothing is stored uncapped. Non-string values are coerced to '' so a
//      payload can never smuggle a Mongo operator object into a query.
//   2. This endpoint must never return 5xx. A browser (and sendBeacon in
//      particular) retries on failure, so an outage here would turn into a
//      self-inflicted request flood. Failures are logged server-side and
//      answered with 200 {}.
//   3. Nothing is invented. A pageview with no usable path is dropped rather
//      than stored under a made-up one.

const express = require("express");
const mongoose = require("mongoose");

const SiteVisit = require("../models/SiteVisit");
const requestContext = require("../services/requestContext");
const analyticsClassify = require("../services/analyticsClassify");

const router = express.Router();

/* ------------------------------------------------------------------ *
 * Limits
 * ------------------------------------------------------------------ */

// A tab left open in the background must not be able to poison averages, so
// a single pageview can never claim more than 30 minutes of attention.
const MAX_DURATION_MS = 30 * 60 * 1000;

// Per-field storage caps. Anything longer is truncated, never rejected — a
// truncated title is better telemetry than a dropped pageview.
const LIMITS = {
  visitorId: 64,
  sessionId: 64,
  path: 512,
  landingPage: 512,
  title: 300,
  referrer: 1024,
  referrerDomain: 253,
  source: 20,
  searchEngine: 40,
  searchQuery: 200,
  aiAssistant: 40,
  utm: 150,
  clickId: 255,
  userAgent: 512,
  country: 8,
  countryName: 80,
  region: 100,
  city: 120,
  timezone: 64,
  device: 20,
  browser: 60,
  os: 60,
};

const SOURCES = ["direct", "organic", "social", "referral", "ai"];
const DEVICES = ["desktop", "mobile", "tablet"];

/* ------------------------------------------------------------------ *
 * Abuse ceiling
 * ------------------------------------------------------------------ *
 * These three routes are public and each one writes to the database, so a
 * single script can otherwise fill the collection for free. A generous
 * per-hashed-IP ceiling keeps that bounded without ever being reachable by a
 * real visitor. Over the ceiling the request is answered 200 {} exactly like a
 * success — analytics failing closed must look like nothing to the site.
 *
 * Memory is bounded on purpose: expired buckets are swept lazily (no timer, so
 * this never holds the event loop open) and, in the worst case, the whole map
 * is dropped rather than allowed to grow.
 */

const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX_PER_WINDOW = 240;
const RATE_MAX_KEYS = 20000;

const rateBuckets = new Map();

function sweepRateBuckets(now) {
  for (const [key, bucket] of rateBuckets) {
    if (now - bucket.start >= RATE_WINDOW_MS) rateBuckets.delete(key);
  }
  // Still oversized => a distributed flood. Drop everything: losing counters is
  // strictly better than unbounded memory in a web process.
  if (rateBuckets.size > RATE_MAX_KEYS) rateBuckets.clear();
}

function overRateLimit(key) {
  if (!key) return false;

  const now = Date.now();
  let bucket = rateBuckets.get(key);

  if (!bucket || now - bucket.start >= RATE_WINDOW_MS) {
    bucket = { start: now, count: 0 };
    rateBuckets.set(key, bucket);
  }

  bucket.count += 1;

  if (rateBuckets.size > RATE_MAX_KEYS) sweepRateBuckets(now);

  return bucket.count > RATE_MAX_PER_WINDOW;
}

/* ------------------------------------------------------------------ *
 * Input helpers
 * ------------------------------------------------------------------ */

// C0 control characters + DEL. Built from a string so this source file stays
// plain ASCII. Stripped from every value so a payload cannot forge log lines or
// smuggle terminal escapes into the admin UI.
const CONTROL_CHARS = new RegExp("[\u0000-\u001F\u007F]+", "g");

// Coerce to a clean, length-capped string. Control characters are stripped so
// a payload cannot forge log lines or smuggle terminal escapes into the admin
// UI. Anything that is not a string or a finite number becomes '' — that is
// also what keeps `{ $ne: null }` style objects out of every query below.
function str(value, max) {
  if (value === null || value === undefined) return "";
  if (typeof value === "number" && Number.isFinite(value)) value = String(value);
  if (typeof value !== "string") return "";
  const cleaned = value.replace(CONTROL_CHARS, " ").trim();
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

// visitorId / sessionId are opaque client-generated tokens. They are echoed
// back into the admin UI and used as aggregation keys, so only the alphabet the
// tracker actually emits is kept; everything else is stripped rather than
// rejected, so a slightly odd id still counts as a visit.
function idToken(value, max) {
  const cleaned = str(value, max).replace(/[^A-Za-z0-9_-]/g, "");
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

// Page paths come from the client and end up rendered in the dashboard.
// Normalise a full URL down to its path, force a single leading slash, and drop
// the fragment — so "//evil.com" or "https://evil.com/x" can never be stored in
// a form that would render as an off-site link.
function pathToken(value, max) {
  let raw = str(value, max);
  if (!raw) return "";

  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      raw = `${url.pathname}${url.search}`;
    } catch (err) {
      // Not parseable after all; fall through and treat it as a plain string.
    }
  }

  const hash = raw.indexOf("#");
  if (hash !== -1) raw = raw.slice(0, hash);

  raw = raw.replace(/\s+/g, "");
  if (!raw) return "";

  raw = raw.replace(/^\/+/, "");
  return str(`/${raw}`, max);
}

// Numbers arrive as strings often enough to be worth coercing, but never
// outside the clamp. NaN / Infinity return null so no non-finite number can
// reach the database or the dashboard.
function clampNumber(value, min, max) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function finiteOrUndefined(value) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function oneOf(value, allowed, fallback) {
  return allowed.indexOf(value) !== -1 ? value : fallback;
}

/* ------------------------------------------------------------------ *
 * Body parsing
 * ------------------------------------------------------------------ */

// navigator.sendBeacon can only send text/plain without triggering a CORS
// preflight that an unloading page would never complete, so the duration beacon
// arrives as text/plain and express.json() ignores it. This router therefore
// carries its own parser instead of depending on the app-level wiring:
// body-parser marks a request it has parsed with `_body`, so when index.js has
// already handled the body this is a no-op and the request is never read twice.
const beaconBodyParser = express.text({ type: () => true, limit: "16kb" });

function parseBeaconBody(req, res, next) {
  if (req._body || (req.body !== undefined && req.body !== null)) return next();

  let done = false;
  const once = () => {
    if (done) return;
    done = true;
    next();
  };

  try {
    // An oversized or unreadable body is not an error worth failing on — the
    // handlers below treat a missing body as an empty one.
    beaconBodyParser(req, res, once);
  } catch (err) {
    once();
  }
}

// The parsed body can be an object, a string or a Buffer depending on which
// parser claimed the request. Normalise all three into a plain object;
// anything unparseable becomes {}.
function readBody(req) {
  let body = req.body;

  if (Buffer.isBuffer(body)) body = body.toString("utf8");

  if (typeof body === "string") {
    const trimmed = body.trim();
    if (!trimmed) return {};
    try {
      body = JSON.parse(trimmed);
    } catch (err) {
      return {};
    }
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) return {};
  return body;
}

// Staff must never appear in public stats. The tracker on the public site
// sends no Authorization header at all, so any credential on this request means
// a signed-in staff member's browser (or tooling) is calling it — the pageview
// is dropped without being stored.
//
// Presence is deliberately enough: verifying the token would silently start
// counting staff again the moment a token expired or JWT_SECRET was rotated,
// and this endpoint has nothing to authorise, so a stale token is still a
// perfectly good "this is not an anonymous visitor" signal. It is never an
// error either — a public page must not receive a 401 from analytics.
function isAuthenticatedRequest(req) {
  try {
    const header = req.get("authorization") || "";
    if (typeof header !== "string") return false;

    const credential = header.replace(/^Bearer\s+/i, "").trim();
    return credential.length > 0;
  } catch (err) {
    return false;
  }
}

// Host used to tell "came from our own pages" apart from a real referral.
// Prefers explicit config, then the browser's Origin (the public site itself),
// then the API host as a last resort.
function resolveSelfHost(req) {
  const candidates = [
    process.env.SITE_HOST,
    process.env.PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.FRONTEND_URL,
    req.get("origin"),
    req.get("referer"),
    req.get("host"),
  ];

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "string") continue;
    const value = candidate.trim().slice(0, 512);
    if (!value) continue;
    try {
      return new URL(value.includes("://") ? value : `https://${value}`).hostname;
    } catch (err) {
      // Not a parseable host; try the next candidate.
    }
  }
  return "";
}

/* ------------------------------------------------------------------ *
 * POST /track
 * ------------------------------------------------------------------ */

router.post("/track", parseBeaconBody, async (req, res) => {
  try {
    // Logged-in staff: acknowledge and store nothing.
    if (isAuthenticatedRequest(req)) return res.json({});

    const payload = readBody(req);

    const userAgent = str(req.get("user-agent"), LIMITS.userAgent);
    const isBot = !!requestContext.isBot(userAgent);

    const ip = requestContext.clientIp(req);
    const ipHash = str(requestContext.hashIp(ip), 64);

    if (overRateLimit(`t:${ipHash}`)) return res.json({});

    // A pageview with no path cannot be reported on, and the request path
    // ("/api/analytics/track") is not a page anybody visited. Dropping is the
    // honest answer; inventing a path would put a fake row in the page tables.
    const path = pathToken(payload.path, LIMITS.path);
    if (!path) return res.json({});

    const geo = requestContext.geoFromIp(ip) || {};
    const ua = requestContext.parseUa(userAgent) || {};

    const referrer = str(payload.referrer, LIMITS.referrer);
    const selfHost = resolveSelfHost(req);

    // Source classification is derived server-side from the referrer — the
    // client does not get to declare where it came from.
    const classified = analyticsClassify.classifyReferrer(referrer, selfHost) || {};

    const visitorId = idToken(payload.visitorId, LIMITS.visitorId);
    const sessionId = idToken(payload.sessionId, LIMITS.sessionId);

    // One query answers both questions: a visitor is new when this collection
    // holds nothing for that visitorId yet, and an opt-out recorded by
    // POST /exclude must keep applying to everything that visitor does next
    // (they may have opted out from another tab or after clearing storage).
    // With no visitorId we cannot make either claim, so we do not.
    let isNewVisitor = false;
    let excluded = false;
    if (visitorId) {
      const prior = await SiteVisit.findOne({ visitorId })
        .select({ excluded: 1 })
        .sort({ createdAt: -1 })
        .lean();
      isNewVisitor = !prior;
      excluded = !!(prior && prior.excluded);
    }

    const doc = await SiteVisit.create({
      visitorId,
      sessionId,

      path,
      title: str(payload.title, LIMITS.title),
      referrer,
      referrerDomain: str(classified.referrerDomain, LIMITS.referrerDomain),

      source: oneOf(str(classified.source, LIMITS.source), SOURCES, "direct"),
      searchEngine: str(classified.searchEngine, LIMITS.searchEngine),
      searchQuery: str(classified.searchQuery, LIMITS.searchQuery),
      aiAssistant: str(classified.aiAssistant, LIMITS.aiAssistant),

      utmSource: str(payload.utmSource, LIMITS.utm),
      utmMedium: str(payload.utmMedium, LIMITS.utm),
      utmCampaign: str(payload.utmCampaign, LIMITS.utm),
      utmContent: str(payload.utmContent, LIMITS.utm),
      utmTerm: str(payload.utmTerm, LIMITS.utm),
      gclid: str(payload.gclid, LIMITS.clickId),
      fbclid: str(payload.fbclid, LIMITS.clickId),

      // First path of the session, per the client. Falls back to the path we
      // just resolved when the client did not send one.
      landingPage: pathToken(payload.landingPage, LIMITS.landingPage) || path,

      // Approximate, city-level, IP-derived. Empty rather than guessed when
      // geoip-lite has no answer.
      country: str(geo.country, LIMITS.country),
      countryName: str(geo.countryName, LIMITS.countryName),
      region: str(geo.region, LIMITS.region),
      city: str(geo.city, LIMITS.city),
      lat: finiteOrUndefined(geo.lat),
      lng: finiteOrUndefined(geo.lng),
      timezone: str(geo.timezone, LIMITS.timezone),

      // parseUa already normalises to desktop|mobile|tablet; the whitelist is a
      // guard. An unrecognised value is stored empty (unknown) rather than
      // being rounded up to "desktop", which would invent a device stat.
      device: oneOf(str(ua.device, LIMITS.device), DEVICES, ""),
      browser: str(ua.browser, LIMITS.browser),
      os: str(ua.os, LIMITS.os),
      userAgent,
      ipHash, // raw IP is never stored

      isNewVisitor,
      durationMs: 0,
      maxScroll: 0,
      isBot,
      excluded,
    });

    // Bots are recorded for completeness but get no id back, so the client
    // never follows up with a duration beacon for them.
    if (isBot) return res.json({});

    return res.json({ id: String(doc._id) });
  } catch (err) {
    // 200 on purpose: analytics must never be able to break, block or get
    // retried by the site it measures. Only the message is logged — request
    // bodies are visitor data and have no business in the server log.
    console.error("[analytics] /track failed:", err && err.message ? err.message : err);
    return res.json({});
  }
});

/* ------------------------------------------------------------------ *
 * POST /duration
 * ------------------------------------------------------------------ */

router.post("/duration", parseBeaconBody, async (req, res) => {
  try {
    const ipHash = str(requestContext.hashIp(requestContext.clientIp(req)), 64);
    if (overRateLimit(`d:${ipHash}`)) return res.json({});

    const payload = readBody(req);

    const id = str(payload.id, 64);
    if (!id || !mongoose.Types.ObjectId.isValid(id)) return res.json({});

    const durationMs = clampNumber(payload.durationMs, 0, MAX_DURATION_MS);
    const maxScroll = clampNumber(payload.maxScroll, 0, 100);

    const update = {};
    if (durationMs !== null) update.durationMs = durationMs;
    if (maxScroll !== null) update.maxScroll = maxScroll;
    if (!Object.keys(update).length) return res.json({});

    // $max, not $set: visibilitychange and pagehide both fire in practice, and
    // the second beacon is often the smaller one. Keep the high-water mark.
    await SiteVisit.updateOne({ _id: id }, { $max: update });

    return res.json({});
  } catch (err) {
    console.error("[analytics] /duration failed:", err && err.message ? err.message : err);
    return res.json({});
  }
});

/* ------------------------------------------------------------------ *
 * POST /exclude
 * ------------------------------------------------------------------ */

router.post("/exclude", parseBeaconBody, async (req, res) => {
  try {
    const ipHash = str(requestContext.hashIp(requestContext.clientIp(req)), 64);
    if (overRateLimit(`e:${ipHash}`)) return res.json({ ok: true });

    const payload = readBody(req);
    const visitorId = idToken(payload.visitorId, LIMITS.visitorId);
    if (!visitorId) return res.json({ ok: true });

    await SiteVisit.updateMany({ visitorId }, { $set: { excluded: true } });

    // No count is returned: this route is public, and reporting how many visits
    // a given visitorId has would turn it into a lookup oracle.
    return res.json({ ok: true });
  } catch (err) {
    console.error("[analytics] /exclude failed:", err && err.message ? err.message : err);
    return res.json({ ok: true });
  }
});

module.exports = router;
