/**
 * Drip blog posts — Part 1
 * Theme: Answer Engine Optimisation (AEO) — getting cited by AI assistants.
 *
 * Shape and rules: scripts/DRIP-POSTS-SPEC.md
 * readTime and canonical are computed by the seeder. Do not set them here.
 */

module.exports = [
  // ---------------------------------------------------------------------------
  // 1
  // ---------------------------------------------------------------------------
  {
    slug: "how-to-get-your-business-cited-by-chatgpt",
    title: "How to Get Your Business Cited by ChatGPT",
    category: "AI",
    tags: ["AEO", "ChatGPT", "AI Search", "India"],

    excerpt:
      "ChatGPT cites only the sources it actually leaned on. Here is the retrieval mechanism behind that choice, and the page-level work that puts you in the shortlist.",

    metaTitle: "How to Get Cited by ChatGPT: A Practical Guide",
    metaDescription:
      "Want to get cited by ChatGPT? Learn how its crawlers and retrieval layer pick sources, plus the exact page and off-site changes that make you quotable.",
    metaKeywords: [
      "get cited by ChatGPT",
      "ChatGPT citations",
      "AI search visibility",
      "answer engine optimisation",
      "GPTBot",
    ],

    coverImage: "",

    keyTakeaways: [
      "To get cited by ChatGPT you need to be both retrievable by its crawlers and quotable once retrieved — the two are separate problems and most sites only solve the first.",
      "OpenAI runs distinct user agents for training, live browsing and search indexing, and robots.txt controls each one independently, so blocking one does not block the others.",
      "ChatGPT cites the passage, not the page, which means a self-contained 40-to-60-word answer directly under a question heading is worth more than a well-argued 2,000-word essay.",
      "Third-party mentions matter alongside your own site, because retrieval commonly surfaces listicles, forums and directories rather than the brand's own pages.",
      "There is no ranking report for AI citations, so measurement means prompt logging and referral tracking rather than a position number.",
    ],

    content: `<p>If you want to get cited by ChatGPT, it helps to understand that this is a retrieval problem before it is a content problem. ChatGPT does not rank the web the way a search results page does. When it answers a question that needs current information, it fetches a small set of documents, reads them, writes an answer in its own words, and attaches links to the sources it actually leaned on. That is normally a short list rather than a page of results. Your job is to be in that fetch, and then to be the easiest thing in it to quote.</p>

<h2>How does ChatGPT decide which sources to cite?</h2>
<p>ChatGPT picks sources in two stages: a retrieval stage that gathers candidate pages for the rewritten query, and a synthesis stage where the model quotes whichever passages most directly answer the user. A page can win the first stage and still lose the second, which is why sites with good rankings sometimes get no citations at all.</p>
<p>The retrieval stage behaves like a search engine — it depends on your page being indexed, crawlable and topically matched to the query. The synthesis stage behaves like an editor with a deadline. It scans what came back and lifts the sentence that stands on its own. Vague, throat-clearing prose is skipped even when it is technically the better article, because there is nothing in it that survives being pulled out of context.</p>
<p>OpenAI has said ChatGPT's search experience draws on its own crawler-built index alongside third-party search providers, so classic technical health still underpins everything. If Google is struggling to index you, an AI retrieval layer will struggle too — the diagnosis in our guide on <a href="/guides/why-google-is-not-indexing-my-pages">why Google is not indexing your pages</a> is the right starting point before any AEO work.</p>

<h2>Does ChatGPT crawl my website directly?</h2>
<p>Yes, and it does so under more than one identity. OpenAI documents separate user agents for separate jobs, and your robots.txt file controls each of them independently:</p>
<ul>
  <li><strong>GPTBot</strong> — the crawler associated with collecting data that may be used for model training.</li>
  <li><strong>OAI-SearchBot</strong> — the crawler that builds the index ChatGPT's search feature retrieves from.</li>
  <li><strong>ChatGPT-User</strong> — the fetch that happens live, in the moment, when a user or a tool asks ChatGPT to open a specific page.</li>
</ul>
<p>This distinction catches a lot of businesses out. A developer blocks GPTBot because leadership does not want the content used for training, and everyone assumes the site is now invisible to ChatGPT. It is not — but if someone blocks OAI-SearchBot as part of the same tidy-up, the site really does drop out of the retrievable set. Check your robots.txt line by line and decide on each agent deliberately rather than blocking anything that sounds like AI.</p>
<p>The other silent killer is rendering. If your main content only exists after JavaScript executes, you are relying on every one of these crawlers rendering it. Server-side rendering or static generation removes the gamble entirely, which is one of the reasons we push it hard on <a href="/web-development-company">every build we take on</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Not sure whether ChatGPT can even reach your site?</h3>
  <p>We will check your robots.txt, rendering and crawl access against the crawlers that feed AI answers, and tell you plainly what is blocking you. No obligation, no retainer pitch.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What makes a page quotable rather than merely readable?</h2>
<p>A quotable page answers the question in the first sentence after the heading, in about 40 to 60 words, with no dependency on the paragraph before it. That is the whole trick, and almost nobody does it, because it is the opposite of how people are taught to write.</p>
<p>Human readers tolerate a build-up. A model assembling an answer does not have one. It is looking for a passage where the subject, the claim and the qualifier all sit inside the same block of text. Compare these two openings to a section headed "How long does an SEO audit take?":</p>
<ul>
  <li><em>Weak:</em> "This is one of the most common questions we get, and the honest answer is that it depends on a number of factors, which we will unpack below."</li>
  <li><em>Liftable:</em> "A technical SEO audit on a site under 500 pages typically takes one to two weeks: a few days of crawling and log analysis, then the rest writing up prioritised fixes. Larger sites take longer because sampling stops being reliable."</li>
</ul>
<p>The second one can be pasted into an answer with a citation attached and it still makes sense. Write every section that way and you have at least given a model something it can use. The same principle drives <a href="/blog/faq-schema-that-actually-gets-quoted">FAQ schema that actually gets quoted</a> — structure is only useful when the sentence inside it is self-contained.</p>

<h3>The page-level checklist</h3>
<ol>
  <li>Phrase most section headings as the question a person would actually type.</li>
  <li>Answer in the very next sentence. Elaborate afterwards, not before.</li>
  <li>Put specifics in the answer — a number, a name, a step, a constraint. Generic sentences never get chosen.</li>
  <li>Keep one idea per paragraph so a passage can be extracted cleanly.</li>
  <li>Date the page visibly and update it when the facts change. Stale pages get deprioritised on anything time-sensitive.</li>
  <li>State who wrote it and why they are credible, on the page, not just in schema.</li>
  <li>Use tables for comparisons. Structured rows survive summarisation far better than prose.</li>
</ol>

<h2>Do I need schema markup to get cited by ChatGPT?</h2>
<p>Schema is helpful but not the deciding factor. It makes your page easier to parse and disambiguates what your business is, which supports retrieval — but no amount of JSON-LD rescues a page whose answers are buried. Treat markup as reinforcement for content that is already clear, and see <a href="/blog/schema-markup-for-ai-search-visibility">schema markup for AI search visibility</a> for the types worth implementing.</p>
<p>What does matter more than people expect is entity clarity. Your business name, what you do, where you operate and how to reach you should be stated consistently everywhere — your own site, your Google Business Profile, LinkedIn, industry directories. Models resolve entities from repetition across independent sources. Inconsistent naming splits your identity into two half-formed entities, and neither becomes citable.</p>

<h2>What about being mentioned on sites you do not own?</h2>
<p>Off-site mentions often carry as much weight as your own pages, because for commercial queries the retrieval layer commonly pulls listicles, forums, review platforms and industry roundups rather than vendor sites. Try it yourself: ask an assistant for a shortlist of agencies in your city and look at what it cites. Often none of the sources are agency websites.</p>
<p>The practical response is unglamorous: be present, accurately, where those documents get written. Answer questions in communities where your customers actually are. Get included in genuine roundups. Keep your directory listings identical to each other. None of this is a growth hack, and none of it works quickly, but in our experience it is the part of <a href="/seo-company">our SEO work</a> that shows up most consistently in AI answers, and it compounds with the entity work described in <a href="/blog/entity-seo-knowledge-graph-presence">entity SEO and knowledge graph presence</a>.</p>

<h2>How do you tell whether any of it is working?</h2>
<p>You measure it by testing prompts on a schedule and by watching referral traffic, because there is no ranking report for AI citations and there probably never will be one. Build a list of 20 to 40 questions a real buyer would ask, run them monthly across ChatGPT, Perplexity and Google's AI mode, and record whether you were cited, mentioned without a link, or absent.</p>
<p>On the analytics side, referrals from chatgpt.com and perplexity.ai are visible in your traffic reports and should be segmented out. The volume will look small next to organic search, so judge it on the quality of what arrives rather than the count. Someone who clicks through from an assistant has already had a comparison summarised for them, which tends to make the conversation you have with them a different one. Measure that against your own baseline rather than trusting anyone's benchmark. If you want a second opinion on what to track and what to ignore, that is the kind of thing our <a href="/ai-consulting-company">AI consulting team</a> does in a single working session.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Find out what ChatGPT says about you today</h3>
  <p>Send us your five most valuable buying questions and we will run them, show you who is being cited instead of you, and explain why. There is no obligation to work with us afterwards.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Can I pay to be cited by ChatGPT?",
        a: "No. There is no advertising product that places your business into ChatGPT's cited sources, and anyone selling guaranteed AI citations is selling something they cannot deliver. Citations come from retrieval, and retrieval is earned through crawlability, clarity and third-party presence.",
      },
      {
        q: "Should I block GPTBot in robots.txt?",
        a: "That depends on whether your concern is training or visibility. Blocking GPTBot limits use of your content for model training but does not remove you from ChatGPT's search retrieval, which uses OAI-SearchBot. If visibility in AI answers matters to you, leave OAI-SearchBot allowed regardless of what you decide about GPTBot.",
      },
      {
        q: "How long does it take to start appearing in AI answers?",
        a: "There is no fixed timeline, and it varies by how competitive the question is and how quickly your pages get recrawled. Newly published pages need to be indexed before they can be retrieved, so the realistic sequence is indexation first, mentions second, citations after that.",
      },
      {
        q: "Does ChatGPT use my Google rankings to decide what to cite?",
        a: "Not directly, but the two correlate because both depend on being indexable, topically relevant and reasonably authoritative. Pages that rank well are usually in the candidate set. The difference is what happens next, where formatting and self-contained answers decide who gets quoted.",
      },
      {
        q: "Is AEO different from SEO, or just a new name for it?",
        a: "It shares the technical foundation but diverges on formatting, measurement and the value of off-site mentions. Classic SEO optimises a page to be clicked; answer engine optimisation optimises a passage to be extracted, and success may involve no click at all.",
      },
    ],

    author: "Avani Enterprises",
  },

  // ---------------------------------------------------------------------------
  // 2
  // ---------------------------------------------------------------------------
  {
    slug: "answer-engine-optimization-guide-india",
    title: "Answer Engine Optimization: A Practical Guide for Indian Businesses",
    category: "SEO",
    tags: ["AEO", "SEO Strategy", "India", "AI Search"],

    excerpt:
      "A working AEO process for Indian businesses: what to audit, how to restructure pages, which local signals matter, and how to measure it without rank tracking.",

    metaTitle: "Answer Engine Optimization: India Guide",
    metaDescription:
      "A practical answer engine optimization guide for Indian businesses — audit steps, page restructuring, local signals and measurement you can actually run.",
    metaKeywords: [
      "answer engine optimization",
      "AEO India",
      "AI search optimisation",
      "SEO for Indian businesses",
    ],

    coverImage: "",

    keyTakeaways: [
      "Answer engine optimization is the practice of structuring content so an AI assistant can extract a correct, attributable answer from it without needing the rest of the page.",
      "Indian businesses field a mix of English, Hinglish and transliterated queries, and answer engines handle that paraphrasing better than keyword tools do, which changes how you research topics.",
      "Publishing real price ranges in rupees, real turnaround times and real constraints makes a page far more citable than any amount of persuasive copy.",
      "AEO cannot be measured with rank tracking, so the reporting layer has to be rebuilt around prompt testing and assisted-conversion quality.",
      "The technical prerequisites for AEO are the same as for indexation, so a site with crawl or rendering problems should fix those before anything else.",
    ],

    content: `<p>Answer engine optimization is what you do to a page so that an assistant — ChatGPT, Perplexity, Gemini, Google's AI Overviews — can pull a correct and attributable answer out of it. For Indian businesses this matters sooner than most people assume, because so much buying research here happens on a phone, in mixed English and Hindi, phrased as a question rather than a keyword. This guide is the process we actually run, in order, with the India-specific parts called out.</p>

<h2>What is answer engine optimization, in one paragraph?</h2>
<p>Answer engine optimization is the practice of making a page's individual passages self-sufficient, verifiable and easy to attribute, so that a language model can quote one of them and credit you. It differs from traditional SEO in emphasis rather than in kind: the technical groundwork is identical, but the unit of optimisation shrinks from the page to the paragraph, and the goal shifts from earning a click to earning a mention.</p>

<h2>Why does this matter more for Indian businesses right now?</h2>
<p>It matters because Indian buyers commonly search conversationally and on a phone, and conversational queries are exactly what answer engines handle best. Long, spoken-style questions often show up in keyword tools as zero-volume even when customers ask them constantly. Traditional research misses them; an assistant answers them from whatever page happens to be structured well.</p>
<p>There is a second reason, and it is competitive rather than behavioural. Most Indian category pages are still written as brochure copy — adjectives, promises, no specifics. A competitor who publishes an actual price band, an actual delivery window and an actual list of what is excluded gives a model something to quote when nobody else in the category has. That is an editing decision available to you today, and it does not depend on budget.</p>

<h2>What does an AEO audit actually look at?</h2>
<p>An AEO audit checks three layers in sequence: whether the page can be retrieved, whether the answer can be extracted, and whether the entity behind it can be resolved. Skipping to layer two is the most common mistake, and it wastes months.</p>
<ol>
  <li><strong>Retrievability.</strong> Indexation status, robots.txt rules for AI crawlers, server-side rendering of main content, canonical correctness, response times on mobile networks.</li>
  <li><strong>Extractability.</strong> Question-form headings, first-sentence answers, one idea per paragraph, tables for comparisons, visible dates, named authorship.</li>
  <li><strong>Entity resolution.</strong> Consistent business name, address and phone across your site, Google Business Profile and directories; Organization schema; third-party mentions that describe you the same way you describe yourself.</li>
</ol>
<p>If layer one is failing, nothing downstream helps. That is the same diagnostic sequence a competent agency should walk you through, and it is worth reading our notes on <a href="/guides/how-to-choose-an-seo-agency">how to choose an SEO agency</a> before you buy AEO as a separate line item — most of it is <a href="/seo-company">SEO done properly</a>.</p>

<h2>How should you restructure an existing page for answer engines?</h2>
<p>Restructure it question-first: convert each section heading into the question a customer would ask out loud, then rewrite the opening sentence beneath it so it answers that question completely on its own. Everything else on the page can stay.</p>
<p>Work through a page in this order:</p>
<ul>
  <li>List the eight to twelve questions the page implicitly answers. Interview your sales team for these — they hear the real phrasing.</li>
  <li>Turn each into an <code>h2</code> or <code>h3</code>.</li>
  <li>Write a 40-to-60-word answer directly under each heading. No preamble, no "it depends" without immediately saying what it depends on.</li>
  <li>Move persuasive copy below the answers rather than above them.</li>
  <li>Add one comparison table if the page involves any choice between options.</li>
  <li>Add an FAQ block for the questions that did not deserve their own section.</li>
</ul>
<p>This is unglamorous editing work, and it is the highest-return thing on the list. A page that already ranks and is simply badly structured is the fastest win available.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Have one page rewritten for answer engines, free</h3>
  <p>Send us the URL of a page that ranks but never gets quoted, and we will mark up exactly what to restructure and why. You keep the notes whether or not you hire us.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Which India-specific signals actually matter?</h2>
<p>The signals that matter most for Indian businesses are pricing transparency in rupees, location specificity, and consistency of your business identity across the platforms an assistant is likely to read. All three are things Indian sites routinely get wrong.</p>

<h3>Publish real numbers in rupees</h3>
<p>"Affordable packages, contact us for pricing" is unciteable. A range is citable. If a website build genuinely runs from ₹60,000 for a small brochure site to several lakh for a custom platform, say that, and say what moves it up the range. Buyers respect the honesty and answer engines can quote it. Our breakdown of <a href="/guides/website-development-cost-india">website development cost in India</a> exists for precisely this reason.</p>

<h3>Be specific about place, not just present in it</h3>
<p>A page that says "we serve clients across India" tells an assistant nothing. A page that says which cities you have offices in, which areas you cover on site, and which you support remotely can be matched to a location query. City-level service pages such as <a href="/seo-company-gurgaon">our Gurgaon SEO page</a> work for the same reason they work in local search — specificity beats reach. The wider checklist in <a href="/blog/local-seo-checklist-indian-smb">our local SEO checklist for Indian SMBs</a> covers the profile and citation side.</p>

<h3>Write for mixed-language phrasing without writing bad English</h3>
<p>Indian users type queries in English, in Hinglish, and in transliterated Hindi, often in the same session. You do not need to publish keyword-stuffed variants for each. Answer engines handle paraphrase well. What helps is naming things the way customers name them — including the colloquial term alongside the formal one, once, in a natural sentence.</p>

<h2>What should you stop doing?</h2>
<p>Stop producing high-volume, low-substance content, because it is now actively harmful rather than merely useless. Scaled thin content is explicitly targeted by search quality systems, and it also gives assistants nothing to lift, so it loses on both fronts simultaneously.</p>
<p>Also worth dropping: keyword density targets, word count minimums applied without reason, and "ultimate guide" pages that cover everything shallowly. A short page that answers one question properly outperforms a long one that circles ten. If your team currently uses AI to produce volume, redirect it towards research and editing instead — the approach we use across <a href="/ai-content-services">our content services</a> keeps a named human accountable for every published claim.</p>

<h2>How do you measure AEO without rank tracking?</h2>
<p>You measure it by scoring a frozen panel of commercial questions on a repeating schedule, because no position number exists to report. A binary "cited or not" hides all the progress that happens before a citation lands, so score each question on a scale instead:</p>
<table>
  <thead>
    <tr>
      <th>Score</th>
      <th>What you saw in the answer</th>
      <th>What it tells you to fix next</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>No mention; a competitor is cited</td>
      <td>You are not in the candidate set — go back to retrievability</td>
    </tr>
    <tr>
      <td>1</td>
      <td>Named in passing, no link</td>
      <td>The entity resolves; the page is not yet quotable</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Cited with a link</td>
      <td>That passage worked — note which page and reuse the pattern</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Cited, and the phrasing is recognisably yours</td>
      <td>Your framing has become the default answer; defend it with freshness</td>
    </tr>
  </tbody>
</table>
<p>Total the scores per assistant each month. The absolute number means nothing; the direction across several months is the whole point. Keep the question list frozen, because editing it quietly resets your baseline and makes every previous month unusable.</p>
<p>Alongside the panel, watch three things in analytics: referral sessions from assistant domains, branded search volume (which tends to rise when you are being mentioned but not linked), and the conversion rate of assistant traffic compared with organic. That last number is usually the argument that justifies the work internally. This overlaps heavily with the zero-click problem covered in <a href="/blog/zero-click-search-what-to-do-about-it">what to do about zero-click search</a>, and with the reporting discipline we apply across <a href="/digital-marketing-company">all our digital marketing engagements</a>.</p>
<p>Set expectations honestly with whoever signs off the budget. AEO does not produce a clean, attributable traffic line. It produces a shift in how often you are named at the moment someone is deciding — and that shows up in pipeline before it shows up in sessions.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Start with an honest audit, not a retainer</h3>
  <p>We will run your top buying questions through the major assistants and show you where you stand against the sites being cited instead. You get the findings either way.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Is answer engine optimization replacing SEO?",
        a: "No. It sits on top of SEO and depends entirely on it. Every prerequisite for AEO — indexation, crawlability, rendering, authority — is an SEO prerequisite. What changes is how you format content and how you measure success.",
      },
      {
        q: "Do I need separate content for AEO and for Google?",
        a: "No, and producing two versions is usually a duplication problem waiting to happen. A single page structured question-first serves both, because Google's own AI Overviews reward the same extractable formatting that assistants do.",
      },
      {
        q: "Does AEO work for regional-language content in India?",
        a: "It works on the same principles, but with the caveat that answer engines currently retrieve less regional-language content overall. If your audience genuinely searches in a regional language, publish in it properly with correct hreflang rather than machine-translating an English page.",
      },
      {
        q: "How much should an Indian SMB budget for AEO work?",
        a: "There is no standard figure, because most of the work is restructuring content you already have rather than buying a new service. A sensible starting point is to treat it as a scope addition to existing SEO rather than a separate retainer, and to price the first phase as an audit.",
      },
      {
        q: "Will publishing my prices hurt my sales conversations?",
        a: "It changes them rather than harming them. Publishing a range filters out enquiries that were never going to close and gives serious buyers a reason to trust the rest of the page. It also makes the page quotable, which unpriced pages never are.",
      },
      {
        q: "How often should I re-run my AEO checks?",
        a: "Monthly is enough for the prompt panel, and quarterly for the technical audit. Answers change as models and indexes refresh, so a single snapshot tells you very little — the trend across several months is the useful signal.",
      },
    ],

    author: "Avani Enterprises",
  },

  // ---------------------------------------------------------------------------
  // 3
  // ---------------------------------------------------------------------------
  {
    slug: "generative-engine-optimization-vs-seo",
    title: "Generative Engine Optimization vs SEO: What Actually Changes",
    category: "SEO",
    tags: ["GEO", "SEO Strategy", "AI Search"],

    excerpt:
      "Most of GEO is SEO you should already be doing. This is an honest split of what genuinely changes, what stays identical, and where the budget argument really sits.",

    metaTitle: "Generative Engine Optimization vs SEO",
    metaDescription:
      "Generative engine optimization vs SEO, compared honestly: what changes, what stays the same, and how to split effort without duplicating your content work.",
    metaKeywords: [
      "generative engine optimization",
      "GEO vs SEO",
      "AI search strategy",
      "generative search",
    ],

    coverImage: "",

    keyTakeaways: [
      "Generative engine optimization changes the unit of optimisation from the page to the passage, and the success metric from clicks to citations.",
      "Most of the work is indistinguishable from competent technical SEO, which is why buying GEO as a separate service usually means paying twice for the same audit.",
      "The genuine differences are formatting for extraction, off-site presence in third-party documents, and measurement that cannot rely on rank position.",
      "Expect the traffic impact to be uneven by page type rather than uniform, because a definitional question can be answered in place while a buying decision still needs the page.",
      "A single well-structured page can serve both classic search and generative answers, and maintaining two versions creates duplication risk for no benefit.",
    ],

    content: `<p>Generative engine optimization — GEO — is the term that stuck for optimising content to be used inside AI-generated answers rather than listed in a results page. It is being sold aggressively as a new discipline. It is not quite that. A large part of it is SEO you should already be doing, and a small part of it is genuinely new and genuinely important. This post separates the two, because knowing which is which decides how you spend.</p>

<h2>What is generative engine optimization?</h2>
<p>Generative engine optimization is the practice of shaping content so that a generative system will retrieve it, use it as supporting evidence, and attribute the resulting statement to you. The output you are optimising for is a sentence inside someone else's paragraph, with your name next to it — not a blue link in position three.</p>
<p>That single shift explains most of the downstream differences. When the output is a synthesised paragraph, the model needs something it can defend. Vague claims cannot be defended, so they are dropped. Specific, sourced, self-contained statements survive.</p>

<h2>What actually changes between SEO and GEO?</h2>
<p>Six things change materially, and everything else is shared. Here is the honest split:</p>

<table>
  <thead>
    <tr>
      <th>Dimension</th>
      <th>Classic SEO</th>
      <th>Generative engine optimization</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Unit of optimisation</td>
      <td>The page</td>
      <td>The passage — often a single paragraph</td>
    </tr>
    <tr>
      <td>Primary goal</td>
      <td>Rank, then earn the click</td>
      <td>Be retrieved, then be quoted and attributed</td>
    </tr>
    <tr>
      <td>Winning format</td>
      <td>Comprehensive coverage, strong internal linking</td>
      <td>Question headings, self-contained answers, tables</td>
    </tr>
    <tr>
      <td>Off-site emphasis</td>
      <td>Links, for authority transfer</td>
      <td>Mentions, for entity resolution and third-party corroboration</td>
    </tr>
    <tr>
      <td>Freshness</td>
      <td>Matters on some query types</td>
      <td>Matters more, because assistants prefer recently confirmed facts</td>
    </tr>
    <tr>
      <td>Measurement</td>
      <td>Rank position, impressions, clicks</td>
      <td>Prompt-panel citation rate, brand mentions, referral quality</td>
    </tr>
  </tbody>
</table>

<h2>What stays exactly the same?</h2>
<p>Everything technical stays the same, and that is not a caveat — it is most of the work. A generative system cannot cite a page it cannot fetch, cannot parse, or has never indexed.</p>
<ul>
  <li>Crawlability, indexation and canonical hygiene.</li>
  <li>Server-side rendering or static generation of main content.</li>
  <li>Site speed and Core Web Vitals, which affect crawl efficiency as well as users.</li>
  <li>Information architecture and internal linking, which is how topical relationships are inferred.</li>
  <li>Genuine subject-matter depth and first-hand experience.</li>
  <li>Topical authority built through clusters rather than scattered one-off posts, as in <a href="/blog/topic-clusters-and-pillar-pages">topic clusters and pillar pages</a>.</li>
</ul>
<p>If a vendor's GEO proposal does not open with a technical audit, it is not a GEO proposal. That is the same standard we hold ourselves to across <a href="/seo-company">our SEO engagements</a>, whether or not the brief mentions AI.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Being quoted at a GEO premium? Get a second opinion first</h3>
  <p>Send us the proposal. We will tell you which line items are genuine generative-search work and which are standard SEO with a new label. No obligation either way.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>Does GEO need different content, or just different formatting?</h2>
<p>In most cases it needs different formatting of the same content, not different content. The underlying expertise, examples and judgement that make a page worth reading are exactly what make a passage worth quoting. What changes is where you put the answer and how self-sufficient you make it.</p>
<p>There is one real content difference worth naming: generative systems reward pages that state their limits. A paragraph that says "this approach works for catalogues under about 5,000 SKUs; above that, the indexing behaviour changes" is more likely to be used than one that claims the approach works universally. Qualified claims are safer to synthesise, so they get chosen. Marketing instinct says remove the caveat. For GEO, keep it.</p>

<h2>How does GEO change the traffic you can expect?</h2>
<p>Plan for an uneven impact by page type rather than a flat decline across the site. Definitional and how-does-this-work queries are the ones most easily answered in place, because a paragraph fully satisfies them. Queries where someone wants to compare vendors, see a real product, check availability or buy something still tend to need a visit, because an answer cannot substitute for the thing itself. Segment your own Search Console data by page type before assuming which side you are on — the split differs by industry and guessing it is how budgets get moved to the wrong place.</p>
<p>The practical implication is a portfolio decision rather than a panic. Informational posts should be reframed as reputation and citation assets — their job is to make you the named source, not to be the traffic engine. Meanwhile, the pages that convert deserve disproportionate investment, which for retailers means the product and category work described in <a href="/ecommerce-seo-services">our ecommerce SEO services</a>. Our fuller notes on which sources get pulled into AI results are in <a href="/blog/how-google-ai-overviews-pick-sources">how Google AI Overviews pick sources</a>.</p>

<h2>Should you hire separately for GEO?</h2>
<p>No, in almost every case. GEO is a scope addition to SEO, not a parallel function, and separating them produces two teams making conflicting changes to the same pages. The one exception is measurement: prompt-panel testing is genuinely new operational work and someone has to own it, but that is a task, not a department.</p>
<p>If you are structuring a budget, a reasonable split is to keep technical and content SEO as the base, add a fixed monthly block for restructuring existing high-value pages into question-first format, and add a small block for prompt testing and reporting. That is it. Anything more elaborate is usually packaging.</p>

<h2>What is the single highest-return GEO task?</h2>
<p>Rewriting the opening sentence beneath every heading on your top twenty pages. It is editing rather than engineering, it touches no templates or redirects, and it converts pages that have already earned authority into pages that can actually be quoted.</p>
<p>Do that before you commission anything new. Most sites are sitting on more unrealised citation potential in content they have already published than in anything still on the content calendar. Once that is done, the next tier is structured data and entity consistency, and after that off-site presence — in that order, because each one only pays off if the previous one is in place. If your stack makes those edits painful, that is a build problem rather than a marketing one, and our <a href="/ai-development-company">engineering team</a> is usually the faster route to fixing it. The full workflow is laid out in <a href="/blog/answer-engine-optimization-guide-india">our answer engine optimization guide</a>, and the broader reference library sits in <a href="/guides">our guides section</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Which of your pages are closest to being cited?</h3>
  <p>Give us your top-performing URLs and we will rank them by how little work each needs to become quotable. Straight answers, no retainer required.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Is GEO the same thing as AEO?",
        a: "They overlap almost entirely and the terms are used interchangeably in practice. Where people draw a distinction, AEO tends to describe optimising for direct answers of any kind, while GEO specifically describes optimising for generated, synthesised responses. The tactics are the same.",
      },
      {
        q: "Will GEO hurt my Google rankings?",
        a: "No. The changes involved — clearer headings, direct answers, tables, accurate schema, faster pages — are all things classic ranking systems already reward. There is no trade-off to manage here.",
      },
      {
        q: "Do I need to publish more content for generative search?",
        a: "Usually less, not more. Generative systems reward depth and specificity over coverage, and thin published-at-volume content is penalised by ranking systems anyway. Restructuring existing pages beats adding new ones for most sites.",
      },
      {
        q: "How do I know if a GEO agency is legitimate?",
        a: "Ask what they will measure and how. A legitimate answer involves a defined prompt panel, referral segmentation and brand-mention tracking. An answer that promises a position or a guaranteed citation is not credible, because no such control exists.",
      },
      {
        q: "Does GEO matter for B2B as well as consumer businesses?",
        a: "It arguably matters more for B2B, because buyers there research heavily before contacting anyone and increasingly use assistants for vendor shortlisting. Being the source an assistant names during that shortlisting stage is worth more than a click later.",
      },
    ],

    author: "Avani Enterprises",
  },

  // ---------------------------------------------------------------------------
  // 4
  // ---------------------------------------------------------------------------
  {
    slug: "schema-markup-for-ai-search-visibility",
    title: "Schema Markup for AI Search Visibility",
    category: "SEO",
    tags: ["Schema", "Technical SEO", "AI Search", "Structured Data"],

    excerpt:
      "Which structured data types genuinely help AI search, how to implement them in JSON-LD, and the mistakes that quietly make markup worthless.",

    metaTitle: "Schema Markup for AI Search: What to Use",
    metaDescription:
      "Schema markup for AI search, explained: which types are worth implementing, working JSON-LD examples, common mistakes and how to validate what you ship.",
    metaKeywords: [
      "schema markup for AI search",
      "structured data",
      "JSON-LD",
      "FAQPage schema",
      "Organization schema",
    ],

    coverImage: "",

    keyTakeaways: [
      "Schema markup does not make an AI assistant cite you, but it removes ambiguity about what your page is and who published it, which is a precondition for being used confidently.",
      "JSON-LD is the only implementation format worth using now, because it sits separately from your visible markup and survives redesigns.",
      "Organization schema with a sameAs array is the single highest-value type for a business, because it links your site to the profiles that corroborate your identity.",
      "Markup that describes content not visible on the page is a policy violation and a credibility risk, and it is the most common mistake we find.",
      "Structured data is reinforcement, not substitution — a page with perfect schema and buried answers still will not get quoted.",
    ],

    content: `<p>Schema markup for AI search sits in an awkward place: it is genuinely useful, routinely oversold, and almost always implemented badly. Structured data will not conjure a citation out of a thin page. What it does is remove ambiguity — about what your business is, what a page is for, who wrote it and when — and ambiguity is one of the reasons a retrieval system passes over a page it could otherwise have used. This is what is worth implementing, and what to skip.</p>

<h2>Does schema markup for AI search actually help?</h2>
<p>It helps indirectly, by making your content machine-legible and your identity resolvable, but it is not a ranking or citation lever on its own. No major AI provider has published a statement saying structured data increases your chance of being cited. What is documented is that structured data helps search systems understand entities and content types, and AI retrieval sits on top of those same systems.</p>
<p>So the honest framing is this: schema is cheap, low-risk, and it makes everything else you do legible. It is worth doing for the same reason a clean sitemap is worth doing. It is not worth doing instead of fixing your content.</p>

<h2>Which schema types are worth the effort?</h2>
<p>Six types cover almost every business case. The rest are specialist and usually not worth the maintenance burden.</p>

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Use it on</th>
      <th>What it disambiguates</th>
      <th>Priority</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Organization</td>
      <td>Homepage, site-wide</td>
      <td>Who you are, your logo, your verified profiles via sameAs</td>
      <td>Essential</td>
    </tr>
    <tr>
      <td>LocalBusiness</td>
      <td>Location and city pages</td>
      <td>Address, service area, opening hours, phone</td>
      <td>Essential if you have premises</td>
    </tr>
    <tr>
      <td>Article / BlogPosting</td>
      <td>Editorial content</td>
      <td>Author, publish and modified dates, headline</td>
      <td>High</td>
    </tr>
    <tr>
      <td>FAQPage</td>
      <td>Pages with genuine Q&amp;A visible on screen</td>
      <td>Which text is a question and which is its answer</td>
      <td>High, with care</td>
    </tr>
    <tr>
      <td>Product / Offer</td>
      <td>Ecommerce product pages</td>
      <td>Price, currency, availability, condition</td>
      <td>Essential for retail</td>
    </tr>
    <tr>
      <td>BreadcrumbList</td>
      <td>Any page below the root</td>
      <td>Where the page sits in your hierarchy</td>
      <td>Moderate</td>
    </tr>
  </tbody>
</table>

<p>Note the qualifier on FAQPage. Google reduced FAQ rich result eligibility to a narrow set of site types, so the visible-result benefit largely went away for ordinary businesses. The markup is still worth keeping as a parsing aid, but do not implement it expecting rich results. The distinction between markup that works and markup that just sits there is covered further in <a href="/blog/faq-schema-that-actually-gets-quoted">FAQ schema that actually gets quoted</a>.</p>

<h2>Should you use JSON-LD, microdata or RDFa?</h2>
<p>Use JSON-LD, and do not spend time on the alternatives. JSON-LD lives in a script block that is completely separate from your visible HTML, which means a designer restyling the page cannot break it, and a developer can generate it from the same data that renders the page.</p>
<p>A minimal Organization block looks like this:</p>
<pre><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Business Name",
  "url": "https://example.in",
  "logo": "https://example.in/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/your-company",
    "https://in.linkedin.com/company/your-company",
    "https://www.instagram.com/yourcompany"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "sales",
    "areaServed": "IN"
  }
}
&lt;/script&gt;</code></pre>
<p>The <code>sameAs</code> array is the part people skip and it is the part that matters most. It is an explicit statement that this website and those profiles are the same entity, which is exactly the connection a model needs to make before it will describe you confidently. That is the mechanism behind <a href="/blog/entity-seo-knowledge-graph-presence">entity SEO and knowledge graph presence</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Get your structured data checked properly</h3>
  <p>Send us a URL and we will validate your markup, flag anything that contradicts your visible content, and list what is missing. You get the report with no obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>What are the most common schema mistakes?</h2>
