/**
 * WhatsApp Cloud API client — the ONLY module in this codebase that talks to
 * Meta over HTTP. Webhook handling, intent matching and AI live elsewhere and
 * call into here, so swapping a Graph API version or adding a message type is
 * a one-file change.
 *
 * Official Meta Cloud API only. No Twilio, WATI, Interakt, AiSensy, Gupshup or
 * unofficial WhatsApp libraries — and no new npm dependency either: Node 20
 * ships global fetch, which is all the Graph API needs.
 *
 * TOKEN SAFETY: the access token goes in an Authorization header and is never
 * placed in a URL, never returned to a caller and never written to a log. Meta
 * error bodies are logged (they are useful and contain no secret); the request
 * body is not, because it contains customer phone numbers.
 */

const {
  getConfig,
  canSend,
  isRecipientAllowed,
  maskPhone,
  normalizePhone,
  WHATSAPP_TEXT_LIMIT,
} = require("./config");

// Meta is usually fast; a hung socket must not pin a webhook handler open.
const REQUEST_TIMEOUT_MS = 15000;

class WhatsAppError extends Error {
  constructor(message, { status, metaError } = {}) {
    super(message);
    this.name = "WhatsAppError";
    this.status = status;
    this.metaError = metaError;
  }
}

/**
 * One place where an outbound Graph call is built, sent and its failure shaped.
 * `path` is relative to the version root, e.g. "/<PHONE_NUMBER_ID>/messages".
 */
