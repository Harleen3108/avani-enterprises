import { Helmet } from "react-helmet-async";
import { useSeo } from "../contexts/SeoContext";

export default function SeoHead() {
  const { seo } = useSeo();

  if (!seo) return null;

  return (
    <Helmet>
      {seo.title && <title>{seo.title}</title>}
      {seo.metaDescription && <meta name="description" content={seo.metaDescription} />}
      {seo.metaKeywords && <meta name="keywords" content={seo.metaKeywords} />}
      {seo.seoHeading && <meta name="seo-heading" content={seo.seoHeading} />}
      
      {/* Open Graph Tags for Dynamic Injection */}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.metaDescription && <meta property="og:description" content={seo.metaDescription} />}
      
      {/* Twitter Tags for Dynamic Injection */}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.metaDescription && <meta name="twitter:description" content={seo.metaDescription} />}
    </Helmet>
  );
}
