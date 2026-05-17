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
}

export const projectsData: ProjectItem[] = [
  {
    id: "hr-portal",
    slug: "hr-portal",
    title: "HR Portal",
    subtitle: "Complete HR Management System",
    image: "/hrportal.png",
    liveLink: "https://hr-portal-eta.vercel.app/",
    overview: "The HR Portal is a complete workforce management solution designed to streamline employee operations through a centralized digital platform. It enables employees to manage attendance, leaves, payroll, daily updates, and documents while providing HR teams and management with complete organizational oversight, approvals, analytics, and reporting capabilities. The platform ensures transparency, efficiency, and secure management of workforce-related activities.",
    keyFeatures: [
      "Employee Profile & Database Management",
      "Automated Payroll & Pay Slip Generation",
      "Real-Time Attendance with Geo-Tracking & Leaves Management",
      "Performance Metrics, Goal Tracking & Periodic Appraisals"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    impact: [
      "75% reduction in manual workforce tracking",
      "100% payroll processing accuracy and timely dispatch",
      "Real-time attendance logs and live management dashboard"
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
    title: "School & Transport Management",
    subtitle: "Unified School Operations Ecosystem",
    image: "/schoolmanagement.png",
    liveLink: "https://sms-frontend-steel-xi.vercel.app/",
    overview: "A comprehensive operational hub for primary and secondary educational institutions. It integrates student information systems, academic performance trackers, fee management registers, and real-time school transport tracking. Designed to foster ultimate connectivity between school administration, teachers, bus drivers, and anxious parents.",
    keyFeatures: [
      "Student Information System & Academic Records Ledger",
      "Online Fee Invoicing, Payment Gateway & Ledger Balances",
      "Live GPS Transport & School Bus Route Tracking",
      "Parent-Teacher Portal for Feedback and Daily Homework Alerts"
    ],
    techStack: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Express", "Socket.io"],
    impact: [
      "Complete automation of academic records and invoicing system",
      "Enhanced student security with live route tracking of school transport",
      "Direct digital notification loop reducing paper waste by 95%"
    ]
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
    subtitle: "Bike Service & Maintenance Platform",
    image: "/motoexpress.png",
    liveLink: "https://bike-service-website-gamma.vercel.app/",
    imageStyle: { transform: "scale(1.15)", transformOrigin: "center" },
    overview: "MotoXpress is an on-demand digital ecosystem designed for bike service centers and individual riders. It automates vehicle pickup scheduling, records mechanical health history logs, offers localized service package breakdowns, and includes transparent billing calculators to elevate standard two-wheeler service journeys.",
    keyFeatures: [
      "Automated Two-Wheeler Service & Pickup Scheduler",
      "Real-time Vehicle Service Progress Tracking Timeline",
      "Transparent Digital Invoicing & Faulty Part Image Proofs",
      "Automated Mileage-Based Service Recall System"
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    impact: [
      "40% spike in repeat customer service bookings",
      "Thorough elimination of pricing disputes through part transparency",
      "Optimized workshop logistics and technician dispatch"
    ]
  },
  {
    id: "autoxpress",
    slug: "autoxpress",
    title: "AutoXpress",
    subtitle: "Car Service & Maintenance Platform",
    image: "/autoexpress.png",
    liveLink: "https://car-service-website-tau.vercel.app/",
    imageStyle: { transform: "scale(1.15)", transformOrigin: "center" },
    overview: "A specialized automotive repair enterprise workspace tailored for car workshops and fleet managers. AutoXpress features dynamic bay allocation algorithms, mechanical parts stock tracking, multi-point digital inspection checklist logs, and integrated customer messaging centers.",
    keyFeatures: [
      "Smart Workshop Bay Allocation & Technician Schedulers",
      "Multi-Point Digital Car Inspection Checks & PDF Reports",
      "Live Parts Inventory Integration with Out-of-Stock Alerts",
      "Automated Booking & Status SMS Notifications for Customers"
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Material UI"],
    impact: [
      "55% acceleration in workshop turnaround speeds",
      "Total real-time tracking of parts inventory and parts consumption",
      "Enhanced customer satisfaction rate with digital diagnostics updates"
    ]
  },
  {
    id: "lms-portal",
    slug: "lms-portal",
    title: "LMS Portal",
    subtitle: "Enterprise Learning & Content Platform",
    image: "/lmsportal.png",
    liveLink: "https://cms-lovat-phi.vercel.app/",
    imageStyle: { transform: "scale(1.15)", transformOrigin: "center" },
    overview: "An enterprise learning management system designed to coordinate talent training, academic courses, and executive development. Features rich video playback tracking, modular custom quiz engines, certificates generation templates, and group collaboration tools.",
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
    ]
  },
  {
    id: "millionaire-club",
    slug: "millionaire-club",
    title: "Millionaire Club",
    subtitle: "Luxury 3D Real Estate Investment & Property Marketplace",
    image: "/millionareclub.png",
    liveLink: "https://real-estate-platform-self.vercel.app/",
    overview: "Millionaire Club is a premium real estate marketplace designed for property agencies, high-net-worth investors, tenants, and buyers. It displays high-end luxury property listings using interactive elements, processes dynamic real estate queries, tracks investment distributions, and handles elite co-living, residential, and commercial bookings.",
    keyFeatures: [
      "Ultra-Premium Luxury Listings Showcase with Rich Media",
      "Dynamic Investment Returns & Yield Calculators for Real Estate",
      "Direct Consultation Booking System with Elite Agents",
      "HNW Investor Progress Dashboard & Real-Time Property Value Logs"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Framer Motion"],
    impact: [
      "Successful launch of 3D-inspired virtual property showcases",
      "Immediate tracking and organization of high-value investment leads",
      "Unrivaled visual experience boosting buyer interest on listed assets"
    ]
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
