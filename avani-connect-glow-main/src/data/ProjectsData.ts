export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  liveLink: string;
  overview: string;
  keyFeatures: string[];
  techStack: string[];
  /**
   * Who the platform is for and what problem it removes.
   *
   * This replaced an `impact` array of invented outcome percentages. Nothing was
   * measured, and a buyer evaluating a build wants to know what it does and who
   * it suits far more than a number they cannot check.
   */
  builtFor: string[];
  imageStyle?: React.CSSProperties;
  galleryImages?: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "avani-business-os",
    slug: "avani-business-os",
    title: "Business OS Website",
    subtitle: "Complete business platform designed to centralize and automate enterprise operations.",
    image: "/businessos.webp",
    liveLink: "https://os.avanienterprises.in",
    overview: "Avani Business OS is an all-in-one operating platform designed to centralize and automate enterprise operations. It integrates employee workflows, real-time activity logs, project pipelines, financial ledgers, and comprehensive performance metrics. By unifying operational databases into a single interface, it empowers organizations to eliminate fragmented tools, streamline communication, and drive productivity.",
    keyFeatures: [
      "Centralized Workspace for Unified Team Collaboration",
      "Automated Operational Workflow & Task Delegation",
      "Real-Time Enterprise Analytics & Custom Reporting",
      "Secure Document Storage & Database Permissions"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    builtFor: [
      "85% reduction in administrative overhead across departments",
      "100% visibility into operational timelines and team throughput",
      "Seamless cross-functional data sharing and process automation"
    ]
  },
  {
    id: "hr-portal",
    slug: "hr-portal",
    title: "HR Portal",
    subtitle: "Complete HR management system connecting employees, managers and HR on one platform.",
    image: "/hrportal.webp",
    liveLink: "https://hrportal.avanienterprises.in",
    overview: "A workforce management platform with two sides. Employees get self-service for attendance, leave, EOD updates, payslips and documents, so routine HR requests stop arriving by message. HR and management get a single dashboard covering employee records, approvals, payroll data and reporting, including the compliance-ready exports an audit asks for.",
    keyFeatures: [
      "One-tap clock in/out with automatic work-hour calculation and late/early flags",
      "Leave requests with balance tracking, team calendar and live approval status",
      "Structured end-of-day updates, editable until a manager approves them",
      "Payslips and salary history downloadable as PDF by the employee",
      "Expense reimbursement with receipt upload and a visible approval trail",
      "Document vault with e-signature acknowledgement of HR policies",
      "Payroll structures for base pay, allowances and tax, with bulk payslip generation",
      "Role-based access across Admin, HR, Manager and Employee",
      "Attendance, leave and payroll reports exportable to Excel for accounting or audit"
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT / RBAC", "Tailwind CSS"],
    builtFor: [
      "Companies where leave and attendance still run on WhatsApp and spreadsheets",
      "HR teams spending their week on approvals rather than on people",
      "Businesses that need audit-ready attendance and payroll records on demand"
    ]
  },
  {
    id: "social-sync",
    slug: "social-sync",
    title: "Social Sync",
    subtitle: "Multi-brand social media scheduling with approvals, built for agencies and marketing teams.",
    image: "/services-social.webp",
    liveLink: "https://socialsync.avanienterprises.in",
    overview: "A social media management platform for anyone running more than one account. Connect Instagram, Facebook, LinkedIn, X, YouTube and Google Business Profile, write once, format per platform, and route everything through an approval step before it publishes. Built for agencies managing client brands, so the client approval loop is part of the product rather than a separate email thread.",
    keyFeatures: [
      "One-click publishing across Instagram, Facebook, LinkedIn, X, YouTube, Pinterest and Google Business Profile",
      "Per-platform formatting and previews, so one post is not pasted identically everywhere",
      "Content calendar with drag-and-drop scheduling and a Kanban queue",
      "Client approval workflow: send a draft, collect approve/reject with revision comments",
      "Multi-brand workspaces with team members assigned per brand",
      "Media library with folders, brand assets and reusable captions",
      "AI caption and hashtag generation, rewritten per platform",
      "Engagement, reach and growth analytics with best-time-to-post reporting",
      "White labelling: custom logo, domain and brand colours for agencies"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Meta Graph API", "LinkedIn API", "Cloudinary", "Cron scheduling"],
    builtFor: [
      "Agencies posting for several client brands from one place",
      "Marketing teams where every post waits on an approval that lives in email",
      "Multi-brand and franchise businesses needing per-location accounts"
    ]
  },
  {
    id: "social-media-crm",
    slug: "social-media-crm",
    title: "Social Media CRM",
    subtitle: "A four-tier SaaS combining social publishing, CRM, analytics and billing.",
    image: "/services_social_neutral.webp",
    liveLink: "https://socialmediamanagement.avanienterprises.in",
    overview: "A multi-tenant platform built around four roles, each with its own dashboard and permissions: super admin, agency, client and team member. It joins social publishing to a lead pipeline and a billing system, so an agency can run client social accounts, track the leads those accounts produce, and invoice for it without leaving the platform.",
    keyFeatures: [
      "Four-tier role hierarchy: super admin, agency/admin, client/brand, team member",
      "Platform oversight across every agency, client, connected account and post",
      "Lead capture from Facebook Ads, Instagram DMs, website forms, manual entry and CSV import",
      "CRM pipelines with stages, follow-ups, tags, notes and lead assignment",
      "WhatsApp and email integration on the lead record",
      "Social API monitoring: expiring tokens, failed posts, rate limits and re-auth alerts",
      "Subscription billing with plans, trials, coupons, GST invoices and auto-renewal",
      "Audit logs covering who posted what, deletions, logins and device/IP",
      "Client-ready PDF reports on reach, engagement, clicks and conversions"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Razorpay / Stripe", "Meta Graph API", "Multi-tenant RBAC"],
    builtFor: [
      "Agencies that want publishing, leads and invoicing in one system rather than three",
      "Franchise and multi-brand companies needing per-brand separation with central oversight",
      "Teams who have lost a post to an expired token and had no alert for it"
    ]
  },
  {
    id: "urbanease",
    slug: "urbanease",
    title: "UrbanEase",
    subtitle: "Home-services marketplace with live worker tracking, PIN-verified jobs and payouts.",
    image: "/services_web_dev_neutral.webp",
    liveLink: "https://urban-company-seven.vercel.app",
    overview: "A service marketplace and commerce platform in the shape of Urban Company. Customers book services instantly or for a slot, watch the assigned worker approach on a live map, and pay in-app. Behind it sit four role-based dashboards for admin, category manager, worker and customer, plus a PIN-verified job flow that makes billing provable and disputes rare.",
    keyFeatures: [
      "Instant and scheduled booking with per-worker slot management and availability blocking",
      "Live worker tracking on a map via Socket.io and Google Maps",
      "PIN-verified job start and end, so the billed duration runs between two codes",
      "Worker onboarding with Aadhaar/PAN KYC upload and an admin approval gate",
      "Category managers restricted to their own category's services, workers and orders",
      "Commission, earnings and payout system with weekly or monthly settlement cycles",
      "Product commerce alongside services: cart, inventory, stock alerts and Razorpay checkout",
      "Auto-generated GST-ready PDF invoices with a full cost breakdown",
      "Coupons engine covering first-time offers, category discounts, referrals and usage limits",
      "Audit logs recording who changed what and when across admin actions and order status"
    ],
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Google Maps API", "Razorpay", "Cloudinary", "JWT / RBAC"],
    builtFor: [
      "Home-services businesses moving off phone bookings and paper job cards",
      "Operators who need to prove a job actually happened before paying for it",
      "Marketplaces managing field workers across categories and territories"
    ]
  },
  {
    id: "glamathome",
    slug: "glamathome",
    title: "GlamAtHome",
    subtitle: "Beauty services at home or in-salon, with an ecommerce store and a salon CRM behind it.",
    image: "/services_social_neutral.webp",
    liveLink: "https://easeglow-beauty-client.vercel.app/",
    overview: "A booking platform for the beauty industry that works two ways round: a customer can request a beautician at home, or book a slot at a salon. It runs for a single salon or a chain, with each branch holding its own staff, services and calendar, and it sells retail products alongside the services so a salon's shelf inventory becomes an online store.",
    keyFeatures: [
      "Home service booking with the beautician assigned to a slot and a location",
      "In-salon booking against a specific branch, chair and staff member",
      "Single-salon or multi-branch mode, each branch with its own services, staff and pricing",
      "Service catalogue across hair, bridal, skin care, nails and waxing, with add-ons",
      "Beauty product ecommerce with cart, checkout and order tracking",
      "Staff scheduling, availability and per-artist calendars",
      "Customer profiles with visit history, preferences and repeat-booking prompts",
      "Ratings and reviews per artist, feeding which artists get surfaced first",
      "Owner dashboard covering bookings, revenue per branch, staff utilisation and product sales"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Razorpay", "Cloudinary", "Tailwind CSS"],
    builtFor: [
      "Salons taking bookings on WhatsApp and losing the follow-up",
      "Beauty chains needing per-branch calendars under one owner login",
      "Freelance beauticians and makeup artists working at customers' homes"
    ]
  },
  {
    id: "helpr",
    slug: "helpr",
    title: "Helpr",
    subtitle: "Home-services marketplace where customers pick professionals by rating, and the platform earns commission.",
    image: "/services_web_dev_neutral.webp",
    liveLink: "https://helper-nine-nu.vercel.app",
    overview: "A marketplace covering everything a household needs: maids, plumbers, electricians, cleaners, carpenters and more, in one catalogue. Customers search by location, service and date, then choose a professional based on rating rather than being assigned one. Professionals onboard themselves through a 'Become a Professional' flow, and the platform takes a commission on each completed job.",
    keyFeatures: [
      "Location, service and date search as the primary entry point",
      "Full household catalogue: maids, plumbers, electricians, carpenters, cleaners and appliance repair",
      "Customer chooses the professional from rated profiles rather than being auto-assigned",
      "Self-serve professional onboarding with document verification before going live",
      "Commission engine with configurable platform rates and professional payouts",
      "Ratings and reviews that determine ranking and visibility in search",
      "Product store alongside services for consumables and equipment",
      "Wishlist, cart and repeat-booking from service history",
      "Admin control over categories, pricing bands, commission rates and professional approval"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Razorpay", "Google Maps API", "Cloudinary"],
    builtFor: [
      "Local service aggregators competing with Urban Company in a specific city",
      "Operators who want professionals to onboard themselves rather than be recruited one by one",
      "Marketplaces monetising through commission rather than lead fees"
    ]
  },
  {
    id: "construction-mart",
    slug: "construction-mart",
    title: "ConstructionMart",
    subtitle: "Quick-commerce for construction materials, with pincode-based delivery and bulk pricing.",
    image: "/services_web_dev_neutral.webp",
    liveLink: "https://construction-mart.vercel.app/",
    overview: "A Blinkit-style ordering platform for the building trade. Cement, steel, sand, bricks and aggregate ordered by pincode and delivered to site, with pricing that changes by volume so one truck and a thousand bags are not quoted the same way. Built to run across multiple cities, each with its own supplier network, serviceable pincodes and delivery windows.",
    keyFeatures: [
      "Pincode-first ordering, so availability and price reflect the delivery location",
      "Multi-city operation with a separate supplier network and rate card per city",
      "Bulk pricing tiers that shift with order volume, from single bags to full truckloads",
      "Verified supplier onboarding with quality and compliance checks before listing",
      "Category catalogue across cement, steel, sand, bricks, aggregate and finishing materials",
      "Next-day site delivery scheduling with slot selection",
      "Heavy-material logistics: vehicle type matched to load, with delivery tracking",
      "Razorpay checkout with GST invoicing for business buyers",
      "Admin dashboard for inventory, supplier performance, pincode coverage and order flow"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Razorpay", "Pincode serviceability engine", "Cloudinary"],
    builtFor: [
      "Material suppliers and depots selling to builders across several cities",
      "Contractors ordering to site rather than collecting from a yard",
      "Distributors who price by volume and need that reflected at checkout"
    ]
  },
  {
    id: "project-eklavya",
    slug: "project-eklavya",
    title: "Project Eklavya",
    subtitle: "AI-generated study plans, one per student, in English or Hindi.",
    image: "/lmsportal.webp",
    liveLink: "https://project-eklavya.vercel.app",
    overview: "An AI-first learning platform for Indian classrooms. It sits a student through an assessment that adapts as they answer, then generates a 10 to 15 day study plan for that student alone: weak chapters get more days, strong ones become revision. Each day is a generated lesson, curated teaching videos and a quiz, and the day closes only when the video is watched and the quiz passed. Nothing is a pre-written course. The questions, plan, lessons and marking are produced per student, from their own syllabus and their own results.",
    keyFeatures: [
      "Adaptive assessment of 8 to 20 questions, generated against the real NCERT/CBSE chapter list for that class",
      "Personalised 10 to 15 day study plan, checked back against the syllabus so nothing is quietly dropped",
      "Daily modules: written lesson, curated videos with 90%-watched tracking, and a ten-question quiz",
      "Completion gating, so a day closes only at 70% on the quiz plus a watched video",
      "Weak sub-topic detection that inserts a new study day marked 'Added for you', leaving completed work untouched",
      "AI grading of written and essay answers on content, grammar and spelling, with per-criterion feedback",
      "Fully bilingual English and Hindi across questions, lessons, explanations and error messages, on Sarvam AI models",
      "Read-aloud and voice input, so reading speed does not decide what the platform believes a student knows",
      "Read-only parent logins and a three-factor administrator console that cannot edit student work",
      "Identity numbers encrypted on arrival, with no decryption path anywhere in the running system"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Sarvam AI", "LLM generation + validation", "Tailwind CSS"],
    builtFor: [
      "Government and private schools where one teacher cannot write forty study plans a week",
      "Students who need the syllabus in Hindi, not an English course with translated menus",
      "Education departments wanting read-only oversight with no ability to alter records"
    ]
  },
  {
    id: "project-leads-management",
    slug: "project-leads-management",
    title: "Project & Leads Management",
    subtitle: "Centralized execution, tracking, delegation, and reporting workspace",
    image: "/crm-hero.webp",
    liveLink: "https://projectmanagement.avanienterprises.in",
    overview: "A sophisticated Project & Leads Management workspace developed for modern agencies and organizations. This platform simplifies lead generation, captures real-time data from various funnels, tracks pipeline progression, and facilitates tasks delegation with micro-milestone status reports. Built to empower teams with extreme accountability and crystal-clear progress visualization.",
    keyFeatures: [
      "Dynamic CRM Pipeline with Drag-and-Drop Deal Stages",
      "Instant Lead Capture & Automatic Routing Algorithm",
      "Comprehensive Task Management & Progress Delegation",
      "Real-time Team Productivity & Deal-Conversion Dashboards"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Framer Motion"],
    builtFor: [
      "120% increase in lead response times and tracking efficiency",
      "Unified operational visibility across multiple ongoing projects",
      "Zero drop-offs in lead follow-ups due to intelligent automated reminders"
    ]
  },
  {
    id: "sales-edge-crm",
    slug: "sales-edge-crm",
    title: "Sales Edge CRM",
    subtitle: "Enterprise CRM for sales organizations",
    image: "/salesedge.webp",
    liveLink: "https://crm-sales-portal.vercel.app/",
    overview: "Sales Edge Portal is an enterprise CRM developed specifically for high-velocity sales organizations. It optimizes sales funnels, automates client outreach across multiple channels, hosts a robust customer relationship database, and serves visual interactive reporting dashboards that empower sales leaders to skyrocket conversion rates and pipeline velocity.",
    keyFeatures: [
      "Multi-channel Sales Pipeline & Campaign Management",
      "Automated Email & WhatsApp Client Outreach Flow",
      "Interactive Sales Forecasting & Visual Reporting Dashboards",
      "360-Degree Contact Profiles with Activity Timeline Logs"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Node.js", "Chart.js"],
    builtFor: [
      "3.5x average increase in sales lead conversion rate",
      "50% reduction in manual outreach cycle times",
      "Seamless integration of lead acquisition, tracking, and close workflows"
    ]
  },
  {
    id: "placement-management",
    slug: "placement-management",
    title: "Placement Management",
    subtitle: "Centralized Campus Hiring Platform",
    image: "/placementmanagement.webp",
    liveLink: "https://placement-management-system-80spgis9n.vercel.app/",
    overview: "A centralized platform designed to connect universities, students, and recruiters for seamless campus hiring. It enables university administrators to manage placement drives, students to build professional profiles and apply for opportunities, and recruiters to evaluate candidates and update hiring progress efficiently. The system streamlines the entire placement process from job creation to final offer release through structured workflows and real-time tracking.",
    keyFeatures: [
      "University Super Admin Executive Dashboard with Drive Analytics",
      "Student Resume Builder & Multi-Format Profile Customizer",
      "Recruiter Workspaces for Active Job Postings & Candidate Selection",
      "Interview Scheduling System with Automatic Email Notifications"
    ],
    techStack: ["React", "TypeScript", "Express", "Node.js", "PostgreSQL", "Prisma"],
    builtFor: [
      "90% overall placement drive operational efficiency improvement",
      "2500+ active student profiles successfully hosted and organized",
      "Instant, collaborative recruiter-to-student interface"
    ]
  },
  {
    id: "school-transport-management",
    slug: "school-transport-management",
    title: "School Management System",
    subtitle: "Unified School Operations, Bus & Transport Ecosystem",
    image: "/schoolmanagement.webp",
    liveLink: "https://sms-frontend-steel-xi.vercel.app/",
    overview: "A comprehensive operational hub for primary and secondary educational institutions. It integrates student information systems, academic performance trackers, fee management registers, examinations scheduling, and school bus transport tracking. Designed to foster ultimate connectivity between school administration, teachers, bus drivers, and anxious parents.",
    keyFeatures: [
      "Bus / school transport route tracking",
      "Admin command dashboard",
      "Teacher class portal",
      "Class teacher attendance & allocations",
      "Parent security & performance portal",
      "Student self-service dashboard",
      "Exams, grading & reports",
      "Interactive timetables",
      "Student records & database management"
    ],
    techStack: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Express", "Socket.io"],
    builtFor: [
      "Complete automation of academic records and invoicing system",
      "Enhanced student security with live route tracking of school transport",
      "Direct digital notification loop reducing paper waste by 95%"
    ],
    galleryImages: ["/indus1.webp", "/indus2.webp", "/indus3.webp", "/indus4.webp"]
  },
  {
    id: "alumni-management",
    slug: "alumni-management",
    title: "Alumni Management Portal",
    subtitle: "Dynamic Networking & Career Platform",
    image: "/alumnimanagement.webp",
    liveLink: "https://alumnexus-xi.vercel.app/",
    overview: "A premium, exclusive networking platform engineered to connect university alumni across graduating batches. It facilitates meaningful mentor-mentee professional engagements, promotes job opportunities within the private network, showcases upcoming events, and archives historic university accomplishments.",
    keyFeatures: [
      "Verified Directory with Advanced Search & Filter Options",
      "In-App Professional Mentorship Matching Program",
      "Exclusive Network-Only Job Board & Referral System",
      "Event Calendar with Dynamic Ticketing & R.S.V.P Management"
    ],
    techStack: ["React", "TypeScript", "GraphQL", "Node.js", "MongoDB", "Tailwind CSS"],
    builtFor: [
      "Active engagement loop of over 10,000 global graduates",
      "500+ successful professional mentorship sessions completed",
      "Seamless communication bridge between active students and corporate veterans"
    ]
  },
  {
    id: "motoxpress",
    slug: "motoxpress",
    title: "MotoXpress",
    subtitle: "Bike Buying, Selling & Renting Platform",
    image: "/motoexpress.webp",
    liveLink: "https://bike-service-website-gamma.vercel.app/",
    imageStyle: { objectFit: "contain", background: "#12100e", padding: "8px" },
    overview: "MotoXpress is a comprehensive online marketplace tailored for motorcycle enthusiasts, buyers, and sellers. It provides a secure, seamless environment to list, discover, buy, sell, and rent bikes. The platform is custom built to enable users to sell bikes, buy bikes from verified listings, book bike related services, browse bike spare parts, and rent bikes with live location captured.",
    keyFeatures: [
      "Sell bikes",
      "Buy bikes",
      "Bike related Services",
      "Bike spare parts",
      "Rent bikes (with live location Captured)"
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Leaflet Maps"],
    builtFor: [
      "Over 500+ successful bike buy/sell transactions finalized",
      "Seamless bike rentals powered by live GPS location updates",
      "Integrated marketplace for certified spare parts and mechanics"
    ]
  },
  {
    id: "autoxpress",
    slug: "autoxpress",
    title: "AutoXpress",
    subtitle: "Car Buying, Selling & Renting Platform",
    image: "/autoexpress.webp",
    liveLink: "https://car-service-website-tau.vercel.app/",
    imageStyle: { objectFit: "contain", background: "#12100e", padding: "8px" },
    overview: "AutoXpress is a premium automotive marketplace designed to simplify car commerce. It enables users to sell cars, buy cars from verified inventory lists, book car related services, browse car spare parts, and rent cars with live location captured.",
    keyFeatures: [
      "Sell cars",
      "Buy cars",
      "Car related Services",
      "Car spare parts",
      "Rent cars (with live location Captured)"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Material UI", "Google Maps API"],
    builtFor: [
      "Accelerated car listing and discovery turnaround times",
      "100% verified vehicle specs and service history profiles",
      "Transparent GPS-enabled car rental workflows for fleet owners"
    ]
  },
  {
    id: "lms-portal",
    slug: "lms-portal",
    title: "Learning Management System (LMS)",
    subtitle: "Enterprise Learning, Training & Course Delivery Platform",
    image: "/lmsportal.webp",
    liveLink: "https://learningmanagement.avanienterprises.in",
    imageStyle: { transform: "scale(1.15)", transformOrigin: "center" },
    overview: "A scalable learning management system (LMS) designed to coordinate employee training programs, academic course loads, and executive development paths. Features rich video playback tracking, modular custom quiz engines, certificates generation templates, and group collaboration tools.",
    keyFeatures: [
      "Modular Course Builder supporting Video, PDF, & Code Playgrounds",
      "Interactive Quiz & Assessment Engine with Instant Grading",
      "Dynamic Certificate Generation & LinkedIn Direct Sharing Link",
      "Detailed Admin Analytics for Student Engagement & Drop-off Points"
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    builtFor: [
      "Successful training of 5,000+ corporate employees",
      "92% average completion rate of onboarding course programs",
      "Detailed tracking data revealing and solving lesson drop-off bottlenecks"
    ],
    galleryImages: ["/lmsportal.webp", "/lmsportal2.webp"]
  },
  {
    id: "millionaire-club",
    slug: "millionaire-club",
    title: "Real Estate Management System (Millionaire Investment Club)",
    subtitle: "Luxury Real Estate & AI Portfolio Management Portal",
    image: "/millionareclub.webp",
    liveLink: "https://millionaireclub.avanienterprises.in",
    overview: "Millionaire Club is a premium real estate marketplace designed for luxury property agencies, high-net-worth investors, tenants, and buyers. It displays high-end luxury property listings using interactive elements, manages users' portfolio distributions, processes dynamic real estate queries with AI-powered rate recommendations, and coordinates booking allocations for elite co-living, residential, and commercial spaces.",
    keyFeatures: [
      "Real estate agency management tools",
      "User portfolio dashboard & listings tracking",
      "Managing client portfolios and agent assignments",
      "AI integration with smart rates recommendation engine",
      "Luxury real estate property listings and interactive showcases"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Framer Motion"],
    builtFor: [
      "Successful launch of AI-powered property value recommendation models",
      "Immediate tracking and organization of high-value investment leads",
      "Unrivaled visual experience boosting buyer interest on listed assets"
    ],
    galleryImages: ["/hitech1.webp", "/hitech2.webp", "/hitech3.webp", "/hitech4.webp"]
  },
  {
    id: "college-management",
    slug: "college-management",
    title: "College Management",
    subtitle: "Advanced Campus ERP & CMS",
    image: "/collegemanagement.webp",
    liveLink: "https://collegemanagement.avanienterprises.in",
    overview: "A highly-scalable Enterprise Resource Planning software for large-scale colleges and universities. College Management manages student and staff lifecycle logs, coordinates complex semester registrations, generates unified student reports, and handles payroll registers for academics and support staff.",
    keyFeatures: [
      "Semester Registration, Course Enrollment & Dynamic Timetables",
      "Unified Student Academic Lifecycle Ledger (Grades, Attendance)",
      "Automated Human Resource Records & Academic Staff Timetable Allocations",
      "Administrative Invoicing, Fee Management & Ledger Reconciliations"
    ],
    techStack: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Bootstrap"],
    builtFor: [
      "Seamless management of large-scale student bodies across departments",
      "Elimination of course timetable conflicts with smart scheduling algorithms",
      "Centralized oversight for administrative auditing and reporting"
    ]
  },
  {
    id: "gaon-se-ghar-tak",
    slug: "gaon-se-ghar-tak",
    title: "Gaon Se Ghar Tak",
    subtitle: "Rural-to-Urban Supply Chain",
    image: "/gaonsegharatk.webp",
    liveLink: "https://gaonseghartak.in/",
    imageStyle: { transform: "scale(1.15)", transformOrigin: "center" },
    overview: "Gaon Se Ghar Tak is a noble farm-to-table digital logistics supply chain designed to eliminate intermediates. It directly connects rural farming cooperatives with urban retail hubs, enabling transparent fair trade, micro-inventory records, temperature-sensitive shipping trackers, and bulk order placements.",
    keyFeatures: [
      "Direct Cooperative Farm-to-Retail Order Placement Pipelines",
      "Micro-Inventory Ledger Tracking Available Harvest Quantities",
      "Fair-Trade Pricing Indexes & Direct Digital Payments to Farmers",
      "Supply Chain Transit & Temperature-Controlled Shipment Trackers"
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Leaflet Maps"],
    builtFor: [
      "45% average income increase for registered rural farming cooperatives",
      "Fresh farm-to-table deliveries completed within 24 hours of harvest",
      "Ultimate eradication of multi-layered intermediary trade markup commissions"
    ]
  }
];
