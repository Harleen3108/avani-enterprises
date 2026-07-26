/**
 * Referrer classification (INTEGRATION-SPEC section 6).
 *
 *   classifyReferrer(referrer, selfHost)
 *     → { source, referrerDomain, searchEngine, searchQuery, aiAssistant }
 *
 * Design notes:
 * - The referrer arrives from a public, unauthenticated endpoint, so it is
 *   treated as hostile: it is length-capped BEFORE parsing, only http/https is
 *   accepted, and every returned string is capped and stripped of control
 *   characters. The whole function is also wrapped so it can never throw into a
 *   request handler — analytics must not be able to break the site it measures.
 * - Matching is domain-aware, never a substring test. "notgoogle.com" is a
 *   referral, not Google; "google.com.example.net" is a referral too. A domain
 *   matches itself and its subdomains only.
 * - AI assistants are checked BEFORE search engines on purpose: gemini.google.com
 *   and bard.google.com are subdomains of google.com but are assistants, not
 *   organic search.
 * - searchQuery is only ever read from the referrer URL itself. Google (and most
 *   engines under a strict-origin referrer policy) strip it, so an empty
 *   searchQuery on an organic visit is the correct, expected answer. It is never
 *   filled in with a placeholder or a guess.
 */

// --- limits ------------------------------------------------------------------

// Longer referrers exist in the wild but carry no extra signal, and parsing an
// unbounded attacker-supplied string is a cheap way to burn CPU.
var MAX_REFERRER = 2048;
var MAX_DOMAIN = 253; // DNS maximum
var MAX_QUERY = 200;

// C0 controls + DEL. Built from a string so this file stays plain ASCII.
var CONTROL_CHARS = new RegExp("[\\u0000-\\u001F\\u007F]+", "g");

// --- domain tables -----------------------------------------------------------

// Engines whose brand sits on many ccTLDs (google.co.in, yahoo.co.jp, ...).
// Matched by base label + a real TLD, anchored to the end of the hostname.
var ENGINE_BASES = [
  { base: "google", engine: "Google" },
  { base: "bing", engine: "Bing" },
  { base: "duckduckgo", engine: "DuckDuckGo" },
  { base: "yahoo", engine: "Yahoo" },
  { base: "yandex", engine: "Yandex" },
  { base: "baidu", engine: "Baidu" },
  { base: "ecosia", engine: "Ecosia" },
  { base: "startpage", engine: "Startpage" },
  { base: "naver", engine: "Naver" },
];

// Engines pinned to exact domains (+ their subdomains).
var ENGINE_DOMAINS = [
  { domain: "search.brave.com", engine: "Brave" },
  { domain: "brave.com", engine: "Brave" },
];

var SOCIAL_BASES = [
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "youtube",
  "reddit",
  "pinterest",
  "quora",
  "threads",
  "telegram",
];

// Exact domains (+ subdomains): single-TLD social hosts and the official
// shorteners of the networks listed above.
var SOCIAL_DOMAINS = [
  "x.com",
  "t.co",
  "fb.com",
  "fb.me",
  "lnkd.in",
  "youtu.be",
  "redd.it",
  "pin.it",
  "t.me",
  "whatsapp.com",
  "wa.me",
];

var AI_DOMAINS = [
  { domain: "chatgpt.com", assistant: "ChatGPT" },
  { domain: "chat.openai.com", assistant: "ChatGPT" },
  { domain: "openai.com", assistant: "OpenAI" },
  { domain: "perplexity.ai", assistant: "Perplexity" },
  { domain: "gemini.google.com", assistant: "Gemini" },
  { domain: "bard.google.com", assistant: "Gemini" },
  { domain: "claude.ai", assistant: "Claude" },
  { domain: "copilot.microsoft.com", assistant: "Microsoft Copilot" },
  { domain: "you.com", assistant: "You.com" },
  { domain: "poe.com", assistant: "Poe" },
  { domain: "phind.com", assistant: "Phind" },
];

// Query parameter names that actually carry a search term.
// q = Google/Bing/DDG/Brave/Ecosia, query = Naver & others, p = Yahoo, text = Yandex.
var QUERY_PARAMS = ["q", "query", "p", "text"];

// Only these two schemes can produce a real referral. javascript:, data:,
// file:, android-app: and friends are not places on the web we can attribute.
var ALLOWED_PROTOCOLS = ["http:", "https:"];

// --- helpers -----------------------------------------------------------------

