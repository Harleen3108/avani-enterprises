// scripts/generate-seo-data.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRAND = 'Avani Enterprises';
const BIZ_PHONE = '+91 92536 25099';
const BIZ_EMAIL = 'kp@avanienterprises.in';

// Paths that already exist in the codebase to prevent duplicates
const EXISTING_PATHS = new Set([
  "web-development-company-rohtak",
  "seo-company-mumbai",
  "seo-company-bangalore",
  "digital-marketing-company-mumbai",
  "digital-marketing-company-bangalore",
  "digital-marketing-company-chandigarh",
  "web-development-company-dubai",
  "web-development-company-abu-dhabi",
  "web-development-company-qatar",
  "seo-company-dubai",
  "digital-marketing-company-dubai",
  "web-development-company-london",
  "web-development-company-usa",
  "web-development-company-panipat",
  "web-development-company-karnal",
  "web-development-company-sonipat",
  "web-development-company-hisar",
  "web-development-company-ambala",
  "web-development-company-faridabad",
  "web-development-company-ghaziabad",
  "web-development-company-greater-noida",
  "seo-company-gurgaon",
  "seo-company-noida",
  "seo-company-rohtak",
  "seo-company-panipat",
  "digital-marketing-company-gurgaon",
  "digital-marketing-company-noida",
  "digital-marketing-company-rohtak",
  "digital-marketing-company-delhi",
  "ai-automation-company-gurgaon",
  "ai-solutions-company-noida",
  "ai-solutions-company-delhi",
  "rohtak",
  "gurgaon",
  "faridabad",
  "delhi",
  "web-development-company-haryana",
  "web-development-company-delhi",
  "web-development-company-gurgaon",
  "web-development-company-noida",
  "web-development-company-chandigarh",
  "web-development-company-india",
  "web-development-company-mumbai",
  "web-development-company-bangalore",
  "web-development-company-pune",
  "web-development-company-hyderabad",
  "social-media-marketing-agency-haryana",
  "social-media-marketing-agency-delhi",
  "digital-marketing-agency-haryana",
  "digital-marketing-agency-delhi",
  "seo-company-haryana",
  "seo-company-delhi",
  "google-ads-agency-haryana",
  "hr-portal",
  "hrms-software-india",
  "payroll-software-india",
  "attendance-management-system",
  "leave-management-software",
  "employee-management-software",
  "employee-portal",
  "crm-software-india",
  "workforce-management-software",
  "project-management-software",
  "business-operating-system"
]);

const data = {};

// ─────────────────────────────────────────────────────────────────────────────
// PRIORITY A: BUSINESS OS PAGES (20 pages)
// ─────────────────────────────────────────────────────────────────────────────
const businessOsPages = [
  { slug: 'business-os', title: 'Business OS - Unified Business Operating System', module: 'Unified Operating System', h1: 'Unified Business Operating System (OS)', desc: 'Aggregate HRMS, CRM, Finance, and Project Management into one connected secure operating platform.' },
  { slug: 'business-os/hrms-software', title: 'Enterprise HRMS Software System', module: 'HRMS Module', h1: 'Enterprise HRMS Software System', desc: 'Centralize HR records, automate timesheets, and run payroll in under three clicks.' },
  { slug: 'business-os/hr-portal', title: 'Secure Employee HR Portal', module: 'Employee HR Portal', h1: 'Secure Employee HR Portal', desc: 'Allow employees to retrieve payslips, check leave balances, and update details independently.' },
  { slug: 'business-os/hr-management-system', title: 'Integrated HR Management System', module: 'HR Management System', h1: 'Integrated HR Management System', desc: 'Manage your workforce lifecycle from applicant recruitment to final employee offboarding.' },
  { slug: 'business-os/employee-management-system', title: 'Secure Employee Management Software', module: 'Employee Management', h1: 'Secure Employee Management System', desc: 'A secure cloud directory for candidate files, employee contracts, and allocated office assets.' },
  { slug: 'business-os/attendance-management-system', title: 'Real-Time Attendance Management System', module: 'Attendance Sync', h1: 'Biometric & GPS Attendance System', desc: 'Sync timesheets from office biometrics and geofenced mobile checks into payroll automatically.' },
  { slug: 'business-os/leave-management-system', title: 'Automated Leave Management Software', module: 'Leave Approvals', h1: 'Automated Leave Management System', desc: 'Configure custom carry-over policies, track balances, and route manager approvals in real-time.' },
  { slug: 'business-os/payroll-management-software', title: 'Indian statutory Payroll Software', module: 'Statutory Payroll', h1: 'Indian statutory Payroll System', desc: 'Calculate salary runs, tax projections, PF/ESI contributions, and TDS filings with 100% compliance.' },
  { slug: 'business-os/hrms-software-for-small-business', title: 'HRMS Software for Small Business', module: 'Small Business HRMS', h1: 'HRMS Software for Small Business', desc: 'Affordable, easy-to-use HR tools for growing teams to manage payroll, attendance, and records without overhead.' },
  { slug: 'business-os/best-hrms-software-in-india', title: 'Best HRMS Software in India Buyer Guide', module: 'Buyer Guide', h1: 'Best HRMS Software in India', desc: 'A buyer guide to evaluate HRMS platforms for statutory Indian compliance, integrations, and mobile support.' },
  { slug: 'business-os/employee-performance-management-system', title: 'Employee Performance Management Software', module: 'Performance (KPI/OKR)', h1: 'Performance Management System', desc: 'Track employee KPIs, coordinate 360 appraisals, and structure growth OKRs in one platform.' },
  { slug: 'business-os/employee-onboarding-software', title: 'Digital Employee Onboarding Software', module: 'Employee Onboarding', h1: 'Digital Employee Onboarding System', desc: 'Collect background verification files, issue sign-off packets, and prepare training check-lists.' },
  { slug: 'business-os/employee-directory-software', title: 'Interactive Employee Directory Software', module: 'Employee Directory', h1: 'Interactive Employee Directory', desc: 'A searchable team directory displaying roles, reporting structures, and contact nodes for collaboration.' },
  { slug: 'business-os/shift-management-software', title: 'Dynamic Shift Management Software', module: 'Shift Rostering', h1: 'Dynamic Shift Management System', desc: 'Assign monthly rosters, handle manager swaps, and calculate shift allowances automatically.' },
  { slug: 'business-os/expense-management-software', title: 'Business Expense Management Software', module: 'Expense Management', h1: 'Business Expense Management System', desc: 'Track employee spends, capture GST bills, and manage reimbursement approvals on mobile.' },
  { slug: 'business-os/recruitment-management-system', title: 'Recruitment & ATS Software', module: 'Recruitment & ATS', h1: 'Recruitment Management System', desc: 'Manage candidate job pipelines, coordinate interviewer panels, and draft formal offer letters.' },
  { slug: 'business-os/hrms-software-for-startups', title: 'HRMS Software for Startups', module: 'Startup HRMS', h1: 'HRMS Software for Startups', desc: 'Flexible, fast setup HR tools to automate offer letters, attendance, and payroll for early scale teams.' },
  { slug: 'business-os/hrms-software-for-smes', title: 'HRMS Software for SMEs', module: 'SME HRMS', h1: 'HRMS Software for SMEs', desc: 'Enterprise-grade HR security and Indian compliance made affordable for scaling mid-sized businesses.' },
  { slug: 'business-os/payroll-software-for-small-business', title: 'Payroll Software for Small Business', module: 'Small Business Payroll', h1: 'Payroll Software for Small Business', desc: 'Run employee salaries, manage deductions, and issue PDF payslips in under three clicks.' },
  { slug: 'business-os/online-attendance-system', title: 'Cloud Online Attendance System', module: 'Online Attendance', h1: 'Cloud Online Attendance System', desc: 'Clock attendance via geofenced mobile selfies or real-time biometric terminal sync.' }
];