<p>The most common mistake is marking up content that does not appear on the page, and it is a documented guidelines violation rather than a grey area. Here are the failures we find most often, in rough order of frequency:</p>
<ol>
  <li><strong>Invisible content in markup.</strong> FAQ answers or review text present in JSON-LD but nowhere on screen. Remove it.</li>
  <li><strong>Self-serving review markup.</strong> Aggregate ratings you generated yourself, attached to your own organisation. This is restricted and it is a credibility risk on a site that has already had unverifiable-claims problems.</li>
  <li><strong>Stale dates.</strong> <code>dateModified</code> that never changes, or that changes on every deploy regardless of whether the content changed. Both are misleading.</li>
  <li><strong>Duplicate Organization blocks.</strong> One from the CMS, one from a plugin, one hard-coded — with three slightly different names.</li>
  <li><strong>Wrong currency.</strong> Product offers priced in rupees but declared as USD. Set <code>priceCurrency</code> to INR and write the visible price as ₹ so the two agree.</li>
  <li><strong>Markup on the wrong template.</strong> Article schema applied to a category page, or LocalBusiness applied site-wide when you have several branches.</li>
  <li><strong>Copy-pasted examples.</strong> Placeholder values from a tutorial left in production.</li>
</ol>
<p>Every one of these is a build-quality issue rather than a marketing one, which is why we treat structured data as part of the delivery standard on <a href="/web-development-company">the sites we build</a> rather than something bolted on afterwards.</p>

