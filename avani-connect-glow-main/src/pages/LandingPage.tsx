import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap, ArrowRight, CheckCircle, BarChart3, Globe, Megaphone,
  Shield, Target, Cpu, Layers, Phone, Mail, MapPin,
  Clock, Star, X, Calendar, Search, Briefcase, ShieldCheck,
  ChevronDown, MessageSquare, Activity, ShieldAlert, ArrowUpRight,
  TrendingUp, Code2, Users, Award, Play, ChevronRight,
  Linkedin, Twitter, Instagram, ExternalLink, Menu
} from "lucide-react";

const C = {
  accent: "#E1AD01",
  accentLight: "#FFD700",
  accentDim: "rgba(225,173,1,0.12)",
  dark: "#030303",
  card: "#0A0A0A",
  cardHover: "#0F0F0F",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(225,173,1,0.4)",
  text: "#F0EDE8",
  muted: "#888888",
  subtle: "#1A1A1A",
};

// Typewriter Component
const Typewriter = ({ text, delay = 100, startDelay = 0, onComplete }: any) => {
  const [currentText, setCurrentText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  React.useEffect(() => {
    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (started && currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, started, onComplete]);

  return (
    <span>
      {currentText}
      {started && currentIndex < text.length && <span style={{ borderRight: "4px solid " + C.accent, marginLeft: "4px", animation: "blink 1s step-end infinite" }}>&nbsp;</span>}
    </span>
  );
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
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [activePlanDetail, setActivePlanDetail] = useState(null);
  const [counter, setCounter] = useState({ clients: 0, projects: 0, growth: 0, years: 0 });
  const counterRef = useRef(null);
  const [counted, setCounted] = useState(false);

  // Form & Payment State
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", service: "Web Engineering", goals: ""
  });
  const [currentLeadId, setCurrentLeadId] = useState(null);
  const [paymentState, setPaymentState] = useState("none"); // none, processing, success, fail

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted) {
        setCounted(true);
        const targets = { clients: 85, projects: 300, growth: 187, years: 6 };
        Object.keys(targets).forEach(key => {
          let start = 0;
          const end = targets[key];
          const step = end / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { clearInterval(timer); start = end; }
            setCounter(prev => ({ ...prev, [key]: Math.floor(start) }));
          }, 25);
        });
      }
    }, { threshold: 0.3 });
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [counted]);

  const services = [
    { icon: <Code2 />, title: "Web Engineering", tag: "MERN / NEXT.JS", desc: "We architect full-stack platforms that handle millions of requests. From fintech dashboards to e-commerce ecosystems, our engineering teams build for scale, performance, and conversion.", features: ["Custom MERN Stack Apps", "E-commerce Platforms", "SaaS Products", "API Architecture"] },
    { icon: <TrendingUp />, title: "Performance Marketing", tag: "PAID ADS / META / GOOGLE", desc: "Every rupee spent is tracked, optimized, and scaled. Our performance teams run data-driven campaigns that consistently deliver 4x-10x ROAS across verticals.", features: ["Meta & Google Ads", "Retargeting Funnels", "Landing Page CRO", "Attribution Modeling"] },
    { icon: <Search />, title: "SEO & Content", tag: "ORGANIC GROWTH", desc: "Sustainable, compounding organic traffic from technical SEO, content strategy, and authority building that works 24/7 — no ad spend required.", features: ["Technical SEO Audits", "Content Architecture", "Link Building", "Local SEO"] },
    { icon: <MessageSquare />, title: "Social Media", tag: "BRAND & COMMUNITY", desc: "We run social media channels like media companies — strategic content calendars, community management, and influencer activations that build brand equity.", features: ["Content Creation", "Community Management", "Influencer Outreach", "Analytics Reporting"] },
    { icon: <Briefcase />, title: "Business Advisory", tag: "STRATEGY & OPS", desc: "C-suite level strategic advisory to fix operational bottlenecks, enter new markets, and architect revenue models that sustain exponential growth.", features: ["Revenue Strategy", "Market Entry", "Operations Consulting", "KPI Framework"] },
    { icon: <ShieldCheck />, title: "Loans & Insurance", tag: "CAPITAL & PROTECTION", desc: "Structured access to business financing and comprehensive corporate insurance coverage. We've helped clients unlock ₹50Cr+ in institutional capital.", features: ["Business Loans", "Working Capital", "Corporate Insurance", "Risk Assessment"] },
  ];

  const projects = [
    { tag: "ERP / WEB APP", title: "School Management", desc: "A full-featured web application designed to modernize school operations and administration. It automates core tasks, including digital attendance tracking, seamless timetable generation, and secure online fee management. The system features dedicated, role-based access for Admin, Teacher, and Parent users. This setup allows for real-time data analytics to significantly boost institutional efficiency and stakeholder communication.", metric: "100+ Schools", img: "/school.jpg", color: "#1a2a1a" },
    { tag: "E-COMMERCE", title: "Shoe E-Commerce", desc: "Developed a feature-rich footwear e-commerce platform optimized for a modern shopping experience. Key functionalities include stunning 3D product previews and a smooth, secure cart-to-checkout process. The system also features smart inventory management and admin/delivery dashboards. It allows for advanced features like order rescheduling, refund tracking, and analytics-driven business insights.", metric: "3D Integration", img: "/shoe.jpg", color: "#1a1a2a" },
    { tag: "SAAS / ERP", title: "HR Portal", desc: "A comprehensive HR management system built to streamline and automate workforce operations. It includes robust features for attendance tracking, efficient leave management, and automated payroll processing. The platform provides employee performance analytics, secure document handling, and internal communication tools. All functions are governed by dedicated role-based access dashboards.", metric: "Automated Payroll", img: "/hrportal.png", color: "#1a2218" },
    { tag: "HEALTHCARE", title: "Hospital Website", desc: "Developed a comprehensive web platform for Holy Heart Hospital, specializing in advanced cardiac care. The system integrates an AI Chatbot ('HealthBot') for instant support and efficient appointment booking. Features include secure online OPD booking, integrated with Razorpay. It provides a robust Admin analytics dashboard and patient portals for managing orders and downloading invoices.", metric: "Razorpay + AI", img: "/hospital.jpg", color: "#22181a" },
    { tag: "REAL ESTATE", title: "Hi-tech Property", desc: "A professional, full-service property management portal designed to centralize real estate operations. The platform features an extensive listing module for showcasing available properties with high-quality media. It includes robust lead capture tools to streamline client inquiries and follow-ups effectively. Dedicated admin tools are provided to ensure efficient management of listings, client data, and workflows.", metric: "Lead Capture", img: "/hitechproperty.jpg", color: "#1a1f2a" },
  ];

  const faqs = [
    { q: "What exactly do I get in the ₹499 Growth Plan?", a: "You get a 30-minute 1-on-1 strategy call, a comprehensive website audit, a competitor analysis report, a custom lead generation roadmap, and a bonus Homepage performance audit." },
    { q: "Is this for new or existing businesses?", a: "Both. If you're new, we help you launch with trust. If you're existing, we show you how to optimize and scale your current lead flow." },
    { q: "Why is the price so low?", a: "We believe in building trust first. This low-ticket entry allows us to demonstrate our expertise. If you like the plan, you can choose to work with us for implementation." },
    { q: "What happens after I pay?", a: "You'll receive an instant confirmation. Our team will reach out via WhatsApp/Email within 24 hours to schedule your session at your convenience." },
    { q: "Do you offer a refund if I'm not satisfied?", a: "We are so confident in our growth plan that if you feel the 30-minute session didn't provide at least 10X the value, we'll refund your ₹499 immediately." },
  ];

  const testimonials = [
    { name: "Rahul Mehta", role: "E-commerce Founder", text: "Initially skeptical about the ₹499 audit, but the growth roadmap was a game-changer. We went from 0 to 42 leads/month in just 3 months.", stars: 5 },
    { name: "Priya Sharma", role: "CMO, TextileBridge", text: "The strategy session alone was worth 10X the price. They identified 3 major leaks in our homepage that were costing us lakhs.", stars: 5 },
    { name: "Vikram Nair", role: "Business Owner", text: "Finally, a agency that talks numbers, not just aesthetics. The step-by-step lead gen plan is exactly what I needed to scale.", stars: 5 },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Submit lead data to backend immediately (captures lead even if payment is cancelled)
      const res = await fetch(`${API_BASE}/growth-plan-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const lead = await res.json();
      setCurrentLeadId(lead._id);
      setShowModal(false);

      // 2. Initialize Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SGgUxNXJPhFnL7", // Dynamic key from .env
        amount: 49900, // Amount in paise (₹499)
        currency: "INR",
        name: "Avani Enterprises",
        description: "Growth Plan Strategy Session",
        image: "/avani-logo.jpg",
        handler: function (response: any) {
          // 3. Update status to Completed on payment completion
          updatePaymentStatusById(lead._id, "Completed");
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
        updatePaymentStatusById(lead._id, "Failed");
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
          color: rgba(240,237,232,0.6); text-decoration: none; font-size: 12px;
          font-weight: 500; letter-spacing: 1px; transition: color 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .nav-link:hover { color: ${C.text}; }

        .service-tab { cursor: pointer; padding: 18px 0; border-bottom: 1px solid ${C.border}; transition: all 0.3s; display: flex; align-items: center; justify-content: space-between; }
        .service-tab.active { border-bottom-color: ${C.accent}; }
        .service-tab:hover .tab-title { color: ${C.text}; }

        .project-card { position: relative; overflow: hidden; border-radius: 8px; cursor: pointer; aspect-ratio: 16/9; background: #0A0A0A; border: 1px solid rgba(255,255,255,0.06); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .project-card img { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); filter: brightness(0.8) saturate(0.9); }
        .project-card:hover { border-color: rgba(225,173,1,0.3); box-shadow: 0 10px 40px rgba(225,173,1,0.12); transform: translateY(-4px); z-index: 10; }
        .project-card:hover img { transform: scale(1.05); filter: brightness(0.4) saturate(0.8); }
        .project-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; opacity: 0; transition: opacity 0.4s ease; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%); }
        .project-card:hover .project-overlay { opacity: 1; }
        .project-tag-glass { position: absolute; top: 24px; left: 24px; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15); padding: 8px 18px; border-radius: 30px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: ${C.accent}; transition: all 0.5s ease; z-index: 2; transform: translateY(-15px); }
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
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
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

        .cta-btn { background: ${C.accent}; color: #000; border: none; padding: 16px 32px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: 1.5px; cursor: pointer; transition: all 0.3s; border-radius: 1px; text-transform: uppercase; }
        .cta-btn:hover { background: ${C.accentLight}; transform: translateY(-1px); box-shadow: 0 12px 40px rgba(225,173,1,0.3); }

        .ghost-btn { background: transparent; color: ${C.text}; border: 1px solid ${C.border}; padding: 16px 32px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; cursor: pointer; transition: all 0.3s; border-radius: 1px; }
        .ghost-btn:hover { border-color: ${C.text}; }

        .stat-card { background: ${C.card}; border: 1px solid ${C.border}; padding: 40px 35px; transition: all 0.4s; }
        .stat-card:hover { border-color: ${C.accent}; background: rgba(225,173,1,0.04); }

        .marquee-wrap { display: flex; overflow: hidden; border-top: 1px solid ${C.border}; border-bottom: 1px solid ${C.border}; padding: 20px 0; }
        .marquee-track { display: flex; gap: 0; animation: marquee 25s linear infinite; white-space: nowrap; }
        .marquee-item { display: flex; align-items: center; gap: 25px; padding: 0 40px; }
        .marquee-dot { width: 5px; height: 5px; background: ${C.accent}; border-radius: 50%; flex-shrink: 0; }

        input, select, textarea { background: #0D0D0D !important; border: 1px solid ${C.border} !important; border-radius: 1px; color: ${C.text} !important; padding: 14px 16px !important; outline: none !important; width: 100%; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; transition: border-color 0.2s; }
        input:focus, select:focus, textarea:focus { border-color: ${C.accent} !important; }
        input::placeholder, textarea::placeholder { color: ${C.muted} !important; }
        select option { background: #111; }

        .hero-line { animation: fadeUp 0.8s ease forwards; opacity: 0; }
        .hero-line:nth-child(1) { animation-delay: 0.1s; }
        .hero-line:nth-child(2) { animation-delay: 0.25s; }
        .hero-line:nth-child(3) { animation-delay: 0.4s; }
        .hero-line:nth-child(4) { animation-delay: 0.55s; }

        .shimmer-text {
          background: linear-gradient(90deg, ${C.text} 0%, rgba(240,237,232,0.4) 40%, ${C.text} 60%, rgba(240,237,232,0.4) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${C.dark}; } ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 2px; }

        @keyframes pulseAlert { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 51, 51, 0.4); } 50% { box-shadow: 0 0 0 10px rgba(255, 51, 51, 0); } }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 20px !important; text-align: center; }
          .hero-text-content { align-items: center !important; }
          .hero-badge { margin: 0 auto 20px auto !important; justify-content: center !important; }
          .hero-desc { margin: 0 auto 30px auto !important; font-size: 1rem !important; }
          .hero-img-col { display: none !important; }
          .cta-container { width: 100% !important; align-items: center !important; }
          .hero-cta { width: 100% !important; font-size: 18px !important; padding: 22px !important; box-shadow: 0 0 30px rgba(225,173,1,0.5) !important; border: 2px solid ${C.accentLight} !important; }
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
          .stat-card { padding: 30px 15px !important; border-left: none !important; border-right: 1px solid ${C.border} !important; border-bottom: 1px solid ${C.border} !important; }
          .stat-card:nth-child(2n) { border-right: none !important; }
          .project-card { height: auto !important; aspect-ratio: 16/9 !important; border-radius: 6px !important; margin-bottom: 0 !important; border: 1px solid rgba(255,255,255,0.1) !important; transform: none !important; }
          .project-card:hover { transform: none !important; border-color: rgba(255,255,255,0.1) !important; box-shadow: none !important; }
          .project-overlay { background: linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.6) 80%, transparent 100%) !important; }
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
        }
      `}</style>

      <nav style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000, height: "70px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6%",
        background: scrolled ? "rgba(3,3,3,0.92)" : "transparent",
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
            BOOK PLAN
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6%", position: "relative", overflow: "hidden" }}>
        {/* Background grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: "80px 80px", opacity: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 100%, transparent 0%, #030303 70%)" }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(225,173,1,0.06) 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div className="hero-inner" style={{ position: "relative", zIndex: 1, maxWidth: "1400px", width: "100%", marginTop: "100px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", alignItems: "center" }}>
            
            {/* Left Column: Text Content */}
            <div className="hero-line hero-text-content" style={{ display: "flex", flexDirection: "column" }}>
              <div className="hero-badge" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00E676", boxShadow: "0 0 8px #00E676", animation: "pulse 2s ease infinite" }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", color: "#00E676" }}>ACTIVELY ONBOARDING CLIENTS</span>
                </div>
                <div style={{ width: "1px", height: "14px", background: C.border }} className="mobile-hide" />
                <span className="mobile-hide" style={{ fontSize: "10px", letterSpacing: "2px", color: C.muted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>MUMBAI, INDIA · EST. 2019</span>
              </div>

              <h1 className="display-font" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 0.95, letterSpacing: "-1px", marginBottom: "10px" }}>
                <Typewriter text="GET YOUR WEBSITE" delay={50} />
              </h1>
              <h1 className="display-font shimmer-text" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 0.95, letterSpacing: "-1px", marginBottom: "30px" }}>
                <Typewriter text="GROWTH PLAN IN JUST ₹499" delay={70} startDelay={1000} />
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
                  BOOK PLAN NOW <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="hero-line hero-img-col" style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-20px", border: `1px solid ${C.accent}20`, borderRadius: "10px", zIndex: -1 }} />
              <img src="/kp1.png" alt="kp1" style={{ width: "100%", height: "auto", borderRadius: "1px", filter: "contrast(1.1)" }} />
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

      {/* ── WHAT YOU GET SECTION ── */}
      <section className="mobile-section" style={{ padding: "80px 6%", background: "#0A0A0A", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "30px", height: "1px", background: C.accent }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: C.accent }}>TRANSPARENT VALUE</span>
            <div style={{ width: "30px", height: "1px", background: C.accent }} />
          </div>
          <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "30px" }}>WHAT YOU GET IN ₹499</h2>
          <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>
            No fluff. No generic advice. Just actionable data and a deterministic plan to grow your revenue.
          </p>
          <button onClick={() => setShowPlanDetailsModal(true)} className="ghost-btn" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "18px 40px", borderColor: C.accent, color: C.accent }}>
            VIEW FULL DELIVERABLES <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section id="about" ref={counterRef} className="mobile-section" style={{ padding: "80px 6%", borderBottom: `1px solid ${C.border}` }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
          {[
            { num: counter.clients, suffix: "+", label: "Enterprise Clients", sub: "Across 8 Industries" },
            { num: counter.projects, suffix: "+", label: "Projects Deployed", sub: "Since 2019" },
            { num: counter.growth, suffix: "%", label: "Avg Revenue Growth", sub: "Year 1 Client Avg" },
            { num: counter.years, suffix: "Yrs", label: "Of Execution", sub: "No Excuses" },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{ borderLeft: i === 0 ? `1px solid ${C.border}` : "none", borderRight: `1px solid ${C.border}` }}>
              <div className="display-font" style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", color: C.text, lineHeight: 1 }}>
                {s.num}<span style={{ color: C.accent }}>{s.suffix}</span>
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "13px", marginTop: "14px", letterSpacing: "0.5px" }}>{s.label}</div>
              <div style={{ fontSize: "11px", color: C.muted, marginTop: "4px", letterSpacing: "1px" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="solutions" className="mobile-section" style={{ padding: "140px 6%" }}>
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
                <button onClick={() => setShowModal(true)} className="cta-btn" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontSize: "12px", padding: "16px" }}>
                  GET THIS FOR ₹499 <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="mobile-section" style={{ padding: "140px 6%", background: "#050505" }}>
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

          {/* Featured project */}
          <div className="project-card" style={{ marginBottom: "30px", background: projects[0].color || "#0A0A0A" }}>
            <img src={projects[0].img} alt={projects[0].title} />
            <div className="project-overlay">
              <div className="project-tag-glass">{projects[0].tag}</div>
              <div className="project-info-glass">
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3.5rem)", margin: 0 }}>{projects[0].title}</h3>
                <div className="project-details">
                  <p style={{ color: "rgba(240,237,232,0.75)", fontSize: "16px", lineHeight: 1.7, marginBottom: "24px", maxWidth: "800px" }}>{projects[0].desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ background: C.accentDim, border: `1px solid ${C.accent}50`, color: C.accent, padding: "8px 18px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", borderRadius: "1px" }}>{projects[0].metric}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of 4 */}
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px" }}>
            {projects.slice(1).map((p, i) => (
              <div key={i} className="project-card" style={{ background: p.color || "#0A0A0A" }}>
                <img src={p.img} alt={p.title} />
                <div className="project-overlay">
                  <div className="project-tag-glass" style={{ fontSize: "9px", padding: "6px 14px", top: "20px", left: "20px" }}>{p.tag}</div>
                  <div className="project-info-glass" style={{ padding: "50px 30px 30px" }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.8rem", margin: 0 }}>{p.title}</h3>
                    <div className="project-details">
                      <p style={{ color: "rgba(240,237,232,0.65)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>{p.desc}</p>
                      <span style={{ background: C.accentDim, border: `1px solid ${C.accent}40`, color: C.accent, padding: "6px 14px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", borderRadius: "1px" }}>{p.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="mobile-section" style={{ padding: "140px 6%", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "30px", height: "1px", background: C.accent }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: C.accent }}>HOW WE WORK</span>
              <div style={{ width: "30px", height: "1px", background: C.accent }} />
            </div>
            <h2 className="display-font" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>OUR PROCESS.</h2>
          </div>

          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {[
              { step: "01", title: "Discovery", desc: "Deep-dive audit of your business, market, and competition. We map opportunities before writing a single line of code or running a single ad." },
              { step: "02", title: "Strategy", desc: "A custom 90-day roadmap with clear KPIs, resource allocation, and risk-adjusted milestones. No generic playbooks." },
              { step: "03", title: "Execution", desc: "Cross-functional teams deploy in two-week sprints. Engineering, marketing, and advisory work in parallel — not sequence." },
              { step: "04", title: "Scale", desc: "Monthly reviews, A/B testing, and compounding optimization cycles. We don't stop when we hit targets — we raise them." },
            ].map((p, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, padding: "50px 36px", borderLeft: i > 0 ? "none" : `1px solid ${C.border}`, transition: "border-color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div className="display-font" style={{ fontSize: "5rem", color: "rgba(225,173,1,0.12)", lineHeight: 1, marginBottom: "24px" }}>{p.step}</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "20px", marginBottom: "16px" }}>{p.title}</h3>
                <p style={{ color: C.muted, fontSize: "13px", lineHeight: 1.8, fontWeight: 300 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="mobile-section" style={{ padding: "120px 6%", background: "#050505" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "60px" }}>
            <div style={{ width: "30px", height: "1px", background: C.accent }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: C.accent }}>CLIENT VOICE</span>
          </div>
          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, padding: "44px 38px", borderLeft: i > 0 ? "none" : `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "24px" }}>
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={13} fill={C.accent} color={C.accent} />)}
                </div>
                <p style={{ color: C.muted, fontSize: "14px", lineHeight: 1.8, fontWeight: 300, marginBottom: "28px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "20px" }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "14px" }}>{t.name}</div>
                  <div style={{ fontSize: "11px", color: C.accent, letterSpacing: "1px", marginTop: "3px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="mobile-section" style={{ padding: "140px 6%" }}>
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
      <section className="mobile-section cta-band-section" style={{ padding: "120px 6%", background: C.accent, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="cta-band" style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto", gap: "40px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>READY TO SCALE?</div>
            <h2 className="display-font" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "white", lineHeight: 0.95 }}>
              LET'S BUILD YOUR<br />NEXT CHAPTER.
            </h2>
          </div>
          <div className="cta-band-btns" style={{ display: "flex", gap: "16px" }}>
            <button onClick={() => setShowModal(true)} style={{ background: "white", color: "#030303", border: "none", padding: "18px 36px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "13px", letterSpacing: "1.5px", cursor: "pointer", transition: "all 0.3s", borderRadius: "1px", display: "flex", alignItems: "center", gap: "10px" }}>
              BOOK PLAN <ArrowRight size={16} />
            </button>
            <a href="tel:+919311967319" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.4)", padding: "18px 36px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              CALL NOW <Phone size={16} />
            </a>
          </div>
        </div>
      </section>



      {/* ── MODAL ── */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(10px)" }}>
          <div style={{ background: "#0A0A0A", width: "100%", maxWidth: "520px", border: `1px solid ${C.border}`, position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ background: C.accent, padding: "30px 40px" }}>
              <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(0,0,0,0.3)", border: "none", color: "white", cursor: "pointer", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
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

      {/* ── PLAN DETAILS MODAL ── */}
      {showPlanDetailsModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(10px)" }}>
          <div style={{ background: "#0A0A0A", width: "100%", maxWidth: "900px", border: `1px solid ${C.border}`, position: "relative", maxHeight: "90vh", overflowY: "auto", borderRadius: "8px" }}>
            <div style={{ background: "#030303", padding: "30px 40px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 10 }}>
              <button onClick={() => { setShowPlanDetailsModal(false); setActivePlanDetail(null); }} style={{ position: "absolute", top: "24px", right: "24px", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: "white", cursor: "pointer", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px" }}>
                <X size={16} />
              </button>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", color: C.accent, marginBottom: "8px" }}>PREMIUM DELIVERABLES</div>
              <h2 className="display-font" style={{ fontSize: "2.5rem", color: "#FFF", lineHeight: 1, margin: 0 }}>THE ₹499 GROWTH AUDIT</h2>
            </div>

            <div style={{ padding: "40px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                {[
                  { title: "Website Audit", icon: <Activity size={24} />, summary: "Deep dive into your current UI/UX and performance.", desc: "We perform a comprehensive 30-point inspection of your website covering speed, UX, conversion bottlenecks, and mobile responsiveness. You'll receive a detailed PDF report highlighting exactly what's costing you leads." },
                  { title: "Growth Strategy", icon: <TrendingUp size={24} />, summary: "Custom 90-day roadmap for scaling revenue.", desc: "A tailored, step-by-step action plan designed specifically for your business model. We map out exactly which channels to prioritize, what budget to allocate, and the expected ROI over the next 3 months." },
                  { title: "Competitor Analysis", icon: <Target size={24} />, summary: "Uncover exactly what your competitors are doing.", desc: "We reverse-engineer the top 3 competitors in your niche. We analyze their ad copy, landing pages, SEO strategy, and sales funnels to find gaps you can exploit immediately." },
                  { title: "Lead Generation Plan", icon: <Users size={24} />, summary: "Predictable system to acquire high-value clients.", desc: "Stop relying on referrals. We design a deterministic lead generation funnel tailored to your target audience. This includes ad strategy, lead magnet ideas, and automated follow-up sequences." },
                ].map((item, idx) => (
                  <div key={idx} onClick={() => setActivePlanDetail(activePlanDetail === idx ? null : idx)} style={{ background: activePlanDetail === idx ? "rgba(225,173,1,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${activePlanDetail === idx ? C.accent : C.border}`, padding: "30px", borderRadius: "6px", cursor: "pointer", transition: "all 0.3s" }}>
                    <div style={{ color: activePlanDetail === idx ? C.accent : C.muted, marginBottom: "20px", transition: "color 0.3s" }}>
                      {item.icon}
                    </div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "18px", marginBottom: "12px", color: activePlanDetail === idx ? C.accent : "white" }}>{item.title}</h3>
                    <p style={{ color: C.muted, fontSize: "13px", lineHeight: 1.6 }}>{item.summary}</p>
                    
                    {/* Expandable Content */}
                    <div style={{ maxHeight: activePlanDetail === idx ? "200px" : "0", opacity: activePlanDetail === idx ? 1 : 0, overflow: "hidden", transition: "all 0.4s ease", marginTop: activePlanDetail === idx ? "20px" : "0", paddingTop: activePlanDetail === idx ? "20px" : "0", borderTop: activePlanDetail === idx ? `1px solid ${C.border}` : "none" }}>
                      <p style={{ color: "rgba(240,237,232,0.8)", fontSize: "13px", lineHeight: 1.7 }}>
                        {item.desc}
                      </p>
                    </div>
                    
                    <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "8px", color: activePlanDetail === idx ? C.accent : C.muted, fontSize: "11px", fontWeight: 700, letterSpacing: "1px", transition: "color 0.3s" }}>
                      {activePlanDetail === idx ? "HIDE DETAILS" : "VIEW DETAILS"} 
                      <ChevronDown size={14} style={{ transform: activePlanDetail === idx ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PAYMENT MODAL ── */}
      {paymentState !== "none" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.98)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(15px)" }}>
          <div style={{ background: "#0A0A0A", width: "100%", maxWidth: "420px", border: `1px solid ${C.border}`, padding: "50px 40px", textAlign: "center" }}>
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
                <div style={{ color: "#00C853", marginBottom: "24px", display: "flex", justifyContent: "center" }}><CheckCircle size={64} /></div>
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
          boxShadow: "0 10px 40px rgba(225,173,1,0.6), 0 0 20px rgba(225,173,1,0.2)", 
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
          border: "2px solid #000"
        }}>
          <Zap size={18} fill="currentColor" />
          BOOK PLAN NOW
        </button>
      </div>

    </div>
  );
}
