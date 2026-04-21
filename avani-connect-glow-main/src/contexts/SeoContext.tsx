import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

interface SeoData {
  title?: string;
  metaDescription?: string;
  metaKeywords?: string;
  seoHeading?: string;
  [key: string]: any;
}

interface SeoContextType {
  seo: SeoData | null;
  loading: boolean;
}

const SeoContext = createContext<SeoContextType | undefined>(undefined);

export const SeoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [seo, setSeo] = useState<SeoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to hydrate from server-injected data first
    const dehydratedData = (window as any).__SEO_DATA__;
    const currentPage = location.pathname || "/";
    
    if (dehydratedData && (dehydratedData.page === currentPage || (currentPage === "/" && ["", "/", "home", "/home"].includes(dehydratedData.page)))) {
      setSeo(dehydratedData);
      setLoading(false);
      // Clean up to prevent stale data on navigation
      (window as any).__SEO_DATA__ = null;
      return;
    }

    const fetchSeo = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/seo`, { params: { page: currentPage } });
        setSeo(res.data.data);
      } catch (err) {
        console.error("Failed to fetch SEO data:", err);
        setSeo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSeo();
  }, [location.pathname]);

  return (
    <SeoContext.Provider value={{ seo, loading }}>
      {children}
    </SeoContext.Provider>
  );
};

export const useSeo = () => {
  const context = useContext(SeoContext);
  if (context === undefined) {
    throw new Error('useSeo must be used within an SeoProvider');
  }
  return context;
};
