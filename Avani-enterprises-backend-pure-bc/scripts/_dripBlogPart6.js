/**
 * _dripBlogPart6.js — Web and app development decisions.
 *
 * Five posts on the build-side choices that decide whether a site is fast,
 * maintainable, searchable and usable: speed work, headless vs WordPress,
 * redesigning without losing rankings, accessibility, and PWA vs native.
 */

module.exports = [
  /* ───────────────────────────────────────────────────────────────────────── */
  {
    slug: "website-speed-optimisation-checklist-india",
    title: "Website Speed Optimisation: A Checklist for Indian Sites",
    category: "Web Development",
    tags: ["Web Development", "Core Web Vitals", "Performance", "India"],

    excerpt:
      "A working checklist for website speed optimisation on Indian sites — what to fix first, how to test on the devices your visitors own, and how to stop it getting slow again.",

    metaTitle: "Website Speed Optimisation Checklist for Indian Sites",
    metaDescription:
      "A practical website speed optimisation checklist for Indian sites: what to fix first, how to test on real devices and networks, and how to stay fast after launch.",
    metaKeywords: [
      "website speed optimisation",
      "website speed optimization India",
      "core web vitals India",
      "improve website loading speed",
    ],

    coverImage: "",

    keyTakeaways: [
      "Website speed optimisation should start with the largest element above the fold, because that single element is what Largest Contentful Paint measures and what a visitor reads as 'the page has loaded'.",
      "Lab scores from a laptop flatter almost every Indian site; the number that matters is field data from real visitors on mid-range Android phones and congested mobile networks.",
      "Images and third-party scripts account for most of the avoidable weight on a typical business website, and both can be reduced without touching the design.",
      "Server location and caching set the floor for how fast a page can possibly be, so no amount of front-end work will rescue a slow time to first byte.",
      "Speed decays after launch unless someone owns a page-weight budget, because every new banner, pixel and plugin is added by a person who is not measuring.",
    ],

    content: `<p>Most Indian business websites are not slow because of one broken thing. They are slow because of twenty small decisions — an uncompressed hero image, four analytics tags, a font pulled from a third domain, a server sitting in Virginia — that each cost a few hundred milliseconds and add up to a page nobody waits for. <strong>Website speed optimisation</strong> is the unglamorous work of finding those decisions and reversing the expensive ones in order of what they cost. This is the checklist we actually work through, roughly in the order that pays.</p>

<h2>What counts as fast for a website in India?</h2>
<p>Fast means Largest Contentful Paint under 2.5 seconds, Interaction to Next Paint under 200 milliseconds and Cumulative Layout Shift under 0.1 — measured on a mid-range Android phone on a mobile connection, not on your laptop on office broadband. Those are Google's published Core Web Vitals thresholds, and Google assesses them at the 75th percentile of real visits, which means a quarter of your visitors can have a worse experience and you still pass. Anything you measure in a browser tab on a desktop is a lab number: useful for finding causes, useless for judging whether real people are having a good time. If you are chasing INP specifically, the diagnosis is a separate discipline and we have covered it in <a href="/blog/core-web-vitals-inp-fix-guide">our guide to fixing INP</a>.</p>

<h2>Why do Indian sites score well in the lab and still feel slow?</h2>
<p>Because the lab simulates a device and a network, and your actual visitors are on cheaper phones and busier networks than the simulation assumes. JavaScript has to be downloaded, parsed and executed, and parsing is bound by CPU — a phone with a slower processor takes several times longer over the same bundle that your test device chewed through instantly. Add evening congestion on mobile networks, a visitor in a tier-two city on a weaker signal, and a page that looked fine in Lighthouse becomes a blank screen with a spinner. Pull the field data from the Core Web Vitals report in Search Console before you decide anything; it is the only view built from your real audience.</p>

<h2>Where should website speed optimisation start?</h2>
<p>Start with whatever is delaying the largest element above the fold, because that element is what LCP measures and what a visitor perceives as the page arriving. Everything else is secondary until that one is quick. The order we work in:</p>
<ol>
  <li><strong>Identify the LCP element.</strong> Usually a hero image, a banner, or the headline block. Chrome DevTools reports it directly in the Performance panel.</li>
  <li><strong>Remove whatever blocks it.</strong> Render-blocking CSS and synchronous scripts in the head delay first paint before a single pixel is drawn.</li>
  <li><strong>Make the element itself cheap.</strong> A correctly sized, modern-format image loads in a fraction of the time of the original upload.</li>
  <li><strong>Reserve its space.</strong> Explicit width and height attributes stop the layout jumping when it arrives, which is most of CLS solved.</li>
  <li><strong>Then go after everything below the fold.</strong> Lazy loading, deferred scripts, and code splitting all belong here — after the top of the page is fast, not before.</li>
</ol>

<h2>How do you stop images being the bottleneck?</h2>
<p>Serve every image in a modern format at the size it is actually displayed, and never let a browser download a 3000-pixel file to render it in a 600-pixel slot. That single rule removes more weight from a typical business site than any other change. In practice that means:</p>
<ul>
  <li>WebP or AVIF as the primary format, with a JPEG fallback where you still need one.</li>
  <li><code>srcset</code> and <code>sizes</code> so phones receive phone-sized files rather than desktop ones.</li>
  <li><code>loading="lazy"</code> on everything below the fold — and never on the LCP image, where it actively delays the metric you are trying to improve.</li>
  <li><code>fetchpriority="high"</code> on the hero image so the browser stops treating it as equal to a footer logo.</li>
  <li>Compression applied at upload time in the CMS, because the person publishing next month's blog post will not remember to do it by hand.</li>
</ul>
<p>If you sell online, this matters twice over: product listing pages carry dozens of images at once, and that is where an <a href="/ecommerce-development-company">ecommerce build</a> either holds up or collapses on a phone.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Not sure what is actually making your site slow?</h3>
  <p>Send us the URL and we will tell you which specific elements are costing you the most load time and what order to fix them in. No obligation, and no upsell attached to the answer.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What should you do about third-party scripts?</h2>
<p>Audit them, delete the ones nobody reads, and defer whatever survives. Third-party scripts are the most common source of hidden slowness because each one is invisible in your codebase and each one costs a DNS lookup, a TLS handshake, a download and an execution pass on the main thread. A typical site accumulates a chat widget, a heatmap recorder, two ad pixels, a review widget and a tag manager that loads three more things nobody documented.</p>
<p>The honest test is to block each script in DevTools one at a time and watch what the metrics do. Anything whose data no one has looked at in six months goes. Anything that survives loads with <code>defer</code>, or on interaction, or after the page is interactive — a chat widget in particular does not need to exist until someone scrolls.</p>

<h2>Does hosting and server location matter for Indian traffic?</h2>
<p>Yes — server location sets the floor for time to first byte, and no amount of front-end optimisation can get under that floor. A request from Pune to a server in the United States pays a round trip across the planet before a single byte comes back, and it pays it again for every uncached asset. Three things fix this:</p>
<ul>
  <li><strong>A CDN with Indian edge locations,</strong> so static assets are served from within the country rather than from origin.</li>
  <li><strong>Real caching at the origin,</strong> either full-page caching or statically generated pages, so the server is not rebuilding identical HTML for every visitor.</li>
  <li><strong>Database work that is actually indexed,</strong> because slow TTFB on a dynamic site is usually a query problem wearing a hosting costume.</li>
</ul>
<p>Hosting choices are where budget conversations usually start, and they are worth understanding before you sign anything — our guide to <a href="/guides/website-development-cost-india">what website development costs in India</a> covers where the recurring costs sit. If the architecture itself is the constraint rather than the hosting, the decision widens into the one we cover in <a href="/blog/headless-cms-vs-wordpress-india">headless CMS versus WordPress</a>.</p>

<h2>Why does a fast site get slow again?</h2>
<p>Because speed is a property of the current content, not a setting you switch on once. Six months after a careful optimisation pass, someone has uploaded a 4 MB banner straight from a camera, marketing has added a retargeting pixel, and a plugin update has started loading its own copy of a library. None of those people were measuring, and none of them did anything unreasonable.</p>
<p>The fix is a guardrail rather than another cleanup: a maximum upload size enforced in the CMS, an automated performance check that runs on every deploy and fails loudly, and one named person who reviews the field data each quarter. Speed also interacts directly with what search engines are willing to crawl and rank, which is why our <a href="/seo-company">SEO work</a> and our <a href="/web-development-company">web development work</a> are never quoted as separate projects when the site is slow.</p>

<h2>The checklist, in one place</h2>
<ul>
  <li>Measure field data in Search Console before touching anything.</li>
  <li>Identify the LCP element and make it the fastest thing on the page.</li>
  <li>Inline critical CSS; defer the rest.</li>
  <li>Serve WebP or AVIF, sized with <code>srcset</code>, with dimensions set.</li>
  <li>Lazy-load below the fold only.</li>
  <li>Self-host fonts, subset them, and use <code>font-display: swap</code>.</li>
  <li>Cut every third-party script that nobody reads.</li>
  <li>Defer or interaction-load whatever remains.</li>
  <li>Cache at the origin and serve static assets from an Indian edge.</li>
  <li>Reserve space for ads, embeds and banners so nothing shifts.</li>
  <li>Re-test on a mid-range Android phone, not a flagship.</li>
  <li>Set an upload size limit and a deploy-time performance check.</li>
</ul>
<p>If a redesign is on the table anyway, do this work as part of it rather than after — and read <a href="/blog/website-redesign-without-losing-rankings">how to redesign without losing rankings</a> first, because a fast new site that lost its URLs is not an improvement.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want the speed work done properly, once?</h3>
  <p>We will walk your site, put the fixes in priority order, and tell you honestly which ones your current stack can support. You get the list whether or not you work with us.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "How fast should my website load in India?",
        a: "Aim for Largest Contentful Paint under 2.5 seconds on a mid-range Android phone on a mobile connection. That is Google's Core Web Vitals threshold, assessed at the 75th percentile of real visits. A desktop test on office broadband will always look better than what your visitors experience.",
      },
      {
        q: "Does website speed affect Google rankings?",
        a: "Core Web Vitals are a confirmed ranking signal, but a modest one compared with relevance and links. The larger effect is behavioural: slow pages lose visitors before they read anything, which suppresses conversions and engagement regardless of where you rank.",
      },
      {
        q: "What usually makes an Indian business website slow?",
        a: "In our audits it is usually oversized images uploaded straight from a camera or designer, a stack of third-party scripts nobody has reviewed, and an origin server located outside India with no caching. Those three are where most of the avoidable delay tends to sit on a typical site.",
      },
      {
        q: "Do I need to move my hosting to India?",
        a: "Not always. A CDN with Indian edge locations solves most of the distance problem for static assets. Moving the origin matters when the site is dynamic and every page view has to reach the server, because that round trip cannot be cached away.",
      },
      {
        q: "Will a caching plugin fix my speed problem?",
        a: "A caching plugin improves time to first byte on repeat requests, which helps. It does not shrink your images, remove third-party scripts, or fix render-blocking resources — so it is a useful part of the work, not a substitute for it.",
      },
    ],

    author: "Avani Enterprises",
  },

  /* ───────────────────────────────────────────────────────────────────────── */
  {
    slug: "headless-cms-vs-wordpress-india",
    title: "Headless CMS vs WordPress: Choosing Without Regret",
    category: "Web Development",
    tags: ["Web Development", "CMS", "Architecture", "India"],

    excerpt:
      "Headless CMS vs WordPress, compared honestly on cost, speed, SEO and who maintains it — plus the decision rules for which one your business should actually build on.",

    metaTitle: "Headless CMS vs WordPress: How to Choose",
    metaDescription:
      "Headless CMS vs WordPress compared on cost, speed, SEO and team fit — with clear decision rules for which architecture your business should actually build on.",
    metaKeywords: [
      "headless CMS vs WordPress",
      "headless CMS India",
      "WordPress alternatives",
      "website architecture decision",
    ],

    coverImage: "",

    keyTakeaways: [
      "Headless CMS vs WordPress is a question about who maintains the site and how many places the content has to appear, not a question about which technology is more modern.",
      "WordPress remains the correct answer for most single-website businesses whose marketing team needs to publish and edit pages without a developer in the loop.",
      "A headless CMS earns its extra complexity when the same content feeds a website, an app and a partner surface, or when a marketing team can rely on developer availability.",
      "Going headless removes the plugin ecosystem, which means every feature a plugin used to provide becomes a line item someone has to build and maintain.",
      "WordPress can itself be run headless, which is often the cheapest way to get a modern front end without retraining the people who publish the content.",
    ],

    content: `<p>The <strong>headless CMS vs WordPress</strong> argument is usually conducted as a technology debate and settled as a taste preference, which is how businesses end up with a beautifully engineered site that nobody on the marketing team can update. The useful version of the question is narrower: who has to change this site next month, how many surfaces does the content need to reach, and how much developer time can you count on afterwards? Answer those honestly and the architecture usually picks itself.</p>

<h2>What is the real difference between a headless CMS and WordPress?</h2>
<p>WordPress is a coupled system — it stores your content and renders the pages — while a headless CMS only stores and serves content, leaving the rendering to a separate front-end application that you build. That single split explains every downstream difference. In WordPress, a theme controls how a page looks and an editor can usually rearrange it. In a headless setup, the content lives behind an API and a developer decides what happens to it, which buys you total control over the front end and costs you the ability to change things without one.</p>

<h2>How do the two compare across the things that matter?</h2>
<p>They differ most on maintenance ownership and on how much of the site an editor can change alone. The table below is the comparison we walk clients through:</p>
<div class="table-wrap">
<table>
  <thead>
    <tr><th>Dimension</th><th>WordPress</th><th>Headless CMS</th></tr>
  </thead>
  <tbody>
    <tr><td>Who can change a page layout</td><td>An editor, using the block editor or a page builder</td><td>A developer, in the front-end code</td></tr>
    <tr><td>Time to launch a standard marketing site</td><td>Shortest — themes and plugins cover most needs</td><td>Longer — the front end is built rather than configured</td></tr>
    <tr><td>Front-end performance ceiling</td><td>Good with discipline; degrades as plugins accumulate</td><td>Higher, because you ship only what you wrote</td></tr>
    <tr><td>Feature availability</td><td>Large plugin ecosystem for forms, search, memberships</td><td>Each feature is built or integrated deliberately</td></tr>
    <tr><td>Security surface</td><td>Public admin login, plugin vulnerabilities, needs patching</td><td>Smaller — no public admin on the rendered site</td></tr>
    <tr><td>Content reuse across app and web</td><td>Possible via the REST API, but not the design goal</td><td>The core design goal</td></tr>
    <tr><td>Ongoing dependency</td><td>Hosting, updates, plugin licences</td><td>CMS subscription, hosting for the front end, developer availability</td></tr>
    <tr><td>Cost profile</td><td>Front-loaded low, rises with plugin sprawl</td><td>Higher to build, more predictable to run</td></tr>
  </tbody>
</table>
</div>

<h2>When is WordPress still the right answer?</h2>
<p>WordPress is still right when you have one website, a marketing team that publishes regularly, and no guaranteed developer on call. That describes a great many Indian small and mid-sized businesses, and there is nothing embarrassing about it. The block editor handles landing pages, the plugin ecosystem covers forms, redirects and schema without custom work, and almost any agency can pick the site up if you change partners — which is a genuine risk-reduction argument that rarely gets counted.</p>
<p>It is also the right answer when the site's job is content. A blog, a services site, a resource library and a lead form do not need a decoupled architecture; they need fast pages and someone publishing consistently. Where WordPress goes wrong is almost never the platform — it is fifteen overlapping plugins and a page builder rendering four nested wrappers around every paragraph, which is a discipline problem we cover in <a href="/blog/website-speed-optimisation-checklist-india">the website speed checklist</a>.</p>

<h2>When does a headless CMS earn its complexity?</h2>
<p>A headless CMS earns its keep when the same content has to appear in more than one place, or when the front end has requirements a theme cannot meet. Concretely, the cases where we recommend it:</p>
<ul>
  <li><strong>Content feeding several surfaces</strong> — a website, a mobile app, an in-store screen, a partner feed — where duplicating the content in each is untenable.</li>
  <li><strong>A product-like front end</strong> with heavy interactivity, real-time state, or a design system shared with an application.</li>
  <li><strong>Large, structured catalogues</strong> where content is genuinely relational and you want to model it properly rather than bend post types around it.</li>
  <li><strong>Strict security or compliance constraints</strong> that make a public CMS login on the production domain unacceptable.</li>
  <li><strong>An in-house engineering team</strong> that will still be there in two years to maintain the front end.</li>
</ul>
<p>That last point is the one that decides most projects. A headless build without ongoing developer access becomes frozen: the content still updates, but nothing about the pages can. We are candid about this before starting any <a href="/web-development-company">web development project</a>, because an architecture the client cannot maintain is a failure regardless of how well it was built.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Trying to decide between WordPress and going headless?</h3>
  <p>Tell us who maintains your site today and what you want it to do in two years, and we will tell you which architecture fits — including when the honest answer is to stay on WordPress.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Can you run WordPress headless and get both?</h2>
<p>Yes, and for a lot of businesses this is the sensible middle path. WordPress exposes a REST API and a GraphQL layer is available as a plugin, so you can keep the editing experience your team already knows while rendering the public site with a modern front-end framework. Editors carry on as before. Developers get to control the output. You avoid retraining anyone.</p>
<p>The trade-off is that you now maintain two systems and lose live preview unless you build it back. You also lose most plugins that render front-end output — anything that outputs a form, a slider or a schema block stops working, because nothing is rendering the theme any more. Plugins that only manage data in the admin continue to work fine. Sort your plugin list into those two buckets before committing; it is the fastest way to see how much work headless would actually be.</p>

<h2>Which is better for SEO?</h2>
<p>Neither, inherently — search engines index rendered HTML, and both architectures can produce excellent or terrible HTML. What differs is how easy it is to get the fundamentals wrong. WordPress gives you titles, meta descriptions, canonicals, sitemaps and redirects through a plugin in an afternoon. A headless front end gives you none of that until someone builds it, and the common failure is a beautiful site shipped without canonical logic, without a sitemap, or rendered entirely client-side so crawlers see an empty shell.</p>
<p>If you go headless, insist on server-side rendering or static generation, a generated sitemap, per-page metadata controlled from the CMS, and a redirect layer that editors can use without a deploy. Get those wrong and you will spend the following quarter on the problems in <a href="/blog/canonical-tags-common-mistakes">canonical tag mistakes</a> and <a href="/blog/crawl-budget-optimisation-large-sites">crawl budget</a> instead of on growth. This is the point at which most teams bring in <a href="/seo-company">SEO input</a> before the build rather than after it.</p>

<h2>How should you decide?</h2>
<p>Use rules, not preferences. Choose WordPress if a non-developer needs to change page layouts, if you have no reliable developer access after launch, or if the site is essentially content and lead capture. Choose headless if content must serve an app as well as a website, if the front end is closer to a product than a brochure, or if you have engineers who will own it. Choose WordPress headless if your editors are happy and only the front end is the problem.</p>
<p>Selling online adds one more consideration: a storefront brings payments, inventory and checkout, and those constraints usually dominate the CMS question entirely — our comparison of <a href="/guides/shopify-vs-woocommerce-which-should-you-choose">Shopify versus WooCommerce</a> is the better starting point there, and an <a href="/ecommerce-development-company">ecommerce build</a> is a different conversation from a marketing site. Whatever you choose, decide it before design starts. Changing architecture after the design is signed off is how projects double.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Get a straight recommendation on your CMS</h3>
  <p>We will review your current site, your team and your two-year plan, and give you one recommendation with the reasoning written down. No obligation to build it with us.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Is a headless CMS faster than WordPress?",
        a: "It has a higher performance ceiling, because you ship only the code you wrote rather than a theme plus plugins. A well-maintained WordPress site with caching and disciplined plugin use can still be fast. The difference shows up over time, as WordPress installs tend to accumulate weight and headless builds do not.",
      },
      {
        q: "Is headless better for SEO than WordPress?",
        a: "No. Search engines index rendered HTML and both can produce good HTML. WordPress makes the SEO fundamentals easy through plugins; headless requires you to build titles, canonicals, sitemaps and redirects deliberately, and to render on the server rather than only in the browser.",
      },
      {
        q: "Can WordPress be used as a headless CMS?",
        a: "Yes. WordPress exposes a REST API, and a GraphQL layer is available as a plugin, so a separate front end can consume the content while editors keep the admin they know. You lose front-end-rendering plugins and live preview unless you rebuild them.",
      },
      {
        q: "Which costs more to run, headless or WordPress?",
        a: "Headless usually costs more to build and less to run per change, because the front end is deliberate rather than plugin-driven. WordPress starts cheaper and its cost creeps up through plugin licences, updates and the performance cleanup that plugin sprawl eventually needs.",
      },
      {
        q: "What happens to a headless site if our developer leaves?",
        a: "Content editing carries on, because that lives in the CMS. Anything structural — a new page layout, a new section, a design change — waits until you have a developer again. This is the single most important thing to plan for before choosing headless.",
      },
      {
        q: "Do we have to migrate our existing content?",
        a: "If you move from WordPress to a headless CMS, yes, and the migration includes the URL structure, not just the text. Keeping the same URLs is what protects your existing rankings, so map them before anything is exported.",
      },
    ],

    author: "Avani Enterprises",
  },

  /* ───────────────────────────────────────────────────────────────────────── */
  {
    slug: "website-redesign-without-losing-rankings",
    title: "How to Redesign a Website Without Losing Your Rankings",
    category: "Web Development",
    tags: ["Web Development", "Technical SEO", "Migration"],

    excerpt:
      "A redesign is the most common way businesses lose search traffic overnight. Here is the sequence — baseline, redirect map, pre-launch checks, monitoring — that prevents it.",

    metaTitle: "Website Redesign Without Losing Rankings",
    metaDescription:
      "How to run a website redesign without losing rankings: the baseline to record first, the redirect map that holds, and the checks to run before and after launch.",
    metaKeywords: [
      "website redesign without losing rankings",
      "website migration SEO",
      "redesign SEO checklist",
      "301 redirect map",
    ],

    coverImage: "",

    keyTakeaways: [
      "A website redesign without losing rankings depends almost entirely on work done before launch — the redirect map, the URL inventory and the content audit — not on anything you can fix afterwards.",
      "Traffic loss after a redesign is usually caused by broken URL mapping, deleted pages, and thin replacement content, in that order.",
      "Every old URL that had traffic, links or rankings needs a 301 to the closest equivalent page, never a blanket redirect to the homepage.",
      "A staging site left crawlable and indexable will compete with your live site, so blocking it and then unblocking it at launch has to be an explicit checklist item.",
      "Expect a short period of fluctuation after any migration; the point of the baseline is to tell you whether what you are seeing is recovery or a genuine loss.",
    ],

    content: `<p>The most reliable way for an established business to lose its search traffic is to launch a beautiful new website. Nothing goes obviously wrong — the design is better, the pages load faster, everyone is pleased — and then enquiries fall and nobody can say exactly why. A <strong>website redesign without losing rankings</strong> is entirely achievable, but almost all of the work that decides the outcome happens before launch day, not after it. This is the sequence.</p>

<h2>Why do rankings drop after a redesign?</h2>
<p>Rankings drop because the new site broke the connection between the URLs Google had indexed and the content it had ranked. Every ranking you hold is attached to a specific URL, along with the links pointing at it and the history Google has accumulated about it. When a redesign changes URL structure, deletes pages that looked unimportant on a sitemap, or replaces a detailed 1,500-word service page with a stylish 200-word one, those signals have nowhere to go. The design is not what caused the drop. The discontinuity is.</p>
<p>The three causes in order of frequency: URLs changed without redirects, pages removed during a content "cleanup", and replacement pages with far less substance than what they replaced. All three are avoidable, and all three are cheaper to avoid than to repair.</p>

<h2>What should you record before touching anything?</h2>
<p>Record a full inventory of the current site and its performance while the current site still exists, because you cannot reconstruct it afterwards. This baseline is the single most valuable artefact of the project. Capture:</p>
<ul>
  <li><strong>Every indexed URL</strong>, from a full crawl plus the Pages report in Search Console — not just what is in the navigation.</li>
  <li><strong>Organic landing pages and their queries</strong>, exported from Search Console over the last twelve months, so seasonal pages are included.</li>
  <li><strong>Current titles, meta descriptions and H1s</strong> for every page worth keeping.</li>
  <li><strong>Backlinks by target URL</strong>, so you know which specific pages carry external authority.</li>
  <li><strong>Existing redirects</strong> already in place from previous changes — these have to be chained forward, not dropped.</li>
  <li><strong>Baseline metrics</strong>: impressions, clicks and average position by page, plus conversions, so post-launch comparison is possible.</li>
</ul>
<p>Save the exports somewhere that will outlive the project. Three months after launch, when someone asks whether traffic to a particular page has fallen, this file is how you answer instead of guessing.</p>

<h2>How do you build a redirect map that holds?</h2>
<p>Map every old URL to the single closest equivalent new URL with a 301, and treat the homepage as a last resort rather than a default. A redirect map is a two-column spreadsheet, and the discipline is in the rules you apply while filling it:</p>
<ul>
  <li><strong>One hop only.</strong> Old URL to final URL. Chains of redirects dilute and slow everything, so if a URL already redirects, point the original directly at the new destination.</li>
  <li><strong>Closest match, not nearest category.</strong> A page about warehouse racking should redirect to the new warehouse racking page, not to the products index.</li>
  <li><strong>301, not 302.</strong> Temporary redirects tell Google to keep the old URL indexed, which is the opposite of what a permanent migration needs.</li>
  <li><strong>Nothing to a 404 that had traffic or links.</strong> If a page genuinely has no successor, redirect it to the most relevant parent and accept the partial signal loss.</li>
  <li><strong>Include the awkward ones.</strong> Old blog posts, PDF files, campaign landing pages, and URLs with tracking parameters all count.</li>
  <li><strong>Test the map before launch,</strong> by running the old URL list through a crawler pointed at staging and confirming every row resolves in one hop with a 200 at the end.</li>
</ul>
<p>If your URL structure is changing across a large site, this is also the moment to fix the structural problems you have been tolerating — read <a href="/blog/internal-linking-strategy-that-works">internal linking strategy</a> before finalising the new hierarchy, because a redesign is the cheapest opportunity you will get to change it.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Planning a redesign? Get the migration reviewed first.</h3>
  <p>We will look at your current URLs, your redirect plan and your new site structure, and flag what would cost you traffic on launch day. No obligation, and you keep the findings.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What content has to survive the redesign untouched?</h2>
<p>Any page that currently earns organic traffic keeps its substance, even if its styling changes completely. Designers reasonably want less text on a page; search engines reasonably rank pages that answer the query thoroughly. The resolution is presentation, not deletion: accordions, tabs, and progressive disclosure keep the content in the HTML while tidying the visual density.</p>
<p>What must be preserved specifically: headings that match how people search, the detailed body sections on service and product pages, existing FAQ blocks and their schema, internal links between related pages, and image alt text. If a page is genuinely being rewritten, rewrite it to be better than the old one rather than shorter. A redesign is not the moment to also reduce your content, because you will then be unable to tell which change caused which effect.</p>

<h2>What should you check on staging before launch?</h2>
<p>Check that staging is blocked from indexing, and that the block is removed at launch — this pair of steps causes more accidental damage than any other item on the list. Beyond that, work through the pre-launch checklist:</p>
<ol>
  <li>Staging is password-protected or noindexed, and the live site is not.</li>
  <li><code>robots.txt</code> on the new site does not disallow anything you need crawled.</li>
  <li>Canonical tags are self-referencing and absolute, and point at the new domain.</li>
  <li>Titles and meta descriptions have been carried across, not regenerated as templates.</li>
  <li>Structured data survived the rebuild — organisation, breadcrumb, FAQ, product where applicable.</li>
  <li>The XML sitemap lists only new, canonical, indexable URLs.</li>
  <li>Analytics and conversion tracking fire on the new templates, including the forms.</li>
  <li>Every template renders its content in the HTML, not only after JavaScript runs.</li>
  <li>The redirect map is loaded and tested end to end.</li>
</ol>

<h2>What do you do in the first two weeks after launch?</h2>
<p>Watch crawl behaviour and errors daily, and resist the urge to change anything else while you do. Submit the new sitemap in Search Console, then monitor the Pages report for a spike in "not found" or "redirect error" entries — those are your redirect map's misses, and they are the only thing worth acting on immediately. Crawl the live site for broken internal links, because internal links pointing at old URLs will otherwise sit there quietly passing through redirects forever.</p>
<p>Some ranking fluctuation is normal while Google re-crawls and re-evaluates. What is not normal is a page dropping out of the index entirely, which usually points to a noindex tag, a canonical pointing somewhere unexpected, or a redirect loop. Our guide to <a href="/guides/why-google-is-not-indexing-my-pages">why Google is not indexing your pages</a> covers the diagnosis, and <a href="/blog/google-search-console-fix-common-issues">common Search Console issues</a> covers the reports themselves.</p>

<h2>How long before you can judge the redesign?</h2>
<p>Judge it once Google has actually re-crawled the pages you care about, which you can check rather than guess. Open the URL Inspection tool on a handful of your most important pages and look at the last crawl date: if the new URL has not been fetched since launch, there is nothing to judge yet. Crawl frequency varies enormously between a daily-updated site and one Google visits every few weeks, so a fixed waiting period is the wrong instrument. Compare against the baseline you exported, page by page rather than in aggregate, because a site-wide total hides the case where three important pages collapsed while everything else improved slightly.</p>
<p>If traffic has genuinely fallen and the redirect map is clean, the cause is almost always content: pages that lost depth in the rebuild. That is repairable, and it is why the baseline export matters. This is the stage where a redesign becomes an <a href="/seo-company">SEO project</a> rather than a <a href="/web-development-company">development project</a>, and it is much less painful when the two were planned together from the start.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Already relaunched and traffic has fallen?</h3>
  <p>We will diagnose whether it is redirects, indexation or content depth, and give you the specific pages to fix first. You get the diagnosis regardless of what you do next.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Will a website redesign always affect my rankings?",
        a: "Some short-term movement is normal while search engines re-crawl the new site. Lasting loss is not normal and is almost always caused by missing redirects, deleted pages or shallower replacement content. Keeping URLs unchanged is the safest option of all.",
      },
      {
        q: "Should I keep my old URLs when redesigning?",
        a: "Yes, wherever you reasonably can. Changing URL structure is the single largest risk in a redesign, and a tidier URL is rarely worth the disruption on an established site. If you must change them, map every old URL to its closest new equivalent with a 301.",
      },
      {
        q: "How long should I keep 301 redirects in place?",
        a: "Indefinitely. Redirects also serve people following old links from emails, documents and other websites, and those links do not expire. Removing them later reintroduces the problem you originally solved.",
      },
      {
        q: "Can I redirect all old pages to the homepage?",
        a: "No. A redirect to an irrelevant destination is treated much like a not-found page, so the signals from that URL are largely lost. Always redirect to the closest equivalent content, and only fall back to a parent category when nothing closer exists.",
      },
      {
        q: "How long does it take for rankings to recover after a migration?",
        a: "It depends on how often your site is crawled rather than on a fixed number of weeks. Use the URL Inspection tool to confirm your key pages have been re-crawled since launch before you read anything into the numbers. If a page has vanished entirely rather than moved down, that is a technical fault to fix now, not something to wait out.",
      },
    ],

    author: "Avani Enterprises",
  },

  /* ───────────────────────────────────────────────────────────────────────── */
  {
    slug: "web-accessibility-for-indian-businesses",
    title: "Web Accessibility: What Indian Businesses Should Actually Do",
    category: "Web Development",
    tags: ["Web Development", "Accessibility", "WCAG", "India"],

    excerpt:
      "Web accessibility in India without the jargon: what the law expects, the defects that break most business sites, how to test for free, and what order to fix things in.",

    metaTitle: "Web Accessibility India: What to Actually Do",
    metaDescription:
      "Web accessibility India guide for businesses: what the law expects, the defects that break most sites, free ways to test, and the order to fix problems in.",
    metaKeywords: [
      "web accessibility India",
      "WCAG compliance India",
      "accessible website design",
      "RPwD Act website accessibility",
    ],

    coverImage: "",

    keyTakeaways: [
      "Web accessibility in India is anchored to the Rights of Persons with Disabilities Act, 2016, with WCAG 2.1 Level AA as the technical standard almost everyone references in practice.",
      "A small number of defects — poor colour contrast, missing form labels, missing alt text, removed focus outlines and keyboard traps — account for most of what makes business websites unusable.",
      "Accessibility overlay widgets do not make a site conformant, because they cannot fix the underlying HTML that assistive technology reads.",
      "Three manual tests catch more real problems than any automated scanner: navigate with the keyboard only, zoom to 200 per cent, and read the page with a screen reader.",
      "Accessibility work is cheapest during a build or redesign and most expensive as a retrofit, so it belongs in the specification rather than in a later remediation project.",
    ],

    content: `<p>Accessibility gets discussed in Indian business meetings as a compliance topic and then postponed, because nobody is quite sure what is required and everyone assumes it is expensive. In practice, <strong>web accessibility India</strong> conversations tend to turn on a handful of concrete defects, most of which are cheap to fix and were introduced by accident. What follows is what those defects are, how to find them without buying anything, and the order in which to deal with them. This is general information, not legal advice; if you need a compliance position for a contract or a tender, take it to a lawyer.</p>

<h2>What does the law expect on web accessibility in India?</h2>
<p>The Rights of Persons with Disabilities Act, 2016 requires that information and communication technology, including websites, be made accessible to persons with disabilities, and the accompanying rules set out that obligation for service providers. Alongside it, the Guidelines for Indian Government Websites (GIGW), published under MeitY, set the standard that government and public sector sites are held to, and they reference the Web Content Accessibility Guidelines directly.</p>
<p>For a private business, the practical position is this: WCAG 2.1 Level AA is the standard your enterprise customers, your government tenders and your international partners will ask about, because it is the one written into procurement documents worldwide. It is also simply the most complete checklist available. Treat AA as the target and you have answered the question in every context that has asked it so far.</p>

<h2>Which accessibility problems are most common on Indian business sites?</h2>
<p>The same short list recurs on almost every site we audit, and none of it was introduced deliberately. These are the defects worth checking for first.</p>

<h3>Colour contrast that fails on real screens</h3>
<p>Light grey body text on white, and white text over a photographic banner, are the two most common failures. WCAG AA asks for a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. It is one of the most frequent findings in our audits, and it is usually a decision made in a design tool on a bright monitor, then experienced by a customer outdoors on a phone.</p>

<h3>Form fields without real labels</h3>
<p>Placeholder text is not a label. When a field only has placeholder text, the hint disappears the moment someone starts typing, and a screen reader may announce nothing at all. Every input needs a <code>&lt;label&gt;</code> properly associated with it, and error messages need to be announced rather than shown only as a red border.</p>

<h3>Images without meaningful alternative text</h3>
<p>Alt text should describe what the image conveys in context, not restate the file name or stuff keywords. Decorative images should carry an empty alt attribute so screen readers skip them. Text baked into an image — a common shortcut for offers and price lists — is invisible to both assistive technology and search engines.</p>

<h3>Focus outlines removed for aesthetics</h3>
<p>Somewhere in most stylesheets is a rule that removes the browser's focus ring because it looked untidy. For anyone navigating by keyboard, that rule makes the site unusable: they can no longer see where they are. If the default ring is ugly, restyle it. Do not delete it.</p>

<h3>Keyboard traps and unreachable controls</h3>
<p>Menus that only open on hover, modals that cannot be closed with the escape key, and carousels whose controls cannot be reached by tabbing all fail the same basic requirement — everything usable with a mouse must be usable with a keyboard alone.</p>

<h3>Language and structure problems</h3>
<p>Pages missing a <code>lang</code> attribute, or set to English while serving Hindi content, cause screen readers to pronounce text incorrectly. Headings used for visual size rather than document structure break the outline that screen reader users navigate by. Both are quick fixes that improve how the page is understood by machines generally.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want to know where your site actually stands?</h3>
  <p>We will run an accessibility pass on your key templates and send you the specific defects with the fixes, in priority order. No obligation and nothing to install.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Do accessibility overlay widgets work?</h2>
<p>No — an overlay cannot make a non-conformant site conformant, because it sits on top of the HTML rather than fixing it. Overlays typically add a floating icon offering contrast toggles and text resizing. Those features are pleasant, but they do not create the missing form labels, they do not restore a broken heading structure, and they cannot infer what an unlabelled image depicts.</p>
<p>Assistive technology reads your markup. If the markup is wrong, the assistive technology gets the wrong answer regardless of what the widget displays. Disability advocacy groups have been consistently critical of overlays for this reason. Spend the same money on fixing the underlying templates and the improvement is permanent, testable, and does not add another third-party script to every page — which, as our <a href="/blog/website-speed-optimisation-checklist-india">speed checklist</a> notes, is not free either.</p>

<h2>How do you test accessibility without a budget?</h2>
<p>Three manual tests will surface more genuine problems than any automated scan, and they cost nothing but attention. Automated tools reliably catch the mechanical failures — contrast, missing alt attributes, some ARIA errors — but they cannot judge the criteria that depend on meaning, such as whether alt text describes the right thing or whether a heading structure reflects the page.</p>
<ol>
  <li><strong>Put the mouse away.</strong> Navigate your most important journey — homepage to enquiry form to submission — using only Tab, Shift+Tab, Enter, Space and the arrow keys. Note every point where you cannot see where you are, cannot reach a control, or cannot escape.</li>
  <li><strong>Zoom to 200 per cent.</strong> Text must reflow and remain readable without horizontal scrolling. Fixed-height containers and absolutely positioned elements usually break here.</li>
  <li><strong>Turn on a screen reader.</strong> NVDA on Windows and VoiceOver on macOS and iOS are free and built for this. Close your eyes and try to complete the form. Ten minutes of this teaches more than any report.</li>
</ol>
<p>Supplement with a browser extension for contrast and markup checks, and run those on templates rather than on individual pages — fixing a template fixes every page built on it, which is the only economical way to do this on a large site.</p>

<h2>Does accessibility help SEO?</h2>
<p>It overlaps meaningfully, though it is not a ranking factor in itself. Descriptive alt text gives search engines the content of your images. A correct heading hierarchy communicates document structure. Real text instead of text-in-images becomes indexable content. Descriptive link text — "view our pricing" rather than "click here" — helps both a screen reader user and a crawler understand the destination, which is why our <a href="/seo-company">SEO team</a> and our developers raise the same findings from different directions.</p>
<p>The larger overlap is behavioural. A form that is hard to use loses submissions from everyone, not only from users with disabilities, which is the same territory as <a href="/blog/landing-page-conversion-optimisation">landing page conversion work</a>. Accessible sites tend to be clearer sites, and clarity is what both audiences reward.</p>

<h2>Where should a business start?</h2>
<p>Start with the journey that makes you money, not with the homepage. Fix the path from landing page to enquiry or checkout first: contrast, labels, keyboard access, error messages, focus visibility. Then move outward to navigation, content templates and PDFs — and note that a scanned PDF price list is entirely unreadable to assistive technology, so an HTML version matters more than most people expect.</p>
<p>If a rebuild or redesign is already planned, put WCAG 2.1 AA into the specification before design begins; it is dramatically cheaper as a requirement than as a retrofit, and it should sit alongside the URL planning in <a href="/blog/website-redesign-without-losing-rankings">a redesign that does not lose rankings</a>. We build it into <a href="/web-development-company">web development</a> and <a href="/mobile-app-development-company">app projects</a> by default rather than pricing it as an extra, because retrofitting semantics into finished templates costs considerably more than writing them correctly in the first place.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Building or rebuilding? Get accessibility in the spec.</h3>
  <p>We will help you write WCAG 2.1 AA requirements into your project scope so it is handled during the build instead of as an expensive fix later. No obligation to work with us.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Is web accessibility legally required for private businesses in India?",
        a: "The Rights of Persons with Disabilities Act, 2016 places obligations around accessible information and communication technology, and government websites follow the GIGW guidelines. How this applies to a specific private business depends on its sector and contracts, so treat this as general information and take a compliance position from a lawyer.",
      },
      {
        q: "What accessibility standard should an Indian business follow?",
        a: "WCAG 2.1 Level AA. It is the standard referenced by Indian government guidance and by procurement documents internationally, so meeting it answers the question in nearly every context where it is asked.",
      },
      {
        q: "Do accessibility overlay widgets make a site compliant?",
        a: "No. Overlays sit on top of your HTML and cannot repair missing labels, broken heading structure or unlabelled images, which is what assistive technology actually reads. Fixing the templates is more effective and does not add another script to every page.",
      },
      {
        q: "How do I test my website's accessibility for free?",
        a: "Navigate your main journey with the keyboard only, zoom the page to 200 per cent and check that text reflows, and read the page with a free screen reader such as NVDA or VoiceOver. These three tests find issues that automated scanners cannot, because most WCAG criteria depend on judgement about meaning rather than on a rule a tool can check.",
      },
      {
        q: "Does accessibility improve SEO?",
        a: "Indirectly and meaningfully. Alt text, proper heading structure, real text instead of images of text, and descriptive link text all help search engines understand a page. Accessibility is not itself a ranking factor, but the practices overlap heavily with technical SEO.",
      },
      {
        q: "How much of a website needs to be fixed first?",
        a: "Start with the revenue journey — the pages between a visitor arriving and submitting an enquiry or completing a purchase. Fix those templates, since one template fix applies to every page built on it, then work outward to the rest of the site.",
      },
    ],

    author: "Avani Enterprises",
  },

  /* ───────────────────────────────────────────────────────────────────────── */
  {
    slug: "progressive-web-app-vs-native-app",
    title: "Progressive Web App vs Native App: Which Fits Your Case",
    category: "Web Development",
    tags: ["Mobile Apps", "PWA", "Product", "India"],

    excerpt:
      "PWA vs native app, decided on the things that actually differ: install friction, device access, distribution, cost of change and discoverability — with the rules for choosing one.",

    metaTitle: "PWA vs Native App: Which One Fits Your Case",
    metaDescription:
      "PWA vs native app compared on install friction, device access, cost and discoverability, plus clear decision rules for picking the right one for your business.",
    metaKeywords: [
      "PWA vs native app",
      "progressive web app India",
      "mobile app development decision",
      "should I build a PWA",
    ],

    coverImage: "",

    keyTakeaways: [
      "PWA vs native app is decided by how you acquire users and what device capabilities you need, not by which technology sounds more advanced.",
      "A progressive web app removes install friction entirely, which matters most when a large share of your audience arrives once from a link and may never return.",
      "Native apps remain necessary for reliable background processing, deep hardware access and app store distribution, and no amount of web capability closes that gap fully on iOS.",
      "A PWA lives on the open web and can be found in search, whereas a native app's content is invisible to search engines unless you also publish it on a website.",
      "Shipping a change to a PWA takes a deploy; shipping a change to a native app takes a review cycle, and that difference compounds across a product's life.",
    ],

    content: `<p>Every few months a business decides it needs an app, and the conversation immediately narrows to iOS and Android without anyone asking whether an app is the right container at all. The <strong>PWA vs native app</strong> decision deserves more than a default, because the two options differ on things that directly affect whether anyone uses what you build: how hard it is to get in, what the device will let it do, and how long it takes you to change it. Here is how to make the call.</p>

<h2>What is the real difference between a PWA and a native app?</h2>
<p>A progressive web app is a website that meets a set of technical requirements — served over HTTPS, with a web app manifest and a service worker — which lets a browser install it to the home screen and run it offline; a native app is compiled software distributed through an app store and installed by the operating system. The consequence is that a PWA is reached by URL and updated by deploy, while a native app is reached by store listing and updated by review.</p>
<p>Everything that follows comes from that split. The PWA inherits the web's strengths — linkable, indexable, instantly updatable, no gatekeeper — and the web's limits on what the device will permit. The native app inherits the platform's capabilities and the platform's distribution rules.</p>

<h2>How do they compare on what actually matters?</h2>
<p>They diverge most on acquisition friction, device access and speed of iteration. The comparison we use in scoping sessions:</p>
<div class="table-wrap">
<table>
  <thead>
    <tr><th>Factor</th><th>Progressive web app</th><th>Native app</th></tr>
  </thead>
  <tbody>
    <tr><td>Getting a user in</td><td>A link — no install required</td><td>Store listing, download, install</td></tr>
    <tr><td>Discoverable in search</td><td>Yes, it is a website</td><td>No, only the store listing is</td></tr>
    <tr><td>Shipping a change</td><td>Deploy, live immediately</td><td>Build, submit, wait for review</td></tr>
    <tr><td>Offline use</td><td>Yes, via a service worker, within storage limits</td><td>Yes, with full local storage control</td></tr>
    <tr><td>Push notifications</td><td>Android yes; iOS only for home-screen-installed web apps, from iOS 16.4</td><td>Yes on both platforms</td></tr>
    <tr><td>Background processing</td><td>Limited and unreliable when the app is closed</td><td>Supported within platform rules</td></tr>
    <tr><td>Hardware access</td><td>Camera, location, basic sensors; Bluetooth and NFC vary by browser</td><td>Full access subject to permissions</td></tr>
    <tr><td>Payments</td><td>Your own payment flow on the web</td><td>Store rules may require in-app purchase for digital goods</td></tr>
    <tr><td>Codebase</td><td>One, shared with the website</td><td>One per platform, or one cross-platform codebase</td></tr>
  </tbody>
</table>
</div>

<h2>When is a PWA the right choice?</h2>
<p>Choose a PWA when most of your users arrive from a link and you cannot assume they will install anything. That describes a great deal of Indian consumer traffic: someone taps a WhatsApp message or a search result, and asking them to visit an app store first inserts a download, an install and a sign-in between them and your product — steps a first-time visitor has little reason to take. A PWA is the right call when:</p>
<ul>
  <li>The experience is content, catalogue, booking or account-based rather than hardware-driven.</li>
  <li>You need the same thing to work on desktop and mobile without maintaining separate builds.</li>
  <li>Storage space on cheaper Android phones is a genuine barrier to installing your app.</li>
  <li>You want the content to be findable in search, which a native app cannot offer.</li>
  <li>You expect to iterate frequently and cannot afford a review cycle between each change.</li>
</ul>
<p>Retail is the clearest case. A storefront that loads instantly from a link, remembers the basket and can be added to the home screen by returning customers gets the benefit of an app without the acquisition cost of one — which is directly relevant to the friction discussed in <a href="/blog/reducing-cart-abandonment-india">reducing cart abandonment</a>, and why we often build this into an <a href="/ecommerce-development-company">ecommerce project</a> rather than as a separate app.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Not sure whether you need an app at all?</h3>
  <p>Tell us who your users are and how they find you, and we will tell you whether a PWA, a native app or a better mobile website is the right answer. No obligation either way.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>When do you actually need a native app?</h2>
<p>You need native when the product depends on capabilities the browser does not grant reliably, or when the app store is genuinely your distribution channel. The clear cases:</p>
<ul>
  <li><strong>Background work while the app is closed</strong> — continuous location tracking for field staff or logistics, background sync, geofenced alerts.</li>
  <li><strong>Deep hardware integration</strong> — Bluetooth peripherals, NFC, biometric authentication tied to secure hardware, high-frame-rate camera processing.</li>
  <li><strong>Notification-driven products</strong> where a missed notification is a failure, not an inconvenience.</li>
  <li><strong>Heavy on-device computation</strong> — video editing, 3D, on-device machine learning.</li>
  <li><strong>Store distribution as an asset</strong>, where enterprise customers or a procurement process expect to find you in the store.</li>
</ul>
<p>Internal tools deserve a mention here. A field team's app that must work in low connectivity, capture photographs and sync when a signal returns is a native case more often than not, and that is the sort of scope we handle as <a href="/mobile-app-development-company">mobile app development</a> rather than as web work.</p>

<h2>What can a PWA not do reliably on iOS?</h2>
<p>iOS supports progressive web apps, but with meaningful limits that you should plan around rather than discover late. Web push notifications work on iOS from version 16.4, but only for web apps the user has added to the home screen — so notifications are not available to a casual visitor who never installed. Installation itself is a manual sequence through the share sheet rather than a prompt the site can trigger, so any plan that depends on iPhone users installing the web app has to account for a step they must find on their own. Storage granted to a web app can be reclaimed by the system if the app goes unused for an extended period, so treat local data as a cache and never as the only copy. Access to Bluetooth and NFC from the browser is limited compared with Android.</p>
<p>None of these rule a PWA out. They do mean that if your business model depends on a notification reaching an iPhone user who has not installed anything, a PWA cannot carry it.</p>

<h2>Is cross-platform a third option?</h2>
<p>Yes — frameworks such as React Native and Flutter produce genuinely native apps from a single codebase, so they sit alongside native rather than between native and web. They change the economics of building for two platforms; they do not change what the platforms permit. If your requirement is background processing or hardware access, cross-platform still gets you there, and the choice becomes a question of team skills and library support rather than capability.</p>

<h2>Does a PWA help you get found in a way an app cannot?</h2>
<p>Yes — a PWA is a website, so every screen can have a URL, be indexed, be linked to and be shared, while a native app's contents are invisible to search engines. This is the most underrated difference in the whole comparison. Content inside a native app generates no search visibility whatsoever; you have to publish it on a website separately to earn any.</p>
<p>That makes a PWA the cheaper option for a business whose acquisition depends on search or on shared links, because the same build serves both purposes. It also means the usual web disciplines still apply — the app has to be fast, and the <a href="/blog/website-speed-optimisation-checklist-india">speed checklist</a> is not optional just because it now has an icon on someone's home screen.</p>

<h2>How should you decide?</h2>
<p>Answer four questions in order. First: does the product need background processing or deep hardware access? If yes, build native and stop. Second: how do users find you — if it is search, links or WhatsApp rather than an app store, weight heavily towards a PWA. Third: how often will you change it, and can you live with a review cycle? Fourth: how many platforms must you support, and what can your team actually maintain afterwards?</p>
<p>There is also a sequence worth considering rather than a choice: ship the PWA first, learn what people use, and build native later for the specific capabilities that turn out to matter. And before either, check whether the job is really an app at all — a fast mobile website with a <a href="/blog/whatsapp-ai-chatbot-indian-business">WhatsApp channel</a> for follow-up solves a surprising number of the problems that arrive described as app requirements. We would rather say that during scoping than after a <a href="/web-development-company">build</a> has started.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Get a scoping call before you commit to a platform</h3>
  <p>We will map your requirements against what a PWA can and cannot do, and give you a written recommendation with the reasoning. There is no obligation to build it with us.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "What is a progressive web app?",
        a: "A progressive web app is a website that meets specific technical requirements — HTTPS, a web app manifest and a service worker — which allow a browser to install it to the home screen, run it in its own window and serve it offline. It is reached by URL rather than through an app store.",
      },
      {
        q: "Can a PWA send push notifications on iPhone?",
        a: "Yes, from iOS 16.4, but only if the user has added the web app to their home screen. A visitor browsing the site in Safari without installing it cannot receive web push, which matters if notifications are central to your product.",
      },
      {
        q: "Is a PWA cheaper than a native app?",
        a: "Usually, because it shares one codebase with your website and needs no separate build for each platform. The saving is largest when the same content and functions must work on desktop and mobile, and smallest when you need capabilities the browser does not grant.",
      },
      {
        q: "Do PWAs work offline?",
        a: "Yes, a service worker can cache pages and assets so the app opens and functions without a connection. Storage is subject to browser limits and can be reclaimed by the system after long periods of disuse, so local data should be treated as a cache rather than the only copy.",
      },
      {
        q: "Can a PWA be listed in the Play Store?",
        a: "Android allows a PWA to be packaged and published to the Play Store as a Trusted Web Activity, so you can have both a URL and a store listing from one build. Apple's App Store does not accept a plain web wrapper in the same way.",
      },
      {
        q: "Should I build a PWA or a native app first?",
        a: "If your requirements do not include background processing or deep hardware access, building the PWA first is usually the lower-risk order. You learn how people actually use the product without paying for two native codebases, and you can add native later for the specific capabilities that prove necessary.",
      },
    ],

    author: "Avani Enterprises",
  },
];
