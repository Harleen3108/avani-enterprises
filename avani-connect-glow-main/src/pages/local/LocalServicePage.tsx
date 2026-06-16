import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronDown, ChevronUp, Phone, Mail, MapPin, Star, ArrowRight } from 'lucide-react';

// ─── Design Tokens (mirrors existing CSS vars, works standalone) ──────────────
const T = {
  bg:       '#0a0508',
  bgSec:    '#120d10',
  card:     'rgba(255,255,255,0.04)',
  border:   'rgba(255,255,255,0.08)',
  accent:   '#c4913a',
  accentLt: '#e8b96a',
  text:     '#f5f0eb',
  muted:    '#8a7a6a',
  white:    '#ffffff',
};

// ─── Business Config ──────────────────────────────────────────────────────────
export const BIZ = {
  name:    'Avani Enterprises',
  url:     'https://www.avanienterprises.in',
  phone:   '+919253625099',
  phoneDisplay: '+91 92536 25099',
  email:   'kp@avanienterprises.in',
  address: {
    street:   'DLF Cyber City',
    locality: 'Gurugram',
    region:   'Haryana',
    country:  'IN',
    postalCode: '122002',
  },
  geo: { lat: 28.4955, lng: 77.0888 },
  social: {
    linkedin: 'https://www.linkedin.com/company/avani-enterprises-india',
    instagram: 'https://www.instagram.com/avani_enterprises_india/',
    twitter: 'https://twitter.com/AvaniEnterprises',
  },
  cities:  ['Gurgaon', 'Rohtak', 'Faridabad', 'Delhi', 'Noida', 'Panipat', 'Sonipat', 'Hisar'],
};

