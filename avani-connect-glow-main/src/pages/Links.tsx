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
  { _id: 'default-website', title: 'Visit Our Website', url: 'https://www.avanienterprises.in', description: 'Explore our full range of services', icon: 'globe', color: '#3b82f6', isActive: true, clickCount: 0 },
  { _id: 'default-consultation', title: 'Book a Free Consultation', url: 'https://www.avanienterprises.in/get-consultation', description: "Let's discuss your business goals and growth", icon: 'phone', color: '#10B981', isActive: true, clickCount: 0 },
  { _id: 'default-services', title: 'Our Services', url: 'https://www.avanienterprises.in/services', description: 'Digital Marketing, Web Dev, SEO & more', icon: 'briefcase', color: '#8b5cf6', isActive: true, clickCount: 0 },
  { _id: 'default-case-studies', title: 'Case Studies', url: 'https://www.avanienterprises.in/case-studies', description: 'See the results we deliver', icon: 'external', color: '#f59e0b', isActive: true, clickCount: 0 },
  { _id: 'default-blog', title: 'Read Our Blog', url: 'https://www.avanienterprises.in/blog', description: 'Insights, tips & industry trends', icon: 'external', color: '#ec4899', isActive: true, clickCount: 0 },
  { _id: 'default-careers', title: "We're Hiring — Careers", url: 'https://www.avanienterprises.in/careers', description: 'Join our growing team today', icon: 'external', color: '#14b8a6', isActive: true, clickCount: 0 },
  { _id: 'default-whatsapp', title: 'Chat on WhatsApp', url: 'https://wa.me/919253625099', description: 'Quick response guaranteed', icon: 'whatsapp', color: '#22c55e', isActive: true, clickCount: 0, animation: 'pulse' },
  { _id: 'default-pdf-services', title: 'Avani Services Brochure', url: '/Avani Enterprises Services ( Website, SMM and Ads )  (3).pdf', description: 'Detailed Website, SMM & Ads Services', icon: 'file', color: '#ef4444', isActive: true, clickCount: 0 },
  { _id: 'default-pdf-bundle', title: 'Avani Services Bundle', url: '/Avani services bundle (2).pdf', description: 'Complete services package details', icon: 'file', color: '#eab308', isActive: true, clickCount: 0 },
];

