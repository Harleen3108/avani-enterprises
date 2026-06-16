import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Best Web Development Company in Pune | Custom Websites & Apps — Avani Enterprises',
    description: 'Avani Enterprises is a top web development company in Pune. We build fast, SEO-ready websites, e-commerce stores & web apps for IT, automotive, education & manufacturing businesses across Hinjewadi, Kharadi & Baner. Free quote in 24 hrs.',
    keywords: 'web development company pune, website development company pune, best web development company pune, web design company pune, ecommerce website development pune, web app development pune, website designers hinjewadi kharadi',
    canonical: 'https://www.avanienterprises.in/web-development-company-pune',
    ogImage: 'https://www.avanienterprises.in/logo0.webp',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Web Development', href: '/services/web-app-development' },
    { label: 'Web Development Company — Pune', href: '/web-development-company-pune' },
  ],
  hero: {
    tag: '🏆 Pune\'s Reliable Web Development Partner',
    h1: 'Best Web Development Company in Pune',
    subtitle: 'Custom websites, e-commerce stores, and web apps for Pune\'s IT, automotive, education, and manufacturing businesses — built fast, built to rank, built to convert.',
    stats: [
      { value: '75+', label: 'Pune Projects' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '3×', label: 'Avg Traffic Growth' },
      { value: '24hr', label: 'Quote Turnaround' },
    ],
  },
  intro: `Pune blends a powerhouse IT sector, a deep automotive and manufacturing base, and one of India's largest student populations — a uniquely diverse market. From Hinjewadi's tech parks to Kharadi's IT hubs and Pimpri-Chinchwad's industrial belt, Pune businesses need websites that are professional, fast, and effective. Avani Enterprises delivers exactly that.

We build corporate websites, e-commerce platforms, B2B portals, and custom web applications tailored to Pune's industries. Every project is mobile-first, technically SEO-optimised, and backed by transparent pricing and dependable post-launch support — so your digital presence keeps working long after launch.`,
  whyAvani: [
    { title: 'Industry-Aware Builds', desc: 'Experience across Pune\'s IT, automotive, manufacturing and education sectors — we design for the audience each one serves.' },
    { title: 'SEO-First Architecture', desc: 'Schema, fast Core Web Vitals and clean structure tuned for Pune and Maharashtra search intent.' },
    { title: 'Scalable Code Quality', desc: 'Clean MERN/Next.js builds that grow from a simple site to a full platform without expensive rewrites.' },
    { title: 'Transparent Fixed Pricing', desc: 'Locked quotes with no hidden charges — ideal for Pune SMBs, manufacturers and education institutes.' },
  ],
  localAreaText: `We serve businesses across Pune and PCMC — Hinjewadi, Kharadi, Baner, Viman Nagar, Magarpatta, Hadapsar, Shivajinagar, and Pimpri-Chinchwad. Free discovery calls available, with on-site visits for enterprise clients.`,
  areaServed: ['Hinjewadi', 'Kharadi', 'Baner', 'Viman Nagar', 'Magarpatta', 'Hadapsar', 'Shivajinagar', 'Pimpri-Chinchwad', 'Pune', 'Maharashtra'],
  features: [
    { icon: '🖥️', title: 'Custom Website Development', desc: 'Brand-aligned, conversion-focused websites built specifically for your Pune business — never templated.' },
    { icon: '🛒', title: 'E-Commerce Development', desc: 'Online stores with UPI/Razorpay/PhonePe, inventory, GST invoicing and a smooth mobile checkout.' },
    { icon: '🚀', title: 'Web App & B2B Portals', desc: 'Custom dashboards and portals for Pune\'s IT firms, manufacturers and exporters on MERN/Next.js.' },
    { icon: '⚡', title: 'Speed & Core Web Vitals', desc: 'Sub-2-second load times and green Web Vitals that lift both rankings and conversions.' },
    { icon: '📱', title: 'Mobile-First Responsive', desc: 'Flawless across Android, iOS, tablet and desktop — verified on real devices before launch.' },
    { icon: '🔒', title: 'Secure & Scalable Hosting', desc: 'SSL, DDoS protection, automated backups and cloud hosting that handles growth effortlessly.' },
    { icon: '📊', title: 'Analytics Setup', desc: 'GA4, Search Console, Meta Pixel and conversion tracking configured and verified before go-live.' },
    { icon: '🔌', title: 'CMS & API Integration', desc: 'WordPress, headless CMS or custom panels, plus WhatsApp API, CRM and ERP integrations.' },
  ],
  faqs: [
    { q: 'How much does a website cost in Pune?', a: 'In Pune, websites typically range from ₹18,000 for a brochure site to ₹2,00,000+ for e-commerce and web apps. We provide a detailed, fixed-price quote within 24 hours of a free consultation.' },
    { q: 'Do you work with IT firms and manufacturers in Pune?', a: 'Yes. We serve Pune\'s IT companies in Hinjewadi and Kharadi, automotive and manufacturing firms in PCMC, and education institutes — building corporate sites, B2B portals and product catalogues.' },
    { q: 'How long does development take?', a: 'A standard business website takes 2–4 weeks, e-commerce 4–8 weeks, and custom web apps 6–12 weeks. We share a clear timeline up front and stick to it.' },
    { q: 'Do you build websites for education institutes?', a: 'Yes. With Pune\'s large student population, we build institute and coaching websites with admission enquiry forms, course catalogues and online payment integration.' },
    { q: 'Will my website rank on Google in Pune?', a: 'Every build includes technical SEO foundations. For competitive Pune keywords, we recommend our ongoing SEO service to achieve and hold top rankings.' },
    { q: 'Can you redesign my existing website?', a: 'Yes. We modernise existing sites while preserving SEO rankings and URLs through careful migration and 301 redirects, so you don\'t lose traffic.' },
    { q: 'Is post-launch support included?', a: 'Yes — 30 days of free support comes with every project, plus affordable annual maintenance plans for security, backups and updates.' },
    { q: 'How do I get started?', a: 'Call +91 92536 25099 or fill the contact form for a free 30-minute discovery call and a proposal within 24 hours.' },
  ],
  reviews: [
    { name: 'Mahesh Kulkarni', role: 'Director, TechBridge IT', city: 'Hinjewadi, Pune', text: 'Avani rebuilt our company site and client portal. Clean code, fast delivery and noticeably more enquiries from Google. A dependable web development company in Pune.' },
    { name: 'Aishwarya Patil', role: 'Owner, Saaj Handicrafts', city: 'Kharadi, Pune', text: 'Our e-commerce store launched in under five weeks with smooth UPI checkout. Online orders have grown month on month since.' },
    { name: 'Rohit Deshmukh', role: 'GM, AutoParts Industries', city: 'Pimpri-Chinchwad', text: 'They built a multilingual product catalogue that impresses our B2B buyers. On-time delivery and great support.' },
    { name: 'Prachi Joshi', role: 'Admin Head, Vidya Academy', city: 'Baner, Pune', text: 'Our institute website handles admission enquiries beautifully and looks great on mobile. Leads have clearly improved.' },
  ],
  relatedLinks: [
    { label: 'Web Development — Mumbai', href: '/web-development-company-mumbai', desc: 'Custom web development for Mumbai brands.' },
    { label: 'Web Development — Bangalore', href: '/web-development-company-bangalore', desc: 'Custom web & SaaS development in Bengaluru.' },
    { label: 'Web Development — Hyderabad', href: '/web-development-company-hyderabad', desc: 'Web development for Hyderabad\'s tech & pharma firms.' },
    { label: 'Web Development — India', href: '/web-development-company-india', desc: 'Pan-India website & web app development.' },
    { label: 'Web Development — Delhi', href: '/web-development-company-delhi', desc: 'Custom website development for Delhi businesses.' },
  ],
  cta: {
    headline: 'Ready to Grow Your Pune Business Online?',
    sub: 'Get a free consultation and a fixed-price quote within 24 hours from a web development team that understands Pune\'s industries.',
  },
  service: 'Web Development',
  city: 'Pune',
  localBizDescription: 'Avani Enterprises is a leading web development company in Pune, building custom websites, e-commerce stores, and web apps for IT, automotive, education, and manufacturing businesses across Hinjewadi, Kharadi, and PCMC.',
};

export default function WebDevPune() {
  return <LocalServicePage {...PAGE} />;
}