// ─── Shared primitives ────────────────────────────────────────────────────────
const Grain = () => (
  <div style={{ position:'absolute',inset:0,opacity:0.03,pointerEvents:'none',
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
);
const Grid = () => (
  <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none' }} />
);
interface BlobProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
}
const Blob = ({ top,left,right,bottom,size=300,color=T.accent,opacity=0.06,blur=100 }: BlobProps) => (
  <div style={{ position:'absolute',top,left,right,bottom,width:size,height:size,background:color,opacity,filter:`blur(${blur}px)`,borderRadius:'50%',pointerEvents:'none',zIndex:1 }} />
);
const Line = () => (
  <div style={{ height:'1px',background:`linear-gradient(to right,transparent,${T.border} 15%,${T.border} 85%,transparent)`,opacity:0.8 }} />
);
const fadeUp = { hidden:{opacity:0,y:28}, visible:{opacity:1,y:0,transition:{duration:0.75,ease:'easeOut'}} };

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
interface Crumb { label: string; href: string }
export const BreadcrumbBar = ({ crumbs }: { crumbs: Crumb[] }) => (
  <nav aria-label="breadcrumb" style={{ padding:'12px 0 0',display:'flex',alignItems:'center',gap:'6px',flexWrap:'wrap' }}>
    {crumbs.map((c, i) => (
      <span key={i} style={{ display:'flex',alignItems:'center',gap:'6px' }}>
        {i < crumbs.length - 1
          ? <Link to={c.href} style={{ fontSize:'12px',color:T.muted,textDecoration:'none',fontWeight:500,transition:'color .2s' }}>{c.label}</Link>
          : <span style={{ fontSize:'12px',color:T.accent,fontWeight:600 }}>{c.label}</span>}
        {i < crumbs.length - 1 && <span style={{ fontSize:'12px',color:T.muted }}>›</span>}
      </span>
    ))}
  </nav>
);

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
interface FAQ { q: string; a: string }
export const FAQSection = ({ faqs, heading='Frequently Asked Questions' }: { faqs: FAQ[]; heading?: string }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ padding:'80px 0',background:T.bgSec,position:'relative',overflow:'hidden' }}>
      <Grain /><Grid />
      <Blob top="-10%" right="-5%" size={350} />
      <div className="dh-container" style={{ position:'relative',zIndex:10 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
          <div style={{ textAlign:'center',marginBottom:'3rem' }}>
            <span style={{ fontSize:'11px',fontWeight:700,letterSpacing:'.15em',color:T.accent,textTransform:'uppercase',display:'block',marginBottom:'.75rem' }}>FAQs</span>
            <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'clamp(1.6rem,3.5vw,2.4rem)',fontWeight:800,color:T.text,letterSpacing:'-.02em',margin:0 }}>{heading}</h2>
          </div>
        </motion.div>
        <div style={{ maxWidth:'800px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'12px' }}>
          {faqs.map((f, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}
              style={{ background:T.card,border:`1px solid ${open===i ? T.accent : T.border}`,borderRadius:'16px',overflow:'hidden',transition:'border-color .3s',cursor:'pointer' }}
              onClick={() => setOpen(open===i ? null : i)}>
              <div style={{ padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'1rem' }}>
                <h3 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'1rem',fontWeight:700,color:T.text,margin:0,lineHeight:1.4 }}>{f.q}</h3>
                {open===i ? <ChevronUp size={18} color={T.accent} style={{flexShrink:0}} /> : <ChevronDown size={18} color={T.muted} style={{flexShrink:0}} />}
              </div>
              {open===i && (
                <div style={{ padding:'0 24px 20px',borderTop:`1px solid ${T.border}` }}>
                  <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'.93rem',color:T.muted,lineHeight:1.75,margin:'12px 0 0' }}>{f.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Review Card ──────────────────────────────────────────────────────────────
interface Review { name: string; role: string; city: string; text: string; rating?: number }
export const ReviewsSection = ({ reviews, heading='What Our Clients Say' }: { reviews: Review[]; heading?: string }) => (
  <section style={{ padding:'80px 0',background:T.bg,position:'relative',overflow:'hidden' }}>
    <Grain /><Grid />
    <div className="dh-container" style={{ position:'relative',zIndex:10 }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} style={{ textAlign:'center',marginBottom:'3rem' }}>
        <span style={{ fontSize:'11px',fontWeight:700,letterSpacing:'.15em',color:T.accent,textTransform:'uppercase',display:'block',marginBottom:'.75rem' }}>TESTIMONIALS</span>
        <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'clamp(1.6rem,3.5vw,2.4rem)',fontWeight:800,color:T.text,letterSpacing:'-.02em',margin:0 }}>{heading}</h2>
      </motion.div>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px' }}>
        {reviews.map((r, i) => (
          <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}
            style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:'20px',padding:'28px',position:'relative',overflow:'hidden' }}>
            <div style={{ position:'absolute',top:0,left:0,right:0,height:'3px',background:`linear-gradient(to right,${T.accent},${T.accentLt})` }} />
            <div style={{ display:'flex',gap:'4px',marginBottom:'16px' }}>
              {Array.from({ length: r.rating ?? 5 }).map((_, j) => (
                <Star key={j} size={14} fill={T.accent} color={T.accent} />
              ))}
            </div>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'.9rem',color:T.muted,lineHeight:1.75,margin:'0 0 20px',fontStyle:'italic' }}>"{r.text}"</p>
            <div>
              <div style={{ fontFamily:"'Outfit',sans-serif",fontWeight:700,color:T.text,fontSize:'.95rem' }}>{r.name}</div>
              <div style={{ fontSize:'.78rem',color:T.muted,marginTop:'2px' }}>{r.role} · <span style={{ color:T.accent }}>{r.city}</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── CTA Section ─────────────────────────────────────────────────────────────
