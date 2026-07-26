/**
 * services/requestContext.js
 *
 * Shared request-context helpers used by both the admin security module and the
 * first-party analytics module. See INTEGRATION-SPEC.md section 1.
 *
 * IMPORTANT NOTES
 * ---------------
 * 1. Render (and every other PaaS) runs the app behind a reverse proxy, so
 *    `req.ip` is the proxy address, not the visitor. Always resolve the visitor
 *    address through `clientIp(req)`.
 * 2. A raw IP address is never stored anywhere. Callers persist `hashIp(ip)`.
 * 3. `geoFromIp` is CITY-LEVEL AND APPROXIMATE. It is derived from a static
 *    IP-to-location database, so a VPN, a corporate proxy or mobile carrier NAT
 *    will place a visitor in the wrong city (or the wrong country) entirely.
 *    Never present its output as an exact location: UI copy and emails must say
 *    "approximate location".
 * 4. Nothing is guessed. Private, loopback, carrier-grade-NAT, link-local and
 *    unparseable addresses return empty fields rather than a plausible-looking
 *    fabrication.
 */

const crypto = require('crypto');
const geoip = require('geoip-lite');
const { UAParser } = require('ua-parser-js');

/* ------------------------------------------------------------------ *
 * Constants
 * ------------------------------------------------------------------ */

// Used only when IP_HASH_SALT is not configured. Set IP_HASH_SALT in the
// environment so hashes are not reproducible from public source code.
//
// WARNING: with this fallback in play the hash is NOT meaningfully private —
// the IPv4 space is only ~4 billion candidates, so anyone holding this file can
// brute-force the whole table. It exists so a missing env var cannot break
// login; it is not a substitute for setting IP_HASH_SALT. A one-time warning is
// logged below the first time it is used.
const FALLBACK_IP_HASH_SALT = 'avani-enterprises-request-context-v1';

let warnedAboutFallbackSalt = false;

const IP_HASH_LENGTH = 12;

/**
 * Hard caps on every externally supplied string. Header and body values are
 * attacker-controlled and unbounded; ua-parser-js in particular has a history
 * of catastrophic backtracking on hostile user agents, so nothing untrusted
 * reaches a regex or a parser at full length. Values are truncated, never
 * rejected — an oversized header must not break a login or a pageview.
 */
const MAX_UA_LENGTH = 512;
const MAX_IP_LENGTH = 64; // longest legal IPv6 text form is 45 characters
const MAX_HEADER_LENGTH = 2048; // x-forwarded-for chain, before splitting
const MAX_LOCATION_LENGTH = 256;

/** Syntactic IP validation. Junk in x-forwarded-for is discarded, not stored. */
const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
// Deliberately permissive on IPv6 shape (hex groups, "::" compression, optional
// trailing embedded IPv4) but strictly bounded in length and alphabet.
const IPV6_REGEX = /^[0-9a-f:.]{2,45}$/i;

/**
 * Bot / crawler / automation user-agent fragments, exactly as listed in the
 * integration spec. Matched case-insensitively as substrings.
 */
const BOT_PATTERNS = [
  'bot',
  'crawler',
  'spider',
  'slurp',
  'gptbot',
  'oai-searchbot',
  'chatgpt-user',
  'claudebot',
  'claude-web',
  'perplexitybot',
  'google-extended',
  'googlebot',
  'bingbot',
  'yandex',
  'baidu',
  'duckduckbot',
  'applebot',
  'ahrefs',
  'semrush',
  'mj12',
  'dotbot',
  'headless',
  'phantomjs',
  'puppeteer',
  'playwright',
  'python-requests',
  'curl/',
  'wget',
  'scrapy',
  'facebookexternalhit',
  'whatsapp',
  'telegrambot',
  'lighthouse',
];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const BOT_REGEX = new RegExp(BOT_PATTERNS.map(escapeRegExp).join('|'), 'i');

/**
 * ISO 3166-1 alpha-2 → display name. Covers the countries this site actually
 * sees traffic from plus the largest markets worldwide. Unknown codes fall
 * back to the raw code rather than to a guess.
 */
