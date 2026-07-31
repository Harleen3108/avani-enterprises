// scripts/swap-primary-phone.cjs
// ─────────────────────────────────────────────────────────────────────────────
// One-off: promote +91 84487 63134 to the primary contact number.
//
// The old number (+91 92536 25099) was hardcoded in ~40 source files in six
// different formats. NAP consistency is a local-pack ranking factor — Google
// cross-references the number on the site against the Google Business Profile
// and third-party citations, and a site showing two different "main" numbers on
// different pages is the exact inconsistency that suppresses local rankings.
//
// So this replaces every display occurrence with the new number. The old number
// is not deleted from the business — it is reintroduced deliberately, in two
// places only, as an explicit secondary:
//
//   src/data/offices.js   NAP.phoneSecondary  (source of truth)
//   src/pages/Contact.tsx the "Phone (second line)" card
//   api/seo.js            a second schema.org ContactPoint
//
// Run once: node scripts/swap-primary-phone.cjs
// It is idempotent — running it again finds nothing and exits 0.
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry');

// Longest first, so "+91 92536 25099" is not half-consumed by a bare-digits rule.
const SWAPS = [
  [/\+91[\s-]?92536[\s-]?25099/g, '+91 84487 63134'],
  [/\+919253625099/g, '+918448763134'],
  [/\b919253625099\b/g, '918448763134'],   // wa.me/ links
  [/\b92536[\s]25099\b/g, '84487 63134'],
  [/\b92536-25099\b/g, '84487-63134'],
  [/\b9253625099\b/g, '8448763134'],
];

// Generated artefacts are excluded — they are rebuilt from these sources by
// `npm run prebuild`, so editing them here would be undone anyway.
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'seoPages']);
const SKIP_FILES = new Set(['swap-primary-phone.cjs']);
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.txt', '.md']);

const ROOTS = ['src', 'api', 'index.html'];

function walk(p, out) {
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    if (SKIP_DIRS.has(path.basename(p))) return;
    fs.readdirSync(p).forEach((f) => walk(path.join(p, f), out));
    return;
  }
  if (SKIP_FILES.has(path.basename(p))) return;
  if (!EXTS.has(path.extname(p))) return;
  out.push(p);
}

const files = [];
ROOTS.forEach((r) => {
  const p = path.join(ROOT, r);
  if (fs.existsSync(p)) walk(p, files);
});

let touched = 0;
let total = 0;
const report = [];

files.forEach((p) => {
  const before = fs.readFileSync(p, 'utf8');
  let after = before;
  let n = 0;

  SWAPS.forEach(([re, to]) => {
    const m = after.match(re);
    if (m) n += m.length;
    after = after.replace(re, to);
  });

  if (after !== before) {
    if (!DRY) fs.writeFileSync(p, after, 'utf8');
    touched++;
    total += n;
    report.push(`  ${String(n).padStart(4)}  ${path.relative(ROOT, p).replace(/\\/g, '/')}`);
  }
});

report.sort((a, b) => Number(b.trim().split(/\s+/)[0]) - Number(a.trim().split(/\s+/)[0]));
console.log(`${DRY ? '[dry run] ' : ''}Primary phone swapped to +91 84487 63134`);
console.log(report.slice(0, 25).join('\n'));
if (report.length > 25) console.log(`  … and ${report.length - 25} more file(s)`);
console.log(`\n  ${total} replacement(s) across ${touched} file(s)`);
