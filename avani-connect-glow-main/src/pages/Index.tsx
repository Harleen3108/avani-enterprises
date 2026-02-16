import "../App.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
// import PageHeader from "@/components/PageHeader";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FaqSection";

const Index = () => {
  useEffect(() => {
    // Handle hash navigation from other pages
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }

    // Add smooth scroll behavior to all anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Helmet>
        <title>Avani Enterprises | Digital Marketing & Web Development Services</title>
        <meta 
          name="description" 
          content="Transform your brand with Avani Enterprises. We offer web development, SEO, social media marketing, AI solutions, and digital consulting services. Get your free consultation today." 
        />
        <meta name="keywords" content="digital marketing, web development, SEO, social media marketing, AI solutions, brand transformation, India" />
        <link rel="canonical" href="https://avani-enterprises.vercel.app" />
      </Helmet>

      <div className="min-h-screen index-page-wrapper">
        {/* <PageHeader /> */}
        <main className="">
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          
          <RegistrationForm uniqueConsentId={"registrationForm2"}/>
          <FAQSection/>
        </main>
      </div>
    </>
  );
};

export default Index;
