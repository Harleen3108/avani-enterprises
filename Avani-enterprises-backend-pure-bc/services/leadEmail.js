/**
 * leadEmail.js — one notification template for every lead the site produces.
 *
 * There were two: /submit-form had a decent one, /avani-form still had the
 * original three-line version that went only to ADMIN_EMAIL. Contact
 * submissions were therefore arriving with no origin page and, if ADMIN_EMAIL
 * was ever unset, not arriving at all.
 *
 * Both endpoints now call this. The template is built for one job: let you
 * decide whether to ring someone back without opening the CRM. Name and phone
 * first, one tap to call or WhatsApp, and the page that produced the enquiry
 * stated plainly.
 */

const sgMail = require("@sendgrid/mail");

const SITE = (process.env.PUBLIC_SITE_URL || "https://www.avanienterprises.in").replace(/\/$/, "");

/**
 * Always copied, deliberately hardcoded: a missing environment variable must
 * never be able to silently stop lead notifications reaching a person.
 */
const ALWAYS_NOTIFY = ["sohamdang0@gmail.com"];

function recipients() {
  const configured = (process.env.LEAD_NOTIFY_EMAILS || process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return [...new Set([...configured, ...ALWAYS_NOTIFY])];
}

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Digits only, with the country code, for tel: and wa.me links. */
function phoneDigits(phone) {
  const d = String(phone || "").replace(/[^\d]/g, "");
  if (!d) return "";
  if (d.length === 10) return `91${d}`;       // bare Indian mobile
  return d;
}

function istNow() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

const C = {
  ink: "#17141F",
  body: "#3A352E",
  muted: "#6B635A",
  rule: "#E7E0D5",
  paper: "#FFFDF9",
  accent: "#D4A017",
  accentDark: "#8A5F0C",
};

function row(label, value, opts = {}) {
  if (!value) return "";
  const inner = opts.html || esc(value);
  return (
    `<tr>` +
    `<td style="padding:9px 14px 9px 0;color:${C.muted};font-size:13px;white-space:nowrap;vertical-align:top;font-family:Arial,sans-serif;">${esc(label)}</td>` +
    `<td style="padding:9px 0;font-size:14px;color:${C.ink};font-family:Arial,sans-serif;word-break:break-word;">${inner}</td>` +
    `</tr>`
  );
}

/**
 * Build and send. Never throws — a lead must be saved and acknowledged even if
 * the mail provider is down.
 *
 * @param {object} lead
 *   kind         'Lead' | 'Consultation request' | 'Contact enquiry'
 *   name, email, phone, company, service, message
 *   pagePath, pageUrl, referrer
 *   landingPage, utmSource, utmMedium, utmCampaign, gclid, fbclid
 */
async function sendLeadEmail(lead = {}) {
  const to = recipients();
  if (!process.env.FROM_EMAIL || !to.length) return { sent: false, reason: "not-configured" };

  const kind = lead.kind || "Lead";
  const name = (lead.name || "").trim() || "Someone";
  const service = (lead.service || "").trim();
  const origin = (lead.pagePath || "").trim();
  const url = (lead.pageUrl || "").trim() || (origin ? SITE + origin : "");
  const digits = phoneDigits(lead.phone);

  // The subject is what you read on a phone lock screen, so it carries the two
  // facts that decide whether you open it: what they want, and where from.
  const subject =
    `${kind}: ${service || "enquiry"}${origin ? ` — from ${origin}` : ""}`.slice(0, 180);

  const actions = [];
  if (digits) {
    actions.push(
      `<a href="tel:+${digits}" style="display:inline-block;background:${C.ink};color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;padding:12px 20px;border-radius:8px;margin:0 8px 8px 0;">Call ${esc(name.split(" ")[0])}</a>`,
      `<a href="https://wa.me/${digits}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;padding:12px 20px;border-radius:8px;margin:0 8px 8px 0;">WhatsApp</a>`
    );
  }
  if (lead.email) {
    actions.push(
      `<a href="mailto:${esc(lead.email)}?subject=${encodeURIComponent("Re: your enquiry to Avani Enterprises")}" style="display:inline-block;background:#fff;color:${C.ink};text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;padding:11px 20px;border-radius:8px;border:1px solid ${C.rule};margin:0 8px 8px 0;">Reply by email</a>`
    );
  }

  const campaign = [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ");

  const html = `
<div style="background:#F4F1EA;padding:24px 12px;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:${C.paper};border-radius:16px;overflow:hidden;border:1px solid ${C.rule};">

    <div style="background:${C.ink};padding:20px 26px;">
      <p style="margin:0;color:${C.accent};font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">${esc(kind)}</p>
      <p style="margin:4px 0 0;color:#fff;font-size:20px;font-weight:bold;">${esc(name)}</p>
      ${service ? `<p style="margin:5px 0 0;color:rgba(255,255,255,.72);font-size:14px;">wants ${esc(service)}</p>` : ""}
    </div>

    <div style="padding:24px 26px;">
      ${actions.length ? `<div style="margin:0 0 22px;">${actions.join("")}</div>` : ""}

      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${row("Phone", lead.phone, { html: digits ? `<a href="tel:+${digits}" style="color:${C.accentDark};font-weight:bold;text-decoration:none;">${esc(lead.phone)}</a>` : esc(lead.phone) })}
        ${row("Email", lead.email, { html: `<a href="mailto:${esc(lead.email)}" style="color:${C.accentDark};text-decoration:none;">${esc(lead.email)}</a>` })}
        ${row("Company", lead.company)}
        ${row("Service", service)}
      </table>

      ${lead.message ? `
        <p style="margin:22px 0 6px;color:${C.muted};font-size:13px;">What they wrote</p>
        <div style="white-space:pre-wrap;background:#fff;border:1px solid ${C.rule};border-left:3px solid ${C.accent};border-radius:10px;padding:14px 16px;font-size:14px;color:${C.body};line-height:1.6;">${esc(lead.message)}</div>
      ` : ""}

      <p style="margin:26px 0 6px;color:${C.muted};font-size:13px;">Where this lead came from</p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#fff;border:1px solid ${C.rule};border-radius:10px;">
        <tr><td style="padding:12px 14px;">
          <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
            ${row("Page", origin, { html: url ? `<a href="${esc(url)}" style="color:${C.accentDark};text-decoration:none;">${esc(origin)}</a>` : esc(origin) })}
            ${row("Landing page", lead.landingPage && lead.landingPage !== origin ? lead.landingPage : "")}
            ${row("Campaign", campaign)}
            ${row("Referrer", lead.referrer)}
            ${row("Form", lead.source)}
          </table>
        </td></tr>
      </table>

      ${!origin ? `<p style="margin:12px 0 0;color:${C.muted};font-size:12px;font-style:italic;">No origin page recorded — this submission predates page attribution, or the browser blocked it.</p>` : ""}

      <p style="margin:24px 0 0;color:${C.muted};font-size:12px;border-top:1px solid ${C.rule};padding-top:14px;">
        Received ${esc(istNow())} IST · Avani Enterprises
      </p>
    </div>
  </div>
</div>`.trim();

  const text = [
    `${kind}: ${name}`,
    service ? `Service: ${service}` : "",
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.email ? `Email: ${lead.email}` : "",
    lead.company ? `Company: ${lead.company}` : "",
    lead.message ? `\n${lead.message}\n` : "",
    origin ? `Came from: ${url || origin}` : "",
    lead.landingPage && lead.landingPage !== origin ? `Landed on: ${lead.landingPage}` : "",
    campaign ? `Campaign: ${campaign}` : "",
    `Received ${istNow()} IST`,
  ].filter(Boolean).join("\n");

  try {
    await sgMail.send({
      to,
      from: process.env.FROM_EMAIL,
      replyTo: lead.email || undefined,
      subject,
      text,
      html,
    });
    console.log(`✅ ${kind} email sent to: ${to.join(", ")}`);
    return { sent: true, to };
  } catch (err) {
    // Logged, never rethrown: the visitor already submitted successfully and
    // the record is stored. A mail outage is our problem, not theirs.
    console.error("❌ Lead email failed:", err.response ? err.response.body : err.message);
    return { sent: false, reason: "send-failed" };
  }
}

module.exports = { sendLeadEmail, leadRecipients: recipients };
