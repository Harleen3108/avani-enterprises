import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
  services: [
    { label: 'Web Development', path: '/services/web-development' },
    { label: 'SEO & Content', path: '/services/seo-content' },
    { label: 'Social Media', path: '/services/social-media' },
    { label: 'AI Solutions', path: '/services/ai-solutions' },
    { label: 'Business Consulting', path: '/services/business-consultation' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  ],
};

const DummyFooter = () => (
  <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 30%, var(--border-light) 70%, transparent)' }} />

    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 48px 28px' }} className="dummy-footer-container">
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }} className="dummy-footer-grid">
        {/* Brand */}
        <div>
          <Link to="/dummyhome" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', background: '#fff', padding: '2px' }}>
              <img src="/logo0.jpg" alt="Avani" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '18px', letterSpacing: '0.14em', color: 'var(--text-primary)', lineHeight: 1, fontWeight: 700 }}>AVANI</div>
              <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '8px', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginTop: '1px', fontWeight: 500 }}>ENTERPRISES</div>
            </div>
          </Link>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13px', lineHeight: 1.7, color: 'var(--text-tertiary)', maxWidth: '280px', marginBottom: '20px', fontWeight: 400 }}>
            Your one-stop solution for digital growth. Building high-performing websites, products, and AI solutions since 2016.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="mailto:info@avanienterprises.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Satoshi', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}>
              <Mail size={12} color="var(--accent-primary)" /> info@avanienterprises.com
            </a>
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Satoshi', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}>
              <Phone size={12} color="var(--accent-primary)" /> +91 98765 43210
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: "'Satoshi', sans-serif", fontSize: '12px', color: 'var(--text-secondary)' }}>
              <MapPin size={12} color="var(--accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} /> Gurgaon · Mumbai · Rohtak · Australia
            </div>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '13px', letterSpacing: '0.18em', color: 'var(--accent-primary)', marginBottom: '18px', fontWeight: 600 }}>COMPANY</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {footerLinks.company.map(l => (
              <Link key={l.path} to={l.path} style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '13px', letterSpacing: '0.18em', color: 'var(--accent-primary)', marginBottom: '18px', fontWeight: 600 }}>SERVICES</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {footerLinks.services.map(l => (
              <Link key={l.path} to={l.path} style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div>
          <h4 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '13px', letterSpacing: '0.18em', color: 'var(--accent-primary)', marginBottom: '18px', fontWeight: 600 }}>STAY UPDATED</h4>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.6, marginBottom: '14px', fontWeight: 400 }}>
            Get the latest insights and updates delivered to your inbox.
          </p>
          <Link to="/newsletters" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px', border: '1px solid var(--border-light)',
            borderRadius: '6px', color: 'var(--accent-primary)', textDecoration: 'none',
            fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.12em', fontWeight: 600,
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; }}>
            VIEW NEWSLETTERS <ArrowRight size={11} />
          </Link>

          <div style={{ marginTop: '20px' }}>
            {footerLinks.legal.map(l => (
              <Link key={l.path} to={l.path} style={{ display: 'block', fontFamily: "'Satoshi', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', marginBottom: '6px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)' }}>
          © {new Date().getFullYear()} Avani Enterprises. All rights reserved.
        </span>
        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)' }}>
          Crafted with precision · Since 2016
        </span>
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .dummy-footer-grid { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 768px) {
        .dummy-footer-container { padding: 48px 24px 24px !important; }
      }
      @media (max-width: 560px) {
        .dummy-footer-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </footer>
);

export default DummyFooter;
