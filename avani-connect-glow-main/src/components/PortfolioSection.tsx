
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const portfolioItems = [
  {
    title: "School Management (ERP)",
    category: "Web Development",
    description:
      "A full-featured web application designed to modernize school operations and administration. It automates core tasks, including digital attendance tracking, seamless timetable generation, and secure online fee management. The system features dedicated, role-based access for Admin, Teacher, and Parent users. This setup allows for real-time data analytics to significantly boost institutional efficiency and stakeholder communication.",
    image: "./h-sm.jpg",
    stats: { growth: "+180%", metric: "Sales Growth" },
  },
  {
    title: "Shoe E-Commerce",
    category: "Web Development",
    description:
      "Developed a feature-rich footwear e-commerce platform optimized for a modern shopping experience. Key functionalities include stunning 3D product previews and a smooth, secure cart-to-checkout process. The system also features smart inventory management and dedicated admin/delivery dashboards. It allows for advanced features like order rescheduling, refund tracking, and analytics-driven business insights.",
    image: "./s-shoe.jpg",
    stats: { growth: "+210%", metric: "Online Sales" },
  },
  {
    title: "HR Portal (ERP Software)",
    category: "Web Development",
    description:
      "A comprehensive HR management system built to streamline and automate workforce operations. It includes robust features for attendance tracking, efficient leave management, and automated payroll processing. The platform provides employee performance analytics, secure document handling, and internal communication tools. All functions are governed by dedicated role-based access dashboards for a centralized, efficient HR workflow.",
    image: "./s-hr.jpg",
    stats: { growth: "+70%", metric: "Operational Efficiency" },
  },
 
  {
    title: "Hospital Website",
    category: "Web Development",
    description:"Developed a comprehensive web platform for Holy Heart Hospital, specializing in advanced cardiac care services. The system integrates an AI Chatbot ('HealthBot') for instant support and efficient appointment booking for patients. Key features include secure online OPD and test booking, fully integrated with a secure payment gateway (Razorpay). Additionally, it provides a robust Admin analytics dashboard and patient portals for managing orders and accessing downloadable invoices.",
    image: "./s2.jpg",
    stats: { growth: "+320%", metric: "Lead Generation" },
  },
  
  {
    title: "Hi-tech Property",
    category: "Web Development",
    description:
      "A professional, full-service property management portal designed to centralize real estate operations. The platform features an extensive listing module for showcasing available properties with high-quality media. It includes robust lead capture tools to streamline client inquiries and follow-ups effectively. Dedicated admin tools are provided to ensure efficient management of all listings, client data, and operational workflows.",
    image: "./s6.jpg",
    stats: { growth: "-60%", metric: "Support Tickets" },
  },
  {
    title: "Insurance Website",
    category: "Web Development",
    description:
      "A specialized platform focused on simplifying the insurance selection and management process for users. It offers clear, intuitive plan comparison tools, making it easy for customers to choose the right coverage. The system facilitates quick and accurate quote requests directly through the site for instant service delivery. All processes are designed around secure policy management, building customer trust and providing clarity in every interaction.",
    image: "./s5.jpg",
    stats: { growth: "+500K", metric: "Monthly Leads" },
  },
];



const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-accent text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover how we've helped businesses transform their digital presence 
            and achieve remarkable growth.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden glass card-shadow"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full  transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" /> */}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-medium">
                    {item.category}
                  </span>
                </div>

                {/* NOTE: removed the top-right stats badge as requested */}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {item.description}
                </p>

                {/* 'View Case Study' removed as requested */}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          {/* <Button variant="glass" size="lg" asChild>
            <a href="#contact" className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;

