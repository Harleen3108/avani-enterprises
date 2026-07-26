/**
 * Drip blog queue — part 3
 * Theme: technical SEO fundamentals.
 *
 * Loaded by scripts/seedDripBlogPosts.js in numeric filename order.
 * readTime and canonical are computed by the seeder — do not set them here.
 */

module.exports = [
  // ---------------------------------------------------------------------------
  // 1. Core Web Vitals — INP
  // ---------------------------------------------------------------------------
  {
    slug: 'core-web-vitals-inp-fix-guide',
    title: 'Core Web Vitals: How to Diagnose and Fix a Poor INP Score',
    category: 'SEO',
    tags: ['Technical SEO', 'Core Web Vitals', 'Performance', 'India'],

    excerpt:
      'INP replaced FID and broke a lot of previously passing sites. Here is how to read the metric, find the interaction that is slowing you down, and fix it.',

    metaTitle: 'INP Core Web Vitals: Diagnose and Fix a Poor Score',
    metaDescription:
      'A practical guide to INP Core Web Vitals: what the metric measures, how to find the interaction that is failing, and the fixes that move the number.',
    metaKeywords: [
      'INP Core Web Vitals',
      'Interaction to Next Paint',
      'fix poor INP score',
      'Core Web Vitals India',
      'page experience',
    ],

    coverImage: '',

    keyTakeaways: [
      'INP measures the time from a user interaction to the next frame the browser paints, so unlike FID it keeps counting through your event handler and the rendering work it triggers.',
      'Google treats an INP of 200 milliseconds or less as good and anything above 500 milliseconds as poor, measured at the 75th percentile of real visits.',
      'A Lighthouse run cannot fail INP for you, because Lighthouse does not interact with the page — only field data from real users can.',
      'Most INP failures come from one interaction on one template, usually a filter, a menu, a search box or an add-to-cart button, not from the whole site.',
      'Search Console reports Core Web Vitals on a 28-day rolling window, so a genuine fix takes weeks to show up fully even when it worked on day one.',
    ],

    content: `<p>INP Core Web Vitals failures are a common reason a site that passed page experience last year does not pass today. Interaction to Next Paint replaced First Input Delay in March 2024, and it measures something far harder to game: how long your page takes to visibly respond after someone taps or clicks. This guide covers what the metric counts, how to locate the interaction dragging your score down, and the fixes that move it.</p>

<h2>What does INP measure that FID did not?</h2>
<p>INP measures the entire span from a user's interaction to the next frame the browser paints, while FID only measured the delay before the browser began running the event handler. That single difference explains why so many sites regressed overnight. FID stopped its stopwatch the moment your handler started, so a page could score beautifully while feeling completely unresponsive. INP keeps counting through the handler, through any layout and style work it causes, and stops only when the screen actually changes.</p>
<p>The second difference matters just as much. FID looked only at the first interaction; INP considers every interaction across the visit and reports approximately the worst one. So a page can load flawlessly, pass LCP with room to spare, and still fail INP because of a filter dropdown someone opens forty seconds in.</p>

<h2>What counts as a good INP Core Web Vitals score?</h2>
<p>Google treats an INP of 200 milliseconds or less as good, 200 to 500 milliseconds as needing improvement, and anything above 500 milliseconds as poor. The assessment is made at the 75th percentile of page loads, which means three quarters of your real visits have to clear the threshold before a URL group is marked as passing.</p>
<table>
  <thead>
    <tr><th>INP at 75th percentile</th><th>Google's rating</th><th>What the user feels</th></tr>
  </thead>
  <tbody>
    <tr><td>200 ms or less</td><td>Good</td><td>The interface reacts as fast as the finger moves</td></tr>
    <tr><td>Above 200 ms up to 500 ms</td><td>Needs improvement</td><td>A perceptible lag; users start tapping twice</td></tr>
    <tr><td>Above 500 ms</td><td>Poor</td><td>The page reads as broken or frozen</td></tr>
  </tbody>
</table>
<p>The 75th percentile is the part people miss. Your own device on office fibre is not the 75th percentile of your traffic. If a meaningful share of your visitors are on mid-range Android handsets on patchy mobile data — normal for most Indian consumer sites — that segment decides whether you pass.</p>

<h2>Why does INP look fine in Lighthouse but bad in Search Console?</h2>
<p>Because Lighthouse never touches your page. It loads the URL and measures load performance, but it does not click, tap, type or scroll, so it cannot produce a real INP value at all. Search Console reports field data from the Chrome User Experience Report, collected from actual Chrome users who did interact.</p>
<p>So an INP investigation has to start in the field and end in the lab. Use Search Console to identify which URL groups are failing, then reproduce the interaction locally in the Chrome DevTools Performance panel. Reversing that order wastes days optimising interactions nobody performs.</p>

<h2>Which part of the interaction is actually slow?</h2>
<p>Every INP measurement splits into three phases, and the fix is completely different depending on which one dominates. Measure before you optimise, because the three phases have almost nothing in common.</p>
<table>
  <thead>
    <tr><th>Phase</th><th>What is happening</th><th>Typical cause when it dominates</th></tr>
  </thead>
  <tbody>
    <tr><td>Input delay</td><td>The browser is busy and cannot start your handler yet</td><td>Long tasks from third-party scripts, hydration, or analytics firing on load</td></tr>
    <tr><td>Processing time</td><td>Your event handlers are running</td><td>Heavy synchronous work: filtering large arrays, re-rendering a whole list, synchronous storage reads</td></tr>
    <tr><td>Presentation delay</td><td>The browser is doing style, layout and paint before the next frame</td><td>Enormous DOM, complex CSS selectors, layout thrash, animating properties that trigger layout</td></tr>
  </tbody>
</table>
<p>In our experience input delay dominates on marketing sites loaded with tag managers and chat widgets, while processing time dominates on listing pages that re-render on every filter change.</p>

<h2>How do you find the interaction causing the problem?</h2>
<p>Work from the failing URL group down to a single element, in this order:</p>
<ol>
  <li>In Search Console, open the Core Web Vitals report and note which URL groups fail INP on mobile. Groups are samples — open the example URLs, then check other templates sharing the same components.</li>
  <li>Install the web-vitals JavaScript library with attribution enabled, or use a real user monitoring tool that captures it. Attribution reports the element selector, the event type and the phase breakdown for the worst interaction.</li>
  <li>Reproduce that interaction in Chrome DevTools with CPU throttling set to a 4x or 6x slowdown, which approximates a mid-range phone, and look for long tasks in the flame chart.</li>
  <li>Expand the long task. You will usually find one function, one library, or one third-party script accounting for most of it.</li>
</ol>
<p>Almost every INP problem we look at resolves to one interaction on one shared component, so fixing that component fixes several URL groups at once.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Not sure which interaction is failing on your site?</h3>
  <p>Send us the URL and we will look at where the INP failure is coming from and what it would take to fix. No obligation and no sales script.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>How do you actually fix a poor INP?</h2>
<p>Fix INP by giving the browser a chance to paint before you do your expensive work, and by having less expensive work to do. Those are the only two levers, and everything below is a version of one of them.</p>

<h3>Break long tasks and yield to the main thread</h3>
<p>A task longer than 50 milliseconds blocks every interaction that arrives during it. Split heavy work into chunks and yield between them, so the browser can process the input queue and paint. Modern Chrome exposes scheduler.yield for exactly this; a setTimeout of zero is the older fallback.</p>

<h3>Paint the visual response first, compute afterwards</h3>
<p>When someone taps a filter, show the pressed and loading states immediately, then run the filtering. Users judge responsiveness by the first visible change, and INP measures the same thing. Reordering work often beats making it faster.</p>

<h3>Audit third-party scripts ruthlessly</h3>
<p>Chat widgets, heatmap recorders, A/B testing snippets and multiple analytics tags all execute on the main thread and all compete with your interface. Load what you can after interaction, remove anything nobody reads reports from, and treat every new tag as a performance decision rather than a marketing one. This is usually where the fastest wins sit.</p>

<h3>Stop re-rendering more than you changed</h3>
<p>On React and similar frameworks, a filter change that re-renders hundreds of items will blow past 200 milliseconds on a mid-range phone however clean the code is. Memoise, virtualise long lists, and keep state close to the component that owns it. If your stack fights you on this, it is a structural problem rather than a tuning one — something we cover when rebuilding sites through our <a href="/web-development-company">web development team</a>.</p>

<h3>Shrink the DOM and simplify the CSS</h3>
<p>Presentation delay grows with the size of the DOM the browser has to lay out. Deeply nested markup from page builders, and CSS with expensive descendant selectors, both extend the frame the user is waiting for. Animate transform and opacity rather than properties that force layout.</p>

<h2>Does fixing INP actually improve rankings?</h2>
<p>Core Web Vitals are a genuine but small ranking signal, and no amount of performance work will outrank better content on the same query. What performance reliably does is protect the conversions you already earn, because slow interfaces lose people at the moment they were about to act. Treat INP as a revenue metric with a modest search benefit, not the other way round — the framing we use when planning work with our <a href="/seo-company">SEO team</a>.</p>
<p>If your pages are not indexed at all, INP is irrelevant until that is sorted, which is why we run our <a href="/guides/why-google-is-not-indexing-my-pages">indexing diagnostic</a> first and only then look at performance. Our wider <a href="/blog/website-speed-optimisation-checklist-india">website speed checklist for Indian sites</a> covers the load-time side that INP does not touch.</p>

<h2>How long before Search Console shows the improvement?</h2>
<p>Search Console reports Core Web Vitals on a 28-day rolling window, so a fix deployed today only becomes fully visible roughly four weeks later. You will see the trend line bend within days, but the pass or fail verdict changes slowly by design.</p>
<p>That lag makes it essential to verify the fix independently rather than waiting on the report. Confirm in DevTools that the long task is gone, confirm in your real user monitoring that the field 75th percentile is dropping, and use Search Console only as final confirmation. Our post on <a href="/blog/google-search-console-fix-common-issues">fixing common Search Console issues</a> explains which reports update quickly and which do not.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want the INP work done rather than diagnosed?</h3>
  <p>We fix Core Web Vitals failures at the code level — third-party audit, task splitting, render work and all. Tell us what you are running and we will scope it honestly, including when the answer is that it is not worth doing.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'What is a good INP score?',
        a: 'An INP of 200 milliseconds or less at the 75th percentile of page loads is rated good by Google. Between 200 and 500 milliseconds needs improvement, and above 500 milliseconds is poor. The 75th percentile matters because it is decided by your slower real visitors, not by your own device.',
      },
      {
        q: 'Why can Lighthouse not measure INP?',
        a: 'Lighthouse loads a page but never interacts with it, and INP only exists once a user clicks, taps or types. Lighthouse can flag related diagnostics such as long main-thread tasks, but the actual INP number has to come from field data in the Chrome User Experience Report or from real user monitoring on your own site.',
      },
      {
        q: 'Does INP affect Google rankings?',
        a: 'INP is part of Core Web Vitals, which Google uses as a ranking signal. It is a modest signal and will not lift a page above stronger, more relevant content. The stronger business case for fixing INP is that unresponsive interfaces lose users at the point of action.',
      },
      {
        q: 'How do I find which element is causing a poor INP?',
        a: 'Use the web-vitals JavaScript library with attribution enabled, or a real user monitoring tool that reports it. Attribution returns the element selector, the event type and the split between input delay, processing time and presentation delay, which tells you both where and which kind of fix is needed.',
      },
      {
        q: 'How long does it take for an INP fix to show in Search Console?',
        a: 'Search Console evaluates Core Web Vitals over a 28-day rolling window, so full effect takes about four weeks to appear even if the fix worked immediately. Verify the improvement in DevTools and in your own field data first, and treat Search Console as confirmation rather than the primary measurement.',
      },
    ],

    author: 'Avani Enterprises',
  },

  // ---------------------------------------------------------------------------
  // 2. Hreflang for Indian multi-language sites
  // ---------------------------------------------------------------------------
  {
    slug: 'hreflang-multi-language-india-sites',
    title: 'Hreflang for Indian Multi-Language Sites',
    category: 'SEO',
    tags: ['Technical SEO', 'Hreflang', 'International SEO', 'India'],

    excerpt:
      'Hreflang tells Google which language version to serve, not which one to rank. Here is when an Indian site actually needs it and the rules that break most setups.',

    metaTitle: 'Hreflang India: Multi-Language Site Setup Guide',
    metaDescription:
      'Hreflang India setup explained: which language codes to use, where the tags belong, the return-link rule, and when your site does not need hreflang at all.',
    metaKeywords: [
      'hreflang India',
      'hreflang tags',
      'multi language website SEO',
      'Hindi website SEO',
      'international SEO India',
    ],

    coverImage: '',

    keyTakeaways: [
      'Hreflang does not influence rankings — it tells Google which language or regional version of an already-ranking page to show a given user.',
      'Every hreflang annotation must be reciprocal: if page A lists page B, page B must list page A, or Google ignores the whole set.',
      'A site that exists only in English does not need hreflang, no matter how many countries it sells to.',
      'Hreflang and canonical tags must agree — a page that canonicalises to its English version cancels its own hreflang annotation.',
      'Only self-canonical, indexable, 200-status URLs belong in hreflang; redirects and noindex pages invalidate the cluster.',
    ],

    content: `<p>Questions about hreflang India usually come from one of two situations: a business that has just launched Hindi or Tamil versions of its pages and wants Google to serve the right one, or a business that already has them and is watching the wrong language rank in the wrong place. Hreflang solves the second problem and only the second problem. This guide covers what the annotation actually does, which codes apply to Indian languages, where the tags belong, and the small set of rules that quietly break most implementations.</p>

<h2>What does hreflang actually do?</h2>
<p>Hreflang tells Google that several URLs are the same content in different languages or for different regions, so it can swap in the appropriate version for each user. It does not translate anything, it does not make a page rank, and it does not stop the pages competing on merit. It is a substitution instruction applied after ranking has already been decided.</p>
<p>The second thing it does is quieter but often more valuable: it tells Google the pages are alternates rather than duplicates. Without it, two near-identical English pages for India and Singapore look like a duplicate content problem, and Google may pick one and drop the other. With it, both stay eligible and get shown to the right audience.</p>

<h2>Where does hreflang for India actually apply?</h2>
<p>Hreflang applies when the same content exists at more than one URL in more than one language or for more than one country. If your site has a single English version, you do not need hreflang at all, regardless of how many countries you serve. Three situations genuinely warrant it on Indian sites:</p>
<ul>
  <li><strong>Genuine multi-language sites.</strong> The same product or service pages published in English and one or more Indian languages, each at its own URL.</li>
  <li><strong>India and export markets.</strong> Separate English pages for India and for another English-speaking market, differing in pricing, currency, shipping or compliance wording.</li>
  <li><strong>Regional content variants.</strong> Near-duplicate pages that differ only by state or city context and would otherwise be treated as duplicates. This overlaps heavily with the questions covered in our post on <a href="/blog/multi-location-seo-india">multi-location SEO in India</a>.</li>
</ul>
<p>Machine-translated pages with no editorial review are a separate matter. Hreflang will happily point at them, but thin auto-translated content is exactly the sort of scaled output that Google's spam policies target, so the annotation buys you nothing if the translation is not genuinely usable. If you are using AI in the drafting stage, keep a human editor on every published language version — the working method we describe in our <a href="/ai-content-services">AI content services</a>.</p>

<h2>Which language codes should an Indian site use?</h2>
<p>Use ISO 639-1 two-letter language codes, optionally followed by an ISO 3166-1 Alpha 2 region code in capitals. The region part is optional and should only be added when you genuinely have a country-specific version.</p>
<table>
  <thead>
    <tr><th>Language</th><th>hreflang value</th><th>With India region targeting</th></tr>
  </thead>
  <tbody>
    <tr><td>English</td><td>en</td><td>en-IN</td></tr>
    <tr><td>Hindi</td><td>hi</td><td>hi-IN</td></tr>
    <tr><td>Bengali</td><td>bn</td><td>bn-IN</td></tr>
    <tr><td>Marathi</td><td>mr</td><td>mr-IN</td></tr>
    <tr><td>Tamil</td><td>ta</td><td>ta-IN</td></tr>
    <tr><td>Telugu</td><td>te</td><td>te-IN</td></tr>
    <tr><td>Gujarati</td><td>gu</td><td>gu-IN</td></tr>
    <tr><td>Kannada</td><td>kn</td><td>kn-IN</td></tr>
    <tr><td>Malayalam</td><td>ml</td><td>ml-IN</td></tr>
    <tr><td>Punjabi</td><td>pa</td><td>pa-IN</td></tr>
    <tr><td>Any unmatched language</td><td>x-default</td><td>Not applicable</td></tr>
  </tbody>
</table>
<p>Two mistakes recur here. The first is inventing codes — there is no valid in, ind or hin-IN. The second is adding a region code when you have no regional variant, which narrows your targeting for no benefit: hi-IN will not be served to a Hindi speaker in Dubai, but plain hi will.</p>

<h2>Where should the hreflang tags live?</h2>
<p>You can implement hreflang in the HTML head, in the HTTP response header, or in your XML sitemap, and you must pick exactly one method per site. Using two methods at once is a common source of contradictory annotations.</p>
<ul>
  <li><strong>HTML head link elements.</strong> The most readable option and the easiest to verify by hand. It adds weight to every page, which matters once you have more than a handful of language versions.</li>
  <li><strong>XML sitemap.</strong> The right choice for large sites, because the annotations live in one generated file instead of being duplicated across thousands of pages. It is also the hardest to eyeball, so it needs automated validation.</li>
  <li><strong>HTTP headers.</strong> The only option for non-HTML files such as PDFs.</li>
</ul>
<p>Whichever you choose, the annotations have to be generated from a single source of truth. Hand-maintained hreflang breaks the first time someone adds a page, which is why this belongs in the build layer rather than a plugin — the sort of thing our <a href="/web-development-company">web development team</a> wires into the templates when a multi-language site is built.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Launching your site in a second language?</h3>
  <p>We will review your URL structure and hreflang plan before you build, which is far cheaper than fixing it afterwards. No obligation, and we will say so if you do not need hreflang at all.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What are the rules that break most implementations?</h2>
<p>Five rules account for most of the broken hreflang setups we see, and all five are absolute rather than advisory.</p>
<ol>
  <li><strong>Return links must be reciprocal.</strong> If the Hindi page lists the English page, the English page must list the Hindi page. Google discards annotations that are not confirmed from the other side, and a single missing return link can invalidate an entire cluster.</li>
  <li><strong>Every page must reference itself.</strong> The set of annotations on each page includes an entry pointing at that page. A cluster of four language versions has four entries on all four pages, not three.</li>
  <li><strong>URLs must be absolute.</strong> Relative paths in hreflang are not reliably resolved. Include the protocol and the host.</li>
  <li><strong>Canonical and hreflang must agree.</strong> Each language version must be self-canonical. If the Hindi page canonicalises to the English page, you have told Google the Hindi page should not be indexed and simultaneously asked it to be served to Hindi users. Google resolves that contradiction by ignoring you. We unpack the wider version of this failure in our post on <a href="/blog/canonical-tags-common-mistakes">canonical tag mistakes</a>.</li>
  <li><strong>Only indexable URLs qualify.</strong> Pages that redirect, return a 404, are blocked in robots.txt or carry noindex cannot participate. Point at the final URL, always.</li>
</ol>

<h2>What is x-default for, and does an Indian site need one?</h2>
<p>The x-default value marks the page to serve when no other annotation matches the user's language or region. It is optional, but it is the correct home for a language selector page or for the English version you want unmatched international users to land on.</p>
<p>On a site serving India in English plus two or three Indian languages, pointing x-default at the English version is usually right, because English is the fallback most unmatched visitors can read. What x-default is not is a wildcard that excuses missing annotations — it does not substitute for listing each version explicitly.</p>

<h2>Should you use subfolders, subdomains or separate domains?</h2>
<p>Subfolders are the default answer for almost every Indian multi-language site, because they keep all authority on one domain and need no additional configuration. A URL structure of example.in/hi/ is simpler to run, simpler to measure and simpler to migrate than hi.example.in or a separate country domain.</p>
<p>Separate country domains make sense only when you have a genuinely separate business in that market — local entity, local support, local payment. They cost you a fresh start on authority in exchange for a clear geographic signal, and that trade is rarely worth it for a company whose customers are all in India. If you are weighing this alongside a larger rebuild, our <a href="/seo-company">SEO team</a> usually models it against the migration risk before anyone commits.</p>

<h2>How do you verify hreflang is working?</h2>
<p>Verify hreflang by crawling the site and checking that every annotation resolves to a 200-status, self-canonical, indexable URL that returns the link. Google Search Console retired its International Targeting report, so validation now happens in your crawler and in your own testing.</p>
<ul>
  <li>Crawl with a tool that reports hreflang clusters and flags missing return links, non-200 targets and canonical conflicts.</li>
  <li>Check that no annotation points at a redirecting URL — a http to https redirect left in an old annotation is the classic case.</li>
  <li>Confirm the pages are genuinely different content. Duplicate pages under different language codes create the exact problem covered in our guide to <a href="/blog/duplicate-content-issues-how-to-fix">finding and fixing duplicate content</a>.</li>
  <li>Search for a distinctive phrase from each language version to confirm each one is indexed independently.</li>
</ul>
<p>Hreflang is not something you configure once and forget. Every new page, every URL change and every redirect touches the cluster, so validation belongs in your regular technical crawl rather than in a launch checklist.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Hreflang already live and not behaving?</h3>
  <p>Send us the domain and we will crawl the clusters, tell you which annotations are likely being discarded and why, and what the fix involves. There is no obligation attached.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'Does hreflang improve rankings?',
        a: 'No. Hreflang decides which language or regional version of a page is shown to a user after ranking has been determined. Its indirect benefit is that it stops near-identical language versions being treated as duplicates, which keeps each version eligible to appear.',
      },
      {
        q: 'Do I need hreflang if my site is only in English?',
        a: 'No. Hreflang is only relevant when the same content exists at more than one URL for different languages or countries. A single English site serving customers worldwide does not need it, however many markets it sells to.',
      },
      {
        q: 'Should I use hi or hi-IN for a Hindi page?',
        a: 'Use plain hi unless you have a separate Hindi version specifically for another country. Adding the IN region code restricts the annotation to users Google places in India, so a Hindi speaker elsewhere would not be served that version.',
      },
      {
        q: 'Can hreflang and canonical tags conflict?',
        a: 'Yes, and it is one of the most common failures. Each language version must canonicalise to itself. If a Hindi page canonicalises to its English equivalent, you are telling Google not to index it while also asking for it to be served, and Google ignores the annotation.',
      },
      {
        q: 'Is machine translation acceptable for hreflang pages?',
        a: 'Hreflang works technically with machine-translated pages, but unreviewed machine translation at scale is the kind of low-value output Google spam policies target. Have a native speaker review anything you publish, particularly product, pricing and support pages.',
      },
      {
        q: 'Where should hreflang tags be placed?',
        a: 'In the HTML head, in the XML sitemap, or in HTTP headers — but only one of the three per site. Sitemaps suit large sites because annotations live in one generated file; head tags suit smaller sites and are easier to verify manually.',
      },
    ],

    author: 'Avani Enterprises',
  },

  // ---------------------------------------------------------------------------
  // 3. Crawl budget
  // ---------------------------------------------------------------------------
  {
    slug: 'crawl-budget-optimisation-large-sites',
    title: 'Crawl Budget: What It Is and When You Should Care',
    category: 'SEO',
    tags: ['Technical SEO', 'Crawl Budget', 'Search Console', 'India'],

    excerpt:
      'Most sites never need to think about crawl budget. This explains what it is made of, how to tell whether yours is a genuine problem, and what to do if it is.',

    metaTitle: 'Crawl Budget Optimisation: When It Actually Matters',
    metaDescription:
      'Crawl budget optimisation explained: what crawl rate and crawl demand mean, how to spot a real problem in Crawl Stats, and the fixes worth making.',
    metaKeywords: [
      'crawl budget optimisation',
      'crawl budget',
      'Googlebot crawl rate',
      'crawl stats report',
      'large site SEO',
    ],

    coverImage: '',

    keyTakeaways: [
      'Crawl budget is the product of crawl rate limit, which is what your server can take, and crawl demand, which is how much Google wants your pages.',
      'Google states that sites under roughly a million pages, or under ten thousand pages that change daily, generally do not need to think about crawl budget.',
      'The real symptom of a crawl budget problem is new or updated pages taking a long time to be discovered, not a low number in a report.',
      'Faceted navigation, session parameters and infinite calendars generate unlimited URLs and are the single largest source of wasted crawling.',
      'A faster server response time directly raises the crawl rate Google is willing to use, so performance work and crawl work are the same work.',
    ],

    content: `<p>Crawl budget optimisation is one of the most over-applied ideas in technical SEO. It is a genuine constraint on very large sites and an almost total irrelevance on most others, yet it gets cited as the reason for work that would never pay for itself. This post covers what crawl budget is made of, how to establish whether your site has a real problem, and what to do when it does.</p>

<h2>What is crawl budget made of?</h2>
<p>Crawl budget is the combination of two things: crawl rate limit, which is how much crawling your server can tolerate, and crawl demand, which is how much Google actually wants to crawl your pages. Neither is a quota you are allocated, and neither is visible as a single number anywhere.</p>
<p><strong>Crawl rate limit</strong> is Google protecting your server. Googlebot watches how quickly your site responds and how often it errors. Fast, stable responses let it crawl harder; slow responses and 5xx errors make it back off, sometimes sharply.</p>
<p><strong>Crawl demand</strong> is Google deciding what is worth its time. Popular URLs, URLs that change often and URLs Google considers important get revisited more; stale, unlinked, low-value URLs get visited rarely or not at all. Demand is the half most people ignore, and the half that content quality and internal linking actually control.</p>

<h2>Does crawl budget optimisation apply to your site?</h2>
<p>For most sites, no. Google's own large site owner guidance says that sites with fewer than roughly a million unique pages, or fewer than about ten thousand pages that change daily, generally do not need to worry about crawl budget. If you run a services business with two hundred pages, crawl budget is not why anything is happening to you.</p>
<p>The exceptions worth taking seriously:</p>
<ul>
  <li>Large e-commerce catalogues, particularly with filters that generate URL combinations.</li>
  <li>Classifieds, listings, jobs and real estate sites where inventory changes constantly and freshness has commercial value.</li>
  <li>Programmatic or database-driven sites publishing templated pages at scale.</li>
  <li>Any site that has accidentally generated a very large number of URLs — far more common than genuine scale, and a bug rather than a budget problem.</li>
</ul>
<p>If your pages are not being indexed and you are under those thresholds, the cause is usually quality, duplication or a technical block. Our <a href="/guides/why-google-is-not-indexing-my-pages">guide to indexing problems</a> works through those causes in order, and is the right place to start before anyone mentions crawl budget.</p>

<h2>What are the symptoms of a real crawl budget problem?</h2>
<p>The reliable symptom is a growing lag between publishing or updating a page and Google discovering it, on a site large enough for that to be plausible. Everything else is circumstantial. Look for:</p>
<ul>
  <li>New pages taking weeks to appear while older pages of the same type were indexed quickly.</li>
  <li>Updated pages still showing old content in search results long after the change.</li>
  <li>Crawl Stats showing total requests flat or falling while your page count grows.</li>
  <li>A large share of crawl requests hitting URLs you do not care about — parameters, filters, internal search results.</li>
  <li>The Pages report shows a large and growing number of URLs in Discovered but currently not indexed.</li>
</ul>
<p>That last one is the honest signal. Discovered but currently not indexed means Google knows the URL exists and has chosen not to fetch it, which can be a scheduling decision or a quality judgement. Distinguishing the two is the actual diagnostic work.</p>

<h2>What wastes crawl budget?</h2>
<p>Crawl budget is wasted by URLs that exist, respond, and are worth nothing. In practice a small number of patterns produce nearly all of it:</p>
<ul>
  <li><strong>Faceted navigation.</strong> Filters combining into unique URLs multiply combinatorially. Colour, size, brand and sort order across a large catalogue can produce more URLs than you have products.</li>
  <li><strong>Session and tracking parameters.</strong> Every variant of a page with a different parameter string is a separate URL to Googlebot.</li>
  <li><strong>Internal search result pages.</strong> Unlimited in number and thin by nature.</li>
  <li><strong>Infinite calendars and endless paginated archives.</strong> A date widget with no upper bound is a crawl trap.</li>
  <li><strong>Redirect chains.</strong> Every hop is a request. A four-hop chain costs four times what it should.</li>
  <li><strong>Soft 404s.</strong> Pages returning 200 while showing nothing useful get crawled repeatedly because Google has no signal to stop.</li>
  <li><strong>Duplicate content.</strong> Multiple URLs serving the same content split crawling across all of them — covered in our post on <a href="/blog/duplicate-content-issues-how-to-fix">how to find and fix duplicate content</a>.</li>
</ul>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Not sure whether crawling is your bottleneck?</h3>
  <p>We will read your Crawl Stats and Pages reports and tell you plainly whether crawl budget is the issue or whether something else is holding indexing back. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>How do you read the Crawl Stats report?</h2>
<p>Open Search Console, go to Settings, then Crawl stats, and read four things in order: host status, total requests over time, the breakdown by response code, and the breakdown by purpose. The report covers the last ninety days at property level.</p>
<ul>
  <li><strong>Host status.</strong> If robots.txt fetch, DNS resolution or server connectivity show problems, fix those first. A crawl rate suppressed by server errors is an infrastructure problem, not a budget one.</li>
  <li><strong>By response.</strong> A healthy profile is dominated by 200s. Large blocks of 301s point at redirect debt; 404s at scale point at bad internal links or an old sitemap; any 5xx is urgent.</li>
  <li><strong>By purpose.</strong> Google splits crawling into discovery, meaning new URLs, and refresh, meaning revisits. A site publishing constantly but showing almost no discovery crawling has a real problem.</li>
  <li><strong>By file type.</strong> If a large share of requests are images, JavaScript or CSS, your budget is going on assets rather than pages, which points at caching and asset versioning.</li>
</ul>
<p>Server log analysis is the next level up and tells you what the report cannot: exactly which URLs Googlebot hit, how often, and in what order. On any site genuinely large enough to have a crawl budget problem, logs are worth the effort.</p>

<h2>How do you actually improve crawl efficiency?</h2>
<p>Improve crawl efficiency by removing worthless URLs from existence, then by making the URLs that remain cheaper and clearer to fetch. In roughly this priority order:</p>
<ol>
  <li><strong>Stop generating the URLs.</strong> The strongest fix for faceted navigation is not to create crawlable links for combinations nobody searches for. Render them without anchor tags.</li>
  <li><strong>Block genuine crawl traps in robots.txt.</strong> Internal search, session parameters and infinite calendars belong here — with the caveat below.</li>
  <li><strong>Fix redirect chains.</strong> Point every internal link and sitemap entry at the final destination, and collapse chains to a single hop.</li>
  <li><strong>Clean the XML sitemaps.</strong> Sitemaps should contain only canonical, indexable, 200-status URLs with accurate lastmod dates. An inaccurate lastmod teaches Google to distrust the file.</li>
  <li><strong>Improve internal linking.</strong> Crawl demand follows internal links, so pages buried five clicks deep with one inbound link get crawled accordingly — see our post on <a href="/blog/internal-linking-strategy-that-works">internal linking strategy</a>.</li>
  <li><strong>Speed up server response.</strong> Faster responses raise the crawl rate limit directly, the one lever that adds capacity rather than reallocating it.</li>
  <li><strong>Consolidate thin pages.</strong> Fewer, better pages get crawled more thoroughly than many weak ones.</li>
</ol>
<p>On large catalogues these decisions interact with commercial ones, so they are worth designing rather than patching. It is work we scope through our <a href="/seo-company">SEO team</a> alongside the <a href="/ecommerce-seo-services">e-commerce SEO</a> side, because the faceted navigation you block for crawling is often the navigation someone built to convert.</p>

<h2>Does blocking URLs in robots.txt save crawl budget?</h2>
<p>Yes for crawling, but with a catch that trips people up regularly. Disallowing a URL stops Googlebot fetching it, which does free capacity. It does not remove the URL from the index if that URL is already indexed or has external links pointing at it — Google can list it without ever seeing its contents.</p>
<p>The other catch is that a disallowed URL cannot pass its signals anywhere, because Google cannot read a canonical tag or follow a redirect on a page it is not allowed to fetch. If you want a duplicate consolidated, leave it crawlable; if you want it gone, use noindex and leave it crawlable until it drops out, then block it. Blocking first is the classic sequencing error.</p>

<h2>Does crawl budget affect how fast a new page ranks?</h2>
<p>Only indirectly. Crawling is a prerequisite for indexing, so a page that is never fetched cannot rank — but on a normal-sized site a page linked from your navigation and included in your sitemap gets crawled promptly regardless. If new pages are slow to rank on a small site, the constraint is relevance and authority rather than crawling. If they are slow to be discovered on a site with hundreds of thousands of URLs, crawl efficiency is a fair suspect, and the reports covered in our post on <a href="/blog/google-search-console-fix-common-issues">common Search Console issues</a> will usually confirm it.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Running a large catalogue or listings site?</h3>
  <p>We will map where Googlebot is spending its requests, which URL patterns are consuming them, and what changing that is worth in practice. Straight answers, no obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'What is crawl budget in SEO?',
        a: 'Crawl budget is the number of URLs Googlebot will fetch on your site in a given period. It is set by two factors: crawl rate limit, which is how much crawling your server can handle without degrading, and crawl demand, which is how much Google wants your pages based on their popularity and freshness.',
      },
      {
        q: 'How do I know if I have a crawl budget problem?',
        a: 'The reliable sign is new or updated pages taking unusually long to be discovered on a site large enough for that to be plausible. Check the Crawl Stats report for flat or declining requests, a large share of non-200 responses, and low discovery crawling, along with a growing Discovered but currently not indexed count.',
      },
      {
        q: 'How many pages before crawl budget matters?',
        a: 'Google guidance indicates that sites under roughly one million unique pages, or under about ten thousand pages changing daily, generally do not need to think about it. The common exception is a smaller site accidentally generating a huge number of URLs through filters or parameters, which is a bug rather than a scale issue.',
      },
      {
        q: 'Does robots.txt disallow remove pages from Google?',
        a: 'No. Disallow stops Googlebot fetching a URL but does not remove it from the index, and a blocked URL can still be listed if other pages link to it. To remove a page, use a noindex tag and leave the URL crawlable until Google has seen it drop out.',
      },
      {
        q: 'Does site speed affect crawl budget?',
        a: 'Yes, directly. Googlebot adjusts its crawl rate based on how quickly your server responds and whether it starts erroring. Reducing server response time raises the crawl rate Google is willing to use, which is the only lever that adds capacity instead of redistributing it.',
      },
    ],

    author: 'Avani Enterprises',
  },

  // ---------------------------------------------------------------------------
  // 4. Canonical tag mistakes
  // ---------------------------------------------------------------------------
  {
    slug: 'canonical-tags-common-mistakes',
    title: 'Canonical Tags: Five Mistakes That Quietly Cost You Rankings',
    category: 'SEO',
    tags: ['Technical SEO', 'Canonicalisation', 'Indexing', 'India'],

    excerpt:
      'A canonical tag is a hint, not a command, and a wrong one can remove good pages from the index without any warning. Five failures we see repeatedly, and how to audit for them.',

    metaTitle: 'Canonical Tag Mistakes That Cost You Rankings',
    metaDescription:
      'Five canonical tag mistakes that quietly de-index good pages, why Google sometimes ignores your canonical, and how to audit canonicalisation across a site.',
    metaKeywords: [
      'canonical tag mistakes',
      'rel canonical',
      'canonicalisation SEO',
      'duplicate URL',
      'technical SEO audit',
    ],

    coverImage: '',

    keyTakeaways: [
      'A canonical tag is a hint rather than a directive, so Google can and does choose a different canonical when your other signals disagree with it.',
      'A canonical pointing at a redirecting or 404 URL is worse than no canonical at all, because Google discards the signal and picks for itself.',
      'Canonicalising genuinely different pages to one URL removes the others from the index and is the fastest way to lose traffic by accident.',
      'noindex and rel canonical on the same page are contradictory instructions and should never appear together.',
      'A canonical tag injected by JavaScript may not be seen if a conflicting one already exists in the raw HTML.',
    ],

    content: `<p>Canonical tag mistakes are a frequent cause of accidental de-indexing, and they are easy to miss because nothing breaks visibly when you make one. The page still loads, the tag is still there, and the traffic quietly leaves. Below are the five failures we find most often in audits, what each one actually does to your index coverage, and how to check your own site for them.</p>

<h2>What does a canonical tag actually do?</h2>
<p>A canonical tag tells Google which URL you consider the master version of a set of duplicate or near-duplicate pages, so ranking signals consolidate onto one URL instead of splitting across several. It is a hint, not a directive. Google weighs it alongside your internal links, your sitemap, your redirects and the content itself, and it will override you when those signals contradict each other.</p>
<p>That distinction is the root of most of what follows. A robots noindex tag is obeyed. A 301 redirect is obeyed. A canonical is considered. If you need certainty, canonical is the wrong instrument.</p>

<h2>Mistake one: does every page canonicalise to the homepage?</h2>
<p>Yes, this happens, and it is the most destructive version of the problem. A site-wide canonical pointing every URL at the homepage tells Google that no other page on the site is worth indexing. Typically it is a template variable that was hard-coded during development, or a plugin setting nobody revisited after launch.</p>
<p>The symptom is a collapse in indexed pages while the site itself is perfectly healthy, and in Search Console it appears as large numbers of URLs marked Alternate page with proper canonical tag. If you have inherited a site and traffic dropped without an obvious cause, view the source of any three interior pages and read the canonical before you look at anything else.</p>

<h2>Mistake two: do your canonicals point at URLs that redirect or 404?</h2>
<p>A canonical pointing at a URL that redirects, 404s or is blocked in robots.txt is a broken signal, and Google discards it and picks a canonical itself. This is much more common than it sounds, because canonicals age badly. Someone migrates from http to https, or drops the www, or restructures a URL, and the redirects get updated while the hard-coded canonical values do not.</p>
<p>The result is a page that appears correctly configured but is in practice unmanaged. Google decides which of your duplicate URLs to index, and it may not agree with you. Every canonical should resolve directly to a 200-status URL with no redirect hop in between — the same rule that applies to sitemap entries and internal links.</p>

<h2>Mistake three: are you canonicalising pages that are not duplicates?</h2>
<p>Canonicalising genuinely different pages onto one URL removes them from the index, and this is where good traffic gets destroyed most quickly. Google follows the instruction, drops the alternates, and you lose every query those pages used to answer.</p>
<p>The pattern usually appears in a few recognisable places:</p>
<ul>
  <li><strong>Paginated series.</strong> Canonicalising page two of a listing to page one hides everything that only exists on page two. Paginated pages should be self-canonical.</li>
  <li><strong>Location and service variants.</strong> Distinct city pages canonicalised to a generic parent page removes exactly the pages built to rank locally.</li>
  <li><strong>Product variants with real differences.</strong> If sizes or configurations have genuinely different specifications, price and demand, they are separate pages.</li>
  <li><strong>Language versions.</strong> Canonicalising a Hindi page to its English equivalent cancels the hreflang relationship entirely, as covered in our post on <a href="/blog/hreflang-multi-language-india-sites">hreflang for Indian multi-language sites</a>.</li>
</ul>
<p>The working test: if a page could plausibly rank for a query the canonical target could not answer as well, it is not a duplicate.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Lost indexed pages and cannot see why?</h3>
  <p>We will crawl your site and tell you which canonical instructions are removing pages from the index, and which are doing their job. No obligation and no jargon.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Mistake four: do your canonical and your other signals disagree?</h2>
<p>Google treats canonicalisation as a weight of evidence, so when your canonical tag says one thing and your sitemap, internal links or redirects say another, Google resolves the conflict on its own terms. The conflicts to look for:</p>
<ul>
  <li><strong>Canonical versus sitemap.</strong> Including non-canonical URLs in the XML sitemap tells Google those URLs are the ones you want indexed. Sitemaps should carry canonical URLs only.</li>
  <li><strong>Canonical versus internal links.</strong> If every internal link points at the parameterised or trailing-slash variant while the canonical points elsewhere, your links are voting against your tag.</li>
  <li><strong>Canonical plus noindex.</strong> These are contradictory. Canonical says consolidate signals onto another URL; noindex says remove this page entirely. Google has advised against combining them, and the outcome is unpredictable. Pick one.</li>
  <li><strong>Canonical versus 301.</strong> Redirecting a URL and also canonicalising it elsewhere is redundant at best. If a redirect is in place, the canonical on the source page is never read.</li>
  <li><strong>Cross-domain canonicals.</strong> Valid and occasionally correct for syndication, but a frequent accident on staging environments that were never de-indexed.</li>
</ul>

<h2>Mistake five: are your canonicals relative, or added by JavaScript?</h2>
<p>Relative canonical URLs and JavaScript-injected canonicals both fail in ways that are hard to spot in a browser. Always use absolute URLs including protocol and host. A relative canonical resolves against the current URL, so on a page reachable at several paths it produces a different canonical each time — the opposite of its purpose.</p>
<p>JavaScript-injected canonicals are riskier still. Google can process JavaScript, but if the raw HTML already contains a canonical tag and your script adds or changes one, the two may conflict and the original often wins. If the canonical matters, it belongs in the server-rendered HTML. On React and similar stacks this needs deciding at build time rather than patching later, which is one of the things our <a href="/web-development-company">web development team</a> settles when the templates are written.</p>
<p>The related trap is the self-referencing canonical that quietly points somewhere else after a URL change — trailing slash added, uppercase path normalised, a query string appended by a marketing tool. All of these produce a canonical that no longer matches the page it sits on.</p>

<h2>How do you audit canonical tags across a whole site?</h2>
<p>Run a full crawl and check five things for every URL, because canonical problems are systematic rather than one-off and a crawl finds patterns a spot check never will.</p>
<ol>
  <li><strong>Does each indexable page reference itself?</strong> A self-referencing canonical should be the default on every page you want indexed.</li>
  <li><strong>Does every canonical target return 200?</strong> Filter for canonicals resolving to 3xx, 4xx or blocked URLs and fix them at the template level.</li>
  <li><strong>Are all canonicals absolute and https?</strong> Sort by canonical value and scan for relative paths and stale protocols.</li>
  <li><strong>Does the rendered canonical match the raw one?</strong> Crawl with and without JavaScript rendering and compare. Any difference is a bug.</li>
  <li><strong>Do the sitemap and the canonicals agree?</strong> Every sitemap URL should be self-canonical, and no non-canonical URL should be in the sitemap.</li>
</ol>
<p>Then cross-check against Search Console. The Pages report distinguishes Alternate page with proper canonical tag, which means your instruction was accepted, from Duplicate, Google chose different canonical than user, which means it was not. Those two lines answer most questions on their own, and our post on <a href="/blog/google-search-console-fix-common-issues">common Search Console issues</a> covers how to read the rest of that report.</p>

<h2>What should you do when Google ignores your canonical?</h2>
<p>When Search Console reports Duplicate, Google chose different canonical than user, treat it as feedback that your other signals contradict your tag, and strengthen the signals rather than repeating the tag. In order of effect:</p>
<ul>
  <li>Point internal links at the canonical URL consistently, including navigation, breadcrumbs and in-content links.</li>
  <li>Remove non-canonical variants from the XML sitemap.</li>
  <li>Add 301 redirects where the duplicates have no reason to exist separately — a redirect settles the question in a way a canonical cannot.</li>
  <li>Make the canonical version genuinely the better page, since Google often picks the version with more content, more links or more traffic.</li>
  <li>If the pages are not actually duplicates, differentiate them properly instead of forcing consolidation.</li>
</ul>
<p>Persistent disagreement usually means the underlying duplication is real and unresolved, which is a content architecture question rather than a tagging one. Our post on <a href="/blog/duplicate-content-issues-how-to-fix">finding and fixing duplicate content</a> covers choosing between canonical, redirect and noindex, and it is the right next step when the tag alone is not holding. Where the duplication comes from catalogue structure, our <a href="/ecommerce-seo-services">e-commerce SEO</a> work usually starts there, and our <a href="/seo-company">SEO team</a> handles the same problem on content sites.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want a second pair of eyes on your canonicalisation?</h3>
  <p>Send us your domain and we will report which canonicals Google is accepting, which it is overriding, and what to change first. Straightforward findings, no obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'Is a canonical tag a directive or a hint?',
        a: 'It is a hint. Google considers it alongside internal links, sitemap contents, redirects and the content itself, and it can select a different canonical when those signals disagree with your tag. If you need a guaranteed outcome, use a 301 redirect or a noindex tag instead.',
      },
      {
        q: 'Should every page have a self-referencing canonical?',
        a: 'It is good practice on every page you want indexed. A self-referencing canonical protects against parameter variants, tracking strings and trailing-slash duplicates being treated as separate URLs, and it costs nothing to implement in a template.',
      },
      {
        q: 'Can I use noindex and canonical together?',
        a: 'You should not. They give contradictory instructions — canonical asks Google to consolidate signals onto another URL, noindex asks it to drop the page. Google has advised against combining them and the result is unpredictable. Decide whether the page should be consolidated or removed.',
      },
      {
        q: 'What does Duplicate, Google chose different canonical than user mean?',
        a: 'It means Google saw your canonical tag and selected a different URL as the canonical. Usually your internal links, sitemap or redirects point somewhere else, or the alternative version is stronger. Fix by aligning those signals rather than by re-stating the tag.',
      },
      {
        q: 'Should paginated pages canonicalise to page one?',
        a: 'No. Each page in a paginated series should be self-canonical. Pointing page two at page one hides content that only exists on later pages, so those items may never be discovered or indexed.',
      },
      {
        q: 'Do canonical tags need to be absolute URLs?',
        a: 'Yes. Relative canonicals resolve against the current URL, so a page reachable at more than one path will produce a different canonical each time, which defeats the purpose. Always include the protocol and host.',
      },
    ],

    author: 'Avani Enterprises',
  },

  // ---------------------------------------------------------------------------
  // 5. Duplicate content
  // ---------------------------------------------------------------------------
  {
    slug: 'duplicate-content-issues-how-to-fix',
    title: 'Duplicate Content: How to Find It and How to Fix It',
    category: 'SEO',
    tags: ['Technical SEO', 'Duplicate Content', 'Indexing', 'India'],

    excerpt:
      'Duplicate content is not a penalty, it is a selection problem. Here is how to find every version of a page on your own site and choose the right fix for each type.',

    metaTitle: 'Duplicate Content Fix: Find It and Resolve It',
    metaDescription:
      'A practical duplicate content fix guide: where duplicates come from, how to find them in Search Console and a crawl, and which remedy to use for each type.',
    metaKeywords: [
      'duplicate content fix',
      'duplicate content SEO',
      'canonical vs redirect',
      'thin content',
      'technical SEO India',
    ],

    coverImage: '',

    keyTakeaways: [
      'There is no duplicate content penalty — Google simply picks one version to index and the others stop earning traffic.',
      'Most duplication on a site is created by URL variants such as parameters, protocols, trailing slashes and pagination rather than by copied writing.',
      'The right remedy depends on whether the duplicate URL should exist at all: redirect if it should not, canonicalise if it should.',
      'Manufacturer product descriptions used unedited put your pages in direct competition with every other retailer selling the same item.',
      'Blocking a duplicate in robots.txt prevents consolidation, because Google cannot read a canonical or redirect on a page it is not allowed to fetch.',
    ],

    content: `<p>A duplicate content fix is rarely about somebody copying your writing. On most sites the duplication is self-inflicted and structural: the same page reachable at four URLs, product descriptions supplied by a manufacturer, tag archives republishing full posts. The consequence is not a penalty but something more expensive — Google picks one version, and the effort behind the others earns nothing. This post covers where duplication comes from, how to find it, and how to choose the right remedy.</p>

<h2>Is duplicate content a Google penalty?</h2>
<p>No. Google has stated repeatedly that there is no duplicate content penalty for ordinary, non-deceptive duplication. What happens instead is selection: when Google finds several URLs with substantially the same content, it clusters them, chooses one to index, and largely ignores the rest.</p>
<p>The costs are real even without a penalty. Ranking signals split across versions instead of consolidating. Google may pick a version you did not want — a parameter URL, a print page, an old subdomain. Crawling gets spread across URLs that add nothing, which matters on large sites for the reasons set out in our post on <a href="/blog/crawl-budget-optimisation-large-sites">crawl budget</a>. Reporting becomes unreliable, because traffic to one page is recorded across several.</p>
<p>Penalties genuinely apply in one place only: deliberate, large-scale copying or scraped content published as your own. That is a different problem with a different answer.</p>

<h2>Where does duplicate content actually come from?</h2>
<p>Most of it comes from URL variants rather than duplicated writing. The same HTML served at more than one address is duplication as far as a crawler is concerned, and most sites accumulate these quietly:</p>
<h3>URL-level duplication</h3>
<ul>
  <li>http and https versions both resolving.</li>
  <li>www and non-www both resolving.</li>
  <li>Trailing slash and non-trailing-slash variants.</li>
  <li>Uppercase and lowercase paths on case-sensitive servers.</li>
  <li>Tracking and campaign parameters appended by ads, email and affiliates.</li>
  <li>Sort, filter and view parameters producing the same items in a different order.</li>
  <li>index.html or default.aspx alongside the bare directory URL.</li>
  <li>Staging or development subdomains left publicly crawlable.</li>
</ul>
<h3>Content-level duplication</h3>
<ul>
  <li>Manufacturer or distributor product descriptions used verbatim.</li>
  <li>Tag, category and author archives republishing full post bodies.</li>
  <li>Location pages built by find-and-replace on the city name.</li>
  <li>Boilerplate that outweighs the unique content on thin pages.</li>
  <li>Content syndicated to partner sites without attribution or canonical.</li>
</ul>
<p>The location-page pattern is worth calling out because it is so common with Indian service businesses. Twenty city pages differing only in the city name are not twenty pages in Google's view, and that specific trap is dealt with in our post on <a href="/blog/multi-location-seo-india">multi-location SEO in India</a>.</p>

<h2>How do you find duplicate content on your own site?</h2>
<p>Find duplication by comparing what you published against what Google actually indexed, then confirming with a crawl. Four checks in order:</p>
<ol>
  <li><strong>Read the Search Console Pages report.</strong> The rows that matter are Duplicate without user-selected canonical, Duplicate Google chose different canonical than user, and Alternate page with proper canonical tag. The first two are unresolved duplication; the third is duplication you have already handled.</li>
  <li><strong>Compare counts.</strong> Sitemap URL count against indexed count. A large excess of indexed URLs means Google has found addresses you did not submit.</li>
  <li><strong>Crawl the site with content hashing.</strong> Any crawler that hashes page content will group exact and near duplicates for you. Sort by hash and the clusters are obvious.</li>
  <li><strong>Test the variants by hand.</strong> Load the http version, the www version, the trailing-slash version and an index.html version of your homepage. Each should redirect to one canonical address. If any resolves with a 200, you have found live duplication.</li>
</ol>
<p>For external duplication, search a distinctive full sentence from a page in quotation marks. If other sites appear above you for your own sentence, you have a syndication or scraping situation rather than an internal one.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want to know how many versions of your site Google has found?</h3>
  <p>We will crawl your domain, compare it against what is indexed, and send you the duplicate clusters with a recommended fix for each. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Which duplicate content fix should you use?</h2>
<p>Choose the remedy by answering one question: should this duplicate URL exist at all? If it should not, redirect it. If it should exist for users but not compete in search, canonicalise or noindex it. The table below maps the common cases.</p>
<table>
  <thead>
    <tr><th>Situation</th><th>Right fix</th><th>Why</th></tr>
  </thead>
  <tbody>
    <tr><td>http, www, trailing-slash or index.html variants</td><td>301 redirect to one canonical form</td><td>These URLs have no reason to exist separately; a redirect settles it permanently</td></tr>
    <tr><td>Tracking and campaign parameters</td><td>Self-referencing canonical on the clean URL</td><td>The parameter URL must stay usable for the click, but should not be indexed</td></tr>
    <tr><td>Sort and view parameters on a listing</td><td>Canonical to the unparameterised listing</td><td>Users need the sort; search does not need the variant</td></tr>
    <tr><td>Filter combinations nobody searches for</td><td>Do not generate crawlable links to them</td><td>Prevention beats cleanup on faceted navigation</td></tr>
    <tr><td>Internal search results</td><td>noindex, and disallow once de-indexed</td><td>Unlimited in number and thin by nature</td></tr>
    <tr><td>Tag and archive pages showing full posts</td><td>Show excerpts, or noindex the archive</td><td>Removes the duplication rather than masking it</td></tr>
    <tr><td>Old page replaced by a better one</td><td>301 redirect to the replacement</td><td>Consolidates links and history onto the surviving page</td></tr>
    <tr><td>Near-identical location or service pages</td><td>Rewrite them, or merge and redirect</td><td>No tag makes thin pages worth indexing</td></tr>
    <tr><td>Content syndicated to a partner</td><td>Ask for a cross-domain canonical or a link back</td><td>Tells Google which copy is the original</td></tr>
  </tbody>
</table>
<p>One sequencing rule sits over all of it: never block a duplicate in robots.txt before it is resolved. Google cannot read a canonical tag or follow a redirect on a URL it is not permitted to fetch, so blocking first freezes the duplication in place instead of consolidating it.</p>

<h2>How do you fix duplicate product descriptions on an e-commerce site?</h2>
<p>Fix them by rewriting the pages that make you money and accepting supplier copy on the ones that do not. Rewriting a full catalogue is rarely a sensible use of budget, so triage it:</p>
<ul>
  <li>Rank products by revenue and search demand, and rewrite the top band properly — full description, specifications in your own words, and the details a customer asks before buying.</li>
  <li>Add elements no other retailer has: your delivery terms, your warranty handling, your sizing notes, questions your support team actually receives.</li>
  <li>Enable and moderate customer reviews, which add unique text to the page continuously without editorial effort.</li>
  <li>For the long tail, keep supplier copy but make sure category pages carry original content, since that is usually where the search demand sits anyway.</li>
</ul>
<p>Variant handling is the other half of this. Colour and size variants of one product usually belong on one indexable URL with variant selection, not as separate pages. Where a variant has genuinely distinct demand, give it its own page and content. We work through this in our <a href="/blog/ecommerce-product-page-seo-checklist">product page SEO checklist</a>, and it is standard scope in our <a href="/ecommerce-seo-services">e-commerce SEO</a> work.</p>

<h2>What should you do about scraped and syndicated content?</h2>
<p>Treat syndication and scraping as two different problems. Syndication is consensual, so negotiate the terms: ask the publishing partner for a cross-domain canonical pointing to your original, or failing that a clear link back to it. Publish on your own site first and let it be indexed before the partner version goes live.</p>
<p>Scraping is not consensual, and the honest answer is that it usually needs no action. Google is generally able to identify the original source, particularly when your version is indexed first and your domain is the stronger one. Where a scraped copy genuinely outranks you, the DMCA removal process exists — but the durable protection is a site Google crawls quickly enough to see your version first, which loops back to our <a href="/blog/internal-linking-strategy-that-works">internal linking guide</a>.</p>

<h2>How long does a duplicate content fix take to work?</h2>
<p>It depends entirely on recrawl speed, and nobody can give you a date. Google has to fetch the affected URLs again, see the new redirect or canonical, and update its clustering, and that happens on its own schedule. Frequently crawled pages update sooner than pages Google visits rarely.</p>
<p>What you can control is how quickly Google is told. Update your XML sitemaps to contain only canonical URLs with accurate lastmod dates, fix internal links to point at the surviving URL, and use URL Inspection to request indexing on the pages that matter most. Then watch the Pages report categories move rather than rankings, because coverage changes before traffic does. Anyone promising a recovery timeline is guessing — our <a href="/guides/how-to-choose-an-seo-agency">guide to choosing an SEO agency</a> covers the other signals to check, and our <a href="/seo-company">SEO team</a> scopes this work the same way.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Duplicate URLs multiplying faster than you can fix them?</h3>
  <p>We will identify the pattern generating them, recommend the remedy for each cluster, and tell you which ones are not worth touching. No obligation and no long report you will never read.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'Does duplicate content cause a Google penalty?',
        a: 'No. Google has confirmed there is no penalty for ordinary duplicate content. It clusters the duplicates, indexes one version and largely ignores the others, which splits ranking signals and wastes crawling. Penalties apply only to deliberate, deceptive copying at scale.',
      },
      {
        q: 'Should I use a canonical tag or a 301 redirect?',
        a: 'Use a 301 redirect when the duplicate URL has no reason to exist, such as http, www or trailing-slash variants. Use a canonical when the URL must remain reachable for users, such as a page with tracking parameters or a sorted view of a listing.',
      },
      {
        q: 'How much duplicate content is acceptable?',
        a: 'There is no threshold percentage, and any tool quoting one is using its own arbitrary measure. The practical test is whether each URL gives a searcher something the others do not. If it does not, it should be consolidated regardless of how much text differs.',
      },
      {
        q: 'Can I use robots.txt to fix duplicate content?',
        a: 'Not on its own, and doing it first makes things worse. Google cannot read a canonical tag or follow a redirect on a URL it is blocked from fetching, so the duplication is frozen rather than consolidated. Resolve first with a canonical, redirect or noindex, and only block afterwards.',
      },
      {
        q: 'Is using manufacturer product descriptions bad for SEO?',
        a: 'It puts your page in direct competition with every other retailer using the same text, so it rarely wins. Rewriting your highest-revenue and highest-demand products, adding your own delivery and warranty details, and enabling customer reviews are the practical ways to differentiate without rewriting a whole catalogue.',
      },
      {
        q: 'How long does it take for a duplicate content fix to show results?',
        a: 'It depends on how quickly Google recrawls the affected URLs, which varies by site and by page. Clean up your sitemaps, correct internal links and request indexing for key pages, then track movement in the Search Console Pages report rather than expecting an immediate ranking change.',
      },
    ],

    author: 'Avani Enterprises',
  },
];
