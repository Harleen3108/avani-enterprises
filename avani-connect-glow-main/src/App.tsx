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
import AnalyticsTracker from "./components/AnalyticsTracker";
import { captureAttribution } from "./lib/leadTracking";

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
const HtmlSitemap = lazyWithRetry(() => import("./pages/HtmlSitemap"));

// नई लाइन: ThankYou page import
const ThankYou = lazyWithRetry(() => import("./pages/ThankYou"));
const LandingPage = lazyWithRetry(() => import("./pages/LandingPage"));
const LandingPage1 = lazyWithRetry(() => import("./pages/LandingPage1"));
const LandingPage2 = lazyWithRetry(() => import("./pages/LandingPage2"));
const LandingPage3 = lazyWithRetry(() => import("./pages/LandingPage3"));
const Chatbot = lazyWithRetry(() => import("./components/Chatbot"));
const Links = lazyWithRetry(() => import("./pages/Links"));
import Home from "./components/Home";
// Scroll-cinema concept homepage. Lazy on purpose — it pulls in GSAP
// ScrollTrigger/SplitText, which must not land in the main bundle.
const AvaniHome = lazyWithRetry(() => import("./pages/AvaniHome"));
const Home2 = lazyWithRetry(() => import("./pages/Home2"));
const DH2Layout = lazyWithRetry(() => import("./components/home2/DH2Layout"));
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
// Guide cluster: long-form content held in the repo so it is server-rendered.
// /blog fetches from the backend on the client, so Googlebot sees nothing there
// on the first pass — see src/data/guides.js.
const GuidesIndex = lazyWithRetry(() => import("./pages/GuidesIndex"));
const GuideDetail = lazyWithRetry(() => import("./pages/GuideDetail"));
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
// Flagship service pages
const WebDevelopmentCompany = lazyWithRetry(() => import("./pages/service/WebDevelopmentCompany"));
const SeoCompany = lazyWithRetry(() => import("./pages/service/SeoCompany"));
const DigitalMarketingCompany = lazyWithRetry(() => import("./pages/service/DigitalMarketingCompany"));
const GoogleAdsAgency = lazyWithRetry(() => import("./pages/service/GoogleAdsAgency"));
const AiAutomationCompany = lazyWithRetry(() => import("./pages/service/AiAutomationCompany"));
const CrmDevelopmentCompany = lazyWithRetry(() => import("./pages/service/CrmDevelopmentCompany"));
// Batch 2 service pages
const WebDesignCompany = lazyWithRetry(() => import("./pages/service/WebDesignCompany"));
const EcommerceDevelopmentCompany = lazyWithRetry(() => import("./pages/service/EcommerceDevelopmentCompany"));
const CustomSoftwareDevelopmentCompany = lazyWithRetry(() => import("./pages/service/CustomSoftwareDevelopmentCompany"));
const MobileAppDevelopmentCompany = lazyWithRetry(() => import("./pages/service/MobileAppDevelopmentCompany"));
const HrPortalDevelopmentCompany = lazyWithRetry(() => import("./pages/service/HrPortalDevelopmentCompany"));
const MetaAdsAgency = lazyWithRetry(() => import("./pages/service/MetaAdsAgency"));
const SocialMediaMarketingCompany = lazyWithRetry(() => import("./pages/service/SocialMediaMarketingCompany"));
const AiSolutionsCompany = lazyWithRetry(() => import("./pages/service/AiSolutionsCompany"));
const LocalSeoServices = lazyWithRetry(() => import("./pages/service/LocalSeoServices"));
const BusinessProcessAutomation = lazyWithRetry(() => import("./pages/service/BusinessProcessAutomation"));
// Batch A (35 service-cluster pages)
const WebsiteDevelopmentCompany = lazyWithRetry(() => import("./pages/service/WebsiteDevelopmentCompany"));
const FullStackDevelopmentCompany = lazyWithRetry(() => import("./pages/service/FullStackDevelopmentCompany"));
const ShopifyDevelopmentCompany = lazyWithRetry(() => import("./pages/service/ShopifyDevelopmentCompany"));
const WoocommerceDevelopmentCompany = lazyWithRetry(() => import("./pages/service/WoocommerceDevelopmentCompany"));
const CustomEcommerceDevelopment = lazyWithRetry(() => import("./pages/service/CustomEcommerceDevelopment"));
const CustomCrmDevelopment = lazyWithRetry(() => import("./pages/service/CustomCrmDevelopment"));
const CrmSoftwareDevelopment = lazyWithRetry(() => import("./pages/service/CrmSoftwareDevelopment"));
const CrmConsultingCompany = lazyWithRetry(() => import("./pages/service/CrmConsultingCompany"));
const ErpDevelopmentCompany = lazyWithRetry(() => import("./pages/service/ErpDevelopmentCompany"));
const CustomErpDevelopment = lazyWithRetry(() => import("./pages/service/CustomErpDevelopment"));
const ErpSoftwareDevelopmentCompany = lazyWithRetry(() => import("./pages/service/ErpSoftwareDevelopmentCompany"));
const HrmsDevelopmentCompany = lazyWithRetry(() => import("./pages/service/HrmsDevelopmentCompany"));
const HrSoftwareDevelopmentCompany = lazyWithRetry(() => import("./pages/service/HrSoftwareDevelopmentCompany"));
const AttendanceManagementSoftwareDevelopment = lazyWithRetry(() => import("./pages/service/AttendanceManagementSoftwareDevelopment"));
const PayrollSoftwareDevelopment = lazyWithRetry(() => import("./pages/service/PayrollSoftwareDevelopment"));
const BusinessOperatingSystemDevelopment = lazyWithRetry(() => import("./pages/service/BusinessOperatingSystemDevelopment"));
const WorkflowAutomationSoftwareDevelopment = lazyWithRetry(() => import("./pages/service/WorkflowAutomationSoftwareDevelopment"));
const AiDevelopmentCompany = lazyWithRetry(() => import("./pages/service/AiDevelopmentCompany"));
const AiChatbotDevelopment = lazyWithRetry(() => import("./pages/service/AiChatbotDevelopment"));
const OpenaiDevelopmentCompany = lazyWithRetry(() => import("./pages/service/OpenaiDevelopmentCompany"));
const ClaudeAiDevelopment = lazyWithRetry(() => import("./pages/service/ClaudeAiDevelopment"));
const GeminiAiDevelopment = lazyWithRetry(() => import("./pages/service/GeminiAiDevelopment"));
const McpDevelopmentCompany = lazyWithRetry(() => import("./pages/service/McpDevelopmentCompany"));
const LlmDevelopmentCompany = lazyWithRetry(() => import("./pages/service/LlmDevelopmentCompany"));
const AiConsultingCompany = lazyWithRetry(() => import("./pages/service/AiConsultingCompany"));
const AndroidAppDevelopmentCompany = lazyWithRetry(() => import("./pages/service/AndroidAppDevelopmentCompany"));
const IosAppDevelopmentCompany = lazyWithRetry(() => import("./pages/service/IosAppDevelopmentCompany"));
const FlutterAppDevelopmentCompany = lazyWithRetry(() => import("./pages/service/FlutterAppDevelopmentCompany"));
const ReactNativeDevelopmentCompany = lazyWithRetry(() => import("./pages/service/ReactNativeDevelopmentCompany"));
const SeoServices = lazyWithRetry(() => import("./pages/service/SeoServices"));
const EnterpriseSeoServices = lazyWithRetry(() => import("./pages/service/EnterpriseSeoServices"));
const EcommerceSeoServices = lazyWithRetry(() => import("./pages/service/EcommerceSeoServices"));
const PerformanceMarketingAgency = lazyWithRetry(() => import("./pages/service/PerformanceMarketingAgency"));
const FacebookAdsAgency = lazyWithRetry(() => import("./pages/service/FacebookAdsAgency"));
const InstagramMarketingAgency = lazyWithRetry(() => import("./pages/service/InstagramMarketingAgency"));
// Batch A services + comparison
const CustomWebDevelopmentCompany = lazyWithRetry(() => import("./pages/service/CustomWebDevelopmentCompany"));
const FrontendDevelopmentCompany = lazyWithRetry(() => import("./pages/service/FrontendDevelopmentCompany"));
const BackendDevelopmentCompany = lazyWithRetry(() => import("./pages/service/BackendDevelopmentCompany"));
const EcommerceWebsiteDevelopmentCompany = lazyWithRetry(() => import("./pages/service/EcommerceWebsiteDevelopmentCompany"));
const BusinessManagementSoftwareDevelopment = lazyWithRetry(() => import("./pages/service/BusinessManagementSoftwareDevelopment"));
const AgenticAiDevelopmentCompany = lazyWithRetry(() => import("./pages/service/AgenticAiDevelopmentCompany"));
const CustomAiDevelopment = lazyWithRetry(() => import("./pages/service/CustomAiDevelopment"));
// New comparison pages
const WebmokAlternative = lazyWithRetry(() => import("./pages/compare/WebmokAlternative"));
const WebAspirationAlternative = lazyWithRetry(() => import("./pages/compare/WebAspirationAlternative"));
const LeoDigitalsAlternative = lazyWithRetry(() => import("./pages/compare/LeoDigitalsAlternative"));
const TheGrowthBoxAlternative = lazyWithRetry(() => import("./pages/compare/TheGrowthBoxAlternative"));
const TechmagnateAlternative = lazyWithRetry(() => import("./pages/compare/TechmagnateAlternative"));
const PagetrafficAlternative = lazyWithRetry(() => import("./pages/compare/PagetrafficAlternative"));
const EzRankingsAlternative = lazyWithRetry(() => import("./pages/compare/EzRankingsAlternative"));
const IndeedseoAlternative = lazyWithRetry(() => import("./pages/compare/IndeedseoAlternative"));
// Batch 3 city pages
const WebDevelopmentCompanyRohtak = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyRohtak"));
// Batch B (12 metro/Gulf/intl city pages)
const SeoCompanyMumbai = lazyWithRetry(() => import("./pages/city/SeoCompanyMumbai"));
const SeoCompanyBangalore = lazyWithRetry(() => import("./pages/city/SeoCompanyBangalore"));
const DigitalMarketingCompanyMumbai = lazyWithRetry(() => import("./pages/city/DigitalMarketingCompanyMumbai"));
const DigitalMarketingCompanyBangalore = lazyWithRetry(() => import("./pages/city/DigitalMarketingCompanyBangalore"));
const DigitalMarketingCompanyChandigarh = lazyWithRetry(() => import("./pages/city/DigitalMarketingCompanyChandigarh"));
const WebDevelopmentCompanyDubai = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyDubai"));
const WebDevelopmentCompanyAbuDhabi = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyAbuDhabi"));
const WebDevelopmentCompanyQatar = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyQatar"));
const SeoCompanyDubai = lazyWithRetry(() => import("./pages/city/SeoCompanyDubai"));
const DigitalMarketingCompanyDubai = lazyWithRetry(() => import("./pages/city/DigitalMarketingCompanyDubai"));
const WebDevelopmentCompanyLondon = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyLondon"));
const WebDevelopmentCompanyUsa = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyUsa"));
const WebDevelopmentCompanyPanipat = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyPanipat"));
const WebDevelopmentCompanyKarnal = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyKarnal"));
const WebDevelopmentCompanySonipat = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanySonipat"));
const WebDevelopmentCompanyHisar = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyHisar"));
const WebDevelopmentCompanyAmbala = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyAmbala"));
const WebDevelopmentCompanyFaridabad = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyFaridabad"));
const WebDevelopmentCompanyGhaziabad = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyGhaziabad"));
const WebDevelopmentCompanyGreaterNoida = lazyWithRetry(() => import("./pages/city/WebDevelopmentCompanyGreaterNoida"));
const SeoCompanyGurgaon = lazyWithRetry(() => import("./pages/city/SeoCompanyGurgaon"));
const SeoCompanyNoida = lazyWithRetry(() => import("./pages/city/SeoCompanyNoida"));
const SeoCompanyRohtak = lazyWithRetry(() => import("./pages/city/SeoCompanyRohtak"));
const SeoCompanyPanipat = lazyWithRetry(() => import("./pages/city/SeoCompanyPanipat"));
const DigitalMarketingCompanyGurgaon = lazyWithRetry(() => import("./pages/city/DigitalMarketingCompanyGurgaon"));
const DigitalMarketingCompanyNoida = lazyWithRetry(() => import("./pages/city/DigitalMarketingCompanyNoida"));
const DigitalMarketingCompanyRohtak = lazyWithRetry(() => import("./pages/city/DigitalMarketingCompanyRohtak"));
const DigitalMarketingCompanyDelhi = lazyWithRetry(() => import("./pages/city/DigitalMarketingCompanyDelhi"));
const AiAutomationCompanyGurgaon = lazyWithRetry(() => import("./pages/city/AiAutomationCompanyGurgaon"));
const AiSolutionsCompanyNoida = lazyWithRetry(() => import("./pages/city/AiSolutionsCompanyNoida"));
const AiSolutionsCompanyDelhi = lazyWithRetry(() => import("./pages/city/AiSolutionsCompanyDelhi"));
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
import newSeoPagesKeys from "./data/newSeoPagesKeys.json";
const newSeoPagesKeysSet = new Set(newSeoPagesKeys);
const DynamicFlatSeoPage = lazyWithRetry(() => import("./pages/local/DynamicFlatSeoPage"));


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

  // Capture UTM / gclid / fbclid and the landing page once per session. Must run
  // on first mount: campaign parameters only exist on the entry URL, so a visitor
  // who lands on a guide and converts on a service page would otherwise be
  // attributed to "direct".
  useEffect(() => {
    captureAttribution();
  }, []);

  const pathForCheck = pathname.toLowerCase();
  
  // Clean pathname key (strip leading and trailing slashes) to look up in dynamic registry
  const dynamicKey = pathForCheck.replace(/^\/+|\/+$/g, '');
  const isDynamicSeoPath = newSeoPagesKeysSet.has(dynamicKey);
  
  // Define all paths that belong to the new MainLayout
  const isDHRoot = ["/", "/avanihome", "/about", "/services", "/projects", "/contact", "/blog", "/global-presence", "/careers", "/newsletters", "/courses", "/case-studies", "/get-consultation", "/privacy-policy", "/terms-and-conditions"].includes(pathForCheck);
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
    "/web-development-company",
    "/seo-company",
    "/digital-marketing-company",
    "/google-ads-agency",
    "/ai-automation-company",
    "/crm-development-company",
    "/web-design-company",
    "/ecommerce-development-company",
    "/custom-software-development-company",
    "/mobile-app-development-company",
    "/hr-portal-development-company",
    "/meta-ads-agency",
    "/social-media-marketing-company",
    "/ai-solutions-company",
    "/local-seo-services",
    "/business-process-automation",
    "/website-development-company",
    "/full-stack-development-company",
    "/shopify-development-company",
    "/woocommerce-development-company",
    "/custom-ecommerce-development",
    "/custom-crm-development",
    "/crm-software-development",
    "/crm-consulting-company",
    "/erp-development-company",
    "/custom-erp-development",
    "/erp-software-development-company",
    "/hrms-development-company",
    "/hr-software-development-company",
    "/attendance-management-software-development",
    "/payroll-software-development",
    "/business-operating-system-development",
    "/workflow-automation-software-development",
    "/ai-development-company",
    "/ai-chatbot-development",
    "/openai-development-company",
    "/claude-ai-development",
    "/gemini-ai-development",
    "/mcp-development-company",
    "/llm-development-company",
    "/ai-consulting-company",
    "/android-app-development-company",
    "/ios-app-development-company",
    "/flutter-app-development-company",
    "/react-native-development-company",
    "/seo-services",
    "/enterprise-seo-services",
    "/ecommerce-seo-services",
    "/performance-marketing-agency",
    "/facebook-ads-agency",
    "/instagram-marketing-agency",
    "/custom-web-development-company",
    "/frontend-development-company",
    "/backend-development-company",
    "/ecommerce-website-development-company",
    "/business-management-software-development",
    "/agentic-ai-development-company",
    "/custom-ai-development",
    "/webmok-alternative",
    "/web-aspiration-alternative",
    "/leo-digitals-alternative",
    "/the-growth-box-alternative",
    "/techmagnate-alternative",
    "/pagetraffic-alternative",
    "/ez-rankings-alternative",
    "/indeedseo-alternative",
    "/web-development-company-rohtak",
    "/seo-company-mumbai",
    "/seo-company-bangalore",
    "/digital-marketing-company-mumbai",
    "/digital-marketing-company-bangalore",
    "/digital-marketing-company-chandigarh",
    "/web-development-company-dubai",
    "/web-development-company-abu-dhabi",
    "/web-development-company-qatar",
    "/seo-company-dubai",
    "/digital-marketing-company-dubai",
    "/web-development-company-london",
    "/web-development-company-usa",
    "/web-development-company-panipat",
    "/web-development-company-karnal",
    "/web-development-company-sonipat",
    "/web-development-company-hisar",
    "/web-development-company-ambala",
    "/web-development-company-faridabad",
    "/web-development-company-ghaziabad",
    "/web-development-company-greater-noida",
    "/seo-company-gurgaon",
    "/seo-company-noida",
    "/seo-company-rohtak",
    "/seo-company-panipat",
    "/digital-marketing-company-gurgaon",
    "/digital-marketing-company-noida",
    "/digital-marketing-company-rohtak",
    "/digital-marketing-company-delhi",
    "/ai-automation-company-gurgaon",
    "/ai-solutions-company-noida",
    "/ai-solutions-company-delhi",
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
  ].includes(pathForCheck) || isDynamicSeoPath;
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
            {/* Alternate scroll-cinema homepage, running in parallel with /
                for evaluation. Shares MainLayout so the chrome matches. */}
            <Route path="avanihome" element={<AvaniHome />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/category/:category" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="guides" element={<GuidesIndex />} />
            <Route path="guides/:slug" element={<GuideDetail />} />
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

            {/* ── Flagship Service Pages ──────────────────────────────────────── */}
            <Route path="web-development-company" element={<WebDevelopmentCompany />} />
            <Route path="seo-company" element={<SeoCompany />} />
            <Route path="digital-marketing-company" element={<DigitalMarketingCompany />} />
            <Route path="google-ads-agency" element={<GoogleAdsAgency />} />
            <Route path="ai-automation-company" element={<AiAutomationCompany />} />
            <Route path="crm-development-company" element={<CrmDevelopmentCompany />} />
            <Route path="web-design-company" element={<WebDesignCompany />} />
            <Route path="ecommerce-development-company" element={<EcommerceDevelopmentCompany />} />
            <Route path="custom-software-development-company" element={<CustomSoftwareDevelopmentCompany />} />
            <Route path="mobile-app-development-company" element={<MobileAppDevelopmentCompany />} />
            <Route path="hr-portal-development-company" element={<HrPortalDevelopmentCompany />} />
            <Route path="meta-ads-agency" element={<MetaAdsAgency />} />
            <Route path="social-media-marketing-company" element={<SocialMediaMarketingCompany />} />
            <Route path="ai-solutions-company" element={<AiSolutionsCompany />} />
            <Route path="local-seo-services" element={<LocalSeoServices />} />
            <Route path="business-process-automation" element={<BusinessProcessAutomation />} />
            <Route path="website-development-company" element={<WebsiteDevelopmentCompany />} />
            <Route path="full-stack-development-company" element={<FullStackDevelopmentCompany />} />
            <Route path="shopify-development-company" element={<ShopifyDevelopmentCompany />} />
            <Route path="woocommerce-development-company" element={<WoocommerceDevelopmentCompany />} />
            <Route path="custom-ecommerce-development" element={<CustomEcommerceDevelopment />} />
            <Route path="custom-crm-development" element={<CustomCrmDevelopment />} />
            <Route path="crm-software-development" element={<CrmSoftwareDevelopment />} />
            <Route path="crm-consulting-company" element={<CrmConsultingCompany />} />
            <Route path="erp-development-company" element={<ErpDevelopmentCompany />} />
            <Route path="custom-erp-development" element={<CustomErpDevelopment />} />
            <Route path="erp-software-development-company" element={<ErpSoftwareDevelopmentCompany />} />
            <Route path="hrms-development-company" element={<HrmsDevelopmentCompany />} />
            <Route path="hr-software-development-company" element={<HrSoftwareDevelopmentCompany />} />
            <Route path="attendance-management-software-development" element={<AttendanceManagementSoftwareDevelopment />} />
            <Route path="payroll-software-development" element={<PayrollSoftwareDevelopment />} />
            <Route path="business-operating-system-development" element={<BusinessOperatingSystemDevelopment />} />
            <Route path="workflow-automation-software-development" element={<WorkflowAutomationSoftwareDevelopment />} />
            <Route path="ai-development-company" element={<AiDevelopmentCompany />} />
            <Route path="ai-chatbot-development" element={<AiChatbotDevelopment />} />
            <Route path="openai-development-company" element={<OpenaiDevelopmentCompany />} />
            <Route path="claude-ai-development" element={<ClaudeAiDevelopment />} />
            <Route path="gemini-ai-development" element={<GeminiAiDevelopment />} />
            <Route path="mcp-development-company" element={<McpDevelopmentCompany />} />
            <Route path="llm-development-company" element={<LlmDevelopmentCompany />} />
            <Route path="ai-consulting-company" element={<AiConsultingCompany />} />
            <Route path="android-app-development-company" element={<AndroidAppDevelopmentCompany />} />
            <Route path="ios-app-development-company" element={<IosAppDevelopmentCompany />} />
            <Route path="flutter-app-development-company" element={<FlutterAppDevelopmentCompany />} />
            <Route path="react-native-development-company" element={<ReactNativeDevelopmentCompany />} />
            <Route path="seo-services" element={<SeoServices />} />
            <Route path="enterprise-seo-services" element={<EnterpriseSeoServices />} />
            <Route path="ecommerce-seo-services" element={<EcommerceSeoServices />} />
            <Route path="performance-marketing-agency" element={<PerformanceMarketingAgency />} />
            <Route path="facebook-ads-agency" element={<FacebookAdsAgency />} />
            <Route path="instagram-marketing-agency" element={<InstagramMarketingAgency />} />
            <Route path="custom-web-development-company" element={<CustomWebDevelopmentCompany />} />
            <Route path="frontend-development-company" element={<FrontendDevelopmentCompany />} />
            <Route path="backend-development-company" element={<BackendDevelopmentCompany />} />
            <Route path="ecommerce-website-development-company" element={<EcommerceWebsiteDevelopmentCompany />} />
            <Route path="business-management-software-development" element={<BusinessManagementSoftwareDevelopment />} />
            <Route path="agentic-ai-development-company" element={<AgenticAiDevelopmentCompany />} />
            <Route path="custom-ai-development" element={<CustomAiDevelopment />} />
            {/* ── City Pages (Batch 3) ─────────────────────────────────────── */}
            <Route path="web-development-company-rohtak" element={<WebDevelopmentCompanyRohtak />} />
            <Route path="seo-company-mumbai" element={<SeoCompanyMumbai />} />
            <Route path="seo-company-bangalore" element={<SeoCompanyBangalore />} />
            <Route path="digital-marketing-company-mumbai" element={<DigitalMarketingCompanyMumbai />} />
            <Route path="digital-marketing-company-bangalore" element={<DigitalMarketingCompanyBangalore />} />
            <Route path="digital-marketing-company-chandigarh" element={<DigitalMarketingCompanyChandigarh />} />
            <Route path="web-development-company-dubai" element={<WebDevelopmentCompanyDubai />} />
            <Route path="web-development-company-abu-dhabi" element={<WebDevelopmentCompanyAbuDhabi />} />
            <Route path="web-development-company-qatar" element={<WebDevelopmentCompanyQatar />} />
            <Route path="seo-company-dubai" element={<SeoCompanyDubai />} />
            <Route path="digital-marketing-company-dubai" element={<DigitalMarketingCompanyDubai />} />
            <Route path="web-development-company-london" element={<WebDevelopmentCompanyLondon />} />
            <Route path="web-development-company-usa" element={<WebDevelopmentCompanyUsa />} />
            <Route path="web-development-company-panipat" element={<WebDevelopmentCompanyPanipat />} />
            <Route path="web-development-company-karnal" element={<WebDevelopmentCompanyKarnal />} />
            <Route path="web-development-company-sonipat" element={<WebDevelopmentCompanySonipat />} />
            <Route path="web-development-company-hisar" element={<WebDevelopmentCompanyHisar />} />
            <Route path="web-development-company-ambala" element={<WebDevelopmentCompanyAmbala />} />
            <Route path="web-development-company-faridabad" element={<WebDevelopmentCompanyFaridabad />} />
            <Route path="web-development-company-ghaziabad" element={<WebDevelopmentCompanyGhaziabad />} />
            <Route path="web-development-company-greater-noida" element={<WebDevelopmentCompanyGreaterNoida />} />
            <Route path="seo-company-gurgaon" element={<SeoCompanyGurgaon />} />
            <Route path="seo-company-noida" element={<SeoCompanyNoida />} />
            <Route path="seo-company-rohtak" element={<SeoCompanyRohtak />} />
            <Route path="seo-company-panipat" element={<SeoCompanyPanipat />} />
            <Route path="digital-marketing-company-gurgaon" element={<DigitalMarketingCompanyGurgaon />} />
            <Route path="digital-marketing-company-noida" element={<DigitalMarketingCompanyNoida />} />
            <Route path="digital-marketing-company-rohtak" element={<DigitalMarketingCompanyRohtak />} />
            <Route path="digital-marketing-company-delhi" element={<DigitalMarketingCompanyDelhi />} />
            <Route path="ai-automation-company-gurgaon" element={<AiAutomationCompanyGurgaon />} />
            <Route path="ai-solutions-company-noida" element={<AiSolutionsCompanyNoida />} />
            <Route path="ai-solutions-company-delhi" element={<AiSolutionsCompanyDelhi />} />

            {/* ── Competitor Alternative Pages ────────────────────────────────── */}
            <Route path="keka-alternative" element={<KekaAlternative />} />
            <Route path="webmok-alternative" element={<WebmokAlternative />} />
            <Route path="web-aspiration-alternative" element={<WebAspirationAlternative />} />
            <Route path="leo-digitals-alternative" element={<LeoDigitalsAlternative />} />
            <Route path="the-growth-box-alternative" element={<TheGrowthBoxAlternative />} />
            <Route path="techmagnate-alternative" element={<TechmagnateAlternative />} />
            <Route path="pagetraffic-alternative" element={<PagetrafficAlternative />} />
            <Route path="ez-rankings-alternative" element={<EzRankingsAlternative />} />
            <Route path="indeedseo-alternative" element={<IndeedseoAlternative />} />
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

            {/* Dynamic SEO Routes */}
            <Route path="business-os" element={<DynamicFlatSeoPage />} />
            <Route path="business-os/:subpage" element={<DynamicFlatSeoPage />} />
            <Route path="social-sync" element={<DynamicFlatSeoPage />} />
            <Route path="social-sync/:subpage" element={<DynamicFlatSeoPage />} />
            <Route path=":slug" element={<DynamicFlatSeoPage />} />
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

          <Route path="/sitemap" element={<HtmlSitemap />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/web-dev" element={<Index />} />
          <Route path="/7-day-launch" element={<SevenDayLaunch />} />
          <Route path="/policicue" element={<Policicue />} />
          
          <Route path="/admin" element={<AdminRedirect />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      {!hideFooter && (useFooter1 ? <Footer1 /> : <Footer />)}
      {!hideNavbar && <Suspense fallback={null}><Chatbot /></Suspense>}
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
                {/* First-party analytics. Must sit inside the Router because it
                    reads useLocation(). Renders null, swallows every error, and
                    sends nothing when an auth token is present so staff never
                    appear in the visitor stats. */}
                <AnalyticsTracker />
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