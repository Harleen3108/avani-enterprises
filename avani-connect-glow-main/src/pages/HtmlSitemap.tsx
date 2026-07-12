import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const SITE_URL = "https://www.avanienterprises.in";

const sections: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Core Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Projects Portfolio", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Global Presence", href: "/global-presence" },
      { label: "Courses", href: "/courses" },
      { label: "Newsletters", href: "/newsletters" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Web & Software Development",
    links: [
      { label: "Web Development Company", href: "/web-development-company" },
      { label: "Website Development Company", href: "/website-development-company" },
      { label: "Custom Web Development", href: "/custom-web-development-company" },
      { label: "Full Stack Development", href: "/full-stack-development-company" },
      { label: "Frontend Development", href: "/frontend-development-company" },
      { label: "Backend Development", href: "/backend-development-company" },
      { label: "Web Design Company", href: "/web-design-company" },
      { label: "Custom Software Development", href: "/custom-software-development-company" },
      { label: "Ecommerce Development", href: "/ecommerce-development-company" },
      { label: "Shopify Development", href: "/shopify-development-company" },
      { label: "WooCommerce Development", href: "/woocommerce-development-company" },
      { label: "Mobile App Development", href: "/mobile-app-development-company" },
      { label: "Android App Development", href: "/android-app-development-company" },
      { label: "iOS App Development", href: "/ios-app-development-company" },
      { label: "Flutter App Development", href: "/flutter-app-development-company" },
      { label: "React Native Development", href: "/react-native-development-company" },
      { label: "Business Process Automation", href: "/business-process-automation" },
      { label: "Business Management Software", href: "/business-management-software-development" },
    ],
  },
  {
    heading: "CRM & ERP Software",
    links: [
      { label: "CRM Development Company", href: "/crm-development-company" },
      { label: "CRM Software India", href: "/crm-software-india" },
      { label: "Custom CRM Development", href: "/custom-crm-development" },
      { label: "CRM Consulting", href: "/crm-consulting-company" },
      { label: "ERP Development Company", href: "/erp-development-company" },
      { label: "Custom ERP Development", href: "/custom-erp-development" },
    ],
  },
  {
    heading: "HR & Workforce Software",
    links: [
      { label: "HR Portal Software", href: "/hr-portal" },
      { label: "HRMS Software India", href: "/hrms-software-india" },
      { label: "Payroll Software India", href: "/payroll-software-india" },
      { label: "Attendance Management System", href: "/attendance-management-system" },
      { label: "Leave Management Software", href: "/leave-management-software" },
      { label: "Employee Management Software", href: "/employee-management-software" },
      { label: "Employee Portal", href: "/employee-portal" },
      { label: "Workforce Management Software", href: "/workforce-management-software" },
    ],
  },
  {
    heading: "AI & Automation",
    links: [
      { label: "AI Automation Company", href: "/ai-automation-company" },
      { label: "AI Development Company", href: "/ai-development-company" },
      { label: "AI Solutions Company", href: "/ai-solutions-company" },
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "Agentic AI Development", href: "/agentic-ai-development-company" },
      { label: "LLM Development Company", href: "/llm-development-company" },
      { label: "MCP Development Company", href: "/mcp-development-company" },
      { label: "AI Consulting Company", href: "/ai-consulting-company" },
    ],
  },
  {
    heading: "Digital Marketing",
    links: [
      { label: "Digital Marketing Company", href: "/digital-marketing-company" },
      { label: "SEO Company India", href: "/seo-company" },
      { label: "SEO Services", href: "/seo-services" },
      { label: "Enterprise SEO Services", href: "/enterprise-seo-services" },
      { label: "Local SEO Services", href: "/local-seo-services" },
      { label: "Ecommerce SEO Services", href: "/ecommerce-seo-services" },
      { label: "Google Ads Agency", href: "/google-ads-agency" },
      { label: "Meta Ads Agency", href: "/meta-ads-agency" },
      { label: "Facebook Ads Agency", href: "/facebook-ads-agency" },
      { label: "Instagram Marketing Agency", href: "/instagram-marketing-agency" },
      { label: "Social Media Marketing Company", href: "/social-media-marketing-company" },
      { label: "Performance Marketing Agency", href: "/performance-marketing-agency" },
    ],
  },
  {
    heading: "Location Pages — Delhi NCR & Haryana",
    links: [
      { label: "Web Development Company Gurgaon", href: "/web-development-company-gurgaon" },
      { label: "Web Development Company Noida", href: "/web-development-company-noida" },
      { label: "Web Development Company Delhi", href: "/web-development-company-delhi" },
      { label: "Web Development Company Rohtak", href: "/web-development-company-rohtak" },
      { label: "Web Development Company Panipat", href: "/web-development-company-panipat" },
      { label: "Web Development Company Karnal", href: "/web-development-company-karnal" },
      { label: "Digital Marketing Company Gurgaon", href: "/digital-marketing-company-gurgaon" },
      { label: "Digital Marketing Company Delhi", href: "/digital-marketing-company-delhi" },
      { label: "Digital Marketing Company Noida", href: "/digital-marketing-company-noida" },
      { label: "SEO Company Gurgaon", href: "/seo-company-gurgaon" },
      { label: "SEO Company Delhi", href: "/seo-company-delhi" },
      { label: "SEO Company Noida", href: "/seo-company-noida" },
      { label: "AI Automation Company Gurgaon", href: "/ai-automation-company-gurgaon" },
      { label: "Digital Marketing Agency Haryana", href: "/digital-marketing-agency-haryana" },
      { label: "Google Ads Agency Haryana", href: "/google-ads-agency-haryana" },
    ],
  },
  {
    heading: "Location Pages — Metro India",
    links: [
      { label: "Web Development Company Mumbai", href: "/web-development-company-mumbai" },
      { label: "Web Development Company Bangalore", href: "/web-development-company-bangalore" },
      { label: "Web Development Company Pune", href: "/web-development-company-pune" },
      { label: "Web Development Company Hyderabad", href: "/web-development-company-hyderabad" },
      { label: "Digital Marketing Company Mumbai", href: "/digital-marketing-company-mumbai" },
      { label: "Digital Marketing Company Bangalore", href: "/digital-marketing-company-bangalore" },
      { label: "SEO Company Mumbai", href: "/seo-company-mumbai" },
      { label: "SEO Company Bangalore", href: "/seo-company-bangalore" },
    ],
  },
  {
    heading: "Location Pages — International",
    links: [
      { label: "Web Development Company Dubai", href: "/web-development-company-dubai" },
      { label: "Web Development Company Abu Dhabi", href: "/web-development-company-abu-dhabi" },
      { label: "Web Development Company Qatar", href: "/web-development-company-qatar" },
      { label: "SEO Company Dubai", href: "/seo-company-dubai" },
      { label: "Digital Marketing Company Dubai", href: "/digital-marketing-company-dubai" },
      { label: "Web Development Company London", href: "/web-development-company-london" },
      { label: "Web Development Company USA", href: "/web-development-company-usa" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

// SiteNavigationElement JSON-LD for the top-level links
const navLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Avani Enterprises Site Map",
  "description": "Complete list of pages on Avani Enterprises website",
  "url": `${SITE_URL}/sitemap`,
  "numberOfItems": sections.reduce((acc, s) => acc + s.links.length, 0),
  "itemListElement": sections.flatMap((section, si) =>
    section.links.map((link, li) => ({
      "@type": "ListItem",
      "position": sections.slice(0, si).reduce((acc, s) => acc + s.links.length, 0) + li + 1,
      "name": link.label,
      "url": `${SITE_URL}${link.href}`
    }))
  )
};

export default function HtmlSitemap() {
  return (
    <>
      <Helmet>
        <title>Site Map | Avani Enterprises</title>
        <meta name="description" content="Browse the complete site map of Avani Enterprises — all web development, SEO, digital marketing, AI automation, and HR software pages in one place." />
        <link rel="canonical" href={`${SITE_URL}/sitemap`} />
        <meta name="robots" content="index,follow" />
        <script type="application/ld+json">{JSON.stringify(navLd)}</script>
      </Helmet>

      <main style={{ paddingTop: "7rem", paddingBottom: "5rem", background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }}>
        <div className="dh-container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
            Site Map
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", fontSize: "1rem" }}>
            Every page on <strong>Avani Enterprises</strong> — organized by category.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2.5rem" }}>
            {sections.map((section) => (
              <section key={section.heading} aria-labelledby={`sitemap-${section.heading.replace(/\s+/g, "-").toLowerCase()}`}>
                <h2
                  id={`sitemap-${section.heading.replace(/\s+/g, "-").toLowerCase()}`}
                  style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-primary, #3b82f6)", marginBottom: "0.75rem", borderBottom: "1px solid var(--border-light, rgba(255,255,255,0.1))", paddingBottom: "0.4rem" }}
                >
                  {section.heading}
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        style={{ color: "var(--text-secondary, #94a3b8)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.15s" }}
                        onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "var(--text-primary, #f1f5f9)"; }}
                        onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "var(--text-secondary, #94a3b8)"; }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
