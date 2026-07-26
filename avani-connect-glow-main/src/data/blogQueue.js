/**
 * blogQueue.js — the draft → approve → publish pipeline for the blog.
 *
 * WHY A QUEUE AND NOT AUTO-PUBLISH
 * --------------------------------
 * This site is recovering from a scaled-content demotion. Publishing generated
 * posts on a timer is the exact behaviour that caused it. So nothing here
 * reaches the site until a human sets `approved: true`, and the publisher script
 * refuses to run without an explicit confirmation flag.
 *
 * THE QUALITY BAR (every post must clear all of it)
 * ------------------------------------------------
 *   • 1,200+ words of genuinely useful content.
 *   • A distinct topic — not a variation of an existing post or guide.
 *   • Answer-first intro: 2–3 sentences that answer the title directly.
 *   • A Key Takeaways box near the top (this is what AI answer engines quote).
 *   • Question-style H2s with concise, quotable answers.
 *   • 3–5 FAQs, emitted as FAQPage schema.
 *   • Honest about competitors: verifiable, non-disparaging, no invented claims.
 *   • Clusters to one service page plus 2–3 sibling posts.
 *   • A service-specific CTA.
 *
 * If a slot's topic cannot clear that bar, skip the slot. A missed post costs
 * nothing; a thin one costs the recovery.
 *
 * CADENCE
 * -------
 * `publishOn` dates are spaced three days apart. scripts/publish-queued-posts.cjs
 * pushes approved posts whose date has arrived to the backend, one at a time.
 *
 * REVIEW WORKFLOW
 * ---------------
 *   1. Posts are drafted here with `approved: false`.
 *   2. `npm run blog:queue` prints the queue for review.
 *   3. Set `approved: true` on the ones you are happy with.
 *   4. `npm run blog:publish` (dry run) then `npm run blog:publish -- --confirm`.
 *
 * Once published, a post lives in the CMS like any other and is picked up by the
 * build-time snapshot; the runtime fallback in api/seo.js means it is crawlable
 * immediately, without waiting for a redeploy.
 */

/* DATA-START */

