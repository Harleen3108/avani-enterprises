// import { useEffect } from "react";
// import "./App.css";

// // UI + Providers
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { HelmetProvider } from "react-helmet-async";

// // Router
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Layout
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ScrollToTop from "./components/ScrollToTop";

// // Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import CaseStudies from "./pages/CaseStudies";
// import Contact from "./pages/Contact";
// import Blog from "./pages/Blog";
// import Courses from "./pages/Courses";
// import CourseDetail from "./pages/CourseDetail";
// import GetConsultation from "./pages/GetConsultation";
// import NotFound from "./pages/NotFound";
// import PrivacyPolicy from "./pages/privacypolicy";
// import TermsConditions from "./pages/termsnandcondition";
// import Index from "./pages/Index";

// const queryClient = new QueryClient();

// const AdminRedirect = () => {
//   useEffect(() => {
//     window.location.href = "https://avani-enterprises-psi.vercel.app/";
//   }, []);
//   return null;
// };

// const App = () => {
//   return (
//     <HelmetProvider>
//       <QueryClientProvider client={queryClient}>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <Router>
//             <ScrollToTop />
//             <div className="min-h-screen">
//               <Navbar />
//               <main>
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/about" element={<About />} />
//                   <Route path="/services" element={<Services />} />
//                   <Route path="/case-studies" element={<CaseStudies />} />
//                   <Route path="/contact" element={<Contact />} />
//                   <Route path="/blog" element={<Blog />} />
//                   <Route path="/courses" element={<Courses />} />
//                   <Route path="/courses/:id" element={<CourseDetail />} />
//                   <Route path="/contact" element={<GetConsultation />} />
//                   <Route path="/not-found" element={<NotFound />} />
//                   <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//                   <Route path="/terms-and-conditions" element={<TermsConditions />} />
//                   <Route path="/web-dev" element={<Index />} />
//                   <Route path="/admin" element={<AdminRedirect />} />

//                   {/* Catch-all */}
//                   <Route path="*" element={<Navigate to="/not-found" />} />
//                 </Routes>
//               </main>
//               <Footer />
//             </div>
//           </Router>
//         </TooltipProvider>
//       </QueryClientProvider>
//     </HelmetProvider>
//   );
// };

// export default App;

import { useEffect, lazy, Suspense } from "react";
import "./App.css";

// UI + Providers
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

// Router
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";
import Navbar1 from "./components/ui/navbar1";
import Footer from "./components/Footer";
import Footer1 from "./components/Footer1";
import ScrollToTop from "./components/ScrollToTop";
import SeoHead from "./components/SeoHead";

// Router hook for conditional rendering
import { useLocation } from "react-router-dom";

// Pages
import GetConsultation from "./pages/GetConsultation";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Policicue from "./pages/Policicue";
import PolicicueProject from "./pages/PolicicueProject";
import IndusProject from "./pages/IndusProject";
import FrdNutritionProject from "./pages/FrdNutritionProject";
import HiTechHomesProject from "./pages/HiTechHomesProject";
import SanjeevniHospitalProject from "./pages/SanjeevniHospitalProject";
import RohtakShoeProject from "./pages/RohtakShoeProject";
import LeadManagementProject from "./pages/LeadManagementProject";
import WhatsAppAutomationProject from "./pages/WhatsAppAutomationProject";
import BusinessProcessOptimizationProject from "./pages/BusinessProcessOptimizationProject";
import SevenDayLaunch from "./pages/SevenDayLaunch";

