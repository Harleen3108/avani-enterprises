# Integration spec — admin security + first-party analytics

Contract every module in this build must satisfy. Written first so the pieces
compose without anyone editing the same file.

## Rules

- **Nobody edits `index.js`, `App.jsx`, `Sidebar.jsx` or `App.tsx`.** Wiring is
  done separately. Export routers; they get mounted.
- Backend is **CommonJS** (`require` / `module.exports`). No `import`.
- Admin frontend is **JSX** (Vite + React + Tailwind + lucide-react + axios + clsx).
- Public site is **TypeScript** React.
- Mongoose is v9. `bcryptjs`, `jsonwebtoken`, `@sendgrid/mail`, `geoip-lite` and
  `ua-parser-js` are installed.

## Deployment facts that change the code

Render runs behind a proxy, so `req.ip` is the proxy, not the visitor.
**Always resolve the client IP through `services/requestContext.clientIp(req)`**,
which reads `x-forwarded-for` first. `app.set('trust proxy', true)` is set in
`index.js` during wiring.

Existing JWTs are signed `{ _id, role }` and expire in **1 day**.
`middleware/authMiddleware` sets `req.user`.

---

## 1. `services/requestContext.js` — shared by security and analytics

```js
module.exports = {
  clientIp(req),        // string — x-forwarded-for[0] → x-real-ip → req.ip
  hashIp(ip),           // 12-char sha256 of ip + IP_HASH_SALT. Never store raw IP.
  geoFromIp(ip),        // { country, countryName, region, city, lat, lng, timezone }
                        // geoip-lite. All fields '' / null when unknown.
                        // Private/loopback IPs return empty, never a guess.
  parseUa(userAgent),   // { device: 'desktop'|'mobile'|'tablet', browser, os }
  isBot(userAgent),     // boolean
  describeLocation(geo) // "Mumbai, Maharashtra, India" — for emails and UI
};
```

`geoFromIp` is **city-level and approximate**, and a VPN or mobile carrier NAT
will place a visitor in the wrong city entirely. Never describe its output as
exact. UI and emails must say "approximate location".

Bot patterns to match (case-insensitive): `bot`, `crawler`, `spider`, `slurp`,
`gptbot`, `oai-searchbot`, `chatgpt-user`, `claudebot`, `claude-web`,
`perplexitybot`, `google-extended`, `googlebot`, `bingbot`, `yandex`, `baidu`,
`duckduckbot`, `applebot`, `ahrefs`, `semrush`, `mj12`, `dotbot`, `headless`,
`phantomjs`, `puppeteer`, `playwright`, `python-requests`, `curl/`, `wget`,
`scrapy`, `facebookexternalhit`, `whatsapp`, `telegrambot`, `lighthouse`.

---

## 2. `models/LoginAttempt.js`

```js
{
  email: String,            // lowercased, as typed
  success: Boolean,
  reason: String,           // 'ok' | 'bad-password' | 'no-user' | 'unverified' | 'locked'
  ip: String,               // NOT stored raw — set to '' ; keep ipHash
  ipHash: String,
  country, countryName, region, city: String,
  lat, lng: Number,
  timezone: String,
  device, browser, os, userAgent: String,
  createdAt: Date,          // TTL index, 180 days
}
```

Indexes: `{ email: 1, createdAt: -1 }`, `{ success: 1, createdAt: -1 }`,
TTL on `createdAt` at `15552000` seconds.

## 3. `services/loginSecurity.js`

Progressive lockout keyed on **email + ipHash together**, so one attacker cannot
lock a legitimate admin out from their own location.

```js
const LOCK_MINUTES = [2, 5, 10, 30];   // then 30 for every subsequent failure

module.exports = {
  async checkLock({ email, ipHash }),
  // → { locked: bool, until: Date|null, minutesLeft: number, failures: number }

  async recordFailure({ email, reason, req }),
  // Writes a LoginAttempt, increments the failure streak, returns
  // { failures, locked, until, minutesLeft, geo, ua }.
  // Sends the alert email (see below). Must never throw into the request path —
  // wrap the email send so a SendGrid outage cannot break login.

  async recordSuccess({ email, req }),
  // Writes a successful LoginAttempt WITH location (the spec requires logging
  // location on success too) and clears the failure streak.

  async recentAttempts({ limit = 100, email }),
  async activeLocks(),
  async clearLock({ email, ipHash }),
};
```

