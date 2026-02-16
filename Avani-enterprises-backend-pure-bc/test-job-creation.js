// Test script to diagnose job creation issues
// Run with: node test-job-creation.js

const mongoose = require("mongoose");
require("dotenv").config();

const Job = require("./models/Job");

// Sample job data matching what frontend sends
const testJobData = {
  title: "Test Software Engineer",
  department: "Engineering",
  location: "Mumbai",
  type: "Full-time",
  experience: "2-5 years",
  description: "This is a test job description to verify job creation works correctly.",
  responsibilities: [
    "Write clean code",
    "Collaborate with team",
    "Review pull requests"
  ],
  qualifications: [
    "Bachelor's degree in CS",
    "2+ years experience",
    "Strong problem solving"
  ],
  skills: ["JavaScript", "React", "Node.js"],
  benefits: ["Health insurance", "Flexible hours"],
  status: "Active",
  isActive: true,
};

async function testJobCreation() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    console.log("\n📝 Test Job Data:");
    console.log(JSON.stringify(testJobData, null, 2));

    console.log("\n🔄 Creating job...");
    const newJob = await Job.create(testJobData);
    
    console.log("\n✅ Job created successfully!");
    console.log("Job ID:", newJob._id);
    console.log("Title:", newJob.title);
    console.log("Status:", newJob.status);
    console.log("Responsibilities count:", newJob.responsibilities.length);
    console.log("Qualifications count:", newJob.qualifications.length);

    console.log("\n🧹 Cleaning up test job...");
    await Job.findByIdAndDelete(newJob._id);
    console.log("✅ Test job deleted");

    console.log("\n✅ All tests passed! Job creation is working correctly.");
    
  } catch (err) {
    console.error("\n❌ Error during test:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    
    if (err.name === 'ValidationError') {
      console.error("\n📋 Validation errors:");
      Object.keys(err.errors).forEach(key => {
        console.error(`  - ${key}: ${err.errors[key].message}`);
      });
    }
    
    if (err.errors) {
      console.error("\n📋 Detailed errors:", err.errors);
    }
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 MongoDB connection closed");
  }
}

testJobCreation();