const COUNTRY_NAMES = {
  IN: 'India',
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  NZ: 'New Zealand',
  IE: 'Ireland',
  DE: 'Germany',
  FR: 'France',
  IT: 'Italy',
  ES: 'Spain',
  PT: 'Portugal',
  NL: 'Netherlands',
  BE: 'Belgium',
  LU: 'Luxembourg',
  CH: 'Switzerland',
  AT: 'Austria',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  IS: 'Iceland',
  PL: 'Poland',
  CZ: 'Czechia',
  SK: 'Slovakia',
  HU: 'Hungary',
  RO: 'Romania',
  BG: 'Bulgaria',
  GR: 'Greece',
  HR: 'Croatia',
  SI: 'Slovenia',
  RS: 'Serbia',
  UA: 'Ukraine',
  RU: 'Russia',
  BY: 'Belarus',
  LT: 'Lithuania',
  LV: 'Latvia',
  EE: 'Estonia',
  TR: 'Turkey',
  IL: 'Israel',
  AE: 'United Arab Emirates',
  SA: 'Saudi Arabia',
  QA: 'Qatar',
  KW: 'Kuwait',
  BH: 'Bahrain',
  OM: 'Oman',
  JO: 'Jordan',
  LB: 'Lebanon',
  IQ: 'Iraq',
  IR: 'Iran',
  EG: 'Egypt',
  MA: 'Morocco',
  DZ: 'Algeria',
  TN: 'Tunisia',
  LY: 'Libya',
  SD: 'Sudan',
  NG: 'Nigeria',
  GH: 'Ghana',
  KE: 'Kenya',
  TZ: 'Tanzania',
  UG: 'Uganda',
  ET: 'Ethiopia',
  ZA: 'South Africa',
  ZW: 'Zimbabwe',
  ZM: 'Zambia',
  MU: 'Mauritius',
  PK: 'Pakistan',
  BD: 'Bangladesh',
  LK: 'Sri Lanka',
  NP: 'Nepal',
  BT: 'Bhutan',
  MV: 'Maldives',
  AF: 'Afghanistan',
  CN: 'China',
  HK: 'Hong Kong',
  TW: 'Taiwan',
  MO: 'Macao',
  JP: 'Japan',
  KR: 'South Korea',
  SG: 'Singapore',
  MY: 'Malaysia',
  ID: 'Indonesia',
  TH: 'Thailand',
  VN: 'Vietnam',
  PH: 'Philippines',
  MM: 'Myanmar',
  KH: 'Cambodia',
  LA: 'Laos',
  BN: 'Brunei',
  KZ: 'Kazakhstan',
  UZ: 'Uzbekistan',
  AZ: 'Azerbaijan',
  GE: 'Georgia',
  AM: 'Armenia',
  BR: 'Brazil',
  AR: 'Argentina',
  CL: 'Chile',
  CO: 'Colombia',
  PE: 'Peru',
  VE: 'Venezuela',
  EC: 'Ecuador',
  UY: 'Uruguay',
  PY: 'Paraguay',
  BO: 'Bolivia',
  MX: 'Mexico',
  GT: 'Guatemala',
  CR: 'Costa Rica',
  PA: 'Panama',
  DO: 'Dominican Republic',
  CU: 'Cuba',
  JM: 'Jamaica',
  TT: 'Trinidad and Tobago',
  PR: 'Puerto Rico',
  CY: 'Cyprus',
  MT: 'Malta',
  MD: 'Moldova',
  AL: 'Albania',
  MK: 'North Macedonia',
  BA: 'Bosnia and Herzegovina',
  ME: 'Montenegro',
  XK: 'Kosovo',
  FJ: 'Fiji',
  PG: 'Papua New Guinea',
};

/**
 * ISO 3166-2:IN subdivision code → state / union territory name. India is this
 * site's primary market, and geoip-lite returns only the code. Both the current
 * ISO codes and the legacy variants geoip-lite still emits for a few states are
 * included. Unknown codes fall through to the raw code, never to a guess.
 */
const IN_REGION_NAMES = {
  AN: 'Andaman and Nicobar Islands',
  AP: 'Andhra Pradesh',
  AR: 'Arunachal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CH: 'Chandigarh',
  CT: 'Chhattisgarh',
  CG: 'Chhattisgarh',
  DH: 'Dadra and Nagar Haveli and Daman and Diu',
  DN: 'Dadra and Nagar Haveli and Daman and Diu',
  DD: 'Dadra and Nagar Haveli and Daman and Diu',
  DL: 'Delhi',
  GA: 'Goa',
  GJ: 'Gujarat',
  HR: 'Haryana',
  HP: 'Himachal Pradesh',
  JK: 'Jammu and Kashmir',
  JH: 'Jharkhand',
  KA: 'Karnataka',
  KL: 'Kerala',
  LA: 'Ladakh',
  LD: 'Lakshadweep',
  MP: 'Madhya Pradesh',
  MH: 'Maharashtra',
  MN: 'Manipur',
  ML: 'Meghalaya',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Odisha',
  OD: 'Odisha',
  PY: 'Puducherry',
  PB: 'Punjab',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TN: 'Tamil Nadu',
  TG: 'Telangana',
  TR: 'Tripura',
  UP: 'Uttar Pradesh',
  UT: 'Uttarakhand',
  UK: 'Uttarakhand',
  WB: 'West Bengal',
};

