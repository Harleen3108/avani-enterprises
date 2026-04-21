import React, { useState, useEffect, useRef } from 'react';
import { useSeo } from '../contexts/SeoContext';

import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Globe,
  Search,
  Share2,
  Brain,
  Mic,
  Calculator,
  ChevronRight,
  Star,
  Sparkles,
  Briefcase,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Mail,
  ChevronDown,
  Calendar,
  Clock
} from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';
import StatsSection from './StatsSection';
import { fadeInUp, viewportSettings, scaleOnHover } from '../utils/animations';
import RotatingText from '../components/RotatingText';
import LogoMarquee from '../components/LogoMarquee';
import GlobalPresenceSection from '../components/GlobalPresenceSection';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

const Home = () => {
  const { seo } = useSeo();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const [counter, setCounter] = useState({
    clients: 0,
    projects: 0,
    growth: 0,
    years: 0
  });
  const [blogs, setBlogs] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNewsletters, setLoadingNewsletters] = useState(true);
  const [currentBlog, setCurrentBlog] = useState(0);

  const targetCounts = {
    clients: 150,
    projects: 300,
    growth: 85,
    years: 8
  };

  useEffect(() => {
    fetchBlogs();
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoadingNewsletters(true);
      const response = await fetch(`${API_BASE_URL}/api/newsletters`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      const json = await response.json();
      if (json.success) {
        const filteredNews = (json.data || []).filter((n: any) =>
          n.title.toLowerCase() !== 'test something'
        );
        setNewsletters(filteredNews);
      } else {
        console.error("API call for newsletters was not successful:", json);
      }
    } catch (error) {
      console.error("Error fetching newsletters:", error);
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
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepValue = {
        clients: targetCounts.clients / steps,
        projects: targetCounts.projects / steps,
        growth: targetCounts.growth / steps,
        years: targetCounts.years / steps
      };

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setCounter({
          clients: Math.min(Math.floor(stepValue.clients * currentStep), targetCounts.clients),
          projects: Math.min(Math.floor(stepValue.projects * currentStep), targetCounts.projects),
          growth: Math.min(Math.floor(stepValue.growth * currentStep), targetCounts.growth),
          years: Math.min(Math.floor(stepValue.years * currentStep), targetCounts.years)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web & App Development",
      description: "Transform your vision into reality with custom-built websites and mobile applications. We create scalable, high-performance digital solutions that deliver exceptional user experiences and drive measurable business results.",
      color: "from-blue-500 to-blue-600",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      slug: "web-development"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "SEO & Content Marketing",
      description: "Dominate search rankings and captivate your audience with data-driven SEO strategies and compelling content. We help you build authority, increase organic traffic, and convert visitors into loyal customers.",
      color: "from-amber-500 to-orange-600",
      bgImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
      slug: "seo-content"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Social Media Marketing",
      description: "Build a powerful brand presence across social platforms. Our strategic campaigns create meaningful connections with your audience, boost engagement, and turn followers into brand advocates.",
      color: "from-amber-500 to-orange-600",
      bgImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      slug: "social-media"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Solutions",
      description: "Harness the power of artificial intelligence to automate processes, gain actionable insights, and make smarter business decisions. We specialize in lead management automation, WhatsApp text automation, intelligent chatbots, and custom AI-powered tools that transform how you operate and scale your business efficiently.",
      color: "from-orange-500 to-orange-600",
      bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      slug: "ai-solutions"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Podcast Production",
      description: "Amplify your brand voice with professional podcast production. From concept to distribution, we handle everything to help you reach and engage your target audience through compelling audio content.",
      color: "from-red-500 to-red-600",
      bgImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=400&fit=crop",
      slug: "podcast-production"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Financial Consulting",
      description: "Navigate complex financial decisions with confidence. Our expert consultants provide strategic planning, investment guidance, and financial optimization strategies to accelerate your business growth.",
      color: "from-indigo-500 to-indigo-600",
      bgImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      slug: "financial-consulting"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Business Consultation",
      description: "Unlock your business's full potential with expert strategic guidance. We analyze your operations, identify growth opportunities, and provide actionable insights to optimize performance and achieve sustainable success.",
      color: "from-amber-500 to-orange-500",
      bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      slug: "business-consultation"
    },
    {
      icon: <Landmark className="w-8 h-8" />,
      title: "Business Loans",
      description: "Fuel your growth with flexible financing solutions. Access term loans, working capital, equipment financing, and more with competitive rates and terms designed to support your business expansion.",
      color: "from-indigo-500 to-blue-500",
      bgImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop",
      slug: "business-loans"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Business Insurance",
      description: "Protect what you've built with comprehensive insurance coverage. Safeguard your assets, mitigate risks, and ensure business continuity with tailored insurance plans that give you peace of mind.",
      color: "from-emerald-500 to-green-500",
      bgImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
      slug: "business-insurance"
    }
  ];

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070",
      title: "Elevate Your Business with",
      highlight: "Next-Gen AI Solutions",
      description: "Empower your enterprise with state-of-the-art artificial intelligence that automates workflows, provides deep data insights, and drives strategic digital transformation for the modern age. We help you stay ahead by integrating smart tech that scales with your ambition."
    },
    {
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070",
      title: "Transforming Ideas into",
      highlight: "Digital Reality",
      description: "From custom-built software architectures to stunning, immersive web and mobile experiences, we build robust technology solutions that fuel global growth and user engagement. Our expert team ensures every line of code translates into measurable business success."
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
      title: "Strategic Growth through",
      highlight: "Inbound Marketing",
      description: "Dominate your industry landscape with data-driven SEO strategies, expert content marketing, and precision-targeted social media campaigns. We don't just drive traffic; we build authority and convert leads into loyal customers through proven marketing funnels."
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  const processSteps = [
    {
      step: "01",
      title: "Discover",
      description: "We analyze your business, competitors, and market opportunities to create a strategic foundation."
    },
    {
      step: "02",
      title: "Define",
      description: "Clear objectives, target audience, and success metrics are established for measurable results."
    },
    {
      step: "03",
      title: "Design",
      description: "Creative solutions and user experiences that align with your brand and business goals."
    },
    {
      step: "04",
      title: "Develop",
      description: "Agile development process with regular updates and quality assurance at every stage."
    },
    {
      step: "05",
      title: "Deploy",
      description: "Strategic launch with comprehensive testing, optimization, and performance monitoring."
    },
    {
      step: "06",
      title: "Deliver",
      description: "Ongoing support, analytics, and optimization to ensure sustained growth and ROI."
    }
  ];

  // const testimonials = [
  //   {
  //     name: "Priya Sharma",
  //     position: "CEO, TechStart India",
  //     content: "Avani Enterprises transformed our digital presence completely. Our website traffic increased by 300% and conversions by 150% within 6 months.",
  //     rating: 5,
  //     image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  //   },
  //   {
  //     name: "Rajesh Kumar",
  //     position: "Founder, EcoSolutions",
  //     content: "The team's expertise in SEO and content marketing helped us rank #1 for our target keywords. ROI exceeded our expectations by 200%.",
  //     rating: 5,
  //     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  //   },
  //   {
  //     name: "Anita Patel",
  //     position: "Marketing Director, HealthTech",
  //     content: "Their AI solutions automated 70% of our customer service, saving us ₹50L annually while improving customer satisfaction.",
  //     rating: 5,
  //     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  //   }
  // ];

  const testimonials = [
    {
      name: "Director Of Indus School",
      position: "Principal, Indus Public School",
      content:
        "Avani Enterprises delivered an outstanding website that perfectly captures our school's vision and values. The design is modern, intuitive, and makes it easy for parents and students to find information. Their team was professional, responsive, and delivered beyond our expectations.",
      rating: 5,
      image: "/indus.jpeg"
    },
    {
      name: "Vikram Sharma",
      position: "Managing Director, Rohtak Shoe Company",
      content:
        "The e-commerce platform developed by Avani Enterprises transformed our business completely. Online sales increased by 250% in just 3 months. The website is fast, user-friendly, and our customers love the shopping experience. Highly recommended!",
      rating: 5,
      image: "/shoes.jpeg"
    },
    {
      name: "Sanjay Vats",
      position: "Co-Founder, Policicue",
      content:
        "Working with Avani Enterprises was a game-changer for our startup. They built a sophisticated platform that handles complex policy management with ease. The UI/UX is exceptional, and their technical expertise is top-notch. Our users are impressed!",
      rating: 5,
      image: "/policucue.jpeg"
    },
    {
      name: "Amit Kapoor",
      position: "Founder, FRD Nutrition",
      content:
        "The team created a stunning website that perfectly showcases our nutrition products. The e-commerce integration is seamless, and we've seen a 180% increase in online orders. Their attention to detail and customer service is outstanding!",
      rating: 5,
      image: "/frd-nutrition-new.png"
    },
    {
      name: "Aman Sharma",
      position: "CEO, Hi-Tech Luxury Homes",
      content:
        "We're thrilled with the elegant website that beautifully represents our luxury properties. The design is sophisticated, the property listings are easy to manage, and our clients love the virtual tour feature. Excellent work!",
      rating: 5,
      image: "/hitech.jpeg"
    },
    {
      name: "Dr. Mohit Verma",
      position: "Director, Sanjeevni Hospital",
      content:
        "The hospital management portal developed by Avani Enterprises has streamlined our operations significantly. Patient appointment booking is now effortless, and the admin panel is incredibly user-friendly. A truly professional solution!",
      rating: 5,
      image: "/sanjeevni.jpeg"
    }
  ];

  const clientLogos = [
    {
      name: "Indus group of Institution",
      logo: "./indus.jpeg",
      video: "./indus.mp4",
      image: "/indus1.png",
      link: "/projects/indus"
    },
    {
      name: "Policicue",
      logo: "./policucue.jpeg",
      video: "./policicue.mp4",
      image: "/policy1.png",
      link: "/projects/policicue"
    },
    {
      name: "Frd Nutrition",
      logo: "/frd-nutrition-new.png",
      video: "./FrdNutrition.mp4",
      image: "/frd-nutrition-new.png",
      link: "/projects/frd-nutrition"
    },
    {
      name: "Hi-tech Homes",
      logo: "./hitech.jpeg",
      video: "./hitech.mp4",
      image: "/hitech1.png",
      link: "/projects/hitech-homes"
    },
    {
      name: "Sanjeevni Hospital",
      logo: "./sanjeevni.jpeg",
      video: "./Sanjeevni.mp4",
      image: "/sanjeevni1.png",
      link: "/projects/sanjeevni-hospital"
    },
    {
      name: "Rohtak Shoe co.",
      logo: "./shoes.jpeg",
      video: "./Rohtak Shoe.mp4",
      image: "/shoes1.png",
      link: "/projects/rohtak-shoe"
    }
  ];

  return (
    <div>
      {/* Hero Section - Full Page Height */}
      <section className="relative min-h-screen flex items-start pt-24 sm:pt-32 pb-12 overflow-hidden bg-[#fefaf6]">
        {/* Curved Background Split */}
        <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-transparent rounded-l-[20rem] transform scale-x-110 translate-x-20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column: Restored Original Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sm:mt-0"
            >
              <span className="text-amber-600 font-extrabold text-lg tracking-wide mb-2 block">
                No.1 Digital Marketing Agency in India
              </span>

              <motion.h1
                className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                {seo?.seoHeading ? (
                  seo.seoHeading
                ) : (
                  <>
                    {("Build high-performing ").split("").map((char, index) => (
                      <motion.span
                        key={`char-${index}`}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 }
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <RotatingText
                      words={["Websites", "Products", "Solutions", "Experiences"]}
                      interval={3000}
                      className="text-amber-500"
                    />
                    {" & accelerate "}
                    <span className="text-amber-500">Growth.</span>
                  </>
                )}
              </motion.h1>

              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-xl">
                We're more than just a digital agency. We have stories to tell, and passions to share, and results to deliver that are more exciting than the competition.
              </p>

              {/* Global Expansion Text */}
              <div className="flex items-center gap-2 mb-10 text-amber-600 font-bold text-sm sm:text-base">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <span>Expanding Globally: Now proudly serving from Gurgaon, Mumbai, Rohtak, and Australia.</span>
              </div>

              <div className="flex flex-col gap-8 mb-16">
                <div className="flex flex-row items-center gap-3 sm:gap-6">
                  <Link
                    to="/get-consultation"
                    className="flex-1 sm:flex-none px-4 py-3 sm:px-10 sm:py-5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm uppercase tracking-widest shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-300 text-center"
                  >
                    Get Consultation
                  </Link>
                  <a
                    href="#project-showcase"
                    className="flex-1 sm:flex-none px-4 py-3 sm:px-10 sm:py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all duration-300 text-center"
                  >
                    Explore Work
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[0, 1, 5, 3].map((idx) => (
                      <div key={idx} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden flex items-center justify-center">
                        <img
                          src={clientLogos[idx].logo}
                          alt={clientLogos[idx].name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-400">Trusted by 150+ Companies</span>
                </div>
              </div>

              {/* Stats Row - Updated for Responsive Wrapping and Single Line Mobile View */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 md:gap-16">
                <div className="group cursor-default flex-shrink-0">
                  <AnimatedCounter
                    target={150}
                    suffix="+"
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-1 transition-transform group-hover:scale-105"
                  />
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Happy Clients</div>
                </div>
                <div className="group cursor-default flex-shrink-0">
                  <AnimatedCounter
                    target={300}
                    suffix="+"
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-1 transition-transform group-hover:scale-105"
                  />
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Projects</div>
                </div>
                <div className="group cursor-default flex-shrink-0">
                  <AnimatedCounter
                    target={85}
                    suffix="%"
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-1 transition-transform group-hover:scale-105"
                  />
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Growth Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Newsletter Widget (Chart extracted to HeroDashboard.tsx) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block h-[600px]"
            >
              {/* Background Design */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-200/20 rounded-full blur-[80px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-sky-200/20 rounded-full blur-[80px] animate-pulse-slow delay-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-amber-500/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-amber-500/5 rounded-full" />
              </div>

              {/* OLD: Dashboard Chart — extracted to <HeroDashboard /> in src/components/HeroDashboard.tsx */}
              {/* To revert: uncomment <HeroDashboard /> and remove the newsletter widget below */}
              {/* <HeroDashboard /> */}

              {/* NEW: Newsletter Widget */}
              <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-white overflow-hidden z-10">
                {/* Widget Header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-slate-100">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">News & Updates</h3>
                  <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                    <Mail className="w-4 h-4 text-amber-500" />
                  </div>
                </div>

                {/* Newsletter Items */}
                <div className="divide-y divide-slate-50">
                  {loadingNewsletters ? (
                    <div className="flex justify-center py-12">
                      <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : newsletters.length === 0 ? (
                    <div className="text-center py-12 px-6">
                      <p className="text-slate-400 font-medium text-sm italic">Updates coming soon...</p>
                    </div>
                  ) : (
                    newsletters.slice(0, 4).map((n: any) => {
                      const date = new Date(n.publishedAt || n.createdAt);
                      const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                      const day = date.getDate().toString().padStart(2, '0');
                      const isRecent = (Date.now() - date.getTime()) < 7 * 24 * 60 * 60 * 1000;

                      return (
                        <Link
                          key={n._id}
                          to={`/newsletters/${n.slug}`}
                          className="group flex items-center gap-4 px-7 py-4 hover:bg-amber-50/40 transition-colors duration-200"
                        >
                          {/* Image or Date Badge */}
                          <div className="shrink-0">
                            {n.imageUrl ? (
                              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-100 group-hover:border-amber-300 transition-colors shadow-sm">
                                <img
                                  src={n.imageUrl.startsWith('http') ? n.imageUrl : `${API_BASE_URL}${n.imageUrl.startsWith('/') ? '' : '/'}${n.imageUrl}`}
                                  alt={n.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  onError={(e: any) => e.target.src = "https://placehold.co/56x56?text=News"}
                                />
                              </div>
                            ) : (
                              <div className="w-14 h-14 rounded-xl bg-slate-50 border-2 border-slate-100 group-hover:border-amber-300 transition-colors flex flex-col items-center justify-center">
                                <span className="text-[9px] font-black text-amber-500 uppercase leading-none tracking-wider">{month}</span>
                                <span className="text-lg font-black text-slate-900 leading-tight">{day}</span>
                              </div>
                            )}
                          </div>

                          {/* Title + Meta */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 leading-snug mb-0.5">
                              {n.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-400 font-medium">
                                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              {isRecent && (
                                <span className="text-[9px] font-black text-amber-500 uppercase tracking-wider bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-100">
                                  New
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition-colors shrink-0" />
                        </Link>
                      );
                    })
                  )}
                </div>

                {/* View All */}
                {!loadingNewsletters && newsletters.length > 0 && (
                  <div className="px-7 py-4 border-t border-slate-100 bg-slate-50/30">
                    <Link
                      to="/newsletters"
                      className="group flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-600 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm hover:shadow-md"
                    >
                      View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Floating Indian Avatars */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[2%] right-[2%] w-24 h-24 rounded-full border-8 border-white shadow-2xl overflow-hidden z-20"
              >
                <img src="https://images.unsplash.com/photo-1589386417686-0d34b5903d23?q=80&w=800&auto=format&fit=crop" alt="Indian Businessman" className="w-full h-full object-cover" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[50%] -left-[5%] w-20 h-20 rounded-full border-8 border-white shadow-2xl overflow-hidden z-20"
              >
                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" alt="Indian Businesswoman" className="w-full h-full object-cover" />
              </motion.div>


            </motion.div>
          </div>
        </div>
      </section>


      {/* Stats Section Removed as per request */}
      {/* <StatsSection /> */}

      {/* Services Section - ADKO-Style Hover Expand */}
      <section className="pt-12 pb-24 md:py-24 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              Our Expertise
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We create content that connects with your audience - built on strategy, guided by insight, and designed to deliver across platforms
            </p>
          </motion.div>

          {/* ADKO-Style Service Cards - Expand on Hover */}
          <div className="space-y-4">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                {/* Card Container - Wrapped with Link */}
                <Link to={`/services/${service.slug}`} className="block">
                  <div className="relative bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl">
                    {/* Background Image (visible on hover) */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    />

                    {/* Content */}
                    <div className="relative p-6 md:p-8">
                      <div className="flex items-center justify-between">
                        {/* Left: Icon + Title */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-slate-900 opacity-80">
                            {service.icon}
                          </div>
                          <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-wide">
                            {service.title}
                          </h3>
                        </div>

                        {/* Right: Arrow indicator */}
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-slate-900 opacity-60"
                        >
                          <ChevronRight size={24} />
                        </motion.div>
                      </div>

                      {/* Expanded Description (visible on hover) */}
                      <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-in-out">
                        <p className="text-slate-800 text-sm md:text-base leading-relaxed max-w-4xl mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* Work Process Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our 6-D Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and measurable results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <div className="text-4xl font-bold text-blue-600 mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section> */}


      {/* 6-D Process Section - Dynamic Flowchart */}
      <section className="pt-12 pb-32 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight uppercase">
              Our 6-D Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and measurable results
            </p>
          </motion.div>

          {/* Flowchart Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 relative z-10">
              {processSteps.map((step, index) => {
                const iconColors = [
                  "bg-blue-600",
                  "bg-purple-600",
                  "bg-orange-600",
                  "bg-teal-600",
                  "bg-green-600",
                  "bg-indigo-600"
                ];

                const icons = [
                  <Search className="w-4 h-4 md:w-6 md:h-6" />,
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6" />,
                  <Brain className="w-4 h-4 md:w-6 md:h-6" />,
                  <Globe className="w-4 h-4 md:w-6 md:h-6" />,
                  <Play className="w-4 h-4 md:w-6 md:h-6" />,
                  <ShieldCheck className="w-4 h-4 md:w-6 md:h-6" />
                ];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Card */}
                    <div className="relative bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 transition-all duration-300 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 overflow-visible min-h-full">

                      {/* Step Number Badge */}
                      <span className="absolute top-2 right-2 md:-top-2 md:-right-2 w-6 h-6 md:w-9 md:h-9 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-[10px] md:text-xs z-20 shadow-lg border-2 border-white">
                        {step.step}
                      </span>

                      {/* Icon */}
                      <div className={`shrink-0 w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl ${iconColors[index]} flex items-center justify-center text-white shadow-xl shadow-black/5`}>
                        {icons[index]}
                      </div>

                      <div className="flex-1 w-full">
                        {/* Title */}
                        <h3 className="text-[13px] md:text-xl font-black text-slate-900 mb-1 md:mb-2 uppercase tracking-tight">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-500 text-[10px] md:text-[15px] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      {/* Testimonials Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-110"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070&auto=format&fit=crop")' }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-sans">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Real results from real businesses. Here's how we've helped our clients achieve their goals.
            </p>
          </div>

          <div className="relative px-4 py-8">
            {/* Left Arrow */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Previous testimonial"
            >
              <ChevronDown className="w-6 h-6 text-gray-900 rotate-90 group-hover:text-amber-600 transition-colors" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Next testimonial"
            >
              <ChevronDown className="w-6 h-6 text-gray-900 -rotate-90 group-hover:text-amber-600 transition-colors" />
            </button>

            {/* Coverflow Container */}
            <div className="relative h-[500px] md:h-[550px] flex items-center justify-center overflow-visible">
              {testimonials.map((testimonial, index) => {
                const isDark = index % 2 !== 0;
                const headerColor = isDark ? "bg-[#333333]" : "bg-[#FFA500]";
                const roleColor = isDark ? "text-[#333333]" : "text-[#FFA500]";
                const gradientColor = isDark ? "from-gray-500 to-gray-700" : "from-orange-500 to-amber-500";

                // Calculate position relative to current testimonial
                const position = index - currentTestimonial;

                // Determine card styling based on position
                let cardStyle = {};
                let cardClass = "absolute transition-all duration-700 ease-out";

                if (position === 0) {
                  // Center card - fully focused
                  cardStyle = {
                    transform: 'translateX(-50%) scale(1)',
                    left: '50%',
                    opacity: 1,
                    zIndex: 20
                  };
                } else if (position === -1 || (currentTestimonial === 0 && index === testimonials.length - 1)) {
                  // Left card
                  cardStyle = {
                    transform: 'translateX(-50%) scale(0.85)',
                    left: '25%',
                    opacity: 0.5,
                    zIndex: 10
                  };
                } else if (position === 1 || (currentTestimonial === testimonials.length - 1 && index === 0)) {
                  // Right card
                  cardStyle = {
                    transform: 'translateX(-50%) scale(0.85)',
                    left: '75%',
                    opacity: 0.5,
                    zIndex: 10
                  };
                } else {
                  // Hidden cards
                  cardStyle = {
                    transform: 'translateX(-50%) scale(0.7)',
                    left: position < 0 ? '0%' : '100%',
                    opacity: 0,
                    zIndex: 0
                  };
                }

                return (
                  <div
                    key={index}
                    className={cardClass}
                    style={cardStyle}
                  >
                    <motion.div
                      className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-80 md:w-96 h-full flex flex-col group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {/* Gradient Border on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`} />

                      {/* Top Header Section */}
                      <motion.div
                        className={`${headerColor} h-32 md:h-36 flex flex-col items-center justify-start pt-6 md:pt-8 relative overflow-hidden`}
                      >
                        <div className="text-center z-10 text-white relative">
                          <span className="block font-serif italic text-lg md:text-xl tracking-wider mb-1 opacity-90">Client</span>
                          <span className="block text-lg md:text-xl font-bold tracking-[0.2em] uppercase font-sans">TESTIMONIAL</span>
                        </div>
                        {/* Animated Background Pattern */}
                        <motion.div
                          className="absolute inset-0 opacity-10"
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                          }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          style={{
                            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                            backgroundSize: "20px 20px"
                          }}
                        />
                      </motion.div>

                      {/* Overlapping Image */}
                      <div className="relative flex justify-center -mt-10 md:-mt-12 z-20">
                        <div className="p-1 bg-white rounded-full shadow-lg">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-sm object-contain bg-white p-1"
                          />
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="px-6 pt-4 pb-6 text-center flex-grow flex flex-col items-center">
                        <h4 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-widest mb-1">
                          {testimonial.name}
                        </h4>
                        <p className={`${roleColor} text-xs font-bold uppercase tracking-widest mb-3 md:mb-4`}>
                          {testimonial.position}
                        </p>

                        <div className="flex justify-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>

                        <div className="relative">
                          <span className="opacity-10 text-4xl md:text-5xl leading-none font-serif absolute -top-3 left-0">"</span>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed px-4 italic">
                            {testimonial.content}
                          </p>
                          <span className="opacity-10 text-4xl md:text-5xl leading-none font-serif absolute -bottom-5 right-0">"</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 rounded-full ${currentTestimonial === index
                    ? "bg-amber-500 w-8 h-3"
                    : "bg-white/40 hover:bg-white/60 w-3 h-3"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted By Industry Leaders</h3>
            <p className="text-gray-600">Companies that trust us with their digital transformation</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clientLogos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="bg-white rounded-lg px-6 py-4 shadow-sm border border-gray-200">
                  <span className="text-gray-700 font-medium text-sm">{logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Logo Marquee Section - ADKO Style */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">
              Trusted by Industry Leaders
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              150+ Companies Trust Us
            </h3>
          </div>

          {/* Infinite Scrolling Logo Marquee */}
          <LogoMarquee
            logos={clientLogos}
            speed={25}
            direction="left"
            className="mb-4"
          />

          {/* Second row going opposite direction for visual interest */}
          <LogoMarquee
            logos={clientLogos}
            speed={30}
            direction="right"
          />
        </div>
      </section>




      {/* Project Showcase - Video Cards with Overlapping Scroll */}
      <section id="project-showcase" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight uppercase">
              Featured Work
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transforming businesses through innovative digital solutions
            </p>
          </motion.div>

          {/* Stacked Cards Container with Videos */}
          <div className="relative" style={{ minHeight: `${clientLogos.length * 280}px` }}>
            {clientLogos.map((client, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="sticky w-full"
                  style={{
                    top: `${100 + index * 20}px`,
                    zIndex: index + 1
                  }}
                >
                  <div className={`${isEven ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-slate-900'} rounded-2xl overflow-hidden shadow-2xl mb-6`}>
                    <div className="flex flex-col md:flex-row">
                      {/* Project Image Section */}
                      <div className="w-full md:w-2/3 aspect-video md:aspect-auto md:h-72 relative overflow-hidden group/image">
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover/image:bg-transparent transition-colors duration-500" />
                      </div>

                      {/* Content Section */}
                      <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col justify-center">
                        <div className={`h-14 w-24 rounded-lg ${isEven ? '' : 'bg-white'} flex items-center justify-center p-2 mb-4`}>
                          <img src={client.logo} alt={client.name} className="h-full w-auto object-contain" />
                        </div>
                        <h3 className={`text-xl md:text-2xl font-black uppercase tracking-wide mb-4 ${isEven ? 'text-slate-900' : 'text-white'}`}>
                          {client.name}
                        </h3>
                        <Link
                          to={client.link}
                          className={`flex items-center gap-2 w-fit ${isEven ? 'bg-slate-900 text-white' : 'bg-amber-400 text-slate-900'} px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity`}
                        >
                          View Project <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spacer to prevent overlap with next section */}
          <div className="h-40"></div>
        </div>
      </section>

      {/* Global Presence Section */}
      <GlobalPresenceSection compact={true} />

      {/* Blog Section */}
      <section className="relative pt-16 pb-4 md:pb-8 bg-white overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Hexagon Pattern */}
          <div className="absolute top-20 right-10 w-64 h-64 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-900" />
              <polygon points="50 10 85 30 85 70 50 90 15 70 15 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-900" />
              <polygon points="50 20 75 35 75 65 50 80 25 65 25 35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-900" />
            </svg>
          </div>

          {/* Circuit Lines */}
          <div className="absolute top-40 left-10 w-96 h-96 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M0,100 L50,100 L50,50 L100,50 L100,150 L150,150 L150,100 L200,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
              <circle cx="50" cy="100" r="3" fill="currentColor" className="text-slate-900" />
              <circle cx="100" cy="50" r="3" fill="currentColor" className="text-slate-900" />
              <circle cx="150" cy="150" r="3" fill="currentColor" className="text-slate-900" />
            </svg>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-amber-100/30 to-orange-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-amber-100/30 to-orange-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              {/* Badge */}
              {/* <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Our Blog</span>
              </div> */}

              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                Latest Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Updates</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Stay informed with our latest articles, industry insights, and expert advice to grow your business
              </p>
            </div>
          </AnimatedSection>

          {loadingBlogs ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-500"></div>
                <div className="absolute inset-0 rounded-full bg-amber-100/50 blur-xl"></div>
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 mb-6">
                <Sparkles className="w-10 h-10 text-amber-500" />
              </div>
              <p className="text-gray-600 text-lg">No blogs available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {blogs.slice(0, 3).map((blog, index) => (
                  <AnimatedSection key={blog._id} delay={index * 0.1}>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="group relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-100"
                    >
                      {/* Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/50 transition-all duration-300"></div>

                      {/* Featured Image */}
                      <div className="relative h-48 overflow-hidden">
                        {blog.featuredImage ? (
                          <>
                            <img
                              src={blog.featuredImage}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                            <Sparkles className="w-16 h-16 text-amber-500 opacity-50" />
                          </div>
                        )}

                        {/* Hexagon Accent */}
                        <div className="absolute top-4 right-4 w-12 h-12 opacity-30">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" />
                          </svg>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative p-6 bg-white">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>

                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors leading-tight">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {blog.excerpt || 'Read more to discover insights...'}
                        </p>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm group-hover:gap-4 transition-all">
                          Read Article <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>

              {/* View More Button - Show only if more than 3 blogs */}
              {blogs.length > 3 && (
                <AnimatedSection>
                  <div className="text-center">
                    <Link
                      to="/blog"
                      className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-500 hover:to-orange-600 transition-all duration-200 shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 transform hover:-translate-y-1"
                    >
                      View All Blogs
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </AnimatedSection>
              )}
            </>
          )}
        </div>
      </section>

      {/* Announcement Section - Highly Animated & Premium */}
      <section className="relative py-12 md:py-24 bg-[#FBF9F4] overflow-hidden border-y border-amber-100/50">
        {/* Animated Background Orbs (CSS for better performance) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-amber-400/30 blur-[60px] rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-orange-500/20 blur-[60px] rounded-full animate-[pulse_6s_ease-in-out_infinite]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative group w-full"
          >
            {/* Animated Outer Glow / Border (Optimized for performance) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-[2.5rem] blur-lg opacity-30 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

            {/* Dark Premium Card */}
            <div className="relative flex flex-col md:flex-row bg-slate-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">

              {/* Shimmer sweep effect on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] z-20 pointer-events-none">
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Fixed Left Label */}
              <div className="relative shrink-0 bg-gradient-to-br from-amber-500 to-orange-600 p-6 md:p-8 md:w-72 flex flex-col justify-center items-center md:items-start text-center md:text-left z-30 overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)] border-b md:border-b-0 md:border-r border-orange-400/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full" />
                <span className="flex items-center gap-2 text-[10px] md:text-xs font-black text-amber-50 uppercase tracking-widest mb-1.5 md:mb-2 drop-shadow-md">
                  <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-white shadow-[0_0_10px_white]"></span>
                  </span>
                  Live Update
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-none drop-shadow-xl">
                  Important <br className="hidden md:block" /> Announcement
                </h3>
              </div>

              {/* Animated Ticker Content Area */}
              <div className="flex-1 relative overflow-hidden bg-slate-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-900 to-black flex items-center min-h-[140px] md:min-h-0 py-6 md:py-0">
                <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                  className="flex items-center whitespace-nowrap w-max"
                  // Pause animation on hover
                  whileHover={{ animationPlayState: "paused" }}
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-6 md:gap-10 px-6 md:px-10">
                      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] shrink-0">
                        <div className="p-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-md shrink-0">
                          <img src="/logo0.jpg" alt="Avani" className="h-8 w-8 md:h-10 md:w-10 rounded-lg object-contain bg-white shrink-0" />
                        </div>
                        <span className="text-white/40 font-black text-lg md:text-xl shrink-0">×</span>
                        <div className="p-1 bg-white rounded-xl shadow-md shrink-0">
                          <img src="/hilogo.png" alt="IHE" className="h-8 w-8 md:h-10 md:w-10 object-contain shrink-0" />
                        </div>
                      </div>

                      <div className="flex flex-col justify-center shrink-0">
                        <span className="text-sm md:text-lg font-medium text-slate-400 tracking-wide mb-[-2px]">
                          Proud technology partners of
                        </span>
                        <span className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 uppercase tracking-tight drop-shadow-sm">
                          Institute of Home Economics, DU
                        </span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.8)] opacity-50 shrink-0" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section - Custom Design */}
      <section className="relative pt-2 pb-8 md:pt-16 md:pb-16 bg-[#FBF9F4] overflow-hidden">

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-0 md:pt-4 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-2 md:mb-3 font-sans tracking-tight">
              Let's Build Your
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 font-sans tracking-tight">
              <RotatingText
                words={["Success Story", "Digital Future", "Growth Engine", "Next Big Move"]}
                interval={3000}
                className="text-orange-600 inline-block min-w-[280px] md:min-w-[400px]"
              /> <span className="text-slate-900">Together</span>
            </h2>

            <div className="w-full max-w-xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6 md:mb-8"></div>

            <p className="text-base md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-6 md:mb-12 px-2">
              Partner with us to unlock growth opportunities, streamline operations, and achieve your business vision with expert guidance every step of the way.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-row gap-3 md:gap-6 justify-center items-center w-full sm:w-auto"
          >
            <Link
              to="/get-consultation"
              className="flex-1 sm:flex-none px-4 py-3 md:px-10 md:py-4 bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-lg font-bold uppercase tracking-widest shadow-[0_4px_0_rgb(154,52,18)] active:shadow-none active:translate-y-1 transition-all duration-200 text-[10px] sm:text-xs md:text-sm whitespace-nowrap"
            >
              Get Consultation
            </Link>
            <Link
              to="/contact"
              className="flex-1 sm:flex-none px-4 py-3 md:px-10 md:py-4 bg-gradient-to-b from-slate-800 to-black hover:from-slate-700 hover:to-slate-900 text-white rounded-lg font-bold uppercase tracking-widest shadow-[0_4px_0_rgb(0,0,0)] active:shadow-none active:translate-y-1 transition-all duration-200 text-[10px] sm:text-xs md:text-sm border-t border-slate-700 whitespace-nowrap"
            >
              Talk to Expert
            </Link>
          </motion.div>
        </div>

        {/* Bottom Curved Shapes */}
        <div className="absolute bottom-0 left-0 w-full z-10 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-20 block" preserveAspectRatio="none">
            <path d="M0,0 C480,80 960,80 1440,0 V60 H0 V0 Z" fill="#f97316"></path>
          </svg>
        </div>
      </section>
    </div >
  );
};

export default Home; 