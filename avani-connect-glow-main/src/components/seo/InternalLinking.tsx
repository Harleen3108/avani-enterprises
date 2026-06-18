import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Code, Target, Globe, Bot, Database } from 'lucide-react';

const coreServices = [
  {
    title: 'Web Development Company',
    href: '/web-development-company',
    desc: 'Fast, secure, SEO-ready websites, web apps, and ecommerce stores built to convert.',
    icon: <Code size={20} />
  },
  {
    title: 'SEO Company',
    href: '/seo-company',
    desc: 'Dominate organic search, build domain authority, and acquire qualified leads 24/7.',
    icon: <Search size={20} />
  },
  {
    title: 'Digital Marketing Company',
    href: '/digital-marketing-company',
    desc: 'Full-funnel growth across SEO, paid ads, and social, measured against real ROI.',
    icon: <Globe size={20} />
  },
  {
    title: 'Google Ads Agency',
    href: '/google-ads-agency',
    desc: 'High-ROI PPC engineered to lower cost per lead and scale profitably.',
    icon: <Target size={20} />
  },
  {
    title: 'AI Automation Company',
    href: '/ai-automation-company',
    desc: 'AI chatbots and workflow automation that cut costs and scale operations.',
    icon: <Bot size={20} />
  },
  {
    title: 'CRM Development Company',
    href: '/crm-development-company',
    desc: 'Custom CRM software built around your exact sales process and pipeline.',
    icon: <Database size={20} />
  }
];

export default function InternalLinking() {
  return (
    <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
      <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.15em', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>Growth Resources</span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-.02em' }}>Accelerate Your Digital Authority</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }} className="dh-responsive-grid">
          {coreServices.map((service, idx) => (
            <Link 
              key={idx} 
              to={service.href} 
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '24px',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.04)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ color: 'var(--accent-primary)', marginBottom: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)' }}>
                {service.icon}
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px 0', flex: 1 }}>
                {service.desc}
              </p>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
                View Solutions <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