/* ------------------------------------------------------------------ *
 * Internal helpers
 * ------------------------------------------------------------------ */

/**
 * Coerce to a trimmed string and cap its length. Every value that originates
 * outside this process passes through here with an explicit maximum.
 */
function str(value, maxLength) {
  if (value === null || value === undefined) return '';
  let out = String(value).trim();
  if (typeof maxLength === 'number' && maxLength > 0 && out.length > maxLength) {
    out = out.slice(0, maxLength);
  }
  return out;
}

/**
 * True only for syntactically valid IPv4 / IPv6 literals. Anything else found
 * in a forwarding header (hostnames, "unknown", injected junk) is discarded so
 * it never reaches geoip-lite or the hash.
 */
function isValidIp(value) {
  const ip = str(value, MAX_IP_LENGTH);
  if (!ip) return false;
  if (ip.indexOf(':') !== -1) {
    // Reject the degenerate all-colons case and require at least one hex digit.
    if (!/[0-9a-f]/i.test(ip)) return ip === '::';
    return IPV6_REGEX.test(ip);
  }
  return IPV4_REGEX.test(ip);
}

/**
 * Strips the IPv4-mapped-IPv6 prefix ("::ffff:203.0.113.9" → "203.0.113.9")
 * and any surrounding brackets / port on a bracketed IPv6 literal.
 */
function normaliseIp(value) {
  let ip = str(value, MAX_IP_LENGTH);
  if (!ip) return '';

  // "[2001:db8::1]:443" → "2001:db8::1"
  const bracketed = ip.match(/^\[(.+)\](?::\d+)?$/);
  if (bracketed) ip = bracketed[1];

  // "::ffff:203.0.113.9" / "::FFFF:203.0.113.9" → "203.0.113.9"
  ip = ip.replace(/^::ffff:/i, '');

  // "203.0.113.9:51234" → "203.0.113.9" (IPv4 with port; never strip from IPv6)
  const ipv4WithPort = ip.match(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/);
  if (ipv4WithPort) ip = ipv4WithPort[1];

  // Case-fold IPv6 hex so "2001:DB8::1" and "2001:db8::1" — the same client —
  // cannot hash to two different lockout keys.
  if (ip.indexOf(':') !== -1) ip = ip.toLowerCase();

  return ip;
}

/**
 * True for addresses that can never be geolocated to a real visitor location:
 * loopback, RFC1918 private ranges, carrier-grade NAT, link-local, unspecified
 * and IPv6 unique-local / link-local. These return empty geo, never a guess.
 */
function isNonPublicIp(ip) {
  const value = str(ip, MAX_IP_LENGTH).toLowerCase();
  if (!value) return true;

  // IPv6
  if (value.indexOf(':') !== -1) {
    if (value === '::' || value === '::1') return true;
    if (/^f[cd]/.test(value)) return true; // fc00::/7 unique local
    if (/^fe[89ab]/.test(value)) return true; // fe80::/10 link local
    return false;
  }

  const parts = value.split('.');
  if (parts.length !== 4) return true;

  const octets = parts.map((p) => Number(p));
  if (octets.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;

  const [a, b, c] = octets;

  if (a === 0) return true; // 0.0.0.0/8 unspecified
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 127) return true; // 127.0.0.0/8 loopback
  if (a === 169 && b === 254) return true; // 169.254.0.0/16 link local
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 CGNAT
  if (a === 198 && (b === 18 || b === 19)) return true; // 198.18.0.0/15 benchmarking

  // Documentation / test ranges. Matched on the full /24 only — the
  // surrounding /16s are live, routable space (203.0.0.0/16 in particular is
  // allocated APNIC address space used by real visitors in Asia).
  if (a === 192 && b === 0 && (c === 0 || c === 2)) return true; // 192.0.0.0/24, TEST-NET-1
  if (a === 198 && b === 51 && c === 100) return true; // TEST-NET-2
  if (a === 203 && b === 0 && c === 113) return true; // TEST-NET-3

  if (a >= 224) return true; // multicast + reserved + broadcast

  return false;
}

function emptyGeo() {
  return {
    country: '',
    countryName: '',
    region: '',
    city: '',
    lat: null,
    lng: null,
    timezone: '',
  };
}

