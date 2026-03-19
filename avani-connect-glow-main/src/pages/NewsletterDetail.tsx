import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBackendUrl } from '../lib/api';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';
import {
  Calendar,
  ArrowLeft,
  Share2,
  Clock,
  ChevronRight,
  Home,
  FileText,
  CheckCircle2
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const NewsletterDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [newsletter, setNewsletter] = useState<any>(null);
  const [otherNewsletters, setOtherNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNewsletter = async () => {
      setLoading(true);
      try {
        const API_BASE = getBackendUrl();
        const [res, allRes] = await Promise.all([
            fetch(`${API_BASE}/newsletters/${slug}`),
            fetch(`${API_BASE}/newsletters`)
        ]);
        
        const json = await res.json();
        const allJson = await allRes.json();

        if (json?.success) setNewsletter(json.data);
        else setError(json?.message || "Newsletter not found");

        if (allJson?.success) {
            const filtered = (allJson.data || [])
              .filter((n: any) => n.slug !== slug)
              .slice(0, 3);
            setOtherNewsletters(filtered);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load newsletter");
      }
      setLoading(false);
    };

    const handleScroll = () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
        setScrollProgress(scroll);
    };

    if (slug) fetchNewsletter();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white pt-20">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-amber-50 border-t-amber-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/logo0.jpg" alt="Loading" className="w-8 h-8 rounded-full" />
              </div>
            </div>
            <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs animate-pulse">Loading Document</p>
          </div>
        </div>
    );
  }

  if (error || !newsletter) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white pt-20 px-4">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-slate-100">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <FileText className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Document Not Found</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">The newsletter you are searching for is unavailable.</p>
            <Link to="/newsletters" className="inline-flex items-center justify-center w-full py-4 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-xl shadow-amber-200">
              Back to Newsletters
            </Link>
          </div>
        </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(newsletter.content);

  return (
    <div className="bg-white min-h-screen selection:bg-amber-500 selection:text-white">
      <Helmet>
        <title>{newsletter.title} | Avani Enterprises Newsletter</title>
      </Helmet>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-50">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 transition-all duration-150 origin-left shadow-[0_0_15px_rgba(245,158,11,0.6)]"
          style={{ transform: `scaleX(${scrollProgress})` }}
        ></div>
      </div>

      <article className="pt-2">
        {/* Editorial Header */}
        <header className="relative pt-32 pb-4 overflow-hidden bg-slate-50/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
            <div className="absolute top-10 left-0 w-72 h-72 bg-amber-400/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <Link
                to="/newsletters"
                className="inline-flex items-center gap-2 px-6 py-2 mb-8 bg-white border border-slate-100 text-amber-600 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:shadow-md transition-all group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Newsletters
              </Link>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
                {newsletter.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-slate-900 font-bold text-xs uppercase tracking-widest">
                    {new Date(newsletter.publishedAt || newsletter.createdAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-900 font-bold text-xs uppercase tracking-widest">Official Update</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </header>

        {/* Featured Image */}
        {newsletter.imageUrl && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-16 relative z-20">
            <AnimatedSection animation="fadeInUp" delay={0.3}>
                <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white group">
                <img
                    src={`${getBackendUrl().replace('/admin', '')}${newsletter.imageUrl}`}
                    alt={newsletter.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                </div>
            </AnimatedSection>
            </div>
        )}

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* article content */}
            <div className="lg:col-span-8">
              <AnimatedSection animation="fadeInUp" delay={0.4}>
                <div
                  className="newsletter-content prose prose-2xl prose-amber max-w-none shadow-sm p-8 md:p-12 rounded-[2rem] bg-white border border-slate-50"
                  style={{
                    fontSize: '1.25rem',
                    lineHeight: '1.8',
                    color: '#1e293b'
                  }}
                >
                  <style>{`
                    .newsletter-content h1, .newsletter-content h2, .newsletter-content h3 {
                      color: #0f172a !important;
                      font-weight: 800 !important;
                      margin-top: 2.5rem !important;
                      margin-bottom: 1.25rem !important;
                      line-height: 1.2 !important;
                    }
                    .newsletter-content p {
                      margin-bottom: 1.5rem !important;
                    }
                    .newsletter-content img {
                      border-radius: 2rem !important;
                      margin: 3rem 0 !important;
                      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1) !important;
                    }
                  `}</style>
                  <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </div>
              </AnimatedSection>

              {/* Author Branding */}
              <div className="mt-24 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <img src="/logo0.jpg" alt="Avani Enterprises" className="w-24 h-24 rounded-3xl bg-white p-2 shadow-xl border border-slate-100" />
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 mb-3">Avani Enterprises</h4>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      Official newsletter and strategic updates from the Avani Enterprises team.
                    </p>
                    <Link to="/contact" className="inline-flex items-center text-amber-600 font-black text-xs uppercase tracking-widest group/link">
                      Contact support
                      <ArrowLeft className="ml-2 w-4 h-4 rotate-180 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (Right Sticky) */}
            <div className="lg:col-span-4 lg:pl-10">
              <aside className="sticky top-40 space-y-16">
                {/* Related Newsletters */}
                {otherNewsletters.length > 0 && (
                  <div className="space-y-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Related Newsletters</h3>
                      <div className="h-0.5 w-12 bg-amber-100"></div>
                    </div>
                    <div className="space-y-8">
                      {otherNewsletters.map((n: any) => (
                        <Link key={n.slug} to={`/newsletters/${n.slug}`} className="group flex gap-5 items-center">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-slate-100">
                            <img src={n.imageUrl ? `${getBackendUrl().replace('/admin', '')}${n.imageUrl}` : "https://via.placeholder.com/400x225?text=Newsletter"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 leading-tight group-hover:text-amber-600 transition-colors line-clamp-2 text-sm mb-1">
                                {n.title}
                            </h4>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Calendar size={12} className="text-amber-500" />
                                {new Date(n.publishedAt || n.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link to="/newsletters" className="flex items-center justify-center w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-dashed border-slate-200 hover:border-amber-300 hover:text-amber-600 transition-all">
                      View All Newsletters
                    </Link>
                  </div>
                )}
              </aside>
            </div>

          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsletterDetail;
