const mongoose = require("mongoose");
const Link = require("./models/Link");
require("dotenv").config();

const sampleLinks = [
  {
    title: "🌐 Visit Our Website",
    url: "https://www.avanienterprises.in",
    description: "Explore our full range of services",
    icon: "globe",
    color: "#06B6D4",
    isActive: true,
    order: 1,
  },
  {
    title: "📞 Book a Free Consultation",
    url: "https://www.avanienterprises.in/get-consultation",
    description: "Let's discuss your business goals",
    icon: "phone",
    color: "#10B981",
    isActive: true,
    order: 2,
  },
  {
    title: "💼 Our Services",
    url: "https://www.avanienterprises.in/services",
    description: "Digital Marketing, Web Dev, SEO & more",
    icon: "web",
    color: "#6366F1",
    isActive: true,
    order: 3,
  },
  {
    title: "📊 Case Studies",
    url: "https://www.avanienterprises.in/case-studies",
    description: "See the results we deliver",
    icon: "external",
    color: "#F59E0B",
    isActive: true,
    order: 4,
  },
  {
    title: "📰 Read Our Blog",
    url: "https://www.avanienterprises.in/blog",
    description: "Insights, tips & industry trends",
    icon: "external",
    color: "#EC4899",
    isActive: true,
    order: 5,
  },
  {
    title: "👥 We're Hiring — Careers",
    url: "https://www.avanienterprises.in/careers",
    description: "Join our growing team",
    icon: "external",
    color: "#8B5CF6",
    isActive: true,
    order: 6,
  },
  {
    title: "💬 Chat on WhatsApp",
    url: "https://wa.me/919253625099",
    description: "Quick response guaranteed",
    icon: "whatsapp",
    color: "#25D366",
    isActive: true,
    order: 7,
    animation: "pulse",
  },
  {
    title: "📄 Avani Enterprises Services",
    url: "/Avani Enterprises Services ( Website, SMM and Ads )  (3).pdf",
    description: "Website, SMM & Ads Services",
    icon: "external",
    color: "#D946EF",
    isActive: true,
    order: 8,
  },
  {
    title: "📦 Avani Services Bundle",
    url: "/Avani services bundle (2).pdf",
    description: "Complete services package",
    icon: "external",
    color: "#EC4899",
    isActive: true,
    order: 9,
  },
];

async function addSampleLinks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing links
    await Link.deleteMany({});
    console.log("🗑️  Cleared existing links");

    // Add sample links
    const createdLinks = await Link.insertMany(sampleLinks);
    console.log(
      `✅ Added ${createdLinks.length} sample links successfully!`
    );

    createdLinks.forEach((link) => {
      console.log(`  - ${link.title} (${link.color})`);
    });

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error adding sample links:", error);
    process.exit(1);
  }
}

addSampleLinks();
