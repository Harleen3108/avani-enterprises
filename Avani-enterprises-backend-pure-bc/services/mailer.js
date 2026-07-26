/**
 * mailer.js — the single place email leaves this application from.
 *
 * WHY IT EXISTS
 * Provider logic used to be duplicated. leadEmail.js gained Brevo support;
 * loginSecurity.js kept calling sgMail directly and additionally bailed out
 * early whenever SENDGRID_API_KEY was unset. The result was that with Brevo
 * configured and SendGrid not, lead notifications arrived and failed-login
 * alerts silently did not — ten wrong password attempts produced no email and
 * nothing in the logs explaining why.
 *
 * Anything that sends mail goes through sendMail(). Adding or swapping a
 * provider now happens once, here.
 *
 * PROVIDERS
 *   Brevo    when BREVO_API_KEY is set (preferred)
 *   SendGrid when SENDGRID_API_KEY is set
 * If both are set, Brevo is used and SendGrid is the automatic retry.
 */

const sgMail = require("@sendgrid/mail");

const FROM_NAME = process.env.FROM_NAME || "Avani Enterprises";

/** Which provider will be used, or null if none is configured. */
function activeProvider() {
  if (process.env.BREVO_API_KEY) return "Brevo";
  if (process.env.SENDGRID_API_KEY) return "SendGrid";
  return null;
}

/** Configuration health, with the specific reason when it is broken. */
function mailStatus() {
  const provider = activeProvider();
  const problems = [];

  if (!provider) {
    problems.push("No email provider configured — set BREVO_API_KEY (recommended) or SENDGRID_API_KEY");
  } else if (provider === "Brevo" && !String(process.env.BREVO_API_KEY).startsWith("xkeysib-")) {
    problems.push('BREVO_API_KEY does not start with "xkeysib-" — that is not a Brevo API key');
  } else if (provider === "SendGrid" && !String(process.env.SENDGRID_API_KEY).startsWith("SG.")) {
    problems.push('SENDGRID_API_KEY does not start with "SG." — that is not a SendGrid key');
  }

  if (!process.env.FROM_EMAIL) {
    problems.push(`FROM_EMAIL is not set (must be a sender verified in ${provider || "your provider"})`);
  }

  return { ok: problems.length === 0, provider, problems, from: process.env.FROM_EMAIL || null, fromName: FROM_NAME };
}

/** POST https://api.brevo.com/v3/smtp/email */
async function viaBrevo({ to, cc, subject, html, text, replyTo, from }) {
  let res;
  const body = {
    sender: { name: FROM_NAME, email: from },
    to: (Array.isArray(to) ? to : [to]).filter(Boolean).map((email) => ({ email })),
    subject,
    htmlContent: html,
  };
  if (text) body.textContent = text;
  if (replyTo) body.replyTo = { email: replyTo };
  if (cc && cc.length) body.cc = (Array.isArray(cc) ? cc : [cc]).filter(Boolean).map((email) => ({ email }));

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

    // The IP allow-list is the failure most likely to bite in production and
    // the least obvious: valid key, verified sender, still a 401 purely because
    // the server's address is not listed. Say what to do about it.
    if (/unrecognised IP|unrecognized IP|authorised_ips/i.test(detail)) {
      throw new Error(
        "Brevo rejected this server's IP address. Either turn off IP restriction, or add the " +
        "server's outbound IPs, at https://app.brevo.com/security/authorised_ips — on Render the " +
        `outbound IPs are under the service's Connect tab. Original: ${detail}`
      );
    }
    if (/sender/i.test(detail) && /not valid|unknown|verif/i.test(detail)) {
      throw new Error(
        `Brevo does not recognise the sender ${from}. Verify it under Senders, Domains & ` +
        `Dedicated IPs in Brevo. Original: ${detail}`
      );
    }
    throw new Error(`Brevo error (${res.status}): ${detail}`);
  }

  return { provider: "Brevo", id: payload.messageId || null };
}

async function viaSendGrid({ to, subject, html, text, replyTo, from }) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const [res] = await sgMail.send({ to, from, replyTo: replyTo || undefined, subject, text, html });
  return { provider: "SendGrid", id: (res && res.headers && res.headers["x-message-id"]) || null };
}

/**
 * Send, retrying once on the other provider.
 *
 * Never throws. Callers are request handlers where a mail failure must not
 * become the visitor's problem, so this reports rather than raises — but it
 * reports LOUDLY, because a notification nobody receives and nobody is told
 * about is worse than one that fails visibly.
 *
 * @param {object} msg { to, cc, subject, html, text, replyTo, label }
 */
async function sendMail(msg) {
  const status = mailStatus();
  const label = msg.label || "Email";
  const to = (Array.isArray(msg.to) ? msg.to : [msg.to]).filter(Boolean);

  if (!status.ok || !to.length) {
    console.error(
      `🔴 ${label} NOT SENT — ${status.problems.join("; ") || "no recipients"}. ` +
      "Nothing was delivered."
    );
    return { sent: false, reason: "not-configured", problems: status.problems };
  }

  const payload = { ...msg, to, from: process.env.FROM_EMAIL };
  const primary = status.provider;

  try {
    const r = primary === "Brevo" ? await viaBrevo(payload) : await viaSendGrid(payload);
    console.log(`✅ ${label} sent via ${r.provider} to ${to.join(", ")}${r.id ? ` (id ${r.id})` : ""}`);
    return { sent: true, to, provider: r.provider, id: r.id };
  } catch (err) {
    console.error(`❌ ${label} failed via ${primary}: ${err.message}`);

    const other = primary === "Brevo" ? "SendGrid" : "Brevo";
    const otherKey = other === "Brevo" ? process.env.BREVO_API_KEY : process.env.SENDGRID_API_KEY;
    if (otherKey) {
      try {
        const r = other === "Brevo" ? await viaBrevo(payload) : await viaSendGrid(payload);
        console.log(`✅ ${label} sent via FALLBACK ${r.provider} to ${to.join(", ")}`);
        return { sent: true, to, provider: r.provider, id: r.id, usedFallback: true };
      } catch (err2) {
        console.error(`❌ ${label} fallback ${other} also failed: ${err2.message}`);
        return { sent: false, reason: "send-failed", problems: [err.message, err2.message] };
      }
    }
    return { sent: false, reason: "send-failed", problems: [err.message] };
  }
}

module.exports = { sendMail, mailStatus, activeProvider, FROM_NAME };
