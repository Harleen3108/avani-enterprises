const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: false,
    },
    // Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    currentLocation: {
      type: String,
      trim: true,
    },
    linkedinProfile: {
      type: String,
      trim: true,
    },
    portfolioWebsite: {
      type: String,
      trim: true,
    },
    // Professional Information
    positionAppliedFor: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
    },
    currentCompany: {
      type: String,
      trim: true,
    },
    currentDesignation: {
      type: String,
      trim: true,
    },
    currentCTC: {
      type: String,
      trim: true,
    },
    expectedCTC: {
      type: String,
      trim: true,
    },
    noticePeriod: {
      type: String,
      required: true,
      trim: true,
    },
    highestQualification: {
      type: String,
      required: true,
      trim: true,
    },
    otherQualification: {
      type: String,
      trim: true,
    },
    // Documents
    resumeUrl: {
      type: String,
      required: true,
    },
    coverLetterUrl: {
      type: String,
    },
    coverLetterText: {
      type: String,
    },
    // Additional Information
    howDidYouHear: {
      type: String,
      trim: true,
    },
    willingToRelocate: {
      type: String,
      enum: ["Yes", "No", ""],
      default: "",
    },
    additionalComments: {
      type: String,
    },
    // Application Status
    status: {
      type: String,
      enum: ["New", "Screening", "Shortlisted", "Interview", "Hired", "Rejected"],
      default: "New",
    },
    // Admin Notes & Rating
    adminNotes: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    // Tracking
    viewedByAdmin: {
      type: Boolean,
      default: false,
    },
    viewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
