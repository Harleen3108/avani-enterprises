import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import axios from 'axios';
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
      description: 'Transform your vision into reality with custom-built websites and mobile applications. We create scalable, high-performance digital solutions that deliver exceptional user experiences and drive measurable business results.',
      slug: 'web-development',
      index: '01',
    },
    {
      icon: '◈',
      title: 'SEO & Content Marketing',
      description: 'Dominate search rankings and captivate your audience with data-driven SEO strategies and compelling content. We help you build authority, increase organic traffic, and convert visitors into loyal customers.',
      slug: 'seo-content',
      index: '02',
    },
    {
      icon: '◇',
      title: 'Social Media Marketing',
      description: 'Build a powerful brand presence across social platforms. Our strategic campaigns create meaningful connections with your audience, boost engagement, and turn followers into brand advocates.',
      slug: 'social-media',
      index: '03',
    },
    {
      icon: '◉',
      title: 'AI Solutions',
      description: 'Harness the power of artificial intelligence to automate processes, gain actionable insights, and make smarter business decisions. We specialize in lead management automation, WhatsApp text automation, intelligent chatbots, and custom AI-powered tools.',
      slug: 'ai-solutions',
      index: '04',
    },
    {
      icon: '◌',
      title: 'Podcast Production',
      description: 'Amplify your brand voice with professional podcast production. From concept to distribution, we handle everything to help you reach and engage your target audience through compelling audio content.',
      slug: 'podcast-production',
      index: '05',
    },
    {
      icon: '◫',
      title: 'Financial Consulting',
      description: 'Navigate complex financial decisions with confidence. Our expert consultants provide strategic planning, investment guidance, and financial optimization strategies to accelerate your business growth.',
      slug: 'financial-consulting',
      index: '06',
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
    { name: 'Indus group of Institution', logo: '/indus.jpeg', video: '/indus.mp4', image: '/indus1.png', link: '/projects/indus' },
    { name: 'Policicue', logo: '/policucue.jpeg', video: '/policicue.mp4', image: '/policy1.png', link: '/projects/policicue' },
    { name: 'Frd Nutrition', logo: '/frd-nutrition-new.png', video: '/FrdNutrition.mp4', image: '/frd-nutrition-new.png', link: '/projects/frd-nutrition' },
    { name: 'Hi-tech Homes', logo: '/hitech.jpeg', video: '/hitech.mp4', image: '/hitech1.png', link: '/projects/hitech-homes' },
    { name: 'Sanjeevni Hospital', logo: '/sanjeevni.jpeg', video: '/Sanjeevni.mp4', image: '/sanjeevni1.png', link: '/projects/sanjeevni-hospital' },
    { name: 'Rohtak Shoe co.', logo: '/shoes.jpeg', video: '/Rohtak Shoe.mp4', image: '/shoes1.png', link: '/projects/rohtak-shoe' },
  ];

  return (
    <div className="dummy-home" style={{ fontFamily: "'Outfit', sans-serif", background: '#0A0705', color: '#F5EDD8' }}>
      <DummyNavbar />
      <DummyHero newsletters={newsletters} loadingNewsletters={loadingNewsletters} clientLogos={clientLogos} />
      <DummyLogoMarquee clientLogos={clientLogos} />
      <DummyServices services={services} />
      <DummyProcess processSteps={processSteps} />
      <DummyGlobalPresence />
      <DummyProjects clientLogos={clientLogos} />
      <DummyTestimonials testimonials={testimonials} />
      <DummyBlog blogs={blogs} loadingBlogs={loadingBlogs} />
      <DummyAnnouncement />
      <DummyCTA />
      <DummyFooter />
    </div>
  );
};

export default DummyHome;
