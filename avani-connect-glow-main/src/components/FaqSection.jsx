import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// --- FAQ Data ---
const faqItems = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "We work with MERN Stack in which we use frameworks like React JS, Typescript for frontend, with expertise in Node.js, for erverless architectures for the backend. We also utilize databases like PostgreSQL and MongoDB.",
  },
  {
    question: "How long does a typical website project take?",
    answer:
      "The timeline depends heavily on the project's scope and complexity. A standard informational website may take 2-3 weeks, while complex e-commerce or custom application platforms can take 15-20 days or longer.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Absolutely. We offer full redesign services, focusing on modernizing the UI/UX, improving performance, and optimizing for conversion while preserving your existing branding and SEO value.",
  },
  {
    question: "What is your process for a new project?",
    answer:
      "Our process includes Discovery & Strategy, Design & Prototyping, Development & Testing, Deployment, and Post-launch Support. We maintain transparent communication and collaboration throughout all phases.",
  },
  {
    question: "Do you provide post-launch maintenance and support?",
    answer:
      "Yes, we offer flexible maintenance and support packages, including hosting management, security updates, performance monitoring, and continuous feature enhancements to ensure long-term success.",
  },
];

// --- FAQ Item Component ---
const FAQItem = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentVariants = {
    open: { opacity: 1, height: "auto", marginTop: "1rem" },
    closed: { opacity: 0, height: 0, marginTop: "0rem" },
  };

  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl glass card-shadow overflow-hidden cursor-pointer"
    >
      {/* Question Header */}
      <div
        className="p-6 flex justify-between items-start transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-display text-xl font-semibold text-foreground pr-4">
          {item.question}
        </h3>

        <motion.div
          variants={iconVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-accent" />
        </motion.div>
      </div>

      {/* Answer */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={contentVariants}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="overflow-hidden px-6 mb-4"
      >
        <p className="text-muted-foreground text-base pb-6">
          {item.answer}
        </p>
      </motion.div>

      {!isOpen && <div className="h-[1px] bg-border mx-6" />}
    </motion.div>
  );
};

// --- Main FAQ Section ---
const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-accent text-sm font-medium mb-4">
            Support
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Find quick answers to the most common questions about our services and
            process.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem key={item.question} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
