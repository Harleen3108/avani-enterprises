import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight, ArrowUpRight, Phone, Mail } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import BusinessSetup3Form from '../BusinessSetup3Form';
import LocalValueSection from './LocalValueSection';
import OfficeBlock from './OfficeBlock';
import { resolvePage, pageFaqs, pageBenefits, pageFeature, canonicalSlugFor, ctaCopy } from '../../data/serviceContent';
import { isNoindexed } from '../../data/noindexPages';
import { officeFor, localBusinessSchema } from '../../data/offices';

// ── Shared data shape for Business OS, Social Sync and service-location pages ──
export interface SeoLandingData {
  slug: string;
  type?: 'product' | 'service' | 'location';
  seo: { title: string; description: string; keywords: string; canonical: string };
  breadcrumbs: { label: string; href: string }[];
  hero: { tag: string; h1: string; subtitle: string; stats?: { value: string; label: string }[] };
  introHeading?: string;
  intro: string;
  whyAvani: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  bodySections?: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  internalLinks?: { label: string; href: string; desc: string }[];
  cta: { headline: string; sub: string };
  // Optional link out to the live product app (os. / socialsync. subdomains)
  productApp?: { name: string; url: string; ctaLabel: string };
  formHeading?: string;
  formSub?: string;
}

const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
);
const Grid = () => (
  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', opacity: 0.5 }} />
);
const GlowBlob = ({ top, left, right, bottom, size = 300, opacity = 0.05, blur = 100 }: { top?: string; left?: string; right?: string; bottom?: string; size?: number; opacity?: number; blur?: number }) => (
  <div style={{ position: 'absolute', top, left, right, bottom, width: size, height: size, background: 'var(--accent-primary)', opacity, filter: `blur(${blur}px)`, borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }} />
);
const LuxuryLine = () => (
  <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 15%, var(--border-light) 85%, transparent)', opacity: 0.6 }} />
);

const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } };

