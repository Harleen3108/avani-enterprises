import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

interface DH2ProjectTemplateProps {
  title: string;
  logo: string;
  videoSrc: string;
  posterSrc: string;
  subtitle: string;
  overviewText: string[];
  overviewImage: string;
  features: string[];
  backLink?: string;
  backLabel?: string;
}

const DH2ProjectTemplate: React.FC<DH2ProjectTemplateProps> = ({
  title,
  logo,
  videoSrc,
  posterSrc,
  subtitle,
  overviewText,
  overviewImage,
  features,
  backLink = '/dummyhome2/our-products',
  backLabel = 'Back to Products'
}) => {
  return (
    <div className="dh2-page">
      {/* Hero Section */}
      <section className="dh2-section" style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link to={backLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 700, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ArrowLeft size={14} /> {backLabel}
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img src={logo} alt={`${title} Logo`} style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#fff', borderRadius: '12px', padding: '8px' }} />
                <div className="dh2-label">PROJECT SHOWCASE</div>
              </div>
              <h1 className="dh2-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, marginBottom: '1.5rem', textTransform: 'none' }}>
                {title}
              </h1>
              <p className="dh2-body" style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px' }}>
                {subtitle}
              </p>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-s)', position: 'relative', aspectRatio: '16/9' }}>
                <video src={videoSrc} autoPlay muted loop playsInline poster={posterSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="dh2-section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="dh2-heading" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Project Overview</h2>
              {overviewText.map((text, idx) => (
                <p key={idx} className="dh2-body" style={{ marginBottom: idx === overviewText.length - 1 ? 0 : '1.5rem' }}>
                  {text}
                </p>
              ))}
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-s)', background: 'var(--bg-surface)', padding: '1rem' }}>
                <img src={overviewImage} alt={`${title} Overview`} style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="dh2-section" style={{ paddingTop: '5rem', paddingBottom: '6rem', background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="dh2-label">CAPABILITIES</div>
            <h2 className="dh2-heading" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Key Features</h2>
            <p className="dh2-body" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>Comprehensive functionality designed to meet all your business needs.</p>
          </motion.div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.1 }}>
              <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: '24px', padding: '3rem' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
                  {features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
                      <CheckCircle2 size={24} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                      {/* Using dangerouslySetInnerHTML to allow strong tags from original texts */}
                      <span className="dh2-body" style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0 }} dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DH2ProjectTemplate;
