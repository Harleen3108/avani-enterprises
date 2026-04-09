import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink, Instagram, Linkedin, Twitter, Mail, MessageCircle, ChevronRight,
  FileText, ArrowRight, Phone, Sun, Moon, Download
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

/* ─── Interfaces ─── */
interface Link {
  _id: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  clickCount: number;
  animation?: 'bounce' | 'pulse' | 'shake' | 'tada' | 'wobble' | 'glow';
}

/* ─── Icon Resolver ─── */
const resolveIcon = (icon: string, url: string) => {
  const l = (icon || '').toLowerCase();
  const u = (url || '').toLowerCase();
  if (l.includes('instagram') || u.includes('instagram')) return Instagram;
  if (l.includes('linkedin') || u.includes('linkedin')) return Linkedin;
  if (l.includes('twitter') || u.includes('twitter') || u.includes('x.com')) return Twitter;
  if (l.includes('whatsapp') || u.includes('whatsapp') || u.includes('wa.me')) return MessageCircle;
  if (l.includes('phone') || l.includes('call') || u.includes('tel:')) return Phone;
  if (l.includes('mail') || l.includes('email') || u.includes('mailto:')) return Mail;
  if (u.endsWith('.pdf') || l.includes('pdf') || l.includes('file')) return FileText;
  return ExternalLink;
};

/* ─── Default Links ─── */
const defaultLinks: Link[] = [
  { _id: 'default-website', title: 'Visit Website', url: 'https://www.avanienterprises.in', description: 'Explore our full suite of premium digital solutions', icon: 'globe', color: '#D4A017', isActive: true, clickCount: 0 },
  { _id: 'default-services', title: 'Our Services', url: 'https://www.avanienterprises.in/services', description: 'Digital Marketing, Development, Branding & more', icon: 'briefcase', color: '#D4A017', isActive: true, clickCount: 0 },
  { _id: 'default-consultation', title: 'Book a Consultation', url: 'https://www.avanienterprises.in/get-consultation', description: "Discuss your growth strategy", icon: 'phone', color: '#D4A017', isActive: true, clickCount: 0 },
  { _id: 'default-whatsapp', title: 'Chat on WhatsApp', url: 'https://wa.me/919253625099', description: 'Quick support guaranteed', icon: 'whatsapp', color: '#D4A017', isActive: true, clickCount: 0 },
  { _id: 'default-pdf-services', title: '2024 Agency Lookbook', url: '/Avani Enterprises Services ( Website, SMM and Ads )  (3).pdf', description: 'PDF / 12.5 MB', icon: 'file', color: '#D4A017', isActive: true, clickCount: 0 },
  { _id: 'default-pdf-bundle', title: 'Brand Identity Framework', url: '/Avani services bundle (2).pdf', description: 'WORKSHOP VIDEO', icon: 'file', color: '#D4A017', isActive: true, clickCount: 0 },
];

