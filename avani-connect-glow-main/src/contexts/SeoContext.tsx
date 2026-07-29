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

// ── Static fallback lookup ────────────────────────────────────────────────────
// Used ONLY when the backend call fails (e.g. Render.com cold-start timeout).
// Keeps Helmet-managed tags populated so no page ever renders with a blank <title>.
// Keep in sync with api/seo.js STATIC_SEO_LOOKUP for the top priority pages.
const STATIC_FALLBACK: Record<string, Pick<SeoData, 'title' | 'metaDescription' | 'metaKeywords'>> = {
  "/": {
    title: "Avani Enterprises — Digital, Product & AI Studio in Gurugram & Rohtak",
    metaDescription: "a full-service digital & product studio based in Gurugram & Rohtak. SEO, Google Ads, Meta Ads, web development, AI automation, and custom software. Working with clients across India and the Gulf, projects across India and the Gulf. Get a free audit.",
    metaKeywords: "digital marketing agency india, seo company india, web development company india, google ads agency india, ai automation india"
  },
  "/about": {
    title: "About Avani Enterprises | Digital Marketing Agency Gurugram",
    metaDescription: "Avani Enterprises is a full-service digital marketing and web development agency founded in 2016, headquartered in Gurugram. Working with clients across India and the Gulf, projects delivered across India and the Gulf.",
    metaKeywords: "about avani enterprises, digital marketing agency gurugram, web development company haryana"
  },
  "/services": {
    title: "Our Services | Web Development, SEO, AI & Software — Avani Enterprises",
    metaDescription: "Explore all services from Avani Enterprises: web development, SEO, Google Ads, Meta Ads, AI automation, CRM, HRMS, and custom software for businesses across India.",
    metaKeywords: "digital marketing services india, web development services, seo services india, ai automation services"
  },
  "/contact": {
    title: "Contact Avani Enterprises | Get a Free Consultation",
    metaDescription: "Contact Avani Enterprises for web development, SEO, digital marketing, or custom software. Call +91 92536 25099 or email kp@avanienterprises.in.",
    metaKeywords: "contact avani enterprises, digital marketing agency contact, web development quote india"
  },
  "/blog": {
    title: "Blog | Digital Marketing, SEO & Tech Insights — Avani Enterprises",
    metaDescription: "Read expert insights on SEO, digital marketing, web development, AI automation, HR software, and business growth from the Avani Enterprises team.",
    metaKeywords: "digital marketing blog india, seo blog, web development articles, ai automation insights"
  },
  "/web-development-company": {
    title: "Web Development Company in India | Avani Enterprises",
    metaDescription: "Avani Enterprises builds fast, responsive business websites, e-commerce stores, and custom web apps. Delivering across India and the Gulf, 8+ years. Get a free quote today.",
    metaKeywords: "web development company india, website development india, custom web development, react web development"
  },
  "/seo-company": {
    title: "SEO Company in India | Rank on Google — Avani Enterprises",
    metaDescription: "Avani Enterprises drives compounding organic traffic for Indian businesses. Technical SEO, content, and link-building. Working with clients across India and the Gulf, 8+ years. Get a free SEO audit.",
    metaKeywords: "seo company india, best seo company india, seo services india, search engine optimization india"
  },
  "/digital-marketing-company": {
    title: "Digital Marketing Company in India | Avani Enterprises",
    metaDescription: "Performance-driven digital marketing company in India. SEO, Google Ads, Meta Ads, and social media that generate qualified leads. Get a free growth audit.",
    metaKeywords: "digital marketing company india, digital marketing agency india, performance marketing india"
  },
  "/google-ads-agency": {
    title: "Google Ads Agency in India | High-ROI PPC — Avani Enterprises",
    metaDescription: "Avani Enterprises is a Google Ads agency in India running profitable search, shopping, and display campaigns. Clients across India and the Gulf. Book a free PPC audit.",
    metaKeywords: "google ads agency india, ppc company india, google adwords agency india, paid search india"
  },
  "/ai-automation-company": {
    title: "AI Automation Company in India | Avani Enterprises",
    metaDescription: "Avani Enterprises builds AI automation solutions — chatbots, WhatsApp automation, agentic AI, and custom LLM apps. 8+ years, projects across India and the Gulf. Book a free demo.",
    metaKeywords: "ai automation company india, ai solutions india, chatbot development india, ai agency india"
  },
  "/crm-development-company": {
    title: "CRM Development Company in India | Avani Enterprises",
    metaDescription: "Avani Enterprises builds custom CRM software with sales pipelines, automation, dashboards, and integrations. Delivering across India and the Gulf, 8+ years. Book a free CRM demo.",
    metaKeywords: "crm development company india, custom crm software india, crm company india, sales crm development"
  },
  "/hr-portal": {
    title: "HR Portal Software India | Employee Self-Service — Avani Enterprises",
    metaDescription: "Custom HR portal software with employee self-service, document vault, attendance, leave, and payroll integration. Reduce HR overhead by 75%. Request a demo.",
    metaKeywords: "hr portal software india, employee self service portal, hr management software india"
  },
  "/hrms-software-india": {
    title: "HRMS Software India | HR Management System — Avani Enterprises",
    metaDescription: "Cloud-based HRMS software for Indian businesses. Manage attendance, payroll, leave, and performance in one platform. Custom-built for your policies. Get a demo.",
    metaKeywords: "hrms software india, hr management system india, human resource software india, hrms system"
  },
  "/payroll-software-india": {
    title: "Payroll Software India | PF, ESI, TDS Compliant — Avani Enterprises",
    metaDescription: "Automated payroll software for India with PF, ESI, TDS compliance and instant payslips. Custom-built for your company. 8+ years. Get a quote.",
    metaKeywords: "payroll software india, payroll management india, automated payroll india, pf esi tds payroll"
  },
  "/crm-software-india": {
    title: "CRM Software India | Custom Sales CRM — Avani Enterprises",
    metaDescription: "Custom CRM software for Indian businesses — sales pipeline, lead tracking, automation, and analytics. Own your data, no per-seat fees. Book a free demo.",
    metaKeywords: "crm software india, custom crm india, sales management software india, lead tracking software"
  },
  "/meta-ads-agency": {
    title: "Meta Ads Agency in India | Facebook & Instagram Ads — Avani Enterprises",
    metaDescription: "Avani Enterprises is a Meta Ads agency in India running Facebook and Instagram campaigns engineered for strong ROAS. Book a free strategy call.",
    metaKeywords: "meta ads agency india, facebook ads agency india, instagram ads agency india, meta advertising india"
  },
  "/social-media-marketing-company": {
    title: "Social Media Marketing Company in India | Avani Enterprises",
    metaDescription: "Avani Enterprises manages Instagram, Facebook, and LinkedIn for Indian brands — Reels, targeted ads, and daily posting. Book a free social media audit.",
    metaKeywords: "social media marketing company india, social media agency india, instagram marketing india"
  },
  "/mobile-app-development-company": {
    title: "Mobile App Development Company in India | Avani Enterprises",
    metaDescription: "Avani Enterprises builds iOS and Android apps — native, Flutter, and React Native. Delivering across India and the Gulf, 8+ years. Get a free mobile app quote.",
    metaKeywords: "mobile app development company india, app development company india, ios android app development"
  },
  "/case-studies": {
    title: "Case Studies | Client Results & Success Stories — Avani Enterprises",
    metaDescription: "See how Avani Enterprises helped businesses grow with web development, SEO, digital marketing, and custom software. Real results, real clients.",
    metaKeywords: "avani enterprises case studies, digital marketing results india, web development portfolio india"
  },
  "/projects": {
    title: "Projects Portfolio | Web & App Development — Avani Enterprises",
    metaDescription: "Browse our portfolio of projects across India and the Gulf — websites, e-commerce stores, mobile apps, CRM systems, HR portals, and AI solutions built for businesses across India.",
    metaKeywords: "avani enterprises projects, web development portfolio, app development portfolio india"
  },
  "/careers": {
    title: "Careers at Avani Enterprises | Join Our Team",
    metaDescription: "Join Avani Enterprises — a Gurugram-based digital agency. We're hiring web developers, SEO specialists, digital marketers, and AI engineers in Gurugram.",
    metaKeywords: "avani enterprises careers, jobs digital marketing india, web developer jobs gurugram"
  },
};

// Generic fallback used when a path is not in STATIC_FALLBACK
const GENERIC_FALLBACK: Pick<SeoData, 'title' | 'metaDescription'> = {
  title: "Avani Enterprises — Digital Marketing & Web Development Agency India",
  metaDescription: "Avani Enterprises is a leading digital marketing and web development agency in India. SEO, Google Ads, AI, custom software, and HR solutions. Working with clients across India and the Gulf, projects across India and the Gulf.",
};

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
          // Use static fallback so meta tags never go blank (e.g. on backend cold-start).
          // Exact path match first, then generic defaults.
          const fallback = STATIC_FALLBACK[currentPage] ?? GENERIC_FALLBACK;
          setSeo(fallback);
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
