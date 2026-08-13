/**
 * WhatsApp webhook — GET verification and POST event intake.
 *
 * Mounted at /api/webhooks/whatsapp. This router is deliberately thin: it
 * authenticates the request, answers Meta, and hands the payload to the
 * services layer. No business logic lives here.
 *
 * ── WHY THIS ROUTER PARSES ITS OWN BODY ─────────────────────────────────────
 * Meta signs the RAW request bytes with the app secret (X-Hub-Signature-256).
 * Verifying that signature requires the exact bytes, and index.js's global
 * express.json() consumes them without keeping a copy. So this router is
 * mounted BEFORE the global parser and brings its own with a `verify` hook that
 * stashes the buffer. Nothing about the existing body parsing changes.
 *
 * ── WHY IT ANSWERS BEFORE IT WORKS ──────────────────────────────────────────
 * Meta retries any delivery it does not get a prompt 200 for. Sending the
 * catalogue involves several round trips to Graph and possibly an LLM call —
 * far too slow to hold the response open. So the 200 goes out first and
 * processing continues after it. Duplicate delivery is handled by the
 * idempotency claim in services/whatsapp/idempotency.js, not by making Meta
 * wait.
 */

const express = require("express");
const crypto = require("crypto");

const { getConfig, canVerify, describeConfig } = require("../services/whatsapp/config");
const { handleMessagesChange } = require("../services/whatsapp/inboundMessage");
const { handleCallsChange } = require("../services/whatsapp/inboundCall");
const { describeStore } = require("../services/whatsapp/idempotency");
const { describeAi } = require("../services/whatsapp/aiService");

const router = express.Router();

