/**
 * serviceOfferings.ts — what each service page actually sells, itemised.
 *
 * WHY
 * ---
 * The service pages described a category ("AI Solutions — intelligent
 * automation") and then never said what you could actually buy. Someone
 * searching for a meeting-notes bot, a WhatsApp agent or an outbound calling
 * system had no way to tell whether we do it, and no page on the site said the
 * words they were searching for.
 *
 * That is a ranking problem and an answer-engine problem at the same time.
 * Google needs the specific term on the page to match the specific query, and
 * an LLM asked "who builds AI meeting bots in Gurugram" can only name a company
 * whose page says it builds AI meeting bots.
 *
 * Each offering is written to stand alone as an answer: a name someone would
 * actually search, one sentence on what it does, and one on when it is the
 * right choice. That shape is what gets extracted into an AI answer, and it is
 * also what makes the section readable rather than a wall of feature bullets.
 *
 * `query` is the phrasing a buyer would type. It becomes the card's H3, so the
 * page carries the real search term rather than our internal name for it.
 */

export interface Offering {
  /** H3 on the card. Phrase it the way a buyer would search for it. */
  query: string;
  /** One sentence: what it does. */
  what: string;
  /** One sentence: when this is the right pick. Answers the follow-up. */
  when: string;
}

export const SERVICE_OFFERINGS: Record<string, Offering[]> = {
  'ai-solutions': [
    {
      query: 'AI chatbots for websites and WhatsApp',
      what: 'A chat assistant trained on your own documents, pricing and policies that answers customers on your site or WhatsApp around the clock, and hands over to a human when it should.',
      when: 'You are losing enquiries that arrive outside office hours, or your team answers the same twenty questions every day.',
    },
    {
      query: 'AI calling solutions and voice agents',
      what: 'Voice agents that make and take calls in English and Hindi — qualifying inbound enquiries, following up on leads, confirming appointments and logging every call to your CRM.',
      when: 'Calls go unanswered at peak times, or follow-up depends on someone remembering to dial.',
    },
    {
      query: 'AI meeting bot for minutes of meeting',
      what: 'A bot that joins your Google Meet, Zoom or Teams calls, records them, and produces minutes of meeting with decisions, action items and owners — circulated before people leave the call.',
      when: 'Decisions get lost between meetings, or someone senior is spending their time writing up notes.',
    },
    {
      query: 'AI automation for business processes',
      what: 'Automations that move work between the tools you already use — reading documents, extracting data, updating your CRM, raising tickets, triggering approvals and chasing what is overdue.',
      when: 'Your team is re-typing the same data into two systems, or a process only moves when someone remembers to move it.',
    },
    {
      query: 'AI social media posting and scheduling',
      what: 'Drafting, scheduling and publishing to Instagram, LinkedIn, Facebook and X, with per-platform formatting, an approval step before anything goes live, and reporting on what performed.',
      when: 'Posting is inconsistent because it depends on whoever has time, or approvals slow everything to a crawl.',
    },
    {
      query: 'AI agents and agentic workflows',
      what: 'Multi-step agents that carry out a whole task rather than answering one question — researching, deciding, calling your systems and reporting back, with limits on what they may do unsupervised.',
      when: 'The work is too varied for fixed automation rules but too repetitive to keep doing by hand.',
    },
    {
      query: 'AI content and AI video production',
      what: 'AI-assisted articles, product copy, ad variants and short-form video, all edited by a person before publication.',
      when: 'You need volume without the output reading like it was generated, which is what gets content ignored.',
    },
    {
      query: 'Custom AI development and integration',
      what: 'Bespoke systems on Claude, GPT or Gemini, connected to your data through retrieval, with evaluation and guardrails so answers stay inside what your business actually knows.',
      when: 'Off-the-shelf tools cannot reach your data, or you need to own the system rather than rent it per seat.',
    },
  ],

  'web-app-development': [
    { query: 'Custom website development', what: 'Hand-built marketing sites and web applications — no page-builder bloat, structured for speed and search from the first commit.', when: 'A template cannot express what you do, or an existing site is slow and you cannot see why.' },
    { query: 'Mobile app development for iOS and Android', what: 'Cross-platform apps in React Native or Flutter from one codebase, plus store submission and release management.', when: 'You need to be on both stores without paying to build the same thing twice.' },
    { query: 'E-commerce website development', what: 'Shopify, WooCommerce and custom storefronts with payments, logistics and GST-compliant invoicing wired in.', when: 'You are selling online, or about to, and want the checkout to be someone else’s problem.' },
    { query: 'Web application and portal development', what: 'Dashboards, customer portals and internal tools with real authentication, roles and audit trails.', when: 'A spreadsheet has become the system of record and it is starting to hurt.' },
    { query: 'Website redesign and performance fixes', what: 'A rebuild of an existing site that keeps the URLs and rankings you already have while fixing Core Web Vitals.', when: 'Your site works but looks dated or loads slowly, and you cannot afford to lose search positions.' },
    { query: 'API development and third-party integration', what: 'Connecting your website to CRMs, ERPs, payment gateways, WhatsApp and whatever else has to talk to it.', when: 'Two systems hold the same data and neither agrees with the other.' },
  ],

  'seo-content-marketing': [
    { query: 'Technical SEO audit and fixes', what: 'A crawl of the whole site covering indexing, canonicals, structured data, internal linking and Core Web Vitals — then the fixes, not just the report.', when: 'Pages are not being indexed, or traffic dropped and nobody can say why.' },
    { query: 'Local SEO and Google Business Profile', what: 'Profile setup and optimisation, citation consistency, review generation and location pages that earn their place.', when: 'You serve a city or a few cities and want to appear in the map pack.' },
    { query: 'E-commerce SEO', what: 'Category and product page structure, faceted-navigation control, schema and internal linking built for large catalogues.', when: 'You have hundreds of products and only a handful of them rank.' },
    { query: 'Content strategy and SEO writing', what: 'Topic clusters mapped to real search demand, written by people who understand the subject and edited before publication.', when: 'You are publishing regularly and it is not producing traffic or enquiries.' },
    { query: 'AI search optimisation (AEO and GEO)', what: 'Structuring pages so ChatGPT, Perplexity, Claude and Google AI Overviews can cite you — entity markup, answer-first content, llms.txt and the off-site corroboration those systems check.', when: 'Buyers in your market are starting to ask an assistant instead of running a search.' },
    { query: 'Link building and digital PR', what: 'Editorial links from real publications and industry directories. No networks, no paid placements dressed up as coverage.', when: 'Your content is better than the pages outranking you and you cannot work out why they win.' },
  ],

  'social-media-marketing': [
    { query: 'Instagram marketing and content', what: 'Reels, carousels and stories on a schedule, with the shooting, editing and captioning handled.', when: 'The account is inconsistent because posting depends on who has time this week.' },
    { query: 'LinkedIn marketing for B2B', what: 'Company and founder-led content built for a considered buying cycle, plus outreach that does not read as automated.', when: 'You sell to businesses and your decision-makers are on LinkedIn, not Instagram.' },
    { query: 'Social media management', what: 'Calendar, publishing, community management and monthly reporting across every platform you actually use.', when: 'You want the whole function handled rather than another tool to log into.' },
    { query: 'Influencer and creator campaigns', what: 'Sourcing, briefing, contracting and measuring creators, with deliverables and usage rights agreed in writing.', when: 'You want reach in a niche where your own audience is still small.' },
    { query: 'Video content and short-form production', what: 'Scripting, filming and editing for Reels, Shorts and ads, shot in batches so a month goes out in one session.', when: 'Video is the format your audience responds to and producing it keeps slipping.' },
  ],

  'digital-marketing': [
    { query: 'Full-funnel digital marketing', what: 'SEO, paid, social and email run as one funnel by one team, with a single report rather than four.', when: 'You are coordinating separate vendors and none of them will own the number.' },
    { query: 'Lead generation campaigns', what: 'Campaigns measured on qualified enquiries and cost per lead, not impressions or clicks.', when: 'Traffic is fine and the pipeline is not.' },
    { query: 'Marketing automation and CRM', what: 'Lead capture, scoring, nurture sequences and CRM hygiene, so nothing sits unworked.', when: 'Leads arrive and then go quiet because follow-up is manual.' },
    { query: 'Analytics, GA4 and conversion tracking', what: 'GA4, Search Console, Google Ads and Meta conversions configured properly, including which page produced each enquiry.', when: 'You cannot tell which channel is actually paying for itself.' },
    { query: 'Conversion rate optimisation', what: 'Landing page and funnel work driven by session recordings and tests rather than opinion.', when: 'You are buying enough traffic and too little of it converts.' },
  ],

  'google-ads': [
    { query: 'Google Search Ads management', what: 'Search campaigns built on real query research, with negative keyword hygiene and bidding managed to cost per lead.', when: 'You need enquiries this month, not in six.' },
    { query: 'Google Shopping and Performance Max', what: 'Feed optimisation, product segmentation and PMax asset groups controlled rather than left on autopilot.', when: 'You sell products online and the feed is doing most of the work.' },
    { query: 'YouTube and Display advertising', what: 'Video and display for demand generation and remarketing, with creative built for the placement.', when: 'You need people to know you exist before they search for you.' },
    { query: 'Google Ads account audit', what: 'A structural review of an existing account — wasted spend, conversion tracking accuracy, bidding and account structure.', when: 'Spend is climbing and results are not, or you inherited an account nobody understands.' },
    { query: 'Landing pages for Google Ads', what: 'Fast, focused pages built for the campaign rather than pointing paid traffic at your homepage.', when: 'Clicks are affordable and the landing page is where they die.' },
  ],

  'performance-marketing': [
    { query: 'Meta Ads (Facebook and Instagram)', what: 'Prospecting and retargeting with creative testing run as a system rather than one-off boosts.', when: 'Your audience discovers brands on social and buys shortly after.' },
    { query: 'Paid media strategy across channels', what: 'Budget split across Google, Meta and LinkedIn based on where each stage of your funnel actually performs.', when: 'You are spending on several platforms with no view of which one earns the sale.' },
    { query: 'Creative testing and ad production', what: 'Structured testing of hooks, formats and offers, with the winners produced at volume.', when: 'Performance has plateaued and the creative has not changed in months.' },
    { query: 'Retargeting and audience building', what: 'Server-side tracking, custom audiences and exclusion logic so you stop paying to reach people who already bought.', when: 'Your remarketing is one catch-all audience.' },
    { query: 'E-commerce performance marketing', what: 'ROAS-led campaigns with catalogue ads, and post-purchase sequences that lift repeat rate.', when: 'You are scaling an online store and unit economics matter more than volume.' },
  ],

  'podcast-production': [
    { query: 'Podcast production and editing', what: 'Editing, mixing, mastering and show notes from your raw recording.', when: 'You can hold the conversation but do not want to touch an audio timeline.' },
    { query: 'Video podcast production', what: 'Multi-camera recording and editing so one session produces the episode and the clips.', when: 'You want the show on YouTube as well as in audio apps.' },
    { query: 'Podcast launch and distribution', what: 'Naming, cover art, RSS setup and submission to Spotify, Apple Podcasts and YouTube.', when: 'You are starting from nothing and want it set up correctly once.' },
    { query: 'Podcast clips for social media', what: 'Short vertical cuts with captions, pulled from each episode for Reels, Shorts and LinkedIn.', when: 'The episodes are good and nobody outside your list hears them.' },
  ],

  'financial-consulting': [
    { query: 'Financial planning and modelling', what: 'Cash-flow forecasting, budgeting and scenario models you can actually operate from.', when: 'You are making decisions on last month’s bank balance.' },
    { query: 'Business financial health check', what: 'A review of margins, costs, working capital and pricing, with what to change first.', when: 'Revenue is growing and profit is not following it.' },
    { query: 'Fundraising and investor readiness', what: 'Financial models, data-room preparation and the numbers behind the deck.', when: 'You are raising and want the finances to survive diligence.' },
    { query: 'Cost optimisation and process review', what: 'Finding what is being spent without a return, and the processes that keep it there.', when: 'Costs have grown with headcount and nobody has audited them.' },
  ],

  'business-consultation': [
    { query: 'Business strategy consulting', what: 'Positioning, market and growth strategy, with a plan someone can be held to.', when: 'You know the business needs to change direction and want it argued through first.' },
    { query: 'Business process optimisation', what: 'Mapping how work actually flows, finding where it stalls, and redesigning the parts that cost the most.', when: 'Everything takes longer than it should and nobody can point at why.' },
    { query: 'Digital transformation consulting', what: 'Choosing and sequencing the systems a growing business needs, so you do not buy four tools that overlap.', when: 'You are running on spreadsheets and WhatsApp and it has stopped scaling.' },
    { query: 'Startup and go-to-market consulting', what: 'Proposition, pricing, channel choice and the first ninety days of execution.', when: 'You are launching and want to avoid the expensive, obvious mistakes.' },
  ],

  'business-loans': [
    { query: 'Business loan advisory', what: 'Working out which facility fits your need and your books, and what it will realistically cost.', when: 'You need capital and are not sure which product or lender to approach.' },
    { query: 'Working capital and cash-flow finance', what: 'Short-term facilities to cover the gap between paying suppliers and being paid.', when: 'The business is profitable on paper and tight in the bank.' },
    { query: 'Loan documentation support', what: 'Preparing the financials, projections and paperwork lenders ask for.', when: 'You have been asked for documents you do not have ready.' },
    { query: 'MSME and government scheme guidance', what: 'Eligibility and application support for MSME and government-backed credit schemes.', when: 'You may qualify for subsidised credit and do not know where to start.' },
  ],

  'business-insurance': [
    { query: 'Business insurance advisory', what: 'A review of what your business is actually exposed to, and which cover is worth buying.', when: 'You are insured because someone sold you a policy, not because anyone assessed the risk.' },
    { query: 'Group health insurance for employees', what: 'Structuring and placing group medical cover, including dependants and claims support.', when: 'You are hiring and need a benefits package that competes.' },
    { query: 'Property, fire and asset insurance', what: 'Cover for premises, equipment, stock and machinery.', when: 'A single incident at one location would stop the business.' },
    { query: 'Liability and professional indemnity', what: 'Cover for third-party claims and professional negligence, including contractual requirements.', when: 'A client contract requires it, or your advice carries real consequences.' },
  ],
};

