import React from 'react';
import LocalServicePage, { LocalServicePageProps } from './LocalServicePage';

const PAGE: LocalServicePageProps = {
  seo: {
    title: 'Social Media Marketing Agency in Delhi | Instagram, Facebook & LinkedIn Ads — Avani Enterprises',
    description: 'Best social media marketing agency in Delhi. We manage Instagram, Facebook & LinkedIn for Delhi businesses with reel production, targeted Meta Ads, and community management. Get a free audit today.',
    keywords: 'social media marketing agency delhi, social media marketing company delhi, instagram marketing delhi, facebook ads delhi, social media management delhi, social media agency south delhi, linkedin marketing delhi, influencer marketing delhi',
    canonical: 'https://www.avanienterprises.in/social-media-marketing-agency-delhi',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Social Media Marketing', href: '/services/social-media-marketing' },
    { label: 'SMM Agency — Delhi', href: '/social-media-marketing-agency-delhi' },
  ],
  hero: {
    tag: '🏙️ Delhi\'s Premier Social Media Agency',
    h1: 'Social Media Marketing Agency in Delhi',
    subtitle: 'From Connaught Place restaurants to Karol Bagh fashion brands — we help Delhi businesses build powerful social media presences that generate real leads and real revenue.',
    stats: [
      { value: '1M+', label: 'Delhi Audience Reach' },
      { value: '15%', label: 'Avg Engagement Rate' },
      { value: '4×', label: 'ROI on Ad Spend' },
      { value: '80+', label: 'Delhi Brands' },
    ],
  },
  intro: `Delhi's digital consumers are sophisticated, demanding, and spoiled for choice. To stand out on Instagram, Facebook, and LinkedIn in Delhi, you need more than generic posts — you need culturally relevant content, precise targeting, and a strategy that converts followers into customers.

Avani Enterprises has managed social media for 80+ Delhi businesses across industries — from South Delhi luxury boutiques to Rohini coaching centres, from Okhla manufacturers to Hauz Khas restaurants. We understand Delhi's diverse audience segments and create content strategies that resonate in every pocket of the city.`,
  whyAvani: [
    { title: 'Delhi Audience Psychology', desc: 'We understand what Delhi consumers respond to — aspirational lifestyle content, deal-focused CTAs, Hindi-English code-switching, and seasonal buying triggers.' },
    { title: 'Metro-Level Geo-Targeting', desc: 'We target ads at specific Delhi metro areas, localities, and pinodes — ensuring your ad budget reaches your exact neighbourhood and customer profile.' },
    { title: 'Celebrity & Influencer Network', desc: 'We have relationships with 200+ Delhi-based influencers across food, fashion, lifestyle, education, and business niches for authentic paid collaborations.' },
    { title: 'Crisis Management', desc: 'Delhi\'s high-profile business environment means online reputation matters. We monitor all mentions and handle negative reviews and comments professionally.' },
  ],
  localAreaText: `We serve businesses across all Delhi zones — South Delhi (Saket, Vasant Kunj, Hauz Khas, Lajpat Nagar), North Delhi (Rohini, Pitampura, Shalimar Bagh), East Delhi (Laxmi Nagar, Preet Vihar), West Delhi (Janakpuri, Dwarka, Paschim Vihar), and Central Delhi (Connaught Place, Karol Bagh, Paharganj). We also serve Noida, Greater Noida, and Ghaziabad businesses targeting Delhi audiences.`,
  areaServed: ['South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'Dwarka', 'Rohini', 'Noida', 'Ghaziabad'],
  features: [
    { icon: '🎥', title: 'Premium Reel Production', desc: 'Cinematic Instagram Reels, YouTube Shorts and Facebook videos produced at our Delhi studio or on-site at your business location.' },
    { icon: '🎯', title: 'Precision Meta Ads', desc: 'Facebook and Instagram campaigns targeted by Delhi locality, income bracket, buying intent, and competitor audience retargeting.' },
    { icon: '📸', title: 'Brand Photography', desc: 'Professional product and brand photography for Delhi businesses — delivered as print-ready and social-ready assets within 72 hours.' },
    { icon: '💼', title: 'LinkedIn B2B Campaigns', desc: 'Thought leadership content and sponsored campaigns reaching Delhi\'s corporate decision-makers — CEOs, MDs, and senior managers.' },
    { icon: '🌟', title: 'Influencer Marketing', desc: 'Managed influencer campaigns with Delhi-based creators across Instagram, YouTube, and LinkedIn with performance tracking and ROI reporting.' },
    { icon: '📊', title: 'Social Commerce', desc: 'Instagram Shopping, Facebook Shop, and WhatsApp catalogue setup — turning your social profiles into direct sales channels.' },
    { icon: '🔔', title: 'WhatsApp Marketing', desc: 'WhatsApp Business broadcast campaigns, automated follow-ups, and customer support flows for Delhi\'s WhatsApp-heavy consumer market.' },
    { icon: '📈', title: 'Competitor Analysis', desc: 'Monthly competitive benchmarking against Delhi\'s top businesses in your category — identifying gaps and opportunities to outperform rivals.' },
  ],
  faqs: [
    { q: 'How much does social media marketing cost in Delhi?', a: 'Our Delhi packages start at ₹10,000/month for basic management (3 posts/week on 2 platforms). Full-service packages with reels, ads, and community management start at ₹25,000/month. We customise based on your business size and goals.' },
    { q: 'Which social media platforms work best for Delhi businesses?', a: 'Instagram and Facebook work best for B2C businesses. LinkedIn is essential for B2B companies. YouTube is excellent for educational content and tutorials. For Delhi\'s young urban audience (18–35), Instagram Reels drive the highest organic reach.' },
    { q: 'How do you target Delhi-specific audiences with social media ads?', a: 'We use Meta\'s detailed geo-targeting to target specific Delhi localities, PIN codes, and metro stations. We also build custom audiences from your customer database, website visitors, and competitor followers.' },
    { q: 'Can you manage our negative reviews and online reputation in Delhi?', a: 'Yes. We monitor all social media mentions, Google reviews, and online discussions about your brand. We respond professionally to negative comments and escalate genuine issues to your team for resolution.' },
    { q: 'How many posts do you create per week?', a: 'Standard packages include 3 posts/week (12/month). Premium packages include 5 posts/week + 4–8 reels/month + daily stories. All content is approved by you before posting.' },
    { q: 'Do you provide social media marketing for restaurants in Delhi?', a: 'Yes. We specialise in restaurant social media — food photography, reel production, table-booking integration, Zomato/Swiggy promotions, and hyperlocal ad campaigns targeting Delhi food lovers.' },
    { q: 'Can you run social media ads with a small budget in Delhi?', a: 'Yes. We run effective campaigns with ad budgets as low as ₹5,000/month. For micro-budgets, we focus on hyperlocal Instagram ads that generate high-quality leads at lower cost than large-scale campaigns.' },
    { q: 'Do you help Delhi businesses with Diwali and seasonal campaigns?', a: 'Absolutely. We plan campaigns 4–6 weeks ahead of major Delhi shopping seasons (Diwali, Navratri, End of Season Sales) to maximise reach, bookings, and sales during peak periods.' },
    { q: 'What results can I expect in 3 months?', a: 'In 3 months, most Delhi clients see 30–150% follower growth, 50–200% engagement improvement, and 20–100 monthly leads from social media depending on budget and industry.' },
    { q: 'How do I get started?', a: 'Call +91 84487 63134 or email kp@avanienterprises.in. We start with a free 20-minute social media audit reviewing your current profiles and market position.' },
  ],
  reviews: [],
  relatedLinks: [
    { label: 'Social Media Marketing — Haryana', href: '/social-media-marketing-agency-haryana', desc: 'SMM services for Haryana businesses.' },
    { label: 'Digital Marketing Agency — Delhi', href: '/digital-marketing-agency-delhi', desc: 'Full-service digital marketing in Delhi.' },
    { label: 'SEO Company — Delhi', href: '/seo-company-delhi', desc: 'Google rankings for Delhi businesses.' },
    { label: 'Web Development — Delhi', href: '/web-development-company-delhi', desc: 'Custom websites for Delhi businesses.' },
    { label: 'Digital Marketing — Gurgaon', href: '/gurgaon', desc: 'Digital services for Gurgaon businesses.' },
  ],
  cta: {
    headline: 'Grow Your Delhi Business on Social Media',
    sub: 'Free social media audit in 20 minutes. Let\'s identify your biggest opportunity and build a content plan that generates real Delhi customers.',
  },
  service: 'Social Media Marketing',
  city: 'Delhi',
  localBizDescription: 'Avani Enterprises is a leading social media marketing agency in Delhi, managing Instagram, Facebook, and LinkedIn for businesses across Delhi and Delhi NCR.',
};

export default function SmmDelhi() {
  return <LocalServicePage {...PAGE} />;
}
