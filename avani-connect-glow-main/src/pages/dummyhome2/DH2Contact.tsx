import React, { useState } from 'react';
import { getBackendUrl } from '../../lib/api';
import { Mail, Phone, MapPin, Send, ChevronDown, MessageSquare, Zap, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../components/dummyhome2/DummyHome2.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DH2Contact = () => {
  const whatsappNumber = '919253625099';
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', service: [] as string[], message: '', otherService: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleInputChange = (e: any) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const services = prev.service.includes(service) ? prev.service.filter(s => s !== service) : [...prev.service, service];
      return { ...prev, service: services };
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const API_BASE = getBackendUrl();
    setIsLoading(true);
    const payload = { fullName: formData.name, email: formData.email, phoneNu: formData.phone, service: formData.service.join(', '), companyName: formData.company, projectDetails: formData.message, otherService: formData.otherService };
    (async () => {
      try {
        const res = await fetch(`${API_BASE.replace(/\/$/, '')}/avani-form`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) { alert('Unable to submit. Please try again.'); return; }
        setIsSubmitted(true);
      } catch { alert('Error submitting form.'); } finally { setIsLoading(false); }
    })();
  };

  const services = ['Web & App Development', 'SEO and Content Marketing', 'Social Media Marketing', 'AI Solutions', 'Podcast Production', 'Financial Consulting', 'Business Consultation', 'Business Loans', 'Business Insurance', 'Other'];
  const faqs = [
    { q: 'What is your typical project timeline?', a: 'Project timelines vary. Web development typically takes 4-12 weeks. We provide a detailed timeline during initial consultation.' },
    { q: 'Do you provide ongoing support?', a: 'Yes, we offer support and maintenance packages to ensure your digital assets continue performing optimally.' },
    { q: 'What makes Avani different?', a: 'We combine technical expertise with strategic business understanding, focusing on measurable ROI and long-term partnerships.' },
    { q: 'How do you measure campaign success?', a: 'We establish clear KPIs including traffic growth, conversion rates, lead generation, and ROI with regular reporting.' },
  ];

  const inputStyle: React.CSSProperties = { width: '100%', padding: '1rem 0', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-s)', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500, fontFamily: "'Inter', sans-serif", outline: 'none', transition: 'border-color 0.3s' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' };

  return (
    <div className="dh2-contact-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh2-hero" style={{ minHeight: '60vh' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={14} className="dh2-hero-accent" /> GLOBAL REACH
            </motion.div>
            
            <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: '2rem' }}>
              <span className="dh2-hero-line">
                <motion.span custom={0} variants={titleV}>LET'S START</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">SOMETHING</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={2} variants={titleV} className="dh2-hero-accent">LEGENDARY.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh2-body" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              Whether you're scaling a startup or redefining an enterprise, <strong style={{ color: 'var(--accent)' }}>we're ready to architect your success.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN CONTENT - SPLIT LAYOUT */}
      <section className="dh2-section" style={{ paddingTop: 0 }}>
        <div className="dh2-container">
          <div className="dh2-split-grid" style={{ gap: '8rem', alignItems: 'start' }}>
            
            {/* Left: Information */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="dh2-label" style={{ marginBottom: '2.5rem' }}>CONTACT CHANNELS</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {[
                  { icon: <Phone size={24} />, title: 'Voice / WhatsApp', value: '+91 9253625099', sub: 'Instant connection for rapid results', link: 'tel:+919253625099' },
                  { icon: <Mail size={24} />, title: 'Electronic Mail', value: 'kp@avanienterprises.in', sub: 'Send your detailed RFP or proposals', link: 'mailto:kp@avanienterprises.in' },
                ].map((item, i) => (
                  <a key={i} href={item.link} style={{ display: 'flex', gap: '1.5rem', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ color: 'var(--accent)', marginTop: '4px' }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: "'Syne'", fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.2rem' }}>{item.value}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{item.sub}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: '6rem', padding: '3rem', background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '24px' }}>
                <div className="dh2-label" style={{ marginBottom: '1.5rem' }}>LOCATIONS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {[
                    { city: 'Gurgaon', addr: 'Unitech Cyber Park, Sector 39' },
                    { city: 'Mumbai', addr: 'Vasudev Chamber, Andheri East' },
                    { city: 'Australia', addr: 'Global Operations' }
                  ].map((loc, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>{loc.city}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{loc.addr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Modern Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '32px', padding: '4rem' }}>
                <div className="dh2-label" style={{ marginBottom: '0.5rem' }}>GET IN TOUCH</div>
                <h3 className="dh2-display" style={{ fontSize: '2rem', marginBottom: '3rem' }}>PROJECT INQUIRY</h3>

                {isSubmitted ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid var(--accent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                      <CheckCircle size={32} />
                    </div>
                    <h4 className="dh2-display" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Message Sent</h4>
                    <p className="dh2-body">Our strategists will review your project details and contact you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                      <div><label style={labelStyle}>Full Name</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="E.g. John Doe" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border-s)'} /></div>
                      <div><label style={labelStyle}>Email Address</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="E.g. john@example.com" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border-s)'} /></div>
                    </div>

                    <div>
                      <label style={labelStyle}>Selected Services</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1rem' }}>
                        {services.map(s => (
                          <button 
                            key={s} 
                            type="button" 
                            onClick={() => handleServiceToggle(s)}
                            style={{ 
                              padding: '0.6rem 1.2rem', 
                              borderRadius: '100px', 
                              fontSize: '0.75rem', 
                              fontWeight: 600, 
                              border: '1px solid',
                              borderColor: formData.service.includes(s) ? 'var(--accent)' : 'var(--border-s)',
                              background: formData.service.includes(s) ? 'var(--accent-soft)' : 'transparent',
                              color: formData.service.includes(s) ? 'var(--accent)' : 'var(--text-muted)',
                              transition: 'all 0.3s',
                              cursor: 'pointer'
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div><label style={labelStyle}>Project Vision</label><textarea name="message" required value={formData.message} onChange={handleInputChange} rows={4} placeholder="Briefly describe what you're looking to build..." style={{ ...inputStyle, resize: 'none' }} onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border-s)'} /></div>

                    <button type="submit" disabled={isLoading} className="dh2-btn-fill" style={{ width: '100%', justifyContent: 'center', height: '60px', marginTop: '1rem' }}>
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
      <section className="dh2-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="dh2-label">KNOWLEDGE BASE</div>
            <h2 className="dh2-display" style={{ fontSize: '3rem' }}>COMMON QUERIES</h2>
          </motion.div>

          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqs.map((faq, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <div 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ 
                    padding: '2rem', 
                    background: 'var(--bg-base)', 
                    borderRadius: '20px', 
                    border: '1px solid',
                    borderColor: openFaq === i ? 'var(--accent)' : 'var(--border-s)',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="dh2-heading" style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{faq.q}</h4>
                    <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: openFaq === i ? 'var(--accent)' : 'var(--text-dim)' }} />
                  </div>
                  <div style={{ maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'all 0.4s var(--ease-out)' }}>
                    <p className="dh2-body" style={{ marginTop: '1.5rem', fontSize: '0.95rem' }}>{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAP SECTION (MINIMAL) */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ height: '400px', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border-s)', position: 'relative' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3508.1803296113567!2d77.0552583!3d28.4439799!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19493189b131%3A0x36a763d6ab00e2cb!2sAKASA%20Coworking%20Unitech%20Cyber%20Park!5e0!3m2!1sen!2sin!4v1768455888190!5m2!1sen!2sin" 
            width="100%" height="100%" style={{ border: 0, filter: 'invert(0.9) grayscale(1) contrast(1.2)' }} allowFullScreen loading="lazy" 
          />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' }} />
        </div>
      </section>

    </div>
  );
};

export default DH2Contact;
