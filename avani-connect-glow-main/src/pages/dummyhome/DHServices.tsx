import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Search, Share2, Zap, Radio, PieChart, ArrowRight, CheckCircle, Lightbulb, Shield, Target, MessageSquare, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import RotatingText from '../../components/RotatingText';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const services = [
  { icon: <Code size={32} />, title: 'Web & App Development', slug: 'web-app-development', desc: 'Crafting high-performance digital architectures with precision and scale.', features: ['Custom React Frameworks', 'Mobile App Ecosystems', 'Enterprise Solutions'] },
  { icon: <Search size={32} />, title: 'SEO & Content Marketing', slug: 'seo-content-marketing', desc: 'Dominating search landscapes through strategic authority and visibility.', features: ['Semantic SEO', 'Authority Building', 'Content Strategy'] },
  { icon: <Share2 size={32} />, title: 'Social Media Marketing', slug: 'social-media-marketing', desc: 'Building meaningful brand narratives that resonate globally.', features: ['Narrative Design', 'Viral Mechanics', 'Community Growth'] },
  { icon: <Zap size={32} />, title: 'AI Solutions', slug: 'ai-solutions', desc: 'Harnessing the power of automation to drive operational intelligence.', features: ['LLM Integration', 'Process Automation', 'Intelligent Chatbots'] },
  { icon: <Radio size={32} />, title: 'Podcast Production', slug: 'podcast-production', desc: 'Amplifying your brand voice through cinematic audio experiences.', features: ['Audio Engineering', 'Global Distribution', 'Narrative Production'] },
  { icon: <PieChart size={32} />, title: 'Financial Consulting', slug: 'financial-consulting', desc: 'Navigating market complexities with data-driven strategic oversight.', features: ['Growth Capital', 'Risk Management', 'Strategic Scaling'] },
];



/* Floating particles */
const Particles = ({ count = 12 }: { count?: number }) => {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 12 + 8,
    delay: Math.random() * 6,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
      {dots.map(d => (
        <motion.div
          key={d.id}
          animate={{ y: [0, -80, -160], opacity: [0, 0.4, 0] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: 'linear' }}
          style={{
            position: 'absolute', left: `${d.x}%`, top: `${d.y}%`,
            width: d.size, height: d.size, borderRadius: '50%',
            background: 'var(--accent-primary)',
            boxShadow: `0 0 ${d.size * 4}px var(--accent-primary)`,
          }}
        />
      ))}
    </div>
  );
};

/* Grain overlay */
const Grain = () => (
  <div style={{
    position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize: '200px',
  }} />
);

