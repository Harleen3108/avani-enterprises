import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import { getBackendUrl } from '../../lib/api';
import '../../components/dummy/DummyHome.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DHContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleInputChange = (e: any) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const API_BASE = getBackendUrl();
    const payload = { fullName: formData.name, email: formData.email, phoneNu: formData.phone, companyName: formData.company, projectDetails: formData.message };
    try {
      const res = await fetch(`${API_BASE.replace(/\/$/, '')}/avani-form`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) setIsSubmitted(true);
      else alert('Error submitting form. Please try again.');
    } catch { alert('Network error. Please try again.'); } finally { setIsLoading(false); }
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '1.5rem 0', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 500, outline: 'none', transition: 'border-color 0.3s' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' };

  return (
    <div className="dh-contact-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh-hero">
        <div className="dh-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">CONNECT WITH US</motion.div>
            
            <h1 className="dh-display dh-hero-title">
              <span className="dh-hero-line">
                <motion.span custom={0} variants={titleV}>LET'S START</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} className="dh-hero-stroked">SOMETHING</motion.span>
              </span>
              <span className="dh-hero-line">
                <motion.span custom={2} variants={titleV} className="dh-hero-accent">EXTRAORDINARY.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
              We're ready to architect your next digital success story. Reach out for strategic <strong style={{ color: 'var(--accent-primary)' }}>consultation and technical oversight.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT SPLIT */}
      <section className="dh-section" style={{ paddingTop: 0 }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '8rem' }} className="dh-responsive-grid">
            
            {/* Left: Intel */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="dh-label" style={{ marginBottom: '3rem' }}>CHANNELS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {[
                  { icon: <Mail size={24} />, title: 'Electronic Mail', val: 'kp@avanienterprises.in', sub: 'For detailed proposals and RFP' },
                  { icon: <Phone size={24} />, title: 'Direct Transmission', val: '+91 9253625099', sub: 'Available for immediate consultation' },
                  { icon: <Globe size={24} />, title: 'Global Presence', val: 'Gurgaon · Rohtak · Mumbai', sub: 'Strategic hubs across India' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ color: 'var(--accent-primary)', marginTop: '4px' }}>{item.icon}</div>
                    <div>
                      <h4 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{item.val}</p>
                      <p className="dh-body" style={{ fontSize: '0.85rem' }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '8rem', padding: '3rem', border: '1px solid var(--border-light)', borderRadius: '24px', background: 'var(--bg-secondary)' }}>
                <h4 className="dh-heading" style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>WHATSAPP HOTLINE</h4>
                <p className="dh-body" style={{ marginBottom: '2rem' }}>Connect with our lead strategists instantly for rapid inquiries.</p>
                <a href="https://wa.me/919253625099" target="_blank" rel="noreferrer" className="dh-btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  <MessageSquare size={18} /> OPEN CHAT
                </a>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '40px', padding: '4rem' }}>
                <div className="dh-label">INQUIRY FORM</div>
                <h2 className="dh-display" style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>PROJECT BRIEF</h2>
                
                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-hover)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem' }}>
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="dh-heading" style={{ fontSize: '2rem', marginBottom: '1rem' }}>TRANSMISSION RECEIVED</h3>
                    <p className="dh-body">Our team will review your project details and contact you within 24 standard business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="dh-responsive-grid">
                      <div><label style={labelStyle}>Full Name</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Work Email</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@company.com" style={inputStyle} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="dh-responsive-grid">
                      <div><label style={labelStyle}>Phone Number</label><input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 00000 00000" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Company / Organization</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Acme Corp" style={inputStyle} /></div>
                    </div>
                    <div>
                      <label style={labelStyle}>Project Vision</label>
                      <textarea name="message" required value={formData.message} onChange={handleInputChange} placeholder="Tell us about your objectives..." rows={4} style={{ ...inputStyle, resize: 'none' }} />
                    </div>
                    <button type="submit" disabled={isLoading} className="dh-btn-fill" style={{ width: '100%', justifyContent: 'center', height: '70px' }}>
                      {isLoading ? 'INITIATING...' : <><Send size={18} /> SEND PROPOSAL</>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="dh-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="dh-container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="dh-label">CLARIFICATIONS</div>
            <h2 className="dh-display" style={{ fontSize: '3.5rem' }}>COMMONLY ASKED</h2>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { q: 'What is your typical engagement timeline?', a: 'Standard enterprise projects range from 8 to 16 weeks depending on complexity. We provide a detailed architectural blueprint before kickoff.' },
              { q: 'Do you offer post-launch support?', a: 'Yes, we provide 24/7 technical oversight and maintenance packages to ensure continuous performance and security.' },
              { q: 'How do you handle data security?', a: 'We implement industry-standard encryption and security protocols in every digital solution we architect.' }
            ].map((faq, i) => (
              <motion.div key={i} className="dh-card" style={{ padding: '2.5rem', cursor: 'pointer', borderColor: openFaq === i ? 'var(--accent-primary)' : 'var(--border-faint)' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="dh-heading" style={{ fontSize: '1.2rem' }}>{faq.q}</h4>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s', color: 'var(--accent-primary)' }} />
                </div>
                <div style={{ maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'all 0.5s var(--ease-out)' }}>
                  <p className="dh-body" style={{ marginTop: '2rem' }}>{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHContact;
