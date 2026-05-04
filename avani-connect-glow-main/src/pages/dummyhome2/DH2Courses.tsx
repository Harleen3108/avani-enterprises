import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, ArrowRight, Star, CheckCircle, Search } from 'lucide-react';
import '../../components/dummyhome2/DummyHome2.css';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'development', name: 'Development' },
  { id: 'design', name: 'Design' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'business', name: 'Business' },
  { id: 'technology', name: 'Technology' }
];

const coursesData = [
  {
    id: 1, title: "Graphic Designing and Adobe Photoshop", category: "design",
    description: "Full step by step course about graphic design, Adobe Photoshop, and digital art creation with AI tools integration.",
    duration: "80 hours", price: "₹19,999", originalPrice: "₹29,999", rating: 4.8, students: 1250,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    instructor: "Priya Sharma", level: "Beginner to Advanced", paymentLink: "https://razorpay.com/payment-link/plink_QkAxEmxe6Ri9Et"
  },
  {
    id: 2, title: "100-Hour Digital Marketing Mastery", category: "marketing",
    description: "Unlock the power of digital marketing with our comprehensive 100-hour course covering all aspects of modern marketing.",
    duration: "100 hours", price: "₹19,999", originalPrice: "₹35,000", rating: 4.9, students: 2100,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    instructor: "Rahul Kumar", level: "Beginner to Advanced", paymentLink: "https://razorpay.com/payment-link/plink_Qj5b7hCG3D5e7H"
  },
  {
    id: 3, title: "Video Editing Course", category: "design",
    description: "Master video editing with professional tools and techniques for creating compelling content.",
    duration: "60 hours", price: "₹19,999", originalPrice: "₹25,000", rating: 4.7, students: 980,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    instructor: "Amit Patel", level: "Beginner to Intermediate", paymentLink: "https://razorpay.com/payment-link/plink_QkAy1wWQmdhynn"
  },
  {
    id: 4, title: "Full Stack Website Development", category: "development",
    description: "Complete web development course covering frontend, backend, databases, and deployment strategies.",
    duration: "120 hours", price: "₹19,999", originalPrice: "₹40,000", rating: 4.9, students: 1850,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    instructor: "Neha Singh", level: "Beginner to Advanced", paymentLink: "https://razorpay.com/payment-link/plink_QkAz7ZhqFfLcXD"
  },
  {
    id: 5, title: "Android and iOS App Development", category: "development",
    description: "Learn mobile app development for both Android and iOS platforms with modern frameworks.",
    duration: "100 hours", price: "₹19,999", originalPrice: "₹35,000", rating: 4.8, students: 1450,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    instructor: "Rajesh Kumar", level: "Intermediate to Advanced", paymentLink: "https://razorpay.com/payment-link/plink_QkAzoc7SqJq6Fs"
  },
  {
    id: 6, title: "Hospital Management Course", category: "business",
    description: "Comprehensive hospital management course for healthcare administration and operations.",
    duration: "80 hours", price: "₹19,999", originalPrice: "₹30,000", rating: 4.6, students: 750,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    instructor: "Dr. Anjali Verma", level: "Beginner to Intermediate", paymentLink: "https://razorpay.com/payment-link/plink_QkB0ZuMTIzNQaF"
  },
  {
    id: 7, title: "Sales Manager Course", category: "business",
    description: "Master sales management techniques and strategies for business growth and revenue generation.",
    duration: "60 hours", price: "₹19,999", originalPrice: "₹25,000", rating: 4.7, students: 1100,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    instructor: "Vikram Singh", level: "Beginner to Advanced", paymentLink: "https://razorpay.com/payment-link/plink_QkD0vcwaw7q9N8"
  },
  {
    id: 8, title: "LLB and LLM Course", category: "business",
    description: "Legal analysis and corporate law course for aspiring lawyers and legal professionals.",
    duration: "100 hours", price: "₹19,999", originalPrice: "₹45,000", rating: 4.8, students: 650,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
    instructor: "Adv. Meera Sharma", level: "Intermediate to Advanced", paymentLink: "https://razorpay.com/payment-link/plink_QkEWaTixFjaC5x"
  },
  {
    id: 9, title: "BSc Nursing Course", category: "business",
    description: "Comprehensive nursing course for mastering nursing jobs in Indian hospitals.",
    duration: "120 hours", price: "₹19,999", originalPrice: "₹35,000", rating: 4.9, students: 890,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    instructor: "Dr. Priya Patel", level: "Beginner to Advanced", paymentLink: "https://razorpay.com/payment-link/plink_QkEzYm9PTePejB"
  },
  {
    id: 10, title: "AI, Machine Learning, and Data Science", category: "technology",
    description: "Cutting-edge course on artificial intelligence, machine learning, and data science applications.",
    duration: "150 hours", price: "₹19,999", originalPrice: "₹50,000", rating: 4.9, students: 1650,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    instructor: "Dr. Amit Kumar", level: "Intermediate to Advanced", paymentLink: "https://razorpay.com/payment-link/plink_QkbfT6omfXOa6v"
  },
  {
    id: 11, title: "Cybersecurity and Ethical Hacking", category: "technology",
    description: "Learn cybersecurity fundamentals and ethical hacking techniques for digital security.",
    duration: "100 hours", price: "₹19,999", originalPrice: "₹40,000", rating: 4.8, students: 1200,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
    instructor: "Rahul Verma", level: "Intermediate to Advanced", paymentLink: "https://razorpay.com/payment-link/plink_QkbVQMoRjk8O3c"
  },
  {
    id: 12, title: "Real Estate Course", category: "business",
    description: "Comprehensive real estate course for jobs in Dubai, Delhi NCR, Chandigarh, and Jaipur.",
    duration: "80 hours", price: "₹19,999", originalPrice: "₹30,000", rating: 4.7, students: 950,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
    instructor: "Kapil Sharma", level: "Beginner to Intermediate", paymentLink: "https://razorpay.com/payment-link/plink_QkuHfTcQCXSjNZ"
  }
];

