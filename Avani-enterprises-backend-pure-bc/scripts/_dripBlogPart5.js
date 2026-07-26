/**
 * Drip blog posts — Part 5
 * Theme: content strategy and keyword work.
 *
 * Shape and rules: scripts/DRIP-POSTS-SPEC.md
 * readTime and canonical are computed by the seeder. Do not set them here.
 */

module.exports = [
  // ───────────────────────────────────────────────────────────────────────────
  // 1. Keyword research
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'keyword-research-for-indian-businesses',
    title: 'Keyword Research for Indian Businesses: A Working Method',
    category: 'SEO',
    tags: ['Keyword Research', 'Content Strategy', 'India'],

    excerpt:
      'A step-by-step keyword research method built for Indian search behaviour — where the data lies, how to handle Hinglish queries, and how to turn a list into a page plan.',

    metaTitle: 'Keyword Research India: A Working Method',
    metaDescription:
      'A practical keyword research India method: where to find ideas, which data source to trust, how to handle Hinglish queries, and how to turn a list into pages.',
    metaKeywords: [
      'keyword research India',
      'keyword research for Indian businesses',
      'SEO keyword strategy India',
      'Hinglish keywords',
    ],

    coverImage: '',

    keyTakeaways: [
      'Keyword tools under-report Indian long-tail queries because they estimate from sparse data, so a zero-volume term with obvious commercial meaning is still worth a page.',
      'Search Console is the only keyword source that tells you what your own site is already being shown for, which makes it the best starting point for any established business.',
      'Transliterated and Hinglish queries usually rank fine on ordinary English pages, so the sensible response is to include the phrasing in body copy rather than build separate pages.',
      'A keyword list is worthless until every cluster has been assigned to a specific page that someone has agreed to write or rewrite.',
    ],

    content: `<p>If you have searched for keyword research India guidance, you have probably read the same four steps written for a market that behaves nothing like ours. Search volumes here are spread thinly across English, transliterated Hindi and regional phrasing. Price intent is far more explicit than in Western markets. And a huge share of commercial queries carry a city name attached to them. This is the method we actually use, in order, with the failure points marked.</p>

<h2>What makes keyword research India-specific?</h2>
<p>Indian keyword research differs mainly because search demand is fragmented across languages and scripts, and because keyword tools estimate volume from samples that are thin for exactly those fragmented terms. The practical consequences are worth stating plainly:</p>
<ul>
  <li><strong>Zero-volume terms are frequently real.</strong> A tool showing no monthly searches for a specific service-plus-city phrase is telling you it has insufficient data, not that nobody searches it.</li>
  <li><strong>Price is asked directly.</strong> In our experience cost, price, charges and fees are appended to Indian service queries very commonly, and early in the journey. If your pages avoid the money question, someone else's page answers it.</li>
  <li><strong>City is part of the query, not the context.</strong> Google can infer location, but many Indian searchers still type the city because they want to filter for it explicitly.</li>
  <li><strong>The same intent arrives in several scripts.</strong> One person types the query in English, another types Hindi words in Roman script, a third types Devanagari.</li>
</ul>

<h2>Where should you get keyword ideas before touching a tool?</h2>
<p>Start with sources that record what customers actually said, because those are the only inputs with no estimation error in them. Work through these in order:</p>
<ol>
  <li><strong>Your own Search Console queries.</strong> Every query in the Performance report is a real query where a real person saw your site. Sort by impressions with low clicks — that is demand you are visible for but not winning.</li>
  <li><strong>Sales call notes and WhatsApp enquiries.</strong> The exact wording of the first message a prospect sends is nearly always closer to a search query than anything a marketer invents.</li>
  <li><strong>Support tickets and FAQs.</strong> Post-sale questions become pre-sale searches for the next buyer.</li>
  <li><strong>Competitor page titles.</strong> Not their rankings — their titles. A competitor who has built twelve pages around one theme has usually validated it.</li>
  <li><strong>Autocomplete and People Also Ask.</strong> These are generated from real query logs, which makes them qualitatively different from tool estimates.</li>
</ol>
<p>Only after that list exists do you open a keyword tool, and then you use it to expand and prioritise, not to originate.</p>

<h2>Which keyword data source should you trust?</h2>
<p>Each source is reliable for one thing and misleading for another, so use them for what they are good at rather than looking for a single number to believe.</p>

<table>
  <thead>
    <tr><th>Source</th><th>Best used for</th><th>Where it misleads</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Google Search Console</td>
      <td>Queries you already appear for, and your true average position on them</td>
      <td>Shows nothing for topics you have never published on; the interface limits how many rows you can inspect</td>
    </tr>
    <tr>
      <td>Google Keyword Planner</td>
      <td>Relative demand between two head terms, and forecast cost signals</td>
      <td>Buckets volumes into wide ranges without ad spend, and groups close variants into one figure</td>
    </tr>
    <tr>
      <td>Third-party SEO tools</td>
      <td>Competitor coverage, question discovery, bulk clustering</td>
      <td>Indian long-tail volumes are modelled, not measured, and are routinely under-stated</td>
    </tr>
    <tr>
      <td>Autocomplete and People Also Ask</td>
      <td>Real phrasing, including regional and Hinglish forms</td>
      <td>Gives no volume at all, and is personalised by location and history</td>
    </tr>
    <tr>
      <td>Sales and support records</td>
      <td>Commercial value and the language buyers use</td>
      <td>Reflects the customers you already reach, not the ones you are missing</td>
    </tr>
  </tbody>
</table>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Not sure which keywords are worth a page?</h3>
  <p>Send us your site and we will tell you which queries you are already close to winning and which ones are not worth the effort. No obligation, and you keep the list either way.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>How do you separate keywords worth targeting from ones worth ignoring?</h2>
<p>Judge each keyword on three things — who is searching, what already ranks, and whether you can honestly be the best answer — rather than on volume alone. A term passes if all three hold.</p>
<h3>Who is searching</h3>
<p>Read the query as a sentence a person would say out loud. "Best CRM" and "CRM pricing for 20 users" have similar shapes and completely different buyers. If you cannot picture the person, do not build the page.</p>
<h3>What already ranks</h3>
<p>Open the results. If page one is entirely directories, marketplaces or news, the query has been claimed by a page type you are not. If page one is thin service pages, you have room. This check takes two minutes and saves months, and it is the same check that underpins <a href="/blog/search-intent-mapping-funnel">mapping search intent to your funnel</a>.</p>
<h3>Whether you can be the best answer</h3>
<p>If you have no experience, no data and nothing to say that the top three pages have not already said, the honest answer is that you should not target the term yet.</p>

<h2>What do you do about Hinglish and transliterated queries?</h2>
<p>In most cases you do not build separate pages for them — you make sure the phrasing appears naturally in body copy on the page that already targets the intent. Google handles transliteration between Roman and Devanagari reasonably well for common terms, so a well-optimised English page frequently picks up the Hinglish variants without a duplicate.</p>
<p>Build a genuinely separate page only when the intent differs, not merely the script. A page written for a Hindi-first audience should be written in Hindi throughout, with its own examples and its own hreflang setup, or not built at all. Half-translated pages perform badly and create duplication problems.</p>

<h2>How do you turn a keyword list into a page plan?</h2>
<p>Group by intent first, then assign every group to exactly one URL, and mark whether that URL exists, needs rewriting or needs creating. This is the step most keyword projects skip, and it is the reason so many spreadsheets die unused.</p>
<ul>
  <li><strong>Cluster by answer, not by string.</strong> If two queries would be satisfied by the same paragraph, they belong on the same page. That is the core principle behind <a href="/blog/topic-clusters-and-pillar-pages">topic clusters and pillar pages</a>.</li>
  <li><strong>One URL per intent.</strong> Two pages chasing the same intent will split their own signals and neither will settle.</li>
  <li><strong>Mark the owner and the state.</strong> Create, rewrite, merge or leave alone. Anything without an owner will not happen.</li>
  <li><strong>Order by effort against likelihood.</strong> Queries where you already rank on page two usually move faster than anything you start from nothing.</li>
</ul>
<p>For location-led terms the same logic applies, but the page has to earn its city — see the <a href="/blog/local-seo-checklist-indian-smb">local SEO checklist for Indian SMBs</a> before spinning up city pages, and read <a href="/guides/how-to-choose-an-seo-agency">how to choose an SEO agency</a> if you are outsourcing the build.</p>

<h2>How often should the keyword list be revisited?</h2>
<p>Revisit it quarterly using Search Console rather than the original tool export, because your own impression data will have moved even where tool estimates have not. Look for queries that appeared without you targeting them, queries that lost position, and queries where impressions rose but clicks did not.</p>
<p>That last pattern usually means your title and description are not matching the intent, which is a rewrite job rather than a research job. Our <a href="/seo-company">SEO team</a> runs this review as a standing item, and where content volume is the bottleneck we pair it with <a href="/ai-content-services">AI-assisted content production</a> that still goes through human editing. For businesses concentrated in the NCR, the same method with a city layer sits behind our <a href="/seo-company-gurgaon">Gurgaon SEO work</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want this run on your site once, properly?</h3>
  <p>We will pull your Search Console data, cluster it by intent and hand back a page plan you can execute with or without us. There is no obligation to continue afterwards.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'Should I target keywords that show zero search volume in India?',
        a: 'Often yes. Keyword tools estimate Indian long-tail volume from thin samples, so a specific service-plus-city phrase can show zero and still bring enquiries. Judge it on whether a real buyer would type it and whether the query has obvious commercial meaning, not on the number.',
      },
      {
        q: 'How many keywords should one page target?',
        a: 'One intent per page, which in practice covers a cluster of closely related phrasings rather than a single string. If two queries would be answered by the same paragraph, they belong on the same page. If they need different answers, they need different pages.',
      },
      {
        q: 'Do I need separate pages for Hindi and English keywords?',
        a: 'Only if the audience genuinely reads in Hindi. A fully written Hindi page with its own examples and hreflang setup is worth building; a half-translated copy of an English page is not. Transliterated Hinglish queries usually resolve to the English page on their own.',
      },
      {
        q: 'Is Google Keyword Planner enough on its own?',
        a: 'No. Without meaningful ad spend it shows volumes in wide ranges and groups close variants into a single figure, which hides the specific long-tail terms that convert. Use it for relative demand between head terms and get your specifics from Search Console and real customer language.',
      },
      {
        q: 'How long does keyword research take for a small business?',
        a: 'The research itself is usually a few days of focused work. The part that takes longer is the page plan and the writing that follows it. We do not quote ranking timelines, because they depend on competition, site history and how much content actually gets published.',
      },
    ],

    author: 'Avani Enterprises',
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 2. Topic clusters and pillar pages
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'topic-clusters-and-pillar-pages',
    title: 'Topic Clusters and Pillar Pages, Explained Properly',
    category: 'SEO',
    tags: ['Content Strategy', 'Site Architecture', 'SEO'],

    excerpt:
      'What a topic cluster actually is, what a pillar page is not, why most clusters fail, and the order you should build one in so the internal linking does its job.',

    metaTitle: 'Topic Clusters Pillar Pages: A Practical Guide',
    metaDescription:
      'Topic clusters pillar pages explained without jargon: what goes on the pillar, what goes on cluster pages, why clusters fail, and the order to build one in.',
    metaKeywords: [
      'topic clusters pillar pages',
      'pillar page SEO',
      'content cluster strategy',
      'site architecture SEO',
    ],

    coverImage: '',

    keyTakeaways: [
      'A topic cluster is a set of pages that share one subject and link to each other deliberately, with one broad page acting as the entry point for the whole set.',
      'A pillar page is not a long article — it is a page that covers the full breadth of a topic shallowly and hands off depth to the cluster pages it links to.',
      'Clusters commonly fail because the cluster pages never link back to the pillar or to each other, leaving a hub-and-spoke diagram that exists in the plan but not in the HTML.',
      'If two cluster pages answer the same question, they will compete with each other, and merging them almost always beats trying to differentiate them.',
    ],

    content: `<p>Search for topic clusters pillar pages advice and you will get a diagram: a big circle in the middle, small circles around it, arrows everywhere. The diagram is fine. What it leaves out is the part that determines whether the thing works — what goes on each page, what order you build them in, and what to do when two pages start fighting. This post covers those.</p>

<h2>What actually is a topic cluster?</h2>
<p>A topic cluster is a group of pages covering one subject, where a single broad page links to every specific page and every specific page links back. That is the whole definition. It is an architecture decision, not a content format.</p>
<p>The reason it helps is mechanical rather than mystical. Internal links are how a crawler discovers pages and how it infers what a page is about from the anchor text pointing at it. When ten pages on one subject link to each other with descriptive anchors, the crawler gets a consistent signal about the subject and about which page is the main one. When those ten pages sit unlinked in a chronological blog feed, it gets nothing.</p>

<h2>What is a pillar page, and what is it not?</h2>
<p>A pillar page is a page that covers the full breadth of a topic at shallow depth and links out to the pages that cover each part in detail. It is not simply a very long article, and it is not a table of contents with no content of its own.</p>
<p>The distinction matters because both failure modes are common:</p>
<ul>
  <li><strong>The 6,000-word monolith.</strong> Everything is on one page, nothing links anywhere, and the page tries to rank for twenty different intents at once. It usually ranks for none of them well.</li>
  <li><strong>The link list.</strong> A page with a heading and ten links. Nothing to quote, nothing to rank, no reason for anyone to stay.</li>
</ul>
<p>A working pillar answers the broad question well enough to stand alone, then says plainly where to go for depth on each sub-question.</p>

<h2>How is a pillar page different from a cluster page?</h2>
<p>They differ in the query they target, the depth they go to, and the direction their links point. Getting these confused is what produces the monolith.</p>

<table>
  <thead>
    <tr><th></th><th>Pillar page</th><th>Cluster page</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Targets</td>
      <td>The broad head term for the subject</td>
      <td>One specific question or sub-topic</td>
    </tr>
    <tr>
      <td>Depth</td>
      <td>Wide, deliberately shallow on each part</td>
      <td>Narrow, exhaustive on its one part</td>
    </tr>
    <tr>
      <td>Links</td>
      <td>Out to every cluster page</td>
      <td>Back to the pillar, and sideways to siblings</td>
    </tr>
    <tr>
      <td>Update rhythm</td>
      <td>Revised whenever a cluster page is added</td>
      <td>Revised when the specific answer changes</td>
    </tr>
    <tr>
      <td>Success looks like</td>
      <td>Rankings on the head term, plus traffic distributed to children</td>
      <td>Rankings on its own long-tail set</td>
    </tr>
  </tbody>
</table>

<h2>Why do topic clusters fail?</h2>
<p>Clusters usually fail for structural reasons, not content-quality reasons. In roughly the order we see them:</p>
<h3>The links only go one way</h3>
<p>The pillar links out. The cluster pages never link back. The diagram exists in the strategy deck and not in the HTML. Every cluster page needs at least one contextual link back to the pillar inside a sentence, not in a sidebar widget. The mechanics of this are covered properly in our post on <a href="/blog/internal-linking-strategy-that-works">an internal linking strategy that actually works</a>.</p>
<h3>Two cluster pages answer the same question</h3>
<p>This is keyword cannibalisation arriving through the back door. It happens when a cluster is planned from a keyword export rather than from distinct questions. If you cannot state in one sentence what page A answers that page B does not, merge them.</p>
<h3>The cluster is built around a topic nobody searches</h3>
<p>A cluster is a big commitment of writing time. Validating the subject before you commit is the point of doing <a href="/blog/keyword-research-for-indian-businesses">keyword research properly</a> first.</p>
<h3>It is never finished</h3>
<p>Three of nine planned pages get published, the pillar links to six that do not exist, and the whole thing sits half-built. A three-page cluster that is complete beats a nine-page cluster that is a third done.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Have half-built clusters sitting on your blog?</h3>
  <p>We will map what you have published against the topics you actually sell into, and show you which gaps are worth filling first. No obligation to work with us afterwards.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>How do you decide what deserves to be a pillar?</h2>
<p>A subject earns a pillar when it is broad enough to raise at least five genuinely different questions and commercially close enough that answering them puts you nearer a sale. Both conditions have to hold.</p>
<p>Test it by writing the five sub-questions before you write anything else. If you struggle past three, the subject is a single page, not a cluster. If the five questions have nothing to do with what you sell, the cluster will bring traffic that never converts — pleasant on a dashboard, useless in a pipeline.</p>
<p>A practical shortcut for service businesses: your service pages are usually the commercial pillars already. Our <a href="/seo-company">SEO services page</a> and the individual <a href="/guides">guides</a> behind it work exactly this way — the service page carries the breadth, each guide carries one decision in depth.</p>

<h2>In what order should you build a cluster?</h2>
<p>Build the cluster pages first and the pillar last, because the pillar has to link to pages that exist. The reverse order produces a pillar full of dead links and good intentions.</p>
<ol>
  <li><strong>Write the question list.</strong> Five to twelve distinct questions, each stated as a question a person would type.</li>
  <li><strong>De-duplicate ruthlessly.</strong> Combine any two that share an answer.</li>
  <li><strong>Publish the three highest-value cluster pages.</strong> Highest value usually means closest to a buying decision, not highest volume.</li>
  <li><strong>Write the pillar.</strong> One section per cluster page, each section a real answer in its own right, each linking to the full treatment.</li>
  <li><strong>Go back and link.</strong> Every cluster page gets a contextual link up to the pillar and at least one sideways to a sibling.</li>
  <li><strong>Add the remaining pages over time</strong>, updating the pillar each time you publish.</li>
</ol>
<p>If the cluster spans templated pages rather than articles — product categories, location pages, integrations — the same order applies, but the linking has to be built into the template by whoever handles your <a href="/web-development-company">web development</a>, not added by hand.</p>

<h2>How do you know the cluster is working?</h2>
<p>Judge a cluster on the head term's position and on whether the cluster pages are collecting long-tail impressions, not on the traffic of any single page. A cluster works as a unit or not at all.</p>
<p>Three checks in Search Console, at the property level, filtered to the cluster's URL folder:</p>
<ul>
  <li><strong>Total impressions across the folder.</strong> Rising impressions with flat clicks means the pages are being shown for queries they do not answer well — a rewrite signal.</li>
  <li><strong>Which URL ranks for the head term.</strong> If a cluster page outranks the pillar for the broad query, your depth is in the wrong place. Either promote that page to pillar or strengthen the pillar's coverage.</li>
  <li><strong>Query overlap between two pages.</strong> The same query returning two of your URLs on different days is cannibalisation. Merge, or make the difference explicit.</li>
</ul>
<p>Older clusters need maintenance rather than expansion, which is a different job — see <a href="/blog/content-refresh-strategy-old-posts">how to get more from posts you already have</a>. If you want a sense of how we approach structural work like this before committing to it, our <a href="/case-studies">case studies</a> are the place to look.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Planning your first cluster?</h3>
  <p>Tell us the subject and we will sketch the pillar, the sub-questions worth their own pages, and the build order. You are free to take the plan and run it yourself.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'How long should a pillar page be?',
        a: 'Long enough to answer the broad question and introduce each sub-topic, and no longer. Length is a symptom, not a target. If the pillar is getting very long, the sections that grew are telling you which cluster pages to write next rather than telling you the pillar is doing well.',
      },
      {
        q: 'Can a service page be a pillar page?',
        a: 'Yes, and for most businesses it should be. A service page already targets the broad commercial term and already needs to explain the full scope of what you do. Linking it to supporting guides turns it into a pillar without creating a duplicate page.',
      },
      {
        q: 'How many pages does a topic cluster need?',
        a: 'Three completed pages plus a pillar is a working cluster. There is no minimum that unlocks anything. A small cluster that is finished is generally more useful than a large one where half the planned pages were never published, because the pillar can only link to pages that exist.',
      },
      {
        q: 'What is the difference between a topic cluster and a content silo?',
        a: 'A silo restricts linking so that pages only link within their own section, usually enforced by URL structure. A cluster links freely within a subject and permits cross-links between clusters where they genuinely help the reader. Clusters are the more forgiving model for most sites.',
      },
      {
        q: 'Do topic clusters still matter for AI search?',
        a: 'The linking structure matters less to a language model than it does to a crawler, but the discipline behind it matters more. Clusters force one clear answer per question, which is exactly the format answer engines quote from.',
      },
    ],

    author: 'Avani Enterprises',
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 3. Content refresh
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'content-refresh-strategy-old-posts',
    title: 'Content Refresh: Getting More From Posts You Already Have',
    category: 'SEO',
    tags: ['Content Strategy', 'SEO', 'Content Refresh'],

    excerpt:
      'Which old posts to refresh first, which to merge or delete, what to actually change on the page, and what a refresh cannot fix no matter how much you edit.',

    metaTitle: 'Content Refresh Strategy: Update Old Posts',
    metaDescription:
      'A content refresh strategy that works: how to triage old posts, what to change on the page, when to merge or delete, and why changing the URL usually costs you.',
    metaKeywords: [
      'content refresh strategy',
      'updating old blog posts SEO',
      'content pruning',
      'republishing content',
    ],

    coverImage: '',

    keyTakeaways: [
      'The best refresh candidates are posts ranking between positions five and twenty, because they already have relevance signals that a rewrite can build on.',
      'Changing the URL of a post you are refreshing adds redirect risk for no ranking benefit, so keep the URL and change everything else.',
      'Merging two thin posts that answer the same question into one strong page is usually a bigger win than improving either of them separately.',
      'A refresh cannot fix a post that targets a query the site has no business ranking for — that post should be deleted or redirected, not rewritten.',
    ],

    content: `<p>Every site that has published for more than a year is sitting on posts that once earned traffic and no longer do. A content refresh strategy is how you try to win that traffic back without writing anything new. It usually costs less than commissioning fresh content, and it is routinely skipped because nothing on the publishing calendar ever tells anyone to do it.</p>
<p>The work splits into three decisions: which posts to touch, what to change, and what to stop maintaining altogether.</p>

<h2>Which posts should you refresh first?</h2>
<p>Refresh posts that rank on page two for queries you care about, ahead of everything else. Those pages have already proven relevance to Google; they are held back by depth, freshness or intent match, and all three respond to editing.</p>
<p>Work through these five signals in Search Console, in this order:</p>
<ol>
  <li><strong>Positions five to twenty on a commercially relevant query.</strong> The shortest distance between effort and result.</li>
  <li><strong>Impressions rising, clicks flat.</strong> You are being shown and not chosen. This is usually a title and meta description problem, sometimes an intent mismatch.</li>
  <li><strong>Steady decline over two or more quarters.</strong> Something in the results moved past you. Read the current top three and find what they cover that you do not.</li>
  <li><strong>Ranking for the wrong query.</strong> A page pulling impressions for a query it does not really answer is a page that needs its angle rewritten, or a new page carved out of it.</li>
  <li><strong>Factually stale.</strong> Prices, tool names, screenshots, statutory references. Being wrong is worse than being old.</li>
</ol>
<p>Posts sitting beyond position thirty are usually not refresh candidates. They are either targeting the wrong thing or competing above their weight, and that is a strategy problem rather than an editing problem.</p>

<h2>Which posts should you not refresh?</h2>
<p>Leave alone anything that is either performing well or beyond saving, and be honest about the second category. Three specific cases:</p>
<h3>Posts that should be merged</h3>
<p>If two posts answer the same question, they are splitting their own signals and one should be folded into the other, with a redirect from the weaker URL to the stronger. Keep the URL that has the better link profile and history, not the one with the nicer slug. Before doing this, check that you have not already fixed the same overlap with a canonical — the traps are listed in <a href="/blog/canonical-tags-common-mistakes">common canonical tag mistakes</a>.</p>
<h3>Posts that should be deleted</h3>
<p>Content written to fill a calendar, targeting queries unrelated to what you sell, with no links and no impressions, is not an asset. Removing it and returning a 410, or redirecting it where a genuinely relevant page exists, is a legitimate move. Do not redirect everything to the homepage — irrelevant redirects get treated as soft 404s.</p>
<h3>Posts that are simply fine</h3>
<p>A page holding position two does not need your attention. Editing it introduces risk for no gain. The temptation to touch your best pages during a refresh sprint is strong and should be resisted.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Not sure which of your old posts are worth saving?</h3>
  <p>We will go through your Search Console data and sort your archive into refresh, merge and remove. You get the list whether or not you take the work further with us.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What do you actually change in a refresh?</h2>
<p>Run the page through four separate passes rather than editing loosely from top to bottom, because each pass looks for something different and mixing them means missing things.</p>
<h3>Pass one — intent</h3>
<p>Open the current results for the target query and ask whether the page still matches what searchers are being shown. If page one has shifted from articles to comparison pages, no amount of polishing the prose will help; the page needs restructuring towards comparison. This is the pass that most often reveals the post should be split in two.</p>
<h3>Pass two — the opening</h3>
<p>Rewrite the first hundred words so the main question is answered immediately. Old posts almost always open with throat-clearing about how important the topic is. Cut it. This pass also does most of the work for AI answer engines, which lift direct answers and skip preamble.</p>
<h3>Pass three — substance</h3>
<p>Add what the page is missing rather than rewording what is there. Look for: unanswered follow-up questions, missing steps in a process, no mention of trade-offs, and outdated tool or product names. Add an FAQ block if the query attracts a People Also Ask box. Where the topic warrants it, a comparison table often adds more than three new paragraphs.</p>
<h3>Pass four — links and metadata</h3>
<p>Add internal links to pages published since this post went live, in both directions — new posts should link back to the refreshed one too. Rewrite the title and meta description to match the query that actually earns impressions. Check that images still load and that any embedded tools still exist.</p>

<h2>Should you change the URL or the published date?</h2>
<p>Keep the URL, and update the date only if the content genuinely changed in substance. Changing a URL means a redirect, and a redirect is a small avoidable loss with no upside when the old URL is already indexed and ranking.</p>
<p>On dates, the useful distinction is between a visible date and a structured one. Showing an updated date to readers is honest and helpful when the update was real. Changing the publish date on a post you touched lightly, to make it look new, is the sort of pattern that erodes trust in the whole archive. If you maintain both dates, use <code>datePublished</code> and <code>dateModified</code> in your schema and let them tell the truth.</p>
<p>If a refresh does force a URL change — a restructure, a migration, a category rename — treat it with the same care as a site move. The failure modes are the same ones covered in <a href="/blog/website-redesign-without-losing-rankings">redesigning a website without losing rankings</a>.</p>

<h2>How long before a refresh shows anything?</h2>
<p>Google has to recrawl and reassess the page first, which means nothing happens until the crawl does. For a well-linked page on a healthy site that is often quick; for a page buried three levels deep on a slow site it can take considerably longer.</p>
<p>You can help it along: submit the URL in Search Console, link to the refreshed page from something that gets crawled often, and make sure your sitemap's lastmod value actually updated. If pages are not being recrawled at all, the problem is upstream of your content — start with <a href="/guides/why-google-is-not-indexing-my-pages">why Google is not indexing your pages</a> and the fixes in <a href="/blog/google-search-console-fix-common-issues">Search Console's common issues</a>.</p>

<h2>How should a refresh cycle be scheduled?</h2>
<p>Treat it as a fixed share of your content capacity rather than an occasional project, because refresh work loses every argument against new content unless it has protected time. A common working split is to spend part of each month's content budget on refreshing and the remainder on new pages.</p>
<p>Two habits make the cycle stick:</p>
<ul>
  <li><strong>Keep a single sheet of every published URL</strong> with its target query, current position, last refresh date and next review date. Without it, refresh decisions get made from memory.</li>
  <li><strong>Refresh in clusters, not singles.</strong> Updating six related posts together lets you fix the internal linking between them in the same sitting, which is half the value — see <a href="/blog/topic-clusters-and-pillar-pages">topic clusters and pillar pages</a>.</li>
</ul>
<p>Our <a href="/seo-company">SEO team</a> builds refresh cycles into retainers for exactly this reason, and for teams producing at volume we pair the editing pass with <a href="/ai-content-services">AI-assisted content workflows</a> that keep a human in the editing seat. The same cycle is part of how we work on <a href="/seo-company-mumbai">SEO in Mumbai</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Sitting on an archive nobody has touched in two years?</h3>
  <p>We will show you what a first refresh sprint would cover on your site and roughly what it would take to run. No obligation, and no pressure to sign anything.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'How often should blog posts be refreshed?',
        a: 'Review each post at least once a year and refresh only the ones the data flags. Refreshing on a fixed schedule regardless of performance wastes effort on pages that are already fine and introduces risk on pages that are ranking well.',
      },
      {
        q: 'Does changing the publish date help SEO?',
        a: 'Not on its own. Freshness is assessed from the content itself, not from a date string. Updating the visible date after a genuine rewrite is honest and useful to readers; changing it after a cosmetic edit is not, and it makes your whole archive harder to trust.',
      },
      {
        q: 'Should I delete old blog posts that get no traffic?',
        a: 'Delete or redirect them only if they also have no backlinks, no relevance to what you sell and no conversion role. A page with no traffic but a link from a credible source is still worth keeping. When you do remove pages, redirect to a genuinely related page or return a 410 rather than sending everything to the homepage.',
      },
      {
        q: 'Is it better to refresh an old post or write a new one?',
        a: 'Refresh, if a page already exists for that query. Publishing a second page for the same intent creates competition with your own content and usually leaves both pages weaker. Write new content for questions you have never covered.',
      },
      {
        q: 'What should I do if a refreshed post drops in rankings?',
        a: 'Wait for a full recrawl and reassessment before reacting, then compare what you removed against what the current top results contain. In our experience the common cause is a section cut for tidiness that was actually carrying relevance. Restoring that coverage is the first thing to try, though no edit can be relied on to return a page to a given position.',
      },
    ],

    author: 'Avani Enterprises',
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 4. Search intent mapping
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'search-intent-mapping-funnel',
    title: 'Mapping Search Intent to Your Funnel',
    category: 'SEO',
    tags: ['Search Intent', 'Content Strategy', 'Digital Marketing'],

    excerpt:
      'How to read intent from a query, why the results page is the real answer, and which page type, offer and metric belong at each stage of the funnel.',

    metaTitle: 'Search Intent Mapping for Your Funnel',
    metaDescription:
      'Search intent mapping made practical: read intent from the query and the SERP, match each stage to the right page type and offer, and stop measuring it wrongly.',
    metaKeywords: [
      'search intent mapping',
      'search intent SEO',
      'funnel content mapping',
      'commercial intent keywords',
    ],

    coverImage: '',

    keyTakeaways: [
      'Search intent is decided by the results Google already shows for a query, not by the category label you assign to the keyword.',
      'The most common funnel leak is sending informational traffic to a page built to sell, which fails on both counts.',
      'A page can serve only one intent well, so a query with mixed results usually needs two pages rather than one compromise.',
      'Top-of-funnel pages should be measured on assisted conversions and returning visits, never on direct enquiries.',
    ],

    content: `<p>Search intent mapping is the step between having a keyword list and knowing what to build. Skip it and you get the usual outcome: a blog full of articles that rank and never convert, sitting alongside service pages that convert and never rank. The two problems are the same problem, and it is a mapping problem.</p>

