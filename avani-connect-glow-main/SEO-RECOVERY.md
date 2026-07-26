# Avani Enterprises — SEO Recovery

What was wrong, what changed, and what you need to do next.

---

## 1. What was actually broken

Three things, in order of severity.

### 1.1 All 455 pages served identical HTML to Googlebot

This was the big one, and it was not in the content — it was in the rendering.

`api/seo.js` injected only `<head>` meta tags. The `<body>` came from the SPA shell
in `index.html`, which hardcoded:

```html
<h1>Avani Enterprises — Digital Marketing Agency in India</h1>
```

…plus a generic service list. **Every URL served that same block.** Google fetched
`/ai-video-services-mumbai`, read the homepage, and moved on. Below `</head>`, all
455 pages were byte-identical.

That is a complete explanation for the "Crawled – currently not indexed" bucket.
Google was not judging the content harshly; it never saw the content.

### 1.2 253 location pages shared identical content blocks

Every one of the 253 `type: "location"` entries in `newSeoPagesData.json` carried
the **same four benefit cards**, word for word:

> Designed for Local Markets · Sub-2-Second Speed · Integrated Marketing Strategy · 24/7 Support and Security

…and the **same two FAQs**. The intro was one template with the city swapped:

> "Operating successfully in {City} requires a digital strategy built around your specific target audience."

Across the registry, one FAQ answer appeared on 253 pages. In total the build now
strips **1,189 duplicated paragraphs and 1,296 duplicated FAQ answers**.

There was also a visible grammar bug on all 34 AI-video pages: *"Our ai video
services services help…"*

### 1.3 The noindex list covered 12 utility paths, none of the doorways

`api/seo.js` had a hardcoded list of 12 utility routes. The ~305
`{service}-{location}` combinations — the actual scaled-content footprint — were
all fully indexable and all in the sitemap.

Four tool pages (`auto-dm-tool`, `bulk-dm-tool`, `instagram-reels-scheduler`,
`social-media-content-planner`) were in the *opposite* state: served `noindex`
while still listed in the sitemap, which is a contradictory signal. That is now
consistent. **If you want those four indexed, say so** — they are currently
excluded, matching the previous behaviour.

---

## 2. The numbers

All figures below were measured against the **actual built output**
(`dist/template.html`), not a mock, across all 304 sitemap URLs.

| | Before | After |
|---|---:|---:|
| Sitemap URLs | 455 | **304** |
| Doorway `{service}-{no-presence}` pages indexable | 130 | **0** |
| `noindex` pages still listed in the sitemap | 4 | **0** |
| Pages serving unique body HTML to Googlebot | **0** | **304** |
| Groups of pages with byte-identical bodies | **all 455** | **0** |
| Pages under 150 words of server-rendered content | 455 | **18** |
| Pages with 300+ words of server-rendered content | 0 | **250** |
| Duplicated paragraphs served | 1,189 | 0 |
| Duplicated FAQ answers served | 1,296 | 0 |
| Duplicated benefit/feature cards served | 3,032 | 0 |
| `<meta name="keywords">` stuffing | every page | removed |

### Content similarity (word-trigram Jaccard, content zone only, nav excluded)

| Comparison | Before | After |
|---|---:|---:|
| `/about` vs `/services` | 100% | **2.3%** |
| Different service + different city | 100% | **6.2%** |
| Two different services | 100% | **8.3%** |
| Two model pages (Claude vs GPT) | 100% | **39%** |
| Two cities, same service — **average across all 178 pairs** | 100% | **38–45%** |
| Two cities, same service — worst single pair | 100% | **68%** |

The average sits inside the <45% target from the brief. Two city pages for the
*same* service still overlap, and that is expected — the service genuinely is the
same. What differs is the H1, the opening paragraph, the business districts, the
local sector mix, the sector-specific use cases, the office/remote status, the
timeline and several FAQs. See §5 for the honest caveat.

### The 18 remaining pages under 150 words

`/sitemap`, `/privacy-policy`, `/terms-and-conditions`, `/blog`, `/careers`,
`/courses`, `/newsletters`, `/projects`, `/case-studies`, and a handful of
SocialSync tool pages.

These are legal pages and index pages that list dynamic content — the React app
renders the actual listings, and their server-rendered body is a summary. That is
appropriate rather than a defect. No action needed unless they fail to index.

---

## 3. What was built

### `src/data/serviceContent.js` — the uniqueness engine

Real, factual data for 25 services, 21 locations, 15 sectors and 4 LLM families,
plus a resolver that combines them by URL. Because the combination is
data-driven, `web-development-company-mumbai` and `web-development-company-jaipur`
describe genuinely different districts, sectors and use cases.

- `SERVICES` — deliverables, process, stack, timeline, pricing model, FAQs
- `LOCATIONS` — real business districts, real local industry base, real office
  addresses, real time-zone offsets and invoicing currency
- `USE_CASES` — what each service actually does for each sector (Mumbai pulls
  BFSI/media/pharma applications; Jaipur pulls jewellery/textiles/tourism)
