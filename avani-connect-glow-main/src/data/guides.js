/**
 * guides.js — the long-form guide cluster.
 *
 * WHY THESE ARE CODE, NOT BLOG POSTS
 * ----------------------------------
 * /blog and /blog/:slug fetch from the backend API on the client. Googlebot's
 * first pass therefore sees an empty shell — the same root cause that kept the
 * service pages out of the index. Until the blog is server-rendered, anything
 * published there is a second-pass gamble.
 *
 * These guides live in the repo instead, so api/seo.js renders them into the
 * first-crawl HTML with full Article + FAQPage schema. They are the topical
 * depth layer: each one targets a real commercial-research query and links up
 * to the service page that should convert the reader.
 *
 * HONESTY RULES APPLIED HERE
 *   • No invented statistics, market averages or client results.
 *   • Price figures are Avani's own published ranges from the company content
 *     doc, framed as our quotes — never as "typical market rates".
 *   • Where a number is a published external standard (Core Web Vitals
 *     thresholds, for example) it is stated as such.
 *   • Every guide names cases where the answer is "do not hire us for this".
 *
 * TO ADD A GUIDE: add an entry here. The route, sitemap, schema and internal
 * links all pick it up automatically — no per-file wiring.
 */

/* DATA-START */

const GUIDE_BASE = 'guides';