<h2>What is search intent mapping?</h2>
<p>Search intent mapping is the process of deciding, for every query you target, what the searcher is trying to do and therefore what kind of page and what kind of offer belongs in front of them. It converts a keyword list into a specification for pages.</p>
<p>The four classic intent types still hold up: informational, navigational, commercial investigation and transactional. What matters more than the labels is that each type implies a different page format, a different call to action and a different definition of success.</p>

<h2>How do you read intent from a query?</h2>
<p>Read the modifier words first, because they carry the intent far more reliably than the subject does. The same subject changes intent entirely depending on what wraps it.</p>
<ul>
  <li><strong>Informational:</strong> what, why, how, guide, checklist, meaning, difference between.</li>
  <li><strong>Commercial investigation:</strong> best, top, vs, comparison, alternatives, review, is X worth it.</li>
  <li><strong>Transactional:</strong> buy, price, cost, charges, quote, hire, near me, plus a city name.</li>
  <li><strong>Navigational:</strong> a brand name, a product name, login, contact.</li>
</ul>
<p>Indian search behaviour makes the transactional signals unusually explicit. Cost and price modifiers appear early in the journey here, which means a page that refuses to discuss money loses people who were genuinely ready. If your pricing is genuinely variable, publish the ranges and the variables — our <a href="/guides/website-development-cost-india">guide to website development cost in India</a> exists precisely because that query deserves real ₹ ranges rather than a contact form.</p>

