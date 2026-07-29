/**
 * serviceContent.js — the uniqueness engine for avanienterprises.in
 *
 * WHY THIS EXISTS
 * ---------------
 * Before this module, 253 location pages shared byte-identical body content:
 * the same four "whyAvani" cards, the same two FAQs, and one intro sentence with
 * the city name swapped in. Google classifies that as scaled content and refuses
 * to index it ("Crawled – currently not indexed").
 *
 * This module holds REAL, verifiable facts about (a) each service we sell and
 * (b) each place we actually operate in, plus a resolver that combines them.
 * Because the combination is data-driven, `web-development-company-mumbai` and
 * `web-development-company-jaipur` end up describing genuinely different
 * business districts, different local industry mixes and different engagement
 * realities — not the same sentence with a word replaced.
 *
 * HONESTY RULE (do not break)
 * ---------------------------
 * Everything here is either verifiable public fact (business districts, local
 * industry clusters, time-zone offsets, currencies) or a true statement about how
 * we work. `proof: []` is deliberately empty everywhere — fill it only with real
 * portfolio items and real metrics. Never add invented client counts, star
 * ratings, case studies or exact prices. YMYL services (loans, insurance,
 * financial consulting) carry `ymyl: true` and must keep their disclaimers.
 *
 * CONSUMED BY
 * -----------
 *   - src/components/seo/LocalValueSection.tsx   (React runtime)
 *   - src/components/seo/SeoLandingTemplate.tsx  (prepends unique FAQs/benefits)
 *   - api/seo.js                                 (server-rendered HTML body)
 *
 * The section between DATA-START and DATA-END has no imports so it stays safe to
 * consume from the Vercel serverless function as well as the browser bundle.
 */

/* DATA-START */

// ---------------------------------------------------------------------------
// Company facts (from avani-enterprises-website-content.md — real)
// ---------------------------------------------------------------------------
const COMPANY = {
  name: 'Avani Enterprises',
  hq: 'Tower B, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, Haryana 122002',
  email: 'kp@avanienterprises.in',
  phone: '+91 92536 25099',
  site: 'https://www.avanienterprises.in',
};

