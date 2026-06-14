import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Best Web Development Company in Gurgaon | Custom Websites & Apps — Avani Enterprises',
    description: 'Avani Enterprises is a top web development company in Gurgaon (Gurugram). We build fast, SEO-ready custom websites, e-commerce stores & web apps for startups and MNCs across Cyber City, Golf Course Road & Sohna Road. Free quote in 24 hrs.',
    keywords: 'web development company gurgaon, website development company gurgaon, best web development company gurugram, web design company gurgaon, custom website development gurgaon, ecommerce website gurgaon, web app development gurugram, website designers cyber city',
    canonical: 'https://www.avanienterprises.in/web-development-company-gurgaon',
    ogImage: 'https://www.avanienterprises.in/logo0.jpg',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Web Development', href: '/services/web-app-development' },
    { label: 'Web Development Company — Gurgaon', href: '/web-development-company-gurgaon' },
  ],
  hero: {
    tag: '🏆 Gurgaon\'s Premium Web Development Studio',
    h1: 'Best Web Development Company in Gurgaon',
    subtitle: 'From Cyber City startups to Golf Course Road enterprises, we design and build conversion-focused websites, e-commerce platforms, and custom web apps that match the pace of Gurugram business.',
    stats: [
      { value: '90+', label: 'Gurgaon Projects' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '3×', label: 'Avg Lead Growth' },
      { value: '24hr', label: 'Quote Turnaround' },
    ],
  },
  intro: `Gurgaon (Gurugram) is India's corporate powerhouse — home to Fortune 500 offices, fast-scaling startups, D2C brands, and ambitious SMBs. In a market this competitive, a slow or outdated website costs you real revenue. Avani Enterprises builds premium digital experiences engineered for the Gurugram audience: sharp design, sub-2-second load times, and conversion paths that turn clicks into qualified leads.

We've delivered corporate sites, SaaS dashboards, and high-volume e-commerce stores for businesses across Cyber City, Udyog Vihar, Sohna Road, MG Road, and DLF Phases 1–5. Every project is built mobile-first, SEO-ready from day one, and backed by a local team that understands the expectations of Gurgaon's demanding clientele.`,
  whyAvani: [
    { title: 'Gurgaon-Ready Design Quality', desc: 'Premium, enterprise-grade UI that holds up next to the MNC brands your customers compare you to — no template look, ever.' },
    { title: 'SEO-First Architecture', desc: 'Clean code, schema markup, fast Core Web Vitals and local SEO tuned for "near me" and Gurugram-intent searches.' },
    { title: 'Startup to Enterprise Scale', desc: 'From a ₹20k MVP landing page to a multi-module web app, our stack scales with your funding stage and traffic.' },
    { title: 'One Accountable Team', desc: 'Design, build, hosting, and marketing in-house — fast turnarounds and a single point of contact, not agency hand-offs.' },
  ],
  localAreaText: `We actively serve businesses across Gurugram — Cyber City, Udyog Vihar, DLF Phases 1–5, Golf Course Road, Sohna Road, MG Road, Sushant Lok, Sector 14/29/44, and New Gurgaon. We offer free discovery calls and on-site visits for enterprise clients across Delhi NCR.`,
  areaServed: ['Cyber City', 'Udyog Vihar', 'Golf Course Road', 'Sohna Road', 'MG Road', 'DLF Phase 1-5', 'Sector 44', 'New Gurgaon', 'Manesar', 'Delhi NCR'],
  features: [
    { icon: '🖥️', title: 'Custom Corporate Websites', desc: 'Enterprise-grade brochure and corporate sites that signal credibility to Gurgaon investors, partners, and B2B buyers.' },
    { icon: '🛒', title: 'E-Commerce & D2C Stores', desc: 'High-converting online stores with UPI/Razorpay/PhonePe, inventory, GST invoicing, and fast mobile checkout.' },
    { icon: '🚀', title: 'SaaS & Web App Development', desc: 'Custom dashboards, portals, and SaaS products built on MERN/Next.js — scalable for funded Gurugram startups.' },
    { icon: '⚡', title: 'Core Web Vitals Optimisation', desc: 'Sub-2s loads, LCP < 2.5s and CLS < 0.1 so your site passes Google\'s performance bar and ranks higher.' },
    { icon: '📱', title: 'Mobile-First Responsive Build', desc: 'Pixel-perfect across Android, iOS, tablet and desktop — tested on real devices before launch.' },
    { icon: '🔒', title: 'Secure Cloud Hosting', desc: 'SSL, DDoS protection, automated backups and cloud infra that scales from launch-day spikes to steady growth.' },
    { icon: '📊', title: 'Analytics & Conversion Tracking', desc: 'GA4, Search Console, Meta Pixel and goal tracking configured so every campaign rupee is measurable.' },
    { icon: '🔌', title: 'CRM & API Integrations', desc: 'WhatsApp Business API, HubSpot/Zoho CRM, payment gateways and ERP integrations wired in cleanly.' },
  ],
  faqs: [
    { q: 'How much does website development cost in Gurgaon?', a: 'In Gurgaon, a professional business website typically ranges from ₹20,000 to ₹2,00,000+, depending on scope. Corporate sites and e-commerce platforms cost more than brochure sites. We give a fixed, itemised quote within 24 hours of a free discovery call.' },
    { q: 'Do you work with Gurgaon startups and MNCs?', a: 'Yes. We serve everyone from seed-stage Cyber City startups to established enterprises on Golf Course Road. We tailor scope, design polish and stack to your stage — MVPs for startups and robust, compliant platforms for larger firms.' },
    { q: 'How long does it take to build a website?', a: 'A standard business website takes 2–4 weeks, e-commerce 4–8 weeks, and custom web apps 6–12 weeks. Gurgaon clients with launch deadlines can opt for our fast-track delivery on simpler builds.' },
    { q: 'Can you build a SaaS product or custom web app?', a: 'Absolutely. We build SaaS dashboards, customer portals and internal tools on the MERN/Next.js stack, with secure authentication, role-based access, and APIs ready for scale.' },
    { q: 'Will my website rank on Google in Gurgaon?', a: 'Every site ships with technical SEO — clean URLs, schema, sitemaps and fast load times. For competitive Gurugram keywords, we recommend pairing development with our ongoing SEO service for top rankings.' },
    { q: 'Do you offer maintenance after launch?', a: 'Yes. Every project includes 30 days of free post-launch support, and we offer annual maintenance covering security, backups, speed and content updates.' },
    { q: 'Can you redesign our existing website without losing rankings?', a: 'Yes. We carefully migrate content, preserve URL structures and add 301 redirects so your existing Google rankings and traffic are protected during a redesign.' },
    { q: 'How do we get started?', a: 'Call +91 92536 25099 or fill the contact form. We\'ll book a free 30-minute discovery call and send a detailed proposal within 24 hours.' },
  ],
  reviews: [
    { name: 'Karan Malhotra', role: 'Founder, NexaCloud SaaS', city: 'Cyber City, Gurgaon', text: 'Avani built our SaaS marketing site and onboarding dashboard. Clean code, fast delivery and it looks as polished as any MNC site in Cyber City. Lead sign-ups jumped 40%.' },
    { name: 'Ritu Ahuja', role: 'Director, Bloom D2C', city: 'Sohna Road, Gurgaon', text: 'Our Shopify-style store was rebuilt in 4 weeks with UPI checkout. Mobile sales nearly doubled. Genuinely the best web development company in Gurgaon we\'ve worked with.' },
    { name: 'Vivek Sethi', role: 'CEO, Sethi Realty', city: 'Golf Course Road, Gurgaon', text: 'Premium property listing site that generates 60+ leads a month. The team understood the Gurugram real estate audience perfectly.' },
    { name: 'Ananya Rao', role: 'Marketing Head, FinEdge', city: 'Udyog Vihar, Gurgaon', text: 'Responsive, fast, and SEO-ready. Our organic traffic tripled within a quarter of relaunch. Highly recommended for any Gurgaon business.' },
  ],
  relatedLinks: [
    { label: 'Web Development — Delhi', href: '/web-development-company-delhi', desc: 'Custom website development for Delhi businesses.' },
    { label: 'Web Development — Noida', href: '/web-development-company-noida', desc: 'Websites & web apps for Noida & Greater Noida.' },
    { label: 'Web Development — Haryana', href: '/web-development-company-haryana', desc: 'Web development across the wider Haryana region.' },
    { label: 'Digital Marketing Agency — Haryana', href: '/digital-marketing-agency-haryana', desc: 'SEO, social media & PPC to grow your Gurgaon brand.' },
    { label: 'Google Ads Agency — Haryana', href: '/google-ads-agency-haryana', desc: 'High-ROI Google Ads campaigns for Gurugram businesses.' },
  ],
  cta: {
    headline: 'Ready to Build a Website That Performs in Gurgaon?',
    sub: 'Get a free consultation and a fixed-price quote within 24 hours from Gurugram\'s conversion-focused web development team.',
  },
  service: 'Web Development',
  city: 'Gurgaon',
  localBizDescription: 'Avani Enterprises is a leading web development company in Gurgaon (Gurugram), building custom websites, e-commerce stores, and SaaS web apps for startups and enterprises across Cyber City, Golf Course Road, and Sohna Road.',
};

export default function WebDevGurgaon() {
  return <LocalServicePage {...PAGE} />;
}