<h2>How do you handle schema across multiple locations?</h2>
<p>Give each location its own page and its own LocalBusiness block with that branch's address, phone and hours, then reference the parent Organization. Do not put every branch into one page's markup and hope the right one is picked.</p>
<p>The name, address and phone number in the markup must match the visible page and the corresponding Google Business Profile exactly — same abbreviations, same suite numbers, same phone format. Mismatches split the entity, which is the single most damaging thing you can do to a multi-branch business's visibility. If you run city pages such as <a href="/seo-company-mumbai">a Mumbai service page</a>, treat that consistency check as mandatory before publishing.</p>

<h2>How do you validate what you have shipped?</h2>
<p>Validate in two places, because they test different things. The Schema Markup Validator checks whether your JSON-LD is syntactically valid and correctly typed. Google's Rich Results Test checks whether it qualifies for a specific search feature. A block can pass the first and fail the second, and that is often fine.</p>
<p>Two further checks people forget:</p>
<ul>
  <li><strong>Test the rendered page, not the source.</strong> If schema is injected by JavaScript, fetch and render the URL rather than viewing source, or you are validating something the crawler may never see.</li>
  <li><strong>Watch Search Console.</strong> The structured data reports flag errors across the whole site over time, which catches template regressions that spot-checking never will. The common failure patterns are covered in <a href="/guides/why-google-is-not-indexing-my-pages">our indexing troubleshooting guide</a>.</li>
