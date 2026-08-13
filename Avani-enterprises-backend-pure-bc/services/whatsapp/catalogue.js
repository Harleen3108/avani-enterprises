/**
 * Where the catalogue comes from, and when a customer should get it.
 *
 * The PDF is never bundled into this application. It is resolved at send time
 * from, in order of precedence:
 *
 *   1. the WhatsAppSetting document (admin panel — changeable without a deploy)
 *   2. CATALOGUE_MEDIA_ID   (a file already uploaded to Meta)
 *   3. CATALOGUE_PDF_URL    (a public HTTPS link Meta downloads)
 *
 * So replacing the catalogue is either an admin-panel upload or a Render
 * environment variable change. No WhatsApp code changes to swap the file.
 */

const mongoose = require("mongoose");
const WhatsAppSetting = require("../../models/WhatsAppSetting");
const { getConfig } = require("./config");
const { getKnowledge, render } = require("./knowledgeBase");

let cachedSettings = null;
let cachedAt = 0;
const CACHE_MS = 30 * 1000;

function mongoReady() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

/**
 * Read the settings document, cached briefly.
 *
 * A missing document, an empty collection or an unreachable database all yield
 * `{}` — the environment variables then supply every value. The catalogue must
 * keep sending during a database blip.
 */
async function getSettings({ fresh = false } = {}) {
  if (!fresh && cachedSettings && Date.now() - cachedAt < CACHE_MS) return cachedSettings;
  if (!mongoReady()) return cachedSettings || {};

  try {
    const doc = await WhatsAppSetting.findOne({ key: "default" }).lean();
    cachedSettings = doc || {};
    cachedAt = Date.now();
    return cachedSettings;
  } catch (err) {
    console.warn(`⚠️ Could not read WhatsApp settings, using environment only: ${err.message}`);
    return cachedSettings || {};
  }
}

function invalidateSettingsCache() {
  cachedSettings = null;
  cachedAt = 0;
}

/** Persist admin overrides. Only known keys are written. */
async function updateSettings(patch, updatedBy = "") {
  if (!mongoReady()) throw new Error("Database unavailable");

  const allowed = [
    "cataloguePdfUrl",
    "catalogueMediaId",
    "catalogueFilename",
    "catalogueCaption",
    "greetingText",
    "fallbackText",
    "automationEnabled",
    "aiEnabled",
  ];
  const update = { updatedBy };
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(patch, key)) update[key] = patch[key];
  }

  const doc = await WhatsAppSetting.findOneAndUpdate(
    { key: "default" },
    { $set: update, $setOnInsert: { key: "default" } },
    { new: true, upsert: true }
  ).lean();

  invalidateSettingsCache();
  return doc;
}

/**
 * Resolve the catalogue to send right now.
 * @returns {Promise<{configured, mediaId, url, filename, caption, source}>}
 */
async function resolveCatalogue() {
  const cfg = getConfig();
  const settings = await getSettings();
  const knowledge = getKnowledge();

  const mediaId = settings.catalogueMediaId || cfg.catalogueMediaId || "";
  const url = settings.cataloguePdfUrl || cfg.cataloguePdfUrl || "";
  const filename = settings.catalogueFilename || cfg.catalogueFilename;
  const caption = render(
    settings.catalogueCaption || knowledge.messages.catalogueCaption,
    cfg
  );

  return {
    configured: Boolean(mediaId || url),
    mediaId,
    url,
    filename,
    caption,
    source: mediaId ? "media_id" : url ? "url" : "none",
  };
}

/** The greeting that precedes the catalogue document. */
async function resolveGreeting({ forCall = false } = {}) {
  const cfg = getConfig();
  const settings = await getSettings();
  const knowledge = getKnowledge();
  const template = forCall
    ? knowledge.messages.callGreeting
    : settings.greetingText || knowledge.messages.greeting;
  return render(template, cfg);
}

/**
 * Should this contact receive the catalogue?
 *
 * Yes when they have never had it, when the resend window has elapsed, or when
 * they explicitly asked for it. An `explicit` request always wins — someone who
 * types "send catalogue" gets the catalogue even if they got one yesterday.
 */
function shouldSendCatalogue(contact, { explicit = false } = {}) {
  if (explicit) return true;
  if (!contact || !contact.catalogueSentAt) return true;

  const hours = getConfig().catalogueResendHours;
  if (!hours || hours <= 0) return false;

  const elapsedHours = (Date.now() - new Date(contact.catalogueSentAt).getTime()) / 36e5;
  return elapsedHours >= hours;
}

module.exports = {
  getSettings,
  updateSettings,
  invalidateSettingsCache,
  resolveCatalogue,
  resolveGreeting,
  shouldSendCatalogue,
};
