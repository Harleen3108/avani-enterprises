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
  impact: string[];
  imageStyle?: React.CSSProperties;
  galleryImages?: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "avani-business-os",
    slug: "avani-business-os",
    title: "Business OS Website",
    subtitle: "Complete business platform designed to centralize and automate enterprise operations.",
    image: "/businessos.png",
    liveLink: "https://os.avanienterprises.in",
    overview: "Avani Business OS is an all-in-one operating platform designed to centralize and automate enterprise operations. It integrates employee workflows, real-time activity logs, project pipelines, financial ledgers, and comprehensive performance metrics. By unifying operational databases into a single interface, it empowers organizations to eliminate fragmented tools, streamline communication, and drive productivity.",
    keyFeatures: [
      "Centralized Workspace for Unified Team Collaboration",
      "Automated Operational Workflow & Task Delegation",
      "Real-Time Enterprise Analytics & Custom Reporting",
      "Secure Document Storage & Database Permissions"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    impact: [
      "85% reduction in administrative overhead across departments",
      "100% visibility into operational timelines and team throughput",
      "Seamless cross-functional data sharing and process automation"
    ]
  },
  {
    id: "project-leads-management",
    slug: "project-leads-management",
    title: "Project & Leads Management",
    subtitle: "Centralized execution, tracking, delegation, and reporting workspace",
    image: "/crm-hero.png",
    liveLink: "https://team-lead-32ha.vercel.app/",
    overview: "A sophisticated Project & Leads Management workspace developed for modern agencies and organizations. This platform simplifies lead generation, captures real-time data from various funnels, tracks pipeline progression, and facilitates tasks delegation with micro-milestone status reports. Built to empower teams with extreme accountability and crystal-clear progress visualization.",
    keyFeatures: [
      "Dynamic CRM Pipeline with Drag-and-Drop Deal Stages",
      "Instant Lead Capture & Automatic Routing Algorithm",
      "Comprehensive Task Management & Progress Delegation",
      "Real-time Team Productivity & Deal-Conversion Dashboards"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Framer Motion"],
    impact: [
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
    image: "/salesedge.png",
    liveLink: "https://crm-sales-portal.vercel.app/",
    overview: "Sales Edge Portal is an enterprise CRM developed specifically for high-velocity sales organizations. It optimizes sales funnels, automates client outreach across multiple channels, hosts a robust customer relationship database, and serves visual interactive reporting dashboards that empower sales leaders to skyrocket conversion rates and pipeline velocity.",
    keyFeatures: [
      "Multi-channel Sales Pipeline & Campaign Management",
      "Automated Email & WhatsApp Client Outreach Flow",
      "Interactive Sales Forecasting & Visual Reporting Dashboards",
      "360-Degree Contact Profiles with Activity Timeline Logs"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Node.js", "Chart.js"],
    impact: [
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
    image: "/placementmanagement.png",
    liveLink: "https://placement-management-system-80spgis9n.vercel.app/",
    overview: "A centralized platform designed to connect universities, students, and recruiters for seamless campus hiring. It enables university administrators to manage placement drives, students to build professional profiles and apply for opportunities, and recruiters to evaluate candidates and update hiring progress efficiently. The system streamlines the entire placement process from job creation to final offer release through structured workflows and real-time tracking.",
    keyFeatures: [
      "University Super Admin Executive Dashboard with Drive Analytics",
      "Student Resume Builder & Multi-Format Profile Customizer",
      "Recruiter Workspaces for Active Job Postings & Candidate Selection",
      "Interview Scheduling System with Automatic Email Notifications"
    ],
    techStack: ["React", "TypeScript", "Express", "Node.js", "PostgreSQL", "Prisma"],
    impact: [
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
    image: "/schoolmanagement.png",
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
    impact: [
      "Complete automation of academic records and invoicing system",
      "Enhanced student security with live route tracking of school transport",
      "Direct digital notification loop reducing paper waste by 95%"
    ],
    galleryImages: ["/indus1.png", "/indus2.png", "/indus3.png", "/indus4.png"]
  },
  {
    id: "alumni-management",
    slug: "alumni-management",
    title: "Alumni Management Portal",
    subtitle: "Dynamic Networking & Career Platform",
    image: "/alumnimanagement.png",
    liveLink: "https://alumnexus-xi.vercel.app/",
    overview: "A premium, exclusive networking platform engineered to connect university alumni across graduating batches. It facilitates meaningful mentor-mentee professional engagements, promotes job opportunities within the private network, showcases upcoming events, and archives historic university accomplishments.",
    keyFeatures: [
      "Verified Directory with Advanced Search & Filter Options",
      "In-App Professional Mentorship Matching Program",
      "Exclusive Network-Only Job Board & Referral System",
      "Event Calendar with Dynamic Ticketing & R.S.V.P Management"
    ],
    techStack: ["React", "TypeScript", "GraphQL", "Node.js", "MongoDB", "Tailwind CSS"],
    impact: [
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
    image: "/motoexpress.png",
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
    impact: [
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
    image: "/autoexpress.png",
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
    impact: [
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
    image: "/lmsportal.png",
    liveLink: "https://cms-lovat-phi.vercel.app/",
    imageStyle: { transform: "scale(1.15)", transformOrigin: "center" },
    overview: "A scalable learning management system (LMS) designed to coordinate employee training programs, academic course loads, and executive development paths. Features rich video playback tracking, modular custom quiz engines, certificates generation templates, and group collaboration tools.",
    keyFeatures: [
      "Modular Course Builder supporting Video, PDF, & Code Playgrounds",
      "Interactive Quiz & Assessment Engine with Instant Grading",
      "Dynamic Certificate Generation & LinkedIn Direct Sharing Link",
      "Detailed Admin Analytics for Student Engagement & Drop-off Points"
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    impact: [
      "Successful training of 5,000+ corporate employees",
      "92% average completion rate of onboarding course programs",
      "Detailed tracking data revealing and solving lesson drop-off bottlenecks"
    ],
    galleryImages: ["/lmsportal.png", "/lmsportal2.png"]
  },
  {
    id: "millionaire-club",
    slug: "millionaire-club",
    title: "Real Estate Management System (Millionaire Investment Club)",
    subtitle: "Luxury Real Estate & AI Portfolio Management Portal",
    image: "/millionareclub.png",
    liveLink: "https://real-estate-platform-self.vercel.app/",
    overview: "Millionaire Club is a premium real estate marketplace designed for luxury property agencies, high-net-worth investors, tenants, and buyers. It displays high-end luxury property listings using interactive elements, manages users' portfolio distributions, processes dynamic real estate queries with AI-powered rate recommendations, and coordinates booking allocations for elite co-living, residential, and commercial spaces.",
    keyFeatures: [
      "Real estate agency management tools",
      "User portfolio dashboard & listings tracking",
      "Managing client portfolios and agent assignments",
      "AI integration with smart rates recommendation engine",
      "Luxury real estate property listings and interactive showcases"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Framer Motion"],
    impact: [
      "Successful launch of AI-powered property value recommendation models",
      "Immediate tracking and organization of high-value investment leads",
      "Unrivaled visual experience boosting buyer interest on listed assets"
    ],
    galleryImages: ["/hitech1.png", "/hitech2.png", "/hitech3.png", "/hitech4.png"]
  },
  {
    id: "college-management",
    slug: "college-management",
    title: "College Management",
    subtitle: "Advanced Campus ERP & CMS",
    image: "/collegemanagement.png",
    liveLink: "https://cms-lovat-phi.vercel.app/",
    overview: "A highly-scalable Enterprise Resource Planning software for large-scale colleges and universities. College Management manages student and staff lifecycle logs, coordinates complex semester registrations, generates unified student reports, and handles payroll registers for academics and support staff.",
    keyFeatures: [
      "Semester Registration, Course Enrollment & Dynamic Timetables",
      "Unified Student Academic Lifecycle Ledger (Grades, Attendance)",
      "Automated Human Resource Records & Academic Staff Timetable Allocations",
      "Administrative Invoicing, Fee Management & Ledger Reconciliations"
    ],
    techStack: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Bootstrap"],
    impact: [
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
    image: "/gaonsegharatk.png",
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
    impact: [
      "45% average income increase for registered rural farming cooperatives",
      "Fresh farm-to-table deliveries completed within 24 hours of harvest",
      "Ultimate eradication of multi-layered intermediary trade markup commissions"
    ]
  }
];
