import React from 'react';
import { motion } from 'framer-motion';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2Terms = () => (
  <div className="dh2-page">
    <section className="dh2-section" style={{ paddingTop: '6rem' }}>
      <div className="dh2-container" style={{ maxWidth: 750, margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="dh2-label">LEGAL</div>
          <h1 className="dh2-display" style={{ marginBottom: '2rem' }}>TERMS & <span style={{ color: 'var(--accent)' }}>CONDITIONS</span></h1>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .1 }}
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '3rem' }}>
          <div style={{ fontSize: '.78rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>
            <p style={{ marginBottom: '1.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Last Updated:</strong> January 2025</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>1. Acceptance of Terms</h3>
            <p>By accessing and using our website and services, you agree to be bound by these Terms and Conditions.</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>2. Services</h3>
            <p>Avani Enterprises provides digital marketing, web development, business consulting, and related services. Specific deliverables will be outlined in individual project agreements.</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>3. Intellectual Property</h3>
            <p>All content, designs, and materials created by Avani Enterprises remain our intellectual property until full payment is received and ownership is explicitly transferred.</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>4. Payment Terms</h3>
            <p>Payment terms are as agreed upon in individual project contracts. Late payments may incur additional charges.</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>5. Limitation of Liability</h3>
            <p>Avani Enterprises shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>

            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.8rem', marginTop: '2rem' }}>6. Contact</h3>
            <p>For questions about these terms, contact <a href="mailto:kp@avanienterprises.in" style={{ color: 'var(--accent)' }}>kp@avanienterprises.in</a></p>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default DH2Terms;
