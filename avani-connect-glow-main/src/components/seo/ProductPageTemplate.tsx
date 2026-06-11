import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight, Phone, Mail } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import InternalLinking from './InternalLinking';
import { SeoPageConfig } from '../../data/seoLandingPagesData';

// Background overlays matching the premium aesthetic
const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
);
const Grid = () => (
  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none',opacity: 0.5 }} />
);
const GlowBlob = ({ top, left, right, bottom, size = 300, color = 'var(--accent-primary)', opacity = 0.05, blur = 100 }: any) => (
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
        <meta property="og:image" content="https://www.avanienterprises.in/logo0.jpg" />
        <meta property="og:site_name" content="Avani Enterprises" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.seo.title} />
        <meta name="twitter:description" content={data.seo.description} />
        <meta name="twitter:image" content="https://www.avanienterprises.in/logo0.jpg" />

        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '120px', paddingBottom: '60px' }}>
        <Grain /><Grid />
        <GlowBlob top="-10%" right="-5%" size={450} />
        <GlowBlob bottom="-10%" left="-5%" size={300} opacity={0.03} />

        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <Breadcrumb customCrumbs={data.breadcrumbs} />

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', marginTop: '2rem' }} className="dh-responsive-grid">
            {/* Left Content Column */}
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(196, 145, 58, 0.08)', border: '1px solid rgba(196, 145, 58, 0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{data.hero.tag}</span>
              </motion.div>

              <motion.h1 variants={fadeUp} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-.03em', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
                {data.hero.h1}
              </motion.h1>

              <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '600px', marginBottom: '2.5rem' }}>
                {data.hero.subtitle}
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '3rem' }}>
                <Link to="/contact" className="dh-btn-fill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Request Free Demo <ArrowRight size={15} />
                </Link>
                <a href="tel:+919253625099" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text-primary)', padding: '12px 24px', borderRadius: '10px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '.88rem', textDecoration: 'none', border: '1px solid var(--border-light)', transition: 'border-color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                  Contact Consulting
                </a>
              </motion.div>

              {/* Stats highlights */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {data.hero.stats.map((s, i) => (
                  <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px 22px', minWidth: '130px' }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Form/Widget Column */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100%', padding: '32px', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>Book Direct Demo</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>See our enterprise software systems in action with a custom walkthrough.</p>
                
                <form onSubmit={e => { e.preventDefault(); window.location.href='/contact'; }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem' }} />
                  <input type="email" placeholder="Business Email" required style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem' }} />
                  <input type="tel" placeholder="Phone Number" required style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.9rem' }} />
                  
                  <button type="submit" className="dh-btn-fill" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                    BOOK CONSULTATION <ArrowRight size={14} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
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
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-\.02em', margin: 0 }}>Frequently Asked Questions</h2>
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
              <Link to="/contact" className="dh-btn-fill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Contact HR Expert <ArrowRight size={16} />
              </Link>
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
