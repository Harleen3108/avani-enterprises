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
import DummyTeam from './DummyTeam';
import DummyAwards from './DummyAwards';
import DummyTimeline from './DummyTimeline';
import DummyFAQ from './DummyFAQ';

const DummyHome = () => {
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [blogs, setBlogs] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNewsletters, setLoadingNewsletters] = useState(true);

  // Apply theme to body bg to ensure scroll-bounces match
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#0A0705' : '#F0EAD6';
  }, [theme]);

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
    <div className={theme === 'dark' ? 'dummy-theme-dark' : 'dummy-theme-light'} style={{ fontFamily: "'Satoshi', sans-serif", background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden', minHeight: '100vh' }}>
      
      {/* Theme Toggle Button */}
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        style={{
          position: 'fixed', bottom: '24px', left: '24px', zIndex: 9999,
          width: '50px', height: '50px', borderRadius: '50%',
          background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-light)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
              <Sun size={22} color="var(--accent-primary)" />
            </motion.div>
          ) : (
            <motion.div key="moon" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
              <Moon size={22} color="var(--accent-primary)" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <DummyScrollProgress />
      <DummyNavbar />
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
      <DummyTeam />
      <DummyAwards />
      <DummyTimeline />
      <DummyBlog blogs={blogs} loadingBlogs={loadingBlogs} />
      <DummyAnnouncement />
      <DummyFAQ />
      <DummyCTA />
      <DummyFooter />

      <style>{`
        .dummy-theme-dark {
          --bg-primary: #0A0705;
          --bg-secondary: #0F0C09;
          --bg-tertiary: #1A1410;
          
          --text-primary: #F5EDD8;
          --text-secondary: rgba(245,237,216,0.7);
          --text-tertiary: rgba(245,237,216,0.45);
          
          --accent-primary: #C4913A;
          --accent-light: #E8B96A;
          --accent-hover: rgba(196,145,58,0.1);
          
          --border-light: rgba(196,145,58,0.15);
          --border-faint: rgba(245,237,216,0.07);
          
          --card-bg: rgba(255,255,255,0.02);
          --glass-bg: rgba(10,7,5,0.75);
          --nav-scrolled: rgba(10,7,5,0.92);
        }

        .dummy-theme-light {
          --bg-primary: #F0EAD6;
          --bg-secondary: #E3D5C0;
          --bg-tertiary: #D4C1A5;
          
          --text-primary: #382513;
          --text-secondary: rgba(56,37,19,0.85);
          --text-tertiary: rgba(56,37,19,0.65);
          
          --accent-primary: #6B4423;
          --accent-light: #8B5E3C;
          --accent-hover: rgba(107,68,35,0.15);
          
          --border-light: rgba(107,68,35,0.25);
          --border-faint: rgba(56,37,19,0.12);
          
          --card-bg: rgba(227,213,192,0.4);
          --glass-bg: rgba(240,234,214,0.85);
          --nav-scrolled: rgba(240,234,214,0.98);
        }
      `}</style>
    </div>
  );
};

export default DummyHome;
