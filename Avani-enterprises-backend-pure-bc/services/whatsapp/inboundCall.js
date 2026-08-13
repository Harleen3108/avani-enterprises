/**
 * Inbound WhatsApp CALL handling.
 *
 *   Customer calls on WhatsApp -> Meta WhatsApp Calling API -> our webhook
 *   -> identify caller -> send WhatsApp message -> send catalogue
 *
 * ── WHAT THIS IS NOT ────────────────────────────────────────────────────────
 * This is the WhatsApp Business Calling API, which is a completely different
 * thing from a normal telephone call. It is WebRTC voice inside WhatsApp:
 * signalling arrives as a webhook, and answering means terminating DTLS/SRTP
 * and replying to an SDP offer. This backend has no media stack, so it does not
 * answer calls — it deflects them into a WhatsApp message.
 *
 * Ordinary mobile/landline calls are a FUTURE, SEPARATE phase and would arrive
 * through a telephony provider (Exotel/Twilio/Plivo), not through this file.
 * Nothing here is shared with that path, so the two cannot get tangled. No
 * telephony provider is installed.
 *
 * ── WHAT META SENDS ─────────────────────────────────────────────────────────
 * Subscribe to the `calls` webhook field (separate from `messages`). Payloads
 * arrive with field === "calls" and take one of two shapes:
 *
 *   value.calls[]     — a real call. `event` is:
 *                         "connect"      the caller is ringing us (carries the
 *                                        SDP offer; this is the inbound ring)
 *                         "terminate"    the call ended, with status/duration
 *                         "call_created" SIP deployments only, no SDP
 *                       `direction` is USER_INITIATED or BUSINESS_INITIATED.
 *
 *   value.statuses[]  — progress for calls WE placed, with type === "call" and
 *                       status RINGING / ACCEPTED / REJECTED. Same webhook
 *                       field, different array. Branching on `value.calls`
 *                       alone silently drops these, so both are handled.
 *
 * ── WHY MESSAGING AFTER A MISSED CALL IS ALLOWED ────────────────────────────
 * A user calling the business opens (or refreshes) the 24-hour customer service
 * window whether or not the call is answered. So a free-form reply to a
 * rejected or missed call is permitted — no template required.
 *
 * ── SETUP THIS DEPENDS ON ───────────────────────────────────────────────────
 * Calling is DISABLED by default on every number, test numbers included, and no
 * call webhook fires until it is switched on. See WHATSAPP-AUTOMATION.md
 * section 16 and POST /admin/whatsapp/calling.
 */

const mongoose = require("mongoose");
const WhatsAppContact = require("../../models/WhatsAppContact");
const { getConfig, maskPhone, normalizePhone } = require("./config");
const { claimEvent, releaseEvent } = require("./idempotency");
const { sendCatalogueTo } = require("./inboundMessage");
const { getSettings, shouldSendCatalogue, resolveGreeting } = require("./catalogue");
const { rejectCall, sendWhatsAppText } = require("./whatsappClient");

function mongoReady() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

