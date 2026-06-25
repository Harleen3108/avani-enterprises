import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp, ArrowRight, Star } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import InternalLinking from './InternalLinking';
import RegistrationForm from '../RegistrationForm';
import { SeoPageConfig } from '../../data/seoLandingPagesData';

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
  <div style={{ height: '1px', background: 'gradient-to-r', backgroundImage: 'linear-gradient(to right, transparent, var(--border-light) 15%, var(--border-light) 85%, transparent)', opacity: 0.6 }} />
);

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

interface ComparisonPageTemplateProps {
  data: SeoPageConfig;
}

export default function ComparisonPageTemplate({ data }: ComparisonPageTemplateProps) {
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
        <meta property="og:image" content="https://www.avanienterprises.in/logo0.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.seo.title} />
        <meta name="twitter:description" content={data.seo.description} />
        <meta name="twitter:image" content="https://www.avanienterprises.in/logo0.webp" />

        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '120px', paddingBottom: '60px' }}>
        <Grain /><Grid />
        <GlowBlob top="-10%" right="-5%" size={400} />
        <GlowBlob bottom="-15%" left="-5%" size={300} opacity={0.03} />

        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <Breadcrumb customCrumbs={data.breadcrumbs} />

          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} style={{ maxWidth: '800px', marginTop: '2rem' }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(196, 145, 58, 0.08)', border: '1px solid rgba(196, 145, 58, 0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{data.hero.tag}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(2rem, 5.5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-.03em', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
              {data.hero.h1}
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '600px', marginBottom: '2.5rem' }}>
              {data.hero.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {data.hero.stats.map((s, i) => (
                <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '12px 20px', minWidth: '120px' }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* ── COMPARISON TABLE SECTION ───────────────────────────────────── */}
      {data.comparisonTable && (
        <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
          <Grain />
          <div className="dh-container" style={{ maxWidth: '900px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.15em', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '.75rem' }}>Feature Compare</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Side-by-Side Breakdown</h2>
            </div>

            <div style={{ overflowX: 'auto', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border-light)', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.01)' }}>
                    {data.comparisonTable.headers.map((h, i) => (
                      <th key={i} style={{ padding: '20px 24px', textAlign: i === 0 ? 'left' : 'center', fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: i === 1 ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.comparisonTable.rows.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: idx < data.comparisonTable!.rows.length - 1 ? '1px solid var(--border-faint)' : 'none', transition: 'background .2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '18px 24px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.metric}</td>
                      <td style={{ padding: '18px 24px', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 700, background: 'rgba(196,145,58,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--accent-primary)' }}>
                          <Check size={16} strokeWidth={3} /> {row.avani}
                        </div>
                      </td>
                      <td style={{ padding: '18px 24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          {row.isPositive ? <X size={15} style={{ opacity: 0.6 }} /> : <Check size={15} />} {row.competitor}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <LuxuryLine />

      {/* ── INTRO / DETAILED COPY ───────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-primary)', position: 'relative' }}>
        <div className="dh-container" style={{ maxWidth: '800px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '3rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.15em', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '.75rem' }}>Migration Overview</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.2rem', letterSpacing: '-.02em' }}>
              Why Switch to Avani Enterprises Solutions?
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {data.intro}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', margin: '3rem 0' }} className="dh-responsive-grid">
              {data.whyAvani.map((w, i) => (
                <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px' }}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.98rem', fontWeight: 700, color: 'var(--accent-primary)', margin: '0 0 6px 0' }}>{w.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {data.bodySections.map((sect, sIdx) => (
            <motion.div key={sIdx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-.01em' }}>{sect.heading}</h3>
              {sect.paragraphs.map((p, pIdx) => (
                <p key={pIdx} style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>{p}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

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
      <section style={{ padding: '100px 0', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, #171115 100%)', position: 'relative', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 50%, transparent)' }} />
        <div className="dh-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-.03em', margin: '0 0 1rem' }}>
              {data.cta.headline}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              {data.cta.sub}
            </p>
            <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '24px', textAlign: 'left', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
              <RegistrationForm uniqueConsentId={`consent-${data.slug}`} source={data.slug} isEmbedded allowCustomService />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
