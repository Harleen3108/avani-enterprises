#!/usr/bin/env node
/**
 * fixNewsletterSlugs.js — clean up newsletter URLs that were never URL-safe.
 *
 *   node scripts/fixNewsletterSlugs.js          # show what would change
 *   node scripts/fixNewsletterSlugs.js --apply  # rename them
 *
 * Eight of nineteen newsletters used their title verbatim as the slug, so the
 * live URLs contain spaces and a rupee sign:
 *   /newsletters/Top AI Content Creator Services in India
 *   /newsletters/How One Business Generated ₹30L Revenue in Just 4 Months
 *
 * The model now slugifies on write, so no new ones can be created this way.
 * This fixes the existing rows and records the old slug in `previousSlugs`, so
 * the route can 301 anything already crawled or shared instead of 404ing.
 *
 * Also reports word counts, because the decision about which newsletters are
 * worth indexing depends on whether there is anything on the page.
 *
 * ENV: MONGO_URI (already set in the Render service environment)
 */

const mongoose = require("mongoose");
const Newsletter = require("../models/Newsletter");
const { slugify } = require("../models/Newsletter");

const APPLY = process.argv.includes("--apply");

const words = (html) =>
  String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;

(async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not set. Run this from the Render Shell.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  // .lean() so the slug setter does not rewrite values before we can compare.
  const all = await Newsletter.find().lean();
  console.log(`\n${all.length} newsletter(s).\n`);

  const renames = [];
  const taken = new Set(all.map((n) => n.slug));

  for (const n of all) {
    const clean = slugify(n.slug);
    if (clean && clean !== n.slug) {
      // Never collide with a slug that already exists on another row.
      let final = clean;
      let i = 2;
      while (taken.has(final) && final !== n.slug) final = `${clean}-${i++}`;
      taken.add(final);
      renames.push({ id: n._id, from: n.slug, to: final });
    }
  }

  console.log("SLUGS TO RENAME");
  if (!renames.length) console.log("  none — every slug is already URL-safe\n");
  renames.forEach((r) => {
    console.log(`  ${JSON.stringify(r.from)}`);
    console.log(`    -> ${r.to}\n`);
  });

  console.log("WORD COUNTS  (what is worth indexing)");
  const counts = all
    .map((n) => ({ slug: slugify(n.slug), w: words(n.content), published: n.isPublished }))
    .sort((a, b) => b.w - a.w);
  counts.forEach((c) => {
    const verdict = c.w >= 400 ? "index" : c.w >= 250 ? "borderline" : "too thin";
    console.log(`  ${String(c.w).padStart(5)}w  ${verdict.padEnd(11)} ${c.slug}`);
  });
  console.log(`\n  ${counts.filter((c) => c.w >= 400).length} at 400+ words`);
  console.log(`  ${counts.filter((c) => c.w < 250).length} under 250 words — leave these noindexed\n`);

  if (!APPLY) {
    console.log("Nothing written. Re-run with --apply to rename.\n");
    await mongoose.disconnect();
    return;
  }

  for (const r of renames) {
    const doc = await Newsletter.findById(r.id);
    if (!doc) continue;
    const prev = new Set(doc.previousSlugs || []);
    prev.add(r.from);                 // keep the old URL redirectable
    doc.previousSlugs = [...prev];
    doc.slug = r.to;                  // setter normalises again, harmlessly
    await doc.save();
    console.log(`  renamed  ${r.to}`);
  }

  console.log(`\n✅ ${renames.length} renamed. Old slugs kept in previousSlugs for 301s.\n`);
  await mongoose.disconnect();
})().catch((err) => {
  console.error("\n❌ Failed:", err.message);
  process.exit(1);
});
