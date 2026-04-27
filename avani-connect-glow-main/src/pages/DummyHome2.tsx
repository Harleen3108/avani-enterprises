import React, { useEffect, useRef, useState, Fragment, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, MapPin, Play, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';
import { services, caseStudies, industries, offices, processSteps, testimonials, team, awards, milestones, faqs, clientLogos, footerLinks } from '../components/dummyhome2/data';
import { FluidHeroBackground } from '../components/dummyhome2/FluidHeroBackground';
import '../components/dummyhome2/DummyHome2.css';

const words = ['Websites', 'Products', 'Solutions', 'Experiences'];

const newProjectData = [
  { name: 'Indus Group of Institutions', cat: 'Education', img: '/indus_aesthetic_1777270461175.png', link: '/projects/indus' },
  { name: 'Policicue', cat: 'InsurTech', img: '/policicue_aesthetic_1777270486926.png', link: '/projects/policicue' },
  { name: 'FRD Nutrition', cat: 'E-Commerce', img: '/frd_aesthetic_1777270509667.png', link: '/projects/frd-nutrition' },
  { name: 'Hi-tech Homes', cat: 'Real Estate', img: '/hitech_aesthetic_1777270543762.png', link: '/projects/hitech-homes' },
  { name: 'Sanjeevni Hospital', cat: 'Healthcare', img: '/sanjeevni_aesthetic_1777270573722.png', link: '/projects/sanjeevni-hospital' },
  { name: 'Rohtak Shoe co.', cat: 'Fashion', img: '/rohtak_aesthetic_1777270648142.png', link: '/projects/rohtak-shoe' },
];

const StackedVinylProjects = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const doubledProjects = [...newProjectData, ...newProjectData, ...newProjectData];

  return (
    <section className="dh2-section" id="work" style={{ overflow: 'hidden', paddingBottom: '8rem' }}>
      <div className="dh2-container">
        <motion.div className="dh2-section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <div className="dh2-label">SUCCESS STORIES</div>
            <h2 className="dh2-display dh2-section-title">FEATURED WORK</h2>
          </div>
          <Link to="/case-studies" className="dh2-btn-ghost" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', height: 'fit-content', textDecoration: 'none' }}>
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
      
      {/* Vinyl Stack Marquee */}
      <div className="dh2-vinyl-wrapper">
        <motion.div 
          className="dh2-vinyl-track"
          animate={{ x: ['0%', '-33.333%'] }} 
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          style={{ 
            animationPlayState: hoveredIdx !== null ? 'paused' : 'running' 
          }}
        >
          {doubledProjects.map((cs, i) => (
            <Link 
              to={cs.link}
              key={i} 
              className="dh2-vinyl-card"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                zIndex: hoveredIdx === i ? 50 : 10,
                transform: hoveredIdx === i ? 'translateY(-60px) rotate(-2deg) scale(1.05)' : 'none',
              }}
            >
              <img src={cs.img} alt={cs.name} className="dh2-vinyl-img" />
              <div className="dh2-vinyl-overlay" />
              <div className="dh2-vinyl-content">
                <span className="dh2-vinyl-cat">{cs.cat}</span>
                <h3 className="dh2-vinyl-title">{cs.name}</h3>
                <div className="dh2-vinyl-view">
                  VIEW PROJECT <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const WhatWeDo = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] });
  const [activeIdx, setActiveIdx] = useState(0);

  // Horizontal translation: use a callback that returns a NUMBER (pixels)
  // 6 cards × 340px + 5 gaps × 32px = 2200px total track width
  // We want to scroll from showing card 1 (x=0) to showing card 6 (x = -(trackWidth - viewport))
  const trackX = useTransform(scrollYProgress, (p) => {
    const totalWidth = services.length * 340 + (services.length - 1) * 32;
    const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1400;
    const maxScroll = Math.max(0, totalWidth - viewportW + 120); // 120px for padding
    return -p * maxScroll;
  });

  // Update active index for visual highlight
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(services.length - 1, Math.floor(v * services.length));
      setActiveIdx(idx);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section className="dh2-wwd2-wrapper" ref={wrapperRef} id="services">
      <div className="dh2-wwd2-sticky">

        {/* Header — normal flow, top of sticky */}
        <div className="dh2-wwd2-top">
          <div className="dh2-label">OUR SERVICES</div>
          <h2 className="dh2-display dh2-wwd2-title">What We Do</h2>
        </div>

        {/* Card track — fills middle area */}
        <div className="dh2-wwd2-track-area">
          <motion.div className="dh2-wwd2-track" style={{ x: trackX }}>
            {services.map((svc, i) => (
              <div key={i} className={`dh2-wwd2-card ${activeIdx === i ? 'dh2-wwd2-card--active' : ''}`}>
                <div className="dh2-wwd2-card-num">{svc.idx}</div>
                <h3 className="dh2-heading dh2-wwd2-card-title">{svc.title}</h3>
                <p className="dh2-body dh2-wwd2-card-desc">{svc.desc}</p>
                <div className="dh2-wwd2-card-tags">
                  {svc.tags.map((t, j) => <span key={j} className="dh2-wwd2-card-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const DummyHome2 = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [testIdx, setTestIdx] = useState(0);
  const [blogs, setBlogs] = useState<any[]>([]);

  const { scrollYProgress } = useScroll();
  
  const scrollPoints = [0, 0.4, 0.45, 0.55, 0.6, 1];
  
  const bgDeep = useTransform(scrollYProgress, scrollPoints, ['#030303', '#030303', '#e8e4db', '#e8e4db', '#030303', '#030303']);
  const bgBase = useTransform(scrollYProgress, scrollPoints, ['#0a0a0a', '#0a0a0a', '#eeebe4', '#eeebe4', '#0a0a0a', '#0a0a0a']);
  const bgSurface = useTransform(scrollYProgress, scrollPoints, ['#111111', '#111111', '#f4f2ee', '#f4f2ee', '#111111', '#111111']);
  const textMain = useTransform(scrollYProgress, scrollPoints, ['#f0f0f0', '#f0f0f0', '#1a1a1a', '#1a1a1a', '#f0f0f0', '#f0f0f0']);
  const textMuted = useTransform(scrollYProgress, scrollPoints, ['#7a7a7a', '#7a7a7a', '#666666', '#666666', '#7a7a7a', '#7a7a7a']);
  const textDim = useTransform(scrollYProgress, scrollPoints, ['#3a3a3a', '#3a3a3a', '#999999', '#999999', '#3a3a3a', '#3a3a3a']);
  const borderS = useTransform(scrollYProgress, scrollPoints, ['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.07)', 'rgba(0,0,0,0.08)', 'rgba(0,0,0,0.08)', 'rgba(255,255,255,0.07)', 'rgba(255,255,255,0.07)']);
  const borderF = useTransform(scrollYProgress, scrollPoints, ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.15)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.15)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.15)']);

  useEffect(() => {
    // Keep body background matching the theme start to prevent flash
    document.body.style.backgroundColor = '#030303';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(iv); setTimeout(() => setLoading(false), 400); return 100; } return p + 4; });
    }, 40);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setWordIdx(p => (p + 1) % words.length), 3000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setTestIdx(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/blogs?limit=3`).then(r => { if (r.data.success) setBlogs(r.data.data || []); }).catch(() => { });
  }, []);

  const titleV = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
  };
  const fadeV = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: .8, ease: 'easeOut', delay: .8 } }
  };

  const t = testimonials[testIdx];

  return (
    <motion.div 
      className="dh2-root"
      style={{
        '--bg-deep': bgDeep,
        '--bg-base': bgBase,
        '--bg-surface': bgSurface,
        '--text-main': textMain,
        '--text-muted': textMuted,
        '--text-dim': textDim,
        '--border-s': borderS,
        '--border-f': borderF,
      } as any}
    >
      {/* LOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div className="dh2-loader" exit={{ opacity: 0, y: '-100%' }} transition={{ duration: .7, ease: [.76, 0, .24, 1] }}>
            <motion.div className="dh2-loader-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>AVANI</motion.div>
            <div className="dh2-loader-bar"><div className="dh2-loader-fill" style={{ width: `${progress}%` }} /></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV */}
      <nav className="dh2-nav">
        <Link to="/" className="dh2-logo">AVANI.</Link>
        <div className="dh2-nav-links">
          <a href="#work" className="dh2-nav-link">Work</a>
          <a href="#services" className="dh2-nav-link">Services</a>
          <a href="#about" className="dh2-nav-link">About</a>
          <a href="#contact" className="dh2-nav-link">Contact</a>
        </div>
        <Link to="/get-consultation" className="dh2-nav-cta">Start a Project</Link>
      </nav>

      {/* HERO BACKGROUND (Full Screen) */}
      <div className="dh2-hero-bg-wrapper">
        <FluidHeroBackground />
        <div className="dh2-hero-grain"/>
      </div>

      {/* HERO */}
      <section className="dh2-hero">
        <h1 className="dh2-display dh2-hero-title">
          <span className="dh2-hero-line">
            <motion.span custom={0} initial="hidden" animate={!loading ? "visible" : "hidden"} variants={titleV} className="dh2-hero-text">WE BUILD</motion.span>
          </span>
          <span className="dh2-hero-line">
            <motion.span custom={1} initial="hidden" animate={!loading ? "visible" : "hidden"} variants={titleV} className="dh2-hero-text dh2-hero-stroked">HIGH‑PERFORMING</motion.span>
          </span>
          <span className="dh2-hero-line" style={{ overflow: 'hidden', height: 'clamp(3.5rem,10vw,11rem)' }}>
            <AnimatePresence mode="wait">
              <motion.span key={wordIdx} initial={{ y: '110%' }} animate={{ y: '0%' }} exit={{ y: '-110%' }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }} className="dh2-hero-text dh2-hero-accent" style={{ display: 'block' }}>
                {words[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
        <motion.div initial="hidden" animate={!loading ? "visible" : "hidden"} variants={fadeV} className="dh2-hero-loc">
          <MapPin size={11} color="#3a3a3a" />
          <span>Gurgaon · Mumbai · Rohtak · Australia</span>
        </motion.div>
        <motion.p initial="hidden" animate={!loading ? "visible" : "hidden"} variants={fadeV} className="dh2-body dh2-hero-sub">
          We're more than just a digital agency. We build stories, share passions, and deliver results that leave competitors far behind.
        </motion.p>
        <motion.div initial="hidden" animate={!loading ? "visible" : "hidden"} variants={fadeV} className="dh2-hero-ctas">
          <Link to="/get-consultation" className="dh2-btn-fill">Get Consultation <ArrowRight size={14} /></Link>
          <button className="dh2-btn-ghost"><Play size={14} /> Watch Reel</button>
        </motion.div>
        <div className="dh2-scroll-hint">
          <span>Scroll</span>
          <div className="dh2-scroll-line" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="dh2-marquee">
        <div className="dh2-label" style={{ textAlign: 'center', marginBottom: '.8rem', color: '#3a3a3a' }}>TRUSTED BY 150+ COMPANIES WORLDWIDE</div>
        <div className="dh2-marquee-track">
          {[...Array(3)].map((_, r) => (
            <Fragment key={r}>
              {clientLogos.map((c, i) => (
                <div key={`${r}-${i}`} className="dh2-marquee-pill">
                  <img src={c.logo} alt={c.name} />
                  <span>{c.name}</span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="dh2-container">
        <div className="dh2-stats-row">
          {[{ n: '150+', l: 'Happy Clients', s: 'Worldwide' }, { n: '300+', l: 'Projects Delivered', s: 'And counting' }, { n: '85%', l: 'Avg. Growth Rate', s: 'For our clients' }, { n: '8+', l: 'Years of Excellence', s: 'Since 2016' }].map((s, i) => (
            <motion.div key={i} className="dh2-stat" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1, duration: .6 }}>
              <div className="dh2-stat-num">{s.n}</div>
              <div className="dh2-stat-label">{s.l}</div>
              <div className="dh2-stat-sub">{s.s}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* WHAT WE DO — Horizontal Scroll Showcase */}
      <WhatWeDo />


      {/* CASE STUDIES */}
      <StackedVinylProjects />

      {/* INDUSTRIES */}
      <section className="dh2-section dh2-container">
        <motion.div className="dh2-section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
          <div className="dh2-label">VERTICALS</div>
          <h2 className="dh2-display dh2-section-title">INDUSTRIES WE SERVE</h2>
        </motion.div>
        <div className="dh2-ind-grid">
          {industries.map((ind, i) => (
            <motion.div key={i} className="dh2-ind" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05, duration: .5 }}>
              <div className="dh2-ind-label">{ind.label}</div>
              <div className="dh2-ind-desc">{ind.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="dh2-section dh2-container">
        <motion.div className="dh2-section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
          <div className="dh2-label">WHERE WE OPERATE</div>
          <h2 className="dh2-display dh2-section-title">GLOBAL PRESENCE</h2>
        </motion.div>
        <div className="dh2-globe-detailed-grid">
          {offices.map((o, i) => (
            <motion.div key={i} className="dh2-globe-detailed-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1, duration: .6 }}>
              <div className="dh2-globe-img-wrap">
                <img src={o.img} alt={o.city} className="dh2-globe-img" />
                <span className="dh2-globe-tag">{o.tag}</span>
              </div>
              <div className="dh2-globe-content">
                <div className="dh2-globe-city-row">
                  <MapPin size={22} className="dh2-globe-icon" />
                  <h3 className="dh2-heading">{o.city}, {o.country}</h3>
                </div>
                <p className="dh2-body dh2-globe-desc">{o.desc}</p>
                <div className="dh2-globe-contact">
                  {o.contact && (
                    <>
                      <div className="dh2-globe-contact-item">
                        <span className="dh2-label" style={{fontSize: '0.6rem'}}>Email</span>
                        <div className="dh2-globe-contact-val">{o.contact.email}</div>
                      </div>
                      <div className="dh2-globe-contact-item">
                        <span className="dh2-label" style={{fontSize: '0.6rem'}}>Phone</span>
                        <div className="dh2-globe-contact-val">{o.contact.phone}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="dh2-section dh2-container">
        <motion.div className="dh2-section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
          <div className="dh2-label">HOW WE WORK</div>
          <h2 className="dh2-display dh2-section-title">OUR PROCESS</h2>
        </motion.div>
        <div className="dh2-proc-grid">
          {processSteps.map((p, i) => (
            <motion.div key={i} className="dh2-proc" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08, duration: .5 }}>
              <div className="dh2-proc-num">{p.step}</div>
              <div className="dh2-proc-title">{p.title}</div>
              <div className="dh2-body dh2-proc-desc">{p.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="dh2-test">
        <div className="dh2-container">
          <motion.div className="dh2-section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
            <div className="dh2-label">CLIENT VOICES</div>
            <h2 className="dh2-display dh2-section-title">WHAT THEY SAY</h2>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={testIdx} className="dh2-test-card" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: .5 }}>
              <div className="dh2-test-img-wrap"><img src={t.img} alt={t.name} /></div>
              <div>
                <div className="dh2-test-quote">{t.text}</div>
                <div className="dh2-test-name">{t.name}</div>
                <div className="dh2-test-role">{t.role}</div>
                <div className="dh2-test-dots">
                  {testimonials.map((_, i) => <div key={i} className={`dh2-test-dot ${i === testIdx ? 'active' : ''}`} onClick={() => setTestIdx(i)} />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* TEAM */}
      <section className="dh2-section dh2-container">
        <motion.div className="dh2-section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
          <div className="dh2-label">THE PEOPLE</div>
          <h2 className="dh2-display dh2-section-title">MEET OUR TEAM</h2>
        </motion.div>
        <div className="dh2-team-grid">
          {team.map((m, i) => (
            <motion.div key={i} className="dh2-team" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08, duration: .5 }}>
              <img src={m.img} alt={m.name} />
              <div className="dh2-team-info">
                <div className="dh2-team-name">{m.name}</div>
                <div className="dh2-team-role">{m.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <div className="dh2-awards">
        <div className="dh2-awards-track">
          {[...Array(3)].map((_, r) => (
            <Fragment key={r}>
              {awards.map((a, i) => (
                <div key={`${r}-${i}`} className="dh2-award">
                  <span className="dh2-award-icon">★</span>
                  <div>
                    <div className="dh2-award-label">{a.label}</div>
                    <div className="dh2-award-sub">{a.sub}</div>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <section className="dh2-section dh2-container">
        <motion.div className="dh2-section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} style={{ textAlign: 'center' }}>
          <div className="dh2-label">OUR JOURNEY</div>
          <h2 className="dh2-display dh2-section-title">THE AVANI STORY</h2>
        </motion.div>
        <div className="dh2-tl">
          {milestones.map((m, i) => (
            <motion.div key={i} className="dh2-tl-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08, duration: .5 }}>
              <div className="dh2-tl-dot" />
              <div className="dh2-tl-year">{m.year}</div>
              <div className="dh2-tl-title">{m.title}</div>
              <div className="dh2-body dh2-tl-desc">{m.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      {blogs.length > 0 && (
        <section className="dh2-section dh2-container">
          <motion.div className="dh2-section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
            <div className="dh2-label">INSIGHTS</div>
            <h2 className="dh2-display dh2-section-title">LATEST FROM BLOG</h2>
          </motion.div>
          <div className="dh2-blog-grid">
            {blogs.slice(0, 3).map((b: any, i: number) => (
              <Link key={i} to={`/blog/${b.slug}`} className="dh2-blog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                {b.image && <img src={b.image.startsWith('http') ? b.image : `${API_BASE_URL}${b.image}`} alt={b.title} />}
                <div className="dh2-blog-body">
                  <div className="dh2-blog-date">{new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  <div className="dh2-blog-title">{b.title}</div>
                  <span className="dh2-blog-link">Read Article →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="dh2-section dh2-container">
        <motion.div className="dh2-section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
          <div className="dh2-label">QUESTIONS</div>
          <h2 className="dh2-display dh2-section-title">FAQ</h2>
        </motion.div>
        {faqs.map((f, i) => (
          <div key={i} className={`dh2-faq ${activeFaq === i ? 'open' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
            <div className="dh2-faq-q">
              <span>{f.q}</span>
              <Plus className="dh2-faq-icon" size={20} />
            </div>
            <div className={`dh2-faq-a ${activeFaq === i ? 'active' : ''}`}>
              <div className="dh2-faq-a-inner">{f.a}</div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="dh2-cta" id="contact">
        <div className="dh2-cta-watermark">AVANI</div>
        <motion.h2 className="dh2-display dh2-cta-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
          LET'S BUILD<br /><span>TOGETHER</span>
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .2, duration: .6 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <Link to="/get-consultation" className="dh2-btn-fill">Start a Project <ArrowRight size={14} /></Link>
          <Link to="/contact" className="dh2-btn-ghost">Let's Talk <ArrowRight size={14} /></Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="dh2-footer">
        <div className="dh2-footer-grid">
          <div>
            <div className="dh2-footer-brand">AVANI.</div>
            <p className="dh2-footer-desc">One stop solution for business. We build stories, share passions, and deliver results that leave competitors far behind.</p>
          </div>
          <div>
            <div className="dh2-footer-heading">Company</div>
            {footerLinks.company.map((l, i) => <Link key={i} to={l.path} className="dh2-footer-link">{l.label}</Link>)}
          </div>
          <div>
            <div className="dh2-footer-heading">Services</div>
            {footerLinks.services.map((l, i) => <Link key={i} to={l.path} className="dh2-footer-link">{l.label}</Link>)}
          </div>
          <div>
            <div className="dh2-footer-heading">Legal</div>
            {footerLinks.legal.map((l, i) => <Link key={i} to={l.path} className="dh2-footer-link">{l.label}</Link>)}
          </div>
        </div>
        <div className="dh2-footer-bottom">
          <span>© 2016–2025 Avani Enterprises. All rights reserved.</span>
          <span>Expanding Globally · Gurgaon · Mumbai · Rohtak · Australia</span>
        </div>
      </footer>
    </motion.div>
  );
};

export default DummyHome2;
