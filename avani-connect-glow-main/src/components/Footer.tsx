import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { getResponsiveImageProps } from '../utils/responsiveImage';

const footerLinks = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Case Studies', path: '/projects' },
    { label: 'Blog', path: '/blog' },
  ],
  services: [
    { label: 'Ready Products', path: '/projects' },
    { label: 'Expertise', path: '/services' },
    { label: 'Newsletters', path: '/newsletters' },
    { label: 'Global Network', path: '/global-presence' },
    { label: 'Contact', path: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  ],
};

const Footer = () => (
  <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 30%, var(--border-light) 70%, transparent)' }} />

    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 48px 28px' }} className="dummy-footer-container">
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }} className="dummy-footer-grid">
        {/* Brand */}
        <div>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', background: '#fff', padding: '2px' }}>
              <img {...getResponsiveImageProps('/logo0.webp')} alt="Avani" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', letterSpacing: '0.14em', color: 'var(--text-primary)', lineHeight: 1, fontWeight: 700 }}>AVANI</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginTop: '1px', fontWeight: 500 }}>ENTERPRISES</div>
            </div>
          </Link>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: 1.7, color: 'var(--text-tertiary)', maxWidth: '280px', marginBottom: '20px', fontWeight: 400 }}>
            Your one-stop solution for digital growth. Building high-performing websites, products, and AI solutions since 2016.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="mailto:kp@avanienterprises.in" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}>
              <Mail size={12} color="var(--accent-primary)" /> kp@avanienterprises.in
            </a>
            <a href="tel:+919253625099" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}>
              <Phone size={12} color="var(--accent-primary)" /> +91 92536 25099
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)' }}>
              <MapPin size={12} color="var(--accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} /> Gurgaon · Mumbai · Rohtak · Australia
            </div>
          </div>

          {/* Social Media */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {[
              { Icon: Instagram, href: 'https://www.instagram.com/avanienterprises.branding/', label: 'Instagram' },
              { Icon: Facebook, href: 'https://www.facebook.com/people/Avani-Enterprises/61576229620845/', label: 'Facebook' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/company/avani-enterprises-india/', label: 'LinkedIn' },
              { Icon: Mail, href: 'mailto:kp@avanienterprises.in', label: 'Email' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '8px', border: '1px solid var(--border-light)', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', letterSpacing: '0.18em', color: 'var(--accent-primary)', marginBottom: '18px', fontWeight: 600 }}>COMPANY</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {footerLinks.company.map(l => (
              <Link key={l.path} to={l.path} style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', letterSpacing: '0.18em', color: 'var(--accent-primary)', marginBottom: '18px', fontWeight: 600 }}>SERVICES</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {footerLinks.services.map(l => (
              <Link key={l.path} to={l.path} style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', letterSpacing: '0.18em', color: 'var(--accent-primary)', marginBottom: '18px', fontWeight: 600 }}>STAY UPDATED</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.6, marginBottom: '14px', fontWeight: 400 }}>
            Get the latest insights and updates delivered to your inbox.
          </p>
          <Link to="/newsletters" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px', border: '1px solid var(--border-light)',
            borderRadius: '6px', color: 'var(--accent-primary)', textDecoration: 'none',
            fontFamily: "'Outfit', sans-serif", fontSize: '11px', letterSpacing: '0.12em', fontWeight: 600,
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; }}>
            VIEW NEWSLETTERS <ArrowRight size={11} />
          </Link>

          <div style={{ marginTop: '20px' }}>
            {footerLinks.legal.map(l => (
              <Link key={l.path} to={l.path} style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', marginBottom: '6px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Footnote Paragraph & Internal Links */}
      <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: '24px', paddingBottom: '8px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', lineHeight: 1.6, color: 'var(--text-tertiary)', margin: 0, fontWeight: 400 }}>
          Avani Enterprises is a digital marketing agency in India offering website development, SEO, Google Ads, Meta Ads, social media marketing, AI automation, and custom software solutions for businesses.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px', marginTop: '12px', alignItems: 'center' }}>
          <Link to="/web-development-company" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'}>Web Development</Link>
          <span style={{ color: 'var(--border-faint)', fontSize: '11px' }}>•</span>
          <Link to="/seo-company" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'}>SEO Company</Link>
          <span style={{ color: 'var(--border-faint)', fontSize: '11px' }}>•</span>
          <Link to="/digital-marketing-company" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'}>Digital Marketing</Link>
          <span style={{ color: 'var(--border-faint)', fontSize: '11px' }}>•</span>
          <Link to="/google-ads-agency" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'}>Google Ads Agency</Link>
          <span style={{ color: 'var(--border-faint)', fontSize: '11px' }}>•</span>
          <Link to="/hrms-software-india" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'}>HRMS Software</Link>
          <span style={{ color: 'var(--border-faint)', fontSize: '11px' }}>•</span>
          <Link to="/social-media-management-tool" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'}>Social Media Tool</Link>
          <span style={{ color: 'var(--border-faint)', fontSize: '11px' }}>•</span>
          <Link to="/contact" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'}>Contact Us</Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)' }}>
          © {new Date().getFullYear()} Avani Enterprises. All rights reserved.
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)' }}>
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

export default Footer;