// 1 MB is generous for a webhook — Meta's payloads are a few kilobytes. The cap
// exists so an unauthenticated public endpoint cannot be used to buffer
// megabytes of junk in memory.
router.use(
  express.json({
    limit: "1mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

/**
 * Verify X-Hub-Signature-256.
 *
 * Optional by design: META_APP_SECRET may not be set on day one, and the
 * verify-token handshake plus an unguessable URL is the same posture the rest
 * of Meta's quickstart assumes. Once the secret IS set, a bad signature is a
 * hard 401 — configuring it must actually tighten security, not merely log.
 */
function verifySignature(req) {
  const cfg = getConfig();
  if (!cfg.appSecret) return { ok: true, checked: false };

  const header = req.get("x-hub-signature-256") || "";
  if (!header.startsWith("sha256=")) return { ok: false, checked: true, reason: "missing_signature" };
  if (!req.rawBody || !req.rawBody.length) return { ok: false, checked: true, reason: "no_raw_body" };

  const expected = `sha256=${crypto
    .createHmac("sha256", cfg.appSecret)
    .update(req.rawBody)
    .digest("hex")}`;

  const a = Buffer.from(header);
  const b = Buffer.from(expected);
  // Length check first: timingSafeEqual throws on a length mismatch.
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  return { ok, checked: true, reason: ok ? undefined : "signature_mismatch" };
}

/**
 * GET — Meta's subscription handshake.
 *
 * Meta calls this once when you save the callback URL. Echo hub.challenge when
 * hub.verify_token matches WHATSAPP_VERIFY_TOKEN, 403 otherwise.
 */
router.get("/", (req, res) => {
  const cfg = getConfig();
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (!canVerify(cfg)) {
    console.warn("⚠️ WhatsApp webhook verification attempted but WHATSAPP_VERIFY_TOKEN is not set.");
    return res.sendStatus(403);
  }

  // Constant-time compare — the verify token is a shared secret, and a plain
  // === on a secret is a (small, but free to avoid) timing oracle.
  const provided = Buffer.from(String(token || ""));
  const expected = Buffer.from(cfg.verifyToken);
  const tokenMatches =
    provided.length === expected.length && crypto.timingSafeEqual(provided, expected);

  if (mode === "subscribe" && tokenMatches) {
    console.log("✅ WhatsApp webhook verified by Meta.");
    // Explicit text/plain: res.send(string) would otherwise label the body
    // text/html. Meta only compares the body so either works, but the challenge
    // is a bare token, not markup, and saying so costs nothing.
    return res.status(200).type("text/plain").send(String(challenge ?? ""));
  }

  console.warn("⛔ WhatsApp webhook verification failed (bad mode or verify token).");
  return res.sendStatus(403);
});

/**
 * Walk the webhook envelope and dispatch each change to its handler.
 * Runs after the response has been sent, so it must swallow everything.
 */
async function processWebhook(body) {
  if (!body || body.object !== "whatsapp_business_account") {
    console.log(`ℹ️ Ignoring webhook for object "${body?.object || "unknown"}"`);
    return;
  }

  for (const entry of body.entry || []) {
    for (const change of entry.changes || []) {
      const value = change.value || {};
      // entry.id is the WhatsApp Business Account ID. It lives on the envelope,
      // not on `value`, so carry it down for handlers that need it.
      value.__wabaId = entry.id || "";

      try {
        switch (change.field) {
          case "messages":
            await handleMessagesChange(value);
            break;
          case "calls":
            await handleCallsChange(value);
            break;
          default:
            console.log(`ℹ️ Unhandled WhatsApp webhook field "${change.field}"`);
            break;
        }
      } catch (err) {
        // One bad change must not abandon the rest of the batch.
        console.error(`❌ WhatsApp webhook handler failed for field "${change.field}": ${err.message}`);
      }
    }
  }
}

/**
 * POST — event intake.
 *
 * Always 200 for an authenticated, well-formed request, even when the payload
 * is something we do not handle. A non-200 makes Meta retry, and retrying a
 * payload we will never understand is pointless load.
 */
router.post("/", (req, res) => {
  const signature = verifySignature(req);
  if (!signature.ok) {
    console.warn(`⛔ Rejected WhatsApp webhook: ${signature.reason}`);
    return res.sendStatus(401);
  }

  const body = req.body;
  if (!body || typeof body !== "object") {
    // Malformed, but still acknowledged — a retry would be just as malformed.
    return res.sendStatus(200);
  }

  res.sendStatus(200);

  // Everything below happens after the response. Nothing here may throw into
  // the request lifecycle.
  setImmediate(() => {
    processWebhook(body).catch((err) => {
      console.error(`❌ WhatsApp webhook processing failed: ${err.message}`);
    });
  });
});

/**
 * GET /api/webhooks/whatsapp/status — unauthenticated readiness probe.
 *
 * Booleans only: which pieces are configured, never what they are configured
 * to. Useful for confirming a Render deploy picked up the env vars without
 * opening a shell.
 */
router.get("/status", (_req, res) => {
  res.json({
    status: "ok",
    service: "avani-whatsapp",
    config: describeConfig(),
    idempotency: describeStore(),
    ai: describeAi(),
  });
});

/**
 * Error handler for this router. Registered last so it catches everything above
 * it, including express.json().
 *
 * express.json() rejects an unparseable or oversized body by THROWING, before
 * any route handler runs — so without this, a malformed POST never reaches the
 * code above and Express's default handler answers with an HTML error page that
 * embeds a stack trace in development. That is both a leak and a strange thing
 * to hand back to Meta.
 *
 * 400 rather than 200 here is deliberate. A well-formed payload we simply do not
 * recognise gets a 200, because a retry of it would never help. An UNPARSEABLE
 * body is different: it suggests a corrupted delivery, and a Meta retry is
 * exactly the right recovery. Anyone probing the URL gets a terse JSON 400
 * either way, with no stack trace.
 */
router.use((err, _req, res, next) => {
  if (!err) return next();

  if (err.type === "entity.too.large") {
    console.warn("⛔ Rejected WhatsApp webhook: payload too large");
    return res.status(413).json({ error: "payload_too_large" });
  }
  if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
    console.warn("⛔ Rejected WhatsApp webhook: body is not valid JSON");
    return res.status(400).json({ error: "invalid_json" });
  }

  console.error(`❌ WhatsApp webhook route error: ${err.message}`);
  return res.status(500).json({ error: "webhook_error" });
});

module.exports = router;
