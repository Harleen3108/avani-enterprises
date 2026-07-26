# Drip blog posts — spec

How the auto-dripping blog works, and how to add posts to it.

---

## The mechanism

There is **no cron and no scheduler**. Every post is stored with
`isPublished: true` and a **future `publishedAt`**, spaced 2 days apart. The
public endpoints in `index.js` filter:

```js
{ isPublished: true, publishedAt: { $lte: new Date() } }
```

A post is therefore invisible until its date arrives, then appears on its own.
The queue drains itself. Nothing has to stay running and nothing can fail at 4am.

Admin routes deliberately do **not** filter, so the whole queue stays visible and
editable at `/blogs` in the dashboard.

### Run it

```bash
node scripts/seedDripBlogPosts.js            # seed / refresh the queue
node scripts/seedDripBlogPosts.js --dry      # show the plan, write nothing
node scripts/seedDripBlogPosts.js --status   # what is live vs still queued
node scripts/seedDripBlogPosts.js --reschedule  # re-anchor the whole calendar
```

Idempotent. Re-running refreshes content and SEO fields for slugs that already
exist but **keeps their existing `publishedAt`**, so fixing a typo in post 40
never reshuffles the calendar. New slugs are appended after whatever is already
queued.

---

## Adding posts later

1. Create `scripts/_dripBlogPart13.js` (next free number) exporting an array.
2. Write ~5 posts in it following the shape and rules below.
3. Run `node scripts/seedDripBlogPosts.js` in the Render Shell.

Files are loaded in numeric order, and that order is the publishing order.

---

## Post shape

```js
module.exports = [
  {
    slug: 'lowercase-hyphen-only',        // unique; becomes /blog/<slug>
    title: 'Sentence case, under ~65 chars',
    category: 'SEO',                       // drives the /blog filter chips
    tags: ['Technical SEO', 'India'],

    excerpt: 'One or two sentences, 100-180 chars. Shows on the index card.',

    metaTitle: 'Under 60 chars. Contains the target keyword.',
    metaDescription: 'Around 155 chars. Contains the keyword. Reads like a promise, not a summary.',
    metaKeywords: ['primary keyword', 'variant', 'related term'],

    coverImage: '',                        // absolute URL, or '' for none

    keyTakeaways: [                        // 3-5. Renders as the callout card.
      'A complete, quotable sentence — this is what AI answer engines lift.',
    ],

    content: `<p>HTML string. See the content rules below.</p>`,

    faqs: [                                // 4-6. Becomes FAQPage schema.
      { q: 'A question someone actually types?', a: 'A direct answer in 2-4 sentences.' },
    ],

    author: 'Avani Enterprises',
  },
];
```

`readTime` and `canonical` are computed by the seeder. Do not set them.

---

## Content rules

**Length**: 900-1500 words of genuinely useful HTML. Never padded.

**Structure**: `<h2>` sections, `<h3>` sub-sections, `<ul>`/`<ol>`, and a
`<table>` wherever a comparison earns one. Never `<h1>` — the page owns that.

**No inline styles.** `src/data/blogFormat.js` strips `style=`, `color=` and
`bgcolor=` attributes before rendering, because posts arriving from various
editors carried colours that fought the theme. Use the classes below instead.

**One target keyword per post**, placed in: the slug, the title, `metaTitle`,
the first paragraph, and at least one `<h2>`. Do not repeat it mechanically
beyond that.

**Answer-engine formatting.** Most `<h2>`s should be real questions, and the
paragraph immediately after each should answer it directly in the first sentence
before elaborating. That pattern is what gets a page quoted by AI Overviews,
ChatGPT and Perplexity — the answer has to be liftable without context.

### Internal links — 3 to 6 per post

Use real routes only. Every link below is verified live:

| Purpose | Routes |
|---|---|
| SEO | `/seo-company`, `/seo-company-gurgaon`, `/seo-company-mumbai`, `/seo-company-delhi`, `/ecommerce-seo-services` |
| Marketing | `/digital-marketing-company`, `/social-media-marketing-company` |
| Build | `/web-development-company`, `/mobile-app-development-company`, `/ecommerce-development-company` |
| AI | `/ai-development-company`, `/ai-automation-company`, `/ai-chatbot-development`, `/ai-consulting-company`, `/ai-callers`, `/ai-content-services` |
| Products | `/business-os`, `/social-sync` |
| Guides | `/guides`, `/guides/why-google-is-not-indexing-my-pages`, `/guides/how-to-choose-an-seo-agency`, `/guides/website-development-cost-india`, `/guides/ai-chatbot-vs-ai-voice-agent`, `/guides/google-ads-vs-meta-ads-which-first`, `/guides/agentic-ai-vs-traditional-automation`, `/guides/shopify-vs-woocommerce-which-should-you-choose`, `/guides/build-or-buy-a-crm` |
| Company | `/contact`, `/services`, `/about`, `/projects`, `/case-studies` |

> **Podcast has no page yet.** `/podcast-production-company` returns 200 but
> falls through to the generic template and is not in the sitemap — the service
> exists in `serviceContent.js` as `podcast-production` with no page generated
> for it. Do not link to it. Podcast posts should link to `/services` until a
> real page exists. `scripts/verifyDripPosts.cjs` checks every link against
> `_allowedRoutes.json`, which is generated from the live sitemap, so a link to
> a non-existent page fails the build rather than shipping.

Also link **2-4 other posts in this queue** as `/blog/<slug>`, so the cluster
interlinks. Link forward and backward freely — a link to a post that has not
dripped yet simply becomes live when that post does.

Links must sit inside sentences where they genuinely help. A link dump at the
bottom is worth nothing.

### Lead-capture CTA — twice per post

Once mid-article, once at the end. Use exactly this markup:

```html
<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Specific to this article's topic</h3>
  <p>One or two sentences. Say what they get and that there is no obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>
```

`/contact` is the lead form. It posts to `/submit-form`, which emails the lead
with the originating page and stores it against the post in the admin.

Vary the heading and body per post so it reads as part of the article. Never
reuse the same CTA copy twice.

---

## Honesty rules — non-negotiable

This site is recovering from a scaled-content demotion and a round of
unverifiable-claims cleanup. Every post must hold to this:

- **No invented statistics.** No "73% of businesses…" unless it is a real,
  named, linkable source. Prefer "most", "commonly", "in our experience".
- **No fabricated case studies, client names, revenue figures or timelines.**
- **No review counts, ratings or client counts.**
- **No fake urgency** — no limited slots, countdowns or crossed-out prices.
- **No guarantees** about rankings or results.
- Mechanisms, checklists and trade-offs are what make a post valuable. Write
  those, and the post does not need invented proof.

Real, verifiable specifics are encouraged: how an algorithm behaves, what a
setting does, what a documented policy says, what a metric means.

Where a topic touches finance, legal or compliance, state plainly that it is
general information and not professional advice.
