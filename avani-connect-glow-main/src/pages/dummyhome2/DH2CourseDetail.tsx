import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Star, CheckCircle2, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const DH2CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch for the mockup, as actual courses might be fetched differently
    setTimeout(() => {
      setCourse({
        id,
        title: 'Advanced Digital Marketing Masterclass',
        category: 'Marketing',
        duration: '8 Weeks',
        level: 'Intermediate',
        instructor: 'Sarah Jenkins',
        price: '₹14,999',
        rating: 4.8,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&auto=format&fit=crop',
        description: 'Master the complete digital marketing landscape. From SEO and content strategy to advanced performance marketing and analytics, this comprehensive course gives you the tools to drive exponential growth.',
        whatYouWillLearn: [
          'Advanced SEO strategies and implementation',
          'Data-driven performance marketing (PPC, Social Ads)',
          'Content strategy and brand storytelling',
          'Marketing analytics and ROI measurement',
          'Conversion rate optimization (CRO)'
        ],
        modules: [
          { title: 'Foundation of Digital Strategy', duration: 'Week 1-2' },
          { title: 'Organic Growth & SEO Mastery', duration: 'Week 3-4' },
          { title: 'Paid Acquisition & Performance', duration: 'Week 5-6' },
          { title: 'Analytics, Data & Scaling', duration: 'Week 7-8' }
        ]
      });
      setLoading(false);
    }, 600);
  }, [id]);

  if (loading) {
    return (
      <div className="dh2-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-s)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Link to="/dummyhome2/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <ArrowLeft size={14} /> Back to Courses
              </Link>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-s)', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                {course.category}
              </div>
              <h1 className="dh2-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                {course.title}
              </h1>
              <p className="dh2-body" style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.8 }}>
                {course.description}
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.2rem' }}>Duration</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}><Clock size={14} style={{ color: 'var(--accent)' }}/> {course.duration}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.2rem' }}>Level</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}><BookOpen size={14} style={{ color: 'var(--accent)' }}/> {course.level}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.2rem' }}>Rating</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}><Star size={14} style={{ color: 'var(--accent)' }}/> {course.rating} ({course.reviews})</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
              <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: '24px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '200px' }}>
                  <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--bg-base))' }} />
                  <button style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                    <Play size={20} fill="currentColor" />
                  </button>
                </div>
                <div style={{ position: 'relative', paddingTop: '160px' }}>
                  <div style={{ fontSize: '2rem', fontFamily: "'Syne'", fontWeight: 800, marginBottom: '1.5rem' }}>{course.price}</div>
                  <button className="dh2-btn-fill" style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}>Enroll Now</button>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>30-day money-back guarantee. Full lifetime access.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="dh2-section" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
        <div className="dh2-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="dh2-heading" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>What you'll learn</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {course.whatYouWillLearn.map((item: string, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                    <span className="dh2-body" style={{ fontSize: '0.95rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }}>
              <h2 className="dh2-heading" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Course Curriculum</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {course.modules.map((mod: any, idx: number) => (
                  <div key={idx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '12px', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        {idx + 1}
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{mod.title}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>{mod.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DH2CourseDetail;