/* ─── Component ─── */
export default function Links() {
  const [links, setLinks] = useState<Link[]>(defaultLinks);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLinks(); }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/links`);
      const apiLinks = response.data.filter((l: Link) => l.isActive);
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
              const isWide = i % 3 === 0;
              return (
                <motion.div
                  key={link._id}
                  className={`blo-bento-card blo-card-standard ${isWide ? 'blo-span-2' : 'blo-span-1'}`}
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
          background: linear-gradient(155deg, #f0f4ff 0%, #fafbff 45%, #fffdf4 100%);
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #111827;
          position: relative;
          overflow-x: hidden;
          padding: 40px 16px 52px;
        }
        .blo-root * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ══ BACKGROUND BLOBS ══ */
        .blo-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .blo-bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
        }
        .blo-bg-blob-1 {
          top: -12%; right: -8%;
          width: 520px; height: 520px;
          background: radial-gradient(circle, #c4b5fd 0%, #e0e7ff 55%, transparent 100%);
          opacity: 0.55;
        }
        .blo-bg-blob-2 {
          bottom: -18%; left: -10%;
          width: 580px; height: 580px;
          background: radial-gradient(circle, #fde68a 0%, #fef3c7 55%, transparent 100%);
          opacity: 0.5;
        }
        .blo-bg-blob-3 {
          top: 40%; left: 30%;
          width: 320px; height: 320px;
          background: radial-gradient(circle, #bae6fd 0%, transparent 70%);
          opacity: 0.35;
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
          gap: 14px;
        }
        @media (min-width: 560px) {
          .blo-bento-grid { grid-template-columns: repeat(2, 1fr); }
          .blo-span-2 { grid-column: span 2; }
          .blo-span-1 { grid-column: span 1; }
        }

        /* ══ BASE CARD ══ */
        .blo-bento-card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 22px;
          padding: 22px;
          border: 1px solid rgba(139, 92, 246, 0.08);
          box-shadow:
            0 2px 12px rgba(99, 102, 241, 0.06),
            0 1px 3px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.95);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.28s ease, transform 0.28s ease, border-color 0.28s ease;
        }

        /* ══ 1. PROFILE CARD ══ */
        .blo-card-profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: default;
          padding: 30px 24px;
          background: linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(245,243,255,0.88) 100%);
          border: 1px solid rgba(139,92,246,0.12);
          box-shadow:
            0 4px 32px rgba(139, 92, 246, 0.1),
            0 1px 4px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,1);
        }
        @media (min-width: 560px) {
          .blo-card-profile { flex-direction: row; text-align: left; align-items: center; gap: 24px; padding: 30px 28px; }
        }

        .blo-profile-avatar {
          position: relative;
          width: 92px; height: 92px;
          margin-bottom: 16px;
          flex-shrink: 0;
        }
        @media (min-width: 560px) { .blo-profile-avatar { width: 106px; height: 106px; margin-bottom: 0; } }

        .blo-profile-avatar img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 26px;
          box-shadow:
            0 0 0 3px rgba(139,92,246,0.18),
            0 8px 30px rgba(139,92,246,0.18),
            0 2px 8px rgba(0,0,0,0.07);
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
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin-bottom: 5px;
          background: linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .blo-profile-tagline {
          font-size: 0.92rem;
          color: #6B7280;
          font-weight: 500;
          margin-bottom: 14px;
        }

        .blo-profile-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          justify-content: center;
        }
        @media (min-width: 560px) { .blo-profile-badges { justify-content: flex-start; } }

        .blo-profile-badges span {
          background: linear-gradient(135deg, #ede9fe, #e0e7ff);
          color: #4338ca;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          border: 1px solid rgba(99,102,241,0.16);
        }

        /* ══ 2. CTA CARD ══ */
        .blo-card-cta {
          background: linear-gradient(135deg, #2e1f7a 0%, #4338ca 45%, #6927d1 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 30px 28px;
          border: 1px solid rgba(99,102,241,0.28);
          box-shadow:
            0 10px 48px rgba(99,102,241,0.32),
            0 2px 8px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.07);
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }
        .blo-card-cta:hover {
          box-shadow: 0 18px 64px rgba(99,102,241,0.42), 0 4px 14px rgba(0,0,0,0.12);
        }

        .blo-cta-content { position: relative; z-index: 2; max-width: 80%; }

        .blo-badge-pro {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.1);
          color: #FDE68A;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 5px 13px;
          border-radius: 100px;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          border: 1px solid rgba(253,230,138,0.28);
          backdrop-filter: blur(4px);
        }

        .blo-card-cta h2 {
          font-size: 1.38rem;
          font-weight: 700;
          margin-bottom: 7px;
          line-height: 1.2;
        }

        .blo-card-cta p {
          color: rgba(219,226,255,0.7);
          font-size: 0.88rem;
          line-height: 1.45;
        }

        .blo-cta-arrow {
          position: relative;
          z-index: 2;
          width: 46px; height: 46px;
          background: rgba(255,255,255,0.13);
          color: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }
        .blo-card-cta:hover .blo-cta-arrow {
          transform: translateX(7px);
          background: rgba(255,255,255,0.22);
          box-shadow: 0 4px 16px rgba(255,255,255,0.1);
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
          background: linear-gradient(150deg, rgba(255,255,255,0.9), rgba(245,243,255,0.85));
          border: 1px solid rgba(99,102,241,0.1);
        }

        .blo-section-title {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #6366f1;
          letter-spacing: 0.09em;
          margin-bottom: 14px;
          display: flex; align-items: center; gap: 5px;
        }

        .blo-socials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
          flex: 1;
        }

        .blo-social-btn {
          background: linear-gradient(145deg, #f5f3ff, #ecebfe);
          border: 1px solid rgba(99,102,241,0.1);
          border-radius: 15px;
          display: flex; align-items: center; justify-content: center;
          aspect-ratio: 1;
          color: #6366f1;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          outline: none;
        }
        .blo-social-btn:hover {
          background: var(--btn-color);
          color: #fff;
          border-color: var(--btn-color);
          transform: translateY(-4px) scale(1.06);
          box-shadow: 0 8px 22px rgba(0,0,0,0.12);
        }

        /* ══ 4. RESOURCES ══ */
        .blo-card-resources {
          display: flex;
          flex-direction: column;
          background: linear-gradient(150deg, rgba(255,255,255,0.9), rgba(255,251,240,0.88));
          border: 1px solid rgba(245,158,11,0.12);
        }

        .blo-card-resources .blo-section-title {
          color: #D97706;
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
          background: rgba(255,251,235,0.75);
          border: 1px solid rgba(245,158,11,0.15);
          padding: 11px 14px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          outline: none;
          text-align: left;
          width: 100%;
        }
        .blo-resource-btn:hover {
          background: #FEF3C7;
          border-color: rgba(245,158,11,0.35);
          box-shadow: 0 4px 18px rgba(245,158,11,0.14);
          transform: translateX(3px);
        }

        .blo-resource-icon {
          color: #B45309;
          background: linear-gradient(135deg, #FDE68A, #FEF3C7);
          width: 34px; height: 34px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(180,83,9,0.12);
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
          color: #B45309;
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        /* ══ 5. STANDARD LINKS ══ */
        .blo-card-standard {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .blo-card-standard:hover {
          border-color: rgba(var(--accent-rgb, 99,102,241), 0.2);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.06),
            0 2px 8px rgba(0,0,0,0.04);
        }

        .blo-std-icon {
          width: 52px; height: 52px;
          background: color-mix(in srgb, var(--accent) 10%, #f5f4ff);
          border: 1.5px solid color-mix(in srgb, var(--accent) 18%, transparent);
          color: var(--accent);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .blo-card-standard:hover .blo-std-icon {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
          box-shadow: 0 4px 18px color-mix(in srgb, var(--accent) 32%, transparent);
        }

        .blo-std-content { flex: 1; min-width: 0; }

        .blo-std-title {
          font-size: 1rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.22s ease;
        }
        .blo-card-standard:hover .blo-std-title { color: var(--accent); }

        .blo-std-desc {
          font-size: 0.78rem;
          color: #6B7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .blo-std-arrow {
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #C4C9D4;
          background: #F3F4F6;
          flex-shrink: 0;
          transition: all 0.28s ease;
        }
        .blo-card-standard:hover .blo-std-arrow {
          color: #fff;
          background: var(--accent);
          transform: translateX(2px);
          box-shadow: 0 2px 10px color-mix(in srgb, var(--accent) 30%, transparent);
        }

        /* ══ 6. WHATSAPP CARD ══ */
        .blo-card-whatsapp {
          background: linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%);
          display: flex; align-items: center; gap: 20px;
          padding: 22px 28px;
          color: #fff;
          border: 1px solid rgba(16,185,129,0.22);
          box-shadow:
            0 8px 40px rgba(16,185,129,0.26),
            0 2px 8px rgba(0,0,0,0.06);
          transition: box-shadow 0.32s ease, transform 0.32s ease;
        }
        .blo-card-whatsapp:hover {
          box-shadow: 0 16px 58px rgba(16,185,129,0.36), 0 4px 12px rgba(0,0,0,0.08);
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
        .blo-footer { margin-top: 40px; text-align: center; }
        .blo-footer a {
          display: inline-flex; align-items: center; gap: 6px;
          color: #9CA3AF;
          font-size: 0.83rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.22s ease;
        }
        .blo-footer a:hover { color: #6366f1; }

        /* ══ LOADER ══ */
        .blo-loader-wrapper { display: flex; justify-content: center; padding: 40px; }
        .blo-loader {
          width: 38px; height: 38px;
          border: 3.5px solid #E0E7FF;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
