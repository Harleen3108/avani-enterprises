// routes/analyticsDashboard.js
//
// Section 8 of INTEGRATION-SPEC.md — the read side of first-party analytics.
// Mounted at /api/analytics behind authMiddleware. Exports a router only;
// index.js is wired separately.
//
// Everything below is computed with MongoDB aggregation pipelines. Nothing
// pulls a collection into Node and counts it there — the only JS-side work is
// stitching already-aggregated buckets (tens of rows) together.
//
// Two things to keep in mind while reading:
//   1. Every SiteVisit pipeline filters { excluded: { $ne: true }, isBot: { $ne: true } }.
//      Staff-excluded visitors and bots never reach a number the UI shows.
//   2. Geography comes from geoip-lite, which is city-level and approximate.
//      A VPN or a mobile carrier NAT will place a visitor in the wrong city
//      entirely. Insight strings say "approximate" for that reason.

const express = require("express");
const router = express.Router();

const SiteVisit = require("../models/SiteVisit");
const Form = require("../models/Form");
const AvaniForm = require("../models/AvaniForm");

// The spec names middleware/authMiddleware; this repo currently ships
// middleware/auth.js. Accept either so mounting cannot fail on a filename.
// Resolution is done with require.resolve so that only a MISSING file falls
// through — an error thrown from inside the middleware module itself must
// propagate rather than being mistaken for "file not found" and silently
// swapped for the other one.
let authPath;
try {
  authPath = require.resolve("../middleware/authMiddleware");
} catch (e) {
  authPath = require.resolve("../middleware/auth");
}
const authMiddleware = require(authPath);

// Fail at load time, loudly. A non-function here would either crash Express
// with a confusing message or — worse in some setups — leave the dashboard
// reachable without a token.
if (typeof authMiddleware !== "function") {
  throw new Error(
    "routes/analyticsDashboard: auth middleware did not resolve to a function; " +
      "refusing to expose the analytics dashboard unauthenticated"
  );
}

// ---------------------------------------------------------------------------
// Tunables
// ---------------------------------------------------------------------------

const DEFAULT_RANGE_DAYS = 30;
// Not a contract figure — a local guard so one hand-typed query cannot ask the
// database to scan an unbounded history. SiteVisit documents expire after a
// year anyway, so two years is already more than can exist.
const MAX_RANGE_DAYS = 730;
// Longest query-string value parseDate will look at. The route is behind auth,
// but a date parameter has no legitimate reason to be longer than this.
const MAX_QUERY_LEN = 64;
const REALTIME_WINDOW_MS = 5 * 60 * 1000;
const ENGAGED_SESSION_MS = 10000; // a session is "engaged" at 2+ views or 10s+
const DAY_MS = 86400000;

const TOP_PAGES = 200;
const TOP_ROWS = 100;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const EMPTY = [null, ""];

/** First element of a $facet branch that ends in $count, or 0. */
function facetCount(branch) {
  if (!Array.isArray(branch) || !branch.length || !branch[0]) return 0;
  return num(branch[0].n);
}

/** First document of a $facet branch, or an empty object. */
function facetOne(branch) {
  return Array.isArray(branch) && branch.length && branch[0] ? branch[0] : {};
}

function num(v) {
  return typeof v === "number" && isFinite(v) ? v : 0;
}

/** Ratio guarded against divide-by-zero. Returns 0 when the denominator is 0. */
function ratio(top, bottom, decimals) {
  const b = num(bottom);
  if (b <= 0) return 0;
  const d = typeof decimals === "number" ? decimals : 4;
  const f = Math.pow(10, d);
  return Math.round((num(top) / b) * f) / f;
}

/**
 * Percentage on a 0-100 scale, two decimals, divide-by-zero safe.
 *
 * UNIT CONVENTION for the whole payload: every `pct`, `conversionRate` and
 * `bounceRate` is a PERCENTAGE (15 means 15%), never a 0-1 fraction. Mixing
 * the two inside one response is how a 15% conversion rate ends up rendered
 * as "0.15%". Rounding happens after the multiply so the JSON carries 15, not
 * 15.000000000000002.
 */
function pct(part, whole) {
  const w = num(whole);
  if (w <= 0) return 0;
  return Math.round((num(part) / w) * 10000) / 100;
}

/**
 * "12.3%" — formatting only, never a source of new information. Runs through
 * num() so a NaN or Infinity can never be rendered into a sentence.
 */
function fmtPct(value, decimals) {
  const d = typeof decimals === "number" ? decimals : 1;
  return `${num(value).toFixed(d)}%`;
}

function fmtNum(n) {
  return Number(num(n)).toLocaleString("en-IN");
}

function fmtDuration(ms) {
  const total = Math.round(num(ms) / 1000);
  if (total < 60) return `${total}s`;
  const m = Math.floor(total / 60);
  const s = total % 60;
  return s ? `${m}m ${s}s` : `${m}m`;
}

