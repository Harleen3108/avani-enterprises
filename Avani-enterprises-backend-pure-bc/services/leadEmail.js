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
const FROM_NAME = process.env.FROM_NAME || "Avani Enterprises";

/* ── Providers ─────────────────────────────────────────────────────────────
 *
 * Brevo is used when BREVO_API_KEY is set, otherwise SendGrid. Two providers
 * rather than one because a transactional email account can be suspended,
 * rate-limited or left with an unverified sender, and a lead notification that
 * does not arrive is a lost customer.
 *
 * Brevo is called over its REST API rather than through @getbrevo/brevo. The
 * SDK's v6 rewrite dropped TransactionalEmailsApi entirely, so any code written
 * against v2 breaks on install; a plain POST has no such coupling, adds no
 * dependency, and gives clearer errors.
 */

/** POST https://api.brevo.com/v3/smtp/email */
async function sendViaBrevo({ to, cc, subject, html, text, replyTo, from }) {
  const body = {
    sender: { name: FROM_NAME, email: from },
    to: (Array.isArray(to) ? to : [to]).filter(Boolean).map((email) => ({ email })),
    subject,
    htmlContent: html,
  };
  if (text) body.textContent = text;
  if (replyTo) body.replyTo = { email: replyTo };
  if (cc && cc.length) body.cc = (Array.isArray(cc) ? cc : [cc]).filter(Boolean).map((email) => ({ email }));

  let res;
  try {
    res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
  } catch (err) {
    throw new Error(`Brevo unreachable: ${err.message}`);
  }

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = payload.message || payload.code || "unknown";

    // Brevo's IP allow-list is the failure most likely to bite in production
    // and the least obvious: the key is valid, the sender is verified, and it
    // still 401s purely because the server's address is not on the list. Say
    // exactly what to do rather than leaving a bare "unauthorised".
    if (/unrecognised IP|unrecognized IP|authorised_ips/i.test(detail)) {
      throw new Error(
        `Brevo rejected this server's IP address. Either turn off IP restriction, ` +
        `or add the server's outbound IPs, at https://app.brevo.com/security/authorised_ips ` +
        `— on Render the outbound IPs are listed under the service's Connect tab. ` +
        `Original: ${detail}`
      );
    }

    if (/sender/i.test(detail) && /not valid|unknown|verif/i.test(detail)) {
      throw new Error(
        `Brevo does not recognise the sender ${from}. Verify it under ` +
        `Senders, Domains & Dedicated IPs in Brevo. Original: ${detail}`
      );
    }

    throw new Error(`Brevo error (${res.status}): ${detail}`);
  }

  // messageId is what you search for in Brevo → Statistics → Email Activity to
  // tell a real delivery from one silently dropped by the suppression list.
  return { provider: "Brevo", id: payload.messageId || null };
}

async function sendViaSendGrid({ to, subject, html, text, replyTo, from }) {
  const [res] = await sgMail.send({ to, from, replyTo: replyTo || undefined, subject, text, html });
  return { provider: "SendGrid", id: res?.headers?.["x-message-id"] || null };
}

/** Which provider will actually be used, and why. */
function activeProvider() {
  if (process.env.BREVO_API_KEY) return "Brevo";
  if (process.env.SENDGRID_API_KEY) return "SendGrid";
  return null;
}

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
/**
 * Why notifications are or are not working right now.
 *
 * The failure mode this guards against is the quiet one: FROM_EMAIL unset means
 * every lead saves correctly, the visitor sees a success message, and nobody is
 * ever told. Nothing in the logs would say so. Called at startup and by the
 * admin test endpoint.
 */
