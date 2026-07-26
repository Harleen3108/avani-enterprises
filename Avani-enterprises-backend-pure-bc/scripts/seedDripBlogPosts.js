#!/usr/bin/env node
/**
 * seedDripBlogPosts.js — load the drip queue into MongoDB.
 *
 *   node scripts/seedDripBlogPosts.js            # seed / update the queue
 *   node scripts/seedDripBlogPosts.js --dry      # show the plan, write nothing
 *   node scripts/seedDripBlogPosts.js --status   # what is live vs still queued
 *   node scripts/seedDripBlogPosts.js --reschedule  # re-anchor the whole queue
 *
 * HOW THE DRIP WORKS
 * ------------------
 * There is no cron and no scheduler process. Every post is written with
 * isPublished:true and a FUTURE publishedAt, spaced DRIP_DAYS apart. The public
 * endpoints in index.js filter:
 *
 *     { isPublished: true, publishedAt: { $lte: new Date() } }
 *
 * so a post is invisible until its date arrives and then appears on its own.
 * The queue drains itself. Nothing has to stay running, nothing can fall over
 * at 4am, and there is no token to expire.
 *
 * IDEMPOTENT
 * ----------
 * Re-run it as often as you like. For a slug that already exists it refreshes
 * the content and SEO fields but KEEPS the existing publishedAt, so editing a
 * typo in post 40 never reshuffles the calendar. Only genuinely new slugs get
 * scheduled, and they are appended after whatever is already queued rather than
 * being interleaved.
 *
 * ENV
 *   MONGO_URI   required — already set in the Render service environment
 *   DRIP_DAYS   optional, default 2
 *   SITE_URL    optional, default https://avanienterprises.in
 */

const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const Blog = require("../models/Blog");

const DRIP_DAYS = Number(process.env.DRIP_DAYS || 2);
const SITE_URL = (process.env.SITE_URL || "https://avanienterprises.in").replace(/\/$/, "");
const MONGO_URI = process.env.MONGO_URI;

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const STATUS_ONLY = args.includes("--status");
const RESCHEDULE = args.includes("--reschedule");

/* ── Load the post data files ─────────────────────────────────────────────── */

/**
 * Posts live in scripts/_dripBlogPart1.js … _dripBlogPartN.js, roughly five per
 * file so each stays small enough to open and edit. Ordering is by part number
 * then by position in the file, and that order is the publishing order.
 */