<h2>Why does the results page decide intent, not you?</h2>
<p>Because Google has already tested which page types satisfy that query, and the current page one is the outcome of that test. Your reading of the keyword is a hypothesis; the results page is evidence.</p>
<p>Check it before writing anything. Open an incognito window, run the query, and note what is actually ranking: articles, product pages, category pages, a map pack, a video carousel, forum threads. If nine of ten results are one format and you publish the tenth format, you are asking Google to change its mind about the query. That occasionally works. It is not a plan.</p>
<p>This check also tells you when a query is not worth targeting at all — if the whole page is directories and aggregators, the intent is "give me a list of providers", and a single provider's page rarely satisfies it. The related problem of queries answered entirely on the results page is covered in <a href="/blog/zero-click-search-what-to-do-about-it">what to do about zero-click search</a>.</p>

<h2>What page type belongs to each intent?</h2>
<p>Each intent maps to a specific page format, offer and metric, and mixing them is what produces pages that do neither job. This is the table we work from.</p>

<table>
  <thead>
    <tr>
      <th>Intent</th>
      <th>Typical query</th>
      <th>Page to build</th>
      <th>Sensible next step</th>
      <th>How to measure it</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Informational</td>
      <td>how to, what is, checklist</td>
      <td>Guide, tutorial, glossary entry</td>
      <td>Read another page, subscribe</td>
      <td>Assisted conversions, return visits</td>
    </tr>
    <tr>
      <td>Commercial investigation</td>
      <td>best, vs, alternatives, review</td>
      <td>Comparison page, buyer's guide, case study</td>
      <td>Book a call, request a proposal</td>
      <td>Enquiries started, demo requests</td>
    </tr>
    <tr>
      <td>Transactional</td>
      <td>price, cost, hire, near me</td>
      <td>Service page, product page, local landing page</td>
      <td>Enquire, buy, call</td>
      <td>Enquiries completed, revenue</td>
    </tr>
    <tr>
      <td>Navigational</td>
      <td>brand name, login, contact</td>
      <td>Home, contact, support, dedicated brand page</td>
      <td>Complete the task quickly</td>
      <td>Task completion, support deflection</td>
    </tr>
  </tbody>