// ---------------------------------------------------------------------------
// SERVICES — one entry per genuinely distinct service we sell.
// Keys are canonical service ids; URL slugs map in through SERVICE_ALIASES.
// ---------------------------------------------------------------------------
const SERVICES = {
  'web-development': {
    name: 'Web Development',
    noun: 'web development',
    deliverables: [
      'Custom websites and web applications (no page-builder templates)',
      'Headless or WordPress CMS so your team can edit without a developer',
      'API and back-end integration with your CRM, ERP or payment gateway',
      'Core Web Vitals work: image pipeline, code-splitting, caching',
      'Analytics, conversion tracking and form-to-CRM wiring',
    ],
    stack: ['React / Next.js', 'Node.js', 'PostgreSQL / MongoDB', 'Tailwind CSS', 'Vercel / AWS'],
    process: [
      'Discovery call and written scope',
      'Wireframes, then visual design sign-off',
      'Build in sprints with a live staging link',
      'QA across devices plus Lighthouse pass',
      'Launch, then a support window',
    ],
    timeline: 'Typically 3–10 weeks depending on page count and integrations',
    priceModel: 'Fixed-scope quote after a free discovery call, or a monthly retainer for ongoing work',
    intent: 'businesses replacing a slow, template-built or outdated website',
    faqs: [
      { q: 'Do you build custom sites or use templates?', a: 'Custom and hand-coded. Template and page-builder sites carry markup you cannot control, which is what usually caps Core Web Vitals scores and makes technical SEO fixes impossible later.' },
      { q: 'Will the site be fast and crawlable on launch day?', a: 'Yes. We render pages server-side or statically where it helps, ship an optimised image pipeline, and put real content in the HTML rather than relying on JavaScript to paint it — so search engines see the page on the first crawl.' },
      { q: 'Who owns the code?', a: 'You do. You get the repository and the deployment configuration, so you are never locked to us to make a change.' },
    ],
    proof: [],
  },

  'web-design': {
    name: 'Web Design',
    noun: 'web design',
    deliverables: [
      'UX audit of the current site with recorded findings',
      'Wireframes for every unique page type',
      'High-fidelity UI design in Figma',
      'A reusable design system: type scale, colour tokens, components',
      'Clickable prototype plus developer handoff',
    ],
    stack: ['Figma', 'Design tokens', 'WCAG 2.1 AA contrast checks'],
    process: ['Audit and research', 'Wireframes', 'Visual design', 'Prototype and review', 'Handoff'],
    timeline: 'Typically 2–5 weeks',
    priceModel: 'Per-project, or a design retainer if you ship continuously',
    intent: 'teams whose site looks dated or converts poorly despite traffic',
    faqs: [
      { q: 'Can I hire you for design only?', a: 'Yes. We hand off a Figma file with a documented design system and specs your existing developers can build from.' },
      { q: 'How do you design for conversion rather than just looks?', a: 'We start from the single action the page must produce, then structure hierarchy, form placement and CTA repetition around it. Aesthetic decisions come after that constraint, not before it.' },
    ],
    proof: [],
  },

  'mobile-app-development': {
    name: 'Mobile App Development',
    noun: 'mobile app development',
    deliverables: [
      'iOS and Android apps, native or cross-platform',
      'App back-end, APIs and admin panel',
      'Push notifications, analytics and crash reporting',
      'App Store and Play Store submission, including review responses',
      'Post-launch maintenance and OS-version updates',
    ],
    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Node.js', 'Firebase'],
    process: [
      'Scope and platform decision',
      'UI/UX design for both platforms',
      'Sprint development with TestFlight / internal-track builds',
      'Device QA across screen sizes and OS versions',
      'Store submission and launch support',
    ],
    timeline: 'Typically 6–14 weeks',
    priceModel: 'Fixed-scope per milestone, or a retainer for continuous releases',
    intent: 'businesses that need a customer-facing or field-team app',
    faqs: [
      { q: 'Native or cross-platform — which do I need?', a: 'Cross-platform covers most business apps from one codebase and cuts both cost and release effort roughly in half. We recommend native only when you need heavy device hardware access, sustained high frame rates, or platform-specific APIs.' },
      { q: 'Do you handle App Store and Play Store rejections?', a: 'Yes. Submission, store listing assets and any review-team back-and-forth are part of the engagement, not an extra.' },
    ],
    proof: [],
  },

  'ecommerce-development': {
    name: 'E-commerce Development',
    noun: 'e-commerce development',
    deliverables: [
      'Shopify, WooCommerce or custom storefront builds',
      'Payment gateway and shipping/logistics integration',
      'Catalogue import, variants and inventory sync',
      'Checkout speed and abandoned-cart recovery',
      'Migration with 301 mapping so rankings survive',
    ],
    stack: ['Shopify', 'WooCommerce', 'Next.js Commerce', 'Razorpay', 'Stripe', 'Shiprocket'],
    process: ['Platform selection', 'Design', 'Build and integrate', 'Test checkout end to end', 'Launch and optimise'],
    timeline: 'Typically 3–8 weeks',
    priceModel: 'Per-project build, then an optional growth retainer',
    intent: 'brands launching or replatforming an online store',
    faqs: [
      { q: 'Shopify, WooCommerce, or custom?', a: 'Shopify when you want to launch fast with minimal maintenance; WooCommerce when you already run WordPress and want to avoid platform transaction fees; custom when catalogue logic, B2B pricing tiers or checkout rules exceed what either platform allows.' },
      { q: 'Will replatforming lose my Google rankings?', a: 'Not if the migration is mapped properly. We build a URL-by-URL 301 map before cutover and keep the old structure crawlable during the switch, which is where most botched migrations lose traffic.' },
    ],
    proof: [],
  },

  'seo': {
    name: 'SEO Services',
    noun: 'SEO',
    deliverables: [
      'Technical crawl and audit with prioritised fix list',
      'Index-bloat and duplicate-content cleanup',
      'Keyword and search-intent mapping to pages',
      'On-page optimisation and content depth work',
      'Internal link architecture and digital PR',
      'Monthly reporting against rankings and leads, not impressions',
    ],
    stack: ['Google Search Console', 'GA4', 'Screaming Frog', 'Ahrefs / Semrush'],
    process: [
      'Crawl, audit and baseline',
      'Fix crawl, index and duplication problems first',
      'Map intent to pages and deepen thin ones',
      'Earn authority through links and mentions',
      'Report and iterate monthly',
    ],
    timeline: 'Technical wins in weeks; ranking movement typically 3–6 months',
    priceModel: 'Monthly retainer scoped to how competitive the keyword set is',
    intent: 'sites with traffic problems, indexing problems, or both',
    faqs: [
      { q: 'How long before I see SEO results?', a: 'Technical fixes — crawl errors, duplicate content, index bloat — can show within weeks. Competitive ranking gains usually take 3 to 6 months because they depend on authority, which compounds rather than switches on.' },
      { q: 'Do you use doorway pages or spun content?', a: 'No. Both are explicit Google spam violations and cause site-wide demotions. We do the opposite: consolidate duplicates, de-index thin pages, and make the survivors genuinely deep.' },
      { q: 'What do you do first?', a: 'We look for pages Google has crawled but refused to index. That bucket tells you whether your problem is quality, duplication or authority, and it changes what we work on first.' },
    ],
    proof: [],
  },

  'digital-marketing': {
    name: 'Digital Marketing',
    noun: 'digital marketing',
    deliverables: [
      'Channel strategy based on where your buyers actually search',
      'SEO, paid search, paid social and lifecycle email',
      'Landing pages built for the campaign, not the brochure',
      'Conversion tracking, GA4 and CRM attribution',
      'One monthly report tying spend to qualified leads',
    ],
    stack: ['GA4', 'Google Ads', 'Meta Ads Manager', 'Search Console', 'CRM integrations'],
    process: ['Audit and goal setting', 'Channel plan and budget split', 'Launch', 'Optimise on cost per qualified lead', 'Report'],
    timeline: 'Campaigns live within weeks; compounding channels build over months',
    priceModel: 'Monthly retainer plus your ad spend, billed separately and transparently',
    intent: 'businesses that need more qualified leads across more than one channel',
    faqs: [
      { q: 'Which channel should we start with?', a: 'Whichever one reaches people already looking to buy — usually paid search or SEO. Social and remarketing layer on once you know your cost per qualified lead, because they are demand-creation rather than demand-capture.' },
      { q: 'How is ad spend handled?', a: 'Ad spend goes directly to Google or Meta on your own account. We charge a management fee separately, so you can always see exactly what reached the platform.' },
    ],
    proof: [],
  },

  'google-ads': {
    name: 'Google Ads Management',
    noun: 'Google Ads management',
    deliverables: [
      'Account audit and wasted-spend report',
      'Search, Performance Max, Shopping and YouTube campaigns',
      'Keyword, negative-keyword and search-term hygiene',
      'Conversion tracking and offline conversion import',
      'Ad copy testing and landing page recommendations',
      'Weekly optimisation, monthly reporting',
    ],
    stack: ['Google Ads', 'Google Tag Manager', 'GA4', 'Merchant Center', 'Looker Studio'],
    process: ['Audit', 'Fix tracking before spending more', 'Rebuild campaign structure', 'Optimise to cost per qualified lead', 'Scale what works'],
    timeline: 'Live in days; meaningful CPA movement usually within 4–8 weeks',
    priceModel: 'Management fee plus your ad spend on your own account',
    intent: 'advertisers with high spend and unclear return',
    faqs: [
      { q: 'What monthly budget do I need?', a: 'It depends entirely on cost per click in your category, which varies enormously — a local service keyword and a competitive B2B software keyword can differ by 20x. We model a realistic starting budget and expected cost per lead in the first call rather than quote a number blind.' },
      { q: 'Why fix tracking before increasing budget?', a: 'Google optimises toward the conversions you report. If tracking counts form views instead of qualified leads, more budget simply buys more of the wrong thing faster.' },
    ],
    proof: [],
  },

  'meta-ads': {
    name: 'Meta Ads Management',
    noun: 'Meta Ads management',
    deliverables: [
      'Facebook and Instagram campaign management',
      'Audience, lookalike and retargeting structure',
      'Creative production: static, carousel and short-form video',
      'Pixel plus Conversions API for post-iOS tracking accuracy',
      'Lead-form and WhatsApp-to-CRM routing',
      'Creative testing cadence and reporting',
    ],
    stack: ['Meta Ads Manager', 'Meta Pixel', 'Conversions API', 'WhatsApp Business API'],
    process: ['Account and pixel audit', 'Server-side tracking setup', 'Creative and audience build', 'Test and scale winners', 'Report'],
    timeline: 'Live in days; creative winners usually emerge in 2–4 weeks',
    priceModel: 'Management fee plus your ad spend',
    intent: 'brands that need volume from social and want leads routed instantly',
    faqs: [
      { q: 'Why does Meta reporting disagree with my CRM?', a: 'Browser-only pixel tracking lost a large share of attribution after Apple’s ATT changes. We install the Conversions API so conversions are also sent server-side, which closes most of that gap and lets Meta optimise on real leads.' },
      { q: 'Do you produce the creative?', a: 'Yes — static, carousel and short-form video. On Meta, creative is the main performance lever, so a fixed testing cadence matters more than audience micro-tuning.' },
    ],
    proof: [],
  },

  'social-media-marketing': {
    name: 'Social Media Marketing',
    noun: 'social media marketing',
    deliverables: [
      'Content strategy and a monthly publishing calendar',
      'Graphic and short-form video production',
      'Publishing and community management',
      'Paid amplification of organic winners',
      'Monthly analytics on reach, engagement and leads',
    ],
    stack: ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'X'],
    process: ['Audit and positioning', 'Content pillars and calendar', 'Produce and publish', 'Engage and moderate', 'Report and adjust'],
    timeline: 'Ongoing monthly engagement',
    priceModel: 'Monthly retainer by post volume and production type',
    intent: 'brands that need consistent presence and inbound from social',
    faqs: [
      { q: 'Do you create the content or only schedule it?', a: 'Both. We can own strategy, production, publishing and community management end to end, or slot into an existing team and handle only the parts you are short on.' },
      { q: 'How do you measure social if it does not convert directly?', a: 'We track assisted conversions and branded search volume alongside engagement. Social usually shows up as a lift in people searching your name, which is why judging it on last-click alone understates it.' },
    ],
    proof: [],
  },

  'ai-development': {
    name: 'AI Development',
    noun: 'AI development',
    deliverables: [
      'Custom AI features built into your existing product',
      'Retrieval-augmented generation over your own documents',
      'Model selection and cost/latency benchmarking',
      'Evaluation sets and guardrails before launch',
      'Monitoring, logging and ongoing tuning',
    ],
    stack: ['Anthropic Claude', 'OpenAI GPT', 'Google Gemini', 'Vector databases', 'Python', 'Node.js'],
    process: ['Use-case scoping and feasibility', 'Data preparation', 'Build and evaluate', 'Guardrails and red-teaming', 'Deploy and monitor'],
    timeline: 'Typically 3–10 weeks',
    priceModel: 'Fixed-scope for a defined feature, retainer for continuous AI work',
    intent: 'teams adding AI to a product rather than buying an off-the-shelf tool',
    faqs: [
      { q: 'Which AI model do you build on?', a: 'We are model-agnostic and benchmark for your specific task. Claude, GPT and Gemini differ meaningfully on long-context handling, latency and cost per token, and the right pick changes by workload — so we test rather than default.' },
      { q: 'How do you stop the AI making things up?', a: 'We ground answers in your own content through retrieval, constrain output formats, and run an evaluation set before launch. Where a wrong answer would be costly, we add a confidence threshold that routes to a human instead of guessing.' },
    ],
    proof: [],
  },

  'ai-chatbot': {
    name: 'AI Chatbot Development',
    noun: 'AI chatbot development',
    deliverables: [
      'Chatbot trained on your documents, FAQs and product catalogue',
      'Deployment to website, app and WhatsApp',
      'Lead capture with handoff to a human',
      'Multilingual responses where you need them',
      'Conversation analytics and gap reporting',
    ],
    stack: ['Claude', 'GPT', 'Gemini', 'RAG', 'WhatsApp Cloud API', 'Webhooks'],
    process: ['Define the questions it must handle', 'Connect the knowledge base', 'Build and tune retrieval', 'Guardrail and test', 'Deploy and monitor'],
    timeline: 'Typically 2–6 weeks',
    priceModel: 'Build fee plus a monthly hosting and tuning plan',
    intent: 'businesses drowning in repetitive enquiries or losing leads after hours',
    faqs: [
      { q: 'Can it answer from my own content rather than the open web?', a: 'Yes — that is the point of the retrieval layer. It reads your documents, pricing and policies at query time and answers from them, and says it does not know rather than inventing an answer when the content is missing.' },
      { q: 'Does it work on WhatsApp?', a: 'Yes, through the Meta WhatsApp Cloud API, including lead capture and handoff to a human agent mid-conversation.' },
      { q: 'What happens when it cannot answer?', a: 'It hands off. We configure an escalation path to email, WhatsApp or your CRM, and log the unanswered question so the knowledge base gets filled in.' },
    ],
    proof: [],
  },

  'ai-callers': {
    name: 'AI Voice Callers',
    noun: 'AI voice agents',
    deliverables: [
      'AI voice agents for inbound and outbound calls',
      'Lead qualification and appointment booking over the phone',
      'Call transfer to a human agent with context carried over',
      'CRM logging with transcript and call summary',
      'Multilingual voice, including Hindi and English',
      'Call recordings, transcripts and outcome reporting',
    ],
    stack: ['Realtime speech-to-text', 'LLM dialogue layer', 'Neural text-to-speech', 'Telephony / SIP', 'CRM webhooks'],
    process: [
      'Map the call script and the decision points',
      'Choose voice, language and escalation rules',
      'Integrate telephony and CRM',
      'Test against recorded real calls',
      'Launch on a slice of traffic, then scale',
    ],
    timeline: 'Typically 3–8 weeks',
    priceModel: 'Build fee plus usage-based per-minute cost, quoted after a call-volume review',
    intent: 'teams missing calls, calling leads back too slowly, or unable to staff the phone 24/7',
    faqs: [
      { q: 'How is an AI caller different from an IVR menu?', a: 'An IVR makes the caller navigate a fixed menu. A voice agent holds an open conversation — it understands what the caller said, asks follow-up questions, and completes the task, rather than routing them to press 4.' },
      { q: 'Will callers be told they are talking to an AI?', a: 'Yes. We configure disclosure at the start of the call. It is both the honest default and increasingly a legal requirement in several markets.' },
      { q: 'What happens on a complex or angry call?', a: 'It transfers. We set escalation triggers — sentiment, repeated confusion, or an explicit request for a person — and the human agent receives the transcript so the caller does not have to repeat themselves.' },
      { q: 'Can it call leads back automatically?', a: 'Yes. A new lead from a form, ad or WhatsApp can trigger an outbound call within seconds, which is usually where speed-to-lead is won or lost.' },
    ],
    proof: [],
  },

  'ai-content': {
    name: 'AI Content Services',
    noun: 'AI content production',
    deliverables: [
      'AI-assisted content production with human editing on every piece',
      'Brand voice guide the models are constrained to',
      'Long-form articles, product copy and landing pages',
      'Bulk product descriptions and category copy for large catalogues',
      'Repurposing one asset into social, email and short-form scripts',
      'Fact-checking and originality pass before publication',
    ],
    stack: ['Claude', 'GPT', 'Gemini', 'Brand voice prompts', 'Human editorial review'],
    process: [
      'Build a brand voice and terminology guide',
      'Research topics and search intent',
      'Draft with AI against that guide',
      'Human edit, fact-check and originality pass',
      'Publish and track performance',
    ],
    timeline: 'First batch typically 2–4 weeks, then a monthly cadence',
    priceModel: 'Per-batch or monthly retainer by volume and depth',
    intent: 'teams that need content volume without publishing generic AI filler',
    faqs: [
      { q: 'Will AI-written content get my site penalised?', a: 'Google penalises content produced at scale to game rankings, not the tool used to write it. The failure mode is unedited, undifferentiated output — so every piece we deliver goes through human editing, fact-checking and an originality pass before it publishes.' },
      { q: 'How do you keep it from sounding generic?', a: 'We build a brand voice guide with real examples of your positioning, terminology and things you refuse to say, and constrain the model to it. The human edit then adds the specifics — your data, your customers, your point of view — that a model cannot know.' },
      { q: 'Can you handle thousands of product descriptions?', a: 'Yes. Bulk catalogue copy is one of the strongest uses for this, because the source facts are structured. We generate against your attribute data and spot-check a sample rather than eyeballing every row.' },
    ],
    proof: [],
  },

  'ai-video': {
    name: 'AI Video Services',
    noun: 'AI video production',
    deliverables: [
      'AI-generated and AI-assisted video for ads and social',
      'AI avatar presenters and voice-over in multiple languages',
      'Product explainers and demo videos from existing assets',
      'Short-form vertical cuts for Reels, Shorts and Stories',
      'Subtitles, localisation and platform-specific aspect ratios',
      'Creative variants for ad testing',
    ],
    stack: ['AI video generation', 'AI avatars', 'Neural voice-over', 'Editing and grading', 'Auto-captioning'],
    process: ['Script and storyboard', 'Generate or shoot base footage', 'Edit, caption and grade', 'Produce platform variants', 'Deliver and iterate on performance'],
    timeline: 'Typically 1–3 weeks per batch',
    priceModel: 'Per-video or a monthly content package',
    intent: 'brands that need a high volume of video creative without a studio budget',
    faqs: [
      { q: 'Where does AI video work well, and where does it not?', a: 'It works well for explainers, presenter-led scripts, localisation and high-volume ad variants where the value is in the message. It works poorly where authenticity is the point — real customer testimonials, founder stories and on-site footage still need a camera.' },
      { q: 'Can you produce the same video in several languages?', a: 'Yes. Neural voice-over plus subtitles means one script can ship in multiple languages at a fraction of a reshoot, which is the main cost advantage of the format.' },
      { q: 'Do we get the raw files?', a: 'Yes — final renders in each aspect ratio plus source project files.' },
    ],
    proof: [],
  },

  'agentic-ai': {
    name: 'Agentic AI Development',
    noun: 'agentic AI development',
    deliverables: [
      'AI agents that complete tasks by calling your tools and APIs',
      'Multi-step workflows with retry and failure handling',
      'Human-in-the-loop approval on sensitive actions',
      'Scoped tool permissions and full action logging',
      'Evaluation harness before anything touches production',
    ],
    stack: ['Claude and GPT tool-calling', 'Model Context Protocol (MCP)', 'Workflow orchestration', 'Vector databases', 'Your existing APIs'],
    process: [
      'Map the workflow a human does today',
      'Define the tool surface and the guardrails',
      'Build the agent against a sandbox',
      'Evaluate on real historical cases',
      'Deploy behind approvals, then widen autonomy',
    ],
    timeline: 'Typically 4–10 weeks',
    priceModel: 'Fixed-scope per workflow, retainer for a growing agent estate',
    intent: 'operations teams whose people spend hours moving data between systems',
    faqs: [
      { q: 'What is agentic AI, in practice?', a: 'A chatbot answers a question and stops. An agent completes the task — it reads your systems, decides the next step, calls the right API and reports back. The engineering difficulty is not the model; it is the permissions, error handling and approval gates around it.' },
      { q: 'How do you keep an agent from doing something destructive?', a: 'Scoped tool permissions, a human approval gate on anything irreversible, sandboxed testing against historical cases, and a full audit log of every action. Agents start read-mostly and earn write access workflow by workflow.' },
      { q: 'What workflows are actually worth automating?', a: 'High-frequency, rules-plus-judgement work spanning two or more systems — lead routing, order exception handling, invoice matching, support triage. One-off tasks and pure rules-based jobs are cheaper to script than to agent.' },
    ],
    proof: [],
  },

  'ai-automation': {
    name: 'AI & Business Process Automation',
    noun: 'AI-driven process automation',
    deliverables: [
      'Audit of manual work worth automating, with hours quantified',
      'Workflow automation across your existing tools',
      'AI document and data extraction',
      'Approval routing and exception handling',
      'Dashboards on what the automation is actually doing',
    ],
    stack: ['LLMs for judgement steps', 'Webhooks and REST APIs', 'Automation platforms', 'Custom back-ends'],
    process: ['Shadow the manual process', 'Design the automation and its failure modes', 'Build and integrate', 'Run in parallel with humans', 'Cut over and monitor'],
    timeline: 'Typically 3–8 weeks per process',
    priceModel: 'Per-process fixed scope, or a retainer covering a queue of processes',
    intent: 'businesses where staff time goes into copying data between systems',
    faqs: [
      { q: 'How do you decide what to automate first?', a: 'We measure frequency multiplied by handling time, then discount by how messy the exceptions are. The best first candidate is usually high-volume, moderately structured, and currently owned by one frustrated person.' },
      { q: 'What if the automation gets something wrong?', a: 'We run it in parallel with the existing manual process first and compare outputs. Nothing cuts over until the disagreement rate is understood and the exception path is built.' },
    ],
    proof: [],
  },

  'crm-development': {
    name: 'CRM Development',
    noun: 'CRM development',
    deliverables: [
      'Custom CRM mapped to how your sales team actually sells',
      'Lead capture from ads, forms, WhatsApp and calls into one pipeline',
      'Automation for follow-ups, assignment and reminders',
      'Reporting dashboards for pipeline and rep performance',
      'Migration from spreadsheets or your existing CRM',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Meta and Google lead webhooks', 'WhatsApp Business API'],
    process: ['Map your current sales process', 'Design the data model', 'Build and integrate lead sources', 'Migrate existing data', 'Train the team and support'],
    timeline: 'Typically 4–10 weeks',
    priceModel: 'Fixed-scope build; optional support retainer',
    intent: 'sales teams outgrowing spreadsheets or paying per seat for unused features',
    faqs: [
      { q: 'Why build instead of buying a CRM?', a: 'Two reasons usually decide it: per-seat licensing that scales badly as you hire, and a sales process that does not fit the vendor’s fixed stages. If neither applies, buying is genuinely cheaper and we will say so.' },
      { q: 'Can leads from ads land in it automatically?', a: 'Yes. Meta and Google lead forms, website forms, WhatsApp and inbound calls can all route into one pipeline with the source attached, which is what makes cost-per-qualified-lead reporting possible.' },
    ],
    proof: [],
  },

  'erp-development': {
    name: 'ERP Development',
    noun: 'ERP development',
    deliverables: [
      'Custom ERP modules for HR, finance, inventory and operations',
      'Role-based access control and approval hierarchies',
      'Integration with existing accounting and banking systems',
      'Phased migration so operations keep running',
      'Training and post-rollout support',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Role-based access control'],
    process: ['Process audit across departments', 'Module design and phasing', 'Build module by module', 'Parallel run and data migration', 'Rollout and training'],
    timeline: 'Typically 8–16 weeks, delivered in phases',
    priceModel: 'Phased fixed-scope by module',
    intent: 'businesses running operations across disconnected tools and spreadsheets',
    faqs: [
      { q: 'Custom ERP or a ready product?', a: 'If your workflows are standard, our ready Business OS covers HR, payroll, CRM, projects and finance without a build. Custom makes sense when a core operational process is genuinely specific to how you work and bending it to fit a product would cost more than building it.' },
      { q: 'How do you migrate without stopping operations?', a: 'Module by module, with a parallel run on each. The old system stays authoritative until the new module’s output matches it for a full cycle.' },
    ],
    proof: [],
  },

  'custom-software-development': {
    name: 'Custom Software Development',
    noun: 'custom software development',
    deliverables: [
      'Bespoke web and internal business applications',
      'System integrations between tools that do not talk to each other',
      'Admin panels, dashboards and reporting layers',
      'Technical documentation and handover',
      'Maintenance and enhancement retainers',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'REST and webhook integrations', 'AWS / Vercel'],
    process: ['Requirements and scope document', 'Architecture and data model', 'Sprint delivery with demos', 'UAT with your team', 'Deploy, document and support'],
    timeline: 'Typically 6–16 weeks by scope',
    priceModel: 'Fixed-scope per phase, or a dedicated-team retainer',
    intent: 'businesses whose process does not fit any off-the-shelf product',
    faqs: [
      { q: 'How do you keep a custom build from overrunning?', a: 'A written scope with explicit exclusions, phased delivery, and a demo at the end of each sprint. Overruns almost always come from unwritten assumptions, so we make the boundary of each phase explicit before starting it.' },
    ],
    proof: [],
  },

  'podcast-production': {
    name: 'Podcast Production',
    noun: 'podcast production',
    deliverables: [
      'Recording setup and session management',
      'Audio editing, mixing and mastering',
      'Video editing for YouTube and social',
      'Show notes, chapters and episode artwork',
      'Distribution across podcast platforms',
      'Short-form clips cut for Reels, Shorts and LinkedIn',
    ],
    stack: ['Multi-track audio editing', 'Video post-production', 'Auto-captioning', 'Podcast distribution platforms'],
    process: ['Episode planning', 'Record', 'Edit and master', 'Publish and distribute', 'Cut and schedule short-form'],
    timeline: 'Per episode, on a weekly or fortnightly cadence',
    priceModel: 'Per-episode, or a monthly package including clips',
    intent: 'founders and brands building authority through a show',
    faqs: [
      { q: 'Do you handle video podcasts as well as audio?', a: 'Yes — both, including the multi-camera edit and the vertical clips, which is usually where most of a podcast’s reach actually comes from.' },
      { q: 'How many clips come out of one episode?', a: 'It depends on the episode, but a one-hour conversation typically yields several usable short-form cuts. We pick them on hook strength rather than a fixed quota.' },
    ],
    proof: [],
  },

  // ---- Genuinely distinct sub-services ------------------------------------
  // These previously all aliased to their parent service and therefore rendered
  // byte-identical pages (six web-dev URLs shared one body). They are real,
  // separately-searched specialisms, so they get real, separate content rather
  // than being consolidated away.

  'frontend-development': {
    name: 'Frontend Development',
    noun: 'frontend development',
    deliverables: [
      'Pixel-accurate implementation of your designs',
      'Component library and design-system build',
      'Accessibility to WCAG 2.1 AA',
      'Core Web Vitals tuning: LCP, CLS and INP',
      'Integration against your existing back-end APIs',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Storybook'],
    process: ['Design and API review', 'Component library first', 'Page assembly', 'Cross-browser and device QA', 'Performance pass'],
    timeline: 'Typically 2–8 weeks',
    priceModel: 'Fixed-scope, or a dedicated frontend engineer on retainer',
    intent: 'teams with designs and an API who need the interface built properly',
    faqs: [
      { q: 'Can you work against our existing back-end?', a: 'Yes. Frontend-only engagements are common — we build against your API contract and hand over a component library your team can extend.' },
      { q: 'How do you hit Core Web Vitals?', a: 'Mostly by what we avoid: heavy component libraries, layout-shifting images, and blocking third-party scripts. Then code-splitting, image sizing and font-loading strategy. INP in particular is a frontend problem, not a server one.' },
    ],
    proof: [],
  },

  'backend-development': {
    name: 'Backend Development',
    noun: 'backend development',
    deliverables: [
      'REST and webhook API design and build',
      'Database schema design and query optimisation',
      'Authentication, roles and permissions',
      'Third-party and payment gateway integration',
      'Background jobs, queues and scheduled tasks',
      'Logging, monitoring and error tracking',
    ],
    stack: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS'],
    process: ['Data model and API contract', 'Core services', 'Integrations', 'Load and security testing', 'Deploy with monitoring'],
    timeline: 'Typically 4–12 weeks',
    priceModel: 'Fixed-scope per service, or a dedicated backend engineer on retainer',
    intent: 'products that need a reliable API layer behind the interface',
    faqs: [
      { q: 'How do you handle scale?', a: 'We index and profile queries before reaching for more infrastructure — most performance problems at small and mid scale are a missing index or an N+1 query, not a server size. Caching and read replicas come after that.' },
      { q: 'Do you write documentation?', a: 'Yes. API documentation and a schema diagram are part of handover, so you are not dependent on us to understand your own system.' },
    ],
    proof: [],
  },

  'full-stack-development': {
    name: 'Full-Stack Development',
    noun: 'full-stack development',
    deliverables: [
      'End-to-end product build: interface, API and database',
      'One team owning the whole vertical slice',
      'Deployment pipeline and environments',
      'Admin panel and internal tooling',
      'Handover with documentation and repository access',
    ],
    stack: ['React / Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS / Vercel'],
    process: ['Scope and architecture', 'Vertical slices, feature by feature', 'Demo each sprint', 'UAT', 'Launch and support'],
    timeline: 'Typically 6–16 weeks',
    priceModel: 'Fixed-scope per phase, or a dedicated team on retainer',
    intent: 'businesses building a product from scratch with no in-house engineering',
    faqs: [
      { q: 'Why one team for both ends?', a: 'It removes the handoff. Most schedule slippage on split engagements comes from the frontend waiting on an API that turned out to be shaped wrong, and a single team catches that in the same sprint.' },
      { q: 'Can you take over an existing codebase?', a: 'Yes, after a paid audit. We would rather spend a week understanding what is there than commit to a timeline blind.' },
    ],
    proof: [],
  },

  'shopify-development': {
    name: 'Shopify Development',
    noun: 'Shopify development',
    deliverables: [
      'Custom Shopify theme development',
      'Liquid templating and section-based editing for your team',
      'Shopify app integration and custom private apps',
      'Checkout extensibility on Shopify Plus',
      'Migration from WooCommerce, Magento or a custom store',
      'Speed optimisation within Shopify’s constraints',
    ],
    stack: ['Shopify', 'Liquid', 'Shopify CLI', 'Hydrogen', 'Shopify Plus', 'Metafields'],
    process: ['Store and app audit', 'Theme architecture', 'Build with section-based editing', 'Checkout and payment testing', 'Launch and monitor'],
    timeline: 'Typically 3–7 weeks',
    priceModel: 'Per-project build, optional growth retainer',
    intent: 'brands on Shopify who have outgrown a purchased theme',
    faqs: [
      { q: 'Why not just buy a premium theme?', a: 'For a simple catalogue, do — it is genuinely cheaper. Custom pays off when you need merchandising logic, B2B pricing or a checkout flow the theme fights you on, or when theme bloat is capping your speed scores.' },
      { q: 'Do we need Shopify Plus?', a: 'Only if you need checkout customisation, scripts, or the higher API limits. We will tell you if your requirements genuinely need it rather than upsell the plan.' },
    ],
    proof: [],
  },

  'woocommerce-development': {
    name: 'WooCommerce Development',
    noun: 'WooCommerce development',
    deliverables: [
      'Custom WooCommerce store build on WordPress',
      'Custom product types, variations and pricing rules',
      'Payment and shipping integration for Indian and international gateways',
      'Plugin audit and replacement of bloated plugins with custom code',
      'Performance work: caching, query optimisation, image pipeline',
      'Migration from Shopify or another platform',
    ],
    stack: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'Razorpay', 'Redis object cache'],
    process: ['Plugin and performance audit', 'Store architecture', 'Custom build', 'Checkout testing', 'Launch and harden'],
    timeline: 'Typically 3–8 weeks',
    priceModel: 'Per-project build, optional maintenance retainer',
    intent: 'stores that want WordPress control and no platform transaction fees',
    faqs: [
      { q: 'Why is our WooCommerce store slow?', a: 'Usually plugin count and uncached admin-ajax queries rather than hosting. We audit what each plugin costs you and replace the worst offenders with targeted code — that typically does more than upgrading the server.' },
      { q: 'WooCommerce or Shopify?', a: 'WooCommerce gives you full control and no per-transaction platform fee, at the cost of owning maintenance and security. Shopify is the opposite trade. We pick based on whether you have anyone to own updates.' },
    ],
    proof: [],
  },

  'android-app-development': {
    name: 'Android App Development',
    noun: 'Android app development',
    deliverables: [
      'Native Android apps in Kotlin',
      'Material Design interface implementation',
      'Play Store submission and staged rollout',
      'Background services, notifications and deep links',
      'Support across the Android version and device spread',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Android Studio', 'Firebase', 'Play Console'],
    process: ['Scope and minimum SDK decision', 'UI implementation', 'Feature sprints', 'Device-matrix QA', 'Play Store staged rollout'],
    timeline: 'Typically 6–12 weeks',
    priceModel: 'Fixed-scope per milestone',
    intent: 'businesses whose users are overwhelmingly on Android',
    faqs: [
      { q: 'Which Android versions should we support?', a: 'We look at your own analytics rather than a general rule. In India the device spread runs older and cheaper than global averages, so the minimum SDK decision has a real revenue impact and deserves data.' },
      { q: 'How does the Play Store staged rollout work?', a: 'We release to a small percentage first and watch crash-free rate before widening. It means a bad build affects a fraction of users rather than all of them.' },
    ],
    proof: [],
  },

  'ios-app-development': {
    name: 'iOS App Development',
    noun: 'iOS app development',
    deliverables: [
      'Native iOS apps in Swift',
      'Human Interface Guidelines-compliant interface',
      'App Store submission and review-response handling',
      'Push notifications, widgets and deep links',
      'iPad and multiple screen-size support',
    ],
    stack: ['Swift', 'SwiftUI', 'Xcode', 'TestFlight', 'App Store Connect'],
    process: ['Scope and minimum iOS version', 'UI implementation', 'Feature sprints', 'TestFlight beta', 'App Store submission'],
    timeline: 'Typically 6–12 weeks',
    priceModel: 'Fixed-scope per milestone',
    intent: 'products whose paying users skew to iOS',
    faqs: [
      { q: 'How long does App Store review take?', a: 'Usually a few days, but rejections add cycles. We pre-empt the common ones — privacy labels, account deletion, sign-in requirements — because those cause most first-submission rejections.' },
      { q: 'Do we need an Apple Developer account?', a: 'Yes, and it should be yours, not ours. We will guide the setup, but the app must live under your organisation so you are never locked out of your own listing.' },
    ],
    proof: [],
  },

  'flutter-development': {
    name: 'Flutter App Development',
    noun: 'Flutter development',
    deliverables: [
      'Cross-platform apps from one Dart codebase',
      'Consistent custom UI across iOS and Android',
      'Native platform channels where a plugin does not exist',
      'Both store submissions from one build pipeline',
      'Web or desktop targets from the same codebase where useful',
    ],
    stack: ['Flutter', 'Dart', 'Riverpod / Bloc', 'Firebase', 'Melos'],
    process: ['Scope and state-management choice', 'Shared UI build', 'Platform-specific integration', 'Device QA on both platforms', 'Dual store release'],
    timeline: 'Typically 6–12 weeks',
    priceModel: 'Fixed-scope per milestone',
    intent: 'teams wanting one codebase with a heavily branded custom interface',
    faqs: [
      { q: 'Flutter or React Native?', a: 'Flutter renders its own widgets, so a custom design looks identical on both platforms and animation is smoother — at the cost of a larger binary and a Dart team. React Native uses native components and shares a language with your web stack. We pick on your design ambition and your existing team.' },
      { q: 'Does Flutter feel native?', a: 'For most business apps, yes. It draws its own UI rather than wrapping native controls, which is a strength for branded interfaces and a weakness if you specifically want stock platform look and feel.' },
    ],
    proof: [],
  },

  'react-native-development': {
    name: 'React Native Development',
    noun: 'React Native development',
    deliverables: [
      'Cross-platform apps sharing code with your React web app',
      'Native modules where a JavaScript bridge is not enough',
      'Over-the-air updates without a store release',
      'Both store submissions from one codebase',
      'Migration from an aging hybrid app',
    ],
    stack: ['React Native', 'TypeScript', 'Expo', 'React Navigation', 'Firebase'],
    process: ['Scope and Expo-versus-bare decision', 'Shared component build', 'Native module work', 'Device QA', 'Dual store release'],
    timeline: 'Typically 6–12 weeks',
    priceModel: 'Fixed-scope per milestone',
    intent: 'teams already on React who want an app without a second engineering discipline',
    faqs: [
      { q: 'Can we share code with our website?', a: 'Business logic, API clients, validation and types — yes, and that is the main reason to choose React Native. UI components largely cannot be shared, so do not budget on the assumption that they will be.' },
      { q: 'What are over-the-air updates?', a: 'JavaScript-layer fixes can ship directly to users without a store review cycle. Native changes still need a store release, so it is not a universal bypass — but it turns most bug fixes from a three-day wait into minutes.' },
    ],
    proof: [],
  },

  'enterprise-seo': {
    name: 'Enterprise SEO',
    noun: 'enterprise SEO',
    deliverables: [
      'Crawl and log-file analysis at scale',
      'Site architecture and template-level optimisation',
      'Index-bloat control and crawl-budget management',
      'Programmatic page quality governance',
      'Cross-team SEO process and release checks',
      'Executive reporting on revenue, not rankings',
    ],
    stack: ['Screaming Frog', 'Log-file analysis', 'Search Console API', 'BigQuery', 'Looker Studio'],
    process: ['Crawl and log audit', 'Fix at template level, not page level', 'Governance and release checks', 'Programmatic quality control', 'Report'],
    timeline: 'Meaningful movement typically 4–8 months at enterprise scale',
    priceModel: 'Monthly retainer scoped to site size and stakeholder count',
    intent: 'sites with tens of thousands of URLs where page-by-page work is impossible',
    faqs: [
      { q: 'How is this different from regular SEO?', a: 'The unit of work changes. At this size you do not optimise pages, you optimise templates and the rules that generate them — and most of the win is in stopping the site generating pages Google will refuse to index.' },
      { q: 'Why log-file analysis?', a: 'Search Console tells you what got indexed. Logs tell you what Googlebot actually crawled and how much budget it wasted on parameters, filters and dead sections. On large sites that gap is where the problem hides.' },
    ],
    proof: [],
  },

  'ecommerce-seo': {
    name: 'E-commerce SEO',
    noun: 'e-commerce SEO',
    deliverables: [
      'Product and category page optimisation at catalogue scale',
      'Faceted navigation and parameter handling',
      'Duplicate and thin product page consolidation',
      'Product schema and merchant feed alignment',
      'Out-of-stock and discontinued product strategy',
      'Category content that ranks without blocking the grid',
    ],
    stack: ['Screaming Frog', 'Search Console', 'Merchant Center', 'Shopify / WooCommerce'],
    process: ['Catalogue crawl and duplication audit', 'Fix faceted navigation', 'Category and product templates', 'Schema and feed alignment', 'Report on revenue per session'],
    timeline: 'Technical wins in weeks, ranking gains over 3–6 months',
    priceModel: 'Monthly retainer scoped to catalogue size',
    intent: 'stores where thousands of product URLs are competing with each other',
    faqs: [
      { q: 'Why are our product pages not indexed?', a: 'Usually near-duplicate descriptions across variants plus faceted-navigation URLs consuming the crawl budget. Google finds thousands of nearly-identical pages and indexes a fraction. Consolidating variants and controlling facets normally fixes more than adding content does.' },
      { q: 'What should happen to out-of-stock products?', a: 'Keep the URL live with stock status in schema if the product returns; 301 to the closest match if it is gone for good. Deleting to a 404 throws away the rankings and links that page earned.' },
    ],
    proof: [],
  },

  'local-seo': {
    name: 'Local SEO',
    noun: 'local SEO',
    deliverables: [
      'Google Business Profile setup and ongoing optimisation',
      'NAP consistency across directories and citations',
      'Review generation strategy and response management',
      'Local landing pages with genuinely local content',
      'Local pack and map ranking tracking',
      'Multi-location management where you have several branches',
    ],
    stack: ['Google Business Profile', 'Search Console', 'Local citation directories', 'Review platforms'],
    process: ['Profile and citation audit', 'Fix NAP inconsistencies', 'Optimise profiles and posts', 'Build review velocity', 'Track local pack position'],
    timeline: 'Local pack movement often within 4–10 weeks',
    priceModel: 'Monthly retainer, priced per location',
    intent: 'businesses whose customers search with local intent or on maps',
    faqs: [
      { q: 'What matters most for the local pack?', a: 'Proximity you cannot change, and relevance plus prominence you can. In practice that means a complete and active Google Business Profile, consistent NAP, and a steady flow of genuine reviews — that ordering holds more reliably than most on-page tweaks.' },
      { q: 'Do we need a page per location?', a: 'Only for locations you genuinely operate in, and only if each page carries real local information. Generating a page per city you would like customers in is the doorway pattern, and it gets sites demoted rather than ranked.' },
    ],
    proof: [],
  },

  'ai-consulting': {
    name: 'AI Consulting',
    noun: 'AI consulting',
    deliverables: [
      'AI opportunity assessment across your operations',
      'Build-versus-buy analysis per use case',
      'Model and vendor selection with cost modelling',
      'Data readiness and privacy review',
      'Prioritised roadmap with expected effort and return',
      'Team enablement and training',
    ],
    stack: [],
    process: ['Interview teams and shadow processes', 'Assess data readiness', 'Score use cases on value and feasibility', 'Recommend build, buy or skip', 'Roadmap and enablement'],
    timeline: 'Typically 2–5 weeks for an assessment',
    priceModel: 'Fixed-fee assessment; implementation quoted separately if you want it',
    intent: 'leadership teams under pressure to "do something with AI" without a clear plan',
    faqs: [
      { q: 'How is this different from AI development?', a: 'Consulting decides what is worth building and whether you should build it at all. Development builds it. We deliberately keep them separate so the assessment can honestly recommend an off-the-shelf tool, or nothing, without us losing the engagement.' },
      { q: 'Will you tell us not to use AI?', a: 'Frequently. A large share of "AI projects" are better solved by fixing a process or writing a rule, and that recommendation is worth more than a build we both regret.' },
    ],
    proof: [],
  },

  'crm-consulting': {
    name: 'CRM Consulting',
    noun: 'CRM consulting',
    deliverables: [
      'Sales process mapping and pipeline design',
      'CRM platform selection or build-versus-buy analysis',
      'Data hygiene, deduplication and migration planning',
      'Adoption strategy and sales team training',
      'Reporting and forecasting setup',
    ],
    stack: [],
    process: ['Shadow the sales process', 'Map the current stack and its gaps', 'Recommend platform and configuration', 'Plan migration and adoption', 'Train and review'],
    timeline: 'Typically 2–6 weeks',
    priceModel: 'Fixed-fee engagement; build quoted separately',
    intent: 'teams whose CRM is either unused or the wrong shape for how they sell',
    faqs: [
      { q: 'Our team will not use the CRM. Can you fix that?', a: 'Usually, because it is rarely a discipline problem. It is normally that the CRM asks for fields the rep gains nothing from filling in. We cut required fields to what the rep actually benefits from and automate the rest.' },
      { q: 'Should we switch CRM or fix the one we have?', a: 'Fix it, more often than teams expect. Migration costs data quality and adoption, so it needs to be justified by a genuine platform limitation rather than frustration with a bad configuration.' },
    ],
    proof: [],
  },

  'instagram-marketing': {
    name: 'Instagram Marketing',
    noun: 'Instagram marketing',
    deliverables: [
      'Instagram-specific content strategy',
      'Reels production and editing',
      'Grid, Stories and Highlights planning',
      'Creator and influencer collaboration management',
      'Instagram Shopping and product tagging setup',
      'DM automation and lead handling',
    ],
    stack: ['Instagram', 'Reels', 'Meta Business Suite', 'Instagram Shopping'],
    process: ['Account and competitor audit', 'Content pillars and Reels cadence', 'Produce and publish', 'Community and DM management', 'Report on reach and leads'],
    timeline: 'Ongoing monthly',
    priceModel: 'Monthly retainer by content volume',
    intent: 'consumer brands where Instagram is the primary discovery channel',
    faqs: [
      { q: 'Do Reels still drive the most reach?', a: 'Short-form video remains the format Instagram pushes hardest to non-followers, so it is where new reach comes from. Carousels tend to do more for depth with people who already follow you — you need both, for different jobs.' },
      { q: 'Do we need influencers?', a: 'It depends on your category. For consumer products, creator collaboration usually outperforms brand-account posting on cost per reach. For B2B it rarely justifies the spend.' },
    ],
    proof: [],
  },

  // ---- YMYL: keep disclaimers, verifiable identity, no promises ----
  'financial-consulting': {
    name: 'Financial Consulting',
    noun: 'financial consulting',
    deliverables: ['Financial planning and analysis', 'Cash-flow forecasting and budgeting', 'Management reporting and dashboards', 'Compliance and process guidance'],
    stack: [],
    process: ['Discovery', 'Assessment', 'Plan', 'Implementation support', 'Review'],
    timeline: 'Engagement-based',
    priceModel: 'Consulting engagement, scoped after a discovery call',
    intent: 'growing businesses needing clearer financial visibility',
    faqs: [
      { q: 'Is this regulated investment advice?', a: 'No. This is general business financial consulting — planning, budgeting, cash-flow and reporting. It is not investment advice and should not be treated as such. For regulated advice, consult a licensed adviser.' },
    ],
    proof: [],
    ymyl: true,
  },

  'business-consultation': {
    name: 'Business Consultation',
    noun: 'business consulting',
    deliverables: ['Business and growth strategy', 'Operations and process review', 'Go-to-market planning', 'Technology roadmap'],
    stack: [],
    process: ['Discovery', 'Diagnosis', 'Recommendations', 'Implementation support'],
    timeline: 'Engagement-based',
    priceModel: 'Consulting engagement',
    intent: 'founders and leadership teams at an inflection point',
    faqs: [
      { q: 'What does a business consultation actually cover?', a: 'A structured review of strategy, operations, growth and technology, ending in prioritised recommendations you can act on — scoped to your stage rather than a generic framework.' },
    ],
    proof: [],
  },

  'business-loans': {
    name: 'Business Loans',
    noun: 'business loan advisory',
    deliverables: ['Loan requirement assessment', 'Documentation preparation guidance', 'Lender matching support', 'Application support'],
    stack: [],
    process: ['Assess requirement', 'Prepare documentation', 'Match to appropriate lenders', 'Support the application'],
    timeline: 'Case by case',
    priceModel: 'Per engagement',
    intent: 'businesses seeking finance and unsure how to present their case',
    faqs: [
      { q: 'Do you lend money directly?', a: 'No. We provide advisory and facilitation support to help you prepare documentation and approach appropriate lenders. All lending decisions, interest rates, eligibility and approvals rest entirely with the lender.' },
      { q: 'Can you guarantee approval?', a: 'No, and you should be cautious of anyone who does. Approval depends on the lender’s own credit assessment of your business.' },
    ],
    proof: [],
    ymyl: true,
  },

  'business-insurance': {
    name: 'Business Insurance',
    noun: 'business insurance guidance',
    deliverables: ['Insurance needs and risk assessment', 'Policy comparison guidance', 'Documentation support'],
    stack: [],
    process: ['Assess risk exposure', 'Compare available options', 'Support the purchase process'],
    timeline: 'Case by case',
    priceModel: 'Per engagement',
    intent: 'businesses unsure what cover they actually need',
    faqs: [
      { q: 'What insurance does my business need?', a: 'It depends on your sector, size, assets and liability exposure. We help assess the need and compare options. Policy terms, coverage limits, exclusions and pricing are set by the insurer, and the policy document governs.' },
    ],
    proof: [],
    ymyl: true,
  },
};

// ---------------------------------------------------------------------------
// LLM_MODELS — real, checkable differences between the model families we build
// on. These power the four previously near-identical model pages.
// ---------------------------------------------------------------------------
const LLM_MODELS = {
  claude: {
    label: 'Anthropic Claude',
    vendor: 'Anthropic',
    strengths: [
      'Long-document reasoning across very large context windows',
      'Careful instruction-following when the output must match a strict schema',
      'Tool use and agentic workflows through the Model Context Protocol',
      'Conservative refusal behaviour, which matters for regulated content',
    ],
    typicalFit: 'Document-heavy analysis, agentic workflows, and anywhere a confidently wrong answer is expensive.',
    integration: 'The Anthropic Messages API with streaming, tool use, prompt caching, and MCP servers for your own systems.',
    deliverables: [
      'Claude-powered features built on the Messages API',
      'Long-context document analysis over contracts, policies and reports',
      'Tool-use workflows where Claude calls your internal APIs',
      'Prompt caching to cut cost on repeated long contexts',
      'MCP server connecting Claude to your databases and tools',
    ],
    stack: ['Anthropic Messages API', 'Claude tool use', 'Model Context Protocol', 'Prompt caching', 'Streaming responses'],
    process: [
      'Benchmark Claude against the alternatives on your actual task',
      'Design the prompt and output schema',
      'Wire tool use and MCP connections',
      'Build an evaluation set from real historical cases',
      'Deploy with logging and cost monitoring',
    ],
    timeline: 'Typically 3–8 weeks for a production Claude feature',
  },
  openai: {
    label: 'OpenAI GPT',
    vendor: 'OpenAI',
    strengths: [
      'The broadest ecosystem of libraries, examples and third-party tooling',
      'Mature function calling and guaranteed structured output modes',
      'Strong multimodal handling of image and audio input',
      'Realtime voice APIs for low-latency speech applications',
    ],
    typicalFit: 'General-purpose product features, voice interfaces, and teams that want the widest integration support.',
    integration: 'The OpenAI API with function calling, structured outputs, embeddings, Whisper and the realtime voice endpoints.',
    deliverables: [
      'GPT-powered product features with function calling',
      'Structured-output pipelines with guaranteed JSON schemas',
      'Embedding and vector search over your content',
      'Realtime voice interfaces using the low-latency audio API',
      'Whisper-based transcription and audio workflows',
    ],
    stack: ['OpenAI API', 'Function calling', 'Structured outputs', 'Embeddings API', 'Whisper', 'Realtime voice API'],
    process: [
      'Benchmark GPT against the alternatives on your actual task',
      'Define function schemas and structured output contracts',
      'Build embeddings and retrieval where grounding is needed',
      'Evaluate on a held-out set',
      'Deploy with rate-limit and cost controls',
    ],
    timeline: 'Typically 3–8 weeks for a production GPT feature',
  },
  gemini: {
    label: 'Google Gemini',
    vendor: 'Google',
    strengths: [
      'Very large context windows suited to bulk document processing',
      'Native video and audio understanding, not just text and images',
      'Direct integration with Google Cloud and Workspace data',
      'Competitive cost per token at high volume',
    ],
    typicalFit: 'Workloads already on Google Cloud, video and audio analysis, and high-volume batch jobs where cost per token dominates.',
    integration: 'The Gemini API or Vertex AI, with grounding against your existing Google Cloud data sources.',
    deliverables: [
      'Gemini features via the Gemini API or Vertex AI',
      'Video and audio analysis pipelines',
      'Bulk document processing using long context windows',
      'Grounding against BigQuery, Cloud Storage and Workspace data',
      'Cost-optimised batch inference for high-volume jobs',
    ],
    stack: ['Gemini API', 'Vertex AI', 'BigQuery', 'Google Cloud Storage', 'Batch inference'],
    process: [
      'Benchmark Gemini against the alternatives on your actual task',
      'Set up Vertex AI and IAM permissions',
      'Ground the model against your Google Cloud data',
      'Evaluate accuracy and cost at production volume',
      'Deploy with Cloud monitoring',
    ],
    timeline: 'Typically 3–8 weeks, shorter if you are already on Google Cloud',
  },
  mcp: {
    label: 'Model Context Protocol (MCP)',
    vendor: 'an open standard originated by Anthropic',
    strengths: [
      'One open standard for connecting AI models to your tools and data',
      'Write an integration once and reuse it across compatible AI clients',
      'Permission boundaries enforced server-side, not by prompt instructions',
      'No rebuilding bespoke connectors each time you change model vendor',
    ],
    typicalFit: 'Organisations connecting several internal systems to AI that want to avoid writing vendor-specific glue code for each one.',
    integration: 'Custom MCP servers exposing your databases, APIs and internal tools to AI clients under scoped permissions.',
    deliverables: [
      'Custom MCP servers wrapping your internal systems',
      'Scoped, auditable permissions per tool',
      'Connectors for databases, ticketing, CRM and file storage',
      'Deployment and authentication for MCP endpoints',
      'Documentation so your team can extend the server',
    ],
    stack: ['Model Context Protocol', 'TypeScript / Python MCP SDKs', 'OAuth and scoped tokens', 'Your internal APIs'],
    process: [
      'Inventory the systems the AI needs to reach',
      'Design the tool surface and permission scopes',
      'Build and test the MCP server against a sandbox',
      'Connect AI clients and verify the audit trail',
      'Deploy, monitor and document',
    ],
    timeline: 'Typically 2–6 weeks per system connected',
  },
};

// ---------------------------------------------------------------------------
// SERVICE_ALIASES — URL slug (location suffix already stripped) → service id
// ---------------------------------------------------------------------------
const SERVICE_ALIASES = {
  'web-development-company': 'web-development',
  'website-development-company': 'web-development',
  'custom-web-development-company': 'web-development',
  'frontend-development-company': 'frontend-development',
  'backend-development-company': 'backend-development',
  'full-stack-development-company': 'full-stack-development',
  'web-design-company': 'web-design',
  'mobile-app-development-company': 'mobile-app-development',
  'android-app-development-company': 'android-app-development',
  'ios-app-development-company': 'ios-app-development',
  'flutter-app-development-company': 'flutter-development',
  'react-native-development-company': 'react-native-development',
  'ecommerce-development-company': 'ecommerce-development',
  'ecommerce-website-development-company': 'ecommerce-development',
  'custom-ecommerce-development': 'ecommerce-development',
  'shopify-development-company': 'shopify-development',
  'woocommerce-development-company': 'woocommerce-development',
  'seo-company': 'seo',
  'seo-services': 'seo',
  'enterprise-seo-services': 'enterprise-seo',
  'ecommerce-seo-services': 'ecommerce-seo',
  'local-seo-services': 'local-seo',
  'digital-marketing-company': 'digital-marketing',
  'digital-marketing-agency': 'digital-marketing',
  'performance-marketing-agency': 'digital-marketing',
  'google-ads-agency': 'google-ads',
  'meta-ads-agency': 'meta-ads',
  'facebook-ads-agency': 'meta-ads',
  'instagram-marketing-agency': 'instagram-marketing',
  'social-media-marketing-company': 'social-media-marketing',
  'social-media-marketing-agency': 'social-media-marketing',
  'ai-development-company': 'ai-development',
  'custom-ai-development': 'ai-development',
  'ai-solutions-company': 'ai-development',
  'ai-consulting-company': 'ai-consulting',
  'llm-development-company': 'ai-development',
  'openai-development-company': 'ai-development',
  'claude-ai-development': 'ai-development',
  'gemini-ai-development': 'ai-development',
  'mcp-development-company': 'agentic-ai',
  'ai-chatbot-development': 'ai-chatbot',
  'ai-callers': 'ai-callers',
  'ai-voice-agents': 'ai-callers',
  'ai-calling-agency': 'ai-callers',
  'ai-content-services': 'ai-content',
  'ai-content-agency': 'ai-content',
  'ai-video-services': 'ai-video',
  'ai-videos-for-businesses': 'ai-video',
  'agentic-ai-development-company': 'agentic-ai',
  'agentic-ai-for-business-automation': 'agentic-ai',
  'agentic-ai-for-customer-support': 'agentic-ai',
  'ai-automation-company': 'ai-automation',
  'business-process-automation': 'ai-automation',
  'workflow-automation-software-development': 'ai-automation',
  'crm-development-company': 'crm-development',
  'custom-crm-development': 'crm-development',
  'crm-software-development': 'crm-development',
  'crm-consulting-company': 'crm-consulting',
  'erp-development-company': 'erp-development',
  'custom-erp-development': 'erp-development',
  'erp-software-development-company': 'erp-development',
  'custom-software-development-company': 'custom-software-development',
  'business-management-software-development': 'custom-software-development',
  'podcast-production': 'podcast-production',
  'financial-consulting': 'financial-consulting',
  'business-consultation': 'business-consultation',
  'business-loans': 'business-loans',
  'business-insurance': 'business-insurance',
};

// ---------------------------------------------------------------------------
// CANONICAL_MAP — keyword cannibalisation fix.
//
// These URLs are genuine synonyms of another page, not distinct services. They
// were competing with their own primary for the same query and splitting the
// link equity between them. Pointing the canonical at the primary consolidates
// both signals onto one URL. The pages stay live and reachable.
//
// Genuinely distinct sub-services (frontend, backend, Shopify, WooCommerce,
// Android, iOS, Flutter, React Native, enterprise/ecommerce/local SEO, AI
// consulting, CRM consulting, Instagram) are NOT here — they have their own
// real content instead.
//
// To stop consolidating a page: delete its line. To add one: point it at the
// primary that should win the query.
// ---------------------------------------------------------------------------
const CANONICAL_MAP = {
  'website-development-company': 'web-development-company',
  'custom-web-development-company': 'web-development-company',
  'custom-ecommerce-development': 'ecommerce-development-company',
  'ecommerce-website-development-company': 'ecommerce-development-company',
  'custom-crm-development': 'crm-development-company',
  'crm-software-development': 'crm-development-company',
  'custom-erp-development': 'erp-development-company',
  'erp-software-development-company': 'erp-development-company',
  'custom-ai-development': 'ai-development-company',
  'ai-solutions-company': 'ai-development-company',
  'hr-software-development-company': 'hrms-development-company',
  'business-management-software-development': 'custom-software-development-company',
  'performance-marketing-agency': 'digital-marketing-company',
  'facebook-ads-agency': 'meta-ads-agency',
  'business-process-automation': 'ai-automation-company',
  'workflow-automation-software-development': 'ai-automation-company',
  'seo-services': 'seo-company',
  'digital-marketing-agency': 'digital-marketing-company',
  // Two slugs existed for the same service in the same city, competing directly.
  'digital-marketing-agency-mumbai': 'digital-marketing-company-mumbai',
  'digital-marketing-agency-delhi': 'digital-marketing-company-delhi',
};

/** The URL that should own the query for this path (itself, unless consolidated). */
function canonicalSlugFor(pathname) {
  const slug = normalisePath(pathname);
  return CANONICAL_MAP[slug] || slug;
}

// Slug → model key, for the four model-specific pages.
const MODEL_ALIASES = {
  'claude-ai-development': 'claude',
  'openai-development-company': 'openai',
  'gemini-ai-development': 'gemini',
  'mcp-development-company': 'mcp',
};

// ---------------------------------------------------------------------------
// Confirmed, staffed office cities — MUST match `confirmed: true` in offices.js.
// Duplicated here because this data slice stays import-free so the serverless
// function can consume it. Generate-sitemap.cjs asserts the two agree and fails
// the build if they drift, so this cannot silently go stale.
//
// Only add a city here once the client confirms a real, staffed premises.
// Claiming a location you do not occupy is how Google Business Profiles get
// suspended.
// ---------------------------------------------------------------------------
const CONFIRMED_OFFICE_CITIES = 'Gurugram, Rohtak and Mumbai';

// ---------------------------------------------------------------------------
// LOCATIONS — only places we genuinely serve. `office: true` means a real
// Avani office. Districts and industry clusters are verifiable public facts
// about the local economy, which is what makes each page genuinely different.
// ---------------------------------------------------------------------------
const LOCATIONS = {
  gurgaon: {
    city: 'Gurugram', alt: 'Gurgaon', region: 'Haryana', country: 'India', office: true,
    address: COMPANY.hq,
    districts: ['Cyber City (DLF Phase II/III)', 'Udyog Vihar', 'Golf Course Road', 'Sohna Road', 'Sector 39 and the Unitech Cyber Park belt'],
    sectors: ['finance', 'auto', 'saas', 'ecommerce', 'realestate'],
    industries: ['BFSI and shared-services back offices', 'automotive and auto components', 'IT and ITES', 'D2C and consumer brands', 'commercial real estate'],
    note: 'Our head office is here, so Gurugram clients get on-site workshops and in-person reviews.',
  },
  gurugram: { aliasOf: 'gurgaon' },
  delhi: {
    city: 'Delhi', region: 'Delhi NCR', country: 'India', office: false,
    districts: ['Connaught Place', 'Nehru Place', 'Okhla Industrial Area', 'Aerocity', 'Saket and South Delhi'],
    sectors: ['trading', 'education', 'healthcare', 'hospitality', 'ecommerce'],
    industries: ['wholesale and distribution trade', 'education and coaching', 'healthcare and diagnostics', 'professional services', 'hospitality'],
    note: 'Delhi sits under an hour from our Gurugram head office, so in-person meetings are routine.',
  },
  noida: {
    city: 'Noida', region: 'Uttar Pradesh, Delhi NCR', country: 'India', office: false,
    districts: ['Sector 62 and 63 IT belt', 'Sector 16A Film City', 'Sector 125–132 expressway corridor', 'Sector 18 commercial hub'],
    sectors: ['saas', 'media', 'education', 'manufacturing', 'ecommerce'],
    industries: ['IT and ITES', 'BPO and shared services', 'media, broadcast and film production', 'electronics manufacturing', 'edtech'],
    note: 'Delivered from our Gurugram head office, about an hour away, so on-site sessions are practical when a project needs them.',
  },
  'greater-noida': {
    city: 'Greater Noida', region: 'Uttar Pradesh, Delhi NCR', country: 'India', office: false,
    districts: ['Knowledge Park I–V', 'Techzone IV', 'Surajpur industrial area', 'Pari Chowk'],
    sectors: ['manufacturing', 'education', 'logistics', 'realestate'],
    industries: ['manufacturing and industrial units', 'higher education institutions', 'logistics and warehousing', 'residential real estate'],
    note: 'Covered from our Gurugram head office.',
  },
  faridabad: {
    city: 'Faridabad', region: 'Haryana, Delhi NCR', country: 'India', office: false,
    districts: ['Sector 24–25 industrial belt', 'NIT Faridabad', 'Neharpar / Greater Faridabad', 'Ballabgarh'],
    sectors: ['auto', 'manufacturing', 'trading'],
    industries: ['auto components and engineering', 'MSME manufacturing', 'tractor and machinery suppliers', 'local retail and services'],
    note: 'Covered from our Gurugram head office.',
  },
  ghaziabad: {
    city: 'Ghaziabad', region: 'Uttar Pradesh, Delhi NCR', country: 'India', office: false,
    districts: ['Sahibabad industrial area', 'Indirapuram', 'Raj Nagar Extension', 'Vasundhara'],
    sectors: ['manufacturing', 'logistics', 'realestate', 'ecommerce'],
    industries: ['light manufacturing', 'logistics and transport', 'building materials and real estate', 'local retail chains'],
    note: 'Covered from our Gurugram head office.',
  },
  rohtak: {
    city: 'Rohtak', region: 'Haryana', country: 'India', office: true,
    districts: ['IMT Rohtak', 'Delhi Road commercial belt', 'Model Town', 'Sector 14 institutional area'],
    sectors: ['education', 'healthcare', 'manufacturing', 'auto'],
    industries: ['education and coaching institutions', 'healthcare and hospitals', 'MSME manufacturing at IMT', 'regional retail and automotive dealerships'],
    note: 'We have an office in Rohtak, which is unusual for a digital agency and means local institutes, hospitals, IMT manufacturers and retailers get face-to-face project reviews.',
  },
  haryana: {
    city: 'Haryana', region: 'Haryana', country: 'India', office: true, isRegion: true,
    districts: ['Gurugram', 'Faridabad', 'Manesar', 'Rohtak', 'Panipat', 'Hisar'],
    sectors: ['auto', 'manufacturing', 'textiles', 'saas'],
    industries: ['automotive and auto components', 'textiles at Panipat', 'agri-processing', 'MSME manufacturing across the IMT belt', 'IT and ITES in Gurugram'],
    note: 'Both our offices — Gurugram and Rohtak — are in Haryana, so the state industrial belt is on our doorstep.',
  },
  mumbai: {
    // Promoted from sell-only on 26 July 2026: client confirmed the Andheri
    // East operations centre in writing. See src/data/offices.js for the NAP.
    city: 'Mumbai', region: 'Maharashtra', country: 'India', office: true,
    districts: ['Andheri East (MIDC and SEEPZ)', 'Bandra Kurla Complex (BKC)', 'Lower Parel', 'Powai', 'Nariman Point'],
    sectors: ['finance', 'media', 'ecommerce', 'pharma', 'logistics'],
    industries: ['banking, financial services and insurance', 'media, film and advertising', 'D2C and retail brands', 'pharmaceuticals', 'logistics and shipping'],
    note: 'Our operations centre is on Teli Galli Cross Road in Andheri East, minutes from MIDC and SEEPZ and a short run to BKC, so reviews happen in person.',
  },
  bangalore: {
    city: 'Bengaluru', alt: 'Bangalore', region: 'Karnataka', country: 'India', office: false,
    districts: ['Whitefield', 'Electronic City', 'Koramangala', 'Indiranagar', 'Outer Ring Road tech corridor'],
    sectors: ['saas', 'ecommerce', 'pharma', 'manufacturing'],
    industries: ['SaaS and technology startups', 'IT services', 'biotech and life sciences', 'D2C brands', 'aerospace and defence suppliers'],
    note: 'Delivered remotely, with meetings on IST — no time-zone friction.',
  },
  pune: {
    city: 'Pune', region: 'Maharashtra', country: 'India', office: false,
    districts: ['Hinjewadi IT Park', 'Kharadi and EON IT Park', 'Baner–Balewadi', 'Viman Nagar'],
    sectors: ['auto', 'saas', 'manufacturing', 'education'],
    industries: ['automotive and engineering', 'IT services', 'manufacturing and industrial equipment', 'education institutions'],
    note: 'Delivered remotely, with meetings on IST.',
  },
  hyderabad: {
    city: 'Hyderabad', region: 'Telangana', country: 'India', office: false,
    districts: ['HITEC City', 'Gachibowli', 'Madhapur', 'Banjara Hills'],
    sectors: ['pharma', 'saas', 'realestate', 'healthcare'],
    industries: ['pharmaceuticals and life sciences', 'IT and global capability centres', 'SaaS', 'real estate'],
    note: 'Delivered remotely, with meetings on IST.',
  },
  chennai: {
    city: 'Chennai', region: 'Tamil Nadu', country: 'India', office: false,
    districts: ['Old Mahabalipuram Road (OMR) IT corridor', 'Guindy', 'Ambattur industrial estate', 'T Nagar'],
    sectors: ['auto', 'manufacturing', 'saas', 'healthcare'],
    industries: ['automotive manufacturing', 'engineering and industrial suppliers', 'SaaS and IT services', 'healthcare'],
    note: 'Delivered remotely, with meetings on IST.',
  },
  kolkata: {
    city: 'Kolkata', region: 'West Bengal', country: 'India', office: false,
    districts: ['Salt Lake Sector V', 'New Town (Rajarhat)', 'Park Street and Camac Street', 'Howrah industrial belt'],
    sectors: ['saas', 'manufacturing', 'trading', 'logistics', 'education'],
    industries: ['IT services at Sector V', 'manufacturing and engineering', 'tea and commodity trading', 'logistics and river ports', 'education'],
    note: 'Delivered remotely, with meetings on IST.',
  },
  ahmedabad: {
    city: 'Ahmedabad', region: 'Gujarat', country: 'India', office: false,
    districts: ['SG Highway corridor', 'Prahlad Nagar', 'Changodar and Narol industrial belts', 'GIFT City, Gandhinagar'],
    sectors: ['textiles', 'pharma', 'ecommerce', 'finance', 'manufacturing'],
    industries: ['textiles and apparel', 'chemicals and dyes', 'pharmaceuticals', 'D2C and retail', 'fintech at GIFT City'],
    note: 'Delivered remotely, with meetings on IST.',
  },
  jaipur: {
    city: 'Jaipur', region: 'Rajasthan', country: 'India', office: false,
    districts: ['Mansarovar', 'Malviya Nagar', 'Sitapura industrial area', 'Vaishali Nagar'],
    sectors: ['jewellery', 'textiles', 'hospitality', 'education'],
    industries: ['gems and jewellery', 'handicrafts and export houses', 'tourism and hospitality', 'education and coaching'],
    note: 'Delivered remotely, with meetings on IST.',
  },
  // ── Haryana home belt + Chandigarh tricity ────────────────────────────────
  // Restored to the index and given real local economic detail so each page can
  // reach depth on facts rather than on a template. Every cluster named below is
  // a documented feature of that town's economy.
  chandigarh: {
    city: 'Chandigarh', region: 'Chandigarh', country: 'India', office: false,
    districts: ['Sector 17 commercial core', 'Rajiv Gandhi Chandigarh Technology Park', 'Industrial Area Phase I and II', 'the Mohali and Panchkula tricity'],
    industries: ['IT and ITES at the Technology Park', 'higher education and coaching', 'healthcare and diagnostics', 'hospitality and tourism', 'government and institutional services'],
    sectors: ['saas', 'education', 'healthcare', 'hospitality'],
    note: 'Delivered from our Gurugram head office, about four hours up NH-44, with on-site sessions for larger engagements.',
  },
  panipat: {
    city: 'Panipat', region: 'Haryana', country: 'India', office: false,
    districts: ['the handloom and home-furnishings cluster', 'Panipat Refinery belt', 'Sector 25 industrial area', 'the NH-44 corridor'],
    industries: ['textiles and home furnishings', 'export houses shipping to Europe and the US', 'petrochemicals and refining', 'agri-trade'],
    sectors: ['textiles', 'manufacturing', 'trading', 'ecommerce'],
    note: 'Covered from our Gurugram and Rohtak offices, both within a short drive up the highway.',
  },
  sonipat: {
    city: 'Sonipat', region: 'Haryana', country: 'India', office: false,
    districts: ['Kundli and Rai industrial estates', 'Rajiv Gandhi Education City', 'the Murthal food belt on NH-44', 'Sector 14 and Model Town'],
    industries: ['light manufacturing and sports goods', 'food processing', 'higher education institutions', 'logistics along NH-44'],
    sectors: ['manufacturing', 'education', 'logistics', 'hospitality'],
    note: 'Covered from our Rohtak and Gurugram offices, both under an hour away.',
  },
  karnal: {
    city: 'Karnal', region: 'Haryana', country: 'India', office: false,
    districts: ['the agri-research institutional belt', 'Sector 12 commercial area', 'the basmati and rice-milling cluster', 'the NH-44 corridor'],
    industries: ['agri-processing and dairy', 'basmati rice milling and export', 'agricultural research institutions', 'healthcare and education'],
    sectors: ['manufacturing', 'trading', 'education', 'healthcare'],
    note: 'Covered from our Rohtak and Gurugram offices.',
  },
  hisar: {
    city: 'Hisar', region: 'Haryana', country: 'India', office: false,
    districts: ['IMT Hisar', 'the steel and galvanised pipe cluster', 'the agricultural university belt', 'Red Square and the commercial core'],
    industries: ['steel and galvanised pipe manufacturing', 'cotton and textiles', 'agri-research and allied services', 'education'],
    sectors: ['manufacturing', 'textiles', 'education', 'trading'],
    note: 'Covered from our Rohtak office, the closest of ours to west Haryana.',
  },
  ambala: {
    city: 'Ambala', region: 'Haryana', country: 'India', office: false,
    districts: ['Ambala Cantt', 'Ambala City cloth market', 'the scientific-instruments manufacturing cluster', 'the NH-44 corridor'],
    industries: ['scientific and laboratory instruments manufacturing', 'sewing machine and mixer components', 'wholesale cloth trade', 'defence-adjacent services and education'],
    sectors: ['manufacturing', 'trading', 'education'],
    note: 'Covered from our Rohtak and Gurugram offices.',
  },

  india: {
    city: 'India', region: 'India', country: 'India', office: true, isRegion: true, isNational: true,
    districts: ['Gurugram', 'Delhi NCR', 'and remote delivery nationwide'],
    sectors: ['manufacturing', 'finance', 'healthcare', 'education', 'ecommerce', 'saas'],
    industries: ['manufacturing and MSME', 'BFSI', 'healthcare', 'education', 'D2C and retail', 'IT and SaaS'],
    note: 'Offices in Gurugram and Rohtak, with remote delivery nationwide on IST.',
  },
  dubai: {
    city: 'Dubai', region: 'Dubai', country: 'UAE', office: false, international: true,
    currency: 'AED', tzOffset: 'UTC+4', tzNote: 'Dubai runs 1.5 hours behind IST, so an Indian working day overlaps almost entirely with yours.',
    districts: ['Business Bay', 'DMCC and Jumeirah Lakes Towers', 'Dubai Internet City', 'Deira and Bur Dubai'],
    sectors: ['realestate', 'trading', 'hospitality', 'logistics'],
    industries: ['real estate and property brokerage', 'trading and re-export', 'hospitality and tourism', 'logistics and freight', 'free-zone SMEs'],
    note: 'Delivered from our India team. Dubai runs 1.5 hours behind IST, so the working day overlaps almost entirely.',
  },
  uae: {
    city: 'the UAE', region: 'United Arab Emirates', country: 'UAE', office: false, international: true, isRegion: true,
    currency: 'AED', tzOffset: 'UTC+4', tzNote: 'The UAE runs 1.5 hours behind IST, giving a near-complete working-day overlap with our India team.',
    districts: ['Dubai', 'Abu Dhabi', 'Sharjah', 'the major free zones'],
    sectors: ['realestate', 'trading', 'hospitality', 'logistics'],
    industries: ['real estate', 'trading and distribution', 'hospitality', 'logistics', 'professional services'],
    note: 'Delivered from our India team, with working hours arranged around the Gulf business day.',
  },
  singapore: {
    city: 'Singapore', region: 'Singapore', country: 'Singapore', office: false, international: true,
    currency: 'SGD', tzOffset: 'UTC+8', tzNote: 'Singapore runs 2.5 hours ahead of IST, so our team is online through your afternoon.',
    districts: ['Raffles Place and the CBD', 'one-north', 'Jurong', 'Tanjong Pagar'],
    sectors: ['finance', 'logistics', 'saas', 'trading'],
    industries: ['fintech and financial services', 'logistics and maritime trade', 'regional headquarters of multinationals', 'B2B technology'],
    note: 'Delivered from our India offices, with working hours arranged around the Singapore afternoon.',
  },
  usa: {
    city: 'the United States', region: 'United States', country: 'USA', office: false, international: true, isRegion: true,
    currency: 'USD', tzOffset: 'UTC-5 to UTC-8', tzNote: 'US Eastern time runs 10.5 hours behind IST and Pacific 13.5 hours behind, so we hold calls in your morning, which is our evening, and hand off work overnight.',
    districts: ['East Coast', 'Central', 'West Coast'],
    sectors: ['ecommerce', 'saas', 'healthcare', 'media'],
    industries: ['D2C and e-commerce', 'SaaS and technology', 'professional services', 'healthcare services', 'local service businesses'],
    note: 'Delivered from our India offices with overlapping evening hours; invoicing in USD.',
  },
};

// ---------------------------------------------------------------------------
// USE_CASES — what a given service actually does for a given sector.
//
// This is the dimension that makes two city pages for the same service
// genuinely different rather than the same page with a name swapped: Mumbai's
// sector mix (BFSI, media, pharma) and Jaipur's (jewellery, handicrafts,
// tourism) pull in completely different use cases. Every entry is a concrete,
// real application of the service — no filler.
//
// Shape: USE_CASES[serviceId][sectorKey] = one concrete clause.
// A missing entry is simply omitted; we never pad.
// ---------------------------------------------------------------------------
const USE_CASES = {
  'web-development': {
    finance: 'secure client portals and calculators that pass compliance review',
    media: 'high-traffic publishing sites that survive a viral spike',
    ecommerce: 'custom storefronts where the catalogue logic outgrew Shopify',
    realestate: 'listing platforms with map search and enquiry routing',
    healthcare: 'appointment booking with confidential patient intake forms',
    education: 'admissions portals with application tracking and fee payment',
    manufacturing: 'product catalogues with RFQ forms and distributor logins',
    saas: 'marketing sites and in-product dashboards on one design system',
    logistics: 'shipment tracking pages and instant quote calculators',
    hospitality: 'direct booking engines that cut aggregator commission',
    pharma: 'compliant product information sites with document control',
    jewellery: 'high-resolution catalogue sites with certification display',
    textiles: 'B2B catalogues with bulk-order and swatch request flows',
    auto: 'dealer locators, test-drive booking and inventory feeds',
    trading: 'multi-currency B2B portals with tiered pricing',
  },
  'mobile-app-development': {
    finance: 'secure account apps with biometric login',
    media: 'content apps with offline reading and push alerts',
    ecommerce: 'shopping apps with saved carts and push-driven retention',
    realestate: 'agent apps for on-site listing capture and lead logging',
    healthcare: 'patient apps for appointments, reports and reminders',
    education: 'student apps for classes, attendance and assessments',
    manufacturing: 'shop-floor and field-service apps that work offline',
    saas: 'companion mobile apps for an existing web product',
    logistics: 'driver and delivery apps with GPS and proof of delivery',
    hospitality: 'guest apps for booking, check-in and in-stay requests',
    auto: 'service booking and vehicle history apps for dealer networks',
  },
  seo: {
    finance: 'ranking for high-intent product terms without breaching advertising rules',
    media: 'news and evergreen content architecture that gets indexed fast',
    ecommerce: 'fixing duplicate product and faceted-navigation index bloat',
    realestate: 'location and project-level landing pages that genuinely differ',
    healthcare: 'treatment and condition pages that meet quality expectations for health content',
    education: 'course and admissions pages targeting comparison searches',
    manufacturing: 'technical product and specification pages that buyers search by part',
    saas: 'comparison, alternative and integration pages that convert',
    logistics: 'route and service-lane pages with genuinely distinct content',
    hospitality: 'property pages that outrank aggregator listings for your own brand',
    pharma: 'accurate, compliant information pages that earn trust signals',
    jewellery: 'collection and material pages plus image search optimisation',
    trading: 'product and HS-code pages targeting sourcing searches',
  },
  'google-ads': {
    finance: 'lead-quality filtering so you stop paying for unqualified applications',
    media: 'subscription and newsletter sign-up campaigns',
    ecommerce: 'Shopping and Performance Max campaigns tuned on margin, not revenue',
    realestate: 'project-level campaigns with site-visit booking as the conversion',
    healthcare: 'appointment-booking campaigns within healthcare ad policy limits',
    education: 'admissions campaigns aligned to the intake calendar',
    manufacturing: 'RFQ campaigns on part numbers and technical specifications',
    saas: 'demo and trial campaigns measured on qualified pipeline',
    logistics: 'instant-quote campaigns on lane and service keywords',
    hospitality: 'direct-booking campaigns bidding against aggregators on your brand',
    auto: 'test-drive and service-booking campaigns by model and location',
    trading: 'sourcing and bulk-enquiry campaigns',
  },
  'meta-ads': {
    finance: 'awareness and retargeting within financial advertising restrictions',
    media: 'subscriber growth and content amplification',
    ecommerce: 'catalogue and dynamic retargeting ads with Conversions API tracking',
    realestate: 'lead forms with instant WhatsApp follow-up',
    healthcare: 'awareness campaigns that stay inside health ad policy',
    education: 'admissions lead forms routed straight to counsellors',
    manufacturing: 'B2B lead generation and trade-show promotion',
    ecommerceRepeat: '',
    hospitality: 'seasonal offers and direct-booking retargeting',
    jewellery: 'collection launches and high-intent catalogue retargeting',
    textiles: 'B2B buyer targeting and wholesale enquiry forms',
    auto: 'test-drive lead forms by model and catchment area',
  },
  'social-media-marketing': {
    finance: 'thought-leadership content that builds trust under compliance review',
    media: 'audience growth and cross-platform distribution',
    ecommerce: 'product-led short-form content and community management',
    realestate: 'project walkthroughs and neighbourhood content',
    healthcare: 'patient education content and reputation management',
    education: 'campus life content and alumni-led admissions social proof',
    manufacturing: 'LinkedIn-led B2B presence and capability showcases',
    saas: 'product education and founder-led distribution',
    hospitality: 'property showcases, reviews and seasonal campaigns',
    jewellery: 'collection storytelling and craftsmanship content',
    textiles: 'catalogue showcases and trade-buyer content',
  },
  'digital-marketing': {
    finance: 'compliant full-funnel acquisition measured on qualified applications',
    media: 'audience growth plus subscription revenue',
    ecommerce: 'blended SEO, Shopping and social measured on contribution margin',
    realestate: 'project launches coordinated across search, social and portals',
    healthcare: 'patient acquisition across search and local listings',
    education: 'admissions funnels aligned to the intake cycle',
    manufacturing: 'B2B demand generation and distributor support',
    saas: 'pipeline generation measured on qualified opportunities',
    logistics: 'shipper acquisition across search and trade channels',
    hospitality: 'direct-booking growth that reduces aggregator dependence',
    pharma: 'compliant awareness and healthcare-professional targeting',
    trading: 'export and sourcing enquiry generation',
  },
  'ai-video': {
    finance: 'product explainers that make complex terms understandable',
    media: 'high-volume short-form cuts and localised versions',
    ecommerce: 'product demo videos generated from catalogue assets',
    realestate: 'project walkthrough videos and listing highlight reels',
    healthcare: 'patient education videos in multiple languages',
    education: 'course previews and lecture summary videos',
    manufacturing: 'process and machinery explainer videos for B2B buyers',
    saas: 'feature launch and onboarding videos at release cadence',
    logistics: 'service explainer videos for shippers',
    hospitality: 'property tours and seasonal promotional videos',
    jewellery: 'collection films and craftsmanship storytelling',
    textiles: 'fabric and catalogue showcase videos for trade buyers',
    auto: 'model walkarounds and feature explainer videos',
  },
  'agentic-ai': {
    finance: 'agents that pull documents, run checks and prepare application files',
    media: 'agents that research, draft and route content for editorial review',
    ecommerce: 'agents that handle order exceptions, returns and stock queries',
    realestate: 'agents that qualify enquiries, schedule visits and update listings',
    healthcare: 'agents that confirm appointments and chase pending paperwork',
    education: 'agents that triage admissions enquiries and track applications',
    manufacturing: 'agents that turn RFQs into quotations from your price rules',
    saas: 'agents that triage support tickets and enrich CRM records',
    logistics: 'agents that answer status queries and generate quotes from rate cards',
    hospitality: 'agents that handle booking changes and pre-arrival requests',
    pharma: 'agents that route regulatory documents through approval workflows',
    trading: 'agents that match enquiries to stock and prepare proformas',
  },
  'ai-development': {
    finance: 'document extraction from statements, KYC files and application forms',
    media: 'content tagging, summarisation and archive search',
    ecommerce: 'product matching, description generation and review analysis',
    realestate: 'listing enrichment and enquiry intent classification',
    healthcare: 'clinical document summarisation with confidentiality controls',
    education: 'assessment support and student query answering',
    manufacturing: 'specification extraction and technical document search',
    saas: 'in-product AI features and usage-driven personalisation',
    logistics: 'shipping document extraction and exception classification',
    pharma: 'regulatory document search and literature summarisation',
    trading: 'invoice and shipping document processing across formats',
  },
  'ai-automation': {
    finance: 'automating reconciliation and application document checks',
    media: 'automating publishing workflows and rights tracking',
    ecommerce: 'automating order exceptions, refunds and inventory sync',
    realestate: 'automating lead routing and follow-up sequences',
    healthcare: 'automating appointment reminders and records requests',
    education: 'automating admissions paperwork and fee follow-ups',
    manufacturing: 'automating RFQ-to-quote and purchase approvals',
    saas: 'automating onboarding, provisioning and churn alerts',
    logistics: 'automating booking confirmations and status updates',
    hospitality: 'automating booking confirmations and guest messaging',
    trading: 'automating proforma generation and shipment documentation',
  },
};

// ---------------------------------------------------------------------------
// INDUSTRIES — for /<service>-for-<industry> pages
// ---------------------------------------------------------------------------
const INDUSTRIES = {
  'real-estate': { label: 'Real Estate', pains: ['lead response time measured in minutes, not hours', 'site-visit scheduling and follow-up', 'listing and inventory accuracy across portals'] },
  healthcare: { label: 'Healthcare', pains: ['appointment no-shows', 'patient data confidentiality', 'multi-location scheduling'] },
  ecommerce: { label: 'E-commerce', pains: ['cart abandonment', 'catalogue scale and duplicate product pages', 'repeat-purchase retention'] },
  education: { label: 'Education', pains: ['admissions funnel drop-off', 'counsellor follow-up load', 'fee and attendance tracking'] },
  // Audience segments, not verticals — but they behave like industries for
  // scoping, and pages already exist for them.
  startups: { label: 'Startups', pains: ['shipping before the runway runs out', 'proving the model before scaling spend', 'building without a full in-house team'] },
  'small-businesses': { label: 'Small Businesses', pains: ['no in-house marketing or engineering team', 'budget that has to show return quickly', 'owner time being the real constraint'] },
  'local-businesses': { label: 'Local Businesses', pains: ['being found in the map pack', 'phone enquiries going unanswered', 'competing with larger chains on visibility'] },
  restaurants: { label: 'Restaurants', pains: ['direct orders lost to aggregator commission', 'review management across platforms', 'peak-hour enquiry volume'] },
  enterprises: { label: 'Enterprises', pains: ['procurement and security review cycles', 'integration with existing systems', 'governance across multiple teams'] },
  agencies: { label: 'Agencies', pains: ['managing many client accounts at once', 'approval and sign-off overhead', 'white-label reporting'] },
  creators: { label: 'Creators', pains: ['publishing consistently across platforms', 'repurposing one asset many ways', 'audience growth without a team'] },
  manufacturing: { label: 'Manufacturing', pains: ['long B2B sales cycles', 'RFQ and quotation turnaround', 'distributor and dealer coordination'] },
  hospitality: { label: 'Hospitality', pains: ['direct bookings lost to aggregators', 'review management', 'seasonal demand swings'] },
  finance: { label: 'Financial Services', pains: ['regulatory constraints on marketing claims', 'document-heavy onboarding', 'lead quality over lead volume'] },
  logistics: { label: 'Logistics', pains: ['quote turnaround time', 'shipment status enquiries', 'B2B account retention'] },
};

// ---------------------------------------------------------------------------
// PRODUCT_MODULES — the /business-os/* and /social-sync/* families.
//
// These 18+ subpages shared one set of benefit cards, so de-duplication stripped
// them back to ~90 words. Each module does something genuinely different, so
// here is what each one actually does. Nothing invented — this is standard,
// accurate HR/social software functionality as built into Avani Business OS.
// ---------------------------------------------------------------------------
const PRODUCT_MODULES = {
  // Standalone Business OS product pages (not under /business-os/). Same module
  // model, so they gain the module block, AI summary and depth automatically.
  'hrms-software-india': { name: 'HRMS', does: 'holds the employee record of truth — personal details, documents, contracts and reporting lines — and feeds payroll, attendance and reporting from it', functions: ['Employee master records and document vault', 'Org chart and reporting lines', 'Contract and letter generation', 'Role-based access to sensitive fields', 'Full audit trail on record changes'] },
  'payroll-software-india': { name: 'Payroll', does: 'runs payroll against Indian statutory rules and produces the payslips, filings and bank files at the end of it', functions: ['Salary structure and CTC breakup', 'PF, ESI, professional tax and TDS calculation', 'Attendance and leave-linked deductions', 'Bank transfer file generation', 'Payslips and Form 16 support'] },
  'attendance-management-system': { name: 'Attendance Management', does: 'collects attendance from biometrics, geofenced mobile check-ins and web, then feeds payroll directly', functions: ['Biometric device API sync', 'GPS and selfie check-in for field staff', 'Geofencing by site', 'Regularisation requests and approvals', 'Automatic push into payroll'] },
  'leave-management-software': { name: 'Leave Management', does: 'runs leave policy, accrual and approvals so balances stop being argued over in email', functions: ['Configurable leave types and accrual rules', 'Carry-forward, encashment and lapse handling', 'Multi-level approval chains', 'Holiday calendars by location', 'Team leave calendar to spot clashes'] },
  'employee-management-software': { name: 'Employee Management', does: 'is the secure directory for employee files, contracts and allocated company assets', functions: ['Document storage with expiry alerts', 'Asset allocation and return tracking', 'Emergency contacts and dependents', 'Bulk import and update', 'Role-controlled access'] },
  'employee-portal': { name: 'Employee Portal', does: 'gives employees self-service access so HR stops answering the same questions', functions: ['Payslip and tax document download', 'Leave balance and application', 'Personal detail updates with approval', 'Company policy library', 'Announcements and acknowledgements'] },
  'workforce-management-software': { name: 'Workforce Management', does: 'plans shifts, tracks utilisation and keeps rosters covered across teams that do not work a single fixed shift', functions: ['Shift patterns and rotation rules', 'Roster publishing and swap requests', 'Coverage gap alerts', 'Overtime tracking against shift', 'Utilisation reporting'] },
  'project-management-software': { name: 'Project Management', does: 'tracks projects, tasks and timesheets against budget so utilisation and profitability are visible per project', functions: ['Project and task hierarchy', 'Timesheets linked to payroll', 'Budget versus actual tracking', 'Resource allocation views', 'Client-facing progress reporting'] },
  'crm-software-india': { name: 'CRM', does: 'brings leads from ads, forms, WhatsApp and calls into one pipeline with the source attached', functions: ['Lead capture from Meta and Google lead forms', 'Pipeline stages matched to your sales process', 'Automated assignment and follow-up reminders', 'WhatsApp and email activity logging', 'Cost-per-qualified-lead reporting'] },
  'hr-portal': { name: 'HR Portal', does: 'is the employee-facing front door to HR — payslips, leave, policies and requests in one place', functions: ['Self-service payslips and documents', 'Leave application and balance', 'Policy library with acknowledgements', 'Helpdesk requests to HR', 'Announcements'] },
  'business-operating-system': { name: 'Business OS', does: 'unifies HR, payroll, attendance, CRM, projects and finance into one system with one shared record', functions: ['One employee and customer record across modules', 'Role-based access across departments', 'Cross-module reporting', 'No per-seat licensing', 'Full source code ownership'] },

  'business-os/hrms-software': {
    name: 'HRMS', does: 'holds the employee record of truth — personal details, documents, contracts, reporting lines and job history — and feeds every other module from it',
    functions: ['Employee master records and document vault', 'Org chart and reporting lines', 'Contract and letter generation', 'Role-based access to sensitive fields', 'Audit trail on every record change'],
  },
  'business-os/hr-portal': {
    name: 'HR Portal', does: 'gives employees self-service access so HR stops answering the same questions',
    functions: ['Payslip download and tax documents', 'Leave balance and application', 'Personal detail updates with approval', 'Company policy library', 'Announcements and acknowledgements'],
  },
  'business-os/hr-management-system': {
    name: 'HR Management System', does: 'covers the full employee lifecycle from offer through exit in one system',
    functions: ['Offer and onboarding workflow', 'Confirmation and probation tracking', 'Transfers, promotions and increments', 'Exit checklist and full-and-final settlement', 'Lifecycle reporting'],
  },
  'business-os/employee-management-system': {
    name: 'Employee Management', does: 'is the secure directory for employee files, contracts and allocated company assets',
    functions: ['Document storage with expiry alerts', 'Asset allocation and return tracking', 'Emergency contacts and dependents', 'Bulk import and update', 'Access controlled by role'],
  },
  'business-os/employee-directory-software': {
    name: 'Employee Directory', does: 'makes it possible to find and contact anyone in the company, with the org structure visible',
    functions: ['Searchable directory by name, team or skill', 'Interactive org chart', 'Contact details and location', 'Team and department views', 'Mobile access'],
  },
  'business-os/attendance-management-system': {
    name: 'Attendance Management', does: 'collects attendance from biometrics, geofenced mobile check-ins and web, then feeds payroll directly',
    functions: ['Biometric device API sync', 'GPS and selfie check-in for field staff', 'Geofencing by site', 'Regularisation requests and approvals', 'Automatic push into payroll'],
  },
  'business-os/online-attendance-system': {
    name: 'Online Attendance', does: 'handles attendance for remote and hybrid teams without hardware',
    functions: ['Web and mobile check-in', 'Work-from-home marking', 'Break and overtime tracking', 'Live present/absent dashboard', 'Timesheet export'],
  },
  'business-os/leave-management-system': {
    name: 'Leave Management', does: 'runs leave policy, accrual and approvals so balances stop being argued over in email',
    functions: ['Configurable leave types and accrual rules', 'Carry-forward, encashment and lapse handling', 'Multi-level approval chains', 'Holiday calendars by location', 'Team leave calendar to spot clashes'],
  },
  'business-os/payroll-management-software': {
    name: 'Payroll Management', does: 'runs payroll against Indian statutory rules and produces the filings and payslips at the end of it',
    functions: ['Salary structure and CTC breakup', 'PF, ESI, professional tax and TDS calculation', 'Attendance and leave-linked deductions', 'Bank transfer file generation', 'Payslips and Form 16 support'],
  },
  'business-os/payroll-software-for-small-business': {
    name: 'Payroll for Small Business', does: 'gives smaller teams statutory-correct payroll without an enterprise implementation',
    functions: ['Quick setup for small headcount', 'Automatic statutory calculation', 'One-click payslip distribution', 'Bank file export', 'Compliance reminders'],
  },
  'business-os/expense-management-software': {
    name: 'Expense Management', does: 'takes reimbursement claims from submission through approval to payout',
    functions: ['Receipt capture from mobile', 'Policy limits enforced at submission', 'Multi-level approval routing', 'Reimbursement via payroll or direct transfer', 'Category and cost-centre reporting'],
  },
  'business-os/shift-management-software': {
    name: 'Shift Management', does: 'plans rosters for teams that do not work a single fixed shift',
    functions: ['Shift patterns and rotation rules', 'Roster publishing and swap requests', 'Night and weekend differentials', 'Coverage gap alerts', 'Overtime tracking against shift'],
  },
  'business-os/recruitment-management-system': {
    name: 'Recruitment Management', does: 'tracks candidates from application to offer without the spreadsheet',
    functions: ['Job posting and application capture', 'Candidate pipeline stages', 'Interview scheduling and feedback', 'Offer generation and approval', 'Source and time-to-hire reporting'],
  },
  'business-os/employee-onboarding-software': {
    name: 'Employee Onboarding', does: 'turns day one into a checklist that completes itself instead of a scramble',
    functions: ['Pre-joining document collection', 'Task checklists across HR, IT and the manager', 'Asset and access provisioning requests', 'Induction content and acknowledgements', 'Probation milestone tracking'],
  },
  'business-os/employee-performance-management-system': {
    name: 'Performance Management', does: 'runs goals and appraisal cycles with a record of what was actually agreed',
    functions: ['Goal and KPI setting with weightings', 'Continuous feedback and check-ins', 'Self, manager and 360 review cycles', 'Rating calibration', 'Appraisal outcome linked to increments'],
  },
  'business-os/hrms-software-for-startups': {
    name: 'HRMS for Startups', does: 'covers what a fast-growing team actually needs without the enterprise overhead',
    functions: ['Fast setup with minimal configuration', 'Core HR, leave and payroll only', 'Scales as headcount grows', 'No per-seat licensing', 'Founder-friendly reporting'],
  },
  'business-os/hrms-software-for-smes': {
    name: 'HRMS for SMEs', does: 'fits established mid-sized businesses that have outgrown spreadsheets but do not want SAP',
    functions: ['Multi-department and multi-location support', 'Statutory compliance built in', 'Approval hierarchies', 'Integration with existing accounting', 'Migration from spreadsheets'],
  },
  'business-os/hrms-software-for-small-business': {
    name: 'HRMS for Small Business', does: 'gives small teams proper HR records and compliant payroll at a workable cost',
    functions: ['Simple employee records', 'Leave and attendance basics', 'Compliant payroll for small headcount', 'Self-service to reduce HR admin', 'No per-user fee'],
  },
  'business-os/best-hrms-software-in-india': {
    name: 'HRMS for Indian Businesses', does: 'is built specifically around Indian statutory requirements rather than localised after the fact',
    functions: ['PF, ESI, professional tax and TDS', 'State-wise holiday and leave rules', 'Form 16 and statutory register support', 'Indian bank transfer file formats', 'Rupee-denominated reporting'],
  },
};

// ---------------------------------------------------------------------------
// STATIC_PAGES — first-crawl content for the core pages that are hand-built
// React components rather than registry entries. Without these they all fell
// back to the shell's homepage block and were byte-identical to each other.
// Facts here come from avani-enterprises-website-content.md.
// ---------------------------------------------------------------------------
const STATIC_PAGES = {
  home: {
    metaTitle: 'Avani Enterprises — Digital, Product & AI Studio',
    metaDescription:
      'A full-service digital, product and AI studio in Gurugram and Rohtak. We build websites and apps, run SEO and paid media, and ship AI systems. Founded 2016.',
    h1: 'Avani Enterprises — Digital, Product & AI Studio',
    intro:
      'We build the thing and then make it grow. Websites, mobile apps, e-commerce and custom business software on one side; SEO, Google and Meta Ads and social on the other; and AI systems — chatbots, voice agents, agentic workflows, video and content — running through both. One team in Gurugram and Rohtak, founded in 2016.',
    aiSummary: [
      'Avani Enterprises is a full-service digital, product and AI studio founded in 2016, with offices in Gurugram (Tower B, 3rd Floor, Unitech Cyber Park, Durga Colony, Sector 39, Gurugram, Haryana 122002) and Rohtak.',
      'Three connected practices: engineering (web, mobile, e-commerce, CRM, ERP, custom software), growth (SEO, Google Ads, Meta Ads, social media, content) and AI (chatbots, voice agents, agentic workflows, AI video, AI content).',
      'Two own products: Avani Business OS, a unified HR, payroll, CRM and operations platform deployed on your own infrastructure with no per-seat licensing; and Social Sync, a multi-platform social scheduling and approval tool.',
      'Every engagement starts with a written scope listing deliverables and explicit exclusions, quoted after a free discovery call.',
      'Delivery is across India — Delhi NCR, the Haryana belt and the metros — with international engagements handled from the India team.',
      'Reporting is on qualified leads and cost per lead rather than impressions, with conversion tracking wired before spend increases.',
    ],
    sections: [
      {
        heading: 'What we do',
        paragraphs: [
          '**Engineering.** Custom websites and web applications, iOS and Android apps, e-commerce on Shopify, WooCommerce or a custom stack, and internal systems including CRM, ERP and bespoke business software. Built on React, Node and Postgres, and handed over with the repository so you are never locked to us.',
          '**Growth.** Technical SEO and content depth, Google Ads and Performance Max, Meta Ads with server-side conversion tracking, and social media from strategy through production. We fix tracking before we increase spend, because platforms optimise toward whatever you report.',
          '**AI.** Chatbots grounded in your own content, voice agents that qualify leads and book appointments, agentic workflows that complete multi-step tasks across your systems, AI video for ads and explainers, and AI-assisted content with human editing on every piece. We are model-agnostic and benchmark Claude, GPT and Gemini per task.',
        ],
      },
      {
        heading: 'Why the combination matters',
        paragraphs: [
          'Most agencies do one of these. The gap shows up in practice: an SEO audit recommends technical fixes that nobody implements, or a campaign points at a landing page the agency cannot change.',
          'Because engineering, growth and AI sit in the same team here, a recommendation and its implementation come from the same people. A page that needs rebuilding gets rebuilt; a lead that needs routing into a CRM gets routed.',
        ],
      },
      {
        heading: 'How we work',
        paragraphs: [
          'A free discovery call, then a written scope with deliverables and explicit exclusions before anything starts. Work runs in sprints against a live staging link with a named point of contact rather than a ticket queue.',
          'We will tell you when we are not the right fit — when an off-the-shelf product beats a build, when a specialist would serve you better, or when the constraint is your offer rather than your marketing. That is cheaper for both of us than finding out in month three.',
        ],
      },
    ],
    faqs: [
      { q: 'Where is Avani Enterprises based?', a: 'Our head office is at Tower B, 3rd Floor, Unitech Cyber Park, Durga Colony, Sector 39, Gurugram, Haryana 122002, with a second office in Rohtak. We deliver across India and internationally.' },
      { q: 'What does Avani Enterprises do?', a: 'Three connected things: engineering (websites, apps, e-commerce, CRM, ERP, custom software), growth marketing (SEO, Google and Meta Ads, social), and AI systems (chatbots, voice agents, agentic workflows, AI video and content).' },
      { q: 'How do you price work?', a: 'Fixed-scope quotes for builds and monthly retainers for ongoing marketing, quoted after a free discovery call. Ad spend is always billed separately and transparently from the management fee.' },
      { q: 'Do you work with small businesses?', a: 'Yes, alongside larger clients. The engagement is scoped to the business rather than to a package, and we will say when a smaller or simpler solution would serve you better.' },
      { q: 'Who owns the code and the accounts?', a: 'You do. You receive the repository and the deployment configuration, and ad accounts stay in your name, so you are never dependent on us to make a change or to leave.' },
    ],
  },

  about: {
    metaTitle: "About Avani Enterprises — Gurugram & Rohtak Studio",
    metaDescription: "Founded 2016. A full-service digital, product and AI studio with offices in Gurugram and Rohtak, building websites and apps and running growth campaigns.",
    h1: 'About Avani Enterprises',
    intro: `Avani Enterprises is a digital agency headquartered at ${COMPANY.hq}, delivering across India, the UAE, Singapore and the United States. We build websites, apps and custom software, run performance marketing, and ship AI systems — chatbots, voice agents, content pipelines, video and autonomous agents.`,
    sections: [
      {
        heading: 'What we do',
        paragraphs: [
          'We work across three connected areas: engineering (web, mobile, e-commerce, CRM, ERP and custom software), growth (SEO, Google Ads, Meta Ads, social media and content), and AI (chatbots, voice callers, agentic workflows, AI video and AI-assisted content).',
          'Most clients come to us for one of those and stay for the combination — a site that ranks is worth more when the leads land in a CRM and get called back within seconds.',
        ],
      },
      {
        heading: 'How we work',
        paragraphs: [
          'Every engagement starts with a written scope that states what is included and what is not. Work runs in sprints with a live staging link, so you see progress rather than status reports. You own the code and the accounts at the end.',
        ],
      },
    ],
    faqs: [
      { q: 'Where are you based?', a: `Our head office is at ${COMPANY.hq}. We deliver remotely across India and internationally, and travel for kickoff on larger engagements.` },
      { q: 'Do you work with businesses outside India?', a: 'Yes — we work with clients in the UAE, Singapore and the United States, with call times arranged around the overlap and invoicing in local currency.' },
      { q: 'How do I get in touch?', a: `Email ${COMPANY.email} or call ${COMPANY.phone}. You can also book a discovery call through the contact form.` },
    ],
  },
  services: {
    metaTitle: "Services — Web, App, AI, SEO & Paid Media",
    metaDescription: "Web and app development, e-commerce, CRM and ERP builds, SEO, Google and Meta Ads, plus AI chatbots, voice agents and agentic workflows. One team.",
    h1: 'Our Services',
    intro: 'Engineering, growth and AI under one roof — web and app development, e-commerce, CRM and ERP builds, SEO, Google and Meta Ads, social media, plus AI chatbots, voice callers, agentic workflows, AI video and AI content.',
    sections: [
      {
        heading: 'Engineering',
        paragraphs: [
          'Custom websites and web applications, iOS and Android apps, e-commerce on Shopify, WooCommerce or a custom stack, and internal systems including CRM, ERP and bespoke business software. Built on React, Node and Postgres, with the code handed to you.',
        ],
      },
      {
        heading: 'Growth',
        paragraphs: [
          'Technical SEO and content depth, Google Ads and Performance Max, Meta Ads with server-side conversion tracking, and social media strategy through to production. Reporting is on qualified leads and cost per lead, not impressions.',
        ],
      },
      {
        heading: 'AI',
        paragraphs: [
          'AI chatbots grounded in your own content, AI voice callers that qualify leads and book appointments, agentic AI that completes multi-step tasks across your systems, AI video for ads and explainers, and AI-assisted content with human editing on every piece.',
          'We are model-agnostic — Claude, GPT and Gemini each win on different workloads, so we benchmark rather than default to one vendor.',
        ],
      },
    ],
    faqs: [
      { q: 'Can you handle a project that spans several of these?', a: 'Yes, and that is usually where the value is. A build, the campaigns that drive traffic to it, and the AI that handles the resulting enquiries are far easier to make work together when one team owns all three.' },
      { q: 'What is the smallest engagement you take on?', a: 'It varies by service — a design-only project or a single automated workflow is a reasonable starting point. We scope it on a discovery call rather than applying a minimum.' },
    ],
  },
  contact: {
    metaTitle: "Contact Avani Enterprises — Gurugram & Rohtak",
    metaDescription: "Talk to the team in Gurugram or Rohtak. Free scope call and a written quote, no obligation. Email kp@avanienterprises.in or call +91 92536 25099.",
    h1: 'Contact Avani Enterprises',
    intro: `Head office: ${COMPANY.hq}. Email ${COMPANY.email} or call ${COMPANY.phone}.`,
    sections: [
      {
        heading: 'What happens after you get in touch',
        paragraphs: [
          'You get a discovery call, not a sales pitch. We ask what you are trying to achieve, what you have already tried, and what your constraints are. If we are not the right fit we will say so.',
          'If there is a fit, you receive a written scope with deliverables, exclusions, timeline and commercials before any work starts.',
        ],
      },
    ],
    faqs: [
      { q: 'How quickly do you respond?', a: 'We aim to respond to enquiries within one working day. For anything urgent, calling the number above is faster than the form.' },
      { q: 'Do you charge for the first call?', a: 'No. The discovery call is free, and you get a written scope and quote from it.' },
    ],
  },
  'case-studies': {
    metaTitle: "Case Studies — Client Work & Real Results",
    metaDescription: "Selected client work across web, e-commerce, marketing and AI: the starting position, the constraint that made it hard, and what was actually delivered.",
    h1: 'Case Studies',
    intro: 'Selected client work across web, e-commerce, marketing and AI — what the problem was, what we built, and what changed.',
    sections: [
      {
        heading: 'How to read these',
        paragraphs: [
          'Each case study states the starting position, the constraint that made it difficult, and what was actually delivered. Where we can share numbers we do; where a client has asked us not to, we describe the outcome instead of inventing a metric.',
        ],
      },
    ],
    faqs: [
      { q: 'Can you share references?', a: 'Yes, on request and with the client’s permission, we can put you in touch with someone in a comparable sector.' },
    ],
  },
  projects: {
    metaTitle: "Projects — Portfolio of Builds & Campaigns",
    metaDescription: "Websites, applications, e-commerce stores and AI systems built for clients across healthcare, real estate, manufacturing, retail and services in India.",
    h1: 'Projects',
    intro: 'A portfolio of websites, applications, e-commerce stores and AI systems we have built.',
    sections: [
      {
        heading: 'What is in here',
        paragraphs: [
          'Client builds across healthcare, real estate, retail, manufacturing and services — including web platforms, custom internal systems, WhatsApp and lead automation, and AI workflows.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you build in my industry?', a: 'Most likely. The engineering is largely sector-agnostic; what changes is the workflow and the compliance constraints, which we scope in discovery.' },
    ],
  },
  blog: {
    metaTitle: "Blog — Web, SEO, Paid Media & AI",
    metaDescription: "Writing from client work on web development, technical SEO, Google and Meta Ads, and applied AI. Practical detail rather than recycled commentary.",
    h1: 'Avani Enterprises Blog',
    intro: 'Practical writing on web development, SEO, paid media and applied AI — what we learn building and running these systems for clients.',
    sections: [
      {
        heading: 'What we write about',
        paragraphs: [
          'Technical SEO and the reasons Google declines to index pages; performance and Core Web Vitals; paid media measurement after the tracking changes of recent years; and applied AI — what actually works in production rather than what demos well.',
          'We write from engagements, not from keyword lists. If a post exists it is because we hit the problem ourselves.',
        ],
      },
    ],
    faqs: [{ q: 'Can we republish your articles?', a: 'With attribution and a link back, usually yes — email us first.' }],
  },
  careers: {
    metaTitle: "Careers at Avani Enterprises — Gurugram",
    metaDescription: "Open roles in engineering, performance marketing, design and AI at our Gurugram head office. Practical hiring process, paid internships, judgement first.",
    h1: 'Careers at Avani Enterprises',
    intro: 'Open roles across engineering, performance marketing, design and AI, based at our Gurugram head office.',
    sections: [
      {
        heading: 'How we hire',
        paragraphs: [
          'A short conversation, then a practical exercise close to real work rather than an abstract puzzle, then a conversation with the people you would work with. We tell you where you stand at each stage.',
          'We hire for judgement over years of experience. If you can explain why you made a decision and what you would do differently, that counts for more than the length of your CV.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you hire remotely?', a: 'For some roles, yes. Most engineering and marketing roles are hybrid out of Gurugram, Noida, Rohtak or Mumbai.' },
      { q: 'Do you take interns?', a: 'Yes, across engineering, design and marketing. Internships are paid.' },
    ],
  },
  newsletters: {
    metaTitle: "Newsletters — Search, Paid Media & AI Updates",
    metaDescription: "Periodic write-ups on what is changing in search, paid media and AI, and what it actually means for your business. Short, specific and infrequent.",
    h1: 'Newsletters',
    intro: 'Periodic write-ups on what is changing in search, paid media and AI — and what it means for businesses rather than for agencies.',
    sections: [
      {
        heading: 'What you get',
        paragraphs: [
          'Short, specific and infrequent. Algorithm and platform changes that actually affect what you should do, with the practical implication spelled out rather than a link dump.',
        ],
      },
    ],
    faqs: [{ q: 'How often do you send it?', a: 'Only when something is genuinely worth your attention. We would rather send less than pad a schedule.' }],
  },
  courses: {
    metaTitle: "Courses — Digital Marketing, Web & AI Training",
    metaDescription: "Practical, project-based training in digital marketing, web development and applied AI, taught by the people who deliver this work for clients daily.",
    h1: 'Courses',
    intro: 'Training on digital marketing, web development and applied AI, taught by the people who do this work for clients.',
    sections: [
      {
        heading: 'How the courses run',
        paragraphs: [
          'Practical and project-based. You work on real briefs rather than watching recorded theory, and you leave with something you built.',
        ],
      },
    ],
    faqs: [
      { q: 'Are these online or in person?', a: 'It depends on the course — check the individual course page for format, schedule and fee.' },
      { q: 'Do you help with placement?', a: 'We do not guarantee placement, and we would be cautious of anyone who does. We do share strong candidates with our network.' },
    ],
  },
  'privacy-policy': {
    metaTitle: "Privacy Policy — Avani Enterprises",
    metaDescription: "How Avani Enterprises collects, uses, stores and protects your personal information, which third parties process it, and how to request access or deletion.",
    h1: 'Privacy Policy',
    intro: 'How Avani Enterprises collects, uses, stores and protects your personal information, and the rights you have over it.',
    sections: [
      {
        heading: 'Summary',
        paragraphs: [
          'We collect the information you give us through forms and calls, plus standard analytics about how the site is used. We use it to respond to enquiries and improve the site. We do not sell it.',
          'The full policy below sets out data categories, retention, third-party processors and how to request access or deletion. For any privacy request, contact kp@avanienterprises.in.',
        ],
      },
    ],
    faqs: [{ q: 'How do I request deletion of my data?', a: 'Email kp@avanienterprises.in from the address you contacted us, and we will confirm once it is done.' }],
  },
  'terms-and-conditions': {
    metaTitle: "Terms and Conditions — Avani Enterprises",
    metaDescription: "The terms governing use of the Avani Enterprises website and the general basis on which we provide services. Signed project scopes take precedence.",
    h1: 'Terms and Conditions',
    intro: 'The terms governing use of the Avani Enterprises website and the basis on which we provide services.',
    sections: [
      {
        heading: 'Summary',
        paragraphs: [
          'These terms cover acceptable use of this website, intellectual property, limitation of liability, and the general basis of our engagements.',
          'Specific client work is governed by the written scope and agreement signed for that engagement, which takes precedence over anything on this page.',
        ],
      },
    ],
    faqs: [{ q: 'Do these terms cover my project?', a: 'Your signed scope and agreement govern the work. These terms cover use of the website itself.' }],
  },
  'global-presence': {
    metaTitle: "Where Avani Enterprises Operates",
    metaDescription: "Head office in Gurugram and a second office in Rohtak, delivering across Delhi NCR, the Haryana belt and the Indian metros, plus international work.",
    h1: 'Global Presence',
    intro: 'Head office in Gurugram, with delivery across India, the UAE, Singapore and the United States.',
    sections: [
      {
        heading: 'Where we operate',
        paragraphs: [
          `India: head office at ${COMPANY.hq}. Delivery nationwide on IST, covering Delhi NCR, Rohtak and the Haryana belt, and the metros — Mumbai, Bengaluru, Pune, Hyderabad, Chennai, Kolkata, Ahmedabad and Jaipur.`,
          'UAE: served remotely across the Emirates. Dubai runs 1.5 hours behind IST, so the working day overlaps almost entirely, and we invoice in AED.',
          'Singapore: delivered from India, 2.5 hours behind you, so our team is online through your afternoon.',
          'United States: delivered from India with calls scheduled in your morning, and invoicing in USD.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have a local team in every market?', a: 'No, and we would rather be clear about it. Our office is in Gurugram. Every other market is served remotely from there, with working hours arranged around your time zone and travel for kickoff on larger engagements.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------
const LOCATION_KEYS = Object.keys(LOCATIONS).sort((a, b) => b.length - a.length);

function normalisePath(pathname) {
  return String(pathname || '').toLowerCase().split('?')[0].split('#')[0].replace(/^\/+/, '').replace(/\/+$/, '');
}

function resolvePage(pathname) {
  const slug = normalisePath(pathname);
  if (!slug) return null;

  // Product module subpages (/business-os/payroll-management-software …)
  if (PRODUCT_MODULES[slug]) {
    return { slug, serviceId: null, service: null, location: null, industry: null, model: null, module: Object.assign({ key: slug }, PRODUCT_MODULES[slug]) };
  }
  if (slug.includes('/')) return null;

  // Split a trailing location token off the slug, longest match first so
  // "greater-noida" wins over "noida".
  let locationKey = null;
  let base = slug;
  for (const key of LOCATION_KEYS) {
    if (slug.endsWith('-' + key)) { locationKey = key; base = slug.slice(0, -(key.length + 1)); break; }
  }

  // Follow location aliases (gurugram → gurgaon)
  let location = null;
  if (locationKey) {
    const entry = LOCATIONS[locationKey];
    location = entry && entry.aliasOf ? LOCATIONS[entry.aliasOf] : entry;
    if (location) location = Object.assign({ key: entry && entry.aliasOf ? entry.aliasOf : locationKey }, location);
  }

  // Service × industry pages: "<service>-for-<industry>"
  let industry = null;
  const forMatch = base.match(/^(.*)-for-(.+)$/);
  if (forMatch && INDUSTRIES[forMatch[2]]) {
    industry = Object.assign({ key: forMatch[2] }, INDUSTRIES[forMatch[2]]);
    base = forMatch[1];
  }

  // Bare city pages (/rohtak, /gurgaon, /delhi, /faridabad) are location pages
  // with no service in the slug. Treat them as the digital-marketing hub for
  // that city, which is what they are positioned as.
  if (!locationKey && LOCATIONS[base] && !LOCATIONS[base].aliasOf) {
    const entry = LOCATIONS[base];
    return {
      slug,
      serviceId: 'digital-marketing',
      service: Object.assign({ id: 'digital-marketing' }, SERVICES['digital-marketing']),
      location: Object.assign({ key: base }, entry),
      industry: null,
      model: null,
      // Marks this as the city hub rather than one service in that city, so the
      // title, H1 and description differ from /digital-marketing-company-<city>.
      isCityHub: true,
    };
  }

  const serviceId = SERVICE_ALIASES[base] || (SERVICES[base] ? base : null);
  if (!serviceId) return null;

  const model = MODEL_ALIASES[slug] ? Object.assign({ key: MODEL_ALIASES[slug] }, LLM_MODELS[MODEL_ALIASES[slug]]) : null;

  return {
    slug,
    serviceId,
    service: Object.assign({ id: serviceId }, SERVICES[serviceId]),
    location,
    industry,
    model,
  };
}

// ---------------------------------------------------------------------------
// Content builders — every string below is assembled from the real data above,
// so two different slugs cannot produce the same text.
// ---------------------------------------------------------------------------

/** Lowercase the first letter so a sentence fragment can be spliced mid-sentence. */
function lowerFirst(str) {
  const s = String(str || '');
  // Leave acronyms (AI, MCP, GPT…) and proper nouns starting a fragment alone.
  if (/^[A-Z]{2,}/.test(s)) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** "a" vs "an", by sound rather than a naive vowel test. */
function article(word) {
  const w = String(word || '').trim();
  if (!w) return 'a';
  // Acronyms read letter by letter: an SEO, an ERP, an AI, but a CRM… ("see-arr-em")
  if (/^[A-Z]{2,}/.test(w)) return /^[AEFHILMNORSX]/.test(w) ? 'an' : 'a';
  return /^[aeiou]/i.test(w) ? 'an' : 'a';
}

function listSentence(items, conjunction) {
  const arr = (items || []).filter(Boolean);
  const join = conjunction || 'and';
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  return arr.slice(0, -1).join(', ') + ' ' + join + ' ' + arr[arr.length - 1];
}

// Canonical hub page per service, so a city page can point at the full scope
// instead of repeating it. Also the target for consolidating duplicate variants.
const SERVICE_HUBS = {
  'web-development': 'web-development-company',
  'frontend-development': 'frontend-development-company',
  'backend-development': 'backend-development-company',
  'full-stack-development': 'full-stack-development-company',
  'web-design': 'web-design-company',
  'mobile-app-development': 'mobile-app-development-company',
  'android-app-development': 'android-app-development-company',
  'ios-app-development': 'ios-app-development-company',
  'flutter-development': 'flutter-app-development-company',
  'react-native-development': 'react-native-development-company',
  'ecommerce-development': 'ecommerce-development-company',
  'shopify-development': 'shopify-development-company',
  'woocommerce-development': 'woocommerce-development-company',
  seo: 'seo-company',
  'enterprise-seo': 'enterprise-seo-services',
  'ecommerce-seo': 'ecommerce-seo-services',
  'local-seo': 'local-seo-services',
  'ai-consulting': 'ai-consulting-company',
  'crm-consulting': 'crm-consulting-company',
  'instagram-marketing': 'instagram-marketing-agency',
  'digital-marketing': 'digital-marketing-company',
  'google-ads': 'google-ads-agency',
  'meta-ads': 'meta-ads-agency',
  'social-media-marketing': 'social-media-marketing-company',
  'ai-development': 'ai-development-company',
  'ai-chatbot': 'ai-chatbot-development',
  'ai-callers': 'ai-callers',
  'ai-content': 'ai-content-services',
  'ai-video': 'ai-video-services',
  'agentic-ai': 'agentic-ai-development-company',
  'ai-automation': 'ai-automation-company',
  'crm-development': 'crm-development-company',
  'erp-development': 'erp-development-company',
  'custom-software-development': 'custom-software-development-company',
  'podcast-production': 'podcast-production',
  'financial-consulting': 'financial-consulting',
  'business-consultation': 'business-consultation',
  'business-loans': 'business-loans',
  'business-insurance': 'business-insurance',
};

// ---------------------------------------------------------------------------
// CTA copy per service. A specific ask converts better than "Contact us",
// because it tells the visitor exactly what they get for the click.
// ---------------------------------------------------------------------------
const CTA_COPY = {
  'web-development': { heading: 'Get a free scope and quote', sub: 'Tell us what you need and we will come back with a written scope and a fixed quote — not a brochure.' },
  'web-design': { heading: 'Get a free design review', sub: 'Send us your current site and we will point out what is costing you conversions.' },
  'mobile-app-development': { heading: 'Get a free app scoping call', sub: 'We will tell you whether you need native or cross-platform, and roughly what each would cost.' },
  'ecommerce-development': { heading: 'Get a free store audit', sub: 'We will look at your checkout, speed and product pages and tell you what is losing sales.' },
  seo: { heading: 'Get a free SEO audit', sub: 'We will run a crawl and tell you whether your problem is technical, duplication or authority — before you pay anything.' },
  'enterprise-seo': { heading: 'Get a free crawl and index audit', sub: 'At enterprise scale the problem is usually templates and crawl budget. We will show you which.' },
  'ecommerce-seo': { heading: 'Get a free catalogue crawl', sub: 'We will show you how many product URLs are competing with each other and what to do about it.' },
  'local-seo': { heading: 'Get a free local visibility check', sub: 'We will check your Google Business Profile, citations and local pack position.' },
  'digital-marketing': { heading: 'Get a free channel plan', sub: 'We will tell you which channel to start with and what a realistic budget looks like.' },
  'google-ads': { heading: 'Get a free Google Ads audit', sub: 'We will show you where the wasted spend is before you commit to anything.' },
  'meta-ads': { heading: 'Get a free Meta Ads audit', sub: 'We will check your pixel, Conversions API setup and creative testing — the three usual leaks.' },
  'social-media-marketing': { heading: 'Get a free content plan', sub: 'We will send a month of content pillars mapped to your audience.' },
  'ai-development': { heading: 'Book a free AI feasibility call', sub: 'We will tell you whether AI is the right answer — including when it is not.' },
  'ai-consulting': { heading: 'Book a free AI assessment call', sub: 'We will help you work out what is worth building and what you should buy instead.' },
  'ai-chatbot': { heading: 'Get a free chatbot demo', sub: 'We will build a short demo on your own content so you can see how it answers.' },
  'ai-callers': { heading: 'Hear an AI caller on your own script', sub: 'Send us a real call flow and we will demo a voice agent handling it.' },
  'ai-content': { heading: 'Get a free sample in your brand voice', sub: 'Send two things you have published and we will return a draft written to match.' },
  'ai-video': { heading: 'Get a free sample video', sub: 'Send us a script or a product page and we will produce a short sample.' },
  'agentic-ai': { heading: 'Book a free workflow review', sub: 'We will map one of your workflows and tell you honestly whether an agent beats a rule.' },
  'ai-automation': { heading: 'Get a free automation audit', sub: 'We will quantify the hours going into manual work and what is worth automating first.' },
  'crm-development': { heading: 'Book a free CRM scoping call', sub: 'We will tell you whether to build or buy — and we do say buy.' },
  'crm-consulting': { heading: 'Book a free CRM review', sub: 'Adoption problems are usually configuration, not platform. We will find out which.' },
  'erp-development': { heading: 'Book a free process review', sub: 'We will map your operations and tell you which modules are worth building first.' },
  'custom-software-development': { heading: 'Get a free scoping session', sub: 'We will produce a written scope with explicit exclusions before anyone commits.' },
  'podcast-production': { heading: 'Book a free episode plan', sub: 'We will plan your first three episodes and the clips that come out of them.' },
  'frontend-development': { heading: 'Get a free frontend review', sub: 'Send us your designs or your current build and we will assess the work involved.' },
  'backend-development': { heading: 'Book a free architecture call', sub: 'We will review your data model and API design before you build on it.' },
  'full-stack-development': { heading: 'Get a free product scoping call', sub: 'We will break your idea into phases with a timeline for each.' },
  'shopify-development': { heading: 'Get a free Shopify store review', sub: 'We will check speed, theme bloat and checkout flow and tell you what is worth fixing.' },
  'woocommerce-development': { heading: 'Get a free WooCommerce audit', sub: 'We will show you what each plugin is costing you in load time.' },
  'android-app-development': { heading: 'Book a free Android scoping call', sub: 'We will advise on minimum SDK and device coverage from your own analytics.' },
  'ios-app-development': { heading: 'Book a free iOS scoping call', sub: 'We will cover App Store requirements before you build, not after a rejection.' },
  'flutter-development': { heading: 'Book a free Flutter scoping call', sub: 'We will tell you honestly whether Flutter or React Native fits your team better.' },
  'react-native-development': { heading: 'Book a free React Native call', sub: 'We will assess how much you can genuinely share with your web codebase.' },
  'instagram-marketing': { heading: 'Get a free Instagram audit', sub: 'We will review your content mix and tell you what is limiting reach.' },
  'financial-consulting': { heading: 'Book a discovery call', sub: 'General business financial consulting — not regulated investment advice.' },
  'business-consultation': { heading: 'Book a discovery call', sub: 'A structured look at strategy, operations and growth, with prioritised recommendations.' },
  'business-loans': { heading: 'Book a discovery call', sub: 'Advisory and documentation support. Lending decisions rest entirely with the lender.' },
  'business-insurance': { heading: 'Book a discovery call', sub: 'Needs assessment and policy comparison guidance. Cover and terms are set by the insurer.' },
};

/** Service-specific CTA copy, localised where the page is about a city. */
function ctaCopy(resolved) {
  const fallback = { heading: 'Book a free discovery call', sub: 'Tell us what you are trying to achieve and we will come back with a written scope — or tell you we are not the right fit.' };
  if (!resolved || !resolved.serviceId) return fallback;
  const base = CTA_COPY[resolved.serviceId] || fallback;
  if (resolved.location) {
    return { heading: base.heading, sub: `${base.sub} Serving ${resolved.location.city}.` };
  }
  return base;
}

/**
 * Long-form sections for a Business OS module page. Written from the module's
 * own function list, so each module page describes its own scope rather than
 * repeating a platform pitch.
 */
function moduleBodyBlocks(module) {
  if (!module) return [];
  return [
    {
      heading: `What ${module.name} replaces`,
      paragraphs: [
        `Most businesses run this on a spreadsheet plus email, or on a product that solves one part and leaves the rest manual. ${module.name} ${module.does} — which means the data lands once and is available everywhere else in the platform.`,
        `The practical difference is re-keying. When ${module.name.toLowerCase()} sits in its own tool, someone re-enters the same information into payroll or reporting at month end, and that step is where errors and delays come from.`,
      ],
    },
    {
      heading: 'How it fits with the rest of Business OS',
      paragraphs: [
        `Business OS is one system with one employee record. ${module.name} reads and writes to that record, so attendance affects payroll, leave affects attendance, and reporting sees all of it without an export.`,
        `Modules can be deployed individually if you only need one, but the compounding value is in the shared record. We will tell you honestly if a single module is all you need.`,
      ],
    },
    {
      heading: 'Ownership and cost',
      paragraphs: [
        `Business OS is built for you and deployed on your own infrastructure. There is no per-seat licence, so cost does not scale with headcount — which is the main reason companies move off per-user SaaS once they pass a certain size.`,
        `You receive the source code and the data. If you stop working with us, the system keeps running and another team can maintain it. That independence is the point of building rather than subscribing.`,
      ],
    },
  ];
}

const SECTOR_LABELS = {
  finance: 'Financial services', media: 'Media and entertainment', ecommerce: 'E-commerce and D2C',
  realestate: 'Real estate', healthcare: 'Healthcare', education: 'Education',
  manufacturing: 'Manufacturing', saas: 'SaaS and technology', logistics: 'Logistics',
  hospitality: 'Hospitality and tourism', pharma: 'Pharmaceuticals', textiles: 'Textiles and apparel',
  jewellery: 'Gems and jewellery', auto: 'Automotive', trading: 'Trading and distribution',
};

/**
 * Concrete "sector — what this service does for them" lines for the page's
 * location. Returns [] when we have no real entry, rather than padding.
 */
function localUseCases(resolved) {
  if (!resolved) return [];
  const { serviceId, location } = resolved;
  const table = USE_CASES[serviceId];
  if (!table || !location || !location.sectors) return [];
  return location.sectors
    .map((key) => {
      const use = table[key];
      if (!use || !SECTOR_LABELS[key]) return null;
      return `${SECTOR_LABELS[key]} — ${use}`;
    })
    .filter(Boolean);
}

/**
 * The unique content block for a page. Returns null for pages this engine does
 * not cover, so the caller can skip rendering entirely.
 */
function uniqueBlock(resolved) {
  if (!resolved) return null;
  const { service, location, industry, model, module } = resolved;

  // Product module pages resolve to a module rather than a service.
  if (module) {
    return {
      heading: `What the ${module.name} module does`,
      lead: `The ${module.name} module ${module.does}. It runs inside Avani Business OS, so it shares one employee record with payroll, attendance and the rest of the platform rather than needing a separate import.`,
      facts: [{ label: 'In this module', items: module.functions }],
      meta: [
        { label: 'Licensing', value: 'No per-user seat fee — you own the deployment' },
        { label: 'Deployment', value: 'Your cloud or ours, with full source code ownership' },
      ],
      localFacts: [],
      bodyBlocks: moduleBodyBlocks(module),
      aiSummary: aiSummary(resolved),
      hubLink: { href: '/business-os', label: 'See the full Business OS platform' },
      faqs: [
        { q: `Can we use ${module.name} on its own?`, a: `Yes. Modules can be deployed individually, though most of the value comes from sharing one employee record across modules — ${module.name} data flowing straight into payroll, for example, rather than being re-keyed.` },
        { q: 'Is there a per-user licence fee?', a: 'No. Business OS is built for you and deployed on your infrastructure, so cost does not scale with headcount the way per-seat SaaS does.' },
        { q: 'Can it integrate with what we already use?', a: 'Yes — biometric devices, accounting systems and banking file formats are the usual integrations. We scope them against your existing stack.' },
      ],
      ymyl: false,
      proof: [],
    };
  }

  if (!service) return null;

  // Model pages carry their own deliverables/stack/process. Without this they
  // all inherited the generic AI-development set and read ~65% identical to
  // each other, which is the mini-doorway pattern we are removing.
  const src = model && model.deliverables ? model : service;

  // Hub-and-spoke split. The service hub page (/web-development-company) carries
  // the full scope, process and stack. A city page carries a short summary and
  // spends its words on what is actually local — districts, sector mix, use
  // cases, office presence. That is better architecture than repeating the same
  // 400-word service description on 21 city pages, and it is what keeps two city
  // variants of one service from reading as near-duplicates.
  const isSpoke = !!location;

  const facts = [];
  if (src.deliverables && src.deliverables.length) {
    facts.push({
      label: isSpoke ? 'What we deliver' : 'What you get',
      items: isSpoke ? src.deliverables.slice(0, 3) : src.deliverables,
    });
  }
  if (!isSpoke) {
    if (src.process && src.process.length) facts.push({ label: 'How we run it', items: src.process });
    if (src.stack && src.stack.length) facts.push({ label: 'Tools and stack', items: src.stack });
  }

  const meta = [];
  const timeline = (model && model.timeline) || service.timeline;
  if (timeline) meta.push({ label: 'Typical timeline', value: timeline });
  if (!isSpoke && service.priceModel) meta.push({ label: 'How we price it', value: service.priceModel });

  let heading, lead;

  if (model) {
    heading = `Building on ${model.label}`;
    lead = `${model.label} is built by ${model.vendor}. We pick it when the workload suits its strengths rather than by default: ${lowerFirst(model.typicalFit)} Integration is through ${lowerFirst(model.integration)}`;
    facts.unshift({ label: `Where ${model.label} is the right choice`, items: model.strengths });
  } else if (location && industry) {
    heading = `${service.name} for ${industry.label} businesses in ${location.city}`;
    lead = `${industry.label} operators in ${location.city} usually come to us with the same problems: ${listSentence(industry.pains)}. ${location.note} Work is scoped around ${listSentence(location.districts.slice(0, 3))} and the local ${listSentence(location.industries.slice(0, 2))} base.`;
  } else if (location) {
    const where = location.isRegion ? `across ${location.city}` : `in ${location.city}`;
    heading = `${service.name} ${where}`;
    // location.note already states the office situation, so only prepend the
    // address when we have one — otherwise the sentence repeats itself.
    const presence = location.office && location.address
      ? `Our office here is at ${location.address}. ${location.note}`
      : location.note;
    lead = `We work with clients ${where}, covering ${listSentence(location.districts)}. The local economy leans on ${listSentence(location.industries)}, which shapes what ${service.noun} needs to do here. ${presence}`;
  } else if (industry) {
    heading = `${service.name} for ${industry.label}`;
    lead = `${industry.label} teams typically hit ${listSentence(industry.pains)}. Our ${service.noun} work is scoped around those constraints rather than a generic checklist, and is aimed at ${service.intent}.`;
  } else {
    heading = `What ${article(service.name)} ${service.name} engagement with us includes`;
    lead = `This is for ${service.intent}. Below is exactly what is delivered, how the engagement runs, and what it is built with — so you can judge fit before booking a call.`;
  }

  // Sector-specific use cases. This is what makes two city pages for the same
  // service genuinely different — Mumbai pulls BFSI/media/pharma applications,
  // Jaipur pulls jewellery/textiles/hospitality ones.
  const useCases = localUseCases(resolved);
  if (useCases.length) {
    facts.push({
      label: location ? `What ${location.city} clients typically use this for` : 'Common applications by sector',
      items: useCases,
    });
  }

  const localFacts = [];
  if (location) {
    localFacts.push({ label: location.isRegion ? 'Areas covered' : 'Areas we work across', value: listSentence(location.districts) });
    localFacts.push({ label: 'Local industry base', value: listSentence(location.industries) });
    if (location.office) localFacts.push({ label: 'Avani office', value: location.address ? `Yes — ${location.address}` : `Yes — we have an office in ${location.city}` });
    if (location.international) {
      if (location.tzNote) localFacts.push({ label: 'Time zone', value: `${location.tzOffset}. ${location.tzNote}` });
      if (location.currency) localFacts.push({ label: 'Invoicing', value: `Invoiced in ${location.currency}` });
    }
  }

  // ── Depth on city pages ───────────────────────────────────────────────────
  // City pages averaged 519 words against a 600 target. Rather than pad, these
  // add genuinely local, page-specific paragraphs: the local buying context,
  // how delivery actually works from our nearest office, and what the sector mix
  // means for this service. Every sentence is derived from real data on the
  // location object, so two cities cannot produce the same text.
  const bodyBlocks = [];

  // ── Depth on service hub pages ────────────────────────────────────────────
  // Non-location service pages averaged 409 words against a 600 target. These
  // add real, service-specific detail — what the engagement actually looks
  // like, what makes projects go wrong, and when not to hire us — rather than
  // restating the deliverables list in different words.
  if (!location && !module) {
    if (service.process && service.process.length) {
      bodyBlocks.push({
        heading: `How a ${service.name.toLowerCase()} engagement actually runs`,
        paragraphs: [
          `The sequence is ${listSentence(service.process.map((p) => p.toLowerCase()))}. Each stage ends with something you can look at rather than a status update — a scope document, a design, a staging link — so progress is visible instead of reported.`,
          `${service.timeline}. That range is wide because scope drives it: the difference between the low and high end is usually the number of integrations and how much of the content already exists. We narrow it in the scoping call rather than quoting a midpoint and revising later.`,
        ],
      });
    }

    if (service.stack && service.stack.length) {
      bodyBlocks.push({
        heading: 'What we build it, and why that matters to you',
        paragraphs: [
          `We work with ${listSentence(service.stack)}. The specific tools matter less than two things you should insist on from any supplier: that you own the accounts and the code at the end, and that nothing is built on a platform only that supplier can maintain.`,
          `You receive the repository and the deployment configuration on handover, so changing supplier later is a commercial decision rather than a technical trap.`,
        ],
      });
    }

    bodyBlocks.push({
      heading: 'When we are not the right choice',
      paragraphs: [
        `${service.priceModel}. If your budget is well below that, a smaller supplier or an off-the-shelf product will serve you better, and we would rather say so on the first call than three weeks in.`,
        `We are also the wrong choice if you need a single discipline delivered at the deepest possible level and nothing else — a dedicated specialist will usually beat a full-service team on one narrow axis. Where we are strong is when the work crosses boundaries: when the campaign needs the site rebuilt, or the AI needs the data pipeline fixed first.`,
      ],
    });
  }

  if (location) {
    const uses = localUseCases(resolved);
    const sectorsTop = listSentence(location.industries.slice(0, 3));

    bodyBlocks.push({
      heading: `${service.name} in ${location.city}: what the local market looks like`,
      paragraphs: [
        `${location.city}'s commercial activity concentrates around ${listSentence(location.districts)}. That geography matters for ${service.noun} because it determines who your buyers are and how they search — a business selling into ${listSentence(location.industries.slice(0, 2))} is not competing for the same attention as a consumer brand.`,
        `The local base leans toward ${sectorsTop}. We scope engagements around that rather than applying a template, which is why the brief for a ${location.city} client usually differs from one written for a different city on the same service.`,
      ],
    });

    if (uses.length) {
      bodyBlocks.push({
        heading: `What ${location.city} businesses actually ask us for`,
        paragraphs: [
          `Across ${location.city} the recurring requests cluster by sector: ${listSentence(uses.map((u) => u.replace(' — ', ' want ')))}.`,
          `Those are different problems with different success measures, so the first call is a scoping conversation rather than a pitch. If what you need is outside what we do well, we will say so and point you elsewhere.`,
        ],
      });
    }

    // Delivery specifics differ genuinely per city (office vs remote, distance,
    // time zone), so this stays — but it is deliberately short, because the
    // parts that would be identical everywhere are not repeated here.
    bodyBlocks.push({
      heading: `How we deliver to ${location.city}`,
      paragraphs: [
        location.office
          ? `We have an office in ${location.city}${location.address ? ` at ${location.address}` : ''}, so kickoff workshops and review sessions happen in person and you can walk in.`
          : location.note,
        location.international && location.tzNote
          ? `${location.tzNote}${location.currency ? ` Invoicing is in ${location.currency}.` : ''}`
          : '',
      ].filter(Boolean),
    });

    // NOTE: a generic "how to choose a partner in {city}" block was tried here
    // and removed. It read identically on every city page apart from the name,
    // and it pushed same-service city-pair similarity from 46% to 70% — which is
    // precisely the templated-doorway pattern this whole recovery exists to
    // undo. Depth is only worth adding when the added text is genuinely
    // different per page; advice that applies everywhere belongs on the service
    // hub, linked from here, not copied onto 140 city pages.
  }

  // On a city page, point at the hub for the full scope rather than repeating it.
  const hub = SERVICE_HUBS[resolved.serviceId];
  const hubLink =
    isSpoke && hub && hub !== resolved.slug
      ? { href: '/' + hub, label: `Full scope, process and pricing: ${service.name}` }
      : null;

  return {
    heading,
    lead,
    facts,
    meta,
    localFacts,
    bodyBlocks,
    aiSummary: aiSummary(resolved),
    hubLink,
    faqs: pageFaqs(resolved),
    ymyl: !!service.ymyl,
    proof: service.proof || [],
  };
}

/**
 * Page-specific FAQs: service FAQs, where relevant, a genuinely
 * location- or model-specific question. These get prepended to the template's
 * own FAQ list so no two pages carry the same set.
 */
function pageFaqs(resolved) {
  if (!resolved) return [];
  const { service, location, industry, model, module } = resolved;
  // Module pages carry their FAQs on the block itself.
  if (module || !service) return [];
  const out = [];

  if (model) {
    out.push({
      q: `Why choose ${model.label} over the other models?`,
      a: `${model.typicalFit} We benchmark against the alternatives on your actual task before committing, because the gap between model families shifts with every release and defaulting to one vendor tends to cost either accuracy or money.`,
    });
    out.push({
      q: `Can you migrate us off ${model.label} later?`,
      a: `Yes. We keep model calls behind an abstraction layer rather than scattering vendor-specific code through the application, so swapping models is a configuration change and a re-run of the evaluation set rather than a rewrite.`,
    });
  }

  if (location) {
    if (location.office) {
      out.push({
        q: `Do you have an office in ${location.city}?`,
        a: `Yes.${location.address ? ` Our address is ${location.address}.` : ''} ${location.note} You can meet the team in person rather than dealing with a remote-only vendor.`,
      });
    } else {
      out.push({
        q: `Do you have an office in ${location.city}?`,
        a: `No, and we would rather say so plainly than imply otherwise. Our office is in ${CONFIRMED_OFFICE_CITIES}. ${location.note} ${service.name} is delivered remotely with scheduled video reviews, a shared staging link and a named point of contact, and we travel for kickoff on larger engagements.`,
      });
    }
    const uses = localUseCases(resolved);
    out.push({
      q: `What kind of ${location.city} businesses do you usually work with for ${service.noun}?`,
      a: uses.length
        ? `The local base here is weighted toward ${listSentence(location.industries)}. In practice that means ${listSentence(uses.slice(0, 3).map((u) => u.replace(' — ', ': ').toLowerCase()))}. The engagement itself is scoped to your business, not to a city template.`
        : `The local base here is weighted toward ${listSentence(location.industries)}, so that is most of what we see — typically around ${listSentence(location.districts.slice(0, 3))}. The engagement itself is scoped to your business, not to a city template.`,
    });
    if (location.international && location.tzNote) {
      out.push({
        q: `How do you handle the time difference with ${location.city}?`,
        a: `${location.tzNote} Calls are scheduled inside that overlap${location.currency ? `, and we invoice in ${location.currency}` : ''}.`,
      });
    }
  }

  if (industry) {
    out.push({
      q: `What makes ${service.noun} different for ${industry.label}?`,
      a: `The constraints are different. ${industry.label} teams deal with ${listSentence(industry.pains)}, so the scope prioritises those rather than starting from a generic feature list.`,
    });
  }

  // On a city page keep only a couple of the shared service FAQs — the rest live
  // on the hub. Repeating the full set across 21 cities is what made the old
  // pages read as duplicates.
  const shared = service.faqs || [];
  return out.concat(location ? shared.slice(0, 2) : shared);
}

/**
 * Benefit cards unique to the page — these replace the four identical
 * "Designed for Local Markets / Sub-2-Second Speed / ..." cards that appeared
 * on all 253 location pages.
 */
function pageBenefits(resolved) {
  if (!resolved) return [];
  const { service, location, model, module } = resolved;
  if (module) {
    return module.functions.slice(0, 4).map((f) => ({ title: module.name, desc: f }));
  }
  if (!service) return [];
  const out = [];

  if (model) {
    out.push({ title: `${model.label} specialists`, desc: `${model.typicalFit}` });
    out.push({ title: 'No vendor lock-in', desc: 'Model calls sit behind an abstraction layer, so switching providers is a config change plus a re-run of the evaluation set.' });
    if (model.timeline) out.push({ title: 'Clear timeline up front', desc: `${model.timeline}. Written scope before work starts.` });
    if (model.stack && model.stack.length) out.push({ title: 'What we build with', desc: listSentence(model.stack) + '.' });
    return out.slice(0, 4);
  }

  if (location) {
    if (location.office) {
      out.push({ title: `Local office in ${location.city}`, desc: location.address ? `We work out of ${location.address}, so reviews and workshops can happen in person.` : `A real office in ${location.city}, so reviews and workshops can happen in person.` });
    } else {
      out.push({ title: `${location.city} delivery, ${location.international ? 'overlapping hours' : 'IST hours'}`, desc: location.international && location.tzNote ? location.tzNote : `Delivered from our NCR offices with scheduled reviews and a named point of contact.` });
    }
    out.push({ title: `Built around the ${location.city} market`, desc: `Scoped for the local ${listSentence(location.industries.slice(0, 3))} base rather than a generic template.` });
  }

  if (service.timeline) out.push({ title: 'Clear timeline up front', desc: service.timeline + '. Written scope before work starts, so the boundary of each phase is explicit.' });
  if (service.priceModel) out.push({ title: 'Transparent commercials', desc: service.priceModel + '.' });

  return out.slice(0, 4);
}

/**
 * One extra feature card, unique per page, prepended to the template's list.
 */
function pageFeature(resolved) {
  if (!resolved) return null;
  const { service, location, model, module } = resolved;
  if (module) return { title: `${module.name} in Business OS`, desc: `${module.name} ${module.does}.` };
  if (!service) return null;
  if (model) return { title: `${model.label} integration`, desc: model.integration };
  if (location) {
    return {
      title: `${location.city} engagement model`,
      desc: location.office
        ? `On-site workshops and in-person reviews from our ${location.city} office, with the delivery team on IST.`
        : `${location.international ? `Remote delivery with calls inside the ${location.tzOffset} overlap` : 'Remote delivery with scheduled video reviews'}, a shared staging link and a named point of contact.`,
    };
  }
  return { title: 'Written scope before we start', desc: `${service.timeline}. You get the deliverable list and the exclusions in writing before any work begins.` };
}

/**
 * aiSummary — the "AI Quick Summary" block.
 *
 * WHY THIS EXISTS
 * ---------------
 * AI answer engines (AI Overviews, ChatGPT, Perplexity, Gemini, Copilot) cite
 * short, factual, self-contained statements. A page that buries its facts in
 * marketing prose does not get quoted; a page that states them plainly does.
 *
 * Each bullet is generated from THIS page's own resolved data — its service,
 * its city, its sector mix, its timeline, its pricing model — so no two pages
 * produce the same box, and every claim traces back to something real in
 * serviceContent.js. Nothing here is written to sound impressive; the value is
 * that it is specific and checkable, which is the same thing that builds trust
 * with a human reader who has never heard of us.
 *
 * Returns [] where we have nothing factual to say, rather than padding.
 */
function aiSummary(resolved) {
  if (!resolved) return [];
  const { service, location, industry, model, module } = resolved;
  const out = [];

  if (module) {
    out.push(`${module.name} is a module of Avani Business OS, a business platform built and deployed for you rather than licensed per seat.`);
    out.push(`It ${module.does}.`);
    if (module.functions && module.functions.length) {
      out.push(`Included: ${listSentence(module.functions.slice(0, 4)).toLowerCase()}.`);
    }
    out.push('Deployed on your own infrastructure with full source code ownership, so cost does not scale with headcount.');
    out.push('Modules share one employee record, so data entered once flows to payroll, attendance and reporting without re-keying.');
    return out;
  }

  if (model) {
    out.push(`Avani Enterprises builds production applications on ${model.label}, developed by ${model.vendor}.`);
    out.push(`${model.label} is the right choice when: ${lowerFirst(model.typicalFit)}`);
    if (model.strengths && model.strengths.length) {
      out.push(`Its practical strengths are ${listSentence(model.strengths.slice(0, 3)).toLowerCase()}.`);
    }
    out.push(`Integration is via ${lowerFirst(model.integration)}`);
    if (model.timeline) out.push(`${model.timeline}.`);
    out.push('We benchmark against the alternatives on your actual task before committing, and keep model calls behind an abstraction layer so switching vendors is a configuration change.');
    return out;
  }

  if (!service) return [];

  // 1. What it is, and for whom.
  if (location) {
    out.push(`Avani Enterprises provides ${service.noun} ${location.isRegion ? 'across' : 'in'} ${location.city}, working across ${listSentence(location.districts.slice(0, 3))}.`);
  } else if (industry) {
    out.push(`Avani Enterprises provides ${service.noun} for ${industry.label} businesses.`);
  } else {
    out.push(`Avani Enterprises provides ${service.noun} from its offices in Gurugram and Rohtak, delivering across India and internationally.`);
  }

  // 2. Who it suits.
  out.push(`It is aimed at ${service.intent}.`);

  // 3. Concrete deliverables.
  if (service.deliverables && service.deliverables.length) {
    out.push(`What is delivered: ${listSentence(service.deliverables.slice(0, 3)).toLowerCase()}.`);
  }

  // 4. Local or sector specificity — the part that differs page to page.
  if (location) {
    const uses = localUseCases(resolved);
    if (uses.length) {
      out.push(`In ${location.city} this is used most for ${listSentence(uses.slice(0, 3).map((u) => u.split(' — ')[1] || u)).toLowerCase()}.`);
    } else {
      out.push(`The local base here is weighted toward ${listSentence(location.industries.slice(0, 3))}.`);
    }
  } else if (industry) {
    out.push(`${industry.label} teams typically need this because of ${listSentence(industry.pains)}.`);
  } else if (service.stack && service.stack.length) {
    out.push(`Built with ${listSentence(service.stack.slice(0, 4))}.`);
  }

  // 5. Timeline and commercials — the questions buyers actually ask.
  if (service.timeline) out.push(`Typical timeline: ${lowerFirst(service.timeline)}.`);
  if (service.priceModel) out.push(`Pricing: ${lowerFirst(service.priceModel)}.`);

  // 6. One specific, verifiable differentiator.
  if (location && location.office) {
    out.push(`We have a physical office in ${location.city}${location.address ? ` at ${location.address}` : ''}, so reviews happen in person rather than only over video.`);
  } else {
    out.push('Engineering, marketing and AI sit in one team, so a recommendation and its implementation come from the same people rather than being handed to a third party.');
  }

  return out.slice(0, 6);
}

/**
 * A page-unique <title> derived from the resolved service/location/model.
 *
 * Pages with no registry entry (dedicated route components such as
 * /web-development-company-gurgaon, plus /about and /services) were all falling
 * back to one generic site-wide title, so they competed with each other on an
 * identical string. Kept under ~60 characters, keyword first, brand omitted —
 * api/seo.js re-attaches the brand only when it fits.
 */
function pageTitle(resolved) {
  if (!resolved) return null;
  const { service, location, industry, model, module } = resolved;
  if (module) return `${module.name} — Avani Business OS`;
  if (model) return `${model.label} Development Company`;
  if (!service) return null;
  if (location && industry) return `${service.name} for ${industry.label} in ${location.city}`;
  if (location) return `${service.name} in ${location.city}`;
  if (industry) return `${service.name} for ${industry.label}`;
  return service.name;
}

/**
 * Fit a description into the 140–160 character band Google renders in full.
 *
 * Too short wastes the snippet; too long truncates mid-sentence. Extends with
 * real, page-specific facts rather than filler, and trims on a word boundary.
 */
function fitDescription(base, extras, min = 142, max = 158) {
  let d = String(base || '').replace(/\s+/g, ' ').trim();

  // Progressively shorter fallbacks, so a description that is only a little
  // short still has something true to extend with rather than being left at
  // ~110 characters wasting a third of the snippet.
  const FILLERS = [
    'Free scope call and a written quote before any work starts.',
    'Offices in Gurugram and Rohtak, delivering across India.',
    'Written scope before any work begins.',
    'Free scope call, no obligation.',
    'Based in Gurugram and Rohtak.',
    'Talk to us first — no obligation.',
    // Very short tails, for bases already close to the limit.
    'Gurugram & Rohtak, India.',
    'Free scope call.',
    'Gurugram & Rohtak.',
  ];

  const candidates = (extras || []).concat(FILLERS);
  for (const extra of candidates) {
    if (d.length >= min) break;
    const next = `${d.replace(/\.$/, '')}. ${String(extra).replace(/\s+/g, ' ').trim()}`;
    // Skip an extra that would overflow, but keep trying shorter ones.
    if (next.length <= max) d = next;
  }

  if (d.length > max) {
    const words = d.split(' ');
    let out = '';
    for (const w of words) {
      const next = out ? `${out} ${w}` : w;
      if (next.length > max) break;
      out = next;
    }
    d = out.replace(/[\s,;:—–-]+$/, '');
    if (!/[.!?]$/.test(d)) d += '.';
  }
  return d;
}

/** A short, page-unique meta description built from real facts. */
function pageDescription(resolved) {
  if (!resolved) return null;
  const { service, location, industry, model, module } = resolved;

  if (module) {
    // A standalone product page and its /business-os/ counterpart describe the
    // same module, so the framing differs to keep the two descriptions distinct.
    const standalone = !String(resolved.slug || '').startsWith('business-os/');
    return fitDescription(
      standalone
        ? `${module.name} software built for you, not licensed per seat — ${lowerFirst(module.does)}`
        : `${module.name} in Avani Business OS — ${lowerFirst(module.does)}`,
      standalone
        ? ['Deployed on your own infrastructure.', 'Source code ownership included.']
        : [listSentence((module.functions || []).slice(0, 2)) + '.', 'No per-user licensing.']
    );
  }
  if (!service) return null;

  if (model) {
    return fitDescription(
      `${service.name} on ${model.label} — ${lowerFirst(model.typicalFit)}`,
      ['We benchmark against the alternatives before committing.', 'Guardrails and evaluation before launch.']
    );
  }

  if (location) {
    const uses = localUseCases(resolved);
    return fitDescription(
      `${service.name} ${location.isRegion ? 'across' : 'in'} ${location.city} — ${listSentence(location.districts.slice(0, 2))}`,
      [
        uses.length ? `Used for ${(uses[0].split(' — ')[1] || uses[0]).toLowerCase()}.` : '',
        location.office ? `Office in ${location.city}.` : '',
        service.timeline ? `${service.timeline}.` : '',
        'Free scope call, written quote.',
      ].filter(Boolean)
    );
  }

  if (industry) {
    return fitDescription(
      `${service.name} for ${industry.label} — built around ${listSentence(industry.pains.slice(0, 2))}`,
      [service.timeline ? `${service.timeline}.` : '', 'Written scope before any work starts.'].filter(Boolean)
    );
  }

  return fitDescription(
    `${service.name}: ${listSentence((service.deliverables || []).slice(0, 2)).toLowerCase()}`,
    [service.timeline ? `${service.timeline}.` : '', service.priceModel ? `${lowerFirst(service.priceModel)}.` : ''].filter(Boolean)
  );
}

/* DATA-END */

export {
  COMPANY,
  STATIC_PAGES,
  PRODUCT_MODULES,
  SERVICES,
  SERVICE_ALIASES,
  SERVICE_HUBS,
  CANONICAL_MAP,
  canonicalSlugFor,
  MODEL_ALIASES,
  LLM_MODELS,
  LOCATIONS,
  INDUSTRIES,
  USE_CASES,
  SECTOR_LABELS,
  CTA_COPY,
  ctaCopy,
  localUseCases,
  resolvePage,
  uniqueBlock,
  pageFaqs,
  pageBenefits,
  pageFeature,
  pageTitle,
  pageDescription,
  aiSummary,
  fitDescription,
  listSentence,
};
