/**
 * WhatsApp automation — configuration.
 *
 * Every value is read from the environment at CALL TIME, not at require time.
 * Render restarts the process when you change an environment variable, so a
 * lazy read costs nothing and it means a missing variable shows up as a clear
 * "not configured" in /api/health instead of a crash at boot. The webhook must
 * never take the whole backend down because a WhatsApp secret is absent.
 *
 * NOTHING in this file has a credential default. If a token is missing the
 * feature reports itself unconfigured and declines to call Meta.
 */

// Meta's Cloud API. v23.0 is the oldest version that carries the WhatsApp
// Business Calling API, which is why it is the floor rather than something
// newer — raise META_GRAPH_API_VERSION when you need a newer field.
const DEFAULT_GRAPH_VERSION = "v23.0";

const DEFAULT_CATALOGUE_FILENAME = "Avani-Enterprises-Catalogue.pdf";

// WhatsApp hard-limits a text message body to 4096 characters. Anything longer
// is rejected by Meta, so replies are cut before they are sent, not after.
const WHATSAPP_TEXT_LIMIT = 4096;

function str(name, fallback = "") {
  const v = process.env[name];
  return typeof v === "string" && v.trim() ? v.trim() : fallback;
}

function bool(name, fallback) {
  const v = str(name);
  if (!v) return fallback;
  return ["1", "true", "yes", "on"].includes(v.toLowerCase());
}

function num(name, fallback) {
  const v = Number(str(name));
  return Number.isFinite(v) ? v : fallback;
}

function list(name) {
  return str(name)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Strip everything that is not a digit. Meta returns wa_ids without a leading
 * "+", but humans type numbers with spaces, dashes and "+", so every comparison
 * in this module happens on the digits alone.
 */
function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "");
}

/**
 * Never log a customer's full number. Keeps the country prefix and the last two
 * digits, which is enough to correlate a log line with a real conversation
 * while staying useless to anyone reading the logs.
 *
 *   919876543210  ->  91******10
 */
function maskPhone(value) {
  const digits = normalizePhone(value);
  if (!digits) return "unknown";
  if (digits.length <= 4) return "*".repeat(digits.length);
  return `${digits.slice(0, 2)}${"*".repeat(digits.length - 4)}${digits.slice(-2)}`;
}

function getConfig() {
  const graphVersion = str("META_GRAPH_API_VERSION", DEFAULT_GRAPH_VERSION);

  return {
    // ── Meta WhatsApp Cloud API ──────────────────────────────────────────
    accessToken: str("WHATSAPP_ACCESS_TOKEN"),
    phoneNumberId: str("WHATSAPP_PHONE_NUMBER_ID"),
    businessAccountId: str("WHATSAPP_BUSINESS_ACCOUNT_ID"),
    verifyToken: str("WHATSAPP_VERIFY_TOKEN"),
    appSecret: str("META_APP_SECRET"),
    graphVersion,
    graphBaseUrl: `https://graph.facebook.com/${graphVersion}`,

    // ── Catalogue ────────────────────────────────────────────────────────
    // A public HTTPS link Meta can download, OR a media id already uploaded to
    // Meta. The media id wins when both are set because it skips the download.
    cataloguePdfUrl: str("CATALOGUE_PDF_URL"),
    catalogueMediaId: str("CATALOGUE_MEDIA_ID"),
    catalogueFilename: str("CATALOGUE_FILENAME", DEFAULT_CATALOGUE_FILENAME),
    // Don't re-send the catalogue to someone who already has it. A week is long
    // enough that a returning enquiry gets it again, short enough that a
    // conversation over several days is not spammed.
    catalogueResendHours: num("CATALOGUE_RESEND_HOURS", 168),

    // ── Behaviour switches ───────────────────────────────────────────────
    automationEnabled: bool("WHATSAPP_AUTOMATION_ENABLED", true),
    markAsRead: bool("WHATSAPP_MARK_AS_READ", true),
    // "reject" hangs the call up immediately and follows with a WhatsApp
    // message; "ignore" lets it ring out and replies once Meta reports the
    // call terminated. See services/whatsapp/inboundCall.js.
    callAction: str("WHATSAPP_CALL_ACTION", "reject").toLowerCase(),

    // Development guard rail. While this is non-empty the backend will only
    // ever send to the numbers listed, so a stray webhook from a real customer
    // cannot be answered by a half-finished bot. Leave it EMPTY in production.
    allowedNumbers: list("WHATSAPP_ALLOWED_NUMBERS").map(normalizePhone),

    // ── Business identity (used in copy, never hardcoded downstream) ──────
    businessName: str("BUSINESS_NAME", "Avani Enterprises"),
    businessWebsite: str("PUBLIC_SITE_URL", str("SITE_URL", "https://www.avanienterprises.in")),
    knowledgePath: str("WHATSAPP_KNOWLEDGE_PATH"),

    // ── AI ───────────────────────────────────────────────────────────────
    // "none" keeps the FAQ/intent layer as the only responder. Setting a
    // provider + key is the entire switch-on for AI replies.
    aiProvider: str("AI_PROVIDER", "none").toLowerCase(),
    aiApiKey: str("AI_API_KEY"),
    aiModel: str("AI_MODEL"),
    aiMaxOutputTokens: num("AI_MAX_OUTPUT_TOKENS", 2048),
    aiTimeoutMs: num("AI_TIMEOUT_MS", 20000),
  };
}

/** True when we hold enough credentials to call Meta at all. */
function canSend(cfg = getConfig()) {
  return Boolean(cfg.accessToken && cfg.phoneNumberId);
}

/** True when the GET webhook verification handshake can be answered. */
function canVerify(cfg = getConfig()) {
  return Boolean(cfg.verifyToken);
}

/**
 * The development allow-list. An empty list means "no restriction", which is
 * the production posture; a non-empty list is a hard gate.
 */
function isRecipientAllowed(to, cfg = getConfig()) {
  if (!cfg.allowedNumbers.length) return true;
  const digits = normalizePhone(to);
  return cfg.allowedNumbers.some((allowed) => allowed === digits || digits.endsWith(allowed));
}

/**
 * Non-sensitive readiness snapshot for /api/health and the admin panel.
 * Deliberately returns booleans and lengths — never a token, never a key.
 */
function describeConfig(cfg = getConfig()) {
  return {
    automationEnabled: cfg.automationEnabled,
    graphVersion: cfg.graphVersion,
    accessTokenConfigured: Boolean(cfg.accessToken),
    phoneNumberIdConfigured: Boolean(cfg.phoneNumberId),
    businessAccountIdConfigured: Boolean(cfg.businessAccountId),
    verifyTokenConfigured: Boolean(cfg.verifyToken),
    signatureVerificationEnabled: Boolean(cfg.appSecret),
    catalogueConfigured: Boolean(cfg.catalogueMediaId || cfg.cataloguePdfUrl),
    catalogueSource: cfg.catalogueMediaId ? "media_id" : cfg.cataloguePdfUrl ? "url" : "none",
    aiProvider: cfg.aiProvider,
    aiConfigured: cfg.aiProvider !== "none" && Boolean(cfg.aiApiKey),
    callAction: cfg.callAction,
    recipientAllowListSize: cfg.allowedNumbers.length,
  };
}

module.exports = {
  getConfig,
  canSend,
  canVerify,
  isRecipientAllowed,
  describeConfig,
  maskPhone,
  normalizePhone,
  WHATSAPP_TEXT_LIMIT,
};
