import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, CheckCircle, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import '../../components/dummy/DummyHome.css';

/* Premium background components */
const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
);

const GridBg = ({ size = 40, opacity = 0.05 }: any) => (
  <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px`, pointerEvents: 'none' }} />
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const courseData = {
  1: {
    title: "Graphic Designing and Adobe Photoshop",
    subtitle: "Master the Art of Digital Design",
    description: "Full step by step course about graphic design, Adobe Photoshop, and digital art creation with AI tools integration. Learn professional design techniques and create stunning visuals for various platforms.",
    duration: "80 hours",
    price: "₹19,999",
    originalPrice: "₹29,999",
    rating: 4.8,
    students: 1250,
    instructor: "Priya Sharma",
    level: "Beginner to Advanced",
    language: "Hindi & English",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
    category: "Design",
    paymentLink: "https://razorpay.com/payment-link/plink_QkAxEmxe6Ri9Et",
    features: [
      "Certificate after completion",
      "Free AI tool assistance (Hindi & English)",
      "Assured paid 30-day internship",
      "Assured job in reputed firm",
      "MCQ test for course completion",
      "Lifetime access to course materials",
      "24/7 support from instructors"
    ],
    curriculum: [
      {
        title: "Introduction to Graphic Design",
        topics: ["Design principles", "Color theory", "Typography basics", "Layout fundamentals"]
      },
      {
        title: "Adobe Photoshop Mastery",
        topics: ["Interface overview", "Selection tools", "Layer management", "Filters and effects"]
      },
      {
        title: "Digital Art Creation",
        topics: ["Digital painting", "Photo manipulation", "Logo design", "Brand identity"]
      },
      {
        title: "AI Tools Integration",
        topics: ["AI-powered design tools", "Automation techniques", "Smart templates", "Future of design"]
      }
    ],
    requirements: [
      "Basic computer knowledge",
      "Adobe Photoshop (trial version provided)",
      "Creative mindset",
      "Dedication to learn"
    ],
    outcomes: [
      "Create professional graphic designs",
      "Master Adobe Photoshop tools",
      "Develop brand identities",
      "Work with AI design tools",
      "Build a strong portfolio"
    ]
  },
  2: {
    title: "100-Hour Digital Marketing Mastery",
    subtitle: "Comprehensive Digital Marketing Course",
    description: "Unlock the power of digital marketing with our comprehensive 100-hour course covering all aspects of modern marketing. From SEO to social media, learn everything you need to succeed in the digital world.",
    duration: "100 hours",
    price: "₹19,999",
    originalPrice: "₹35,000",
    rating: 4.9,
    students: 2100,
    instructor: "Rahul Kumar",
    level: "Beginner to Advanced",
    language: "Hindi & English",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Marketing",
    paymentLink: "https://razorpay.com/payment-link/plink_Qj5b7hCG3D5e7H",
    features: [
      "Certificate after completion",
      "Free AI tool assistance (Hindi & English)",
      "Assured paid 30-day internship",
      "Assured job in reputed firm",
      "MCQ test for course completion",
      "Real project experience",
      "Industry expert mentorship"
    ],
    curriculum: [
      {
        title: "Digital Marketing Fundamentals",
        topics: ["Marketing basics", "Digital landscape", "Customer behavior", "Marketing funnel"]
      },
      {
        title: "Search Engine Optimization (SEO)",
        topics: ["On-page SEO", "Off-page SEO", "Technical SEO", "Local SEO"]
      },
      {
        title: "Social Media Marketing",
        topics: ["Platform strategies", "Content creation", "Community management", "Paid advertising"]
      },
      {
        title: "Content Marketing",
        topics: ["Content strategy", "Blog writing", "Video marketing", "Email marketing"]
      }
    ],
    requirements: [
      "Basic internet knowledge",
      "Analytical thinking",
      "Creativity",
      "Willingness to learn"
    ],
    outcomes: [
      "Master digital marketing strategies",
      "Create effective marketing campaigns",
      "Analyze marketing performance",
      "Land high-paying jobs",
      "Start your own agency"
    ]
  },
  3: {
    title: "Video Editing Course",
    subtitle: "Master Professional Video Editing",
    description: "Master the art of video editing for YouTube, social media, and business. Learn Adobe Premiere Pro, After Effects, color grading, transitions, and more. Includes AI tools for faster editing.",
    duration: "60 hours",
    price: "₹19,999",
    originalPrice: "₹25,000",
    rating: 4.7,
    students: 980,
    instructor: "Amit Patel",
    level: "Beginner to Intermediate",
    language: "Hindi & English",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
    category: "Design",
    paymentLink: "https://razorpay.com/payment-link/plink_QkAy1wWQmdhynn",
    features: [
      "Certificate after completion",
      "Free AI tool assistance (Hindi & English)",
      "Assured paid 30-day internship",
      "Assured job in reputed firm",
      "MCQ test for course completion",
      "Hands-on projects",
      "Lifetime access to course materials"
    ],
    curriculum: [
      {
        title: "Editing Basics",
        topics: [
          "Cuts, trims, and transitions",
          "Timeline management",
          "Project organization"
        ]
      },
      {
        title: "Adobe Premiere Pro & After Effects",
        topics: [
          "Interface overview",
          "Effects and transitions",
          "Color correction and grading"
        ]
      },
      {
        title: "Audio & Export",
        topics: [
          "Adding music and sound effects",
          "Voiceovers",
          "Exporting for YouTube, Instagram, and more"
        ]
      },
      {
        title: "AI Tools for Editing",
        topics: [
          "AI-powered editing tools",
          "Automation techniques"
        ]
      }
    ],
    requirements: [
      "Basic computer knowledge",
      "Creative mindset",
      "Willingness to learn"
    ],
    outcomes: [
      "Edit professional videos",
      "Use industry-standard tools",
      "Create content for YouTube and social media",
      "Build a strong video portfolio"
    ]
  },
  4: {
    title: "Full Stack Website Development",
    subtitle: "Become a Full Stack Web Developer",
    description: "Become a full stack web developer. Learn HTML, CSS, JavaScript, React, Node.js, MongoDB, deployment, and more. Build real-world projects and get job-ready.",
    duration: "120 hours",
    price: "₹19,999",
    originalPrice: "₹40,000",
    rating: 4.9,
    students: 1850,
    instructor: "Neha Singh",
    level: "Beginner to Advanced",
    language: "Hindi & English",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    category: "Development",
    paymentLink: "https://razorpay.com/payment-link/plink_QkAz7ZhqFfLcXD",
    features: [
      "Certificate after completion",
      "Free AI tool assistance (Hindi & English)",
      "Assured paid 30-day internship",
      "Assured job in reputed firm",
      "MCQ test for course completion",
      "Real-world projects",
      "Placement assistance"
    ],
    curriculum: [
      {
        title: "Frontend Basics",
        topics: [
          "HTML5 & CSS3",
          "Responsive Design",
          "JavaScript Fundamentals"
        ]
      },
      {
        title: "Frontend Frameworks",
        topics: [
          "React.js",
          "State Management",
          "API Integration"
        ]
      },
      {
        title: "Backend Development",
        topics: [
          "Node.js & Express",
          "RESTful APIs",
          "Authentication"
        ]
      },
      {
        title: "Database & Deployment",
        topics: [
          "MongoDB",
          "Deployment (Vercel, Heroku)",
          "Version Control (Git/GitHub)"
        ]
      }
    ],
    requirements: [
      "Basic computer knowledge",
      "Logical thinking",
      "Laptop/PC"
    ],
    outcomes: [
      "Build full-stack web applications",
      "Understand frontend and backend technologies",
      "Deploy apps to the web",
      "Get a high-paying developer job"
    ]
  },
  5: {
    title: "English Speaking Course",
    subtitle: "Speak English Fluently and Confidently",
    description: "Speak English fluently and confidently. Learn grammar, vocabulary, pronunciation, public speaking, and more. Includes interview preparation.",
    duration: "50 hours",
    price: "₹19,999",
    originalPrice: "₹20,000",
    rating: 4.6,
    students: 1500,
    instructor: "Ravi Kumar",
    level: "Beginner to Intermediate",
    language: "Hindi & English",
    image: "https://images.unsplash.com/photo-1546410531-ea4cea48f5a1?w=600&h=400&fit=crop",
    category: "Language",
    paymentLink: "https://razorpay.com/payment-link/plink_QkAzk7hJvN3s5k",
    features: [
      "Certificate after completion",
      "Free AI tool assistance (Hindi & English)",
      "Assured paid 30-day internship",
      "Assured job in reputed firm",
      "MCQ test for course completion",
      "Live speaking sessions",
      "Interview preparation"
    ],
    curriculum: [
      {
        title: "Grammar & Vocabulary",
        topics: [
          "Basic grammar rules",
          "Building vocabulary",
          "Sentence construction"
        ]
      },
      {
        title: "Pronunciation & Fluency",
        topics: [
          "Correct pronunciation",
          "Speaking practice",
          "Listening comprehension"
        ]
      },
      {
        title: "Public Speaking",
        topics: [
          "Overcoming stage fear",
          "Presentation skills",
          "Engaging the audience"
        ]
      },
      {
        title: "Interview Preparation",
        topics: [
          "Common interview questions",
          "Mock interviews",
          "Body language"
        ]
      }
    ],
    requirements: [
      "Basic understanding of Hindi/English",
      "Willingness to practice",
      "Microphone"
    ],
    outcomes: [
      "Speak English fluently",
      "Clear interviews with confidence",
      "Communicate effectively in professional settings"
    ]
  },
  6: {
    title: "Real Estate Sales Training",
    subtitle: "Master the Art of Real Estate Sales",
    description: "Master the art of real estate sales. Learn lead generation, property showcasing, negotiation, closing techniques, and more.",
    duration: "40 hours",
    price: "₹19,999",
    originalPrice: "₹25,000",
    rating: 4.8,
    students: 850,
    instructor: "Vikram Singh",
    level: "Beginner to Intermediate",
    language: "Hindi & English",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    category: "Sales",
    paymentLink: "https://razorpay.com/payment-link/plink_QkAzxsW6B7R9Mv",
    features: [
      "Certificate after completion",
      "Free AI tool assistance (Hindi & English)",
      "Assured paid 30-day internship",
      "Assured job in reputed firm",
      "MCQ test for course completion",
      "Role-play sessions",
      "Sales scripts provided"
    ],
    curriculum: [
      {
        title: "Real Estate Basics",
        topics: [
          "Understanding the market",
          "Property types",
          "Legal basics"
        ]
      },
      {
        title: "Lead Generation",
        topics: [
          "Finding clients",
          "Networking",
          "Digital marketing for real estate"
        ]
      },
      {
        title: "Sales & Negotiation",
        topics: [
          "Property showcasing",
          "Handling objections",
          "Closing techniques"
        ]
      },
      {
        title: "Market & Job Preparation",
        topics: [
          "Market analysis",
          "Interview preparation",
          "Job search strategies"
        ]
      }
    ],
    requirements: [
      "Basic communication skills",
      "Interest in real estate",
      "Laptop/PC"
    ],
    outcomes: [
      "Work in real estate sector",
      "Crack interviews",
      "Understand property sales"
    ]
  }
};

const DHCourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('curriculum');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const course = id ? (courseData as any)[id] : null;

  if (!course) {
    return (
      <div className="dh-course-detail-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="dh-display" style={{ fontSize: '3rem', marginBottom: '1rem' }}>COURSE NOT FOUND</h1>
          <Link to="/dummyhome/courses" className="dh-btn-fill">BACK TO COURSES</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dh-course-detail-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* HERO SECTION */}
      <section className="theme-brown" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', position: 'relative', paddingTop: '120px', paddingBottom: '60px' }}>
        <Grain />
        <GridBg size={50} opacity={0.04} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }} className="dh-responsive-grid">
            
            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeUp}>
                <Link to="/dummyhome/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '2rem' }}>
                  <ArrowLeft size={14} /> BACK TO COURSES
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="dh-label" style={{ color: 'var(--accent-primary)', marginBottom: '1.2rem' }}>
                {course.category.toUpperCase()}
              </motion.div>

              <h1 className="dh-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                {course.title}
              </h1>

              <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '580px', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {course.description}
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', border: '1px solid var(--border-light)', background: 'var(--card-bg)' }}>
                  <Clock size={16} style={{ color: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{course.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', border: '1px solid var(--border-light)', background: 'var(--card-bg)' }}>
                  <Users size={16} style={{ color: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{course.students} Enrolled</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', border: '1px solid var(--border-light)', background: 'var(--card-bg)' }}>
                  <Star size={16} style={{ color: 'var(--accent-primary)', fill: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{course.rating} Rating</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Enroll Card */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
                  <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)', lineHeight: 1 }}>{course.price}</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-tertiary)', textDecoration: 'line-through', paddingBottom: '4px' }}>{course.originalPrice}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {course.features.slice(0, 4).map((feat: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircle size={16} style={{ color: 'var(--accent-light)' }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{feat}</span>
                    </div>
                  ))}
                </div>

                <a href={course.paymentLink} target="_blank" rel="noopener noreferrer" className="dh-btn-fill" style={{ width: '100%', justifyContent: 'center' }}>
                  ENROLL NOW <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TABS SECTION */}
      <section className="theme-beige" style={{ padding: '80px 0', background: 'var(--bg-primary)' }}>
        <div className="dh-container">
          
          <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-faint)', marginBottom: '3rem', overflowX: 'auto' }}>
            {['curriculum', 'features', 'outcomes'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ 
                  background: 'none', border: 'none', 
                  padding: '0 0 16px 0', 
                  fontSize: '0.9rem', fontWeight: 700, 
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: activeTab === tab ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                  borderBottom: activeTab === tab ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ minHeight: '400px' }}>
            {activeTab === 'curriculum' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {course.curriculum.map((module: any, i: number) => (
                  <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary)', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                        {i + 1}
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontFamily: "'Outfit'", fontWeight: 700 }}>{module.title}</h3>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {module.topics.map((topic: string, j: number) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <Play size={12} style={{ color: 'var(--text-tertiary)', marginTop: '4px' }} />
                          <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
                {course.features.map((feat: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                    <CheckCircle size={20} style={{ color: 'var(--accent-primary)' }} />
                    <span style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{feat}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'outcomes' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {course.outcomes.map((out: string, i: number) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={20} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <span style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{out}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DHCourseDetail;
