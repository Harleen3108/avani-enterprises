import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Best SEO Company in Haryana | Top Google Rankings — Avani Enterprises',
    description: 'Rank first on Google with the leading SEO company in Haryana. We optimize site speed, target high-intent keywords, and build domain authority. Free SEO audit.',
    keywords: 'seo company haryana, seo services haryana, best seo agency haryana, local seo company rohtak, search engine optimization panipat',
    canonical: 'https://www.avanienterprises.in/seo-company-haryana',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'SEO Company — Haryana', href: '/seo-company-haryana' },
  ],
  hero: {
    tag: '🔍 Google Ranking Experts',
    h1: 'SEO Company in Haryana',
    subtitle: 'Drive organic search traffic, establish domain authority, and generate leads on Google without expensive ads.',
    stats: [
      { value: '250%', label: 'Avg Traffic Growth' },
      { value: '90 Days', label: 'First Page Results' },
      { value: '1st Page', label: 'Google Rankings' },
      { value: '50+', label: 'Haryana Brands' },
    ],
  },
  intro: `Paid ads stop generating traffic the moment your budget runs out. Our SEO Company Haryana builds a sustainable organic search engine that drives high-intent buyers to your site 24/7. We handle technical audits, keyword research, and backlink authority.

Avani Enterprises has managed SEO campaigns for over 50+ companies in Haryana, helping them achieve first-page Google rankings and consistently lower customer acquisition costs.`,
  whyAvani: [
    { title: 'Technical Site Audits', desc: 'We clean up backend code, fix slow loading pages, and restructure sites to satisfy search algorithms.' },
    { title: 'Intent-Targeted Copywriting', desc: 'Our copywriters create helpful articles that answer user queries and keep them on your page longer.' },
    { title: 'High-Authority Link Building', desc: 'We secure high-authority backlinks to prove to Google that your brand is a trustworthy industry leader.' },
    { title: 'Dedicated Support Desk', desc: 'Direct access to support engineers available via WhatsApp and phone for immediate resolution.' },
  ],
  localAreaText: `We serve businesses across all major Haryana cities — Rohtak, Gurgaon (Gurugram), Faridabad, Sonipat, Panipat, Karnal, Hisar, Ambala, and Panchkula. We customize campaigns to fit local demographics and business hubs.`,
  areaServed: ['Rohtak', 'Gurgaon', 'Faridabad', 'Panipat', 'Sonipat', 'Karnal', 'Hisar', 'Ambala', 'Panchkula'],
  features: [
    { icon: '🔍', title: 'Keyword Intent Research', desc: 'Target high-value search phrases that active buyers type, driving ready-to-convert traffic.' },
    { icon: '💻', title: 'On-Page Optimization', desc: 'Structure headers, write schema markup, and optimize meta tags to maximize search visibility.' },
    { icon: '🌟', title: 'Google Business Profile SEO', desc: 'Optimize map listings to drive local calls, map directions, and customer reviews.' },
    { icon: '📈', title: 'Monthly Analytics Reports', desc: 'Receive reports showing impressions, clicks, search query ranks, and organic leads.' },
    { icon: '🎥', title: 'Social Media Management', desc: 'Create engaging graphics and reels to build a loyal audience across Instagram, Facebook, and LinkedIn.' },
    { icon: '💻', title: 'Custom Web Development', desc: 'Design fast, mobile-friendly websites and applications that convert visitors into customers.' },
    { icon: '💼', title: 'B2B Lead Generation', desc: 'LinkedIn campaigns and search ads targeted at corporate buyers and exporters.' },
    { icon: '🔔', title: 'WhatsApp Business Automation', desc: 'Automate customer support and broadcast campaigns for mobile-heavy markets.' },
  ],
  faqs: [
    { q: 'What is SEO and how does it work?', a: 'SEO (Search Engine Optimization) modifies your website code, speed, content, and external links to rank higher on search engines.' },
    { q: 'How long before we rank on the first page?', a: 'Most Haryana businesses see significant rank improvements and traffic increases in 90 to 120 days.' },
    { q: 'Do you help with local Google Maps rankings in Haryana?', a: 'Yes. Our local SEO packages optimize Google Business Profiles for city searches.' },
    { q: 'Can you rank websites globally or nationally?', a: 'Yes, we design B2B national and B2C global campaigns based on your business objectives.' },
    { q: 'What is technical SEO?', a: 'It optimizes backend elements (sitemaps, schema, page load speeds, redirect paths) so search crawlers index your pages correctly.' },
    { q: 'Do you write the blog articles?', a: 'Yes, our team drafts SEO-optimized, industry-relevant articles.' },
    { q: 'How do we track organic search progress?', a: 'We set up Google Analytics and Search Console dashboards tracking clicks, ranks, and conversions.' },
    { q: 'How do we get started?', a: 'Contact our SEO consulting team at +91 92536 25099 to receive a free, detailed website audit.' }
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development Haryana', href: '/web-development-company-haryana', desc: 'Web services for Haryana brands.' },
    { label: 'SEO Company Delhi', href: '/seo-company-delhi', desc: 'Google ranking optimization in Delhi.' },
    { label: 'Digital Marketing Haryana', href: '/digital-marketing-agency-haryana', desc: 'Full-scale marketing services.' },
  ],
  cta: {
    headline: 'Rank First on Google Today',
    sub: 'Book a free technical site audit. Let\'s find your biggest search opportunities and build your ranking blueprint.'
  },
  service: 'SEO Services',
  city: 'Haryana',
  localBizDescription: 'Avani Enterprises is a leading SEO company in Haryana, providing search optimization, local Maps SEO, and link building for local brands.',
};

export default function SeoHaryana() {
  return <LocalServicePage {...PAGE} />;
}