</table>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Getting traffic that never turns into enquiries?</h3>
  <p>We will look at which intents your pages are actually catching and where the mismatch sits. You will get the findings regardless of whether you engage us for the fix.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Where do most funnels leak?</h2>
<p>The most common leak is putting a hard sell on an informational page and nothing at all on a commercial one. Both are intent mismatches and both are avoidable. The patterns worth checking on your own site:</p>
<h3>A how-to page with an enquiry form as its only exit</h3>
<p>Someone reading a how-to guide is not ready to talk to sales. The right next step is another page that moves them one stage on. Give the guide a genuine onward link, not a form.</p>
<h3>A comparison query answered with a service page</h3>
<p>Queries containing "vs" or "best" expect a page that discusses more than one option, including options you do not sell. A service page that pretends alternatives do not exist reads as evasive and rarely holds a position on those queries.</p>
<h3>Transactional queries landing on the blog</h3>
<p>If a query with price or hire in it lands on an article, the reader has to navigate to a page that can actually take the enquiry, and many of them will not bother. That is a page-build job, and the conversion mechanics are covered in <a href="/blog/landing-page-conversion-optimisation">landing page conversion optimisation</a>.</p>
<h3>Paid and organic chasing the same stage</h3>
<p>Ads are usually best pointed at transactional intent, where the buyer is close, while organic content can afford to work further up the funnel. Deciding which channel takes which stage is the practical version of the question in <a href="/guides/google-ads-vs-meta-ads-which-first">Google Ads vs Meta Ads: which first</a>.</p>

