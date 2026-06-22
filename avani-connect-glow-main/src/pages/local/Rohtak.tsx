import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Web Development & SEO Company in Rohtak | Avani Enterprises',
    description: 'Grow your local Rohtak business with custom web development, Google map rankings, B2C social media marketing, and high-ROI ads. Get a free audit today.',
    keywords: 'web development company rohtak, seo services rohtak, digital marketing agency rohtak, social media marketing rohtak, website development in rohtak',
    canonical: 'https://www.avanienterprises.in/rohtak',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Cities', href: '/services' },
    { label: 'Rohtak', href: '/rohtak' },
  ],
  hero: {
    tag: '🏢 Rohtak\'s Digital Partner',
    h1: 'Web Development & SEO in Rohtak',
    subtitle: 'From local educational institutes to retail showrooms — we build custom websites and rank them first on Google to scale your local sales.',
    stats: [
      { value: '100+', label: 'Rohtak Projects' },
      { value: '3x+', label: 'Average Sales Growth' },
      { value: '8+', label: 'Years Serving Rohtak' },
      { value: '50+', label: 'Happy Rohtak Brands' },
    ],
  },
  intro: `Rohtak's business community is expanding rapidly. To stay competitive, local brands need a digital presence that builds trust and drives visibility. Avani Enterprises is the premier digital agency in Rohtak, helping local businesses scale with custom web design, SEO, and social media.

We have designed portals for local institutions and e-commerce websites for local retail businesses, making us the most trusted technology team in Rohtak.`,
  whyAvani: [
    { title: 'Local Market Insight', desc: 'We understand Rohtak\'s market demographics, regional buying triggers, and competitive gaps.' },
    { title: 'Dedicated Local Team', desc: 'Get direct consultation with our local systems engineers, ensuring fast project turnaround.' },
    { title: 'Proven Portfolio', desc: 'We have designed portals for local institutions and e-commerce websites for local retail businesses.' },
    { title: 'Dedicated Support Desk', desc: 'Direct access to support engineers available via WhatsApp and phone for immediate resolution.' },
  ],
  localAreaText: `We serve businesses across all major Rohtak zones — Sector 1, Sector 2, Sector 3, Sector 14, Model Town, Delhi Road, Jhajjar Road, Gohana Road, and Rohtak Industrial Area.`,
  areaServed: ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 14', 'Model Town', 'Delhi Road', 'Jhajjar Road', 'Gohana Road', 'Rohtak Industrial Area'],
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
    { q: 'What services do you provide in Rohtak?', a: 'We offer custom web development, Google SEO, social media marketing, local map optimization, and lead automation.' },
    { q: 'How much does a website cost in Rohtak?', a: 'Costs depend on complexity. Simple business sites start at ₹15,000, while custom e-commerce and portal systems start at ₹35,000.' },
    { q: 'Do you help with local Google Map listings?', a: 'Yes. We optimize Google Business Profiles to rank first on local map searches.' },
    { q: 'Can we meet your team in person?', a: 'Yes. Our team can meet at your office in Rohtak to discuss details.' },
    { q: 'How long does it take to build a website?', a: 'Standard business sites are completed in 7 to 10 days, while custom web applications take 14 to 21 days.' },
    { q: 'What platforms do you build on?', a: 'We build on modern frameworks (React, Node, Next.js) and optimized WordPress architectures.' },
    { q: 'Do you write the website copy?', a: 'Yes, our copywriting team writes SEO-optimized copy for your site.' },
    { q: 'How do we get started?', a: 'Call +91 92536 25099 or email kp@avanienterprises.in to arrange a free consultation.' }
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development Haryana', href: '/web-development-company-haryana', desc: 'Custom website engineering in Haryana.' },
    { label: 'SEO Company Haryana', href: '/seo-company-haryana', desc: 'Google rankings for Haryana brands.' },
    { label: 'Gurgaon Digital Services', href: '/gurgaon', desc: 'Digital services for Gurgaon brands.' },
  ],
  cta: {
    headline: 'Grow Your Rohtak Business Online',
    sub: 'Book a free 20-minute digital audit. Let\'s evaluate your current site and outline a tailored local growth plan.'
  },
  service: 'Web Development & SEO',
  city: 'Rohtak',
  localBizDescription: 'Avani Enterprises is the premier web development and SEO agency in Rohtak, helping local businesses scale with modern digital solutions.',
};

export default function Rohtak() {
  return <LocalServicePage {...PAGE} />;
}