/* ------------------------------------------------------------------ *
 * Public API
 * ------------------------------------------------------------------ */

/**
 * Resolves the visitor IP behind Render's reverse proxy.
 * Order: x-forwarded-for (first entry) → x-real-ip → req.ip.
 *
 * `app.set('trust proxy', true)` is configured during wiring in index.js.
 *
 * @param {object} req Express request
 * @returns {string} IP address, or '' when it cannot be determined
 */
function clientIp(req) {
  if (!req || typeof req !== 'object') return '';

  let headers = {};
  try {
    headers = req.headers || {};
  } catch (err) {
    headers = {};
  }

  // Forwarding headers are supplied by the caller and are entirely untrusted:
  // they are capped, split, and each candidate must look like a real IP before
  // it is accepted. A header full of junk falls through to the next source
  // rather than being hashed and stored as if it were an address.
  const forwarded = pickHeader(headers['x-forwarded-for']);
  if (forwarded) {
    // "client, proxy1, proxy2" — the client is the first entry. Take the first
    // entry that is actually an IP; a malformed leading token is skipped.
    const parts = forwarded.split(',');
    for (let i = 0; i < parts.length; i += 1) {
      const ip = normaliseIp(parts[i]);
      if (ip && isValidIp(ip)) return ip;
    }
  }

  const realIp = pickHeader(headers['x-real-ip']);
  if (realIp) {
    const ip = normaliseIp(realIp.split(',')[0]);
    if (ip && isValidIp(ip)) return ip;
  }

  const direct = normaliseIp(req.ip);
  return direct && isValidIp(direct) ? direct : '';
}

/**
 * Node collapses repeated headers into a comma-joined string, except for a few
 * that arrive as arrays. Normalise both shapes to one capped string.
 */
function pickHeader(value) {
  const raw = Array.isArray(value) ? value.join(',') : value;
  return str(raw, MAX_HEADER_LENGTH);
}

/**
 * One-way, salted, truncated hash of an IP address. This is what gets stored —
 * the raw IP never is. 12 hex characters is enough to distinguish visitors for
 * rate-limiting and lockout purposes without being a reversible identifier.
 *
 * @param {string} ip
 * @returns {string} 12 lowercase hex characters, or '' for an empty input
 */
function hashIp(ip) {
  // Normalise FIRST. "::ffff:203.0.113.9", "203.0.113.9:51234" and
  // "203.0.113.9" are one client; hashing the raw forms would give the same
  // visitor three different lockout keys and hand an attacker a free reset of
  // the failure streak on every login attempt.
  const value = normaliseIp(ip);
  if (!value) return '';

  const configured = str(process.env.IP_HASH_SALT, 256);
  if (!configured && !warnedAboutFallbackSalt) {
    warnedAboutFallbackSalt = true;
    console.warn(
      'requestContext: IP_HASH_SALT is not set — falling back to the salt ' +
        'committed in source. IP hashes are brute-forceable until it is set.'
    );
  }

  const salt = configured || FALLBACK_IP_HASH_SALT;

  return crypto
    .createHash('sha256')
    .update(`${value}|${salt}`)
    .digest('hex')
    .slice(0, IP_HASH_LENGTH);
}

/**
 * APPROXIMATE, city-level geolocation from a static database.
 *
 * A VPN, corporate proxy or mobile carrier NAT will resolve to the wrong city
 * or country. Callers must present this as an approximate location only.
 *
 * Private, loopback, CGNAT, link-local and unparseable addresses return empty
 * fields — this function never guesses.
 *
 * @param {string} ip
 * @returns {{country:string,countryName:string,region:string,city:string,lat:number|null,lng:number|null,timezone:string}}
 */
function geoFromIp(ip) {
  const value = normaliseIp(ip);
  if (!value || !isValidIp(value) || isNonPublicIp(value)) return emptyGeo();

  let record = null;
  try {
    record = geoip.lookup(value);
  } catch (err) {
    // A corrupt or partially-downloaded geoip-lite data file throws here.
    // Geo is decoration; it must never take down a login or a pageview.
    record = null;
  }

  if (!record) return emptyGeo();

  const country = str(record.country, 2).toUpperCase();

  // geoip-lite returns ll as [latitude, longitude].
  let lat = null;
  let lng = null;
  if (Array.isArray(record.ll) && record.ll.length === 2) {
    const rawLat = Number(record.ll[0]);
    const rawLng = Number(record.ll[1]);
    const inRange =
      Number.isFinite(rawLat) &&
      Number.isFinite(rawLng) &&
      rawLat >= -90 &&
      rawLat <= 90 &&
      rawLng >= -180 &&
      rawLng <= 180;

    // Exactly [0, 0] is what the database emits when it has no coordinate fix
    // at all. Storing it would plant the visitor in the Gulf of Guinea and draw
    // a real-looking bubble there, so it is treated as unknown, not as data.
    const isNullIsland = rawLat === 0 && rawLng === 0;

    if (inRange && !isNullIsland) {
      lat = rawLat;
      lng = rawLng;
    }
  }

  const region = str(record.region, 128);

  return {
    country,
    countryName: countryNameFromCode(country),
    region: regionNameFrom(country, region),
    city: str(record.city, 128),
    lat,
    lng,
    timezone: str(record.timezone, 64),
  };
}

