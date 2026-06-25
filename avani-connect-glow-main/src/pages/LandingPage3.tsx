import React, { useRef } from "react";
import {
  ArrowRight, Star, Clock, ShieldCheck, Rocket, TrendingUp, Sparkles,
  Globe, Megaphone, Cpu, Search, BarChart3, Briefcase,
  CheckCircle, Phone, Mail, MessageSquare, Send,
} from "lucide-react";
import BusinessSetup3Form from "@/components/BusinessSetup3Form";

/**
 * BusinessSetup3 — a fresh, conversion-focused landing page built for
 * Instagram traffic. Short copy, form-in-hero, mobile-first. Brand-aligned
 * with the Business Setup gold theme. All CSS is scoped under `.bs3` so it
 * never leaks into / conflicts with the embedded RegistrationForm.
 */

const C = {
  accent: "#D4A017",
  accentLight: "#E8B830",
  dark: "#1A1A2E",
  text: "#1A1A2E",
  muted: "#5F6368",
  bg: "#FAFAF8",
  card: "#FFFFFF",
  border: "rgba(0,0,0,0.08)",
  green: "#16A34A",
};

const benefits = [
  { icon: <Rocket />, title: "Done-For-You", desc: "Website, ads, content & AI handled by one expert team." },
  { icon: <Clock />, title: "Launch in 7 Days", desc: "Go live fast — no tech headaches, no delays." },
  { icon: <TrendingUp />, title: "Proven ROI", desc: "4x–10x returns delivered across 300+ projects." },
  { icon: <ShieldCheck />, title: "Start at ₹0", desc: "No upfront cost — start growing right away." },
];

const services = [
  { icon: <Globe />, title: "Website Development", desc: "High-converting, fast websites that turn visitors into customers." },
  { icon: <Megaphone />, title: "Social Media Management", desc: "Content & community that grows your brand every day." },
  { icon: <BarChart3 />, title: "Google & Meta Ads", desc: "Data-driven campaigns built for maximum ROAS." },
  { icon: <Cpu />, title: "AI Automation", desc: "Smart automations & AI that save hours and scale you." },
  { icon: <Search />, title: "SEO & Content", desc: "Rank higher and pull in compounding organic traffic." },
  { icon: <Briefcase />, title: "Complete Business Setup", desc: "From idea to launch — built, branded and ready to sell." },
];

const stats = [
  { value: "150+", label: "Happy Clients" },
  { value: "300+", label: "Projects Done" },
  { value: "85%", label: "Avg. Growth" },
  { value: "8+", label: "Years Experience" },
];

const whyUs = [
  "One team for web, marketing, ads & AI — no juggling vendors.",
  "Transparent reporting and real, trackable results.",
  "Fast turnaround with a proven 7-day launch process.",
  "Trusted by 150+ founders across India & abroad.",
];

const steps = [
  { n: "1", title: "Share Your Details", desc: "Fill the quick form — takes under 60 seconds." },
  { n: "2", title: "Discovery Call", desc: "We map a custom growth plan for your business." },
  { n: "3", title: "We Build & Launch", desc: "Our team executes everything end-to-end." },
  { n: "4", title: "You Grow", desc: "Watch leads, sales and visibility climb." },
];

// Portfolio — content sourced from the web-dev page, restyled for this page
const portfolio = [
  { title: "School Management (ERP)", category: "Web App", image: "/h-sm.webp", growth: "+180%", metric: "Sales Growth", desc: "Automates attendance, timetables, fee management & role-based dashboards for schools." },
  { title: "Shoe E-Commerce", category: "E-Commerce", image: "/s-shoe.webp", growth: "+210%", metric: "Online Sales", desc: "3D product previews, secure checkout, smart inventory & delivery dashboards." },
  { title: "HR Portal (ERP)", category: "Web App", image: "/s-hr.webp", growth: "+70%", metric: "Efficiency", desc: "Attendance, leave, payroll, performance analytics & secure document handling." },
  { title: "Hospital Website", category: "Healthcare", image: "/s2.webp", growth: "+320%", metric: "Lead Generation", desc: "AI chatbot, online OPD booking, payments & an admin analytics dashboard." },
  { title: "Hi-tech Property", category: "Real Estate", image: "/s6.webp", growth: "−60%", metric: "Support Tickets", desc: "Rich property listings, lead-capture tools & admin management for real-estate teams." },
  { title: "Insurance Platform", category: "Fintech", image: "/s5.webp", growth: "+500K", metric: "Monthly Leads", desc: "Plan comparison, instant quotes & secure policy management for customers." },
];