function emailStatus() {
  const provider = activeProvider();
  const problems = [];

  if (!provider) {
    problems.push("No email provider configured — set BREVO_API_KEY (recommended) or SENDGRID_API_KEY");
  } else if (provider === "Brevo") {
    const key = process.env.BREVO_API_KEY || "";
    if (!key.startsWith("xkeysib-")) {
      problems.push('BREVO_API_KEY does not start with "xkeysib-" — that is not a Brevo API key');
    }
  } else {
    const key = process.env.SENDGRID_API_KEY || "";
    if (!key.startsWith("SG.")) {
      problems.push('SENDGRID_API_KEY does not start with "SG." — that is not a SendGrid key');
    }
  }

  if (!process.env.FROM_EMAIL) {
    problems.push(`FROM_EMAIL is not set (must be a sender verified in ${provider || "your provider"})`);
  }

  return {
    ok: problems.length === 0,
    provider,
    problems,
    to: recipients(),
    from: process.env.FROM_EMAIL || null,
    fromName: FROM_NAME,
  };
}

async function sendLeadEmail(lead = {}) {
  const to = recipients();
  const status = emailStatus();
  if (!status.ok || !to.length) {
    // Loud, and names the lead, so this is obvious in the Render logs rather
    // than being discovered weeks later by a customer who never heard back.
    console.error(
      `🔴 LEAD NOTIFICATION NOT SENT for "${lead.name || "unknown"}" — ` +
      `${status.problems.join("; ") || "no recipients configured"}. ` +
      `The lead IS saved; nobody has been told.`
    );
    return { sent: false, reason: "not-configured", problems: status.problems };
  }

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

  const msg = { to, from: process.env.FROM_EMAIL, replyTo: lead.email || undefined, subject, text, html };
  const provider = activeProvider();

  try {
    const result = provider === "Brevo" ? await sendViaBrevo(msg) : await sendViaSendGrid(msg);
    console.log(
      `✅ ${kind} email sent via ${result.provider} to: ${to.join(", ")}` +
      (result.id ? ` (id ${result.id})` : "")
    );
    return { sent: true, to, provider: result.provider, id: result.id };
  } catch (err) {
    const detail = err.response ? JSON.stringify(err.response.body) : err.message;
    console.error(`❌ Lead email failed via ${provider}: ${detail}`);

    // One retry on the other provider. A suspended account, an unverified
    // sender or a rate limit takes out one provider at a time, and a lead
    // notification that never arrives is a lost customer.
    const fallback = provider === "Brevo" ? "SendGrid" : "Brevo";
    const fallbackKey = fallback === "Brevo" ? process.env.BREVO_API_KEY : process.env.SENDGRID_API_KEY;
    if (fallbackKey) {
      try {
        const result = fallback === "Brevo" ? await sendViaBrevo(msg) : await sendViaSendGrid(msg);
        console.log(`✅ ${kind} email sent via FALLBACK ${result.provider} to: ${to.join(", ")}`);
        return { sent: true, to, provider: result.provider, id: result.id, usedFallback: true };
      } catch (err2) {
        console.error(`❌ Fallback ${fallback} also failed: ${err2.message}`);
        return { sent: false, reason: "send-failed", problems: [detail, err2.message] };
      }
    }

    // Never rethrown: the visitor already submitted successfully and the record
    // is stored. A mail outage is our problem, not theirs.
    return { sent: false, reason: "send-failed", problems: [detail] };
  }
}

/**
 * Send a sample to the configured recipients so delivery can be proven without
 * waiting for a real enquiry. Used by the admin "send test" button.
 */
async function sendTestLeadEmail() {
  return sendLeadEmail({
    kind: "TEST — lead notification check",
    name: "Test Lead",
    email: "test@example.com",
    phone: "+919253625099",
    company: "Avani Enterprises",
    service: "Notification test",
    message:
      "This is a test of the lead notification email. If you are reading this, " +
      "real leads will reach the same inbox.",
    source: "admin test button",
    pagePath: "/contact",
    pageUrl: `${SITE}/contact`,
  });
}

module.exports = { sendLeadEmail, sendTestLeadEmail, emailStatus, leadRecipients: recipients };
