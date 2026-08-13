/**
 * AI abstraction.
 *
 *   aiService.generateResponse(message, context) -> { text, provider, model } | null
 *
 * This is the seam the whole feature was designed around. The webhook does not
 * know an AI exists; queryProcessor calls this one function and copes with null.
 * Switching provider is two environment variables (AI_PROVIDER, AI_API_KEY) and
 * no code change; adding a provider is one entry in PROVIDERS below.
 *
 * SECURITY: AI_API_KEY is read from the environment inside this module and put
 * in a request header. It is never returned to a caller, never logged, and — as
 * with every credential here — never prefixed NEXT_PUBLIC_ or exposed to any
 * frontend. The browser never talks to the model; this server does.
 *
 * RETURNING NULL IS NORMAL. No provider configured, a timeout, a rate limit, a
 * malformed body — all return null, and queryProcessor falls back to the
 * deterministic FAQ answer. A customer always gets a reply; an AI outage
 * degrades the wording, not the service.
 */

const { getConfig } = require("./config");
const { knowledgeAsPrompt, getKnowledge } = require("./knowledgeBase");

/**
 * The instruction set that keeps replies usable on WhatsApp and honest about
 * what Avani does. The knowledge base is injected rather than hardcoded, so
 * editing knowledgeBase.js retrains the assistant.
 */
function buildSystemPrompt() {
  const cfg = getConfig();
  const k = getKnowledge();
  return [
    `You are the WhatsApp assistant for ${k.business.name}, a technology and software company.`,
    "",
    "Answer using only the information below. If a customer asks about something not listed,",
    "say that our team will confirm — never invent a service, a price, a timeline or a client name.",
    "",
    knowledgeAsPrompt(),
    "",
    "How to reply:",
    "- This is WhatsApp. Keep replies to 2-4 short sentences.",
    "- Plain text only. No markdown, no headings, no bullet characters, no emoji spam.",
    "- Be direct and professional. Answer the question first, then offer the next step.",
    "- Never quote a specific price or a guaranteed delivery date.",
    "- If the customer seems ready to proceed, ask them to share their requirement so the team can follow up.",
    `- Company website: ${cfg.businessWebsite}`,
  ].join("\n");
}

/** Fetch with a hard timeout, so a hanging provider cannot pin a webhook open. */
async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ── Providers ────────────────────────────────────────────────────────────────
//
// Each provider is { defaultModel, call(cfg, systemPrompt, history, message) }
// and returns the assistant's text, or null if it produced nothing usable.

