import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
    Users,
    GraduationCap,
    Layout,
    ShoppingBag,
    ChevronRight,
    ExternalLink,
    Zap,
    BarChart3,
    Clock,
    ShieldCheck,
    Briefcase,
    ShoppingCart,
    CheckCircle2,
    Calculator,
    FileText,
    ArrowRight,
    Sparkles
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import RotatingText from "../components/RotatingText";


const products = [
    {
        id: "hr-portal",
        title: "Advanced HR Portal",
        description: "A comprehensive workforce management solution designed to streamline HR operations, from attendance tracking to automated payroll processing.",
        longDescription: "Our HR Portal is built to handle the complexities of modern team management. It simplifies administrative tasks and empowers employees with self-service features.",
        icon: <Users className="w-8 h-8 text-amber-500" />,
        link: "https://hrportal.avanienterprises.in/",
        features: [
            "Employee Profile Management",
            "Automated Salary Calculation",
            "Digital Salary Slips",
            "EOD Performance Reports",
            "Leave & Attendance Tracking",
            "Performance Analytics"
        ],
        highlights: ["Analytics", "Salary Calculation", "Employee Self-Service"],
        image: "/hr-portal-new.png"
    },
    {
        id: "school-management",
        title: "School Management System",
        description: "A robust platform for educational institutions to manage students, staff, and daily academic activities with ease and precision.",
        longDescription: "Designed for modern schools, this system bridges the gap between administrators, teachers, parents, and students through a unified digital ecosystem.",
        icon: <GraduationCap className="w-8 h-8 text-amber-500" />,
        link: "https://indus-school-page.vercel.app/admission",
        features: [
            "Teacher Student Module",
            "Fee Management & Invoicing",
            "Examination & Result Processing",
            "Timetable & Scheduling",
            "Parent-Teacher Communication",
            "Library & Inventory Management"
        ],
        highlights: ["Online Admissions", "Exam Management", "Fee Tracking"],
        image: "/school-management-hero.png"
    },
    {
        id: "crm-portal",
        title: "Project & Lead Management CRM",
        description: "Transform your sales pipeline and project workflows with our intuitive CRM designed for high-growth businesses.",
        longDescription: "Our CRM helps you track every lead, manage complex projects, and maintain strong client relationships all in one integrated dashboard.",
        icon: <Briefcase className="w-8 h-8 text-amber-500" />,
        link: "https://team-lead-gamma.vercel.app/",
        features: [
            "Lead Pipeline Automation",
            "Project Task Management",
            "Client Communication Hub",
            "Sales Forecasting Reports",
            "Document Management",
            "Team Collaboration Tools"
        ],
        highlights: ["Lead Tracking", "Automated Follow-ups", "Revenue Insights"],
        image: "/crm-hero.png"
    },
    {
        id: "ecommerce-web",
        title: "Custom E-commerce Website",
        description: "Scale your retail business with a high-performance, custom-built online store tailored to your brand's unique needs.",
        longDescription: "We build e-commerce solutions that focus on conversions, user experience, and seamless integrations with payment and shipping providers.",
        icon: <ShoppingCart className="w-8 h-8 text-amber-500" />,
        link: "https://shoes-ecommerce-iota.vercel.app/",
        features: [
            "Product Catalog Management",
            "Secure Payment Integration",
            "Inventory & Order Tracking",
            "Customer Account Portals",
            "SEO Optimized Architecture",
            "Mobile-First Responsive Design"
        ],
        highlights: ["Multi-vendor Support", "Flash Sales Engine", "Safe Checkout"],
        image: "/ecommerce-hero.png"
    }
];

