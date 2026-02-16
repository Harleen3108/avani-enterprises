import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Share2, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPostData = async () => {
      try {
        const API_BASE = import.meta.env.VITE_BACKEND_URL;
        const [blogRes, allBlogsRes] = await Promise.all([
          fetch(`${API_BASE}/blogs/${slug}`),
          fetch(`${API_BASE}/blogs`)
        ]);

        const blogJson = await blogRes.json();
        const allBlogsJson = await allBlogsRes.json();

        if (blogJson?.success) {
          setPost(blogJson.data);
        }

        if (allBlogsJson?.success) {
          const filtered = (allBlogsJson.data || [])
            .filter(b => b.slug !== slug && b.isPublished)
            .slice(0, 3);
          setOtherBlogs(filtered);
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to load blog post:", err);
        setLoading(false);
      }
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    };

    if (slug) fetchPostData();
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
          <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs animate-pulse">Loading Journal</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20 px-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <FileText className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Article Not Found</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">The article you are searching for is unavailable. It might have been updated or moved.</p>
          <Link to="/blog" className="inline-flex items-center justify-center w-full py-4 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-xl shadow-amber-200">
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen selection:bg-amber-500 selection:text-white">
      <Helmet>
        <title>{post.title} | Avani Enterprises</title>
        <meta name="description" content={post.excerpt || (post.content ? post.content.substring(0, 160).replace(/<[^>]*>/g, '') : '')} />
      </Helmet>

      {/* Premium Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-50">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 transition-all duration-150 origin-left shadow-[0_0_15px_rgba(245,158,11,0.6)]"
          style={{ transform: `scaleX(${scrollProgress})` }}
        ></div>
      </div>

      <article className="pt-2">
        {/* Modern Editorial Header */}
        <header className="relative pt-32 pb-4 overflow-hidden bg-slate-50/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
            <div className="absolute top-10 left-0 w-72 h-72 bg-amber-400/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-2 mb-8 bg-white border border-slate-100 text-amber-600 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:shadow-md transition-all group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Journal
              </Link>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight uppercase italic mb-8">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-slate-900 font-bold text-xs uppercase tracking-widest">
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                  </span>
                </div>

                <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-900 font-bold text-xs uppercase tracking-widest">Expert Strategic Insights</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </header>

        {/* Featured Image - Overlapping */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-16 relative z-20">
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white group">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Social Share Column (Left Sticky) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-40 flex flex-col items-center gap-6">
                <span className="text-[9px] font-black text-slate-300 uppercase [writing-mode:vertical-lr] rotate-180 tracking-[0.3em]">Share This Post</span>
                <div className="w-px h-12 bg-slate-100"></div>
                <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all shadow-sm hover:-translate-y-1">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Main Body */}
            <div className="lg:col-span-7">
              <AnimatedSection animation="fadeInUp" delay={0.4}>
                <div
                  className="blog-content prose prose-2xl prose-amber max-w-none"
                  style={{
                    fontSize: '1.25rem',
                    lineHeight: '1.8',
                    color: '#1e293b'
                  }}
                >
                  <style>{`
                    .blog-content h1, .blog-content h2, .blog-content h3 {
                      color: #0f172a !important;
                      font-weight: 800 !important;
                      margin-top: 2.5rem !important;
                      margin-bottom: 1.25rem !important;
                      line-height: 1.2 !important;
                      text-transform: uppercase;
                      font-style: italic;
                    }
                    .blog-content p {
                      margin-bottom: 1.5rem !important;
                    }
                    .blog-content img {
                      border-radius: 2rem !important;
                      margin: 3rem 0 !important;
                      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1) !important;
                    }
                    .blog-content blockquote {
                      border-left: 4px solid #f59e0b !important;
                      padding: 1.5rem 2rem !important;
                      background-color: #fffbeb !important;
                      border-radius: 0 1.5rem 1.5rem 0;
                      font-style: italic;
                      font-size: 1.5rem;
                      margin: 2.5rem 0 !important;
                    }
                  `}</style>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </AnimatedSection>

              {/* Author Branding Box */}
              <div className="mt-24 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden group">
                <img src="/logo0.jpg" alt="Watermark" className="absolute -right-10 -bottom-10 w-64 h-64 opacity-[0.03] grayscale transition-transform duration-1000 group-hover:rotate-12" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <img src="/logo0.jpg" alt="Avani Enterprises" className="w-24 h-24 rounded-3xl bg-white p-2 shadow-xl border border-slate-100" />
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-2xl font-black text-slate-900 uppercase italic">Avani Expert Team</h4>
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      This article was prepared by our strategic consulting and technical implementation team. We are dedicated to delivering excellence and measurable growth for your business.
                    </p>
                    <Link to="/contact" className="inline-flex items-center text-amber-600 font-black text-xs uppercase tracking-widest group/link">
                      Schedule a consultation
                      <ArrowLeft className="ml-2 w-4 h-4 rotate-180 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (Right Sticky) */}
            <div className="lg:col-span-4 lg:pl-10">
              <aside className="sticky top-40 space-y-16">

                {/* Professional CTA Card */}
                <AnimatedSection animation="fadeInUp" delay={0.5}>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-amber-500/20 transition-all duration-700"></div>
                    <h3 className="text-3xl font-black mb-4 uppercase leading-tight italic">Growth Roadmap?</h3>
                    <p className="text-slate-300 mb-10 leading-relaxed font-medium">Book a strategic session today to accelerate your digital transformation.</p>
                    <Link
                      to="/get-consultation"
                      className="block w-full py-5 bg-amber-500 text-white rounded-2xl font-black uppercase text-center text-sm tracking-widest hover:bg-amber-600 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      Book Session
                    </Link>
                  </div>
                </AnimatedSection>

                {/* Related Reads */}
                {otherBlogs.length > 0 && (
                  <div className="space-y-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Related Reads</h3>
                      <div className="h-0.5 w-12 bg-amber-100"></div>
                    </div>
                    <div className="space-y-10">
                      {otherBlogs.map((other) => (
                        <Link key={other.slug} to={`/blog/${other.slug}`} className="group flex gap-5 items-center">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-slate-100">
                            <img src={other.featuredImage} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 leading-tight group-hover:text-amber-600 transition-colors line-clamp-2 uppercase text-sm mb-1">
                              {other.title}
                            </h4>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {new Date(other.publishedAt || other.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link to="/blog" className="flex items-center justify-center w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-dashed border-slate-200 hover:border-amber-300 hover:text-amber-600 transition-all">
                      View All Journal Entries
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

export default BlogDetail;