/**
 * geoip-lite reports the ISO 3166-2 subdivision CODE (e.g. 'MH'), not a name.
 * India is this site's primary market and the spec's own example output is
 * "Mumbai, Maharashtra, India", so Indian codes are expanded using the real
 * ISO 3166-2:IN table. Every other country keeps the raw code — a code is
 * honest, an invented expansion is not.
 *
 * @param {string} country ISO 3166-1 alpha-2
 * @param {string} code ISO 3166-2 subdivision code
 * @returns {string}
 */
function regionNameFrom(country, code) {
  const key = str(code, 128).toUpperCase();
  if (!key) return '';
  if (str(country, 2).toUpperCase() !== 'IN') return str(code, 128);
  return IN_REGION_NAMES[key] || str(code, 128);
}

/**
 * Maps a 2-letter ISO country code to a display name, falling back to the raw
 * code when the code is not in the table.
 *
 * @param {string} code
 * @returns {string}
 */
function countryNameFromCode(code) {
  const key = str(code, 2).toUpperCase();
  if (!key) return '';
  return COUNTRY_NAMES[key] || key;
}

/**
 * Parses a user-agent string into device class, browser and OS.
 * `device` is always exactly one of 'desktop' | 'mobile' | 'tablet'.
 *
 * ua-parser-js reports no device type for regular desktop browsers, and
 * reports console / smarttv / wearable / embedded / xr for other hardware.
 * Everything that is not explicitly a phone or a tablet is bucketed as
 * 'desktop' so the field stays a closed three-value set.
 *
 * @param {string} userAgent
 * @returns {{device:'desktop'|'mobile'|'tablet',browser:string,os:string}}
 */
function parseUa(userAgent) {
  // Truncated before parsing: the user-agent header is attacker-controlled and
  // unbounded, and ua-parser-js has a history of catastrophic backtracking on
  // hostile input. 512 characters is far beyond any real browser's UA.
  const ua = str(userAgent, MAX_UA_LENGTH);
  if (!ua) return { device: 'desktop', browser: '', os: '' };

  let result = null;
  try {
    result = new UAParser(ua).getResult();
  } catch (err) {
    result = null;
  }

  if (!result) return { device: 'desktop', browser: '', os: '' };

  const rawType = str(result.device && result.device.type, 32).toLowerCase();

  let device = 'desktop';
  if (rawType === 'mobile' || rawType === 'wearable') device = 'mobile';
  else if (rawType === 'tablet') device = 'tablet';

  return {
    device,
    browser: str(result.browser && result.browser.name, 64),
    os: str(result.os && result.os.name, 64),
  };
}

/**
 * True for known bots, crawlers, scrapers, AI agents, headless browsers and
 * HTTP client libraries. An empty user-agent is treated as a bot: real
 * browsers always send one.
 *
 * @param {string} userAgent
 * @returns {boolean}
 */
function isBot(userAgent) {
  const ua = str(userAgent, MAX_UA_LENGTH);
  if (!ua) return true;
  return BOT_REGEX.test(ua);
}

/**
 * Human-readable one-line location for emails and UI, e.g.
 * "Mumbai, MH, India". Callers must label it as approximate.
 *
 * @param {{city?:string,region?:string,countryName?:string}} geo
 * @returns {string}
 */
function describeLocation(geo) {
  if (!geo || typeof geo !== 'object') return 'Unknown location';

  const parts = [geo.city, geo.region, geo.countryName]
    .map((part) => str(part, 128))
    .filter((part) => part.length > 0);

  if (parts.length === 0) return 'Unknown location';
  return str(parts.join(', '), MAX_LOCATION_LENGTH);
}

module.exports = {
  clientIp,
  hashIp,
  geoFromIp,
  parseUa,
  isBot,
  describeLocation,
  countryNameFromCode,
  BOT_PATTERNS,
  COUNTRY_NAMES,
};