const PROVIDERS = {
  /**
   * Anthropic Messages API.
   *
   * Notes that matter for this integration:
   * - `max_tokens` caps thinking AND visible text together on Claude Opus 5,
   *   and thinking is on by default. A tight cap would truncate the answer
   *   mid-sentence, so the budget is generous (AI_MAX_OUTPUT_TOKENS) and the
   *   reply is kept short by the system prompt instead.
   * - effort "low" is right here: this is a short FAQ answer, not deep
   *   reasoning, and low effort keeps latency inside a chat-shaped window.
   * - A `refusal` stop reason is treated as "no answer" and falls through to
   *   the deterministic FAQ layer. That local fallback is better than a
   *   server-side model fallback for this use case — it is instant, free and
   *   always on-message — so no fallback beta header is used.
   */
  anthropic: {
    defaultModel: "claude-opus-5",
    async call(cfg, systemPrompt, history, message) {
      const response = await fetchWithTimeout(
        "https://api.anthropic.com/v1/messages",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": cfg.aiApiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: cfg.aiModel || PROVIDERS.anthropic.defaultModel,
            max_tokens: cfg.aiMaxOutputTokens,
            system: systemPrompt,
            output_config: { effort: "low" },
            messages: [...history, { role: "user", content: message }],
          }),
        },
        cfg.aiTimeoutMs
      );

      if (!response.ok) {
        throw new Error(`Anthropic API returned ${response.status}`);
      }
      const data = await response.json();
      if (data.stop_reason === "refusal") return null;

      const text = (data.content || [])
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("")
        .trim();
      return text || null;
    },
  },

  /** OpenAI Chat Completions. Set AI_MODEL to pin a specific model. */
  openai: {
    defaultModel: "gpt-4o-mini",
    async call(cfg, systemPrompt, history, message) {
      const response = await fetchWithTimeout(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${cfg.aiApiKey}`,
          },
          body: JSON.stringify({
            model: cfg.aiModel || PROVIDERS.openai.defaultModel,
            max_tokens: cfg.aiMaxOutputTokens,
            messages: [
              { role: "system", content: systemPrompt },
              ...history,
              { role: "user", content: message },
            ],
          }),
        },
        cfg.aiTimeoutMs
      );

      if (!response.ok) throw new Error(`OpenAI API returned ${response.status}`);
      const data = await response.json();
      return (data.choices?.[0]?.message?.content || "").trim() || null;
    },
  },

  /** Google Gemini generateContent. Set AI_MODEL to pin a specific model. */
  gemini: {
    defaultModel: "gemini-2.0-flash",
    async call(cfg, systemPrompt, history, message) {
      const model = cfg.aiModel || PROVIDERS.gemini.defaultModel;
      const response = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            // Header auth, not a query string — a key in a URL ends up in
            // access logs and proxy logs.
            "x-goog-api-key": cfg.aiApiKey,
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [
              ...history.map((turn) => ({
                role: turn.role === "assistant" ? "model" : "user",
                parts: [{ text: turn.content }],
              })),
              { role: "user", parts: [{ text: message }] },
            ],
            generationConfig: { maxOutputTokens: cfg.aiMaxOutputTokens },
          }),
        },
        cfg.aiTimeoutMs
      );

      if (!response.ok) throw new Error(`Gemini API returned ${response.status}`);
      const data = await response.json();
      const text = (data.candidates?.[0]?.content?.parts || [])
        .map((part) => part.text || "")
        .join("")
        .trim();
      return text || null;
    },
  },
};

function isConfigured(cfg = getConfig()) {
  return cfg.aiProvider !== "none" && Boolean(cfg.aiApiKey) && Boolean(PROVIDERS[cfg.aiProvider]);
}

/**
 * Generate a reply to a customer message.
 *
 * @param {string} message  The customer's text.
 * @param {object} context  Optional. `context.history` is an array of
 *   { role: "user"|"assistant", content } turns for multi-turn conversation.
 *   Phase 1 passes none; the parameter exists so adding conversation memory
 *   later touches only queryProcessor.
 * @returns {Promise<{text, provider, model}|null>} null when unavailable.
 */
async function generateResponse(message, context = {}) {
  const cfg = getConfig();
  if (!isConfigured(cfg)) return null;
  if (!String(message || "").trim()) return null;

  const provider = PROVIDERS[cfg.aiProvider];
  const model = cfg.aiModel || provider.defaultModel;
  const history = Array.isArray(context.history) ? context.history.slice(-10) : [];

  try {
    const text = await provider.call(cfg, buildSystemPrompt(), history, message);
    if (!text) return null;
    return { text, provider: cfg.aiProvider, model };
  } catch (err) {
    // Never include the request body or the key — just the shape of the failure.
    console.warn(`⚠️ AI provider "${cfg.aiProvider}" failed, falling back to rules: ${err.message}`);
    return null;
  }
}

function describeAi() {
  const cfg = getConfig();
  const provider = PROVIDERS[cfg.aiProvider];
  return {
    provider: cfg.aiProvider,
    configured: isConfigured(cfg),
    model: cfg.aiModel || provider?.defaultModel || null,
    supportedProviders: ["none", ...Object.keys(PROVIDERS)],
  };
}

module.exports = { generateResponse, isConfigured, describeAi, buildSystemPrompt };
