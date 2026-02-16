import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RotatingText from '../components/RotatingText';
import {
  TrendingUp,
  Users,
  Globe,
  Search,
  Share2,
  Brain,
  Mic,
  Calculator,
  Star,
  Calendar,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';

// Animated Counter Component for Case Studies
const StatCardCaseStudies = ({ end, suffix = '', prefix = '', label }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible]);

  React.useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-amber-500/30 hover:border-amber-500 text-center overflow-hidden"
    >
      {/* Subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/50 transition-all duration-500" />

      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-black text-slate-900 mb-3">
          {prefix}
          {Math.floor(count).toLocaleString()}
          <span className="text-amber-500">{suffix}</span>
        </div>
        <div className="text-xs md:text-sm text-slate-600 font-bold uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const caseStudies = [
    {
      id: 1,
      category: 'web-development',
      title: "TechStart India - E-commerce Platform",
      client: "TechStart India",
      industry: "E-commerce",
      challenge: "TechStart needed a modern, scalable e-commerce platform to compete with established players in the Indian market.",
      solution: "Developed a custom e-commerce solution with advanced features including AI-powered recommendations, mobile-first design, and integrated payment gateways.",
      results: {
        traffic: "300% increase in website traffic",
        conversions: "150% improvement in conversion rates",
        revenue: "₹2.5Cr additional revenue in first year",
        mobile: "85% of sales from mobile devices"
      },
      duration: "6 months",
      team: "5 developers, 2 designers, 1 PM",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Stripe"]
    },
    {
      id: 2,
      category: 'seo-content',
      title: "EcoSolutions - SEO & Content Strategy",
      client: "EcoSolutions",
      industry: "Environmental Services",
      challenge: "EcoSolutions struggled with low organic visibility and needed to establish thought leadership in the sustainability space.",
      solution: "Implemented comprehensive SEO strategy with content marketing, technical optimization, and local SEO to target environmentally conscious businesses.",
      results: {
        rankings: "Ranked #1 for 15 target keywords",
        traffic: "400% increase in organic traffic",
        leads: "250% more qualified leads",
        authority: "Established as industry thought leader"
      },
      duration: "8 months",
      team: "2 SEO specialists, 3 content writers",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["WordPress", "Yoast SEO", "Google Analytics", "SEMrush"]
    },
    {
      id: 3,
      category: 'social-media',
      title: "HealthTech - Social Media Campaign",
      client: "HealthTech",
      industry: "Healthcare Technology",
      challenge: "HealthTech needed to increase brand awareness and generate leads through social media platforms.",
      solution: "Created targeted social media campaigns across LinkedIn, Instagram, and Facebook with educational content and lead generation strategies.",
      results: {
        followers: "200% increase in social media followers",
        engagement: "150% improvement in engagement rates",
        leads: "300% more qualified leads",
        awareness: "Significant brand awareness growth"
      },
      duration: "Ongoing",
      team: "2 social media managers, 1 designer",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      technologies: ["LinkedIn Ads", "Facebook Ads", "Instagram", "Hootsuite"]
    },
    {
      id: 4,
      category: 'ai-solutions',
      title: "FinServe - AI-Powered Customer Service",
      client: "FinServe",
      industry: "Financial Services",
      challenge: "FinServe needed to automate customer service operations while maintaining high service quality.",
      solution: "Developed AI-powered chatbot, automated response system, lead management automation, and WhatsApp text automation integrated with existing CRM and knowledge base.",
      results: {
        automation: "70% of customer queries automated",
        savings: "₹50L annual cost savings",
        satisfaction: "95% customer satisfaction rate",
        efficiency: "3x faster response times"
      },
      duration: "4 months",
      team: "3 AI developers, 1 UX designer",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
      technologies: ["Python", "TensorFlow", "NLP", "AWS", "Dialogflow", "WhatsApp API"]
    },
    {
      id: 5,
      category: 'podcast-production',
      title: "EduTech - Educational Podcast Series",
      client: "EduTech",
      industry: "Education Technology",
      challenge: "EduTech wanted to establish thought leadership and reach educators through podcast content.",
      solution: "Created and produced a weekly educational podcast series with industry experts and practical insights.",
      results: {
        downloads: "50,000+ monthly downloads",
        subscribers: "10,000+ podcast subscribers",
        partnerships: "15+ educational partnerships",
        authority: "Established as education thought leader"
      },
      duration: "Ongoing",
      team: "1 producer, 1 host, 1 audio engineer",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop",
      technologies: ["Adobe Audition", "Zoom", "Anchor", "Spotify"]
    },
    {
      id: 6,
      category: 'financial-consulting',
      title: "RetailPlus - Financial Strategy & Funding",
      client: "RetailPlus",
      industry: "Retail",
      challenge: "RetailPlus needed strategic financial guidance to scale operations and secure funding for expansion.",
      solution: "Provided comprehensive financial consulting including business model optimization, funding strategy, and investor pitch preparation.",
      results: {
        funding: "₹10Cr secured in Series A funding",
        valuation: "3x increase in company valuation",
        growth: "200% revenue growth",
        expansion: "Successfully expanded to 5 new cities"
      },
      duration: "6 months",
      team: "2 financial consultants, 1 strategy expert",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      technologies: ["Financial Modeling", "Pitch Decks", "Valuation Analysis"]
    }
  ];

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'seo-content', name: 'SEO & Content' },
    { id: 'social-media', name: 'Social Media' },
    { id: 'ai-solutions', name: 'AI Solutions' },
    { id: 'podcast-production', name: 'Podcast Production' },
    { id: 'financial-consulting', name: 'Financial Consulting' }
  ];

  const filteredCaseStudies = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter(study => study.category === activeFilter);

  const getCategoryIcon = (category) => {
    const icons = {
      'web-development': <Globe className="w-6 h-6" />,
      'seo-content': <Search className="w-6 h-6" />,
      'social-media': <Share2 className="w-6 h-6" />,
      'ai-solutions': <Brain className="w-6 h-6" />,
      'podcast-production': <Mic className="w-6 h-6" />,
      'financial-consulting': <Calculator className="w-6 h-6" />
    };
    return icons[category] || <Globe className="w-6 h-6" />;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Success in{" "}
              <RotatingText
                words={[
                  "E-commerce",
                  "Education",
                  "Healthcare",
                  "Real Estate",
                  "Finance",
                  "Technology"
                ]}
                interval={2500}
                className="text-amber-500"
              />
            </motion.h1>
            <motion.p
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Real results from real businesses. Discover how we've helped companies across
              industries achieve their digital transformation goals.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-2 md:gap-4">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-2 py-2.5 lg:px-6 lg:py-3 rounded-lg font-bold text-[11px] lg:text-base transition-all duration-300 ${activeFilter === filter.id
                  ? 'bg-amber-500 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${index === filters.length - 1 ? 'col-span-2' : ''}`}
              >
                <span className="line-clamp-1">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid with Success-Themed Background */}
      <section className="relative py-24 overflow-hidden bg-[#1a1a1a]">
        {/* Unique Background Design: Emerald Growth Path & Urban Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Professional Urban Growth Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15]"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
          />

          {/* Emerald Growth Strip (Distinguishing from Services/Yellow and Courses/Blue) */}
          <div className="absolute top-1/2 left-0 w-full h-[600px] -translate-y-1/2 bg-gradient-to-r from-emerald-600/10 via-teal-500/15 to-emerald-700/10 z-0 -skew-y-6 transform origin-right" />

          {/* Geometric Accent Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((study) => (
              <div key={study.id} className="group flex flex-col bg-white rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-1.5 border border-slate-100">
                {/* Visual Header - Compact */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                    <div className="p-1 px-2 bg-amber-500 rounded-full text-white text-[9px] font-black uppercase tracking-wider shadow-lg">
                      {study.industry}
                    </div>
                  </div>
                </div>

                {/* Content Area - Optimized */}
                <div className="p-5 flex flex-col flex-grow bg-white">
                  {/* Category & Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-slate-50 rounded-lg text-amber-600 border border-slate-100">
                      {React.cloneElement(getCategoryIcon(study.category), { className: "w-3.5 h-3.5" })}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {study.category.replace('-', ' ')}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight group-hover:text-amber-600 transition-colors">
                    {study.title}
                  </h3>

                  {/* Challenge Text - Smaller but Full */}
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-4 font-medium">
                    {study.challenge}
                  </p>

                  {/* Results Bento Box */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 mb-4 border border-slate-100/50">
                    <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Metrics of Success</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(study.results).map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-2.5 h-2.5 text-amber-500" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{key}</span>
                          </div>
                          <span className="text-[11px] font-extrabold text-slate-900 leading-none">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Details Footer */}
                  <div className="mt-auto pt-4 border-t border-slate-50">
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-[10px] font-bold text-slate-500">
                          <Calendar className="w-3 h-3 mr-1 text-amber-500" />
                          {study.duration}
                        </div>
                        <div className="flex items-center text-[10px] font-bold text-slate-500">
                          <Users className="w-3 h-3 mr-1 text-amber-500" />
                          {study.team}
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack - Nano Size */}
                    <div className="flex flex-wrap gap-1">
                      {study.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Creative Design with Animated Counters */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-100/40 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                  Our Impact
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Our Success Metrics
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                Numbers that demonstrate our commitment to delivering exceptional results.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Grid */}
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCardCaseStudies end={150} suffix="+" label="Happy Clients" />
              <StatCardCaseStudies end={300} suffix="+" label="Projects" />
              <StatCardCaseStudies end={85} suffix="%" label="Growth" />
              <StatCardCaseStudies end={50} prefix="₹" suffix="Cr+" label="Revenue" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 overflow-hidden">
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
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + 6) % 6)}
              className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Previous testimonial"
            >
              <ChevronDown className="w-6 h-6 text-gray-900 rotate-90 group-hover:text-amber-600 transition-colors" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % 6)}
              className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Next testimonial"
            >
              <ChevronDown className="w-6 h-6 text-gray-900 -rotate-90 group-hover:text-amber-600 transition-colors" />
            </button>

            {/* Coverflow Container */}
            <div className="relative h-[500px] md:h-[550px] flex items-center justify-center overflow-visible">
              {[
                {
                  name: "Dr. Rajesh Kumar",
                  position: "Principal, Indus Public School",
                  content: "Avani Enterprises delivered an outstanding website that perfectly captures our school's vision and values. The design is modern, intuitive, and makes it easy for parents and students to find information. Their team was professional, responsive, and delivered beyond our expectations.",
                  rating: 5,
                  image: "/indus.jpeg"
                },
                {
                  name: "Vikram Sharma",
                  position: "Managing Director, Rohtak Shoe Company",
                  content: "The e-commerce platform developed by Avani Enterprises transformed our business completely. Online sales increased by 250% in just 3 months. The website is fast, user-friendly, and our customers love the shopping experience. Highly recommended!",
                  rating: 5,
                  image: "/shoes.jpeg"
                },
                {
                  name: "Ankit Verma",
                  position: "Co-Founder, Policicue",
                  content: "Working with Avani Enterprises was a game-changer for our startup. They built a sophisticated platform that handles complex policy management with ease. The UI/UX is exceptional, and their technical expertise is top-notch. Our users are impressed!",
                  rating: 5,
                  image: "/policucue.jpeg"
                },
                {
                  name: "Amit Kapoor",
                  position: "Founder, FRD Nutrition",
                  content: "The team created a stunning website that perfectly showcases our nutrition products. The e-commerce integration is seamless, and we've seen a 180% increase in online orders. Their attention to detail and customer service is outstanding!",
                  rating: 5,
                  image: "/frd-nutrition-new.png"
                },
                {
                  name: "Aman Sharma",
                  position: "CEO, Hi-Tech Luxury Homes",
                  content: "We're thrilled with the elegant website that beautifully represents our luxury properties. The design is sophisticated, the property listings are easy to manage, and our clients love the virtual tour feature. Excellent work!",
                  rating: 5,
                  image: "/hitech.jpeg"
                },
                {
                  name: "Dr. Mohit Verma",
                  position: "Director, Sanjeevni Hospital",
                  content: "The hospital management portal developed by Avani Enterprises has streamlined our operations significantly. Patient appointment booking is now effortless, and the admin panel is incredibly user-friendly. A truly professional solution!",
                  rating: 5,
                  image: "/sanjeevni.jpeg"
                }
              ].map((testimonial, index) => {
                const isDark = index % 2 !== 0;
                const headerColor = isDark ? "bg-[#333333]" : "bg-[#FFA500]";
                const roleColor = isDark ? "text-[#333333]" : "text-[#FFA500]";
                const gradientColor = isDark ? "from-gray-500 to-gray-700" : "from-orange-500 to-amber-500";

                const position = index - currentTestimonial;
                let cardStyle = {};
                let cardClass = "absolute transition-all duration-700 ease-out";

                if (position === 0) {
                  cardStyle = { transform: 'translateX(-50%) scale(1)', left: '50%', opacity: 1, zIndex: 20 };
                } else if (position === -1 || (currentTestimonial === 0 && index === 5)) {
                  cardStyle = { transform: 'translateX(-50%) scale(0.85)', left: '25%', opacity: 0.5, zIndex: 10 };
                } else if (position === 1 || (currentTestimonial === 5 && index === 0)) {
                  cardStyle = { transform: 'translateX(-50%) scale(0.85)', left: '75%', opacity: 0.5, zIndex: 10 };
                } else {
                  cardStyle = { transform: 'translateX(-50%) scale(0.7)', left: position < 0 ? '0%' : '100%', opacity: 0, zIndex: 0 };
                }

                return (
                  <div key={index} className={cardClass} style={cardStyle}>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-80 md:w-96 h-full flex flex-col group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`} />
                      <div className={`${headerColor} h-32 md:h-36 flex flex-col items-center justify-start pt-6 md:pt-8 relative overflow-hidden`}>
                        <div className="text-center z-10 text-white relative">
                          <span className="block font-serif italic text-lg md:text-xl tracking-wider mb-1 opacity-90">Client</span>
                          <span className="block text-lg md:text-xl font-bold tracking-[0.2em] uppercase font-sans">TESTIMONIAL</span>
                        </div>
                      </div>
                      <div className="relative flex justify-center -mt-10 md:-mt-12 z-20">
                        <div className="p-1 bg-white rounded-full shadow-lg">
                          <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-sm object-contain bg-white p-1" />
                        </div>
                      </div>
                      <div className="px-6 pt-4 pb-6 text-center flex-grow flex flex-col items-center">
                        <h4 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-widest mb-1">{testimonial.name}</h4>
                        <p className={`${roleColor} text-xs font-bold uppercase tracking-widest mb-3 md:mb-4`}>{testimonial.position}</p>
                        <div className="flex justify-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />))}
                        </div>
                        <div className="relative">
                          <span className="opacity-10 text-4xl md:text-5xl leading-none font-serif absolute -top-3 left-0">"</span>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed px-4 italic">{testimonial.content}</p>
                          <span className="opacity-10 text-4xl md:text-5xl leading-none font-serif absolute -bottom-5 right-0">"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots - Hidden on Laptop */}
            <div className="flex lg:hidden justify-center gap-3 mt-10">
              {[1, 2, 3].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === index ? "bg-amber-500 scale-125 w-6" : "bg-white/30 hover:bg-white/50"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 md:py-16 bg-[#FBF9F4] overflow-hidden">

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
    </div>
  );
};

export default CaseStudies; 