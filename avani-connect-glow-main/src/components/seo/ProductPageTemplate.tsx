import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight, Phone, Mail } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import InternalLinking from './InternalLinking';
import BusinessSetup3Form from '../BusinessSetup3Form';
import { SeoPageConfig } from '../../data/seoLandingPagesData';

// Background overlays matching the premium aesthetic
const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
);
const Grid = () => (
  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none',opacity: 0.5 }} />
);
interface GlowBlobProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
}
const GlowBlob = ({ top, left, right, bottom, size = 300, color = 'var(--accent-primary)', opacity = 0.05, blur = 100 }: GlowBlobProps) => (
  <div style={{ position: 'absolute', top, left, right, bottom, width: size, height: size, background: color, opacity, filter: `blur(${blur}px)`, borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }} />
);
const LuxuryLine = () => (
  <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 15%, var(--border-light) 85%, transparent)', opacity: 0.6 }} />
);

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

interface ProductPageTemplateProps {
  data: SeoPageConfig;
}

export default function ProductPageTemplate({ data }: ProductPageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Generate FAQ JSON-LD
  const faqLd = React.useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': data.faqs.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    };
  }, [data.faqs]);

  // Slugs that describe a software product Avani has built (not a dev-service page)
  const SOFTWARE_SLUGS = new Set([
    'hr-portal',
    'hrms-software-india',
    'payroll-software-india',
    'attendance-management-system',
    'leave-management-software',
    'employee-management-software',
    'employee-portal',
    'workforce-management-software',
    'project-management-software',
    'business-operating-system',
    'crm-software-india',
  ]);

  // SoftwareApplication JSON-LD — only for HR/CRM software product pages
  const softwareAppLd = React.useMemo(() => {
    if (!SOFTWARE_SLUGS.has(data.slug)) return null;

    // Derive a clean product name: strip trailing brand suffix if present
    const productName = data.hero.h1
      .replace(/\s*[|—–-]\s*Avani Enterprises.*$/i, '')
      .trim();

    // Pull feature titles (up to 8) for featureList
    const featureList = data.features.slice(0, 8).map(f => f.title);

    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': productName,
      'applicationCategory': 'BusinessApplication',
      'applicationSubCategory': 'HumanResourcesApplication',
      'operatingSystem': 'Web, Android, iOS',
      'description': data.seo.description,
      'url': data.seo.canonical,
      'featureList': featureList,
      'author': {
        '@type': 'Organization',
        '@id': 'https://www.avanienterprises.in/#organization',
        'name': 'Avani Enterprises',
        'url': 'https://www.avanienterprises.in',
      },
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'price': '0',
        'priceCurrency': 'INR',
        'priceSpecification': {
          '@type': 'UnitPriceSpecification',
          'priceType': 'https://schema.org/InvoicePrice',
          'description': 'Custom pricing — contact us for a quote',
        },
        'seller': {
          '@type': 'Organization',
          '@id': 'https://www.avanienterprises.in/#organization',
        },
      },
      // No aggregateRating: self-serving review markup is disallowed by Google
      // and risks a structured-data manual action. Add only when real, displayed
      // reviews exist on the page.
    };
  }, [data.slug, data.hero.h1, data.seo.description, data.seo.canonical, data.features]);

  // Generate Service JSON-LD — tells Google what service this page represents
  const serviceLd = React.useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': data.hero.h1,
    'serviceType': data.hero.h1,
    'description': data.seo.description,
    'url': data.seo.canonical,
    'provider': {
      '@type': 'Organization',
      '@id': 'https://www.avanienterprises.in/#organization',
      'name': 'Avani Enterprises',
      'url': 'https://www.avanienterprises.in'
    },
    'areaServed': [
      { '@type': 'Country', 'name': 'India' },
      { '@type': 'AdministrativeArea', 'name': 'Haryana' },
      { '@type': 'City', 'name': 'Gurugram' },
      { '@type': 'City', 'name': 'Delhi' },
      { '@type': 'City', 'name': 'Noida' }
    ],
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'url': data.seo.canonical,
      'seller': {
        '@type': 'Organization',
        '@id': 'https://www.avanienterprises.in/#organization'
      }
    }
  }), [data.hero.h1, data.seo.description, data.seo.canonical]);

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', fontFamily: "'Satoshi', 'Inter', sans-serif" }}>
      <Helmet>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
        <meta name="keywords" content={data.seo.keywords} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={data.seo.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.seo.title} />
        <meta property="og:description" content={data.seo.description} />
        <meta property="og:url" content={data.seo.canonical} />
        <meta property="og:image" content="https://www.avanienterprises.in/logo0.webp" />
        <meta property="og:site_name" content="Avani Enterprises" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.seo.title} />
        <meta name="twitter:description" content={data.seo.description} />
        <meta name="twitter:image" content="https://www.avanienterprises.in/logo0.webp" />

        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        {softwareAppLd && (
          <script type="application/ld+json">{JSON.stringify(softwareAppLd)}</script>
        )}
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'visible', paddingTop: '120px', paddingBottom: '60px' }}>
        <Grain /><Grid />
        <GlowBlob top="-10%" right="-5%" size={450} />
        <GlowBlob bottom="-10%" left="-5%" size={300} opacity={0.03} />

        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <Breadcrumb customCrumbs={data.breadcrumbs} />

          <style>{`
            .seo-hero-grid {
              display: grid;
              grid-template-columns: 1.15fr 0.85fr;
              grid-template-rows: auto auto auto auto auto;
              gap: 1.5rem 4rem;
              margin-top: 2rem;
              align-items: start;
            }
            .seo-hero-tag {
              grid-column: 1;
              grid-row: 1;
            }
            .seo-hero-h1 {
              grid-column: 1;
              grid-row: 2;
              margin: 0;
            }
            .seo-hero-sub {
              grid-column: 1;
              grid-row: 3;
              margin: 0;
            }
            .seo-hero-btns {
              grid-column: 1;
              grid-row: 4;
            }
            .seo-hero-stats {
              grid-column: 1;
              grid-row: 5;
              margin-top: 1rem;
            }
            .seo-hero-form {
              grid-column: 2;
              grid-row: 1 / span 5;
              z-index: 20;
              margin-bottom: -120px;
            }

            @media (max-width: 1024px) {
              .seo-hero-grid {
                display: flex;
                flex-direction: column;
                gap: 2rem;
              }
              .seo-hero-tag { order: 1; }
              .seo-hero-h1 { order: 2; }
              .seo-hero-form { order: 3; margin-bottom: 0; }
              .seo-hero-sub { order: 4; }
              .seo-hero-btns { order: 5; }
              .seo-hero-stats { order: 6; }
            }
            @media (max-width: 768px) {
              .seo-hero-grid {
                gap: 1.5rem;
                margin-top: 1rem;
              }
            }
          `}</style>

          <motion.div className="seo-hero-grid" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {/* Tag */}
            <motion.div className="seo-hero-tag" variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(196, 145, 58, 0.08)', border: '1px solid rgba(196, 145, 58, 0.15)', borderRadius: '100px', padding: '6px 16px', alignSelf: 'start', width: 'fit-content' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{data.hero.tag}</span>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1 className="seo-hero-h1" variants={fadeUp} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.1 }}>
              {data.hero.h1}
            </motion.h1>

            {/* Subtitle */}
            <motion.p className="seo-hero-sub" variants={fadeUp} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '600px' }}>
              {data.hero.subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div className="seo-hero-btns" variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#consultation" className="dh-btn-fill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Request Free Demo <ArrowRight size={15} />
              </a>
              <a href="tel:+919253625099" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text-primary)', padding: '12px 24px', borderRadius: '10px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '.88rem', textDecoration: 'none', border: '1px solid var(--border-light)', transition: 'border-color .2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                Contact Consulting
              </a>
            </motion.div>

            {/* Right Form/Widget Column */}
            <motion.div id="consultation" className="seo-hero-form" variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', scrollMarginTop: 90 }}>
              <div style={{ width: '100%' }}>
                <BusinessSetup3Form source={data.slug} />
              </div>
            </motion.div>

            {/* Stats highlights */}
            {data.hero.stats && data.hero.stats.length > 0 && (
              <motion.div className="seo-hero-stats" variants={fadeUp}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {data.hero.stats.map((s, i) => (
                    <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px 22px', minWidth: '130px' }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* ── INTRO / WHY US ────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
        <Grain />
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }} className="dh-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.15em', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '.75rem' }}>Solution Overview</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-.02em', margin: '0 0 1.5rem', lineHeight: 1.2 }}>
                Advanced Features Built to Perform
              </h2>
              <p style={{ fontSize: '.97rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{data.intro}</p>
              
              <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: '2rem' }}>
                {data.whyAvani.map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px 0' }}>{w.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features list cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {data.features.map((f, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px', transition: 'border-color .3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* ── DETAILED BODY SECTIONS (800-1500 words copy requirement) ──────── */}
      {data.bodySections && data.bodySections.length > 0 && (
        <section style={{ padding: '80px 0', background: 'var(--bg-primary)', position: 'relative' }}>
          <div className="dh-container" style={{ maxWidth: '800px' }}>
            {data.bodySections.map((sect, sIdx) => (
              <motion.div key={sIdx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.2rem', letterSpacing: '-.02em' }}>{sect.heading}</h2>
                {sect.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>{p}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <LuxuryLine />

      {/* ── FAQ ACCORDION ────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
        <Grain />
        <div className="dh-container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.15em', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '.75rem' }}>FAQ</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.faqs.map((f, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ background: 'var(--card-bg)', border: `1px solid ${openFaq === i ? 'var(--accent-primary)' : 'var(--border-light)'}`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>{f.q}</h3>
                  {openFaq === i ? <ChevronUp size={18} color="var(--accent-primary)" /> : <ChevronDown size={18} color="var(--text-secondary)" />}
                </div>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', borderTop: '1px solid var(--border-light)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '12px 0 0' }}>{f.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* Internal linking */}
      <InternalLinking />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, #1e1319 100%)', position: 'relative', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 50%, transparent)' }} />
        <div className="dh-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-.03em', margin: '0 0 1rem' }}>
              {data.cta.headline}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              {data.cta.sub}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#consultation" className="dh-btn-fill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Contact HR Expert <ArrowRight size={16} />
              </a>
            </div>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <a href="tel:+919253625099" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>
                <Phone size={14} color="var(--accent-primary)" /> +91 92536 25099
              </a>
              <a href="mailto:kp@avanienterprises.in" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>
                <Mail size={14} color="var(--accent-primary)" /> kp@avanienterprises.in
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