- `LLM_MODELS` — real, checkable differences between Claude, GPT, Gemini and MCP
- `STATIC_PAGES` — first-crawl content for `/about`, `/services`, `/contact` etc.

**Every `proof: []` array is deliberately empty.** Fill them with real portfolio
items and real metrics. Nothing in this file is invented.

### `src/data/noindexPages.js` — the de-index list

130 doorway slugs, gate **ON** as you asked. Pages stay live for ads and direct
traffic; they carry `noindex,follow` and are dropped from the sitemap. `follow`
is deliberate — link equity still flows to the pages you keep.

### `api/seo.js` — per-route server-rendered body

Now builds real HTML per route: H1, intro, local facts, deliverables, sector use
cases, FAQs and contextual internal links. This is the fix for §1.1.

Internal linking is now **contextual** rather than the same 22 links on every
page: same service in neighbouring cities you actually serve, related services,
then core hubs. It never links into a de-indexed page.

### `src/components/seo/LocalValueSection.tsx`

The React equivalent, wired once into `SeoLandingTemplate` so all ~300 landing
pages get it with zero per-file edits.

### Hub-and-spoke architecture

Service hub pages (`/web-development-company`) carry the full scope, process,
stack and pricing. City pages carry a short summary and spend their words on what
is genuinely local, then link up to the hub. This is better architecture than
repeating a 400-word service description across 21 cities.

### New pages

- **`/ai-callers`** — AI voice agents (inbound/outbound, qualification, booking,
  human handoff, CRM logging). You had zero coverage for this.
- **`/ai-content-services`** — AI content with human editing, including a direct,
  accurate answer to "does AI content get penalised?"

Both are live via the existing `:slug` route and are already in the sitemap.

### Model pages differentiated

`claude-ai-development`, `openai-development-company`, `gemini-ai-development` and
`mcp-development-company` now carry real, model-specific deliverables, stacks,
processes and timelines instead of sharing one generic AI description.

### Keyword cannibalisation fixed — 15 groups of identical pages

The audit found 15 groups of service URLs serving **byte-identical** bodies. Six
web-development URLs shared one page; five e-commerce URLs shared another. They
were competing with each other for the same queries and splitting link equity.

Two different fixes, depending on whether the pages are genuinely different:

**Differentiated with real content (15 new service entries)** — these are real,
separately-searched specialisms, so they got their own deliverables, stack,
process and FAQs rather than being consolidated away:

`frontend-development-company` · `backend-development-company` ·
`full-stack-development-company` · `shopify-development-company` ·
`woocommerce-development-company` · `android-app-development-company` ·
`ios-app-development-company` · `flutter-app-development-company` ·
`react-native-development-company` · `enterprise-seo-services` ·
`ecommerce-seo-services` · `local-seo-services` · `ai-consulting-company` ·
`crm-consulting-company` · `instagram-marketing-agency`

**Consolidated by canonical (20 URLs)** — these are genuine synonyms, so their
canonical now points at the primary that should own the query. The pages stay
live; the ranking signal consolidates onto one URL. Full list in
`CANONICAL_MAP` in `serviceContent.js`, e.g.:

- `website-development-company` → `web-development-company`
- `custom-crm-development`, `crm-software-development` → `crm-development-company`
- `facebook-ads-agency` → `meta-ads-agency`
- `ai-solutions-company`, `custom-ai-development` → `ai-development-company`
- `digital-marketing-agency` → `digital-marketing-company`

**If you want any of these to rank independently, tell me** — removing a line from
`CANONICAL_MAP` restores it, but then it needs genuinely different content.

### Product module pages given real content

The 19 `/business-os/*` module pages shared one set of benefit cards and were
being stripped to ~90 words. Each now describes what that module actually does —
payroll runs statutory calculation and bank files, leave management runs accrual
and carry-forward rules, and so on. They went from ~91 words to 300+.

### A second content registry was found and wired in

`src/data/seoLandingPagesData.ts` powers the HR product pages and the competitor
comparison pages. It was not feeding the server-rendered HTML at all, leaving
`/hrms-software-india`, `/keka-alternative` and ~20 others at ~35 words. Now
included.

---

## 3b. Deploying this

`api/serviceContent.js`, `api/noindexPages.js` and `api/ssrContent.js` are
**generated at prebuild** from `src/data/`, exactly like the existing
`api/newSeoData.js`. They are currently untracked in git.

`npm run prebuild` runs automatically before `npm run build`, so Vercel will
generate them during deploy either way. **I would still commit them**, matching
the convention already used for `api/newSeoData.js`, so the function bundle never
depends on build ordering.

Never edit the `api/` copies directly — edit `src/data/` and rebuild.

---

## 4. Action required from you

### 4.1 Fake review markup — decide before the next deploy

Three files hardcode a **4.9 rating from 48 reviews** in structured data:

- `index.html:310`
- `src/pages/local/LocalServicePage.tsx:223`
- `src/components/seo/ProductPageTemplate.tsx:121`

Two problems:

1. **If those 48 reviews do not exist**, this is fabricated structured data and a
   direct manual-action risk.
2. **Even if they do exist**, Google has disallowed self-serving `aggregateRating`
   markup — an organisation rating itself — since 2019. It will not produce stars
   in search results, and it can trigger a structured-data manual action.

I did not remove it, because removing trust signals is your call. **My
recommendation is to remove it from all three files.** It cannot help you, it is
invisible to users, and it risks the whole recovery. Say the word and it's a
two-minute change.

### 4.2 Fill in the proof

`proof: []` in `serviceContent.js` — add real portfolio items, real metrics, real
client names you have permission to use. This is the single biggest remaining
content lever, and it is the one thing I could not do for you.

### 4.3 Confirm the claims already on the site

"150+ Happy Clients", "300+ Projects Completed", "85% Average Growth", "8+ Years"
appear in your content. If any of these are not defensible, soften them. For an
agency selling SEO, being caught with inflated numbers is expensive.

---

## 5. The honest caveat on city pages

You asked to keep the metro pages (Mumbai, Bengaluru, Pune, Hyderabad, Chennai,
Kolkata, Ahmedabad, Jaipur), so 175 location pages survive. I have made them as
genuinely different as real data allows — different districts, different sector
mixes, different use cases, different FAQs, and honest disclosure about which
cities have an office and which are served remotely.

Two things to be realistic about:

1. **Same-service city pairs still overlap ~45–65%**, because the service is the
   same. That is defensible — each page adds real local information — but it is
   not the same as 21 genuinely distinct pages.
2. **Google may still decline to index some of them.** Watch which ones convert
   to Indexed over the next 4–8 weeks. For any that stay in "Crawled – not
   indexed" after two months, the right move is to de-index them and fold the
   value into the hub page. Adding a slug to `NOINDEX_SLUGS` is a one-line change.

The 5 office cities (Gurugram, Noida, Rohtak, Mumbai, Dubai) are the strongest —
they have a real address, which is a genuine differentiator no competitor page
can copy. Prioritise those.

---

## 6. Google Search Console runbook

Do these in order, after the deploy is live.

1. **Verify the fix first.** Open `view-source:` on
   `https://www.avanienterprises.in/web-development-company-mumbai` and confirm
   you see "Web Development in Mumbai" and the Mumbai districts in the raw HTML —
   not the homepage text. If you see the old homepage block, the deploy did not
   pick up `index.html`; check that `dist/template.html` contains
   `<!--SSR-CONTENT-START-->`.
2. **Sitemaps →** resubmit `sitemap-index.xml`. It should report 321 URLs.
3. **Page indexing →** open each error bucket and click **Validate Fix**.
   Expect "Crawled – currently not indexed" to start converting in 2–4 weeks.
4. **URL Inspection → Request Indexing** on your money pages, one per day:
   homepage, `/services`, `/web-development-company`, `/seo-company`,
   `/digital-marketing-company`, `/ai-callers`, `/ai-content-services`,
   and the five office-city pages.
5. **Expect the "Excluded by noindex" count to rise by ~130.** That is the fix
   working, not a new problem. Do not panic when you see it.
6. **Re-check at 2 weeks and 6 weeks.** Anything still refused is still too thin
   — either deepen it with real specifics or de-index it.

Recovery is a curve, not a switch. Realistic window: 4–8 weeks for indexing to
recover, longer for rankings, which depend on authority (§7).

---

## 7. Off-page — the part code cannot fix

De-duplication lifts the penalty. It does not create authority. A clean site with
no backlinks still will not rank for competitive terms.

- **Google Business Profile for all five offices** — Gurugram, Noida, Rohtak,
  Mumbai, Dubai. This is the highest-return item on this list for any location
  intent, and you have a real advantage: five genuine addresses.
- **Agency directories** — Clutch, GoodFirms, DesignRush. Real profiles, real
  project entries.
- **Real reviews** on Google and Clutch. This also gives you a legitimate basis
  for review markup later, which §4.1 currently does not have.
- **Consistent NAP** — the same name, address and phone everywhere. Your content
  file lists `+91 9253625099`; the schema lists `+91-92536-25099`. Pick one format.
- **Topical depth** — one genuinely useful guide per core service beats twenty
  city pages.

---

## 8. How to maintain this

- **To de-index a page:** add its slug to `NOINDEX_SLUGS` in
  `src/data/noindexPages.js`. Sitemap and robots meta both update on next build.
- **To re-index one:** delete its line.
- **To add a service:** add an entry to `SERVICES`, map its URL in
  `SERVICE_ALIASES`, add a hub in `SERVICE_HUBS`, and add `USE_CASES` rows.
- **To add a location:** add it to `LOCATIONS` with real districts and sectors.
  Do not add a location you cannot describe truthfully — that is how the original
  problem started.
- **Never** re-add `<meta name="keywords">`. `api/seo.js` strips it anyway.
- **Never** generate pages by substituting a city name into a template. That is
  the exact pattern that caused this.
