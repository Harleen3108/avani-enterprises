/**
 * The business knowledge the bot answers from.
 *
 * This is CONTENT, not logic. It is the single place to edit what Avani says
 * about itself, and it is consumed two ways:
 *
 *   1. queryProcessor.js matches a customer's words against `services[].keywords`
 *      to pick a deterministic reply (Phase 1, no AI needed).
 *   2. aiService.js renders the whole thing into a system prompt, so an LLM
 *      answers from these facts instead of inventing capabilities.
 *
 * Both paths read the same object, so adding a service updates the rule-based
 * and the AI answers together.
 *
 * OVERRIDING WITHOUT A DEPLOY: point WHATSAPP_KNOWLEDGE_PATH at a JSON file
 * with the same shape. It is merged over these defaults, so a file containing
 * only { "services": [...] } keeps everything else.
 */

const fs = require("fs");
const path = require("path");
const { getConfig } = require("./config");

const DEFAULT_KNOWLEDGE = {
  business: {
    name: "Avani Enterprises",
    summary:
      "Avani Enterprises is a technology and software company. We build websites, web and mobile applications, AI solutions and custom business software for companies of every size.",
    // Deliberately vague on numbers: quoting a price or a timeline the sales
    // team has not agreed to is worse than saying "our team will confirm".
    pricingPolicy:
      "Pricing depends on scope. Share your requirement and our team will prepare a quote.",
    workingHours: "Monday to Saturday, 10:00 AM to 7:00 PM IST",
  },

  services: [
    {
      id: "website",
      name: "Website Development",
      keywords: ["website", "web site", "webpage", "landing page", "site banwana", "portfolio site"],
      reply:
        "Yes. Avani Enterprises provides website and web application development services. We can build solutions using technologies such as MERN and Next.js.",
    },
    {
      id: "webapp",
      name: "Web Application Development",
      keywords: ["web app", "web application", "dashboard", "portal", "saas"],
      reply:
        "Yes. We build custom web applications and dashboards — including portals, SaaS products and internal tools — using MERN and Next.js.",
    },
    {
      id: "mobile",
      name: "Mobile App Development",
      keywords: ["mobile app", "android", "ios", "app development", "react native", "flutter"],
      reply:
        "Yes. We develop mobile applications for Android and iOS, and can also deliver a web and mobile solution together.",
    },
    {
      id: "ai",
      name: "AI Development, Integration and Automation",
      keywords: [
        "ai",
        "artificial intelligence",
        "chatbot",
        "machine learning",
        "ml",
        "llm",
        "gpt",
        "automation bot",
        "ai integration",
      ],
      reply:
        "Yes. We provide AI development, AI integration and AI automation solutions — including chatbots, AI-assisted workflows and integrating AI into your existing systems.",
    },
    {
      id: "mern",
      name: "MERN Development",
      keywords: ["mern", "mongodb", "express", "react", "node", "nodejs"],
      reply:
        "Yes. MERN (MongoDB, Express, React, Node.js) is one of our core stacks for web and application development.",
    },
    {
      id: "nextjs",
      name: "Next.js Development",
      keywords: ["next js", "nextjs", "next.js", "ssr", "server side rendering"],
      reply:
        "Yes. We build production applications on Next.js, including server-rendered and SEO-focused websites.",
    },
    {
      id: "custom-software",
      name: "Custom Software Development",
      keywords: ["custom software", "software development", "bespoke software", "software solution"],
      reply:
        "Yes. We build custom software tailored to your business process rather than forcing you into an off-the-shelf tool.",
    },
    {
      id: "erp-crm",
      name: "ERP / CRM Development",
      keywords: ["erp", "crm", "inventory system", "billing software", "hrms", "lead management"],
      reply:
        "Yes, we can develop custom ERP and CRM solutions. Please share your requirements and our team can assist you.",
    },
    {
      id: "api",
      name: "API Development",
      keywords: ["api", "rest api", "integration", "third party integration", "webhook"],
      reply:
        "Yes. We design and build REST APIs and integrate third-party services and payment gateways into your existing systems.",
    },
    {
      id: "automation",
      name: "Business Automation",
      keywords: ["automation", "automate", "workflow", "whatsapp automation", "process automation"],
      reply:
        "Yes. We build business automation — workflow automation, WhatsApp and messaging automation, reporting and repetitive-task automation.",
    },
  ],

  faqs: [
    {
      id: "pricing",
      keywords: ["price", "pricing", "cost", "charges", "quotation", "quote", "budget", "rate", "kitna"],
      reply:
        "Pricing depends on the scope of the project. If you share your requirement — what you want to build and roughly when you need it — our team will get back to you with a quote.",
    },
    {
      id: "timeline",
      keywords: ["how long", "timeline", "duration", "delivery time", "kitna time", "how many days"],
      reply:
        "Timelines depend on scope. A simple website is usually a couple of weeks; applications and ERP/CRM systems take longer. Share your requirement and our team will confirm a realistic timeline.",
    },
    {
      id: "contact",
      keywords: ["contact", "call me", "phone number", "email", "talk to someone", "speak to"],
      reply:
        "Our team will get in touch with you shortly. You can also share your requirement here and we will respond on this chat.",
    },
    {
      id: "portfolio",
      keywords: ["portfolio", "previous work", "past work", "sample", "case study", "examples"],
      reply:
        "We would be glad to share relevant work. Let us know which service you are interested in and our team will send matching examples.",
    },
    {
      id: "location",
      keywords: ["location", "where are you", "address", "office", "based in"],
      reply:
        "We work with clients remotely across India and internationally. Share your requirement and our team will arrange a call at a convenient time.",
    },
  ],

  messages: {
    greeting:
      "Thank you for contacting {{businessName}}. Here is our company and services catalogue.",
    catalogueCaption: "{{businessName}} — Company & Services Catalogue",
    callGreeting:
      "Thank you for contacting {{businessName}}. We missed your call. Here is our company and services catalogue, and our team will get back to you shortly.",
    fallback:
      "Thank you for your message. Avani Enterprises provides website, web and mobile app, AI, ERP/CRM and custom software development. Please share a little more about what you need and our team will assist you.",
    optOut:
      "You have been unsubscribed from automated messages. Send any message to start again.",
    unsupportedMedia:
      "Thanks for sharing that. Our team will review it. If you can also describe your requirement in a message, we can help you faster.",
  },
};