// नई लाइन: ThankYou page import
import ThankYou from "./pages/ThankYou";
import LandingPage from "./pages/LandingPage";
import LandingPage1 from "./pages/LandingPage1";
import LandingPage2 from "./pages/LandingPage2";
import LandingPage3 from "./pages/LandingPage3";
import Chatbot from "./components/Chatbot";
import Links from "./pages/Links";
import Home from "./components/Home";
import Home2 from "./pages/Home2";
import DH2Layout from "./components/home2/DH2Layout";
import DH2About from "./pages/home2/DH2About";
import DH2Services from "./pages/home2/DH2Services";
import DH2Contact from "./pages/home2/DH2Contact";
import DH2Consultation from "./pages/home2/DH2Consultation";
import DH2CaseStudies from "./pages/home2/DH2CaseStudies";
import DH2Blog from "./pages/home2/DH2Blog";
import DH2Products from "./pages/home2/DH2Products";
import DH2GlobalPresence from "./pages/home2/DH2GlobalPresence";
import DH2Careers from "./pages/home2/DH2Careers";
import DH2Newsletters from "./pages/home2/DH2Newsletters";
import DH2Privacy from "./pages/home2/DH2Privacy";
import DH2Terms from "./pages/home2/DH2Terms";
import DH2ServiceDetail from "./pages/home2/DH2ServiceDetail";
import DH2BlogDetail from "./pages/home2/DH2BlogDetail";
import DH2NewsletterDetail from "./pages/home2/DH2NewsletterDetail";
import DH2CareerDetail from "./pages/home2/DH2CareerDetail";
import DH2Courses from "./pages/home2/DH2Courses";
import DH2CourseDetail from "./pages/home2/DH2CourseDetail";

// Home Heritage Imports
import MainLayout from "./pages/MainLayout";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import NewsletterDetail from "./pages/NewsletterDetail";
import OurProducts from "./pages/OurProducts";
import GlobalPresence from "./pages/GlobalPresence";
import Careers from "./pages/Careers";
import Newsletters from "./pages/Newsletters";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CaseStudies from "./pages/CaseStudies";
import CareerDetail from "./pages/CareerDetail";
import ServiceDetail from "./pages/ServiceDetail";
import ProjectDetail from "./pages/ProjectDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

// ── SEO Product Landing Pages Imports ─────────────────────────────────────────
const HrPortal = lazy(() => import("./pages/product/HrPortal"));
const HrmsSoftwareIndia = lazy(() => import("./pages/product/HrmsSoftwareIndia"));
const PayrollSoftwareIndia = lazy(() => import("./pages/product/PayrollSoftwareIndia"));
const AttendanceManagementSystem = lazy(() => import("./pages/product/AttendanceManagementSystem"));
const LeaveManagementSoftware = lazy(() => import("./pages/product/LeaveManagementSoftware"));
const EmployeeManagementSoftware = lazy(() => import("./pages/product/EmployeeManagementSoftware"));
const EmployeePortal = lazy(() => import("./pages/product/EmployeePortal"));
const CrmSoftwareIndia = lazy(() => import("./pages/product/CrmSoftwareIndia"));
const WorkforceManagementSoftware = lazy(() => import("./pages/product/WorkforceManagementSoftware"));
const ProjectManagementSoftware = lazy(() => import("./pages/product/ProjectManagementSoftware"));
const BusinessOperatingSystem = lazy(() => import("./pages/product/BusinessOperatingSystem"));

// ── Competitor Alternative Pages Imports ──────────────────────────────────────
const KekaAlternative = lazy(() => import("./pages/compare/KekaAlternative"));
const GreythrAlternative = lazy(() => import("./pages/compare/GreythrAlternative"));
const DarwinboxAlternative = lazy(() => import("./pages/compare/DarwinboxAlternative"));
const ZohoPeopleAlternative = lazy(() => import("./pages/compare/ZohoPeopleAlternative"));

