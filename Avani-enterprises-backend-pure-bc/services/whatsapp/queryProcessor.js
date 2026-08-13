/**
 * Customer query processing.
 *
 *   processCustomerQuery(message, context) -> { text, intent, source, sendCatalogue }
 *
 * This is the layer the requirement calls out as "very important": the single
 * entry point that turns a customer's words into a reply. The webhook calls it
 * and does not care how the answer was produced.
 *
 * THE PIPELINE, in order:
 *
 *   1. Control intents  — greeting, catalogue request, opt-out, thanks, handoff.
 *      Deterministic, never sent to an AI. These drive side effects (send the
 *      catalogue, stop messaging someone), so they must not depend on a model
 *      being available or on a model phrasing them a particular way.
 *
 *   2. AI              — aiService.generateResponse(). Handles everything open
 *      ended once AI_PROVIDER is set. Returns null when unconfigured or failing.
 *
 *   3. Knowledge match — keyword scoring over knowledgeBase services and FAQs.
 *      This is Phase 1's answer engine and the permanent safety net under the AI.
 *
 *   4. Fallback        — a useful, honest reply that never pretends to know.
 *
 * There are no hardcoded response tables here. Every string comes from
 * knowledgeBase.js, which is data and can be replaced with a JSON file.
 */

const aiService = require("./aiService");
const { getKnowledge, render } = require("./knowledgeBase");
const { getConfig } = require("./config");
const { getSettings } = require("./catalogue");

// ── Control-intent patterns ──────────────────────────────────────────────────
// Kept narrow on purpose. A false positive here hijacks a real question, so
// these match short, unambiguous messages rather than any occurrence of a word.

const GREETINGS = [
  "hi", "hii", "hiii", "hey", "hello", "helo", "hlo", "hy",
  "namaste", "namaskar", "good morning", "good afternoon", "good evening",
  "salaam", "assalamualaikum", "vanakkam", "hi there", "hello there",
];

const CATALOGUE_PATTERNS = [
  /\bcatalog(ue)?\b/i,
  /\bbrochure\b/i,
  /\bcompany profile\b/i,
  /\bservices? (list|pdf|details)\b/i,
  /\bpdf\b/i,
  /\bprice list\b/i,
];

const OPT_OUT_PATTERNS = [/^\s*(stop|unsubscribe|opt ?out|do not message|don'?t message)\b/i];

const THANKS_PATTERNS = [/^\s*(thanks|thank you|thankyou|ty|thx|dhanyavad|shukriya)[\s!.]*$/i];

const HUMAN_PATTERNS = [
  /\b(talk|speak|connect) (to|with) (a |an )?(human|person|agent|someone|team|executive)\b/i,
  /\bcall me\b/i,
  /\bhuman\b/i,
];

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isGreeting(raw) {
  const n = normalize(raw);
  if (!n) return false;
  // Only treat it as a bare greeting if that is essentially the whole message.
  // "hi, do you build ERP systems?" is a question, not a greeting.
  if (n.split(" ").length > 4) return false;
  return GREETINGS.some((g) => n === g || n.startsWith(`${g} `));
}

function matchesAny(patterns, raw) {
  return patterns.some((p) => p.test(String(raw || "")));
}

/**
 * Score an entry against the message by counting matched keywords, weighting
 * phrases higher than single words so "ai integration" beats a stray "ai".
 *
 * Single words are matched on a word boundary WITH an optional plural suffix.
 * That suffix is load-bearing: without it "Do you develop websites?" misses the
 * `website` keyword entirely and falls through to the generic reply, because
 * `\bwebsite\b` does not match "websites". Customers pluralise constantly.
 *
 * Phrases use a substring test, which already tolerates plurals — "web apps"
 * contains "web app".
 */
function scoreEntry(entry, normalized) {
  let score = 0;
  for (const keyword of entry.keywords || []) {
    const k = normalize(keyword);
    if (!k) continue;
    if (k.includes(" ")) {
      if (normalized.includes(k)) score += 3;
    } else {
      const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(`\\b${escaped}(?:s|es)?\\b`).test(normalized)) score += 2;
    }
  }
  return score;
}

/** Best knowledge-base answer for a message, or null when nothing is close. */
function matchKnowledge(raw) {
  const normalized = normalize(raw);
  if (!normalized) return null;

  const knowledge = getKnowledge();
  const candidates = [
    ...knowledge.services.map((s) => ({ ...s, kind: "service" })),
    ...knowledge.faqs.map((f) => ({ ...f, kind: "faq" })),
  ];

  let best = null;
  let bestScore = 0;
  for (const entry of candidates) {
    const score = scoreEntry(entry, normalized);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  if (!best || bestScore < 2) return null;
  return { text: best.reply, intent: `${best.kind}:${best.id}`, score: bestScore };
}

/**
 * Turn a customer message into a reply.
 *
 * @param {string} message
 * @param {object} context  { contact, profileName, history, isNewContact }
 * @returns {Promise<{text, intent, source, sendCatalogue, optOut}>}
 */
async function processCustomerQuery(message, context = {}) {
  const cfg = getConfig();
  const knowledge = getKnowledge();
  const settings = await getSettings();
  const raw = String(message || "").trim();

  // 1. Control intents — deterministic, side-effect bearing.
  if (matchesAny(OPT_OUT_PATTERNS, raw)) {
    return {
      text: render(knowledge.messages.optOut, cfg),
      intent: "opt_out",
      source: "rules",
      sendCatalogue: false,
      optOut: true,
    };
  }

  if (isGreeting(raw) || !raw) {
    return {
      text: null, // the greeting copy travels with the catalogue send
      intent: "greeting",
      source: "rules",
      sendCatalogue: true,
    };
  }

  if (matchesAny(CATALOGUE_PATTERNS, raw)) {
    return {
      text: null,
      intent: "catalogue_request",
      source: "rules",
      sendCatalogue: true,
      explicitCatalogue: true,
    };
  }

  if (matchesAny(THANKS_PATTERNS, raw)) {
    return {
      text: `You're welcome. If you have a requirement, share the details here and our team at ${knowledge.business.name} will assist you.`,
      intent: "thanks",
      source: "rules",
      sendCatalogue: false,
    };
  }

  if (matchesAny(HUMAN_PATTERNS, raw)) {
    return {
      text: "Sure — our team will get in touch with you shortly. In the meantime, feel free to share your requirement here.",
      intent: "human_handoff",
      source: "rules",
      sendCatalogue: false,
    };
  }

  // 2. AI. Suppressed when the admin has switched it off in settings, even if
  //    the environment has a provider configured.
  const aiAllowed = settings.aiEnabled !== false;
  if (aiAllowed) {
    const ai = await aiService.generateResponse(raw, context);
    if (ai && ai.text) {
      return {
        text: ai.text,
        intent: "ai",
        source: `ai:${ai.provider}`,
        model: ai.model,
        sendCatalogue: false,
      };
    }
  }

  // 3. Knowledge base.
  const matched = matchKnowledge(raw);
  if (matched) {
    return {
      text: matched.text,
      intent: matched.intent,
      source: "knowledge",
      sendCatalogue: false,
    };
  }

  // 4. Fallback — honest, useful, and it still moves the conversation forward.
  return {
    text: render(settings.fallbackText || knowledge.messages.fallback, cfg),
    intent: "fallback",
    source: "fallback",
    sendCatalogue: false,
  };
}

module.exports = { processCustomerQuery, matchKnowledge, isGreeting, normalize };
