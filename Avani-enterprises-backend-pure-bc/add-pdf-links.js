const mongoose = require("mongoose");
const Link = require("./models/Link");
require("dotenv").config();

const pdfLinks = [
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

async function addPdfLinks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if PDF links already exist
    const existingPdfs = await Link.find({
      url: { $in: pdfLinks.map(l => l.url) }
    });

    if (existingPdfs.length > 0) {
      console.log("⚠️  PDF links already exist. Skipping...");
      existingPdfs.forEach(link => {
        console.log(`  - ${link.title}`);
      });
    } else {
      // Add only the PDF links
      const createdLinks = await Link.insertMany(pdfLinks);
      console.log(`✅ Added ${createdLinks.length} PDF links successfully!`);
      createdLinks.forEach(link => {
        console.log(`  - ${link.title} (${link.color})`);
      });
    }

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error adding PDF links:", error);
    process.exit(1);
  }
}

addPdfLinks();