/* ─── Component ─── */
export default function Links() {
  const [links, setLinks] = useState<Link[]>(defaultLinks);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  useEffect(() => { fetchLinks(); }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/links`);
      const apiLinks = response.data.filter((l: Link) => l.isActive && !l.title.toLowerCase().includes('blog') && !l.title.toLowerCase().includes('case stud') && !l.title.toLowerCase().includes('hiring') && !l.title.toLowerCase().includes('careers'));
      setLinks(apiLinks.length > 0 ? apiLinks : defaultLinks);
    } catch {
      setLinks(defaultLinks);
    } finally {
      setLoading(false);
    }
  };

  const trackAndOpen = async (type: 'link' | 'social', idOrPlatform: string, url: string) => {
    if (type === 'link' && !idOrPlatform.startsWith('default-')) {
      try { await axios.post(`${API_BASE_URL}/api/links/${idOrPlatform}/click`, { userAgent: navigator.userAgent, referrer: document.referrer }); } catch { }
    } else if (type === 'social') {
      try { await axios.post(`${API_BASE_URL}/api/social-clicks`, { platform: idOrPlatform, userAgent: navigator.userAgent, referrer: document.referrer }); } catch { }
    }
    window.open(url, '_blank');
  };

  const resources = links.filter(l => l.url.endsWith('.pdf'));
  const otherLinks = links.filter(l => !l.url.endsWith('.pdf'));

  return (
    <div className={`link-root ${darkMode ? '' : 'link-light'}`}>
      <div className="link-bg" />

      <div className="link-container">
        {/* ── Navbar ── */}
        <nav className="link-navbar">
          <div className="link-logo">
            <img src="/avani-logo.jpg" alt="Avani" />
            <span>AVANI</span>
          </div>
          <button className="link-theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* ── Hero Section ── */}
        <motion.section className="link-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="link-hero-title">
            <span>Digital</span>
            <span className="link-accent">Elegance</span>
            <span>Crafted.</span>
          </h1>
          <p className="link-hero-subtitle">Avani Enterprises: Architecting digital curate experiences for high-end global brands.</p>

          <div className="link-hero-bottom">
            <div className="link-hero-badges">
              <span>MARKETING</span>
              <span>DEVELOPMENT</span>
              <span>BRANDING</span>
            </div>
            <div className="link-cta-buttons">
              <button className="link-cta-primary" onClick={() => trackAndOpen('link', 'default-consultation', 'https://www.avanienterprises.in/get-consultation')}>
                BOOK A CONSULTATION
              </button>
            </div>
          </div>
        </motion.section>

        {/* ── Main Content Grid ── */}
        <div className="link-content-grid">
          {/* Left Column */}
          <motion.div className="link-column" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            {/* Website Card */}
            <div className="link-card link-website-card">
              <div className="link-website-content">
                <h3>Visit Website</h3>
                <p>Explore our full suite of premium digital solutions and high-end case studies.</p>
                <button className="link-card-btn" onClick={() => trackAndOpen('link', 'default-website', 'https://www.avanienterprises.in')}>
                  LAUNCH EXPERIENCE <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="link-card link-socials">
              <h3>CONNECT WITH US</h3>
              <div className="link-social-grid">
                <a href="https://www.linkedin.com/company/avani-enterprises-india/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <Linkedin size={24} />
                </a>
                <a href="https://www.instagram.com/avanienterprises.branding/" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <Instagram size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                  <Twitter size={24} />
                </a>
                <a href="mailto:kp@avanienterprises.in" title="Email">
                  <Mail size={24} />
                </a>
              </div>
              <a href="https://wa.me/919253625099" target="_blank" rel="noopener noreferrer" className="link-whatsapp-btn">
                <MessageCircle size={18} />
                CHAT ON WHATSAPP
              </a>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div className="link-column" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            {/* Resources */}
            {resources.length > 0 && (
              <div className="link-card link-resources">
                <h3>RESOURCES <Download size={16} /></h3>
                <div className="link-resources-list">
                  {resources.map((res) => (
                    <a
                      key={res._id}
                      className="link-resource-item"
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAndOpen('link', res._id, res.url)}
                    >
                      <FileText size={18} />
                      <span className="link-resource-title">{res.title}</span>
                      <ArrowRight size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Quote Section */}
            <motion.div className="link-quote" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
              <p><i>"Design is not just what it looks like and feels like. Design is how it works. We curate digital ecosystems that transcend utility to become legacy."</i></p>
              <p className="link-quote-author">AVANI MANAGEMENT TEAM</p>
            </motion.div>

            {/* Reviews & Reels */}
            <motion.button
              className="link-reviews-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              onClick={() => trackAndOpen('link', 'reviews-reels', 'https://www.instagram.com/avanienterprises.branding/reels/')}
            >
              REVIEWS & REELS
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <motion.footer className="link-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}>
          <p>AVANI ENTERPRISES © 2024 ALL RIGHTS RESERVED.</p>
        </motion.footer>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .link-root {
          height: 100vh;
          background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #0d1117 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
          color: #f8f9fa;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .link-bg {
          position: fixed;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(212, 160, 23, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 100%, rgba(212, 160, 23, 0.05) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .link-container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .link-container { padding: 20px 40px; }
        }

        /* ── Navbar ── */
        .link-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(212, 160, 23, 0.2);
          flex-shrink: 0;
        }

        .link-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .link-logo img {
          width: 28px;
          height: 28px;
          border-radius: 6px;
        }

        .link-theme-toggle {
          background: rgba(212, 160, 23, 0.1);
          border: 1px solid rgba(212, 160, 23, 0.3);
          color: #D4A017;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .link-theme-toggle:hover {
          background: rgba(212, 160, 23, 0.2);
          border-color: rgba(212, 160, 23, 0.5);
        }

        /* ── Hero Section ── */
        .link-hero {
          margin-bottom: 12px;
          text-align: left;
          flex-shrink: 0;
        }

        .link-hero-title {
          font-size: 32px;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 8px;
          letter-spacing: -1.5px;
        }
        @media (min-width: 768px) {
          .link-hero-title { font-size: 48px; margin-bottom: 10px; }
        }

        .link-hero-title span {
          display: inline;
          margin-right: 8px;
        }

        .link-accent {
          color: #D4A017;
        }

        .link-hero-subtitle {
          font-size: 14px;
          color: #a0a0a0;
          line-height: 1.5;
          max-width: 500px;
          margin-bottom: 10px;
        }

        .link-hero-bottom {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-top: 8px;
        }

        .link-hero-badges {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .link-hero-badges span {
          background: rgba(212, 160, 23, 0.1);
          border: 1px solid rgba(212, 160, 23, 0.4);
          color: #D4A017;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        /* ── CTA Buttons ── */
        .link-cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
          flex-shrink: 0;
        }

        .link-cta-primary, .link-cta-secondary {
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-family: inherit;
        }

        .link-cta-primary {
          background: #D4A017;
          color: #000;
        }

        .link-cta-primary:hover {
          background: #E8B830;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 160, 23, 0.3);
        }

        .link-cta-secondary {
          background: transparent;
          color: #D4A017;
          border: 2px solid #D4A017;
        }

        .link-cta-secondary:hover {
          background: rgba(212, 160, 23, 0.1);
          transform: translateY(-2px);
        }

        /* ── Content Grid ── */
        .link-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 16px;
          flex: 1;
          min-height: 0;
          overflow: auto;
        }
        @media (min-width: 768px) {
          .link-content-grid { grid-template-columns: 1fr 1fr; gap: 24px; overflow: hidden; }
        }

        .link-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: space-between;
        }

        /* ── Cards ── */
        .link-card {
          background: rgba(26, 31, 46, 0.6);
          border: 1px solid rgba(212, 160, 23, 0.2);
          border-radius: 12px;
          padding: 14px 16px;
          backdrop-filter: blur(10px);
        }

        .link-card h3 {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 8px;
          text-transform: uppercase;
          color: #D4A017;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .link-card p {
          font-size: 13px;
          color: #a0a0a0;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .link-card-btn {
          background: transparent;
          border: 1px solid rgba(212, 160, 23, 0.4);
          color: #D4A017;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .link-card-btn:hover {
          background: rgba(212, 160, 23, 0.1);
          border-color: #D4A017;
          transform: translateX(4px);
        }

        /* ── Website Card with BG ── */
        .link-website-card {
          flex: 1;
          background-image: url('/hero-bg.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 0 !important;
          overflow: hidden;
        }

        .link-website-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15, 20, 25, 0.3) 0%, rgba(15, 20, 25, 0.85) 60%, rgba(15, 20, 25, 0.95) 100%);
          z-index: 0;
        }

        .link-website-content {
          position: relative;
          z-index: 1;
          padding: 14px 16px;
          width: 100%;
        }

        /* ── Socials ── */
        .link-socials {
          padding: 12px 16px;
        }

        .link-socials h3 {
          margin-bottom: 8px;
        }

        .link-social-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 10px;
        }

        .link-social-grid a {
          aspect-ratio: auto;
          padding: 10px;
          background: rgba(212, 160, 23, 0.1);
          border: 1px solid rgba(212, 160, 23, 0.3);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D4A017;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .link-social-grid a:hover {
          background: #D4A017;
          color: #000;
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(212, 160, 23, 0.3);
        }

        .link-whatsapp-btn {
          background: #25D366;
          border: none;
          color: #fff;
          padding: 9px 16px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .link-whatsapp-btn:hover {
          background: #1EBE56;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
        }

        /* ── Resources ── */
        .link-resources .link-resources-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .link-resource-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(212, 160, 23, 0.2);
          border-radius: 10px;
          padding: 12px 14px;
          background: rgba(212, 160, 23, 0.05);
          text-decoration: none;
          color: #D4A017;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 12px;
          font-weight: 600;
        }

        .link-resource-item:hover {
          background: rgba(212, 160, 23, 0.12);
          border-color: rgba(212, 160, 23, 0.4);
          transform: translateX(4px);
        }

        .link-resource-title {
          flex: 1;
          text-align: left;
          color: #f8f9fa;
        }

        .link-resource-item svg {
          flex-shrink: 0;
        }

        /* ── Quote ── */
        .link-quote {
          background: rgba(26, 31, 46, 0.4);
          border-left: 4px solid #D4A017;
          border-radius: 4px;
          padding: 16px 18px;
          backdrop-filter: blur(6px);
        }

        .link-quote p {
          font-size: 13px;
          color: #e0e0e0;
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 8px;
        }

        .link-quote-author {
          font-size: 11px;
          color: #D4A017;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-style: normal !important;
        }

        /* ── Reviews & Reels Button ── */
        .link-reviews-btn {
          width: 100%;
          background: linear-gradient(135deg, rgba(212, 160, 23, 0.15) 0%, rgba(212, 160, 23, 0.05) 100%);
          border: 1px solid rgba(212, 160, 23, 0.4);
          color: #D4A017;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .link-reviews-btn:hover {
          background: #D4A017;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 160, 23, 0.3);
        }

        /* ── Footer ── */
        .link-footer {
          border-top: 1px solid rgba(212, 160, 23, 0.2);
          padding-top: 12px;
          padding-bottom: 4px;
          text-align: center;
          flex-shrink: 0;
        }

        .link-footer p {
          font-size: 11px;
          color: #808080;
          margin-bottom: 6px;
        }

        .link-footer-links {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .link-footer-links a {
          font-size: 11px;
          color: #D4A017;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .link-footer-links a:hover {
          color: #E8B830;
        }

        /* ══════ LIGHT THEME ══════ */
        .link-light {
          background: linear-gradient(135deg, #f5f0e8 0%, #faf7f0 50%, #f0ebe0 100%);
          color: #1a1a1a;
        }

        .link-light .link-bg {
          background:
            radial-gradient(circle at 20% 50%, rgba(212, 160, 23, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 100%, rgba(212, 160, 23, 0.04) 0%, transparent 50%);
        }

        .link-light .link-navbar {
          border-bottom-color: rgba(212, 160, 23, 0.25);
        }

        .link-light .link-logo { color: #1a1a1a; }

        .link-light .link-hero-title span { color: #1a1a1a; }
        .link-light .link-accent { color: #B8860B; }
        .link-light .link-hero-subtitle { color: #666; }

        .link-light .link-hero-badges span {
          background: rgba(212, 160, 23, 0.1);
          border-color: rgba(184, 134, 11, 0.4);
          color: #8B6914;
        }

        .link-light .link-cta-primary {
          background: #B8860B;
          color: #fff;
        }
        .link-light .link-cta-primary:hover {
          background: #D4A017;
          box-shadow: 0 8px 24px rgba(184, 134, 11, 0.25);
        }

        .link-light .link-card {
          background-color: rgba(255, 255, 255, 0.7);
          border-color: rgba(212, 160, 23, 0.2);
          backdrop-filter: blur(10px);
        }
        .link-light .link-card h3 { color: #8B6914; }
        .link-light .link-card p { color: #666; }

        .link-light .link-card-btn {
          border-color: rgba(184, 134, 11, 0.4);
          color: #8B6914;
        }
        .link-light .link-card-btn:hover {
          background: rgba(212, 160, 23, 0.1);
        }

        .link-light .link-website-card {
          background-color: transparent;
        }

        .link-light .link-website-card::before {
          background: linear-gradient(to bottom, rgba(245, 240, 232, 0.05) 0%, rgba(245, 240, 232, 0.5) 50%, rgba(245, 240, 232, 0.88) 100%);
        }

        .link-light .link-social-grid a {
          background: rgba(212, 160, 23, 0.08);
          border-color: rgba(184, 134, 11, 0.3);
          color: #8B6914;
        }
        .link-light .link-social-grid a:hover {
          background: #B8860B;
          color: #fff;
        }

        .link-light .link-whatsapp-btn { color: #fff; }

        .link-light .link-resource-header { color: #8B6914; }
        .link-light .link-resource-title { color: #1a1a1a; }
        .link-light .link-resource-item { border-color: rgba(184, 134, 11, 0.2); }
        .link-light .link-resource-header { background: rgba(212, 160, 23, 0.06); }
        .link-light .link-resource-content { background: rgba(245, 240, 232, 0.5); }
        .link-light .link-resource-content p { color: #666; }
        .link-light .link-resource-download { color: #8B6914; border-color: rgba(184, 134, 11, 0.4); }

        .link-light .link-quote {
          background: rgba(255, 255, 255, 0.5);
          border-left-color: #B8860B;
        }
        .link-light .link-quote p { color: #444; }
        .link-light .link-quote-author { color: #8B6914; }

        .link-light .link-reviews-btn {
          background: linear-gradient(135deg, rgba(184, 134, 11, 0.12) 0%, rgba(184, 134, 11, 0.04) 100%);
          border-color: rgba(184, 134, 11, 0.4);
          color: #8B6914;
        }
        .link-light .link-reviews-btn:hover {
          background: #B8860B;
          color: #fff;
        }

        .link-light .link-theme-toggle {
          background: rgba(184, 134, 11, 0.1);
          border-color: rgba(184, 134, 11, 0.3);
          color: #8B6914;
        }

        .link-light .link-footer { border-top-color: rgba(184, 134, 11, 0.2); }
        .link-light .link-footer p { color: #999; }
      `}</style>
    </div>
  );
}
