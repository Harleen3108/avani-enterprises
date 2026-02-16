import "../App.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import GoogleSearchAdsSection from "@/components/GoogleSearchAdsSection";
import RegistrationForm from "@/components/RegistrationForm";
import FAQSection from "@/components/FaqSection";

const SevenDayLaunch = () => {
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
                <title>7 Day Business Launch | Avani Enterprises</title>
                <meta
                    name="description"
                    content="Launch your business in Delhi NCR in just 7 days. Complete package including registration, website, and marketing starting @ ₹2,499."
                />
                <meta name="keywords" content="7 day business launch, startup india, company registration, website development, digital marketing, business setup delhi ncr" />
                <link rel="canonical" href="https://avani-enterprises.vercel.app/7-day-launch" />
            </Helmet>

            <div className="min-h-screen index-page-wrapper">
                <main className="">
                    <HeroSection source="7-day-launch" />
                    <GoogleSearchAdsSection />
                    <RegistrationForm uniqueConsentId={"sevenDayLaunchForm"} source="7-day-launch" />
                    <FAQSection />
                </main>
            </div>
        </>
    );
};

export default SevenDayLaunch;