const GUIDES = {
  'why-google-is-not-indexing-my-pages': {
    title: 'Why Google Is Not Indexing Your Pages (And How to Fix It)',
    metaTitle: 'Why Google Is Not Indexing Your Pages — Diagnosis & Fix | Avani Enterprises',
    description:
      'Crawled – currently not indexed, Discovered – not indexed, and Duplicate without canonical each mean something different. How to read the Search Console buckets and what actually fixes them.',
    published: '2026-07-20',
    updated: '2026-07-20',
    service: 'seo-company',
    serviceLabel: 'SEO Services',
    related: ['how-to-choose-an-seo-agency', 'website-development-cost-india'],
    takeaways: [
      '"Crawled – currently not indexed" is a quality judgement: Google fetched the page and decided it was not worth storing.',
      '"Discovered – currently not indexed" is usually a crawl-budget or perceived-value problem, not a technical error.',
      'The most common cause on large sites is many pages that are one template with a word swapped.',
      'Fixing it means making pages genuinely different or removing them from the index — there is no third option.',
      'Recovery takes weeks to months, because Google must re-crawl before it can re-evaluate.',
    ],
    sections: [
      {
        heading: 'The three buckets, and why the difference matters',
        paragraphs: [
          'Google Search Console groups unindexed pages into buckets, and people tend to read them all as "broken". They are not the same problem and they do not have the same fix.',
          '**Discovered – currently not indexed** means Google knows the URL exists but has not fetched it. That is usually about perceived value: Google allocates crawl attention based on how worthwhile a site has proved to be, and if it has already crawled hundreds of similar pages from you, it will deprioritise the rest. It can also be a genuine crawl-budget problem on very large sites.',
          '**Crawled – currently not indexed** is harsher. Google fetched the page, read it, and chose not to store it. There is no technical fault to fix — this is a quality judgement. Something about the page did not justify a slot in the index.',
          '**Duplicate, Google chose a different canonical** means Google found another page it considers the better version of the same content. Often that other page is yours.',
          '**Alternate page with proper canonical tag** is normal and expected — that is your canonical working as designed. It is not an error, and a surprising number of people try to "fix" it.',
        ],
      },
      {
        heading: 'The most common cause: pages that are the same page',
        paragraphs: [
          'On sites with more than a few dozen URLs, the usual culprit is scaled templating — a service page cloned across cities, an industry, or a product variant, where the only thing that changes is a name.',
          'Google is explicit that scaled content abuse is a spam policy violation, and its detection does not require exact duplication. Spun text, reordered sections and synonym swaps are caught by the same systems. If a page could be produced by find-and-replace on another page, it is at risk.',
          'The test worth applying: strip the navigation and footer, then ask whether the remaining content contains a single fact that could not appear on the sibling page. If the answer is no, the page is not going to be indexed, and it may be dragging the rest of the site down with it.',
        ],
      },
      {
        heading: 'The second cause people miss: your HTML has no content in it',
        paragraphs: [
          'If your site is a single-page application — React, Vue, Angular — check what the server actually sends. Open the page, then view source rather than using the browser inspector. The inspector shows the DOM after JavaScript has run; view-source shows what the crawler receives first.',
          'It is common to find that every URL on the site returns the same shell, with the real content painted in afterwards by JavaScript. Google can render JavaScript, but rendering is queued and deferred, and the first-pass signal is the raw HTML. If that HTML is identical across every URL, every URL looks like a duplicate at the moment Google is deciding whether to bother.',
          'This is worth checking before rewriting any content, because no amount of content improvement helps if the crawler never receives it. Server-side rendering or a build-time prerender fixes it.',
        ],
      },
      {
        heading: 'How to actually fix it',
        paragraphs: [
          'Start with the diagnosis, not the cure. Export the Page Indexing report and group the affected URLs by pattern. If more than a third of them share a template, that is your problem, and adding content to individual pages will not solve it.',
          'For each templated group, there are only two honest outcomes. Either the page can carry information that genuinely differs from its siblings — real local detail, real sector-specific application, real distinct specification — or it cannot, in which case it should carry a noindex and be removed from the sitemap. Keeping a page indexable in the hope Google changes its mind does not work.',
          'De-index with `noindex,follow` rather than deleting. It is reversible, it keeps the page available for paid traffic and direct links, and the follow directive means any link equity the page holds still flows through to the pages you kept.',
          'Then fix the internal linking. Pages sitting in "Discovered – not indexed" frequently have very few internal links pointing at them. Google follows links to decide what is worth crawling, and an orphan page is telling it the page does not matter.',
        ],
      },
      {
        heading: 'What to expect afterwards',
        paragraphs: [
          'Two things will happen that look like regressions and are not. Your "Excluded by noindex" count will rise, sometimes dramatically — that is the de-indexing working. And your total indexed page count will fall before it recovers. A smaller set of pages Google is willing to index is worth more than a large set it refuses.',
          'Timing is measured in weeks, not days. Google must re-crawl before it can re-evaluate, and crawl frequency on a site with a quality problem is low by definition. Four to eight weeks before the buckets start moving is normal. Submit the trimmed sitemap, use Validate Fix on each bucket, and request indexing on your most important pages — but manual requests are a nudge, not a lever.',
        ],
      },
      {
        heading: 'When this is not your problem',
        paragraphs: [
          'If your site has fewer than about fifty pages and they are all genuinely distinct, indexing is probably not your bottleneck — authority is. A clean, unique, well-structured site with no inbound links will be indexed and still not rank. That is a different project, and content restructuring will not move it.',
          'Equally, if the pages that are not indexed are ones you never wanted indexed — filtered listings, tag archives, paginated duplicates — the report is working correctly and needs no action beyond confirming the canonicals are right.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does it take for pages to get indexed after fixing the problem?',
        a: 'Typically four to eight weeks before the Search Console buckets start moving meaningfully, and longer on large sites. Google has to re-crawl before it can re-evaluate, and crawl frequency is itself reduced on a site it has judged poorly, so the first few weeks are usually quiet.',
      },
      {
        q: 'Will requesting indexing in Search Console force Google to index a page?',
        a: 'No. It moves the URL into a priority crawl queue, but the indexing decision is unchanged. If the page was refused on quality grounds, requesting indexing gets it re-evaluated faster and refused again.',
      },
      {
        q: 'Should I delete pages that will not index, or noindex them?',
        a: 'Noindex, in almost every case. Deleting throws away any links and traffic the page had, breaks anything pointing at it, and is not reversible. A noindex with follow keeps the page usable for ads and direct visitors while removing it from the index, and you can undo it in one line.',
      },
      {
        q: 'Does having many noindexed pages hurt my site?',
        a: 'No. What hurts is having many low-quality pages that are indexable. Noindex is how you tell Google not to weigh them against you.',
      },
      {
        q: 'My pages are unique but still not indexed. What now?',
        a: 'Check what the server sends before JavaScript runs — view-source, not the inspector. If every URL returns the same shell, the pages are not unique from the crawler\'s point of view no matter what a user sees. After that, look at internal linking and at whether the site has enough authority for Google to consider the pages worth storing.',
      },
    ],
  },

  'website-development-cost-india': {
    title: 'What a Website Actually Costs in India — And What Drives the Number',
    metaTitle: 'Website Development Cost in India — Real Pricing Factors | Avani Enterprises',
    description:
      'What changes a website quote from ₹15,000 to ₹5,00,000, which costs are one-off versus ongoing, and the questions to ask before comparing two quotes that look different.',
    published: '2026-07-20',
    updated: '2026-07-20',
    service: 'web-development-company',
    serviceLabel: 'Web Development',
    related: ['shopify-vs-woocommerce-which-should-you-choose', 'why-google-is-not-indexing-my-pages'],
    takeaways: [
      'Avani quotes web and app projects in the ₹15,000–₹5,00,000 range, typically delivered in 4–12 weeks.',
      'Scope, integrations and content ownership drive the number far more than page count does.',
      'A template build is genuinely cheaper up front; the cost usually reappears as a performance or SEO ceiling later.',
      'Ongoing costs — hosting, maintenance, security updates — are separate from the build and worth quoting explicitly.',
      'Two quotes that differ by 5x are usually not quoting the same thing. Compare deliverables, not totals.',
    ],
    sections: [
      {
        heading: 'The honest answer: it depends, and here is what on',
        paragraphs: [
          'We quote website and application projects between ₹15,000 and ₹5,00,000, usually delivered in four to twelve weeks. That range is wide because the work behind it varies enormously, and any agency giving you a single number before understanding your requirements is guessing.',
          'What follows is what actually moves a quote within that range, so you can estimate roughly where you sit before anyone talks to you — and so you can tell whether two quotes are comparing the same thing.',
        ],
      },
      {
        heading: 'What increases the cost',
        paragraphs: [
          '**Custom design versus a theme.** A purchased theme configured to your brand is the cheapest route and can be entirely appropriate. Custom design means research, wireframes, visual design and a component system, and it costs several times more.',
          '**Integrations.** A brochure site that sends an email is straightforward. A site that writes into your CRM, checks live inventory, takes payments, issues invoices and syncs to accounting is a different project. Each integration carries its own testing and failure-handling work, and integrations are where timelines slip.',
          '**Custom functionality.** Booking systems, user accounts, dashboards, calculators and anything with business logic behind it are software, not pages. They are estimated as software.',
          '**Content.** Copywriting, photography and video are frequently excluded from quotes and then become an unbudgeted cost, or worse, the reason a finished site sits unlaunched for two months.',
          '**Scale.** Twenty pages of the same template costs little more than five. Twenty genuinely different page types is a different order of work.',
        ],
      },
      {
        heading: 'What people expect to cost more and does not',
        paragraphs: [
          'Mobile responsiveness is not an add-on. Any competent build in 2026 is responsive by default, and an agency quoting it as a line item is padding.',
          'Basic on-page SEO — semantic markup, meta tags, clean URLs, a sitemap, structured data — should be part of the build, not an upsell. Retro-fitting it costs more than doing it correctly the first time, which is why we treat it as part of the job.',
          'Reasonable page speed likewise. Core Web Vitals thresholds are published by Google — largest contentful paint under 2.5 seconds, interaction to next paint under 200 milliseconds, cumulative layout shift under 0.1 — and hitting them is mostly a matter of not making avoidable mistakes during the build.',
        ],
      },
      {
        heading: 'The costs that come after launch',
        paragraphs: [
          'Hosting, a domain, and SSL are ongoing and small. Maintenance is ongoing and easy to underestimate: dependency updates, security patches, backups, and fixing whatever breaks when a browser or a payment gateway changes. A site left unmaintained for two years is usually a rebuild rather than an update.',
          'If you took a WordPress or WooCommerce route, plugin licences renew annually and add up. If you took a SaaS platform route, the subscription and transaction fees are the ongoing cost instead.',
          'Ask for these to be quoted separately and explicitly. A build quote that stays silent on year two is not a complete picture.',
        ],
      },
      {
        heading: 'How to compare two quotes properly',
        paragraphs: [
          'Ask each supplier the same five questions and the difference usually explains itself. Who owns the code and the accounts at the end? Is the design custom or a configured theme? Which integrations are in scope, and what happens when one of them fails? Who writes the content? What is included after launch, and for how long?',
          'A quote that is a fifth of another is not necessarily worse value — it may simply be a smaller job, honestly priced. The problem is only when you find that out after signing.',
        ],
      },
      {
        heading: 'When you should not commission a custom build',
        paragraphs: [
          'If you need a single-page presence to validate an idea this month, a website builder will do it faster and cheaper than any agency, and we will tell you so.',
          'If you are pre-revenue and the site is not the product, spend the money on finding out whether anyone wants what you are selling. A well-built website for a business that has not found its market is an expensive way to learn that.',
          'Custom becomes the right call when the site has to do something a product cannot, when performance or SEO is a genuine commercial constraint, or when you need to own the thing you are building on.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a website cost in India?',
        a: 'We quote web and app projects between ₹15,000 and ₹5,00,000 depending on scope, with most projects delivered in four to twelve weeks. The largest cost drivers are custom design versus a theme, the number of live integrations, and whether the site includes custom functionality rather than pages.',
      },
      {
        q: 'Why do website quotes vary so much between agencies?',
        a: 'Usually because they are quoting different work. A configured theme with a contact form and a custom-designed site with CRM and payment integration are both "a website", and the gap between them is genuine rather than a margin difference. Compare the deliverable list rather than the total.',
      },
      {
        q: 'Is a cheap template website a bad idea?',
        a: 'Not inherently, and for many small businesses it is the right decision. The trade-off is that themes carry markup you cannot control, which tends to cap performance scores and makes technical SEO fixes difficult later. If organic search is not a major channel for you, that trade-off may never cost you anything.',
      },
      {
        q: 'What are the ongoing costs after launch?',
        a: 'Hosting and domain renewal, plus maintenance — dependency updates, security patches, backups and small changes. On WordPress or WooCommerce, add annual plugin licences. Ask for these to be quoted separately from the build.',
      },
      {
        q: 'Do I own the website code?',
        a: 'With us, yes — you receive the repository and the deployment configuration, so you are never dependent on us to make a change. This varies by supplier and is worth confirming in writing before you sign anything.',
      },
    ],
  },

  'how-to-choose-an-seo-agency': {
    title: 'How to Choose an SEO Agency — The Questions That Expose a Bad One',
    metaTitle: 'How to Choose an SEO Agency in India — What to Ask | Avani Enterprises',
    description:
      'Guaranteed rankings, secret techniques and reporting built on impressions are the warning signs. What to ask, what a good answer sounds like, and what SEO cannot fix.',
    published: '2026-07-20',
    updated: '2026-07-20',
    service: 'seo-company',
    serviceLabel: 'SEO Services',
    related: ['why-google-is-not-indexing-my-pages', 'google-ads-vs-meta-ads-which-first'],
    takeaways: [
      'Nobody can guarantee a ranking. An agency that offers one is either naive or dishonest.',
      'Ask what they would do in month one. "An audit" is the right answer; "publish blogs" is not.',
      'Reporting on impressions and keyword counts hides the only metric that matters: qualified leads.',
      'Ask who implements the technical fixes. If the answer is "your developers", budget for that.',
      'A twelve-month lock-in with no exit clause is a bigger risk than a higher monthly fee.',
    ],
    sections: [
      {
        heading: 'The three claims that should end the conversation',
        paragraphs: [
          '**"We guarantee first-page rankings."** Google\'s ranking systems are not controllable by any third party, and the results page differs by location, device and personalisation. An agency guaranteeing a position is either guaranteeing something meaningless — a long-tail phrase nobody searches — or does not understand what it is selling.',
          '**"We have a proprietary technique."** There are no secrets in SEO. The mechanics are publicly documented by Google and openly discussed by the industry. What differs is diagnosis, prioritisation and whether the work actually gets implemented. "Proprietary" usually means either nothing or something that will get you penalised.',
          '**"We will build X hundred backlinks a month."** Volume link-building at a fixed monthly quota describes a link scheme, which is an explicit spam policy violation. The recovery from a link-based penalty costs far more than the campaign did.',
        ],
      },
      {
        heading: 'What to ask instead',
        paragraphs: [
          '**"What would you do in the first month?"** A good answer starts with a crawl and an audit, because until someone has looked, nobody knows whether your problem is technical, content, duplication or authority. An answer that jumps straight to publishing content is selling a product, not solving your problem.',
          '**"Who implements the technical recommendations?"** This is the question that predicts whether the engagement produces anything. Most SEO audits die as a spreadsheet nobody actions. If the agency hands fixes to your developers, you need to know your developers have capacity, or you are paying for advice you cannot use.',
          '**"What will you report on?"** The right answer is qualified leads and revenue, with rankings and traffic as diagnostics. Reporting built on impressions, keyword counts and "positions improved" is designed to look like progress independently of whether any of it produced business.',
          '**"What are the risks?"** Anyone experienced will name several — that the timeline depends on your competition, that content needs input from your team, that some things will not work. An agency that presents no risks has either not thought about it or is not telling you.',
        ],
      },
      {
        heading: 'Reading the case studies',
        paragraphs: [
          'Look for the starting position. "Increased traffic 400%" means very little from a base of fifty visits a month. Look for the timeframe, and be sceptical of dramatic gains inside two months — those are usually either a technical fix on a broken site, which is legitimate but not repeatable, or a seasonal effect.',
          'Ask whether the traffic gains turned into business. Plenty of campaigns produce impressive-looking traffic charts from queries with no commercial intent. Ask for a reference in a comparable sector and actually call them.',
        ],
      },
      {
        heading: 'What SEO cannot fix',
        paragraphs: [
          'SEO does not fix a product nobody wants, a price that is uncompetitive, or a website that does not convert the traffic it already gets. If your current visitors are not converting, more of them will not help, and an honest agency will tell you to fix the conversion problem first.',
          'It also does not work on a timescale that suits everyone. If you need leads this quarter, paid search will get there faster, and the right recommendation may be to spend on ads now and build organic in parallel. An agency that recommends its own service regardless of your timeline is optimising for its revenue rather than your outcome.',
        ],
      },
      {
        heading: 'On contracts',
        paragraphs: [
          'SEO genuinely does take months, so a supplier wanting some commitment is reasonable. A twelve-month lock-in with no exit clause is not — it removes the only leverage you have if the work is poor.',
          'Look for a three-month initial term with a notice period after it, clarity on who owns the content and the accounts, and a written scope of what is delivered monthly. If the deliverables are vague, the reporting will be too.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much should SEO cost in India?',
        a: 'It scales with how competitive your keyword set is and how much work the site needs, so a fixed figure would be misleading. What matters more than the number is that the scope is written down — a cheap retainer with vague deliverables usually costs more than a considered one, because you pay for months before discovering nothing measurable is happening.',
      },
      {
        q: 'How long before SEO produces results?',
        a: 'Technical fixes can show within weeks. Competitive ranking gains typically take three to six months because they depend on authority, which compounds rather than switches on. Anyone promising competitive rankings in thirty days is describing something that does not happen.',
      },
      {
        q: 'Can an agency guarantee first-page rankings?',
        a: 'No. Google\'s systems are not controllable by third parties and results vary by location, device and personalisation. A guarantee is either meaningless — attached to a phrase nobody searches — or a signal to walk away.',
      },
      {
        q: 'Should I hire an agency or an in-house SEO?',
        a: 'In-house makes sense when SEO is a primary channel and there is enough continuous work to justify a salary. An agency makes sense when you need a range of skills — technical, content, engineering, links — that one person rarely combines, or when the work is front-loaded into a fix-and-stabilise phase.',
      },
      {
        q: 'What if my pages are not even being indexed?',
        a: 'Then indexing is the problem to solve before anything else, and it is usually a duplication or rendering issue rather than a content one. We wrote a separate guide on diagnosing that from the Search Console buckets.',
      },
    ],
  },

  'ai-chatbot-vs-ai-voice-agent': {
    title: 'AI Chatbot or AI Voice Agent? Choosing Between Them',
    metaTitle: 'AI Chatbot vs AI Voice Agent — Which Does Your Business Need? | Avani Enterprises',
    description:
      'Chat and voice fail differently and suit different problems. Where each one wins, what they cost to run, and when the honest answer is neither.',
    published: '2026-07-20',
    updated: '2026-07-20',
    service: 'ai-chatbot-development',
    serviceLabel: 'AI Chatbot Development',
    related: ['agentic-ai-vs-traditional-automation', 'build-or-buy-a-crm'],
    takeaways: [
      'Chat suits considered, text-friendly enquiries; voice suits urgency and callers who will not fill in a form.',
      'Voice is materially more expensive to run, because it bills per minute rather than per message.',
      'Both need the same foundation: your content, structured well enough to answer from.',
      'Disclosure that the caller is speaking to an AI should be configured by default.',
      'If your enquiry volume is low, a fast human response beats either of them.',
    ],
    sections: [
      {
        heading: 'They solve different problems',
        paragraphs: [
          'A chatbot answers questions in text on your website, app or WhatsApp. A voice agent holds a spoken conversation on the phone, inbound or outbound. Both use the same underlying language models, but the operational fit is quite different and the choice usually follows from how your customers already behave.',
          'The strongest signal is your existing enquiry mix. If most enquiries arrive as calls, a chatbot will not capture them — those callers are choosing the phone deliberately. If most arrive by form or WhatsApp, a voice agent is solving a problem you do not have.',
        ],
      },
      {
        heading: 'Where chat wins',
        paragraphs: [
          'Chat is better for anything the user needs to read carefully: specifications, pricing structures, availability, policy details. It leaves a transcript the user can scroll back through, it handles links and images, and it works in a noisy room or a shared office.',
          'It is also far cheaper at volume. A chatbot conversation costs a fraction of a phone minute, and it handles many conversations concurrently without any additional infrastructure.',
          'And it is asynchronous. A user can start a conversation, leave, and come back — which suits considered purchases where nobody decides in one sitting.',
        ],
      },
      {
        heading: 'Where voice wins',
        paragraphs: [
          'Voice wins on urgency and on reach. Some customers will not use a form or a chat window under any circumstances, and for many businesses those customers are a large share of revenue. A phone number that is always answered captures enquiries a chat widget never sees.',
          'Outbound is the other strong case. Speed of response to a new lead is one of the more reliable predictors of whether it converts, and a voice agent can call a form submission back within seconds rather than whenever someone works down the list.',
          'Voice also handles the messy middle better than a form does. A caller who does not know what they need can be asked questions, and the agent can qualify them in one pass rather than through three rounds of email.',
        ],
      },
      {
        heading: 'What both need before they work',
        paragraphs: [
          'Neither is a drop-in product. Both need grounding in your actual content — your pricing, your policies, your availability, your service definitions — so that they answer from your business rather than from generic knowledge. If that content does not exist in a usable form, that is the first piece of work regardless of which channel you pick.',
          'Both need an escalation path. The failure mode that costs you customers is not the AI being wrong; it is the AI refusing to hand over. Sentiment, repeated confusion or a direct request for a person should trigger a transfer, and the human should receive the context so the customer does not start again.',
          'Both need logging. The unanswered questions are the most valuable output in the first month, because they tell you exactly where your published information is inadequate.',
        ],
      },
      {
        heading: 'The cost difference is real',
        paragraphs: [
          'Chat bills roughly per message and is inexpensive at almost any volume a small or mid-sized business generates. Voice bills per minute across speech recognition, the language model and speech synthesis, and a five-minute call is not a rounding error.',
          'That changes where each makes sense. Voice pays for itself when the value of a captured call is high — a booked appointment, a qualified sales enquiry, an urgent service request. It rarely pays for itself for low-value, high-volume queries, which is exactly what chat is good at.',
          'A common sensible split: chat handles informational volume on the website, voice handles inbound calls and speed-to-lead callbacks.',
        ],
      },
      {
        heading: 'When the answer is neither',
        paragraphs: [
          'If you get five enquiries a week, a person answering them well within an hour will outperform either system, and the build cost will not return. Automate when volume or coverage is the constraint, not because the technology is available.',
          'If your enquiries are genuinely complex — bespoke quotations, sensitive circumstances, negotiation — a badly-scoped AI layer will frustrate the exact customers you most want. Route those to a person immediately and use the AI for the qualification step ahead of them, if at all.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can an AI voice agent replace my reception team?',
        a: 'It can cover the calls a reception team cannot — nights, weekends, and overflow when everyone is already on a call — and handle routine qualification and booking. Treating it as a full replacement usually degrades the experience for the callers who most need a person, so we scope it as coverage rather than replacement.',
      },
      {
        q: 'Do we have to tell callers they are speaking to an AI?',
        a: 'We configure disclosure at the start of every call by default. It is the honest baseline, and in a growing number of jurisdictions it is also a legal requirement.',
      },
      {
        q: 'Can the chatbot and the voice agent share the same knowledge base?',
        a: 'Yes, and they should. The retrieval layer is the expensive part to build and maintain, and running one source of truth across both channels avoids the situation where chat and phone give different answers.',
      },
      {
        q: 'What happens when the AI does not know the answer?',
        a: 'It should say so and hand off, not improvise. We configure escalation to email, WhatsApp or a phone transfer, and log the unanswered question so the gap in your content gets filled.',
      },
      {
        q: 'Which is cheaper to run?',
        a: 'Chat, considerably. It bills per message rather than per minute and handles concurrent conversations without extra infrastructure. Voice justifies its cost when each captured call is worth a lot — a booking, a qualified lead, an urgent job.',
      },
    ],
  },
  'shopify-vs-woocommerce-which-should-you-choose': {
    title: 'Shopify or WooCommerce? Choosing an E-commerce Platform in India',
    metaTitle: 'Shopify vs WooCommerce for Indian Businesses — Honest Comparison | Avani Enterprises',
    description:
      'The real trade-off is not features, it is who owns maintenance and what the fees look like at your volume. Where each platform wins, and when to build custom instead.',
    published: '2026-07-20',
    updated: '2026-07-20',
    service: 'ecommerce-development-company',
    serviceLabel: 'E-commerce Development',
    related: ['website-development-cost-india', 'why-google-is-not-indexing-my-pages'],
    takeaways: [
      'Shopify trades control for someone else owning uptime, security and platform updates.',
      'WooCommerce trades convenience for no platform transaction fee and full control of the stack.',
      'The deciding question is usually whether you have anyone to own maintenance.',
      'Custom becomes justified when catalogue logic, B2B pricing or checkout rules exceed what either allows.',
      'Whichever you pick, plan the URL migration before you move — that is where replatforming loses rankings.',
    ],
    sections: [
      {
        heading: 'The trade-off is operational, not featural',
        paragraphs: [
          'Feature comparison tables between Shopify and WooCommerce are largely a waste of time, because both will sell products, take payments and manage inventory perfectly well for most businesses. The decision that actually matters is who is responsible when something breaks.',
          'On Shopify, that is Shopify. Uptime, security patching, PCI compliance and platform updates are theirs. You pay a subscription and, unless you use Shopify Payments, a transaction fee, and in exchange a category of problems stops being yours.',
          'On WooCommerce, that is you. You choose the hosting, you apply the updates, you resolve the plugin conflict that appears after a WordPress release, and you own the consequences if a vulnerability goes unpatched. In exchange there is no platform transaction fee and no ceiling on what you can change.',
        ],
      },
      {
        heading: 'When Shopify is the right answer',
        paragraphs: [
          'You want to launch quickly and you do not have a developer on hand. Shopify gets a competent store live faster than any custom route, and the theme ecosystem is mature enough that "cheap" does not have to mean "bad".',
          'Your catalogue is straightforward — products, variants, maybe subscriptions — and your checkout follows normal rules. Shopify\'s checkout is highly optimised and, on standard plans, not something you can modify much. For most retail that is a benefit rather than a limitation.',
          'You would rather spend your attention on merchandising and marketing than on infrastructure. That is a legitimate strategic choice and often the higher-return one.',
        ],
      },
      {
        heading: 'When WooCommerce is the right answer',
        paragraphs: [
          'You are already on WordPress with content that ranks, and you want commerce inside the same site rather than on a subdomain fighting the main site for authority.',
          'Transaction fees matter at your volume. A percentage on every order compounds, and at sufficient scale that alone justifies owning more of the stack.',
          'You need control that a hosted platform will not give you — custom pricing rules, unusual tax handling, or an integration that has to reach into the database rather than an API.',
          'One caveat worth stating plainly: WooCommerce stores are frequently slow, and the cause is almost always plugin sprawl rather than hosting. Every plugin adds queries and assets to every page load. A store running thirty plugins will underperform a well-built Shopify theme regardless of how much you spend on servers.',
        ],
      },
      {
        heading: 'When neither is right',
        paragraphs: [
          'Custom builds become justified when the commerce logic itself is the differentiator. B2B pricing tiers per customer, configurable products with dependent options, quotation workflows, or a checkout that has to interact with an ERP in real time are all things you can force onto either platform and then spend years maintaining the workarounds.',
          'The honest test: if you are already planning to fight the platform on day one, you have chosen the wrong platform.',
        ],
      },
      {
        heading: 'Migration is where rankings get lost',
        paragraphs: [
          'Most replatforming traffic losses are not caused by the new platform. They are caused by URL structures changing without a mapping, product pages 404ing, and the sitemap not being resubmitted.',
          'Before any migration, export every indexed URL and build a one-to-one redirect map to its new location. Discontinued products should redirect to the closest match or their category, not to the homepage — a mass redirect to the homepage is treated as a soft 404 and throws away everything those pages had earned.',
          'Keep the old structure crawlable during the switch, resubmit the sitemap immediately afterwards, and watch the coverage report for the following fortnight rather than assuming it went fine.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which is cheaper, Shopify or WooCommerce?',
        a: 'WooCommerce has no platform subscription or transaction fee, but you pay for hosting, plugin licences and maintenance — and maintenance is the cost people forget. Shopify is more predictable and often cheaper in total for smaller stores once someone\'s time is priced in. It flips as order volume grows and transaction fees start to matter.',
      },
      {
        q: 'Will moving platforms hurt my Google rankings?',
        a: 'Only if the migration is done badly, which unfortunately is common. Build a URL-by-URL redirect map before cutover, avoid mass-redirecting to the homepage, and resubmit the sitemap. Done properly, rankings carry over with a short dip.',
      },
      {
        q: 'Why is my WooCommerce store slow?',
        a: 'Usually plugin count rather than hosting. Each plugin adds database queries and front-end assets to every page. Auditing what each one costs you and replacing the worst offenders with targeted code typically achieves more than upgrading the server.',
      },
      {
        q: 'Can I use Shopify with a WordPress blog?',
        a: 'Yes, and many businesses do. Keep them on the same domain via a subdirectory or reverse proxy if you can — splitting content onto a subdomain divides authority between two properties that then compete.',
      },
      {
        q: 'Do I need Shopify Plus?',
        a: 'Only if you need checkout customisation, scripts, or higher API limits. Most businesses asking the question do not, and the standard plans are sufficient until there is a specific blocked requirement.',
      },
    ],
  },

  'google-ads-vs-meta-ads-which-first': {
    title: 'Google Ads or Meta Ads First? How to Decide Where to Spend',
    metaTitle: 'Google Ads vs Meta Ads — Which Should You Run First? | Avani Enterprises',
    description:
      'One captures demand that already exists, the other creates it. How to pick based on whether people are already searching for what you sell, and what to fix before spending anything.',
    published: '2026-07-20',
    updated: '2026-07-20',
    service: 'google-ads-agency',
    serviceLabel: 'Google Ads Management',
    related: ['how-to-choose-an-seo-agency', 'build-or-buy-a-crm'],
    takeaways: [
      'Google captures existing demand; Meta creates it. Start where the demand already is.',
      'If nobody searches for your category, Google Ads has nothing to capture.',
      'Fix conversion tracking before increasing budget — platforms optimise toward what you report.',
      'Meta needs the Conversions API; browser-only pixel tracking lost a lot of attribution after ATT.',
      'Judge both on cost per qualified lead, not cost per click or per lead.',
    ],
    sections: [
      {
        heading: 'The difference in one sentence',
        paragraphs: [
          'Google Ads shows your advert to someone who has just typed what you sell into a search box. Meta Ads shows it to someone who matches a profile while they are doing something else entirely. That difference determines almost everything about how the two behave.',
          'Demand capture converts faster and at higher intent, which is why search generally produces a lower cost per acquisition when the demand exists. Demand creation reaches people who would never have searched, which is why social generally produces more volume once it is working.',
        ],
      },
      {
        heading: 'Start with Google when…',
        paragraphs: [
          'People already search for what you sell using recognisable terms. If your category has established search volume — "web development company", "CRM software", "emergency plumber" — that demand is there every day and someone is capturing it.',
          'Your offer solves an urgent or scheduled problem. Urgency drives search behaviour, and search adverts meet people at the moment of intent rather than trying to manufacture it.',
          'You have a limited budget and need to prove the channel works. Search gets to a readable signal on fewer impressions than social does, because intent is doing much of the work.',
        ],
      },
      {
        heading: 'Start with Meta when…',
        paragraphs: [
          'Nobody knows to search for your product. New categories, novel propositions and impulse products have no search volume to capture, and a search campaign will spend on adjacent terms with poor intent.',
          'Your product is visual and benefits from being seen rather than described. Consumer goods, fashion, food, interiors and property all demonstrate better than they search.',
          'You have a well-defined audience that is easier to describe than to catch mid-search — a job title, a life stage, an interest cluster.',
          'Your average order value is low enough that search click costs would not return. Some categories have search click prices that simply cannot work at a small basket size.',
        ],
      },
      {
        heading: 'Fix this before you increase spend on either',
        paragraphs: [
          'Both platforms optimise toward the conversions you report to them. If your conversion event fires on a form view rather than a qualified submission, more budget buys more of the wrong outcome faster, and the reporting will look better while the business gets worse.',
          'On Meta specifically, install the Conversions API rather than relying on the browser pixel alone. Attribution accuracy dropped substantially after Apple\'s tracking changes, and server-side event reporting closes much of that gap — which matters both for measurement and because the platform optimises on what it can see.',
          'Feed back lead quality where you can. Importing offline conversions — which leads actually became customers — lets the platform optimise toward revenue rather than form fills, and it is the single largest improvement available to most accounts.',
        ],
      },
      {
        heading: 'The honest answer for most businesses',
        paragraphs: [
          'Start with whichever channel has demand you can measure, prove the unit economics there, then layer the other one. Running both from day one on a small budget usually produces two campaigns with insufficient data rather than one that works.',
          'Once both are live, they are complementary rather than competing: Meta creates awareness, and a share of the resulting Google searches are branded, which are the cheapest and highest-converting clicks you will buy. Judging Meta on last-click alone will systematically understate it for exactly this reason.',
        ],
      },
      {
        heading: 'When you should not be running ads at all',
        paragraphs: [
          'If your landing page does not convert the traffic you already have, paid traffic will not fix it — it will just cost more per failure. Fix the page first.',
          'If you cannot follow up on leads quickly, do not buy more of them. Speed of response is one of the strongest predictors of conversion, and leads that sit for two days are close to worthless. Sort the follow-up process before increasing the volume feeding it.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What budget do I need to start with Google Ads?',
        a: 'It depends entirely on cost per click in your category, which varies by an order of magnitude between industries. The right approach is to model it from your actual keyword set and target cost per lead rather than starting from a generic figure, which is what we do on the first call.',
      },
      {
        q: 'Why does Meta report more conversions than my CRM?',
        a: 'Attribution windows and modelling. Meta credits conversions within its attribution window including view-through, while your CRM counts what arrived. Installing the Conversions API narrows the gap; expecting the two numbers to match exactly does not.',
      },
      {
        q: 'Should I run both channels at once?',
        a: 'Not on a small budget. Split budget across two channels usually gives you two campaigns with too little data to optimise. Prove one, then layer the second.',
      },
      {
        q: 'How long before paid ads work?',
        a: 'Campaigns can be live in days, but meaningful cost-per-acquisition improvement usually takes four to eight weeks as the platforms gather conversion data and you eliminate what does not work. Judging performance in week one is judging noise.',
      },
      {
        q: 'Is SEO better than paid ads?',
        a: 'They do different jobs. Paid buys immediate, controllable traffic that stops when the budget stops. SEO compounds and persists but takes months. Most businesses that can afford both should run paid for immediate pipeline and build organic alongside it.',
      },
    ],
  },

  'agentic-ai-vs-traditional-automation': {
    title: 'Agentic AI or Traditional Automation? Knowing Which You Need',
    metaTitle: 'Agentic AI vs Traditional Automation — Which Fits Your Workflow | Avani Enterprises',
    description:
      'Rules-based automation is cheaper, faster and more predictable. AI agents earn their cost only where judgement is genuinely required. How to tell the difference.',
    published: '2026-07-20',
    updated: '2026-07-20',
    service: 'agentic-ai-development-company',
    serviceLabel: 'Agentic AI Development',
    related: ['ai-chatbot-vs-ai-voice-agent', 'build-or-buy-a-crm'],
    takeaways: [
      'If the process can be written as rules, use rules — they are cheaper, faster and deterministic.',
      'Agents earn their cost where inputs are unstructured or the next step requires judgement.',
      'The hard engineering in agents is permissions, error handling and approval gates, not the model.',
      'Start agents read-only and grant write access one workflow at a time.',
      'Run in parallel with the manual process before cutting over — the disagreement rate is the real test.',
    ],
    sections: [
      {
        heading: 'The distinction that decides the project',
        paragraphs: [
          'Traditional automation follows rules you wrote. When a form is submitted, create a record; when the value exceeds a threshold, route for approval. It is deterministic, cheap to run, easy to test and it does exactly the same thing every time.',
          'An AI agent decides what to do. Given a goal and a set of tools, it reads the situation, chooses the next step, calls the appropriate system and evaluates the result. That flexibility is genuinely useful and it is also the source of every difficulty — non-determinism means the same input can produce different paths, which changes how you test, monitor and secure it.',
          'The practical rule: if you can write the rules, write the rules. Reach for an agent when writing the rules is the part that is impossible.',
        ],
      },
      {
        heading: 'Where rules are the right answer',
        paragraphs: [
          'Structured inputs and predictable branching. Lead routing by territory, invoice approval by value threshold, stock alerts, scheduled reports, notification sequences — all of these have a finite decision tree that someone can draw on a whiteboard.',
          'Anything where a wrong answer is expensive and an audit trail must be exact. Rules are auditable in a way that a model\'s reasoning is not, and in regulated processes that matters more than flexibility.',
          'High-frequency, low-value operations. Running a language model on every one of fifty thousand daily events is an expensive way to do what a conditional statement does for free.',
        ],
      },
      {
        heading: 'Where agents genuinely earn their cost',
        paragraphs: [
          'Unstructured input. Emails, PDFs, scanned documents, free-text notes and supplier invoices that arrive in forty different layouts are exactly what rules handle badly and models handle well.',
          'Judgement calls with fuzzy boundaries. Deciding whether a support ticket is urgent, whether an order exception needs a refund or a replacement, whether a CV matches a role — these have no clean rule, and the traditional solution is a person reading each one.',
          'Multi-step work across several systems where the path varies. Turning a request for quotation into a quotation might mean checking stock, applying customer-specific pricing, confirming lead times and generating a document — and which of those steps are needed differs each time.',
          'Long-tail exceptions. Most processes are ninety percent rules and ten percent "it depends", and that ten percent consumes most of the human time. Automating the rules and letting an agent handle the tail is usually the highest-return split.',
        ],
      },
      {
        heading: 'What makes agent projects fail',
        paragraphs: [
          'Almost never the model. The failures come from the engineering around it: an agent with broader permissions than the task requires, no gate on irreversible actions, no handling for a tool returning an error, and no log of what it actually did.',
          'The approach that works is conservative and unglamorous. Scope tool permissions to the minimum the workflow needs. Put a human approval gate on anything that cannot be undone — payments, external messages, deletions. Test against real historical cases where you already know the correct outcome. Log every action with its inputs.',
          'Then run it in parallel with the existing manual process and compare outputs. The disagreement rate tells you whether it is ready far better than any demo does, and it usually reveals that the process itself was less consistent than anyone believed.',
        ],
      },
      {
        heading: 'How to choose a first workflow',
        paragraphs: [
          'Pick something high-frequency enough to matter, structured enough to evaluate, and low-stakes enough that an error is embarrassing rather than expensive. Support ticket triage, document extraction and lead enrichment are common good first candidates.',
          'Avoid starting with the process that is most painful. It is usually painful because it is complex and full of exceptions, which makes it the hardest thing to automate and the worst place to learn.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the actual difference between an AI agent and a chatbot?',
        a: 'A chatbot answers and stops. An agent completes a task — it reads your systems, chooses the next step, calls the right API and reports back. The difficulty is not the conversation, it is the permissions, error handling and approval gates that let it act safely.',
      },
      {
        q: 'How do you stop an agent doing something destructive?',
        a: 'Scoped tool permissions, a human approval gate on anything irreversible, sandboxed testing against historical cases, and a full audit log. Agents should start read-mostly and earn write access one workflow at a time.',
      },
      {
        q: 'Is agentic AI more expensive to run than normal automation?',
        a: 'Yes, meaningfully. Every decision step costs model inference, whereas a rule costs effectively nothing. That is precisely why the recommendation is to automate the rule-shaped part conventionally and use an agent only for the part that needs judgement.',
      },
      {
        q: 'How do we know if it is working?',
        a: 'Run it alongside the manual process and measure how often they disagree, then review the disagreements. That is a far better readiness test than a demo, and it frequently exposes inconsistency in the existing manual process too.',
      },
      {
        q: 'Which workflow should we automate first?',
        a: 'Something frequent, reasonably structured, and low-stakes — ticket triage, document extraction or lead enrichment. Do not start with your most painful process; it is painful because it is complex, which makes it the worst place to learn.',
      },
    ],
  },

  'build-or-buy-a-crm': {
    title: 'Build or Buy a CRM? An Honest Decision Framework',
    metaTitle: 'Custom CRM vs Off-the-Shelf — Build or Buy? | Avani Enterprises',
    description:
      'Most businesses should buy. The cases where building genuinely wins are specific and identifiable — per-seat cost at scale, and a sales process a product cannot express.',
    published: '2026-07-20',
    updated: '2026-07-20',
    service: 'crm-development-company',
    serviceLabel: 'CRM Development',
    related: ['agentic-ai-vs-traditional-automation', 'google-ads-vs-meta-ads-which-first'],
    takeaways: [
      'Most businesses should buy. We say that as a company that builds CRMs.',
      'Two conditions justify building: per-seat cost at your headcount, and a process no product expresses.',
      '"Nobody uses our CRM" is nearly always a configuration problem, not a platform problem.',
      'Migration costs data quality and adoption — it needs a stronger reason than frustration.',
      'Whichever you choose, lead capture from every channel into one pipeline matters more than the platform.',
    ],
    sections: [
      {
        heading: 'Start from the assumption that you should buy',
        paragraphs: [
          'We build custom CRMs, and our honest advice to most businesses asking this question is to buy one. Off-the-shelf CRM is a mature category. The products are good, they are maintained for you, they integrate with everything, and they cost a fraction of a build in year one.',
          'The reason to read further is that the exceptions are real and identifiable, and businesses in those situations frequently spend years fighting a product that was never going to fit.',
        ],
      },
      {
        heading: 'The two conditions that justify building',
        paragraphs: [
          '**Per-seat cost has become a real number.** CRM pricing is typically per user per month. That is excellent value at ten users and a significant recurring cost at two hundred, particularly when many of those users need read access rather than the full product. A build has a large one-off cost and near-zero marginal cost per user, so there is a headcount at which the arithmetic reverses. Work out where that point is for you rather than assuming it.',
          '**Your sales process genuinely does not fit.** Not "we would prefer different stage names" — that is configuration. This means a structure the product cannot express: quoting logic tied to a live production schedule, multi-party deals where several organisations own different parts of one opportunity, or approval chains that depend on data the CRM does not hold.',
          'If neither applies, buy. Building because you dislike the interface is an expensive way to change an interface.',
        ],
      },
      {
        heading: 'The problem that looks like a platform problem and is not',
        paragraphs: [
          '"Our sales team will not use the CRM" is the most common reason businesses consider replacing one, and it is almost never solved by replacing it. The cause is usually that the CRM asks the salesperson for information that benefits everyone except the salesperson.',
          'If a rep must fill twelve fields to log a call and gets nothing back that helps them sell, they will not do it, and no amount of mandate changes that. The fix is to cut required fields to what the rep genuinely benefits from, automate everything derivable — call logs, email activity, source attribution — and make the reporting a by-product of the work rather than a tax on it.',
          'Do this before migrating. If you move platforms without fixing it, you will have the same adoption problem on a new system, plus a data migration.',
        ],
      },
      {
        heading: 'What building actually costs',
        paragraphs: [
          'The build itself is the visible cost and usually not the largest one. Data migration from spreadsheets or an existing system is consistently underestimated, because real CRM data is messier than anyone expects — duplicates, inconsistent formats, records nobody can identify.',
          'Then there is ongoing maintenance. A custom CRM does not update itself, and integrations break when the systems at the other end change. Budget for a support arrangement rather than assuming the system is finished at launch.',
          'And there is the integration surface. Off-the-shelf CRMs come with hundreds of prebuilt connectors. A custom build gets exactly the ones you commission, so list what you need to connect to before deciding.',
        ],
      },
      {
        heading: 'What matters more than the build-or-buy answer',
        paragraphs: [
          'Getting every lead into one pipeline with its source attached. Website forms, Google and Meta lead adverts, WhatsApp, inbound calls and email enquiries all need to arrive in the same place, tagged with where they came from. Without that you cannot calculate cost per qualified lead by channel, which means you are optimising ad spend blind.',
          'And speed of follow-up. Response time is one of the more reliable predictors of conversion, and a lead sitting unassigned overnight has usually already spoken to a competitor. Automatic assignment and a response-time alert are worth more than most feature differences between platforms.',
        ],
      },
    ],
    faqs: [
      {
        q: 'When does a custom CRM become cheaper than a subscription?',
        a: 'It depends on your seat count and per-user pricing, so it is worth doing the arithmetic rather than guessing. The point arrives sooner if many of your users need only read or light access, since you pay full price per seat for them on most products.',
      },
      {
        q: 'Our team will not use the CRM we have. Will a new one fix it?',
        a: 'Usually not. Adoption fails when the CRM asks reps for information that helps everyone but them. Cut the required fields, automate what can be derived, and make reporting a by-product of the work. Fix that before migrating, or you will carry the problem across.',
      },
      {
        q: 'Can you integrate our CRM with WhatsApp and ad platforms?',
        a: 'Yes — Meta and Google lead forms, website forms, WhatsApp and inbound calls can all route into one pipeline with the source attached. That attribution is what makes cost-per-qualified-lead reporting possible.',
      },
      {
        q: 'How long does a custom CRM build take?',
        a: 'Typically four to ten weeks depending on how many integrations are in scope and how clean the existing data is. Data migration is consistently the part that takes longer than expected.',
      },
      {
        q: 'What happens to our data if we stop working with you?',
        a: 'It is yours, on your infrastructure, and you receive the repository and deployment configuration. That independence is one of the main reasons to build rather than subscribe.',
      },
    ],
  },
};

/* DATA-END */

export { GUIDES, GUIDE_BASE };
