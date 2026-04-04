const mongoose = require("mongoose");

const growthPlanLeadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String, required: true },
    company: { type: String },
    service: { type: String }, // kept for backward compat
    plan: { type: String, enum: ["Basic Plan", "Standard Plan", "Premium Plan"], default: "Standard Plan" },
    amount: { type: Number, default: 199 }, // plan price in ₹
    goals: { type: String },
    notes: { type: String, default: "" },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GrowthPlanLead", growthPlanLeadSchema);
