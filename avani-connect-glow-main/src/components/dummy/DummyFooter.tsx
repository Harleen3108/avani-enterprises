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
  <footer style={{ background: '#0A0705', borderTop: '1px solid rgba(196,145,58,0.1)', position: 'relative', overflow: 'hidden' }}>
    {/* Gold top accent */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(196,145,58,0.3) 30%, rgba(196,145,58,0.3) 70%, transparent)' }} />

    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 48px 28px' }}>
      {/* Top row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }} className="dummy-footer-grid">
        {/* Brand */}
        <div>
          <Link to="/dummyhome" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', background: '#fff', padding: '2px' }}>
              <img src="/logo0.jpg" alt="Avani" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '0.18em', color: '#F5EDD8', lineHeight: 1 }}>AVANI</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(196,145,58,0.65)', marginTop: '1px' }}>ENTERPRISES</div>
            </div>
          </Link>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', lineHeight: 1.7, color: 'rgba(245,237,216,0.4)', maxWidth: '280px', marginBottom: '20px', fontWeight: 300 }}>
            Your one-stop solution for digital growth. Building high-performing websites, products, and AI solutions since 2016.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="mailto:info@avanienterprises.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(245,237,216,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C4913A'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,216,0.45)'}>
              <Mail size={12} color="#C4913A" /> info@avanienterprises.com
            </a>
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(245,237,216,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C4913A'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,216,0.45)'}>
              <Phone size={12} color="#C4913A" /> +91 98765 43210
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(245,237,216,0.45)' }}>
              <MapPin size={12} color="#C4913A" style={{ marginTop: '2px', flexShrink: 0 }} /> Gurgaon · Mumbai · Rohtak · Australia
            </div>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.2em', color: '#C4913A', marginBottom: '18px' }}>COMPANY</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {footerLinks.company.map(l => (
              <Link key={l.path} to={l.path} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', color: 'rgba(245,237,216,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5EDD8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,216,0.45)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.2em', color: '#C4913A', marginBottom: '18px' }}>SERVICES</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {footerLinks.services.map(l => (
              <Link key={l.path} to={l.path} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', color: 'rgba(245,237,216,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5EDD8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,216,0.45)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div>
          <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.2em', color: '#C4913A', marginBottom: '18px' }}>STAY UPDATED</h4>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', color: 'rgba(245,237,216,0.4)', lineHeight: 1.6, marginBottom: '14px', fontWeight: 300 }}>
            Get the latest insights and updates delivered to your inbox.
          </p>
          <Link to="/newsletters" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px', border: '1px solid rgba(196,145,58,0.3)',
            borderRadius: '6px', color: '#C4913A', textDecoration: 'none',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.15em',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(196,145,58,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#C4913A'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,145,58,0.3)'; }}>
            VIEW NEWSLETTERS <ArrowRight size={11} />
          </Link>

          <div style={{ marginTop: '20px' }}>
            {footerLinks.legal.map(l => (
              <Link key={l.path} to={l.path} style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'rgba(245,237,216,0.3)', textDecoration: 'none', marginBottom: '6px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,216,0.6)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,216,0.3)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(196,145,58,0.08)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'rgba(245,237,216,0.25)' }}>
          © {new Date().getFullYear()} Avani Enterprises. All rights reserved.
        </span>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'rgba(245,237,216,0.2)' }}>
          Crafted with precision · Since 2016
        </span>
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .dummy-footer-grid { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 560px) {
        .dummy-footer-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </footer>
);

export default DummyFooter;
