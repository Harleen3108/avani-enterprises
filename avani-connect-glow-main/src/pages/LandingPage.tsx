import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap, ArrowRight, CheckCircle, BarChart3, Globe, Megaphone,
  Shield, Target, Cpu, Layers, Phone, Mail, MapPin,
  Clock, Star, X, Calendar, Search, Briefcase, ShieldCheck,
  ChevronDown, MessageSquare, Activity, ShieldAlert, ArrowUpRight,
  TrendingUp, Code2, Users, Award, Play, ChevronRight,
  Linkedin, Twitter, Instagram, ExternalLink, Menu, Volume2, VolumeX
} from "lucide-react";
import { motion, useInView, useSpring, useTransform, AnimatePresence } from "framer-motion";

const C = {
  accent: "#D4A017",
  accentLight: "#E8B830",
  accentDim: "rgba(212,160,23,0.10)",
  accentGlow: "rgba(212,160,23,0.18)",
  dark: "#FAFAF8",
  card: "#FFFFFF",
  cardHover: "#F5F5F0",
  border: "rgba(0,0,0,0.08)",
  borderHover: "rgba(212,160,23,0.45)",
  text: "#1A1A2E",
  muted: "#5F6368",
  subtle: "#F0F0EC",
  success: "#16A34A",
  danger: "#DC2626",
};

