import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { FALLBACK_JOBS } from './DHCareers';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle, Mail, Phone, Upload, Loader2, X } from 'lucide-react';
import '../../components/dummy/DummyHome.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
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

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  status: string;
}

const DHCareerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentLocation: "",
    linkedinProfile: "",
    portfolioWebsite: "",
    experience: "",
    currentCompany: "",
    currentDesignation: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    highestQualification: "",
    otherQualification: "",
    resume: null as File | null,
    coverLetterText: "",
    howDidYouHear: "",
    willingToRelocate: "",
    additionalComments: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
        const fetchedJob = response.data.data;
        if (fetchedJob) {
          setJob(fetchedJob);
        } else {
          const fallback = FALLBACK_JOBS.find(j => j._id === id);
          setJob(fallback || null);
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        const fallback = FALLBACK_JOBS.find(j => j._id === id);
        setJob(fallback || null);
      } finally { setLoading(false); }
    };
    if (id) fetchJob();
  }, [id]);

  useEffect(() => {
    if (location.search.includes('apply=true')) {
      setShowForm(true);
      setTimeout(() => {
        const formElem = document.getElementById('application-form-section');
        if (formElem) {
          formElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [location.search]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone ||
      !formData.experience || !formData.noticePeriod || !formData.highestQualification) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData.resume) {
      alert("Please upload your resume");
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("jobId", id || "");
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("currentLocation", formData.currentLocation || "");
      data.append("linkedinProfile", formData.linkedinProfile || "");
      data.append("portfolioWebsite", formData.portfolioWebsite || "");
      data.append("positionAppliedFor", job?.title || "");
      data.append("experience", formData.experience);
      data.append("currentCompany", formData.currentCompany || "");
      data.append("currentDesignation", formData.currentDesignation || "");
      data.append("currentCTC", formData.currentCTC || "");
      data.append("expectedCTC", formData.expectedCTC || "");
      data.append("noticePeriod", formData.noticePeriod);
      data.append("highestQualification", formData.highestQualification);
      data.append("otherQualification", formData.otherQualification || "");
      data.append("coverLetterText", formData.coverLetterText || "");
      data.append("howDidYouHear", formData.howDidYouHear || "");
      data.append("willingToRelocate", formData.willingToRelocate || "");
      data.append("additionalComments", formData.additionalComments || "");

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      await axios.post(`${API_BASE_URL}/applications`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsSubmitted(true);
      setShowForm(false);
      
      setTimeout(() => {
        const successElem = document.getElementById('application-success');
        if (successElem) {
          successElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } catch (err: any) {
      console.error("Failed to submit application", err);
      alert(err.response?.data?.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplyClick = () => {
    setShowForm(true);
    setTimeout(() => {
      const formElem = document.getElementById('application-form-section');
      if (formElem) {
        formElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div className="dh-label" style={{ margin: 'auto' }}>LOADING JOB DETAILS...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', flexDirection: 'column', gap: '1rem' }}>
        <div className="dh-heading" style={{ fontSize: '1.5rem', margin: 'auto' }}>Job not found.</div>
        <button onClick={() => navigate('/dummyhome/careers')} className="dh-btn-fill" style={{ margin: 'auto' }}>BACK TO CAREERS</button>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-light)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    fontWeight: 500,
    outline: 'none',
    transition: 'all 0.3s'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.65rem',
    fontWeight: 800,
    color: 'var(--accent-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '0.5rem'
  };

  return (
    <div className="dh-career-detail-page">
      <Grain />
      
      {/* Hero */}
      <section className="theme-brown" style={{ padding: '120px 0 60px', background: 'var(--bg-primary)', position: 'relative' }}>
        <GridBg size={50} opacity={0.05} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <button onClick={() => navigate('/dummyhome/careers')} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontSize: '0.8rem', fontWeight: 800 }}>
            <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> BACK TO CAREERS
          </button>
          
          <div className="dh-label">{job.department.toUpperCase()}</div>
          <h1 className="dh-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>{job.title}</h1>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{job.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Briefcase size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{job.type}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{job.experience}</span>
            </div>
          </div>

          {!showForm && !isSubmitted && (
            <button onClick={handleApplyClick} className="dh-btn-fill">APPLY FOR THIS POSITION</button>
          )}
        </div>
      </section>

      <LuxuryLine />

      {/* Content */}
      <section className="theme-beige" style={{ padding: '60px 0', background: 'var(--bg-primary)' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '2.1fr 0.9fr', gap: '4rem' }} className="dh-responsive-grid">
            
            {/* Left Col */}
            <div>
              {isSubmitted && (
                <motion.div
                  id="application-success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'var(--card-bg)',
                    border: '2px solid var(--accent-primary)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    marginBottom: '3rem',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--accent-hover)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                    <CheckCircle size={36} style={{ margin: 'auto' }} />
                  </div>
                  <h2 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>APPLICATION TRANSMITTED</h2>
                  <p className="dh-body" style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                    Thank you for applying. We have received your materials. Our management team reviews submissions on a rolling basis and will reach out if there is alignment.
                  </p>
                </motion.div>
              )}

              {showForm && !isSubmitted ? (
                <motion.div
                  id="application-form-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '24px',
                    padding: '3rem',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
                    marginBottom: '3rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                    <div>
                      <div className="dh-label" style={{ color: 'var(--accent-primary)' }}>SUBMIT RESUME</div>
                      <h2 className="dh-heading" style={{ fontSize: '2rem' }}>APPLICATION PROFILE</h2>
                    </div>
                    <button 
                      onClick={() => setShowForm(false)} 
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px', transition: 'color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Personal */}
                    <div>
                      <h3 className="dh-heading" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-faint)', paddingBottom: '0.5rem' }}>
                        1. Personal Details
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="dh-responsive-grid">
                        <div>
                          <label style={labelStyle}>Full Name *</label>
                          <input type="text" required value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} placeholder="Enter your full name" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Email Address *</label>
                          <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="your.email@example.com" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Phone Number *</label>
                          <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 00000 00000" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Current Location</label>
                          <input type="text" value={formData.currentLocation} onChange={e => setFormData({ ...formData, currentLocation: e.target.value })} placeholder="e.g. Gurugram, Haryana" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>LinkedIn URL</label>
                          <input type="url" value={formData.linkedinProfile} onChange={e => setFormData({ ...formData, linkedinProfile: e.target.value })} placeholder="https://linkedin.com/in/..." style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Portfolio Website</label>
                          <input type="url" value={formData.portfolioWebsite} onChange={e => setFormData({ ...formData, portfolioWebsite: e.target.value })} placeholder="https://..." style={inputStyle} />
                        </div>
                      </div>
                    </div>

                    {/* Professional */}
                    <div>
                      <h3 className="dh-heading" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-faint)', paddingBottom: '0.5rem' }}>
                        2. Professional Background
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="dh-responsive-grid">
                        <div>
                          <label style={labelStyle}>Total Experience *</label>
                          <select required value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} style={inputStyle}>
                            <option value="">Select experience</option>
                            <option value="0-1 years">0-1 years</option>
                            <option value="1-3 years">1-3 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="5-10 years">5-10 years</option>
                            <option value="10+ years">10+ years</option>
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>Highest Qualification *</label>
                          <select required value={formData.highestQualification} onChange={e => setFormData({ ...formData, highestQualification: e.target.value })} style={inputStyle}>
                            <option value="">Select qualification</option>
                            <option value="High School">High School</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                            <option value="Master's Degree">Master's Degree</option>
                            <option value="PhD">PhD</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        {formData.highestQualification === "Other" && (
                          <div style={{ gridColumn: 'span 2' }}>
                            <label style={labelStyle}>Specify Qualification *</label>
                            <input type="text" required value={formData.otherQualification} onChange={e => setFormData({ ...formData, otherQualification: e.target.value })} placeholder="Please specify" style={inputStyle} />
                          </div>
                        )}
                        <div>
                          <label style={labelStyle}>Current Designation</label>
                          <input type="text" value={formData.currentDesignation} onChange={e => setFormData({ ...formData, currentDesignation: e.target.value })} placeholder="Job title" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Current Company</label>
                          <input type="text" value={formData.currentCompany} onChange={e => setFormData({ ...formData, currentCompany: e.target.value })} placeholder="Company name" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Current CTC (Annual)</label>
                          <input type="text" value={formData.currentCTC} onChange={e => setFormData({ ...formData, currentCTC: e.target.value })} placeholder="e.g. 6 LPA" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Expected CTC (Annual)</label>
                          <input type="text" value={formData.expectedCTC} onChange={e => setFormData({ ...formData, expectedCTC: e.target.value })} placeholder="e.g. 8 LPA" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Notice Period *</label>
                          <select required value={formData.noticePeriod} onChange={e => setFormData({ ...formData, noticePeriod: e.target.value })} style={inputStyle}>
                            <option value="">Select notice period</option>
                            <option value="Immediate">Immediate</option>
                            <option value="15 days">15 days</option>
                            <option value="1 month">1 month</option>
                            <option value="2 months">2 months</option>
                            <option value="3 months">3 months</option>
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>Willing to Relocate?</label>
                          <div style={{ display: 'flex', gap: '2rem', padding: '10px 0' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                              <input type="radio" name="willingToRelocate" value="Yes" checked={formData.willingToRelocate === "Yes"} onChange={e => setFormData({ ...formData, willingToRelocate: e.target.value })} style={{ accentColor: 'var(--accent-primary)' }} />
                              Yes
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                              <input type="radio" name="willingToRelocate" value="No" checked={formData.willingToRelocate === "No"} onChange={e => setFormData({ ...formData, willingToRelocate: e.target.value })} style={{ accentColor: 'var(--accent-primary)' }} />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Files & Letter */}
                    <div>
                      <h3 className="dh-heading" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-faint)', paddingBottom: '0.5rem' }}>
                        3. Documents & Vision
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                          <label style={labelStyle}>Upload Resume * (PDF/DOC, max 5MB)</label>
                          <input type="file" required accept=".pdf,.doc,.docx" onChange={e => handleFileChange(e, "resume")} id="dh-resume-file" style={{ display: 'none' }} />
                          <label 
                            htmlFor="dh-resume-file" 
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center',
                              padding: '16px', border: '1px dashed var(--border-light)', borderRadius: '10px',
                              background: 'var(--bg-primary)', cursor: 'pointer', transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}
                          >
                            <Upload size={18} style={{ color: 'var(--accent-primary)' }} />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                              {formData.resume ? formData.resume.name : "Click to select a file"}
                            </span>
                          </label>
                        </div>
                        <div>
                          <label style={labelStyle}>Cover Letter / Message (Optional)</label>
                          <textarea rows={4} value={formData.coverLetterText} onChange={e => setFormData({ ...formData, coverLetterText: e.target.value })} placeholder="Tell us why you are a great fit..." style={{ ...inputStyle, resize: 'none' }} />
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                      <button 
                        type="submit" 
                        disabled={submitting} 
                        className="dh-btn-fill" 
                        style={{ flex: 1, justifyContent: 'center', gap: '8px' }}
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            SUBMITTING...
                          </>
                        ) : (
                          "SUBMIT APPLICATION"
                        )}
                      </button>
                      <button 
                        type="button" 
                        disabled={submitting} 
                        onClick={() => setShowForm(false)} 
                        className="dh-btn-ghost"
                        style={{ border: '1px solid var(--border-light)' }}
                      >
                        CANCEL
                      </button>
                    </div>

                  </form>
                </motion.div>
              ) : null}

              <h2 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Job Description</h2>
              <div className="dh-body" style={{ fontSize: '1rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {job.description}
              </div>
            </div>

            {/* Right Col */}
            <div>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '16px', padding: '2rem', position: 'sticky', top: '100px' }}>
                <h3 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Position Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>DEPARTMENT</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{job.department}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>LOCATION</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{job.location}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>EMPLOYMENT TYPE</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{job.type}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>EXPERIENCE</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{job.experience}</div>
                  </div>
                </div>
                <LuxuryLine />
                {!showForm && !isSubmitted && (
                  <button onClick={handleApplyClick} className="dh-btn-fill" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>APPLY NOW</button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DHCareerDetail;
