import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowRight, ChevronDown, CheckCircle, ChevronUp } from 'lucide-react';
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

const services = [
  "Web & App Development",
  "SEO and Content Marketing",
  "Social Media Marketing",
  "AI Solutions",
  "Podcast Production",
  "Financial Consulting",
  "Business Consultation",
  "Business Loans",
  "Business Insurance",
  "Other"
];

const locations = [
  { 
    city: 'GURGAON', 
    office: 'Headquarters',
    address: 'Tower B, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, Haryana 122002',
    phone: '+91 9253625099'
  },
  { 
    city: 'MUMBAI', 
    office: 'Operations Center',
    address: 'Third Floor, Vasudev Chamber, Teli Galli Cross Rd, Natwar Nagar, Andheri East, Mumbai, Maharashtra 400069',
    phone: '+91 9253625099'
  },
  { 
    city: 'ROHTAK', 
    office: 'Innovation Hub',
    address: '106, First Floor, Agro Mall, Rohtak, Haryana',
    phone: '+91 9253625099'
  },
  { 
    city: 'AUSTRALIA', 
    office: 'Global Outreach',
    address: 'Strategic Liaison, Australia',
    phone: '+91 9253625099'
  }
];

const DHContact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    service: [] as string[],
    message: '',
    otherService: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: any) => { 
    const { name, value } = e.target; 
    setFormData(prev => ({ ...prev, [name]: value })); 
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const services = prev.service.includes(service)
        ? prev.service.filter(s => s !== service)
        : [...prev.service, service];
      return { ...prev, service: services };
    });
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const API_BASE = getBackendUrl();
    const payload = { 
      fullName: formData.name, 
      email: formData.email, 
      phoneNu: formData.phone, 
      service: formData.service.join(', '),
      companyName: formData.company, 
      projectDetails: formData.message,
      otherService: formData.otherService
    };
    
    try {
      const res = await fetch(`${API_BASE.replace(/\/$/, '')}/avani-form`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      if (res.ok) setIsSubmitted(true);
      else alert('Error submitting form. Please try again.');
    } catch { 
      alert('Network error. Please try again.'); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '1.2rem 0', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500, outline: 'none', transition: 'border-color 0.3s' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.2rem' };

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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {[
                  { icon: <Mail size={24} />, title: 'Electronic Mail', val: 'kp@avanienterprises.in', sub: 'For detailed proposals and RFP' },
                  { icon: <Phone size={24} />, title: 'Direct Transmission', val: '+91 9253625099', sub: 'Available for immediate consultation' },
                  { icon: <MessageSquare size={24} />, title: 'WhatsApp Hotline', val: '+91 9253625099', sub: 'Instant connection with lead strategists' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ color: 'var(--accent-primary)', marginTop: '4px' }}>{item.icon}</div>
                    <div>
                      <h4 className="dh-heading" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{item.val}</p>
                      <p className="dh-body" style={{ fontSize: '0.8rem' }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '5rem' }}>
                <div className="dh-label" style={{ marginBottom: '2rem' }}>GLOBAL NODES</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="dh-responsive-grid">
                  {locations.map((loc, i) => (
                    <div key={i}>
                      <h4 className="dh-heading" style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>{loc.city}</h4>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>{loc.office.toUpperCase()}</div>
                      <p className="dh-body" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{loc.address}</p>
                    </div>
                  ))}
                </div>
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
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="dh-responsive-grid">
                      <div><label style={labelStyle}>Full Name</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Work Email</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@company.com" style={inputStyle} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="dh-responsive-grid">
                      <div><label style={labelStyle}>Phone Number</label><input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 00000 00000" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Company Name</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Acme Corp" style={inputStyle} /></div>
                    </div>
                    
                    <div>
                      <label style={labelStyle}>Project Category</label>
                      <div style={{ position: 'relative' }}>
                        <div 
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          style={{ ...inputStyle, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}
                        >
                          <span style={{ opacity: formData.service.length === 0 ? 0.4 : 1 }}>
                            {formData.service.length === 0 ? "Select Services" : `${formData.service.length} Selected`}
                          </span>
                          <ChevronUp size={16} style={{ transform: isDropdownOpen ? 'none' : 'rotate(180deg)', transition: 'transform 0.3s', color: 'var(--accent-primary)' }} />
                        </div>
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              style={{ position: 'absolute', zIndex: 10, top: '100%', left: 0, width: '100%', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px solid var(--border-faint)', marginTop: '0.5rem', maxHeight: '250px', overflowY: 'auto', padding: '1rem' }}
                            >
                              {services.map(s => (
                                <div key={s} onClick={() => handleServiceToggle(s)} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', cursor: 'pointer', borderBottom: '1px solid var(--border-faint)' }}>
                                  <div style={{ width: '16px', height: '16px', border: '1px solid var(--accent-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: formData.service.includes(s) ? 'var(--accent-primary)' : 'transparent' }}>
                                    {formData.service.includes(s) && <CheckCircle size={12} color="#000" />}
                                  </div>
                                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{s}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {formData.service.includes("Other") && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                        <label style={labelStyle}>Specify Other Service</label>
                        <input type="text" name="otherService" value={formData.otherService} onChange={handleInputChange} placeholder="E.g. Branding, UI/UX Audit" style={inputStyle} />
                      </motion.div>
                    )}

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

      {/* 3. IMMERSIVE MAP */}
      <section style={{ height: '500px', width: '100%', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)', filter: 'grayscale(1) contrast(1.1) invert(0.9) opacity(0.8)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3508.1803296113567!2d77.0552583!3d28.4439799!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19493189b131%3A0x36a763d6ab00e2cb!2sAKASA%20Coworking%20Unitech%20Cyber%20Park!5e0!3m2!1sen!2sin!4v1768455888190!5m2!1sen!2sin"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* 4. FAQ SECTION */}
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
              { q: 'What makes Avani Enterprises different?', a: 'We combine IIT/IIM grade strategic oversight with high-performance technical engineering. Our focus is on long-term scalability and distinct digital identity.' },
              { q: 'How do you handle data security?', a: 'We implement industry-standard encryption and high-security protocols in every digital solution we architect.' }
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
