/**
 * WhatsApp admin API — mounted at /admin/whatsapp, behind the existing JWT
 * middleware.
 *
 * Scope is deliberately small. The brief was explicit: do not build a large new
 * admin panel for this feature. So this is the minimum that makes the catalogue
 * replaceable and the integration testable without a redeploy:
 *
 *   GET    /settings   what is configured (booleans only — never a token)
 *   PUT    /settings   change catalogue URL, copy, kill switches
 *   POST   /catalogue  upload a new PDF to Cloudinary and point at it
 *   POST   /test-message, /test-catalogue   send to a number, to verify wiring
 *   GET    /contacts   who has messaged us
 *   GET/POST /calling  read and set the number's calling configuration
 *
 * Storage reuses the Cloudinary account already configured in index.js for
 * newsletter images and CVs — `resource_type: "raw"`, the same setting the CV
 * upload uses, because a PDF is not an image and Cloudinary rejects it under
 * the default type. No second storage provider is introduced.
 */

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const auth = require("../middleware/auth");
const WhatsAppContact = require("../models/WhatsAppContact");
const {
  getConfig,
  describeConfig,
  maskPhone,
  normalizePhone,
} = require("../services/whatsapp/config");
const {
  getSettings,
  updateSettings,
  resolveCatalogue,
  invalidateSettingsCache,
} = require("../services/whatsapp/catalogue");
const { describeStore } = require("../services/whatsapp/idempotency");
const { describeAi } = require("../services/whatsapp/aiService");
const { invalidateKnowledgeCache, getKnowledge } = require("../services/whatsapp/knowledgeBase");
const { processCustomerQuery } = require("../services/whatsapp/queryProcessor");
const {
  sendWhatsAppText,
  getPhoneNumberSettings,
  setCallingEnabled,
} = require("../services/whatsapp/whatsappClient");
const { sendCatalogueTo } = require("../services/whatsapp/inboundMessage");

const router = express.Router();

// This router is mounted before the global express.json() (so the sibling
// webhook router can keep its raw body), so it brings its own parser.
router.use(express.json());

