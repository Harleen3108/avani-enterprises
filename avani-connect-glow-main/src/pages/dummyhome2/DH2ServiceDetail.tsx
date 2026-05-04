import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();

  // In a real app, you'd fetch data based on the ID. Using generic data for the redesign.
  const serviceTitle = id ? id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Our Service';

  return (
    <div className="dh2-page">
      {/* Hero */}
      <section className="dh2-section" style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-surface)' }}>
        <div className="dh2-container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label" style={{ marginBottom: '1rem' }}>SERVICE DETAIL</div>
            <h1 className="dh2-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              {serviceTitle}
            </h1>
            <p className="dh2-body" style={{ fontSize: '1.1rem', margin: '0 auto', opacity: 0.8 }}>
              We transform ambitious visions into high-performing digital realities. Discover how our specialized solutions can accelerate your growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="dh2-section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ overflow: 'hidden', borderRadius: '24px', border: '1px solid var(--border-s)' }}>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop" alt={serviceTitle} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', opacity: 0.8, filter: 'grayscale(0.2)' }} />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="dh2-heading" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Overview</h2>
              <p className="dh2-body" style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
                Our {serviceTitle.toLowerCase()} services are designed to give you a competitive edge. We employ the latest strategies and technologies to ensure your project is built for the future. From the initial strategic phase through to execution and beyond, we focus on delivering tangible results.
              </p>
              <p className="dh2-body" style={{ marginBottom: '2.5rem', lineHeight: 1.8 }}>
                We believe in a data-driven approach, combining creative thinking with analytical rigor. This ensures that every decision we make is backed by insight, resulting in a product that not only looks great but performs exceptionally well in the market.
              </p>

              <h2 className="dh2-heading" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>What's Included</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                {['Strategic Planning', 'Custom Development', 'Performance Optimization', 'Ongoing Support'].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--bg-surface)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-s)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: '3rem', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-s)', textAlign: 'center' }}>
                <h3 className="dh2-heading" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Ready to Elevate Your Business?</h3>
                <p className="dh2-body" style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>Let's discuss how we can tailor our services to meet your specific goals.</p>
                <Link to="/dummyhome2/get-consultation" className="dh2-btn-fill" style={{ display: 'inline-flex' }}>
                  Get a Free Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DH2ServiceDetail;