const OurProducts = () => {
    const location = useLocation();

    React.useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    const navbarHeight = 100;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }, 200);
            }
        }
    }, [location]);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative pt-24 pb-8 md:pb-12 bg-[#fefaf6] overflow-hidden min-h-[60vh] flex items-center">
                {/* Homepage-style Background Decoration */}
                <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none hidden lg:block">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-transparent rounded-l-[20rem] transform scale-x-110 translate-x-20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeInUp" delay={0.2}>
                        <div className="text-center">
                            <motion.span
                                className="text-amber-600 font-extrabold text-sm uppercase tracking-widest mb-4 block"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Premium Digital Ecosystem
                            </motion.span>

                            <motion.h1
                                className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                Digital Products and <br className="hidden md:block" />
                                <RotatingText
                                    words={["Solutions", "Innovation", "Products", "Success"]}
                                    className="text-amber-500"
                                    interval={3000}
                                />
                            </motion.h1>

                            <motion.p
                                className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Innovative digital ecosystems designed to empower businesses and institutions with cutting-edge technology and seamless user experiences.
                            </motion.p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Product Sections */}
            <section className="relative pt-0 md:pt-12 pb-24 bg-[#fefaf6] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="space-y-20 lg:space-y-32">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                id={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center`}
                            >
                                {/* Mobile-only Title Section */}
                                <div className="lg:hidden w-full space-y-4 mb-4">
                                    <div className="inline-flex items-center justify-center p-3 bg-amber-50 rounded-2xl shadow-sm border border-amber-100">
                                        {product.icon}
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                        {product.title}
                                    </h2>
                                </div>

                                {/* Image side with Premium Browser Mockup */}
                                <div className="flex-1 relative group w-full max-w-xl lg:max-w-none">
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/10 to-orange-500/10 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl bg-slate-50 flex flex-col">
                                        {/* Browser Tool Bar Handle */}
                                        <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center">
                                            <div className="mx-auto bg-slate-50 px-4 py-1 rounded-full border border-slate-100 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.link?.replace('https://', '').split('/')[0] || 'avanienterprises.in'}</span>
                                            </div>
                                        </div>

                                        <div className="relative bg-white overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className={`w-full h-auto object-contain transition-all duration-700 group-hover:scale-[1.02] ${product.id === 'hr-portal' ? 'object-top' : ''
                                                    }`}
                                            />

                                            {/* Status Badge */}
                                            {product.id === "hr-portal" && (
                                                <div className="absolute top-4 left-4 font-black text-[10px] uppercase tracking-widest bg-amber-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                                                    Featured Product
                                                </div>
                                            )}
                                        </div>

                                        {/* Floating Analytics Card mock for HR Portal */}
                                        {product.id === "hr-portal" && (
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className="absolute top-20 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 space-y-2 hidden md:block"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <BarChart3 className="w-5 h-5 text-amber-500" />
                                                    <span className="text-sm font-black text-slate-900">Live Analytics</span>
                                                </div>
                                                <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full w-2/3 bg-amber-500" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="flex-1 space-y-8 w-full">
                                    <div className="space-y-4">
                                        {/* Desktop-only Title block */}
                                        <div className="hidden lg:block space-y-4">
                                            <div className="inline-flex items-center justify-center p-3 bg-amber-50 rounded-2xl shadow-sm border border-amber-100">
                                                {product.icon}
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                                {product.title}
                                            </h2>
                                        </div>
                                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                            {product.description}
                                        </p>
                                    </div>

                                    <motion.div
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: {
                                                    staggerChildren: 0.1
                                                }
                                            }
                                        }}
                                    >
                                        {product.features.map((feature, i) => (
                                            <motion.div
                                                key={i}
                                                variants={{
                                                    hidden: { opacity: 0, x: -20 },
                                                    visible: { opacity: 1, x: 0 }
                                                }}
                                                whileHover={{
                                                    scale: 1.02,
                                                    x: 5,
                                                    transition: { duration: 0.2 }
                                                }}
                                                className="flex items-center gap-3 text-slate-700 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all group cursor-default"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                                                    <CheckCircle2 className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors duration-300" />
                                                </div>
                                                <span className="font-bold text-sm tracking-tight">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <div className="pt-6 flex flex-wrap gap-4 items-center">
                                        {product.link ? (
                                            <a
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-200 group"
                                            >
                                                Visit Product
                                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </a>
                                        ) : (
                                            <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-200">
                                                Coming Soon
                                            </button>
                                        )}

                                        <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest px-4">
                                            Key Focus: {product.highlights.join(" • ")}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default OurProducts;
