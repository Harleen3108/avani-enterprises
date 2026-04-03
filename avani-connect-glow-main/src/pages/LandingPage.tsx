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
import { motion, useInView, useSpring, useTransform } from "framer-motion";

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

// RotatingHooks Component
const RotatingHooks = () => {
  const hooks = [
    [
      { text: "Build Your ", color: "#FFFFFF" },
      { text: "Online Presence. ", color: C.accent },
      { text: "Grow Business ", color: "#FFFFFF" },
      { text: "Faster.", color: C.muted }
    ],
    [
      { text: "We Turn ", color: "#FFFFFF" },
      { text: "Ideas ", color: C.accent },
      { text: "Into ", color: "#FFFFFF" },
      { text: "High-Performing ", color: C.muted },
      { text: "Websites.", color: C.accent }
    ],
    [
      { text: "From ", color: "#FFFFFF" },
      { text: "Clicks ", color: C.accent },
      { text: "to ", color: "#FFFFFF" },
      { text: "Customers ", color: C.muted },
      { text: "— We Make It ", color: "#FFFFFF" },
      { text: "Happen.", color: C.accent }
    ]
  ];
  const [index, setIndex] = React.useState(0);
  const [key, setKey] = React.useState(0); // For forcing re-render of typewriter

  return (
    <Typewriter 
      key={key}
      segments={hooks[index]} 
      delay={60} 
      onComplete={() => {
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % hooks.length);
          setKey(prev => prev + 1);
        }, 3000); // 3 second pause between hooks
      }} 
    />
  );
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

  // Form & Payment State
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", service: "Web Engineering", goals: ""
  });
  const [currentLeadId, setCurrentLeadId] = useState(null);
  const [paymentState, setPaymentState] = useState("none"); // none, processing, success, fail

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

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
    { q: "Do you offer a refund if I'm not satisfied?", a: "We are so confident in our growth plan that if you feel the 30-minute session didn't provide at least 10X the value, we'll refund your ₹499 immediately." },
  ];

  const testimonials = [
    { name: "Rahul Mehta", role: "E-commerce Founder", text: "Initially skeptical about the ₹499 audit, but the growth roadmap was a game-changer. We went from 0 to 42 leads/month in just 3 months.", stars: 5, image: "/review_person1.png" },
    { name: "Priya Sharma", role: "CMO, TextileBridge", text: "The strategy session alone was worth 10X the price. They identified 3 major leaks in our homepage that were costing us lakhs.", stars: 5, image: "/review_person2.png" },
    { name: "Vikram Nair", role: "Business Owner", text: "Finally, a agency that talks numbers, not just aesthetics. The step-by-step lead gen plan is exactly what I needed to scale.", stars: 5, image: "/review_person3.png" },
  ];
  // Plan payment handler for pricing table
  const handlePlanPayment = (planName: string, amount: number) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SXJqe5vU40sXGz",
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "Avani Enterprises",
        description: `${planName} - Business Consultation`,
        image: "/avani-logo.jpg",
        handler: function (response: any) {
          setPaymentState("success");
          setTimeout(() => {
            navigate("/thank-you", {
              state: {
                name: "Valued Client",
                service: `${planName} - Business Consultation`
              }
            });
          }, 1500);
        },
        theme: { color: C.accent },
        modal: {
          ondismiss: function () {
            setPaymentState("fail");
          }
        }
      };
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function () {
        setPaymentState("fail");
      });
      rzp1.open();
      setPaymentState("processing");
    } catch (err) {
      alert("Payment initialization failed. Please try again.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let leadId = null;

    try {
      // 1. Attempt to submit lead data to backend immediately
      const res = await fetch(`${API_BASE}/growth-plan-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
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

      // 2. Initialize Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SXJqe5vU40sXGz", // Dynamic key from .env
        amount: 49900, // Amount in paise (₹499)
        currency: "INR",
        name: "Avani Enterprises",
        description: "Growth Plan Strategy Session",
        image: "/avani-logo.jpg",
        handler: function (response: any) {
          // 3. Update status to Completed on payment completion
          updatePaymentStatusById(leadId, "Completed");
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: C.accent
        },
        modal: {
          ondismiss: function () {
            // Payment cancelled, status remains 'Pending'
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

        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #F0F0EC; } ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 2px; }

        @keyframes pulseAlert { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 51, 51, 0.4); } 50% { box-shadow: 0 0 0 10px rgba(255, 51, 51, 0); } }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 20px !important; text-align: center; }
          .hero-text-content { align-items: center !important; }
          .hero-badge { margin: 0 auto 20px auto !important; justify-content: center !important; }
          .hero-desc { margin: 0 auto 30px auto !important; font-size: 1rem !important; }
          .hero-img-col { display: block !important; margin-top: 20px !important; }
          .cta-container { width: 100% !important; align-items: center !important; }
          .hero-cta { width: 100% !important; font-size: 18px !important; padding: 22px !important; box-shadow: 0 4px 20px rgba(212,160,23,0.3) !important; border: 2px solid ${C.accent} !important; }
          .urgency-badge { font-size: 11px !important; padding: 6px 14px !important; animation: pulseAlert 2s infinite !important; }
          .hero-section { min-height: 100vh !important; justify-content: center !important; padding-top: 60px !important; }
          .hero-inner { margin-top: 0 !important; }
          .display-font { font-size: clamp(3rem, 14vw, 5rem) !important; }
          .mobile-hide { display: none !important; }
          
          /* Full Page Mobile Optimization */
          .mobile-section { padding: 60px 6% !important; }
          .flex-col-mob { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; margin-bottom: 40px !important; }
          .mobile-desc-margin { margin-top: 10px !important; text-align: left !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 2px !important; margin: 0 -6% !important; }
          .projects-grid, .process-grid, .testimonials-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .footer-top { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-section { margin-bottom: 20px !important; }
          .mobile-fab { bottom: 20px !important; right: 20px !important; }
          .mobile-fab button { padding: 14px 20px !important; font-size: 11px !important; border-radius: 4px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 30px !important; text-align: left; }
          .cta-band { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
          .cta-band-btns { width: 100%; flex-direction: column !important; gap: 12px !important; display: flex !important; margin-top: 10px !important; }
          .cta-band-btns button, .cta-band-btns a { width: 100%; justify-content: center; margin: 0 !important; }
          .stat-card { padding: 30px 15px !important; border-left: none !important; border-right: 1px solid ${C.border} !important; border-bottom: 1px solid ${C.border} !important; background: ${C.card} !important; }
          .stat-card:nth-child(2n) { border-right: none !important; }
          .project-card { height: auto !important; aspect-ratio: 16/9 !important; border-radius: 6px !important; margin-bottom: 0 !important; border: 1px solid rgba(255,255,255,0.1) !important; transform: none !important; }
          .project-card:hover { transform: none !important; border-color: ${C.border} !important; box-shadow: none !important; }
          .project-overlay { background: linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.5) 80%, transparent 100%) !important; }
          .project-tag-glass { top: 12px !important; left: 12px !important; font-size: 8px !important; padding: 5px 12px !important; }
          .project-info-glass { padding: 30px 16px 16px !important; }
          .project-card h3 { font-size: 1.4rem !important; margin-bottom: 0 !important; }
          .project-details { margin-top: 10px !important; }
          .project-details p { font-size: 11px !important; line-height: 1.5 !important; margin-bottom: 12px !important; color: rgba(240,237,232,0.85) !important; }
          .faq-item { border-bottom: 1px solid ${C.border}; transition: border-color 0.3s; }
          .desktop-services-layout { display: none !important; }
          .mobile-services-layout { display: flex !important; flex-direction: column; gap: 24px; animation: fadeUp 0.6s ease forwards; }
          .service-detail-panel { position: static !important; padding: 30px 20px !important; minHeight: auto !important; }
          .services-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
          .service-card { padding: 30px 24px !important; }
          .service-title { font-size: 20px !important; }
          .service-icon-wrapper { width: 50px !important; height: 50px !important; }
          .section-header-mobile { margin-bottom: 40px !important; }
          .footer-bottom { flex-direction: column !important; text-align: left !important; gap: 15px !important; align-items: flex-start !important; }

          /* Pricing Table Mobile */
          .pricing-grid { grid-template-columns: 1fr !important; gap: 24px !important; max-width: 400px !important; margin: 0 auto !important; }
          .pricing-card { padding: 32px 24px !important; }
          .pricing-card.popular { transform: none !important; }
          .pricing-features-row { font-size: 13px !important; padding: 12px 16px !important; }
        }
      `}</style>

      <nav style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000, height: "70px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6%",
        background: scrolled ? "rgba(250,250,248,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.4s ease",
      }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <img src="/avani-logo.jpg" alt="Avani Enterprises Logo" style={{ width: "40px", height: "40px", objectFit: "contain", borderRadius: "2px" }} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "15px", letterSpacing: "3px", color: C.text }}>AVANI ENTERPRISES</span>
        </a>

        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <div className="nav-links" style={{ display: "flex", gap: "40px", alignItems: "center" }}>
            {["Solutions", "Projects", "About", "FAQ"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l.toUpperCase()}</a>
            ))}
          </div>
          <button onClick={() => setShowModal(true)} className="cta-btn" style={{ padding: "10px 22px", fontSize: "11px" }}>
            START YOUR BUSINESS JOURNEY NOW
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6%", position: "relative", overflow: "hidden" }}>
        {/* Background grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 100%, transparent 0%, ${C.dark} 70%)` }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: "600px", height: "600px", background: `radial-gradient(circle, ${C.accentGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div className="hero-inner" style={{ position: "relative", zIndex: 1, maxWidth: "1400px", width: "100%", marginTop: "100px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", alignItems: "center" }}>
            
            {/* Left Column: Text Content */}
            <div className="hero-line hero-text-content" style={{ display: "flex", flexDirection: "column" }}>
              <div className="hero-badge" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 8px #16A34A", animation: "pulse 2s ease infinite" }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", color: "#16A34A" }}>ACTIVELY ONBOARDING CLIENTS</span>
                </div>
                <div style={{ width: "1px", height: "14px", background: C.border }} className="mobile-hide" />
                <span className="mobile-hide" style={{ fontSize: "10px", letterSpacing: "2px", color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>Melbourne (Australia)  - Bombay - Gurugram</span>
              </div>

              <h1 className="display-font shimmer-text" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "30px", minHeight: "2.4em" }}>
                <RotatingHooks />
              </h1>

              <p className="hero-desc" style={{ fontSize: "1.1rem", color: C.text, lineHeight: 1.75, fontWeight: 300, maxWidth: "480px", marginBottom: "40px" }}>
                We show you how to generate leads in 30 minutes. Transform your digital presence into a high-converting sales system with a proven roadmap.
              </p>

              <div className="cta-container" style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
                <div className="urgency-badge" style={{ background: "rgba(255, 50, 50, 0.1)", border: "1px solid rgba(255, 50, 50, 0.3)", padding: "8px 16px", borderRadius: "2px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF3333", animation: "pulse 1.5s infinite" }} />
                  <span style={{ color: "#FF3333", fontSize: "11px", fontWeight: 800, letterSpacing: "1px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>LAST 3 PLANS LEFT</span>
                </div>
                <button onClick={() => setShowModal(true)} className="cta-btn hero-cta" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "18px 40px" }}>
                  START YOUR BUSINESS JOURNEY NOW <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Column: Video */}
            <div className="hero-line hero-img-col" style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-12px", border: `1px solid ${C.accent}25`, borderRadius: "16px", zIndex: -1 }} />
              <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
                <video 
                  src="/landing.mp4" 
                  autoPlay 
                  loop 
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} 
                />
                
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

        {/* Horizontal ticker */}
        <div style={{ marginTop: "80px", position: "relative", zIndex: 1 }} className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                {["WEB ENGINEERING", "PERFORMANCE ADS", "SEO & CONTENT", "SOCIAL MEDIA", "BUSINESS ADVISORY", "LOANS & INSURANCE", "FINTECH", "E-COMMERCE", "SAAS PRODUCTS"].map((item, j) => (
                  <div key={j} className="marquee-item">
                    <div className="marquee-dot" />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: C.muted }}>{item}</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE ── */}
      <section id="pricing" className="mobile-section" style={{ padding: "80px 6%", background: `linear-gradient(180deg, ${C.dark} 0%, #F0F0EC 50%, ${C.dark} 100%)`, position: "relative", overflow: "hidden" }}>
        {/* Background decorative elements */}
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: `radial-gradient(circle, ${C.accentGlow} 0%, transparent 70%)`, pointerEvents: "none", opacity: 0.15 }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, transparent, ${C.accent})` }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: C.accent }}>CHOOSE YOUR PLAN</span>
              <div style={{ width: "40px", height: "1px", background: `linear-gradient(90deg, ${C.accent}, transparent)` }} />
            </div>
            <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: "20px", lineHeight: 0.95 }}>TRANSPARENT PRICING.</h2>
            <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.8, maxWidth: "550px", margin: "0 auto", fontWeight: 300 }}>
              Simple, fair consultation plans. Pick what suits your business scale — upgrade anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "stretch" }}>
            {[
              {
                name: "Basic Plan",
                price: 149,
                range: "₹1 – ₹9,999",
                desc: "Ideal for micro-businesses and early-stage startups exploring their first package.",
                popular: false,
                features: [
                  { name: "1-on-1 Consultation Call", included: true },
                  { name: "Business Assessment Report", included: true },
                  { name: "Basic Market Overview", included: true },
                  { name: "Competitor Benchmarking", included: false },
                  { name: "Custom Growth Roadmap", included: false },
                  { name: "Implementation Support", included: false },
                  { name: "Priority Support (24/7)", included: false },
                ]
              },
              {
                name: "Standard Plan",
                price: 199,
                range: "₹1 – ₹99,999",
                desc: "Perfect for small to mid-size businesses looking to scale their operations.",
                popular: true,
                features: [
                  { name: "1-on-1 Consultation Call", included: true },
                  { name: "Business Assessment Report", included: true },
                  { name: "Basic Market Overview", included: true },
                  { name: "Competitor Benchmarking", included: true },
                  { name: "Custom Growth Roadmap", included: true },
                  { name: "Implementation Support", included: false },
                  { name: "Priority Support (24/7)", included: false },
                ]
              },
              {
                name: "Premium Plan",
                price: 499,
                range: "₹1 – ₹9,99,999",
                desc: "End-to-end advisory for established businesses with full implementation backing.",
                popular: false,
                features: [
                  { name: "1-on-1 Consultation Call", included: true },
                  { name: "Business Assessment Report", included: true },
                  { name: "Basic Market Overview", included: true },
                  { name: "Competitor Benchmarking", included: true },
                  { name: "Custom Growth Roadmap", included: true },
                  { name: "Implementation Support", included: true },
                  { name: "Priority Support (24/7)", included: true },
                ]
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`pricing-card${plan.popular ? ' popular' : ''}`}
                style={{
                  background: plan.popular ? `linear-gradient(165deg, #FFFFFF 0%, rgba(212,160,23,0.06) 100%)` : C.card,
                  border: `1px solid ${plan.popular ? C.accent + '60' : C.border}`,
                  borderRadius: "12px",
                  padding: "40px 32px",
                  display: "flex",
                  flexDirection: "column" as const,
                  position: "relative" as const,
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: plan.popular ? "scale(1.03)" : "none",
                  boxShadow: plan.popular ? `0 20px 60px ${C.accentGlow}, 0 0 0 1px ${C.accent}30` : "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = plan.popular ? "scale(1.05)" : "translateY(-6px)";
                  e.currentTarget.style.borderColor = C.accent;
                  e.currentTarget.style.boxShadow = `0 20px 60px ${C.accentGlow}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = plan.popular ? "scale(1.03)" : "none";
                  e.currentTarget.style.borderColor = plan.popular ? C.accent + '60' : C.border;
                  e.currentTarget.style.boxShadow = plan.popular ? `0 20px 60px ${C.accentGlow}, 0 0 0 1px ${C.accent}30` : "none";
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: C.accent,
                    color: "#000",
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "2px",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  }}>
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Name */}
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: plan.popular ? C.accent : C.muted, marginBottom: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {plan.name.toUpperCase()}
                </div>

                {/* Price */}
                <div style={{ marginBottom: "8px", display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span className="display-font" style={{ fontSize: "3.5rem", lineHeight: 1, color: C.text }}>₹{plan.price}</span>
                  <span style={{ fontSize: "13px", color: C.muted, fontWeight: 400 }}>/session</span>
                </div>

                {/* Package Range */}
                <div style={{ fontSize: "12px", color: C.accent, fontWeight: 600, letterSpacing: "0.5px", marginBottom: "8px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Package Range: {plan.range}
                </div>

                {/* Description */}
                <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.7, marginBottom: "32px", fontWeight: 300 }}>
                  {plan.desc}
                </p>

                {/* Divider */}
                <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, marginBottom: "28px" }} />

                {/* Features List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "36px", flexGrow: 1 }}>
                  {plan.features.map((feat, fi) => (
                    <div
                      key={fi}
                      className="pricing-features-row"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 16px",
                        fontSize: "14px",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 500,
                        color: feat.included ? C.text : "rgba(255,255,255,0.3)",
                        borderBottom: fi < plan.features.length - 1 ? `1px solid ${C.border}` : "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        flexShrink: 0,
                        background: feat.included ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.08)",
                        color: feat.included ? C.success : C.danger,
                        fontWeight: 700,
                      }}>
                        {feat.included ? "✔" : "✖"}
                      </span>
                      <span style={{ textDecoration: feat.included ? "none" : "line-through", opacity: feat.included ? 1 : 0.5 }}>
                        {feat.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanPayment(plan.name, plan.price)}
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
                    background: plan.popular ? C.accent : "transparent",
                    color: plan.popular ? "#000" : C.text,
                    border: plan.popular ? "none" : `1px solid ${C.border}`,
                    borderRadius: "6px",
                  }}
                  onMouseEnter={e => {
                    if (!plan.popular) {
                      e.currentTarget.style.background = C.accent;
                      e.currentTarget.style.color = "#000";
                      e.currentTarget.style.borderColor = C.accent;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!plan.popular) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = C.text;
                      e.currentTarget.style.borderColor = C.border;
                    }
                  }}
                >
                  PROCEED TO PAYMENT <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p style={{ textAlign: "center", marginTop: "40px", color: C.muted, fontSize: "12px", letterSpacing: "0.5px", fontWeight: 400 }}>
            All plans include GST. Secure payment via Razorpay. Instant confirmation.
          </p>
        </div>
      </section>


      {/* ── STATS COUNTER ── */}
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
                <div key={i} style={{ width: "450px", flexShrink: 0 }}>
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
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "16px", color: C.text, letterSpacing: "1px" }}>{p.title.toUpperCase()}</div>
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
                <div key={i} style={{ width: "450px", flexShrink: 0 }}>
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
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "16px", color: C.text, letterSpacing: "1px" }}>{p.title.toUpperCase()}</div>
                    <div style={{ fontSize: "11px", color: C.accent, fontWeight: 700, marginTop: "4px", letterSpacing: "2px" }}>{p.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="mobile-section" style={{ padding: "80px 6%", borderTop: `1px solid ${C.border}` }}>
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
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "160px" }}>
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
                    <div style={{ 
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

                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "18px", marginBottom: "12px", color: C.text }}>{p.title}</h3>
                  <p style={{ color: C.muted, fontSize: "12px", lineHeight: 1.6, fontWeight: 300, maxWidth: "180px" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="mobile-section" style={{ padding: "80px 6%", background: C.subtle }}>
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
            <button onClick={() => setShowModal(true)} style={{ background: "white", color: "#1A1A2E", border: "none", padding: "18px 36px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "1.5px", cursor: "pointer", transition: "all 0.3s", borderRadius: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
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
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "3px", color: "rgba(0,0,0,0.5)", marginBottom: "8px" }}>₹499 SPECIAL OFFER</div>
              <h2 className="display-font" style={{ fontSize: "2.2rem", color: "#000", lineHeight: 1 }}>GET YOUR GROWTH PLAN</h2>
            </div>

            <div style={{ padding: "40px" }}>
              <p style={{ color: C.muted, fontSize: "13px", lineHeight: 1.7, marginBottom: "32px" }}>
                Complete the form below to secure your 30-minute Strategy Session. Includes Audit, Roadmap & <strong>Bonus Homepage Audit</strong>.
              </p>
              <form style={{ display: "flex", flexDirection: "column", gap: "14px" }} onSubmit={handleFormSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <input type="text" placeholder="First Name" required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                  <input type="text" placeholder="Last Name" required value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                </div>
                <input type="email" placeholder="Business Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input type="tel" placeholder="WhatsApp / Phone" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <input type="text" placeholder="Company / Business Name" required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                  <option>Web Engineering</option>
                  <option>Performance Marketing</option>
                  <option>SEO & Content</option>
                  <option>Social Media</option>
                  <option>Business Advisory</option>
                  <option>Loans & Insurance</option>
                  <option>Full Package</option>
                </select>
                <textarea placeholder="Briefly describe your goals and current challenges..." rows={4} value={formData.goals} onChange={e => setFormData({ ...formData, goals: e.target.value })} />
                <button type="submit" className="cta-btn" style={{ width: "100%", padding: "18px", fontSize: "13px", letterSpacing: "2px", marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  SECURE SLOT FOR ₹499 <ArrowRight size={16} />
                </button>
                <p style={{ textAlign: "center", color: C.muted, fontSize: "10px", letterSpacing: "0.5px", marginTop: "8px" }}>
                  Limited slots available this week. Only serious inquiries.
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

      {/* ── FLOATING BOOK NOW BUTTON ── */}
      <div className="mobile-fab" style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9000 }}>
        <button onClick={() => setShowModal(true)} className="cta-btn" style={{ 
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
