import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink, Instagram, Linkedin, Twitter, Youtube,
  Facebook, Mail, Globe, Phone, MessageCircle, Sparkles,
  FileText, Briefcase, ArrowRight, DownloadCloud, ChevronRight,
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
  if (l.includes('youtube') || u.includes('youtube')) return Youtube;
  if (l.includes('facebook') || u.includes('facebook')) return Facebook;
  if (l.includes('whatsapp') || u.includes('whatsapp') || u.includes('wa.me')) return MessageCircle;
  if (l.includes('phone') || l.includes('call') || u.includes('tel:')) return Phone;
  if (l.includes('mail') || l.includes('email') || u.includes('mailto:')) return Mail;
  if (l.includes('web') || l.includes('site') || l.includes('globe')) return Globe;
  if (u.endsWith('.pdf') || l.includes('pdf') || l.includes('file')) return FileText;
  if (l.includes('briefcase') || l.includes('services')) return Briefcase;
  return ExternalLink;
};

/* ─── Socials ─── */
const socials = [
  { href: 'https://www.instagram.com/avanienterprises.branding/', icon: Instagram, label: 'Instagram', color: '#E1306C' },
  { href: 'https://www.linkedin.com/company/avani-enterprises-india/', icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' },
  { href: 'https://www.facebook.com/share/1DKFWQiBe4/', icon: Facebook, label: 'Facebook', color: '#1877F2' },
  { href: 'https://wa.me/919253625099', icon: MessageCircle, label: 'WhatsApp', color: '#25D366' },
  { href: 'mailto:kp@avanienterprises.in', icon: Mail, label: 'Email', color: '#06B6D4' },
  { href: 'tel:+919253625099', icon: Phone, label: 'Call Us', color: '#10B981' },
];

/* ─── Default Links ─── */
const defaultLinks: Link[] = [
  { _id: 'default-website', title: 'Visit Our Website', url: 'https://www.avanienterprises.in', description: 'Explore our full range of services', icon: 'globe', color: '#d97f5e', isActive: true, clickCount: 0 },
  { _id: 'default-consultation', title: 'Book a Free Consultation', url: 'https://www.avanienterprises.in/get-consultation', description: "Let's discuss your business goals and growth", icon: 'phone', color: '#10B981', isActive: true, clickCount: 0 },
  { _id: 'default-services', title: 'Our Services', url: 'https://www.avanienterprises.in/services', description: 'Digital Marketing, Web Dev, SEO & more', icon: 'briefcase', color: '#c07456', isActive: true, clickCount: 0 },
  { _id: 'default-whatsapp', title: 'Chat on WhatsApp', url: 'https://wa.me/919253625099', description: 'Quick response guaranteed', icon: 'whatsapp', color: '#22c55e', isActive: true, clickCount: 0, animation: 'pulse' },
  { _id: 'default-pdf-services', title: 'Avani Services Brochure', url: '/Avani Enterprises Services ( Website, SMM and Ads )  (3).pdf', description: 'Detailed Website, SMM & Ads Services', icon: 'file', color: '#b85a50', isActive: true, clickCount: 0 },
  { _id: 'default-pdf-bundle', title: 'Avani Services Bundle', url: '/Avani services bundle (2).pdf', description: 'Complete services package details', icon: 'file', color: '#c07456', isActive: true, clickCount: 0 },
];

/* ─── Component ─── */
export default function Links() {
  const [links, setLinks] = useState<Link[]>(defaultLinks);
  const [loading, setLoading] = useState(true);

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
      try { await axios.post(`${API_BASE_URL}/api/links/${idOrPlatform}/click`, { userAgent: navigator.userAgent, referrer: document.referrer }); } catch {}
    } else if (type === 'social') {
      try { await axios.post(`${API_BASE_URL}/api/social-clicks`, { platform: idOrPlatform, userAgent: navigator.userAgent, referrer: document.referrer }); } catch {}
    }
    window.open(url, '_blank');
  };

  const consultationLink = links.find(l => l.url.includes('consultation') || l.title.toLowerCase().includes('consult'));
  const whatsappLink = links.find(l => l.url.includes('whatsapp') || l.url.includes('wa.me') || l.title.toLowerCase().includes('whatsapp'));
  const downloads = links.filter(l => l.url.endsWith('.pdf'));
  const standardLinks = links.filter(l => l !== consultationLink && l !== whatsappLink && !downloads.includes(l));

  return (
    <div className="blo-root">
      <div className="blo-background">
        <div className="blo-bg-blob blo-bg-blob-1" />
        <div className="blo-bg-blob blo-bg-blob-2" />
        <div className="blo-bg-blob blo-bg-blob-3" />
        <div className="blo-bg-blob blo-bg-blob-4" />
        <div className="blo-bg-blob blo-bg-blob-5" />
      </div>

      <div className="blo-container">
        <div className="blo-bento-grid">

          {/* ── Profile ── */}
          <motion.div
            className="blo-bento-card blo-span-2 blo-card-profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="blo-profile-avatar">
              <img src="/avani-logo.jpg" alt="Avani Enterprises" />
              <div className="blo-status-dot" />
            </div>
            <div className="blo-profile-info">
              <h1 className="blo-profile-name">Avani Enterprises</h1>
              <p className="blo-profile-tagline">India's #1 Digital Marketing Agency</p>
              <div className="blo-profile-badges">
                <span>Marketing</span>
                <span>Development</span>
                <span>Branding</span>
              </div>
            </div>
          </motion.div>

          {/* ── Consultation CTA ── */}
          {consultationLink && (
            <motion.div
              className="blo-bento-card blo-span-2 blo-card-cta"
              onClick={() => trackAndOpen('link', consultationLink._id, consultationLink.url)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.018 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="blo-cta-content">
                <div className="blo-badge-pro"><Sparkles size={12} fill="currentColor" /> Let's Grow Together</div>
                <h2>{consultationLink.title.replace(/^[\u0000-\u27FF]+\s/g, '')}</h2>
                <p>{consultationLink.description}</p>
              </div>
              <div className="blo-cta-arrow"><ArrowRight size={22} /></div>
              <div className="blo-cta-glow" />
            </motion.div>
          )}

          {/* ── Socials ── */}
          <motion.div
            className="blo-bento-card blo-span-1 blo-card-socials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="blo-section-title">Connect With Us</h3>
            <div className="blo-socials-grid">
              {socials.map(social => (
                <button
                  key={social.label}
                  className="blo-social-btn"
                  title={social.label}
                  style={{ '--btn-color': social.color } as React.CSSProperties}
                  onClick={() => trackAndOpen('social', social.label, social.href)}
                >
                  <social.icon size={21} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Resources ── */}
          {downloads.length > 0 && (
            <motion.div
              className="blo-bento-card blo-span-1 blo-card-resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="blo-section-title">Resources <DownloadCloud size={15} /></h3>
              <div className="blo-resources-list">
                {downloads.map(dl => (
                  <button key={dl._id} className="blo-resource-btn" onClick={() => trackAndOpen('link', dl._id, dl.url)}>
                    <div className="blo-resource-icon"><FileText size={17} /></div>
                    <div className="blo-resource-text">
                      <span className="blo-res-title">{dl.title.replace(/^[\u0000-\u27FF]+\s/g, '')}</span>
                      <span className="blo-res-tag">PDF</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Standard Links ── */}
          {loading ? (
            <div className="blo-span-2 blo-loader-wrapper">
              <div className="blo-loader" />
            </div>
          ) : (
            standardLinks.map((link, i) => {
              const Icon = resolveIcon(link.icon, link.url);
              return (
                <motion.div
                  key={link._id}
                  className="blo-bento-card blo-card-standard blo-span-1"
                  style={{ '--accent': link.color || '#6366f1' } as React.CSSProperties}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.45 }}
                  onClick={() => trackAndOpen('link', link._id, link.url)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="blo-std-icon"><Icon size={22} /></div>
                  <div className="blo-std-content">
                    <h3 className="blo-std-title">{link.title.replace(/^[\u0000-\u27FF]+\s/g, '')}</h3>
                    {link.description && <p className="blo-std-desc">{link.description}</p>}
                  </div>
                  <div className="blo-std-arrow"><ChevronRight size={18} /></div>
                </motion.div>
              );
            })
          )}

          {/* ── WhatsApp ── */}
          {whatsappLink && (
            <motion.div
              className="blo-bento-card blo-span-2 blo-card-whatsapp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              onClick={() => trackAndOpen('link', whatsappLink._id, whatsappLink.url)}
              whileHover={{ scale: 1.018 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="blo-wa-ring"><MessageCircle size={26} color="#fff" /></div>
              <div className="blo-wa-text">
                <h3>{whatsappLink.title.replace(/^[\u0000-\u27FF]+\s/g, '')}</h3>
                <p>{whatsappLink.description}</p>
              </div>
            </motion.div>
          )}

        </div>

        <footer className="blo-footer">
          <a href="https://www.avanienterprises.in" target="_blank" rel="noopener noreferrer">
            <Globe size={13} /> avanienterprises.in
          </a>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        /* ══ ROOT ══ */
        .blo-root {
          min-height: 100vh;
          background: linear-gradient(155deg, #fffafa 0%, #fffcfb 45%, #fff5f0 100%);
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #111827;
          position: relative;
          overflow-x: hidden;
          padding: 24px 12px 32px;
        }
        @media (min-width: 560px) {
          .blo-root { padding: 40px 16px 52px; }
        }
        @media (min-width: 560px) {
          .blo-root { padding: 40px 16px 52px; }
        }
        .blo-root * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ══ BACKGROUND BLOBS ══ */
        .blo-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          background-image: url('/mesh-bg.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .blo-bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
        }
        .blo-bg-blob-1 {
          top: -12%; right: -8%;
          width: 520px; height: 520px;
          background: radial-gradient(circle, #e8956c 0%, #f0b990 55%, transparent 100%);
          opacity: 0.65;
          animation: float-blob-1 15s ease-in-out infinite;
        }
        .blo-bg-blob-2 {
          bottom: -18%; left: -10%;
          width: 580px; height: 580px;
          background: radial-gradient(circle, #d97f5e 0%, #e8956c 55%, transparent 100%);
          opacity: 0.58;
          animation: float-blob-2 18s ease-in-out infinite;
        }
        .blo-bg-blob-3 {
          top: 40%; left: 30%;
          width: 320px; height: 320px;
          background: radial-gradient(circle, #d9966e 0%, transparent 70%);
          opacity: 0.55;
          animation: float-blob-3 20s ease-in-out infinite;
        }
        .blo-bg-blob-4 {
          top: 15%; right: 10%;
          width: 380px; height: 380px;
          background: radial-gradient(circle, #e0926b 0%, #eaa877 60%, transparent 100%);
          opacity: 0.6;
          animation: float-blob-4 16s ease-in-out infinite;
        }
        .blo-bg-blob-5 {
          bottom: 10%; right: 15%;
          width: 420px; height: 420px;
          background: radial-gradient(circle, #f0b990 0%, #d9966e 50%, transparent 100%);
          opacity: 0.52;
          animation: float-blob-5 22s ease-in-out infinite;
        }

        @keyframes float-blob-1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(40px, -30px); }
          50% { transform: translate(20px, 50px); }
          75% { transform: translate(-30px, 20px); }
        }

        @keyframes float-blob-2 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-50px, 40px); }
          50% { transform: translate(30px, -40px); }
          75% { transform: translate(-20px, -50px); }
        }

        @keyframes float-blob-3 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(35px, 25px); }
          50% { transform: translate(-40px, 35px); }
          75% { transform: translate(25px, -35px); }
        }

        @keyframes float-blob-4 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-45px, -25px); }
          50% { transform: translate(25px, 45px); }
          75% { transform: translate(-35px, 30px); }
        }

        @keyframes float-blob-5 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(50px, 30px); }
          50% { transform: translate(-30px, -50px); }
          75% { transform: translate(40px, 40px); }
        }

        /* ══ CONTAINER ══ */
        .blo-container {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
        }

        /* ══ BENTO GRID ══ */
        .blo-bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        @media (min-width: 560px) {
          .blo-bento-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .blo-span-2 { grid-column: span 2; }
          .blo-span-1 { grid-column: span 1; }
        }

        /* ══ BASE CARD ══ */
        .blo-bento-card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 16px;
          border: 1.5px solid rgba(217, 127, 94, 0.12);
          box-shadow:
            0 4px 20px rgba(217, 127, 94, 0.08),
            0 8px 32px rgba(217, 127, 94, 0.06),
            0 1px 3px rgba(0,0,0,0.05),
            inset 0 1px 0 rgba(255,255,255,1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 560px) {
          .blo-bento-card { padding: 22px; border-radius: 24px; background: rgba(255, 255, 255, 0.92); }
        }
        .blo-bento-card:hover {
          border-color: rgba(217, 127, 94, 0.22);
          box-shadow:
            0 6px 28px rgba(217, 127, 94, 0.12),
            0 12px 48px rgba(217, 127, 94, 0.1);
        }

        /* ══ 1. PROFILE CARD ══ */
        .blo-card-profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: default;
          padding: 18px 16px;
          background: linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(255,250,245,0.80) 100%);
          border: 1.5px solid rgba(217, 127, 94, 0.15);
          box-shadow:
            0 8px 40px rgba(217, 127, 94, 0.08),
            0 2px 12px rgba(217, 127, 94, 0.06),
            inset 0 1px 0 rgba(255,255,255,1);
        }
        @media (min-width: 560px) {
          .blo-card-profile { flex-direction: row; text-align: left; align-items: center; gap: 24px; padding: 30px 28px; background: linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(255,250,245,0.92) 100%); }
        }

        .blo-profile-avatar {
          position: relative;
          width: 72px; height: 72px;
          margin-bottom: 12px;
          flex-shrink: 0;
        }
        @media (min-width: 560px) {
          .blo-profile-avatar { width: 92px; height: 92px; margin-bottom: 16px; }
        }

        .blo-profile-avatar img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 26px;
          box-shadow:
            0 0 0 4px rgba(217, 127, 94, 0.2),
            0 12px 40px rgba(217, 127, 94, 0.12),
            0 4px 12px rgba(0,0,0,0.1);
          border: 2px solid rgba(255, 255, 255, 0.8);
        }

        .blo-status-dot {
          position: absolute;
          bottom: -2px; right: -2px;
          width: 18px; height: 18px;
          background: #10B981;
          border: 3.5px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 2px rgba(16,185,129,0.22), 0 0 10px rgba(16,185,129,0.3);
        }

        .blo-profile-info { flex: 1; }

        .blo-profile-name {
          font-size: 1.16rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin-bottom: 4px;
          background: linear-gradient(135deg, #c07456 0%, #d9946d 50%, #e8a878 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @media (min-width: 560px) {
          .blo-profile-name { font-size: 1.5rem; margin-bottom: 5px; }
        }

        .blo-profile-tagline {
          font-size: 0.8rem;
          color: #6B7280;
          font-weight: 500;
          margin-bottom: 10px;
        }
        @media (min-width: 560px) {
          .blo-profile-tagline { font-size: 0.92rem; margin-bottom: 14px; }
        }

        .blo-profile-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          justify-content: center;
        }
        @media (min-width: 560px) { .blo-profile-badges { justify-content: flex-start; } }

        .blo-profile-badges span {
          background: linear-gradient(135deg, #f5e6d3, #f0e6d2);
          color: #8b6914;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          border: 1px solid rgba(184, 134, 11, 0.16);
        }

        /* ══ 2. CTA CARD ══ */
        .blo-card-cta {
          background: linear-gradient(135deg, #d4a574 0%, #dcb380 40%, #e4c18c 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 18px;
          gap: 12px;
          border: 2px solid rgba(212, 165, 116, 0.4);
          box-shadow:
            0 14px 56px rgba(212, 165, 116, 0.2),
            0 4px 20px rgba(212, 165, 116, 0.12),
            0 -2px 8px rgba(255,255,255,0.1) inset;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 560px) {
          .blo-card-cta { padding: 32px 32px; gap: 0; }
        }
        .blo-card-cta:hover {
          box-shadow: 0 22px 72px rgba(212, 165, 116, 0.25), 0 6px 24px rgba(212, 165, 116, 0.15);
          transform: translateY(-2px);
        }

        .blo-cta-content { position: relative; z-index: 2; max-width: 80%; }

        .blo-badge-pro {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.25);
          color: #3d2817;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .blo-card-cta h2 {
          font-size: 1.1rem;
          font-weight: 900;
          margin-bottom: 5px;
          line-height: 1.15;
          letter-spacing: -0.015em;
        }
        @media (min-width: 560px) {
          .blo-card-cta h2 { font-size: 1.48rem; margin-bottom: 7px; }
        }

        .blo-card-cta p {
          color: rgba(255,255,255,0.95);
          font-size: 0.75rem;
          line-height: 1.4;
        }
        @media (min-width: 560px) {
          .blo-card-cta p { font-size: 0.88rem; line-height: 1.45; }
        }

        .blo-cta-arrow {
          position: relative;
          z-index: 2;
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.22);
          color: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.35);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 560px) {
          .blo-cta-arrow { width: 50px; height: 50px; }
        }
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 12px rgba(255,255,255,0.15);
        }
        .blo-card-cta:hover .blo-cta-arrow {
          transform: translateX(8px) scale(1.1);
          background: rgba(255,255,255,0.35);
          box-shadow: 0 6px 20px rgba(255,255,255,0.25);
        }

        .blo-cta-glow {
          position: absolute;
          top: -50px; right: -50px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 65%);
          z-index: 1;
          pointer-events: none;
        }

        /* ══ 3. SOCIALS ══ */
        .blo-card-socials {
          display: flex;
          flex-direction: column;
          background: linear-gradient(150deg, rgba(255,255,255,0.92), rgba(255,250,245,0.88));
          border: 1px solid rgba(217, 127, 94, 0.1);
        }

        .blo-section-title {
          font-size: 0.76rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #c07456;
          letter-spacing: 0.11em;
          margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        @media (min-width: 560px) {
          .blo-section-title { margin-bottom: 14px; }
        }

        .blo-socials-grid {
          display: flex;
          gap: 9px;
          flex: 1;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding-bottom: 6px;
          -webkit-overflow-scrolling: touch;
        }
        @media (min-width: 560px) {
          .blo-socials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            overflow-x: visible;
          }
        }

        .blo-social-btn {
          background: linear-gradient(145deg, #f5dccf, #f0d4c8);
          border: 1.5px solid rgba(217, 127, 94, 0.2);
          border-radius: 15px;
          display: flex; align-items: center; justify-content: center;
          aspect-ratio: 1;
          color: #c07456;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          outline: none;
          box-shadow: 0 2px 8px rgba(217, 127, 94, 0.08);
          min-width: 60px;
          flex-shrink: 0;
        }
        @media (min-width: 560px) {
          .blo-social-btn {
            min-width: auto;
            flex-shrink: 1;
          }
        }
        .blo-social-btn:hover {
          background: var(--btn-color);
          color: #fff;
          border-color: var(--btn-color);
          transform: translateY(-5px) scale(1.08);
          box-shadow: 0 10px 28px rgba(0,0,0,0.15);
        }

        /* ══ 4. RESOURCES ══ */
        .blo-card-resources {
          display: flex;
          flex-direction: column;
          background: linear-gradient(150deg, rgba(255,255,255,0.92), rgba(255,250,245,0.88));
          border: 1.5px solid rgba(217, 127, 94, 0.1);
        }

        .blo-card-resources .blo-section-title {
          color: #c07456;
        }

        .blo-resources-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
          flex: 1;
          justify-content: center;
        }

        .blo-resource-btn {
          display: flex; align-items: center; gap: 11px;
          background: rgba(248,240,230,0.8);
          border: 1.5px solid rgba(217, 127, 94, 0.15);
          padding: 11px 14px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          outline: none;
          text-align: left;
          width: 100%;
        }
        .blo-resource-btn:hover {
          background: #f5e5d9;
          border-color: rgba(217, 127, 94, 0.35);
          box-shadow: 0 4px 18px rgba(217, 127, 94, 0.12);
          transform: translateX(3px);
        }

        .blo-resource-icon {
          color: #b85a50;
          background: linear-gradient(135deg, #e8d4c5, #dcc5b5);
          width: 34px; height: 34px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(217, 127, 94, 0.1);
        }

        .blo-resource-text {
          display: flex; flex-direction: column; gap: 1px;
          flex: 1; overflow: hidden;
        }

        .blo-res-title {
          font-weight: 600;
          font-size: 0.84rem;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .blo-res-tag {
          font-size: 0.63rem;
          color: #c07456;
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        /* ══ 5. STANDARD LINKS ══ */
        .blo-card-standard {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255,255,255,0.92);
          border: 1.5px solid rgba(0,0,0,0.06);
          transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .blo-card-standard:hover {
          border-color: rgba(var(--accent-rgb, 99,102,241), 0.2);
          box-shadow:
            0 10px 36px rgba(0,0,0,0.08),
            0 4px 12px rgba(0,0,0,0.06);
          transform: translateY(-4px);
        }

        .blo-std-icon {
          width: 56px; height: 56px;
          background: color-mix(in srgb, var(--accent) 14%, #f5dccf);
          border: 2px solid color-mix(in srgb, var(--accent) 25%, transparent);
          color: var(--accent);
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 2px 10px color-mix(in srgb, var(--accent) 18%, transparent);
        }
        .blo-card-standard:hover .blo-std-icon {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
          box-shadow: 0 6px 24px color-mix(in srgb, var(--accent) 45%, transparent), 0 2px 8px rgba(0,0,0,0.12);
          transform: scale(1.1);
        }

        .blo-std-content { flex: 1; min-width: 0; }

        .blo-std-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.22s ease;
          letter-spacing: -0.01em;
        }
        @media (min-width: 560px) {
          .blo-std-title { font-size: 1.02rem; margin-bottom: 3px; }
        }
        .blo-card-standard:hover .blo-std-title { color: var(--accent); }

        .blo-std-desc {
          font-size: 0.7rem;
          color: #5a5a5a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (min-width: 560px) {
          .blo-std-desc { font-size: 0.82rem; }
        }
          font-weight: 500;
        }

        .blo-std-arrow {
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #c07456;
          background: #f5dccf;
          flex-shrink: 0;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .blo-card-standard:hover .blo-std-arrow {
          color: #fff;
          background: var(--accent);
          transform: translateX(5px) scale(1.15);
          box-shadow: 0 4px 18px color-mix(in srgb, var(--accent) 45%, transparent);
        }

        /* ══ 6. WHATSAPP CARD ══ */
        .blo-card-whatsapp {
          background: linear-gradient(135deg, #10a047 0%, #1cce4f 45%, #2ddd5f 100%);
          display: flex; align-items: center; gap: 20px;
          padding: 28px 32px;
          color: #fff;
          border: 2px solid rgba(45, 221, 95, 0.3);
          box-shadow:
            0 12px 48px rgba(16,185,129,0.32),
            0 4px 16px rgba(0,0,0,0.08);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .blo-card-whatsapp:hover {
          box-shadow: 0 16px 64px rgba(16,185,129,0.42), 0 6px 20px rgba(0,0,0,0.12);
          transform: translateY(-3px);
        }

        .blo-wa-ring {
          width: 54px; height: 54px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative;
          border: 1px solid rgba(255,255,255,0.28);
        }
        .blo-wa-ring::after {
          content: '';
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.38);
          animation: wa-ping 2s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes wa-ping {
          75%, 100% { transform: scale(1.4); opacity: 0; }
        }

        .blo-wa-text h3 { font-size: 1.18rem; font-weight: 700; margin-bottom: 3px; }
        .blo-wa-text p { font-size: 0.88rem; opacity: 0.85; }

        /* ══ FOOTER ══ */
        .blo-footer { margin-top: 20px; text-align: center; }
        @media (min-width: 560px) {
          .blo-footer { margin-top: 40px; }
        }
        .blo-footer a {
          display: inline-flex; align-items: center; gap: 6px;
          color: #c07456;
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.22s ease;
        }
        @media (min-width: 560px) {
          .blo-footer a { font-size: 0.85rem; }
        }
        .blo-footer a:hover { 
          color: #b56545;
          text-shadow: 0 1px 4px rgba(217, 127, 94, 0.2);
        }

        /* ══ LOADER ══ */
        .blo-loader-wrapper { display: flex; justify-content: center; padding: 40px; }
        .blo-loader {
          width: 38px; height: 38px;
          border: 3.5px solid #f0e6d2;
          border-top-color: #b8860b;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
