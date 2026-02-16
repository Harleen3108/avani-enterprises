import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import RotatingText from '../components/RotatingText';
import { API_BASE_URL } from '../utils/api';
import {
  Users,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Code,
  Palette,
  TrendingUp,
  Search,
  Building2,
  Target,
  Award,
  Heart,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  status: string;
  image?: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [activeLocation, setActiveLocation] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const departments = [
    { id: 'all', name: 'All Departments', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'development', name: 'Development', icon: <Code className="w-5 h-5" /> },
    { id: 'design', name: 'Design', icon: <Palette className="w-5 h-5" /> },
    { id: 'marketing', name: 'Marketing', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'business', name: 'Business', icon: <Building2 className="w-5 h-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <Target className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/jobs`);
        setJobs(response.data.data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = activeDepartment === 'all' || job.department.toLowerCase() === activeDepartment;
    const matchesLocation = activeLocation === 'all' || job.location.toLowerCase().includes(activeLocation.toLowerCase());
    const matchesType = activeType === 'all' || job.type.toLowerCase() === activeType;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesLocation && matchesType && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      active: { bg: 'bg-green-500', text: 'text-white', label: 'Active' },
      filled: { bg: 'bg-gray-500', text: 'text-white', label: 'Filled' },
      closed: { bg: 'bg-red-500', text: 'text-white', label: 'Closed' }
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.active;
    return (
      <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg`}>
        {config.label}
      </span>
    );
  };

  const getJobImage = (department: string) => {
    const images: Record<string, string> = {
      development: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      design: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      marketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      business: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    };
    return images[department.toLowerCase()] || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop';
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="text-center">
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Join Our Team of{" "}
                <RotatingText
                  words={[
                    "Developers",
                    "Designers",
                    "Marketers",
                    "Analysts",
                    "Innovators",
                    "Leaders"
                  ]}
                  interval={2500}
                  className="text-amber-500"
                />
              </motion.h1>
              <motion.p
                className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                Discover exciting career opportunities and be part of a team that's
                shaping the future of technology and innovation.
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-2 md:gap-4">
              {departments.map((department) => (
                <button
                  key={department.id}
                  onClick={() => setActiveDepartment(department.id)}
                  className={`flex flex-col lg:flex-row items-center justify-center space-y-1 lg:space-y-0 lg:space-x-2 px-2 py-2.5 lg:px-4 lg:py-2 rounded-lg font-bold transition-all duration-300 ${activeDepartment === department.id
                    ? 'bg-amber-500 text-white shadow-lg transform -translate-y-0.5'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <div className="scale-75 lg:scale-100">{department.icon}</div>
                  <span className="text-[10px] lg:text-sm tracking-tight lg:tracking-normal line-clamp-1">{department.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <select
                value={activeLocation}
                onChange={(e) => setActiveLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-white text-gray-900 font-medium"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
                <option value="hyderabad">Hyderabad</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <select
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-white text-gray-900 font-medium"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Grid with Creative Light Background */}
      <section className="relative py-24 overflow-hidden bg-[#fefaf6]">
        {/* Creative Background Design */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-transparent" />
          
          {/* Large Decorative Blobs */}
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/30 to-amber-200/30 blur-[120px] rounded-full" />
          
          {/* Subtle Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
              <p className="text-slate-900 mt-4 font-bold">Loading opportunities...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map((job, index) => (
                <AnimatedSection key={job._id} animation="fadeInUp" delay={0.4 + (index * 0.1)}>
                  <div 
                    className="group flex flex-col bg-white rounded-[2rem] shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full cursor-pointer"
                    onClick={() => navigate(`/careers/${job._id}`)}
                  >
                    {/* Thumbnail Section */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={job.image || getJobImage(job.department)}
                        alt={job.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                      {/* Department Overlay */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                          {job.department}
                        </span>
                      </div>

                      {/* Status Badge Overlay */}
                      <div className="absolute bottom-4 right-4">
                        {getStatusBadge(job.status)}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight group-hover:text-amber-600 transition-colors h-14 line-clamp-2">
                        {job.title}
                      </h3>
                      <p className="text-slate-500 text-[13px] leading-relaxed mb-4 line-clamp-2 h-10 font-medium">
                        {job.description}
                      </p>

                      {/* Bento Info Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2 border border-slate-100">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{job.location}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2 border border-slate-100">
                          <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{job.type}</span>
                        </div>
                      </div>

                      {/* Experience Block */}
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-100/50 mb-5">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-black text-amber-700">Experience: {job.experience}</span>
                        </div>
                      </div>

                      {/* Mini Job Details Footer */}
                      <div className="mt-auto space-y-4 pt-2 border-t border-slate-50">
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-slate-400">
                          <div className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-emerald-500 mr-1.5" />
                            <span>Department: {job.department}</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-emerald-500 mr-1.5" />
                            <span>Type: {job.type}</span>
                          </div>
                        </div>

                        {/* Call to Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/careers/${job._id}`);
                            }}
                            className="flex-1 text-center py-2.5 px-3 rounded-xl text-[12px] font-black text-amber-600 border border-amber-100 hover:bg-amber-50 transition-all duration-300 uppercase tracking-wider"
                          >
                            View Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/careers/${job._id}`);
                            }}
                            className="flex-[1.5] text-center py-2.5 px-3 rounded-xl text-[12px] font-black text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:shadow-amber-200 transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-1"
                          >
                            Apply Now
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {!loading && filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-slate-900 text-lg font-bold">
                No jobs found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Join Us Benefits - Creative Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-100/40 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                  Join Our Team
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Why Join Us?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                We provide a dynamic work environment with competitive benefits and endless growth opportunities.
              </p>
            </div>
          </AnimatedSection>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Benefit 1 */}
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                {/* Decorative Number */}
                <div className="absolute top-4 right-4 text-[60px] font-black text-amber-500/30 leading-none">01</div>
                
                <div className="relative z-10">
                  {/* Accent Bar */}
                  <div className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6" />
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    Career Growth
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Continuous learning and advancement opportunities with mentorship programs, skill development workshops, and clear career progression paths.
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-3xl transition-all duration-500" />
              </div>
            </AnimatedSection>

            {/* Benefit 2 */}
            <AnimatedSection animation="fadeInUp" delay={0.3}>
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                {/* Decorative Number */}
                <div className="absolute top-4 right-4 text-[60px] font-black text-amber-500/30 leading-none">02</div>
                
                <div className="relative z-10">
                  {/* Accent Bar */}
                  <div className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6" />
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    Great Team
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Work with talented and passionate professionals who are committed to excellence and collaborative success in every project.
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-3xl transition-all duration-500" />
              </div>
            </AnimatedSection>

            {/* Benefit 3 */}
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                {/* Decorative Number */}
                <div className="absolute top-4 right-4 text-[60px] font-black text-amber-500/30 leading-none">03</div>
                
                <div className="relative z-10">
                  {/* Accent Bar */}
                  <div className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6" />
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    Work-Life Balance
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Flexible hours and remote work options available to ensure you maintain a healthy balance between professional and personal life.
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-3xl transition-all duration-500" />
              </div>
            </AnimatedSection>

            {/* Benefit 4 */}
            <AnimatedSection animation="fadeInUp" delay={0.5}>
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                {/* Decorative Number */}
                <div className="absolute top-4 right-4 text-[60px] font-black text-amber-500/30 leading-none">04</div>
                
                <div className="relative z-10">
                  {/* Accent Bar */}
                  <div className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6" />
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    Competitive Pay
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Industry-leading compensation and benefits package including health insurance, performance bonuses, and comprehensive perks.
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-3xl transition-all duration-500" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 font-sans leading-tight">
            Let's Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Success Story</span> Together
          </h2>
          <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Partner with us to unlock growth opportunities, streamline operations, and achieve your business vision with expert guidance every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/get-consultation')}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl font-black uppercase tracking-widest shadow-lg transition-all duration-300"
            >
              Get Consultation
            </button>
            <a
              href="tel:+919253625099"
              className="bg-slate-100 text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-slate-200 hover:border-slate-300 transition-all duration-300"
            >
              Talk to Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
