import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink, Instagram, Linkedin, Mail, MessageCircle,
  FileText, ArrowRight, Download, Calendar, ArrowUpRight, Globe,
  Briefcase, Layout, Zap, Search, Instagram as InstagramIcon,
  Linkedin as LinkedinIcon, Mail as MailIcon, Phone, Sun, Moon, ChevronDown, Star
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from 'next-themes';
import Footer from '../components/Footer';

/* ─── Types and Interfaces ─── */
declare global {
  interface Window {
    instgrm: any;
  }
}

interface LinkData {
  _id: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  isActive: boolean;
}

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const getLinkIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'globe': return <Globe className="w-5 h-5 text-amber-500" />;
    case 'whatsapp': return <MessageCircle className="w-5 h-5 text-emerald-500" />;
    case 'instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
    case 'linkedin': return <Linkedin className="w-5 h-5 text-blue-600" />;
    case 'mail': return <Mail className="w-5 h-5 text-red-500" />;
    case 'phone': return <Phone className="w-5 h-5 text-slate-400" />;
    case 'facebook': return <ExternalLink className="w-5 h-5 text-blue-800" />;
    case 'briefcase': return <Briefcase className="w-5 h-5 text-blue-500" />;
    case 'layout': return <Layout className="w-5 h-5 text-indigo-500" />;
    case 'zap': return <Zap className="w-5 h-5 text-amber-400" />;
    case 'search': return <Search className="w-5 h-5 text-slate-400" />;
    case 'download': return <Download className="w-5 h-5 text-slate-500" />;
    default: return <ExternalLink className="w-5 h-5 text-slate-400" />;
  }
};

// Strip emojis and special unicode characters from text
const stripEmojis = (text: string): string => {
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{FE0F}]/gu, '')
    .trim();
};

/* ─── Default Data ─── */
const defaultLinks: LinkData[] = [
  { _id: 'def-site', title: 'Visit Our Website', url: 'https://www.avanienterprises.in', description: '', icon: 'globe', isActive: true },
  { _id: 'def-wa', title: 'Chat on WhatsApp', url: 'https://wa.me/919253625099', description: '', icon: 'whatsapp', isActive: true },
];

const defaultResources = [
  { id: 'res-1', title: 'Avani Enterprises Services', subtitle: 'PDF • 12.4 MB', url: '/Avani Enterprises Services ( Website, SMM and Ads )  (3).pdf' },
  { id: 'res-2', title: 'Avani Services Bundle', subtitle: 'PDF • COMPLETE PACKAGE', url: '/Avani services bundle (2).pdf' },
];

const badges = ["MARKETING", "DEVELOPMENT", "BRANDING", "AI SOLUTIONS"];

const socialLinks = [
  { icon: LinkedinIcon, url: 'https://www.linkedin.com/company/avani-enterprises-india/', label: 'LINKEDIN' },
  { icon: InstagramIcon, url: 'https://www.instagram.com/avanienterprises.branding/', label: 'INSTAGRAM' },
  { icon: Phone, url: 'tel:+919253625099', label: 'CALL US' },
  { icon: MailIcon, url: 'mailto:kp@avanienterprises.in', label: 'EMAIL' },
];

const reels = [
  { id: 1, url: 'https://www.instagram.com/reel/DWktMxahybH/', reelId: 'DWktMxahybH' },
  { id: 2, url: 'https://www.instagram.com/reel/DUSvTB3Ez8f/', reelId: 'DUSvTB3Ez8f' },
  { id: 3, url: 'https://www.instagram.com/reel/DQD9u5dk8AQ/', reelId: 'DQD9u5dk8AQ' },
  { id: 4, url: 'https://www.instagram.com/reel/DSuLytME5AY/', reelId: 'DSuLytME5AY' },
  { id: 5, url: 'https://www.instagram.com/reel/DV0EPK-D85D/', reelId: 'DV0EPK-D85D' },
];

const reviews = [];

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

