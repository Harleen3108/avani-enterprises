import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Web Design Company in Chandigarh | Custom Websites & Apps — Avani Enterprises',
    description: 'Avani Enterprises is a leading web design & development company in Chandigarh. We craft fast, SEO-ready websites, e-commerce stores & web apps for businesses across the Tricity — Chandigarh, Mohali & Panchkula. Free quote in 24 hrs.',
    keywords: 'web design company chandigarh, web development company chandigarh, website development chandigarh, web designers mohali, ecommerce website chandigarh, web development panchkula, website design tricity, web app development chandigarh',
    canonical: 'https://www.avanienterprises.in/web-development-company-chandigarh',
    ogImage: 'https://www.avanienterprises.in/logo0.webp',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Web Development', href: '/services/web-app-development' },
    { label: 'Web Design Company — Chandigarh', href: '/web-development-company-chandigarh' },
  ],
  hero: {
    tag: '🏆 Tricity\'s Creative Web Design Studio',
    h1: 'Web Design Company in Chandigarh',
    subtitle: 'Beautiful, fast, conversion-ready websites and web apps for businesses across Chandigarh, Mohali, and Panchkula — designed to make the Tricity\'s best brands stand out online.',
    stats: [
      { value: '70+', label: 'Tricity Projects' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '3×', label: 'Avg Lead Growth' },
      { value: '24hr', label: 'Quote Turnaround' },
    ],
  },
  intro: `Chandigarh and the wider Tricity — Mohali and Panchkula — blend established businesses, a thriving IT scene in the Chandigarh IT Park and Mohali, strong education and healthcare sectors, and a fresh wave of startups. Avani Enterprises helps these brands present themselves online with the polish the City Beautiful is known for.

We design and develop custom websites, e-commerce stores, and web applications that are visually refined, lightning-fast, and built to rank on Google. Whether you're a Sector 17 retailer, a Mohali SaaS startup, or a Panchkula clinic, we deliver a site that looks premium and works hard to bring you enquiries.`,
  whyAvani: [
    { title: 'Design-Led Approach', desc: 'Clean, modern aesthetics that match the Tricity\'s appreciation for quality — every layout crafted, never templated.' },
    { title: 'SEO-First Build', desc: 'Schema, fast Core Web Vitals and local optimisation tuned for Chandigarh, Mohali and Panchkula searches.' },
    { title: 'Full-Service Delivery', desc: 'Design, development, hosting and marketing in-house — one team accountable from concept to launch.' },
    { title: 'Honest Fixed Pricing', desc: 'Transparent, locked quotes with no surprises — perfect for Tricity SMBs and first-time founders.' },
  ],
  localAreaText: `We serve businesses across the Tricity — Chandigarh (Sectors 17, 34, 35, IT Park), Mohali (Phase 7, 8, Industrial Area, Aerocity), and Panchkula (Sectors 5, 8, MDC). Free discovery calls available, with on-site visits across the region.`,
  areaServed: ['Sector 17', 'Sector 34', 'Chandigarh IT Park', 'Mohali', 'Mohali Phase 8', 'Aerocity', 'Panchkula', 'Zirakpur', 'Kharar', 'Tricity'],
  features: [
    { icon: '🎨', title: 'Premium Web Design', desc: 'Distinctive, brand-led visual design that helps Tricity businesses look every bit as good as the competition.' },
    { icon: '🖥️', title: 'Custom Website Development', desc: 'Hand-built corporate and business websites with clean, maintainable code — no bloated page builders.' },
    { icon: '🛒', title: 'E-Commerce Development', desc: 'Online stores with UPI/Razorpay/PhonePe, inventory, GST invoicing and a frictionless mobile checkout.' },
    { icon: '🚀', title: 'Web App Development', desc: 'Custom dashboards and portals for Mohali\'s IT and SaaS companies, built on the MERN/Next.js stack.' },
    { icon: '⚡', title: 'Speed Optimisation', desc: 'Sub-2-second loads and green Core Web Vitals that lift both your rankings and conversion rate.' },
    { icon: '📱', title: 'Mobile-First Responsive', desc: 'Flawless across Android, iOS, tablet and desktop — verified on real devices before launch.' },
    { icon: '🔒', title: 'Secure Hosting & SSL', desc: 'SSL, automated backups, DDoS protection and reliable cloud hosting included.' },
    { icon: '📊', title: 'Analytics & Tracking', desc: 'GA4, Search Console and conversion tracking set up so you can measure every enquiry.' },
  ],
  faqs: [
    { q: 'How much does web design cost in Chandigarh?', a: 'In Chandigarh and the Tricity, websites generally range from ₹15,000 for a brochure site to ₹1,50,000+ for e-commerce or web apps. We send a clear, fixed quote within 24 hours of a free consultation.' },
    { q: 'Do you serve Mohali and Panchkula as well?', a: 'Yes. We work across the entire Tricity — Chandigarh, Mohali, Panchkula, Zirakpur and Kharar — with free discovery calls and on-site visits for larger projects.' },
    { q: 'How long does a website take to build?', a: 'A standard business website takes 2–4 weeks, e-commerce 4–8 weeks, and custom web apps 6–12 weeks. We agree a timeline at the start and deliver on schedule.' },
    { q: 'Do you build websites for clinics, institutes and IT firms?', a: 'Yes. We have deep experience with healthcare, education and IT clients across the Tricity, building appointment systems, admission forms, and B2B portals.' },
    { q: 'Will my website rank on Google?', a: 'Every site is built on solid technical SEO foundations. For competitive Chandigarh keywords, we recommend pairing development with our ongoing SEO service for the best rankings.' },
    { q: 'Can you redesign my outdated website?', a: 'Yes. We modernise existing websites while protecting your current SEO rankings and URLs through careful migration and redirects.' },
    { q: 'Is post-launch support included?', a: 'Yes — 30 days of free support comes with every project, plus optional annual maintenance for security, backups and updates.' },
    { q: 'How do I get started?', a: 'Call +91 92536 25099 or fill the contact form for a free 30-minute consultation and a detailed proposal within 24 hours.' },
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development — Delhi', href: '/web-development-company-delhi', desc: 'Custom website development for Delhi businesses.' },
    { label: 'Web Development — Haryana', href: '/web-development-company-haryana', desc: 'Web development across Haryana, near the Tricity.' },
    { label: 'Web Development — India', href: '/web-development-company-india', desc: 'Pan-India website & web app development.' },
    { label: 'SEO Company — Haryana', href: '/seo-company-haryana', desc: 'Rank your Tricity website higher on Google.' },
    { label: 'Digital Marketing — Haryana', href: '/digital-marketing-agency-haryana', desc: 'SEO, social media & PPC for Chandigarh brands.' },
  ],
  cta: {
    headline: 'Ready for a Website That Wows the Tricity?',
    sub: 'Get a free consultation and a fixed-price quote within 24 hours from Chandigarh\'s design-led web development team.',
  },
  service: 'Web Design',
  city: 'Chandigarh',
  localBizDescription: 'Avani Enterprises is a leading web design and development company in Chandigarh, crafting custom websites, e-commerce stores, and web apps for businesses across the Tricity — Chandigarh, Mohali, and Panchkula.',
};

export default function WebDevChandigarh() {
  return <LocalServicePage {...PAGE} />;
}
