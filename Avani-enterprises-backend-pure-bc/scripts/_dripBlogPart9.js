// Drip blog posts — Part 9
// Theme: paid acquisition and conversion
// Shape and rules: scripts/DRIP-POSTS-SPEC.md

module.exports = [
  {
    slug: 'google-ads-quality-score-improvement',
    title: 'Google Ads Quality Score: What Moves It and What Does Not',
    category: 'Digital Marketing',
    tags: ['Google Ads', 'PPC', 'India'],

    excerpt:
      'Quality Score is a diagnostic readout, not a lever. Here is what each of its three components actually responds to, and which common fixes do nothing at all.',

    metaTitle: 'Google Ads Quality Score: What Actually Moves It',
    metaDescription:
      'Google Ads Quality Score is a diagnostic, not a lever. Learn what genuinely moves expected CTR, ad relevance and landing page experience — and what does not.',
    metaKeywords: [
      'Google Ads Quality Score',
      'improve Quality Score',
      'ad relevance',
      'landing page experience',
      'expected CTR',
    ],

    coverImage: '',

    keyTakeaways: [
      'Google Ads Quality Score is a reported 1-10 summary of three component grades, and the component grades are the part you can act on.',
      'The reported score does not enter the ad auction; Ad Rank is calculated live from your bid, ad quality at auction time, search context and format impact.',
      'Landing page experience is the component teams most often leave alone, and it constrains the other two, so fix it first.',
      'Bid changes, account age and total spend do not move Quality Score, so raising bids to rescue a low-scoring keyword only raises your cost.',
      'Judge every Quality Score change by cost per qualified lead, because deleting low-scoring keywords raises the average and shrinks the account at the same time.',
    ],

    content: `<p><strong>Google Ads Quality Score</strong> is a 1-10 diagnostic reported at the keyword level, built from three components: expected click-through rate, ad relevance and landing page experience. It is not a setting and not a lever. It is a readout of how well your keyword, your ad and your landing page agree with one another, and the reliable way to raise it is to remove the disagreement rather than to chase the number.</p>

<p>A pattern we run into repeatedly in audits: someone has sorted the keyword table by score, paused everything below 5, and declared the account optimised. The average score went up. Lead volume went down. This post covers what each component responds to, in order, and the fixes that look productive but change nothing.</p>

<h2>What is Google Ads Quality Score actually measuring?</h2>
<p>It measures how closely your ad and landing page match the intent behind a keyword, compared with other advertisers competing on that same keyword. Each component is graded on a three-point scale — Below average, Average, Above average — and those grades, not the headline number, are what you act on.</p>
<p>Two properties are routinely misunderstood. First, the score is historical: it reflects accumulated data from exact-match auctions for that keyword, so a keyword with no serving history shows a null placeholder rather than a real grade. Second, it is relative. Your ad can stay word-for-word identical and the grade can fall because a competitor started writing sharper ads on the same term.</p>

<h2>Does Quality Score directly lower your cost per click?</h2>
<p>No — the reported 1-10 number does not enter the auction. What enters the auction is Ad Rank, which Google calculates in real time from your bid, ad quality measured at auction time, the Ad Rank thresholds, the context of the search, and the expected impact of your assets and formats. Quality Score is a reporting proxy for the ad quality piece, aggregated after the fact.</p>
<p>The practical consequence matters. Improving the things Quality Score measures does tend to reduce what you pay for a given position. Optimising the number itself does not. A keyword scoring 4 that converts at a cost you are happy with is a keyword you keep.</p>

<h2>Which component should you fix first?</h2>
<p>Fix the earliest link in the chain that is graded Below average: landing page experience first, then ad relevance, then expected CTR. The order is not arbitrary — a weak landing page caps how relevant your ad can honestly be, and a vague ad caps the click-through rate it can earn.</p>

<div class="post-table-wrap">
<table>
  <thead>
    <tr>
      <th>Component</th>
      <th>What it reflects</th>
      <th>What moves it</th>
      <th>What does nothing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Landing page experience</td>
      <td>Whether the page delivers what the ad promised, quickly and without obstruction</td>
      <td>Matching the page headline to the ad promise, cutting load time, removing interstitials, making the offer and the next step obvious above the fold</td>
      <td>Stuffing the keyword into the page copy; adding a testimonials slider</td>
    </tr>
    <tr>
      <td>Ad relevance</td>
      <td>Semantic closeness between the keyword and the ad text serving against it</td>
      <td>Splitting broad ad groups so each holds one intent; writing headlines that restate the search, not the brand</td>
      <td>Adding more keywords to the same ad group; pinning every headline to position one</td>
    </tr>
    <tr>
      <td>Expected CTR</td>
      <td>Predicted click rate for that keyword, position held constant</td>
      <td>Specific differentiators in the ad — price, coverage, turnaround, location; sitelinks and other assets that widen the ad</td>
      <td>Raising the bid; increasing budget; pausing other keywords</td>
    </tr>
  </tbody>
</table>
</div>

<h3>Landing page experience</h3>
<p>The single most common failure is sending every keyword in a campaign to the homepage. A homepage is designed to serve everyone, which makes it the worst possible answer to a specific query. If someone searches for a service in a particular city, the page they land on should say that service and that city in its first heading. Building those pages properly is <a href="/web-development-company">web development work</a>, not copywriting, because speed and layout stability count here too — see our <a href="/blog/website-speed-optimisation-checklist-india">website speed optimisation checklist</a> for the parts that matter on mobile connections.</p>

<h3>Ad relevance</h3>
<p>Ad relevance is a semantic comparison, so the fix is structural. If one ad group contains "crm software", "crm for real estate" and "free crm", no single ad can be relevant to all three. Split them. Three ad groups carrying three specific ads will almost always serve that traffic better than one ad group holding fifteen mixed keywords behind a single compromise ad.</p>

<h3>Expected CTR</h3>
<p>This is the hardest to move because it depends on being genuinely more attractive than the ads either side of you, not on being better written in the abstract. Concrete detail wins: a starting price, a service area, a response time you can actually honour. Vague superlatives lose.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Not sure whether your Quality Score problem is the ads or the pages?</h3>
  <p>Send us the campaign and we will tell you which of the three components is dragging, and whether it is worth fixing. No obligation, and no pitch if the account is already sound.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What does not move Google Ads Quality Score?</h2>
<p>Bids, budget, account age, total spend and conversion rate do not feed the score. Nor does anything you do outside the campaign the keyword sits in. The list below covers the fixes we most often see attempted, all of which are wasted effort:</p>
<ul>
  <li><strong>Raising the bid.</strong> It changes your position and your cost. It does not change how relevant Google thinks your ad is.</li>
  <li><strong>Pausing low-scoring keywords.</strong> Average score rises because the low numbers left the table. Nothing improved.</li>
  <li><strong>Repeating the keyword across the landing page.</strong> Landing page experience is assessed on usefulness and clarity, not density.</li>
  <li><strong>Adding negative keywords.</strong> Worth doing for waste, but the effect on Quality Score is indirect at best — it stops irrelevant impressions from accruing, which is not the same as improving relevance.</li>
  <li><strong>Rewriting the ad every week.</strong> Each rewrite resets the learning the previous version accumulated. Change one thing, let it serve, then judge.</li>
</ul>

<h2>How do you diagnose a low score without guessing?</h2>
<p>Add the three component columns to your keyword view, sort by cost rather than by score, and work down. The expensive keywords with a Below average grade are the only ones where a fix pays for the effort. Then run these checks in sequence:</p>
<ol>
  <li>Open the search terms report for that keyword and read what people actually typed. If the terms cover several different intents, the match type is doing the damage, not the ad.</li>
  <li>Count the intents in the ad group. More than one means the ad cannot be relevant to all of them.</li>
  <li>Load the landing page on a mobile connection and time how long it takes before the offer is readable and the form is reachable.</li>
  <li>Check that the ad's main headline could plausibly be the answer to the query, read aloud, without the brand name.</li>
</ol>

<h2>How long does a Quality Score change take to appear?</h2>
<p>There is no fixed interval — the score re-accumulates as new impressions and clicks arrive, so a low-volume keyword may take considerably longer to reflect a fix than a high-volume one. Landing page changes have an additional lag because the page has to be re-crawled and re-assessed. Set the fix live, leave it alone, and check again after the keyword has served a meaningful number of impressions rather than after a fixed number of days.</p>

<h2>Where does Quality Score sit in the wider account?</h2>
<p>It is a hygiene metric, not a performance metric. It tells you whether the plumbing between keyword, ad and page is connected. It tells you nothing about whether the traffic converts, which is a question for your <a href="/blog/landing-page-conversion-optimisation">landing page conversion work</a> and your <a href="/blog/attribution-modelling-for-indian-smbs">attribution setup</a>. If you are still deciding where paid budget should go at all, our guide on <a href="/guides/google-ads-vs-meta-ads-which-first">Google Ads versus Meta Ads</a> is the better starting point, and our <a href="/digital-marketing-company">digital marketing team</a> can run the audit end to end.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want a second opinion before you restructure the account?</h3>
  <p>We will look at your ad group structure, search terms and landing pages together and tell you what to change first — and what to leave alone. There is no obligation to work with us.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'What is a good Google Ads Quality Score?',
        a: 'Anything at 7 or above generally means the keyword, ad and landing page are aligned. Below 5 is worth investigating, but only for keywords carrying real spend. A low score on a keyword that converts at an acceptable cost is not a problem you need to solve.',
      },
      {
        q: 'Does Quality Score affect Performance Max campaigns?',
        a: 'Performance Max does not report keyword-level Quality Score because it is not keyword-based. The underlying quality signals — asset relevance and landing page experience — still influence how the system serves you, they are simply not exposed as a number.',
      },
      {
        q: 'Should I delete keywords with a Quality Score of 1 or 2?',
        a: 'Only if they are also spending money without converting. Deleting them purely to raise the account average changes a reported figure and nothing else. Check cost and conversions first, then decide.',
      },
      {
        q: 'Can I see Quality Score history over time?',
        a: 'Yes. Google Ads exposes historical Quality Score and its three components as separate columns in the keyword report, so you can segment by day and see when a grade shifted. That is the fastest way to tie a drop to a specific change you made.',
      },
      {
        q: 'Does a better Quality Score guarantee a lower cost per click?',
        a: 'No. It tends to help, because ad quality feeds Ad Rank, but your actual cost per click also depends on competitor bids, thresholds and auction context. Treat it as one input, not a promise.',
      },
    ],

    author: 'Avani Enterprises',
  },

  {
    slug: 'performance-max-campaigns-guide-india',
    title: 'Performance Max Campaigns: A Guide for Indian Advertisers',
    category: 'Digital Marketing',
    tags: ['Google Ads', 'Performance Max', 'India'],

    excerpt:
      'Performance Max hands targeting to Google and asks you for assets, signals and clean conversion data. Here is what you still control, and how to stop it eating your brand traffic.',

    metaTitle: 'Performance Max Campaigns: Guide for Indian Advertisers',
    metaDescription:
      'How Performance Max campaigns really work, what you still control, and the setup order Indian advertisers must follow to avoid cannibalising brand traffic.',
    metaKeywords: [
      'Performance Max campaigns',
      'PMax India',
      'Google Ads automation',
      'asset groups',
      'audience signals',
    ],

    coverImage: '',

    keyTakeaways: [
      'Performance Max campaigns replace manual targeting with a conversion goal, a set of assets and an audience signal, so the quality of your conversion data becomes the main lever you own.',
      'Without brand exclusions, Performance Max will serve on your own brand searches and report cheap conversions you were going to get anyway.',
      'Audience signals are a starting hint for the system, not a targeting restriction, so a narrow signal does not stop it from serving elsewhere.',
      'A Performance Max campaign with one asset group is a black box; splitting asset groups by product line or margin is how you regain reporting granularity.',
      'If your conversion tracking counts form loads, page views or unqualified enquiries, Performance Max will optimise enthusiastically towards the wrong outcome.',
    ],

    content: `<p><strong>Performance Max campaigns</strong> are Google's goal-driven campaign type: you supply a conversion goal, a budget, creative assets and an audience signal, and Google decides where the ads serve across Search, Shopping, YouTube, Display, Discover, Gmail and Maps. You do not choose placements, you do not choose keywords, and you cannot see most of the auction detail afterwards. That is the trade, and for Indian advertisers with limited creative bandwidth it is often a reasonable one — provided the setup is right, because a badly configured Performance Max campaign fails quietly rather than loudly.</p>

<h2>How is Performance Max different from a standard Search campaign?</h2>
<p>It removes keyword-level control and replaces it with signals. In a Search campaign you decide which query triggers which ad and what happens next. In Performance Max you decide what a conversion is worth, what your creative says, and roughly who you think the buyer is — and the system infers the rest.</p>

<div class="post-table-wrap">
<table>
  <thead>
    <tr>
      <th>Dimension</th>
      <th>Search campaign</th>
      <th>Performance Max</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Targeting unit</td>
      <td>Keywords and match types you choose</td>
      <td>Conversion goal plus audience signal, interpreted by Google</td>
    </tr>
    <tr>
      <td>Inventory</td>
      <td>Search results, and search partners if enabled</td>
      <td>Search, Shopping, YouTube, Display, Discover, Gmail, Maps</td>
    </tr>
    <tr>
      <td>Creative</td>
      <td>Responsive search ads plus assets</td>
      <td>Asset groups: headlines, descriptions, images, logos, video, feed</td>
    </tr>
    <tr>
      <td>Reporting depth</td>
      <td>Query-level, ad-level, device-level</td>
      <td>Asset-group level, limited search category data, no placement-level control</td>
    </tr>
    <tr>
      <td>Where it fails</td>
      <td>Visibly — you see the wasteful queries in the report</td>
      <td>Quietly — spend shifts to cheap inventory and the report still looks fine</td>
    </tr>
    <tr>
      <td>Best suited to</td>
      <td>Known demand, clear intent, tight budgets</td>
      <td>Retail feeds, broad catalogues, accounts with reliable conversion data</td>
    </tr>
  </tbody>
</table>
</div>

<h2>What do you still control in Performance Max campaigns?</h2>
<p>Five things, and they are the whole job: the conversion action and its value, the assets, the audience signal, the exclusions, and the campaign's budget and bid strategy. Everything else is delegated. If a Performance Max campaign underperforms, one of those five is almost always the cause.</p>
<ul>
  <li><strong>Conversion actions.</strong> Only mark as primary the actions that represent real business outcomes. If a thank-you page view and a brochure download are both primary, the system will chase whichever is cheaper — which is the brochure.</li>
  <li><strong>Conversion values.</strong> A qualified enquiry from a ₹4,00,000 service line and a newsletter signup should not carry the same value. Where you cannot pass real revenue, pass sensible proxy values.</li>
  <li><strong>Assets.</strong> Weak or missing video means Google generates its own from your images, and that auto-generated video will serve.</li>
  <li><strong>Audience signals.</strong> Customer lists, site visitors and custom segments built from search terms tell the system where to start looking.</li>
  <li><strong>Exclusions.</strong> Brand exclusions, negative keyword lists at account level, and content exclusions for placements you do not want to appear beside.</li>
</ul>

<h2>Why does Performance Max cannibalise brand traffic?</h2>
<p>Because your own brand searches are the cheapest conversions available, and the system is instructed to find cheap conversions. Left unchecked, Performance Max will bid on people already searching for you by name, then report those conversions as its own. The account looks efficient while incremental volume flatlines.</p>
<p>The fix is a brand exclusion list on the campaign, plus an account-level negative keyword list covering your brand name and its common misspellings and transliterations. For Indian brands this matters more than usual, because the same name is often searched in Roman and regional scripts. Add both. Then hold a separate brand Search campaign so you still own the term at a sensible cost.</p>

<h2>How should you structure asset groups?</h2>
<p>Split asset groups by the way your business actually differs — product line, margin band, service category or region — not by ad format. Each asset group gets its own creative and its own audience signal, and asset-group reporting is the only granularity Performance Max gives you, so a single asset group means a single undifferentiated report.</p>
<p>For a retailer running a Merchant Centre feed, listing groups let you carve the catalogue further. Keep high-margin lines in their own asset group so you can set a distinct budget and read their performance separately. If your feed itself is thin, fix that before you spend — the product data is the targeting, and the same discipline that makes a good feed makes a good <a href="/blog/ecommerce-product-page-seo-checklist">product page</a>. Our <a href="/ecommerce-development-company">ecommerce development team</a> handles feed and catalogue structure as one job for exactly this reason.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Planning your first Performance Max campaign?</h3>
  <p>We will review your conversion tracking, feed and creative inventory and tell you whether Performance Max is the right campaign type for your account yet. No obligation either way.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What should you set up before launching?</h2>
<p>Conversion tracking, in a state you would defend to a finance team. Performance Max is only as good as the outcome it is optimising towards, and a campaign type with no manual controls has no way for you to correct a bad signal after the fact.</p>
<ol>
  <li>Define one primary conversion action that means money, and demote everything else to secondary.</li>
  <li>Confirm the conversion fires once per genuine event, not on every page load — the <a href="/blog/ga4-setup-checklist-for-lead-generation">GA4 setup checklist</a> covers the common duplication traps.</li>
  <li>Attach values, even estimated ones, so the bidding strategy can distinguish a large enquiry from a small one.</li>
  <li>Upload a customer list as an audience signal if you have consent to do so.</li>
  <li>Build the brand exclusion list and the account-level negative list before the campaign goes live, not after.</li>
  <li>Load at least one real video asset per asset group.</li>
  <li>Set a budget you can leave untouched for a full learning period — Performance Max reacts badly to daily budget fiddling.</li>
</ol>

<h2>Does Performance Max work for lead generation, not just retail?</h2>
<p>It can, but the failure mode is different and more expensive. Retail conversions are self-validating: an order is an order. Lead-gen conversions are not, so Performance Max will happily find you a large volume of cheap, unqualified form fills and report them as success.</p>
<p>Two defences. First, pass a downstream conversion back to Google — a qualified lead or a booked call, imported offline from your CRM — so the system optimises on the outcome that matters rather than the form submission. Second, put friction in the form deliberately: a required business email, a budget band, a specific service selection. If you are choosing a CRM to make that import possible, our guide on <a href="/guides/build-or-buy-a-crm">building or buying a CRM</a> is the honest version of that decision.</p>

<h2>When should you not use Performance Max?</h2>
<p>Skip it when you have too little conversion data for the system to learn from, when your margins vary so widely that a single goal misleads it, or when compliance requires you to know exactly where your ads appear. A small account with a handful of monthly conversions will generally do better on tightly built Search campaigns where the <a href="/blog/google-ads-quality-score-improvement">keyword-to-page match</a> is under your control, and where you can see and cut waste directly. Our <a href="/digital-marketing-company">digital marketing company</a> page sets out how we decide between the two for a given account.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Already running Performance Max and unsure what it is actually doing?</h3>
  <p>We will read the asset group data, check for brand cannibalisation and tell you where the spend is really going. Straight answer, no obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'Can I stop Performance Max from bidding on my brand name?',
        a: 'Yes. Apply a brand exclusion list to the campaign and add an account-level negative keyword list containing your brand name and its variants. Do both — the brand list handles brand-matched traffic, the negative list catches spellings the brand list misses.',
      },
      {
        q: 'How much budget does a Performance Max campaign need?',
        a: 'Enough to gather conversion data steadily rather than in bursts. There is no universal figure, but a campaign that produces only a handful of conversions a month will struggle to leave the learning phase, and constant budget changes restart it.',
      },
      {
        q: 'Does Performance Max replace Search campaigns?',
        a: 'No. Many accounts run both, with Performance Max covering broad discovery and a Search campaign holding brand and high-intent terms where control matters. Google generally serves the Search ad when a keyword matches exactly and the ad rank is competitive.',
      },
      {
        q: 'Why does my Performance Max campaign show so little reporting detail?',
        a: 'Because the campaign type does not expose placement or query-level data by design. You get asset group performance, asset ratings and limited search category insights. Splitting asset groups is the main way to get more readable reporting.',
      },
      {
        q: 'Should Indian advertisers use Performance Max for local services?',
        a: 'It can work if location targeting and conversion tracking are tight, but local service businesses often get cleaner results from Search plus a well-maintained Google Business Profile, because intent is already explicit and control matters more than reach.',
      },
      {
        q: 'Do I need video assets for Performance Max?',
        a: 'You do not have to upload one, but if you leave it blank Google will auto-generate a video from your other assets and run it. Uploading even a simple, well-produced video gives you control over what appears on YouTube.',
      },
    ],

    author: 'Avani Enterprises',
  },

  {
    slug: 'meta-ads-creative-testing-framework',
    title: 'A Creative Testing Framework for Meta Ads',
    category: 'Digital Marketing',
    tags: ['Meta Ads', 'Creative', 'Social'],

    excerpt:
      'Most Meta ad testing produces opinions, not answers. This is a framework for testing one variable at a time, at a volume that can actually settle the question.',

    metaTitle: 'Meta Ads Creative Testing: A Framework That Works',
    metaDescription:
      'A Meta ads creative testing framework: what to vary, how to isolate one variable, when a result is real, and how to build a library instead of guessing.',
    metaKeywords: [
      'Meta ads creative testing',
      'Facebook ad creative',
      'ad testing framework',
      'hook rate',
      'creative iteration',
    ],

    coverImage: '',

    keyTakeaways: [
      'Meta ads creative testing only produces answers when you vary one layer at a time — concept, hook, format or offer — and hold the rest constant.',
      'Creative is the highest-leverage variable on Meta because targeting is largely delegated to the algorithm, so testing budget belongs in production, not in audience permutations.',
      'A test that has not accumulated enough conversions to distinguish a real difference from noise should be extended or abandoned, never declared a winner.',
      'Hook rate and hold rate diagnose why an ad failed; cost per result alone only tells you that it did.',
      'The output of a testing programme is a written library of what worked and why, otherwise every new campaign restarts from zero.',
    ],

    content: `<p><strong>Meta ads creative testing</strong> is the main lever left to advertisers on the platform. Detailed audience targeting has been progressively folded into automated delivery, budget optimisation happens at the campaign level, and placements are largely chosen for you. What remains genuinely under your control is what the ad says and shows — which means the discipline of your creative testing is, in practice, the ceiling on your account's performance.</p>

<p>The problem is that most testing is not testing. Four different ads with four different concepts, four different hooks and four different offers go live together, one wins, and nobody can say what made it win. This framework exists to prevent that.</p>

<h2>What should you actually be testing on Meta?</h2>
<p>Test in four layers, from the most expensive to change to the least: concept, hook, format, then offer. Each layer sits above the ones below it, so a wrong concept cannot be rescued by a better hook, and testing them together tells you nothing about either.</p>

<h3>Layer 1 — Concept</h3>
<p>The underlying idea. A customer testimonial is one concept, a founder explaining the problem is another, a side-by-side demonstration is a third. Concepts are expensive to produce and they differ enormously, so this is where the real gains sit.</p>

<h3>Layer 2 — Hook</h3>
<p>The first two to three seconds of a video, or the top third of a static. Same concept, different opening. This is the cheapest high-impact test available because you can often re-cut existing footage rather than shoot again.</p>

<h3>Layer 3 — Format</h3>
<p>Vertical video, static image, carousel, collection. The same concept and hook rendered differently. Format testing mostly reveals where your audience actually sits — Reels versus Feed behave differently enough to change which creative wins.</p>

<h3>Layer 4 — Offer and copy</h3>
<p>The primary text, the call-to-action, the specific promise. Cheapest to change, smallest effect on a genuinely weak creative, meaningful effect on a good one.</p>

<h2>How do you isolate one variable in Meta ads creative testing?</h2>
<p>Ship variants that differ in exactly one layer and are identical in every other respect, into the same ad set, with the same budget, at the same time. If the two variants live in different ad sets or launch on different days, you are comparing delivery conditions as much as creative.</p>
<p>Three rules make this reliable in practice:</p>
<ul>
  <li><strong>Same ad set.</strong> Different ad sets get different budgets, different learning states and different auction conditions.</li>
  <li><strong>Same landing destination.</strong> If the page changes too, the test now has two variables. Page changes deserve their own test — the sequence in our <a href="/blog/landing-page-conversion-optimisation">landing page conversion optimisation</a> post covers how to run those.</li>
  <li><strong>Same window.</strong> Launch together, judge together. Meta's delivery conditions shift week to week, and festival periods in India shift them sharply.</li>
</ul>

<h2>When is a creative result real rather than noise?</h2>
<p>When the test has produced enough conversions per variant for the difference between them to be larger than the day-to-day variation you would see from the same ad. There is no universal threshold, but two checks will keep you honest:</p>
<ol>
  <li><strong>The self-comparison test.</strong> Look at how much a single ad's cost per result varies between its own good days and bad days. If your two variants differ by less than that spread, you have not found anything.</li>
  <li><strong>The direction test.</strong> Run the split for long enough that the ranking stops changing. If variant A leads on day two, B on day four and A again on day six, the test is not finished.</li>
</ol>
<p>Small differences are usually not worth chasing at all. Creative testing pays for itself when it finds a variant that is clearly, obviously better — the kind of gap you do not need statistics to see. If your results are always within a few percent of each other, you are testing too small a change.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Producing a lot of creative and learning very little from it?</h3>
  <p>We will look at your current ad set structure and creative pipeline and show you where the testing is leaking information. No obligation, and no retainer pitch.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Which metrics tell you why a creative failed?</h2>
<p>Cost per result tells you that an ad failed; the funnel of view and engagement metrics tells you where. Read them in order, because each one localises the problem to a different part of the ad.</p>
<ul>
  <li><strong>Hook rate</strong> — three-second views over impressions. Low hook rate means the opening frame is the problem, not the offer.</li>
  <li><strong>Hold rate</strong> — completions or fifteen-second views over three-second views. Good hook, bad hold means the middle of the video does not earn attention.</li>
  <li><strong>Click-through rate on the link</strong> — strong hold but weak clicks means the ad entertained and did not ask.</li>
  <li><strong>Landing page views over link clicks</strong> — a large gap here is a speed problem, not a creative one.</li>
  <li><strong>Cost per result</strong> — the outcome, read only after the four above.</li>
</ul>
<p>That last one matters more than people expect. If a third of your clicks never become landing page views, no creative change will fix it, and the work belongs with your <a href="/web-development-company">web development</a> effort instead.</p>

<h2>How many creatives do you need per month?</h2>
<p>Enough that you always have a fresh challenger ready when the current winner fatigues, which for most Indian advertisers means a steady production cadence rather than an occasional shoot. Creative fatigue on Meta is real and it arrives faster on smaller audiences, because frequency climbs quickly.</p>
<p>The efficient answer is not more shoots — it is more variants per shoot. One good production session should yield several concepts, multiple hooks per concept, and both vertical and square renders. Planning that at the storyboard stage is the difference between a shoot that produces four ads and one that produces twenty. Our <a href="/ai-content-services">content production team</a> plans shoots this way, and the same logic drives the cadence described in our <a href="/blog/short-form-video-strategy-india">short-form video strategy</a> post.</p>

<h2>How do you stop relearning the same lessons?</h2>
<p>Keep a written creative library — one row per test, recording the layer tested, the variants, the result and the reason you believe it happened. Without it, the knowledge lives in whoever ran the campaign, and it leaves when they do.</p>
<p>Record the losers too. Knowing that discount-led hooks consistently underperform demonstration hooks for your product is worth as much as knowing which single ad won, and it shapes every brief afterwards. Teams running this at scale usually end up with a shared board and a scheduling layer — <a href="/social-sync">Social Sync</a> exists for that side of it. If you want the testing programme run alongside the rest of paid social, that is what our <a href="/social-media-marketing-company">social media marketing company</a> service covers, and the <a href="/blog/ai-video-production-workflow-brands">AI video production workflow</a> post explains how to raise variant volume without raising cost proportionally.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want a testing calendar instead of a creative backlog?</h3>
  <p>Tell us what you are selling and we will map out which layer to test first and what to produce for it. Free, and there is no obligation to continue.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'How many creatives should I test at once on Meta?',
        a: 'Few enough that each gets meaningful delivery. Splitting a modest budget across eight variants usually means none of them accumulates enough data to judge. Two to four variants of a single layer is a workable default for most Indian SMB budgets.',
      },
      {
        q: 'Should I use Meta A/B test tools or just run variants in one ad set?',
        a: 'The built-in A/B test splits audiences cleanly and is the stricter method, which matters when the difference is likely to be small. Running variants in one ad set is faster and fine when you are testing large, obvious differences between concepts.',
      },
      {
        q: 'What is a good hook rate on Meta ads?',
        a: 'Benchmarks vary far too much by industry, placement and audience to be useful as targets. Compare a creative to your own historical hook rates on the same placement instead — that is the only comparison that controls for your context.',
      },
      {
        q: 'How often does Meta creative fatigue set in?',
        a: 'It depends on audience size and spend rate rather than on elapsed time. Watch frequency and the trend in cost per result on that specific ad; when both climb together while the rest of the account holds steady, the creative is fatiguing.',
      },
      {
        q: 'Does creative testing still matter if I use Advantage+ campaigns?',
        a: 'It matters more. Advantage+ removes most manual targeting control, which leaves creative as the main input you supply. The testing discipline moves from ad set structure into the production pipeline.',
      },
    ],

    author: 'Avani Enterprises',
  },

  {
    slug: 'landing-page-conversion-optimisation',
    title: 'Landing Page Conversion Optimisation: The Order to Fix Things In',
    category: 'Digital Marketing',
    tags: ['CRO', 'Landing Pages', 'Web'],

    excerpt:
      'Conversion problems have a hierarchy. Fixing button colours before fixing load time or message match wastes the effort. This is the order that works.',

    metaTitle: 'Landing Page Conversion Optimisation: Fix In This Order',
    metaDescription:
      'Landing page conversion optimisation in priority order: speed, message match, clarity, friction and proof. Fix the top of that list first, or nothing moves.',
    metaKeywords: [
      'landing page conversion optimisation',
      'CRO',
      'conversion rate',
      'landing page speed',
      'form friction',
    ],

    coverImage: '',

    keyTakeaways: [
      'Landing page conversion optimisation has a fixed order of operations, and work done out of order produces results you cannot attribute to anything.',
      'A page that loads slowly on a mobile network loses visitors before any copy, design or proof element has a chance to act on them.',
      'Message match — the page repeating the promise the ad made — is one of the most common reasons paid traffic lands and leaves without acting.',
      'Form length and completion rate trade off against each other, so every field you keep should be one your sales process genuinely uses.',
      'A/B testing belongs at the end of the list, because it can only refine a page that already gets the fundamentals right.',
    ],

    content: `<p><strong>Landing page conversion optimisation</strong> fails most often not because the changes were wrong, but because they were made in the wrong order. Teams start with button colours and headline variants on a page that takes seven seconds to load on a 4G connection, then conclude that testing does not work. It works fine. It just cannot outrun a broken foundation.</p>

<p>What follows is a sequence. Work down it, and do not move to the next step until the current one is genuinely handled. Each level constrains everything below it.</p>

<h2>Step 1 — Does the page load before the visitor gives up?</h2>
<p>This is first because nothing else can happen until it is true. A visitor arriving from a paid ad has no loyalty to you and no reason to wait, and on Indian mobile networks a page that is heavy on desktop broadband becomes unusable in a moving vehicle.</p>
<p>Three checks settle it. Test on a real mid-range Android device rather than a desktop emulator. Test on mobile data, not office Wi-Fi. And measure when the offer becomes readable and the form becomes usable, not when the browser stops spinning. Layout shift matters here too — a page where the button jumps as late assets load will lose taps to mis-clicks. Our <a href="/blog/core-web-vitals-inp-fix-guide">Core Web Vitals and INP guide</a> covers the interaction side, and the <a href="/blog/website-speed-optimisation-checklist-india">speed checklist</a> covers the payload side.</p>

<h2>Step 2 — Does the page say what the ad promised?</h2>
<p>Message match is the second step because it decides whether the visitor believes they are in the right place. If the ad said "GST-compliant billing software for distributors" and the page headline says "Modern business solutions", the visit is already lost regardless of how good the rest of the page is.</p>
<p>The test is mechanical. Read the ad headline, then read the page's first heading. If a stranger could not tell they belong together, rewrite the page heading to echo the ad. It is also why routing every campaign to the homepage tends to depress conversion rates and, separately, drags down your <a href="/blog/google-ads-quality-score-improvement">Google Ads Quality Score</a> — the visitor is left to hunt for the thing the ad mentioned, and hunting is work nobody signed up for.</p>

<h2>Step 3 — Is the offer clear within one screen?</h2>
<p>A visitor should be able to answer three questions without scrolling: what is this, who is it for, and what happens if I act. If any of the three requires scrolling or inference, the page is asking too much of someone who arrived thirty seconds ago.</p>
<p>Practical constraints that tend to help:</p>
<ul>
  <li>One primary action per page. A page offering a demo, a call, a download and a newsletter offers none of them convincingly.</li>
  <li>The headline states the outcome, the subheading states the mechanism, the button states the action in the visitor's words.</li>
  <li>Navigation menus on a paid landing page mostly leak traffic. Remove or reduce them.</li>
  <li>Any jargon in the first screen has to be jargon your buyer already uses.</li>
</ul>

<h2>Step 4 — How much friction is in the conversion itself?</h2>
<p>Each required field is one more reason to abandon the form, so it should collect only what the next step in your sales process actually consumes. If nobody ever reads the "how did you hear about us" answer, deleting that field costs you nothing and removes a step from the visitor's path.</p>
<p>Friction is not only field count. It includes:</p>
<ul>
  <li><strong>Fields requested too early.</strong> Company size and budget can be asked on the call. Name, contact and requirement are usually enough to start.</li>
  <li><strong>Phone number formats that reject valid Indian numbers</strong> — country codes, leading zeros and spaces all cause silent failures.</li>
  <li><strong>Captchas that fire on every submission</strong> rather than on suspicious ones.</li>
  <li><strong>No confirmation.</strong> A form that submits without visible acknowledgement makes people submit twice or assume it failed.</li>
  <li><strong>A single channel.</strong> Offering a WhatsApp option alongside the form suits buyers who would rather send a message than complete fields.</li>
</ul>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Getting traffic to the page but not enquiries from it?</h3>
  <p>Send us the URL and the ad that points at it. We will tell you which step in this list is costing you the most, and whether it is a build problem or a copy problem. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Step 5 — Does the page answer the objection the visitor already has?</h2>
<p>Proof comes fifth because it only matters once the visitor understands and wants the offer. Its job is narrow: to remove the specific doubt standing between interest and action, which for most Indian B2B and service buyers is one of three — will this actually work for a business like mine, what will it really cost, and who am I dealing with.</p>
<p>Answer those directly. A pricing range, even a wide one, tells a buyer whether you are in their bracket at all, which "contact us for pricing" does not. Named locations, a real address and a real team beat a stock photo. Specific, verifiable detail about what you have built is worth more than adjectives, which is why we keep <a href="/projects">our project work</a> and <a href="/case-studies">case studies</a> as separate, checkable pages rather than as claims on a sales page.</p>

<h2>Step 6 — What should you test, and when?</h2>
<p>Test last, and test only things large enough to produce a readable result at your traffic volume. Most Indian SMB landing pages do not receive enough traffic to settle a small A/B test in a reasonable window, which means the useful tests are big ones: a different headline promise, a different page structure, a form versus a WhatsApp-first flow.</p>
<p>If a test cannot reach a clear result before market conditions change underneath it, do not run it. Make the change on judgement, watch the trend, and put your measurement effort into <a href="/blog/attribution-modelling-for-indian-smbs">understanding which channels bring the visitors</a> instead — that question is usually worth more than a button test.</p>

<h2>What does landing page conversion optimisation look like as a checklist?</h2>
<p>Run through it top to bottom, and stop at the first level that is not genuinely handled — that is where your conversion rate is being lost:</p>
<ol>
  <li>Page is usable on a mid-range Android phone on mobile data, with no layout shift under the button.</li>
  <li>First heading echoes the promise of the ad or link that sent the visitor.</li>
  <li>What it is, who it is for and what happens next are all answerable without scrolling.</li>
  <li>One primary action, and a form that asks only for what the sales process uses.</li>
  <li>The main objection is answered on the page, with specifics rather than adjectives.</li>
  <li>Only now, test the large variables.</li>
</ol>
<p>Levels one, three and four are usually build work; levels two and five are usually copy. If the page is on a template that cannot be restructured, that constraint is itself the problem to fix — our <a href="/web-development-company">web development company</a> page explains how we approach landing page builds, and the <a href="/guides/website-development-cost-india">website development cost guide</a> gives realistic rupee ranges before you commit. For a checkout rather than a lead form, the sequence differs and our <a href="/ecommerce-development-company">ecommerce development</a> work picks up from there.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Rebuilding a landing page and want the order right first time?</h3>
  <p>We will walk through the six steps against your current page and tell you what to build, what to rewrite and what to leave. Free, and no obligation to hire us for the build.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'What is a good landing page conversion rate in India?',
        a: 'It varies so widely by industry, price point and traffic source that published benchmarks are close to useless for planning. Compare a page against its own previous performance and against other pages in your own account, which controls for your market and your traffic quality.',
      },
      {
        q: 'Should a paid landing page have the site navigation on it?',
        a: 'Usually not. Navigation gives a visitor who arrived for one specific thing several ways to leave without acting. Keep a logo, keep a footer with legal and contact details, and remove the rest.',
      },
      {
        q: 'How many form fields is too many?',
        a: 'Any field your sales process does not actually use is too many. Beyond that, ask only what you need to make first contact useful. Qualification questions can move to the call or to a second step after the initial submission.',
      },
      {
        q: 'Does adding a WhatsApp button hurt form submissions?',
        a: 'It tends to move some conversions from one channel to the other rather than adding friction, and where an audience prefers messaging the total number of enquiries can rise. Track both channels as conversions so the shift does not read as a drop.',
      },
      {
        q: 'Is one landing page per campaign necessary?',
        a: 'One page per distinct promise, which often means one per ad group rather than one per campaign. If two ad groups make materially different promises, they need different pages for message match to hold.',
      },
      {
        q: 'Where does A/B testing fit for a low-traffic site?',
        a: 'Last, and only for large changes. With modest traffic, a small test will not resolve before conditions change. Fix speed, message match, clarity and friction on judgement first, and reserve testing for structural decisions.',
      },
    ],

    author: 'Avani Enterprises',
  },

  {
    slug: 'attribution-modelling-for-indian-smbs',
    title: 'Attribution Modelling for Indian SMBs, Without the Jargon',
    category: 'Digital Marketing',
    tags: ['Analytics', 'Attribution', 'India'],

    excerpt:
      'Attribution decides which marketing gets credit for a sale. Here is what the models do, why they disagree, and what to use when your buyer rings instead of clicking.',

    metaTitle: 'Attribution Modelling for Indian SMBs, Explained',
    metaDescription:
      'Attribution modelling explained for Indian SMBs: what each model does, why numbers never reconcile, and how to credit offline calls and WhatsApp enquiries.',
    metaKeywords: [
      'attribution modelling',
      'marketing attribution India',
      'data-driven attribution',
      'GA4 attribution',
      'multi-touch attribution',
    ],

    coverImage: '',

    keyTakeaways: [
      'Attribution modelling is a set of rules for assigning credit for a conversion across the touchpoints that preceded it, and every model is a simplification rather than a truth.',
      'Your ad platforms and your analytics will never agree, because they use different conversion windows, different attribution rules and different definitions of a session.',
      'For Indian SMBs where a large share of enquiries arrive by phone or WhatsApp, the biggest attribution gain comes from capturing the source at the point of enquiry, not from changing models.',
      'A holdout test — turning a channel off and watching what happens to total enquiries — answers the incrementality question that no attribution model can.',
      'Pick one model as your reporting standard, state it on every report, and change it rarely, because switching models rewrites history and destroys comparability.',
    ],

    content: `<p><strong>Attribution modelling</strong> is the set of rules you use to decide which piece of marketing gets credit when someone buys. That is the whole idea. Everything else — last click, data-driven, position-based, multi-touch — is a variation on how the credit gets divided between the things the buyer saw before they acted.</p>

<p>It matters because budget follows credit. If your model gives all the credit to the last click, and the last click is nearly always a brand search, you will conclude that brand search is your best channel and quietly defund everything that made people search for you in the first place. This post is a plain-language walk through the models, the reasons the numbers never reconcile, and what to do about the large share of Indian enquiries that never touch a tracked click at all.</p>

<h2>What does attribution modelling actually do?</h2>
<p>It divides one conversion between several touchpoints according to a fixed rule. If a buyer saw an Instagram ad, later clicked a Google Search ad, then returned directly a week later and enquired, the conversion is one event with three touchpoints, and the model decides who gets what share of it.</p>

<div class="post-table-wrap">
<table>
  <thead>
    <tr>
      <th>Model</th>
      <th>How credit is split</th>
      <th>What it is good for</th>
      <th>How it misleads</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Last click</td>
      <td>All credit to the final click before conversion</td>
      <td>Simple, stable, easy to explain to a founder</td>
      <td>Over-credits brand search and retargeting; under-credits everything that creates demand</td>
    </tr>
    <tr>
      <td>First click</td>
      <td>All credit to the first recorded interaction</td>
      <td>Understanding what starts the journey</td>
      <td>Ignores everything that closed the sale, including the offer that finally worked</td>
    </tr>
    <tr>
      <td>Linear</td>
      <td>Equal share to every touchpoint</td>
      <td>Showing the full path without arguing about weighting</td>
      <td>Treats a passive impression as equal to a high-intent search</td>
    </tr>
    <tr>
      <td>Position-based</td>
      <td>Weighted towards the first and last touch, remainder spread between</td>
      <td>Businesses with a long consideration period and a clear discovery point</td>
      <td>The weighting is an assumption, not a measurement</td>
    </tr>
    <tr>
      <td>Time decay</td>
      <td>More credit to touchpoints closer to conversion</td>
      <td>Short sales cycles and promotional pushes</td>
      <td>Systematically undervalues awareness activity</td>
    </tr>
    <tr>
      <td>Data-driven</td>
      <td>Credit assigned from observed paths in your own account</td>
      <td>Accounts with enough conversion volume for the model to learn</td>
      <td>Opaque; needs volume; still cannot see untracked offline touchpoints</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Why do Google Ads, Meta and GA4 never agree?</h2>
<p>Because each one is answering a slightly different question with its own rules, and none of them is wrong. Four differences account for most of the gap:</p>
<ul>
  <li><strong>Conversion windows.</strong> Each platform counts conversions within its own lookback period, and those periods differ. A conversion that falls inside one window and outside another appears in one report only.</li>
  <li><strong>Attribution rules.</strong> Ad platforms credit themselves for conversions they consider theirs, including view-through in some cases. Analytics tools apply a single cross-channel model.</li>
  <li><strong>Date assignment.</strong> Ad platforms usually report a conversion against the date of the click; analytics tools report against the date of the conversion. Over a month those look different.</li>
  <li><strong>Identity.</strong> Cross-device and consent-related gaps are handled differently by each system.</li>
</ul>
<p>The practical response is to stop trying to reconcile them. Use each platform's own numbers to optimise inside that platform, and use one single source — usually your analytics or your CRM — as the business number. Do not add platform-reported conversions together; you will double-count. If your reporting currently does exactly that, our <a href="/blog/seo-reporting-that-a-founder-can-read">post on founder-readable reporting</a> covers how to restructure it.</p>

<h2>Which attribution model should an Indian SMB use?</h2>
<p>Start with last click as the reporting standard, because it is stable, cheap to maintain and impossible to misread — then use holdout tests, not a fancier model, to correct for what it undervalues. Sophistication in the model is not where small accounts gain; completeness of the data is.</p>
<p>The reason is volume. Data-driven attribution needs enough conversion paths to learn from, and a business generating a modest number of monthly enquiries will not supply that. Feeding a thin dataset into a complex model produces confident numbers built on very little, which is worse than a simple model everyone understands.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Not sure which channel is actually bringing your enquiries?</h3>
  <p>We will look at how your enquiries are being tracked today and show you where the credit is going missing. Free, and no obligation to work with us afterwards.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>How do you attribute phone calls and WhatsApp enquiries?</h2>
<p>Capture the source at the moment of enquiry, because no model can attribute a touchpoint it never saw. For many Indian SMBs a substantial share of qualified enquiries arrives by phone, WhatsApp or a direct walk-in, and those are invisible to click-based attribution unless you deliberately record them.</p>
<p>Three mechanisms cover most of it:</p>
<ol>
  <li><strong>Distinct numbers or links per channel.</strong> A separate WhatsApp link or click-to-call number for each campaign attributes the enquiry without asking the customer anything.</li>
  <li><strong>A single field in your CRM.</strong> One mandatory "how did this come in" field, filled by whoever takes the enquiry, produces imperfect but directionally useful data — and it is free. Choosing the system to hold it is covered in our <a href="/blog/crm-for-small-business-india">CRM for small business</a> post, and <a href="/business-os">Business OS</a> is how we handle it for clients who want enquiry capture and pipeline in one place.</li>
  <li><strong>Offline conversion import.</strong> Passing qualified leads and closed deals back into the ad platforms lets bidding optimise on outcomes rather than form fills. This depends entirely on your <a href="/blog/ga4-setup-checklist-for-lead-generation">tracking setup being clean</a> at the point of capture.</li>
</ol>

<h2>What is a holdout test and why does it beat a model?</h2>
<p>A holdout test switches a channel off — or off in one region — and measures what happens to total enquiries, which answers the incrementality question that attribution models are structurally unable to answer. Attribution tells you which touchpoints appeared on the path. It cannot tell you which of them changed the outcome.</p>
<p>The classic example is brand search. Under last click it looks like your best-performing channel by a wide margin. Pause it for a defined period and watch total enquiries: if they barely move, most of those conversions were arriving anyway and the budget belongs elsewhere. Run holdouts one channel at a time, over a period long enough to cover your normal sales cycle, and avoid festival weeks when baseline demand shifts on its own.</p>

<h2>How should attribution change your budget decisions?</h2>
<p>Use attribution to see the shape of the journey, use holdouts to decide what to fund, and judge the whole account on total qualified enquiries against total spend rather than on any single channel's reported return. That combined view is the one that survives contact with reality, and it is how our <a href="/digital-marketing-company">digital marketing company</a> reports across paid, organic and social rather than defending each channel separately.</p>
<p>Two habits keep it honest. Pick one model, name it on every report, and change it rarely — switching models rewrites history and makes month-on-month comparison meaningless. And separate the demand-creating channels from the demand-capturing ones in your own head: search and retargeting mostly harvest intent, while social, video and <a href="/seo-company">organic search visibility</a> mostly create it. Judging a demand-creating channel on last-click return will always end with you cutting it, and then wondering why the harvest thinned. Budget-splitting mechanics are covered further in our <a href="/blog/marketing-budget-allocation-indian-smb">marketing budget allocation</a> post.</p>

<p>This post is general information on measurement practice, not financial or legal advice. Where you collect and store customer contact data for attribution, check your obligations under Indian data protection law before you build the process.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want one number you can trust instead of four that disagree?</h3>
  <p>We will map your enquiry sources end to end and set up a single reporting standard your team can actually use. No obligation, and no jargon.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'What is the difference between attribution and incrementality?',
        a: 'Attribution divides credit among the touchpoints that appeared before a conversion. Incrementality asks whether the conversion would have happened anyway without that touchpoint. Only a holdout test or a controlled experiment can answer the second question.',
      },
      {
        q: 'Why does Meta report more conversions than GA4?',
        a: 'Meta counts conversions it attributes to itself within its own lookback window, including some view-through conversions, and reports them against the date of the ad interaction. GA4 applies a cross-channel model and reports against the conversion date. Both can be correct under their own definitions.',
      },
      {
        q: 'Is data-driven attribution better than last click?',
        a: 'It is more nuanced when there is enough conversion volume for it to learn from. For a business with a modest number of monthly conversions, last click plus deliberate offline capture usually produces more reliable decisions than a complex model on thin data.',
      },
      {
        q: 'How do I track offline conversions from Google Ads?',
        a: 'Capture the click identifier when the lead is created, store it against the record in your CRM, and import the qualified or closed status back into Google Ads. That lets bidding optimise towards outcomes rather than form submissions.',
      },
      {
        q: 'How long should a holdout test run?',
        a: 'At least one full sales cycle, and long enough to include a normal range of demand rather than a single unusual week. Avoid festival periods and any window where you are also changing pricing or creative, since those confound the result.',
      },
      {
        q: 'Should each channel have its own attribution model?',
        a: 'No. Use one model as the business standard so the numbers stay comparable, and use each platform native reporting only for in-platform optimisation. Mixing models across channels makes budget comparison impossible.',
      },
    ],

    author: 'Avani Enterprises',
  },
];