/**
 * Services shown first in the lead form on a given service page, so an AI page
 * asks about AI things. Everything else stays reachable behind one disclosure.
 * Values must match SERVICES[].name in serviceContent.js — verify:seo enforces it.
 */
export const RELATED_FORM_SERVICES: Record<string, string[]> = {
  'ai-solutions': ['AI Chatbot Development', 'AI Voice Callers', 'AI Meeting Assistant', 'AI & Business Process Automation', 'Agentic AI Development', 'AI Content Services', 'AI Video Services', 'AI Development', 'AI Consulting'],
  'web-app-development': ['Web Development', 'Web Design', 'Mobile App Development', 'Android App Development', 'iOS App Development', 'Full-Stack Development', 'Custom Software Development'],
  'seo-content-marketing': ['SEO Services', 'Local SEO', 'Enterprise SEO', 'E-commerce SEO', 'Digital Marketing'],
  'social-media-marketing': ['Social Media Marketing', 'Instagram Marketing', 'Meta Ads Management', 'AI Video Services'],
  'digital-marketing': ['Digital Marketing', 'SEO Services', 'Google Ads Management', 'Meta Ads Management', 'Social Media Marketing'],
  'google-ads': ['Google Ads Management', 'Digital Marketing', 'SEO Services', 'Meta Ads Management'],
  'performance-marketing': ['Meta Ads Management', 'Google Ads Management', 'Digital Marketing', 'Instagram Marketing'],
  'podcast-production': ['Podcast Production', 'AI Video Services', 'Social Media Marketing'],
  'financial-consulting': ['Financial Consulting', 'Business Consultation'],
  'business-consultation': ['Business Consultation', 'Financial Consulting', 'Custom Software Development'],
  'business-loans': ['Business Loans', 'Financial Consulting'],
  'business-insurance': ['Business Insurance', 'Business Consultation'],
};