async function recordCall(waId, phoneNumberId) {
  if (!mongoReady()) return null;
  try {
    return await WhatsAppContact.findOneAndUpdate(
      { waId: normalizePhone(waId) },
      {
        $set: { lastIntent: "call", phoneNumberId, optedOut: false },
        $inc: { callCount: 1 },
        $setOnInsert: { waId: normalizePhone(waId), firstSeenAt: new Date() },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } catch (err) {
    console.warn(`⚠️ Could not record WhatsApp call contact: ${err.message}`);
    return null;
  }
}

/**
 * Respond to one user-initiated call.
 *
 * The idempotency key is the CALL id, not the event — so `connect` and the
 * `terminate` that follows it claim the same key and only the first one to
 * arrive sends anything. That is what stops one call producing two catalogues.
 */
async function handleUserInitiatedCall(call, value) {
  const cfg = getConfig();
  const metadata = value.metadata || {};
  const caller = call.from || "";
  if (!caller) return { skipped: "no_caller" };

  const claimed = await claimEvent(`call:${call.id}`, "call");
  if (!claimed) {
    console.log(`🔁 Duplicate WhatsApp call event ignored (${call.id})`);
    return { skipped: "duplicate" };
  }

  console.log(`📞 WhatsApp call from ${maskPhone(caller)} [event=${call.event}]`);

  try {
    const settings = await getSettings();
    if (settings.automationEnabled === false) {
      console.log("⏸️ WhatsApp automation is switched off — call recorded, no reply sent.");
      await recordCall(caller, metadata.phone_number_id);
      return { skipped: "automation_disabled" };
    }

    // Hang up rather than leaving the caller ringing into silence. Meta gives
    // roughly 30-60 seconds to accept before it times out on its own; rejecting
    // now means the caller sees a clean end and gets our message immediately.
    // Set WHATSAPP_CALL_ACTION=ignore to let it ring out instead.
    if (call.event === "connect" && cfg.callAction === "reject") {
      try {
        await rejectCall(call.id);
        console.log(`📵 Rejected WhatsApp call ${call.id}; replying by message instead.`);
      } catch (err) {
        // A call that already ended cannot be rejected. Not a failure — the
        // message still goes out.
        console.warn(`⚠️ Could not reject WhatsApp call ${call.id}: ${err.message}`);
      }
    }

    const contact = await recordCall(caller, metadata.phone_number_id);

    // A caller always gets the greeting; the PDF respects the resend window so
    // three calls in an afternoon do not produce three copies.
    if (shouldSendCatalogue(contact)) {
      await sendCatalogueTo(caller, { forCall: true });
    } else {
      await sendWhatsAppText(caller, await resolveGreeting({ forCall: true }));
    }

    return { handled: true, callId: call.id };
  } catch (err) {
    await releaseEvent(`call:${call.id}`);
    console.error(`❌ Failed to handle WhatsApp call from ${maskPhone(caller)}: ${err.message}`);
    return { handled: false, error: err.message };
  }
}

/** Handle one `changes[]` entry whose field is "calls". */
async function handleCallsChange(value) {
  const results = [];

  for (const call of value.calls || []) {
    const direction = String(call.direction || "").toUpperCase();

    // Business-initiated calls are ours; we placed them, so there is nothing
    // to deflect. Log the outcome and move on.
    if (direction === "BUSINESS_INITIATED") {
      console.log(
        `📞 Business-initiated call ${call.id} → ${call.event}` +
          (call.status ? ` (${String(call.status).toUpperCase()})` : "")
      );
      continue;
    }

    switch (call.event) {
      case "connect":
      case "call_created":
        results.push(await handleUserInitiatedCall(call, value));
        break;

      case "terminate":
        // Reached first only when `connect` never arrived (SIP, a very short
        // ring, or a dropped delivery). The shared call-id claim makes the
        // normal connect-then-terminate sequence a no-op here.
        console.log(
          `📴 WhatsApp call ${call.id} terminated` +
            (call.status ? ` (${String(call.status).toUpperCase()})` : "") +
            (call.duration != null ? `, ${call.duration}s` : "")
        );
        results.push(await handleUserInitiatedCall(call, value));
        break;

      default:
        console.log(`📞 Unhandled WhatsApp call event "${call.event}" for ${call.id}`);
        break;
    }
  }

  // Business-initiated progress events ride the same webhook field in a
  // `statuses` array instead of `calls`.
  for (const status of value.statuses || []) {
    if (status.type === "call") {
      console.log(
        `📞 Call ${status.id} → ${status.status} for ${maskPhone(status.recipient_id)}`
      );
    }
  }

  for (const error of value.errors || []) {
    console.warn(`⚠️ WhatsApp calling error: ${error.code} ${error.title || error.message || ""}`);
  }

  return results;
}

module.exports = { handleCallsChange, handleUserInitiatedCall };
