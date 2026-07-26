/**
 * leadSource.js — turn a stored lead into "which page did this come from?".
 *
 * Every lead carries a `source` string set by whichever form was submitted.
 * Historically that was one of three hand-written values, so the admin had one
 * page per value and hard-coded the filter. The site now has a shared lead form
 * on ~460 SEO, city, service and blog pages, each passing its own slug, so the
 * set of sources is open-ended and cannot be enumerated in advance.
 *
 * Newer submissions also store `pagePath` / `pageUrl` directly. Prefer those;
 * fall back to deriving a path from `source` for leads captured before those
 * fields existed.
 */

const SITE = "https://www.avanienterprises.in";

/** Sources that predate pagePath and do not map 1:1 to their slug. */
const LEGACY = {
  "web-dev": { label: "Web Development", path: "/web-dev" },
  "7-day-launch": { label: "7-Day Launch", path: "/7-day-launch" },
  businesssetup2: { label: "Business Setup (free LP)", path: "/businesssetup2" },
  businesssetup3: { label: "Business Setup (free LP)", path: "/businesssetup3" },
  lead_form: { label: "Site lead form", path: "" },
  "": { label: "Unknown", path: "" },
};

/** Broad bucket, used for the summary bar and the filter dropdown. */
export function sourceGroup(lead) {
  const s = String(lead?.source || "").trim();
  if (s.startsWith("blog:")) return "Blog";
  if (LEGACY[s]) return LEGACY[s].label;
  if (!s) return "Unknown";
  // Anything else is an SEO/service/city page slug.
  if (/-(gurgaon|gurugram|rohtak|delhi|noida|mumbai|india)$/.test(s)) return "City / local page";
  if (s.startsWith("vs-") || s.includes("-vs-")) return "Comparison page";
  return "Service page";
}

/** Human label for the source column. */
export function sourceLabel(lead) {
  const s = String(lead?.source || "").trim();
  if (s.startsWith("blog:")) return s.slice(5).replace(/-/g, " ");
  if (LEGACY[s]) return LEGACY[s].label;
  if (!s) return "Unknown";
  return s.replace(/-/g, " ");
}

/** Site-relative path the lead was submitted from, or "" if not knowable. */
export function sourcePath(lead) {
  if (lead?.pagePath) return lead.pagePath;
  const s = String(lead?.source || "").trim();
  if (s.startsWith("blog:")) return `/blog/${s.slice(5)}`;
  if (LEGACY[s]) return LEGACY[s].path;
  if (!s) return "";
  return `/${s}`;
}

/** Absolute URL to open the page the lead came from, or "" if not knowable. */
export function sourceUrl(lead) {
  if (lead?.pageUrl) return lead.pageUrl;
  const p = sourcePath(lead);
  return p ? SITE + p : "";
}

/** Tailwind classes per group, so the badge colour is a consistent signal. */
export function sourceColor(group) {
  switch (group) {
    case "Blog": return "bg-violet-50 text-violet-700 border-violet-200";
    case "Service page": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "City / local page": return "bg-sky-50 text-sky-700 border-sky-200";
    case "Comparison page": return "bg-amber-50 text-amber-700 border-amber-200";
    case "7-Day Launch": return "bg-rose-50 text-rose-700 border-rose-200";
    case "Web Development": return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "Business Setup (free LP)": return "bg-teal-50 text-teal-700 border-teal-200";
    default: return "bg-gray-100 text-gray-600 border-gray-200";
  }
}