const DH2Courses = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="dh2-page">
      <section className="dh2-section" style={{ paddingTop: '6rem' }}>
        <div className="dh2-container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="dh2-label">LEARNING PLATFORM</div>
            <h1 className="dh2-display" style={{ marginBottom: '1rem' }}>ELEVATE YOUR <span style={{ color: 'var(--accent)' }}>SKILLS</span></h1>
            <p className="dh2-body" style={{ maxWidth: 650, margin: '0 auto', fontSize: '.85rem' }}>Master in-demand skills with our comprehensive training programs and secure your future with assured job placements.</p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="dh2-section" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
        <div className="dh2-container" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 2.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 12, color: '#fff', fontSize: '.8rem', fontFamily: "'Inter', sans-serif", outline: 'none' }} 
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center' }}>
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ background: activeCategory === cat.id ? 'var(--accent)' : 'transparent', color: activeCategory === cat.id ? '#000' : 'var(--text-muted)', border: `1px solid ${activeCategory === cat.id ? 'var(--accent)' : 'var(--border-s)'}`, borderRadius: 100, padding: '.4rem 1rem', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', cursor: 'pointer', transition: 'all .3s' }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="dh2-section" style={{ paddingTop: '1rem' }}>
        <div className="dh2-container" style={{ maxWidth: 1000, margin: '0 auto' }}>
          {filteredCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <BookOpen size={40} style={{ color: 'var(--border-f)', margin: '0 auto 1rem' }} />
              <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, marginBottom: '.5rem', fontSize: '1.2rem' }}>No Courses Found</h3>
              <p style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>We couldn't find any courses matching your criteria.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {filteredCourses.map((course, i) => (
                <motion.div key={course.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: (i % 2) * .08 }}>
                  <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: 16, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color .3s, transform .3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,255,0,.2)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-s)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                    
                    <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                      <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--accent)', color: '#000', padding: '4px 10px', borderRadius: 100, fontSize: '.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em' }}>
                        {categories.find(c => c.id === course.category)?.name}
                      </div>
                      <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '4px 10px', borderRadius: 100, fontSize: '.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={12} style={{ color: 'var(--accent)', fill: 'var(--accent)' }} /> {course.rating}
                      </div>
                    </div>

                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.1rem', marginBottom: '.8rem', color: '#fff', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.title}</h3>
                      <p className="dh2-body" style={{ fontSize: '.75rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.description}</p>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'var(--bg-base)', padding: '.6rem', borderRadius: 8, display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)' }}>
                          <Clock size={12} style={{ color: 'var(--accent)' }} /> {course.duration}
                        </div>
                        <div style={{ background: 'var(--bg-base)', padding: '.6rem', borderRadius: 8, display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)' }}>
                          <Users size={12} style={{ color: 'var(--accent)' }} /> {course.students} Learners
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                          <div style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.3rem', color: 'var(--accent)', lineHeight: 1 }}>{course.price}</div>
                          <div style={{ fontSize: '.65rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginTop: 4 }}>{course.originalPrice}</div>
                        </div>
                        <div style={{ background: 'rgba(200,255,0,0.1)', color: 'var(--accent)', padding: '4px 8px', borderRadius: 6, fontSize: '.6rem', fontWeight: 800, letterSpacing: '.05em' }}>
                          SAVE {Math.round(((parseInt(course.originalPrice.replace(/[^0-9]/g, '')) - parseInt(course.price.replace(/[^0-9]/g, ''))) / parseInt(course.originalPrice.replace(/[^0-9]/g, ''))) * 100)}%
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '.5rem' }}>
                        <Link to={`/dummyhome2/courses/${course.id}`} style={{ flex: 1, padding: '.8rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 8, fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', cursor: 'pointer', textDecoration: 'none', textAlign: 'center' }}>Details</Link>
                        <a href={course.paymentLink} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, padding: '.8rem', background: 'var(--accent)', border: 'none', color: '#000', borderRadius: 8, fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.3rem', cursor: 'pointer', textDecoration: 'none' }}>Enroll Now <ArrowRight size={12} /></a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Courses */}
      <section className="dh2-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="dh2-container">
          <motion.div className="dh2-section-header" style={{ textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="dh2-label">OUR PROMISE</div>
            <h2 className="dh2-display dh2-section-title">WHY CHOOSE US?</h2>
            <p className="dh2-body" style={{ maxWidth: 500, margin: '0 auto', fontSize: '.85rem' }}>We provide comprehensive training with guaranteed job placement and industry-recognized certifications.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: 900, margin: '0 auto', marginBottom: '4rem' }}>
            {[
              { title: 'Certified Courses', desc: 'Industry-recognized certificates upon completion that validate your expertise and boost your career prospects.' },
              { title: 'Job Guarantee', desc: 'Assured job placement in reputed firms with our extensive network of hiring partners across industries.' },
              { title: 'Paid Internship', desc: '30-day paid internship with real-world experience to apply your skills and build your professional portfolio.' },
              { title: 'AI Assistance', desc: 'Free AI tools and assistance in Hindi & English to enhance your learning experience and productivity.' }
            ].map((perk, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * .1 }} style={{ background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '3rem', fontWeight: 800, fontFamily: "'Syne'", color: 'rgba(255,255,255,.02)', lineHeight: 1 }}>0{i+1}</div>
                <div style={{ width: 40, height: 4, background: 'linear-gradient(90deg, var(--accent), #f59e0b)', borderRadius: 2, marginBottom: '1.5rem' }}></div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.1rem', marginBottom: '.8rem' }}>{perk.title}</h3>
                <p className="dh2-body" style={{ fontSize: '.75rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{perk.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
            {[
              { val: '5000+', label: 'Students Trained' },
              { val: '95%', label: 'Placement Rate' },
              { val: '500+', label: 'Hiring Partners' },
              { val: '4.8★', label: 'Average Rating' }
            ].map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.4 + i * 0.1 }} style={{ textAlign: 'center', background: 'var(--bg-base)', border: '1px solid var(--border-s)', borderRadius: 16, padding: '1.5rem' }}>
                <div style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '.3rem' }}>{stat.val}</div>
                <div style={{ fontSize: '.6rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dh2-cta">
        <div className="dh2-cta-watermark">AVANI</div>
        <motion.h2 className="dh2-display dh2-cta-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          BUILD YOUR<br /><span>DIGITAL FUTURE</span>
        </motion.h2>
        <p className="dh2-body" style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto 2rem', fontSize: '.85rem' }}>
          Partner with us to unlock growth opportunities, streamline operations, and achieve your business vision.
        </p>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: .2 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Link to="/dummyhome2/get-consultation" className="dh2-btn-fill">Get Consultation</Link>
          <a href="tel:+919253625099" className="dh2-btn-ghost">Talk to Expert</a>
        </motion.div>
      </section>
    </div>
  );
};

export default DH2Courses;