// ── Local SEO & City Pages Imports ────────────────────────────────────────────
const Delhi = lazy(() => import("./pages/local/Delhi"));
const Faridabad = lazy(() => import("./pages/local/Faridabad"));
const Gurgaon = lazy(() => import("./pages/local/Gurgaon"));
const Rohtak = lazy(() => import("./pages/local/Rohtak"));
const DigitalMarketingDelhi = lazy(() => import("./pages/local/DigitalMarketingDelhi"));
const DigitalMarketingHaryana = lazy(() => import("./pages/local/DigitalMarketingHaryana"));
const GoogleAdsHaryana = lazy(() => import("./pages/local/GoogleAdsHaryana"));
const SeoDelhi = lazy(() => import("./pages/local/SeoDelhi"));
const SeoHaryana = lazy(() => import("./pages/local/SeoHaryana"));
const SmmDelhi = lazy(() => import("./pages/local/SmmDelhi"));
const SmmHaryana = lazy(() => import("./pages/local/SmmHaryana"));
const WebDevDelhi = lazy(() => import("./pages/local/WebDevDelhi"));
const WebDevHaryana = lazy(() => import("./pages/local/WebDevHaryana"));
const WebDevGurgaon = lazy(() => import("./pages/local/WebDevGurgaon"));
const WebDevNoida = lazy(() => import("./pages/local/WebDevNoida"));
const WebDevChandigarh = lazy(() => import("./pages/local/WebDevChandigarh"));
const WebDevIndia = lazy(() => import("./pages/local/WebDevIndia"));
const WebDevMumbai = lazy(() => import("./pages/local/WebDevMumbai"));
const WebDevBangalore = lazy(() => import("./pages/local/WebDevBangalore"));
const WebDevPune = lazy(() => import("./pages/local/WebDevPune"));
const WebDevHyderabad = lazy(() => import("./pages/local/WebDevHyderabad"));

import DH2PolicicueProject from './pages/home2/DH2PolicicueProject';
import DH2IndusProject from './pages/home2/DH2IndusProject';
import DH2FrdNutritionProject from './pages/home2/DH2FrdNutritionProject';
import DH2HiTechHomesProject from './pages/home2/DH2HiTechHomesProject';
import DH2SanjeevniHospitalProject from './pages/home2/DH2SanjeevniHospitalProject';
import DH2RohtakShoeProject from './pages/home2/DH2RohtakShoeProject';
import DH2LeadManagementProject from './pages/home2/DH2LeadManagementProject';
import DH2WhatsAppAutomationProject from './pages/home2/DH2WhatsAppAutomationProject';
import DH2BusinessProcessOptimizationProject from './pages/home2/DH2BusinessProcessOptimizationProject';

import { SeoProvider } from "./contexts/SeoContext";
import { ThemeProvider } from "./components/theme-provider";


const queryClient = new QueryClient();

const AdminRedirect = () => {
  useEffect(() => {
    window.location.href = "https://avani-enterprises-psi.vercel.app/";
  }, []);
  return null;
};

// Placeholder page for DH2 routes being built incrementally
const DH2PlaceholderPage = ({ title }: { title: string }) => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', background: '#0a0a0a', color: '#f0f0f0', fontFamily: "'Inter', sans-serif" }}>
    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '1rem' }}>{title}</h1>
    <p style={{ color: '#7a7a7a', fontSize: '.85rem' }}>This page is being built. Check back soon.</p>
  </div>
);