businessOsPages.forEach(p => {
  data[p.slug] = {
    slug: p.slug,
    type: 'product',
    seo: {
      title: `${p.title} | Avani Business OS`,
      description: `${p.desc} Custom-designed modules built to scale your business with zero per-seat licensing.`,
      keywords: `business os, ${p.module.toLowerCase()}, hrms software, payroll systems india, employee portal`,
      canonical: `https://www.avanienterprises.in/${p.slug}`
    },
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Business OS', href: '/business-os' },
      { label: p.module, href: `/${p.slug}` }
    ],
    hero: {
      tag: 'Avani Business OS Module',
      h1: p.h1,
      subtitle: p.desc,
      stats: [
        { value: '150+', label: 'Clients Active' },
        { value: '100%', label: 'Data Security' },
        { value: 'Zero', label: 'Per-User Fee' },
        { value: '24/7', label: 'Tech Support' }
      ]
    },
    productApp: {
      name: 'Business OS',
      url: 'https://os.avanienterprises.in',
      ctaLabel: 'Open Business OS App'
    },
    introHeading: `Streamlined ${p.module} for High Performance`,
    intro: `Avani Business OS provides a unified platform where ${p.module.toLowerCase()} works in sync with payroll, attendance, and finance. No duplicate entries, no spreadsheet mess. Just clean, secure workflow systems designed to match your company policies.`,
    whyAvani: [
      { title: 'Zero Per-User Licensing', desc: 'Own your software. We build on your secure cloud with no recurring seat fees that lock your scale.' },
      { title: 'Tailored for Indian Business', desc: 'Fully handles Indian financial frameworks, local taxes, PF/ESI compliance, and local bank transfers.' },
      { title: 'Sub-2-Second Load Times', desc: 'High-speed clean React database queries that keep your operational panels fast on all networks.' },
      { title: 'Complete Source Code Ownership', desc: 'You own the full source code and data records, ensuring total independence and system control.' }
    ],
    features: [
      { title: 'Interactive Controls', desc: 'A clean, modern control board designed for HR admins to manage rules in seconds.' },
      { title: 'Auto PDF Generators', desc: 'Generate payslips, tax sheets, offer letters, and report cards automatically.' },
      { title: 'Biometric API Links', desc: 'Direct secure endpoints to sync check-ins from fingerprint and face scanners in real-time.' },
      { title: 'Mobile GPS Check', desc: 'Enable on-road workers to check in with location tags and selfie verification.' },
      { title: 'Granular Access Rules', desc: 'Assign strict role permissions so managers view only what their department authorization allows.' },
      { title: 'Custom Audits & Logs', desc: 'Keep track of all rule edits, updates, and payroll approvals for accountability.' }
    ],
    bodySections: [
      {
        heading: `Scale Operations With Our Custom ${p.module}`,
        paragraphs: [
          `Managing employee operations across multiple spreadsheets or disconnected SaaS suites leads to calculation mistakes, security gaps, and admin frustration. Our custom ${p.module} solves this by unifying your operational data on a single secure system.`,
          'From candidate onboarding checklist allocations to statutory tax filings, every action flows automatically into your core dashboard. This guarantees 100% calculation accuracy and saves your team hours of manual audit work.'
        ]
      },
      {
        heading: 'Complete Security and Regulatory Compliance',
        paragraphs: [
          'We implement enterprise-grade encryption (SSL/TLS) and secure databases to keep candidate files, salary structures, and company records safe. We also keep the systems updated with new compliance structures.',
          'Your team receives full source code and database rights, allowing you to run the system on your own servers with no feature restrictions.'
        ]
      }
    ],
    faqs: [
      { q: `What is the Avani ${p.module}?`, a: `It is a high-performance custom module inside Avani Business OS, designed to handle employee tracking, approvals, or payroll with custom rules.` },
      { q: 'Do we have to pay monthly licensing fees?', a: 'No. Avani builds on a fixed project-cost basis. Once built, you own the code and system outright with no recurring per-user fees.' },
      { q: 'Can we connect it with existing biometric systems?', a: 'Yes. We support direct secure API integrations with fingerprint scanners, card readers, and GPS mobile apps.' },
      { q: 'Is it updated with Indian tax rules?', a: 'Yes. All payroll calculations match PF, ESI, Professional Tax, and TDS rules in India and update dynamically.' },
      { q: 'How long does the setup take?', a: 'Standard module integrations are typically ready for test runs within 10 to 15 business days.' },
      { q: 'Can we request a walkthrough demo?', a: 'Yes. Contact our systems consulting desk at +91 92536 25099 to arrange an online walkthrough demo.' }
    ],
    internalLinks: [
      { label: 'Business OS Overview', href: '/business-os', desc: 'Flagship unified operating platform.' },
      { label: 'HR Portal System', href: '/business-os/hr-portal', desc: 'Self-service portal for employees.' },
      { label: 'Payroll Software India', href: '/payroll-software-india', desc: 'Statutory salary processing.' },
      { label: 'Employee Management', href: '/business-os/employee-management-system', desc: 'Secure staff database.' }
    ],
    cta: {
      headline: 'Digitize Your Operations Today',
      sub: 'Talk to an engineer about building a unified system with zero per-user seat fees. Standard setup in 2 weeks.'
    }
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// PRIORITY B: SOCIAL SYNC PAGES (20 pages)
// ─────────────────────────────────────────────────────────────────────────────
const socialSyncPages = [
  { slug: 'social-sync', title: 'SocialSync - Social Media Management Tool', feature: 'Unified Scheduling', h1: 'Social Media Management Platform', desc: 'Schedule posts, publish reels, deploy automated DMs, and manage multiple client brands from a single screen.' },
  { slug: 'social-sync/social-media-management-tool', title: 'Multi-Channel Social Media Management Tool', feature: 'Management Tool', h1: 'Social Media Management Tool', desc: 'Manage your presence across Instagram, Facebook, X/Twitter, YouTube, and LinkedIn in one dashboard.' },
  { slug: 'social-sync/social-media-scheduler', title: 'Social Media Content Scheduler', feature: 'Content Scheduler', h1: 'Social Media Scheduler', desc: 'Schedule and queue posts, reels, stories, and videos in advance using our drag-and-drop calendar.' },
  { slug: 'social-sync/social-media-tool-for-agencies', title: 'Social Media Software for Agencies', feature: 'Agency Admin Desk', h1: 'Social Media Tool for Agencies', desc: 'Secure workspaces for client accounts, custom team permissions, approval logs, and white-label options.' },
  { slug: 'social-sync/social-media-tool-for-creators', title: 'Social Media Scheduler for Creators', feature: 'Creator Toolkit', h1: 'Social Media Tool for Creators', desc: 'Automate Reels scheduling, capture engagement with auto DM replies, and manage channels on one calendar.' },
  { slug: 'social-sync/social-media-tool-for-small-business', title: 'Social Media Tool for Small Business', feature: 'Small Business Social', h1: 'Social Media Tool for Small Business', desc: 'Grow your local reach without spending hours online. Schedule weekly posts and automate customer inquiries.' },
  { slug: 'social-sync/social-media-management-for-enterprises', title: 'Enterprise Social Media Management Software', feature: 'Enterprise Workspaces', h1: 'Social Media Management for Enterprises', desc: 'High-security workspaces, multi-brand routing, strict editor approvals, and analytics tracking at scale.' },
  { slug: 'social-sync/instagram-post-scheduler', title: 'Instagram Post & Reels Scheduler', feature: 'Instagram Scheduling', h1: 'Instagram Post & Reels Scheduler', desc: 'Direct auto-publishing for Instagram posts, reels, and stories, complete with auto DM comment triggers.' },
  { slug: 'social-sync/instagram-reels-scheduler', title: 'Instagram Reels Scheduler Tool', feature: 'Reels Auto-Publish', h1: 'Instagram Reels Scheduler', desc: 'Queue and schedule vertical reels in advance with direct mobile publishing and comment monitoring.' },
  { slug: 'social-sync/facebook-post-scheduler', title: 'Facebook Post & Story Scheduler', feature: 'Facebook Publishing', h1: 'Facebook Post & Story Scheduler', desc: 'Auto-publish images, link cards, and stories directly to Facebook pages and communities.' },
  { slug: 'social-sync/facebook-story-scheduler', title: 'Facebook Story Scheduler Tool', feature: 'Facebook Stories', h1: 'Facebook Story Scheduler', desc: 'Draft and queue vertical story media to auto-publish on Facebook without manual alerts.' },
  { slug: 'social-sync/linkedin-post-scheduler', title: 'LinkedIn Post Scheduler for Personal Brands', feature: 'LinkedIn Scheduling', h1: 'LinkedIn Post Scheduler', desc: 'Schedule PDF carousels, text thoughts, and video posts to build your founder profile on LinkedIn.' },
  { slug: 'social-sync/youtube-video-scheduler', title: 'YouTube Shorts & Video Scheduler', feature: 'YouTube Uploads', h1: 'YouTube Video & Shorts Scheduler', desc: 'Queue long-form videos and shorts with title and description template inputs.' },
  { slug: 'social-sync/twitter-post-scheduler', title: 'X / Twitter Post Scheduler Tool', feature: 'X/Twitter Threads', h1: 'X / Twitter Post Scheduler', desc: 'Schedule single posts and multi-part X threads, with media support and queue controls.' },
  { slug: 'social-sync/multi-brand-social-media-management', title: 'Multi-Brand Social Media Software', feature: 'Multi-Brand Setup', h1: 'Multi-Brand Social Media Management', desc: 'Separate post calendars, team roles, and metrics dashboards for every brand in your portfolio.' },
  { slug: 'social-sync/social-media-client-management', title: 'Social Media Client Approval Tool', feature: 'Client Approval Hub', h1: 'Social Media Client Management', desc: 'Share preview links with clients to collect feedbacks and approvals before posts go live.' },
  { slug: 'social-sync/bulk-dm-tool', title: 'Instagram & Facebook Bulk DM Tool', feature: 'Bulk DM Broadcasts', h1: 'Instagram & Facebook Bulk DM Tool', desc: 'Send bulk direct messages to active leads and opt-in clients safely without flagging risk.' },
  { slug: 'social-sync/auto-dm-tool', title: 'Instagram Auto DM Comment Trigger Tool', feature: 'Auto DM Triggers', h1: 'Instagram & Facebook Auto DM Tool', desc: 'Trigger instant DM replies containing product links when users comment specific keywords.' },
  { slug: 'social-sync/social-media-content-planner', title: 'Social Media Content Planner Calendar', feature: 'Content Planner', h1: 'Social Media Content Planner', desc: 'Draft post ideas, schedule drafts, and plan campaigns visually on a shared content dashboard.' },
  { slug: 'social-sync/social-media-approval-workflow', title: 'Social Media Post Approval Software', feature: 'Approval Workflows', h1: 'Social Media Approval Workflows', desc: 'Build review gates where writers submit drafts and designers attach media for admin sign-offs.' }
];

socialSyncPages.forEach(p => {
  data[p.slug] = {
    slug: p.slug,
    type: 'product',
    seo: {
      title: `${p.title} | SocialSync`,
      description: `${p.desc} Use credit-based posting (1 credit = 1 post) with no platform limits. Try free.`,
      keywords: `socialsync, social media tool, ${p.feature.toLowerCase()}, scheduling posts, auto dm instagram`,
      canonical: `https://www.avanienterprises.in/${p.slug}`
    },
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'SocialSync', href: '/social-sync' },
      { label: p.feature, href: `/${p.slug}` }
    ],
    hero: {
      tag: 'SocialSync Feature Showcase',
      h1: p.h1,
      subtitle: p.desc,
      stats: [
        { value: '5+', label: 'Networks Linked' },
        { value: '1 Credit', label: 'Per Post' },
        { value: '100%', label: 'API Compliant' },
        { value: 'Instant', label: 'Auto DMs' }
      ]
    },
    productApp: {
      name: 'SocialSync',
      url: 'https://socialsync.avanienterprises.in',
      ctaLabel: 'Go to SocialSync App'
    },
    introHeading: `High-Performance ${p.feature} for Brands`,
    intro: `SocialSync makes publishing simple. Link your Instagram, Facebook, X, YouTube, and LinkedIn pages to schedule content, configure auto-DMs, and approve drafts on one calendar. Powered by a credit model (1 credit = 1 post) with no seat limits.`,
    whyAvani: [
      { title: 'Credit-Based Pricing', desc: 'Pay only for what you publish. 1 credit equals 1 scheduled post across all channels, with no seat fees.' },
      { title: 'Automated DM Triggers', desc: 'Increase lead capture by automatically sending links to users who comment on your posts or message you.' },
      { title: 'Agency Approval Hub', desc: 'Share draft calendars with clients to collect feedback and approvals before posts are published.' },
      { title: '100% Platform Compliant', desc: 'Built strictly on official Meta, Google, LinkedIn, and X developer APIs to protect your accounts.' }
    ],
    features: [
      { title: 'Direct Auto-Publishing', desc: 'Direct publishing for posts, reels, stories, and videos without manual app notifications.' },
      { title: 'Keyword DM Replies', desc: 'Send welcome messages or link files when users comment specific words on your posts.' },
      { title: 'Client Feedback Portal', desc: 'Let client review drafts and sign off on schedules without logging into the main dashboard.' },
      { title: 'Workspace Isolation', desc: 'Keep every client brand, team conversation, and calendar separate and secure.' },
      { title: 'Dynamic Thread Queue', desc: 'Draft and schedule multi-part X/Twitter threads with image attachments.' },
      { title: 'Detailed Analytics', desc: 'Monitor reach, click rates, and follower growth trends in clean reports.' }
    ],
    bodySections: [
      {
        heading: `Scale Engagement With ${p.feature}`,
        paragraphs: [
          `Juggling multiple browser tabs just to post update images and reply to user messages wastes hours. SocialSync consolidates your social operations, allowing you to queue campaigns and automate customer inquiries on a single calendar.`,
          'Our auto DM and keyword triggers let you deliver brochures, registration links, and coupon codes directly to user inboxes instantly. This turns social attention into qualified leads.'
        ]
      },
      {
        heading: 'Built for Agencies and Scale Creators',
        paragraphs: [
          'SocialSync provides agency accounts with isolated client workspaces, custom review gates, and team logins. Writers can submit copy and designers upload assets for client approval in one secure app.',
          'Protect your reputation and prevent mistakes using our client preview links.'
        ]
      }
    ],
    faqs: [
      { q: `How does the SocialSync ${p.feature} work?`, a: 'You connect your channels using our secure dashboard, write your copy, attach your media files, and schedule it to publish automatically.' },
      { q: 'Is it safe for our accounts?', a: 'Yes. SocialSync is an approved developer partner and uses only official APIs, keeping your pages compliant and secure.' },
      { q: 'How does credit-based pricing work?', a: 'We use a simple post-credit system where 1 credit equals 1 scheduled post. There are no recurring fees or per-seat costs.' },
      { q: 'Can we schedule Instagram Reels?', a: 'Yes. You can schedule Reels and Stories to auto-publish directly to your page without phone reminders.' },
      { q: 'Can client review drafts before publishing?', a: 'Yes. You can send secure, branded preview calendars to clients to collect feedbacks and edits.' },
      { q: 'How do we set up the auto-DM tool?', a: 'You can configure keyword triggers (e.g., reply when users comment "DEMO") in the automation panel in minutes.' }
    ],
    internalLinks: [
      { label: 'SocialSync Platform', href: '/social-sync', desc: 'All-in-one publishing dashboard.' },
      { label: 'Instagram Scheduler', href: '/social-sync/instagram-post-scheduler', desc: 'Auto-publish posts and reels.' },
      { label: 'LinkedIn Scheduler', href: '/social-sync/linkedin-post-scheduler', desc: 'Founder brand scheduling.' },
      { label: 'Client Approvals', href: '/social-sync/social-media-client-management', desc: 'Preview portals for clients.' }
    ],
    cta: {
      headline: 'Automate Your Social Posting Today',
      sub: 'Join agencies and creators scheduling campaigns with SocialSync. Register for a free credit test run.'
    }
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// PRIORITY C: SERVICE + LOCATION PAGES (224 combinations mapped to ~200+ unique)
// ─────────────────────────────────────────────────────────────────────────────
const services = [
  { name: 'Web Development', slug: 'web-development-company', desc: 'Fast, secure, custom websites and ecommerce stores built to convert.' },
  { name: 'App Development', slug: 'mobile-app-development-company', desc: 'Native Android, iOS, and cross-platform apps with polished interface design.' },
  { name: 'Digital Marketing', slug: 'digital-marketing-company', desc: 'ROI-driven digital campaigns across search, social, and lead generation.' },
  { name: 'Social Media Marketing', slug: 'social-media-marketing-company', desc: 'Organic brand growth, creative content, and community build-up.' },
  { name: 'AI Video Services', slug: 'ai-video-services', desc: 'Bespoke AI-generated explainer videos, ads, and explainer social reels.' },
  { name: 'Agentic AI Development', slug: 'agentic-ai-development-company', desc: 'Autonomous AI agents that plan and execute multi-step tasks using tools.' },
  { name: 'Meta Ads', slug: 'meta-ads-agency', desc: 'High-converting Facebook and Instagram ad campaigns optimized for ROAS.' },
  { name: 'Google Ads', slug: 'google-ads-agency', desc: 'Performance-driven search, display, and PMax campaigns that lower cost per lead.' }
];

const locations = [
  { name: 'Delhi', isIntl: false, area: 'Connaught Place, Okhla, Nehru Place, Netaji Subhash Place. Retail and service hubs.', localNote: 'Indian retail hubs and enterprise service sectors.' },
  { name: 'Gurgaon', isIntl: false, area: 'DLF Cyber City, Sector 49, Golf Course Road, Sohna Road. Startups and global SaaS companies.', localNote: 'Startups, tech giants, and global SaaS companies.' },
  { name: 'Noida', isIntl: false, area: 'Sector 62, Sector 63, Greater Noida Expressway. IT firms and manufacturing sectors.', localNote: 'IT firms, BPOs, and manufacturing industries.' },
  { name: 'Chandigarh', isIntl: false, area: 'Sector 17, Sector 34, Rajiv Gandhi IT Park. IT export houses and coaching desks.', localNote: 'IT export houses, coaching institutes, and local healthcare.' },
  { name: 'Punjab', isIntl: false, area: 'Ludhiana textile hub, Jalandhar sports, Amritsar tourism, and Mohali SaaS offices.', localNote: 'Ludhiana textile exporters and Jalandhar sports manufacturing.' },
  { name: 'Haryana', isIntl: false, area: 'IMT Manesar, Rohtak educational nodes, Faridabad machinery, and Panipat weavers.', localNote: 'IMT Manesar, Rohtak educational institutes, Faridabad manufacturing, and Panipat weavers.' },
  { name: 'Uttar Pradesh', isIntl: false, area: 'Lucknow IT, Kanpur leather houses, Noida tech services, and Varanasi retail.', localNote: 'Lucknow IT, Kanpur leather industries, Noida tech services, and Varanasi tourism.' },
  { name: 'Rajasthan', isIntl: false, area: 'Jaipur handicraft houses, Jodhpur stone clusters, Udaipur hotels, and Kota coaching centres.', localNote: 'Jaipur handicrafts and startups, Jodhpur stone industries, Udaipur tourism, and Kota coaching.' },
  { name: 'North India', isIntl: false, area: 'Delhi NCR, Punjab, Haryana, UP, and Rajasthan markets.', localNote: 'NCR, Punjab, Haryana, UP, and Rajasthan markets. Highly dynamic retail and industrial zones.' },
  { name: 'India', isIntl: false, area: 'Pan-India digital growth, scaling MSMEs, and enterprise IT services across major cities.', localNote: 'Pan-India digital growth, scaling MSMEs, and enterprise IT services across major metros.' },
  { name: 'USA', isIntl: true, area: 'Offshore tech solutions for US startups and enterprises.', localNote: 'Offshore development for US startups and enterprises. Timezone-aligned sprint delivery and cost optimization.' },
  { name: 'UK', isIntl: true, area: 'Bespoke digital services for London, Manchester, and Birmingham businesses.', localNote: 'Bespoke digital services for London, Manchester, and Birmingham businesses with strict GDPR compliance.' },
  { name: 'Canada', isIntl: true, area: 'Web and app solutions for Toronto, Vancouver, and Montreal brands.', localNote: 'Web and app solutions for Toronto, Vancouver, and Montreal brands with local support options.' },
  { name: 'Australia', isIntl: true, area: 'Digital engineering and ads optimization for Sydney, Melbourne, and Brisbane.', localNote: 'Digital engineering and ads optimization for Sydney, Melbourne, and Brisbane scaling businesses.' },
  { name: 'UAE', isIntl: true, area: 'Bilingual English-Arabic services for Dubai, Abu Dhabi, and Sharjah.', localNote: 'Bilingual English-Arabic websites and marketing for Dubai, Abu Dhabi, and Sharjah real estate and free-zones.' },
  { name: 'Singapore', isIntl: true, area: 'Fintech, logistics, and D2C brand optimization for South-East Asia\'s hub.', localNote: 'Fintech, logistics, and D2C brand optimization for South-East Asia\'s primary business hub.' },
  { name: 'Mumbai', isIntl: false, area: 'BKC, Andheri East, Lower Parel. Finance, media, and D2C brands.', localNote: 'BKC, Andheri East, Lower Parel. Financial services, media companies, and D2C brands.' },
  { name: 'Bangalore', isIntl: false, area: 'Koramangala, Indiranagar, HSR Layout. SaaS startups and tech firms.', localNote: 'Koramangala, Indiranagar, HSR Layout. SaaS startups, tech firms, and venture scale products.' },
  { name: 'Pune', isIntl: false, area: 'Hinjewadi IT Park, Viman Nagar, Kothrud. Automotive and educational hubs.', localNote: 'Hinjewadi IT Park, Viman Nagar, Kothrud. Automotive manufacturing, IT services, and educational hubs.' },
  { name: 'Hyderabad', isIntl: false, area: 'HITEC City, Gachibowli, Madhapur. Pharma firms and IT services.', localNote: 'HITEC City, Gachibowli, Madhapur. Pharmaceutical firms, IT giants, and enterprise services.' },
  { name: 'Chennai', isIntl: false, area: 'OMR IT Corridor, Guindy, Ambattur. SaaS companies and back-offices.', localNote: 'OMR IT Corridor, Guindy, Ambattur. SaaS companies, automotive manufacturing, and global back-offices.' },
  { name: 'Kolkata', isIntl: false, area: 'Salt Lake Sector V, New Town. IT hubs and manufacturing clusters.', localNote: 'Salt Lake Sector V, New Town. IT hubs, logistics, and traditional manufacturing clusters.' },
  { name: 'Ahmedabad', isIntl: false, area: 'SG Highway, Prahlad Nagar. Textile mills and D2C startups.', localNote: 'SG Highway, Prahlad Nagar. Textile manufacturers, chemical firms, and D2C startups.' },
  { name: 'Jaipur', isIntl: false, area: 'Malviya Nagar, Sitapura Area. Gems, jewelry, and export houses.', localNote: 'Malviya Nagar, Sitapura Industrial Area. Gems & jewelry, tourism, and handicraft exporters.' },
  { name: 'Lucknow', isIntl: false, area: 'Hazratganj, Gomti Nagar. Education, healthcare, and retail.', localNote: 'Hazratganj, Gomti Nagar. Education, healthcare, and retail businesses.' },
  { name: 'Faridabad', isIntl: false, area: 'NIT Faridabad, Sector 31. Heavy machinery and automotive units.', localNote: 'NIT Faridabad, Sector 31. Heavy machinery, manufacturing, and automotive parts.' },
  { name: 'Ghaziabad', isIntl: false, area: 'Sahibabad Industrial Area, Kavi Nagar. Manufacturing and trading.', localNote: 'Sahibabad Industrial Area, Kavi Nagar. Small manufacturing units, trading, and logistics.' },
  { name: 'Greater Noida', isIntl: false, area: 'Knowledge Park, Yamuna Expressway. Educational campuses and electronics.', localNote: 'Knowledge Park, Yamuna Expressway. Large educational campuses and electronics manufacturing.' },
  { name: 'Ludhiana', isIntl: false, area: 'Focal Point, Link Road. Hosiery, cycle, and machine parts.', localNote: 'Ludhiana hosiery factories, steel re-rolling mills, and cycle parts exporters.' },
  { name: 'Amritsar', isIntl: false, area: 'Katra Jaimal Singh, Ranjit Avenue. Hospitality, textiles, and local food brands.', localNote: 'Amritsar hotel chains, shawls and textiles exporters, and local food brands.' },
  { name: 'Jalandhar', isIntl: false, area: 'Leather Complex, Sports Goods Complex. Leather goods, sports tools, and medical clusters.', localNote: 'Jalandhar sports equipment exporters, leather tanneries, and hand tools manufacturers.' },
  { name: 'Kanpur', isIntl: false, area: 'Jajmau, Dada Nagar. Leather exports, textiles, and packaging industries.', localNote: 'Kanpur leather factories, chemical refineries, and soap/detergent manufacturers.' },
  { name: 'Udaipur', isIntl: false, area: 'Mewar Industrial Area, Sukher. Marble cutting, travel services, and handicraft trade.', localNote: 'Udaipur marble cutting units, handicraft exporters, and travel agencies.' },
  { name: 'Varanasi', isIntl: false, area: 'Ramnagar Industrial Area, Chowk. Banarasi silk weavers and wooden toys makers.', localNote: 'Varanasi silk weavers, handicraft exporters, and local tourism operators.' }
];

services.forEach(s => {
  locations.forEach(loc => {
    // Determine the slug using the existing patterns
    // e.g. web-development-company-delhi
    let locSlug = loc.name.toLowerCase().replace(/\s+/g, '-');
    let pageSlug = `${s.slug}-${locSlug}`;
    
    // Replace specific suffixes to match existing patterns if needed
    // e.g. SMM is social-media-marketing-agency-delhi vs social-media-marketing-company-delhi
    if (s.name === 'Social Media Marketing') {
      pageSlug = `social-media-marketing-agency-${locSlug}`;
    } else if (s.name === 'Digital Marketing') {
      pageSlug = `digital-marketing-agency-${locSlug}`;
    }
    
    // Check if the page is already in the codebase
    if (EXISTING_PATHS.has(pageSlug)) {
      return;
    }
    
    data[pageSlug] = {
      slug: pageSlug,
      type: 'location',
      seo: {
        title: `${s.name} in ${loc.name} | Avani Enterprises`,
        description: `Looking for top-tier ${s.name.toLowerCase()} in ${loc.name}? We deliver high-converting digital setups for businesses in ${loc.area}. Request a free audit.`,
        keywords: `${s.name.toLowerCase()} ${loc.name.toLowerCase()}, ${s.name.toLowerCase()} agency ${loc.name.toLowerCase()}, avani enterprises`,
        canonical: `https://www.avanienterprises.in/${pageSlug}`
      },
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: `${s.name} — ${loc.name}`, href: `/${pageSlug}` }
      ],
      hero: {
        tag: `Serving ${loc.name}`,
        h1: `${s.name} in ${loc.name}`,
        subtitle: `Custom, secure ${s.name.toLowerCase()} services tailored to the competitive business environment of ${loc.name} — built to capture conversions and rank on Google.`,
        stats: [
          { value: '300+', label: 'Projects Delivered' },
          { value: '8+', label: 'Years Experience' },
          { value: '5.0', label: 'Client Rating' },
          { value: 'Sub-2s', label: 'Average Load Time' }
        ]
      },
      introHeading: `Partnering with ${loc.name} Businesses for Real Growth`,
      intro: `Operating successfully in ${loc.name} requires a digital strategy built around your specific target audience. Our ${s.name.toLowerCase()} services help local brands build digital authority and set up clean, scalable sales pipelines. ${loc.localNote}`,
      whyAvani: [
        { title: 'Designed for Local Markets', desc: `We customize every workflow, landing page, and ad campaign to match the local buyer intent and industries across ${loc.name}.` },
        { title: 'Sub-2-Second Speed', desc: 'No slow templates. We hand-code our web platforms on modern React architectures to ensure fast load times on mobile.' },
        { title: 'Integrated Marketing Strategy', desc: 'We coordinate development with paid search, social, and search optimization to turn traffic into qualified leads.' },
        { title: '24/7 Support and Security', desc: 'Get direct access to support engineers available over WhatsApp and phone for quick updates.' }
      ],
      features: [
        { title: 'Custom-Coded Systems', desc: `Clean web applications and UI designs built around your exact ${loc.name} business objectives.` },
        { title: 'Search Engine Setup', desc: 'On-page SEO, schema configurations, and speed optimizations built-in to rank on Google search.' },
        { title: 'Statutory Compliant Pages', desc: 'GDPR-ready databases, SSL security integrations, and clear privacy compliance terms.' },
        { title: 'Lead Tracking Integration', desc: 'Track ad spend performance and capture user form inputs in simple analytics dashboards.' },
        { title: 'Responsive Mobile UI', desc: 'Interfaces built to look sharp and load fast on all smartphones, where most local buyers browse.' },
        { title: 'Dedicated Project Engineers', desc: 'Direct, weekly sprint checkpoints with the team in charge of your system build.' }
      ],
      bodySections: [
        {
          heading: `Performance-Driven ${s.name} for ${loc.name}`,
          paragraphs: [
            `Standard template systems and ad campaigns fail to deliver ROI when they do not speak to the local market context of ${loc.name}. Our specialized ${s.name.toLowerCase()} team studies your competitors, identifies high-intent keyword gaps, and codes custom conversion funnels.`,
            'Whether you are looking to increase wholesale export inquiries, attract walk-ins to local retail hubs, or acquire qualified B2B service leads, we coordinate design and data to deliver measurable growth.'
          ]
        },
        {
          heading: 'High Security and Transparent Reporting',
          paragraphs: [
            'All web platforms and lead databases are built with strict encryption controls, keeping candidate files and financial inquiries secure. We set up GA4 and Google Search Console from launch, giving you direct visibility of your growth.',
            'Maintain complete database control and enjoy long-term stability with a trusted technical partner.'
          ]
        }
      ],
      faqs: [
        { q: `What does your ${s.name.toLowerCase()} service in ${loc.name} include?`, a: `We provide end-to-end setups: initial market research, custom landing page copy, technical design, on-page SEO, and direct integration with your CRM or team emails.` },
        { q: 'How long does it take to see results?', a: 'Standard web development and ads campaigns launch within 2 to 4 weeks. Search engine optimization (SEO) projects typically show organic growth within 90 days.' },
        { q: 'Do you offer custom reporting?', a: 'Yes. We provide monthly performance audits detailing search impressions, click conversions, and exact cost-per-lead updates.' },
        { q: `Can you work with our existing team in ${loc.name}?`, a: 'Absolutely. We regularly coordinate with internal marketing and IT departments to handle backend deployments or assets.' }
      ],
      internalLinks: [
        { label: 'All Services Overview', href: '/services', desc: 'Explore all digital and tech options.' },
        { label: 'Business OS Platform', href: '/business-os', desc: 'Unified employee and sales system.' },
        { label: 'SEO Audit', href: '/seo-company', desc: 'Rank higher on Google searches.' },
        { label: 'SocialSync Tool', href: '/social-sync', desc: 'Direct social posting and auto-DMs.' }
      ],
      cta: {
        headline: `Grow Your ${loc.name} Business Online`,
        sub: `Schedule a free 20-minute digital audit. Let's evaluate your competitors in ${loc.name} and outline a clear growth roadmap.`
      }
    };
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// PRIORITY D: INDUSTRY / USE-CASE PAGES (14 pages)
// ─────────────────────────────────────────────────────────────────────────────
const industryPages = [
  { slug: 'web-development-for-startups', title: 'Web Development for Startups', ind: 'Startups', h1: 'Custom Web Development for Startups', desc: 'Launch fast, scale-ready web applications and landing pages built on modern React stacks.' },
  { slug: 'web-development-for-small-businesses', title: 'Web Development for Small Businesses', ind: 'Small Businesses', h1: 'Web Development for Small Businesses', desc: 'Get a clean, high-performance local business website to rank on Google and capture customer calls.' },
  { slug: 'app-development-for-startups', title: 'App Development for Startups', ind: 'Startup Mobile Apps', h1: 'Mobile App Development for Startups', desc: 'Build native iOS/Android or Flutter apps with MVP sprint delivery and polished UI design.' },
  { slug: 'digital-marketing-for-startups', title: 'Digital Marketing for Startups', ind: 'Startup Growth', h1: 'Digital Marketing for Startups', desc: 'Accelerate user acquisition, optimize CAC, and scale ROAS with performance ads and SEO.' },
  { slug: 'digital-marketing-for-real-estate', title: 'Digital Marketing for Real Estate', ind: 'Real Estate', h1: 'Digital Marketing for Real Estate Developers', desc: 'Generate verified luxury buyer leads, capture GST brochure downloads, and automate sales pipelines.' },
  { slug: 'digital-marketing-for-healthcare', title: 'Digital Marketing for Healthcare', ind: 'Healthcare', h1: 'Digital Marketing for Clinics & Hospitals', desc: 'Attract local patient check-ins, streamline appointment bookings, and manage medical search optimization.' },
  { slug: 'digital-marketing-for-education', title: 'Digital Marketing for Education', ind: 'Education', h1: 'Digital Marketing for Institutes & Colleges', desc: 'Increase admission inquiries, schedule campus walk-throughs, and rank for high-intent course keywords.' },
  { slug: 'social-media-marketing-for-restaurants', title: 'Social Media Marketing for Restaurants', ind: 'Restaurants', h1: 'Social Media Marketing for Restaurants', desc: 'Attract local dine-ins with trending Reels, visual menus, and geofenced social campaigns.' },
  { slug: 'social-media-marketing-for-ecommerce', title: 'Social Media Marketing for E-commerce', ind: 'E-commerce', h1: 'Social Media Marketing for E-commerce Brands', desc: 'Drive store sales, coordinate creator reviews, and launch retargeting ad campaigns.' },
  { slug: 'google-ads-for-local-businesses', title: 'Google Ads for Local Businesses', ind: 'Local PPC', h1: 'Google Ads for Local Businesses', desc: 'Generate immediate phone calls and local walk-ins with geotargeted search and maps ads.' },
  { slug: 'meta-ads-for-ecommerce', title: 'Meta Ads for E-commerce', ind: 'E-commerce Ads', h1: 'Meta Ads for E-commerce Brands', desc: 'Scale direct-to-consumer store revenues, optimize pixel retargeting, and track ROAS.' },
  { slug: 'ai-videos-for-businesses', title: 'AI Videos for Businesses', ind: 'AI Video Marketing', h1: 'AI Videos for Businesses', desc: 'Create explainer video assets, programmatic social reels, and ad creatives using AI tools.' },
  { slug: 'agentic-ai-for-customer-support', title: 'Agentic AI for Customer Support', ind: 'AI Support Agents', h1: 'Agentic AI for Customer Support', desc: 'Deploy autonomous AI agents that resolve support tickets, check orders, and query databases.' },
  { slug: 'agentic-ai-for-business-automation', title: 'Agentic AI for Business Automation', ind: 'AI Process Automation', h1: 'Agentic AI for Business Automation', desc: 'Automate multi-step approval lines, compile reports, and sync datasets across office tools.' }
];

industryPages.forEach(p => {
  data[p.slug] = {
    slug: p.slug,
    type: 'product',
    seo: {
      title: `${p.title} | Avani Enterprises`,
      description: `${p.desc} Custom digital strategies designed for the specific workflow of the ${p.ind} sector.`,
      keywords: `digital marketing, web development, ${p.ind.toLowerCase()}, industry growth, business automation`,
      canonical: `https://www.avanienterprises.in/${p.slug}`
    },
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Industries', href: '/services' },
      { label: p.ind, href: `/${p.slug}` }
    ],
    hero: {
      tag: 'Industry-Specific Solutions',
      h1: p.h1,
      subtitle: p.desc,
      stats: [
        { value: '150+', label: 'Clients Served' },
        { value: '300+', label: 'Projects Completed' },
        { value: '2s', label: 'Average Load Time' },
        { value: '8+', label: 'Years Tech Experience' }
      ]
    },
    introHeading: `Tailored Digital Systems for ${p.ind}`,
    intro: `Every sector has unique customer acquisition pipelines and operational rules. We design custom ${p.title.toLowerCase()} systems that directly match how your industry buyers search, evaluate, and purchase.`,
    whyAvani: [
      { title: 'Built for Your Audience', desc: `We research competitor gaps and customer search journeys specific to the ${p.ind} sector.` },
      { title: 'No Per-Seat License Fees', desc: 'Own your backend software. We build on your secure servers with zero monthly seat costs.' },
      { title: 'Sub-2-Second Load Speed', desc: 'High-performance React development ensuring quick page loads on all mobile devices.' },
      { title: '24/7 Account Support', desc: 'Direct secure access to support engineers available over WhatsApp and phone for edits.' }
    ],
    features: [
      { title: 'Bespoke UI Design', desc: `Polished user interfaces built specifically to build trust in the ${p.ind} market.` },
      { title: 'Search Optimization Setup', desc: 'Clean local schema, semantic URLs, and keyword optimization built-in to rank on Google.' },
      { title: 'Statutory Data Security', desc: 'Strict database encryption standards (SSL/TLS) and secure login routing portals.' },
      { title: 'Analytics Tracking Control', desc: 'Detailed GA4 and conversion dashboards tracking click-to-leads and cost performance.' },
      { title: 'Responsive Layout builds', desc: 'Web design checked on actual smartphones to guarantee smooth mobile browsing.' },
      { title: 'API Sync Connectors', desc: 'Integrate your core software with tools like Salesforce, active directories, or custom WhatsApp lines.' }
    ],
    bodySections: [
      {
        heading: `Maximize Customer Conversion in ${p.ind}`,
        paragraphs: [
          `Generic digital platforms and general ad campaigns fail to deliver conversions when they are not tuned to the specific needs of ${p.ind}. We map candidate profiles, buyer budgets, and local search intent to build custom sales funnels.`,
          'From automated email scheduling to CRM deal pipelines, we align technology and copywriting to turn site visitors into signed clients.'
        ]
      },
      {
        heading: 'Complete Security and Regulatory Compliance',
        paragraphs: [
          'We implement strict access boundaries and database security rules to keep client records and lead entries safe. The team receives complete documentation and source code rights.',
          'Scale your business digital assets with confidence alongside a high-performance engineering partner.'
        ]
      }
    ],
    faqs: [
      { q: `What is included in your ${p.title.toLowerCase()} service?`, a: `We provide complete delivery: target market research, user flow designs, React coding, local SEO setup, database integrations, and launch audits.` },
      { q: 'How long does a standard project take?', a: 'Standard business sites launch in 2 to 3 weeks, while custom databases and apps are ready in 4 to 8 weeks.' },
      { q: 'Do we own the software code?', a: 'Yes. You receive 100% ownership rights to all custom code and database records with no recurring platform licenses.' },
      { q: 'How do we schedule a strategy call?', a: 'Reach out to our product consultants at +91 92536 25099 or email kp@avanienterprises.in to arrange a scoping call.' }
    ],
    internalLinks: [
      { label: 'All Services Overview', href: '/services', desc: 'Explore all digital and tech options.' },
      { label: 'Business OS Platform', href: '/business-os', desc: 'Unified employee and sales system.' },
      { label: 'SEO Audit', href: '/seo-company', desc: 'Rank higher on Google searches.' },
      { label: 'SocialSync Tool', href: '/social-sync', desc: 'Direct social posting and auto-DMs.' }
    ],
    cta: {
      headline: `Build Your Dedicated ${p.ind} System`,
      sub: `Schedule a free strategy call. Let's evaluate your target audience in the ${p.ind} market and draft a clear tech plan.`
    }
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// Output Files Build
// ─────────────────────────────────────────────────────────────────────────────
const outputJsonPath = path.join(__dirname, '..', 'src', 'data', 'newSeoPagesData.json');
fs.writeFileSync(outputJsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`✅ Generated ${Object.keys(data).length} SEO pages data configuration -> ${outputJsonPath}`);

// Generate api/newSeoData.js static lookup for Vercel
const apiLookup = {};
Object.keys(data).forEach(k => {
  apiLookup[`/${k}`] = {
    title: data[k].seo.title,
    description: data[k].seo.description,
    keywords: data[k].seo.keywords
  };
});

const outputJsPath = path.join(__dirname, '..', 'api', 'newSeoData.js');
const jsContent = `// Automatically generated file. Do not edit.
export const newSeoData = ${JSON.stringify(apiLookup, null, 2)};
`;
fs.writeFileSync(outputJsPath, jsContent, 'utf8');
console.log(`✅ Generated serverless SEO lookup configurations -> ${outputJsPath}`);
