#!/usr/bin/env node
/**
 * check-prose-styles.cjs — guard against the article rendering unstyled.
 *
 * The failure this exists to catch: a `.prose` container rendered without
 * PROSE_CSS beside it. Every colour, all paragraph spacing, the heading scale
 * and the list and table rules live in that stylesheet, so losing it turns the
 * article into unspaced text in the dark theme's cream on a light background —
 * unreadable. It builds, it typechecks, and no word count notices.
 *
 * Runs in prebuild. Exits non-zero on a violation.
 */

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "src");

/**
 * Prose.tsx is the one component allowed to render the container directly,
 * because it is the component that pairs it with the stylesheet.
 *
 * It is NOT exempt from the check — it is the most important file to check.
 * An earlier version of this guard allowlisted it, which meant deleting the
 * style tag from the single file that must have it passed silently. That is
 * the exact bug this script exists to catch.
 */
const OWNER = "Prose.tsx";

const problems = [];
let sawOwner = false;

/** Remove block and line comments so the guard inspects code, not commentary. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")   // /* … */ and JSDoc
    .replace(/^\s*\/\/.*$/gm, "");      // whole-line //
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(tsx|jsx)$/.test(entry.name)) continue;

    const rel = path.relative(path.join(__dirname, ".."), full);
    // Comments are stripped before matching. Prose.tsx documents this exact
    // failure, so its own doc block contains both `<div className="…">` and
    // `<style>{PROSE_CSS}</style>` as prose. An earlier version of this guard
    // matched those and happily validated the comment while the real style tag
    // was missing — it reported a pass on genuinely broken code.
    const src = stripComments(fs.readFileSync(full, "utf8"));

    // Does this file render an .avani-article container?
    //
    // Matching `avani-article` and not `prose` is deliberate: @tailwindcss/
    // typography owns `.prose`, and pages like Privacy.tsx legitimately use it.
    // Our article styles were namespaced away from that collision precisely so
    // the two can coexist.
    const rendersProse = /className=\{?[`"'][^`"']*\bavani-article\b/.test(src);
    if (!rendersProse) continue;

    const injectsCss = /<style>\{\s*PROSE_CSS\s*\}<\/style>/.test(src);
    if (injectsCss) { if (entry.name === OWNER) sawOwner = true; continue; }

    problems.push(
      entry.name === OWNER
        ? `${rel}\n      is the component that pairs the article markup with PROSE_CSS,\n` +
          `      but the <style>{PROSE_CSS}</style> tag is missing. Every colour,\n` +
          `      all paragraph spacing and the heading scale come from it.`
        : `${rel}\n      renders an .avani-article container but never injects PROSE_CSS.\n` +
          `      Use <Prose /> from components/blog/Prose.tsx, which binds the two together.`
    );
  }
}

walk(SRC);

// If Prose.tsx stopped rendering the container entirely, every check above
// would pass by simply never matching anything. Assert it was actually seen.
if (!sawOwner) {
  problems.push(
    `src/components/blog/${OWNER}\n      not found, or it no longer renders an .avani-article container\n` +
    `      paired with PROSE_CSS. This guard cannot verify anything without it.`
  );
}

// The SSR path must ship the styles inline too, or the crawler-facing HTML and
// any no-JS render is unstyled.
const seo = path.join(__dirname, "..", "api", "seo.js");
if (fs.existsSync(seo)) {
  const s = fs.readFileSync(seo, "utf8");
  if (/class="avani-article"/.test(s) && !/\$\{PROSE_CSS\}/.test(s)) {
    problems.push("api/seo.js\n      emits class=\"avani-article\" but does not inline PROSE_CSS.");
  }
}

if (problems.length) {
  console.error("\n❌ Article styling guard failed:\n");
  problems.forEach((p) => console.error("   • " + p + "\n"));
  process.exit(1);
}

console.log("✅ Article prose styles are wired everywhere .prose is rendered");
