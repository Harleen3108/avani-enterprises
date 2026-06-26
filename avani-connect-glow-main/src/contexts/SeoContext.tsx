import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

interface SeoData {
  // Core
  title?: string;
  metaDescription?: string;
  metaKeywords?: string;
  seoHeading?: string;
  // Canonical & indexability
  canonicalUrl?: string;
  robots?: string;
  // Open Graph / Social
  ogImage?: string;
  // Structured data (JSON-LD) — backend sends pre-built schema or component builds it
  structuredData?: string | Record<string, unknown>;
  // Allow any extra fields the backend may send
  [key: string]: unknown;
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

    let active = true;
    let handleLoad: (() => void) | null = null;

    const fetchSeo = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/seo`, { params: { page: currentPage }, timeout: 4000 });
        if (active) {
          setSeo(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch SEO data:", err);
        if (active) {
          setSeo(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (document.readyState !== 'complete') {
      handleLoad = () => {
        if (handleLoad) {
          window.removeEventListener('load', handleLoad);
        }
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            if (active) fetchSeo();
          });
        } else {
          setTimeout(() => {
            if (active) fetchSeo();
          }, 200);
        }
      };
      window.addEventListener('load', handleLoad);
    } else {
      fetchSeo();
    }

    return () => {
      active = false;
      if (handleLoad) {
        window.removeEventListener('load', handleLoad);
      }
    };
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