function loadPosts() {
  const dir = __dirname;
  const files = fs
    .readdirSync(dir)
    .filter((f) => /^_dripBlogPart\d+\.js$/.test(f))
    .sort((a, b) => {
      const n = (s) => parseInt(s.match(/(\d+)/)[1], 10);
      return n(a) - n(b);
    });

  if (!files.length) {
    console.error("❌ No _dripBlogPart*.js files found in scripts/.");
    process.exit(1);
  }

  const posts = [];
  for (const f of files) {
    const part = require(path.join(dir, f));
    if (!Array.isArray(part)) {
      console.error(`❌ ${f} must module.exports an array.`);
      process.exit(1);
    }
    part.forEach((p) => posts.push({ ...p, _sourceFile: f }));
  }
  return posts;
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

/** Word count of the rendered text, for read time. */
function wordCount(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function readTimeOf(post) {
  const words =
    wordCount(post.content) +
    wordCount((post.keyTakeaways || []).join(" ")) +
    wordCount((post.faqs || []).map((f) => `${f.q} ${f.a}`).join(" "));
  return Math.max(1, Math.round(words / 200));
}

/** Tomorrow at 09:00 local server time, as the schedule anchor. */
function anchorDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  return d;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

/** Validate a post before it can be written. A bad post is skipped, not fixed. */
function problemsWith(post, seen) {
  const out = [];
  if (!post.slug || !/^[a-z0-9-]+$/.test(post.slug)) out.push("slug must be lowercase-hyphen");
  if (seen.has(post.slug)) out.push("duplicate slug in the queue");
  if (!post.title) out.push("no title");
  if (!post.content || wordCount(post.content) < 600) {
    out.push(`content too short (${wordCount(post.content)} words)`);
  }
  if (!post.excerpt) out.push("no excerpt");
  if (!post.category) out.push("no category");
  if (!post.metaTitle) out.push("no metaTitle");
  if (!post.metaDescription) out.push("no metaDescription");
  if ((post.keyTakeaways || []).length < 3) out.push("needs 3+ keyTakeaways");
  if ((post.faqs || []).length < 4) out.push("needs 4+ faqs");
  return out;
}

/* ── Run ──────────────────────────────────────────────────────────────────── */

(async () => {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not set.");
    process.exit(1);
  }

  const posts = loadPosts();
  console.log(`\nLoaded ${posts.length} post(s) from scripts/_dripBlogPart*.js`);

  // Validate everything before touching the database.
  const seen = new Set();
  const bad = [];
  for (const p of posts) {
    const issues = problemsWith(p, seen);
    seen.add(p.slug);
    if (issues.length) bad.push({ slug: p.slug || "(no slug)", issues });
  }
  if (bad.length) {
    console.error(`\n❌ ${bad.length} post(s) failed validation. Nothing written.\n`);
    bad.forEach((b) => console.error(`   ${b.slug}\n      • ${b.issues.join("\n      • ")}`));
    process.exit(1);
  }
  console.log("✅ All posts passed validation.");

  await mongoose.connect(MONGO_URI);
  console.log(`✅ Connected to MongoDB\n`);

  const now = new Date();

  if (STATUS_ONLY) {
    const all = await Blog.find({ isPublished: true }).select("slug title publishedAt").sort({ publishedAt: 1 }).lean();
    const live = all.filter((b) => new Date(b.publishedAt) <= now);
    const queued = all.filter((b) => new Date(b.publishedAt) > now);
    console.log(`LIVE NOW : ${live.length}`);
    console.log(`SCHEDULED: ${queued.length}\n`);
    if (queued.length) {
      console.log("Next up:");
      queued.slice(0, 10).forEach((b) => console.log(`   ${fmt(b.publishedAt)}  ${b.slug}`));
      const last = queued[queued.length - 1];
      console.log(`\nQueue runs out on ${fmt(last.publishedAt)} — ` +
        `${Math.round((new Date(last.publishedAt) - now) / 86400000)} days of content left.`);
    }
    await mongoose.disconnect();
    return;
  }

  // Where does new scheduling start? After the latest already-scheduled post,
  // so re-running with extra posts appends rather than interleaves.
  const latest = await Blog.findOne({ isPublished: true, publishedAt: { $gt: now } })
    .sort({ publishedAt: -1 })
    .select("publishedAt")
    .lean();

  const anchor = anchorDate();
  let nextSlot = RESCHEDULE || !latest ? anchor : addDays(new Date(latest.publishedAt), DRIP_DAYS);
  if (nextSlot < anchor) nextSlot = anchor;

  let created = 0, updated = 0, rescheduled = 0;

  for (const post of posts) {
    const existing = await Blog.findOne({ slug: post.slug });

    const fields = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author || "Avani Enterprises",
      tags: post.tags || [],
      featuredImage: post.coverImage || post.featuredImage || "",
      category: post.category || "",
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || post.excerpt,
      metaKeywords: post.metaKeywords || [],
      keyTakeaways: post.keyTakeaways || [],
      faqs: post.faqs || [],
      canonical: post.canonical || `${SITE_URL}/blog/${post.slug}`,
      readTime: readTimeOf(post),
      isPublished: true,
    };

    if (existing) {
      // Keep the existing schedule. Editing a typo in a queued post must never
      // move it, or the whole calendar shifts under you.
      const keepDate = new Date(existing.publishedAt);
      let dateLabel = `keeps ${fmt(keepDate)}`;

      if (RESCHEDULE) {
        fields.publishedAt = nextSlot;
        dateLabel = `RE-DATED ${fmt(nextSlot)}`;
        nextSlot = addDays(nextSlot, DRIP_DAYS);
        rescheduled++;
      }

      if (!DRY) await Blog.updateOne({ _id: existing._id }, { $set: fields });
      updated++;
      console.log(`  UPDATE  ${post.slug.padEnd(52)} ${dateLabel}`);
    } else {
      fields.publishedAt = nextSlot;
      const label = nextSlot <= now ? "LIVE NOW" : fmt(nextSlot);
      if (!DRY) await Blog.create(fields);
      created++;
      console.log(`  CREATE  ${post.slug.padEnd(52)} ${label}`);
      nextSlot = addDays(nextSlot, DRIP_DAYS);
    }
  }

  console.log(
    `\n${DRY ? "DRY RUN — nothing written. " : ""}` +
    `${created} created · ${updated} updated${rescheduled ? ` · ${rescheduled} re-dated` : ""}`
  );

  if (created || rescheduled) {
    const last = addDays(nextSlot, -DRIP_DAYS);
    console.log(`Publishing one post every ${DRIP_DAYS} days. Queue runs to ${fmt(last)}.`);
  }

  console.log("\nCheck the queue any time with:  node scripts/seedDripBlogPosts.js --status\n");

  await mongoose.disconnect();
})().catch((err) => {
  console.error("\n❌ Seed failed:", err.message);
  process.exit(1);
});
