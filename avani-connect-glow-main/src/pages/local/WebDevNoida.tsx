import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Web Development Services in Noida | Custom Websites & Apps — Avani Enterprises',
    description: 'Looking for web development services in Noida? Avani Enterprises builds fast, SEO-ready websites, e-commerce stores & web apps for businesses across Noida, Greater Noida & the Noida Expressway. Free consultation & quote in 24 hrs.',
    keywords: 'web development services noida, web development company noida, website development noida, web design company noida, ecommerce website development noida, web app development greater noida, website designers noida expressway',
    canonical: 'https://www.avanienterprises.in/web-development-company-noida',
    ogImage: 'https://www.avanienterprises.in/logo0.webp',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Web Development', href: '/services/web-app-development' },
    { label: 'Web Development Company — Noida', href: '/web-development-company-noida' },
  ],
  hero: {
    tag: '🏆 Noida\'s Trusted Web Development Partner',
    h1: 'Web Development Services in Noida',
    subtitle: 'Custom websites, e-commerce platforms, and web applications for Noida\'s IT firms, manufacturers, and D2C brands — built for speed, search rankings, and conversions.',
    stats: [
      { value: '80+', label: 'Noida Projects' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '3×', label: 'Avg Traffic Growth' },
      { value: '24hr', label: 'Quote Turnaround' },
    ],
  },
  intro: `Noida and Greater Noida have become one of North India's fastest-growing business corridors — packed with IT companies, BPOs, manufacturing units, educational institutions, and a booming D2C startup scene. Avani Enterprises helps these businesses win online with websites that load fast, rank on Google, and convert visitors into customers.

From sector-based SMBs to enterprises along the Noida-Greater Noida Expressway, we deliver everything from corporate websites and e-commerce stores to custom web applications and admin dashboards. Each build is mobile-first, technically SEO-optimised, and supported by a responsive team that treats your deadlines as seriously as you do.`,
  whyAvani: [
    { title: 'Noida Market Understanding', desc: 'We know the local mix of IT, manufacturing and education clients — and design for the audiences each one needs to reach.' },
    { title: 'SEO-First Architecture', desc: 'Schema markup, clean URLs and fast Core Web Vitals so you rank for Noida and Greater Noida search intent.' },
    { title: 'Scalable Build Quality', desc: 'Clean MERN/Next.js code that grows from a simple site to a full web platform without costly rewrites.' },
    { title: 'Transparent Fixed Pricing', desc: 'Locked project quotes with no hidden charges — ideal for budget-conscious Noida SMBs and startups.' },
  ],
  localAreaText: `We serve businesses across Noida and Greater Noida — Sector 18, 62, 63, 132, 135, Film City, the Noida Expressway, Knowledge Park, and Greater Noida West (Noida Extension). Free discovery calls and on-site visits available across Delhi NCR.`,
  areaServed: ['Sector 18', 'Sector 62', 'Sector 63', 'Sector 132', 'Noida Expressway', 'Film City', 'Greater Noida', 'Knowledge Park', 'Noida Extension', 'Delhi NCR'],
  features: [
    { icon: '🖥️', title: 'Custom Website Design', desc: 'Brand-aligned, conversion-driven designs built specifically for your Noida business — no recycled templates.' },
    { icon: '🛒', title: 'E-Commerce Development', desc: 'Online stores with UPI/Razorpay/PhonePe, inventory, GST invoicing and a smooth mobile checkout flow.' },
    { icon: '🚀', title: 'Web App & Portal Development', desc: 'Custom dashboards, B2B portals and internal tools for Noida IT firms and manufacturers.' },
    { icon: '⚡', title: 'Speed & Core Web Vitals', desc: 'Sub-2-second load times and green Core Web Vitals that improve both rankings and conversions.' },
    { icon: '📱', title: 'Mobile-Responsive Layouts', desc: 'Fully responsive across all devices, tested on real Android and iOS handsets before going live.' },
    { icon: '🔒', title: 'Secure & Scalable Hosting', desc: 'SSL, automated backups, DDoS protection and cloud hosting that handles traffic spikes effortlessly.' },
    { icon: '📊', title: 'Analytics Setup', desc: 'GA4, Search Console, Meta Pixel and conversion tracking configured and verified before launch.' },
    { icon: '🔌', title: 'CMS & API Integration', desc: 'WordPress, headless CMS or custom panels, plus WhatsApp API, CRM and ERP integrations.' },
  ],
  faqs: [
    { q: 'How much does a website cost in Noida?', a: 'Websites in Noida typically range from ₹18,000 for a brochure site to ₹1,80,000+ for a full e-commerce or web-app build. We provide a detailed fixed-price quote within 24 hours of a free discovery call.' },
    { q: 'Do you build websites for IT companies and manufacturers in Noida?', a: 'Yes. We work with Noida\'s IT firms, BPOs, manufacturers, exporters, and educational institutions, building everything from corporate sites to B2B portals and product catalogues.' },
    { q: 'How long does development take?', a: 'A standard business website takes 2–4 weeks, e-commerce 4–8 weeks, and custom web apps 6–12 weeks. We share a clear timeline up front and stick to it.' },
    { q: 'Do you serve Greater Noida and Noida Extension too?', a: 'Absolutely. We serve all of Noida, Greater Noida, Knowledge Park, and Greater Noida West (Noida Extension), with free discovery calls and on-site visits across NCR.' },
    { q: 'Will my website rank on Google?', a: 'Every build includes technical SEO foundations — schema, fast load times, sitemaps and clean structure. For competitive Noida keywords, we recommend our ongoing SEO service.' },
    { q: 'Can you redesign my existing website?', a: 'Yes. We modernise existing sites while preserving SEO rankings and URLs through careful migration and 301 redirects, so you don\'t lose traffic.' },
    { q: 'Do you provide post-launch support?', a: 'Yes — 30 days of free support is included, with affordable annual maintenance plans for security, backups, speed and content updates.' },
    { q: 'How do I get started?', a: 'Call +91 92536 25099 or fill the contact form. We\'ll set up a free 30-minute discovery call and send a proposal within 24 hours.' },
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development — Delhi', href: '/web-development-company-delhi', desc: 'Custom website development for Delhi businesses.' },
    { label: 'Web Development — Gurgaon', href: '/web-development-company-gurgaon', desc: 'Premium websites & web apps for Gurugram.' },
    { label: 'Web Development — Haryana', href: '/web-development-company-haryana', desc: 'Web development across the wider Haryana region.' },
    { label: 'SEO Company — Delhi', href: '/seo-company-delhi', desc: 'Rank your Noida/NCR website higher on Google.' },
    { label: 'Digital Marketing — Delhi', href: '/digital-marketing-agency-delhi', desc: 'SEO, social media & PPC to grow your Noida brand.' },
  ],
  cta: {
    headline: 'Ready to Grow Your Noida Business Online?',
    sub: 'Get a free consultation and a fixed-price quote within 24 hours from a web development team that knows the Noida market.',
  },
  service: 'Web Development',
  city: 'Noida',
  localBizDescription: 'Avani Enterprises provides web development services in Noida, building custom websites, e-commerce stores, and web apps for IT firms, manufacturers, and startups across Noida, Greater Noida, and the Noida Expressway.',
};

export default function WebDevNoida() {
  return <LocalServicePage {...PAGE} />;
}
