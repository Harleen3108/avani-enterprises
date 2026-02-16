import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Building2,
  Clock,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Upload,
  Loader2,
  XCircle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { API_BASE_URL } from "../utils/api";

const CareerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    coverLetter: null as File | null,
    coverLetterText: "",
    howDidYouHear: "",
    willingToRelocate: "",
    additionalComments: "",
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      // Fetch from public endpoint
      const res = await axios.get(
        `${API_BASE_URL}/jobs/${id}`
      );
      setJob(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch job", err);
      setJob(null);
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
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
      if (formData.coverLetter) {
        data.append("coverLetter", formData.coverLetter);
      }

      const response = await axios.post(`${API_BASE_URL}/applications`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsSubmitted(true);
      setShowForm(false);
      // Use instant scroll for a "no-scroll" feel
      setTimeout(() => {
        const successElem = document.getElementById('application-success');
        if (successElem) {
          successElem.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 50);
    } catch (err: any) {
      console.error("Failed to submit application", err);
      alert(err.response?.data?.message || "Failed to submit application. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fefaf6] flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#fefaf6] flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Job not found</p>
          <button
            onClick={() => navigate("/careers")}
            className="text-amber-600 hover:text-amber-700 transition-colors font-bold"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const isActive = job.status === "Active" && job.isActive;
  const isFilled = job.status === "Filled";

  return (
    <>
      <Helmet>
        <title>{job.title} - Careers | Avani Enterprises</title>
        <meta name="description" content={job.description} />
      </Helmet>

      <div className="min-h-screen bg-[#fefaf6] pt-20 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-transparent" />
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/30 to-amber-200/30 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/careers")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors font-bold"
          >
            <ArrowLeft size={20} />
            Back to Careers
          </motion.button>

          {/* Job Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-8">
              <div className="p-4 md:p-5 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl shrink-0">
                <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                    {job.title}
                  </h1>
                  <div className="flex shrink-0">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 whitespace-nowrap">
                        <CheckCircle size={14} />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">
                        {isFilled ? "Position Filled" : "Closed"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Building2 className="w-4 h-4 text-amber-500" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {job.type}
                  </span>
                  {job.experience && (
                    <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      {job.experience}
                    </span>
                  )}
                </div>
              </div>
            </div>



            {!showForm && !isSubmitted && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 
                  rounded-2xl hover:from-amber-500 hover:to-orange-600 transition-all shadow-lg 
                  shadow-amber-500/20 font-bold text-lg"
              >
                Apply for this Position
              </button>
            )}

            {!isActive && !isSubmitted && (
              <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-center text-sm text-amber-400">
                {isFilled ? "This position has been filled, but you can still apply for future opportunities" : "This position is closed, but you can still submit your application"}
              </div>
            )}
          </motion.div>

          {/* Job Details */}
          {!showForm && (
            <div className="space-y-6">
              {job.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Job Description
                  </h2>
                  <p className="text-slate-600 whitespace-pre-wrap leading-relaxed font-medium">
                    {job.description}
                  </p>
                </motion.div>
              )}

              {job.responsibilities && job.responsibilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Responsibilities
                  </h2>
                  <ul className="space-y-3 text-slate-600 font-medium">
                    {(Array.isArray(job.responsibilities)
                      ? job.responsibilities
                      : job.responsibilities.split("\n")
                    ).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1 text-lg">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {job.qualifications && job.qualifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Qualifications
                  </h2>
                  <ul className="space-y-3 text-slate-600 font-medium">
                    {(Array.isArray(job.qualifications)
                      ? job.qualifications
                      : job.qualifications.split("\n")
                    ).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-amber-500 mt-1 text-lg">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {job.skills && job.skills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Skills Required
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {(Array.isArray(job.skills)
                      ? job.skills
                      : job.skills.split(",")
                    ).map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full border border-amber-500/30"
                      >
                        {typeof skill === 'string' ? skill.trim() : skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Benefits
                  </h2>
                  <ul className="space-y-3 text-slate-600 font-medium">
                    {(Array.isArray(job.benefits)
                      ? job.benefits
                      : job.benefits.split("\n")
                    ).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-emerald-500 mt-1 text-lg">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          )}

          {/* Application Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-3xl p-6 md:p-10"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Apply for {job.title}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  Fill out the form below to submit your application
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all"
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current Location (City, State)
                      </label>
                      <input
                        type="text"
                        value={formData.currentLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, currentLocation: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all"
                        placeholder="e.g., Mumbai, Maharashtra"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={formData.linkedinProfile}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedinProfile: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Portfolio/Website
                      </label>
                      <input
                        type="url"
                        value={formData.portfolioWebsite}
                        onChange={(e) =>
                          setFormData({ ...formData, portfolioWebsite: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Position Applied For *
                      </label>
                      <input
                        type="text"
                        required
                        value={job?.title || ""}
                        disabled
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Total Years of Experience *
                      </label>
                      <select
                        required
                        value={formData.experience}
                        onChange={(e) =>
                          setFormData({ ...formData, experience: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-white">Select experience</option>
                        <option value="0-1 years" className="bg-white">0-1 years</option>
                        <option value="1-3 years" className="bg-white">1-3 years</option>
                        <option value="3-5 years" className="bg-white">3-5 years</option>
                        <option value="5-10 years" className="bg-white">5-10 years</option>
                        <option value="10+ years" className="bg-white">10+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Highest Qualification *
                      </label>
                      <select
                        required
                        value={formData.highestQualification}
                        onChange={(e) =>
                          setFormData({ ...formData, highestQualification: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-white">Select qualification</option>
                        <option value="High School" className="bg-white">High School</option>
                        <option value="Diploma" className="bg-white">Diploma</option>
                        <option value="Bachelor's Degree" className="bg-white">Bachelor's Degree</option>
                        <option value="Master's Degree" className="bg-white">Master's Degree</option>
                        <option value="PhD" className="bg-white">PhD</option>
                        <option value="Other" className="bg-white">Other</option>
                      </select>
                    </div>

                    {formData.highestQualification === "Other" && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Please specify your qualification *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.otherQualification}
                          onChange={(e) =>
                            setFormData({ ...formData, otherQualification: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                            text-slate-900 placeholder-slate-400 transition-all"
                          placeholder="e.g., Professional Certification, Trade School, etc."
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current/Last Company
                      </label>
                      <input
                        type="text"
                        value={formData.currentCompany}
                        onChange={(e) =>
                          setFormData({ ...formData, currentCompany: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50
                          text-white placeholder-slate-500 transition-all"
                        placeholder="Company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current/Last Designation
                      </label>
                      <input
                        type="text"
                        value={formData.currentDesignation}
                        onChange={(e) =>
                          setFormData({ ...formData, currentDesignation: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all"
                        placeholder="Your job title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current CTC (Annual)
                      </label>
                      <input
                        type="text"
                        value={formData.currentCTC}
                        onChange={(e) =>
                          setFormData({ ...formData, currentCTC: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all"
                        placeholder="e.g., 5 LPA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Expected CTC (Annual)
                      </label>
                      <input
                        type="text"
                        value={formData.expectedCTC}
                        onChange={(e) =>
                          setFormData({ ...formData, expectedCTC: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all"
                        placeholder="e.g., 7 LPA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Notice Period *
                      </label>
                      <select
                        required
                        value={formData.noticePeriod}
                        onChange={(e) =>
                          setFormData({ ...formData, noticePeriod: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-white">Select notice period</option>
                        <option value="Immediate" className="bg-white">Immediate</option>
                        <option value="15 days" className="bg-white">15 days</option>
                        <option value="1 month" className="bg-white">1 month</option>
                        <option value="2 months" className="bg-white">2 months</option>
                        <option value="3 months" className="bg-white">3 months</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                    Documents
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Upload Resume * (PDF/DOC, max 5MB)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, "resume")}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-amber-500/50 transition-all cursor-pointer bg-slate-50 hover:bg-slate-100"
                        >
                          <Upload size={20} className="text-slate-400" />
                          <span className="text-sm text-slate-600 font-medium">
                            {formData.resume
                              ? formData.resume.name
                              : "Click to upload resume"}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Upload Cover Letter (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, "coverLetter")}
                          className="hidden"
                          id="cover-letter-upload"
                        />
                        <label
                          htmlFor="cover-letter-upload"
                          className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-amber-500/50 transition-all cursor-pointer bg-slate-50 hover:bg-slate-100"
                        >
                          <Upload size={20} className="text-slate-400" />
                          <span className="text-sm text-slate-600 font-medium">
                            {formData.coverLetter
                              ? formData.coverLetter.name
                              : "Click to upload cover letter"}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Or Write Cover Letter (Optional)
                      </label>
                      <textarea
                        rows={4}
                        value={formData.coverLetterText}
                        onChange={(e) =>
                          setFormData({ ...formData, coverLetterText: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all resize-none"
                        placeholder="Write your cover letter here..."
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                    Additional Information
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        value={formData.howDidYouHear}
                        onChange={(e) =>
                          setFormData({ ...formData, howDidYouHear: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-white">Select an option</option>
                        <option value="LinkedIn" className="bg-white">LinkedIn</option>
                        <option value="Job Portal" className="bg-white">Job Portal (Naukri, Indeed, etc.)</option>
                        <option value="Company Website" className="bg-white">Company Website</option>
                        <option value="Referral" className="bg-white">Referral</option>
                        <option value="Social Media" className="bg-white">Social Media</option>
                        <option value="Other" className="bg-white">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Are you willing to relocate?
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="relocate"
                            value="Yes"
                            checked={formData.willingToRelocate === "Yes"}
                            onChange={(e) =>
                              setFormData({ ...formData, willingToRelocate: e.target.value })
                            }
                            className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-sm text-slate-600 font-medium">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="relocate"
                            value="No"
                            checked={formData.willingToRelocate === "No"}
                            onChange={(e) =>
                              setFormData({ ...formData, willingToRelocate: e.target.value })
                            }
                            className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-sm text-slate-600 font-medium">No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Additional Comments/Message
                      </label>
                      <textarea
                        rows={4}
                        value={formData.additionalComments}
                        onChange={(e) =>
                          setFormData({ ...formData, additionalComments: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                          text-slate-900 placeholder-slate-400 transition-all resize-none"
                        placeholder="Any additional information you'd like to share..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 
                      rounded-2xl hover:from-amber-500 hover:to-orange-600 transition-all shadow-lg 
                      shadow-amber-500/20 font-bold disabled:opacity-50 disabled:cursor-not-allowed 
                      flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={submitting}
                    className="px-8 py-4 border border-slate-200 rounded-2xl hover:bg-slate-50 
                      transition-all disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {isSubmitted && (
            <motion.div
              id="application-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="scroll-mt-32 mt-6 p-10 md:p-16 bg-emerald-50 text-emerald-700 rounded-3xl font-bold text-center border-2 border-emerald-200 uppercase tracking-widest shadow-2xl min-h-[300px] flex flex-col items-center justify-center"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8 md:w-10 md:h-10" />
                <span className="text-xl md:text-2xl font-black">Application Submitted!</span>
              </div>
              <p className="text-sm md:text-lg font-bold opacity-90 max-w-2xl mx-auto normal-case">
                Thank you for applying. We have received your application and will review it meticulously.
                Our team will reach out to you if your profile matches our requirements.
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
};

export default CareerDetail;
