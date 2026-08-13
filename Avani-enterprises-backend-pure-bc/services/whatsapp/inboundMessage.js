/**
 * Inbound WhatsApp message handling.
 *
 *   Customer -> WhatsApp -> Meta Cloud API -> our webhook -> here
 *
 * Extracts the fields the requirement lists (sender, message id, type, text,
 * timestamp, phone number id, WABA id), decides what to reply, and sends it.
 *
 * ROBUSTNESS RULE: this module must never throw in a way that reaches the
 * webhook route. Meta sends message types nobody planned for — reactions,
 * orders, system notices, brand-new types added after this was written — and an
 * unhandled shape must produce a polite reply or silence, never a 500 and never
 * a crashed process. Every branch below either handles the type or falls into
 * `describeMedia`, which handles "anything else" by name.
 */

const mongoose = require("mongoose");
const WhatsAppContact = require("../../models/WhatsAppContact");
const { getConfig, maskPhone, normalizePhone } = require("./config");
const { claimEvent, releaseEvent } = require("./idempotency");
const { processCustomerQuery } = require("./queryProcessor");
const {
  resolveCatalogue,
  resolveGreeting,
  shouldSendCatalogue,
  getSettings,
} = require("./catalogue");
const { getKnowledge, render } = require("./knowledgeBase");
const {
  sendWhatsAppText,
  sendWhatsAppDocument,
  markMessageAsRead,
} = require("./whatsappClient");

function mongoReady() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

/**
 * Normalise one entry of `value.messages[]` into a flat shape.
 * Returns `text` for anything we can read as words (plain text, a button tap, a
 * list selection) and `media` for anything we cannot.
 */
function extractMessage(message, value) {
  const metadata = value.metadata || {};
  const base = {
    messageId: message.id || "",
    from: message.from || "",
    type: message.type || "unknown",
    timestamp: message.timestamp ? new Date(Number(message.timestamp) * 1000) : new Date(),
    phoneNumberId: metadata.phone_number_id || "",
    displayPhoneNumber: metadata.display_phone_number || "",
    businessAccountId: value.__wabaId || "",
    text: "",
    media: null,
    interactiveType: "",
  };

  switch (message.type) {
    case "text":
      base.text = message.text?.body || "";
      break;

    case "interactive": {
      // Button and list replies carry the customer's intent as text; a
      // call-permission reply is a control message with no words in it.
      const interactive = message.interactive || {};
      base.interactiveType = interactive.type || "";
      base.text =
        interactive.button_reply?.title ||
        interactive.list_reply?.title ||
        interactive.nfm_reply?.body ||
        "";
      break;
    }

    case "button":
      base.text = message.button?.text || "";
      break;

    // Captions are the customer talking, so a captioned image is a text
    // message with a picture attached, not an unreadable blob.
    case "image":
    case "video":
    case "document":
      base.text = message[message.type]?.caption || "";
      base.media = { kind: message.type, id: message[message.type]?.id || "" };
      break;

    case "audio":
    case "sticker":
      base.media = { kind: message.type, id: message[message.type]?.id || "" };
      break;

    case "location":
      base.media = { kind: "location" };
      break;

    case "contacts":
      base.media = { kind: "contacts" };
      break;

    case "reaction":
      base.media = { kind: "reaction" };
      break;

    default:
      // Includes "unsupported", "system", "order" and anything Meta adds later.
      base.media = { kind: message.type || "unknown" };
      break;
  }

  return base;
}

/**
 * Create or update the contact row. Returns `{ contact, isNew }`; when Mongo is
 * down it returns `{ contact: null }` and the caller still replies — losing
 * contact history is acceptable, refusing to answer a customer is not.
 */