// Reviews — content sourced from the main site testimonials, restyled for this page
const reviews = [
  { name: "Director, Indus School", role: "Indus Public School", image: "/indus.webp", rating: 5, text: "Avani delivered an outstanding website that perfectly captures our school's vision. Modern, intuitive and beyond our expectations." },
  { name: "Vikram Sharma", role: "MD, Rohtak Shoe Company", image: "/shoes.webp", rating: 5, text: "Our e-commerce platform transformed the business — online sales jumped 250% in just 3 months. Fast, user-friendly and reliable." },
  { name: "Sanjay Vats", role: "Co-Founder, Policicue", image: "/policucue.jpeg", rating: 5, text: "A game-changer for our startup. They built a sophisticated platform with exceptional UI/UX and top-notch technical expertise." },
  { name: "Amit Kapoor", role: "Founder, FRD Nutrition", image: "/frd-nutrition-new.webp", rating: 5, text: "A stunning website with seamless e-commerce integration. We've seen a 180% increase in online orders. Outstanding service!" },
  { name: "Aman Sharma", role: "CEO, Hi-Tech Luxury Homes", image: "/hitech.jpeg", rating: 5, text: "An elegant website that beautifully represents our luxury properties. Sophisticated design and easy-to-manage listings." },
  { name: "Dr. Mohit Verma", role: "Director, Sanjeevni Hospital", image: "/sanjeevni.jpeg", rating: 5, text: "The portal streamlined our operations significantly. Appointment booking is effortless and the admin panel is wonderfully user-friendly." },
];