export const CTASection = ({ headline, sub, primaryLabel='Get Free Consultation', primaryHref='/contact', secondaryLabel='View Our Work', secondaryHref='/case-studies' }:
  { headline: string; sub: string; primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string }) => (
  <section style={{ padding:'100px 0',background:`linear-gradient(135deg,${T.bgSec} 0%,#1a0f16 50%,${T.bgSec} 100%)`,position:'relative',overflow:'hidden',textAlign:'center' }}>
    <Grain />
    <Blob top="0" left="50%" size={600} blur={150} opacity={0.05} />
    <div style={{ position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(to right,transparent,${T.accent} 25%,${T.accentLt} 50%,${T.accent} 75%,transparent)` }} />
    <div className="dh-container" style={{ position:'relative',zIndex:10 }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
        <div style={{ display:'inline-flex',alignItems:'center',gap:'8px',background:`rgba(196,145,58,0.1)`,border:`1px solid rgba(196,145,58,0.2)`,borderRadius:'100px',padding:'6px 16px',marginBottom:'1.5rem' }}>
          <span style={{ fontSize:'11px',color:T.accent,fontWeight:700,letterSpacing:'.05em',textTransform:'uppercase' }}>Ready to Grow?</span>
        </div>
        <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:900,color:T.text,letterSpacing:'-.03em',margin:'0 0 1rem',lineHeight:1.1 }}>{headline}</h2>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'1.05rem',color:T.muted,maxWidth:'560px',margin:'0 auto 2.5rem',lineHeight:1.7 }}>{sub}</p>
        <div style={{ display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap',alignItems:'center' }}>
          <Link to={primaryHref} style={{ display:'inline-flex',alignItems:'center',gap:'8px',background:`linear-gradient(135deg,${T.accent},${T.accentLt})`,color:'#0a0508',padding:'14px 28px',borderRadius:'10px',fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:'.9rem',letterSpacing:'.05em',textDecoration:'none',textTransform:'uppercase',transition:'transform .2s,box-shadow .2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 12px 40px rgba(196,145,58,0.35)` }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
            {primaryLabel} <ArrowRight size={16} />
          </Link>
          <Link to={secondaryHref} style={{ display:'inline-flex',alignItems:'center',gap:'8px',background:'transparent',color:T.text,padding:'13px 28px',borderRadius:'10px',fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:'.9rem',letterSpacing:'.05em',textDecoration:'none',border:`1px solid ${T.border}`,textTransform:'uppercase',transition:'border-color .2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor=T.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor=T.border}>
            {secondaryLabel}
          </Link>
        </div>
        <div style={{ marginTop:'2.5rem',display:'flex',gap:'32px',justifyContent:'center',flexWrap:'wrap' }}>
          <a href={`tel:${BIZ.phone}`} style={{ display:'flex',alignItems:'center',gap:'8px',color:T.muted,textDecoration:'none',fontSize:'.85rem',transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color=T.accent} onMouseLeave={e=>e.currentTarget.style.color=T.muted}>
            <Phone size={15} color={T.accent} /> {BIZ.phoneDisplay}
          </a>
          <a href={`mailto:${BIZ.email}`} style={{ display:'flex',alignItems:'center',gap:'8px',color:T.muted,textDecoration:'none',fontSize:'.85rem',transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color=T.accent} onMouseLeave={e=>e.currentTarget.style.color=T.muted}>
            <Mail size={15} color={T.accent} /> {BIZ.email}
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── LocalBusiness JSON-LD builder ────────────────────────────────────────────
export function buildLocalBusinessLd({ service, city, description, areaServed }:
  { service: string; city: string; description: string; areaServed: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MarketingAgency',
    '@id': `${BIZ.url}/#localbusiness`,
    name: BIZ.name,
    url: BIZ.url,
    telephone: BIZ.phone,
    email: BIZ.email,
    description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BIZ.address.street,
      addressLocality: BIZ.address.locality,
      addressRegion: BIZ.address.region,
      postalCode: BIZ.address.postalCode,
      addressCountry: BIZ.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BIZ.geo.lat,
      longitude: BIZ.geo.lng,
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens: '09:00',
      closes: '19:00',
    }],
    areaServed: areaServed.map(a => ({ '@type': 'City', name: a })),
    sameAs: Object.values(BIZ.social),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service} Services`,
    },
  };
}

// ─── FAQ JSON-LD builder ──────────────────────────────────────────────────────
export function buildFaqLd(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// ─── Breadcrumb JSON-LD builder ───────────────────────────────────────────────
export function buildBreadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${BIZ.url}${c.href}`,
    })),
  };
}