<h2>How do you handle queries with mixed intent?</h2>
<p>Build two pages and let each one target its half, rather than a single page that hedges. A results page showing both articles and product pages is telling you the query has two populations behind it, and a compromise page satisfies neither.</p>
<p>The exception is when one intent clearly dominates and the other is a minority. There you build for the dominant intent and serve the minority with a single clear link near the top — a line saying "looking for pricing instead? here it is" costs you a sentence and rescues the other half of the audience.</p>

<h2>How do you measure whether the mapping is right?</h2>
<p>Measure each page against the metric for its stage, not against enquiries, because judging a top-of-funnel page on direct conversions guarantees you will delete pages that were doing their job.</p>
<p>Three checks that expose a mapping problem quickly:</p>
<ul>
  <li><strong>Bounce with no scroll on commercial pages.</strong> People arrived expecting one thing and found another. Compare your page against the current top three results.</li>
  <li><strong>High engagement, zero onward clicks on informational pages.</strong> The page satisfied the reader and then offered nowhere to go. Add a genuine next step.</li>
  <li><strong>Impressions on queries at a different stage than the page serves.</strong> This is the clearest signal in Search Console that a page is being pulled towards an intent it does not serve, and often means a second page is warranted.</li>
</ul>
<p>Getting these attributed correctly matters as much as the mapping itself — <a href="/blog/keyword-research-for-indian-businesses">keyword research</a> feeds the map, but your analytics tells you whether the map was right. If the whole funnel needs building rather than fixing, that is what our <a href="/digital-marketing-company">digital marketing team</a> does, with the organic side handled by our <a href="/seo-company">SEO practice</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want your keyword list mapped to actual pages?</h3>
  <p>Send us the list and we will mark each cluster with its intent, the page type it needs and the metric it should be judged on. There is no obligation attached.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'What are the four types of search intent?',
        a: 'Informational, navigational, commercial investigation and transactional. Informational queries want an explanation, navigational queries want a specific site, commercial investigation queries are comparing options, and transactional queries are ready to act. Each needs a different page format and a different call to action.',
      },
      {
        q: 'How do I find the search intent of a keyword?',
        a: 'Run the query and look at what already ranks. The page types on page one are the clearest available evidence of what Google has found satisfies that query. Modifier words in the query give you a first hypothesis, but the results page settles it.',
      },
      {
        q: 'Can one page target multiple search intents?',
        a: 'Rarely, and it usually does both jobs badly. If the results page for a query shows two different page formats, that is a sign to build two pages. The exception is when one intent clearly dominates, in which case build for it and link the minority audience elsewhere near the top.',
      },
      {
        q: 'Should blog posts have a sales call to action?',
        a: 'Only one appropriate to the reader stage. An informational post should offer a next step that continues the journey, such as a deeper guide or a comparison. A hard enquiry form on a how-to page tends to be ignored and makes the page feel less trustworthy.',
      },
      {
        q: 'Does search intent change over time?',
        a: 'Yes. Google reassesses which page types satisfy a query, and the mix on page one shifts as user behaviour changes. Re-checking the results page for your important queries once or twice a year catches pages that have quietly become the wrong format.',
      },
    ],

    author: 'Avani Enterprises',
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 5. Internal linking
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'internal-linking-strategy-that-works',
    title: 'An Internal Linking Strategy That Actually Works',
    category: 'SEO',
    tags: ['Internal Linking', 'Technical SEO', 'Site Architecture'],

    excerpt:
      'What internal links actually do, why most linking strategies fail, how to choose anchor text, and a repeatable audit for finding orphan and under-linked pages.',

    metaTitle: 'Internal Linking Strategy That Actually Works',
    metaDescription:
      'An internal linking strategy built on how crawlers actually work: which pages deserve the links, what anchor text to write, and how to find orphan pages on your site.',
    metaKeywords: [
      'internal linking strategy',
      'internal links SEO',
      'anchor text best practices',
      'orphan pages',
    ],

    coverImage: '',

    keyTakeaways: [
      'Internal links do two separate jobs — they let crawlers discover pages, and their anchor text tells search engines what the destination page is about.',
      'Links inside body copy carry more weight than links in navigation, sidebars or footers, because sitewide links appear on every page and describe nothing specific.',
      'An orphan page — one with no internal links pointing at it — may never be crawled at all, no matter how good it is.',
      'Descriptive anchor text is one of the cheapest description signals you fully control, and "click here" wastes it entirely.',
    ],

    content: `<p>An internal linking strategy is one of the few pieces of SEO work that needs no new content, no outreach and no budget beyond someone's attention — and it is one of the most commonly skipped, because the effect is invisible on any single page and only shows up across the site as a whole.</p>
<p>This post covers the mechanism, the four ways strategies usually fail, and an audit you can run on any site.</p>

<h2>What do internal links actually do?</h2>
<p>Internal links do two distinct jobs, and conflating them is why so much linking advice is vague. The first is discovery: a crawler finds pages by following links, so a page nothing links to may simply never be found. The second is description: the anchor text and the sentence around it tell search engines what the destination page is about.</p>
<p>There is a third effect that gets discussed more than it deserves — the distribution of authority through a site. It is real, but it is the least controllable of the three. Discovery and description are things you can act on directly today.</p>
<p>The practical implication is that a link is doing its job when it is both findable by a crawler and descriptive of the destination. A link that fails either test is decoration.</p>

<h2>Why do most internal linking strategies fail?</h2>
<p>They fail because the links exist in places that carry no specific meaning, or because nobody owns the job. Four patterns, roughly in order of how often we find them:</p>
<h3>Everything is linked from navigation and nothing from body copy</h3>
<p>Navigation links appear on every page, which means they describe nothing about any particular page's relationship to another. A contextual link inside a paragraph says "this specific sentence relates to that specific page". A nav link says nothing at all beyond "this page exists".</p>
<h3>The related posts widget is doing all the work</h3>
<p>Automated related-post modules pick by tag or recency, not by relevance to the sentence a reader is in. They fill a slot. They rarely link the pages that most need linking, and they never link with useful anchor text.</p>
<h3>Links are added when a post is published and never again</h3>
<p>A post published in January cannot link to a post published in June. Somebody has to go back. Without a standing habit of adding backward links, every new post arrives with fewer internal links than the last.</p>
<h3>Orphan pages nobody knows exist</h3>
<p>Pages created outside the normal publishing flow — campaign landing pages, old service pages, paginated archives that dropped off — end up with nothing pointing at them. On large sites this interacts badly with how much crawling the site gets, which is the subject of <a href="/blog/crawl-budget-optimisation-large-sites">crawl budget optimisation</a>.</p>

<h2>Which pages should receive the most internal links?</h2>
<p>Point the most links at the pages that make money and the pages you most want to rank, in that order. Internal linking is one of the few signals you fully control, so spending it on your highest-value pages is the whole strategy in one sentence.</p>
<p>A workable priority order for a service business:</p>
<ol>
  <li><strong>Commercial service pages</strong> for the services you actually want more of.</li>
  <li><strong>Pillar pages</strong> that anchor a subject you are trying to own.</li>
  <li><strong>Pages sitting on page two</strong> for a valuable query, where an extra push has somewhere to go.</li>
  <li><strong>Recently published pages</strong> that need discovering quickly.</li>
</ol>
<p>Conversely, be sparing with links to pages that need no help — your homepage, your contact page and your privacy policy do not need another link from every article. They already receive one from the navigation on every page of the site.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Suspect your best pages are under-linked?</h3>
  <p>We will crawl your site, show you which pages are orphaned or barely linked, and point out where the links should go. You keep the findings with no obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What should the anchor text say?</h2>
<p>Anchor text should describe the destination page in the words someone would use to search for it, without being an exact-match keyword every single time. It is a description signal you control completely, and it is routinely spent on "click here", "read more" and "this article" instead.</p>
<p>Three rules that hold up:</p>
<ul>
  <li><strong>Describe the destination, not the action.</strong> "Our approach to technical SEO" beats "read more" every time.</li>
  <li><strong>Vary the phrasing across links.</strong> Using an identical anchor from forty pages looks manufactured. Natural variation reads better and covers more query variations.</li>
  <li><strong>Let the surrounding sentence do work.</strong> Search engines read the context around a link, so a link inside a relevant sentence is stronger than the same anchor floating alone.</li>
</ul>
<p>One caution specific to images: an image link's alt text acts as its anchor text. Image links with empty alt attributes pass a link with no description at all, which is a common quiet loss on visually-led sites.</p>

<h2>Where on the page should the link sit?</h2>
<p>Put links where they genuinely help a reader move on, which in practice means inside the body, reasonably early, and never in a block at the bottom. Links a reader is unlikely to see are worth correspondingly little.</p>
<p>A few placement notes worth knowing:</p>
<ul>
  <li><strong>Body copy over boilerplate.</strong> A link in the third paragraph is treated as more deliberate than the same link in a footer that appears on ten thousand pages.</li>
  <li><strong>Do not hide links behind interactions.</strong> Links inside accordions, tabs or lazy-loaded modules may not be crawled reliably. If a link matters, keep it in the initial HTML.</li>
  <li><strong>Use real anchors.</strong> A clickable div with a JavaScript handler is not a link. It must be an <code>&lt;a&gt;</code> with an <code>href</code> — this is a build detail worth confirming with whoever handles your <a href="/web-development-company">web development</a>.</li>
</ul>

<h2>How do you find orphan and under-linked pages?</h2>
<p>Compare the list of pages a crawler can reach against the full list of pages that exist, and anything appearing only in the second list is an orphan. That comparison is the entire audit.</p>
<ol>
  <li><strong>Crawl the site</strong> starting from the homepage with any standard crawler. This gives you every page reachable by following links.</li>
  <li><strong>Export your XML sitemap</strong> and your CMS's list of published URLs. This gives you every page that exists.</li>
  <li><strong>Diff the two lists.</strong> URLs in the sitemap but not in the crawl are orphaned.</li>
  <li><strong>Pull internal link counts</strong> from the crawl and sort ascending. Pages with one or two inbound links are under-linked even if not orphaned.</li>
  <li><strong>Cross-check against value.</strong> An orphaned tag archive is not a problem. An orphaned service page is.</li>
</ol>
<p>Run the same audit after any migration or redesign, because that is when links break in bulk — the fuller checklist is in <a href="/blog/website-redesign-without-losing-rankings">redesigning a website without losing rankings</a>.</p>

<h2>How many internal links is too many?</h2>
<p>There is no fixed limit, but a page where every other phrase is a link is worse for readers and dilutes the meaning of each individual link. Judge by whether a reader would plausibly follow the link, not by a count.</p>
<p>The more useful discipline is deciding which links to remove. On most pages, three to eight well-chosen contextual links do more than twenty scattered ones, because each of the eight is pointing somewhere that matters.</p>

<h2>What does a linking policy look like in practice?</h2>
<p>A workable policy is a short list of rules a writer can follow without thinking about SEO at all. Ours reads roughly like this:</p>
<ul>
  <li>Every new page links to at least one commercial page and at least two related content pages.</li>
  <li>Every new page gets at least two links added to it from existing pages, on the day it publishes.</li>
  <li>Anchor text describes the destination; "click here" is never acceptable.</li>
  <li>Every cluster page links up to its pillar inside a sentence — the structure explained in <a href="/blog/topic-clusters-and-pillar-pages">topic clusters and pillar pages</a>.</li>
  <li>Product and category templates carry their linking rules in the template, not by hand, which matters most on stores — see our <a href="/ecommerce-seo-services">ecommerce SEO work</a>.</li>
</ul>
<p>That policy is enforceable, takes a writer a few minutes per page, and needs no tooling to adopt. Writing and enforcing one is a standing part of our <a href="/seo-company">SEO service</a>, precisely because it costs so little and is so often left undone, and it is part of how we approach site structure in <a href="/seo-company-gurgaon">SEO work in Gurgaon</a> too.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want a linking map for your site?</h3>
  <p>We will show you which pages are collecting your internal links today and where they should be going instead. There is no cost and no obligation to proceed.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: 'How many internal links should a page have?',
        a: 'There is no correct number, but three to eight contextual links inside the body works well for most articles. What matters is that each link is one a reader might genuinely follow. Twenty scattered links dilute the meaning of every one of them.',
      },
      {
        q: 'Do footer links count for SEO?',
        a: 'They count, but far less than links in body copy. Footer and navigation links appear on every page, so they carry no information about the relationship between two specific pages. Use them for site-wide utility pages, not to push a page you want to rank.',
      },
      {
        q: 'What is an orphan page?',
        a: 'A page with no internal links pointing to it. Crawlers find pages by following links, so an orphan may never be discovered even if it is in your sitemap. You find them by crawling the site and comparing the result against your full list of published URLs.',
      },
      {
        q: 'Should internal links open in a new tab?',
        a: 'Generally no. New tabs are conventional for external links and disruptive for internal ones, since the reader is staying on the same site. It makes no difference to search engines, so decide it purely on the reading experience.',
      },
      {
        q: 'Is exact-match anchor text risky for internal links?',
        a: 'Internal anchor text is far less risky than external, since you control it and search engines expect you to. The real problem with repeating one exact phrase everywhere is that it reads as manufactured to humans and covers fewer query variations than natural wording would.',
      },
      {
        q: 'How often should internal links be audited?',
        a: 'Twice a year for a stable site, and immediately after any migration, redesign or bulk content removal. Those events are when links break in volume. Between audits, the habit of linking backwards from every new post keeps the structure from decaying.',
      },
    ],

    author: 'Avani Enterprises',
  },
];
