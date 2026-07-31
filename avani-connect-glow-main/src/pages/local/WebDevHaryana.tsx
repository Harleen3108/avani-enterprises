import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Best Web Development Company in Haryana | Custom Websites & Apps — Avani Enterprises',
    description: 'Looking for the best web development company in Haryana? Avani Enterprises builds fast, SEO-ready custom websites and mobile apps for businesses in Gurgaon, Rohtak, Faridabad & across Haryana. Free consultation.',
    keywords: 'web development company haryana, website development company haryana, best web development company haryana, web design company haryana, custom website development haryana, web app development haryana, website design gurgaon, web development rohtak, web development faridabad',
    canonical: 'https://www.avanienterprises.in/web-development-company-haryana',
    ogImage: 'https://www.avanienterprises.in/logo0.webp',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Web Development', href: '/services/web-app-development' },
    { label: 'Web Development Company — Haryana', href: '/web-development-company-haryana' },
  ],
  hero: {
    tag: '🏆 Haryana\'s Top Web Development Agency',
    h1: 'Best Web Development Company in Haryana',
    subtitle: 'We design and build lightning-fast custom websites, e-commerce stores, and web applications for businesses across Haryana — from Gurgaon boardrooms to Rohtak SMBs. Measurable results guaranteed.',
    stats: [
      { value: '150+', label: 'Websites Launched' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '3×', label: 'Avg Traffic Growth' },
      { value: '48hr', label: 'Support Response' },
    ],
  },
  intro: `Avani Enterprises is Haryana's leading web development company, trusted by startups, SMBs, and established enterprises across Gurgaon, Rohtak, Faridabad, Panipat, and Sonipat. We build digital properties that don't just look premium — they convert visitors into paying customers.

Every website we deliver is engineered for speed (Core Web Vitals green), optimised for search engines from day one, and built with clean code that scales as your business grows. Whether you need a corporate brochure site, an e-commerce platform with payment integration, or a complex web application with custom dashboards, our team handles everything from design to deployment.`,
  whyAvani: [
    { title: 'Haryana-Based Team', desc: 'Local offices in Gurgaon, with project managers who understand the Haryana business landscape, regional competition, and Hindi-language requirements.' },
    { title: 'SEO-First Architecture', desc: 'Every site ships with technical SEO baked in — fast load times, proper schema markup, canonical URLs, and mobile-first layouts that Google rewards.' },
    { title: 'End-to-End Delivery', desc: 'Design, development, hosting, maintenance, and digital marketing under one roof. No agency hand-offs, no finger-pointing when issues arise.' },
    { title: 'Transparent Pricing', desc: 'Fixed project quotes, no hidden charges. We scope the project, lock the price, and deliver on time — ideal for Haryana SMBs managing tight budgets.' },
  ],
  localAreaText: `We are actively serving businesses in Gurgaon (Gurugram), Rohtak, Faridabad, Panipat, Sonipat, Hisar, Karnal, Ambala, and Bhiwani. If your business operates anywhere in Haryana or Delhi NCR, we offer free discovery calls, on-site visits for enterprise clients, and local support teams who speak your language.`,
  areaServed: ['Gurgaon', 'Rohtak', 'Faridabad', 'Panipat', 'Sonipat', 'Hisar', 'Karnal', 'Ambala', 'Delhi', 'Noida'],
  features: [
    { icon: '🖥️', title: 'Custom Website Design', desc: 'Bespoke, brand-aligned designs that reflect your identity and guide visitors toward conversion. No templates — every pixel crafted with purpose.' },
    { icon: '🛒', title: 'E-Commerce Development', desc: 'Full-featured online stores with Razorpay/PhonePe/UPI integration, inventory management, GST invoicing, and mobile-first checkout.' },
    { icon: '📱', title: 'Mobile-Responsive Layouts', desc: 'Every site we build is fully responsive across all screen sizes — tested on Android, iOS, and desktop before delivery.' },
    { icon: '⚡', title: 'Core Web Vitals Optimisation', desc: 'Pages that load under 2 seconds, LCP under 2.5s, CLS under 0.1. We ensure your site passes Google\'s performance benchmarks.' },
    { icon: '🔒', title: 'Secure & Scalable Hosting', desc: 'SSL certificates, DDoS protection, automated backups, and cloud hosting that scales from 100 to 100,000 visitors without breaking.' },
    { icon: '📊', title: 'Analytics & Tracking Setup', desc: 'Google Analytics 4, Search Console, Facebook Pixel, and conversion tracking configured and tested before launch.' },
    { icon: '🔧', title: 'CMS Integration', desc: 'WordPress, headless CMS, or custom admin panels — so your team can update content without needing a developer.' },
    { icon: '🌐', title: 'API & Third-Party Integrations', desc: 'CRM integrations, WhatsApp Business API, payment gateways, accounting software, and ERP system connections.' },
  ],
  faqs: [
    { q: 'How much does a website cost in Haryana?', a: 'Website costs in Haryana range from ₹15,000 for a simple brochure site to ₹1,50,000+ for a full e-commerce platform. At Avani Enterprises, we provide detailed fixed-price quotes after a free discovery call. Our packages are designed to give maximum ROI for Haryana SMBs.' },
    { q: 'How long does it take to build a website?', a: 'A standard business website takes 2–4 weeks. An e-commerce site takes 4–8 weeks depending on complexity. We provide a detailed project timeline at the start and stick to it. Haryana clients with urgent needs can opt for our fast-track 10-day delivery for simpler sites.' },
    { q: 'Do you build websites for small businesses in Rohtak and Faridabad?', a: 'Absolutely. We work with businesses of all sizes across Haryana — from first-generation entrepreneurs in Rohtak to large manufacturing firms in Faridabad. We have startup packages starting at ₹15,000.' },
    { q: 'Will my website rank on Google after you build it?', a: 'We build every website with technical SEO as a foundation — proper URL structure, schema markup, page speed optimisation, and XML sitemaps. For ongoing Google rankings, we recommend pairing web development with our SEO services.' },
    { q: 'Can you redesign my existing website?', a: 'Yes. We offer website redesign services that modernise your existing site while preserving SEO rankings, URL structures, and content. We migrate everything carefully to avoid any traffic drop.' },
    { q: 'Do you provide website maintenance after launch?', a: 'Yes. All our projects include 30-day post-launch support at no extra cost. We also offer annual maintenance packages covering security updates, backups, speed optimisations, and content updates.' },
    { q: 'Can you build in both Hindi and English?', a: 'Yes. We build bilingual (Hindi + English) and multilingual websites. For Haryana businesses targeting local customers, Hindi content pages significantly improve local search rankings.' },
    { q: 'Do you work with government tenders and contractors in Haryana?', a: 'Yes. We build professional tender-compliant websites for government contractors and vendors who need NIC-standard layouts, contact forms, and document portals.' },
    { q: 'What CMS do you use?', a: 'We offer WordPress (most popular), headless CMS (Contentful, Sanity), and fully custom admin panels built with Node.js. We recommend based on your team\'s technical comfort and long-term maintenance needs.' },
    { q: 'How do I get started?', a: 'Call us on +91 84487 63134 or fill the contact form. We\'ll schedule a free 30-minute discovery call, understand your business goals, and send a detailed proposal within 24 hours.' },
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Digital Marketing Agency — Haryana', href: '/digital-marketing-agency-haryana', desc: 'Grow your online presence with SEO, social media & PPC campaigns.' },
    { label: 'SEO Company — Haryana', href: '/seo-company-haryana', desc: 'Rank your website on Google for Haryana keywords.' },
    { label: 'Web Development — Delhi', href: '/web-development-company-delhi', desc: 'Custom website development for Delhi businesses.' },
    { label: 'Google Ads Agency — Haryana', href: '/google-ads-agency-haryana', desc: 'Run high-ROI Google Ads campaigns in Haryana.' },
    { label: 'Social Media Marketing — Haryana', href: '/social-media-marketing-agency-haryana', desc: 'Instagram, Facebook & LinkedIn marketing for Haryana brands.' },
  ],
  cta: {
    headline: 'Ready to Build Your Dream Website in Haryana?',
    sub: 'Get a free consultation and fixed-price quote within 24 hours. No obligation, no jargon — just clear answers from Haryana\'s best web development team.',
  },
  service: 'Web Development',
  city: 'Haryana',
  localBizDescription: 'Avani Enterprises is the best web development company in Haryana, building custom websites, e-commerce stores, and web applications for businesses in Gurgaon, Rohtak, Faridabad, and across Haryana.',
};

export default function WebDevHaryana() {
  return <LocalServicePage {...PAGE} />;
}
