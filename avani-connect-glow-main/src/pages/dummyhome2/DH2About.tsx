import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, CheckCircle, Globe, Lightbulb, Heart, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';
import DH2EcosystemMap from '../../components/dummyhome2/DH2EcosystemMap';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const DH2About = () => {
  const stats = [
    { value: '150+', label: 'Happy Clients' },
    { value: '300+', label: 'Projects Done' },
    { value: '85%', label: 'Avg Growth' },
    { value: '8+', label: 'Years Exp.' },
  ];

  const values = [
    { icon: <Target size={18} />, title: 'Results Driven', desc: 'Focusing on measurable outcomes and delivering the best in every project.' },
    { icon: <Users size={18} />, title: 'Client-Centric', desc: "Prioritizing client needs and building long-term partnerships on trust." },
    { icon: <Lightbulb size={18} />, title: 'Innovation First', desc: 'Continuously exploring new digital technologies and staying ahead.' },
    { icon: <Heart size={18} />, title: 'Excellence', desc: 'Setting high standards in everything we do and striving for quality.' },
  ];

  const whyUs = [
    { icon: <Shield size={20} />, title: 'Proven Track Record', desc: '8+ years of experience and 300+ successful projects handled with strategic depth.' },
    { icon: <Zap size={20} />, title: 'Innovation-Driven', desc: 'Leveraging cutting-edge technologies to deliver innovative, competitive solutions.' },
    { icon: <Users size={20} />, title: 'Client-Centric', desc: 'Your success is our priority. We ensure transparency and high-impact results.' },
  ];

  return (
    <div className="dh2-about-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh2-hero" style={{ minHeight: '80vh', paddingBottom: '4rem' }}>
        <div className="dh2-container">
          <div style={{ maxWidth: '1000px' }}>
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={14} className="dh2-hero-accent" /> ESTABLISHED 2016
              </motion.div>
              
              <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', marginBottom: '2rem' }}>
                <span className="dh2-hero-line">
                  <motion.span custom={0} variants={titleV}>WE ARE THE</motion.span>
                </span>
                <span className="dh2-hero-line">
                  <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">ARCHITECTS OF</motion.span>
                </span>
                <span className="dh2-hero-line">
                  <motion.span custom={2} variants={titleV} className="dh2-hero-accent">DIGITAL GROWTH.</motion.span>
                </span>
              </h1>

              <motion.div variants={fadeUp} style={{ maxWidth: '600px' }}>
                <p className="dh2-body" style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 500, lineHeight: 1.6, marginBottom: '2rem' }}>
                  Avani Enterprises is more than a digital agency. We are a <strong style={{ color: 'var(--accent)' }}>powerhouse of innovation</strong>, engineering high-performance ecosystems for brands that refuse to be ordinary.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <Link to="/dummyhome2/contact" className="dh2-btn-fill">Work With Us <ArrowRight size={16} /></Link>
                  <a href="#who-we-are" className="dh2-btn-ghost">Our Story</a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE - DETAILED OPENING */}
      <section className="dh2-section" id="who-we-are" style={{ paddingTop: '4rem' }}>
        <div className="dh2-container">
          <div className="dh2-split-grid" style={{ gap: '6rem', alignItems: 'start' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="dh2-label">WHO WE ARE</div>
              <h2 className="dh2-display" style={{ fontSize: '2.8rem', marginTop: '1rem', marginBottom: '2rem' }}>
                Engineering Excellence <br/><span style={{ color: 'var(--accent)' }}>Since Day One.</span>
              </h2>
              <p className="dh2-body" style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
                <strong>"We don't just build websites; we build complete digital ecosystems tailored for your long-term success."</strong>
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <p className="dh2-body" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                Since our inception in 2016, Avani Enterprises has been at the forefront of digital transformation. We recognized early on that a simple online presence is no longer enough in an increasingly crowded marketplace.
              </p>
              <p className="dh2-body" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                Our team of <strong style={{ color: 'var(--text-main)' }}>visionary strategists</strong> and <strong style={{ color: 'var(--text-main)' }}>expert developers</strong> work in tandem to create experiences that are not only visually stunning but technically superior. We dive deep into your business DNA to uncover opportunities for radical growth and sustainable scaling.
              </p>
              <p className="dh2-body" style={{ fontSize: '1rem' }}>
                Today, we stand as a global strategic partner, helping brands across continents navigate the complexities of the digital age with <strong style={{ color: 'var(--accent)' }}>unparalleled precision and passion.</strong>
              </p>
            </motion.div>
          </div>

          <motion.div className="dh2-stats-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ borderTop: '1px solid var(--border-s)', paddingTop: '4rem', marginTop: '6rem' }}>
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} style={{ textAlign: 'center' }}>
                <div className="dh2-stat-num" style={{ fontSize: '3.5rem' }}>{s.value}</div>
                <div className="dh2-label" style={{ color: 'var(--accent)', fontWeight: 700 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. DIGITAL ECOSYSTEM */}
      <section className="dh2-section" style={{ padding: '8rem 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="dh2-container">
          <div className="dh2-ecosystem-grid" style={{ alignItems: 'center' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="dh2-label">OUR APPROACH</div>
              <h2 className="dh2-display" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>THE DIGITAL ECOSYSTEM</h2>
              <p className="dh2-body" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                We believe in <strong>connected experiences</strong>. Our ecosystem maps out the journey from branding and development to marketing and continuous scaling, ensuring every touchpoint reinforces your brand's authority.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Omnichannel Integration', 'Data-Driven Optimization', 'Seamless User Journeys', 'Future-Proof Architecture'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-s)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <DH2EcosystemMap />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CEO LEADERSHIP */}
      <section className="dh2-section" style={{ padding: '10rem 0' }}>
        <div className="dh2-container">
          <div className="dh2-split-grid" style={{ gap: '8rem', alignItems: 'center' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-20px', border: '1px solid var(--accent)', borderRadius: '24px', opacity: 0.2, zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden', borderRadius: '20px' }}>
                <img 
                  src="/kapil_khandelwal.jpg" 
                  alt="Kapil Khandelwal" 
                  style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(100%) contrast(1.1)' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-deep) 0%, transparent 50%)' }} />
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div className="dh2-label">THE VISIONARY</div>
              <h2 className="dh2-display" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>KAPIL KHANDELWAL</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2.5rem' }}>CEO & Strategic Founder</div>
              
              <p className="dh2-body" style={{ fontSize: '1.1rem', marginBottom: '2.5rem', color: 'var(--text-main)', lineHeight: 1.8 }}>
                <strong>"Our goal is not just to provide services, but to ignite a transformation that redefine what's possible for your business."</strong>
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
                {[
                  { title: 'Global Strategy Expert', desc: 'Over a decade of experience scaling international brands.' },
                  { title: 'Investment Leader', desc: 'Active mentor and investor in high-potential digital startups.' },
                  { title: 'Thought Leader', desc: 'Author of "The Startup Summary", bridging the gap between vision and execution.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.2rem' }}>
                    <div style={{ color: 'var(--accent)', marginTop: '4px' }}><CheckCircle size={20} /></div>
                    <div>
                      <h4 style={{ fontFamily: "'Syne'", fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-s)' }}>
                {[{ v: '10+', l: 'Years Exp' }, { v: '50+', l: 'Businesses' }, { v: '3', l: 'Investments' }].map((s, i) => (
                  <div key={i}>
                    <div className="dh2-stat-num" style={{ fontSize: '2rem' }}>{s.v}</div>
                    <div className="dh2-label" style={{ fontSize: '0.6rem' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. MISSION & VISION */}
      <section className="dh2-section" style={{ background: 'var(--bg-surface)', borderY: '1px solid var(--border-s)' }}>
        <div className="dh2-container">
          <div className="dh2-split-grid" style={{ gap: '8rem' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                <Target size={32} />
                <h3 className="dh2-display" style={{ fontSize: '2rem' }}>OUR MISSION</h3>
              </div>
              <p className="dh2-body" style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
                To empower global businesses with <strong style={{ color: 'var(--accent)' }}>precision-engineered digital solutions</strong> that bridge the gap between human passion and technological capability.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                <Globe size={32} />
                <h3 className="dh2-display" style={{ fontSize: '2rem' }}>OUR VISION</h3>
              </div>
              <p className="dh2-body" style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
                To be the world's most <strong style={{ color: 'var(--accent)' }}>trusted catalyst for digital transformation</strong>, known for setting impossible standards and delivering beyond them.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CORE VALUES */}
      <section className="dh2-section" style={{ padding: '10rem 0' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh2-label">OUR CORE</div>
            <h2 className="dh2-display" style={{ fontSize: '3.5rem' }}>THE AVANI DNA</h2>
          </motion.div>
          
          <div className="dh2-ind-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {values.map((v, i) => (
              <motion.div key={i} className="dh2-ind" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} style={{ padding: '3rem 2rem' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>{v.icon}</div>
                <h3 className="dh2-heading" style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{v.title}</h3>
                <p className="dh2-body" style={{ fontSize: '0.85rem' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="dh2-cta">
        <div className="dh2-cta-watermark">AVANI</div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="dh2-display dh2-cta-title">
            READY TO JOIN<br /><span>OUR STORY?</span>
          </h2>
          <p className="dh2-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
            Whether you're a brand seeking growth or a talent seeking innovation, let's explore how we can build the future together.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/dummyhome2/contact" className="dh2-btn-fill">Start Project <ArrowRight size={16} /></Link>
            <Link to="/dummyhome2/careers" className="dh2-btn-ghost">Join the Team</Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default DH2About;
