/**
 * _dripBlogPart2.js — batch 2 of the drip queue.
 * Theme: AI search surfaces — how they choose and cite sources.
 */

module.exports = [
  /* ─────────────────────────────────────────────────────────────────────── 1 */
  {
    slug: "optimising-content-for-perplexity-ai",
    title: "Optimising Your Content for Perplexity AI",
    category: "AI",
    tags: ["AI Search", "AEO", "Content", "India"],

    excerpt:
      "Perplexity is a retrieval pipeline, not a ranking board. Here is how it builds a source set, what makes a passage quotable, and how to check if you are cited.",

    metaTitle: "How to Optimise Content for Perplexity AI",
    metaDescription:
      "How to optimise content for Perplexity: how its retrieval pipeline picks sources, what makes a passage quotable, and how to check whether you are being cited.",
    metaKeywords: [
      "optimise content for Perplexity",
      "Perplexity AI SEO",
      "PerplexityBot",
      "answer engine optimisation",
    ],

    coverImage: "",

    keyTakeaways: [
      "Perplexity selects passages, not pages, so a page can rank well in Google and still never be cited.",
      "A citable passage answers one question completely inside two or three sentences, without depending on the paragraph above it.",
      "Perplexity fetches pages at answer time, so anything that only appears after client-side JavaScript runs may never be seen.",
      "You cannot track Perplexity positions the way you track rankings, but you can log PerplexityBot hits and watch perplexity.ai referrals in analytics.",
    ],

    content: `<p>If you want to <strong>optimise content for Perplexity</strong>, start by accepting that it is not a ranking board you climb. Perplexity is a retrieval-and-synthesis pipeline: it turns one typed question into several searches, pulls back a shortlist of documents, ranks the passages inside them against the original question, and writes a short answer with numbered citations pointing back at what it used. Optimising for it means handing that pipeline something clean to lift.</p>

<h2>What actually happens when someone asks Perplexity a question?</h2>
<p>Perplexity rewrites the question into multiple search queries, retrieves candidate documents, reranks the passages inside those documents against the original question, and then generates a cited answer from the highest-scoring passages. There are four stages, and you can influence three of them.</p>
<p>The reason this matters is that each stage throws work away. Retrieval discards most of the web. Reranking discards most of what retrieval returned. Synthesis quotes only a handful of the surviving passages. A page that is technically excellent but written as one continuous argument tends to die at the reranking stage, because no single chunk of it stands on its own.</p>

<h3>Where your leverage sits, stage by stage</h3>
<ul>
  <li><strong>Query expansion</strong> — you cannot touch it, but you can anticipate it. A question like "best CRM for a small Indian business" plausibly expands into pricing, integration, GST-invoicing and migration sub-questions. Pages that cover only the headline question tend to lose the expanded ones.</li>
  <li><strong>Retrieval</strong> — this is where crawl access, index coverage and plain topical match decide everything. If you have pages that Google is refusing to index, the same underlying problems usually block AI retrieval too; our <a href="/guides/why-google-is-not-indexing-my-pages">guide to indexing problems</a> covers the usual causes.</li>
  <li><strong>Reranking</strong> — this is passage design, and it is the part most sites ignore completely.</li>
  <li><strong>Synthesis</strong> — specific, attributable sentences survive summarisation. Vague ones get paraphrased into nothing and the citation goes to whoever was specific.</li>
</ul>

<h2>Why does Perplexity cite some pages and skip others that rank well?</h2>
<p>Because the unit of selection is the passage, not the page. A page can hold the top organic position for a query and still contribute nothing quotable, if its answer is spread over six paragraphs, three subheadings and a video.</p>
<p>Test your own pages this way: copy a single paragraph out of the article, paste it into a blank document, and read it as a stranger. If it still answers a real question without the surrounding context — no dangling "this", no "as we mentioned above", no pronoun pointing at a heading — it is a candidate. If it does not, it is invisible to the reranker no matter how well the page performs.</p>

<h2>Does Perplexity need to crawl your site directly?</h2>
<p>Yes, and it uses named agents to do it. Perplexity documents a crawler for building its search index and a separate user-triggered fetcher that pulls a page because someone's question needed it right then. Blocking the crawler in robots.txt removes you from the index it retrieves against, which is the fastest way to disappear from a surface you were hoping to appear on.</p>
<p>Two practical checks follow from that:</p>
<ol>
  <li><strong>Read your own robots.txt.</strong> Blanket rules written years ago to keep scrapers out now block the retrieval systems you want. Decide deliberately, agent by agent, rather than inheriting somebody's template.</li>
  <li><strong>Serve real HTML.</strong> An answer-time fetch is not a patient rendering pipeline. If your headings, tables and body copy only exist after a client-side framework hydrates, assume they are not there. Server-side rendering is the fix, and it is worth raising with whoever handles your <a href="/web-development-company">web development</a> before you rewrite a word of copy.</li>
</ol>
<p>The related question of whether a machine-readable summary file helps is genuinely unsettled — we work through the evidence in <a href="/blog/llms-txt-file-should-you-add-it">our post on llms.txt</a>.</p>

<h2>How is Perplexity different from AI Overviews and ChatGPT?</h2>
<p>They differ mainly in how the candidate source set is built, which changes what you should optimise first.</p>

<table>
  <thead>
    <tr>
      <th>Surface</th>
      <th>How the source set is built</th>
      <th>What you can influence</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Perplexity</td>
      <td>Its own crawl plus search partners, retrieved fresh for each question after the query is rewritten</td>
      <td>Crawl access, passage clarity, topical depth on the sub-questions</td>
    </tr>
    <tr>
      <td>Google AI Overviews</td>
      <td>Grounded in Google Search's own results for the query and its variations</td>
      <td>Classic Search eligibility, snippet directives, passage structure</td>
    </tr>
    <tr>
      <td>ChatGPT with search</td>
      <td>A web index plus its own fetcher, invoked only when the model decides a search is needed</td>
      <td>Crawl access for its named agents, plus how clearly your brand is defined as an entity</td>
    </tr>
  </tbody>
</table>

<p>The overlap is large enough that one body of work serves all three, which is the argument made in our <a href="/blog/answer-engine-optimization-guide-india">answer engine optimisation guide</a>. The differences are large enough that you should not assume a page cited by one will be cited by the others.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Want to know whether Perplexity can even see your site?</h3>
  <p>We will check your robots rules, your rendering and how your key pages break into passages, and tell you what is blocking retrieval. No obligation, and you keep the findings either way.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What does a quotable passage actually look like?</h2>
<p>A quotable passage answers one specific question completely in two or three sentences and names something concrete — a mechanism, a setting, a number that comes from a real source, a trade-off. Everything else is elaboration and belongs underneath.</p>
<p>Compare these two openings for a section on GST invoicing inside a billing tool:</p>
<ul>
  <li><em>Not liftable:</em> "There are several considerations when it comes to compliance, and businesses should evaluate their options carefully before deciding."</li>
  <li><em>Liftable:</em> "A billing tool is usable for Indian GST invoicing if it can store an HSN or SAC code against every line item, split tax into CGST, SGST and IGST based on the place of supply, and export in a format your accountant can reconcile. Anything missing one of those three has to be patched manually every month."</li>
</ul>
<p>The second one names the actual requirement. It can be lifted whole, and the citation has to come with it because the specifics are yours. Writing at that density across a whole site is slow, which is why teams often pair a subject-matter expert with an assisted drafting process — the approach behind our <a href="/ai-content-services">AI content services</a>, where the model does structure and the human supplies the specifics.</p>

<h2>How do you tell whether Perplexity is citing you?</h2>
<p>There is no rank tracker for it, so you measure with three cruder instruments instead.</p>
<ol>
  <li><strong>Prompt testing.</strong> Keep a fixed list of twenty questions a real buyer would type, run them monthly, and record which domains get cited. It is manual and it is the most honest signal you have.</li>
  <li><strong>Referral traffic.</strong> Perplexity sends real referrals. Segment them in analytics and treat them as a separate acquisition channel rather than letting them sit inside "Other".</li>
  <li><strong>Server logs.</strong> Filter for the named agents. If they are not hitting you at all, no amount of content work will help until that is fixed.</li>
</ol>
<p>Do not expect these numbers to be large early on. The point of watching them is direction, not volume — and the same discipline applies to being cited by other assistants, which we cover in <a href="/blog/how-to-get-your-business-cited-by-chatgpt">how to get your business cited by ChatGPT</a>.</p>

<h2>Where to start if you only have a week</h2>
<p>Pick your five highest-intent pages. Confirm the crawlers can reach them and that the content exists in the raw HTML. Rewrite the first paragraph under every heading so it answers the heading directly. Add one concrete specific to each section that nobody else on page one has bothered to state. Then leave it alone and re-run your prompt list in a month.</p>
<p>That sequence is deliberately small. Most sites do not have a Perplexity problem — they have a clarity problem that Perplexity happens to expose, and the same fixes lift ordinary organic performance too. If you would rather have it done as one structured pass, that work sits inside our <a href="/seo-company">SEO services</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Get your top pages rewritten for passage retrieval</h3>
  <p>Send us five URLs and the questions you want to own. We will come back with the specific rewrites that make each section liftable — no obligation to take the work further.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Does Perplexity use Google's rankings?",
        a: "Not directly. Perplexity retrieves from its own crawl and from search partners, then reranks passages against the question. Ranking well in Google helps because the same qualities tend to help retrieval, but a top Google position is not a ticket into a Perplexity answer.",
      },
      {
        q: "Should I block PerplexityBot in robots.txt?",
        a: "Only if you have decided you do not want to appear in Perplexity answers at all. Blocking the crawler removes you from the index it retrieves against. The honest trade-off is between protecting content from being summarised and being visible on a surface where buyers are asking questions.",
      },
      {
        q: "How long does it take to see citations after changing content?",
        a: "It depends entirely on how often your pages are recrawled and how competitive the question is. Rather than waiting on a promised timeline, run a fixed prompt list monthly and watch whether your domain starts appearing. That is the only measurement that reflects reality.",
      },
      {
        q: "Does adding more FAQs to a page help with Perplexity?",
        a: "It helps when the questions are ones people actually ask and the answers are self-contained. It does nothing when the FAQ block is filler bolted onto the end of every page. The value is in passage independence, not in the format itself.",
      },
      {
        q: "Is optimising for Perplexity different from normal SEO?",
        a: "The technical foundation is the same: crawlable, indexable, fast, server-rendered pages. What changes is the writing. Normal SEO rewards a page that covers a topic; answer engines reward paragraphs that can be removed from the page and still make sense.",
      },
    ],

    author: "Avani Enterprises",
  },

  /* ─────────────────────────────────────────────────────────────────────── 2 */
  {
    slug: "how-google-ai-overviews-pick-sources",
    title: "How Google AI Overviews Pick Their Sources",
    category: "SEO",
    tags: ["AI Search", "Technical SEO", "Google"],

    excerpt:
      "AI Overviews are grounded in Google's own search results, which means there is no secret markup. Here is what actually decides which pages get pulled in.",

    metaTitle: "How AI Overviews Pick Sources: A Practical Guide",
    metaDescription:
      "Learn how AI Overviews pick sources: query fan-out, passage selection, the markup that does not exist, and the snippet controls that genuinely change things.",
    metaKeywords: [
      "how AI Overviews pick sources",
      "Google AI Overviews",
      "AI Overview SEO",
      "query fan-out",
    ],

    coverImage: "",

    keyTakeaways: [
      "AI Overviews are grounded in Google Search, so the candidate sources are drawn from pages already eligible to appear for the query and its variations.",
      "There is no special structured data or markup that makes a page eligible for an AI Overview.",
      "Query fan-out means one typed question triggers several related searches, so pages answering the sub-questions can be cited even when they do not rank for the headline query.",
      "The nosnippet and max-snippet directives remove you from AI Overviews, but they remove you from featured snippets and ordinary snippets at the same time.",
    ],

    content: `<p>AI Overview placement is already being sold as a package. It is worth knowing exactly <strong>how AI Overviews pick sources</strong> before you buy anything, because the mechanism rules out most of what gets sold. AI Overviews are generated by a Google model that is grounded in Google Search itself — the answer is written from pages Search retrieved, and the links shown are the pages the model drew on.</p>

<h2>How do AI Overviews pick their sources?</h2>
<p>They pick from what Google Search already retrieved. The system issues the user's question along with a set of related queries, gathers results for all of them, and generates a summary grounded in those results, linking the pages that supported it. There is no separate index, no separate submission process and no separate eligibility list.</p>
<p>That single fact settles several arguments. If a page is not indexed, it cannot be a source. If a page is indexed but never surfaces for a query or any of its near neighbours, it will not be a source either. Everything that makes a page retrievable in ordinary Search is a prerequisite here, which is why the boring technical work still comes first.</p>

<h2>What is query fan-out, and why does it change your keyword thinking?</h2>
<p>Query fan-out is the practice of answering one typed question by running several related searches behind the scenes and synthesising across all of them. It matters because it breaks the one-page-per-keyword habit that most SEO plans are built on.</p>
<p>Take "should I use Shopify or WooCommerce for a store in India". A fan-out on that question can reasonably be expected to reach for transaction fees, payment gateway support, hosting responsibility, developer availability and migration difficulty. A page that argues the headline comparison well but never mentions payment gateways simply is not in the candidate set for that strand — and a smaller, sharper page that covers gateways properly might be. Depth across the sub-questions beats one long page that gestures at all of them.</p>
<p>Practically, that means building topic coverage rather than keyword coverage: a cluster where each page owns a real sub-question, all of them linked, none of them duplicating the others. That is a different content plan from the one most agencies produce, and it is the plan behind our <a href="/seo-company">SEO work</a>.</p>

<h2>Is there special markup that gets you into an AI Overview?</h2>
<p>No. Google has stated plainly that there is no additional structured data, meta tag or markup that makes content eligible for its AI experiences — normal Search eligibility is the requirement. Anyone selling "AI Overview schema" is selling something that does not exist.</p>
<p>Structured data still earns its place for other reasons: it disambiguates your organisation, products and articles, and it makes machine parsing of your page cheaper and less error-prone. We go through what is genuinely worth implementing in <a href="/blog/schema-markup-for-ai-search-visibility">schema markup for AI search visibility</a>. Just do not implement it expecting a switch to flip.</p>

<h2>Can you keep your listing but stay out of AI Overviews?</h2>
<p>Partly, and it costs you something. Google's snippet controls apply to AI experiences as well as to ordinary results, so the same directives that suppress a snippet also keep your content out of a generated summary.</p>
<ul>
  <li><strong>nosnippet</strong> — no text snippet at all is shown for the page, and it becomes unusable for a summary. You keep the blue link and lose the preview.</li>
  <li><strong>max-snippet:[n]</strong> — caps the characters Google may show. Setting it to zero behaves like nosnippet; setting it to a small number limits what can be lifted.</li>
  <li><strong>data-nosnippet</strong> — an HTML attribute that excludes a specific element rather than the whole page. This is the surgical option, useful for pricing tables or proprietary methodology you do not want summarised.</li>
</ul>
<p>The trade-off is real. Those directives do not distinguish between a generated summary and a featured snippet, so opting out of one opts you out of the other. For most Indian service businesses that is the wrong trade — the preview is often what earns the click. For a publisher whose entire product is the text, the calculation is different. Note also that the Google-Extended control governs a different set of Google AI products and is not the lever for AI Overviews.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Find out which of your pages Google can actually summarise</h3>
  <p>We will audit your snippet directives, indexing coverage and heading structure against the queries you care about, and show you where the gaps are. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Which kinds of pages get pulled in most often?</h2>
<p>Pages that answer a discrete sub-question cleanly, early, and in language close to how the question is asked. Beyond that, a few patterns show up repeatedly when you look at what gets cited:</p>
<ol>
  <li><strong>Definition and mechanism pages.</strong> Content that explains how something works, rather than why you should buy it, is easier to ground an answer in.</li>
  <li><strong>Genuine comparisons.</strong> A page weighing two real options with stated trade-offs supplies exactly the shape of content a summary needs.</li>
  <li><strong>Pages with clean passage boundaries.</strong> One idea per section, answered in the opening sentence, with the elaboration below it.</li>
  <li><strong>Sites with corroborating identity signals.</strong> A recognisable organisation with consistent details across the web is a safer thing to cite than an anonymous site, which is the argument for <a href="/blog/entity-seo-knowledge-graph-presence">entity SEO</a>.</li>
  <li><strong>Locally specific content.</strong> For queries with an Indian context, pages that address Indian regulation, pricing structures or logistics are more useful to ground an answer in than generic international content — one reason our <a href="/seo-company-gurgaon">Gurgaon SEO</a> work leans hard on local specificity.</li>
</ol>

<h2>How do you measure AI Overview performance in Search Console?</h2>
<p>You largely cannot separate it. Google reports clicks and impressions from AI experiences inside the overall Web search totals rather than as a distinct type you can filter, so there is no clean AI Overview column to report on.</p>
<p>What you can do is read the pattern. Impressions holding steady while click-through rate falls on informational queries is the signature of an answer being shown above you. Segment your Search Console queries into informational, comparison and transactional buckets and watch the click-through rate of each separately — an aggregate number hides the whole story. We break down how to build that report in <a href="/blog/zero-click-search-what-to-do-about-it">what to do about zero-click search</a>, and the broader strategic shift in <a href="/blog/generative-engine-optimization-vs-seo">generative engine optimisation versus SEO</a>.</p>

<h2>What should you actually change on the page?</h2>
<p>Five things, in this order. Make sure the page is indexed and renders server-side. Rewrite each heading as the question a person would type. Make the sentence directly under each heading a complete answer. Add the specific detail — the number that comes from a real source, the exact setting, the actual constraint — that separates your page from the rewritten consensus. Then interlink the cluster so the sub-question pages support each other.</p>
<p>None of that is a trick, and that is the point. The mechanism rewards content that is genuinely easier to verify and quote, which is also what a reader wants. If you would rather have the whole cluster planned and executed as one campaign, that is what our <a href="/digital-marketing-company">digital marketing team</a> builds.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Turn your best pages into citable sources</h3>
  <p>Tell us the ten questions you want to be the answer to. We will map which pages can win them and what has to change on each — no obligation, and no promises about placement.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Can I pay to be included in an AI Overview?",
        a: "No. AI Overview sources are drawn from organic Search results, and there is no paid inclusion mechanism for them. Any agency offering guaranteed AI Overview placement is describing something that does not exist.",
      },
      {
        q: "Does being in position one mean I will be cited?",
        a: "No. The model grounds its answer in retrieved results, but it selects the passages that best support the specific statement it is making. A page in position one with no self-contained passage answering the sub-question can be skipped in favour of a lower-ranking page that has one.",
      },
      {
        q: "Will blocking AI Overviews protect my traffic?",
        a: "Usually not. The snippet directives that keep you out of AI Overviews also remove ordinary snippets and featured snippets, which tends to cost more clicks than it saves. It is a defensible choice for a paid-content publisher and rarely the right one for a service business.",
      },
      {
        q: "Do AI Overviews appear for every query?",
        a: "No. They appear more often on informational and exploratory queries and less often where Google judges a direct result is better, and coverage changes over time. Transactional and navigational queries are far less affected.",
      },
      {
        q: "How is this different from a featured snippet?",
        a: "A featured snippet lifts text verbatim from one page. An AI Overview generates new text synthesised from several pages and links them as supporting sources. The practical difference is that you no longer need to be the single best answer, only a useful part of one.",
      },
    ],

    author: "Avani Enterprises",
  },

  /* ─────────────────────────────────────────────────────────────────────── 3 */
  {
    slug: "faq-schema-that-actually-gets-quoted",
    title: "Writing FAQ Schema That Actually Gets Quoted",
    category: "SEO",
    tags: ["Structured Data", "AEO", "Technical SEO"],

    excerpt:
      "FAQ rich results are gone for most sites, but the markup still matters for a different reason. How to write FAQ answers that answer engines lift whole.",

    metaTitle: "FAQ Schema That Actually Gets Quoted in AI Search",
    metaDescription:
      "FAQ schema no longer earns rich results for most sites. Here is what FAQ schema still does, and how to write the answers that AI search will lift and quote.",
    metaKeywords: ["FAQ schema", "FAQPage structured data", "FAQ rich results", "AEO"],

    coverImage: "",

    keyTakeaways: [
      "Google restricted FAQ rich results to well-known government and health sites in 2023, so ordinary sites should stop expecting the old blue-link expansion.",
      "FAQ schema still earns its place because it pairs a question with a bounded answer in machine-readable form, which is exactly the shape a retrieval system wants.",
      "The markup does nothing on its own — the visible answer text is what gets lifted, so the writing carries all the weight.",
      "An FAQ answer only works if it can be removed from the page and still make complete sense to a stranger.",
    ],

    content: `<p><strong>FAQ schema</strong> is one of the few pieces of structured data whose purpose changed completely without most people noticing. In August 2023 Google announced that FAQ rich results would be limited to well-known authoritative government and health websites, which removed the expandable question list from search results for essentially every ordinary business site. A lot of teams responded by ripping the markup out. That was the wrong lesson.</p>

<h2>Does FAQ schema still do anything?</h2>
<p>Yes, but not the thing it used to do. It no longer earns the expandable rich result for ordinary sites, and it will not add pixels to your listing. What it still does is state, in machine-readable form, that a specific block of text on your page is the answer to a specific question — which is precisely the pairing a retrieval system is looking for when it decides what to quote.</p>
<p>Think of it as labelling rather than decoration. The markup does not create value; it makes existing value legible. If the answer underneath is vague, the schema faithfully labels vagueness. If the answer is sharp and self-contained, the schema tells every parser exactly where the boundaries of that answer are, so nothing gets clipped mid-thought.</p>

<h2>What makes an FAQ answer quotable?</h2>
<p>An answer is quotable when a stranger could read it in isolation, understand it completely, and act on it. Most FAQ blocks fail that test in the first sentence, because they open with a throat-clearing preamble instead of the answer.</p>

<table>
  <thead>
    <tr>
      <th>Question</th>
      <th>Answer that never gets lifted</th>
      <th>Answer that does</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Do I need GST registration to sell online in India?</td>
      <td>GST rules can be complicated and it is best to consult a professional about your specific situation.</td>
      <td>Selling through a marketplace that collects tax at source generally triggers a registration requirement that does not depend on your turnover, whereas selling only through your own website follows the ordinary turnover thresholds. This is general information rather than tax advice — confirm your own case with a chartered accountant, as thresholds differ by state and by whether you supply goods or services.</td>
    </tr>
    <tr>
      <td>How long does a website redesign take?</td>
      <td>Every project is different, so timelines vary depending on scope and requirements.</td>
      <td>The build itself is rarely the long pole. Content approval, brand sign-off and third-party integrations set the real timeline, so a redesign with copy already written moves several times faster than one where the copy is still being argued about.</td>
    </tr>
    <tr>
      <td>What is the difference between a chatbot and a voice agent?</td>
      <td>Both use AI to help customers and each has its own advantages and disadvantages.</td>
      <td>A chatbot handles typed conversations where the user can see previous messages and correct themselves; a voice agent handles spoken calls where nothing is visible and interruptions have to be handled in real time. The voice case needs turn-taking, latency and accent handling that the chat case never has to solve.</td>
    </tr>
  </tbody>
</table>

<p>The pattern in the right-hand column is consistent: the first clause commits to a position, the specifics are named, and the caveat comes last rather than first. Caveats at the top destroy quotability, because a summariser reading the opening sentence finds nothing to summarise.</p>

<h2>Where should the FAQs live on the page?</h2>
<p>Inside the visible page, in the order a reader would reach them, and marked up exactly as they appear. Google's guidance on FAQPage is explicit that the questions and answers must be visible content on the page, written by the site rather than submitted by users, and not used to carry promotional text.</p>
<p>Two placements work well in practice. Mid-article FAQs handle objections at the point they arise, which helps human readers more than a block at the bottom does. End-of-article FAQs catch the adjacent questions the piece did not cover, and are the natural place to link onward to the pages that do cover them. Either way, the markup follows the visible text — never the reverse.</p>

<h2>What does correct FAQ markup look like?</h2>
<p>Minimal, and matching the page word for word. Here is the shape, with entities escaped for display:</p>
<pre><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Does FAQ schema still earn rich results?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "No. Google limited FAQ rich results to well-known government and health sites in 2023, so ordinary sites no longer see the expandable listing."
    }
  }]
}
&lt;/script&gt;</code></pre>
<p>The answer text field accepts limited HTML, and unescaped tags are a common reason a block fails validation. If your CMS injects markup into that field, sanitise it at render time — a five-minute fix for whoever handles your <a href="/web-development-company">website build</a>, and one that quietly breaks otherwise correct implementations.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Have your FAQ markup checked before it costs you</h3>
  <p>We will validate your structured data, flag the answers that no engine will ever quote, and rewrite two of them as examples. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What are the most common FAQ schema mistakes?</h2>
<ol>
  <li><strong>Markup that does not match visible text.</strong> The classic version is a marketing team editing the page copy while the JSON-LD stays frozen at whatever the developer pasted in a year ago.</li>
  <li><strong>The same FAQ block on every page.</strong> Identical questions sitewide tell a parser nothing about any individual page, and they create the duplicate-content pattern covered in <a href="/blog/duplicate-content-issues-how-to-fix">our post on duplicate content</a>.</li>
  <li><strong>Promotional answers.</strong> An answer that turns into a pitch by its second sentence is both against Google's stated guidance and useless to lift.</li>
  <li><strong>Questions nobody asks.</strong> "Why choose us for the best services in India?" is not a question. Take real ones from your sales inbox, your call notes and your Search Console query report.</li>
  <li><strong>FAQs stapled to category and product pages.</strong> On e-commerce templates this tends to produce hundreds of near-identical blocks; the effort belongs in the product content itself, as we set out in our <a href="/ecommerce-seo-services">e-commerce SEO work</a>.</li>
</ol>

<h2>How many FAQs should a page have?</h2>
<p>As many as the page genuinely raises, which is usually between four and eight. Beyond that, the questions start being invented to fill the block, and invented questions are obvious in a way that damages the credibility of the real ones.</p>
<p>A more useful discipline than counting is auditing: every quarter, pull the questions your sales team actually got asked and compare them against what is on the page. Questions that appear repeatedly in real conversations and nowhere on your site are the highest-value content you can write, and they usually deserve their own page rather than a line in an accordion.</p>

<h2>How this fits the wider answer-engine picture</h2>
<p>FAQ schema is one tactic inside a larger shift: search surfaces increasingly want bounded, attributable answers rather than pages to browse. The same writing discipline that makes an FAQ quotable makes a whole article quotable, which is why we treat it as one workstream in our <a href="/seo-company">SEO engagements</a> rather than a structured-data task. The wider mechanics, including what Google grounds its summaries in, are covered in <a href="/blog/how-google-ai-overviews-pick-sources">how AI Overviews pick their sources</a> and in our <a href="/blog/answer-engine-optimization-guide-india">answer engine optimisation guide</a>.</p>
<p>None of this is legal, tax or compliance advice — where an FAQ touches regulation, say plainly that it is general information and point the reader to a qualified professional. That sentence costs you nothing and protects both the reader and you.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Rewrite your FAQs around the questions buyers actually ask</h3>
  <p>Send us your sales inbox questions and your current FAQ block. We will show you which ones are worth a full page and which just need a better answer. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Should I remove FAQ schema now that rich results are gone?",
        a: "No, but stop measuring it by rich results. The markup still labels a question-and-answer pair in machine-readable form, which helps parsers and retrieval systems find a bounded answer. Remove it only if the FAQs themselves are filler, in which case remove the FAQs too.",
      },
      {
        q: "Can FAQ schema hurt my site?",
        a: "It can, if the markup does not match the visible page or if it is used to carry promotional text, both of which go against Google's structured data guidance. Mismatched markup is a manual-action risk that gains you nothing, so correctness matters more than coverage.",
      },
      {
        q: "Do I need FAQ schema for AI search engines to read my FAQs?",
        a: "Not strictly. A clearly formatted question as a heading with the answer immediately beneath it is readable without any markup. Schema makes the pairing explicit and removes ambiguity, which is worth having, but the visible text is doing the real work.",
      },
      {
        q: "Can I use FAQPage and Article schema on the same page?",
        a: "Yes. A page can carry more than one type, and an article with an FAQ section legitimately is both. Keep each type accurate to what is actually on the page rather than adding types speculatively.",
      },
      {
        q: "Where do I find questions worth answering?",
        a: "Your sales inbox, your support tickets and your Search Console query report are the three best sources, in that order. They give you the exact wording people use, which matters more than the polished phrasing a copywriter would choose.",
      },
    ],

    author: "Avani Enterprises",
  },

  /* ─────────────────────────────────────────────────────────────────────── 4 */
  {
    slug: "entity-seo-knowledge-graph-presence",
    title: "Entity SEO: Building a Knowledge Graph Presence",
    category: "SEO",
    tags: ["Entity SEO", "Structured Data", "Brand", "India"],

    excerpt:
      "Search engines and language models resolve businesses as entities, not keywords. How to make yours identifiable, consistent and safe to cite.",

    metaTitle: "Entity SEO: Build a Knowledge Graph Presence",
    metaDescription:
      "Entity SEO is how search engines decide your business exists. A practical guide to Organization schema, sameAs, corroboration and brand SERP hygiene in India.",
    metaKeywords: ["entity SEO", "knowledge graph", "Organization schema", "sameAs", "brand SERP"],

    coverImage: "",

    keyTakeaways: [
      "Entity SEO is the work of making a machine able to resolve your business as one identifiable thing rather than a name that appears on some pages.",
      "Search engines confirm entities through corroboration, so the same facts repeated consistently across independent sources matter more than any single page.",
      "Every name variant you tolerate splits your entity signals into two weaker ones.",
      "An assistant that describes your business incorrectly is showing you exactly which corroborating source it trusted, which tells you what to fix.",
    ],

    content: `<p><strong>Entity SEO</strong> is the part of search work that stops being about pages and starts being about identity. A keyword is a string. An entity is a thing — a company, a person, a place, a product — with attributes and relationships that a machine can resolve, disambiguate from similarly named things, and reason about. When an assistant answers "who should I use for X in Gurgaon", it is reasoning over entities. If your business is not one to it, you are not in the conversation at all.</p>

<h2>What is entity SEO, exactly?</h2>
<p>Entity SEO is the practice of making your organisation identifiable to machines as a distinct, consistent thing with a name, a category, locations, people and relationships — rather than as a keyword that happens to appear on some web pages. The output is not a ranking; it is a machine's confidence that it knows what you are.</p>
<p>The distinction becomes obvious the moment you test it. Ask an assistant to describe your company. If it hedges, invents a description, confuses you with a similarly named firm or gets your city wrong, that is not a hallucination problem. It is an evidence problem: the model reached for the strongest corroborated signals it could find about your name, and those signals were thin, contradictory or belonged to somebody else.</p>

<h2>Why does this matter more for AI answers than for blue links?</h2>
<p>Because a blue link needs relevance and an AI answer needs confidence. Ranking a page requires the engine to believe the page matches the query. Naming your business inside a generated recommendation requires it to believe your business exists, does what you claim, operates where you claim, and is a safe thing to put in front of a user who will act on it.</p>
<p>That second bar is higher, and it is met by corroboration rather than by content. You can write "we are the leading provider" a hundred times on your own site and move nothing. A handful of independent, consistent, verifiable sources saying the same factual thing about you moves a great deal. This is the same mechanism behind getting named in assistant answers, which we cover from the other direction in <a href="/blog/how-to-get-your-business-cited-by-chatgpt">how to get your business cited by ChatGPT</a>.</p>

<h2>How does a search engine decide your business is an entity?</h2>
<p>Through repetition of the same facts across sources it did not have to trust you for. The mechanism is corroboration: your site claims something, independent sources confirm it, and confidence rises with each consistent confirmation and falls with each contradiction.</p>
<p>The sources that carry weight are unglamorous:</p>
<ul>
  <li><strong>Your own site</strong>, as the canonical statement — one about page that states name, founding, locations, leadership and what you do, in plain declarative sentences.</li>
  <li><strong>Google Business Profile</strong>, for every real, staffed location. This is one of the strongest location and category signals available to an Indian business.</li>
  <li><strong>Profiles you control elsewhere</strong> — company registries, professional networks, industry bodies, partner directories — each repeating the same name and address.</li>
  <li><strong>Third-party mentions</strong> you do not control: press, conference listings, podcast appearances, client sites. These are the ones that actually count as independent.</li>
  <li><strong>Structured data</strong> tying it together, so a parser does not have to infer the relationships from prose.</li>
</ul>
<p>For a business with more than one office — ours run from Gurugram, Rohtak and Mumbai — the consistency problem multiplies, and each location needs its own coherent set of signals rather than a shared blur. The mechanics of that are in <a href="/blog/multi-location-seo-india">multi-location SEO in India</a>.</p>

<h2>What should your Organization schema actually contain?</h2>
<p>Enough to identify you unambiguously and nothing invented. A minimal but genuinely useful set:</p>
<ul>
  <li><strong>name</strong> and <strong>legalName</strong> — the trading name and the registered one, if they differ.</li>
  <li><strong>url</strong> and <strong>logo</strong> — pointing at canonical, permanently hosted assets.</li>
  <li><strong>sameAs</strong> — an array of URLs to profiles that are unambiguously you. This is the property that does the most direct work in entity resolution, because it is how you tell a parser that the company on one platform and the company on another are the same thing.</li>
  <li><strong>address</strong> as a PostalAddress per location, matching your Google Business Profile character for character.</li>
  <li><strong>contactPoint</strong> with a real, answered number.</li>
  <li><strong>foundingDate</strong>, <strong>areaServed</strong> and <strong>parentOrganization</strong> where they apply and are true.</li>
</ul>
<p>Put this in one place, sitewide, and stop editing it casually. Schema that drifts between templates is worse than schema that is slightly incomplete. The broader question of which types are worth implementing at all is covered in <a href="/blog/schema-markup-for-ai-search-visibility">schema markup for AI search visibility</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>See how machines currently describe your business</h3>
  <p>We will run your brand through the major assistants and search surfaces, and show you exactly where the wrong or missing facts are coming from. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>How do you build entity signals without buying links?</h2>
<p>By fixing consistency first and adding evidence second. In this order:</p>
<ol>
  <li><strong>Choose one name and enforce it.</strong> Decide whether you are "Avani Enterprises" or "Avani Enterprises Pvt Ltd" everywhere, including invoices, email signatures and directory listings. Every tolerated variant splits your signal.</li>
  <li><strong>Fix your address format.</strong> Same line breaks, same abbreviations, same PIN code, everywhere. The reasoning is set out in <a href="/blog/nap-consistency-citation-building-india">NAP consistency and citation building</a>.</li>
  <li><strong>Write a real about page.</strong> Not a mission statement — facts. Who founded it, when, where the offices are, what the company does, who leads it. Ours is at <a href="/about">our about page</a>, and it exists to be quoted rather than admired.</li>
  <li><strong>Give your people identities.</strong> Named authors with real bios, consistent across your site and their professional profiles, turn anonymous content into content attached to a person an engine can resolve.</li>
  <li><strong>Earn independent mentions.</strong> Speaking, industry associations, genuinely useful data, podcast guesting. Slow, unglamorous, and the only category of signal you cannot fake.</li>
  <li><strong>Claim every profile you already appear on.</strong> Unclaimed listings with stale addresses are actively contradicting you right now.</li>
</ol>

<h2>What breaks entity recognition?</h2>
<p>Contradiction, mostly. A parser that finds two different addresses for the same name does not average them; it loses confidence in both. The usual culprits are worth checking directly:</p>
<ul>
  <li>Two live websites for the same business, often a legacy domain nobody switched off.</li>
  <li>A Google Business Profile address that does not match the footer address.</li>
  <li>Directory listings created by a previous agency under a slightly different name.</li>
  <li>A generic contact email and no named people anywhere on the site.</li>
  <li>An about page that says nothing checkable.</li>
</ul>
<p>For businesses competing in a specific city these contradictions cost more than they look like they should, because local queries lean hard on location confidence — a recurring theme in our <a href="/seo-company-mumbai">Mumbai</a> and <a href="/seo-company-gurgaon">Gurgaon</a> engagements.</p>

<h2>How do you check whether it is working?</h2>
<p>Search your brand name and read the entire first page as a report card. Whatever appears there — your site, your profiles, review platforms, an old directory, a competitor bidding on your name — is roughly what a machine believes about you.</p>
<p>Then ask two or three assistants to describe your company and note every factual error. Each error traces back to a source, and that source is your task list. Repeat quarterly. There is no dashboard for this, and the manual version is more honest than any tool would be. If you want it run as a structured audit alongside the rest of your search work, that sits inside our <a href="/seo-company">SEO services</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Fix the contradictions that are diluting your brand</h3>
  <p>Give us your business name and we will find the conflicting listings, name variants and stale profiles working against you, with a prioritised fix list. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Do I need a Wikipedia page for entity SEO?",
        a: "No. A Wikipedia entry is a strong corroborating source, but it has notability requirements most businesses do not meet, and attempting to force one usually backfires. Consistent profiles, a factual about page and independent mentions do the same job more reliably.",
      },
      {
        q: "What is the sameAs property for?",
        a: "It links your organisation to its profiles elsewhere so a parser can confirm they refer to the same entity. Without it, a machine has to infer the connection from matching names, which fails whenever another business shares your name.",
      },
      {
        q: "How long does it take to build entity recognition?",
        a: "It depends on how contradictory your current signals are and how often the sources involved are recrawled. Rather than expecting a timeline, fix contradictions first because they produce the fastest change, then add new corroborating sources steadily.",
      },
      {
        q: "Is entity SEO different from local SEO?",
        a: "They overlap but are not the same. Local SEO is about ranking in a place; entity SEO is about being resolvable as a thing. Local signals such as a Google Business Profile are among the strongest entity signals available, which is why the two are usually worked on together.",
      },
      {
        q: "Can a small business build a knowledge graph presence?",
        a: "Yes, and the requirements are less about size than about consistency. A small firm with one name, one address format, named people and a handful of independent mentions is easier to resolve than a large one with three legacy domains and conflicting listings.",
      },
    ],

    author: "Avani Enterprises",
  },

  /* ─────────────────────────────────────────────────────────────────────── 5 */
  {
    slug: "zero-click-search-what-to-do-about-it",
    title: "Zero-Click Search: What to Do When Google Answers For You",
    category: "SEO",
    tags: ["Zero-Click", "Strategy", "Analytics", "India"],

    excerpt:
      "Some of your traffic is not coming back. Here is how to sort the queries you have genuinely lost from the ones still worth winning, and what to measure now.",

    metaTitle: "Zero-Click Search: What to Do About It",
    metaDescription:
      "Zero-click search is not the end of SEO. A practical way to sort the queries you have lost from the ones you can still win, and what to measure instead.",
    metaKeywords: ["zero-click search", "AI Overviews traffic", "SEO strategy", "search visibility"],

    coverImage: "",

    keyTakeaways: [
      "Zero-click search means the result page satisfies the question, so the searcher never visits a website at all.",
      "Not every lost click was worth having, and the useful exercise is sorting queries by whether a click was ever going to produce anything.",
      "Falling click-through rate on informational queries while impressions hold steady is the clearest signature of an answer being shown above you.",
      "The content least exposed to zero-click is content a summary cannot substitute for: your own data, tools that compute something, and answers that require your specific context.",
    ],

    content: `<p><strong>Zero-click search</strong> is not new — Google has been answering weather, conversions and definitions on the results page for years. What changed is the range of questions that now get answered there, and how many of them used to send you a visitor. The reasonable response is neither panic nor denial. It is to work out which of your queries were genuinely producing value, and to stop spending on the ones that were not.</p>

<h2>What is zero-click search?</h2>
<p>Zero-click search is any search where the user gets what they needed from the results page and never visits a site. Featured snippets, knowledge panels, People Also Ask, currency conversions, business hours and now generated summaries all produce it.</p>
<p>The important nuance is that zero-click is a property of the query, not of your site. A question with one short factual answer was always going to end on the results page eventually. A question that requires judgement, comparison or someone's actual circumstances was never a good candidate for a summary, and still is not.</p>

<h2>Which of your queries are actually at risk?</h2>
<p>The ones with a single, short, uncontested answer. Sort your Search Console queries into these buckets and the strategy writes itself.</p>

<table>
  <thead>
    <tr>
      <th>Query type</th>
      <th>What the searcher now sees</th>
      <th>What to do about it</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Definitional — "what is GSTIN"</td>
      <td>A complete answer on the results page</td>
      <td>Stop building pages whose only job is the definition. Keep the definition as a section inside a page that goes further.</td>
    </tr>
    <tr>
      <td>Simple factual — "IFSC code format"</td>
      <td>The answer, often without any click</td>
      <td>Accept the loss. Chasing these consumes budget for impressions that will never convert.</td>
    </tr>
    <tr>
      <td>Comparison — "Shopify vs WooCommerce for India"</td>
      <td>A summary, plus links, because the answer depends on the reader</td>
      <td>Worth competing for. Add the constraints a generic summary cannot know, such as payment gateway support and developer availability.</td>
    </tr>
    <tr>
      <td>Commercial — "SEO agency in Gurgaon"</td>
      <td>Map results, ads and organic listings — clicks still required</td>
      <td>Defend hard. This is where local signals and conversion quality decide revenue.</td>
    </tr>
    <tr>
      <td>Procedural with stakes — "how to migrate a site without losing rankings"</td>
      <td>A summary that most readers will not trust to act on alone</td>
      <td>Compete with depth, checklists and failure modes a summary cannot carry.</td>
    </tr>
  </tbody>
</table>

<p>Run this sort once and the uncomfortable part usually surfaces quickly: some part of the published library sits in the top two rows, and that part was rarely producing enquiries even before summaries arrived.</p>

<h2>Should you stop publishing informational content?</h2>
<p>No — you should stop publishing the informational content that any competent writer could produce from public sources. That is the category being absorbed, because it is exactly what a summary is good at.</p>
<p>What survives is content that is expensive to produce: your own operational data, a real teardown of a mistake you made, a checklist derived from actually doing the work, a comparison that includes constraints an outsider would not know about. A summary can compress consensus. It cannot manufacture a specific you are the only source for. That is also the sharpest defence against being paraphrased without attribution — if the specifics are yours, the citation has to come with them.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Find out which of your pages are already losing clicks</h3>
  <p>We will segment your Search Console queries by intent and show you which pages are still earning visits and which are only earning impressions. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>How do you make an impression worth something without a click?</h2>
<p>By being named inside the answer rather than merely linked beside it. Where a generated summary says "according to" and states your company name, you get a form of brand exposure that a blue link never gave you, and a share of readers will search for that name directly afterwards.</p>
<p>Three things make that more likely:</p>
<ol>
  <li><strong>Own a specific.</strong> If you are the only site stating the actual figure, constraint or sequence, the answer has to attribute it.</li>
  <li><strong>Be resolvable as a business.</strong> Assistants name organisations they can identify with confidence, which is the argument in <a href="/blog/entity-seo-knowledge-graph-presence">entity SEO and knowledge graph presence</a>.</li>
  <li><strong>Write in a liftable shape.</strong> Complete answers directly under question-shaped headings, as covered in <a href="/blog/how-google-ai-overviews-pick-sources">how AI Overviews pick their sources</a>.</li>
</ol>

<h2>How should your reporting change?</h2>
<p>Stop treating sessions as the headline number, because sessions can fall while search visibility rises. A reporting set that survives zero-click looks like this:</p>
<ul>
  <li><strong>Impressions and click-through rate by intent bucket</strong>, not in aggregate. An aggregate CTR mixing branded and informational queries hides everything that matters.</li>
  <li><strong>Branded search volume over time.</strong> If people who never clicked are searching your name a week later, the exposure worked.</li>
  <li><strong>Direct and organic-brand traffic.</strong> Increasingly where the visit actually lands.</li>
  <li><strong>Enquiry quality, not just count.</strong> Fewer, better-informed enquiries is a normal and healthy outcome when the results page has pre-qualified people.</li>
  <li><strong>Assisted conversions.</strong> Set up properly, or you will keep crediting the last click for work done three steps earlier — the reason we push hard on the <a href="/blog/ga4-setup-checklist-for-lead-generation">GA4 setup checklist</a>.</li>
</ul>
<p>Founders should be able to read this in one page. If your monthly report is thirty slides of chart exports, it is hiding rather than explaining — the case we make in <a href="/blog/seo-reporting-that-a-founder-can-read">SEO reporting a founder can read</a>.</p>

<h2>What should you build instead?</h2>
<p>Assets that require an interaction, not just a reading. The practical list for most Indian businesses:</p>
<ul>
  <li><strong>Calculators and configurators</strong> that compute something from the user's own inputs. A summary can describe the method but cannot run it.</li>
  <li><strong>Comparison pages with your own constraints</strong> — pricing structures, regional availability, integration realities.</li>
  <li><strong>Templates and checklists</strong> people download and reuse, which produce repeat visits and often a contact detail.</li>
  <li><strong>Product surfaces.</strong> When a tool does the job rather than a page describing it, the click is the point — which is why we built <a href="/business-os">Business OS</a> as software rather than as a content hub.</li>
  <li><strong>Channels you own.</strong> Email and community are not subject to anyone else's summarisation decisions.</li>
</ul>

<h2>What does this mean for your marketing budget?</h2>
<p>It usually means a shift within search rather than away from it. Money moves from producing volume towards producing pages nobody else can produce, and from informational breadth towards commercial and local queries where clicks are still required to transact. Paid search becomes more important for the queries you have structurally lost, and brand becomes more important because a named business gets recalled after a zero-click exposure while an anonymous one does not.</p>
<p>What it does not mean is abandoning SEO. Being the source a summary is built from is still search work, and the sites winning it are doing the ordinary things properly rather than chasing a new discipline. If you are re-planning the mix, our <a href="/digital-marketing-company">digital marketing team</a> works through it channel by channel, and if you are evaluating who to hand it to, our <a href="/guides/how-to-choose-an-seo-agency">guide to choosing an SEO agency</a> lists the questions worth asking. The underlying technical work has not changed and still sits with <a href="/seo-company">SEO</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Rebuild your search plan around what still converts</h3>
  <p>Bring your current content plan and traffic reports. We will tell you honestly which parts are worth continuing and which are producing impressions you cannot bank. No obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Is SEO dead because of zero-click search?",
        a: "No, but the payoff has moved. Ranking still decides which pages a summary is built from and which sites get clicked for commercial and local queries. What has genuinely weakened is publishing thin informational content to collect informational traffic.",
      },
      {
        q: "How do I know if AI Overviews are taking my clicks?",
        a: "Look for impressions holding steady or rising while click-through rate falls on informational queries specifically, with commercial and branded queries unaffected. Search Console does not report AI experiences as a separate filterable type, so the pattern is what you read rather than a single number.",
      },
      {
        q: "Should I remove content that no longer gets clicks?",
        a: "Not automatically. Some of it still supports internal linking, topical coverage and the pages that do convert. Consolidate genuinely thin pages into stronger ones rather than deleting, and only remove content that is inaccurate or serves no purpose.",
      },
      {
        q: "Do zero-click impressions have any value?",
        a: "They have value when your business name appears in the answer, because people search for names they have seen. They have very little value when you are one unnamed link among several on a query that would never have converted.",
      },
      {
        q: "Which industries are most affected?",
        a: "Anything whose traffic came from short factual answers — definitions, conversions, basic how-tos, reference data. Businesses selling considered services where the buyer needs to evaluate a provider are far less exposed, because that decision cannot be completed on a results page.",
      },
    ],

    author: "Avani Enterprises",
  },
];
