const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Form = require("./models/Form");
const User = require("./models/User");
const Lead = require("./models/Lead");
const AvaniForm = require("./models/AvaniForm");
const Job = require("./models/Job");
const Application = require("./models/Application");
const Seo = require("./models/Seo");
const Blog = require("./models/Blog");
const Newsletter = require("./models/Newsletter");
const GrowthPlanLead = require("./models/GrowthPlanLead");
// Login lockout, audit logging and the geo/UA helpers used by /auth/login.
const loginSecurity = require("./services/loginSecurity");
const requestContext = require("./services/requestContext");
// One notification template shared by /submit-form and /avani-form.
const { sendLeadEmail, sendTestLeadEmail, emailStatus } = require("./services/leadEmail");
require("dotenv").config();

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Accept PDF, DOC, DOCX for applications
  // Accept JPG, JPEG, PNG, WEBP for newsletters/blogs
  const allowedTypes = /pdf|doc|docx|jpg|jpeg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

// Cloudinary configuration for persistent image storage
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avani-newsletters",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, crop: "limit", quality: "auto" }],
  },
});

// Image upload using Cloudinary (persistent cloud storage)
const imageUpload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// CORS configuration - allow frontend to connect
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or same-origin)
    if (!origin) return callback(null, true);

    // In development, allow all localhost and local network origins
    if (origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.match(/^http:\/\/192\.168\.\d{1,3}\.\d{1,3}/) ||
      origin.match(/^http:\/\/172\.\d{1,3}\.\d{1,3}\.\d{1,3}/) ||
      origin.match(/^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) {
      return callback(null, true);
    }

    // Production origins
    const allowedOrigins = [
      'https://avani-enterprises-bcjw.vercel.app',
      'https://avani-enterprises-psi.vercel.app',
      'https://avani-enterprises.vercel.app',
      'https://www.avanienterprises.in',
      'https://avanienterprises.in',
    ];

    if (allowedOrigins.includes(origin) || (origin && origin.endsWith('.vercel.app'))) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow anyway for now
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
// navigator.sendBeacon posts as text/plain, which express.json() ignores — the
// analytics duration endpoint would receive an empty body without this.
app.use(express.text({ type: ["text/plain", "application/csp-report"], limit: "16kb" }));
// Render terminates TLS at its proxy, so req.ip is the proxy without this and
// every visitor would geolocate to a datacentre.
app.set("trust proxy", 1);

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// Diagnostic route
app.get("/api/test-v4", (req, res) => res.json({ success: true, version: "v4-robust-priority", timestamp: new Date() }));

// --- CRITICAL: PUBLIC API ROUTES (Top Priority) ---
// Public: Get all published newsletters
app.get("/api/newsletters", async (req, res) => {
  try {
    console.log("Fetching published newsletters...");
    const newsletters = await Newsletter.find({ isPublished: true }).sort({ publishedAt: -1, createdAt: -1 });
    console.log(`Found ${newsletters.length} newsletters`);
    res.json({ success: true, data: newsletters });
  } catch (err) {
    console.error("❌ Newsletter Fetch Error:", err);
    res.status(500).json({ message: "Server error", error: err.message, stack: process.env.NODE_ENV === "development" ? err.stack : undefined });
  }
});

// Public: Get single newsletter by slug
app.get("/api/newsletters/:slug", async (req, res) => {
  try {
    const newsletter = await Newsletter.findOne({ slug: req.params.slug, isPublished: true });
    if (!newsletter) return res.status(404).json({ message: "Newsletter not found" });
    res.json({ success: true, data: newsletter });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Backend Info route
app.get("/api/info", (req, res) => {
  res.json({
    message: "Avani Backend API is running",
    version: "1.0.0",
    endpoints: {
      auth: ["/auth/signup", "/auth/verify-signup", "/auth/login", "/auth/forgot-password", "/auth/reset-password-otp"],
      leads: ["/leads", "/submit-form"],
      avaniForm: ["/avani-form"]
    }
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected successfully to:", process.env.MONGO_URI.split('@')[1] || "hidden");

    // Seed default SEO entries for known frontend pages (idempotent)
    const seedSeoEntries = async () => {
      try {
        const defaultEntries = [
          { page: "/", title: "Avani Enterprises | Home", seoHeading: "Avani Enterprises", metaDescription: "Avani Enterprises - business growth & digital services.", metaKeywords: "avani, enterprise, services" },
          { page: "/about", title: "About Avani Enterprises", seoHeading: "About Us", metaDescription: "Learn about Avani Enterprises and our mission.", metaKeywords: "about avani, avani enterprises" },
          { page: "/services", title: "Our Services - Avani", seoHeading: "Services", metaDescription: "Professional services offered by Avani.", metaKeywords: "services, avani services" },
          { page: "/case-studies", title: "Case Studies", seoHeading: "Case Studies", metaDescription: "Our success stories and case studies.", metaKeywords: "case studies, projects" },
          { page: "/contact", title: "Contact Avani", seoHeading: "Contact Us", metaDescription: "Get in touch with Avani Enterprises.", metaKeywords: "contact, avani" },
          { page: "/courses", title: "Courses", seoHeading: "Courses", metaDescription: "Training and courses by Avani.", metaKeywords: "courses, training" },
          { page: "/get-consultation", title: "Get Consultation", seoHeading: "Get Consultation", metaDescription: "Request consultation from Avani experts.", metaKeywords: "consultation" },
          { page: "/thank-you", title: "Thank You - Avani", seoHeading: "Thank You", metaDescription: "Thank you for contacting Avani.", metaKeywords: "thank you" },
          { page: "/privacy-policy", title: "Privacy Policy", seoHeading: "Privacy Policy", metaDescription: "Avani Enterprises privacy policy.", metaKeywords: "privacy policy" },
          { page: "/terms-and-conditions", title: "Terms & Conditions", seoHeading: "Terms and Conditions", metaDescription: "Terms and conditions.", metaKeywords: "terms" },
          { page: "/web-dev", title: "Web Development", seoHeading: "Web Development", metaDescription: "Web development services.", metaKeywords: "web development" },
          { page: "/policicue", title: "Policicue Project", seoHeading: "Policicue", metaDescription: "Policicue project details.", metaKeywords: "policicue" },
          { page: "/projects/policicue", title: "Policicue Project", seoHeading: "Policicue", metaDescription: "Policicue project details.", metaKeywords: "policicue" },
          { page: "/projects/indus", title: "Indus Project", seoHeading: "Indus", metaDescription: "Indus project details.", metaKeywords: "indus" },
          { page: "/projects/frd-nutrition", title: "FRD Nutrition", seoHeading: "FRD Nutrition", metaDescription: "FRD Nutrition project details.", metaKeywords: "frd nutrition" },
          { page: "/projects/hitech-homes", title: "HiTech Homes", seoHeading: "HiTech Homes", metaDescription: "HiTech Homes project details.", metaKeywords: "hitech homes" },
          { page: "/projects/sanjeevni-hospital", title: "Sanjeevni Hospital", seoHeading: "Sanjeevni Hospital", metaDescription: "Sanjeevni Hospital project details.", metaKeywords: "sanjeevni" },
          { page: "/projects/rohtak-shoe", title: "Rohtak Shoe", seoHeading: "Rohtak Shoe", metaDescription: "Rohtak Shoe project details.", metaKeywords: "rohtak shoe" },
          { page: "/careers", title: "Careers at Avani", seoHeading: "Careers", metaDescription: "Open positions and careers at Avani.", metaKeywords: "careers, jobs" },
          { page: "/newsletters", title: "Newsletters | Avani Enterprises", seoHeading: "Our Newsletters", metaDescription: "Stay updated with Avani Enterprises newsletters.", metaKeywords: "newsletters, updates" },
        ];

        for (const entry of defaultEntries) {
          const exists = await Seo.findOne({ page: entry.page, section: entry.section || "" });
          if (!exists) {
            await Seo.create(entry);
            console.log(`Seeded SEO for ${entry.page}`);
          }
        }
      } catch (err) {
        console.error("Error seeding SEO entries:", err.message || err);
      }
    };

    // Run seed but don't block server start
    seedSeoEntries();
  })
  .catch((err) => console.log(err));

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Say at boot whether lead notifications can actually be delivered. Without
// this, a missing FROM_EMAIL means every lead saves, every visitor sees a
// success message, and nobody is ever told — with nothing in the logs to show
// for it. Printed once, on every deploy.
{
  const s = emailStatus();
  if (s.ok) {
    console.log(`📧 Lead notifications ON — from ${s.from}, to: ${s.to.join(", ")}`);
  } else {
    console.error("🔴 LEAD NOTIFICATIONS ARE OFF. Leads will save but nobody will be emailed.");
    s.problems.forEach((p) => console.error(`   • ${p}`));
  }
}

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied - No token provided",
      hint: "Please include Authorization header with Bearer token"
    });
  }

  try {
    const tokenValue = token.replace("Bearer ", "");
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        hint: "Please login again to get a new token"
      });
    }

    // 401, not 400. The request is well-formed; the CREDENTIAL is not valid,
    // which is exactly what 401 means. It also matters practically: the admin
    // app clears its session and redirects to login on 401 only, so returning
    // 400 left anyone holding a token signed with an older JWT_SECRET
    // permanently stuck on "Invalid token format" with no way to recover —
    // the app never logged them out and never let them log back in.
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Your session is no longer valid. Please sign in again.",
        hint: "The token was signed with a different key, or is malformed.",
        error: err.message
      });
    }

    return res.status(400).json({
      message: "Invalid Token",
      error: err.message
    });
  }
};

