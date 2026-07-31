import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Social Media Marketing Agency in Haryana | Instagram, Facebook & LinkedIn — Avani Enterprises',
    description: 'Top social media marketing agency in Haryana. We grow Instagram, Facebook & LinkedIn accounts for Gurgaon, Rohtak & Faridabad businesses. Reel production, paid ads & community management. Free audit.',
    keywords: 'social media marketing agency haryana, social media marketing company haryana, instagram marketing haryana, facebook marketing haryana, social media agency gurgaon, social media management haryana, digital marketing agency haryana',
    canonical: 'https://www.avanienterprises.in/social-media-marketing-agency-haryana',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Social Media Marketing', href: '/services/social-media-marketing' },
    { label: 'SMM Agency — Haryana', href: '/social-media-marketing-agency-haryana' },
  ],
  hero: {
    tag: '📱 Haryana\'s Social Media Marketing Agency',
    h1: 'Social Media Marketing Agency in Haryana',
    subtitle: 'We turn your social media presence into a 24/7 lead generation machine. Stunning reels, targeted ads, and community management that grows Haryana businesses on Instagram, Facebook & LinkedIn.',
    stats: [
      { value: '500K+', label: 'Combined Reach' },
      { value: '12%', label: 'Avg Engagement' },
      { value: '3×', label: 'Lead Growth' },
      { value: '50+', label: 'Haryana Brands' },
    ],
  },
  intro: `Social media isn't just for big brands. For Haryana businesses — whether you're a manufacturer in Faridabad, a restaurant in Gurgaon, or a coaching centre in Rohtak — a powerful social media presence directly translates to more inquiries, more footfall, and more revenue.

Avani Enterprises manages social media for 50+ Haryana businesses. We create scroll-stopping content in Hindi and English, run precisely targeted Meta and LinkedIn ad campaigns, and build authentic communities around your brand. Our Haryana-based creative team understands local culture, festivals, and audience psychology — crafting content that resonates with Haryana consumers.`,
  whyAvani: [
    { title: 'Haryana-Specific Content', desc: 'We create content that resonates with Haryana audiences — using local references, Hindi captions, festival campaigns, and regional trends that generic agencies miss.' },
    { title: 'Full Reel & Video Production', desc: 'Our in-house creative team produces professional reels, product videos, and testimonial content. No need to find a separate videographer.' },
    { title: 'Hyper-Local Ad Targeting', desc: 'We run Meta Ads targeted to specific Haryana districts, PIN codes, and demographics — ensuring your budget reaches your exact ideal customer in Gurgaon, Rohtak, or Faridabad.' },
    { title: 'Monthly Performance Reports', desc: 'Transparent monthly reports showing follower growth, engagement rate, leads generated, and ad spend ROI — in simple, jargon-free language.' },
  ],
  localAreaText: `We work with businesses across Haryana — Gurgaon (Gurugram), Rohtak, Faridabad, Panipat, Karnal, Sonipat, Hisar, Ambala, Rewari, and Bahadurgarh. Our local team runs ad campaigns with Haryana-specific geo-targeting, seasonal campaigns aligned to local events (Teej, Baisakhi, Haryana Day), and creates content in both Hindi and English.`,
  areaServed: ['Gurgaon', 'Rohtak', 'Faridabad', 'Panipat', 'Karnal', 'Sonipat', 'Hisar', 'Ambala', 'Rewari'],
  features: [
    { icon: '🎬', title: 'Reel & Video Production', desc: 'Professional short-form videos for Instagram Reels, Facebook Reels, and YouTube Shorts — designed to go viral in Haryana\'s growing social media market.' },
    { icon: '🎨', title: 'Brand Graphics & Creatives', desc: 'Custom-designed social media posts, story templates, and carousel ads aligned with your brand identity and Haryana audience preferences.' },
    { icon: '📣', title: 'Meta Ads (Facebook & Instagram)', desc: 'ROI-focused ad campaigns with Haryana geo-targeting, A/B tested creatives, and conversion-optimised landing pages.' },
    { icon: '💼', title: 'LinkedIn Marketing', desc: 'B2B LinkedIn content and ads for Haryana manufacturers, consultants, and service businesses targeting corporate buyers in Delhi NCR.' },
    { icon: '💬', title: 'Community Management', desc: 'Daily comment responses, DM management, review replies, and community engagement to build brand loyalty among Haryana followers.' },
    { icon: '📅', title: 'Content Calendar', desc: '30-day content calendars aligned to Haryana festivals, seasons, and business events ensuring consistent posting that builds algorithm momentum.' },
    { icon: '🔍', title: 'Influencer Collaborations', desc: 'Partnerships with Haryana-based micro and macro influencers across lifestyle, food, education, and business niches for authentic brand exposure.' },
    { icon: '📈', title: 'Growth Analytics', desc: 'Weekly analytics reviews tracking reach, impressions, engagement, follower growth, and leads generated from each platform.' },
  ],
  faqs: [
    { q: 'How much does social media marketing cost in Haryana?', a: 'Our social media packages start at ₹8,000/month for basic content management (3 posts/week + monthly report). Full-service packages with reels, ads, and community management start at ₹20,000/month. Custom packages available for Haryana businesses with specific needs.' },
    { q: 'Which social media platforms do you manage for Haryana businesses?', a: 'We manage Instagram, Facebook, LinkedIn, YouTube, Twitter/X, and WhatsApp Business. For most Haryana SMBs, we recommend starting with Instagram and Facebook, then expanding to LinkedIn for B2B.' },
    { q: 'How long does it take to see results from social media marketing?', a: 'Organic growth takes 2–3 months to show meaningful results. Paid social media ads can generate leads within the first week. We set realistic expectations and track progress every month with detailed reports.' },
    { q: 'Do you create content in Hindi for Haryana audiences?', a: 'Yes. We create bilingual content in Hindi and English, with Hindi captions and hashtags performing significantly better for local Haryana audiences on Instagram and Facebook.' },
    { q: 'Can you run festival campaign ads for Haryana-specific occasions?', a: 'Absolutely. We plan campaigns around Teej, Baisakhi, Haryana Day, Diwali, Holi, and other festivals. Local festival campaigns consistently outperform generic content for Haryana businesses.' },
    { q: 'What is your process for creating social media content?', a: 'We start with a brand audit and competitor analysis, create a monthly content calendar, get your approval on all creatives before posting, manage comments and DMs, and provide detailed monthly reports.' },
    { q: 'Do you handle Instagram Reels production?', a: 'Yes. Our Gurgaon-based creative team handles scripting, shooting (on-site or remotely), editing, music licensing, and captioning for Instagram Reels. We produce 4–8 reels per month depending on the package.' },
    { q: 'How do social media ads work for Haryana local businesses?', a: 'We run Meta Ads targeted to specific Haryana locations (even PIN-code level), age groups, interests, and behaviours. A ₹5,000–₹15,000 monthly ad budget can generate 50–200 quality leads for most Haryana businesses.' },
    { q: 'Can I see examples of your social media work?', a: 'Yes. Visit our case studies section or call us for a detailed portfolio review. We\'ve managed social media for restaurants, real estate, education, healthcare, and manufacturing businesses across Haryana.' },
    { q: 'Do you offer a free social media audit?', a: 'Yes. Call +91 84487 63134 for a free 20-minute social media audit. We\'ll review your current profiles, identify gaps, and give you 3 quick wins you can implement immediately.' },
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Social Media Marketing — Delhi', href: '/social-media-marketing-agency-delhi', desc: 'Expert SMM for Delhi businesses.' },
    { label: 'Digital Marketing Agency — Haryana', href: '/digital-marketing-agency-haryana', desc: 'Full digital marketing services in Haryana.' },
    { label: 'Google Ads Agency — Haryana', href: '/google-ads-agency-haryana', desc: 'High-ROI Google Ads campaigns for Haryana.' },
    { label: 'SEO Company — Haryana', href: '/seo-company-haryana', desc: 'Rank on Google for Haryana keywords.' },
    { label: 'Rohtak Digital Marketing', href: '/rohtak', desc: 'All digital services in Rohtak.' },
  ],
  cta: {
    headline: 'Ready to Dominate Social Media in Haryana?',
    sub: 'Get a free social media audit and custom content strategy for your Haryana business. 30-minute call, zero commitment.',
  },
  service: 'Social Media Marketing',
  city: 'Haryana',
  localBizDescription: 'Avani Enterprises is a leading social media marketing agency in Haryana, managing Instagram, Facebook, and LinkedIn for businesses in Gurgaon, Rohtak, Faridabad, and across Haryana.',
};

export default function SmmHaryana() {
  return <LocalServicePage {...PAGE} />;
}
