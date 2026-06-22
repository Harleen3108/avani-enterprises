import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Top Web Development & Digital Marketing Agency in Faridabad | Avani Enterprises',
    description: 'Avani Enterprises is Faridabad\'s premier digital agency. We deliver high-performing websites, B2B SEO services, and targeted lead campaigns for local businesses. Contact us.',
    keywords: 'web development company faridabad, digital marketing agency faridabad, seo services faridabad, social media agency faridabad, website development in faridabad',
    canonical: 'https://www.avanienterprises.in/faridabad',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Cities', href: '/services' },
    { label: 'Faridabad', href: '/faridabad' },
  ],
  hero: {
    tag: '🏢 Faridabad\'s Digital Partner',
    h1: 'Web Development & SEO in Faridabad',
    subtitle: 'From B2B manufacturing units to local retail showrooms — we build custom websites and rank them first on Google to scale your local sales.',
    stats: [
      { value: '80+', label: 'Faridabad Projects' },
      { value: '3x+', label: 'Average Sales Growth' },
      { value: '8+', label: 'Years Serving Faridabad' },
      { value: '40+', label: 'Happy Faridabad Brands' },
    ],
  },
  intro: `Faridabad is a major industrial hub in Haryana. To stay competitive, local manufacturers and brands need a digital presence that builds trust and drives visibility. Avani Enterprises is the premier digital agency in Faridabad, helping local businesses scale with custom web design, SEO, and social media.

We have designed portals for local institutions and B2B websites for local manufacturing businesses, making us the most trusted technology team in Faridabad.`,
  whyAvani: [
    { title: 'Local Industry Insight', desc: 'We understand Faridabad\'s industrial demographics, regional buying triggers, and competitive gaps.' },
    { title: 'Dedicated Local Team', desc: 'Get direct consultation with our local systems engineers, ensuring fast project turnaround.' },
    { title: 'Proven Portfolio', desc: 'We have designed portals for local institutions and B2B websites for local manufacturing businesses.' },
    { title: 'Dedicated Support Desk', desc: 'Direct access to support engineers available via WhatsApp and phone for immediate resolution.' },
  ],
  localAreaText: `We serve businesses across all major Faridabad zones — Sector 15, Sector 16, Mathura Road, NIT Faridabad, Sector 31, Faridabad Industrial Area, and Sector 81.`,
  areaServed: ['Sector 15', 'Sector 16', 'Mathura Road', 'NIT Faridabad', 'Sector 31', 'Faridabad Industrial Area', 'Sector 81'],
  features: [
    { icon: '💻', title: 'Custom Web Design', desc: 'Design mobile-friendly, fast loading websites optimized to capture client inquiries.' },
    { icon: '🔍', title: 'Google SEO Services', desc: 'Rank first on Google searches for your local products and services, driving organic traffic.' },
    { icon: '🎥', title: 'Social Media Management', desc: 'Manage your profiles on Instagram and Facebook with reels and visual posts.' },
    { icon: '📍', title: 'Local Map SEO', desc: 'Optimize Google Map listings to drive local calls and directions.' },
    { icon: '🌟', title: 'Influencer Collaborations', desc: 'Connect with local and national creators to promote your brand authentic reviews.' },
    { icon: '📈', title: 'Conversion Rate Optimization (CRO)', desc: 'Audit user journeys and landing page copies to maximize leads from current traffic.' },
    { icon: '💼', title: 'B2B Lead Generation', desc: 'LinkedIn campaigns and search ads targeted at corporate buyers and exporters.' },
    { icon: '🔔', title: 'WhatsApp Business Automation', desc: 'Automate customer support and broadcast campaigns for mobile-heavy markets.' },
  ],
  faqs: [
    { q: 'What services do you provide in Faridabad?', a: 'We offer custom web development, Google SEO, social media marketing, local map optimization, and lead automation.' },
    { q: 'How much does a website cost in Faridabad?', a: 'Costs depend on complexity. Simple business sites start at ₹15,000, while custom e-commerce and portal systems start at ₹35,000.' },
    { q: 'Do you help with local Google Map listings?', a: 'Yes. We optimize Google Business Profiles to rank first on local map searches.' },
    { q: 'Can we meet your team in person?', a: 'Yes. Our team can meet at your office in Faridabad to discuss details.' },
    { q: 'How long does it take to build a website?', a: 'Standard business sites are completed in 7 to 10 days, while custom web applications take 14 to 21 days.' },
    { q: 'What platforms do you build on?', a: 'We build on modern frameworks (React, Node, Next.js) and optimized WordPress architectures.' },
    { q: 'Do you write the website copy?', a: 'Yes, our copywriting team writes SEO-optimized copy for your site.' },
    { q: 'How do we get started?', a: 'Call +91 92536 25099 or email kp@avanienterprises.in to arrange a free consultation.' }
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development Haryana', href: '/web-development-company-haryana', desc: 'Custom website engineering in Haryana.' },
    { label: 'SEO Company Haryana', href: '/seo-company-haryana', desc: 'Google ranking optimization in Haryana.' },
    { label: 'Gurgaon Digital Services', href: '/gurgaon', desc: 'Digital services for Gurgaon brands.' },
  ],
  cta: {
    headline: 'Grow Your Faridabad Business Online',
    sub: 'Book a free 20-minute digital audit. Let\'s evaluate your current site and outline a tailored local marketing blueprint.'
  },
  service: 'Web Development & SEO',
  city: 'Faridabad',
  localBizDescription: 'Avani Enterprises is a premier digital agency in Faridabad, specializing in web design, SEO, and paid media for local businesses.',
};

export default function Faridabad() {
  return <LocalServicePage {...PAGE} />;
}