// --- AUTH ROUTES ---

// generate 6 digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Signup - Step 1: Validate Admin Code, Create User (Unverified), Send OTP
app.post("/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 2. Check if user exists
    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();

    if (user && !user.isVerified) {
      // Update existing unverified user
      user.name = name;
      user.password = hashedPassword;
      user.otp = otp;
      user.otpExpires = Date.now() + 600000; // 10 mins
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpires: Date.now() + 600000,
        isVerified: false,
      });
    }

    // 3. Send OTP
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Your Signup Verification OTP",
      html: `<h3>Your OTP is: <span style="color:#4F46E5; font-size: 20px;">${otp}</span></h3><p>Valid for 10 minutes.</p>`,
    };

    if (process.env.FROM_EMAIL) {
      try {
        await sgMail.send(msg);
      } catch (err) {
        console.error("SendGrid Error:", err.message);
        console.log(`Fallback OTP for ${email}: ${otp}`);
      }
    } else {
      console.log(`OTP for ${email}: ${otp}`);
    }

    res.status(200).json({ message: "OTP sent to email. Please verify." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Signup - Step 2: Verify OTP
app.post("/auth/verify-signup", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified)
      return res
        .status(400)
        .json({ message: "User already verified. Please login." });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      token,
      user: { name: user.name, email: user.email },
      message: "Account verified successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ── Progressive lockout ─────────────────────────────────────────────────
    // Keyed on email + hashed IP together, so an attacker hammering one account
    // from elsewhere cannot lock the real admin out of their own location.
    // 1st failure 2 min, then 5, 10, and 30 for every failure after that.
    const lock = await loginSecurity.checkLock({
      email,
      ipHash: requestContext.hashIp(requestContext.clientIp(req)),
    });
    if (lock.locked) {
      // Recorded so a sustained attack is visible in the log, but no email —
      // otherwise an attacker could flood the inbox by holding down the button.
      return res.status(429).json({
        message: `Too many failed attempts. Try again in ${lock.minutesLeft} minute${lock.minutesLeft === 1 ? "" : "s"}.`,
        lockedUntil: lock.until,
        minutesLeft: lock.minutesLeft,
      });
    }

    // A failure returns the same message whichever check failed, so the
    // response cannot be used to enumerate which emails exist.
    const fail = async (reason) => {
      const r = await loginSecurity.recordFailure({ email, reason, req });
      return res.status(400).json({
        message: "Invalid email or password",
        attemptsBeforeLock: r.locked ? 0 : undefined,
        lockedUntil: r.locked ? r.until : undefined,
        minutesLeft: r.locked ? r.minutesLeft : undefined,
      });
    };

    const user = await User.findOne({ email });
    if (!user) return fail("no-user");
    if (!user.isVerified) return fail("unverified");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return fail("bad-password");

    // Successful logins are logged with their location too, not just failures —
    // an unexpected city on a SUCCESSFUL login is the signal that matters most.
    await loginSecurity.recordSuccess({ email, req });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Forgot Password - Step 1: Send OTP
app.post("/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = generateOTP();

    // Set otp and expiry
    user.otp = otp;
    user.otpExpires = Date.now() + 600000; // 10 mins
    await user.save();

    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Password Reset OTP",
      html: `<h3>Your Password Reset OTP is: <span style="color:#4F46E5; font-size: 20px;">${otp}</span></h3><p>Valid for 10 minutes.</p>`,
    };

    if (process.env.FROM_EMAIL) {
      try {
        await sgMail.send(msg);
      } catch (err) {
        console.error("SendGrid Error:", err.message);
        console.log(`Fallback Reset OTP for ${email}: ${otp}`);
      }
    } else {
      console.log(`Reset OTP for ${email}: ${otp}`);
    }

    res.status(200).json({ message: "OTP sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Reset Password - Step 2: Verify OTP and Reset
app.post("/auth/reset-password-otp", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- DATA ROUTES ---

// Get All Leads (Protected)
app.get("/leads", authMiddleware, async (req, res) => {
  try {
    // Sort by newest first
    const leads = await Form.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * Update lead status
 * PATCH /leads/:id
 * body example:
 * { "status": "contacted" }
 */
app.patch("/leads/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    // Build update object
    const updateData = {};
    if (status) {
      // ✅ UPDATED: include "interested" in allowed statuses
      const allowedStatuses = [
        "not interested",
        "contacted",
        "not responded",
        "interested",
        "converted",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(404).json({
          message:
            'status should be one of ["not interested", "contacted", "not responded", "interested", "converted"]',
        });
      }
      updateData.status = status;
    }

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const lead = await Form.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (err) {
    console.error("Error updating lead:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE lead (Admin)
//
// This used to delete from the `Lead` collection while GET /leads reads from
// `Form`. Different collections, so every delete returned 404 and nothing was
// ever removed. It must be Form to match the read.
app.delete("/leads/:id", authMiddleware, async (req, res) => {
  try {
    const lead = await Form.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ success: true, message: "Lead deleted successfully" });
  } catch (err) {
    console.error("Error deleting lead:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Submit Form (Public)
app.post("/submit-form", async (req, res) => {
  try {
    // Support both old & new frontend shape:
    // - name, email, phone, service, businessCategory
    // - name, email, phone, services (array), notes
    const {
      name,
      email,
      cityState,
      phone,
      services,
      service,
      businessCategory,
      notes,
      source, // ✅ extract source
      // Where the lead actually came from. The form now sends these so the
      // notification email can say "this came from /blog/<post>" rather than
      // just "web", which is what makes page-level attribution usable.
      pagePath,
      pageUrl,
      referrer
    } = req.body;
    console.log('📝 FORM SUBMISSION RECEIVED:');
    console.log('req.body:', JSON.stringify(req.body, null, 2));
    console.log('extracted source:', source);
    console.log('services:', services, service)

    // Ensure services is an array
    let servicesArray = [];
    if (Array.isArray(services)) {
      servicesArray = services;
    } else if (Array.isArray(service)) {
      servicesArray = service;
    } else if (service) {
      servicesArray = [service];
    }
    console.log('service ara: ', servicesArray)

    const finalNotes = notes || businessCategory || "";

    const primaryService = servicesArray[0] || "";

    // Same Referer fallback as /avani-form, so a lead never lands with an
    // origin of "not recorded" just because a form forgot to send one.
    const leadOrigin = requestContext.originFromRequest(req, req.body);

    // 1. Save form data (includes services array and notes)
    const newForm = await Form.create({
      name,
      email,
      cityState,
      phone,
      services: servicesArray,
      service: primaryService,
      notes: finalNotes,
      // ✅ UPDATED: default status aligned with frontend dropdown
      status: "not responded",
      contacted: false,
      source: source || "web-dev", // ✅ Save source
      // Derived, with a Referer fallback — see requestContext.originFromRequest.
      pagePath: leadOrigin.pagePath,
      pageUrl: leadOrigin.pageUrl,
      referrer: leadOrigin.referrer,
      // First-touch attribution from the visitor's entry page. Read straight off
      // req.body rather than re-derived: only the browser knows which page the
      // session actually started on.
      landingPage: (req.body.landingPage || "").slice(0, 300),
      utmSource: (req.body.utmSource || "").slice(0, 200),
      utmMedium: (req.body.utmMedium || "").slice(0, 200),
      utmCampaign: (req.body.utmCampaign || "").slice(0, 200),
      utmTerm: (req.body.utmTerm || "").slice(0, 200),
      utmContent: (req.body.utmContent || "").slice(0, 200),
      gclid: (req.body.gclid || "").slice(0, 200),
      fbclid: (req.body.fbclid || "").slice(0, 200),
      visitorId: (req.body.visitorId || "").slice(0, 100),
      isSpam: looksLikeSpam({ name, email, company: cityState }),
    });

    // 2. Notification email — one shared template for every lead the site
    //    produces (services/leadEmail.js), so a contact enquiry and a
    //    service-page lead arrive looking identical. sohamdang0@gmail.com is
    //    always copied, hardcoded there so a missing env var cannot silently
    //    stop notifications reaching a person.
    if (!newForm.isSpam) {
      sendLeadEmail({
        kind: "Lead",
        name,
        email,
        phone,
        company: cityState,
        service: primaryService,
        message: finalNotes,
        source: source || "lead_form",
        pagePath: leadOrigin.pagePath,
        pageUrl: leadOrigin.pageUrl,
        referrer: leadOrigin.referrer,
        landingPage: req.body.landingPage,
        utmSource: req.body.utmSource,
        utmMedium: req.body.utmMedium,
        utmCampaign: req.body.utmCampaign,
        gclid: req.body.gclid,
        fbclid: req.body.fbclid,
      }).catch(() => { /* leadEmail logs; never break the response */ });
    }


    res.status(200).json({
      message: "Form stored & email sent via SendGrid!",
      data: newForm,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




/**
 * Cheap spam heuristic for public form submissions.
 *
 * Three of the eight consultation requests received to date were bots posting
 * names like "FmLlIiUPSbHUJtsoy" and "QHtbawjXHPIErKEPpKKBQoRF" — long, no
 * spaces, case flipping every few characters. Real names do not look like that.
 *
 * Deliberately conservative, and it FLAGS rather than rejects: a false positive
 * should cost a click in the admin, never a customer. The submission is still
 * stored and still visible; it just does not trigger a notification email.
 */
function looksLikeSpam({ name, email, company }) {
  const gibberish = (s) => {
    const v = String(s || "").trim();
    if (v.length < 14 || /\s/.test(v)) return false;      // real names have spaces or are short
    if (!/[a-z]/.test(v) || !/[A-Z]/.test(v)) return false; // needs mixed case
    // Count case flips. "FmLlIiUPSbHUJtsoy" flips ~10 times; "Ravikumar" zero.
    let flips = 0;
    for (let i = 1; i < v.length; i++) {
      const a = v[i - 1], b = v[i];
      if (/[a-zA-Z]/.test(a) && /[a-zA-Z]/.test(b) &&
          (a === a.toUpperCase()) !== (b === b.toUpperCase())) flips++;
    }
    return flips >= 5;
  };

  if (gibberish(name) || gibberish(company)) return true;

  // Gmail ignores dots, so bots spin one mailbox into thousands of addresses:
  // "c.oqem.at.oq.5.5@gmail.com". A real address has one dot, occasionally two.
  const local = String(email || "").trim().split("@")[0] || "";
  if (local.split(".").length - 1 >= 4) return true;

  return false;
}

const submitForm = async (req, res) => {
  try {
    // 2. Destructure data for clarity
    const {
      fullName,
      email,
      phoneNu,
      service,
      companyName,
      projectDetails,
      otherService,
      pagePath,
      pageUrl,
      referrer,
    } = req.body;

    const spam = looksLikeSpam({ name: fullName, email, company: companyName });

    // Five different components post to this endpoint. Rather than trust each
    // of them to send the origin, derive it here, falling back to the Referer
    // header the browser sends anyway.
    const origin = requestContext.originFromRequest(req, req.body);

    // 3. Create new entry
    const newEntry = await AvaniForm.create({
      fullName,
      email,
      phoneNu,
      service,
      companyName,
      projectDetails,
      otherService,
      pagePath: origin.pagePath,
      pageUrl: origin.pageUrl,
      referrer: origin.referrer,
      isSpam: spam,
    });

    // 4. Notification — the same template /submit-form uses, so a contact
    //    enquiry and a service-page lead arrive looking identical and both
    //    always reach sohamdang0@gmail.com. Skipped for flagged spam so the
    //    inbox stays usable; the record is still stored and visible in admin.
    if (!spam) {
      sendLeadEmail({
        kind: "Consultation request",
        name: fullName,
        email,
        phone: phoneNu,
        company: companyName,
        service: [service, otherService].filter(Boolean).join(" · "),
        message: projectDetails,
        source: "contact form",
        pagePath: origin.pagePath,
        pageUrl: origin.pageUrl,
        referrer: origin.referrer,
      }).catch(() => { /* sendLeadEmail already logs; never break the response */ });
    }

    res.status(201).json({
      success: true,
      message: "Form stored & email sent via SendGrid!",
      data: {
        id: newEntry._id,
        fullName: newEntry.fullName,
        createdAt: newEntry.createdAt,
      },
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
      error: error.message,
    });
  }
};

app.post("/avani-form", submitForm);


const getAllForms = async (req, res) => {
  try {
    // 1. Pagination Setup
    // Get page and limit from query params, default to Page 1 and 10 items per page
    const page = parseInt(req.query.page) || 1;
    // Was 10, which silently hid every submission past the tenth from an admin
    // page that never sends a limit.
    const limit = parseInt(req.query.limit) || 500;
    const skipIndex = (page - 1) * limit;

    // 2. Fetch Data
    // .find() gets the data
    // .sort({ createdAt: -1 }) shows newest entries first
    // .limit() and .skip() handle the pagination
    const forms = await AvaniForm.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .lean(); // .lean() converts Mongoose docs to plain JS objects (faster performance)

    // 3. Get Total Count (for frontend pagination UI)
    const totalDocs = await AvaniForm.countDocuments();

    // 4. Send Response
    res.status(200).json({
      success: true,
      count: forms.length,
      pagination: {
        totalRecords: totalDocs,
        totalPages: Math.ceil(totalDocs / limit),
        currentPage: page,
        perPage: limit
      },
      data: forms,
    });

  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not fetch data.",
    });
  }
};
// Reading submissions is admin-only. This was open to the public internet,
// which served every enquirer's name, email and phone to anyone who asked.
app.get("/avani-form", authMiddleware, getAllForms);

// Update avani-form notes (PATCH)
app.patch("/avani-form/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const updatedForm = await AvaniForm.findByIdAndUpdate(
      id,
      { notes },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notes updated successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Error updating notes:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not update notes.",
    });
  }
});

// --- GROWTH PLAN LEADS ---
app.post("/growth-plan-leads", async (req, res) => {
  try {
    const lead = new GrowthPlanLead(req.body);
    await lead.save();

    // This endpoint saved leads and notified nobody. Low volume, but a lead
    // that lands in a collection with no alert is a lead nobody answers.
    sendLeadEmail({
      kind: "Growth plan lead",
      name: [lead.firstName, lead.lastName].filter(Boolean).join(" "),
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      service: [lead.plan, lead.service].filter(Boolean).join(" · "),
      message: lead.goals,
      source: "growth plan form",
      pagePath: req.body.pagePath,
      pageUrl: req.body.pageUrl,
      referrer: req.body.referrer,
      landingPage: req.body.landingPage,
    }).catch(() => { /* leadEmail logs; never break the response */ });

    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: "Failed to create lead", error: err.message });
  }
});

app.patch("/growth-plan-leads/:id/status", async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updateData = {};
    if (status) updateData.paymentStatus = status;
    if (notes !== undefined) updateData.notes = notes;

    const lead = await GrowthPlanLead.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json(lead);
  } catch (err) {
    res.status(400).json({ message: "Failed to update lead", error: err.message });
  }
});

// Admin-only for the same reason as /avani-form above.
app.get("/growth-plan-leads", authMiddleware, async (req, res) => {
  try {
    const leads = await GrowthPlanLead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leads", error: err.message });
  }
});

// --- GENERAL LEADS ---
//
// A second, UNAUTHENTICATED set of /leads GET/POST/PATCH/DELETE handlers used
// to live here, reading the `Lead` collection. Express matches the first route
// registered, so they were unreachable dead code — but they were one route
// reorder away from exposing every lead publicly and allowing anonymous
// deletes. The live handlers are the authenticated ones above, on `Form`.

// DELETE growth plan lead (Admin)
app.delete("/growth-plan-leads/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await GrowthPlanLead.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, message: "Lead deleted successfully" });
  } catch (err) {
    console.error("Error deleting growth plan lead:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// DELETE avani-form (Admin)
app.delete("/avani-form/:id", authMiddleware, async (req, res) => {
  try {
    const deletedForm = await AvaniForm.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Form submission deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({
      success: false,
      message: "Server Error. Could not delete form submission.",
    });
  }
});

// ==========================================
// CAREER PAGE - JOB MANAGEMENT ROUTES
// ==========================================

// --- ADMIN ROUTES (Protected) ---

// 1. CREATE new job (Admin only)
app.post("/admin/jobs", authMiddleware, async (req, res) => {
  try {
    console.log("\n=== JOB CREATION REQUEST ===");
    console.log("User ID:", req.user?._id);
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const {
      title,
      department,
      location,
      type,
      experience,
      description,
      responsibilities,
      qualifications,
      skills,
      benefits,
      status,
      isActive,
    } = req.body;

    // Validate required fields
    if (!title || !department || !location || !experience || !description) {
      console.error("❌ Missing required fields");
      return res.status(400).json({
        message: "Missing required fields",
        required: ["title", "department", "location", "experience", "description"],
        received: { title: !!title, department: !!department, location: !!location, experience: !!experience, description: !!description }
      });
    }

    if (!responsibilities || !Array.isArray(responsibilities) || responsibilities.length === 0) {
      console.error("❌ Invalid responsibilities:", responsibilities);
      return res.status(400).json({
        message: "Responsibilities must be a non-empty array",
        received: { type: typeof responsibilities, isArray: Array.isArray(responsibilities), value: responsibilities }
      });
    }

    if (!qualifications || !Array.isArray(qualifications) || qualifications.length === 0) {
      console.error("❌ Invalid qualifications:", qualifications);
      return res.status(400).json({
        message: "Qualifications must be a non-empty array",
        received: { type: typeof qualifications, isArray: Array.isArray(qualifications), value: qualifications }
      });
    }

    console.log("✅ Validation passed, creating job...");

    const jobData = {
      title,
      department,
      location,
      type: type || "Full-time",
      experience,
      description,
      responsibilities,
      qualifications,
      skills: skills || [],
      benefits: benefits || [],
      status: status || "Active",
      isActive: isActive !== undefined ? isActive : true,
      postedBy: req.user._id,
    };

    console.log("Job data to save:", JSON.stringify(jobData, null, 2));

    const newJob = await Job.create(jobData);

    console.log("✅ Job created successfully!");
    console.log("Job ID:", newJob._id);
    console.log("Title:", newJob.title);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (err) {
    console.error("\n❌ ERROR CREATING JOB:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Stack trace:", err.stack);

    if (err.name === 'ValidationError') {
      console.error("Validation errors:", err.errors);
      return res.status(400).json({
        message: "Validation error",
        error: err.message,
        details: Object.keys(err.errors).map(key => ({
          field: key,
          message: err.errors[key].message
        }))
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message,
      name: err.name
    });
  }
});

// 2. GET all jobs (Admin - includes inactive)
app.get("/admin/jobs", authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    // Get application count for each job
    const jobsWithCount = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Application.countDocuments({
          jobId: job._id,
        });
        return {
          ...job.toObject(),
          applicationCount,
        };
      })
    );

    res.json({
      success: true,
      count: jobsWithCount.length,
      data: jobsWithCount,
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 3. GET single job by ID (Admin)
app.get("/admin/jobs/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicationCount = await Application.countDocuments({
      jobId: job._id,
    });

    res.json({
      success: true,
      data: { ...job.toObject(), applicationCount },
    });
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 4. UPDATE job (Admin)
app.put("/admin/jobs/:id", authMiddleware, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 5. DELETE job (Admin)
app.delete("/admin/jobs/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 6. TOGGLE job status (Activate/Deactivate)
app.patch("/admin/jobs/:id/toggle", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.isActive = !job.isActive;
    await job.save();

    res.json({
      success: true,
      message: `Job ${job.isActive ? "activated" : "deactivated"} successfully`,
      data: job,
    });
  } catch (err) {
    console.error("Error toggling job status:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --- PUBLIC ROUTES (Career Page) ---

// 7. GET all jobs (Public - for career page) - Returns ALL jobs including inactive
app.get("/jobs", async (req, res) => {
  try {
    const { department, location, type, search } = req.query;

    // Build filter - no status restriction to show all jobs
    const filter = {};

    if (department) filter.department = department;
    if (location) filter.location = location;
    if (type) filter.type = type;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await Job.find(filter)
      .select("-postedBy")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 8. GET single job details (Public - any status)
app.get("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).select("-postedBy");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 9. GET filled/closed jobs (Public)
app.get("/jobs-closed", async (req, res) => {
  try {
    const jobs = await Job.find({
      status: { $in: ["Filled", "Closed"] },
    })
      .select("title department location status createdAt")
      .sort({ updatedAt: -1 })
      .limit(20);

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (err) {
    console.error("Error fetching closed jobs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ==========================================
// BLOG ROUTES
// ==========================================

// Public: Get all published blogs (with optional pagination)
app.get("/blogs", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    // ── The drip ────────────────────────────────────────────────────────────
    // Scheduled posts are stored with isPublished:true and a FUTURE
    // publishedAt. This filter is the entire scheduling mechanism: a post stays
    // invisible until its date arrives, then appears on its own. No cron, no
    // scheduler process, nothing to keep alive.
    //
    // Safe for the existing corpus — all 52 posts already carry a past
    // publishedAt, so none are hidden by adding this. A post with publishedAt
    // unset would be excluded, which is why the seeder always sets it.
    const filter = { isPublished: true, publishedAt: { $lte: new Date() } };
    console.log(`Fetching blogs (page: ${page}, limit: ${limit})...`);

    const items = await Blog.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Blog.countDocuments(filter);
    console.log(`Found ${items.length} blogs out of ${total}`);

    res.json({ success: true, count: items.length, pagination: { total, page, perPage: limit }, data: items });
  } catch (err) {
    console.error("❌ Blogs Fetch Error:", err);
    res.status(500).json({ message: "Server error", error: err.message, stack: process.env.NODE_ENV === "development" ? err.stack : undefined });
  }
});

// Public: Get blog by slug
app.get("/blogs/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Same drip filter as the list. Without it here, a scheduled post would be
    // hidden from the index but still reachable by guessing its URL — and, more
    // importantly, still server-rendered and indexable by Google before its
    // date, which defeats the whole point.
    const live = { isPublished: true, publishedAt: { $lte: new Date() } };

    // Resolve by slug first, then fall back to _id so articles always open
    // even if a slug contains special characters or is missing.
    let blog = await Blog.findOne({ slug, ...live });
    if (!blog && mongoose.Types.ObjectId.isValid(slug)) {
      blog = await Blog.findOne({ _id: slug, ...live });
    }
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // increment views asynchronously
    Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } }).catch((e) => console.error(e));

    res.json({ success: true, data: blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Blog engagement — likes and comments
//
// Views already increment on GET /blogs/:slug. These add the other two signals
// shown on the post and the blog index.
//
// Comments are held for approval rather than published immediately. An open
// comment form on a site recovering from a content-quality demotion is a
// spam-link liability, and unmoderated outbound links are exactly what Google's
// link-spam systems act on.
// ─────────────────────────────────────────────────────────────────────────────

/** Resolve a post by slug, falling back to _id. Shared by the routes below. */
async function findPublishedBlog(slug) {
  let blog = await Blog.findOne({ slug, isPublished: true });
  if (!blog && mongoose.Types.ObjectId.isValid(slug)) {
    blog = await Blog.findOne({ _id: slug, isPublished: true });
  }
  return blog;
}

// Public: like a post. Idempotency is handled client-side via localStorage —
// good enough for a vanity counter, and it avoids storing visitor identifiers.
app.post("/blogs/:slug/like", async (req, res) => {
  try {
    const blog = await findPublishedBlog(req.params.slug);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const delta = req.body && req.body.unlike ? -1 : 1;
    const updated = await Blog.findByIdAndUpdate(
      blog._id,
      { $inc: { likes: delta } },
      { new: true }
    );
    // Never report a negative count if unlikes get out of step.
    const likes = Math.max(0, updated.likes || 0);
    res.json({ success: true, data: { likes } });
  } catch (err) {
    console.error("Error liking blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Public: approved comments for a post.
app.get("/blogs/:slug/comments", async (req, res) => {
  try {
    const blog = await findPublishedBlog(req.params.slug);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comments = (blog.comments || [])
      .filter((c) => c.approved)
      .map((c) => ({ name: c.name, body: c.body, createdAt: c.createdAt }))
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.json({ success: true, data: comments });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Public: submit a comment. Held unapproved until a moderator releases it.
app.post("/blogs/:slug/comments", async (req, res) => {
  try {
    const { name, email, body, website } = req.body || {};

    // Honeypot: a hidden field real users never fill. Silently accept so bots
    // do not learn they were caught.
    if (website) return res.json({ success: true, data: { pending: true } });

    if (!name || !body) return res.status(400).json({ message: "Name and comment are required" });
    if (String(body).length > 2000) return res.status(400).json({ message: "Comment is too long" });
    // Comments containing links are almost entirely spam on a site like this.
    if (/https?:\/\//i.test(body)) return res.status(400).json({ message: "Links are not allowed in comments" });

    const blog = await findPublishedBlog(req.params.slug);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await Blog.findByIdAndUpdate(blog._id, {
      $push: {
        comments: {
          name: String(name).slice(0, 80),
          email: String(email || "").slice(0, 160),
          body: String(body).slice(0, 2000),
          approved: false,
          createdAt: new Date(),
        },
      },
    });

    res.json({ success: true, data: { pending: true } });
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: list pending comments across all posts, for moderation.
app.get("/admin/blogs/comments/pending", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ "comments.approved": false }, "title slug comments");
    const pending = [];
    blogs.forEach((b) => {
      (b.comments || []).forEach((c) => {
        if (!c.approved) {
          pending.push({
            blogId: b._id, blogTitle: b.title, blogSlug: b.slug,
            commentId: c._id, name: c.name, email: c.email,
            body: c.body, createdAt: c.createdAt,
          });
        }
      });
    });
    res.json({ success: true, data: pending });
  } catch (err) {
    console.error("Error listing pending comments:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: approve or delete a comment.
app.patch("/admin/blogs/:blogId/comments/:commentId", authMiddleware, async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const approve = !(req.body && req.body.approve === false);

    if (req.body && req.body.remove) {
      await Blog.findByIdAndUpdate(blogId, { $pull: { comments: { _id: commentId } } });
      return res.json({ success: true, data: { removed: true } });
    }

    await Blog.updateOne(
      { _id: blogId, "comments._id": commentId },
      { $set: { "comments.$.approved": approve } }
    );
    res.json({ success: true, data: { approved: approve } });
  } catch (err) {
    console.error("Error moderating comment:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Create blog
app.post("/admin/blogs", authMiddleware, async (req, res) => {
  try {
    const { title, slug, excerpt, content, author, tags, featuredImage, isPublished } = req.body;
    if (!title || !slug) return res.status(400).json({ message: "Title and slug are required" });

    const exists = await Blog.findOne({ slug });
    if (exists) return res.status(400).json({ message: "Slug already exists" });

    const blog = await Blog.create({ title, slug, excerpt, content, author, tags, featuredImage, isPublished, publishedAt: isPublished ? new Date() : null });
    res.status(201).json({ success: true, message: "Blog created", data: blog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Get all blogs (incl. unpublished)
app.get("/admin/blogs", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    console.error("Error fetching admin blogs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Get single blog by id
app.get("/admin/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Update blog
app.put("/admin/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.isPublished) updates.publishedAt = updates.publishedAt || new Date();
    const updated = await Blog.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Blog not found" });
    res.json({ success: true, message: "Blog updated", data: updated });
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Delete blog
app.delete("/admin/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });
    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --- NEWSLETTER ROUTES ---

// Image upload for newsletters (uses Cloudinary for persistent storage)
app.post("/admin/upload-image", authMiddleware, imageUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  // Return the full Cloudinary URL for persistent access
  const imageUrl = req.file.path || req.file.secure_url || req.file.url;
  res.json({ success: true, imageUrl });
});

// Newsletter public routes moved to top

// Admin: Get all newsletters
app.get("/admin/newsletters", authMiddleware, async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json({ success: true, data: newsletters });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Create newsletter
app.post("/admin/newsletters", authMiddleware, async (req, res) => {
  try {
    const { title, slug, content, imageUrl, isPublished } = req.body;
    const newsletter = await Newsletter.create({
      title,
      slug,
      content,
      imageUrl,
      isPublished,
      publishedAt: isPublished ? new Date() : null
    });
    res.status(201).json({ success: true, data: newsletter });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Update newsletter
app.put("/admin/newsletters/:id", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.isPublished && !updates.publishedAt) updates.publishedAt = new Date();
    const updated = await Newsletter.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "Newsletter not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Delete newsletter
app.delete("/admin/newsletters/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Newsletter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Newsletter not found" });
    res.json({ success: true, message: "Newsletter deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ==========================================
// APPLICATION MANAGEMENT ROUTES
// ==========================================

// 10. SUBMIT application (Public) - with file upload
app.post("/applications", upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "coverLetter", maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      currentLocation,
      linkedinProfile,
      portfolioWebsite,
      positionAppliedFor,
      experience,
      currentCompany,
      currentDesignation,
      currentCTC,
      expectedCTC,
      noticePeriod,
      highestQualification,
      otherQualification,
      coverLetterText,
      howDidYouHear,
      willingToRelocate,
      additionalComments,
    } = req.body;

    // Validate job exists (allow applications for all jobs, not just active)
    let job = null;
    if (jobId && mongoose.Types.ObjectId.isValid(jobId)) {
      job = await Job.findOne({ _id: jobId });
    }

    // Get file URLs - use relative paths for database storage
    const resumeUrl = req.files?.resume
      ? `/uploads/${req.files.resume[0].filename}`
      : null;

    const coverLetterUrl = req.files?.coverLetter
      ? `/uploads/${req.files.coverLetter[0].filename}`
      : null;

    if (!resumeUrl) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // Create application
    const newApplication = await Application.create({
      jobId: (jobId && mongoose.Types.ObjectId.isValid(jobId)) ? jobId : null,
      fullName,
      email,
      phone,
      currentLocation,
      linkedinProfile,
      portfolioWebsite,
      positionAppliedFor: positionAppliedFor || (job ? job.title : "General Application"),
      experience,
      currentCompany,
      currentDesignation,
      currentCTC,
      expectedCTC,
      noticePeriod,
      highestQualification,
      otherQualification,
      resumeUrl,
      coverLetterUrl,
      coverLetterText,
      howDidYouHear,
      willingToRelocate,
      additionalComments,
      status: "New",
    });

    // Send confirmation email to candidate
    if (process.env.FROM_EMAIL) {
      const jobTitle = job ? job.title : (positionAppliedFor || "General Application");
      const candidateMsg = {
        to: email,
        from: process.env.FROM_EMAIL,
        subject: `Application Received - ${jobTitle}`,
        html: `
          <h2>Thank you for applying!</h2>
          <p>Dear ${fullName},</p>
          <p>We have received your application${job ? ` for the position of <strong>${job.title}</strong>` : ''}.</p>
          <p>Our team will review your application and get back to you soon.</p>
          <br>
          <p>Best regards,<br>Avani Team</p>
        `,
      };
      sgMail.send(candidateMsg)
        .then(() => {
          console.log(`✅ Application Email sent to: ${email}`);
        })
        .catch((err) => console.error("Email error:", err));
    }

    // Send notification to admin
    if (process.env.ADMIN_EMAIL && process.env.FROM_EMAIL) {
      const jobTitle = job ? job.title : (positionAppliedFor || "General Application");
      const adminMsg = {
        to: process.env.ADMIN_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: `New Application: ${jobTitle}`,
        html: `
          <h2>New Job Application Received</h2>
          <p><strong>Position:</strong> ${jobTitle}</p>
          <p><strong>Candidate:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Location:</strong> ${currentLocation || "N/A"}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Current Company:</strong> ${currentCompany || "N/A"}</p>
          <p><strong>Current Designation:</strong> ${currentDesignation || "N/A"}</p>
          <p><strong>Qualification:</strong> ${highestQualification}</p>
          <p><strong>Notice Period:</strong> ${noticePeriod}</p>
          <p><strong>Resume:</strong> <a href="${resumeUrl}">Download</a></p>
          ${coverLetterUrl ? `<p><strong>Cover Letter:</strong> <a href="${coverLetterUrl}">Download</a></p>` : ''}
          <p>Login to admin panel to review the application.</p>
        `,
      };
      sgMail.send(adminMsg)
        .then(() => {
          console.log(`✅ Application Email sent to admin: ${process.env.ADMIN_EMAIL}`);
        })
        .catch((err) => console.error("Email error:", err));
    }

    res.status(201).json({
      success: true,
      message: "Application submitted successfully! We'll contact you soon.",
      data: newApplication,
    });
  } catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 11. GET all applications (Admin)
app.get("/admin/applications", authMiddleware, async (req, res) => {
  try {
    const { jobId, status, department, startDate, endDate, page = 1, limit = 20 } = req.query;

    // Build filter
    const filter = {};
    if (jobId) filter.jobId = jobId;
    if (status) filter.status = status;

    // Date range filter
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    let query = Application.find(filter)
      .populate("jobId", "title department location")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const applications = await query;

    // Filter by department if specified
    let filteredApplications = applications;
    if (department) {
      filteredApplications = applications.filter(
        (app) => app.jobId && app.jobId.department === department
      );
    }

    const totalCount = await Application.countDocuments(filter);

    res.json({
      success: true,
      count: filteredApplications.length,
      pagination: {
        totalRecords: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page),
        perPage: parseInt(limit),
      },
      data: filteredApplications,
    });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 12. GET single application details (Admin)
app.get("/admin/applications/:id", authMiddleware, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "jobId",
      "title department location type"
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Mark as viewed
    if (!application.viewedByAdmin) {
      application.viewedByAdmin = true;
      application.viewedAt = new Date();
      await application.save();
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (err) {
    console.error("Error fetching application:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 13. UPDATE application status (Admin)
app.patch("/admin/applications/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status, adminNotes, rating, sendEmail } = req.body;

    const application = await Application.findById(req.params.id).populate(
      "jobId",
      "title"
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update fields
    if (status) application.status = status;
    if (adminNotes !== undefined) application.adminNotes = adminNotes;
    if (rating !== undefined) application.rating = rating;

    await application.save();

    // Send email notification to candidate if requested
    if (sendEmail && process.env.FROM_EMAIL) {
      const statusMessages = {
        Screening: "Your application is currently under review.",
        Shortlisted: "Congratulations! You have been shortlisted for the next round.",
        Interview: "You have been selected for an interview. We will contact you soon with details.",
        Hired: "Congratulations! We are pleased to offer you the position.",
        Rejected: "Thank you for your interest. Unfortunately, we have decided to move forward with other candidates.",
      };

      const msg = {
        to: application.email,
        from: process.env.FROM_EMAIL,
        subject: `Application Update - ${application.jobId.title}`,
        html: `
          <h2>Application Status Update</h2>
          <p>Dear ${application.fullName},</p>
          <p>${statusMessages[status] || "Your application status has been updated."}</p>
          <p><strong>Position:</strong> ${application.jobId.title}</p>
          <p><strong>Status:</strong> ${status}</p>
          <br>
          <p>Best regards,<br>Avani Team</p>
        `,
      };
      sgMail.send(msg).catch((err) => console.error("Email error:", err));
    }

    res.json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (err) {
    console.error("Error updating application:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 14. DELETE application (Admin)
app.delete("/admin/applications/:id", authMiddleware, async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting application:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 15. GET analytics dashboard data (Admin)
app.get("/admin/analytics/career", authMiddleware, async (req, res) => {
  try {
    // Total jobs
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ isActive: true, status: "Active" });
    const filledJobs = await Job.countDocuments({ status: "Filled" });

    // Total applications
    const totalApplications = await Application.countDocuments();

    // Applications by status
    const applicationsByStatus = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Applications per job
    const applicationsPerJob = await Application.aggregate([
      {
        $group: {
          _id: "$jobId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "_id",
          foreignField: "_id",
          as: "job",
        },
      },
      {
        $unwind: "$job",
      },
      {
        $project: {
          jobTitle: "$job.title",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    // Recent applications
    const recentApplications = await Application.find()
      .populate("jobId", "title department")
      .sort({ createdAt: -1 })
      .limit(10)
      .select("fullName email status createdAt jobId");

    // Applications trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const applicationsTrend = await Application.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalJobs,
          activeJobs,
          filledJobs,
          totalApplications,
        },
        applicationsByStatus,
        applicationsPerJob,
        recentApplications,
        applicationsTrend,
      },
    });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// =============================
// SEO ROUTES
// =============================

// Admin: Create SEO entry
app.post("/admin/seo", authMiddleware, async (req, res) => {
  try {
    const { page, section = "", title = "", seoHeading = "", metaDescription = "", metaKeywords = "" } = req.body;
    if (!page) return res.status(400).json({ message: "Page is required" });

    const entry = await Seo.create({ page, section, title, seoHeading, metaDescription, metaKeywords, updatedBy: req.user._id });
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    console.error("Error creating SEO entry:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Update SEO entry
app.put("/admin/seo/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updatedBy = req.user._id;
    const updated = await Seo.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "SEO entry not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Error updating SEO entry:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: Delete SEO entry
app.delete("/admin/seo/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Seo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "SEO entry not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("Error deleting SEO entry:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin: List all SEO entries (with optional page filter)
app.get("/admin/seo", authMiddleware, async (req, res) => {
  try {
    const { page } = req.query;
    const filter = page ? { page } : {};
    const entries = await Seo.find(filter).sort({ updatedAt: -1 });
    res.json({ success: true, count: entries.length, data: entries });
  } catch (err) {
    console.error("Error listing SEO entries:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Public: fetch SEO by page and optional section
app.get("/seo", async (req, res) => {
  try {
    let { page, section = "" } = req.query;
    if (!page) return res.status(400).json({ message: "page query param required" });

    // Normalize page path: trim and ensure leading slash
    page = page.trim();
    if (!page.startsWith('/')) page = '/' + page;

    let entry = null;

    let query = { 
      page: { $regex: new RegExp(`^${page}$`, 'i') }, 
      title: { $ne: "", $ne: null, $exists: true } 
    };

    // Robust Home page matching (handles /, home, or empty page field)
    if (page === "/" || page.toLowerCase() === "/home") {
      query = {
        $or: [
          { page: "/" },
          { page: "" },
          { page: "home" },
          { page: "/home" }
        ],
        title: { $ne: "", $ne: null, $exists: true }
      };
    }

    // 1. If section is provided, try exact match first
    if (section && section.trim() !== "") {
      entry = await Seo.findOne({ page, section }).sort({ updatedAt: -1 });
    }
    
    // 2. If no entry found yet (or no section provided), use the robust query
    if (!entry) {
      entry = await Seo.findOne(query).sort({ updatedAt: -1 });
    }

    // 3. Fallback to just the first/latest record for this page if nothing found with title
    if (!entry) {
      entry = await Seo.findOne({ page }).sort({ updatedAt: -1 });
    }

    if (!entry) {
      // Return 200 with defaults instead of 404 to keep console clean
      return res.json({ 
        success: true, 
        isDefault: true,
        data: {
          title: "Build high-performing Solutions & accelerate Growth.",
          seoHeading: "Build high-performing Solutions & accelerate Growth.",
          metaDescription: "No.1 Digital Marketing Agency in India, we deliver result-driven SEO, PPC, social media, and branding solutions.",
          metaKeywords: "digital marketing agency, seo services india, avani enterprises"
        } 
      });
    }
    res.json({ success: true, data: entry });
  } catch (err) {
    console.error("❌ SEO Fetch Error:", err);
    res.status(500).json({ 
      message: "Server error fetching SEO", 
      error: err.message, 
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined 
    });
  }
});

// 0. Dynamic Sitemap Route
app.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = "https://www.avanienterprises.in";
    const date = new Date().toISOString().split("T")[0];

    // Fetch dynamic data
    const seoPages = await Seo.find({ section: { $in: ["", null] } }).select("page updatedAt");
    const blogs = await Blog.find({ isPublished: true }).select("slug updatedAt");
    const newsletters = await Newsletter.find({ isPublished: true }).select("slug updatedAt");

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static & Managed Pages -->`;

    // Process SEO pages
    seoPages.forEach(item => {
      const priority = item.page === "/" ? "1.0" : "0.8";
      const changefreq = "monthly";
      const lastmod = item.updatedAt ? item.updatedAt.toISOString().split("T")[0] : date;
      
      // Prevent double slash if page starts with /
      const cleanPath = item.page.startsWith('/') ? item.page : `/${item.page}`;
      
      sitemap += `
  <url>
    <loc>${baseUrl}${cleanPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    // Process Blogs
    blogs.forEach(blog => {
      const lastmod = blog.updatedAt ? blog.updatedAt.toISOString().split("T")[0] : date;
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Process Newsletters
    newsletters.forEach(news => {
      const lastmod = news.updatedAt ? news.updatedAt.toISOString().split("T")[0] : date;
      sitemap += `
  <url>
    <loc>${baseUrl}/newsletters/${news.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Sitemap Generation Error:", error);
    res.status(500).send("Error generating sitemap");
  }
});

// Define frontend path (absolute path for reliability)
const frontendPath = path.resolve(__dirname, "../avani-connect-glow-main/dist");

// 1. Catch-all route for SEO injection (MUST be above express.static)
app.get(/.*/, async (req, res, next) => {
  try {
    let pagePath = req.path || "/";
    
    // CRITICAL: Skip SEO for ALL API-like routes immediately
    if (pagePath.startsWith("/newsletters") || pagePath.startsWith("/blogs") || pagePath.startsWith("/seo") || pagePath.startsWith("/api") || pagePath.startsWith("/auth")) {
      return next();
    }
    
    // Skip SEO injection for assets (files with extensions)
    if (pagePath.includes(".") && !pagePath.endsWith(".html")) {
      return next();
    }

    // Normalize path for lookup
    pagePath = pagePath.trim();
    if (!pagePath.startsWith('/')) pagePath = '/' + pagePath;
    // Remove trailing slash except for root
    if (pagePath.length > 1 && pagePath.endsWith('/')) pagePath = pagePath.slice(0, -1);

    console.log(`🔍 SEO Injection triggered for: ${pagePath}`);

    // Fetch SEO data from MongoDB using the same logic as /seo endpoint (case-insensitive)
    // For the home page (/), we also look for "home" or empty string entries
    let query = { 
      page: { $regex: new RegExp(`^${pagePath}$`, 'i') },
      title: { $ne: "", $ne: null, $exists: true }
    };

    if (pagePath === "/") {
      query = {
        $or: [
          { page: "/" },
          { page: "" },
          { page: "home" },
          { page: "/home" }
        ],
        title: { $ne: "", $ne: null, $exists: true }
      };
    }

    let seo = await Seo.findOne(query).sort({ updatedAt: -1 });

    if (!seo) {
      seo = await Seo.findOne({ 
        page: { $regex: new RegExp(`^${pagePath}$`, 'i') } 
      }).sort({ updatedAt: -1 });
    }

    // Global Fallback to home if page not found
    if (!seo && pagePath !== "/") {
      seo = await Seo.findOne({ page: "/" }).sort({ updatedAt: -1 });
    }

    const indexPath = path.join(frontendPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      return next();
    }

    let html = fs.readFileSync(indexPath, "utf8");

    // Default values
    const title = seo?.title || "Build high-performing Solutions & accelerate Growth.";
    const seoHeading = seo?.seoHeading || "Build high-performing Solutions & accelerate Growth.";
    const description = seo?.metaDescription || "No.1 Digital Marketing Agency in India, we deliver result-driven SEO, PPC, social media, and branding solutions.";
    const keywords = seo?.metaKeywords || "digital marketing agency, seo services india, avani enterprises";

    console.log(`✅ Injecting for ${pagePath}: Title="${title}"`);

    // Robust meta tag replacement
    const replaceMeta = (html, identifier, content) => {
      // Handles both name="..." and property="..."
      const regex = new RegExp(`(<meta\\s+[^>]*?(?:name|property)=["']${identifier}["'][^>]*?\\s+content=)["'].*?["']`, 'gi');
      if (regex.test(html)) {
        return html.replace(regex, `$1"${content}"`);
      }
      // Try reverse order (content before name)
      const reverseRegex = new RegExp(`(<meta\\s+[^>]*?content=)["'].*?["']([^>]*?(?:name|property)=["']${identifier}["'])`, 'gi');
      if (reverseRegex.test(html)) {
        return html.replace(reverseRegex, `$1"${content}"$2`);
      }
      return html;
    };

    html = html
      .replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`)
      .replace(/__SEO_TITLE__/g, title)
      .replace(/__SEO_DESCRIPTION__/g, description)
      .replace(/__SEO_KEYWORDS__/g, keywords);

    html = replaceMeta(html, 'description', description);
    html = replaceMeta(html, 'og:description', description);
    html = replaceMeta(html, 'twitter:description', description);
    html = replaceMeta(html, 'keywords', keywords);
    html = replaceMeta(html, 'og:title', title);
    html = replaceMeta(html, 'twitter:title', title);

    // Inject SEO data into the window object for hydration
    const seoDataScript = `<script>window.__SEO_DATA__ = ${JSON.stringify(seo || { title, seoHeading, metaDescription: description, metaKeywords: keywords })};</script>`;
    html = html.replace('</head>', `${seoDataScript}</head>`);

    res.send(html);
  } catch (err) {
    console.error("❌ SEO Injection Error:", err);
    next();
  }
});

// Link Management Routes
const linkRoutes = require('./routes/links');
app.use('/api/links', linkRoutes);

// ── Lead notification health ───────────────────────────────────────────────
// Lets the admin confirm delivery without waiting for a real enquiry, and see
// exactly which addresses are on the list.
app.get("/admin/lead-email/status", authMiddleware, (req, res) => {
  res.json({ success: true, ...emailStatus() });
});

app.post("/admin/lead-email/test", authMiddleware, async (req, res) => {
  const result = await sendTestLeadEmail();
  res.status(result.sent ? 200 : 500).json({ success: result.sent, ...result });
});

// ── Admin security ─────────────────────────────────────────────────────────
// Credential changes (each re-verifying the current password), the login audit
// log with approximate location, and lock management.
app.use('/admin/security', require('./routes/adminSecurity'));

// ── First-party analytics ──────────────────────────────────────────────────
// Ingest is public and unauthenticated by necessity — it is called by every
// visitor's browser — so it treats all input as hostile and caps every field.
// The dashboard sits behind authMiddleware inside its own router.
// Both mount on /api/analytics; Express runs them in order, and their paths
// do not overlap (track/duration/exclude vs dashboard).
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/analytics', require('./routes/analyticsDashboard'));

// 2. Serve static files from the frontend build
app.use(express.static(frontendPath));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : "An unexpected error occurred",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// 3. Fallback route for the root "/" (if SEO injection and static serving both skip)
app.get("/", (req, res) => {
  res.json({
    message: "Avani Backend API is running",
    status: "online",
    documentation: "/api/info"
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
