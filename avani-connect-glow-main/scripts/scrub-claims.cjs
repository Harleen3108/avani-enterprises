// scripts/scrub-claims.cjs
// ─────────────────────────────────────────────────────────────────────────────
// Removes performance claims the business cannot evidence.
//
// WHY
// ---
// The fabricated `aggregateRating` was taken out of the structured data during
// the earlier recovery, but the same numbers survived in body copy and meta
// descriptions — which is where quality raters and AI answer engines read them.
// Worse, public/llms.txt explicitly asks AI systems not to attribute a rating to
// Avani Enterprises, while the pages stated one. That contradiction is visible
// to exactly the systems the file exists to influence.
//
// Three claim families are scrubbed:
//
//   "5.0 rating"                  no published, verifiable review corpus exists
//   "95% first-page success"      a ranking guarantee nobody can make
//   "3x organic traffic"          a result guarantee, stated as a general promise
//   "No.1 / #1 …"                 unverifiable superlative
//
// A previous pass replaced "150+ clients" and "300+ projects" with the vague
// "clients/projects across India and the Gulf", which left ungrammatical
// fragments behind. Those are tidied here too.
//
// Run: node scripts/scrub-claims.cjs [--dry]
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const ROOT = path.join(__dirname, '..');

// Source files only. Everything under api/ except seo.js is generated at
// prebuild from these, so scrubbing the sources is enough — but api/seo.js
// hand-codes STATIC_SEO_LOOKUP, so it is edited directly.
const TARGETS = [
  'src/data/cityPagesData.ts',
  'src/data/seoLandingPagesData.ts',
  'src/data/newSeoPagesData.json',
  'src/data/serviceContent.js',
  'src/contexts/SeoContext.tsx',
  'api/seo.js',
  'index.html',
];

