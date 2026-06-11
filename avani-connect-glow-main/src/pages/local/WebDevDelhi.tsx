import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Best Web Development Company in Delhi | Custom Websites & Apps — Avani Enterprises',
    description: 'Top web development company in Delhi — custom websites, e-commerce, and web apps for Delhi businesses. Serving South Delhi, North Delhi, East Delhi, Dwarka, Rohini, Lajpat Nagar & entire NCR. Free quote.',
    keywords: 'website development company delhi, web development company delhi, best web development company delhi, web design company delhi, custom website development delhi, website developer in delhi, web development agency delhi ncr, e-commerce development delhi',
    canonical: 'https://www.avanienterprises.in/web-development-company-delhi',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Web Development', href: '/services/web-app-development' },
    { label: 'Web Development Company — Delhi', href: '/web-development-company-delhi' },
  ],
  hero: {
    tag: '🏙️ Delhi\'s Trusted Web Development Agency',
    h1: 'Website Development Company in Delhi',
    subtitle: 'Avani Enterprises delivers premium custom websites, e-commerce platforms, and web applications for Delhi businesses. Fast turnaround, transparent pricing, and results that speak for themselves.',
    stats: [
      { value: '200+', label: 'Delhi Projects' },
      { value: '<2s', label: 'Page Load Time' },
      { value: '5★', label: 'Client Rating' },
      { value: '24hr', label: 'Query Response' },
    ],
  },
  intro: `Delhi is India's most competitive business market. Your website needs to work harder than your competitors' — faster, smarter, and more persuasive. Avani Enterprises brings enterprise-grade web development to Delhi businesses at SMB-friendly prices.

We've built websites for manufacturers in Okhla, retailers in Karol Bagh, consultants in Connaught Place, and service businesses across Dwarka, Rohini, Laxmi Nagar, and Vasant Kunj. Every project is unique, every deliverable is on time, and every site we build generates measurable business results.`,
  whyAvani: [
    { title: 'Delhi Market Expertise', desc: 'We understand Delhi\'s diverse business landscape — from wholesale markets in Chandni Chowk to IT firms in Nehru Place and fashion brands in South Ex.' },
    { title: 'GST & Compliance Ready', desc: 'All our e-commerce sites come with GST invoice generation, TCS/TDS handling, and compliance features required for Indian businesses.' },
    { title: 'Hindi + English Bilingual', desc: 'Delhi businesses often serve both English-speaking professionals and Hindi-speaking consumers. We build bilingual sites that capture both audiences.' },
    { title: 'Post-Launch Growth Support', desc: 'We don\'t disappear after delivery. Our Delhi clients get dedicated account managers, monthly performance reviews, and continuous improvement plans.' },
  ],
  localAreaText: `We actively serve businesses in South Delhi, North Delhi, West Delhi, East Delhi, Central Delhi, Dwarka, Rohini, Laxmi Nagar, Vasant Kunj, Hauz Khas, Saket, Lajpat Nagar, Karol Bagh, Connaught Place, Janakpuri, and Pitampura. We also serve businesses in Noida, Greater Noida, and Ghaziabad that operate in the Delhi NCR market.`,
  areaServed: ['South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Dwarka', 'Rohini', 'Noida', 'Greater Noida', 'Ghaziabad'],
  features: [
    { icon: '🏢', title: 'Corporate Website Development', desc: 'Authoritative corporate sites with team pages, service showcases, case studies, and client portals that establish credibility with Delhi\'s B2B buyers.' },
    { icon: '🛍️', title: 'E-Commerce for Delhi Retailers', desc: 'Online stores with multi-currency support, Delhi-specific shipping zones, COD integration, and WhatsApp order notifications.' },
    { icon: '📐', title: 'UI/UX Design', desc: 'Research-driven interface design that reduces bounce rates and increases time-on-site, keeping Delhi visitors engaged long enough to convert.' },
    { icon: '🔗', title: 'CRM & ERP Integration', desc: 'Connect your website to Zoho CRM, Salesforce, Tally, or custom ERP systems — critical for Delhi\'s fast-paced business operations.' },
    { icon: '📊', title: 'Landing Page Optimisation', desc: 'High-converting landing pages for Google Ads, social media, and WhatsApp marketing campaigns — designed specifically for Delhi\'s urban buyers.' },
    { icon: '🛡️', title: 'Security & Compliance', desc: 'PCI-DSS compliant e-commerce, GDPR-ready privacy implementations, and security audits for businesses handling customer data in Delhi.' },
    { icon: '⚡', title: 'Speed Optimisation', desc: 'Sub-2-second load times achieved through CDN deployment, image optimisation, lazy loading, and server-side caching.' },
    { icon: '📱', title: 'Progressive Web Apps (PWA)', desc: 'App-like experiences accessible via browser — perfect for Delhi businesses wanting mobile app reach without app store costs.' },
  ],
  faqs: [
    { q: 'What is the cost of website development in Delhi?', a: 'Basic business websites in Delhi start at ₹12,000–₹25,000. E-commerce sites start at ₹40,000. Custom web applications start at ₹80,000. We provide detailed fixed quotes after a free discovery call with no hidden charges.' },
    { q: 'How long does it take to build a website?', a: 'Simple websites: 2–3 weeks. E-commerce platforms: 4–6 weeks. Custom web applications: 8–16 weeks. We stick to agreed timelines and provide weekly progress updates.' },
    { q: 'Do you offer website development for home-based businesses in Delhi?', a: 'Yes. We have special startup packages for home-based entrepreneurs, freelancers, and micro-businesses in Delhi starting at ₹12,000 for a professional 5-page website.' },
    { q: 'Can you help a Delhi business rank on Google Maps and local search?', a: 'Yes. Alongside website development, we set up and optimise your Google Business Profile, add local schema markup, and build Delhi-specific landing pages that rank for local queries.' },
    { q: 'Do you provide domain and hosting services?', a: 'Yes. We assist with domain registration (.in domains preferred for Delhi businesses), set up reliable cloud hosting, configure business email addresses, and manage renewals.' },
    { q: 'Can you integrate online payment with Delhi-specific options like UPI?', a: 'Absolutely. We integrate Razorpay, PayU, Cashfree, and CCAvenue — supporting UPI, NetBanking, credit/debit cards, and EMI options popular with Delhi consumers.' },
    { q: 'Do you redesign existing Delhi business websites?', a: 'Yes. We handle website redesigns carefully — preserving URL structures and SEO rankings while modernising the design and improving page speed. Ideal for Delhi businesses with established Google rankings.' },
    { q: 'What industries do you serve in Delhi?', a: 'We serve all major Delhi industries: retail, manufacturing, real estate, hospitality, education, healthcare, professional services (CA, lawyers, architects), NGOs, and technology companies.' },
    { q: 'Can you build websites in Hindi for Delhi businesses?', a: 'Yes. We build fully Hindi or bilingual Hindi-English websites with proper Unicode support, Devanagari fonts, and Hindi keyword optimisation for local Delhi search traffic.' },
    { q: 'How do I start a project?', a: 'Call +91 92536 25099 or email kp@avanienterprises.in. We\'ll schedule a free 30-minute consultation, assess your requirements, and provide a detailed proposal within 24 hours.' },
  ],
  reviews: [
    { name: 'Manish Agarwal', role: 'Owner, Agarwal Jewellers', city: 'Karol Bagh, Delhi', text: 'Avani transformed our offline jewellery business into a thriving online store. Our website now attracts customers from all over Delhi and we get 80+ online orders monthly.' },
    { name: 'Dr. Pooja Mehta', role: 'Director, Mehta Dental Clinic', city: 'South Delhi', text: 'Professional, responsive team. They built a beautiful clinic website with online appointment booking. Our new patient walk-ins increased 40% in the first month after launch.' },
    { name: 'Suresh Kapoor', role: 'MD, Kapoor Exports', city: 'Okhla, Delhi', text: 'We needed a B2B export website with product catalogs and inquiry management. Avani delivered perfectly — on time and within our budget. Excellent work!' },
    { name: 'Nisha Singh', role: 'Founder, Delhi Fit Studio', city: 'Rohini, Delhi', text: 'Our fitness studio website with online class booking and membership management has been a game changer. Avani\'s team understood our requirements from day one.' },
  ],
  relatedLinks: [
    { label: 'Digital Marketing Agency — Delhi', href: '/digital-marketing-agency-delhi', desc: 'Full-service digital marketing for Delhi businesses.' },
    { label: 'SEO Company — Delhi', href: '/seo-company-delhi', desc: 'Rank your Delhi business website on Google page 1.' },
    { label: 'Web Development — Haryana', href: '/web-development-company-haryana', desc: 'Custom websites for Haryana businesses.' },
    { label: 'Social Media Marketing — Delhi', href: '/social-media-marketing-agency-delhi', desc: 'Instagram, Facebook & LinkedIn marketing for Delhi brands.' },
    { label: 'Digital Marketing — Gurgaon', href: '/gurgaon', desc: 'All digital marketing services in Gurgaon.' },
  ],
  cta: {
    headline: 'Let\'s Build Your Delhi Business Website',
    sub: 'Free 30-minute consultation, fixed-price quote in 24 hours. Delhi\'s most trusted web development company is just a call away.',
  },
  service: 'Web Development',
  city: 'Delhi',
  localBizDescription: 'Avani Enterprises is a leading website development company in Delhi building custom websites, e-commerce stores, and web applications for businesses across Delhi and Delhi NCR.',
};

export default function WebDevDelhi() {
  return <LocalServicePage {...PAGE} />;
}
