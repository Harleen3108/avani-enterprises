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
//                   <Route path="/get-consultation" element={<GetConsultation />} />
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

import { useEffect } from "react";
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
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import GetConsultation from "./pages/GetConsultation";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/privacypolicy";
import TermsConditions from "./pages/termsnandcondition";
import Index from "./pages/Index";
import Policicue from "./pages/Policicue";
import PolicicueProject from "./pages/PolicicueProject";
import IndusProject from "./pages/IndusProject";
import FrdNutritionProject from "./pages/FrdNutritionProject";
import HiTechHomesProject from "./pages/HiTechHomesProject";
import SanjeevniHospitalProject from "./pages/SanjeevniHospitalProject";
import RohtakShoeProject from "./pages/RohtakShoeProject";
import ServiceDetail from "./pages/ServiceDetail";
import LeadManagementProject from "./pages/LeadManagementProject";
import WhatsAppAutomationProject from "./pages/WhatsAppAutomationProject";
import BusinessProcessOptimizationProject from "./pages/BusinessProcessOptimizationProject";
import SevenDayLaunch from "./pages/SevenDayLaunch";

// नई लाइन: ThankYou page import
import ThankYou from "./pages/ThankYou";
import LandingPage from "./pages/LandingPage";
import LandingPage1 from "./pages/LandingPage1";
import BlogDetail from "./pages/BlogDetail";
import Chatbot from "./components/Chatbot";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import OurProducts from "./pages/OurProducts";
import Newsletters from "./pages/Newsletters";
import NewsletterDetail from "./pages/NewsletterDetail";
import GlobalPresence from "./pages/GlobalPresence";
import Links from "./pages/Links";
import DummyHome from "./components/dummy/DummyHome";
import DummyHome2 from "./pages/DummyHome2";
import DH2Layout from "./components/dummyhome2/DH2Layout";
import DH2About from "./pages/dummyhome2/DH2About";
import DH2Services from "./pages/dummyhome2/DH2Services";
import DH2Contact from "./pages/dummyhome2/DH2Contact";
import DH2Consultation from "./pages/dummyhome2/DH2Consultation";
import DH2CaseStudies from "./pages/dummyhome2/DH2CaseStudies";
import DH2Blog from "./pages/dummyhome2/DH2Blog";
import DH2Products from "./pages/dummyhome2/DH2Products";
import DH2GlobalPresence from "./pages/dummyhome2/DH2GlobalPresence";
import DH2Careers from "./pages/dummyhome2/DH2Careers";
import DH2Newsletters from "./pages/dummyhome2/DH2Newsletters";
import DH2Privacy from "./pages/dummyhome2/DH2Privacy";
import DH2Terms from "./pages/dummyhome2/DH2Terms";
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

  // Pages where Navbar should be hidden completely
  const pathForCheck = pathname.toLowerCase();
  const isDH2 = pathForCheck.startsWith('/dummyhome2');
  const hideNavbar = pathForCheck === "/thank-you" || pathForCheck === "/business-setup" || pathForCheck === "/businesssetup1" || pathForCheck === "/dummyhome" || isDH2;

  // Pages where Navbar1 should be used instead of default Navbar
  const useNavbar1 = pathForCheck === "/web-dev" || pathForCheck === "/7-day-launch";

  // Pages where Footer should be hidden completely
  const hideFooter = pathForCheck === "/thank-you" || pathForCheck === "/links" || pathForCheck === "/dummyhome" || isDH2;

  // Pages where Footer1 should be used instead of default Footer
  const useFooter1 = pathForCheck === "/web-dev" || pathForCheck === "/7-day-launch";

  return (
    <div className="min-h-screen">
      <SeoHead />
      {!hideNavbar && (useNavbar1 ? <Navbar1 /> : <Navbar />)}
      <main className="pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dummyhome" element={<DummyHome />} />
          <Route path="/dummyhome2" element={<DummyHome2 />} />
          {/* DH2 Sub-pages with shared layout */}
          <Route path="/dummyhome2" element={<DH2Layout />}>
            <Route path="about" element={<DH2About />} />
            <Route path="services" element={<DH2Services />} />
            <Route path="services/:id" element={<DH2PlaceholderPage title="Service Detail" />} />
            <Route path="our-products" element={<DH2Products />} />
            <Route path="case-studies" element={<DH2CaseStudies />} />
            <Route path="contact" element={<DH2Contact />} />
            <Route path="blog" element={<DH2Blog />} />
            <Route path="blog/:slug" element={<DH2PlaceholderPage title="Blog Detail" />} />
            <Route path="get-consultation" element={<DH2Consultation />} />
            <Route path="global-presence" element={<DH2GlobalPresence />} />
            <Route path="careers" element={<DH2Careers />} />
            <Route path="careers/:id" element={<DH2PlaceholderPage title="Career Detail" />} />
            <Route path="newsletters" element={<DH2Newsletters />} />
            <Route path="newsletters/:slug" element={<DH2PlaceholderPage title="Newsletter Detail" />} />
            <Route path="privacy-policy" element={<DH2Privacy />} />
            <Route path="terms-and-conditions" element={<DH2Terms />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/our-products" element={<OurProducts />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/newsletters/:slug" element={<NewsletterDetail />} />
          <Route path="/global-presence" element={<GlobalPresence />} />
          <Route path="/links" element={<Links />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/get-consultation" element={<GetConsultation />} />

          {/* ये नया route जोड़ा है */}
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/business-setup" element={<LandingPage />} />
          <Route path="/businesssetup1" element={<LandingPage1 />} />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/web-dev" element={<Index />} />
          <Route path="/7-day-launch" element={<SevenDayLaunch />} />
          <Route path="/policicue" element={<Policicue />} />
          <Route path="/projects/policicue" element={<PolicicueProject />} />
          <Route path="/projects/indus" element={<IndusProject />} />
          <Route path="/projects/frd-nutrition" element={<FrdNutritionProject />} />
          <Route path="/projects/hitech-homes" element={<HiTechHomesProject />} />
          <Route path="/projects/sanjeevni-hospital" element={<SanjeevniHospitalProject />} />
          <Route path="/projects/rohtak-shoe" element={<RohtakShoeProject />} />
          <Route path="/projects/lead-management-automation" element={<LeadManagementProject />} />
          <Route path="/projects/whatsapp-automation" element={<WhatsAppAutomationProject />} />
          <Route path="/projects/business-process-optimization" element={<BusinessProcessOptimizationProject />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<CareerDetail />} />
          <Route path="/admin" element={<AdminRedirect />} />

          {/* Blog detail route */}
          <Route path="/blog/:slug" element={<BlogDetail />} />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
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