async function graphRequest(path, { method = "POST", body, query } = {}) {
  const cfg = getConfig();
  if (!cfg.accessToken) {
    throw new WhatsAppError("WHATSAPP_ACCESS_TOKEN is not configured");
  }

  let url = `${cfg.graphBaseUrl}${path}`;
  if (query && Object.keys(query).length) {
    url += `?${new URLSearchParams(query).toString()}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${cfg.accessToken}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      throw new WhatsAppError(`Graph API request timed out after ${REQUEST_TIMEOUT_MS}ms`);
    }
    throw new WhatsAppError(`Graph API request failed: ${err.message}`);
  }
  clearTimeout(timer);

  const raw = await response.text();
  let payload = null;
  try {
    payload = raw ? JSON.parse(raw) : null;
  } catch {
    payload = { raw };
  }

  if (!response.ok) {
    const metaError = payload && payload.error ? payload.error : null;
    const detail = metaError
      ? `${metaError.code || "?"}/${metaError.error_subcode || "-"}: ${metaError.message || "unknown"}`
      : `HTTP ${response.status}`;
    throw new WhatsAppError(`Graph API error (${detail})`, {
      status: response.status,
      metaError,
    });
  }

  return payload;
}

/** Shared guard for every outbound send. Returns null when sending is allowed. */
function blockedReason(to) {
  const cfg = getConfig();
  if (!cfg.automationEnabled) return "automation_disabled";
  if (!canSend(cfg)) return "not_configured";
  if (!normalizePhone(to)) return "invalid_recipient";
  if (!isRecipientAllowed(to, cfg)) return "recipient_not_allowed";
  return null;
}

function messagesPath() {
  return `/${getConfig().phoneNumberId}/messages`;
}

/**
 * Send a plain text message.
 * Returns { sent: true, messageId } or { sent: false, reason } — it does not
 * throw for a blocked send, because "we chose not to message this number" is a
 * normal outcome, not an error.
 */
async function sendWhatsAppText(to, message, { previewUrl = false } = {}) {
  const reason = blockedReason(to);
  if (reason) {
    console.log(`📵 WhatsApp text not sent to ${maskPhone(to)} (${reason})`);
    return { sent: false, reason };
  }

  const text = String(message || "").slice(0, WHATSAPP_TEXT_LIMIT);
  if (!text.trim()) return { sent: false, reason: "empty_message" };

  const result = await graphRequest(messagesPath(), {
    body: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: normalizePhone(to),
      type: "text",
      text: { preview_url: previewUrl, body: text },
    },
  });

  const messageId = result?.messages?.[0]?.id || null;
  console.log(`✅ WhatsApp text sent to ${maskPhone(to)} (${messageId || "no id"})`);
  return { sent: true, messageId };
}

/**
 * Send a document (the catalogue PDF).
 *
 * `documentUrl` must be a public HTTPS URL — Meta downloads it server-side, so
 * anything behind auth will fail. Pass `mediaId` instead to use a file already
 * uploaded to Meta, which avoids the download entirely.
 */
async function sendWhatsAppDocument(to, documentUrl, filename, caption, { mediaId } = {}) {
  const reason = blockedReason(to);
  if (reason) {
    console.log(`📵 WhatsApp document not sent to ${maskPhone(to)} (${reason})`);
    return { sent: false, reason };
  }
  if (!mediaId && !documentUrl) {
    return { sent: false, reason: "catalogue_not_configured" };
  }

  const document = mediaId ? { id: mediaId } : { link: documentUrl };
  if (filename) document.filename = filename;
  if (caption) document.caption = String(caption).slice(0, 1024);

  const result = await graphRequest(messagesPath(), {
    body: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: normalizePhone(to),
      type: "document",
      document,
    },
  });

  const messageId = result?.messages?.[0]?.id || null;
  console.log(`📄 WhatsApp document sent to ${maskPhone(to)} (${messageId || "no id"})`);
  return { sent: true, messageId };
}

/**
 * Blue-tick the incoming message. Purely cosmetic, so every failure is
 * swallowed — a read receipt is never worth failing a webhook over.
 */
async function markMessageAsRead(messageId) {
  const cfg = getConfig();
  if (!cfg.markAsRead || !canSend(cfg) || !messageId) return { sent: false };
  try {
    await graphRequest(messagesPath(), {
      body: { messaging_product: "whatsapp", status: "read", message_id: messageId },
    });
    return { sent: true };
  } catch (err) {
    console.warn(`⚠️ Could not mark message as read: ${err.message}`);
    return { sent: false };
  }
}

// ── WhatsApp Calling API ─────────────────────────────────────────────────────
//
// Meta's calling API carries real-time audio over WebRTC. Accepting a call
// means terminating SRTP and answering an SDP offer, which this backend has no
// media stack for — so it never answers. `rejectCall` hangs up politely and the
// caller gets a WhatsApp message instead. See inboundCall.js for that flow.

/**
 * Act on an in-flight call. `action` is one of reject | terminate | pre_accept
 * | accept. Only reject and terminate are used today; the other two are here so
 * a future media server can call them without touching the webhook.
 */
async function callAction(callId, action, { session, bizOpaqueCallbackData } = {}) {
  const cfg = getConfig();
  if (!canSend(cfg)) return { ok: false, reason: "not_configured" };
  if (!callId || !action) return { ok: false, reason: "invalid_arguments" };

  const body = { messaging_product: "whatsapp", call_id: callId, action };
  if (session) body.session = session;
  if (bizOpaqueCallbackData) body.biz_opaque_callback_data = bizOpaqueCallbackData;

  const result = await graphRequest(`/${cfg.phoneNumberId}/calls`, { body });
  return { ok: true, result };
}

function rejectCall(callId) {
  return callAction(callId, "reject");
}

function terminateCall(callId) {
  return callAction(callId, "terminate");
}

// ── Phone number settings ────────────────────────────────────────────────────

/** Read the number's current settings — this is how you confirm calling is on. */
async function getPhoneNumberSettings() {
  const cfg = getConfig();
  if (!canSend(cfg)) return { ok: false, reason: "not_configured" };
  const result = await graphRequest(`/${cfg.phoneNumberId}/settings`, { method: "GET" });
  return { ok: true, settings: result };
}

/**
 * Turn inbound WhatsApp calling on or off for the number.
 *
 * Calling is DISABLED by default on every number, including Meta test numbers,
 * so this has to be called once before any call webhook will ever fire. The
 * admin route exposes it; see WHATSAPP-AUTOMATION.md section 16.
 */
async function setCallingEnabled(enabled, extra = {}) {
  const cfg = getConfig();
  if (!canSend(cfg)) return { ok: false, reason: "not_configured" };
  const result = await graphRequest(`/${cfg.phoneNumberId}/settings`, {
    body: {
      calling: {
        status: enabled ? "ENABLED" : "DISABLED",
        ...extra,
      },
    },
  });
  return { ok: true, result };
}

module.exports = {
  WhatsAppError,
  graphRequest,
  sendWhatsAppText,
  sendWhatsAppDocument,
  markMessageAsRead,
  callAction,
  rejectCall,
  terminateCall,
  getPhoneNumberSettings,
  setCallingEnabled,
};
