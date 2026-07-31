import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Best SEO Company in Delhi | Drive Organic Traffic — Avani Enterprises',
    description: 'Partner with the best SEO company in Delhi. We optimize code, build authority link profiles, and target high-intent keywords to secure first-page Google rankings.',
    keywords: 'seo company delhi, seo agency delhi, best seo services delhi, local seo delhi, search engine optimization company delhi, enterprise seo delhi',
    canonical: 'https://www.avanienterprises.in/seo-company-delhi',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'SEO Company — Delhi', href: '/seo-company-delhi' },
  ],
  hero: {
    tag: '🚀 Delhi\'s Leading Search Strategists',
    h1: 'SEO Company in Delhi',
    subtitle: 'Dominate competitive search queries, drive high-intent buyers, and build organic authority on Google.',
    stats: [
      { value: '3x+', label: 'Organic Traffic Increase' },
      { value: '1st Page', label: 'Google Rankings' },
      { value: '150+', label: 'Ranked Keywords' },
      { value: '80+', label: 'Delhi Clients' },
    ],
  },
  intro: `Delhi's search engine landscape is highly competitive. To rank on the first page, your site must load instantly, have structured schema markup, and hold high-authority backlink profiles. Our SEO Company Delhi designs custom optimization campaigns.

Avani Enterprises has managed SEO campaigns for over 80+ companies in Delhi, helping them achieve first-page Google rankings and consistently lower customer acquisition costs.`,
  whyAvani: [
    { title: 'Technical Optimization Core', desc: 'We resolve page load speed issues, sitemap structures, and schema data to maximize crawl indexability.' },
    { title: 'Authoritative Backlink Networks', desc: 'We build real, organic backlink profiles from respected websites in your industry.' },
    { title: 'Intent-Targeted Campaigns', desc: 'We target commercial and informational search queries to reach buyers at all stages.' },
    { title: 'Dedicated Support Desk', desc: 'Direct access to support engineers available via WhatsApp and phone for immediate resolution.' },
  ],
  localAreaText: `We serve businesses across all Delhi zones — South Delhi (Saket, Vasant Kunj, Hauz Khas, Lajpat Nagar), North Delhi (Rohini, Pitampura, Shalimar Bagh), East Delhi (Laxmi Nagar, Preet Vihar), West Delhi (Janakpuri, Dwarka, Paschim Vihar), and Central Delhi (Connaught Place, Karol Bagh, Paharganj).`,
  areaServed: ['South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'Dwarka', 'Rohini', 'Connaught Place'],
  features: [
    { icon: '🔍', title: 'Search Query Audits', desc: 'Find high-value commercial search keywords that your competitors miss.' },
    { icon: '💻', title: 'On-Page Schema Injection', desc: 'Format and inject FAQ, Breadcrumb, Product, and LocalBusiness JSON-LD markup.' },
    { icon: '🌟', title: 'Local Business Maps SEO', desc: 'Optimize Google Business profiles for local city zones (South Delhi, CP, Dwarka).' },
    { icon: '📈', title: 'Content Production Hub', desc: 'Our copywriters draft user-focused, structured articles that satisfy search algorithms.' },
    { icon: '🎥', title: 'Social Media Management', desc: 'Create engaging graphics and reels to build a loyal audience across Instagram, Facebook, and LinkedIn.' },
    { icon: '💻', title: 'Custom Web Development', desc: 'Design fast, mobile-friendly websites and applications that convert visitors into customers.' },
    { icon: '💼', title: 'B2B Lead Generation', desc: 'LinkedIn campaigns and search ads targeted at corporate buyers and exporters.' },
    { icon: '🔔', title: 'WhatsApp Business Automation', desc: 'Automate customer support and broadcast campaigns for mobile-heavy markets.' },
  ],
  faqs: [
    { q: 'Why is Avani the best SEO company in Delhi?', a: 'We focus on clear conversion metrics, fix technical code elements, and build authority links rather than using generic checklists.' },
    { q: 'What is the cost of SEO services in Delhi?', a: 'Monthly retainers depend on keyword competitiveness and campaign scope. Contact us for a custom proposal.' },
    { q: 'Do you guarantee first-page rankings?', a: 'Google advises against ranking guarantees. However, we have a 95% success rate in ranking clients on the first page within 120 days.' },
    { q: 'Do you handle the website technical changes?', a: 'Yes. Our developers directly optimize website speed, schema markup, and responsive layouts.' },
    { q: 'What is link building?', a: 'It secures links from other respected websites back to yours, proving to search engines that your brand is a trustworthy authority.' },
    { q: 'How do we track progress?', a: 'We share monthly reports tracking organic search impressions, ranks, clicks, and conversion events.' },
    { q: 'How do we get started?', a: 'Call +91 84487 63134 or email kp@avanienterprises.in to arrange a free, detailed website audit.' }
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development Delhi', href: '/web-development-company-delhi', desc: 'Custom website engineering in Delhi.' },
    { label: 'SEO Company Haryana', href: '/seo-company-haryana', desc: 'Google ranking optimization in Haryana.' },
    { label: 'Digital Marketing Delhi', href: '/digital-marketing-agency-delhi', desc: 'Full-scale marketing services in Delhi.' },
  ],
  cta: {
    headline: 'Maximize Your Organic Traffic',
    sub: 'Set up a free technical site audit. Let\'s evaluate your digital footprint and find your biggest search opportunities.'
  },
  service: 'SEO Services',
  city: 'Delhi',
  localBizDescription: 'Avani Enterprises is a premier SEO company in Delhi, providing search optimization, local Maps SEO, and link building for local brands.',
};

export default function SeoDelhi() {
  return <LocalServicePage {...PAGE} />;
}
