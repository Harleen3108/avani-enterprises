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
 * UNIQUENESS MATTERS MORE THAN VOLUME
 * -----------------------------------
 * This site is recovering from a scaled-content demotion. Before publishing,
 * check the post against the 52 already live — topic overlap is what caused the
 * problem in the first place. The first draft of this file was a "how to choose
 * a digital marketing agency in Rohtak" piece that measured 56% trigram
 * similarity against the corpus (the 95th percentile; the median pair is 37%),
 * because two near-identical posts already existed:
 *
 *   • "How to Choose a Digital Marketing Agency in India Without Getting Burned"
 *   • "digital marketing agency in Rohtak, Gurgaon & Mumbai"
 *
 * It was replaced with a topic the corpus genuinely does not cover.
 *
 * See scripts/BLOG-SEEDING.md for the workflow and the Render command.
 */

export default [
  {
    // ── Identity ────────────────────────────────────────────────────────────
    slug: 'google-business-profile-map-pack-india',
    title: 'Google Business Profile: The Setup That Actually Wins the Map Pack',
    excerpt:
      'Most local businesses fill in their Google Business Profile once and never touch it again. Here is what the three-result map pack actually rewards, the setup checklist, and the mistakes that get profiles suspended.',

    // ── Classification (drives the /blog category filter) ───────────────────
    category: 'SEO',
    tags: ['Local SEO', 'Google Business Profile', 'Map Pack'],

    // ── Clustering (internal link target) ───────────────────────────────────
    serviceCluster: 'seo-company',
    serviceLabel: 'SEO Services',
    related: [],

    // ── Meta ────────────────────────────────────────────────────────────────
    author: 'Avani Enterprises',
    coverImage: '',
    // Approved so `node scripts/seedBlogPosts.js --publish --confirm` will
    // publish it. The drip gate and the quality gate still apply.
    status: 'approved',

    keyTakeaways: [
      'The map pack shows three results. Ranking fourth is functionally the same as ranking fortieth, so local SEO is a different game from ten blue links.',
      'Google names three factors: relevance, distance and prominence. You cannot change distance, which means category accuracy and prominence are where the work is.',
      'Your primary category does more than any other single field. Pick the one that describes what you are, not the one with the most searches.',
      'Name, address and phone must be byte-identical everywhere. "Ltd" in one place and "Limited" in another is a mismatch to a machine.',
      'Claiming an address you do not staff is the fastest route to suspension, and reinstatement is far harder than getting it right first time.',
    ],

    body: `
A Google Business Profile is the single highest-leverage local SEO asset most businesses own, and the one they touch least. It is usually filled in once during setup, never revisited, and then blamed for not producing calls.

This is a working guide to what the profile actually rewards, what to fill in and in what order, how to measure whether it is working, and the specific mistakes that get profiles suspended.

## What the map pack is, and why three slots changes everything

Search for a service plus a place — "dentist near me", "[seo company](/seo-company) in Gurgaon", "CA firm Andheri" — and Google returns a map with **three** business listings above the organic results. That block is the local pack, or map pack.

Three slots is the whole story. In organic search, position six still gets clicks. In the map pack, position four is invisible until someone taps "More places", and most people do not. The distribution is brutal in a way that ordinary SEO is not, which is why local deserves its own strategy rather than being treated as a footnote to your main [SEO](/seo-company) work.

## The three factors Google actually names

Google publishes its local ranking factors, which is unusually direct of them. There are three:

| Factor | What it means | How much control you have |
|---|---|---|
| Relevance | How well your profile matches what was searched | High — categories, services, description |
| Distance | How far you are from the searcher or the searched location | None |
| Prominence | How well known the business is, online and off | Medium — reviews, citations, links, coverage |

Distance is the one people waste the most energy on, because it is the one they cannot change. You will not rank in the pack for a suburb 30 km away by wishing. What you can change is relevance — which is mostly a data-entry problem — and prominence, which is a slow compounding one.

That asymmetry should shape your effort. Relevance is a weekend of careful work. Prominence is a year of consistent work. Do the weekend first.

## The setup checklist, in priority order

Work top to bottom. The items are not equally weighted, and the first three carry most of it.

| # | Field | Why it matters |
|---|---|---|
| 1 | Primary category | The single strongest relevance signal on the profile |
| 2 | Business name | Must match real-world signage. No keyword stuffing |
| 3 | Address and service area | Determines which searches you are even eligible for |
| 4 | Secondary categories | Widens eligibility without diluting the primary |
| 5 | Services and products | Lets you list what you do in Google's own vocabulary |
| 6 | Hours, including holidays | Affects both ranking and whether people bother calling |
| 7 | Description | 750 characters. Read by humans; light ranking weight |
| 8 | Photos | Drives engagement, which feeds prominence |
| 9 | Booking or enquiry link | Turns a listing into a lead |

### Getting the primary category right

This is the field people get wrong most often, usually by choosing the category with the biggest apparent search volume rather than the one that describes the business.

Google's category list is fixed — you pick from it, you do not write your own. The primary category should answer "what is this business" in one phrase. Everything you also do goes in secondary categories.

A marketing agency that also builds websites should be **Marketing Agency** primary, **Website Designer** secondary — not the reverse, unless website work is genuinely the larger part of the business. If you are unsure which way round, look at your revenue split, not your ambitions.

Changing the primary category later resets some of the trust the profile has accumulated, so it is worth ten minutes of thought now.

### Name: use your actual name

The temptation is to file as "Sharma Dental — Best Dentist in Rohtak". Do not. The business name field must match the name on your signage, your paperwork and your storefront.

Keyword stuffing the name field is one of the most commonly reported violations, precisely because competitors can see it and report it in about fifteen seconds. The penalty is a name reset or a suspension, and you lose whatever the stuffing gained you plus everything else.

## NAP consistency: the boring thing that actually moves rankings

NAP is name, address and phone. Google cross-references your profile against your website, directories, and any other mention of your business it finds. Consistency is a trust signal; inconsistency is noise.

The bar is higher than people assume. These are all mismatches to a machine:

- "Sector 39" on the website, "Sec. 39" on the profile
- "+91 92536 25099" in one place, "092536 25099" in another
- Two different suite numbers because you moved within the same building
- "Pvt Ltd" versus "Private Limited"

Pick one canonical version of each field. Write it down. Use exactly that string everywhere — website footer, contact page, structured data, directory listings, invoices, email signature. When you change one, change all of them in the same week.

The practical way to do this is to keep the canonical NAP in one place in your codebase and have every page read from it, rather than retyping it per template. Retyping is how a business ends up with three versions of its own address without anyone noticing.

## Reviews, without breaking the rules

Reviews feed prominence, and they are the part of the profile a business can most directly influence. The rules are narrower than most people realise:

- **You may ask.** Asking customers for reviews is explicitly allowed.
- **You may not incentivise.** No discounts, no entries into a draw, no free anything in exchange for a review. This is a policy violation, and Google has become better at detecting review patterns that look bought.
- **You may not filter.** Asking only your happy customers — "review gating" — is against policy. Ask everyone.
- **You should reply.** To all of them, including the bad ones, in public, without arguing.

The mechanics that work are unglamorous: ask at the moment the customer is most satisfied, which is usually right after the work is delivered rather than a month later in a newsletter; send the direct review link rather than asking them to search for you; and make it one tap on a phone.

A steady trickle of reviews over time reads as more genuine than fifteen in one week, both to Google and to the person reading them.

## Photos and Posts: engagement is a signal

Profiles with current photos get more interaction, and interaction feeds prominence. This does not require a photographer:

- Exterior shots that help someone recognise the building from the street
- Interior shots so they know what to expect walking in
- The team, so the business looks staffed by people
- Actual work, where the client is happy to be shown

Replace them periodically rather than uploading forty once. Google Posts — short updates that appear on the profile — are worth a fortnightly cadence if you can sustain it, and worth skipping entirely if you cannot; an abandoned Posts feed is worse than none.

## Service areas versus an address, and the suspension risk

This is where businesses get into real trouble.

If customers come to you, you have an address and you display it. If you travel to customers, you can hide the address and set service areas instead. If you do both, display the address and add service areas.

What you cannot do is claim a location you do not physically staff. Virtual offices, coworking hot desks used occasionally, a relative's address in a city you want to rank in, a mailbox — all of these are grounds for suspension, and reinstatement is a slow, evidence-heavy process with no guaranteed outcome.

The reason this is tempting is obvious: distance is a ranking factor you cannot otherwise influence, so inventing proximity looks like the shortcut. It is a shortcut that risks the entire profile, including the locations that are real.

We apply this to ourselves. We publish addresses and local schema for the three offices we actually staff — Gurugram, Rohtak and Mumbai — and describe every other city as a market we deliver into, because that is what it is. It costs us some local visibility. It is still the right trade.

## Measuring whether any of this worked

The profile's performance report gives you real numbers. The ones worth watching:

| Metric | What it tells you |
|---|---|
| Searches breakdown | Whether people find you by name (direct) or by service (discovery) |
| Calls | The clearest lead signal on the profile |
| Direction requests | Real intent to visit, and roughly where from |
| Website clicks | How much of your site traffic the profile is sending |
| Messages | Only meaningful if you actually answer them promptly |

The number to watch is **discovery searches** as a share of the total. Direct searches mean people already knew your name. Discovery searches mean the profile is winning you customers who did not. If discovery is not growing, your relevance and prominence work is not landing, whatever the total impressions say.

Set a baseline before you change anything, then compare quarter on quarter rather than week on week. Local data is noisy at small volumes and seasonal in most sectors.

## The mistakes that cost the most

- **Keyword-stuffed business name** — easily reported, commonly penalised
- **An address you do not staff** — the highest-risk item on this list
- **Categories chosen for volume** rather than accuracy
- **Inconsistent NAP** across the website and directories
- **Incentivised or gated reviews** — a policy violation, not a grey area
- **Unanswered questions and messages** — visible to everyone considering you
- **Hours that are wrong on public holidays** — a small thing that generates genuinely angry reviews

None of these are clever. That is rather the point: local search is won by getting unremarkable things consistently right, which is why so few businesses win it.
    `.trim(),

    faqs: [
      {
        q: 'How long does it take to rank in the map pack?',
        a: 'Category and profile fixes can show movement within a few weeks because relevance is recalculated as your data changes. Prominence — reviews, citations, coverage — compounds over months. A realistic expectation is small improvements in the first month from setup corrections, and meaningful movement over one to two quarters.',
      },
      {
        q: 'Can I rank in a city where I do not have an office?',
        a: 'Not in that city\'s map pack, in most cases — distance is a ranking factor and you cannot fake proximity without risking suspension. You can rank organically for city-qualified searches with a well-built location page, which is a different and entirely legitimate route.',
      },
      {
        q: 'How many reviews do I need?',
        a: 'There is no threshold. What matters is being credible relative to the businesses you compete with locally, and having reviews arrive steadily rather than in bursts. Recency and the pattern over time carry weight, not just the count.',
      },
      {
        q: 'Does posting on Google Posts help rankings?',
        a: 'The direct ranking effect is small. The indirect effect is real: Posts occupy space on your profile, give a reason to click, and signal an active business. Worth doing at a cadence you can sustain, not worth doing sporadically.',
      },
      {
        q: 'My profile was suspended. What now?',
        a: 'Do not create a second profile — duplicates make reinstatement harder. Work out which policy was breached, correct it genuinely, then file a reinstatement request with evidence: signage photos, a utility bill or lease at the address, registration documents. The process takes weeks and the outcome is not guaranteed, which is why the address rules are worth respecting from the start.',
      },
    ],

    cta: {
      heading: 'Want your local visibility looked at?',
      sub: 'We will audit your Google Business Profile against everything above and send you the specific fixes in priority order — no obligation, and we will say plainly if there is nothing worth changing.',
    },
  },
];
