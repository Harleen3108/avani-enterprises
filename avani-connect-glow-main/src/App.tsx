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
import { lazyWithRetry } from "./utils/lazyWithRetry";
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
const GetConsultation = lazyWithRetry(() => import("./pages/GetConsultation"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const Index = lazyWithRetry(() => import("./pages/Index"));
const Policicue = lazyWithRetry(() => import("./pages/Policicue"));
const PolicicueProject = lazyWithRetry(() => import("./pages/PolicicueProject"));
const IndusProject = lazyWithRetry(() => import("./pages/IndusProject"));
const FrdNutritionProject = lazyWithRetry(() => import("./pages/FrdNutritionProject"));
const HiTechHomesProject = lazyWithRetry(() => import("./pages/HiTechHomesProject"));
const SanjeevniHospitalProject = lazyWithRetry(() => import("./pages/SanjeevniHospitalProject"));
const RohtakShoeProject = lazyWithRetry(() => import("./pages/RohtakShoeProject"));
const LeadManagementProject = lazyWithRetry(() => import("./pages/LeadManagementProject"));
const WhatsAppAutomationProject = lazyWithRetry(() => import("./pages/WhatsAppAutomationProject"));
const BusinessProcessOptimizationProject = lazyWithRetry(() => import("./pages/BusinessProcessOptimizationProject"));
const SevenDayLaunch = lazyWithRetry(() => import("./pages/SevenDayLaunch"));

// नई लाइन: ThankYou page import
const ThankYou = lazyWithRetry(() => import("./pages/ThankYou"));
const LandingPage = lazyWithRetry(() => import("./pages/LandingPage"));
const LandingPage1 = lazyWithRetry(() => import("./pages/LandingPage1"));
const LandingPage2 = lazyWithRetry(() => import("./pages/LandingPage2"));
const LandingPage3 = lazyWithRetry(() => import("./pages/LandingPage3"));
import Chatbot from "./components/Chatbot";
const Links = lazyWithRetry(() => import("./pages/Links"));
import Home from "./components/Home";
const Home2 = lazyWithRetry(() => import("./pages/Home2"));
import DH2Layout from "./components/home2/DH2Layout";
const DH2About = lazyWithRetry(() => import("./pages/home2/DH2About"));
const DH2Services = lazyWithRetry(() => import("./pages/home2/DH2Services"));
const DH2Contact = lazyWithRetry(() => import("./pages/home2/DH2Contact"));
const DH2Consultation = lazyWithRetry(() => import("./pages/home2/DH2Consultation"));
const DH2CaseStudies = lazyWithRetry(() => import("./pages/home2/DH2CaseStudies"));
const DH2Blog = lazyWithRetry(() => import("./pages/home2/DH2Blog"));
const DH2Products = lazyWithRetry(() => import("./pages/home2/DH2Products"));
const DH2GlobalPresence = lazyWithRetry(() => import("./pages/home2/DH2GlobalPresence"));
const DH2Careers = lazyWithRetry(() => import("./pages/home2/DH2Careers"));
const DH2Newsletters = lazyWithRetry(() => import("./pages/home2/DH2Newsletters"));
const DH2Privacy = lazyWithRetry(() => import("./pages/home2/DH2Privacy"));
const DH2Terms = lazyWithRetry(() => import("./pages/home2/DH2Terms"));
const DH2ServiceDetail = lazyWithRetry(() => import("./pages/home2/DH2ServiceDetail"));
const DH2BlogDetail = lazyWithRetry(() => import("./pages/home2/DH2BlogDetail"));
const DH2NewsletterDetail = lazyWithRetry(() => import("./pages/home2/DH2NewsletterDetail"));
const DH2CareerDetail = lazyWithRetry(() => import("./pages/home2/DH2CareerDetail"));
const DH2Courses = lazyWithRetry(() => import("./pages/home2/DH2Courses"));
const DH2CourseDetail = lazyWithRetry(() => import("./pages/home2/DH2CourseDetail"));

// Home Heritage Imports
import MainLayout from "./pages/MainLayout";
const About = lazyWithRetry(() => import("./pages/About"));
const Services = lazyWithRetry(() => import("./pages/Services"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const Projects = lazyWithRetry(() => import("./pages/Projects"));
const Blog = lazyWithRetry(() => import("./pages/Blog"));
const BlogDetail = lazyWithRetry(() => import("./pages/BlogDetail"));
const NewsletterDetail = lazyWithRetry(() => import("./pages/NewsletterDetail"));
const OurProducts = lazyWithRetry(() => import("./pages/OurProducts"));
const GlobalPresence = lazyWithRetry(() => import("./pages/GlobalPresence"));
const Careers = lazyWithRetry(() => import("./pages/Careers"));
const Newsletters = lazyWithRetry(() => import("./pages/Newsletters"));
const Courses = lazyWithRetry(() => import("./pages/Courses"));
const CourseDetail = lazyWithRetry(() => import("./pages/CourseDetail"));
const CaseStudies = lazyWithRetry(() => import("./pages/CaseStudies"));
const CareerDetail = lazyWithRetry(() => import("./pages/CareerDetail"));
const ServiceDetail = lazyWithRetry(() => import("./pages/ServiceDetail"));
const ProjectDetail = lazyWithRetry(() => import("./pages/ProjectDetail"));
const PrivacyPolicy = lazyWithRetry(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazyWithRetry(() => import("./pages/TermsConditions"));

// ── SEO Product Landing Pages Imports ─────────────────────────────────────────
const HrPortal = lazyWithRetry(() => import("./pages/product/HrPortal"));
const HrmsSoftwareIndia = lazyWithRetry(() => import("./pages/product/HrmsSoftwareIndia"));
const PayrollSoftwareIndia = lazyWithRetry(() => import("./pages/product/PayrollSoftwareIndia"));
const AttendanceManagementSystem = lazyWithRetry(() => import("./pages/product/AttendanceManagementSystem"));
const LeaveManagementSoftware = lazyWithRetry(() => import("./pages/product/LeaveManagementSoftware"));
const EmployeeManagementSoftware = lazyWithRetry(() => import("./pages/product/EmployeeManagementSoftware"));
const EmployeePortal = lazyWithRetry(() => import("./pages/product/EmployeePortal"));
const CrmSoftwareIndia = lazyWithRetry(() => import("./pages/product/CrmSoftwareIndia"));
const WorkforceManagementSoftware = lazyWithRetry(() => import("./pages/product/WorkforceManagementSoftware"));
const ProjectManagementSoftware = lazyWithRetry(() => import("./pages/product/ProjectManagementSoftware"));
const BusinessOperatingSystem = lazyWithRetry(() => import("./pages/product/BusinessOperatingSystem"));

// ── Competitor Alternative Pages Imports ──────────────────────────────────────
const KekaAlternative = lazyWithRetry(() => import("./pages/compare/KekaAlternative"));
const GreythrAlternative = lazyWithRetry(() => import("./pages/compare/GreythrAlternative"));
const DarwinboxAlternative = lazyWithRetry(() => import("./pages/compare/DarwinboxAlternative"));
const ZohoPeopleAlternative = lazyWithRetry(() => import("./pages/compare/ZohoPeopleAlternative"));

// ── Local SEO & City Pages Imports ────────────────────────────────────────────
const Delhi = lazyWithRetry(() => import("./pages/local/Delhi"));
const Faridabad = lazyWithRetry(() => import("./pages/local/Faridabad"));
const Gurgaon = lazyWithRetry(() => import("./pages/local/Gurgaon"));
const Rohtak = lazyWithRetry(() => import("./pages/local/Rohtak"));
const DigitalMarketingDelhi = lazyWithRetry(() => import("./pages/local/DigitalMarketingDelhi"));
const DigitalMarketingHaryana = lazyWithRetry(() => import("./pages/local/DigitalMarketingHaryana"));
const GoogleAdsHaryana = lazyWithRetry(() => import("./pages/local/GoogleAdsHaryana"));
const SeoDelhi = lazyWithRetry(() => import("./pages/local/SeoDelhi"));
const SeoHaryana = lazyWithRetry(() => import("./pages/local/SeoHaryana"));
const SmmDelhi = lazyWithRetry(() => import("./pages/local/SmmDelhi"));
const SmmHaryana = lazyWithRetry(() => import("./pages/local/SmmHaryana"));
const WebDevDelhi = lazyWithRetry(() => import("./pages/local/WebDevDelhi"));
const WebDevHaryana = lazyWithRetry(() => import("./pages/local/WebDevHaryana"));
const WebDevGurgaon = lazyWithRetry(() => import("./pages/local/WebDevGurgaon"));
const WebDevNoida = lazyWithRetry(() => import("./pages/local/WebDevNoida"));
const WebDevChandigarh = lazyWithRetry(() => import("./pages/local/WebDevChandigarh"));
const WebDevIndia = lazyWithRetry(() => import("./pages/local/WebDevIndia"));
const WebDevMumbai = lazyWithRetry(() => import("./pages/local/WebDevMumbai"));
const WebDevBangalore = lazyWithRetry(() => import("./pages/local/WebDevBangalore"));
const WebDevPune = lazyWithRetry(() => import("./pages/local/WebDevPune"));
const WebDevHyderabad = lazyWithRetry(() => import("./pages/local/WebDevHyderabad"));

const DH2PolicicueProject = lazyWithRetry(() => import('./pages/home2/DH2PolicicueProject'));
const DH2IndusProject = lazyWithRetry(() => import('./pages/home2/DH2IndusProject'));
const DH2FrdNutritionProject = lazyWithRetry(() => import('./pages/home2/DH2FrdNutritionProject'));
const DH2HiTechHomesProject = lazyWithRetry(() => import('./pages/home2/DH2HiTechHomesProject'));
const DH2SanjeevniHospitalProject = lazyWithRetry(() => import('./pages/home2/DH2SanjeevniHospitalProject'));
const DH2RohtakShoeProject = lazyWithRetry(() => import('./pages/home2/DH2RohtakShoeProject'));
const DH2LeadManagementProject = lazyWithRetry(() => import('./pages/home2/DH2LeadManagementProject'));
const DH2WhatsAppAutomationProject = lazyWithRetry(() => import('./pages/home2/DH2WhatsAppAutomationProject'));
const DH2BusinessProcessOptimizationProject = lazyWithRetry(() => import('./pages/home2/DH2BusinessProcessOptimizationProject'));

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
        <Suspense fallback={
          <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }} aria-busy="true">
            <div style={{ width: 36, height: 36, border: "3px solid rgba(255,157,0,0.25)", borderTopColor: "#ff9d00", borderRadius: "50%", animation: "rt-spin 0.7s linear infinite" }} />
            <style>{`@keyframes rt-spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        }>
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