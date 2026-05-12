import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Users, GraduationCap, Briefcase, ShoppingCart, CheckCircle, ExternalLink, BarChart3, ArrowRight } from 'lucide-react';
import RotatingText from '../../components/RotatingText';
import '../../components/dummy/DummyHome.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

/* Visual helpers */
const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
);
const GridBg = ({ size = 40, opacity = 0.06 }: any) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity, backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />
);
const GlowBlob = ({ top, left, right, bottom, w = 300, opacity = 0.05, blur = 100 }: any) => (
  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [opacity, opacity * 1.4, opacity] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: w, height: w, borderRadius: '50%', background: 'var(--accent-primary)', filter: `blur(${blur}px)`, top, left, right, bottom, pointerEvents: 'none', zIndex: 1 }} />
);
const LuxuryLine = () => (
  <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 20%, var(--accent-light) 50%, var(--accent-primary) 80%, transparent)', opacity: 0.3 }} />
);

const products = [
  {
    id: 'hr-portal',
    title: 'Advanced HR Portal',
    description: 'A comprehensive workforce management solution designed to streamline HR operations, from attendance tracking to automated payroll processing.',
    longDescription: 'Our HR Portal is built to handle the complexities of modern team management. It simplifies administrative tasks and empowers employees with self-service features.',
    icon: <Users size={28} />,
    link: 'https://hrportal.avanienterprises.in/',
    features: ['Employee Profile Management', 'Automated Salary Calculation', 'Digital Salary Slips', 'EOD Performance Reports', 'Leave & Attendance Tracking', 'Performance Analytics'],
    highlights: ['Analytics', 'Salary Calculation', 'Employee Self-Service'],
    image: '/hr-portal-new.png',
    featured: true,
  },
  {
    id: 'school-management',
    title: 'School Management System',
    description: 'A robust platform for educational institutions to manage students, staff, and daily academic activities with ease and precision.',
    longDescription: 'Designed for modern schools, this system bridges the gap between administrators, teachers, parents, and students through a unified digital ecosystem.',
    icon: <GraduationCap size={28} />,
    link: 'https://indus-school-page.vercel.app/admission',
    features: ['Teacher Student Module', 'Fee Management & Invoicing', 'Examination & Result Processing', 'Timetable & Scheduling', 'Parent-Teacher Communication', 'Library & Inventory Management'],
    highlights: ['Online Admissions', 'Exam Management', 'Fee Tracking'],
    image: '/school-management-hero.png',
  },
  {
    id: 'crm-portal',
    title: 'Project & Lead Management CRM',
    description: 'Transform your sales pipeline and project workflows with our intuitive CRM designed for high-growth businesses.',
    longDescription: 'Our CRM helps you track every lead, manage complex projects, and maintain strong client relationships all in one integrated dashboard.',
    icon: <Briefcase size={28} />,
    link: 'https://team-lead-gamma.vercel.app/',
    features: ['Lead Pipeline Automation', 'Project Task Management', 'Client Communication Hub', 'Sales Forecasting Reports', 'Document Management', 'Team Collaboration Tools'],
    highlights: ['Lead Tracking', 'Automated Follow-ups', 'Revenue Insights'],
    image: '/crm-hero.png',
  },
  {
    id: 'ecommerce-web',
    title: 'Custom E-commerce Website',
    description: 'Scale your retail business with a high-performance, custom-built online store tailored to your brand\'s unique needs.',
    longDescription: 'We build e-commerce solutions that focus on conversions, user experience, and seamless integrations with payment and shipping providers.',
    icon: <ShoppingCart size={28} />,
    link: 'https://shoes-ecommerce-iota.vercel.app/',
    features: ['Product Catalog Management', 'Secure Payment Integration', 'Inventory & Order Tracking', 'Customer Account Portals', 'SEO Optimized Architecture', 'Mobile-First Responsive Design'],
    highlights: ['Multi-vendor Support', 'Flash Sales Engine', 'Safe Checkout'],
    image: '/ecommerce-hero.png',
  },
];

const DHProducts = () => {
  const location = useLocation();
  const [hovIdx, setHovIdx] = useState<number | null>(null);

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const element = document.getElementById((location.state as any).scrollTo);
      if (element) {
        setTimeout(() => {
          const navbarHeight = 100;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'smooth' });
        }, 200);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="dh-products-page">

      {/* 1. HERO */}
      <section className="theme-brown" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.05} />
        <GlowBlob top="-5%" right="-5%" w={350} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">PREMIUM DIGITAL ECOSYSTEM</motion.div>
            <h1 className="dh-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.5rem' }}>
              DIGITAL PRODUCTS AND <br />
              <span style={{ color: 'var(--accent-primary)' }}>
                <RotatingText words={['SOLUTIONS', 'INNOVATION', 'PRODUCTS', 'SUCCESS']} interval={3000} className="dh-display" />
              </span>
            </h1>
            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1rem' }}>
              Innovative digital ecosystems designed to empower businesses and institutions with cutting-edge technology and seamless user experiences.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* 2. PRODUCT SECTIONS */}
      <section className="theme-beige" style={{ position: 'relative', padding: '60px 0 80px', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.03} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                id={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '4rem',
                  alignItems: 'center',
                  direction: index % 2 === 1 ? 'rtl' : 'ltr',
                }}
                className="dh-responsive-grid"
              >
                {/* Image Side — Browser Mockup */}
                <div style={{ position: 'relative', direction: 'ltr' }}>
                  <div style={{
                    borderRadius: '16px', overflow: 'hidden',
                    border: `1px solid ${hovIdx === index ? 'var(--accent-primary)' : 'var(--border-faint)'}`,
                    background: 'var(--card-bg)', boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
                    transition: 'all 0.5s ease',
                    transform: hovIdx === index ? 'translateY(-4px)' : 'none',
                  }}
                    onMouseEnter={() => setHovIdx(index)}
                    onMouseLeave={() => setHovIdx(null)}
                  >
                    {/* Browser toolbar */}
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-primary)', padding: '4px 16px', borderRadius: '100px', border: '1px solid var(--border-faint)' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                        <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>
                          {product.link?.replace('https://', '').split('/')[0] || 'avanienterprises.in'}
                        </span>
                      </div>
                    </div>
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', transition: 'transform 0.7s ease', transform: hovIdx === index ? 'scale(1.02)' : 'scale(1)' }} />
                      {product.featured && (
                        <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--accent-primary)', color: '#fff', padding: '4px 12px', borderRadius: '100px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                          FEATURED PRODUCT
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Floating analytics card for HR Portal */}
                  {product.id === 'hr-portal' && (
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ position: 'absolute', top: 80, right: -20, background: 'var(--card-bg)', backdropFilter: 'blur(12px)', padding: '14px 18px', borderRadius: '16px', border: '1px solid var(--border-faint)', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '6px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BarChart3 size={16} style={{ color: 'var(--accent-primary)' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Live Analytics</span>
                      </div>
                      <div style={{ height: 6, width: 80, background: 'var(--border-faint)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '66%', background: 'var(--accent-primary)', borderRadius: '100px' }} />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Content Side */}
                <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                      {product.icon}
                    </div>
                    <div>
                      <h2 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{product.title}</h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {product.highlights.map((h, k) => (
                          <span key={k} style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>{h.toUpperCase()}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="dh-body" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {product.description}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    {product.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={12} style={{ color: 'var(--accent-primary)' }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', pt: '1rem' }}>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="dh-btn-fill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      VISIT PRODUCT <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHProducts;
