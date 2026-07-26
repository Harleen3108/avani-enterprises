# De-index list — 130 pages

**Status: LIVE.** `NOINDEX_ENABLED = true` in `src/data/noindexPages.js`, per your
instruction to apply immediately.

These pages **stay online**. They still work for ads, direct links and anyone who
has the URL. What changed is that they carry `robots: noindex,follow` and are no
longer in the sitemap, so Google stops counting them against site quality.

`follow` is deliberate: any link equity these pages hold still flows through to
the pages you keep.

**To reverse any single page:** delete its line from `NOINDEX_SLUGS` in
`src/data/noindexPages.js` and redeploy.
**To reverse everything:** set `NOINDEX_ENABLED = false`.

---

## Why these and not others

You confirmed real presence in: **Gurgaon, Noida, Rohtak, Mumbai, Dubai**
(offices), the **NCR belt**, **all-India metros**, plus **UAE, Singapore and the
US** for delivery.

Everything on this list is a `{service}-{location}` clone for somewhere outside
that footprint. Each was one template with a place name substituted — the same
four benefit cards and the same two FAQs as 250+ other pages.

**Nothing on this list is a service page, product page, comparison page, blog
post or core page.** Only location clones. Your service hubs, `/business-os`,
`/social-sync`, the `-alternative` comparison pages and all content pages remain
fully indexable.

---

## Kept (for contrast) — 175 location pages

`gurgaon` · `noida` · `rohtak` · `mumbai` · `dubai` (offices) · `delhi` ·
`greater-noida` · `faridabad` · `ghaziabad` · `haryana` · `india` ·
`bangalore` · `pune` · `hyderabad` · `chennai` · `kolkata` · `ahmedabad` ·
`jaipur` · `uae` · `singapore` · `usa`

---

## The list

### Punjab & Chandigarh belt — 43 pages
No office, no delivery presence. Chandigarh was the largest single cluster at 9.

**chandigarh (9)** — `agentic-ai-development-company` · `ai-video-services` ·
`digital-marketing-agency` · `digital-marketing-company` · `google-ads-agency` ·
`meta-ads-agency` · `mobile-app-development-company` ·
`social-media-marketing-agency` · `web-development-company`

**punjab (8)** · **ludhiana (8)** · **amritsar (8)** · **jalandhar (8)** —
each cloned across: `agentic-ai-development-company`, `ai-video-services`,
`digital-marketing-agency`, `google-ads-agency`, `meta-ads-agency`,
`mobile-app-development-company`, `social-media-marketing-agency`,
`web-development-company`

**panipat (2)** — `seo-company-panipat` · `web-development-company-panipat`

### Uttar Pradesh (non-NCR) — 24 pages
NCR districts of UP — Noida, Greater Noida, Ghaziabad — are **kept**. These are not.

**uttar-pradesh (8)** · **lucknow (8)** · **kanpur (8)** · **varanasi (8)**
*(varanasi listed under UP; 8 services each)*

### Rajasthan (excluding Jaipur) — 16 pages
Jaipur is **kept**. These are not.

**rajasthan (8)** · **udaipur (8)**

### "North India" regional pages — 8 pages
**north-india (8)** — a made-up geography with no search demand and no office.

### International, no presence — 24 pages
UAE, Singapore and the US are **kept**. These are not.

**uk (8)** · **canada (8)** · **australia (8)** ·
plus `web-development-company-london`, `web-development-company-abu-dhabi`,
`web-development-company-qatar`

### Haryana towns without an office — 4 pages
Gurgaon and Rohtak have offices and are **kept**. These four do not.

`web-development-company-karnal` · `web-development-company-sonipat` ·
`web-development-company-hisar` · `web-development-company-ambala`

---

## Also excluded from the sitemap (unchanged behaviour)

These four were **already** served with `noindex` by the previous code, but were
still listed in the sitemap — a contradictory signal. They are now consistently
excluded:

`auto-dm-tool` · `bulk-dm-tool` · `instagram-reels-scheduler` ·
`social-media-content-planner`

**If you want these indexed, tell me** — they are SocialSync product pages and
could be worth keeping. Removing them from `NOINDEX_UTILITY` takes one edit. I
left the previous behaviour in place rather than changing it without asking.

---

## What to expect in Search Console

- **"Excluded by 'noindex'" will jump by ~130.** This is the fix working. It is
  the expected outcome, not a regression.
- **"Crawled – currently not indexed" should shrink** over 2–6 weeks as the
  remaining pages get re-crawled and now have unique content to read.
- **Total indexed pages will fall, then recover.** A smaller set of pages that
  Google is willing to index beats a large set it refuses.

---

## If you disagree with any of these

Tell me the location and I will move it to the kept set — but if we keep it, it
needs real content: actual districts, actual local sector mix, and honest
disclosure that delivery is remote. The one thing that cannot happen is keeping a
page that is a template with a place name in it. That is what caused this.
