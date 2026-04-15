import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a typical website project take?',
    a: 'Most website projects take 4–8 weeks from kickoff to launch, depending on complexity. E-commerce platforms and custom web applications may take 8–12 weeks. We follow an agile process with regular check-ins so you\'re always in the loop.',
  },
  {
    q: 'What\'s included in your web development packages?',
    a: 'Our packages include UI/UX design, responsive development, SEO optimization, performance tuning, CMS integration, and 3 months of post-launch support. We also handle domain setup, hosting configuration, and SSL certificates.',
  },
  {
    q: 'Do you work with startups or only established businesses?',
    a: 'We work with businesses at every stage — from pre-seed startups to established enterprises. We have flexible engagement models and pricing tiers designed to match where you are in your business journey.',
  },
  {
    q: 'Can you help improve our existing website\'s performance?',
    a: 'Absolutely. We offer performance audits, SEO overhauls, redesigns, and migration services. Many of our clients come to us with existing sites that need a refresh — we\'ll assess what needs improvement and build a clear action plan.',
  },
  {
    q: 'What technologies do you specialize in?',
    a: 'Our core stack includes React, Next.js, Node.js, Python, and various cloud platforms (AWS, GCP). For mobile, we use React Native and Flutter. We also specialize in AI/ML integrations, WhatsApp automation, and custom CRM development.',
  },
  {
    q: 'How do you handle project communication and updates?',
    a: 'Every project gets a dedicated project manager, a shared Slack/WhatsApp channel, and weekly progress reports with demo links. We believe in radical transparency — you\'ll never be left wondering about the status of your project.',
  },
  {
    q: 'What are your payment terms?',
    a: 'We typically work with a 40% upfront deposit, 30% at the midpoint milestone, and 30% on delivery. For ongoing retainers, we bill monthly. All payments are secured via Razorpay with proper invoicing and GST compliance.',
  },
];

const DummyFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-faq-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>QUESTIONS</span>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
          </div>
          <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
            FREQUENTLY <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>ASKED</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '20px 24px',
                    background: isOpen ? 'var(--accent-hover)' : 'var(--card-bg)',
                    border: `1px solid ${isOpen ? 'var(--accent-primary)' : 'var(--border-faint)'}`,
                    borderRadius: isOpen ? '14px 14px 0 0' : '14px',
                    cursor: 'pointer', transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                  }}
                >
                  <span style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '15px', fontWeight: 600, color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
                    letterSpacing: '0.02em', transition: 'color 0.3s', lineHeight: 1.3,
                  }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                    background: isOpen ? 'var(--accent-hover)' : 'var(--bg-tertiary)',
                    border: `1px solid ${isOpen ? 'var(--accent-primary)' : 'var(--border-light)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}>
                    {isOpen ? <Minus size={14} color="var(--accent-primary)" /> : <Plus size={14} color="var(--accent-primary)" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '16px 24px 20px',
                        background: 'var(--accent-hover)',
                        border: '1px solid var(--accent-primary)',
                        borderTop: 'none',
                        borderRadius: '0 0 14px 14px',
                      }}>
                        <p style={{
                          fontFamily: "'Satoshi', sans-serif",
                          fontSize: '14px', color: 'var(--text-secondary)',
                          lineHeight: 1.7, fontWeight: 400,
                        }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .dummy-faq-container { padding: 0 24px !important; } }
      `}</style>
    </section>
  );
};

export default DummyFAQ;
