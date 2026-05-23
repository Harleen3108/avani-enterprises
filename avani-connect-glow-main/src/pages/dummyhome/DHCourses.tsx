import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RotatingText from '../../components/RotatingText';
import { Users, Clock, Star, ArrowRight, CheckCircle, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../components/dummy/DummyHome.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

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

const courses = [
  {
    id: 1,
    title: "Graphic Designing and Adobe Photoshop",
    category: "design",
    description: "Full step by step course about graphic design, Adobe Photoshop, and digital art creation with AI tools integration.",
    duration: "80 hours",
    price: "₹19,999",
    originalPrice: "₹29,999",
    rating: 4.8,
    students: 1250,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    features: [
      "Certificate after completion",
      "Free AI tool assistance (Hindi & English)",
      "Assured paid 30-day internship",
      "Assured job in reputed firm",
    ],
    instructor: "Priya Sharma",
  },
  {
    id: 2,
    title: "100-Hour Digital Marketing Mastery",
    category: "marketing",
    description: "Unlock the power of digital marketing with our comprehensive 100-hour course covering all aspects of modern marketing.",
    duration: "100 hours",
    price: "₹19,999",
    originalPrice: "₹35,000",
    rating: 4.9,
    students: 2100,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    features: [
      "Certificate after completion",
      "Free AI tool assistance",
      "Assured paid 30-day internship",
      "Assured job in reputed firm",
    ],
    instructor: "Rahul Kumar",
  },
  {
    id: 3,
    title: "Video Editing Course",
    category: "design",
    description: "Master video editing with professional tools and techniques for creating compelling content.",
    duration: "60 hours",
    price: "₹19,999",
    originalPrice: "₹25,000",
    rating: 4.7,
    students: 980,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    features: [
      "Certificate after completion",
      "Free AI tool assistance",
      "Assured paid 30-day internship",
      "Assured job in reputed firm",
    ],
    instructor: "Amit Patel",
  },
];

const DHCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dh-courses-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>

      {/* 1. HERO */}
      <section className="theme-brown" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.05} />
        <GlowBlob top="-5%" right="-5%" w={350} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">MASTER IN-DEMAND SKILLS</motion.div>
            <h1 className="dh-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.5rem' }}>
              <span className="dh-hero-line"><motion.span custom={0} variants={titleV}>MASTER YOUR</motion.span></span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} style={{ color: 'var(--accent-primary)' }}>
                  <RotatingText words={['FUTURE', 'CAREER', 'SKILLS', 'CRAFT']} interval={2500} className="dh-display" />
                </motion.span>
              </span>
            </h1>
            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
              Comprehensive training programs with guaranteed job placement and industry-recognized certifications.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* 2. SEARCH */}
      <section className="theme-beige" style={{ padding: '1.5rem 0', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <Search size={16} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input type="text" placeholder="SEARCH COURSES..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 0 10px 2rem', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-faint)', color: 'var(--text-primary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', outline: 'none' }}
            />
          </div>
        </div>
      </section>

      {/* 3. COURSES GRID */}
      <section className="theme-beige" style={{ position: 'relative', padding: '60px 0 80px', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.03} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="dh-course-list">
            {filteredCourses.map((course, i) => (
              <motion.div key={course.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <div style={{
                  background: 'linear-gradient(90deg, var(--card-bg) 0%, rgba(240, 235, 225, 0.05) 100%)', 
                  borderRadius: '16px', border: '1px solid var(--border-faint)',
                  overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem',
                  backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', position: 'relative'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-faint)'; e.currentTarget.style.boxShadow = 'none'; }}
                  className="dh-course-item"
                >
                  {/* Left Side: Image and Title */}
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flex: 1 }}>
                    <div style={{ position: 'relative', width: '200px', height: '140px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }} className="dh-course-img-wrap">
                      <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
                      <div style={{ position: 'absolute', top: 8, left: 8 }}>
                        <span style={{ background: 'var(--accent-primary)', color: '#000', padding: '4px 10px', borderRadius: '6px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                          {course.category.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px' }}>
                          <Star size={12} style={{ color: 'var(--accent-primary)', fill: 'var(--accent-primary)' }} />
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-primary)' }}>{course.rating}</span>
                        </div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>INSTRUCTOR: {course.instructor.toUpperCase()}</span>
                      </div>
                      
                      <h3 className="dh-heading" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                      <p className="dh-body" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '600px' }}>{course.description}</p>
                      
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)' }}>{course.duration}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Users size={14} style={{ color: 'var(--text-tertiary)' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)' }}>{course.students} ENROLLED</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle size={14} style={{ color: 'var(--accent-primary)' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)' }}>CERTIFICATE INCLUDED</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Pricing and Action */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', paddingLeft: '2rem', borderLeft: '1px solid var(--border-faint)', flexShrink: 0 }} className="dh-course-action">
                    <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textDecoration: 'line-through', marginBottom: '0.2rem' }}>{course.originalPrice}</div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{course.price}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                      <Link to={`/dummyhome/courses/${course.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                        <button className="dh-btn-fill" style={{ width: '100%', padding: '12px 24px', fontSize: '0.75rem' }}>ENROLL NOW</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .dh-course-item {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .dh-course-item > div:first-child {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding-right: 0 !important;
          }
          .dh-course-img-wrap {
            width: 100% !important;
            height: 200px !important;
          }
          .dh-course-action {
            width: 100% !important;
            align-items: flex-start !important;
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid var(--border-faint) !important;
            padding-top: 1.5rem !important;
            margin-top: 1.5rem !important;
          }
          .dh-course-action > div:first-child {
            text-align: left !important;
          }
          .dh-responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DHCourses;