async function upsertContact(extracted, profileName) {
  if (!mongoReady()) return { contact: null, isNew: false };

  const waId = normalizePhone(extracted.from);
  try {
    const existing = await WhatsAppContact.findOne({ waId });
    const isNew = !existing;

    const update = {
      $set: {
        phoneNumberId: extracted.phoneNumberId,
        lastMessageAt: extracted.timestamp,
        // Any inbound message re-opens the conversation. The opt-out copy
        // promises exactly this ("send any message to start again"), so the
        // flag has to clear here for that promise to be true.
        optedOut: false,
      },
      $inc: { messageCount: 1 },
      $setOnInsert: { waId, firstSeenAt: extracted.timestamp },
    };
    if (profileName) update.$set.profileName = profileName;

    const contact = await WhatsAppContact.findOneAndUpdate({ waId }, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return { contact, isNew };
  } catch (err) {
    console.warn(`⚠️ Could not record WhatsApp contact: ${err.message}`);
    return { contact: null, isNew: false };
  }
}

async function recordCatalogueSent(waId) {
  if (!mongoReady()) return;
  try {
    await WhatsAppContact.updateOne(
      { waId: normalizePhone(waId) },
      { $set: { catalogueSentAt: new Date() }, $inc: { catalogueSendCount: 1 } }
    );
  } catch (err) {
    console.warn(`⚠️ Could not record catalogue send: ${err.message}`);
  }
}

async function recordIntent(waId, intent, extra = {}) {
  if (!mongoReady() || !intent) return;
  try {
    await WhatsAppContact.updateOne(
      { waId: normalizePhone(waId) },
      { $set: { lastIntent: intent, ...extra } }
    );
  } catch {
    /* telemetry only — never worth surfacing */
  }
}

/**
 * Send greeting + catalogue PDF. Used by the message flow and, via
 * inboundCall.js, by the call flow.
 */
async function sendCatalogueTo(to, { forCall = false } = {}) {
  const catalogue = await resolveCatalogue();
  const greeting = await resolveGreeting({ forCall });

  const textResult = await sendWhatsAppText(to, greeting);

  if (!catalogue.configured) {
    // Loud, because the whole feature is half-working until it is set. Still
    // not fatal: the customer got a greeting and a human can follow up.
    console.warn(
      "⚠️ Catalogue not configured — set CATALOGUE_PDF_URL (or upload one from the admin panel). Greeting sent without the PDF."
    );
    return { greeting: textResult, document: { sent: false, reason: "catalogue_not_configured" } };
  }

  const documentResult = await sendWhatsAppDocument(
    to,
    catalogue.url,
    catalogue.filename,
    catalogue.caption,
    { mediaId: catalogue.mediaId }
  );

  if (documentResult.sent) await recordCatalogueSent(to);
  return { greeting: textResult, document: documentResult };
}

/** Copy for a message we received but cannot read as words. */
function mediaAcknowledgement() {
  const cfg = getConfig();
  const knowledge = getKnowledge();
  return render(knowledge.messages.unsupportedMedia, cfg);
}

/**
 * Handle one inbound message end to end.
 *
 * Every side effect sits behind the idempotency claim on Meta's own message id,
 * so a redelivered webhook cannot send the catalogue or an AI reply twice.
 */
async function handleIncomingMessage(message, value) {
  const extracted = extractMessage(message, value);
  if (!extracted.from) return { skipped: "no_sender" };

  const claimed = await claimEvent(extracted.messageId || `msg:${extracted.from}:${Date.now()}`, "message");
  if (!claimed) {
    console.log(`🔁 Duplicate WhatsApp message ignored (${extracted.messageId})`);
    return { skipped: "duplicate" };
  }

  const profileName = (value.contacts || []).find((c) => c.wa_id === extracted.from)?.profile?.name || "";

  console.log(
    `💬 WhatsApp ${extracted.type} from ${maskPhone(extracted.from)}${profileName ? ` (${profileName})` : ""}`
  );

  try {
    const settings = await getSettings();
    if (settings.automationEnabled === false) {
      console.log("⏸️ WhatsApp automation is switched off in settings — message recorded, no reply sent.");
      await upsertContact(extracted, profileName);
      return { skipped: "automation_disabled" };
    }

    await markMessageAsRead(extracted.messageId);
    const { contact, isNew } = await upsertContact(extracted, profileName);

    // A message with no readable words (image, audio, sticker, location...).
    if (!extracted.text && extracted.media) {
      // A brand-new customer who opens with a photo still deserves the
      // catalogue — it is their first contact either way.
      if (isNew || shouldSendCatalogue(contact)) {
        await sendCatalogueTo(extracted.from);
      } else {
        await sendWhatsAppText(extracted.from, mediaAcknowledgement());
      }
      await recordIntent(extracted.from, `media:${extracted.media.kind}`);
      return { handled: true, intent: `media:${extracted.media.kind}` };
    }

    const result = await processCustomerQuery(extracted.text, {
      contact,
      isNewContact: isNew,
      profileName,
    });

    if (result.optOut) {
      if (mongoReady()) {
        await WhatsAppContact.updateOne(
          { waId: normalizePhone(extracted.from) },
          { $set: { optedOut: true, lastIntent: "opt_out" } }
        );
      }
      await sendWhatsAppText(extracted.from, result.text);
      return { handled: true, intent: "opt_out" };
    }

    // A new customer gets the catalogue whatever they opened with — that is
    // the "automatic catalogue response" requirement.
    const wantsCatalogue =
      result.sendCatalogue &&
      shouldSendCatalogue(contact, { explicit: Boolean(result.explicitCatalogue) });

    if (wantsCatalogue) {
      await sendCatalogueTo(extracted.from);
    } else if (result.sendCatalogue) {
      // Asked for a greeting but already has the catalogue — acknowledge
      // rather than resending a PDF they received two days ago.
      await sendWhatsAppText(
        extracted.from,
        `Welcome back to ${getKnowledge().business.name}. How can we help you today?`
      );
    } else if (result.text) {
      await sendWhatsAppText(extracted.from, result.text);
    }

    // First-time contact who asked a real question: answer it, then follow with
    // the catalogue so they have the full picture.
    if (!wantsCatalogue && isNew && result.text && shouldSendCatalogue(contact)) {
      await sendCatalogueTo(extracted.from);
    }

    await recordIntent(extracted.from, result.intent);
    console.log(`↩️ Replied to ${maskPhone(extracted.from)} [intent=${result.intent} source=${result.source}]`);
    return { handled: true, intent: result.intent, source: result.source };
  } catch (err) {
    // Release the claim so Meta's retry gets a real second attempt rather than
    // being deduplicated against a run that never sent anything.
    await releaseEvent(extracted.messageId);
    console.error(`❌ Failed to handle WhatsApp message from ${maskPhone(extracted.from)}: ${err.message}`);
    return { handled: false, error: err.message };
  }
}

/**
 * Delivery/read receipts for messages WE sent. Logged, not acted on — they are
 * useful when debugging "did it actually arrive", and `failed` is the signal
 * that a catalogue URL is unreachable by Meta.
 */
function handleStatuses(statuses) {
  for (const status of statuses || []) {
    if (status.status === "failed") {
      const reason = status.errors?.[0];
      console.warn(
        `⚠️ WhatsApp message ${status.id} to ${maskPhone(status.recipient_id)} FAILED` +
          (reason ? `: ${reason.code} ${reason.title || reason.message || ""}` : "")
      );
    } else {
      console.log(`📬 WhatsApp message ${status.id} → ${status.status}`);
    }
  }
}

/** Handle one `changes[]` entry whose field is "messages". */
async function handleMessagesChange(value) {
  const results = [];

  if (Array.isArray(value.messages)) {
    for (const message of value.messages) {
      results.push(await handleIncomingMessage(message, value));
    }
  }

  if (Array.isArray(value.statuses)) handleStatuses(value.statuses);

  if (Array.isArray(value.errors) && value.errors.length) {
    for (const error of value.errors) {
      console.warn(`⚠️ WhatsApp webhook reported an error: ${error.code} ${error.title || error.message || ""}`);
    }
  }

  return results;
}

module.exports = {
  handleMessagesChange,
  handleIncomingMessage,
  extractMessage,
  sendCatalogueTo,
};
