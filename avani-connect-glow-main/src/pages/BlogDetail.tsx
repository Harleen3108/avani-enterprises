import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogCover } from '../lib/blogCover';
import { ArrowLeft, Calendar, Share2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBackendUrl } from '../lib/api';
import { EngagementRail, CommentsSection } from '../components/blog/BlogEngagement';
import { useRelatedPosts, RelatedRail, RelatedGrid } from '../components/blog/RelatedArticles';
import BusinessSetup3Form from '../components/BusinessSetup3Form';
import { KeyTakeaways, FaqAccordion } from '../components/blog/BlogAeoBlocks';
import Prose from '../components/blog/Prose';
import CoverArt from '../components/blog/CoverArt';

/** Matches the article surface in blogFormat.js PROSE_CSS. */
const PAPER = '#FFFDF9';
import '../components/Home.css';
import ServiceLeadForm from '../components/ServiceLeadForm';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const backendUrl = getBackendUrl();
        const response = await fetch(`${backendUrl}/blogs/${encodeURIComponent(slug || '')}`);
        const data = await response.json();
        if (data.success) setBlog(data.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  // Called before the early returns below — hooks must run in the same order on
  // every render, and `blog` is null on the first pass. The hook tolerates an
  // empty category and simply falls back to the most recent posts.
  const blogCategory =
    (blog?.category && typeof blog.category === 'object' ? blog.category.name : blog?.category) || 'Insights';
  const related = useRelatedPosts(slug || '', String(blogCategory));

  if (loading) {
    return (
      <div className="dh-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-light)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="dh-page" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <h1 className="dh-display">Article Not Found</h1>
        <Link to="/blog" className="dh-btn-ghost" style={{ marginTop: '2rem' }}><ArrowLeft size={14} style={{ marginRight: '8px' }} /> Return to Insights</Link>
      </div>
    );
  }

  const backendUrl = getBackendUrl();
  // blogCover() falls back to a category photo, so recent drip posts without a
  // featuredImage stop shipping a blank og:image and a coverless hero.
  const cover = blogCover(blog);
  const imageUrl = cover.startsWith('http') ? cover : cover.startsWith('/') ? `https://www.avanienterprises.in${cover}` : `${backendUrl}${cover}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.metaDescription || blog.title,
    image: imageUrl || 'https://www.avanienterprises.in/logo.png',
    author: {
      '@type': 'Person',
      '@id': 'https://www.avanienterprises.in/#kapil-khandelwal',
      name: blog.author || 'Kapil Khandelwal',
      url: 'https://www.linkedin.com/in/kapil-khandelwal-avani/'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.avanienterprises.in/#organization',
      name: 'Avani Enterprises',
      logo: { '@type': 'ImageObject', url: 'https://www.avanienterprises.in/logo0.webp', width: 200, height: 60 }
    },
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.avanienterprises.in/blog/${encodeURIComponent(slug || '')}` },
    keywords: Array.isArray(blog.tags) ? blog.tags.join(', ') : undefined
  };

  // FAQPage schema from the post's own stored FAQs. Only emitted when they
  // exist, so schema can never describe questions that are not on the page.
  const faqLd = Array.isArray(blog.faqs) && blog.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: blog.faqs.map((f: { q: string; a: string }) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const canonical = blog.canonical || `https://www.avanienterprises.in/blog/${encodeURIComponent(slug || '')}`;

  return (
    <div className="dh-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Helmet>
        {blog.metaTitle ? <title>{blog.metaTitle}</title> : null}
        {blog.metaDescription ? <meta name="description" content={blog.metaDescription} /> : null}
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        {faqLd ? <script type="application/ld+json">{JSON.stringify(faqLd)}</script> : null}
      </Helmet>
      {/* Article Header */}
      <section style={{ paddingTop: '7rem', paddingBottom: '2rem', position: 'relative' }}>
        <div className="dh-container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ArrowLeft size={14} /> Back to Insights
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} />
                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {blog.readTime && <span>· {blog.readTime} min read</span>}
            </div>

            <h1 className="dh-display" style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.7rem)', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              {blog.title}
            </h1>

            {blog.tags && blog.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {blog.tags.map((tag: string, idx: number) => (
                  <span key={idx} style={{ padding: '0.4rem 1rem', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Tag size={10} style={{ color: 'var(--accent-primary)' }}/> {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured image — the transition from the dark hero onto the light
          article surface. Sitting on its own dark strip between the two left a
          band of black between two sections and made the white body look like a
          floating fragment, which is the thing being fixed. */}
      {/* Always rendered. Previously the whole block was skipped when a post had
          no image, which dropped the hero straight onto the body and lost the
          transition between the dark header and the light article. */}
      <section style={{ background: `linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-primary) 45%, ${PAPER} 45%, ${PAPER} 100%)`, paddingTop: '2rem' }}>
        <div className="dh-container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/9', boxShadow: '0 24px 55px rgba(0,0,0,0.38)', background: '#221C17' }}
          >
            {cover ? (
              <img src={imageUrl} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <CoverArt title={blog.title} category={String(blogCategory)} slug={slug} />
            )}
          </motion.div>
        </div>
      </section>

      {/* Article body
          -------------
          The white surface is now the SECTION, not a card floating inside a dark
          one. A cream card on a black page reads as a fragment; edge-to-edge
          light reads as a document, which is what an article is.

          Two columns from 1080px up: the article, and a sticky rail carrying
          engagement and related posts. Below that width the rail stacks under
          the article, because a 260px sidebar on a phone is just wasted rows. */}
      <section style={{ background: PAPER, paddingTop: '3rem', paddingBottom: '4.5rem' }}>
        <div
          className="dh-container blog-body-grid"
          style={{ maxWidth: '1240px', margin: '0 auto' }}
        >
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.25 }}>
            {/* Takeaways sit above the body — the block readers skim and AI
                answer engines lift. Renders only when the post stores them. */}
            <KeyTakeaways items={blog.keyTakeaways} />

            {/* Body and its stylesheet are one component on purpose — see
                Prose.tsx. Rendering the markup without the styles is what broke
                this page, and it failed silently. */}
            <Prose content={blog.content} title={blog.title} selfPath={`/blog/${slug}`} />

            {/* FAQ accordion from stored fields, matched by the FAQPage schema
                emitted above. Older posts keep their FAQs inside the body. */}
            <FaqAccordion items={blog.faqs} />

            {/* Conversion: every post ends with the lead form. generate_lead
                fires on submit carrying this post's path as attribution, so GA4
                shows which articles actually produce enquiries.
                Kept dark deliberately — it is the one element that should
                interrupt the reading surface. */}
            <section
              id="consultation"
              style={{
                margin: '3rem 0 0',
                background: '#12101A', borderRadius: '18px',
                padding: 'clamp(20px, 4vw, 30px)', scrollMarginTop: 90,
              }}
            >
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', fontWeight: 800, margin: '0 0 .4rem', color: '#fff' }}>
                Want this looked at for your business?
              </h2>
              <p style={{ fontSize: '.92rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
                Tell us your goal and we will come back with a written scope — no obligation, and we will
                say plainly if we are not the right fit.
              </p>
              <BusinessSetup3Form source={`blog:${slug}`} />
            </section>

            <div style={{ marginTop: '3rem' }}>
              <CommentsSection slug={slug || ''} />
            </div>

            <RelatedGrid posts={related} />
          </motion.div>

          {/* Sticky rail. Engagement moved here from below the article: a like
              button under 1,400 words is a like button nobody reaches. */}
          <aside className="blog-rail">
            <div style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <EngagementRail slug={slug || ''} views={blog.views} />
              <RelatedRail posts={related} />
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .blog-body-grid { display: block; }
        .blog-rail { margin-top: 2.5rem; }
        @media (min-width: 1080px) {
          .blog-body-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 290px;
            gap: 56px;
            align-items: start;
          }
          .blog-rail { margin-top: 0; }
        }
        /* Wider measure than the default 44rem: with a rail beside it the
           column is constrained by the grid, so the article can use the room. */
        .blog-body-grid .avani-article { max-width: 100%; }
        .blog-body-grid .avani-article > * { max-width: 54rem; }
        .blog-body-grid .avani-article .article-table-wrap,
        .blog-body-grid .avani-article .post-cta { max-width: 100%; }
      `}</style>

      {/* Lead capture. Short by design — nobody working through this page came
          to fill in a form, so it asks for a name, a number and a rough
          direction. The full service list is one click away for anyone who
          wants it. */}
      <section className="theme-beige" style={{ position: 'relative', padding: '80px 0', background: 'var(--bg-primary)' }}>
        <div className="dh-container">
          <div className="slf-page-cta">
            <div>
              <span className="dh-label">Work with us</span>
              <h2 className="dh-display" style={{ fontSize: 'clamp(1.7rem, 4.2vw, 2.6rem)', margin: '.5rem 0 1rem', lineHeight: 1.12 }}>
                Want help with this?
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.72, color: 'var(--text-secondary)', margin: 0, maxWidth: '50ch' }}>
                If this is a problem you are dealing with right now, tell us and we will give you a straight answer on whether we can fix it.
              </p>
            </div>
            <ServiceLeadForm source="blog_post" heading="Request a call back" sub="One working day, no obligation." variant="inline" compact />
          </div>
        </div>
        <style>{`
          .slf-page-cta {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 400px);
            gap: 3rem;
            align-items: center;
          }
          @media (max-width: 900px) {
            .slf-page-cta { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
          }
        `}</style>
      </section>

    </div>
  );
};

export default BlogDetail;