// ─── Feature Grid ─────────────────────────────────────────────────────────────
interface Feature { icon: string; title: string; desc: string }
export const FeatureGrid = ({ features }: { features: Feature[] }) => (
  <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'20px' }}>
    {features.map((f, i) => (
      <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}
        style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:'20px',padding:'28px',position:'relative',overflow:'hidden',transition:'border-color .3s,transform .3s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor=T.accent; e.currentTarget.style.transform='translateY(-4px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.transform='translateY(0)' }}>
        <div style={{ fontSize:'2rem',marginBottom:'12px' }}>{f.icon}</div>
        <h3 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'1.05rem',fontWeight:700,color:T.text,margin:'0 0 8px' }}>{f.title}</h3>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'.88rem',color:T.muted,lineHeight:1.7,margin:0 }}>{f.desc}</p>
      </motion.div>
    ))}
  </div>
);

// ─── Internal Links ───────────────────────────────────────────────────────────
interface RelatedLink { label: string; href: string; desc: string }
export const RelatedLinksSection = ({ links, heading='Explore Related Services' }: { links: RelatedLink[]; heading?: string }) => (
  <section style={{ padding:'60px 0',background:T.bg,position:'relative' }}>
    <div className="dh-container" style={{ position:'relative',zIndex:10 }}>
      <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'1.5rem',fontWeight:800,color:T.text,marginBottom:'1.5rem',letterSpacing:'-.02em' }}>{heading}</h2>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px' }}>
        {links.map((l, i) => (
          <Link key={i} to={l.href} style={{ display:'block',background:T.card,border:`1px solid ${T.border}`,borderRadius:'14px',padding:'20px',textDecoration:'none',transition:'border-color .3s,transform .2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=T.accent; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.transform='translateY(0)' }}>
            <div style={{ fontFamily:"'Outfit',sans-serif",fontWeight:700,color:T.accent,fontSize:'.95rem',marginBottom:'6px',display:'flex',alignItems:'center',gap:'6px' }}>
              {l.label} <ArrowRight size={14} />
            </div>
            <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'.83rem',color:T.muted,lineHeight:1.6 }}>{l.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// ─── LocalServicePage Template ────────────────────────────────────────────────
export interface LocalServicePageProps {
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage?: string;
  };
  breadcrumbs: Crumb[];
  hero: {
    tag: string;
    h1: string;
    subtitle: string;
    stats: { value: string; label: string }[];
  };
  intro: string;
  features: Feature[];
  whyAvani: { title: string; desc: string }[];
  localAreaText: string;
  areaServed: string[];
  faqs: FAQ[];
  reviews: Review[];
  relatedLinks: RelatedLink[];
  cta: { headline: string; sub: string };
  service: string;
  city: string;
  localBizDescription: string;
}

export default function LocalServicePage({
  seo, breadcrumbs, hero, intro, features, whyAvani, localAreaText, areaServed,
  faqs, reviews, relatedLinks, cta, service, city, localBizDescription,
}: LocalServicePageProps) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqLd       = buildFaqLd(faqs);
  const bcLd        = buildBreadcrumbLd(breadcrumbs);
  const bizLd       = buildLocalBusinessLd({ service, city, description: localBizDescription, areaServed });

  return (
    <div style={{ background:T.bg,color:T.text,minHeight:'100vh',fontFamily:"'Inter',sans-serif" }}>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="robots" content="index,follow" />
        {/* Canonical is injected once, per-route, by the server (api/seo.js) to
            avoid a duplicate <link rel="canonical"> tag. */}
        {/* OG */}
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url"         content={seo.canonical} />
        <meta property="og:image"       content={seo.ogImage ?? 'https://www.avanienterprises.in/logo0.webp'} />
        <meta property="og:site_name"   content="Avani Enterprises" />
        <meta property="og:locale"      content="en_IN" />
        {/* Twitter */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image"       content={seo.ogImage ?? 'https://www.avanienterprises.in/logo0.webp'} />
        {/* Schemas */}
        <script type="application/ld+json">{JSON.stringify(bcLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(bizLd)}</script>
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ minHeight:'75vh',display:'flex',alignItems:'center',background:T.bg,position:'relative',overflow:'hidden',paddingTop:'110px',paddingBottom:'80px' }}>
        <Grain /><Grid />
        <Blob top="-10%" right="-5%" size={500} opacity={0.07} blur={130} />
        <Blob bottom="-15%" left="-5%" size={350} opacity={0.04} blur={100} />
        <div style={{ position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(to right,transparent,${T.accent} 25%,${T.accentLt} 50%,${T.accent} 75%,transparent)` }} />

        <div className="dh-container" style={{ position:'relative',zIndex:10 }}>
          <BreadcrumbBar crumbs={breadcrumbs} />
          <motion.div initial="hidden" animate="visible" variants={{ visible:{ transition:{ staggerChildren:0.1 } } }} style={{ maxWidth:'780px',marginTop:'2rem' }}>
            <motion.div variants={fadeUp} style={{ display:'inline-flex',alignItems:'center',gap:'8px',background:`rgba(196,145,58,0.08)`,border:`1px solid rgba(196,145,58,0.15)`,borderRadius:'100px',padding:'6px 16px',marginBottom:'1.5rem' }}>
              <span style={{ fontSize:'11px',color:T.accent,fontWeight:700,letterSpacing:'.05em',textTransform:'uppercase' }}>{hero.tag}</span>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontFamily:"'Outfit',sans-serif",fontSize:'clamp(2rem,5.5vw,3.8rem)',fontWeight:900,color:T.text,letterSpacing:'-.03em',margin:'0 0 1.25rem',lineHeight:1.05 }}>
              {hero.h1}
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontFamily:"'Inter',sans-serif",fontSize:'1.05rem',color:T.muted,lineHeight:1.7,maxWidth:'600px',marginBottom:'2.5rem' }}>
              {hero.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} style={{ display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'center',marginBottom:'3rem' }}>
              <Link to="/contact" style={{ display:'inline-flex',alignItems:'center',gap:'8px',background:`linear-gradient(135deg,${T.accent},${T.accentLt})`,color:'#0a0508',padding:'13px 26px',borderRadius:'10px',fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:'.88rem',letterSpacing:'.05em',textDecoration:'none',textTransform:'uppercase' }}>
                Get Free Consultation <ArrowRight size={15} />
              </Link>
              <a href={`tel:${BIZ.phone}`} style={{ display:'inline-flex',alignItems:'center',gap:'8px',background:'transparent',color:T.text,padding:'12px 24px',borderRadius:'10px',fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:'.88rem',textDecoration:'none',border:`1px solid ${T.border}`,transition:'border-color .2s' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=T.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                <Phone size={15} color={T.accent} /> Call Now
              </a>
            </motion.div>
            <motion.div variants={fadeUp} style={{ display:'flex',gap:'20px',flexWrap:'wrap' }}>
              {hero.stats.map((s, i) => (
                <div key={i} style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:'12px',padding:'16px 22px',textAlign:'center',minWidth:'120px' }}>
                  <div style={{ fontFamily:"'Outfit',sans-serif",fontSize:'1.8rem',fontWeight:900,color:T.accent,lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontFamily:"'Outfit',sans-serif",fontSize:'10px',color:T.muted,marginTop:'4px',fontWeight:600,textTransform:'uppercase',letterSpacing:'.05em' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Line />

      {/* ── INTRO ───────────────────────────────────────────────────────── */}
      <section style={{ padding:'80px 0',background:T.bgSec,position:'relative',overflow:'hidden' }}>
        <Grain /><Grid />
        <div className="dh-container" style={{ position:'relative',zIndex:10 }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5rem',alignItems:'center' }} className="dh-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
              <span style={{ fontSize:'11px',fontWeight:700,letterSpacing:'.15em',color:T.accent,textTransform:'uppercase',display:'block',marginBottom:'.75rem' }}>OVERVIEW</span>
              <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:800,color:T.text,letterSpacing:'-.02em',margin:'0 0 1.5rem',lineHeight:1.2 }}>
                Why Businesses in {city} Trust Avani Enterprises
              </h2>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'.97rem',color:T.muted,lineHeight:1.8,marginBottom:'1.5rem' }}>{intro}</p>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:'.93rem',color:T.muted,lineHeight:1.8 }}>{localAreaText}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} style={{ display:'flex',flexDirection:'column',gap:'16px' }}>
              {whyAvani.map((w, i) => (
                <div key={i} style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:'14px',padding:'20px 22px',display:'flex',gap:'14px',alignItems:'flex-start' }}>
                  <CheckCircle size={20} color={T.accent} style={{ flexShrink:0,marginTop:'2px' }} />
                  <div>
                    <div style={{ fontFamily:"'Outfit',sans-serif",fontWeight:700,color:T.text,fontSize:'.95rem',marginBottom:'4px' }}>{w.title}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif",fontSize:'.85rem',color:T.muted,lineHeight:1.65 }}>{w.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Line />

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <section style={{ padding:'80px 0',background:T.bg,position:'relative',overflow:'hidden' }}>
        <Grain /><Grid />
        <Blob top="-10%" left="-5%" size={400} />
        <div className="dh-container" style={{ position:'relative',zIndex:10 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} style={{ textAlign:'center',marginBottom:'3rem' }}>
            <span style={{ fontSize:'11px',fontWeight:700,letterSpacing:'.15em',color:T.accent,textTransform:'uppercase',display:'block',marginBottom:'.75rem' }}>WHAT WE DELIVER</span>
            <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'clamp(1.6rem,3.5vw,2.4rem)',fontWeight:800,color:T.text,letterSpacing:'-.02em',margin:0 }}>
              Our {service} Services Include
            </h2>
          </motion.div>
          <FeatureGrid features={features} />
        </div>
      </section>

      <Line />

      {/* ── AREA SERVED ─────────────────────────────────────────────────── */}
      <section style={{ padding:'60px 0',background:T.bgSec,position:'relative',overflow:'hidden' }}>
        <Grain />
        <div className="dh-container" style={{ position:'relative',zIndex:10 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} style={{ textAlign:'center' }}>
            <span style={{ fontSize:'11px',fontWeight:700,letterSpacing:'.15em',color:T.accent,textTransform:'uppercase',display:'block',marginBottom:'.75rem' }}>SERVICE AREA</span>
            <h2 style={{ fontFamily:"'Outfit',sans-serif",fontSize:'1.6rem',fontWeight:800,color:T.text,letterSpacing:'-.02em',margin:'0 0 1.5rem' }}>We Serve Businesses Across</h2>
            <div style={{ display:'flex',flexWrap:'wrap',gap:'12px',justifyContent:'center' }}>
              {areaServed.map((a, i) => (
                <span key={i} style={{ fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:'.85rem',color:T.accent,background:`rgba(196,145,58,0.08)`,border:`1px solid rgba(196,145,58,0.2)`,borderRadius:'100px',padding:'8px 18px',letterSpacing:'.03em' }}>
                  <MapPin size={12} style={{ verticalAlign:'middle',marginRight:'4px' }} />{a}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Line />

      <ReviewsSection reviews={reviews} />
      <Line />
      <FAQSection faqs={faqs} />
      <Line />
      <RelatedLinksSection links={relatedLinks} />
      <Line />
      <CTASection headline={cta.headline} sub={cta.sub} />
    </div>
  );
}
