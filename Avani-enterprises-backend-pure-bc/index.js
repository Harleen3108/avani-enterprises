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
const Form = require("./models/Form");
const User = require("./models/User");
const AvaniForm = require("./models/AvaniForm");
const Job = require("./models/Job");
const Application = require("./models/Application");
const Seo = require("./models/Seo");
const Blog = require("./models/Blog");
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
  // Accept only PDF, DOC, DOCX files
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, and DOCX files are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
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
    ];

    if (allowedOrigins.includes(origin)) {
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

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

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
    console.log("MongoDB connected");

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

    if (err.name === "JsonWebTokenError") {
      return res.status(400).json({
        message: "Invalid token format",
        hint: "Token is malformed or incorrect",
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

    if (process.env.FROM_EMAIL) await sgMail.send(msg);
    else console.log(`OTP for ${email}: ${otp}`);

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

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isVerified)
      return res.status(400).json({
        message: "Account not verified. Please sign up again to verify.",
      });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({ message: "Invalid email or password" });

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

    if (process.env.FROM_EMAIL) await sgMail.send(msg);
    else console.log(`Reset OTP for ${email}: ${otp}`);

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
      source // ✅ extract source
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
      source: source || "web-dev" // ✅ Save source
    });

    // 2. SendGrid Email to Admin (include services and notes)
    if (process.env.ADMIN_EMAIL && process.env.FROM_EMAIL) {
      const msg = {
        to: process.env.ADMIN_EMAIL,
        from: process.env.FROM_EMAIL, // must be verified in SendGrid
        subject: "New Form Submission Received",
        html: `
            <h2>New Service Inquiry</h2>
            <p><strong>Name:</strong> ${name || "—"}</p>
            <p><strong>Email:</strong> ${email || "—"}</p>
            <p><strong>City & State:</strong> ${cityState || "—"}</p>
            <p><strong>Phone:</strong> ${phone || "—"}</p>
            <p><strong>Services:</strong> ${servicesArray.length
            ? servicesArray.map((s) => `<span>${s}</span>`).join(", ")
            : "—"
          }</p>
            <p><strong>Notes:</strong> ${finalNotes
            ? `<div style="white-space:pre-wrap;">${finalNotes}</div>`
            : "—"
          }</p>
            <p>Time: ${new Date().toLocaleString()}</p>
          `,
      };
      sgMail.send(msg)
        .then(() => {
          console.log(`✅ Email sent successfully to: ${process.env.ADMIN_EMAIL}`);
        })
        .catch((error) => {
          console.error("❌ SendGrid Error:", error.response ? error.response.body : error.message);
        });

      console.log("Keep moving: Email delivery started in background...");
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
    } = req.body;

    // 3. Create new entry
    const newEntry = await AvaniForm.create({
      fullName,
      email,
      phoneNu,
      service,
      companyName,
      projectDetails,
      otherService,
    });

    // 4. SendGrid Email to Admin
    if (process.env.ADMIN_EMAIL && process.env.FROM_EMAIL) {
      const msg = {
        to: process.env.ADMIN_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: "New Consultation Request Received",
        html: `
            <h2>New Consultation Request</h2>
            <p><strong>Name:</strong> ${fullName || "—"}</p>
            <p><strong>Email:</strong> ${email || "—"}</p>
            <p><strong>Phone:</strong> ${phoneNu || "—"}</p>
            <p><strong>Service:</strong> ${service || "—"}</p>
            ${otherService ? `<p><strong>Other Service:</strong> ${otherService}</p>` : ""}
            <p><strong>Company Name:</strong> ${companyName || "—"}</p>
            <p><strong>Project Details:</strong></p>
            <div style="white-space:pre-wrap; background:#f9f9f9; padding:10px; border-radius:5px;">${projectDetails || "—"}</div>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          `,
      };

      sgMail
        .send(msg)
        .then(() => {
          console.log(`✅ Consultation Email sent to: ${process.env.ADMIN_EMAIL}`);
        })
        .catch((error) => {
          console.error("❌ SendGrid Error (Consultation):", error.response ? error.response.body : error.message);
        });
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
    const limit = parseInt(req.query.limit) || 10;
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
app.get("/avani-form", getAllForms);

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

    const filter = { isPublished: true };

    const items = await Blog.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Blog.countDocuments(filter);

    res.json({ success: true, count: items.length, pagination: { total, page, perPage: limit }, data: items });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Public: Get blog by slug
app.get("/blogs/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, isPublished: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // increment views asynchronously
    Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } }).catch((e) => console.error(e));

    res.json({ success: true, data: blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
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
    if (jobId) {
      job = await Job.findOne({ _id: jobId });
      if (!job) {
        return res
          .status(404)
          .json({ message: "Job not found" });
      }
    }

    // Get file URLs
    const resumeUrl = req.files?.resume
      ? `${req.protocol}://${req.get("host")}/uploads/${req.files.resume[0].filename}`
      : null;

    const coverLetterUrl = req.files?.coverLetter
      ? `${req.protocol}://${req.get("host")}/uploads/${req.files.coverLetter[0].filename}`
      : null;

    if (!resumeUrl) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // Create application
    const newApplication = await Application.create({
      jobId: jobId || null,
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
    const { page, section = "" } = req.query;
    if (!page) return res.status(400).json({ message: "page query param required" });

    // Exact match on page + section, fallback to page-only if not found
    let entry = await Seo.findOne({ page, section });
    if (!entry && section) {
      entry = await Seo.findOne({ page, section: "" });
    }

    if (!entry) return res.status(404).json({ message: "SEO not found" });
    res.json({ success: true, data: entry });
  } catch (err) {
    console.error("Error fetching SEO:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Define frontend path (absolute path for reliability)
const frontendPath = path.resolve(__dirname, "../avani-connect-glow-main/dist");

// 1. Catch-all route for SEO injection (MUST be above express.static)
app.get(/.*/, async (req, res, next) => {
  try {
    const pagePath = req.path || "/";
    
    // Skip SEO injection for:
    // 1. Assets (files with extensions)
    // 2. API/Auth routes
    // 3. Requests explicitly asking for JSON
    if (
      pagePath.includes(".") || 
      pagePath.startsWith("/api") || 
      pagePath.startsWith("/auth") || 
      pagePath.startsWith("/admin") ||
      pagePath.startsWith("/leads") ||
      pagePath.startsWith("/jobs") ||
      pagePath.startsWith("/blogs") ||
      pagePath.startsWith("/applications") ||
      pagePath.startsWith("/submit-form") ||
      pagePath.startsWith("/avani-form") ||
      pagePath.startsWith("/seo") ||
      req.headers.accept?.includes("application/json")
    ) {
      return next();
    }

    console.log(`🔍 SEO Injection triggered for: ${pagePath}`);

    // Fetch SEO data from MongoDB
    let seo = await Seo.findOne({ page: pagePath });
    if (!seo && pagePath !== "/") {
      seo = await Seo.findOne({ page: "/" });
    }

    const indexPath = path.join(frontendPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      console.error("❌ index.html not found at:", indexPath);
      return next();
    }

    let html = fs.readFileSync(indexPath, "utf8");

    // Replace placeholders
    const title = seo?.title || "Avani Enterprises | Digital Marketing & Web Development Services";
    const description = seo?.metaDescription || "Transform your brand with Avani Enterprises.";
    const keywords = seo?.metaKeywords || "digital marketing, web development, SEO";

    console.log(`✅ Injecting for ${pagePath}: Title="${title}"`);

    // Use a more robust replacement that handles potential variations in formatting
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    html = html.replace(/content="__SEO_DESCRIPTION__"/g, `content="${description}"`);
    html = html.replace(/content="__SEO_KEYWORDS__"/g, `content="${keywords}"`);
    
    // Also replace the remaining raw placeholders just in case
    html = html
      .replace(/__SEO_TITLE__/g, title)
      .replace(/__SEO_DESCRIPTION__/g, description)
      .replace(/__SEO_KEYWORDS__/g, keywords);

    res.send(html);
  } catch (err) {
    console.error("❌ SEO Injection Error:", err);
    next();
  }
});

// 2. Serve static files from the frontend build
app.use(express.static(frontendPath));

// 3. Fallback route for the root "/" (if SEO injection and static serving both skip)
app.get("/", (req, res) => {
  res.json({
    message: "Avani Backend API is running",
    status: "online",
    documentation: "/api/info"
  });
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
