import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Top Web Development & Digital Marketing Agency in Delhi | Avani Enterprises',
    description: 'Avani Enterprises is Delhi\'s leading digital agency. We deliver high-performing custom software, enterprise SEO, and targeted lead campaigns. Request a consultation.',
    keywords: 'web development company delhi, digital marketing agency delhi, seo services delhi, social media agency delhi, website development in delhi',
    canonical: 'https://www.avanienterprises.in/delhi',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Cities', href: '/services' },
    { label: 'Delhi', href: '/delhi' },
  ],
  hero: {
    tag: '🏢 Delhi\'s Premier Tech Partners',
    h1: 'Web Development & SEO in Delhi',
    subtitle: 'From corporate hubs in Nehru Place to luxury brands in South Delhi — we design fast cloud applications and rank them first on Google.',
    stats: [
      { value: '150+', label: 'Delhi Clients' },
      { value: '4x+', label: 'Average Ads ROAS' },
      { value: '99.9%', label: 'Application Uptime' },
      { value: '10M+', label: 'Ad Spend Managed' },
    ],
  },
  intro: `Delhi is India's fast-paced commercial capital. To stand out, businesses need high-fidelity platforms and advanced digital campaigns. Avani Enterprises provides custom React/Next.js development, technical SEO, and targeted paid media campaigns.

We have designed enterprise portals, CRM systems, and managed performance marketing campaigns for over 150+ companies in Delhi, helping them accelerate growth.`,
  whyAvani: [
    { title: 'Enterprise-Grade Code', desc: 'We build on modern, secure frameworks (React, Node, Next.js) that load in milliseconds.' },
    { title: 'Targeted Growth Funnels', desc: 'We design custom landing pages and sales pipelines to convert traffic into revenue.' },
    { title: 'Dedicated Tech Consultants', desc: 'Get direct communication with a project manager who tracks schedules and deliverables daily.' },
    { title: 'Dedicated Support Desk', desc: 'Direct access to support engineers available via WhatsApp and phone for immediate resolution.' },
  ],
  localAreaText: `We serve businesses across all Delhi zones — South Delhi (Saket, Vasant Kunj, Hauz Khas, Lajpat Nagar), North Delhi (Rohini, Pitampura, Shalimar Bagh), East Delhi (Laxmi Nagar, Preet Vihar), West Delhi (Janakpuri, Dwarka, Paschim Vihar), and Central Delhi (Connaught Place, Karol Bagh, Paharganj).`,
  areaServed: ['South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'Dwarka', 'Rohini', 'Connaught Place'],
  features: [
    { icon: '💻', title: 'Enterprise Web Development', desc: 'Design secure, fast cloud portals, API integrations, and corporate databases.' },
    { icon: '🔍', title: 'Technical Google SEO', desc: 'Rank first on Google for high-value search keywords, driving organic traffic.' },
    { icon: '🎯', title: 'Performance Paid Media', desc: 'Launch targeted search, shopping, and display campaigns to reach active buyers.' },
    { icon: '🎥', title: 'Social Media Management', desc: 'Manage your profiles on LinkedIn and Instagram with reels and graphic posts.' },
    { icon: '🤖', title: 'AI Automation Systems', desc: 'Build custom lead managers and WhatsApp auto-repliers to automate busywork.' },
    { icon: '📈', title: 'Conversion Rate Optimization (CRO)', desc: 'Audit user journeys and landing page copies to maximize leads from current traffic.' },
    { icon: '💼', title: 'B2B Lead Generation', desc: 'LinkedIn campaigns and search ads targeted at corporate buyers and exporters.' },
    { icon: '🔔', title: 'WhatsApp Business Automation', desc: 'Automate customer support and broadcast campaigns for mobile-heavy markets.' },
  ],
  faqs: [
    { q: 'What services do you provide in Delhi?', a: 'We offer custom web development, enterprise Google SEO, social media marketing, local map optimization, and lead automation.' },
    { q: 'Do you work with Nehru Place B2B businesses?', a: 'Yes. We specialize in custom software engineering, API integrations, and B2B manufacturing marketing.' },
    { q: 'Can you migrate our current site to React?', a: 'Yes, we migrate sites to React and Node for improved speed and indexing.' },
    { q: 'Do you manage LinkedIn B2B campaigns?', a: 'Yes, we manage LinkedIn ads and content targeted at corporate decision-makers.' },
    { q: 'How long does a web project take?', a: 'Custom systems are completed in 14 to 21 business days, depending on requirements.' },
    { q: 'Do you offer ongoing retainer support?', a: 'Yes, we offer monthly retainers for technical updates, SEO, and campaign management.' },
    { q: 'What is the support response time?', a: 'Our engineers respond via chat or call in under 15 minutes for critical requests.' },
    { q: 'How do we schedule a meeting?', a: 'Contact our consulting team at +91 92536 25099 to set up an online or local meeting.' }
  ],
  reviews: [
    { name: 'Karan Mehra', role: 'Owner, Mehra & Associates', city: 'South Delhi, Delhi', text: 'Avani Enterprises designed our corporate website and managed our SEO. Our client inquiries increased by 200%. Best technical agency in Delhi.' },
    { name: 'Sanjay Gupta', role: 'Director, Gupta Medical Equipments', city: 'Karol Bagh, Delhi', text: 'Our sales leads increased by 3x after Avani optimized our Google Ads and landing pages. Outstanding support.' },
  ],
  relatedLinks: [
    { label: 'Web Development Haryana', href: '/web-development-company-haryana', desc: 'Web services for Haryana brands.' },
    { label: 'SEO Company Haryana', href: '/seo-company-haryana', desc: 'Google ranking optimization in Haryana.' },
    { label: 'Gurgaon Digital Services', href: '/gurgaon', desc: 'Digital services for Gurgaon brands.' },
  ],
  cta: {
    headline: 'Accelerate Your Delhi Brand',
    sub: 'Free 20-minute digital audit. Let\'s evaluate your website and build a custom local growth plan.'
  },
  service: 'Web Development & SEO',
  city: 'Delhi',
  localBizDescription: 'Avani Enterprises is the leading web development and SEO agency in Delhi, delivering high-performance digital marketing for businesses.',
};

export default function Delhi() {
  return <LocalServicePage {...PAGE} />;
}