</ul>
<p>Finally, keep perspective. Schema is a supporting act. It earns its place because it is cheap and it removes doubt — but the reason a page gets quoted is still the sentence you wrote under the heading, and no markup compensates for a weak one. If you want the wider process that schema plugs into, start with <a href="/seo-company">our SEO approach</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>One markup audit, one clear list of fixes</h3>
  <p>We will tell you which schema types your site actually needs, which existing blocks are doing nothing, and what to remove. No obligation to continue with us.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Does schema markup guarantee I will appear in AI answers?",
        a: "No. Structured data helps machines interpret your page correctly, but no provider has stated that it increases citation likelihood. Treat it as removing obstacles rather than creating an advantage.",
      },
      {
        q: "Is FAQPage schema still worth adding?",
        a: "It is still worth adding as a parsing aid, but not as a route to rich results. Google narrowed FAQ rich result eligibility to a limited set of site types, so most businesses will no longer see the visual treatment even with valid markup.",
      },
      {
        q: "Can I add review schema to my own website?",
        a: "Self-serving review markup — ratings about your own business, placed by you on your own site — is restricted under Google's guidelines. Reviews collected and displayed by an independent platform are a different matter. When in doubt, leave it out.",
      },
      {
        q: "Should schema be added by a plugin or hand-coded?",
        a: "Either works, but pick one and audit the output. The most common problem with plugins is duplication, where the plugin and the theme both emit an Organization block with different values. Check the rendered page for how many blocks are actually present.",
      },
      {
        q: "How often should structured data be reviewed?",
        a: "Review it after every template change and at least quarterly otherwise. Schema breaks silently during redesigns and CMS upgrades, and nothing on the page looks wrong when it does, so it goes unnoticed until a report flags it.",
      },
    ],

    author: "Avani Enterprises",
  },

  // ---------------------------------------------------------------------------
  // 5
  // ---------------------------------------------------------------------------
  {
    slug: "llms-txt-file-should-you-add-it",
    title: "The llms.txt File: What It Is and Whether You Need One",
    category: "SEO",
    tags: ["llms.txt", "AI Search", "Technical SEO"],

    excerpt:
      "llms.txt is a proposed standard for giving AI models a clean map of your site. Here is what it does, what it does not do, and whether it deserves your time.",

    metaTitle: "The llms.txt File: Do You Need One?",
    metaDescription:
      "What the llms.txt file is, how it differs from robots.txt and sitemap.xml, who actually reads it, and whether adding one to your site is worth the effort.",
    metaKeywords: [
      "llms.txt file",
      "llms.txt",
      "AI crawlers",
      "robots.txt for AI",
    ],

    coverImage: "",

    keyTakeaways: [
      "llms.txt is a proposed convention for publishing a curated, plain-text map of your most useful pages at the root of your domain, aimed at large language models rather than search crawlers.",
      "It is a proposal, not a ratified standard, and no major AI provider has publicly documented consuming it — so treat any claim that it drives citations with scepticism.",
      "It does not control access, does not block training, and does not replace robots.txt or sitemap.xml, all of which serve different and non-overlapping purposes.",
      "The realistic upside is a cleaner ingestion path for anyone who does read it, at a cost of roughly an hour, which is why adding one is defensible even without proof it helps.",
      "Anyone with a stale llms.txt is worse off than someone with none, because a contradicted file is a signal of neglect rather than of curation.",
    ],

    content: `<p>The llms.txt file is a proposal for a plain-text document at the root of your domain that gives large language models a clean, curated map of your site — the pages you would actually want an AI to read, in Markdown, without navigation, cookie banners or scripts in the way. It was proposed publicly in late 2024 and it has spread quickly through SEO circles. Whether it does anything for you is a more interesting question than most write-ups admit.</p>

<h2>What is the llms.txt file?</h2>
<p>An llms.txt file is a Markdown document served at <code>https://yourdomain.com/llms.txt</code> that lists your most important URLs with a one-line description of each, grouped into sections. It is intended to be read by a language model at inference time, when it needs to understand what a site contains without crawling and parsing every page.</p>
<p>The proposed format is deliberately simple: an H1 with the site name, a blockquote summarising what the site is, then H2 sections containing bulleted links with short descriptions. A companion convention suggests offering clean Markdown versions of pages at a <code>.md</code> suffix, so a model can fetch the content without the HTML shell.</p>

<h2>How is it different from robots.txt and sitemap.xml?</h2>
<p>They solve three different problems and none of them substitutes for another. robots.txt controls access, sitemap.xml declares completeness, and llms.txt proposes curation.</p>

<table>
  <thead>
    <tr>
      <th></th>
      <th>robots.txt</th>
      <th>sitemap.xml</th>
      <th>llms.txt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Purpose</td>
      <td>Permit or forbid crawling</td>
      <td>List every URL worth indexing</td>
      <td>Highlight the pages most worth reading</td>
    </tr>
    <tr>
      <td>Format</td>
      <td>Directive text</td>
      <td>XML</td>
      <td>Markdown</td>
    </tr>
    <tr>
      <td>Audience</td>
      <td>All crawlers, by user agent</td>
      <td>Search engine crawlers</td>
      <td>Language models</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>Long-established, universally honoured</td>
      <td>Long-established, universally supported</td>
      <td>Community proposal, adoption unconfirmed</td>
    </tr>
    <tr>
      <td>Enforces anything?</td>
      <td>Yes, by convention</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Effort to maintain</td>
      <td>Low</td>
      <td>Automated</td>
      <td>Manual unless you generate it</td>
    </tr>
  </tbody>
</table>

<p>The row that matters is the last-but-one. robots.txt is honoured because two decades of infrastructure agreed to honour it. llms.txt currently has no such agreement behind it.</p>

<h2>Does anyone actually read llms.txt?</h2>
<p>As of writing, no major AI provider has publicly documented that its systems read llms.txt, and you should be sceptical of anyone claiming otherwise without a link to provider documentation. Some developer tools and documentation platforms have adopted it, and it is genuinely useful in that context. For a general business website, the honest position is that adoption is unproven.</p>
<p>This is not a reason to sneer at it. Conventions have to start somewhere, and the cost of participating is close to nothing. It is a reason to reject the framing you will see in agency pitches, where llms.txt is presented as the lever that gets you cited. It is not. Being crawlable, being clear and being corroborated is what gets you cited, which is the argument laid out in <a href="/blog/generative-engine-optimization-vs-seo">generative engine optimization vs SEO</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Told you need an llms.txt file urgently?</h3>
  <p>We will look at your site and tell you honestly whether it is anywhere near your top ten priorities, and what is. No sales pressure and no obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>

<h2>How do you write an llms.txt file if you want one?</h2>
<p>Write it as a curated shortlist, not a second sitemap. The entire value of the format is that it is selective — a file listing 400 URLs defeats the purpose and is worse than not having one.</p>
<p>A workable structure for a services business:</p>
<pre><code># Example Studio

&gt; Digital, product and AI studio based in Gurugram. We build websites,
&gt; apps and AI systems, and run SEO and performance marketing for
&gt; Indian businesses.

## Services
- [SEO](https://example.in/seo-company): Technical SEO, content and local search.
- [Web development](https://example.in/web-development-company): Custom builds.

## Guides
- [Website cost in India](https://example.in/guides/website-development-cost-india):
  Real price bands and what moves them.

## Company
- [Contact](https://example.in/contact): Enquiries and consultations.</code></pre>
<p>Rules that keep it useful:</p>
<ul>
  <li>Keep it under roughly 50 links. If you cannot choose, you have not curated.</li>
  <li>Write descriptions that state what the page contains, not what you want the reader to feel.</li>
  <li>Use absolute URLs.</li>
  <li>Serve it as <code>text/plain</code> or <code>text/markdown</code>, not as an HTML page.</li>
  <li>Regenerate it whenever your site structure changes, and put that step in your deploy checklist.</li>
</ul>

<h2>What does llms.txt not do?</h2>
<p>It does not control anything. This is the most consequential misunderstanding, and it leads businesses to think they have protected their content when they have not.</p>
<ul>
  <li><strong>It does not block training.</strong> Only robots.txt directives against the relevant user agents attempt that, and even then compliance is voluntary.</li>
  <li><strong>It does not grant access.</strong> If robots.txt disallows a path, listing it in llms.txt changes nothing.</li>
  <li><strong>It does not affect Google rankings.</strong> Google has not indicated any use of the file.</li>
  <li><strong>It does not make a page quotable.</strong> A badly written page linked from llms.txt is still a badly written page.</li>
  <li><strong>It does not replace a sitemap.</strong> Search engines still need the complete XML list.</li>
</ul>
<p>If your actual goal is controlling how AI systems interact with your content, the file you need to edit is robots.txt, and the decisions you need to make are about specific user agents. That is a genuinely useful hour of work, and it is one we walk clients through as part of <a href="/ai-automation-company">any AI engagement</a> where content and data policy come up.</p>

<h2>So should you add one?</h2>
<p>Add one if your site is small enough to curate in under an hour and you have someone who will keep it current; skip it if it will be published once and abandoned. A stale llms.txt pointing at pages that have moved is a worse signal than no file at all, because it advertises that nobody is maintaining the site.</p>
<p>Rank it honestly against your other options. Fixing rendering so your content exists without JavaScript matters more. Restructuring your top pages into question-and-answer format matters more. Getting your Organization schema and profiles consistent matters more, as covered in <a href="/blog/schema-markup-for-ai-search-visibility">schema markup for AI search visibility</a>. On a large site, sorting out how crawlers spend their time matters more too, which is the subject of <a href="/blog/crawl-budget-optimisation-large-sites">crawl budget optimisation for large sites</a>.</p>
<p>Once those are done, spend the hour. It is cheap, it is reversible, and if adoption does arrive you will already be there. Just do not let it be the thing you did instead of the work that actually moves visibility — that ordering is the whole point of how we sequence <a href="/seo-company">technical SEO engagements</a>, and there is more background reading in <a href="/guides">our guides library</a>.</p>

<div class="post-cta">
  <p class="post-cta-eyebrow">Free consultation</p>
  <h3>Get your AI crawler settings reviewed instead</h3>
  <p>The higher-value hour is auditing your robots.txt and rendering against the crawlers that feed AI answers. We will do that review and explain the trade-offs, with no obligation.</p>
  <p><a class="post-cta-btn" href="/contact">Get a free consultation</a></p>
</div>`,

    faqs: [
      {
        q: "Is llms.txt an official standard?",
        a: "No. It is a community proposal published in 2024, not a ratified standard from a body such as the IETF or W3C. That may change, but today it has no formal status and no guaranteed support.",
      },
      {
        q: "Will adding llms.txt get me cited by ChatGPT?",
        a: "There is no evidence that it will. Citation depends on being retrievable and quotable, which comes from crawl access, page structure and third-party corroboration. Treat llms.txt as a small optional extra, not a mechanism.",
      },
      {
        q: "Does llms.txt stop my content being used for AI training?",
        a: "No. It has no access-control function whatsoever. Restricting training use is attempted through robots.txt directives aimed at specific crawler user agents, and compliance with those is voluntary on the crawler's part.",
      },
      {
        q: "Where exactly should the file live?",
        a: "At the root of the domain, at /llms.txt, served as plain text or Markdown rather than rendered as an HTML page. Subdirectory locations are not part of the proposal and should not be expected to work.",
      },
      {
        q: "Should I also publish .md versions of my pages?",
        a: "Only if you can generate them automatically from the same source as your HTML. Hand-maintained duplicates drift out of sync, and two contradictory versions of the same page is a worse outcome than one.",
      },
      {
        q: "Can llms.txt cause any harm to my site?",
        a: "Not directly, provided it does not expose URLs you intended to keep private. The realistic risk is opportunity cost — an hour spent on it instead of on rendering, structure or entity consistency, all of which have demonstrable effects.",
      },
    ],

    author: "Avani Enterprises",
  },
];