// Ordered. Longer, more specific patterns first so a general rule cannot strip
// the context a specific rule needs.
const RULES = [
  // ── Ratings ───────────────────────────────────────────────────────────────
  [/,?\s*(?:and\s+)?(?:a|an|our)?\s*\b5\.0\s*(?:[A-Za-z]+\s+)?rating\b/gi, ''],
  [/\bwith\s+a\s+5\.0\b/gi, 'with'],

  // ── Ranking guarantees ────────────────────────────────────────────────────
  // Keep the sentence shape and any existing article, drop the number.
  // Two rules, not one: a combined pattern with an optional leading article
  // swallows the preceding space when the article is absent ("and 95% …"
  // became "anda disciplined …").
  [/\b(a|an|our)\s+95%\s*first-page\s*(?:ranking\s*)?success(?:\s*(?:rate|record))?/gi,
    '$1 disciplined technical-SEO process'],
  [/\b95%\s*first-page\s*(?:ranking\s*)?success(?:\s*(?:rate|record))?/gi,
    'a disciplined technical-SEO process'],
  [/\b95%\s*first-page\b/gi, 'a disciplined technical-SEO process'],
  // "…process on targeted local keywords" is grammatical but clumsy.
  [/\bdisciplined technical-SEO process on (targeted|chosen|competitive)\b/gi,
    'disciplined technical-SEO process for $1'],
  // "we see a process" / "we have a process on keywords" do not read as English.
  [/\bwe see a disciplined technical-SEO process (?:on|for)\b/gi,
    'we target first-page positions on'],
  [/\bwe have a disciplined technical-SEO process (?:on|for)\b/gi,
    'we build for first-page positions on'],
  [/\ba disciplined technical-SEO process on the keywords we target\b/gi,
    'a disciplined process for the keywords we target'],
  [/\bachieve a disciplined technical-SEO process\b/gi, 'compete on the terms that matter'],
  [/\band\s*a disciplined technical-SEO process\.$/gim, 'and first-page visibility.'],

  // Verbs that read fine before a percentage and badly before a noun phrase.
  [/\bWe target a disciplined technical-SEO process within\b/gi, 'We target first-page positions within'],
  [/\btargeting up to a disciplined technical-SEO process\b/gi, 'targeting first-page positions'],
  [/\bup to a disciplined technical-SEO process\b/gi, 'a disciplined technical-SEO process'],
  [/\bmaintain a disciplined technical-SEO process across\b/gi, 'apply the same technical-SEO discipline across'],
  [/\baveraging compounding organic (traffic|growth)\b/gi, 'building compounding organic $1'],
  [/\b(commonly\s+)?reaching compounding organic traffic over time\b/gi,
    'seeing organic traffic compound over time'],
  [/\breaching compounding organic (traffic|growth)\b/gi, 'seeing organic $1 compound'],
  // A removed clause can leave the replacement opening a sentence lowercase.
  [/([.!?]\s+)a disciplined technical-SEO process/g, '$1A disciplined technical-SEO process'],
  [/averages compounding organic (traffic|growth)/gi, 'builds compounding organic $1'],
  [/achieve compounding organic traffic and a disciplined technical-SEO process/gi,
    'grow organic traffic and compete on the terms that matter'],
  [/experience, and a disciplined technical-SEO process/gi, 'experience and a disciplined technical-SEO process'],
  [/([.!?]\s+)compounding organic/g, '$1Compounding organic'],

  // ── Result guarantees ─────────────────────────────────────────────────────
  // "can drive up to 3x organic traffic" → "can drive compounding organic
  // traffic", which keeps the verb agreement of whatever sentence it sits in.
  [/\b(?:up\s+to\s+)?3x\s+organic\s+traffic\s+(?:growth|increase)\b/gi, 'compounding organic growth'],
  [/\b(?:up\s+to\s+)?3x\s+organic\s+traffic\b/gi, 'compounding organic traffic'],

  // ── Superlatives ──────────────────────────────────────────────────────────
  [/\bNo\.?\s*1\s+(Digital Marketing Agency|SEO Company|Web Development Company)\b/gi, '$1'],
  [/\brank\s*#1\s+on\s+Google\b/gi, 'compete for the top positions on Google'],
  [/\b#1\s+on\s+Google\b/gi, 'top positions on Google'],
  [/\bRank\s*#1\b/g, 'Rank Higher'],

  // ── Grammar left behind by this and the earlier scrub ─────────────────────
  // An earlier pass swapped "150+ clients" / "300+ projects" for a vague phrase
  // and left sentences opening on a bare noun: "…for Rohtak businesses.
  // projects across India and the Gulf, 8+ years."
  [/\.\s+projects across India and the Gulf,\s*/g, '. Delivering across India and the Gulf, '],
  [/\.\s+clients across India and the Gulf,\s*/g, '. Working with clients across India and the Gulf, '],
  [/\bclients across India and the Gulf and projects across India and the Gulf\b/gi,
    'clients and projects across India and the Gulf'],
  [/\bprojects across India and the Gulf and clients across India and the Gulf\b/gi,
    'clients and projects across India and the Gulf'],

  // A removed clause can strand the preposition that introduced it:
  // "a Gurugram team with a 5.0 rating, delivering …" → "a Gurugram team with, delivering …"
  [/\b(with|and|of|at|plus)\s*,/gi, ','],

  // …and can leave the next sentence opening in lower case. Requires two
  // letters before the full stop so "e.g." and "i.e." are left alone, and
  // whitespace after it so URLs and filenames are never touched.
  [/(?<=[A-Za-z]{2})([.!?]\s+)([a-z])/g, (_m, p, c) => p + c.toUpperCase()],
];

// Punctuation left dangling once a clause is removed.
//
// ⚠️ THESE RUN ON CODE FILES. Two rules that look harmless on prose are not:
//
//   / {2,}/ → ' '     collapses source indentation across the whole file
//   /\.\s*\./ → '.'   turns the spread operator `...` into `..`, which does
//                     not parse — it silently broke api/seo.js once already
//
// So: no rule here may touch a run of dots, and none may touch leading
// whitespace. Interior double-spaces are collapsed only after a non-space
// character. TIDY is additionally applied per-line and only to lines a RULE
// actually changed (see the apply loop), so untouched code is never rewritten.
const TIDY = [
  [/(?<=\S) {2,}/g, ' '],
  [/ +,/g, ','],
  [/,( *,)+/g, ','],
  [/, +\./g, '.'],
  [/, *(and +)?(?=[.!?])/gi, ''],
  [/—\s*—/g, '—'],
  [/ +— *(?=[.,])/g, ''],
  [/\band and\b/gi, 'and'],
  [/\bwith with\b/gi, 'with'],
  [/ +([,;:])/g, '$1'],
];

let totalHits = 0;
const report = [];

TARGETS.forEach((rel) => {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) {
    report.push(`  —  ${rel} (not found, skipped)`);
    return;
  }

  const before = fs.readFileSync(p, 'utf8');
  let hits = 0;

  // Line-scoped, so a file's untouched lines are byte-identical afterwards.
  // Leading whitespace is split off and restored verbatim — TIDY must never be
  // in a position to reindent source.
  const eol = before.includes('\r\n') ? '\r\n' : '\n';
  const after = before.split(/\r?\n/).map((line) => {
    const indent = (line.match(/^[ \t]*/) || [''])[0];
    const body = line.slice(indent.length);
    let next = body;

    RULES.forEach(([re, to]) => {
      const m = next.match(re);
      if (m) hits += m.length;
      next = next.replace(re, to);
    });

    if (next === body) return line;              // untouched — return as-is
    TIDY.forEach(([re, to]) => { next = next.replace(re, to); });
    return indent + next;
  }).join(eol);

  if (after !== before) {
    totalHits += hits;
    if (!DRY) fs.writeFileSync(p, after, 'utf8');
    report.push(`  ${String(hits).padStart(4)}  ${rel}`);
  } else {
    report.push(`     0  ${rel}`);
  }
});

console.log(`${DRY ? '[dry run] ' : ''}Unverifiable claims scrubbed:\n${report.join('\n')}`);
console.log(`\n  total replacements: ${totalHits}`);

// Fail loudly if anything survived — this script is wired into prebuild, so a
// claim reintroduced later gets caught at build time rather than in production.
const SURVIVORS = /5\.0\s*(?:[A-Za-z]+\s+)?rating|95%\s*first-page|3x\s+organic\s+traffic|No\.?\s*1\s+Digital Marketing/i;
const leaked = TARGETS.filter((rel) => {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p) && SURVIVORS.test(fs.readFileSync(p, 'utf8'));
});

if (leaked.length && !DRY) {
  console.error(`\n❌ Claims still present in: ${leaked.join(', ')}`);
  process.exit(1);
}
console.log('✅ No unverifiable rating, ranking or traffic guarantees remain.');