export default function BusinessSetup3() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="bs3" style={{ background: C.bg, color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .bs3 *, .bs3 *::before, .bs3 *::after { box-sizing: border-box; }
        .bs3 { -webkit-font-smoothing: antialiased; }

        @keyframes bs3Fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .bs3-fade { animation: bs3Fade 0.6s ease both; }

        /* Subtle attention shake on the promo offer */
        @keyframes bs3Shake {
          0%, 88%, 100% { transform: rotate(0deg) translateX(0); }
          90% { transform: rotate(-3deg) translateX(-2px); }
          92% { transform: rotate(3deg) translateX(2px); }
          94% { transform: rotate(-2deg) translateX(-2px); }
          96% { transform: rotate(2deg) translateX(1px); }
          98% { transform: rotate(-1deg) translateX(0); }
        }
        .bs3-shake { animation: bs3Shake 3.2s ease-in-out infinite; transform-origin: center; }
        @keyframes bs3Glow { 0%,100% { box-shadow: 0 0 0 0 rgba(212,160,23,0.5); } 50% { box-shadow: 0 0 0 7px rgba(212,160,23,0); } }

        /* ── Top promo / nav bar ── */
        .bs3-topbar {
          position: sticky; top: 0; z-index: 9000;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 10px 5%;
          background: linear-gradient(135deg, #1A1A2E 0%, #0F0F1A 100%);
          border-bottom: 2px solid ${C.accent};
        }
        .bs3-brand { display: flex; align-items: center; gap: 10px; }
        .bs3-brand span { font-weight: 800; font-size: 13px; letterSpacing: 1.5px; color: #fff; letter-spacing: 1.5px; }
        .bs3-offer { display: flex; align-items: center; gap: 8px; }
        .bs3-offer-old { text-decoration: line-through; color: rgba(255,255,255,0.45); font-weight: 700; font-size: 13px; }
        .bs3-offer-new { color: #4ADE80; font-weight: 900; font-size: 17px; letter-spacing: -0.5px; }
        .bs3-offer-tag { background: #DC2626; color: #fff; font-weight: 900; font-size: 9px; letter-spacing: 0.5px; padding: 2px 6px; border-radius: 4px; }
        .bs3-claim {
          display: inline-flex; align-items: center; gap: 6px; cursor: pointer;
          background: ${C.accent}; color: #1A1A2E; border: none; border-radius: 8px;
          font-weight: 800; font-size: 12px; letter-spacing: 0.5px; padding: 8px 14px;
          animation: bs3Glow 2.4s ease-in-out infinite; transition: transform .2s ease;
        }
        .bs3-claim:hover { transform: translateY(-1px); background: ${C.accentLight}; }

        .bs3-section { padding: 56px 5%; }
        .bs3-wrap { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .bs3-kicker { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: ${C.accent}; }
        .bs3-h2 { font-size: clamp(1.6rem, 4.5vw, 2.6rem); font-weight: 800; line-height: 1.1; margin: 10px 0 8px; }
        .bs3-sub { color: ${C.muted}; font-size: 15px; line-height: 1.6; max-width: 620px; }

        /* ── Hero ── */
        .bs3-hero { padding: 34px 5% 46px; }
        .bs3-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 44px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .bs3-badge { display: inline-flex; align-items: center; gap: 7px; background: rgba(212,160,23,0.1); border: 1px solid rgba(212,160,23,0.3); color: #9a7a14; font-weight: 700; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; padding: 6px 12px; border-radius: 999px; }
        .bs3-hook { font-size: clamp(2.6rem, 7.2vw, 4.8rem); font-weight: 800; line-height: 1.02; letter-spacing: -2px; margin: 18px 0; }
        .bs3-hook .hl { background: linear-gradient(120deg, ${C.accent} 0%, ${C.accentLight} 55%, #C4920E 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .bs3-hero-sub { color: ${C.muted}; font-size: clamp(1rem, 2.7vw, 1.18rem); line-height: 1.65; max-width: 540px; margin-bottom: 22px; font-weight: 500; }
        .bs3-trust { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-bottom: 24px; }
        .bs3-trust-item { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: ${C.text}; }
        .bs3-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer;
          background: ${C.accent}; color: #1A1A2E; border: none; border-radius: 12px;
          font-weight: 800; font-size: 15px; padding: 16px 30px; width: auto;
          box-shadow: 0 10px 30px rgba(212,160,23,0.32); transition: all .25s ease;
        }
        .bs3-cta:hover { background: ${C.accentLight}; transform: translateY(-2px); }

        /* ── Form card ── */
        .bs3-formcard { position: relative; background: ${C.card}; border-radius: 20px; border: 1px solid ${C.border}; box-shadow: 0 24px 70px rgba(0,0,0,0.12); overflow: hidden; }
        .bs3-form-offer { background: linear-gradient(135deg, #1A1A2E 0%, #0F0F1A 100%); padding: 10px 16px; display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; border-bottom: 2px solid ${C.accent}; }
        .bs3-form-offer .lab { font-size: 10px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: ${C.accent}; }

        /* ── Cards / grids ── */
        .bs3-benefits { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .bs3-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 16px; padding: 24px; transition: all .3s ease; }
        .bs3-card:hover { border-color: rgba(212,160,23,0.4); box-shadow: 0 12px 30px rgba(0,0,0,0.06); transform: translateY(-4px); }
        .bs3-ico { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: ${C.accent}; background: rgba(212,160,23,0.08); border: 1px solid rgba(212,160,23,0.15); margin-bottom: 14px; }
        .bs3-ico svg { width: 22px; height: 22px; }
        .bs3-card h3 { font-size: 17px; font-weight: 800; margin-bottom: 6px; }
        .bs3-card p { font-size: 13.5px; color: ${C.muted}; line-height: 1.55; }

        .bs3-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

        /* ── Services (animated, highlighted bento) ── */
        @keyframes bs3Shine { 0% { left: -60%; } 55%, 100% { left: 130%; } }
        @keyframes bs3FloatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .bs3-svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .bs3-svc-card { position: relative; background: ${C.card}; border: 1px solid rgba(212,160,23,0.18); border-radius: 18px; padding: 28px 24px; overflow: hidden; box-shadow: 0 8px 22px rgba(180,140,20,0.08); animation: bs3Fade .6s ease both; transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, border-color .35s ease; }
        .bs3-svc-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${C.accent}, ${C.accentLight}); transform: scaleX(0); transform-origin: left; transition: transform .4s ease; }
        .bs3-svc-card:hover::before { transform: scaleX(1); }
        .bs3-svc-card:hover { transform: translateY(-8px); box-shadow: 0 22px 50px rgba(212,160,23,0.16); border-color: rgba(212,160,23,0.4); }
        .bs3-svc-num { position: absolute; top: 16px; right: 22px; font-size: 40px; font-weight: 800; color: rgba(26,26,46,0.05); line-height: 1; }
        .bs3-svc-ico { width: 58px; height: 58px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, ${C.accent}, ${C.accentLight}); box-shadow: 0 10px 22px rgba(212,160,23,0.32); margin-bottom: 18px; transition: transform .45s cubic-bezier(.16,1,.3,1); }
        .bs3-svc-card:hover .bs3-svc-ico { transform: rotate(-8deg) scale(1.1); }
        .bs3-svc-ico svg { width: 26px; height: 26px; }
        .bs3-svc-card h3 { font-size: 18px; font-weight: 800; margin-bottom: 8px; }
        .bs3-svc-card p { font-size: 14px; color: ${C.muted}; line-height: 1.55; margin-bottom: 14px; }
        .bs3-svc-more { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: ${C.accent}; opacity: 0; transform: translateX(-6px); transition: all .3s ease; }
        .bs3-svc-card:hover .bs3-svc-more { opacity: 1; transform: translateX(0); }
        .bs3-svc-card.feat { background: linear-gradient(135deg, #1A1A2E 0%, #0F0F1A 100%); border-color: transparent; }
        .bs3-svc-card.feat h3 { color: #fff; }
        .bs3-svc-card.feat p { color: rgba(255,255,255,0.72); }
        .bs3-svc-card.feat .bs3-svc-num { color: rgba(255,255,255,0.08); }
        .bs3-svc-card.feat::after { content: ''; position: absolute; top: -50%; left: -60%; width: 45%; height: 200%; background: linear-gradient(90deg, transparent, rgba(212,160,23,0.18), transparent); transform: rotate(18deg); animation: bs3Shine 4.5s ease-in-out infinite; pointer-events: none; }
        .bs3-svc-card.feat .bs3-svc-ico { animation: bs3FloatY 3s ease-in-out infinite; }
        .bs3-ribbon { position: absolute; top: 16px; right: -34px; transform: rotate(45deg); background: ${C.accent}; color: #1A1A2E; font-size: 10px; font-weight: 900; letter-spacing: 1px; padding: 4px 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        /* Warm yellow section background (highlighted Services / Results) */
        .bs3-yellow { background: linear-gradient(180deg, #FFF9E6 0%, #FBEAC0 100%); position: relative; overflow: hidden; }
        .bs3-yellow::before { content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 700px; height: 280px; background: radial-gradient(ellipse at center, rgba(212,160,23,0.18) 0%, transparent 70%); pointer-events: none; }
        /* Continuous soft glow on service icons (doesn't fight the hover rotate) */
        @keyframes bs3IconGlow { 0%,100% { box-shadow: 0 8px 20px rgba(212,160,23,0.28); } 50% { box-shadow: 0 12px 30px rgba(212,160,23,0.55); } }
        .bs3-svc-ico { animation: bs3IconGlow 3s ease-in-out infinite; }
        /* Animated gradient underline under the section heading */
        @keyframes bs3Underline { 0% { background-position: 0% 0; } 100% { background-position: 200% 0; } }
        .bs3-svc-underline { width: 70px; height: 4px; margin: 14px auto 0; border-radius: 4px; background: linear-gradient(90deg, ${C.accent}, ${C.accentLight}, ${C.accent}); background-size: 200% 100%; animation: bs3Underline 2.4s linear infinite; }

        /* ── Results / Portfolio (warm yellow, image-free) ── */
        .bs3-results { background: linear-gradient(180deg, #FFFBEE 0%, #FBEFC9 100%); position: relative; }
        .bs3-port-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .bs3-port-card { position: relative; background: #fff; border: 1px solid rgba(212,160,23,0.28); border-radius: 18px; padding: 24px; overflow: hidden; animation: bs3Fade .6s ease both; transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, border-color .35s ease; }
        .bs3-port-card::before { content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, ${C.accent}, ${C.accentLight}); transform: scaleY(0); transform-origin: top; transition: transform .4s ease; }
        .bs3-port-card:hover::before { transform: scaleY(1); }
        .bs3-port-card:hover { transform: translateY(-6px); box-shadow: 0 22px 48px rgba(212,160,23,0.24); border-color: rgba(212,160,23,0.55); }
        .bs3-port-cat { display: inline-block; background: rgba(212,160,23,0.13); color: #9a7a14; font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 5px 11px; border-radius: 999px; margin-bottom: 14px; }
        .bs3-port-statline { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; }
        .bs3-port-growth { font-size: clamp(2rem, 5.5vw, 2.8rem); font-weight: 900; line-height: 1; letter-spacing: -1.5px; background: linear-gradient(120deg, ${C.accent} 0%, ${C.accentLight} 60%, #C4920E 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .bs3-port-metric { font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: ${C.muted}; }
        .bs3-port-card h3 { font-size: 17px; font-weight: 800; margin-bottom: 7px; color: ${C.text}; }
        .bs3-port-card p { font-size: 13.5px; color: ${C.muted}; line-height: 1.55; }

        /* ── Reviews (image-free, gold accents) ── */
        .bs3-rev-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .bs3-rev-card { position: relative; background: linear-gradient(180deg, #fff 0%, #FFFBEF 100%); border: 1px solid rgba(212,160,23,0.22); border-radius: 18px; padding: 26px 24px; display: flex; flex-direction: column; overflow: hidden; animation: bs3Fade .6s ease both; transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease; }
        .bs3-rev-card::before { content: ''; position: absolute; top: 0; left: 24px; right: 24px; height: 3px; background: linear-gradient(90deg, ${C.accent}, ${C.accentLight}); border-radius: 0 0 4px 4px; opacity: 0; transition: opacity .3s ease; }
        .bs3-rev-card:hover::before { opacity: 1; }
        .bs3-rev-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(212,160,23,0.16); border-color: rgba(212,160,23,0.45); }
        .bs3-rev-quote { position: absolute; top: 8px; right: 22px; font-size: 64px; line-height: 1; color: rgba(212,160,23,0.18); font-family: Georgia, serif; }
        .bs3-rev-stars { display: flex; gap: 2px; margin-bottom: 12px; }
        .bs3-rev-text { font-size: 14px; color: ${C.text}; line-height: 1.6; margin-bottom: 18px; flex-grow: 1; }
        .bs3-rev-person { display: flex; align-items: center; gap: 12px; }
        .bs3-rev-avatar { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 800; color: #1A1A2E; background: linear-gradient(135deg, ${C.accent}, ${C.accentLight}); flex-shrink: 0; box-shadow: 0 6px 14px rgba(212,160,23,0.32); }
        .bs3-rev-name { font-size: 14px; font-weight: 800; }
        .bs3-rev-role { font-size: 12px; color: ${C.muted}; }

        /* ── Why us ── */
        .bs3-why { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 36px; align-items: center; }
        .bs3-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .bs3-stat { background: linear-gradient(160deg, #fff 0%, #FFF8E3 100%); border: 1px solid rgba(212,160,23,0.28); border-radius: 16px; padding: 22px; text-align: center; transition: transform .3s ease, box-shadow .3s ease; }
        .bs3-stat:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(212,160,23,0.16); }
        .bs3-stat .num { font-size: clamp(1.8rem, 5vw, 2.6rem); font-weight: 800; color: ${C.accent}; line-height: 1; }
        .bs3-stat .lab { font-size: 12px; font-weight: 600; color: ${C.muted}; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
        .bs3-why-list { list-style: none; padding: 0; margin: 18px 0 0; display: flex; flex-direction: column; gap: 12px; }
        .bs3-why-list li { display: flex; gap: 10px; font-size: 15px; color: ${C.text}; line-height: 1.5; }
        .bs3-why-list svg { color: ${C.green}; flex-shrink: 0; margin-top: 2px; }

        /* ── Process ── */
        .bs3-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .bs3-step { position: relative; background: ${C.card}; border: 1px solid ${C.border}; border-radius: 16px; padding: 26px 22px; }
        .bs3-step .n { width: 38px; height: 38px; border-radius: 10px; background: ${C.dark}; color: ${C.accent}; font-weight: 800; font-size: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        .bs3-step h3 { font-size: 16px; font-weight: 800; margin-bottom: 6px; }
        .bs3-step p { font-size: 13px; color: ${C.muted}; line-height: 1.5; }

        /* ── Final CTA band ── */
        .bs3-cta-band { background: linear-gradient(135deg, #1A1A2E 0%, #0F0F1A 100%); border-radius: 22px; padding: 48px 6%; text-align: center; }
        .bs3-cta-band h2 { color: #fff; font-size: clamp(1.6rem, 4.5vw, 2.6rem); font-weight: 800; line-height: 1.15; margin-bottom: 10px; }
        .bs3-cta-band p { color: rgba(255,255,255,0.75); font-size: 15px; margin-bottom: 24px; }

        /* ── Footer ── */
        .bs3-footer { padding: 30px 5%; border-top: 1px solid ${C.border}; }
        .bs3-footer-in { max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between; }
        .bs3-foot-links { display: flex; flex-wrap: wrap; gap: 18px; }
        .bs3-foot-links a { display: inline-flex; align-items: center; gap: 6px; color: ${C.muted}; text-decoration: none; font-size: 13px; font-weight: 600; }
        .bs3-foot-links a:hover { color: ${C.accent}; }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .bs3-hero-grid { grid-template-columns: 1fr; gap: 22px; }
          .bs3-benefits { grid-template-columns: repeat(2, 1fr); }
          .bs3-services-grid { grid-template-columns: 1fr; }
          .bs3-svc-grid, .bs3-port-grid, .bs3-rev-grid { grid-template-columns: repeat(2, 1fr); }
          .bs3-why { grid-template-columns: 1fr; gap: 24px; }
          .bs3-steps { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .bs3-section { padding: 40px 5%; }
          .bs3-hero { padding: 20px 5% 30px; }
          .bs3-hook { margin: 12px 0; }
          .bs3-hero-text { text-align: center; }
          .bs3-badge, .bs3-trust, .bs3-cta-wrap { justify-content: center; }
          .bs3-trust { gap: 12px; }
          .bs3-cta { width: 100%; }
          .bs3-steps { grid-template-columns: 1fr; }
          .bs3-svc-grid, .bs3-port-grid, .bs3-rev-grid { grid-template-columns: 1fr; }
          .bs3-brand span { font-size: 11px; letter-spacing: 1px; }
          .bs3-claim { display: none; }
          .bs3-foot-links { gap: 14px; }
        }
      `}</style>

      {/* ── Promo / Nav bar ── */}
      <div className="bs3-topbar">
        <div className="bs3-brand">
          <img src="/avani-logo.jpg" alt="Avani Enterprises" style={{ width: 30, height: 30, objectFit: "contain", borderRadius: 4 }} />
          <span>AVANI ENTERPRISES</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="bs3-offer bs3-shake">
            <span className="bs3-offer-old">₹999</span>
            <ArrowRight size={14} color="rgba(255,255,255,0.55)" />
            <span className="bs3-offer-new">₹0</span>
            <span className="bs3-offer-tag">FREE</span>
          </div>
          <button className="bs3-claim" onClick={scrollToForm}>
            Claim Now <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="bs3-hero">
        <div className="bs3-hero-grid">
          {/* Left: copy */}
          <div className="bs3-hero-text bs3-fade">
            <span className="bs3-badge"><Sparkles size={13} /> Trusted Since 2016 · Limited Free Slots</span>
            <h1 className="bs3-hook">
              Get More Customers<br /><span className="hl">Online &amp; Growing.</span>
            </h1>
            <p className="bs3-hero-sub">
              Website, social media, ads &amp; AI — handled by one expert team.
              Get your custom growth plan and start growing in days, not months.
            </p>
            <div className="bs3-trust">
              <span className="bs3-trust-item"><Star size={15} color={C.accent} fill={C.accent} /> 4.9/5 Rated</span>
              <span className="bs3-trust-item"><CheckCircle size={15} color={C.green} /> 150+ Clients</span>
              <span className="bs3-trust-item"><Clock size={15} color={C.accent} /> Results in 24 hrs</span>
            </div>
            <div className="bs3-cta-wrap" style={{ display: "flex" }}>
              <button className="bs3-cta" onClick={scrollToForm}>
                Get Started Now <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right: redesigned form */}
          <div ref={formRef} className="bs3-fade" style={{ scrollMarginTop: 90 }}>
            <BusinessSetup3Form />
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bs3-section">
        <div className="bs3-wrap">
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <span className="bs3-kicker"><Rocket size={14} /> Why Founders Choose Us</span>
            <h2 className="bs3-h2">Everything You Need to Grow — In One Place</h2>
          </div>
          <div className="bs3-benefits">
            {benefits.map((b, i) => (
              <div key={i} className="bs3-card">
                <div className="bs3-ico">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bs3-section bs3-yellow">
        <div className="bs3-wrap">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="bs3-kicker"><Briefcase size={14} /> Our Services</span>
            <h2 className="bs3-h2">Done-For-You Growth Services</h2>
            <div className="bs3-svc-underline" />
            <p className="bs3-sub" style={{ margin: "14px auto 0" }}>Pick what you need — or let us build your complete growth engine.</p>
          </div>
          <div className="bs3-svc-grid">
            {services.map((s, i) => (
              <div key={i} className={`bs3-svc-card${i === 0 ? " feat" : ""}`} style={{ animationDelay: `${i * 0.08}s` }}>
                {i === 0 && <span className="bs3-ribbon">POPULAR</span>}
                <span className="bs3-svc-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="bs3-svc-ico" style={{ animationDelay: `${i * 0.5}s` }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="bs3-svc-more" onClick={scrollToForm} style={{ cursor: "pointer" }}>Get started <ArrowRight size={14} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="bs3-section">
        <div className="bs3-wrap bs3-why">
          <div>
            <span className="bs3-kicker"><ShieldCheck size={14} /> Why Avani</span>
            <h2 className="bs3-h2">Results You Can Actually Measure</h2>
            <ul className="bs3-why-list">
              {whyUs.map((w, i) => (
                <li key={i}><CheckCircle size={18} /> {w}</li>
              ))}
            </ul>
            <button className="bs3-cta" style={{ marginTop: 24 }} onClick={scrollToForm}>
              Get Started Now <ArrowRight size={18} />
            </button>
          </div>
          <div className="bs3-stats">
            {stats.map((s, i) => (
              <div key={i} className="bs3-stat">
                <div className="num">{s.value}</div>
                <div className="lab">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results / Portfolio ── */}
      <section className="bs3-section bs3-results">
        <div className="bs3-wrap">
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <span className="bs3-kicker"><TrendingUp size={14} /> Our Work</span>
            <h2 className="bs3-h2">Results We've Delivered</h2>
            <p className="bs3-sub" style={{ margin: "0 auto" }}>Real projects, real growth — a snapshot of the impact we create for our clients.</p>
          </div>
          <div className="bs3-port-grid">
            {portfolio.map((p, i) => (
              <div key={i} className="bs3-port-card" style={{ animationDelay: `${i * 0.07}s` }}>
                <span className="bs3-port-cat">{p.category}</span>
                <div className="bs3-port-statline">
                  <span className="bs3-port-growth">{p.growth}</span>
                  <span className="bs3-port-metric">{p.metric}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="bs3-section">
        <div className="bs3-wrap">
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <span className="bs3-kicker"><Star size={14} /> Client Love</span>
            <h2 className="bs3-h2">What Our Clients Say</h2>
            <p className="bs3-sub" style={{ margin: "0 auto" }}>Trusted by 150+ founders and businesses across India and abroad.</p>
          </div>
          <div className="bs3-rev-grid">
            {reviews.map((r, i) => (
              <div key={i} className="bs3-rev-card" style={{ animationDelay: `${i * 0.07}s` }}>
                <span className="bs3-rev-quote">&ldquo;</span>
                <div className="bs3-rev-stars">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} size={15} color={C.accent} fill={C.accent} />
                  ))}
                </div>
                <p className="bs3-rev-text">{r.text}</p>
                <div className="bs3-rev-person">
                  <div className="bs3-rev-avatar">
                    {r.name.split(/[ ,.]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                  </div>
                  <div>
                    <div className="bs3-rev-name">{r.name}</div>
                    <div className="bs3-rev-role">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bs3-section" style={{ background: "#fff" }}>
        <div className="bs3-wrap">
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <span className="bs3-kicker"><TrendingUp size={14} /> Simple Process</span>
            <h2 className="bs3-h2">From Form to Growth in 4 Steps</h2>
          </div>
          <div className="bs3-steps">
            {steps.map((s, i) => (
              <div key={i} className="bs3-step">
                <div className="n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bs3-section">
        <div className="bs3-wrap">
          <div className="bs3-cta-band">
            <h2>Let's Grow Your Business Together</h2>
            <p>No cost. No commitment. Just a clear plan to grow your business.</p>
            <button className="bs3-cta" onClick={scrollToForm}>
              Get Started Now <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bs3-footer">
        <div className="bs3-footer-in">
          <div className="bs3-brand">
            <img src="/avani-logo.jpg" alt="Avani Enterprises" style={{ width: 28, height: 28, objectFit: "contain", borderRadius: 4 }} />
            <span style={{ color: C.text, fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>AVANI ENTERPRISES</span>
          </div>
          <div className="bs3-foot-links">
            <a href="tel:+919253625099"><Phone size={14} /> +91 92536 25099</a>
            <a href="mailto:kp@avanienterprises.in"><Mail size={14} /> kp@avanienterprises.in</a>
            <a href="https://wa.me/918930008118" target="_blank" rel="noopener noreferrer"><MessageSquare size={14} /> WhatsApp: +91 89300 08118</a>
          </div>
          <span style={{ color: C.muted, fontSize: 12 }}>Gurgaon · Mumbai · Rohtak · Australia · © {2026} Avani Enterprises</span>
        </div>
      </footer>
    </div>
  );
}