const ReelsMarquee = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const duplicatedReels = [...reels, ...reels, ...reels];

  useEffect(() => {
    if (!window.instgrm) {
      const script = document.createElement('script');
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      if (window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    }
  }, []);

  // Detect when user clicks inside an iframe (window loses focus to the iframe)
  useEffect(() => {
    const handleBlur = () => {
      setTimeout(() => {
        if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
          setIsInteracting(true);
        }
      }, 50);
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  // Resume marquee when clicking outside
  useEffect(() => {
    if (!isInteracting) return;
    const handleClickOutside = (e: MouseEvent) => {
      const container = document.getElementById('reels-marquee-container');
      if (container && !container.contains(e.target as Node)) {
        setIsInteracting(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isInteracting]);

  const isPaused = isInteracting || isHovered;

  return (
    <div className="w-full overflow-hidden py-10">
      <h3 className="text-center text-[10px] font-black text-slate-400 tracking-widest uppercase mb-10">Trending Reels</h3>
      <div
        id="reels-marquee-container"
        className="flex gap-4 lg:gap-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "max-content",
          animation: "marqueeScroll 35s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
          willChange: "transform"
        }}
      >
        {duplicatedReels.map((reel, index) => (
          <div
            key={`${reel.id}-${index}`}
            className={`group relative w-64 h-[400px] lg:w-72 lg:h-[450px] rounded-2xl overflow-hidden border shadow-md transition-all flex-shrink-0 bg-white ${isInteracting ? 'border-amber-400' : 'border-slate-200 hover:border-amber-400'}`}
          >
            <iframe
              src={`https://www.instagram.com/reel/${reel.reelId}/embed`}
              className="w-full h-full border-0 rounded-2xl pointer-events-auto"
              scrolling="no"
              allowTransparency={true}
            />
            {/* Transparent overlay over Instagram's default link to force redirect to specific reel */}
            <a
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-0 left-0 right-0 h-[50px] z-20 cursor-pointer"
              title="View Reel on Instagram"
            />
          </div>
        ))}
      </div>
      {isInteracting && (
        <p className="text-center text-[10px] font-bold text-amber-500 tracking-widest uppercase mt-4 animate-pulse cursor-pointer" onClick={() => setIsInteracting(false)}>
          ▶ CLICK HERE TO RESUME SCROLLING
        </p>
      )}
    </div>
  );
};

const TestimonialsSection = ({ currentTestimonial, setCurrentTestimonial }: { currentTestimonial: number; setCurrentTestimonial: (value: number) => void }) => {
  return (
    <section className="relative py-20 bg-white dark:bg-slate-900 transition-colors duration-500 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-sans">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Real results from real businesses. Here's how we've helped our clients achieve their goals.
          </p>
        </div>

        <div className="relative px-4 py-8">
          {/* Left Arrow */}
          <button
            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full shadow-xl transition-all duration-300 hover:scale-110 group border border-slate-200 dark:border-slate-700"
            aria-label="Previous testimonial"
          >
            <ChevronDown className="w-6 h-6 text-slate-900 dark:text-white rotate-90 group-hover:text-amber-600 transition-colors" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full shadow-xl transition-all duration-300 hover:scale-110 group border border-slate-200 dark:border-slate-700"
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

          {/* Indicator dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`transition-all duration-300 rounded-full ${currentTestimonial === index
                  ? 'bg-amber-500 w-3 h-3'
                  : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 w-2 h-2'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Links() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { theme, setTheme } = useTheme();

  const ThemeToggle = () => (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:border-amber-400 transition-all group"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-slate-400 group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/links`);
        const hiddenTitles = ['avani enterprises services', 'avani services bundle'];
        const activeLinks = response.data
          .filter((l: LinkData) => l.isActive)
          .filter((l: LinkData) => !hiddenTitles.includes(stripEmojis(l.title).toLowerCase()));
        setLinks(activeLinks.length > 0 ? activeLinks : defaultLinks);
      } catch (err) {
        setLinks(defaultLinks);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  // Set default theme to dark
  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-slate-950 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden transition-colors duration-500">
      {/* Header Spacer for standard Navbar */}
      <div className="h-12 lg:h-24" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 lg:space-y-12"
        >
          {/* ────── DESKTOP HERO SECTION ────── */}
          <section className="hidden lg:flex justify-between items-center">
            <motion.div className="max-w-4xl" variants={itemVariants}>
              <div className="mb-6 flex items-center">
                <ThemeToggle />
              </div>
              <h1 className="text-5xl xl:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-6 transition-all duration-300">
                Digital <span className="text-amber-500">Elegance</span> Crafted.
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-lg mb-8">
                Avani Enterprises: Architecting digital curate experiences for high-end global brands.
              </p>
              <div className="flex gap-4">
                {badges.map((badge) => (
                  <span key={badge} className="px-5 py-2 bg-slate-100 dark:bg-slate-900 text-[10px] font-black tracking-widest text-slate-900 dark:text-slate-100 rounded-full border border-slate-200 dark:border-slate-800">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a
                href="/get-consultation"
                className="inline-block px-10 py-5 bg-gradient-to-br from-amber-400 to-orange-500 text-white font-black text-xs tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all"
              >
                BOOK A CONSULTATION
              </a>
              <div className="mt-4 text-right">
                <a
                  href="https://www.avanienterprises.in/our-products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black text-slate-400 tracking-widest uppercase cursor-pointer hover:text-amber-500 transition-colors"
                >
                  VIEW PORTFOLIO
                </a>
              </div>
            </motion.div>
          </section>

          {/* ────── MOBILE HERO SECTION ────── */}
          <section className="lg:hidden flex flex-col items-center text-center pt-2">
            {/* Removed extra logo for mobile */}

            <div className="relative w-full flex justify-between items-center mb-4">
              <div className="text-left max-w-[250px]">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
                  Digital <span className="text-amber-500">Elegance</span> Crafted.
                </h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                  Avani Enterprises: Architecting digital curate experiences for high-end global brands.
                </p>
              </div>
              <div className="scale-90">
                <ThemeToggle />
              </div>
            </div>

            <motion.div variants={itemVariants} className="w-full">
              <div className="w-full flex flex-nowrap overflow-x-auto justify-between sm:justify-center gap-1 sm:gap-2 mb-2 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {badges.map((badge) => (
                  <span key={badge} className="px-2 sm:px-4 py-1.5 whitespace-nowrap bg-slate-100 dark:bg-slate-900 text-[8px] sm:text-[9px] font-black text-slate-900 dark:text-slate-100 rounded-full border border-slate-200 dark:border-slate-800 uppercase">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

          </section>

          {/* ────── MAIN GRID CONTENT ────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

            {/* 1. Connect Card - Now order-2 (mobile), order-1 (desktop) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-12 order-2 lg:order-1 bg-gradient-to-br from-white dark:from-slate-900 via-[#FFFDF5] dark:via-slate-900/50 to-[#FFF9E5] dark:to-slate-900 rounded-3xl p-6 lg:p-8 border border-[#F5E6BD]/30 dark:border-slate-800 shadow-sm transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-4">CONNECT WITH US</h3>
                  <div className="flex flex-nowrap overflow-x-auto justify-between sm:justify-start gap-2 sm:gap-4 pb-2 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] flex items-center justify-center flex-shrink-0 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-amber-50 dark:hover:bg-amber-900/10 hover:border-amber-200 group transition-all"
                      >
                        <social.icon className="w-6 h-6 text-slate-900 dark:text-slate-100 group-hover:text-amber-500 group-hover:scale-110 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <button
                    onClick={() => window.open('https://wa.me/919253625099', '_blank')}
                    className="w-full md:px-10 py-5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl text-xs font-black tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-3 uppercase shadow-lg shadow-emerald-500/10"
                  >
                    <MessageCircle className="w-5 h-5" />
                    CHAT ON WHATSAPP
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Book Consultation Card (Mobile) - order-1 */}
            <motion.a
              variants={itemVariants}
              href="/get-consultation"
              className="lg:hidden lg:col-span-12 order-1 bg-gradient-to-br from-amber-400 to-orange-500 p-[1px] rounded-2xl active:scale-95 transition-all mb-4 overflow-hidden group shadow-lg shadow-amber-500/10"
            >
              <div className="bg-white/10 backdrop-blur-sm p-5 flex flex-col items-center text-white text-center">
                <div className="mb-2 p-2.5 bg-white/20 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black mb-1">Book a Free Consultation</h3>
                <p className="text-[10px] font-medium text-white/90">Elevate your brand's digital presence</p>
              </div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
            </motion.a>

            {/* Resources Card - order-3 (mobile), order-2 (desktop) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-7 order-3 lg:order-2 bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-black text-slate-400 tracking-widest uppercase flex items-center gap-2">
                  RESOURCES <Download className="w-4 h-4" />
                </h3>
              </div>
              <div className="space-y-4">
                {defaultResources.map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/10 group transition-all"
                  >
                    <div className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                      <FileText className="w-6 h-6 text-amber-500" />
                      <div>
                        <h4 className="font-black text-sm">{res.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 tracking-wider mt-0.5">{res.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quote Section - beside Resources */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 order-4 lg:order-3 relative bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-sm h-full"
            >
              <div className="absolute left-0 top-10 bottom-10 w-1.5 bg-amber-500 rounded-r-full" />
              <div className="pl-6 pt-2">
                <p className="text-xl lg:text-2xl font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed mb-10 font-serif">
                  “Design is not just what it looks like and feels like. Design is how it works. We curate digital ecosystems that transcend utility to become legacy.”
                </p>
                <p className="text-[10px] font-black text-slate-900 dark:text-slate-100 tracking-widest uppercase">AVANI MANAGEMENT TEAM</p>
              </div>
            </motion.div>

            {/* Visit Website Card - beside Links */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-12 order-6 lg:order-4 relative h-auto min-h-[300px] rounded-3xl overflow-hidden group shadow-sm border border-slate-100"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                alt="Office"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end text-white">
                <h3 className="text-3xl lg:text-4xl font-black mb-2">Visit Website</h3>
                <p className="text-sm lg:text-base font-medium text-white/80 max-w-md mb-8">
                  Explore our full suite of premium digital solutions and high-end case studies.
                </p>
                <button onClick={() => window.open('https://www.avanienterprises.in', '_blank')} className="flex items-center gap-3 text-sm lg:text-base font-black tracking-widest hover:text-amber-400 transition-colors">
                  LAUNCH EXPERIENCE <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ────── REELS MARQUEE ────── */}
          <motion.div variants={itemVariants} className="-mx-4 sm:-mx-6 lg:-mx-8">
            <ReelsMarquee />
          </motion.div>

          {/* ────── TESTIMONIALS SECTION ────── */}
          <motion.div variants={itemVariants}>
            <TestimonialsSection currentTestimonial={currentTestimonial} setCurrentTestimonial={setCurrentTestimonial} />
          </motion.div>

        </motion.div>
      </main>

      {/* ────── FOOTER ────── */}
      <Footer />

      {/* ────── MOBILE BOTTOM NAV ────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden">
        <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-2 flex items-center justify-between shadow-2xl">
          <RouterLink to="/services" className="flex flex-col items-center justify-center flex-1 py-1 rounded-2xl hover:bg-white/5 text-amber-400 group">
            <div className="p-2 bg-amber-400/10 rounded-xl mb-1 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
              <Layout className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider">Services</span>
          </RouterLink>
          <RouterLink to="/get-consultation" className="flex flex-col items-center justify-center flex-1 py-1 rounded-2xl hover:bg-white/5 text-white group">
            <div className="p-2 bg-white/5 rounded-xl mb-1 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider">Consult</span>
          </RouterLink>
          <RouterLink to="/newsletters" className="flex flex-col items-center justify-center flex-1 py-1 rounded-2xl hover:bg-white/5 text-white group">
            <div className="p-2 bg-white/5 rounded-xl mb-1 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider">Resources</span>
          </RouterLink>
          <button onClick={() => window.open('https://wa.me/919253625099', '_blank')} className="flex flex-col items-center justify-center flex-1 py-1 rounded-2xl hover:bg-white/5 text-white group">
            <div className="p-2 bg-white/5 rounded-xl mb-1 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider">Chat</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -100%; transition-property: left; }
          100% { left: 100%; transition-property: left; }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); } /* Translating by 1/3 since we triplicated the array */
        }
      `}</style>
    </div>
  );
}
