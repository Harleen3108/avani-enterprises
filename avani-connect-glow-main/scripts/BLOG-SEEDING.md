# Blog seeding & drip publishing

Publishes well-structured posts to the backend on a drip, so the blog grows
steadily instead of all at once.

**Nothing publishes without `--confirm`.** This site is recovering from a
scaled-content demotion — a cron that publishes unreviewed posts is exactly how
that happens again.

---

## 0. What is queued right now

**`google-business-profile-map-pack-india`** — "Google Business Profile: The
Setup That Actually Wins the Map Pack". 2,021 words, SEO category, clusters to
`/seo-company`, `status: 'approved'`.

To publish it from Render Shell:

```bash
cd avani-connect-glow-main
AVANI_ADMIN_TOKEN=<admin-jwt> node scripts/seedBlogPosts.js --publish --confirm
```

The last post published was 2026-07-10, so the 3-day drip gap has long passed
and it will go out on the first run.

---

## 1. Add a post

Open `scripts/blogSeedData.js` and copy an existing entry.

```js
{
  slug: 'how-to-choose-an-seo-agency-gurgaon',   // lowercase, hyphens only
  title: 'How to Choose an SEO Agency in Gurgaon',
  excerpt: 'One or two sentences. 60+ characters. Shows on the blog index card.',

  category: 'SEO',                 // drives the /blog filter chips
  tags: ['Gurgaon', 'Agency'],     // extra tags, optional

  serviceCluster: 'seo-company',   // internal link target — the money page
  serviceLabel: 'SEO Services',
  related: ['some-other-post-slug'],

  author: 'Avani Enterprises',
  coverImage: '',                  // absolute URL, or leave blank
  status: 'draft',                 // 'approved' when ready to publish

  keyTakeaways: [ '…', '…', '…' ], // 3+ — this is what AI engines quote
  body: `markdown here`,           // 1,200+ words
  faqs: [{ q: '…', a: '…' }],      // 3+ — becomes FAQPage schema
  cta: { heading: '…', sub: '…' },
}
```

### Categories

Use one of these so it lands in an existing filter chip:

`AI` · `SEO` · `Digital Marketing` · `Social Media` · `Web Development` ·
`Business OS` · `Business` · `Insights`

A new category name works too — the filter chips and the sitemap are generated
from whatever categories exist.

### Writing the body

`body` is **markdown**. You do not need to write HTML — `src/data/blogFormat.js`
converts markdown, HTML and plain text alike at render time.

Supported: `##`/`###` headings, `-` and `1.` lists, `|` tables, `>` quotes,
`**bold**`, `` `code` ``, ```` ``` ```` fences, and `[label](/link)`.

The script assembles the final post as:

```
## Key takeaways      ← from keyTakeaways[]
<your body>
## Frequently asked questions   ← from faqs[]  → FAQPage schema
## <cta.heading>      ← from cta
## Related reading    ← from related[]
```

---

## 2. Review the queue

```bash
npm run blog:seed
```

Shows every post with its word count, category, cluster target and whether it
passes the quality gate:

- 1,200+ words
- 3+ key takeaways, 3+ FAQs
- clean lowercase-hyphen slug
- a category and a `serviceCluster`
- a CTA

A post that fails is **skipped**, never published in a weaker form.

### Check it is not a near-duplicate first

The gate counts words; it cannot tell you the topic is already covered. This
site is recovering from a scaled-content demotion, so that check matters more
than the word count does. Before approving a post, scan the 52 live titles and
ask whether it is genuinely new.

If you want to measure it, use **word-level 5-gram containment**, not trigram
similarity. Trigram similarity saturates on long documents — a post about
Google Business Profile scores 38% against a post about a viral meme, which
tells you nothing. Across the published corpus, 5-gram containment has a median
of 0.00% and a 95th percentile of 0.45%; anything above a few percent is real
passage reuse and worth investigating.

---

## 3. Approve and publish

Set `status: 'approved'` on the posts you are happy with, then:

```bash
# Dry run — shows exactly what would publish
node scripts/seedBlogPosts.js --publish

# Actually publish (one post)
AVANI_ADMIN_TOKEN=<admin-jwt> node scripts/seedBlogPosts.js --publish --confirm
```

**One post per run**, and only if `DRIP_DAYS` (default 3) have passed since the
last published post. A daily cron therefore produces roughly two posts a week.

Add `--all` to ignore the drip gap (use sparingly — that is the safeguard).

---

## 4. Running it on Render

**As a one-off:** Render dashboard → your service → **Shell**:

```bash
cd avani-connect-glow-main
AVANI_ADMIN_TOKEN=<admin-jwt> node scripts/seedBlogPosts.js --publish --confirm
```

**As a scheduled job:** Render → **New** → **Cron Job**

| Field | Value |
|---|---|
| Command | `node scripts/seedBlogPosts.js --publish --confirm` |
| Schedule | `0 4 * * *` (daily 04:00 UTC ≈ 09:30 IST) |
| Root dir | `avani-connect-glow-main` |

Environment variables:

| Key | Value |
|---|---|
| `AVANI_ADMIN_TOKEN` | admin JWT — **required** |
| `BACKEND_URL` | `https://avani-enterprises.onrender.com` |
| `DRIP_DAYS` | `3` |

The daily schedule plus the 3-day drip gap is what produces the ~2-per-week
cadence. The job exits cleanly and does nothing when no post is due, so running
it daily is safe.

> ⚠️ **Before enabling the cron**, publish two or three posts manually with
> `--confirm` and check how they render. Automated publishing should only be
> turned on once you are happy with the output.

---

## 5. After publishing

A published post is **crawlable immediately** — `api/seo.js` server-renders any
slug not yet in the build snapshot.

Redeploy the frontend when convenient to:

- fold the post into `api/blogContent.js` (no runtime fetch)
- add its URL to `sitemap.xml`
- include it in the category index and counts

Then in Search Console: resubmit `sitemap-index.xml`, and use URL Inspection →
Request Indexing on the new post.

---

## 6. What each post gets automatically

- `BlogPosting` + `BreadcrumbList` schema; `FAQPage` when FAQs are present
- An **AI Quick Summary** block derived from the post's own content
- Article typography on the light reading surface — styled headings, lists,
  tables, quotes and code
- A **Key takeaways** callout card, rendered from `keyTakeaways[]`
- **Automatic internal links**: the first mention of each service links to its
  money page (`/seo-company`, `/digital-marketing-company`, and so on). Capped
  at six per post, never inside a heading, never double-linking something you
  already linked by hand, and never linking a post to itself. Write your own
  links in markdown wherever a specific one reads better — those take priority
- Views, likes and moderated comments
- The lead form at the end (no urgency banner) with a service-specific CTA
- `generate_lead` firing with `blog:<slug>` so GA4 shows which posts produce
  enquiries
