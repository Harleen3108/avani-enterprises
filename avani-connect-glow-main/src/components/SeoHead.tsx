import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";

export default function SeoHead() {
  const location = useLocation();
  const [seo, setSeo] = useState<any>(null);

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const page = location.pathname || "/";
        const res = await axios.get(`${API_BASE_URL}/seo`, { params: { page } });
        setSeo(res.data.data);
      } catch (err) {
        // silent fail — keep existing static meta
      }
    };
    fetchSeo();
  }, [location.pathname]);

  if (!seo) return null;

  return (
    <Helmet>
      {seo.title && <title>{seo.title}</title>}
      {seo.metaDescription && <meta name="description" content={seo.metaDescription} />}
      {seo.metaKeywords && <meta name="keywords" content={seo.metaKeywords} />}
      {seo.seoHeading && <meta name="seo-heading" content={seo.seoHeading} />}
    </Helmet>
  );
}
