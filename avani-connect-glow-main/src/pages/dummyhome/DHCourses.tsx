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
    <div className="dh-courses-page">

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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="dh-responsive-grid">
            {filteredCourses.map((course, i) => (
              <motion.div key={course.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <div style={{
                  background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-faint)',
                  overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%',
                  backdropFilter: 'blur(10px)', transition: 'all 0.4s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-faint)'; }}
                >
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 10, left: 10 }}>
                      <span style={{ background: 'var(--accent-primary)', color: '#000', padding: '3px 10px', borderRadius: '100px', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                        {course.category.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={10} style={{ color: 'var(--accent-primary)', fill: 'var(--accent-primary)' }} /> {course.rating}
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                    <p className="dh-body" style={{ fontSize: '0.8rem', marginBottom: '1rem', flex: 1 }}>{course.description}</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-faint)' }}>
                        <Clock size={12} style={{ color: 'var(--accent-primary)' }} />
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)' }}>{course.duration}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-faint)' }}>
                        <Users size={12} style={{ color: 'var(--accent-primary)' }} />
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)' }}>{course.students} LEARNERS</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{course.price}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textDecoration: 'line-through', marginLeft: '6px' }}>{course.originalPrice}</span>
                      </div>
                      <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.05em' }}>INSTRUCTOR: {course.instructor.toUpperCase()}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="dh-btn-fill" style={{ flex: 1 }}>ENROLL NOW</button>
                      <button className="dh-btn-ghost" style={{ padding: '10px' }}><ArrowRight size={14} /></button>
                    </div>
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

export default DHCourses;
