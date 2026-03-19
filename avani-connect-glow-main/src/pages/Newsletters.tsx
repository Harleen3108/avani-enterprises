import React, { useState, useEffect } from 'react';
import { getBackendUrl } from '../lib/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  ArrowRight,
  Search,
  Mail,
  Newspaper,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Newsletters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsletters = async () => {
      setLoading(true);
      try {
        const API_BASE = getBackendUrl();
        const res = await fetch(`${API_BASE}/newsletters`);
        const json = await res.json();
        if (json?.success) setNewsletters(json.data || []);
        else setError(json?.message || "Failed to load newsletters");
      } catch (err: any) {
        setError(err.message || "Failed to load newsletters");
      }
      setLoading(false);
    };
    fetchNewsletters();
  }, []);

  const filteredNewsletters = newsletters.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Hero Section - Matching Blog Theme */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/30 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="text-center">
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Our <span className="text-amber-500">Newsletters</span>
              </motion.h1>
              <motion.p
                className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                Stay updated with our latest expert insights, strategic updates, and industrial milestones delivered straight to you.
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-slate-100 max-w-2xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                    type="text"
                    placeholder="Search newsletters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-b-2 border-slate-200 focus:border-amber-500 text-slate-900 font-bold transition-all outline-none rounded-lg"
                    />
                </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* List Section */}
      <section className="py-20 bg-white min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="flex items-center gap-3 mb-12">
              <Sparkles className="w-8 h-8 text-amber-500" />
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Featured Updates</h2>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Loading Knowledge Base...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 font-bold">{error}</p>
            </div>
          ) : filteredNewsletters.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-bold">No newsletters found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNewsletters.map((n, index) => (
                <AnimatedSection key={n._id} animation="fadeInUp" delay={index * 0.05}>
                  <article className="group bg-slate-50 rounded-[1.5rem] shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-amber-500 h-full flex flex-col">
                    <div className="relative overflow-hidden h-64">
                      <Link to={`/newsletters/${n.slug}`}>
                        <img
                          src={n.imageUrl ? `${getBackendUrl().replace('/admin', '')}${n.imageUrl}` : "https://placehold.co/800x450?text=Newsletter"}
                          alt={n.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e: any) => e.target.src = "https://placehold.co/800x450?text=Newsletter"}
                        />
                      </Link>
                      <div className="absolute top-4 left-4">
                        <span className="bg-slate-900 text-amber-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg">
                           Newsletter
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center text-[10px] text-slate-500 mb-4 font-bold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-amber-500" />
                        {new Date(n.publishedAt || n.createdAt).toLocaleDateString()}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-amber-500 transition-colors line-clamp-2 leading-tight">
                        {n.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-200">
                        <Link to={`/newsletters/${n.slug}`} className="text-slate-900 hover:text-amber-500 font-black text-[10px] uppercase tracking-wider flex items-center transition-colors">
                          Read Newsletter <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscription Section */}
      <section className="pt-12 pb-24 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-amber-500/20 transition-all duration-700" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                        Don't Miss our <span className="text-amber-500">Next Update</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-xl font-medium">
                        Join our community of industry leaders and get the latest strategic insights delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-500 text-white font-bold"
                        />
                        <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all">
                            Subscribe
                        </button>
                    </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Newsletters;
