import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Google Ads Agency in Haryana | High ROI PPC Campaigns — Avani Enterprises',
    description: 'Maximize your ROI with the leading Google Ads agency in Haryana. We design high-converting PPC search, shopping, and display campaigns. Request a free PPC audit.',
    keywords: 'google ads agency haryana, ppc company haryana, search engine marketing haryana, google adwords agency panipat, pay per click rohtak',
    canonical: 'https://www.avanienterprises.in/google-ads-agency-haryana',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Google Ads — Haryana', href: '/google-ads-agency-haryana' },
  ],
  hero: {
    tag: '🎯 High ROI Google Campaigns',
    h1: 'Google Ads Agency in Haryana',
    subtitle: 'Stop wasting budget on clicks that don\'t convert. Launch structured search, shopping, and display campaigns managed by certified PPC experts.',
    stats: [
      { value: '4x+', label: 'Average ROAS' },
      { value: 'Under 24h', label: 'Leads Flow' },
      { value: '100%', label: 'Audience Target' },
      { value: '50+', label: 'Brands Scale' },
    ],
  },
  intro: `Running Google Ads without tracking conversions and search queries wastes ad budget. Our Google Ads Agency Haryana structures your search campaigns, optimizes bidding keywords, and designs high-converting landing pages to lower cost-per-lead.

Avani Enterprises has managed PPC ad campaigns for over 50+ companies in Haryana, helping them achieve high ROAS and generate consistent customer leads from search results.`,
  whyAvani: [
    { title: 'Negative Keyword Filtering', desc: 'We block irrelevant search queries, ensuring your ad budget reaches only active buyers.' },
    { title: 'Conversion-Optimized Landing Pages', desc: 'We build fast, mobile-friendly landing pages designed to capture leads, increasing conversion rates.' },
    { title: 'A/B Testing Copy', desc: 'We test ad headlines and descriptions to improve click-through rates (CTR) and quality scores.' },
    { title: 'Dedicated Support Desk', desc: 'Direct access to support engineers available via WhatsApp and phone for immediate resolution.' },
  ],
  localAreaText: `We serve businesses across all major Haryana cities — Rohtak, Gurgaon (Gurugram), Faridabad, Sonipat, Panipat, Karnal, Hisar, Ambala, and Panchkula. We customize campaigns to fit local demographics and business hubs.`,
  areaServed: ['Rohtak', 'Gurgaon', 'Faridabad', 'Panipat', 'Sonipat', 'Karnal', 'Hisar', 'Ambala', 'Panchkula'],
  features: [
    { icon: '🔍', title: 'Search Campaign Ads', desc: 'Reach buyers the moment they search for your services, driving high-intent traffic.' },
    { icon: '💻', title: 'Performance Max Ads', desc: 'Maximize your reach across YouTube, Gmail, Maps, Search, and Display formats.' },
    { icon: '🌟', title: 'Audience Retargeting', desc: 'Re-engage site visitors with custom display campaigns to turn them into customers.' },
    { icon: '📈', title: 'PPC Audits & Analysis', desc: 'Audit current campaigns to locate budget waste, improve quality scores, and lower CPL.' },
    { icon: '🎥', title: 'Social Media Management', desc: 'Create engaging graphics and reels to build a loyal audience across Instagram, Facebook, and LinkedIn.' },
    { icon: '💻', title: 'Custom Web Development', desc: 'Design fast, mobile-friendly websites and applications that convert visitors into customers.' },
    { icon: '💼', title: 'B2B Lead Generation', desc: 'LinkedIn campaigns and search ads targeted at corporate buyers and exporters.' },
    { icon: '🔔', title: 'WhatsApp Business Automation', desc: 'Automate customer support and broadcast campaigns for mobile-heavy markets.' },
  ],
  faqs: [
    { q: 'What services does your Google Ads agency provide in Haryana?', a: 'We manage keyword research, write ad copy, design custom landing pages, track conversions, and handle daily bid optimizations.' },
    { q: 'What budget is required for Google Ads in Haryana?', a: 'We recommend starting with an ad budget of at least ₹10,000/month. We customize campaigns to fit your budget and business goals.' },
    { q: 'How fast will we generate leads?', a: 'Google Ads are active instantly, meaning you can start generating leads within 24 hours of launch.' },
    { q: 'Do you help write the ad copy and design graphics?', a: 'Yes. Our team handles copy, banner graphics, and custom landing page development.' },
    { q: 'What is ROAS?', a: 'ROAS (Return on Ad Spend) measures the revenue generated for every rupee spent on ads. We target a 3x to 5x ROAS.' },
    { q: 'Do you manage negative keywords?', a: 'Yes. We filter out irrelevant search queries weekly to prevent budget waste.' },
    { q: 'How do we track ad conversions?', a: 'We set up Google Tag Manager to track calls, form submissions, and direct sales.' },
    { q: 'How do we get started?', a: 'Call +91 92536 25099 or email kp@avanienterprises.in to book a free campaign review.' }
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development Haryana', href: '/web-development-company-haryana', desc: 'Custom website engineering in Haryana.' },
    { label: 'SEO Company Haryana', href: '/seo-company-haryana', desc: 'Google rankings for Haryana brands.' },
    { label: 'Digital Marketing Haryana', href: '/digital-marketing-agency-haryana', desc: 'Full-scale marketing services in Haryana.' },
  ],
  cta: {
    headline: 'Scale Your Lead Generation Today',
    sub: 'Book a free PPC campaign review. Let\'s find where your ad budget is leaked and structure a high-converting campaign.'
  },
  service: 'Google Ads',
  city: 'Haryana',
  localBizDescription: 'Avani Enterprises is a certified Google Ads agency in Haryana, optimizing paid search campaigns, Performance Max ads, and PPC channels.',
};

export default function GoogleAdsHaryana() {
  return <LocalServicePage {...PAGE} />;
}
