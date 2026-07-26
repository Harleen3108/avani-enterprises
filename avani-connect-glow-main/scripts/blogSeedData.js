/**
 * blogSeedData.js — posts waiting to be published by scripts/seedBlogPosts.js.
 *
 * Add a post by copying the template below. Set `status: 'approved'` only when
 * you are happy for it to go live; the script will not publish a draft, and it
 * enforces the quality gate (1,200+ words, 3+ takeaways, 3+ FAQs, clean slug,
 * category, service cluster, CTA) regardless of status.
 *
 * `body` is markdown. src/data/blogFormat.js converts markdown, HTML and plain
 * text alike at render time, so you do not need to write HTML here.
 *
 * See scripts/BLOG-SEEDING.md for the workflow and the Render command.
 */

export default [
  {
    // ── Identity ────────────────────────────────────────────────────────────
    slug: 'how-to-choose-digital-marketing-agency-rohtak',
    title: 'How to Choose a Digital Marketing Agency in Rohtak (2026 Guide)',
    excerpt:
      'A practical guide to choosing a digital marketing agency in Rohtak — the criteria that matter, the questions to ask, the red flags, and how the local options compare.',

    // ── Classification (drives the /blog category filter) ───────────────────
    category: 'Digital Marketing',
    tags: ['Rohtak', 'Agency Selection', 'Local'],

    // ── Clustering (internal link target) ───────────────────────────────────
    serviceCluster: 'digital-marketing-company',
    serviceLabel: 'Digital Marketing Services',
    related: ['google-business-profile-setup-haryana'],

    // ── Meta ────────────────────────────────────────────────────────────────
    author: 'Avani Enterprises',
    coverImage: '',
    status: 'draft', // 'approved' to allow publishing

    keyTakeaways: [
      'Match the agency to your goal — leads, sales or brand — not to whoever ranks first.',
      'Ask for recent results in your sector, with numbers you can check.',
      'Full-service helps when web, ads, SEO and social have to work together.',
      'Rohtak has several established agencies. Compare on process and proof.',
      'Walk away from guaranteed rankings, absent reporting and vague scope.',
    ],

    body: `
Choosing a digital marketing agency in Rohtak comes down to five things: proven recent results, a clear reporting process, the right service mix for your goal, transparent pricing, and whether the team can grow with you. This guide walks through each, including the questions that separate a serious agency from a confident one — whether you end up hiring us or someone else.

## Why the right agency matters more than the cheapest one

Marketing spend only works when it is aimed well. An agency that runs ads without conversion tracking can burn a budget faster than a more expensive one that measures every rupee, because nobody can tell which half is working.

The number to compare is not the monthly fee. It is cost per qualified lead, and the only way to know it is to have tracking in place before the spending starts. An agency that cannot tell you what a qualified lead costs today has no baseline to improve on.

## What does a digital marketing agency actually do?

Most cover some combination of five things:

- **SEO** — ranking your site for what buyers actually type
- **Paid advertising** — Google and Meta campaigns that bring leads now
- **Social media** — content and community that build familiarity
- **Landing pages** — where the traffic converts into enquiries
- **Analytics** — proving which of the above worked

The advantage of a full-service team is that these connect. Ads point at a fast landing page, SEO feeds the same funnel, and one team owns the outcome — rather than three vendors each explaining that the problem sits with one of the others.

The disadvantage is real too: a generalist team may be shallower in any single discipline than a specialist. If you need one thing done exceptionally well and nothing else, a specialist is often the better buy.

## Five criteria to judge any Rohtak agency

### 1. Do they show recent, relevant results?

Ask for two or three examples from the last year, ideally in your sector, with actual numbers — cost per lead, enquiry volume, return on ad spend. "We improved their presence" is not a result.

### 2. Is the reporting clear and regular?

You should receive a monthly report tied to business outcomes, not impressions. Ask to see a sample before signing. If the sample is a screenshot of a traffic graph, expect that every month.

### 3. Do they fit your goal and stage?

A local retailer needs leads and a well-maintained Google Business Profile. A growing brand needs content and organic depth. These are different engagements, and an agency strong at one may be weak at the other.

### 4. Is pricing transparent?

Clear scope, clear deliverables, clear fee, with ad spend stated separately from the management fee. Be cautious of anyone who will not itemise what you are paying for.

### 5. Can they scale with you?

If a website, an app or automation is coming in the next year, a team that also builds those saves you re-hiring and re-explaining your business.

## The Rohtak agency landscape

Rohtak has a genuinely competitive market. Established local names include Web Aspiration, The Growth Box and Leo Digital, alongside newer full-service teams and Gurugram agencies that serve Haryana remotely.

That competition is good for you, and it means you should shortlist two or three and put the same questions to each. We are deliberately not going to characterise other agencies' pricing, team size or results here — we do not have verified information on those, and an agency that confidently describes a competitor's weaknesses is usually guessing.

## What a competent first month looks like

This is the most useful thing to ask about, because it exposes whether an agency has a process or a package. A serious first month is mostly diagnosis.

Week one should be an audit: what is currently tracked, what the site actually converts at, which queries you already appear for, and where the existing budget goes. If an agency starts running ads in week one without touching tracking, they are optimising toward numbers nobody has verified.

By the end of month one you should have working conversion tracking, a documented baseline, a written plan, and the first campaigns or fixes live. You should not yet have dramatic results, and an agency promising them in month one is describing something that does not usually happen.

## Red flags worth walking away from

- **Guaranteed rankings.** Nobody controls Google's results. A guarantee is either meaningless or a sign the agency does not understand what it is selling.
- **No tracking.** If they cannot measure leads, they cannot improve them.
- **Vague scope.** "We will handle everything" means there is nothing to hold them to in month four.
- **Pressure before proof.** A contract pushed before any audit is a sales process, not a delivery process.

## Where Avani Enterprises fits

We have an office in Rohtak, which is unusual for a digital agency — most serve Haryana remotely from Delhi or Gurugram — alongside our head office in Gurugram. Local institutes, hospitals, IMT manufacturers and retailers can have project reviews face to face.

We are full-service in a specific sense: digital marketing sits alongside web, app and AI development in the same team. If your campaigns need a faster landing page, the people who run the campaigns and the people who build the page are in the same review.

Where we are not the right fit: if you want a single specialist discipline delivered at the deepest possible level and nothing else, a dedicated specialist will likely beat us on that one axis.
    `.trim(),

    faqs: [
      {
        q: 'How much does a digital marketing agency in Rohtak cost?',
        a: 'It varies by scope — SEO, ads management and social each price differently, and ad spend is separate from the management fee. A good agency will model a realistic starting budget and expected cost per lead for your specific goal rather than quote a flat monthly number before understanding it.',
      },
      {
        q: 'How long until I see results?',
        a: 'Paid ads can produce leads within days of going live. SEO typically builds over three to six months because it depends on authority, which compounds. A sensible plan often runs ads for immediate pipeline while organic builds alongside.',
      },
      {
        q: 'Should I hire a local Rohtak agency or a big-city one?',
        a: 'Proof and process matter more than location — plenty of remote engagements work well. Local helps when you want in-person reviews or when the work depends on local knowledge, such as Google Business Profile and map-pack visibility.',
      },
      {
        q: 'Can one agency handle marketing, my website and an app?',
        a: 'Full-service agencies can, and it is usually more efficient than coordinating separate vendors because everything is built to connect. The trade-off is depth in any single discipline, so ask specifically about the capability you care most about.',
      },
      {
        q: 'What should I ask for before signing anything?',
        a: 'A sample monthly report, two recent results with numbers, a written scope with deliverables and exclusions, and clarity on who owns the ad accounts and the content. If any of those four is refused, that answers the question.',
      },
    ],

    cta: {
      heading: 'Get a free marketing audit',
      sub: 'Tell us your goal and we will map a plan with a realistic budget and expected cost per lead — no obligation, and we will say if we are not the right fit.',
    },
  },
];