// Typewriter Component
const Typewriter = ({ segments, delay = 100, startDelay = 0, onComplete }: any) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  const totalLength = segments.reduce((acc: number, s: any) => acc + s.text.length, 0);

  React.useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  React.useEffect(() => {
    if (started && currentIndex < totalLength) {
      const timeout = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (started && currentIndex === totalLength && onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, totalLength, started, onComplete]);

  let charCount = 0;
  return (
    <span>
      {segments.map((s: any, i: number) => {
        const start = charCount;
        const end = Math.min(currentIndex, charCount + s.text.length);
        charCount += s.text.length;
        if (currentIndex < start) return null;
        return (
          <span key={i} style={{ color: s.color || "inherit" }}>
            {s.text.slice(0, end - start)}
          </span>
        );
      })}
      {started && currentIndex < totalLength && <span style={{ borderRight: "4px solid " + C.accent, marginLeft: "4px", animation: "blink 1s step-end infinite" }}>&nbsp;</span>}
    </span>
  );
};

// StaticHook Component — single punchy line
const StaticHook = () => {
  const [isMobile, setIsMobile] = React.useState(typeof window !== "undefined" ? window.innerWidth <= 768 : false);
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const segments = [
    { text: "Right now, you're losing clients ", color: C.text },
    { text: "without knowing why", color: C.accent },
    { text: " — fix it in 30 minutes.", color: C.text }
  ];

  if (isMobile) {
    return (
      <span style={{ fontWeight: 800, textAlign: "left", display: "inline-block", width: "100%" }}>
        {segments.map((s, i) => (
          <span key={i} style={{ color: s.color }}>
            {s.text}
          </span>
        ))}
      </span>
    );
  }

  return <Typewriter segments={segments} delay={45} />;
};


// Animated Number Component
const AnimatedNumber = ({ value, duration = 1.5 }: { value: number; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const springValue = useSpring(1, {
    stiffness: 100,
    damping: 15,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    } else {
      springValue.set(1);
    }
  }, [isInView, springValue, value]);

  const rounded = useTransform(springValue, (latest) => Math.floor(latest));

  return <motion.span ref={ref}>{rounded}</motion.span>;
};


const FONT = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
`;

export default function AvaniEnterprises() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const sectionRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Plan pricing map (Booking fees charged via Razorpay)
  const PLAN_PRICES: Record<string, number> = {
    "Basic Plan": 149,
    "Standard Plan": 249,
    "Premium Plan": 249,
  };

  // Form & Payment State
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", plan: "Standard Plan", goals: ""
  });
  const [currentLeadId, setCurrentLeadId] = useState(null);
  const [paymentState, setPaymentState] = useState("none");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

  // Open modal — optionally pre-select a specific plan (default: Standard)
  const openModal = (plan = "Standard Plan") => {
    setFormData(prev => ({ ...prev, plan }));
    setShowModal(true);
  };

  const scrollToPricing = () => {
    const section = document.getElementById("pricing");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false); // Close mobile menu if it's open
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const services = [
    { icon: <Code2 />, title: "Web Engineering", tag: "MERN / NEXT.JS", desc: "We architect full-stack platforms that handle millions of requests. From fintech dashboards to e-commerce ecosystems, our engineering teams build for scale, performance, and conversion.", features: ["Custom MERN Stack Apps", "E-commerce Platforms", "SaaS Products", "API Architecture"] },
    { icon: <TrendingUp />, title: "Performance Marketing", tag: "PAID ADS / META / GOOGLE", desc: "Every rupee spent is tracked, optimized, and scaled. Our performance teams run data-driven campaigns that consistently deliver 4x-10x ROAS across verticals.", features: ["Meta & Google Ads", "Retargeting Funnels", "Landing Page CRO", "Attribution Modeling"] },
    { icon: <Search />, title: "SEO & Content", tag: "ORGANIC GROWTH", desc: "Sustainable, compounding organic traffic from technical SEO, content strategy, and authority building that works 24/7 — no ad spend required.", features: ["Technical SEO Audits", "Content Architecture", "Link Building", "Local SEO"] },
    { icon: <MessageSquare />, title: "Social Media", tag: "BRAND & COMMUNITY", desc: "We run social media channels like media companies — strategic content calendars, community management, and influencer activations that build brand equity.", features: ["Content Creation", "Community Management", "Influencer Outreach", "Analytics Reporting"] },
    { icon: <Briefcase />, title: "Business Advisory", tag: "STRATEGY & OPS", desc: "C-suite level strategic advisory to fix operational bottlenecks, enter new markets, and architect revenue models that sustain exponential growth.", features: ["Revenue Strategy", "Market Entry", "Operations Consulting", "KPI Framework"] },
    { icon: <ShieldCheck />, title: "Loans & Insurance", tag: "CAPITAL & PROTECTION", desc: "Structured access to business financing and comprehensive corporate insurance coverage. We've helped clients unlock ₹50Cr+ in institutional capital.", features: ["Business Loans", "Working Capital", "Corporate Insurance", "Risk Assessment"] },
  ];

  const projects = [
    { tag: "ERP / WEB APP", title: "School Management", desc: "A full-featured web application designed to modernize school operations and administration. It automates core tasks, including digital attendance tracking, seamless timetable generation, and secure online fee management. The system features dedicated, role-based access for Admin, Teacher, and Parent users. This setup allows for real-time data analytics to significantly boost institutional efficiency and stakeholder communication.", metric: "100+ Schools", img: "/school.jpg", color: "#F0F5F0" },
    { tag: "E-COMMERCE", title: "Shoe E-Commerce", desc: "Developed a feature-rich footwear e-commerce platform optimized for a modern shopping experience. Key functionalities include stunning 3D product previews and a smooth, secure cart-to-checkout process. The system also features smart inventory management and admin/delivery dashboards. It allows for advanced features like order rescheduling, refund tracking, and analytics-driven business insights.", metric: "3D Integration", img: "/shoe.jpg", color: "#F0F0F5" },
    { tag: "SAAS / ERP", title: "HR Portal", desc: "A comprehensive HR management system built to streamline and automate workforce operations. It includes robust features for attendance tracking, efficient leave management, and automated payroll processing. The platform provides employee performance analytics, secure document handling, and internal communication tools. All functions are governed by dedicated role-based access dashboards.", metric: "Automated Payroll", img: "/hrportal.png", color: "#F0F5F0" },
    { tag: "HEALTHCARE", title: "Hospital Website", desc: "Developed a comprehensive web platform for Holy Heart Hospital, specializing in advanced cardiac care. The system integrates an AI Chatbot ('HealthBot') for instant support and efficient appointment booking. Features include secure online OPD booking, integrated with Razorpay. It provides a robust Admin analytics dashboard and patient portals for managing orders and downloading invoices.", metric: "Razorpay + AI", img: "/hospital.jpg", color: "#F5F0F0" },
    { tag: "REAL ESTATE", title: "Hi-tech Property", desc: "A professional, full-service property management portal designed to centralize real estate operations. The platform features an extensive listing module for showcasing available properties with high-quality media. It includes robust lead capture tools to streamline client inquiries and follow-ups effectively. Dedicated admin tools are provided to ensure efficient management of listings, client data, and workflows.", metric: "Lead Capture", img: "/hitechproperty.jpg", color: "#F0F2F5" },
  ];

  const faqs = [
    { q: "Is this for new or existing businesses?", a: "Both. If you're new, we help you launch with trust. If you're existing, we show you how to optimize and scale your current lead flow." },
    { q: "Why is the price so low?", a: "We believe in building trust first. This low-ticket entry allows us to demonstrate our expertise. If you like the plan, you can choose to work with us for implementation." },
    { q: "What happens after I pay?", a: "You'll receive an instant confirmation. Our team will reach out via WhatsApp/Email within 24 hours to schedule your session at your convenience." },
    { q: "How soon can I expect results after the strategy session?", a: "Most clients begin seeing directional improvements within the first 2–4 weeks of implementing the roadmap. The strategy session gives you a clear 90-day action plan, and many clients report measurable lead flow improvements within the first month." },
  ];

  const testimonials = [
    { name: "Rahul Mehta", role: "E-commerce Founder", text: "Initially skeptical about the ₹499 audit, but the growth roadmap was a game-changer. We went from 0 to 42 leads/month in just 3 months.", stars: 5, image: "/review_person1.png" },
    { name: "Priya Sharma", role: "CMO, TextileBridge", text: "The strategy session alone was worth 10X the price. They identified 3 major leaks in our homepage that were costing us lakhs.", stars: 5, image: "/review_person2.png" },
    { name: "Vikram Nair", role: "Business Owner", text: "Finally, a agency that talks numbers, not just aesthetics. The step-by-step lead gen plan is exactly what I needed to scale.", stars: 5, image: "/review_person3.png" },
  ];
  // Plan payment handler for pricing table


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let leadId = null;

    const selectedPlan = formData.plan || "Standard Plan";
    const selectedAmount = PLAN_PRICES[selectedPlan] ?? 199;

    try {
      const res = await fetch(`${API_BASE}/growth-plan-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, plan: selectedPlan, amount: selectedAmount })
      });
      if (res.ok) {
        const lead = await res.json();
        leadId = lead._id;
        setCurrentLeadId(leadId);
      }
    } catch (err) {
      console.warn("Backend not available. Proceeding with payment anyway...", err);
    }

    try {
      setShowModal(false);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SGgUxNXJPhFnL7",
        amount: selectedAmount * 100, // paise
        currency: "INR",
        name: "Avani Enterprises",
        description: `${selectedPlan} — Business Consultation`,
        image: "/avani-logo.jpg",
        handler: function (response: any) {
          updatePaymentStatusById(leadId, "Completed");
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: C.accent },
        modal: {
          ondismiss: function () {
            setPaymentState("fail");
          }
        }
      };
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        updatePaymentStatusById(leadId, "Failed");
      });
      rzp1.open();
      setPaymentState("processing");
    } catch (err) {
      alert("Failed to submit request. Please try again.");
    }
  };

  const updatePaymentStatusById = async (id: string, status: string) => {
    try {
      if (!id) return;
      await fetch(`${API_BASE}/growth-plan-leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      
      if (status === "Completed") {
        setPaymentState("success");
        // Redirect to thank you page after a brief delay to show success icon
        setTimeout(() => {
          navigate("/thank-you", { 
            state: { 
              name: formData.firstName, 
              service: "Growth Plan Strategy Session" 
            } 
          });
        }, 1500);
      } else {
        setPaymentState("fail");
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div style={{ background: C.dark, color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        ${FONT}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .marquee-row:hover { animation-play-state: paused !important; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes mesh { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes lineGrow { from { width: 0; } to { width: 100%; } }
        @keyframes blink { from, to { border-color: transparent } 50% { border-color: ${C.accent} } }
        @keyframes mobileOrbFloat { 0%,100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.15); } }
        @keyframes mobileGlowPulse { 0%,100% { opacity: 0.12; } 50% { opacity: 0.25; } }
        @keyframes mobileFadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mobileCountUp { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }

        /* ── PRICING RESPONSIVE TOGGLE ── */
        .pricing-table-desktop { display: block; border-radius: 24px; }
        .pricing-table-mobile { display: none; }

        @media (max-width: 768px) {
          .pricing-table-desktop { border-radius: 12px; }
          .pricing-table-container th, .pricing-table-container td { padding: 8px 4px !important; }
          .pricing-table-container .table-feature-text { font-size: 8px !important; }
          .pricing-table-container .table-tick-cross { width: 14px !important; height: 14px !important; font-size: 7px !important; }
          .pricing-table-container .table-val-text { font-size: 8px !important; }
          .pricing-table-container .table-header-name { font-size: 8px !important; letter-spacing: 1px !important; }
          .pricing-table-container .table-header-price { font-size: 10px !important; }
          .pricing-table-container .table-header-top1 { font-size: 8px !important; margin-bottom: 2px !important; }
          .pricing-table-container .table-header-top2 { font-size: 12px !important; }
          .pricing-table-container .cta-btn span:first-child { font-size: 8px !important; }
          .pricing-table-container .cta-btn span:last-child { font-size: 6px !important; }
          .pricing-table-container table { min-width: 100% !important; }
          .pricing-table-container .col-feature { width: 28% !important; }
        }

        /* ── HERO ENHANCEMENT ELEMENTS ── */
        .mobile-hero-only { display: block; }
        .mobile-hero-orb { display: none; }
        .mobile-hero-glow-bar { display: none; }

        /* Desktop hero enhancements */
        .mobile-hero-sub-hook {
          animation: fadeUp 0.8s ease 0.5s both;
        }
        .mobile-hero-trust-row {
          animation: fadeUp 0.8s ease 0.7s both;
        }
        .mobile-hero-value-pills {
          animation: fadeUp 0.8s ease 0.9s both;
        }

        .desktop-panel { display: block; }
        .mobile-panel { display: none; }

        h1, h2, h3 { font-family: 'Plus Jakarta Sans', sans-serif; }

        .display-font { font-family: 'Bebas Neue', sans-serif; }
        .body-font { font-family: 'Plus Jakarta Sans', sans-serif; }

        .nav-link {
          color: rgba(26,26,46,0.55); text-decoration: none; font-size: 12px;
          font-weight: 500; letter-spacing: 1px; transition: color 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .nav-link:hover { color: ${C.text}; }

        .service-tab { cursor: pointer; padding: 18px 0; border-bottom: 1px solid ${C.border}; transition: all 0.3s; display: flex; align-items: center; justify-content: space-between; }
        .service-tab.active { border-bottom-color: ${C.accent}; }
        .service-tab:hover .tab-title { color: ${C.text}; }

        .project-card { position: relative; overflow: hidden; border-radius: 8px; cursor: pointer; aspect-ratio: 16/9; background: #F5F5F0; border: 1px solid ${C.border}; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 30px ${C.accentGlow}; }
        .project-card img { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); filter: brightness(0.8) saturate(0.9); }
        .project-card:hover { border-color: ${C.accent}60; box-shadow: 0 20px 60px ${C.accentGlow}, 0 0 20px ${C.accent}15; transform: translateY(-4px); z-index: 10; }
        .project-card:hover img { transform: scale(1.05); filter: brightness(0.4) saturate(0.8); }
        .project-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; opacity: 0; transition: opacity 0.4s ease; background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 60%); }
        .project-card:hover .project-overlay { opacity: 1; }
        .project-tag-glass { position: absolute; top: 24px; left: 24px; background: rgba(255,255,255,0.85); backdrop-filter: blur(8px); border: 1px solid rgba(0,0,0,0.08); padding: 8px 18px; border-radius: 30px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: ${C.accent}; transition: all 0.5s ease; z-index: 2; transform: translateY(-15px); }
        .project-card:hover .project-tag-glass { transform: translateY(0); background: ${C.accent}; color: #000; border-color: ${C.accent}; box-shadow: 0 4px 15px rgba(225,173,1,0.3); }
        .project-info-glass { margin-top: auto; padding: 60px 40px 40px; display: flex; flex-direction: column; justify-content: flex-end; transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .project-card:hover .project-info-glass { transform: translateY(0); }
        .project-details { margin-top: 20px; }

        .service-card { 
          background: ${C.card}; 
          border: 1px solid ${C.border}; 
          padding: 40px; 
          border-radius: 12px; 
          display: flex; 
          flex-direction: column; 
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          height: 100%;
        }
        .service-card:hover {
          border-color: ${C.accent}40;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transform: translateY(-5px);
        }
        .service-icon-wrapper {
          color: ${C.accent};
          margin-bottom: 24px;
          background: rgba(225,173,1,0.05);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid rgba(225,173,1,0.1);
        }
        .service-tag {
          font-size: 9px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          fontWeight: 700;
          letter-spacing: 3px;
          color: ${C.accent};
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .service-title {
          font-size: 24px;
          font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin-bottom: 20px;
          color: ${C.text};
        }
        .service-desc {
          color: ${C.muted};
          font-size: 14px;
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 30px;
          flex-grow: 1;
        }
        .service-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 36px;
          background: rgba(255,255,255,0.02);
          padding: 24px;
          border-radius: 8px;
        }
        .service-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .service-feature-item span {
          font-size: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .faq-item { border-bottom: 1px solid ${C.border}; transition: border-color 0.3s; }
        .faq-item.active { border-bottom-color: ${C.accent}; }

        .cta-btn { background: ${C.accent}; color: #fff; border: none; padding: 16px 32px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: 1.5px; cursor: pointer; transition: all 0.3s; border-radius: 4px; text-transform: uppercase; }
        .cta-btn:hover { background: ${C.accentLight}; transform: translateY(-2px); box-shadow: 0 12px 40px ${C.accentGlow}; }

        .ghost-btn { background: transparent; color: ${C.text}; border: 1px solid ${C.border}; padding: 16px 32px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; cursor: pointer; transition: all 0.3s; border-radius: 1px; }
        .ghost-btn:hover { border-color: ${C.text}; }

        .stat-card { background: ${C.card}; border: 1px solid ${C.border}; padding: 40px 35px; transition: all 0.4s; }
        .stat-card:hover { border-color: ${C.accent}; background: rgba(212,160,23,0.04); }

        .marquee-wrap { display: flex; overflow: hidden; border-top: 1px solid ${C.border}; border-bottom: 1px solid ${C.border}; padding: 20px 0; }
        .marquee-track { display: flex; gap: 0; animation: marquee 25s linear infinite; white-space: nowrap; }
        .marquee-item { display: flex; align-items: center; gap: 25px; padding: 0 40px; }
        .marquee-dot { width: 5px; height: 5px; background: ${C.accent}; border-radius: 50%; flex-shrink: 0; }

        input, select, textarea { background: #F5F5F0 !important; border: 1px solid ${C.border} !important; border-radius: 4px; color: ${C.text} !important; padding: 14px 16px !important; outline: none !important; width: 100%; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; transition: border-color 0.2s; }
        input:focus, select:focus, textarea:focus { border-color: ${C.accent} !important; }
        input::placeholder, textarea::placeholder { color: ${C.muted} !important; }
        select option { background: #fff; }

        .hero-line { animation: fadeUp 0.8s ease forwards; opacity: 0; }
        .hero-line:nth-child(1) { animation-delay: 0.1s; }
        .hero-line:nth-child(2) { animation-delay: 0.25s; }
        .hero-line:nth-child(3) { animation-delay: 0.4s; }
        .hero-line:nth-child(4) { animation-delay: 0.55s; }

        .shimmer-text {
          background: linear-gradient(90deg, ${C.text} 0%, rgba(26,26,46,0.35) 40%, ${C.text} 60%, rgba(26,26,46,0.35) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #F0F0EC; } ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 4px; }
        @keyframes pulseAlert { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 51, 51, 0.4); } 50% { box-shadow: 0 0 0 10px rgba(255, 51, 51, 0); } }

        /* ── AI Section Animations ── */
        @keyframes aiGlow { 0%, 100% { box-shadow: 0 0 30px rgba(99,102,241,0.15), 0 0 60px rgba(212,160,23,0.08); } 50% { box-shadow: 0 0 50px rgba(99,102,241,0.25), 0 0 100px rgba(212,160,23,0.15); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes borderGlow { 0%, 100% { border-color: rgba(99,102,241,0.3); } 50% { border-color: rgba(99,102,241,0.6); } }

        .ai-hero-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px 28px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .ai-hero-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(212,160,23,0.4), rgba(99,102,241,0.1));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .ai-hero-card:hover::before { opacity: 1; }
        .ai-hero-card:hover {
          background: rgba(255,255,255,0.07);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(99,102,241,0.15);
        }

        @media (max-width: 1024px) {
          .nav-links, .nav-desktop-cta { display: none !important; }
          .nav-mobile-toggle { display: block !important; }

          /* ── Hero Mobile ── */
          .hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; text-align: center; }
          .hero-text-content { align-items: center !important; }
          .hero-badge { margin: 0 auto 12px auto !important; justify-content: center !important; transform: scale(0.9) !important; width: 100%; }
          .hero-desc { margin: 0 auto 20px auto !important; font-size: 0.92rem !important; line-height: 1.65 !important; max-width: 380px !important; }
          .hero-img-col { display: none !important; }
          .cta-container { width: 100% !important; align-items: center !important; }
          .hero-cta {
            width: 100% !important;
            font-size: 14px !important;
            padding: 18px !important;
            border-radius: 12px !important;
            background: linear-gradient(135deg, ${C.accent} 0%, #C4920E 100%) !important;
            box-shadow: 0 8px 32px rgba(212,160,23,0.35), 0 2px 8px rgba(0,0,0,0.1) !important;
            position: relative !important;
            overflow: hidden !important;
          }
          .hero-cta::after {
            content: '' !important;
            position: absolute !important;
            top: 0 !important; left: -100% !important;
            width: 100% !important; height: 100% !important;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent) !important;
            animation: ctaShine 3s ease-in-out infinite !important;
          }
          @keyframes ctaShine { 0% { left: -100%; } 50%,100% { left: 100%; } }
          .urgency-badge { font-size: 10px !important; padding: 6px 14px !important; margin: 0 auto !important; border-radius: 8px !important; }
          .hero-section { min-height: 100svh !important; justify-content: center !important; padding: 90px 5% 30px 5% !important; }
          .hero-inner { margin-top: 0 !important; width: 100% !important; }
          .hero-section .display-font { font-size: clamp(3rem, 14vw, 5rem) !important; text-align: center !important; }
          .display-font { font-size: clamp(2.2rem, 11vw, 4rem) !important; }
          .mobile-hide { display: none !important; }
          .marquee-wrap { margin-top: 32px !important; }
          .marquee-item { padding: 0 20px !important; }
          .mobile-hero-value-pills { justify-content: center !important; }

          /* ── Mobile Hero Exclusive Elements ── */
          .mobile-hero-only { display: block !important; }
          .mobile-hero-orb {
            display: block !important;
            position: absolute !important;
            top: 30% !important;
            left: 50% !important;
            width: 320px !important;
            height: 320px !important;
            border-radius: 50% !important;
            background: radial-gradient(circle, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.04) 50%, transparent 70%) !important;
            transform: translate(-50%, -50%) !important;
            animation: mobileOrbFloat 6s ease-in-out infinite !important;
            pointer-events: none !important;
            z-index: 0 !important;
          }
          .mobile-hero-glow-bar {
            display: block !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 120px !important;
            background: linear-gradient(180deg, transparent, rgba(212,160,23,0.06)) !important;
            pointer-events: none !important;
          }

          .mobile-hero-sub-hook {
            animation: mobileFadeSlideUp 0.8s ease 0.6s both !important;
            max-width: 100% !important;
          }
          .mobile-hero-sub-hook > div {
            text-align: center !important;
          }
          .mobile-hero-trust-row {
            animation: mobileFadeSlideUp 0.8s ease 0.9s both !important;
            justify-content: center !important;
            max-width: 100% !important;
          }
          .mobile-hero-value-pills {
            animation: mobileFadeSlideUp 0.8s ease 1.1s both !important;
            justify-content: center !important;
          }

          /* ── Pricing Mobile Redesign ── */
          div.pricing-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
            width: 100% !important;
            margin: 0 !important;
          }
          div.pricing-card {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            transform: none !important;
            border-radius: 20px !important;
            padding: 28px 22px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important;
          }
          div.pricing-card.popular {
            transform: none !important;
            border-width: 2px !important;
            box-shadow: 0 8px 40px rgba(212,160,23,0.18), 0 0 0 1px rgba(212,160,23,0.2) !important;
            order: -1 !important;
          }
          .pricing-features-row {
            padding: 10px 6px !important;
            font-size: 13px !important;
          }

          /* ── Stats: 2x2 Grid ── */
          div.stats-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0 !important;
            width: 100% !important;
            margin: 0 !important;
          }
          .stat-card {
            padding: 24px 16px !important;
            text-align: center !important;
            border-left: 1px solid ${C.border} !important;
            border-right: 1px solid ${C.border} !important;
            border-bottom: 1px solid ${C.border} !important;
          }
          .stat-card .display-font { font-size: clamp(1.8rem, 6vw, 2.4rem) !important; }

          /* ── Services: Stack ── */
          div.services-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
            width: 100% !important;
          }
          .service-card {
            padding: 28px 22px !important;
            border-radius: 16px !important;
          }
          .service-icon-wrapper {
            width: 50px !important;
            height: 50px !important;
            margin-bottom: 18px !important;
          }
          .service-title { font-size: 20px !important; margin-bottom: 14px !important; }
          .service-desc { font-size: 13px !important; margin-bottom: 20px !important; }
          .service-features { padding: 16px !important; margin-bottom: 0 !important; }

          /* ── Projects Carousel ── */
          div.projects-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
            width: 100% !important;
          }
          .project-card-container { width: 300px !important; }

          /* ── Process: Vertical Timeline ── */
          .process-steps-container {
            display: flex !important;
            flex-direction: column !important;
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            overflow-x: visible !important;
            padding-bottom: 0 !important;
          }
          .process-step-mobile {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-start !important;
            text-align: left !important;
            gap: 20px !important;
            padding: 24px 0 !important;
            border-bottom: 1px solid ${C.border} !important;
            min-width: unset !important;
          }
          .process-step-mobile:last-child { border-bottom: none !important; }
          .process-step-mobile .process-circle {
            width: 64px !important;
            height: 64px !important;
            flex-shrink: 0 !important;
          }
          .process-step-mobile .process-step-num {
            width: 24px !important;
            height: 24px !important;
            font-size: 10px !important;
            top: -2px !important;
            right: -2px !important;
          }
          .process-step-mobile .process-card-title { font-size: 16px !important; margin-bottom: 6px !important; }
          .process-step-mobile .process-card-desc { max-width: 100% !important; font-size: 12px !important; }

          /* ── Testimonials: Horizontal Snap Scroll ── */
          div.testimonials-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 16px !important;
            margin: 0 -6% !important;
            padding-left: 6% !important;
            padding-right: 6% !important;
          }
          div.testimonials-grid > div {
            flex: 0 0 85% !important;
            scroll-snap-align: start !important;
            border-radius: 16px !important;
            padding: 28px 24px !important;
            border: 1px solid ${C.border} !important;
          }
          div.testimonials-grid::-webkit-scrollbar { display: none; }

          /* ── Section Spacing ── */
          .mobile-section { padding: 50px 5% !important; }
          .flex-col-mob {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 30px !important;
          }

          /* ── FAQ Mobile ── */
          .faq-item > div:first-child { padding: 22px 0 !important; }
          .faq-item span { font-size: 15px !important; }

          /* ── CTA Band ── */
          .cta-band {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 40px 5% !important;
            text-align: center !important;
          }
          .cta-band > div:first-child { width: 100% !important; text-align: center !important; }
          .cta-band-btns {
            flex-direction: column !important;
            width: 100% !important;
          }
          .cta-band-btns button, .cta-band-btns a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }

          /* ── AI Section Mobile ── */
          .ai-section-dark { padding: 60px 5% !important; }
          .ai-pills-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .ai-hero-card { padding: 28px 22px !important; }
          .ai-cta-row {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .ai-cta-row button, .ai-cta-row a {
            width: 100% !important;
            justify-content: center !important;
          }
          .ai-manifesto-text { font-size: 15px !important; }
          .ai-comparison-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          /* ── Footer ── */
          .footer-top { grid-template-columns: 1fr !important; gap: 30px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 20px !important; }

          /* ── Floating FAB Mobile ── */
          .mobile-fab {
            bottom: 20px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
          }
          .mobile-fab button {
            padding: 14px 28px !important;
            font-size: 12px !important;
            border-radius: 50px !important;
            box-shadow: 0 8px 30px rgba(212,160,23,0.5) !important;
          }

          /* ── Modal Full Screen Mobile ── */
          div[style*="position: fixed"][style*="zIndex: 9999"] > div {
            max-width: 100% !important;
            max-height: 100% !important;
            border-radius: 0 !important;
            height: 100% !important;
          }
        }

        @media (max-width: 480px) {
          .display-font { 
            font-size: clamp(1.2rem, 6vw, 1.6rem) !important; 
            font-weight: 800 !important; 
            text-align: left !important; 
            display: block !important;
            width: 100% !important;
            margin-left: 0 !important;
            padding-left: 0 !important;
          }
          .hero-cta { font-size: 13px !important; padding: 16px !important; border-radius: 12px !important; }
          .hero-section { padding: 40px 5% 24px 5% !important; align-items: flex-start !important; }
          .hero-text-content { 
            text-align: left !important; 
            align-items: flex-start !important; 
            justify-content: flex-start !important;
            width: 100% !important;
          }
          .hero-text-content * { text-align: left !important; }
          .hero-badge, .mobile-hero-value-pills { justify-content: flex-start !important; width: 100% !important; }
          .cta-container { align-items: flex-start !important; width: 100% !important; }
          .shimmer-text, .hero-line { animation: none !important; transform: none !important; opacity: 1 !important; }
          
          .stat-card .display-font { font-size: clamp(1.4rem, 5vw, 1.8rem) !important; }
          .project-card-container { width: 260px !important; }
          .shimmer-text { font-size: clamp(1.4rem, 7vw, 2rem) !important; min-height: 3.5em !important; }
          .mobile-hero-orb {
            width: 250px !important;
            height: 250px !important;
            top: 25% !important;
          }
          .mobile-hero-trust-chip {
            font-size: 10px !important;
            padding: 5px 10px !important;
          }

          /* Testimonials: full-width cards on small phones */
          div.testimonials-grid > div {
            flex: 0 0 90% !important;
          }

          /* Pricing section header */
          #pricing .display-font { font-size: clamp(1.6rem, 8vw, 2.5rem) !important; }
          #pricing p { font-size: 13px !important; }

          /* Process section compact */
          .process-step-mobile {
            gap: 16px !important;
            padding: 20px 0 !important;
          }
          .process-step-mobile .process-circle {
            width: 52px !important;
            height: 52px !important;
          }
          .mobile-hero-value-pill-item {
            padding: 6px 10px !important;
            font-size: 10px !important;
          }
        }

      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9995, height: "70px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6%",
        background: scrolled ? "rgba(250,250,248,0.98)" : "rgba(250,250,248,0.4)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
        transition: "all 0.4s ease",
      }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <img src="/avani-logo.jpg" alt="Avani Enterprises Logo" style={{ width: "36px", height: "36px", objectFit: "contain", borderRadius: "2px" }} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "2px", color: C.text }}>AVANI<span className="mobile-hide"> ENTERPRISES</span></span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links" style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          {["Solutions", "Projects", "About", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l.toUpperCase()}</a>
          ))}
          <button onClick={() => scrollToPricing()} className="cta-btn nav-desktop-cta" style={{ padding: "10px 22px", fontSize: "11px", marginLeft: "10px" }}>
            START YOUR JOURNEY
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ 
            display: "none", 
            border: "none", 
            background: "none", 
            color: C.text, 
            cursor: "pointer",
            padding: "10px",
            zIndex: 10001,
            position: "relative",
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── MOBILE MENU OVERLAY (outside nav to avoid clipping) ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                zIndex: 9998,
                backdropFilter: "blur(4px)",
              }}
            />
            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "85%",
                maxWidth: "380px",
                background: "#FFFFFF",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
                overflowY: "auto",
              }}
            >
              {/* Header with close button */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px 28px",
                borderBottom: `1px solid ${C.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src="/avani-logo.jpg" alt="Avani" style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "contain" }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "2px", color: C.text }}>AVANI</span>
                </div>
                <button 
                  onClick={() => setMenuOpen(false)}
                  style={{
                    border: "none",
                    background: C.subtle,
                    color: C.text,
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div style={{ padding: "16px 0", flex: 1 }}>
                {[
                  { label: "Solutions", href: "#solutions", icon: <Layers size={20} /> },
                  { label: "Projects", href: "#projects", icon: <Briefcase size={20} /> },
                  { label: "Pricing", href: "#pricing", icon: <BarChart3 size={20} /> },
                  { label: "About", href: "#about", icon: <Users size={20} /> },
                  { label: "FAQ", href: "#faq", icon: <MessageSquare size={20} /> },
                ].map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "18px 28px",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: C.text,
                      textDecoration: "none",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      letterSpacing: "0.5px",
                      borderBottom: `1px solid ${C.border}`,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.subtle}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ color: C.accent, display: "flex", alignItems: "center" }}>{item.icon}</span>
                    {item.label.toUpperCase()}
                    <ChevronRight size={16} color={C.muted} style={{ marginLeft: "auto" }} />
                  </a>
                ))}
              </div>

              {/* Contact info */}
              <div style={{ padding: "20px 28px", borderTop: `1px solid ${C.border}`, background: C.subtle }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <Phone size={15} color={C.accent} />
                  <a href="tel:+919311967319" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: C.text, textDecoration: "none" }}>+91 93119 67319</a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <Mail size={15} color={C.accent} />
                  <a href="mailto:info@avanienterprises.in" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: C.text, textDecoration: "none" }}>info@avanienterprises.in</a>
                </div>
              </div>

              {/* CTA Button */}
              <div style={{ padding: "20px 28px 40px" }}>
                <button
                  onClick={() => { scrollToPricing(); setMenuOpen(false); }}
                  className="cta-btn"
                  style={{
                    width: "100%",
                    padding: "18px",
                    fontSize: "13px",
                    letterSpacing: "1.5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    borderRadius: "8px",
                  }}
                >
                  START YOUR JOURNEY <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6%", position: "relative", overflow: "hidden" }}>
        {/* Background grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 100%, transparent 0%, ${C.dark} 70%)` }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: "600px", height: "600px", background: `radial-gradient(circle, ${C.accentGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />

        {/* Mobile-only decorative orb */}
        <div className="mobile-hero-orb" />
        <div className="mobile-hero-glow-bar" />

        <div className="hero-inner" style={{ position: "relative", zIndex: 1, maxWidth: "1400px", width: "100%", marginTop: "80px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", alignItems: "start" }}>
            
            {/* Left Column: Text Content */}
            <div className="hero-line hero-text-content" style={{ display: "flex", flexDirection: "column" }}>
              <div className="hero-badge" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 8px #16A34A", animation: "pulse 2s ease infinite" }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", color: "#16A34A" }}>CLIENTS ONBOARDING</span>
                </div>
                <div style={{ width: "1px", height: "14px", background: C.border }} className="mobile-hide" />
                <span className="mobile-hide" style={{ fontSize: "10px", letterSpacing: "2px", color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>Melbourne (Australia) · Bombay · Gurugram</span>
              </div>

              <h1 className="display-font shimmer-text" style={{ fontSize: "clamp(2rem, 7vw, 4.8rem)", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "30px", minHeight: "2.5em", overflow: "hidden" }}>
                <StaticHook />
              </h1>

              <div className="cta-container" style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>


                <button onClick={() => scrollToPricing()} className="cta-btn hero-cta" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "18px 40px" }}>
                  START YOUR BUSINESS JOURNEY NOW <ArrowRight size={16} />
                </button>

                {/* Value pills below CTA */}
                <div className="mobile-hero-only mobile-hero-value-pills" style={{ display: "flex", flexWrap: "wrap", gap: "16px", width: "100%", marginTop: "16px", justifyContent: "center" }}>
                  {[
                    { icon: <CheckCircle size={13} />, text: "No Long-Term Lock-in" },
                    { icon: <Star size={13} />, text: "Rated 4.9/5" },
                    { icon: <Clock size={13} />, text: "Results in 24hrs" },
                  ].map((pill, i) => (
                    <div key={i} className="mobile-hero-value-pill-item" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: C.muted,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      padding: "4px 0",
                    }}>
                      <span style={{ color: C.accent, display: "flex", alignItems: "center" }}>{pill.icon}</span>
                      <span>{pill.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Video */}
            <div className="hero-line hero-img-col" style={{ position: "relative", display: "flex", alignItems: "center", maxHeight: "calc(100vh - 160px)" }}>
              <div style={{ position: "absolute", inset: "-12px", border: `1px solid ${C.accent}25`, borderRadius: "16px", zIndex: -1 }} />
              <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)", width: "100%", maxHeight: "calc(100vh - 160px)" }}>
                <video 
                  autoPlay 
                  loop 
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "100%", maxHeight: "calc(100vh - 160px)", display: "block", objectFit: "cover", objectPosition: "center top" }} 
                >
                  <source src="/avanivideo.mp4" type="video/mp4" />
                </video>
                
                {/* Mute/Unmute Toggle */}
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    zIndex: 10
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.4)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>

          </div>
        </div>


      </section>

      {/* ── PRICING TABLE ── */}
      <section id="pricing" className="mobile-section" style={{ padding: "80px 6%", background: `linear-gradient(180deg, ${C.dark} 0%, #F0F0EC 50%, ${C.dark} 100%)`, position: "relative", overflow: "hidden" }}>
        {/* Background decorative elements */}
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: `radial-gradient(circle, ${C.accentGlow} 0%, transparent 70%)`, pointerEvents: "none", opacity: 0.15 }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, transparent, ${C.accent})` }} />
              <h2 className="display-font" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "2px", color: C.accent, margin: 0 }}>CHOOSE YOUR PLAN</h2>
              <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, ${C.accent}, transparent)` }} />
            </div>
            <p style={{ color: C.muted, fontSize: "14px", lineHeight: 1.6, maxWidth: "550px", margin: "0 auto", fontWeight: 300 }}>
              Simple, fair consultation plans. Pick what suits your business scale — upgrade anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          {/* Pricing Comparison Table */}
          {/* Pricing Comparison Table (Desktop) */}
          <div className="pricing-table-desktop pricing-table-container" style={{ 
            overflowX: "auto", 
            background: "#FFFFFF", 
            borderRadius: "24px", 
            boxShadow: "0 20px 80px rgba(0,0,0,0.06)",
            border: `1px solid ${C.border}`,
            position: "relative",
            zIndex: 2,
            margin: "0 auto",
            maxWidth: "100%"
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "100%", tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th className="col-feature" style={{ padding: "16px 20px", textAlign: "left", width: "22%", borderBottom: `1px solid ${C.border}` }}>
                    <div className="table-header-top1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 800, letterSpacing: "2px", color: C.muted, marginBottom: "4px" }}>COMPARE</div>
                    <div className="display-font table-header-top2" style={{ fontSize: "16px", color: C.text }}>THE FIT.</div>
                  </th>
                  {[
                    { name: "Basic Plan", price: "9,999", book: "149", popular: false },
                    { name: "Standard Plan", price: "99,999", book: "249", popular: true },
                    { name: "Premium Plan", price: "9,99,999", book: "249", popular: false }
                  ].map((p, i) => (
                    <th key={i} style={{ 
                      padding: "16px 15px", 
                      textAlign: "center", 
                      width: "26%",
                      background: p.popular ? "rgba(99,102,241,0.03)" : "transparent",
                      borderLeft: `1px solid ${C.border}`,
                      borderBottom: `1px solid ${C.border}`,
                      position: "relative"
                    }}>
                      {p.popular && (
                        <div style={{ 
                          position: "absolute", top: "0", left: "0", right: "0", height: "4px", background: C.accent 
                        }} />
                      )}
                      <div className="table-header-name" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "9px", fontWeight: 800, letterSpacing: "2.5px", color: p.popular ? C.accent : C.muted, marginBottom: "4px" }}>{p.name.toUpperCase()}</div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                        <div className="table-header-price" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", color: C.muted, fontWeight: 400 }}>₹{p.price}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Feasibility Study", basic: "✔", standard: "✔", premium: "✔" },
                  { name: "Website Development", basic: "✖", standard: "1 Year", premium: "1 Year" },
                  { name: "AI Integration", basic: "✖", standard: "AI Videos", premium: "Agentic AI + Videos" },
                  { name: "App Development", basic: "✖", standard: "✖", premium: "✔" },
                  { name: "Digital Marketing", basic: "3 Months", standard: "3 Months", premium: "1 Year" },
                  { name: "Office Space Setup", basic: "✖", standard: "✖", premium: "3 Months" },
                  { name: "Employee Hirings", basic: "✖", standard: "✖", premium: "Up to 20" },
                  { name: "Pamphlets & Letterheads", basic: "✖", standard: "✖", premium: "✔" },
                  { name: "Sales Support", basic: "✖", standard: "✖", premium: "Till Break-even" },
                  { name: "Bank Account Opening", basic: "✖", standard: "✔", premium: "Premium Account" },
                  { name: "Government Contracts", basic: "✖", standard: "✖", premium: "If Applicable" },
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: ri < 10 ? `1px solid ${C.border}` : "none" }}>
                    <td className="table-feature-text" style={{ padding: "12px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: C.text }}>{row.name}</td>
                    {[row.basic, row.standard, row.premium].map((cell, ci) => {
                      const isIncluded = cell !== "✖";
                      const isCheck = cell === "✔";
                      return (
                        <td key={ci} style={{ 
                          padding: "12px 10px", 
                          textAlign: "center", 
                          background: ci === 1 ? "rgba(99,102,241,0.03)" : "transparent",
                          borderLeft: `1px solid ${C.border}`,
                        }}>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            {isIncluded ? (
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                                <div className="table-tick-cross" style={{ 
                                  width: "20px", height: "20px", borderRadius: "50%", background: "rgba(16,185,129,0.1)", 
                                  color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 900
                                }}>✔</div>
                                {!isCheck && (
                                  <span className="table-val-text" style={{ fontSize: "10px", color: C.muted, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap" }}>{cell}</span>
                                )}
                              </div>
                            ) : (
                              <div className="table-tick-cross" style={{ 
                                width: "20px", height: "20px", borderRadius: "50%", background: "rgba(239,68,68,0.1)", 
                                color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 900
                              }}>✖</div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Footer Row for CTA */}
                <tr>
                  <td style={{ padding: "16px 20px", background: C.subtle, borderTop: `1px solid ${C.border}` }}></td>
                  {[
                    { name: "Basic Plan", book: "149", popular: false },
                    { name: "Standard Plan", book: "249", popular: true },
                    { name: "Premium Plan", book: "249", popular: false }
                  ].map((p, i) => (
                    <td key={i} style={{ 
                      padding: "16px 10px", 
                      textAlign: "center", 
                      background: p.popular ? "rgba(99,102,241,0.06)" : C.subtle,
                      borderLeft: `1px solid ${C.border}`,
                      borderTop: `1px solid ${C.border}`
                    }}>
                      <button
                        onClick={() => openModal(p.name)}
                        className="cta-btn"
                        style={{
                          width: "100%",
                          padding: "16px 8px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          background: C.accent,
                          color: "#000",
                          border: "none",
                          borderRadius: "6px",
                          boxShadow: p.popular ? "0 4px 14px rgba(212,160,23,0.3)" : "none"
                        }}
                      >
                        <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "0.5px" }}>BOOK</span>
                        <span style={{ fontSize: "11px", fontWeight: 600, opacity: 0.9 }}>Slot at ₹{p.book}</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>



          {/* Bottom note */}
          <p style={{ textAlign: "center", marginTop: "40px", color: C.muted, fontSize: "12px", letterSpacing: "0.5px", fontWeight: 400 }}>
            All plans include GST. Secure payment via Razorpay. Instant confirmation.
          </p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="mobile-section" style={{ padding: "80px 6%", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, transparent, ${C.accent})` }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: C.accent }}>OUR PROVEN WORK PROCESS</span>
              <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, ${C.accent}, transparent)` }} />
            </div>
            <h2 className="display-font" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 0.95 }}>HOW WE DELIVER.</h2>
          </div>

          <div style={{ position: "relative", marginTop: "60px" }}>
            {/* Connecting Dashed Line */}
            <div style={{ 
              position: "absolute", 
              top: "60px", 
              left: "10%", 
              right: "10%", 
              height: "2px", 
              borderTop: `2px dashed ${C.border}`, 
              zIndex: 0 
            }} className="mobile-hide" />

            <div className="process-steps-container" style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(6, 1fr)", 
              gap: "20px", 
              position: "relative", 
              zIndex: 1,
              overflowX: "auto",
              paddingBottom: "40px"
            }}>
              {[
                { step: "01", title: "Discovery", icon: <Search />, desc: "Deep-dive audit of your business, market, and competition. We map opportunities first." },
                { step: "02", title: "Strategy", icon: <Target />, desc: "A custom 90-day roadmap with clear KPIs, resource allocation, and risk milestones." },
                { step: "03", title: "Design", icon: <Layers />, desc: "Beautiful, user-centered designs that align with your brand and convert visitors." },
                { step: "04", title: "Execution", icon: <Cpu />, desc: "Cross-functional teams deploy in two-week sprints. Engineering & marketing in sync." },
                { step: "05", title: "Test", icon: <ShieldCheck />, desc: "Rigorous testing across devices and browsers to ensure a flawless experience." },
                { step: "06", title: "Scale", icon: <TrendingUp />, desc: "Monthly reviews, A/B testing, and compounding optimization cycles. Unlimited growth." },
              ].map((p, i) => (
                <div key={i} className="process-step-mobile" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "160px" }}>
                  {/* Circle Bubble */}
                  <div style={{ position: "relative", marginBottom: "32px" }}>
                    <div className="process-circle" style={{ 
                      width: "120px", 
                      height: "120px", 
                      borderRadius: "50%", 
                      background: "#FFFFFF", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "pointer",
                      border: `2px solid ${C.accent}`
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
                      e.currentTarget.style.borderColor = C.accent;
                      e.currentTarget.style.boxShadow = `0 20px 40px ${C.accentGlow}`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor = C.accent;
                      e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.08)";
                    }}
                    >
                      {React.cloneElement(p.icon as React.ReactElement, { size: 36, strokeWidth: 1.5, color: C.accent })}
                    </div>
                    
                    {/* Step Number Label */}
                    <div className="process-step-num" style={{ 
                      position: "absolute", 
                      top: "0", 
                      right: "0", 
                      background: "white", 
                      color: "black", 
                      width: "32px", 
                      height: "32px", 
                      borderRadius: "50%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 800,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      border: `1px solid ${C.border}`,
                      zIndex: 2
                    }}>
                      {p.step}
                    </div>
                  </div>

                  <h3 className="process-card-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "18px", marginBottom: "12px", color: C.text }}>{p.title}</h3>
                  <p className="process-card-desc" style={{ color: C.muted, fontSize: "12px", lineHeight: 1.6, fontWeight: 300, maxWidth: "180px" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="mobile-section" style={{ padding: "80px 6%", background: C.subtle }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "60px" }}>
            <div style={{ width: "60px", height: "2px", background: C.accent }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", fontWeight: 800, letterSpacing: "4px", color: C.accent }}>CLIENT VOICE</span>
          </div>
          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, padding: "44px 38px", borderLeft: i > 0 ? "none" : `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "24px" }}>
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={13} fill={C.accent} color={C.accent} />)}
                </div>
                <p style={{ color: C.muted, fontSize: "14px", lineHeight: 1.8, fontWeight: 300, marginBottom: "28px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
                  <img src={t.image} alt={t.name} style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.accent}20` }} />
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "15px" }}>{t.name}</div>
                    <div style={{ fontSize: "11px", color: C.accent, letterSpacing: "1px", marginTop: "3px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="mobile-section" style={{ padding: "80px 6%", background: "#F5F5F2" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-header-mobile flex-col-mob" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "30px", height: "1px", background: C.accent }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: C.accent }}>SUCCESS STORIES</span>
              </div>
              <h2 className="display-font" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 0.95 }}>
                CASE STUDIES.
              </h2>
            </div>
            <p className="mobile-desc-margin" style={{ maxWidth: "300px", color: C.muted, fontSize: "13px", lineHeight: 1.8, textAlign: "right" }}>
              From 0 to 40+ leads/month. Real results for serious business owners.
            </p>
          </div>

          {/* Row 1: Left to Right */}
          <div style={{ overflow: "hidden", margin: "40px -6% 30px -6%", padding: "20px 0" }}>
            <div className="marquee-row" style={{ display: "flex", width: "max-content", animation: "marquee 50s linear infinite", gap: "30px" }}>
              {[...projects, ...projects].map((p, i) => (
                <div key={i} className="project-card-container" style={{ width: "450px", flexShrink: 0 }}>
                  <div className="project-card" style={{ width: "100%", background: p.color || "#F5F5F0" }}>
                    <img src={p.img} alt={p.title} />
                    <div className="project-overlay">
                      <div className="project-tag-glass">{p.tag}</div>
                      <div className="project-info-glass">
                        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.8rem", margin: 0 }}>{p.title}</h3>
                        <div className="project-details">
                          <p style={{ color: "rgba(240,237,232,0.65)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>{p.desc}</p>
                          <span style={{ background: C.accentDim, border: `1px solid ${C.accent}40`, color: C.accent, padding: "6px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", borderRadius: "1px" }}>{p.metric}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "16px", color: C.text, letterSpacing: "1px" }} className="project-card-title-bottom">{p.title.toUpperCase()}</div>
                    <div style={{ fontSize: "11px", color: C.accent, fontWeight: 700, marginTop: "4px", letterSpacing: "2px" }}>{p.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div style={{ overflow: "hidden", margin: "0 -6% 40px -6%", padding: "20px 0" }}>
            <div className="marquee-row" style={{ display: "flex", width: "max-content", animation: "marquee-reverse 50s linear infinite", gap: "30px" }}>
              {[...projects.slice().reverse(), ...projects.slice().reverse()].map((p, i) => (
                <div key={i} className="project-card-container" style={{ width: "450px", flexShrink: 0 }}>
                  <div className="project-card" style={{ width: "100%", background: p.color || "#F5F5F0" }}>
                    <img src={p.img} alt={p.title} />
                    <div className="project-overlay">
                      <div className="project-tag-glass">{p.tag}</div>
                      <div className="project-info-glass">
                        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.8rem", margin: 0 }}>{p.title}</h3>
                        <div className="project-details">
                          <p style={{ color: "rgba(240,237,232,0.65)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>{p.desc}</p>
                          <span style={{ background: C.accentDim, border: `1px solid ${C.accent}40`, color: C.accent, padding: "6px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", borderRadius: "1px" }}>{p.metric}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "16px", color: C.text, letterSpacing: "1px" }} className="project-card-title-bottom">{p.title.toUpperCase()}</div>
                    <div style={{ fontSize: "11px", color: C.accent, fontWeight: 700, marginTop: "4px", letterSpacing: "2px" }}>{p.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="about" ref={sectionRef} className="mobile-section" style={{ padding: "80px 6%", borderBottom: `1px solid ${C.border}` }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
          {[
            { num: 5, suffix: "+", label: "Enterprise Clients", sub: "Across 8 Industries" },
            { num: 300, suffix: "+", label: "Projects Deployed", sub: "Since 2019" },
            { num: 187, suffix: "%", label: "Avg Revenue Growth", sub: "Year 1 Client Avg" },
            { num: 6, suffix: "Yrs", label: "Of Execution", sub: "No Excuses" },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{ borderLeft: i === 0 ? `1px solid ${C.border}` : "none", borderRight: `1px solid ${C.border}` }}>
              <div className="display-font" style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", color: C.text, lineHeight: 1 }}>
                <AnimatedNumber value={s.num} />
                <span style={{ color: C.accent }}>{s.suffix}</span>
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "13px", marginTop: "14px", letterSpacing: "0.5px" }}>{s.label}</div>
              <div style={{ fontSize: "11px", color: C.muted, marginTop: "4px", letterSpacing: "1px" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI ADVANTAGE SECTION — DARK IMMERSIVE ── */}
      <section className="ai-section-dark mobile-section" style={{
        padding: "120px 6%",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(165deg, #0A0A1A 0%, #111128 40%, #0D0D20 100%)",
      }}>
        {/* Animated mesh background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "10%", left: "20%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 60%)", pointerEvents: "none", animation: "floatUp 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "15%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 60%)", pointerEvents: "none", animation: "floatUp 10s ease-in-out infinite 2s" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
              padding: "10px 24px", borderRadius: "100px",
              animation: "borderGlow 3s ease infinite",
            }}>
              <Cpu size={15} color="#818CF8" strokeWidth={2.5} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 800, letterSpacing: "2.5px", color: "#818CF8" }}>THE AI ADVANTAGE</span>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, textAlign: "center", marginBottom: "12px", color: "#FFFFFF" }}>
            WE WORK{" "}
            <span style={{
              background: "linear-gradient(135deg, #818CF8, #D4A017, #818CF8)",
              backgroundSize: "200% 200%",
              animation: "gradientShift 4s ease infinite",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>WITH AI.</span>
          </h2>
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, textAlign: "center", marginBottom: "32px", color: "rgba(255,255,255,0.3)" }}>
            NOT AGAINST IT.
          </h2>

          {/* Manifesto Text */}
          <p className="ai-manifesto-text" style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.6)",
            fontSize: "18px",
            lineHeight: 1.8,
            maxWidth: "680px",
            margin: "0 auto 60px",
            fontWeight: 300,
          }}>
            While your competitors are still <strong style={{ color: "rgba(255,255,255,0.9)" }}>debating</strong> whether to use AI,
            our clients are already <strong style={{ color: "#818CF8" }}>deploying it</strong>.
            We don't bolt AI on as an afterthought — we build it into the foundation.
          </p>

          {/* Comparison Grid — Others vs Us */}
          <div className="ai-comparison-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "800px", margin: "0 auto 60px" }}>
            {/* Others Column */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "32px 28px",
            }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.3)", marginBottom: "24px" }}>OTHER AGENCIES</div>
              {[
                "Templates & cookie-cutter websites",
                "Manual data entry & reporting",
                "Static marketing campaigns",
                "React to problems after they happen",
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: idx < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <X size={14} color="#EF4444" style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>{item}</span>
                </div>
              ))}
            </div>
            {/* Us Column */}
            <div style={{
              background: "linear-gradient(165deg, rgba(99,102,241,0.08) 0%, rgba(212,160,23,0.05) 100%)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "20px",
              padding: "32px 28px",
              animation: "aiGlow 4s ease infinite",
            }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: "#818CF8", marginBottom: "24px" }}>AVANI ENTERPRISES</div>
              {[
                "AI-architected, custom-built systems",
                "Agentic AI automating your workflows",
                "Self-optimizing campaigns & funnels",
                "Predict & prevent before issues arise",
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: idx < 3 ? "1px solid rgba(99,102,241,0.1)" : "none" }}>
                  <CheckCircle size={14} color="#818CF8" style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px", maxWidth: "960px", margin: "0 auto 60px" }} className="ai-pills-grid">
            {[
              { icon: <Cpu size={24} />, label: "Agentic AI", stat: "10x", statLabel: "Faster Execution", desc: "Self-executing AI agents that handle tasks, make decisions, and learn from outcomes — autonomously." },
              { icon: <Activity size={24} />, label: "Predictive Intelligence", stat: "24/7", statLabel: "Real-time Monitoring", desc: "AI-powered analytics that don't just report what happened — they predict what's coming next." },
              { icon: <Zap size={24} />, label: "Smart Automation", stat: "85%", statLabel: "Tasks Automated", desc: "From lead capture to follow-ups to invoicing — AI handles the boring stuff so your team can focus on growth." },
            ].map((item, idx) => (
              <div key={idx} className="ai-hero-card">
                <div style={{
                  width: "52px", height: "52px", borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(212,160,23,0.1))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px", color: "#818CF8",
                }}>
                  {item.icon}
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "15px", marginBottom: "6px", color: "#FFFFFF", letterSpacing: "0.3px" }}>{item.label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "14px" }}>
                  <span className="display-font" style={{ fontSize: "2rem", color: "#818CF8", lineHeight: 1 }}>{item.stat}</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "1.5px", color: "rgba(255,255,255,0.4)" }}>{item.statLabel}</span>
                </div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Bold CTA */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.35)", marginBottom: "24px" }}>
              YOUR COMPETITORS ARE ALREADY USING AI. ARE YOU?
            </p>
            <div className="ai-cta-row" style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
              <button onClick={() => openModal("Premium Plan")} className="cta-btn" style={{
                padding: "18px 40px",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                border: "none",
                borderRadius: "6px",
                color: "#FFFFFF",
                boxShadow: "0 8px 30px rgba(99,102,241,0.4)",
              }}>
                GET AI-POWERED GROWTH <ArrowRight size={16} />
              </button>
              <a href="tel:+919311967319" style={{
                padding: "18px 32px",
                fontSize: "13px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                letterSpacing: "1.5px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "6px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                TALK TO US <Phone size={16} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="solutions" className="mobile-section" style={{ padding: "80px 6%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-header-mobile flex-col-mob" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "80px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "30px", height: "1px", background: C.accent }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: C.accent }}>WHAT WE DO</span>
              </div>
              <h2 className="display-font" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 0.95 }}>
                SIX DIVISIONS.<br />ONE MISSION.
              </h2>
            </div>
            <p className="mobile-desc-margin" style={{ maxWidth: "320px", color: C.muted, fontSize: "14px", lineHeight: 1.8, fontWeight: 300 }}>
              Each division operates as an independent center of excellence, combining to deliver integrated solutions no single-service agency can match.
            </p>
          </div>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", alignItems: "stretch" }}>
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon-wrapper">
                  {React.cloneElement(s.icon, { size: 30, strokeWidth: 1.5 })}
                </div>
                <div className="service-tag">{s.tag}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-features">
                  {s.features.map((f, idx) => (
                    <div key={idx} className="service-feature-item">
                      <CheckCircle size={13} color={C.accent} strokeWidth={2.5} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* ── FAQ ── */}
      <section id="faq" className="mobile-section" style={{ padding: "80px 6%" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "30px", height: "1px", background: C.accent }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: C.accent }}>COMMON QUESTIONS</span>
          </div>
          <h2 className="display-font" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "60px" }}>NEED ANSWERS?</h2>
          <div>
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? "active" : ""}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0", cursor: "pointer" }} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "16px" }}>{f.q}</span>
                  <div style={{ width: "28px", height: "28px", border: `1px solid ${activeFaq === i ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.3s" }}>
                    <ChevronDown size={14} color={activeFaq === i ? C.accent : C.muted} style={{ transition: "transform 0.3s", transform: activeFaq === i ? "rotate(180deg)" : "none" }} />
                  </div>
                </div>
                {activeFaq === i && (
                  <div style={{ paddingBottom: "28px", color: C.muted, fontSize: "14px", lineHeight: 1.8, fontWeight: 300 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="mobile-section cta-band-section" style={{ padding: "80px 6%", background: C.accent, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="cta-band" style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto", gap: "40px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>READY TO SCALE?</div>
            <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "white", lineHeight: 0.95 }}>
              LET'S BUILD YOUR<br />NEXT CHAPTER.
            </h2>
          </div>
          <div className="cta-band-btns" style={{ display: "flex", gap: "16px" }}>
            <button onClick={() => scrollToPricing()} style={{ background: "white", color: "#1A1A2E", border: "none", padding: "18px 36px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "1.5px", cursor: "pointer", transition: "all 0.3s", borderRadius: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
              START YOUR BUSINESS JOURNEY NOW <ArrowRight size={16} />
            </button>
            <a href="tel:+919311967319" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.4)", padding: "18px 36px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              CALL NOW <Phone size={16} />
            </a>
          </div>
        </div>
      </section>



      {/* ── MODAL ── */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(10px)" }}>
          <div style={{ background: "#FFFFFF", width: "100%", maxWidth: "520px", border: `1px solid ${C.border}`, position: "relative", maxHeight: "90vh", overflowY: "auto", borderRadius: "12px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ background: C.accent, padding: "30px 40px" }}>
              <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.3)", border: "none", color: "white", cursor: "pointer", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                <X size={16} />
              </button>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "3px", color: "rgba(0,0,0,0.5)", marginBottom: "8px" }}>BUSINESS SETUP SESSION</div>
              <h2 className="display-font" style={{ fontSize: "2.2rem", color: "#000", lineHeight: 1 }}>BOOK YOUR STRATEGY SESSION</h2>
            </div>

            <div style={{ padding: "40px" }}>
              {/* <p style={{ color: C.muted, fontSize: "13px", lineHeight: 1.7, marginBottom: "32px" }}>
                You are securing a slot for the <strong>{formData.plan}</strong>. Complete the form below to book your session at the special rate of <strong>₹{PLAN_PRICES[formData.plan]}</strong>.
              </p> */}

              <form style={{ display: "flex", flexDirection: "column", gap: "14px" }} onSubmit={handleFormSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <input type="text" placeholder="First Name" required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                  <input type="text" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                </div>
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input type="tel" placeholder="WhatsApp / Phone" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <input type="text" placeholder="Company / Business Name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                <textarea placeholder="Briefly describe your goals and current challenges..." rows={3} value={formData.goals} onChange={e => setFormData({ ...formData, goals: e.target.value })} />
                <button type="submit" className="cta-btn" style={{ width: "100%", padding: "18px", fontSize: "13px", letterSpacing: "2px", marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  SECURE SLOT — ₹{PLAN_PRICES[formData.plan] ?? 199} <ArrowRight size={16} />
                </button>
                <p style={{ textAlign: "center", color: C.muted, fontSize: "10px", letterSpacing: "0.5px", marginTop: "8px" }}>
                  Secure payment via Razorpay. Instant confirmation.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* ── PAYMENT MODAL ── */}
      {paymentState !== "none" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(15px)" }}>
          <div style={{ background: "#FFFFFF", width: "100%", maxWidth: "420px", border: `1px solid ${C.border}`, padding: "50px 40px", textAlign: "center", borderRadius: "12px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            {paymentState === "processing" && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ 
                  width: "50px", 
                  height: "50px", 
                  border: `3px solid ${C.border}`, 
                  borderTop: `3px solid ${C.accent}`, 
                  borderRadius: "50%", 
                  animation: "shimmer 1s linear infinite",
                  margin: "0 auto 20px" 
                }} />
                <h3 style={{ fontSize: "18px", marginBottom: "10px", color: C.text }}>Processing Payment</h3>
                <p style={{ color: C.muted, fontSize: "14px" }}>Please wait while we connect to Razorpay...</p>
              </div>
            )}

            {paymentState === "success" && (
              <>
                <div style={{ color: "#16A34A", marginBottom: "24px", display: "flex", justifyContent: "center" }}><CheckCircle size={64} /></div>
                <h2 className="display-font" style={{ fontSize: "2rem", marginBottom: "16px" }}>PAYMENT SUCCESS</h2>
                <p style={{ color: C.muted, fontSize: "14px", marginBottom: "32px" }}>Your request has been prioritized. Our team will contact you within 12 hours.</p>
                <button onClick={() => setPaymentState("none")} className="ghost-btn" style={{ width: "100%" }}>CLOSE</button>
              </>
            )}

            {paymentState === "fail" && (
              <>
                <div style={{ color: "#D50000", marginBottom: "24px", display: "flex", justifyContent: "center" }}><ShieldAlert size={64} /></div>
                <h2 className="display-font" style={{ fontSize: "2rem", marginBottom: "16px" }}>PAYMENT FAILED</h2>
                <p style={{ color: C.muted, fontSize: "14px", marginBottom: "32px" }}>We couldn't process your payment. However, your details are saved, and we will reach out shortly.</p>
                <button onClick={() => setPaymentState("none")} className="ghost-btn" style={{ width: "100%" }}>TRY AGAIN LATER</button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mobile-fab" style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9000 }}>
        <button onClick={() => scrollToPricing()} className="cta-btn" style={{ 
          boxShadow: "0 10px 40px rgba(212,160,23,0.5), 0 0 20px rgba(212,160,23,0.15)", 
          padding: "18px 32px", 
          borderRadius: "4px", 
          display: "flex", 
          alignItems: "center", 
          gap: "12px", 
          fontSize: "14px", 
          fontWeight: "800",
          letterSpacing: "1.5px", 
          animation: "fadeUp 0.8s ease forwards", 
          animationDelay: "1s", 
          opacity: 0,
          border: "none"
        }}>
          <Zap size={18} fill="currentColor" />
          BOOK NOW
        </button>
      </div>

    </div>
  );
}