let cached = null;
let cachedAt = 0;
const CACHE_MS = 60 * 1000;

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Merge an override file over the defaults. Arrays are REPLACED, not appended:
 * if someone supplies a `services` list they mean that list, not that list plus
 * ours.
 */
function mergeDeep(base, override) {
  if (!isPlainObject(override)) return base;
  const out = { ...base };
  for (const [key, value] of Object.entries(override)) {
    out[key] = isPlainObject(value) && isPlainObject(base[key]) ? mergeDeep(base[key], value) : value;
  }
  return out;
}

function loadOverride(knowledgePath) {
  if (!knowledgePath) return null;
  const resolved = path.isAbsolute(knowledgePath)
    ? knowledgePath
    : path.resolve(__dirname, "../..", knowledgePath);
  try {
    return JSON.parse(fs.readFileSync(resolved, "utf8"));
  } catch (err) {
    console.warn(`⚠️ Could not read WHATSAPP_KNOWLEDGE_PATH (${resolved}): ${err.message}`);
    return null;
  }
}

/** Replace {{businessName}} / {{website}} placeholders in a copy string. */
function render(template, cfg = getConfig()) {
  return String(template || "")
    .replace(/\{\{businessName\}\}/g, cfg.businessName)
    .replace(/\{\{website\}\}/g, cfg.businessWebsite);
}

function getKnowledge() {
  const now = Date.now();
  if (cached && now - cachedAt < CACHE_MS) return cached;

  const cfg = getConfig();
  const override = loadOverride(cfg.knowledgePath);
  const merged = override ? mergeDeep(DEFAULT_KNOWLEDGE, override) : DEFAULT_KNOWLEDGE;

  // The business name follows BUSINESS_NAME unless the override sets one
  // explicitly, so a rebrand is one environment variable.
  cached = {
    ...merged,
    business: { ...merged.business, name: override?.business?.name || cfg.businessName },
  };
  cachedAt = now;
  return cached;
}

function invalidateKnowledgeCache() {
  cached = null;
  cachedAt = 0;
}

/** A compact plain-text rendering of the knowledge, for an LLM system prompt. */
function knowledgeAsPrompt() {
  const k = getKnowledge();
  const services = k.services.map((s) => `- ${s.name}: ${s.reply}`).join("\n");
  const faqs = k.faqs.map((f) => `- ${f.reply}`).join("\n");
  return [
    `Business: ${k.business.name}`,
    k.business.summary,
    `Working hours: ${k.business.workingHours}`,
    `Pricing policy: ${k.business.pricingPolicy}`,
    "",
    "Services offered:",
    services,
    "",
    "Standard answers:",
    faqs,
  ].join("\n");
}

module.exports = {
  getKnowledge,
  invalidateKnowledgeCache,
  knowledgeAsPrompt,
  render,
  DEFAULT_KNOWLEDGE,
};