/* Animated grid lines */
const GridBg = ({ size = 40, opacity = 0.08 }: { size?: number; opacity?: number }) => (
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity,
    backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`,
    backgroundSize: `${size}px ${size}px`,
  }} />
);

/* Glowing blob */
const GlowBlob = ({ top, left, right, bottom, w = 350, h = 350, opacity = 0.06, blur = 100 }: any) => (
  <motion.div
    animate={{ scale: [1, 1.15, 1], opacity: [opacity, opacity * 1.4, opacity] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      position: 'absolute', width: w, height: h, borderRadius: '50%',
      background: 'var(--accent-primary)', filter: `blur(${blur}px)`,
      top, left, right, bottom, pointerEvents: 'none', zIndex: 1,
    }}
  />
);

/* Thin luxury horizontal line */
const LuxuryLine = () => (
  <div style={{
    width: '100%', height: '1px', zIndex: 5,
    background: 'linear-gradient(to right, transparent, var(--accent-primary) 20%, var(--accent-light) 50%, var(--accent-primary) 80%, transparent)',
    opacity: 0.3,
  }} />
);

const DHServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 400], [0, -40]);

  return (
    <div className="dh-services-page">

      {/* 1. CINEMATIC HERO */}
      <section className="theme-brown" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.06} />
        <Particles count={16} />
        <GlowBlob top="-10%" right="-5%" w={400} h={400} opacity={0.04} blur={120} />
        <GlowBlob bottom="0" left="-10%" w={300} h={300} opacity={0.03} blur={100} />

        {/* Gold top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />

        {/* Decorative rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '8%', right: '8%', width: 200, height: 200, border: '1px solid var(--border-light)', borderRadius: '50%', pointerEvents: 'none', zIndex: 2, opacity: 0.3 }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '12%', right: '10%', width: 140, height: 140, border: '1px solid var(--border-faint)', borderRadius: '50%', pointerEvents: 'none', zIndex: 2, opacity: 0.2 }}
        />

        <motion.div style={{ y: heroParallax, width: '100%', position: 'relative', zIndex: 10 }}>
          <div className="dh-container">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeUp} className="dh-label">OUR EXPERTISE</motion.div>

              <h1 className="dh-display dh-hero-title">
                <span className="dh-hero-line">
                  <motion.span custom={0} variants={titleV}>HIGH-TECH</motion.span>
                </span>
                <span className="dh-hero-line">
                  <motion.span custom={1} variants={titleV} className="dh-hero-stroked">SOLUTIONS &</motion.span>
                </span>
                <span className="dh-hero-line">
                  <motion.span custom={2} variants={titleV} className="dh-hero-accent">STRATEGY.</motion.span>
                </span>
              </h1>

              <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
                We provide a comprehensive ecosystem of services designed to accelerate your <strong style={{ color: 'var(--accent-primary)' }}>growth and digital authority.</strong>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 10 }}
        >
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, letterSpacing: '0.3em', color: 'var(--text-tertiary)', fontWeight: 600 }}>SCROLL</span>
          <div style={{ width: 1, height: 24, background: 'linear-gradient(to bottom, var(--accent-light), transparent)' }} />
        </motion.div>
      </section>

      <LuxuryLine />

      {/* 2. SERVICES — BENTO GRID */}
      <section className="theme-beige" style={{ position: 'relative', padding: '100px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.04} />
        <GlowBlob top="15%" right="-80px" w={350} h={350} opacity={0.05} blur={90} />
        <GlowBlob bottom="10%" left="-60px" w={280} h={280} opacity={0.04} blur={80} />

        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Section header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '3rem' }}>
            <div className="dh-label">WHAT WE OFFER</div>
            <h2 className="dh-display" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
              OUR <span style={{ color: 'var(--accent-primary)' }}>SERVICES.</span>
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }} className="dh-responsive-grid">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-faint)',
                  borderRadius: '16px',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-faint)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                }}
              >
                <Link to={`/dummyhome/services/${service.slug}`} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                  {/* Corner accent */}
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 60, height: 60,
                    background: 'linear-gradient(135deg, transparent 50%, var(--accent-primary) 50%)',
                    opacity: 0.06, borderRadius: '0 16px 0 0',
                  }} />

                  <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>{service.icon}</div>
                  <h3 className="dh-heading" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{service.title}</h3>
                  <p className="dh-body" style={{ marginBottom: '1rem', flex: 1, fontSize: '0.9rem', lineHeight: 1.5 }}>{service.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                    {service.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={12} style={{ color: 'var(--accent-primary)' }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', marginTop: 'auto' }}>
                    EXPLORE SERVICE <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 3. METHODOLOGY (HOW WE THINK) */}
      <section className="theme-brown" style={{ position: 'relative', padding: '100px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GlowBlob top="30%" left="-5%" w={300} h={300} opacity={0.04} blur={90} />

        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }} className="dh-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="dh-label">OUR PHILOSOPHY</div>
              <h2 className="dh-display" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>HOW WE <br /><span style={{ color: 'var(--accent-primary)' }}>THINK.</span></h2>
              <p className="dh-body" style={{ fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Our methodology is rooted in architectural design principles—prioritizing structure, clarity, and intent above all else. We don't just deliver; we architect for long-term scalability.
              </p>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-faint)', height: '200px' }}>
                <img src="/hey.png" alt="Our methodology in action" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="dh-responsive-grid">
              {[
                { icon: <Search size={28} />, title: 'Discovery', desc: 'Deep immersion into the business ecosystem.' },
                { icon: <Zap size={28} />, title: 'Synthesis', desc: 'Engineered prototyping for technical function.' },
                { icon: <Code size={28} />, title: 'Execution', desc: 'Rigorous deployment with focus on fidelity.' },
                { icon: <TrendingUp size={28} />, title: 'Evolution', desc: 'Algorithmic refinement for peak performance.' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    padding: '2rem',
                    background: 'var(--card-bg)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-faint)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-faint)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>{item.icon}</div>
                  <h4 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '0.8rem' }}>{item.title}</h4>
                  <p className="dh-body" style={{ fontSize: '0.85rem' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 4. PROCESS WORKFLOW (Steps) */}
      <section className="theme-beige" style={{ position: 'relative', padding: '100px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={40} opacity={0.03} />
        <GlowBlob bottom="5%" right="-5%" w={300} h={300} opacity={0.04} blur={100} />

        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="dh-responsive-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="dh-label">OUR WORKFLOW</div>
              <h2 className="dh-display" style={{ fontSize: '4rem', marginBottom: '2.5rem' }}>BATTLE-TESTED <br /><span style={{ color: 'var(--accent-primary)' }}>PROCESS.</span></h2>
              <p className="dh-body" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
                A systematic approach to digital success. We ensure transparency and quality at every stage of the lifecycle.
              </p>
              <button className="dh-btn-fill">DOWNLOAD METHODOLOGY</button>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { step: '01', title: 'Deep Discovery', desc: 'Analyzing your market position and business objectives.' },
                { step: '02', title: 'Strategic Blueprint', desc: 'Defining the roadmap and technical architecture.' },
                { step: '03', title: 'Agile Execution', desc: 'Iterative development with complete transparency.' },
                { step: '04', title: 'Performance Scale', desc: 'Launching and optimizing for measurable impact.' }
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex', gap: '2rem', padding: '1.8rem 1.5rem',
                    borderBottom: '1px solid var(--border-faint)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--card-bg)';
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: '1.2rem', fontFamily: "'Syne'", fontWeight: 800, color: 'var(--accent-primary)' }}>{p.step}</span>
                  <div>
                    <h4 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{p.title}</h4>
                    <p className="dh-body" style={{ fontSize: '0.9rem' }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 5. CTA SECTION */}
      <section className="theme-brown" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <Particles count={8} />
        <GlowBlob top="20%" left="30%" w={400} h={400} opacity={0.03} blur={120} />

        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            padding: '6rem 4rem', textAlign: 'center',
            background: 'var(--card-bg)', borderRadius: '24px',
            border: '1px solid var(--border-faint)',
            backdropFilter: 'blur(10px)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* CTA decorative corners */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 80, height: 80, borderTop: '2px solid var(--accent-primary)', borderLeft: '2px solid var(--accent-primary)', borderRadius: '24px 0 0 0', opacity: 0.3 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 80, height: 80, borderBottom: '2px solid var(--accent-primary)', borderRight: '2px solid var(--accent-primary)', borderRadius: '0 0 24px 0', opacity: 0.3 }} />

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="dh-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '2rem', lineHeight: 1.1 }}>
                READY TO SCALE YOUR <br />
                <span style={{ color: 'var(--accent-primary)' }}>
                  <RotatingText
                    words={["DIGITAL ASSETS", "COMMERCE HUB", "TECH STACK", "MARKET SHARE"]}
                    interval={3000}
                    className="dh-display"
                  />
                </span> <br />
                INTO THE FUTURE?
              </h2>
              <p className="dh-body" style={{ maxWidth: '600px', margin: '0 auto 4rem', fontSize: '1.2rem' }}>
                Join 150+ global clients who trust Avani Enterprises for their technical and strategic oversight.
              </p>
              <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }} className="dh-responsive-grid">
                <Link to="/dummyhome/get-consultation" className="dh-btn-fill">INITIATE PROJECT <ArrowRight size={18} /></Link>
                <Link to="/dummyhome/contact" className="dh-btn-ghost">VIEW PORTFOLIO</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHServices;
