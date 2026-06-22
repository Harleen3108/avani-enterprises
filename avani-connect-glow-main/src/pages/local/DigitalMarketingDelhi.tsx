import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Best Digital Marketing Agency in Delhi | High ROI Ads — Avani Enterprises',
    description: 'Looking for the best digital marketing agency in Delhi? We help B2B and B2C brands in Delhi NCR scale with Google Ads, expert SEO, and custom software development.',
    keywords: 'digital marketing agency delhi, digital marketing company delhi, online marketing services delhi, digital agency south delhi, marketing consultants cp',
    canonical: 'https://www.avanienterprises.in/digital-marketing-agency-delhi',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Digital Marketing — Delhi', href: '/digital-marketing-agency-delhi' },
  ],
  hero: {
    tag: '🏙️ Delhi\'s Performance Marketing Leaders',
    h1: 'Digital Marketing Agency in Delhi',
    subtitle: 'From corporate hubs in Nehru Place to luxury brands in South Delhi — we help businesses capture quality leads and dominate markets.',
    stats: [
      { value: '3x+', label: 'Average Ad ROI' },
      { value: '1st Page', label: 'Google Rankings' },
      { value: '500K+', label: 'Local Leads Gen' },
      { value: '80+', label: 'Delhi Clients' },
    ],
  },
  intro: `Delhi's business landscape is fast-paced, competitive, and highly digital. Our Digital Marketing Agency Delhi designs high-performance campaigns that combine technical SEO, targeted paid media, and custom web development to drive sales.

Avani Enterprises has designed digital systems for over 80+ companies in Delhi, helping them launch fast websites, rank first for high-intent keywords on Google, and manage high-ROI paid media campaigns.`,
  whyAvani: [
    { title: 'Result-Focused Ad Retargeting', desc: 'We build advanced remarketing funnels on Google and Facebook to turn website visitors into buyers.' },
    { title: 'Authority Building SEO', desc: 'We create keyword-targeted articles and secure high-authority backlinks to rank you first on Google.' },
    { title: 'Dedicated Project Managers', desc: 'Get direct communication with a project manager who tracks schedules and deliverables daily.' },
    { title: 'Dedicated Support Desk', desc: 'Direct access to support engineers available via WhatsApp and phone for immediate resolution.' },
  ],
  localAreaText: `We serve businesses across all Delhi zones — South Delhi (Saket, Vasant Kunj, Hauz Khas, Lajpat Nagar), North Delhi (Rohini, Pitampura, Shalimar Bagh), East Delhi (Laxmi Nagar, Preet Vihar), West Delhi (Janakpuri, Dwarka, Paschim Vihar), and Central Delhi (Connaught Place, Karol Bagh, Paharganj).`,
  areaServed: ['South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'Dwarka', 'Rohini', 'Connaught Place'],
  features: [
    { icon: '🔍', title: 'Search Engine Optimization (SEO)', desc: 'Rank first on Google for high-intent keywords, driving organic search traffic without paying for ads.' },
    { icon: '🎥', title: 'Social Media Management', desc: 'Create engaging graphics and reels to build a loyal audience across Instagram, Facebook, and LinkedIn.' },
    { icon: '🎯', title: 'Targeted Google Ads', desc: 'Launch search and display campaigns to reach active buyers looking for your products or services.' },
    { icon: '💻', title: 'Custom Web Development', desc: 'Design fast, mobile-friendly websites and applications that convert visitors into customers.' },
    { icon: '🌟', title: 'Influencer Collaborations', desc: 'Connect with local and national creators to promote your brand authentic reviews.' },
    { icon: '📈', title: 'Conversion Rate Optimization (CRO)', desc: 'Audit user journeys and landing page copies to maximize leads from current traffic.' },
    { icon: '💼', title: 'B2B Lead Generation', desc: 'LinkedIn campaigns and search ads targeted at corporate buyers and exporters.' },
    { icon: '🔔', title: 'WhatsApp Business Automation', desc: 'Automate customer support and broadcast campaigns for mobile-heavy markets.' },
  ],
  faqs: [
    { q: 'What makes your Delhi agency different?', a: 'We focus on clear revenue metrics, design custom websites, and provide direct developer-level optimizations rather than generic checklists.' },
    { q: 'What is the pricing model for ad campaigns?', a: 'We charge a transparent monthly retainer based on campaign size and ad spend management.' },
    { q: 'Can you migrate our current site to a faster framework?', a: 'Yes. We specialize in React and Next.js migrations that improve page load speed and Google indexability.' },
    { q: 'Do you provide B2B marketing in Delhi?', a: 'Yes. We design LinkedIn outreach, search ads, and technical articles to generate high-value B2B enterprise leads.' },
    { q: 'How do we track campaign performance?', a: 'You receive monthly dashboards tracking search impressions, ranks, conversion rates, and exact lead totals.' },
    { q: 'Do you help with local Google Map rankings?', a: 'Yes. Our local SEO package optimizes your Google Business Profile to drive calls and walk-ins.' },
    { q: 'What industries do you serve in Delhi?', a: 'We work with professional services, real estate developers, educational institutes, and retail brands.' },
    { q: 'How do we request a consultation?', a: 'Click the "Get Consultation" button or call +91 92536 25099 to set up an online audit.' }
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development Delhi', href: '/web-development-company-delhi', desc: 'Custom website engineering in Delhi.' },
    { label: 'SEO Company Delhi', href: '/seo-company-delhi', desc: 'Google rankings for Delhi brands.' },
    { label: 'Digital Marketing Haryana', href: '/digital-marketing-agency-haryana', desc: 'Full-service digital services in Haryana.' },
  ],
  cta: {
    headline: 'Scale Your Delhi Business Online',
    sub: 'Book a free 20-minute digital audit. Let\'s evaluate your current site and outline a tailored growth plan.'
  },
  service: 'Digital Marketing',
  city: 'Delhi',
  localBizDescription: 'Avani Enterprises is a premier digital marketing agency in Delhi, delivering high-impact SEO, web dev, and paid campaigns for local businesses.',
};

export default function DigitalMarketingDelhi() {
  return <LocalServicePage {...PAGE} />;
}
