import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Sun, Moon } from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';

// Dummy isolated components
import DummyNavbar from './DummyNavbar';
import DummyFooter from './DummyFooter';
import DummyHero from './DummyHero';
import DummyServices from './DummyServices';
import DummyProcess from './DummyProcess';
import DummyTestimonials from './DummyTestimonials';
import DummyLogoMarquee from './DummyLogoMarquee';
import DummyProjects from './DummyProjects';
import DummyBlog from './DummyBlog';
import DummyAnnouncement from './DummyAnnouncement';
import DummyGlobalPresence from './Dummyglobalpresence';
import DummyCTA from './DummyCTA';

// New Phase 1 components
import DummyScrollProgress from './DummyScrollProgress';

// New Phase 2 components
import DummyImpactBar from './DummyImpactBar';
import DummyCaseStudies from './DummyCaseStudies';
import DummyIndustries from './DummyIndustries';
import DummyAwards from './DummyAwards';
import DummyTimeline from './DummyTimeline';
import DummyFAQ from './DummyFAQ';

const DummyHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNewsletters, setLoadingNewsletters] = useState(true);

  useEffect(() => {
    fetchBlogs();
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoadingNewsletters(true);
      const response = await fetch(`${API_BASE_URL}/api/newsletters`, {
        headers: { 'Accept': 'application/json' }
      });
      const json = await response.json();
      if (json.success) {
        const filteredNews = (json.data || []).filter(
          (n: any) => n.title.toLowerCase() !== 'test something'
        );
        setNewsletters(filteredNews);
      }
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    } finally {
      setLoadingNewsletters(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const response = await axios.get(`${API_BASE_URL}/blogs?limit=3`);
      if (response.data.success) {
        setBlogs(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const services = [
    {
      icon: '◎',
      title: 'Web & App Development',
      description: 'We build stunning, lightning-fast websites and mobile apps tailored to your business. From eye-catching designs to seamless functionality, we bring your digital ideas to life and help you scale effortlessly.',
      slug: 'web-app-development',
      index: '01',
      image: '/whatwecreate/webdev.png',
      subLinks: [
        { name: 'Custom Websites', path: '/dummyhome/services/web-app-development' },
        { name: 'Mobile Apps', path: '/dummyhome/services/web-app-development' },
        { name: 'E-Commerce', path: '/dummyhome/services/web-app-development' },
        { name: 'UI/UX Design', path: '/dummyhome/services/web-app-development' }
      ]
    },
    {
      icon: '◈',
      title: 'SEO & Content Marketing',
      description: 'Get found on Google and turn casual visitors into loyal customers. We write engaging content and optimize your site so you rank higher, attract more traffic, and grow your brand organically.',
      slug: 'seo-content-marketing',
      index: '02',
      image: '/whatwecreate/seoandcontent.jpg',
      subLinks: [
        { name: 'Lead Generation', path: '/dummyhome/services/seo-content-marketing' },
        { name: 'Search Ranking', path: '/dummyhome/services/seo-content-marketing' },
        { name: 'Brand Authority', path: '/dummyhome/services/seo-content-marketing' },
        { name: 'Content Strategy', path: '/dummyhome/services/seo-content-marketing' }
      ]
    },
    {
      icon: '◉',
      title: 'AI Solutions',
      description: 'Work smarter, not harder, with cutting-edge AI. From automated lead tracking and smart WhatsApp tools to custom chatbots that handle support 24/7, we automate your busywork so you can focus on growth.',
      slug: 'ai-solutions',
      index: '03',
      image: '/whatwecreate/aisolutions.webp',
      subLinks: [
        { name: 'Lead Tracker AI', path: '/dummyhome/services/ai-solutions' },
        { name: 'WhatsApp Auto-Agent', path: '/dummyhome/services/ai-solutions' },
        { name: 'Workflow Optimizer', path: '/dummyhome/services/ai-solutions' },
        { name: 'Custom Chatbots', path: '/dummyhome/services/ai-solutions' }
      ]
    },
    {
      icon: '◇',
      title: 'Social Media Marketing',
      description: 'Grow your social presence and connect with your dream audience. We create high-performing campaigns and scroll-stopping posts on Instagram, Facebook, and LinkedIn to build real engagement and drive sales.',
      slug: 'social-media-marketing',
      index: '04',
      image: '/whatwecreate/socialmedia.png',
      subLinks: [
        { name: 'Campaign Strategy', path: '/dummyhome/services/social-media-marketing' },
        { name: 'Audience Growth', path: '/dummyhome/services/social-media-marketing' },
        { name: 'Ad Management', path: '/dummyhome/services/social-media-marketing' },
        { name: 'Brand Engagement', path: '/dummyhome/services/social-media-marketing' }
      ]
    },
    {
      icon: '◌',
      title: 'Podcast Production',
      description: 'Launch a professional podcast and make your voice heard. We handle everything from recording setup and audio editing to global distribution on Spotify and Apple Podcasts, making hosting a breeze.',
      slug: 'podcast-production',
      index: '05',
      image: '/whatwecreate/podcast.webp',
      subLinks: [
        { name: 'Audio Editing', path: '/dummyhome/services/podcast-production' },
        { name: 'Global Distribution', path: '/dummyhome/services/podcast-production' },
        { name: 'Studio Setup', path: '/dummyhome/services/podcast-production' },
        { name: 'Content Planning', path: '/dummyhome/services/podcast-production' }
      ]
    },
    {
      icon: '◫',
      title: 'Financial Consulting',
      description: 'Take control of your finances and plan for a wealthy future. Our expert consultants help you organize your revenue, optimize investments, and build a solid financial blueprint for long-term growth.',
      slug: 'financial-consulting',
      index: '06',
      image: '/whatwecreate/finance.webp',
      subLinks: [
        { name: 'Revenue Optimization', path: '/dummyhome/services/financial-consulting' },
        { name: 'Investment Strategy', path: '/dummyhome/services/financial-consulting' },
        { name: 'Risk Management', path: '/dummyhome/services/financial-consulting' },
        { name: 'Tax Planning', path: '/dummyhome/services/financial-consulting' }
      ]
    },
    {
      icon: '▣',
      title: 'Business Consultation',
      description: 'Scale your business with expert guidance and strategy. We analyze your day-to-day operations to find hidden opportunities, streamline workflows, and set you up for long-term, sustainable success.',
      slug: 'business-consultation',
      index: '07',
      image: '/whatwecreate/consultation.png',
      subLinks: [
        { name: 'Growth Strategy', path: '/dummyhome/services/business-consultation' },
        { name: 'Workflow Analysis', path: '/dummyhome/services/business-consultation' },
        { name: 'Market Expansion', path: '/dummyhome/services/business-consultation' },
        { name: 'Operational Efficiency', path: '/dummyhome/services/business-consultation' }
      ]
    },
    {
      icon: '▤',
      title: 'Business Loans',
      description: 'Get the funding you need to grow and expand. We connect you with flexible business loans, working capital, and equipment financing at competitive rates, with quick approvals and hassle-free processing.',
      slug: 'business-loans',
      index: '08',
      image: '/whatwecreate/loans.png',
      subLinks: [
        { name: 'Working Capital', path: '/dummyhome/services/business-loans' },
        { name: 'Equipment Financing', path: '/dummyhome/services/business-loans' },
        { name: 'Fast Approvals', path: '/dummyhome/services/business-loans' },
        { name: 'Flexible Terms', path: '/dummyhome/services/business-loans' }
      ]
    },
    {
      icon: '▥',
      title: 'Business Insurance',
      description: 'Secure your hard work and protect your business from risks. We offer customized insurance plans to safeguard your assets, employees, and operations, giving you absolute peace of mind.',
      slug: 'business-insurance',
      index: '09',
      image: '/whatwecreate/insurance.png',
      subLinks: [
        { name: 'Asset Protection', path: '/dummyhome/services/business-insurance' },
        { name: 'Liability Coverage', path: '/dummyhome/services/business-insurance' },
        { name: 'Employee Benefits', path: '/dummyhome/services/business-insurance' },
        { name: 'Risk Mitigation', path: '/dummyhome/services/business-insurance' }
      ]
    },
  ];

  const processSteps = [
    { step: '01', title: 'Discover', description: 'We analyze your business, competitors, and market opportunities to create a strategic foundation.' },
    { step: '02', title: 'Define', description: 'Clear objectives, target audience, and success metrics are established for measurable results.' },
    { step: '03', title: 'Design', description: 'Creative solutions and user experiences that align with your brand and business goals.' },
    { step: '04', title: 'Develop', description: 'Agile development process with regular updates and quality assurance at every stage.' },
    { step: '05', title: 'Deploy', description: 'Strategic launch with comprehensive testing, optimization, and performance monitoring.' },
    { step: '06', title: 'Deliver', description: 'Ongoing support, analytics, and optimization to ensure sustained growth and ROI.' },
  ];

  const testimonials = [
    {
      name: 'Director Of Indus School',
      position: 'Principal, Indus Public School',
      content: 'Avani Enterprises delivered an outstanding website that perfectly captures our school\'s vision and values. The design is modern, intuitive, and makes it easy for parents and students to find information. Their team was professional, responsive, and delivered beyond our expectations.',
      rating: 5,
      image: '/indus.jpeg',
    },
    {
      name: 'Vikram Sharma',
      position: 'Managing Director, Rohtak Shoe Company',
      content: 'The e-commerce platform developed by Avani Enterprises transformed our business completely. Online sales increased by 250% in just 3 months. The website is fast, user-friendly, and our customers love the shopping experience. Highly recommended!',
      rating: 5,
      image: '/shoes.jpeg',
    },
    {
      name: 'Sanjay Vats',
      position: 'Co-Founder, Policicue',
      content: 'Working with Avani Enterprises was a game-changer for our startup. They built a sophisticated platform that handles complex policy management with ease. The UI/UX is exceptional, and their technical expertise is top-notch. Our users are impressed!',
      rating: 5,
      image: '/policucue.jpeg',
    },
    {
      name: 'Amit Kapoor',
      position: 'Founder, FRD Nutrition',
      content: 'The team created a stunning website that perfectly showcases our nutrition products. The e-commerce integration is seamless, and we\'ve seen a 180% increase in online orders. Their attention to detail and customer service is outstanding!',
      rating: 5,
      image: '/frd-nutrition-new.png',
    },
    {
      name: 'Aman Sharma',
      position: 'CEO, Hi-Tech Luxury Homes',
      content: 'We\'re thrilled with the elegant website that beautifully represents our luxury properties. The design is sophisticated, the property listings are easy to manage, and our clients love the virtual tour feature. Excellent work!',
      rating: 5,
      image: '/hitech.jpeg',
    },
    {
      name: 'Dr. Mohit Verma',
      position: 'Director, Sanjeevni Hospital',
      content: 'The hospital management portal developed by Avani Enterprises has streamlined our operations significantly. Patient appointment booking is now effortless, and the admin panel is incredibly user-friendly. A truly professional solution!',
      rating: 5,
      image: '/sanjeevni.jpeg',
    },
  ];

  const clientLogos = [
    { name: 'Indus group of Institution', logo: '/indus.jpeg', video: '/indus.mp4', image: '/indus1.png', link: '/dummyhome/projects/indus' },
    { name: 'Policicue', logo: '/policucue.jpeg', video: '/policicue.mp4', image: '/policy1.png', link: '/dummyhome/projects/policicue' },
    { name: 'Frd Nutrition', logo: '/frd-nutrition-new.png', video: '/FrdNutrition.mp4', image: '/frd-nutrition-new.png', link: '/dummyhome/projects/frd-nutrition' },
    { name: 'Hi-tech Homes', logo: '/hitech.jpeg', video: '/hitech.mp4', image: '/hitech1.png', link: '/dummyhome/projects/hitech-homes' },
    { name: 'Sanjeevni Hospital', logo: '/sanjeevni.jpeg', video: '/Sanjeevni.mp4', image: '/sanjeevni1.png', link: '/dummyhome/projects/sanjeevni-hospital' },
    { name: 'Rohtak Shoe co.', logo: '/shoes.jpeg', video: '/Rohtak Shoe.mp4', image: '/shoes1.png', link: '/dummyhome/projects/rohtak-shoe' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <DummyHero newsletters={newsletters} loadingNewsletters={loadingNewsletters} clientLogos={clientLogos} />
      <DummyLogoMarquee clientLogos={clientLogos} />
      <DummyImpactBar />
      <DummyServices services={services} />
      <DummyProcess processSteps={processSteps} />
      <DummyCaseStudies />
      <DummyIndustries />
      <DummyGlobalPresence />
      <DummyProjects clientLogos={clientLogos} />
      <DummyTestimonials testimonials={testimonials} />
      <DummyAwards />
      <DummyTimeline />
      <DummyBlog blogs={blogs} loadingBlogs={loadingBlogs} />
      <DummyAnnouncement />
      <DummyFAQ />
      <DummyCTA />
    </div>
  );
};

export default DummyHome;
