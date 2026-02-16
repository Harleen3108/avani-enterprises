import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronUp
} from 'lucide-react';
import { motion } from "framer-motion";
import AnimatedSection from '../components/AnimatedSection';

const GetConsultation = () => {
  const whatsappNumber = '919253625099';
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: [],
    message: "",
    otherService: ""
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const services = prev.service.includes(service)
        ? prev.service.filter(s => s !== service)
        : [...prev.service, service];
      return { ...prev, service: services };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    setIsLoading(true);

    // prepare payload to match backend expectations
    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNu: formData.phone,
      service: formData.service.length > 0 ? (formData.service.length === 1 ? formData.service[0] : formData.service.join(', ')) : '',
      companyName: formData.company,
      projectDetails: formData.message,
      otherService: formData.otherService
    };

    // send to backend endpoint expected: POST /api/forms/submit
    (async () => {
      try {
        const res = await fetch(`${API_BASE.replace(/\/$/, '')}/avani-form`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          console.error('Backend error submitting form', res.status, text);
          alert('Unable to submit form to server. Please try again later.');
          return;
        }

        setIsSubmitted(true);
      } catch (err) {
        console.error('Submit error:', err);
        alert('There was an error submitting the form. Please try again.');
      } finally {
        setIsLoading(false);
      }
    })();
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

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-28 md:pb-40 overflow-hidden">
        {/* Curved Background Split */}
        <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-transparent rounded-l-[20rem] transform scale-x-110 translate-x-20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Content - Centered */}
            <span className="text-amber-600 font-bold text-sm tracking-wide mb-2 md:mb-4 block">
              Expert Guidance for Your Business
            </span>

            <motion.h1
              className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-4 md:mb-8 tracking-tight"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {"Book Your ".split("").map((char, index) => (
                <motion.span
                  key={`char-1-${index}`}
                  style={{ display: "inline-block" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <span className="text-amber-500 inline-block">
                {"Consultation.".split("").map((char, index) => (
                  <motion.span
                    key={`char-2-${index}`}
                    style={{ display: "inline-block" }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
              Unlock business growth with a 1:1 session with our senior consultants. Get strategic guidance tailored for your business needs and goals.
            </p>

            <div className="flex flex-col gap-8 mb-8 md:mb-16">
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-6">
                <a
                  href="#consultation-form"
                  className="flex-1 sm:flex-none px-4 py-3 sm:px-10 sm:py-5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm uppercase tracking-widest shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-300 text-center"
                >
                  Book Now
                </a>
                <Link
                  to="/contact"
                  className="flex-1 sm:flex-none px-4 py-3 sm:px-10 sm:py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all duration-300 text-center"
                >
                  Contact Us
                </Link>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-600">Free 30-min Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="consultation-form" className="relative -mt-32 md:-mt-24 z-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Info Card - Order changed to appear second on mobile */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <AnimatedSection animation="fadeInLeft" delay={0.3}>
                <div className="bg-white p-1 rounded-3xl shadow-2xl overflow-hidden group">
                  <div className="bg-slate-900 p-10 rounded-[1.4rem] relative overflow-hidden">
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-500 -translate-x-1/2 -translate-y-1/2 rotate-45" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
                          <img src="/logo0.jpg" alt="Avani Enterprises" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-white font-black uppercase tracking-[0.3em] text-sm">EXPERT SUPPORT</span>
                      </div>

                      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Get in Touch</h2>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">Available 24/7 for you</p>

                      <div className="space-y-6">
                        <a href="tel:+919253625099" className="flex items-center gap-4 group/item">
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-amber-500 group-hover/item:bg-gradient-to-r from-amber-400 to-orange-500 group-hover/item:text-slate-900 transition-all">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone</p>
                            <p className="text-white font-bold text-lg">+91 9253625099</p>
                          </div>
                        </a>

                        <a href="mailto:kp@avanienterprises.in" className="flex items-center gap-4 group/item">
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-amber-500 group-hover/item:bg-gradient-to-r from-amber-400 to-orange-500 group-hover/item:text-slate-900 transition-all">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</p>
                            <p className="text-white font-bold text-lg">kp@avanienterprises.in</p>
                          </div>
                        </a>

                        <a
                          href="https://maps.app.goo.gl/h4wX8BCPpE3BCsg56?g_st=ipc"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 group/item"
                        >
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-amber-500 group-hover/item:bg-gradient-to-r from-amber-400 to-orange-500 group-hover/item:text-slate-900 transition-all">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Office</p>
                            <p className="text-white font-bold leading-tight text-xs">
                              Tower B, 3rd Floor, Unitech Cyber Park, <br />
                              Sector 39, Gurugram, Haryana 122002
                            </p>
                          </div>
                        </a>
                      </div>

                      <div className="mt-12 flex gap-4">
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest text-center hover:bg-white transition-all">
                          WhatsApp
                        </a>
                        <Link to="/contact" className="flex-1 py-4 border border-slate-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest text-center hover:bg-slate-800 transition-all">
                          Contact Expert
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Consultation Benefits */}
              <AnimatedSection animation="fadeInUp" delay={0.4}>
                <div className="bg-amber-50/50 p-8 rounded-3xl border border-amber-100/50">
                  <h4 className="text-slate-900 font-black text-lg mb-4">What You Get</h4>
                  <ul className="space-y-3">
                    {['60-Min Strategy Session', '1:1 Expert Consultation', 'Custom Growth Roadmap', 'Actionable Insights'].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-bold uppercase tracking-tight">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" /> {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Booking Form - Order changed to appear first on mobile */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <AnimatedSection animation="fadeInRight" delay={0.2}>
                <div className="bg-white rounded-[1.5rem] shadow-2xl p-6 md:p-10 border border-slate-100 max-w-xl mx-auto lg:ml-auto lg:mr-0">
                  <div className="mb-8">
                    <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">BOOKING FORM</span>
                    <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Reserve Your Slot</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1 transition-colors group-focus-within:text-amber-500">Full Name *</label>
                        <input
                          type="text" name="name" required value={formData.name} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50/20 border-b border-amber-100 focus:border-amber-500 text-slate-900 font-bold transition-all outline-none text-sm"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1 group-focus-within:text-amber-500">Work Email *</label>
                        <input
                          type="email" name="email" required value={formData.email} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50/20 border-b border-amber-100 focus:border-amber-500 text-slate-900 font-bold transition-all outline-none text-sm"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1 group-focus-within:text-amber-500">Mobile Phone *</label>
                        <input
                          type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50/20 border-b border-amber-100 focus:border-amber-500 text-slate-900 font-bold transition-all outline-none text-sm"
                          placeholder="+91"
                        />
                      </div>
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1 group-focus-within:text-amber-500">Organization</label>
                        <input
                          type="text" name="company" value={formData.company} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50/20 border-b border-amber-100 focus:border-amber-500 text-slate-900 font-bold transition-all outline-none text-sm"
                          placeholder="Company Name"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1 group-focus-within:text-amber-500">Interested Services</label>
                      <div className="relative">
                        <button
                          type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-4 py-3 bg-amber-50/20 border-b border-amber-100 text-left flex justify-between items-center outline-none transition-all focus:border-amber-500"
                        >
                          <span className={`font-bold text-sm ${formData.service.length === 0 ? 'text-slate-400' : 'text-slate-900'}`}>
                            {formData.service.length === 0 ? "Select Services" : `${formData.service.length} Selected`}
                          </span>
                          <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? '' : 'rotate-180'}`} />
                        </button>
                        {isDropdownOpen && (
                          <div className="absolute z-50 mt-2 w-full bg-white shadow-2xl rounded-xl py-2 border border-slate-100 max-h-48 overflow-auto">
                            {services.map((service) => (
                              <div key={service} onClick={() => handleServiceToggle(service)} className="px-4 py-2 hover:bg-amber-50 cursor-pointer flex items-center gap-3">
                                <input type="checkbox" checked={formData.service.includes(service)} readOnly className="w-3.5 h-3.5 text-amber-500 focus:ring-amber-500 border-slate-300 rounded" />
                                <span className="text-xs font-bold text-slate-700">{service}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {formData.service.includes("Other") && (
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1 group-focus-within:text-amber-500">Please Specify Other Service</label>
                        <input
                          type="text" name="otherService" value={formData.otherService} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-amber-50/20 border-b border-amber-100 focus:border-amber-500 text-slate-900 font-bold transition-all outline-none text-sm"
                          placeholder="Describe your service need"
                        />
                      </div>
                    )}

                    <div className="group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1 group-focus-within:text-amber-500">Message</label>
                      <textarea
                        name="message" value={formData.message} onChange={handleInputChange} rows={2}
                        className="w-full px-4 py-3 bg-amber-50/20 border-b border-amber-100 focus:border-amber-500 text-slate-900 font-bold transition-all outline-none resize-none text-sm"
                        placeholder="Brief description of your needs..."
                      />
                    </div>

                    <button
                      type="submit" disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-200/50"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-slate-900/10 border-t-slate-900 rounded-full animate-spin" />
                      ) : (
                        <>Submit <Send className="w-3.5 h-3.5" /></>
                      )}
                    </button>

                    {isSubmitted && (
                      <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg font-bold text-center text-[11px] border border-emerald-100 uppercase tracking-wider">
                        Form submitted successfully!
                      </div>
                    )}
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetConsultation;
