/**
 * blogCover — one rule for what image a blog post shows, everywhere.
 *
 * 52 of 57 posts carry a real Cloudinary featured image. The five that do not
 * are the most recent drip posts — which sort to the top of /blog, so the first
 * screen of the blog was all placeholder gradients and the section read as
 * unfinished. Every future drip post without an image would have joined them.
 *
 * The fallback is a real photograph per category, self-hosted in
 * /public/blog-covers (downloaded once and optimised — never hotlinked, so no
 * third-party host sits on the render path). Used by the blog list, the post
 * page, the homepage blog strip, and the SSR snapshot for og:image.
 */

const CATEGORY_COVERS: Record<string, string> = {
  'seo': '/blog-covers/seo.webp',
  'ai': '/blog-covers/ai.webp',
  'business': '/blog-covers/business.webp',
  'digital marketing': '/blog-covers/digital-marketing.webp',
  'business os': '/blog-covers/business-os.webp',
  'social media': '/blog-covers/social-media.webp',
  'web development': '/blog-covers/web-development.webp',
  'insights': '/blog-covers/insights.webp',
};

export interface CoverSource {
  featuredImage?: string | null;
  image?: string | null;
  category?: string | null;
}

/** Full-size cover (1200×630 — also valid as an og:image). */
export function blogCover(post: CoverSource): string {
  const own = post.featuredImage || post.image;
  if (own && String(own).length > 5) return String(own);
  const key = String(post.category || 'insights').trim().toLowerCase();
  return CATEGORY_COVERS[key] || CATEGORY_COVERS['insights'];
}

/** Smaller variant for cards and strips (640×360). */
export function blogCoverSmall(post: CoverSource): string {
  const c = blogCover(post);
  return c.startsWith('/blog-covers/') ? c.replace('.webp', '-sm.webp') : c;
}
