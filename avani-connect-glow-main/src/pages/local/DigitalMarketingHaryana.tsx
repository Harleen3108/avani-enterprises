import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Digital Marketing Agency in Haryana | Growth Retainers — Avani Enterprises',
    description: 'Looking for the digital marketing agency in Haryana? We help local brands in Rohtak, Panipat, Gurgaon, and Faridabad scale with SEO, custom web dev, PPC, and social media.',
    keywords: 'digital marketing agency haryana, digital marketing company haryana, online marketing services haryana, digital agency haryana, marketing consultants panipat',
    canonical: 'https://www.avanienterprises.in/digital-marketing-agency-haryana',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Digital Marketing — Haryana', href: '/digital-marketing-agency-haryana' },
  ],
  hero: {
    tag: '📈 Haryana\'s Premier Digital Agency',
    h1: 'Digital Marketing Agency in Haryana',
    subtitle: 'Helping businesses in Rohtak, Panipat, Gurgaon, and Faridabad build authority, capture quality leads, and scale revenue with integrated tech & marketing.',
    stats: [
      { value: '300+', label: 'Projects Completed' },
      { value: '85%', label: 'Average Growth Rate' },
      { value: '8+', label: 'Years Experience' },
      { value: '150+', label: 'Happy Clients' },
    ],
  },
  intro: `Scaling a brand in Haryana requires a digital partner who understands local markets as well as global tech standards. Our full-service Digital Marketing Agency Haryana builds custom growth engines for manufacturers, real estate developers, educational institutes, and retail brands.

Avani Enterprises has designed digital systems for over 150+ companies in Haryana, helping them launch fast websites, rank first for high-intent keywords on Google, and manage high-ROI paid media campaigns.`,
  whyAvani: [
    { title: 'Local Business Insight', desc: 'We understand Haryana\'s business environment — from industrial hubs in Faridabad to real estate hotspots in Gurgaon and local builders in Rohtak.' },
    { title: 'Integrated Tech & Marketing', desc: 'We don\'t just run ads; we design custom landing pages and sales pipelines to convert traffic into revenue.' },
    { title: 'Transparent Progress Tracking', desc: 'Get clear, easy-to-read reports detailing search impressions, keyword ranks, and exact leads.' },
    { title: 'Dedicated Support Desk', desc: 'Direct access to support engineers available via WhatsApp and phone for immediate resolution.' },
  ],
  localAreaText: `We serve businesses across all major Haryana cities — Rohtak, Gurgaon (Gurugram), Faridabad, Sonipat, Panipat, Karnal, Hisar, Ambala, and Panchkula. We customize campaigns to fit local demographics and business hubs.`,
  areaServed: ['Rohtak', 'Gurgaon', 'Faridabad', 'Panipat', 'Sonipat', 'Karnal', 'Hisar', 'Ambala', 'Panchkula'],
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
    { q: 'What services does your digital marketing agency offer in Haryana?', a: 'We offer custom web development, SEO, social media marketing, Google Ads management, lead automation, and corporate branding.' },
    { q: 'How much does digital marketing cost in Haryana?', a: 'Campaigns start at ₹15,000/month for basic SEO & social management, scaling up based on ad budgets and project goals.' },
    { q: 'How long does it take to see results from SEO?', a: 'Most Haryana businesses see significant keyword rank improvements and organic traffic increases within 90 to 120 days.' },
    { q: 'Do you work with manufacturing units in Haryana?', a: 'Yes. We specialize in B2B marketing for manufacturing hubs in Faridabad, Sonipat, and Panipat, helping them generate B2B export leads.' },
    { q: 'Can you manage our Google and Facebook ad campaigns?', a: 'Yes. We handle copy, graphics, targeting configurations, and daily optimizations to ensure high ROI.' },
    { q: 'Is there a setup fee?', a: 'No, we offer transparent monthly retainer plans with no hidden setup fees.' },
    { q: 'Do you write the website copy?', a: 'Yes. Our team of copywriters creates SEO-optimized, engaging copy for your landing pages.' },
    { q: 'How do we get started?', a: 'Call +91 92536 25099 or email kp@avanienterprises.in to book a free 20-minute digital audit.' }
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Web Development Haryana', href: '/web-development-company-haryana', desc: 'Custom website engineering in Haryana.' },
    { label: 'SEO Company Haryana', href: '/seo-company-haryana', desc: 'Google rankings for Haryana brands.' },
    { label: 'Digital Marketing Delhi', href: '/digital-marketing-agency-delhi', desc: 'Full-service digital services in Delhi.' },
  ],
  cta: {
    headline: 'Scale Your Haryana Brand Online',
    sub: 'Book a free 20-minute digital audit. Let\'s evaluate your current site and outline a tailored growth plan.'
  },
  service: 'Digital Marketing',
  city: 'Haryana',
  localBizDescription: 'Avani Enterprises is a premier digital marketing agency in Haryana, delivering high-impact SEO, web dev, and paid campaigns for local businesses.',
};

export default function DigitalMarketingHaryana() {
  return <LocalServicePage {...PAGE} />;
}
