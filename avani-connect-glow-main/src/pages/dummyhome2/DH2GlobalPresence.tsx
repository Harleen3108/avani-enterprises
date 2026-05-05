import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, ArrowUpRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const officeDetails = [
  {
    city: 'Rohtak',
    country: 'India',
    label: 'Corporate Headquarters',
    description: 'Our flagship innovation center where strategy meets execution. As our founding hub, Rohtak continues to drive our core values across the nation.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    tagline: 'The Heart of Innovation',
    contact: {
       address: '106, First Floor, Agro Mall, Rohtak',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
    }
  },
  {
    city: 'Gurgaon',
    country: 'India',
    label: 'Strategic NCR Hub',
    description: 'Located in the steel-and-glass heart of Cyber City, our Gurgaon office bridges the gap between digital vision and enterprise reality.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Enterprise Connectivity',
    contact: {
       address: 'Tower B, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, 122002',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
    }
  },
  {
    city: 'Mumbai',
    country: 'India',
    label: 'Western India Operations',
    description: 'In the financial capital of India, we empower businesses with cutting-edge tech solutions that drive real commercial growth.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Scale & Growth Center',
    contact: {
       address: 'Third Floor, Vasudev Chamber, 4RFX+QJ3, Teli Galli Cross Rd, Mogra Village, Mogra Pada, Natwar Nagar, Andheri East, Mumbai, Maharashtra 400069',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
    }
  },
  {
    city: 'Australia',
    country: 'Australia',
    label: 'APAC Regional Office',
    description: 'Extending our reach across the Pacific, our Australian presence ensures global support and local expertise for our international partners.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Global Outreach',
    contact: {
       address: 'Australia',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
    }
  },
];

const DH2GlobalPresence = () => {
  return (
    <div className="dh2-page" style={{ paddingBottom: '4rem' }}>
      <Helmet>
        <title>Global Presence | High-Tech Network | Avani Enterprises</title>
        <meta name="description" content="Discover Avani Enterprises' premium global network. From our Rohtak HQ to our Australia regional office, we serve clients with excellence." />
      </Helmet>

      {/* High-Impact Hero Section */}
      <section className="dh2-section" style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '2rem' }}>
              <Globe size={14} style={{ color: 'var(--accent)' }} />
              <span className="dh2-label" style={{ margin: 0 }}>Worldwide Operations</span>
            </div>
            
            <h1 className="dh2-display" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '2rem' }}>
              Global <br />
              <span style={{ color: 'var(--accent)' }}>Connectivity</span>
            </h1>
            
            <p className="dh2-body" style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
              Delivering premium, high-tech networking solutions from our headquarters in Rohtak to our international hubs. We bridge continents with digital excellence and innovative enterprise strategies.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
               <div style={{ textAlign: 'center' }}>
                  <div className="dh2-display" style={{ fontSize: '2.5rem', textTransform: 'none' }}>04</div>
                  <div className="dh2-label">Major Hubs</div>
               </div>
               <div style={{ width: '1px', background: 'var(--border-s)' }} />
               <div style={{ textAlign: 'center' }}>
                  <div className="dh2-display" style={{ fontSize: '2.5rem', textTransform: 'none' }}>02</div>
                  <div className="dh2-label">Continents</div>
               </div>
               <div style={{ width: '1px', background: 'var(--border-s)' }} />
               <div style={{ textAlign: 'center' }}>
                  <div className="dh2-display" style={{ fontSize: '2.5rem', textTransform: 'none' }}>∞</div>
                  <div className="dh2-label">Digital Reach</div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAP */}
      <section className="dh2-section theme-light" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-s)', position: 'relative', height: '60vh' }}>
              <img src="/global2.png" alt="Global Network" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-deep), transparent)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="dh2-section theme-light" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="dh2-container">
           <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="dh2-heading" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Office Collection</h2>
              <p className="dh2-label" style={{ color: 'var(--accent)' }}>Detailed Network Overview</p>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
              {officeDetails.map((office, index) => (
                 <motion.div key={office.city} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: (index % 2) * 0.1 }} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-s)', aspectRatio: '16/10', marginBottom: '2rem' }}>
                       <img src={office.image} alt={office.city} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                       
                       <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Target size={14} style={{ color: 'var(--accent)' }} />
                          <span className="dh2-label" style={{ margin: 0, color: '#fff' }}>{office.tagline}</span>
                       </div>

                       <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }}>
                           <Link to="/dummyhome2/contact" style={{ width: '40px', height: '40px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', textDecoration: 'none' }}>
                              <ArrowUpRight size={20} />
                           </Link>
                       </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                           <div style={{ width: '48px', height: '48px', background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <MapPin size={24} style={{ color: 'var(--accent)' }} />
                           </div>
                           <div>
                              <h3 className="dh2-heading" style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{office.city}</h3>
                              <p className="dh2-label" style={{ color: 'var(--accent)', margin: 0 }}>{office.label}</p>
                           </div>
                        </div>

                        <p className="dh2-body" style={{ marginBottom: '2rem', flexGrow: 1 }}>
                           {office.description}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-s)', marginTop: 'auto' }}>
                           <div>
                              <div className="dh2-label" style={{ marginBottom: '0.8rem', color: 'var(--accent)' }}>Location</div>
                              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--text-main)', height: '100%', boxSizing: 'border-box' }}>
                                 {office.contact.address}
                              </div>
                           </div>
                           <div>
                              <div className="dh2-label" style={{ marginBottom: '0.8rem', color: 'var(--accent)' }}>Contact Details</div>
                              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '100%', boxSizing: 'border-box' }}>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                    <Mail size={14} style={{ color: 'var(--text-muted)' }} />
                                    <span style={{ color: 'var(--text-main)', wordBreak: 'break-all' }}>{office.contact.email}</span>
                                 </div>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                    <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                                    <span style={{ color: 'var(--text-main)' }}>{office.contact.phone}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="dh2-section" style={{ paddingTop: '6rem', paddingBottom: '6rem', background: 'var(--bg-surface)' }}>
         <div className="dh2-container" style={{ textAlign: 'center' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
               <h2 className="dh2-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
                  Start Your <span style={{ color: 'var(--accent)' }}>Journey</span> <br />
                  Across Our Network
               </h2>
               
               <p className="dh2-body" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                  Join forward-thinking enterprises that leverage our global expertise and innovative connectivity solutions to scale new heights.
               </p>
               
               <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/dummyhome2/contact" className="dh2-btn-fill">
                    Partner With Us
                  </Link>
                  <Link to="/dummyhome2/get-consultation" className="dh2-btn-ghost">
                    Book Deep-Dive
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>
    </div>
  );
};

export default DH2GlobalPresence;
