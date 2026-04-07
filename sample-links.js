// Sample Links Seed Data
// Usage: Copy these examples to test the linktree page

const sampleLinks = [
  {
    title: "Contact Us",
    url: "https://avanienterprises.in/contact",
    description: "Get in touch with our team",
    icon: "Mail",
    color: "#3b82f6",
    isActive: true,
    order: 1,
  },
  {
    title: "Schedule Consultation",
    url: "https://avanienterprises.in/get-consultation",
    description: "Book a session with our experts",
    icon: "Calendar",
    color: "#10b981",
    isActive: true,
    order: 2,
  },
  {
    title: "View Case Studies",
    url: "https://avanienterprises.in/case-studies",
    description: "See how we've helped businesses grow",
    icon: "Briefcase",
    color: "#8b5cf6",
    isActive: true,
    order: 3,
  },
  {
    title: "Explore Our Services",
    url: "https://avanienterprises.in/services",
    description: "Discover what we offer",
    icon: "Sparkles",
    color: "#ec4899",
    isActive: true,
    order: 4,
  },
  {
    title: "Visit Our Blog",
    url: "https://avanienterprises.in/blog",
    description: "Read insights and tips",
    icon: "BookOpen",
    color: "#f97316",
    isActive: true,
    order: 5,
  },
  {
    title: "Learn Our Courses",
    url: "https://avanienterprises.in/courses",
    description: "Upskill with Avani",
    icon: "GraduationCap",
    color: "#06b6d4",
    isActive: true,
    order: 6,
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/company/avani-enterprises",
    description: "Follow us on LinkedIn",
    icon: "Linkedin",
    color: "#0077b5",
    isActive: true,
    order: 7,
  },
  {
    title: "Our Careers",
    url: "https://avanienterprises.in/careers",
    description: "Join our amazing team",
    icon: "Users",
    color: "#f43f5e",
    isActive: true,
    order: 8,
  },
];

// ==========================================
// To seed these via MongoDB directly:
// ==========================================

// 1. Open MongoDB Atlas or your local MongoDB
// 2. Go to the 'avani' database (or your db name)
// 3. Go to 'links' collection
// 4. Click "Insert Document" and paste the data

// ==========================================
// To seed via API curl commands:
// ==========================================

// First, get a JWT token from admin login
// Then replace YOUR_JWT_TOKEN below and run these commands:

/*
# Link 1: Contact Us
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Contact Us",
    "url": "https://avanienterprises.in/contact",
    "description": "Get in touch with our team",
    "color": "#3b82f6",
    "isActive": true,
    "order": 1
  }'

# Link 2: Schedule Consultation
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Schedule Consultation",
    "url": "https://avanienterprises.in/get-consultation",
    "description": "Book a session with our experts",
    "color": "#10b981",
    "isActive": true,
    "order": 2
  }'

# Link 3: View Case Studies
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "View Case Studies",
    "url": "https://avanienterprises.in/case-studies",
    "description": "See how we'\''ve helped businesses grow",
    "color": "#8b5cf6",
    "isActive": true,
    "order": 3
  }'

# Link 4: Our Services
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Explore Our Services",
    "url": "https://avanienterprises.in/services",
    "description": "Discover what we offer",
    "color": "#ec4899",
    "isActive": true,
    "order": 4
  }'

# Link 5: Blog
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Visit Our Blog",
    "url": "https://avanienterprises.in/blog",
    "description": "Read insights and tips",
    "color": "#f97316",
    "isActive": true,
    "order": 5
  }'

# Link 6: Courses
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Learn Our Courses",
    "url": "https://avanienterprises.in/courses",
    "description": "Upskill with Avani",
    "color": "#06b6d4",
    "isActive": true,
    "order": 6
  }'

# Link 7: LinkedIn
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "LinkedIn",
    "url": "https://linkedin.com/company/avani-enterprises",
    "description": "Follow us on LinkedIn",
    "color": "#0077b5",
    "isActive": true,
    "order": 7
  }'

# Link 8: Careers
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Our Careers",
    "url": "https://avanienterprises.in/careers",
    "description": "Join our amazing team",
    "color": "#f43f5e",
    "isActive": true,
    "order": 8
  }'
*/

// ==========================================
// To seed via Node.js script:
// ==========================================

// 1. Create a file: seed-links.js
// 2. Copy the code below
// 3. Run: node seed-links.js

/*
const mongoose = require('mongoose');
const Link = require('./models/Link');
require('dotenv').config();

const sampleLinks = [ ... paste array from above ... ];

async function seedLinks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing links (optional)
    // await Link.deleteMany({});
    
    // Insert sample links
    const created = await Link.insertMany(sampleLinks);
    console.log(`✅ ${created.length} links created successfully!`);
    
    // Display created links
    const allLinks = await Link.find();
    console.log('\nAll links:');
    allLinks.forEach((link, idx) => {
      console.log(`${idx + 1}. ${link.title} - ${link.url}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedLinks();
*/

// ==========================================
// Color Palette Reference:
// ==========================================

const colorPalette = {
  primary_blue: "#3b82f6",
  emerald_green: "#10b981",
  purple: "#8b5cf6",
  pink: "#ec4899",
  orange: "#f97316",
  amber: "#f59e0b",
  cyan: "#06b6d4",
  rose: "#f43f5e",
  indigo: "#6366f1",
  teal: "#14b8a6",
  sky_blue: "#0ea5e9",
  red: "#ef4444",
};

// ==========================================
// After seeding, you can:
// ==========================================

/*
1. Visit: http://localhost:3000/links
   - Should see 8 beautiful link cards
   - Each with different colors and animations
   
2. Go to Admin Panel:
   - http://admin-url/links
   - See all links in management table
   - Can edit, delete, or reorder
   
3. Test Click Tracking:
   - Click on a few links
   - Go to: http://admin-url/link-analytics
   - Should see click data appearing in real-time
   
4. Monitor Analytics:
   - Total clicks counter increases
   - Each link shows click count
   - Geographic data shows where clicks from
   - Referrer shows "/links" for clicks from links page
*/

module.exports = sampleLinks;
