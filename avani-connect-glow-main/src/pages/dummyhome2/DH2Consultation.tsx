import React, { useState } from 'react';
import { getBackendUrl } from '../../lib/api';
import { Send, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2Consultation = () => {
  const whatsappNumber = '919253625099';
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', service: [] as string[], message: '', otherService: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: any) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleServiceToggle = (s: string) => setFormData(prev => ({ ...prev, service: prev.service.includes(s) ? prev.service.filter(x => x !== s) : [...prev.service, s] }));
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const API_BASE = getBackendUrl();
      const res = await fetch(`${API_BASE.replace(/\/$/, '')}/avani-form`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName: formData.name, email: formData.email, phoneNu: formData.phone, service: formData.service.join(', '), companyName: formData.company, projectDetails: formData.message, otherService: formData.otherService }) });
      if (res.ok) setIsSubmitted(true); else alert('Unable to submit. Try again.');
    } catch { alert('Error submitting form.'); } finally { setIsLoading(false); }
  };

  const services = ['Web & App Development', 'SEO and Content Marketing', 'Social Media Marketing', 'AI Solutions', 'Podcast Production', 'Financial Consulting', 'Business Consultation', 'Business Loans', 'Business Insurance', 'Other'];
  const inputStyle: React.CSSProperties = { width: '100%', padding: '.75rem 0', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-s)', color: 'var(--text-main)', fontSize: '.8rem', fontFamily: "'Inter'", outline: 'none' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '.55rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.3rem' };

  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '6rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label">EXPERT GUIDANCE FOR YOUR BUSINESS</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>BOOK YOUR <span style={{ color: 'var(--accent)' }}>CONSULTATION</span></h1>
            <p className="dh2-body" style={{ maxWidth: 650, margin: '0 auto', fontSize: '.85rem' }}>Unlock business growth with a 1:1 session with our senior consultants. Get strategic guidance tailored for your business needs and goals.</p>
          </motion.div>
        </div>
      </section>

      <section className="dh2-section" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
        <div className="dh2-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '3rem', alignItems: 'flex-start' }}>
            
            {/* Left Column: Info & Perks */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2rem' }}>
                <div className="dh2-label" style={{ marginBottom: '.3rem' }}>EXPERT SUPPORT</div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.3rem', marginBottom: '2rem' }}>Get in Touch</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <a href="tel:+919253625099" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ width: 36, height: 36, background: 'var(--bg-base)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', border: '1px solid var(--border-s)' }}><Phone size={14} /></div>
                    <div>
                      <div style={{ fontSize: '.6rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Phone</div>
                      <div style={{ fontSize: '.9rem', fontWeight: 600, color: '#fff' }}>+91 9253625099</div>
                    </div>
                  </a>

                  <a href="mailto:kp@avanienterprises.in" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ width: 36, height: 36, background: 'var(--bg-base)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', border: '1px solid var(--border-s)' }}><Mail size={14} /></div>
                    <div>
                      <div style={{ fontSize: '.6rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Email</div>
                      <div style={{ fontSize: '.9rem', fontWeight: 600, color: '#fff' }}>kp@avanienterprises.in</div>
                    </div>
                  </a>

                  <a href="https://maps.app.goo.gl/h4wX8BCPpE3BCsg56?g_st=ipc" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ width: 36, height: 36, background: 'var(--bg-base)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', border: '1px solid var(--border-s)', flexShrink: 0 }}><MapPin size={14} /></div>
                    <div>
                      <div style={{ fontSize: '.6rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2 }}>Office</div>
                      <div style={{ fontSize: '.75rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>Tower B, 3rd Floor, Unitech Cyber Park, <br />Sector 39, Gurugram, Haryana 122002</div>
                    </div>
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '.5rem', marginTop: '2rem' }}>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '.8rem', background: 'var(--accent)', border: 'none', color: '#000', borderRadius: 8, fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', textAlign: 'center', textDecoration: 'none' }}>WhatsApp</a>
                  <Link to="/dummyhome2/contact" style={{ flex: 1, padding: '.8rem', background: 'transparent', border: '1px solid var(--border-f)', color: '#fff', borderRadius: 8, fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', textAlign: 'center', textDecoration: 'none' }}>Contact</Link>
                </div>
              </div>

              <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2rem' }}>
                <h4 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>What You Get</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                  {['60-Min Strategy Session', '1:1 Expert Consultation', 'Custom Growth Roadmap', 'Actionable Insights'].map((text, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', fontSize: '.75rem', fontWeight: 600, color: 'var(--text-dim)' }}>
                      <div style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%' }} /> {text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .2 }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem 2rem' }}>
                <div className="dh2-label" style={{ marginBottom: '.3rem' }}>BOOKING FORM</div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.3rem', marginBottom: '2rem' }}>Reserve Your Slot</h3>
                
                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
                    <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.3rem', marginBottom: '.5rem' }}>Consultation Booked!</h3>
                    <p style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>Our team will reach out within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.3rem' }}>
                      <div><label style={labelStyle}>Full Name *</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Your Name" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Email *</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Email" style={inputStyle} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.3rem' }}>
                      <div><label style={labelStyle}>Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Company</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company" style={inputStyle} /></div>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <label style={labelStyle}>Service Interest</label>
                      <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ ...inputStyle, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: formData.service.length ? 'var(--text-main)' : 'var(--text-dim)' }}>{formData.service.length ? `${formData.service.length} selected` : 'Select'}</span>
                        <ChevronDown size={12} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: '.3s' }} />
                      </button>
                      {isDropdownOpen && (
                        <div style={{ position: 'absolute', zIndex: 50, width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-f)', borderRadius: 10, marginTop: 4, maxHeight: 200, overflowY: 'auto', padding: '.3rem' }}>
                          {services.map(s => (
                            <div key={s} onClick={() => handleServiceToggle(s)} style={{ padding: '.45rem .6rem', fontSize: '.65rem', color: formData.service.includes(s) ? '#fff' : 'var(--text-muted)', cursor: 'pointer', borderRadius: 6, background: formData.service.includes(s) ? 'rgba(200,255,0,.08)' : 'transparent', display: 'flex', gap: '.4rem', alignItems: 'center' }}>
                              <input type="checkbox" checked={formData.service.includes(s)} readOnly style={{ accentColor: 'var(--accent)' }} /> {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {formData.service.includes('Other') && <div><label style={labelStyle}>Specify</label><input type="text" name="otherService" value={formData.otherService} onChange={handleInputChange} style={inputStyle} /></div>}
                    <div><label style={labelStyle}>Message *</label><textarea name="message" required value={formData.message} onChange={handleInputChange} rows={3} placeholder="Tell us about your project..." style={{ ...inputStyle, resize: 'none' }} /></div>
                    <button type="submit" disabled={isLoading} className="dh2-btn-fill" style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}>
                      {isLoading ? <div style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin .6s linear infinite' }} /> : <><Send size={12} /> Book Consultation</>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DH2Consultation;
