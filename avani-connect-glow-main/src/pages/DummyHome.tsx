// DummyHome — Main page for /dummyhome route
// This page assembles all dummy components for the redesigned homepage.
// Original homepage (/) is completely untouched.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

import DummyAnnouncement from '../components/dummy/DummyAnnouncement';
import DummyHero from '../components/dummy/DummyHero';
import DummyLogoMarquee from '../components/dummy/DummyLogoMarquee';
import DummyServices from '../components/dummy/DummyServices';
import DummyProcess from '../components/dummy/DummyProcess';
import DummyProjects from '../components/dummy/DummyProjects';
import DummyTestimonials from '../components/dummy/DummyTestimonials';
import DummyBlog from '../components/dummy/DummyBlog';
import DummyCTA from '../components/dummy/DummyCTA';

/* ═══════════════════════════════════════════════════════════════ */
/*  ALL DATA — identical to Home.tsx, fully self-contained        */
/* ═══════════════════════════════════════════════════════════════ */

const clientLogos = [
  { name: 'Indus group of Institution', logo: '/indus.jpeg', video: '/indus.mp4', image: '/indus1.png', link: '/projects/indus' },
  { name: 'Policicue', logo: '/policucue.jpeg', video: '/policicue.mp4', image: '/policy1.png', link: '/projects/policicue' },
  { name: 'Frd Nutrition', logo: '/frd-nutrition-new.png', video: '/FrdNutrition.mp4', image: '/frd-nutrition-new.png', link: '/projects/frd-nutrition' },
  { name: 'Hi-tech Homes', logo: '/hitech.jpeg', video: '/hitech.mp4', image: '/hitech1.png', link: '/projects/hitech-homes' },
  { name: 'Sanjeevni Hospital', logo: '/sanjeevni.jpeg', video: '/Sanjeevni.mp4', image: '/sanjeevni1.png', link: '/projects/sanjeevni-hospital' },
  { name: 'Rohtak Shoe co.', logo: '/shoes.jpeg', video: '/Rohtak Shoe.mp4', image: '/shoes1.png', link: '/projects/rohtak-shoe' },
];

const services = [
  { index: '01', title: 'Web & App Development', description: 'Transform your vision into reality with custom-built websites and mobile applications. We create scalable, high-performance digital solutions that deliver exceptional user experiences and drive measurable business results.', slug: 'web-development' },
  { index: '02', title: 'SEO & Content Marketing', description: 'Dominate search rankings and captivate your audience with data-driven SEO strategies and compelling content. We help you build authority, increase organic traffic, and convert visitors into loyal customers.', slug: 'seo-content' },
  { index: '03', title: 'Social Media Marketing', description: 'Build a powerful brand presence across social platforms. Our strategic campaigns create meaningful connections with your audience, boost engagement, and turn followers into brand advocates.', slug: 'social-media' },
  { index: '04', title: 'AI Solutions', description: 'Harness the power of artificial intelligence to automate processes, gain actionable insights, and make smarter business decisions. We specialize in lead management automation, WhatsApp text automation, intelligent chatbots, and custom AI-powered tools.', slug: 'ai-solutions' },
  { index: '05', title: 'Podcast Production', description: 'Amplify your brand voice with professional podcast production. From concept to distribution, we handle everything to help you reach and engage your target audience through compelling audio content.', slug: 'podcast-production' },
  { index: '06', title: 'Financial Consulting', description: 'Navigate complex financial decisions with confidence. Our expert consultants provide strategic planning, investment guidance, and financial optimization strategies to accelerate your business growth.', slug: 'financial-consulting' },
  { index: '07', title: 'Business Consultation', description: "Unlock your business's full potential with expert strategic guidance. We analyze your operations, identify growth opportunities, and provide actionable insights to optimize performance and achieve sustainable success.", slug: 'business-consultation' },
  { index: '08', title: 'Business Loans', description: 'Fuel your growth with flexible financing solutions. Access term loans, working capital, equipment financing, and more with competitive rates and terms designed to support your business expansion.', slug: 'business-loans' },
  { index: '09', title: 'Business Insurance', description: "Protect what you've built with comprehensive insurance coverage. Safeguard your assets, mitigate risks, and ensure business continuity with tailored insurance plans that give you peace of mind.", slug: 'business-insurance' },
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
  { name: 'Director Of Indus School', position: 'Principal, Indus Public School', content: "Avani Enterprises delivered an outstanding website that perfectly captures our school's vision and values. The design is modern, intuitive, and makes it easy for parents and students to find information. Their team was professional, responsive, and delivered beyond our expectations.", rating: 5, image: '/indus.jpeg' },
  { name: 'Vikram Sharma', position: 'Managing Director, Rohtak Shoe Company', content: 'The e-commerce platform developed by Avani Enterprises transformed our business completely. Online sales increased by 250% in just 3 months. The website is fast, user-friendly, and our customers love the shopping experience. Highly recommended!', rating: 5, image: '/shoes.jpeg' },
  { name: 'Sanjay Vats', position: 'Co-Founder, Policicue', content: 'Working with Avani Enterprises was a game-changer for our startup. They built a sophisticated platform that handles complex policy management with ease. The UI/UX is exceptional, and their technical expertise is top-notch. Our users are impressed!', rating: 5, image: '/policucue.jpeg' },
  { name: 'Amit Kapoor', position: 'Founder, FRD Nutrition', content: "The team created a stunning website that perfectly showcases our nutrition products. The e-commerce integration is seamless, and we've seen a 180% increase in online orders. Their attention to detail and customer service is outstanding!", rating: 5, image: '/frd-nutrition-new.png' },
  { name: 'Aman Sharma', position: 'CEO, Hi-Tech Luxury Homes', content: "We're thrilled with the elegant website that beautifully represents our luxury properties. The design is sophisticated, the property listings are easy to manage, and our clients love the virtual tour feature. Excellent work!", rating: 5, image: '/hitech.jpeg' },
  { name: 'Dr. Mohit Verma', position: 'Director, Sanjeevni Hospital', content: 'The hospital management portal developed by Avani Enterprises has streamlined our operations significantly. Patient appointment booking is now effortless, and the admin panel is incredibly user-friendly. A truly professional solution!', rating: 5, image: '/sanjeevni.jpeg' },
];

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
        headers: { 'Accept': 'application/json' },
      });
      const json = await response.json();
      if (json.success) {
        const filteredNews = (json.data || []).filter((n: any) =>
          n.title.toLowerCase() !== 'test something'
        );
        setNewsletters(filteredNews);
      } else {
        console.error('API call for newsletters was not successful:', json);
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

  return (
    <div>
      <DummyHero
        newsletters={newsletters}
        loadingNewsletters={loadingNewsletters}
        clientLogos={clientLogos}
      />
      <DummyLogoMarquee clientLogos={clientLogos} />
      <DummyServices services={services} />
      <DummyProcess processSteps={processSteps} />
      <DummyProjects clientLogos={clientLogos} />
      <DummyTestimonials testimonials={testimonials} />
      <DummyBlog blogs={blogs} loadingBlogs={loadingBlogs} />
      <DummyAnnouncement />
      <DummyCTA />
    </div>
  );
};

export default DummyHome;