// Layout wrapper component for conditional Navbar/Footer rendering
const AppLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const pathForCheck = pathname.toLowerCase();
  
  // Define all paths that belong to the new MainLayout
  const isDHRoot = ["/", "/about", "/services", "/projects", "/contact", "/blog", "/global-presence", "/careers", "/newsletters", "/courses", "/case-studies", "/get-consultation", "/privacy-policy", "/terms-and-conditions"].includes(pathForCheck);
  const isDHSub = pathForCheck.startsWith("/services/") || pathForCheck.startsWith("/projects/") || pathForCheck.startsWith("/blog/") || pathForCheck.startsWith("/careers/") || pathForCheck.startsWith("/newsletters/") || pathForCheck.startsWith("/courses/");
  const isSeoPath = [
    "/hr-portal",
    "/hrms-software-india",
    "/payroll-software-india",
    "/attendance-management-system",
    "/leave-management-software",
    "/employee-management-software",
    "/employee-portal",
    "/crm-software-india",
    "/workforce-management-software",
    "/project-management-software",
    "/business-operating-system",
    "/keka-alternative",
    "/greythr-alternative",
    "/darwinbox-alternative",
    "/zoho-people-alternative",
    "/rohtak",
    "/gurgaon",
    "/faridabad",
    "/delhi",
    "/web-development-company-haryana",
    "/web-development-company-delhi",
    "/web-development-company-gurgaon",
    "/web-development-company-noida",
    "/web-development-company-chandigarh",
    "/web-development-company-india",
    "/web-development-company-mumbai",
    "/web-development-company-bangalore",
    "/web-development-company-pune",
    "/web-development-company-hyderabad",
    "/social-media-marketing-agency-haryana",
    "/social-media-marketing-agency-delhi",
    "/digital-marketing-agency-haryana",
    "/digital-marketing-agency-delhi",
    "/seo-company-haryana",
    "/seo-company-delhi",
    "/google-ads-agency-haryana"
  ].includes(pathForCheck);
  const isDH1 = isDHRoot || isDHSub || isSeoPath;
  const isDH2 = pathForCheck.startsWith('/home2');

  // Pages where Navbar should be hidden completely
  const hideNavbar = pathForCheck === "/thank-you" || pathForCheck === "/business-setup" || pathForCheck === "/businesssetup1" || pathForCheck === "/businesssetup2" || pathForCheck === "/businesssetup3" || isDH1 || isDH2;

  // Pages where Navbar1 should be used instead of default Navbar
  const useNavbar1 = pathForCheck === "/web-dev" || pathForCheck === "/7-day-launch";

  // Pages where Footer should be hidden completely
  const hideFooter = pathForCheck === "/thank-you" || pathForCheck === "/links" || pathForCheck === "/businesssetup3" || isDH1 || isDH2;

  // Pages where Footer1 should be used instead of default Footer
  const useFooter1 = pathForCheck === "/web-dev" || pathForCheck === "/7-day-launch";

  return (
    <div className="min-h-screen">
      <SeoHead />
      {!hideNavbar && (useNavbar1 ? <Navbar1 /> : <Navbar />)}
      <main className="pt-0">
        <Suspense fallback={<div style={{ minHeight: "70vh" }} aria-busy="true" />}>
        <Routes>
          {/* New Main Website (formerly dummyhome) */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="global-presence" element={<GlobalPresence />} />
            <Route path="careers" element={<Careers />} />
            <Route path="careers/:id" element={<CareerDetail />} />
            <Route path="newsletters" element={<Newsletters />} />
            <Route path="newsletters/:slug" element={<NewsletterDetail />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CourseDetail />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="get-consultation" element={<Contact />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsConditions />} />

            {/* ── SEO Product Landing Pages ───────────────────────────────────── */}
            <Route path="hr-portal" element={<HrPortal />} />
            <Route path="hrms-software-india" element={<HrmsSoftwareIndia />} />
            <Route path="payroll-software-india" element={<PayrollSoftwareIndia />} />
            <Route path="attendance-management-system" element={<AttendanceManagementSystem />} />
            <Route path="leave-management-software" element={<LeaveManagementSoftware />} />
            <Route path="employee-management-software" element={<EmployeeManagementSoftware />} />
            <Route path="employee-portal" element={<EmployeePortal />} />
            <Route path="crm-software-india" element={<CrmSoftwareIndia />} />
            <Route path="workforce-management-software" element={<WorkforceManagementSoftware />} />
            <Route path="project-management-software" element={<ProjectManagementSoftware />} />
            <Route path="business-operating-system" element={<BusinessOperatingSystem />} />

            {/* ── Competitor Alternative Pages ────────────────────────────────── */}
            <Route path="keka-alternative" element={<KekaAlternative />} />
            <Route path="greythr-alternative" element={<GreythrAlternative />} />
            <Route path="darwinbox-alternative" element={<DarwinboxAlternative />} />
            <Route path="zoho-people-alternative" element={<ZohoPeopleAlternative />} />

            {/* ── Local SEO & City Pages ──────────────────────────────────────── */}
            <Route path="rohtak" element={<Rohtak />} />
            <Route path="gurgaon" element={<Gurgaon />} />
            <Route path="faridabad" element={<Faridabad />} />
            <Route path="delhi" element={<Delhi />} />
            <Route path="web-development-company-haryana" element={<WebDevHaryana />} />
            <Route path="web-development-company-delhi" element={<WebDevDelhi />} />
            <Route path="web-development-company-gurgaon" element={<WebDevGurgaon />} />
            <Route path="web-development-company-noida" element={<WebDevNoida />} />
            <Route path="web-development-company-chandigarh" element={<WebDevChandigarh />} />
            <Route path="web-development-company-india" element={<WebDevIndia />} />
            <Route path="web-development-company-mumbai" element={<WebDevMumbai />} />
            <Route path="web-development-company-bangalore" element={<WebDevBangalore />} />
            <Route path="web-development-company-pune" element={<WebDevPune />} />
            <Route path="web-development-company-hyderabad" element={<WebDevHyderabad />} />
            <Route path="social-media-marketing-agency-haryana" element={<SmmHaryana />} />
            <Route path="social-media-marketing-agency-delhi" element={<SmmDelhi />} />
            <Route path="digital-marketing-agency-haryana" element={<DigitalMarketingHaryana />} />
            <Route path="digital-marketing-agency-delhi" element={<DigitalMarketingDelhi />} />
            <Route path="seo-company-haryana" element={<SeoHaryana />} />
            <Route path="seo-company-delhi" element={<SeoDelhi />} />
            <Route path="google-ads-agency-haryana" element={<GoogleAdsHaryana />} />
          </Route>

          {/* DH2 Sub-pages with shared layout */}
          <Route path="/home2" element={<DH2Layout />}>
            <Route index element={<Home2 />} />
            <Route path="about" element={<DH2About />} />
            <Route path="services" element={<DH2Services />} />
            <Route path="services/:id" element={<DH2ServiceDetail />} />
            <Route path="our-products" element={<DH2Products />} />
            <Route path="case-studies" element={<DH2CaseStudies />} />
            <Route path="contact" element={<DH2Contact />} />
            <Route path="blog" element={<DH2Blog />} />
            <Route path="blog/:slug" element={<DH2BlogDetail />} />
            <Route path="courses" element={<DH2Courses />} />
            <Route path="courses/:id" element={<DH2CourseDetail />} />
            <Route path="get-consultation" element={<DH2Consultation />} />
            <Route path="global-presence" element={<DH2GlobalPresence />} />
            <Route path="careers" element={<DH2Careers />} />
            <Route path="careers/:id" element={<DH2CareerDetail />} />
            <Route path="newsletters" element={<DH2Newsletters />} />
            <Route path="newsletters/:slug" element={<DH2NewsletterDetail />} />
            <Route path="privacy-policy" element={<DH2Privacy />} />
            <Route path="terms-and-conditions" element={<DH2Terms />} />

            {/* Home2 Project Routes */}
            <Route path="our-products/policicue" element={<DH2PolicicueProject />} />
            <Route path="our-products/indus" element={<DH2IndusProject />} />
            <Route path="our-products/frd-nutrition" element={<DH2FrdNutritionProject />} />
            <Route path="our-products/hitech-homes" element={<DH2HiTechHomesProject />} />
            <Route path="our-products/sanjeevni" element={<DH2SanjeevniHospitalProject />} />
            <Route path="our-products/rohtak-shoe" element={<DH2RohtakShoeProject />} />

            <Route path="services/lead-management" element={<DH2LeadManagementProject />} />
            <Route path="services/whatsapp-automation" element={<DH2WhatsAppAutomationProject />} />
            <Route path="services/process-optimization" element={<DH2BusinessProcessOptimizationProject />} />
          </Route>

          {/* Standalone & Legacy Routes */}
          <Route path="/links" element={<Links />} />
          
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/business-setup" element={<LandingPage />} />
          <Route path="/businesssetup1" element={<LandingPage1 />} />
          <Route path="/businesssetup2" element={<LandingPage2 />} />
          <Route path="/businesssetup3" element={<LandingPage3 />} />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="/web-dev" element={<Index />} />
          <Route path="/7-day-launch" element={<SevenDayLaunch />} />
          <Route path="/policicue" element={<Policicue />} />
          
          <Route path="/admin" element={<AdminRedirect />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
        </Suspense>
      </main>
      {!hideFooter && (useFooter1 ? <Footer1 /> : <Footer />)}
      {!hideNavbar && <Chatbot />}
    </div>
  );
};


const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="avani-theme" attribute="class">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <SeoProvider>
                <ScrollToTop />
                <AppLayout />
              </SeoProvider>
            </Router>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;