const BLOG_QUEUE = [
  {
    slug: 'how-to-choose-digital-marketing-agency-rohtak',
    title: 'How to Choose a Digital Marketing Agency in Rohtak (2026 Guide)',
    metaTitle: 'How to Choose a Digital Marketing Agency in Rohtak',
    excerpt:
      'A practical 2026 guide to choosing a digital marketing agency in Rohtak — the criteria that matter, the questions to ask, the red flags, and how the local options compare.',
    category: 'Digital Marketing',
    service: 'digital-marketing-company',
    serviceLabel: 'Digital Marketing',
    author: 'Avani Enterprises',
    publishOn: '2026-07-29',
    approved: false,
    related: ['google-business-profile-setup-haryana', 'ai-chatbots-real-estate-india'],
    keyTakeaways: [
      'Match the agency to your goal — leads, sales or brand — not to whoever ranks first.',
      'Ask for recent results in your sector, with numbers you can check.',
      'Full-service helps when web, ads, SEO and social have to work together.',
      'Rohtak has several established agencies. Compare on process and proof.',
      'Walk away from guaranteed rankings, absent reporting and vague scope.',
    ],
    intro:
      'Choosing a digital marketing agency in Rohtak comes down to five things: proven recent results, a clear reporting process, the right service mix for your goal, transparent pricing, and whether the team can grow with you. This guide walks through each, including the questions that separate a serious agency from a confident one — whether you end up hiring us or someone else.',
    sections: [
      {
        heading: 'Why the right agency matters more than the cheapest one',
        paragraphs: [
          'Marketing spend only works when it is aimed well. An agency that runs ads without conversion tracking can burn a budget faster than a more expensive one that measures every rupee, because nobody can tell which half is working.',
          'The number to compare is not the monthly fee. It is cost per qualified lead, and the only way to know it is to have tracking in place before the spending starts. An agency that cannot tell you what a qualified lead costs today has no baseline to improve on.',
        ],
      },
      {
        heading: 'What does a digital marketing agency actually do?',
        paragraphs: [
          'Most cover some combination of five things: search engine optimisation to rank for what buyers type; paid advertising on Google and Meta to bring leads now; social media content and community; landing pages where traffic converts; and analytics that prove which of the above worked.',
          'The advantage of a full-service team is that these connect. Ads point at a fast landing page, SEO feeds the same funnel, and one team owns the outcome — rather than three vendors each explaining that the problem sits with one of the others.',
          'The disadvantage is real too: a generalist team may be shallower in any single discipline than a specialist. If you need one thing done exceptionally well and nothing else, a specialist is often the better buy.',
        ],
      },
      {
        heading: 'Five criteria to judge any Rohtak agency',
        paragraphs: [
          '**1. Do they show recent, relevant results?** Ask for two or three examples from the last year, ideally in your sector, with actual numbers — cost per lead, enquiry volume, return on ad spend. "We improved their presence" is not a result.',
          '**2. Is the reporting clear and regular?** You should receive a monthly report tied to business outcomes, not impressions. Ask to see a sample before signing. If the sample is a screenshot of a traffic graph, expect that every month.',
          '**3. Do they fit your goal and stage?** A local retailer needs leads and a well-maintained Google Business Profile. A growing brand needs content and organic depth. These are different engagements, and an agency strong at one may be weak at the other.',
          '**4. Is pricing transparent?** Clear scope, clear deliverables, clear fee, with ad spend stated separately from the management fee. Be cautious of anyone who will not itemise what you are paying for.',
          '**5. Can they scale with you?** If a website, an app or automation is coming in the next year, a team that also builds those saves you re-hiring and re-explaining your business.',
        ],
      },
      {
        heading: 'The Rohtak agency landscape',
        paragraphs: [
          'Rohtak has a genuinely competitive market. Established local names include Web Aspiration, The Growth Box and Leo Digital, alongside newer full-service teams and Gurugram agencies that serve Haryana remotely.',
          'That competition is good for you, and it means you should shortlist two or three and put the same questions to each. We are deliberately not going to characterise other agencies\' pricing, team size or results here — we do not have verified information on those, and an agency that confidently describes a competitor\'s weaknesses is usually guessing.',
          'What we would say is that the useful comparison is process and proof, not claims. Ask each shortlisted agency for a sample report and two recent results, and the differences become obvious quickly.',
        ],
      },
      {
        heading: 'Where Avani Enterprises fits',
        paragraphs: [
          'We have an office in Rohtak, which is unusual for a digital agency — most serve Haryana remotely from Delhi or Gurugram — alongside our head office in Gurugram. That means local institutes, hospitals, IMT manufacturers and retailers can have project reviews face to face.',
          'We are full-service in a specific sense: digital marketing sits alongside web, app and AI development in the same team. If your campaigns need a faster landing page, the people who run the campaigns and the people who build the page are in the same review.',
          'Where we are not the right fit: if you want a single specialist discipline delivered at the deepest possible level and nothing else, a dedicated specialist will likely beat us on that one axis.',
        ],
      },
      {
        heading: 'What a competent first month looks like',
        paragraphs: [
          'This is the most useful thing to ask about, because it exposes whether an agency has a process or a package. A serious first month is mostly diagnosis.',
          'Week one should be an audit: what is currently tracked, what the site actually converts at, which queries you already appear for, and where the existing budget goes. If an agency starts running ads in week one without touching tracking, they are optimising toward numbers nobody has verified.',
          'Week two should produce a written plan with a target cost per lead and the channel split to reach it, plus whatever technical fixes the audit surfaced. Weeks three and four are execution and the first read on real data.',
          'By the end of month one you should have: working conversion tracking, a documented baseline, a written plan, and the first campaigns or fixes live. You should not yet have dramatic results, and an agency promising them in month one is describing something that does not usually happen.',
        ],
      },
      {
        heading: 'Red flags worth walking away from',
        paragraphs: [
          '**Guaranteed rankings.** Nobody controls Google\'s results. A guarantee is either meaningless — attached to a phrase nobody searches — or a sign the agency does not understand what it is selling.',
          '**No tracking.** If they cannot measure leads, they cannot improve them, and you will be judging the engagement on how the reports feel.',
          '**Vague scope.** "We will handle everything" with no deliverable list means there is nothing to hold them to in month four.',
          '**Pressure before proof.** A contract pushed before any audit or sample work is a sales process, not a delivery process.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a digital marketing agency in Rohtak cost?',
        a: 'It varies by scope — SEO, ads management and social each price differently, and ad spend is separate from the management fee. A good agency will model a realistic starting budget and expected cost per lead for your specific goal rather than quote a flat monthly number before understanding it.',
      },
      {
        q: 'How long until I see results?',
        a: 'Paid ads can produce leads within days of going live. SEO typically builds over three to six months because it depends on authority, which compounds. A common sensible plan runs ads for immediate pipeline while organic builds alongside.',
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

  {
    slug: 'google-business-profile-setup-haryana',
    title: 'Google Business Profile for Haryana Businesses: A Practical Setup Guide',
    metaTitle: 'Google Business Profile Setup Guide for Haryana Businesses',
    excerpt:
      'How to set up and maintain a Google Business Profile that actually ranks in the local map pack — categories, service areas, reviews, and the mistakes that get profiles suspended.',
    category: 'Local SEO',
    service: 'local-seo-services',
    serviceLabel: 'Local SEO',
    author: 'Avani Enterprises',
    publishOn: '2026-08-01',
    approved: false,
    related: ['how-to-choose-digital-marketing-agency-rohtak', 'ai-chatbots-real-estate-india'],
    keyTakeaways: [
      'The primary category does more for map-pack ranking than almost anything else on the profile.',
      'Proximity is the strongest factor and you cannot change it — relevance and prominence are where the work is.',
      'A service-area business must hide its address, not invent one.',
      'Review velocity matters more than a perfect average; respond to all of them.',
      'Listing a location you do not physically staff is the fastest route to suspension.',
    ],
    intro:
      'A Google Business Profile is the single highest-return local SEO asset for most Haryana businesses, and most profiles are half-finished. The three things that decide map-pack ranking are proximity, relevance and prominence — you cannot change the first, so the work goes into category accuracy, complete information and a steady flow of genuine reviews.',
    sections: [
      {
        heading: 'Why the profile beats the website for local searches',
        paragraphs: [
          'For searches with local intent — "digital marketing agency near me", "CA in Rohtak", "dentist Sector 14" — Google shows a map pack of three businesses above the normal results. Those three listings absorb a large share of the clicks, and they are drawn from Business Profiles, not from website rankings.',
          'This means a business with a mediocre website and an excellent profile frequently outranks the reverse for exactly the searches that produce phone calls. It is also the cheapest thing to fix, because the profile is free.',
        ],
      },
      {
        heading: 'What actually decides map-pack ranking?',
        paragraphs: [
          'Google states three factors: distance, relevance and prominence.',
          '**Distance** is where the searcher is relative to you. You cannot influence it, and it is why chasing rankings in a city you have no presence in does not work.',
          '**Relevance** is how well your profile matches the query — primarily your categories, your services list, and the information completeness of the profile.',
          '**Prominence** is how well known the business is: reviews, citations elsewhere on the web, and general web presence.',
          'The practical consequence is that most of the available gain sits in relevance, and most of that sits in one field.',
        ],
      },
      {
        heading: 'Get the primary category right — it matters more than anything else',
        paragraphs: [
          'The primary category is the strongest relevance signal on the profile. "Marketing agency", "Internet marketing service" and "Advertising agency" are different categories that surface for different queries, and picking the wrong one quietly caps what you can rank for.',
          'A reliable way to choose: search the query you most want to appear for, look at the businesses already in the map pack, and check what their primary category is. Match the pattern rather than guessing from the category name.',
          'Add secondary categories for genuine additional services, but do not stuff them. Categories you do not actually serve dilute relevance and can trigger a quality review.',
        ],
      },
      {
        heading: 'Address, service areas, and the mistake that gets profiles suspended',
        paragraphs: [
          'If customers come to your premises, list the address and keep it identical to the one on your website, down to the formatting. Google cross-references, and small inconsistencies weaken the match.',
          'If you travel to customers instead, you are a service-area business: set your service areas and **hide** the address. Listing a residential address or a coworking desk you do not occupy is the single most common cause of suspension, and reinstatement is far harder than getting it right initially.',
          'The rule is simple and worth stating plainly: do not create a profile for a city you do not physically staff. A virtual office or a mailbox does not qualify. It is tempting because it seems to promise map-pack presence in more cities, and it reliably ends in a suspended profile.',
        ],
      },
      {
        heading: 'Reviews: velocity beats average',
        paragraphs: [
          'A steady trickle of genuine reviews signals an active business more effectively than a large batch collected once. Ten reviews a year, spread out, generally outperform forty arriving in one month — and a sudden burst can itself look manipulative.',
          'Ask at the moment of satisfaction, not weeks later, and make it one tap: a short link straight to the review form. Respond to every review including the negative ones, briefly and without defensiveness, because prospects read the responses more carefully than the reviews.',
          'Never buy reviews or write them yourself. Beyond being against Google\'s policies, review fraud is increasingly detectable, and the penalty lands on the profile you depend on.',
        ],
      },
      {
        heading: 'Citations and NAP consistency: the unglamorous half of prominence',
        paragraphs: [
          'Prominence is partly built outside Google. Your name, address and phone number — NAP — appear across directories, social profiles, and any site that has ever listed you. Google cross-references those against your profile, and inconsistencies weaken the match.',
          'Inconsistency is usually accidental rather than neglectful. A business ends up with "Shop 12, Main Road" in one place and "12 Main Rd" in another, or two phone number formats, or an old suite number that was never updated after a move. Each variant is a slightly weaker signal.',
          'The fix is dull and effective: decide the exact canonical form of your name, address and phone, write it down, and use that string everywhere without variation. Then audit the obvious places — Justdial, IndiaMART, Sulekha, your Facebook and LinkedIn pages, industry directories — and correct anything that differs.',
          'For businesses in competitive categories, adding a handful of genuinely relevant directory listings is worth doing. Adding hundreds of low-quality ones is not; bulk citation building has diminishing returns and can look manipulative.',
        ],
      },
      {
        heading: 'The maintenance that most businesses skip',
        paragraphs: [
          'Keep hours accurate including holidays — a wrong "closed" costs you the visit and can prompt Google to prompt users to suggest edits. Post updates periodically; they are minor as a ranking signal but they keep the profile looking maintained.',
          'Add real photos of the actual premises and team rather than stock imagery. Answer the Q&A section yourself, pre-empting the questions you get on the phone. Fill the services and products sections, because they feed relevance for longer-tail queries.',
          'Finally, check the profile monthly for user-suggested edits. Anyone can suggest a change to your hours or category, and those sometimes go live without you noticing.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does it take to rank in the map pack?',
        a: 'A complete, correctly categorised profile can start appearing within a few weeks. Competitive categories in dense areas take longer and depend heavily on review volume and web prominence. Proximity sets a ceiling you cannot exceed regardless of effort.',
      },
      {
        q: 'Can I create profiles for cities where I do not have an office?',
        a: 'No. A profile requires a real, staffed location or, for service-area businesses, a genuine service area attached to your actual base. Creating listings at virtual offices is the most common cause of suspension, and it is difficult to reverse.',
      },
      {
        q: 'How many reviews do I need?',
        a: 'There is no threshold — what matters is being competitive within your category and area, and receiving them steadily. Look at the review counts of the businesses currently in the map pack for your target query; that is the practical benchmark.',
      },
      {
        q: 'Should I respond to negative reviews?',
        a: 'Yes, briefly and factually, and without arguing. Prospects read responses to judge how you handle problems, so a calm reply to a harsh review often reassures more than the positive reviews do.',
      },
      {
        q: 'Does the website still matter if the profile is strong?',
        a: 'Yes. The profile wins the map pack, but the website carries the organic results below it, and the profile links to the site. They reinforce each other, and consistent name, address and phone details across both is part of what makes the profile rank.',
      },
    ],
    cta: {
      heading: 'Get a free local visibility check',
      sub: 'We will review your Google Business Profile, categories and citations, and tell you what is limiting your map-pack position.',
    },
  },

  {
    slug: 'ai-chatbots-real-estate-india',
    title: 'AI Chatbots for Real Estate in India: What Actually Converts',
    metaTitle: 'AI Chatbots for Real Estate in India: What Converts',
    excerpt:
      'Where AI chatbots genuinely help Indian real estate teams — speed to lead, site-visit booking and after-hours capture — and where they lose deals. With honest limits.',
    category: 'AI',
    service: 'ai-chatbot-development',
    serviceLabel: 'AI Chatbot Development',
    author: 'Avani Enterprises',
    publishOn: '2026-08-04',
    approved: false,
    related: ['how-to-choose-digital-marketing-agency-rohtak', 'google-business-profile-setup-haryana'],
    keyTakeaways: [
      'Speed of first response is the highest-value thing a chatbot fixes in real estate.',
      'Qualifying on budget, location and timeline before a human calls saves the most time.',
      'Booking the site visit is the conversion event worth optimising for, not the chat itself.',
      'Ground the bot in real inventory — a bot that invents availability costs you trust.',
      'Hand off to a person early on negotiation, legal questions and anything emotional.',
    ],
    intro:
      'For Indian real estate teams, an AI chatbot earns its cost in three places: answering enquiries instantly at any hour, qualifying on budget, location and timeline before a salesperson spends time, and booking site visits directly into a calendar. It loses deals when it is asked to negotiate, to answer legal questions, or to improvise about inventory it does not actually know.',
    sections: [
      {
        heading: 'The real problem: enquiries arrive when nobody is available',
        paragraphs: [
          'Property enquiries cluster in evenings and at weekends, which is precisely when sales teams are stretched or off. A lead that waits until the next working morning has usually contacted two other listings already.',
          'This is not a motivation problem, it is a coverage problem, and it is the clearest case for automation: a bot that responds in seconds, at 11pm on a Sunday, captures enquiries that were otherwise lost. That single change tends to matter more than anything clever the bot does afterwards.',
        ],
      },
      {
        heading: 'What should the bot actually ask?',
        paragraphs: [
          'The useful qualification set for Indian residential property is short: budget range, preferred location or project, configuration (2BHK, 3BHK and so on), purchase timeline, and whether finance is required.',
          'Five questions is roughly the ceiling before drop-off climbs. Resist adding more because the CRM has more fields — every extra question costs completions, and a salesperson can gather the rest on the call.',
          'Ask the qualifying questions after answering the visitor\'s own question, not before. A bot that interrogates before helping reads as a form with a personality, and people abandon it.',
        ],
      },
      {
        heading: 'Booking the site visit is the conversion event',
        paragraphs: [
          'For most residential sales, the site visit is the step that predicts the deal. A chat that ends with an enquiry logged is worth far less than one that ends with a visit booked into a real calendar slot with a confirmation message.',
          'That means the integration matters more than the conversation quality. If the bot cannot see genuine availability and write a confirmed booking, it is a lead-capture form with extra steps.',
          'Send the confirmation on WhatsApp rather than email. For this audience, open rates are not comparable, and a reminder the day before measurably reduces no-shows.',
        ],
      },
      {
        heading: 'Ground it in real inventory, or do not launch it',
        paragraphs: [
          'The failure that costs the most is a bot that answers confidently about availability, pricing or possession dates it does not actually know. A prospect told a unit is available who then learns it sold last month does not blame the software.',
          'The fix is retrieval: the bot answers from your live inventory and price list rather than from a general model. Where the data is not available, it should say it will check and hand off — which is both honest and, in practice, perfectly acceptable to buyers.',
          'This is also why RERA-related and legal questions should route to a person by default. Those answers carry regulatory weight and are not a good place for an approximate response.',
        ],
      },
      {
        heading: 'Where the bot should get out of the way',
        paragraphs: [
          'Price negotiation, payment plan structuring, legal and title questions, and any conversation where the person is frustrated. These are exactly the moments where a scripted response damages a deal that a person could still save.',
          'Configure escalation on explicit request, on repeated confusion, and on sentiment. Pass the transcript across so the caller does not repeat themselves — being asked the same five questions again is worse than never having used the bot.',
          'A reasonable target is that the bot handles first response, qualification and booking, and that anything past that reaches a human quickly. That division does the work without pretending to be a salesperson.',
        ],
      },
      {
        heading: 'What does it cost to run?',
        paragraphs: [
          'There are two costs and they behave differently. The build — script design, inventory integration, WhatsApp setup, testing — is one-off. The running cost is per conversation, because each exchange consumes model inference and, on WhatsApp, a messaging fee.',
          'That per-conversation shape is why chat is affordable for real estate and voice agents are considered more carefully: a text exchange costs a fraction of a phone minute. For enquiry volumes typical of a single project or a mid-sized brokerage, the running cost is usually small relative to one closed deal.',
          'The number worth modelling before committing is cost per additional site visit booked. If the bot captures enquiries that were previously lost overnight and converts a share of them to visits, the comparison is against the value of those visits — not against the cost of doing nothing.',
          'We scope this from your actual enquiry volume rather than quoting a headline rate, because the volume assumption is what determines whether it pays back.',
        ],
      },
      {
        heading: 'What to measure',
        paragraphs: [
          'Not conversation counts. The numbers that matter are: median first-response time, the share of enquiries qualified without a human, site visits booked, and the visit-to-deal rate compared with human-qualified leads.',
          'That last comparison is the honest test. If bot-qualified leads convert materially worse at the visit stage, the qualification is too loose and the criteria need tightening — which is a configuration problem, not a reason to abandon it.',
          'Give it a fair window. Enquiry volume in real estate is seasonal and campaign-driven, so a fortnight of data will mislead you in either direction. A full campaign cycle is the minimum before judging.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Will an AI chatbot annoy serious property buyers?',
        a: 'Not if it answers their question first and hands off quickly. What annoys buyers is a bot that blocks access to a person, interrogates before helping, or answers confidently about things it does not know. Those are all configuration choices rather than inherent limitations.',
      },
      {
        q: 'Can it work on WhatsApp rather than the website?',
        a: 'Yes, through the WhatsApp Business API, and for Indian real estate that is usually where the conversation should live. Buyers already use it, message history persists, and site-visit reminders are far more likely to be seen than by email.',
      },
      {
        q: 'How does it know what inventory is available?',
        a: 'Through an integration with your inventory or CRM data, so it answers from live records rather than a static script. If that integration is not possible, the bot should be scoped to capture and qualify only, and say a colleague will confirm availability.',
      },
      {
        q: 'Does it replace the sales team?',
        a: 'No, and it should not be sold as doing so. It replaces the waiting — first response, basic qualification, and booking — so the sales team spends its time on qualified buyers instead of on triage.',
      },
      {
        q: 'How long does it take to set up?',
        a: 'Typically two to six weeks depending on how clean the inventory data is and whether WhatsApp and CRM integrations are in scope. The data preparation is almost always the part that takes longer than expected.',
      },
      {
        q: 'What happens to leads the bot cannot qualify?',
        a: 'They should still reach your team, tagged as unqualified rather than discarded. A bot that silently drops enquiries it did not understand is worse than no bot, because the loss is invisible. We route everything through and mark the confidence level so the team can triage.',
      },
      {
        q: 'Can it handle enquiries in Hindi?',
        a: 'Yes, and for most Indian residential property it should. Buyers frequently open in Hindi or switch mid-conversation, and a bot that only handles English filters out genuine demand rather than qualifying it.',
      },
    ],
    cta: {
      heading: 'Get a free chatbot demo on your own listings',
      sub: 'Send us a few live listings and we will build a short demo so you can see how it qualifies and books before committing to anything.',
    },
  },
];

/** Posts approved and past their publish date. */
function duePosts(today) {
  const now = today || new Date().toISOString().slice(0, 10);
  return BLOG_QUEUE.filter((p) => p.approved && p.publishOn <= now);
}

/** Rough reading time, at 200 words per minute. */
function readingTime(post) {
  const words =
    (post.intro || '').split(/\s+/).length +
    (post.sections || []).reduce((n, s) => n + s.paragraphs.join(' ').split(/\s+/).length, 0) +
    (post.faqs || []).reduce((n, f) => n + (f.q + ' ' + f.a).split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 200));
}

/** Total word count — used by the quality gate in the publisher. */
function wordCount(post) {
  return (
    (post.intro || '').split(/\s+/).filter(Boolean).length +
    (post.keyTakeaways || []).join(' ').split(/\s+/).filter(Boolean).length +
    (post.sections || []).reduce((n, s) => n + s.heading.split(/\s+/).length + s.paragraphs.join(' ').split(/\s+/).filter(Boolean).length, 0) +
    (post.faqs || []).reduce((n, f) => n + (f.q + ' ' + f.a).split(/\s+/).filter(Boolean).length, 0)
  );
}

/* DATA-END */

export { BLOG_QUEUE, duePosts, readingTime, wordCount };