// index.js already calls cloudinary.config() at boot. Repeating it here is
// idempotent and keeps this module usable on its own — it must not depend on
// the require order of an unrelated file.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const catalogueStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "avani-whatsapp",
    // PDFs are not images. Without "raw" Cloudinary rejects the upload.
    resource_type: "raw",
    public_id: `catalogue-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  }),
});

const catalogueUpload = multer({
  storage: catalogueStorage,
  // WhatsApp accepts documents up to 100 MB, but Meta has to download the file
  // for every single send, so a huge catalogue is slow for the customer as well
  // as expensive. 25 MB comfortably fits the existing Avani PDFs.
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isPdf =
      file.mimetype === "application/pdf" || /\.pdf$/i.test(file.originalname || "");
    cb(isPdf ? null : new Error("Catalogue must be a PDF"), isPdf);
  },
});

/** Wrap an async handler so a rejection becomes a 500 instead of an unhandled rejection. */
function wrap(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

// ── Settings ────────────────────────────────────────────────────────────────

router.get(
  "/settings",
  auth,
  wrap(async (_req, res) => {
    const settings = await getSettings({ fresh: true });
    const catalogue = await resolveCatalogue();
    res.json({
      success: true,
      // Booleans and names only. No token, no API key, ever.
      config: describeConfig(),
      catalogue,
      settings: {
        cataloguePdfUrl: settings.cataloguePdfUrl || "",
        catalogueMediaId: settings.catalogueMediaId || "",
        catalogueFilename: settings.catalogueFilename || "",
        catalogueCaption: settings.catalogueCaption || "",
        greetingText: settings.greetingText || "",
        fallbackText: settings.fallbackText || "",
        automationEnabled: settings.automationEnabled ?? null,
        aiEnabled: settings.aiEnabled ?? null,
        updatedAt: settings.updatedAt || null,
        updatedBy: settings.updatedBy || "",
      },
      ai: describeAi(),
      idempotency: describeStore(),
      knowledge: {
        businessName: getKnowledge().business.name,
        serviceCount: getKnowledge().services.length,
        faqCount: getKnowledge().faqs.length,
      },
    });
  })
);

router.put(
  "/settings",
  auth,
  wrap(async (req, res) => {
    const doc = await updateSettings(req.body || {}, req.user?._id || "");
    invalidateKnowledgeCache();
    res.json({ success: true, settings: doc });
  })
);

// ── Catalogue upload ────────────────────────────────────────────────────────

router.post(
  "/catalogue",
  auth,
  catalogueUpload.single("catalogue"),
  wrap(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No PDF uploaded (field name: catalogue)" });
    }

    // multer-storage-cloudinary puts the delivery URL on path/secure_url.
    const url = req.file.path || req.file.secure_url;
    if (!url) {
      return res.status(500).json({ success: false, message: "Upload succeeded but no URL was returned" });
    }

    const filename = req.body.filename || req.file.originalname || getConfig().catalogueFilename;

    // Point at the new file AND clear any media id, otherwise the old
    // Meta-hosted copy would keep winning the precedence check in catalogue.js.
    const settings = await updateSettings(
      { cataloguePdfUrl: url, catalogueMediaId: "", catalogueFilename: filename },
      req.user?._id || ""
    );

    res.json({
      success: true,
      message: "Catalogue updated. New enquiries will receive this PDF.",
      url,
      filename,
      settings,
    });
  })
);

// ── Test sends ──────────────────────────────────────────────────────────────

router.post(
  "/test-message",
  auth,
  wrap(async (req, res) => {
    const { to, message } = req.body || {};
    if (!normalizePhone(to)) {
      return res.status(400).json({ success: false, message: "A valid `to` number is required" });
    }
    const result = await sendWhatsAppText(to, message || "Test message from Avani Enterprises.");
    res.status(result.sent ? 200 : 400).json({ success: result.sent, to: maskPhone(to), ...result });
  })
);

router.post(
  "/test-catalogue",
  auth,
  wrap(async (req, res) => {
    const { to } = req.body || {};
    if (!normalizePhone(to)) {
      return res.status(400).json({ success: false, message: "A valid `to` number is required" });
    }
    const result = await sendCatalogueTo(to);
    res.json({ success: Boolean(result.document?.sent), to: maskPhone(to), ...result });
  })
);

/**
 * Dry-run the reply engine without sending anything. The fastest way to see
 * whether a change to the knowledge base or the AI prompt did what you wanted.
 */
router.post(
  "/preview-reply",
  auth,
  wrap(async (req, res) => {
    const { message } = req.body || {};
    if (!String(message || "").trim()) {
      return res.status(400).json({ success: false, message: "`message` is required" });
    }
    const result = await processCustomerQuery(message, {});
    res.json({ success: true, query: message, result });
  })
);

// ── Contacts ────────────────────────────────────────────────────────────────

router.get(
  "/contacts",
  auth,
  wrap(async (req, res) => {
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const skip = Math.max(Number(req.query.skip) || 0, 0);

    const [contacts, total] = await Promise.all([
      WhatsAppContact.find().sort({ lastMessageAt: -1 }).skip(skip).limit(limit).lean(),
      WhatsAppContact.countDocuments(),
    ]);

    res.json({ success: true, total, limit, skip, contacts });
  })
);

// ── WhatsApp Calling configuration ──────────────────────────────────────────
//
// Inbound calling is DISABLED by default on every WhatsApp number, test numbers
// included, and no `calls` webhook fires until it is enabled. These two routes
// are how you check and flip it without leaving the admin panel.

router.get(
  "/calling",
  auth,
  wrap(async (_req, res) => {
    const result = await getPhoneNumberSettings();
    if (!result.ok) {
      return res.status(400).json({ success: false, message: "WhatsApp is not configured", ...result });
    }
    res.json({ success: true, settings: result.settings });
  })
);

router.post(
  "/calling",
  auth,
  wrap(async (req, res) => {
    const enabled = req.body?.enabled !== false;
    const result = await setCallingEnabled(enabled, req.body?.options || {});
    if (!result.ok) {
      return res.status(400).json({ success: false, message: "WhatsApp is not configured", ...result });
    }
    res.json({
      success: true,
      message: `WhatsApp calling ${enabled ? "enabled" : "disabled"} for this number.`,
      result: result.result,
    });
  })
);

// ── Cache busting ───────────────────────────────────────────────────────────

router.post(
  "/refresh",
  auth,
  (_req, res) => {
    invalidateSettingsCache();
    invalidateKnowledgeCache();
    res.json({ success: true, message: "WhatsApp settings and knowledge caches cleared." });
  }
);

/**
 * Local error handler. Multer's own errors (file too large, wrong type) are
 * client mistakes and deserve a 4xx with a readable message, not the generic
 * 500 from the global handler in index.js.
 */
router.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: `Upload failed: ${err.message}` });
  }
  if (err && /must be a PDF/i.test(err.message || "")) {
    return res.status(400).json({ success: false, message: err.message });
  }
  console.error("❌ WhatsApp admin error:", err);
  res.status(500).json({ success: false, message: "WhatsApp admin request failed", error: err.message });
});

module.exports = router;