The failure streak counts consecutive failures since the last success for that
email+ipHash. `LOCK_MINUTES[Math.min(failures - 1, 3)]` gives the duration, so
failures 1→2min, 2→5min, 3→10min, 4+→30min.

### The alert email

Always to `sohamdang0@gmail.com` (hardcoded, plus `LEAD_NOTIFY_EMAILS` if set),
from `process.env.FROM_EMAIL`. Subject:
`Failed admin login — <city, country> (attempt <n>)`

Body must state: the email tried, the approximate location, the ISP-level
caveat, device/browser/OS, the time in IST, the failure count, and how long the
panel is locked. Never include the attempted password.

Skip silently if `FROM_EMAIL` is unset.

## 4. `routes/adminSecurity.js` — `module.exports = router`, mounted at `/admin/security`

All routes use `authMiddleware`. Every credential change **re-verifies the
current password** with bcrypt before doing anything.

| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/change-password` | `currentPassword, newPassword` | min 8 chars, must differ |
| POST | `/change-email` | `currentPassword, newEmail` | valid, not already taken |
| POST | `/change-admin-code` | `currentPassword, newAdminCode` | stored hashed on User |
| GET | `/login-log?limit=&email=` | — | recent attempts, newest first |
| GET | `/locks` | — | currently locked email+ipHash pairs |
| POST | `/unlock` | `email` | clears the streak |

Changing the email or password must log a `LoginAttempt`-style audit entry with
`reason: 'credentials-changed'` so the change itself is visible in the log.

Add `adminCodeHash: String` to `models/User.js` (nullable — existing users have
none until they set one).

---

## 5. `models/SiteVisit.js`

One document per anonymous pageview.

```js
{
  visitorId, sessionId: String,           // from localStorage / sessionStorage
  path, title, referrer, referrerDomain: String,
  source: String,        // 'direct'|'organic'|'social'|'referral'|'ai'
  searchEngine, searchQuery, aiAssistant: String,
  utmSource, utmMedium, utmCampaign, utmContent, utmTerm, gclid, fbclid: String,
  landingPage: String,                    // first path of the session
  country, countryName, region, city: String,
  lat, lng: Number,
  timezone: String,
  device, browser, os, userAgent, ipHash: String,
  isNewVisitor: Boolean,
  durationMs: Number,                     // default 0
  maxScroll: Number,                      // 0-100, default 0
  isBot: Boolean,
  excluded: Boolean,                      // default false
  createdAt, updatedAt
}
```

Indexes: `visitorId`, `sessionId`, `path`, `{ excluded: 1, createdAt: -1 }`,
`{ isBot: 1, createdAt: -1 }`, and a **TTL on `createdAt` at 31536000** (1 year).

## 6. `services/analyticsClassify.js`

```js
module.exports = {
  classifyReferrer(referrer, selfHost),
  // → { source, referrerDomain, searchEngine, searchQuery, aiAssistant }
};
```

- Same host as `selfHost`, or empty referrer → `direct`.
- Search engines → `organic`, set `searchEngine`, pull the query from
  `q` / `query` / `p` / `text` when present (Google strips it; that is expected
  and `searchQuery` stays empty rather than being invented).
  google, bing, duckduckgo, yahoo, yandex, baidu, brave, ecosia, startpage, naver.
- Social → `social`: facebook, instagram, linkedin, x.com, twitter, t.co,
  youtube, reddit, pinterest, whatsapp, telegram, quora, threads.
- AI assistants → `ai`, set `aiAssistant`: chatgpt.com, chat.openai.com, openai,
  perplexity.ai, gemini.google.com, bard.google.com, claude.ai, copilot.microsoft.com,
  you.com, poe.com, phind.com.
- Anything else → `referral`.

## 7. `routes/analytics.js` — mounted at `/api/analytics`

| Method | Path | Auth | Behaviour |
|---|---|---|---|
| POST | `/track` | none | **Return `{}` immediately if the request carries a valid Authorization header** — staff must never appear in stats. Classify, geo-resolve, parse UA. If `isBot`, still store with `isBot:true` but respond `{}`. Respond `{ id }`. |
| POST | `/duration` | none | `{ id, durationMs, maxScroll }` → update. Must accept `sendBeacon`, so also parse `text/plain` bodies. |
| POST | `/exclude` | none | `{ visitorId }` → set `excluded:true` on all that visitor's docs. |

`isNewVisitor` is true when no prior SiteVisit exists for that `visitorId`.

## 8. `routes/analyticsDashboard.js` — mounted at `/api/analytics`, `authMiddleware`

`GET /dashboard?from=&to=&granularity=day|week|month`

Every aggregation filters `{ excluded: { $ne: true }, isBot: { $ne: true } }`.
Return the same metric set for the **previous equal-length window** as
`previous`, so the UI can show change without a second call.

```
{
  range: { from, to, days, granularity },
  executive: { uniqueVisitors, pageViews, sessions, leads, conversionRate },
  previous:  { ...same keys },
  behaviour: { newVisitors, returningVisitors, bounceRate, pagesPerSession,
               avgSessionDurationMs, engagedSessions },
  timeseries: [{ bucket, visitors, pageViews }],
  sources: [{ source, visitors, pct }],
  searchEngines: [{ engine, visitors }],
  searchTerms: [{ term, visitors }],
  ai: [{ assistant, visitors, leads }],
  geo: { countries: [{ code, name, visitors, lat, lng }],
         regions:   [{ region, country, visitors }],
         cities:    [{ city, region, country, visitors, lat, lng }] },
  pages: [{ path, views, unique, avgTimeMs, avgScroll, entrances, exits }],
  landingPages: [{ path, sessions }],
  exitPages: [{ path, exits }],
  leadAttribution: [{ landingPage, leads, visitors, conversionRate }],
  devices: [{ device, visitors }],
  browsers: [{ browser, visitors }],
  os: [{ os, visitors }],
  realtime: { online },          // distinct visitors in the last 5 minutes
  insights: [ "plain English string", ... ]
}
```

Leads come from the existing **`Form`** collection (`models/Form.js`), which
already stores `pagePath`, `pageUrl`, `referrer` and `source`, and from
**`AvaniForm`**. Count only non-spam (`isSpam: { $ne: true }`).

`insights` must be derived from the numbers actually computed. If a figure is
zero or missing, say so plainly rather than emitting a sentence implying data
exists. No invented commentary.

---

## 9. Public site tracker

`avani-connect-glow-main/src/lib/analytics.ts`

```ts
export function getVisitorId(): string   // localStorage 'av_vid', random
export function getSessionId(): string   // sessionStorage 'av_sid', random
export function getLandingPage(): string // sessionStorage, first path of session
export function captureUtm(): void       // first-touch only, into sessionStorage
export function getAttribution(): object // { landingPage, source, utm*, gclid, fbclid }
export function isLoggedIn(): boolean    // any auth token in localStorage
export function trackPageview(path, title): Promise<void>
export function excludeVisitor(): Promise<void>
```

`avani-connect-glow-main/src/components/AnalyticsTracker.tsx` — renders `null`,
mounted inside the Router. On every location change, if `!isLoggedIn()`, calls
`trackPageview`. Tracks time-on-page and max scroll depth, and on
`visibilitychange → hidden` and `pagehide` sends duration via
`navigator.sendBeacon`.

Must be resilient: any failure is swallowed. **Analytics must never be able to
break the site.** No blocking awaits on the render path.

## 10. Admin pages

- `src/pages/SecurityLog.jsx` — login log with location, device, success/fail,
  active locks with an unlock button, and the three credential-change forms
  (each requiring the current password). Must label locations "approximate".
- `src/pages/SiteAnalytics.jsx` — the dashboard. Date-range presets
  (Today / Yesterday / 7D / 30D / 90D / 1Y / Custom), granularity, CSV export,
  insight banner, KPI cards with % vs previous, traffic chart (inline SVG, no
  chart library), source/search/AI panels, geo tables, page tables, lead
  attribution, device/browser/OS.
- `src/components/WorldMap.jsx` — uses `src/data/worldGeo.js`, already present,
  which exports `WORLD` as `[{ n: countryName, p: [[[lng,lat],…],…] }]`.
  Equirectangular projection into an `<svg viewBox="0 0 360 180">`:
  `x = lng + 180`, `y = 90 - lat`. Draw country paths, then visitor bubbles
  from city lat/lng with radius scaled by visits. Include a toggle for a
  zoomed India view (roughly lng 68–98, lat 6–37) and hover tooltips.
  No mapping library, no network calls.

Empty states matter: with no data yet, every panel must say so clearly rather
than rendering an empty chart that looks broken.