/**
 * Parse a query date. Bare YYYY-MM-DD is anchored in UTC so the same query
 * returns the same buckets regardless of where the server happens to run.
 *
 * Every exit path returns either a VALID Date or null. "2026-13-45" matches
 * the YYYY-MM-DD shape but is not a real date; letting it through produced an
 * Invalid Date, which turned `days` into NaN and made Mongo reject the $match
 * outright. Repeat query params arrive as arrays, so String() first.
 */
function parseDate(value, endOfDay) {
  if (value === null || value === undefined) return null;
  const s = String(value).trim().slice(0, MAX_QUERY_LEN);
  if (!s) return null;
  const d = /^\d{4}-\d{2}-\d{2}$/.test(s)
    ? new Date(`${s}T${endOfDay ? "23:59:59.999" : "00:00:00.000"}Z`)
    : new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

/** Hostname of a referrer URL, lowercased, www stripped. '' when unparseable. */
function hostOf(url) {
  if (!url) return "";
  const s = String(url).trim();
  if (!s) return "";
  try {
    return new URL(s).hostname.replace(/^www\./i, "").toLowerCase();
  } catch (e) {
    return s
      .replace(/^[a-z]+:\/\//i, "")
      .split("/")[0]
      .split("?")[0]
      .replace(/^www\./i, "")
      .toLowerCase();
  }
}

/** $dateTrunc spec for the requested granularity. */
function bucketExpr(unit) {
  const spec = { date: "$createdAt", unit, binSize: 1 };
  if (unit === "week") spec.startOfWeek = "monday";
  return { $dateTrunc: spec };
}

// ---------------------------------------------------------------------------
// Reusable pipeline fragments
// ---------------------------------------------------------------------------

/** The filter every SiteVisit pipeline starts from. */
function visitMatch(from, to) {
  return {
    excluded: { $ne: true },
    isBot: { $ne: true },
    createdAt: { $gte: from, $lte: to },
  };
}

/**
 * pageViews / uniqueVisitors / sessions for one window, as $facet branches.
 * Distinct counts are done with $group + $count rather than $addToSet so the
 * server never materialises a million-element array to take its length.
 */
function totalsBranches() {
  return {
    pageViews: [{ $count: "n" }],
    uniqueVisitors: [
      { $match: { visitorId: { $nin: EMPTY } } },
      { $group: { _id: "$visitorId" } },
      { $count: "n" },
    ],
    sessions: [
      { $match: { sessionId: { $nin: EMPTY } } },
      { $group: { _id: "$sessionId" } },
      { $count: "n" },
    ],
  };
}

/**
 * Unique visitors per value of `field`. Two-stage grouping — {field, visitorId}
 * then field — so distinctness costs a group key, not an in-memory set.
 */
function visitorsByField(field, limit) {
  return [
    { $match: { [field]: { $nin: EMPTY }, visitorId: { $nin: EMPTY } } },
    { $group: { _id: { k: `$${field}`, v: "$visitorId" } } },
    { $group: { _id: "$_id.k", visitors: { $sum: 1 } } },
    { $sort: { visitors: -1, _id: 1 } },
    { $limit: limit || TOP_ROWS },
  ];
}

// ---------------------------------------------------------------------------
// GET /dashboard
// ---------------------------------------------------------------------------

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    // --- range ------------------------------------------------------------
    const now = new Date();
    let to = parseDate(req.query.to, true) || now;
    let from =
      parseDate(req.query.from, false) ||
      new Date(to.getTime() - DEFAULT_RANGE_DAYS * DAY_MS);

    if (from.getTime() > to.getTime()) {
      const swap = from;
      from = to;
      to = swap;
    }
    // Cap at 2 years. Trim the start, not the end — the recent data is the
    // data the operator asked to see.
    if (to.getTime() - from.getTime() > MAX_RANGE_DAYS * DAY_MS) {
      from = new Date(to.getTime() - MAX_RANGE_DAYS * DAY_MS);
    }

    const granularity = ["day", "week", "month"].includes(req.query.granularity)
      ? req.query.granularity
      : "day";

    const spanMs = to.getTime() - from.getTime();
    const days = Math.max(1, Math.ceil(spanMs / DAY_MS));

    // The equal-length window immediately before `from`.
    const prevTo = new Date(from.getTime() - 1);
    const prevFrom = new Date(prevTo.getTime() - spanMs);

    const match = visitMatch(from, to);
    const prevMatch = visitMatch(prevFrom, prevTo);

    const leadRange = { $gte: from, $lte: to };
    const prevLeadRange = { $gte: prevFrom, $lte: prevTo };

    // --- pipelines --------------------------------------------------------

    // 1. Everything that is a pageview-level breakdown, in one pass.
    const mainPipeline = [
      { $match: match },
      {
        $facet: Object.assign(totalsBranches(), {
          // New vs returning: a visitor is new if any pageview of theirs in
          // this window was flagged isNewVisitor by the tracker.
          newVisitors: [
            { $match: { visitorId: { $nin: EMPTY } } },
            {
              $group: {
                _id: "$visitorId",
                isNew: { $max: { $cond: [{ $eq: ["$isNewVisitor", true] }, 1, 0] } },
              },
            },
            { $group: { _id: null, newVisitors: { $sum: "$isNew" }, total: { $sum: 1 } } },
          ],

          timeseries: [
            {
              $group: {
                _id: { b: bucketExpr(granularity), v: "$visitorId" },
                pageViews: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: "$_id.b",
                pageViews: { $sum: "$pageViews" },
                // Pageviews that carried no visitorId are still pageviews, but
                // they are not a person. Counting that one blank-id group as a
                // visitor inflated every bucket by one.
                visitors: { $sum: { $cond: [{ $in: ["$_id.v", EMPTY] }, 0, 1] } },
              },
            },
            { $sort: { _id: 1 } },
          ],

          sources: [
            { $match: { visitorId: { $nin: EMPTY } } },
            {
              $group: {
                _id: {
                  k: { $cond: [{ $in: ["$source", EMPTY] }, "direct", "$source"] },
                  v: "$visitorId",
                },
              },
            },
            { $group: { _id: "$_id.k", visitors: { $sum: 1 } } },
            { $sort: { visitors: -1, _id: 1 } },
          ],

          searchEngines: visitorsByField("searchEngine", 50),
          searchTerms: visitorsByField("searchQuery", 50),

          ai: [
            { $match: { aiAssistant: { $nin: EMPTY }, visitorId: { $nin: EMPTY } } },
            {
              $group: {
                _id: { k: "$aiAssistant", v: "$visitorId" },
                domains: { $addToSet: "$referrerDomain" },
              },
            },
            {
              $group: {
                _id: "$_id.k",
                visitors: { $sum: 1 },
                domainSets: { $addToSet: "$domains" },
              },
            },
            {
              $project: {
                visitors: 1,
                domains: {
                  $reduce: {
                    input: "$domainSets",
                    initialValue: [],
                    in: { $setUnion: ["$$value", "$$this"] },
                  },
                },
              },
            },
            { $sort: { visitors: -1, _id: 1 } },
            { $limit: 50 },
          ],

          countries: [
            { $match: { country: { $nin: EMPTY }, visitorId: { $nin: EMPTY } } },
            {
              $group: {
                _id: { k: "$country", v: "$visitorId" },
                name: { $first: "$countryName" },
                lat: { $avg: "$lat" },
                lng: { $avg: "$lng" },
              },
            },
            {
              $group: {
                _id: "$_id.k",
                name: { $first: "$name" },
                visitors: { $sum: 1 },
                lat: { $avg: "$lat" },
                lng: { $avg: "$lng" },
              },
            },
            { $sort: { visitors: -1, _id: 1 } },
            { $limit: 250 },
          ],

          regions: [
            { $match: { region: { $nin: EMPTY }, visitorId: { $nin: EMPTY } } },
            {
              $group: {
                _id: { r: "$region", c: "$countryName", cc: "$country", v: "$visitorId" },
              },
            },
            {
              $group: {
                _id: { r: "$_id.r", c: "$_id.c", cc: "$_id.cc" },
                visitors: { $sum: 1 },
              },
            },
            { $sort: { visitors: -1, "_id.r": 1, "_id.cc": 1 } },
            { $limit: TOP_ROWS },
          ],

          cities: [
            { $match: { city: { $nin: EMPTY }, visitorId: { $nin: EMPTY } } },
            {
              $group: {
                _id: {
                  ci: "$city",
                  r: "$region",
                  c: "$countryName",
                  cc: "$country",
                  v: "$visitorId",
                },
                lat: { $avg: "$lat" },
                lng: { $avg: "$lng" },
              },
            },
            {
              $group: {
                _id: { ci: "$_id.ci", r: "$_id.r", c: "$_id.c", cc: "$_id.cc" },
                visitors: { $sum: 1 },
                lat: { $avg: "$lat" },
                lng: { $avg: "$lng" },
              },
            },
            { $sort: { visitors: -1, "_id.ci": 1, "_id.cc": 1 } },
            { $limit: 250 },
          ],

          // Averages for time and scroll are taken over the pageviews that
          // actually reported a value. The duration beacon does not always
          // fire, and averaging over every row would silently drag the number
          // toward zero.
          pages: [
            { $match: { path: { $nin: EMPTY } } },
            {
              $group: {
                _id: { p: "$path", v: "$visitorId" },
                views: { $sum: 1 },
                timeSum: { $sum: "$durationMs" },
                timed: { $sum: { $cond: [{ $gt: ["$durationMs", 0] }, 1, 0] } },
                scrollSum: { $sum: "$maxScroll" },
                scrolled: { $sum: { $cond: [{ $gt: ["$maxScroll", 0] }, 1, 0] } },
              },
            },
            {
              $group: {
                _id: "$_id.p",
                views: { $sum: "$views" },
                unique: { $sum: 1 },
                timeSum: { $sum: "$timeSum" },
                timed: { $sum: "$timed" },
                scrollSum: { $sum: "$scrollSum" },
                scrolled: { $sum: "$scrolled" },
              },
            },
            { $sort: { views: -1, _id: 1 } },
            { $limit: TOP_PAGES },
          ],

          devices: visitorsByField("device", 20),
          browsers: visitorsByField("browser", 30),
          os: visitorsByField("os", 30),
        }),
      },
    ];

    // 2. Session-level metrics. One sort by (sessionId, createdAt) collapses
    //    each session to its first and last pageview, which is where
    //    entrances, exits, bounce rate and session duration all come from.
    const sessionPipeline = [
      { $match: Object.assign({}, match, { sessionId: { $nin: EMPTY } }) },
      { $sort: { sessionId: 1, createdAt: 1 } },
      {
        $group: {
          _id: "$sessionId",
          views: { $sum: 1 },
          duration: { $sum: "$durationMs" },
          firstPath: { $first: "$path" },
          lastPath: { $last: "$path" },
          landing: { $first: "$landingPage" },
        },
      },
      {
        $addFields: {
          // The tracker writes landingPage, but fall back to the first
          // pageview of the session rather than dropping the row.
          landingPath: {
            $cond: [{ $in: ["$landing", EMPTY] }, "$firstPath", "$landing"],
          },
        },
      },
      {
        $facet: {
          totals: [
            {
              $group: {
                _id: null,
                sessions: { $sum: 1 },
                bounced: { $sum: { $cond: [{ $eq: ["$views", 1] }, 1, 0] } },
                views: { $sum: "$views" },
                duration: { $sum: "$duration" },
                engaged: {
                  $sum: {
                    $cond: [
                      {
                        $or: [
                          { $gt: ["$views", 1] },
                          { $gte: ["$duration", ENGAGED_SESSION_MS] },
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
              },
            },
          ],
          entrances: [
            { $match: { firstPath: { $nin: EMPTY } } },
            { $group: { _id: "$firstPath", n: { $sum: 1 } } },
            { $sort: { n: -1, _id: 1 } },
            { $limit: TOP_PAGES },
          ],
          exits: [
            { $match: { lastPath: { $nin: EMPTY } } },
            { $group: { _id: "$lastPath", n: { $sum: 1 } } },
            { $sort: { n: -1, _id: 1 } },
            { $limit: TOP_PAGES },
          ],
          landingPages: [
            { $match: { landingPath: { $nin: EMPTY } } },
            { $group: { _id: "$landingPath", n: { $sum: 1 } } },
            { $sort: { n: -1, _id: 1 } },
            { $limit: TOP_PAGES },
          ],
        },
      },
    ];

    // 3. Previous window — executive keys only.
    const prevPipeline = [{ $match: prevMatch }, { $facet: totalsBranches() }];

    // 4. Realtime. Deliberately not bounded by the requested range.
    const realtimePipeline = [
      {
        $match: {
          excluded: { $ne: true },
          isBot: { $ne: true },
          visitorId: { $nin: EMPTY },
          createdAt: { $gte: new Date(now.getTime() - REALTIME_WINDOW_MS) },
        },
      },
      { $group: { _id: "$visitorId" } },
      { $count: "n" },
    ];

    // 5. Leads. Non-spam only, both collections. Both carry pagePath and
    //    referrer, so both contribute to attribution as well as to the count —
    //    otherwise leadAttribution would silently total less than
    //    executive.leads and look like leads had gone missing.
    //
    //    Form also carries landingPage (first-touch, captured on the visitor's
    //    entry page). The contract names the attribution key `landingPage`, so
    //    that is what is credited when present; pagePath is the fallback for
    //    rows written before first-touch capture existed.
    const formPipeline = [
      {
        $match: {
          isSpam: { $ne: true },
          createdAt: { $gte: prevFrom, $lte: to },
        },
      },
      {
        $facet: {
          current: [{ $match: { createdAt: leadRange } }, { $count: "n" }],
          previous: [{ $match: { createdAt: prevLeadRange } }, { $count: "n" }],
          byPath: [
            { $match: { createdAt: leadRange } },
            {
              $addFields: {
                attrPath: {
                  $cond: [{ $in: ["$landingPage", EMPTY] }, "$pagePath", "$landingPage"],
                },
              },
            },
            { $match: { attrPath: { $nin: EMPTY } } },
            { $group: { _id: "$attrPath", n: { $sum: 1 } } },
            { $sort: { n: -1, _id: 1 } },
            { $limit: TOP_PAGES },
          ],
          byReferrer: [
            { $match: { createdAt: leadRange, referrer: { $nin: EMPTY } } },
            { $group: { _id: "$referrer", n: { $sum: 1 } } },
            { $limit: 500 },
          ],
        },
      },
    ];

    const avaniFormPipeline = [
      {
        $match: {
          isSpam: { $ne: true },
          createdAt: { $gte: prevFrom, $lte: to },
        },
      },
      {
        $facet: {
          current: [{ $match: { createdAt: leadRange } }, { $count: "n" }],
          previous: [{ $match: { createdAt: prevLeadRange } }, { $count: "n" }],
          byPath: [
            { $match: { createdAt: leadRange, pagePath: { $nin: EMPTY } } },
            { $group: { _id: "$pagePath", n: { $sum: 1 } } },
            { $sort: { n: -1, _id: 1 } },
            { $limit: TOP_PAGES },
          ],
          byReferrer: [
            { $match: { createdAt: leadRange, referrer: { $nin: EMPTY } } },
            { $group: { _id: "$referrer", n: { $sum: 1 } } },
            { $limit: 500 },
          ],
        },
      },
    ];

    // allSettled, not all: a failure in one of the supporting collections
    // (say AvaniForm is empty on a fresh deploy, or the realtime query times
    // out) should degrade that panel, not blank the whole dashboard. Every
    // promise is handed to allSettled, so no rejection is left unhandled.
    const opts = { allowDiskUse: true };
    const settled = await Promise.allSettled([
      SiteVisit.aggregate(mainPipeline).option(opts).exec(),
      SiteVisit.aggregate(sessionPipeline).option(opts).exec(),
      SiteVisit.aggregate(prevPipeline).option(opts).exec(),
      SiteVisit.aggregate(realtimePipeline).option(opts).exec(),
      Form.aggregate(formPipeline).option(opts).exec(),
      AvaniForm.aggregate(avaniFormPipeline).option(opts).exec(),
    ]);

    const PART_NAMES = [
      "traffic breakdowns",
      "session metrics",
      "previous-window comparison",
      "realtime visitors",
      "lead figures",
      "enquiry-form lead figures",
    ];

    // What could not be computed. This is carried into `insights` verbatim —
    // a zero produced by a failed query must never be presented as a measured
    // zero.
    const degraded = [];
    const results = settled.map((s, i) => {
      if (s.status === "fulfilled") return s.value;
      console.error(
        `[analyticsDashboard] ${PART_NAMES[i]} aggregation failed:`,
        s.reason && s.reason.message ? s.reason.message : s.reason
      );
      degraded.push(PART_NAMES[i]);
      return [];
    });

    // The first three ARE the dashboard. Without them there is no honest page
    // to render, so fail rather than serve zeroes that read as "no traffic".
    if (
      settled[0].status !== "fulfilled" ||
      settled[1].status !== "fulfilled" ||
      settled[2].status !== "fulfilled"
    ) {
      return res.status(500).json({ message: "Error building analytics dashboard" });
    }

    const [mainRes, sessionRes, prevRes, realtimeRes, formRes, avaniRes] = results;

    const main = mainRes[0] || {};
    const sess = sessionRes[0] || {};
    const prev = prevRes[0] || {};
    const forms = formRes[0] || {};
    const avani = avaniRes[0] || {};

    // --- shape the response ----------------------------------------------

    const sessionTotals = facetOne(sess.totals);
    const sessions = num(sessionTotals.sessions);
    const pageViews = facetCount(main.pageViews);
    const uniqueVisitors = facetCount(main.uniqueVisitors);

    const leads = facetCount(forms.current) + facetCount(avani.current);
    const prevLeads = facetCount(forms.previous) + facetCount(avani.previous);

    const executive = {
      uniqueVisitors,
      pageViews,
      sessions,
      leads,
      conversionRate: pct(leads, uniqueVisitors),
    };

    const prevVisitors = facetCount(prev.uniqueVisitors);
    const previous = {
      uniqueVisitors: prevVisitors,
      pageViews: facetCount(prev.pageViews),
      sessions: facetCount(prev.sessions),
      leads: prevLeads,
      conversionRate: pct(prevLeads, prevVisitors),
    };

    const newVis = facetOne(main.newVisitors);
    const newVisitors = num(newVis.newVisitors);
    const behaviour = {
      newVisitors,
      returningVisitors: Math.max(0, num(newVis.total) - newVisitors),
      bounceRate: pct(sessionTotals.bounced, sessions),
      pagesPerSession: ratio(sessionTotals.views, sessions, 2),
      avgSessionDurationMs: Math.round(ratio(sessionTotals.duration, sessions, 0)),
      engagedSessions: num(sessionTotals.engaged),
    };

    const timeseries = (main.timeseries || []).map((r) => ({
      bucket: r._id,
      visitors: num(r.visitors),
      pageViews: num(r.pageViews),
    }));

    const sourceRows = main.sources || [];
    const sourceVisitorTotal = sourceRows.reduce((a, r) => a + num(r.visitors), 0);
    const sources = sourceRows.map((r) => ({
      source: r._id,
      visitors: num(r.visitors),
      // Share of source-attributed visitors. A visitor seen under two sources
      // in the window counts in both, so this is normalised against the sum of
      // the rows rather than against uniqueVisitors.
      pct: pct(r.visitors, sourceVisitorTotal),
    }));

    const searchEngines = (main.searchEngines || []).map((r) => ({
      engine: r._id,
      visitors: num(r.visitors),
    }));

    const searchTerms = (main.searchTerms || []).map((r) => ({
      term: r._id,
      visitors: num(r.visitors),
    }));

    // Leads for an AI assistant: form submissions whose stored referrer host
    // matches a referrer domain actually observed for that assistant. No
    // guessing — if a lead's referrer was not captured, it is not attributed.
    const leadsByHost = new Map();
    for (const row of (forms.byReferrer || []).concat(avani.byReferrer || [])) {
      if (!row) continue;
      const host = hostOf(row._id);
      if (!host) continue;
      leadsByHost.set(host, (leadsByHost.get(host) || 0) + num(row.n));
    }
    const ai = (main.ai || []).map((r) => {
      const domains = (r.domains || [])
        .map((d) => String(d || "").replace(/^www\./i, "").toLowerCase())
        .filter(Boolean);
      let assistantLeads = 0;
      for (const [host, count] of leadsByHost) {
        const hit = domains.some(
          (d) => host === d || host.endsWith(`.${d}`) || d.endsWith(`.${host}`)
        );
        if (hit) assistantLeads += count;
      }
      return { assistant: r._id, visitors: num(r.visitors), leads: assistantLeads };
    });

    const geo = {
      countries: (main.countries || []).map((r) => ({
        code: r._id,
        name: r.name || "",
        visitors: num(r.visitors),
        lat: typeof r.lat === "number" ? r.lat : null,
        lng: typeof r.lng === "number" ? r.lng : null,
      })),
      regions: (main.regions || []).map((r) => ({
        region: r._id.r,
        country: r._id.c || r._id.cc || "",
        visitors: num(r.visitors),
      })),
      cities: (main.cities || []).map((r) => ({
        city: r._id.ci,
        region: r._id.r || "",
        country: r._id.c || r._id.cc || "",
        visitors: num(r.visitors),
        lat: typeof r.lat === "number" ? r.lat : null,
        lng: typeof r.lng === "number" ? r.lng : null,
      })),
    };

    const entranceMap = new Map(
      (sess.entrances || []).map((r) => [r._id, num(r.n)])
    );
    const exitMap = new Map((sess.exits || []).map((r) => [r._id, num(r.n)]));

    const pages = (main.pages || []).map((r) => ({
      path: r._id,
      views: num(r.views),
      unique: num(r.unique),
      avgTimeMs: Math.round(ratio(r.timeSum, r.timed, 0)),
      avgScroll: Math.round(ratio(r.scrollSum, r.scrolled, 0)),
      entrances: entranceMap.get(r._id) || 0,
      exits: exitMap.get(r._id) || 0,
    }));

    const landingPages = (sess.landingPages || []).map((r) => ({
      path: r._id,
      sessions: num(r.n),
    }));

    const exitPages = (sess.exits || []).map((r) => ({
      path: r._id,
      exits: num(r.n),
    }));

    // Lead attribution: first-touch landing page where the form recorded one,
    // the submission page otherwise, matched against unique visitors to that
    // same path. Both lead collections feed it, so the leads here reconcile
    // with executive.leads for every submission that recorded a page.
    const uniqueByPath = new Map(pages.map((p) => [p.path, p.unique]));
    const leadPathTotals = new Map();
    for (const row of (forms.byPath || []).concat(avani.byPath || [])) {
      if (!row || !row._id) continue;
      const key = String(row._id);
      leadPathTotals.set(key, (leadPathTotals.get(key) || 0) + num(row.n));
    }
    const leadAttribution = Array.from(leadPathTotals, ([landingPage, leadCount]) => {
      const visitors = uniqueByPath.get(landingPage) || 0;
      return {
        landingPage,
        leads: leadCount,
        visitors,
        conversionRate: pct(leadCount, visitors),
      };
    })
      .sort((a, b) => b.leads - a.leads || a.landingPage.localeCompare(b.landingPage))
      .slice(0, TOP_PAGES);

    const devices = (main.devices || []).map((r) => ({
      device: r._id,
      visitors: num(r.visitors),
    }));
    const browsers = (main.browsers || []).map((r) => ({
      browser: r._id,
      visitors: num(r.visitors),
    }));
    const os = (main.os || []).map((r) => ({
      os: r._id,
      visitors: num(r.visitors),
    }));

    const realtime = { online: facetCount(realtimeRes) };

    const payload = {
      range: { from, to, days, granularity },
      executive,
      previous,
      behaviour,
      timeseries,
      sources,
      searchEngines,
      searchTerms,
      ai,
      geo,
      pages,
      landingPages,
      exitPages,
      leadAttribution,
      devices,
      browsers,
      os,
      realtime,
      insights: [],
    };

    payload.insights = buildInsights(payload, degraded);

    res.json(payload);
  } catch (err) {
    // Logged in full server-side; the client gets a flat message. Driver and
    // cast errors quote the failing query back at you, and that is not
    // something to hand to a browser.
    console.error("[analyticsDashboard] GET /dashboard failed:", err);
    res.status(500).json({ message: "Error building analytics dashboard" });
  }
});

// ---------------------------------------------------------------------------
// Insights
//
// Every sentence below is generated from a number already present in `d`.
// Where a metric is zero or a list is empty, the sentence says so outright
// instead of being dropped — an operator staring at an empty dashboard needs
// to be told it is empty, not left to guess whether tracking is broken.
// ---------------------------------------------------------------------------

function buildInsights(d, degraded) {
  const out = [];
  const ex = d.executive;
  const prev = d.previous;
  const b = d.behaviour;

  // Anything that failed to aggregate is said out loud, first. The zeroes
  // below would otherwise read as measurements.
  if (Array.isArray(degraded) && degraded.length) {
    out.push(
      `${degraded.join(" and ")} could not be calculated for this range because the query failed. Any related figure below is shown as zero and should not be read as a measurement — check the server log.`
    );
  }

  // Volume
  if (ex.pageViews === 0) {
    out.push(
      `No pageviews were recorded between ${d.range.from.toISOString().slice(0, 10)} and ${d.range.to
        .toISOString()
        .slice(0, 10)}. Either there was no traffic in this range, or the site tracker is not reporting.`
    );
  } else {
    out.push(
      `${fmtNum(ex.uniqueVisitors)} unique visitors generated ${fmtNum(
        ex.pageViews
      )} pageviews across ${fmtNum(ex.sessions)} sessions over ${d.range.days} day${
        d.range.days === 1 ? "" : "s"
      }.`
    );
  }

  // Change vs the previous equal-length window
  if (prev.uniqueVisitors === 0 && ex.uniqueVisitors === 0) {
    out.push("There were no visitors in this range or in the preceding one of the same length.");
  } else if (prev.uniqueVisitors === 0) {
    out.push(
      `The preceding ${d.range.days}-day window recorded no visitors, so there is no baseline to compare this range against.`
    );
  } else {
    const change = ((ex.uniqueVisitors - prev.uniqueVisitors) / prev.uniqueVisitors) * 100;
    const dir = change > 0 ? "up" : change < 0 ? "down" : "unchanged";
    out.push(
      change === 0
        ? `Unique visitors are unchanged against the preceding ${d.range.days}-day window (${fmtNum(
            prev.uniqueVisitors
          )}).`
        : `Unique visitors are ${dir} ${fmtPct(Math.abs(change))} against the preceding ${
            d.range.days
          }-day window (${fmtNum(prev.uniqueVisitors)} → ${fmtNum(ex.uniqueVisitors)}).`
    );
  }

  // Engagement
  if (ex.sessions === 0) {
    out.push("No sessions were recorded, so bounce rate and session duration cannot be calculated.");
  } else {
    out.push(
      `${fmtPct(b.bounceRate)} of sessions ended after a single pageview, and the average session covered ${b.pagesPerSession} pages in ${fmtDuration(
        b.avgSessionDurationMs
      )}. ${fmtNum(b.engagedSessions)} of ${fmtNum(
        ex.sessions
      )} sessions were engaged (two or more pageviews, or at least ten seconds of recorded time).`
    );
    out.push(
      `${fmtNum(b.newVisitors)} visitors were new and ${fmtNum(
        b.returningVisitors
      )} were returning.`
    );
  }

  // Leads
  if (ex.leads === 0) {
    out.push(
      "No non-spam form submissions were recorded in this range, so the conversion rate is zero."
    );
  } else if (ex.uniqueVisitors === 0) {
    out.push(
      `${fmtNum(ex.leads)} non-spam form submissions were recorded, but no visitors were tracked in this range, so a conversion rate cannot be calculated.`
    );
  } else {
    out.push(
      `${fmtNum(ex.leads)} non-spam form submissions came in, a conversion rate of ${fmtPct(
        ex.conversionRate,
        2
      )} of unique visitors.`
    );
    if (prev.leads > 0) {
      const lc = ((ex.leads - prev.leads) / prev.leads) * 100;
      out.push(
        lc === 0
          ? `Lead volume matches the preceding ${d.range.days}-day window (${fmtNum(prev.leads)}).`
          : `Lead volume is ${lc > 0 ? "up" : "down"} ${fmtPct(Math.abs(lc))} against the preceding ${
              d.range.days
            }-day window (${fmtNum(prev.leads)} → ${fmtNum(ex.leads)}).`
      );
    } else {
      out.push(
        `The preceding ${d.range.days}-day window recorded no leads, so there is nothing to compare lead volume against.`
      );
    }
  }

  // Traffic sources
  if (d.sources.length === 0) {
    out.push("No traffic sources were attributed in this range.");
  } else {
    const top = d.sources[0];
    out.push(
      `${top.source} is the largest traffic source with ${fmtNum(
        top.visitors
      )} visitors, ${fmtPct(top.pct)} of all source-attributed visitors.`
    );
  }

  // Search
  if (d.searchEngines.length === 0) {
    out.push("No visits were attributed to a search engine in this range.");
  } else {
    const e = d.searchEngines[0];
    out.push(`${e.engine} sent the most organic search visitors: ${fmtNum(e.visitors)}.`);
  }

  if (d.searchTerms.length === 0) {
    out.push(
      "No search queries were captured. Google and most other engines strip the query from the referrer, so this is expected rather than a fault."
    );
  } else {
    // The list is capped, so it cannot be quoted as a total distinct count.
    out.push(
      `The most common captured search query was "${d.searchTerms[0].term}" with ${fmtNum(
        d.searchTerms[0].visitors
      )} visitors. Most engines strip the query from the referrer, so this covers only the minority that pass it through.`
    );
  }

  // AI assistants
  if (d.ai.length === 0) {
    out.push("No visits were attributed to an AI assistant in this range.");
  } else {
    const aiVisitors = d.ai.reduce((a, r) => a + r.visitors, 0);
    const aiLeads = d.ai.reduce((a, r) => a + r.leads, 0);
    out.push(
      `${fmtNum(aiVisitors)} visitors arrived from AI assistants, led by ${
        d.ai[0].assistant
      } with ${fmtNum(d.ai[0].visitors)}. ${
        aiLeads === 0
          ? "No form submissions carried a referrer matching an AI assistant."
          : `${fmtNum(aiLeads)} form submissions carried a referrer matching one.`
      }`
    );
  }

  // Pages
  if (d.pages.length === 0) {
    out.push("No page-level activity was recorded in this range.");
  } else {
    const p = d.pages[0];
    out.push(
      `${p.path} is the most viewed page with ${fmtNum(p.views)} views from ${fmtNum(
        p.unique
      )} unique visitors, ${fmtNum(p.entrances)} of which were session entrances and ${fmtNum(
        p.exits
      )} session exits.`
    );
    const worst = d.exitPages.length ? d.exitPages[0] : null;
    if (worst) {
      out.push(`${worst.path} is where sessions most often ended, ${fmtNum(worst.exits)} times.`);
    }
  }

  // Lead attribution
  if (d.leadAttribution.length === 0) {
    out.push("No form submissions recorded the page they came from, so lead attribution is empty.");
  } else {
    const la = d.leadAttribution[0];
    out.push(
      `${la.landingPage} produced the most leads (${fmtNum(la.leads)})${
        la.visitors > 0
          ? `, converting ${fmtPct(la.conversionRate, 2)} of its ${fmtNum(
              la.visitors
            )} unique visitors.`
          : ", though no tracked pageviews were recorded for that path in this range."
      }`
    );
  }

  // Geography — always flagged approximate.
  if (d.geo.countries.length === 0) {
    out.push("No approximate location could be resolved for any visitor in this range.");
  } else {
    const c = d.geo.countries[0];
    let line = `Most visitors resolve to an approximate location in ${
      c.name || c.code
    } (${fmtNum(c.visitors)}).`;
    if (d.geo.cities.length) {
      const city = d.geo.cities[0];
      line += ` The largest approximate city is ${city.city} with ${fmtNum(city.visitors)}.`;
    }
    line +=
      " IP geolocation is city-level and approximate; a VPN or mobile carrier NAT can place a visitor in the wrong city entirely.";
    out.push(line);
  }

  // Devices
  if (d.devices.length === 0) {
    out.push("No device type was recorded for any visitor in this range.");
  } else {
    const dev = d.devices[0];
    const devTotal = d.devices.reduce((a, r) => a + r.visitors, 0);
    out.push(
      `${dev.device} is the most common device at ${fmtNum(dev.visitors)} visitors, ${fmtPct(
        pct(dev.visitors, devTotal)
      )} of those with a recorded device type.`
    );
  }

  // Realtime
  out.push(
    d.realtime.online === 0
      ? "No visitors were active in the last five minutes."
      : `${fmtNum(d.realtime.online)} visitor${
          d.realtime.online === 1 ? " was" : "s were"
        } active in the last five minutes.`
  );

  return out;
}

module.exports = router;