export default function SeoLandingTemplate({ data }: { data: SeoLandingData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { pathname } = useLocation();

  // ── Page-unique content ──────────────────────────────────────────────────
  // Before this, all 253 location pages shipped the same four whyAvani cards and
  // the same two FAQs. We resolve the URL against the real service/location data
  // and prepend page-specific entries, so no two pages carry the same set.
  const resolved = React.useMemo(() => resolvePage(pathname), [pathname]);

  const faqs = React.useMemo(() => {
    const unique = resolved ? pageFaqs(resolved) : [];
    if (!unique.length) return data.faqs;
    // Drop templated FAQs whose question we already answer more specifically.
    const seen = new Set(unique.map(f => f.q.toLowerCase().trim()));
    return unique.concat(data.faqs.filter(f => !seen.has(f.q.toLowerCase().trim())));
  }, [resolved, data.faqs]);

  const whyAvani = React.useMemo(() => {
    const unique = resolved ? pageBenefits(resolved) : [];
    if (!unique.length) return data.whyAvani;
    const seen = new Set(unique.map(b => b.title.toLowerCase().trim()));
    return unique.concat(data.whyAvani.filter(b => !seen.has(b.title.toLowerCase().trim())));
  }, [resolved, data.whyAvani]);

  const features = React.useMemo(() => {
    const extra = resolved ? pageFeature(resolved) : null;
    if (!extra) return data.features;
    return [extra].concat(data.features.filter(f => f.title !== extra.title));
  }, [resolved, data.features]);

  // Robots must mirror the server (api/seo.js) so the JS-rendered DOM and the
  // first-crawl HTML never disagree.
  const robots = isNoindexed(pathname) ? 'noindex,follow' : 'index,follow';

  // Service-specific CTA copy for the hero form.
  const cta = React.useMemo(() => ctaCopy(resolved), [resolved]);

  // Canonical likewise. Self-referential except for the duplicate service
  // variants consolidated onto a primary in CANONICAL_MAP.
  const canonical = React.useMemo(() => {
    if (pathname === '/') return 'https://www.avanienterprises.in';
    return `https://www.avanienterprises.in/${canonicalSlugFor(pathname)}`;
  }, [pathname]);

  const faqLd = React.useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(item => ({ '@type': 'Question', 'name': item.q, 'acceptedAnswer': { '@type': 'Answer', 'text': item.a } })),
  }), [faqs]);

  // LocalBusiness schema, but only on a page about a city where we have a real
  // office AND a verified street address. Emitting it anywhere else would be
  // claiming a physical presence we cannot back up.
  const officeKey = resolved?.location?.key;
  const office = officeKey ? officeFor(officeKey) : null;
  const localBusinessLd = React.useMemo(
    () => (office ? localBusinessSchema(office, canonical) : null),
    [office, canonical]
  );

  // Service schema — tells Google what commercial service this page represents.
  const serviceLd = React.useMemo(() => {
    if (!resolved?.service) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': resolved.location ? `${resolved.service.name} in ${resolved.location.city}` : resolved.service.name,
      'serviceType': resolved.service.name,
      'url': canonical,
      'provider': { '@type': 'Organization', '@id': 'https://www.avanienterprises.in/#organization' },
      ...(resolved.location ? { 'areaServed': { '@type': 'Place', 'name': resolved.location.city } } : {}),
      ...(resolved.service.deliverables?.length
        ? {
            'hasOfferCatalog': {
              '@type': 'OfferCatalog',
              'name': `${resolved.service.name} deliverables`,
              'itemListElement': resolved.service.deliverables.map((d: string) => ({
                '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': d },
              })),
            },
          }
        : {}),
    };
  }, [resolved, canonical]);

  const breadcrumbLd = React.useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': data.breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', 'position': i + 1, 'name': b.label,
      'item': b.href.startsWith('http') ? b.href : `https://www.avanienterprises.in${b.href}`,
    })),
  }), [data.breadcrumbs]);

  // SoftwareApplication schema only for real product pages that link to a live app
  const productLd = data.productApp ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': data.productApp.name,
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Web',
    'url': data.productApp.url,
    'description': data.seo.description,
    'publisher': { '@type': 'Organization', 'name': 'Avani Enterprises', 'url': 'https://www.avanienterprises.in' },
  } : null;

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', fontFamily: "'Satoshi', 'Inter', sans-serif" }}>
      <Helmet>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
        {/* No <meta name="keywords">: Google ignores it, and the stuffed lists
            these pages carried are a minor spam signal. */}
        <meta name="robots" content={robots} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.seo.title} />
        <meta property="og:description" content={data.seo.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://www.avanienterprises.in/logo0.webp" />
        <meta property="og:site_name" content="Avani Enterprises" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.seo.title} />
        <meta name="twitter:description" content={data.seo.description} />
        <meta name="twitter:image" content="https://www.avanienterprises.in/logo0.webp" />
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {productLd && <script type="application/ld+json">{JSON.stringify(productLd)}</script>}
        {serviceLd && <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>}
        {localBusinessLd && <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>}
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
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
                Book Free Consultation <ArrowRight size={15} />
              </a>
              {data.productApp ? (
                <a href={data.productApp.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text-primary)', padding: '12px 24px', borderRadius: '10px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '.88rem', textDecoration: 'none', border: '1px solid var(--border-light)', transition: 'border-color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                  {data.productApp.ctaLabel} <ArrowUpRight size={15} />
                </a>
              ) : (
                <a href="tel:+91 84487 63134" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text-primary)', padding: '12px 24px', borderRadius: '10px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '.88rem', textDecoration: 'none', border: '1px solid var(--border-light)', transition: 'border-color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                  Call an Expert
                </a>
              )}
            </motion.div>

            {/* Right column — lead form, above the fold on every landing page.
                The heading is service-specific: "Get a free chatbot demo" tells
                the visitor what they get for the click; "Contact us" does not. */}
            <motion.div id="consultation" className="seo-hero-form" variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', scrollMarginTop: 90 }}>
              <div style={{ width: '100%' }}>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 .35rem', letterSpacing: '-.01em' }}>
                  {data.formHeading || cta.heading}
                </h2>
                <p style={{ fontSize: '.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 1rem' }}>
                  {data.formSub || cta.sub}
                </p>
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

      {/* ── INTRO / WHY US + FEATURES ────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
        <Grain />
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'center' }} className="dh-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.15em', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '.75rem' }}>Overview</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-.02em', margin: '0 0 1.5rem', lineHeight: 1.2 }}>
                {data.introHeading || 'What You Get'}
              </h2>
              <p style={{ fontSize: '.97rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{data.intro}</p>

              <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: '2rem' }}>
                {whyAvani.map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px 0' }}>{w.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {features.map((f, i) => (
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

      {/* ── PAGE-UNIQUE SCOPE & DELIVERY ─────────────────────────────────── */}
      {/* Auto-resolves from the URL against real service/location data. This is
          what makes each of the ~300 landing pages genuinely different. */}
      <LocalValueSection />

      {/* Visible NAP + map on pages about a city where we have a real office.
          Google needs the address in the HTML, not only in JSON-LD, to match it
          against the Google Business Profile for local pack ranking. */}
      {office && <OfficeBlock locationKey={officeKey} />}

      <LuxuryLine />

      {/* ── DETAILED BODY SECTIONS ───────────────────────────────────────── */}
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

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
        <Grain />
        <div className="dh-container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.15em', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '.75rem' }}>FAQ</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((f, i) => (
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

      {/* ── INTERNAL LINKS (related pages) ───────────────────────────────── */}
      {data.internalLinks && data.internalLinks.length > 0 && (
        <section style={{ padding: '80px 0', background: 'var(--bg-primary)', position: 'relative' }}>
          <div className="dh-container">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.15em', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '.75rem' }}>Explore More</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>Related Pages</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '16px' }} className="dh-responsive-grid">
              {data.internalLinks.map((l, i) => (
                <Link key={i} to={l.href} style={{ textDecoration: 'none', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '22px', display: 'block', transition: 'border-color .3s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{l.label}</h3>
                    <ArrowUpRight size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                  </div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{l.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <LuxuryLine />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, #1e1319 100%)', position: 'relative', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 50%, transparent)' }} />
        <div className="dh-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-.03em', margin: '0 0 1rem' }}>{data.cta.headline}</h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>{data.cta.sub}</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#consultation" className="dh-btn-fill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Book Free Consultation <ArrowRight size={16} />
              </a>
              {data.productApp && (
                <a href={data.productApp.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text-primary)', padding: '12px 24px', borderRadius: '10px', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '.88rem', textDecoration: 'none', border: '1px solid var(--border-light)' }}>
                  {data.productApp.ctaLabel} <ArrowUpRight size={15} />
                </a>
              )}
            </div>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <a href="tel:+91 84487 63134" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>
                <Phone size={14} color="var(--accent-primary)" /> +91 84487 63134
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