function clean(value, max) {
  if (typeof value !== "string") return "";
  var cleaned = value.replace(CONTROL_CHARS, " ").trim();
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

function emptyResult(source) {
  return {
    source: source,
    referrerDomain: "",
    searchEngine: "",
    searchQuery: "",
    aiAssistant: "",
  };
}

/** Lower-cases, drops a trailing dot and a single leading "www.". */
function normaliseHost(host) {
  if (typeof host !== "string") return "";
  var h = host.trim().toLowerCase();
  if (!h) return "";
  // A hostname may legitimately arrive with a trailing root dot.
  while (h.length > 1 && h.charAt(h.length - 1) === ".") {
    h = h.slice(0, -1);
  }
  if (h.indexOf("www.") === 0) h = h.slice(4);
  return h.length > MAX_DOMAIN ? "" : h;
}

/**
 * selfHost may be handed to us as a bare hostname ("avanienterprises.in"), a
 * host:port, a protocol-relative "//host", or a full URL. Reduce all of those
 * to a comparable hostname.
 */
function hostFromSelf(selfHost) {
  if (typeof selfHost !== "string") return "";
  var raw = clean(selfHost, MAX_REFERRER);
  if (!raw) return "";

  if (raw.indexOf("//") !== -1) {
    try {
      raw = new URL(raw).hostname;
    } catch (err) {
      // Not a parseable URL — strip the scheme / leading slashes by hand so a
      // protocol-relative "//example.com" does not reduce to an empty string.
      raw = raw.replace(/^[a-z][a-z0-9+.-]*:/i, "").replace(/^\/+/, "");
    }
  }

  // Strip any userinfo, path and port that survived.
  raw = raw.split("/")[0];
  var at = raw.lastIndexOf("@");
  if (at !== -1) raw = raw.slice(at + 1);

  if (raw.charAt(0) === "[") {
    // Bracketed IPv6 literal: keep it whole, drop only the port after "]".
    var close = raw.indexOf("]");
    raw = close === -1 ? raw : raw.slice(0, close + 1);
  } else {
    raw = raw.split(":")[0];
  }

  return normaliseHost(raw);
}

/** True when `host` IS `domain` or a subdomain of it. Never a substring test. */
function matchesDomain(host, domain) {
  if (!host || !domain) return false;
  return host === domain || host.slice(-(domain.length + 1)) === "." + domain;
}

// Real-looking TLD tail: "com", "in", "co.in", "com.au", "co.uk", "com.br"...
var TLD_TAIL = "(?:[a-z]{2,6}|(?:com|co|net|org|edu|gov|ac|or|ne)\\.[a-z]{2,3})";

/**
 * Builds the test for "host sits on the brand `base` at a real TLD", i.e. the
 * base is a whole label immediately before the public suffix.
 *   google.com, www.google.co.in, news.google.com  -> true
 *   notgoogle.com, google.com.evil.net             -> false
 * Compiled once at load rather than per request.
 */
function baseRegex(base) {
  return new RegExp("(?:^|\\.)" + base + "\\." + TLD_TAIL + "$");
}

var ENGINE_BASE_TESTS = ENGINE_BASES.map(function (entry) {
  return { re: baseRegex(entry.base), engine: entry.engine };
});

var SOCIAL_BASE_TESTS = SOCIAL_BASES.map(baseRegex);

/** Pulls a genuine search term out of the referrer URL, or "" if none is there. */
function extractQuery(url) {
  if (!url || !url.searchParams) return "";
  for (var i = 0; i < QUERY_PARAMS.length; i++) {
    var value = url.searchParams.get(QUERY_PARAMS[i]);
    if (typeof value === "string") {
      var trimmed = clean(value, MAX_QUERY);
      if (trimmed) return trimmed;
    }
  }
  return "";
}

// --- main --------------------------------------------------------------------

function classify(referrer, selfHost) {
  // No referrer at all, or something that is not a string → direct.
  var raw = clean(referrer, MAX_REFERRER);
  if (!raw) return emptyResult("direct");

  var url;
  try {
    url = new URL(raw);
  } catch (err) {
    // Malformed / relative referrer. We genuinely cannot tell where it came
    // from, so bucket it as direct rather than inventing a domain.
    return emptyResult("direct");
  }

  // Non-web schemes carry no attributable origin.
  if (ALLOWED_PROTOCOLS.indexOf(url.protocol) === -1) return emptyResult("direct");

  var host = normaliseHost(url.hostname);
  if (!host) return emptyResult("direct");

  // Our own site (or any subdomain of it) is internal navigation, not a referral.
  // Checked both ways because selfHost may be the API host (api.example.com)
  // while the referrer is the apex the site is served from.
  var self = hostFromSelf(selfHost);
  if (self && (host === self || matchesDomain(host, self) || matchesDomain(self, host))) {
    return emptyResult("direct");
  }

  var result = emptyResult("referral");
  result.referrerDomain = host;

  var i;

  // 1. AI assistants first — gemini.google.com / bard.google.com would
  //    otherwise be swallowed by the google.com search-engine rule.
  for (i = 0; i < AI_DOMAINS.length; i++) {
    if (matchesDomain(host, AI_DOMAINS[i].domain)) {
      result.source = "ai";
      result.aiAssistant = AI_DOMAINS[i].assistant;
      return result;
    }
  }

  // 2. Search engines.
  for (i = 0; i < ENGINE_DOMAINS.length; i++) {
    if (matchesDomain(host, ENGINE_DOMAINS[i].domain)) {
      result.source = "organic";
      result.searchEngine = ENGINE_DOMAINS[i].engine;
      result.searchQuery = extractQuery(url);
      return result;
    }
  }
  for (i = 0; i < ENGINE_BASE_TESTS.length; i++) {
    if (ENGINE_BASE_TESTS[i].re.test(host)) {
      result.source = "organic";
      result.searchEngine = ENGINE_BASE_TESTS[i].engine;
      // Empty here is the honest answer when the engine stripped the term.
      result.searchQuery = extractQuery(url);
      return result;
    }
  }

  // 3. Social networks and their shorteners.
  for (i = 0; i < SOCIAL_DOMAINS.length; i++) {
    if (matchesDomain(host, SOCIAL_DOMAINS[i])) {
      result.source = "social";
      return result;
    }
  }
  for (i = 0; i < SOCIAL_BASE_TESTS.length; i++) {
    if (SOCIAL_BASE_TESTS[i].test(host)) {
      result.source = "social";
      return result;
    }
  }

  // 4. Everything else is a plain referral.
  return result;
}

/**
 * Public entry point. Always returns the full five-key shape, never throws:
 * an unexpected failure degrades to `direct` instead of taking a pageview —
 * or the request handler calling it — down with it.
 */
function classifyReferrer(referrer, selfHost) {
  try {
    return classify(referrer, selfHost);
  } catch (err) {
    return emptyResult("direct");
  }
}

module.exports = { classifyReferrer: classifyReferrer };
