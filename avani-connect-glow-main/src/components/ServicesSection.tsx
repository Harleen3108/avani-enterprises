
import { motion } from "framer-motion";
import { Code, Search, Share2, TrendingUp, Briefcase, Landmark, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom websites and mobile apps that drive conversions and user engagement with cutting-edge technology.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "Strategic social media campaigns that build brand awareness, drive engagement, and grow your online presence.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Search,
    title: "SEO & Content Marketing",
    description:
      "Data-driven SEO strategies and compelling content that ranks higher and converts visitors into customers.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Google & Meta Ads",
    description:
      "Performance-focused Google and Meta advertising campaigns to maximise ROI and scale customer acquisition.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Briefcase,
    title: "Business Consultation",
    description:
      "Expert guidance to optimize your business operations, strategy, and growth potential for long-term success.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Landmark,
    title: "Business Loans",
    description:
      "Flexible financing solutions including term loans, working capital, and equipment financing to fuel your growth.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: ShieldCheck,
    title: "Business Insurance",
    description:
      "Comprehensive protection for your business assets, liability, and employees with tailored insurance plans.",
    color: "from-emerald-500 to-green-500",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative bg-white">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-black text-white text-sm font-semibold mb-4">
            Our Services
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900">
            Smart Digital <span className="text-gradient">Experiences</span>
          </h2>

          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            From modern websites to intelligent AI systems, we create powerful digital solutions that drive real business results.
          </p>
        </motion.div>

        {/* Services Grid - responsive and compact for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300 shadow-sm"
            >

              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${service.color} p-[2px] mb-5 sm:mb-6 group-hover:scale-105 transition-transform duration-300`}>
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                {service.description}
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;

