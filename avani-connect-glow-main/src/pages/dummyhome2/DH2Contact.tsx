import React, { useState } from 'react';
import { getBackendUrl } from '../../lib/api';
import { Mail, Phone, MapPin, Send, ChevronDown, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

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

  const inputStyle: React.CSSProperties = { width: '100%', padding: '.7rem 0', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-s)', color: 'var(--text-main)', fontSize: '.78rem', fontWeight: 500, fontFamily: "'Inter', sans-serif", outline: 'none', transition: 'border-color .3s' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '.55rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.3rem' };

  return (
    <div className="dh2-page">
      {/* Hero */}
      <section className="dh2-section" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label">REACH OUT</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>LET'S START A <span style={{ color: 'var(--accent)' }}>PROJECT</span></h1>
            <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>We combine strategic understanding with technical excellence.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="dh2-section" style={{ paddingTop: '2rem' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '2.5rem', alignItems: 'start' }}>
            {/* Left: Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .1 }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem 2rem' }}>
                <div style={{ fontSize: '.55rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '1.5rem' }}>DIRECT SUPPORT</div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.3rem', marginBottom: '.3rem' }}>Get in Touch</h3>
                <p style={{ fontSize: '.65rem', color: 'var(--text-dim)', marginBottom: '2rem' }}>Available 24/7 for you</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                  {[
                    { icon: <Phone size={16} />, label: 'Phone', value: '+91 9253625099', href: 'tel:+919253625099' },
                    { icon: <Mail size={16} />, label: 'Email', value: 'kp@avanienterprises.in', href: 'mailto:kp@avanienterprises.in' },
                  ].map((c, i) => (
                    <a key={i} href={c.href} style={{ display: 'flex', alignItems: 'center', gap: '.8rem', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.04)', border: '1px solid var(--border-s)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize: '.5rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.12em' }}>{c.label}</div>
                        <div style={{ fontSize: '.8rem', fontWeight: 600 }}>{c.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', fontSize: '.6rem', color: 'var(--text-dim)' }}>
                  <div><strong style={{ color: 'var(--text-muted)' }}>Gurgaon:</strong> Unitech Cyber Park, Sector 39</div>
                  <div><strong style={{ color: 'var(--text-muted)' }}>Mumbai:</strong> Vasudev Chamber, Andheri East</div>
                  <div><strong style={{ color: 'var(--text-muted)' }}>Rohtak:</strong> 106, Agro Mall</div>
                  <div><strong style={{ color: 'var(--text-muted)' }}>Australia</strong></div>
                </div>

                <div style={{ display: 'flex', gap: '.5rem', marginTop: '2rem' }}>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="dh2-btn-fill" style={{ flex: 1, textAlign: 'center', fontSize: '.6rem', padding: '.65rem' }}>
                    <MessageSquare size={12} style={{ marginRight: 4 }} /> WhatsApp
                  </a>
                  <a href="tel:+919253625099" className="dh2-btn-ghost" style={{ flex: 1, textAlign: 'center', fontSize: '.6rem', padding: '.65rem' }}>Call Expert</a>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .2 }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem 2rem' }}>
                <div className="dh2-label" style={{ marginBottom: '.3rem' }}>INQUIRY FORM</div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.3rem', marginBottom: '2rem' }}>Send a Proposal</h3>

                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                    <h4 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.1rem', marginBottom: '.5rem' }}>Submitted!</h4>
                    <p style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                      <div><label style={labelStyle}>Full Name *</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Your Name" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Email *</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Email" style={inputStyle} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                      <div><label style={labelStyle}>Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Company</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company" style={inputStyle} /></div>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <label style={labelStyle}>Project Category</label>
                      <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ ...inputStyle, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: formData.service.length ? 'var(--text-main)' : 'var(--text-dim)' }}>{formData.service.length ? `${formData.service.length} selected` : 'Select services'}</span>
                        <ChevronDown size={12} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }} />
                      </button>
                      {isDropdownOpen && (
                        <div style={{ position: 'absolute', zIndex: 50, width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-f)', borderRadius: 10, marginTop: 4, maxHeight: 180, overflowY: 'auto', padding: '.3rem' }}>
                          {services.map(s => (
                            <div key={s} onClick={() => handleServiceToggle(s)} style={{ padding: '.45rem .6rem', fontSize: '.65rem', fontWeight: 500, color: formData.service.includes(s) ? '#fff' : 'var(--text-muted)', cursor: 'pointer', borderRadius: 6, background: formData.service.includes(s) ? 'rgba(200,255,0,.08)' : 'transparent', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                              <input type="checkbox" checked={formData.service.includes(s)} readOnly style={{ accentColor: 'var(--accent)' }} /> {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {formData.service.includes('Other') && (
                      <div><label style={labelStyle}>Specify Other</label><input type="text" name="otherService" value={formData.otherService} onChange={handleInputChange} placeholder="Describe your need" style={inputStyle} /></div>
                    )}
                    <div><label style={labelStyle}>Message *</label><textarea name="message" required value={formData.message} onChange={handleInputChange} rows={3} placeholder="Detail your requirements..." style={{ ...inputStyle, resize: 'none' }} /></div>
                    <button type="submit" disabled={isLoading} className="dh2-btn-fill" style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}>
                      {isLoading ? <div style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin .6s linear infinite' }} /> : <><Send size={12} /> Submit</>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section style={{ height: 350, position: 'relative', margin: '0 2rem', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-s)' }}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3508.1803296113567!2d77.0552583!3d28.4439799!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19493189b131%3A0x36a763d6ab00e2cb!2sAKASA%20Coworking%20Unitech%20Cyber%20Park!5e0!3m2!1sen!2sin!4v1768455888190!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, filter: 'invert(.9) hue-rotate(180deg) grayscale(.3)' }} allowFullScreen loading="lazy" />
      </section>

      {/* FAQ */}
      <section className="dh2-section">
        <div className="dh2-container">
          <motion.div className="dh2-section-header" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="dh2-label">KNOWLEDGE BASE</div>
            <h2 className="dh2-display dh2-section-title">COMMON QUERIES</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 900, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .08 }}
                style={{ background: 'var(--bg-surface)', border: `1px solid ${openFaq === i ? 'var(--accent)' : 'var(--border-s)'}`, borderRadius: 14, transition: 'border-color .3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontFamily: "'Inter'", fontSize: '.78rem', fontWeight: 600, textAlign: 'left' }}>
                  {faq.q}
                  <ChevronDown size={14} style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .3s', color: openFaq === i ? 'var(--accent)' : 'var(--text-dim)' }} />
                </button>
                <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: 'hidden', transition: 'max-height .4s ease' }}>
                  <p style={{ padding: '0 1.2rem 1.2rem', fontSize: '.72rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DH2Contact;
