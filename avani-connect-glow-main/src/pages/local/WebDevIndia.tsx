import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Website Development Agency in India | Custom Websites, Apps & E-Commerce — Avani Enterprises',
    description: 'Avani Enterprises is a trusted website development agency in India. We build fast, SEO-ready custom websites, e-commerce platforms & web apps for businesses pan-India and abroad. 150+ projects delivered. Free consultation.',
    keywords: 'website development agency india, web development company india, best web development company in india, custom website development india, ecommerce website development india, web app development company india, software development company india',
    canonical: 'https://www.avanienterprises.in/web-development-company-india',
    ogImage: 'https://www.avanienterprises.in/logo0.webp',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Web Development', href: '/services/web-app-development' },
    { label: 'Website Development Agency — India', href: '/web-development-company-india' },
  ],
  hero: {
    tag: '🇮🇳 Trusted Web Development Agency Across India',
    h1: 'Website Development Agency in India',
    subtitle: 'We build high-performance websites, e-commerce platforms, and custom web applications for ambitious businesses across India and beyond — engineered for speed, search rankings, and real conversions.',
    stats: [
      { value: '150+', label: 'Projects Delivered' },
      { value: '8+', label: 'Years Experience' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '24hr', label: 'Quote Turnaround' },
    ],
  },
  intro: `Avani Enterprises is a full-service website development agency serving clients across India — from metros like Delhi, Mumbai, Bangalore, and Hyderabad to fast-growing Tier-2 and Tier-3 cities, plus NRI and international founders building for the Indian market. With 150+ projects delivered over 8+ years, we combine premium design with rock-solid engineering.

Working remotely with a proven delivery process, we build corporate websites, D2C and e-commerce stores, SaaS products, and bespoke web applications. Every project is mobile-first, technically SEO-optimised, and supported by transparent communication, fixed pricing, and reliable post-launch maintenance — wherever in India (or the world) you're based.`,
  whyAvani: [
    { title: 'Pan-India Remote Delivery', desc: 'A streamlined remote process with clear milestones and daily updates — geography is never a barrier to quality.' },
    { title: 'SEO-First Engineering', desc: 'Schema, fast Core Web Vitals and clean architecture so your site ranks nationally and locally from day one.' },
    { title: 'Full Product Capability', desc: 'From marketing sites to complex SaaS platforms on MERN/Next.js — one partner for your entire digital stack.' },
    { title: 'Transparent Fixed Pricing', desc: 'Clear, locked quotes in INR (or USD for overseas clients) with no hidden charges and on-time delivery.' },
  ],
  localAreaText: `We work with businesses across all of India — Delhi NCR, Mumbai, Bangalore, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Jaipur, Chandigarh and hundreds of other cities — as well as NRI founders in the US, UK, UAE, Canada, and Australia building for Indian and global audiences.`,
  areaServed: ['Delhi NCR', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Pan-India'],
  features: [
    { icon: '🖥️', title: 'Custom Website Development', desc: 'Bespoke, brand-aligned websites engineered for performance and conversions — built to scale nationally.' },
    { icon: '🛒', title: 'E-Commerce Platforms', desc: 'Robust online stores with UPI/Razorpay/PhonePe, multi-warehouse inventory, GST invoicing and fast checkout.' },
    { icon: '🚀', title: 'SaaS & Web App Development', desc: 'Full-featured SaaS products, dashboards and portals with secure auth, role-based access and scalable APIs.' },
    { icon: '⚡', title: 'Performance Engineering', desc: 'Sub-2-second load times and green Core Web Vitals across the country, on every network speed.' },
    { icon: '📱', title: 'Mobile-First Responsive', desc: 'Pixel-perfect experiences on every device, tested across Android, iOS, tablet and desktop.' },
    { icon: '🔒', title: 'Secure Cloud Hosting', desc: 'SSL, DDoS protection, automated backups and cloud infrastructure that scales with national traffic.' },
    { icon: '📊', title: 'Analytics & Tracking', desc: 'GA4, Search Console, Meta Pixel and conversion tracking configured and verified before go-live.' },
    { icon: '🔌', title: 'Integrations & Automation', desc: 'WhatsApp Business API, CRM, payment gateways, ERP and AI automations wired in cleanly.' },
  ],
  faqs: [
    { q: 'How much does website development cost in India?', a: 'Across India, websites range from ₹15,000 for a brochure site to ₹2,00,000+ for e-commerce and custom web apps. We provide a detailed, fixed-price quote within 24 hours of a free consultation, with INR or USD billing.' },
    { q: 'Do you work with clients outside your city?', a: 'Yes. We work remotely with clients across all of India and overseas. Our milestone-based process, regular video calls and shared project tracking make remote delivery seamless.' },
    { q: 'Can you work with NRI and international clients?', a: 'Absolutely. We serve NRI founders and international businesses in the US, UK, UAE, Canada and Australia, with timezone-friendly communication and USD invoicing.' },
    { q: 'How long does a project take?', a: 'A standard website takes 2–4 weeks, e-commerce 4–8 weeks, and SaaS/web apps 6–12 weeks or more depending on scope. We share a detailed timeline before we start.' },
    { q: 'Will my website rank on Google nationally?', a: 'Every build ships with technical SEO foundations. For competitive national keywords, we recommend our ongoing SEO service to consistently rank across India.' },
    { q: 'Can you build a SaaS product end-to-end?', a: 'Yes. We design and build complete SaaS products — frontend, backend, payments, dashboards and APIs — and support them with maintenance as you scale.' },
    { q: 'Do you provide ongoing maintenance and support?', a: 'Yes. Every project includes 30 days of free post-launch support, with affordable annual maintenance plans covering security, backups, performance and content updates.' },
    { q: 'How do we get started?', a: 'Call +91 84487 63134 or fill the contact form. We\'ll schedule a free 30-minute discovery call and send a detailed proposal within 24 hours.' },
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development — Mumbai', href: '/web-development-company-mumbai', desc: 'Websites & web apps for Mumbai businesses.' },
    { label: 'Web Development — Bangalore', href: '/web-development-company-bangalore', desc: 'Custom web & SaaS development in Bengaluru.' },
    { label: 'Web Development — Delhi', href: '/web-development-company-delhi', desc: 'Custom website development for Delhi businesses.' },
    { label: 'Web Development — Hyderabad', href: '/web-development-company-hyderabad', desc: 'Web development for Hyderabad\'s tech & pharma firms.' },
    { label: 'Web Development — Pune', href: '/web-development-company-pune', desc: 'Websites & web apps for Pune businesses.' },
  ],
  cta: {
    headline: 'Ready to Build a World-Class Website from India?',
    sub: 'Get a free consultation and a fixed-price quote within 24 hours from one of India\'s most dependable web development teams.',
  },
  service: 'Web Development',
  city: 'India',
  localBizDescription: 'Avani Enterprises is a website development agency in India, delivering custom websites, e-commerce platforms, and web applications for businesses pan-India and for NRI and international clients.',
};

export default function WebDevIndia() {
  return <LocalServicePage {...PAGE} />;
}
