// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Globe, 
//   Search, 
//   Share2, 
//   Brain, 
//   Mic, 
//   Calculator,
//   CheckCircle,
//   ArrowRight,
//   Star,
//   Clock,
//   Users
// } from 'lucide-react';
// import AnimatedSection from '../components/AnimatedSection';

// const Services = () => {
//   const [activeTab, setActiveTab] = useState('all');

//   const services = [
//     {
//       id: 'web-development',
//       category: 'development',
//       icon: <Globe className="w-8 h-8" />,
//       title: "Web & App Development",
//       description: "Custom websites and mobile applications that drive conversions and user engagement.",
//       features: [
//         "Responsive design for all devices",
//         "Custom CMS development",
//         "E-commerce solutions",
//         "Mobile app development",
//         "API integration",
//         "Performance optimization"
//       ],
//       price: "₹15,000 - ₹5,00,000",
//       duration: "4-12 weeks",
//       color: "from-blue-500 to-blue-600"
//     },
//     {
//       id: 'seo-content',
//       category: 'marketing',
//       icon: <Search className="w-8 h-8" />,
//       title: "SEO & Content Marketing",
//       description: "Data-driven SEO strategies and compelling content that ranks and converts.",
//       features: [
//         "Technical SEO audit",
//         "Keyword research & strategy",
//         "Content creation & optimization",
//         "Link building campaigns",
//         "Local SEO optimization",
//         "Performance tracking"
//       ],
//       price: "₹10,000 - ₹2,00,000",
//       duration: "3-6 months",
//       color: "from-green-500 to-green-600"
//     },
//     {
//       id: 'social-media',
//       category: 'marketing',
//       icon: <Share2 className="w-8 h-8" />,
//       title: "Social Media Marketing",
//       description: "Strategic SMM campaigns that build brand awareness and drive engagement.",
//       features: [
//         "Platform-specific strategies",
//         "Content calendar creation",
//         "Community management",
//         "Paid social campaigns",
//         "Influencer partnerships",
//         "Analytics & reporting"
//       ],
//       price: "₹15,000 - ₹1,50,000",
//       duration: "Ongoing",
//       color: "from-purple-500 to-purple-600"
//     },
//     {
//       id: 'ai-solutions',
//       category: 'technology',
//       icon: <Brain className="w-8 h-8" />,
//       title: "AI Solutions",
//       description: "Cutting-edge AI integration for automation and intelligent decision-making.",
//       features: [
//         "Chatbot development",
//         "Predictive analytics",
//         "Process automation",
//         "Data analysis & insights",
//         "Machine learning models",
//         "AI-powered tools"
//       ],
//       price: "₹30,000 - ₹10,00,000",
//       duration: "6-16 weeks",
//       color: "from-orange-500 to-orange-600"
//     },
//     {
//       id: 'podcast-production',
//       category: 'content',
//       icon: <Mic className="w-8 h-8" />,
//       title: "Podcast Production",
//       description: "Professional podcast creation and distribution to amplify your brand voice.",
//       features: [
//         "Podcast strategy & planning",
//         "Professional recording",
//         "Audio editing & mixing",
//         "Show notes & transcripts",
//         "Distribution & promotion",
//         "Analytics & optimization"
//       ],
//       price: "₹20,000 - ₹3,00,000",
//       duration: "Ongoing",
//       color: "from-red-500 to-red-600"
//     },
//     {
//       id: 'financial-consulting',
//       category: 'consulting',
//       icon: <Calculator className="w-8 h-8" />,
//       title: "Financial Consulting",
//       description: "Strategic financial planning and investment guidance for business growth.",
//       features: [
//         "Financial planning",
//         "Investment strategies",
//         "Risk assessment",
//         "Tax optimization",
//         "Funding guidance",
//         "Performance analysis"
//       ],
//       price: "₹10,000 - ₹5,00,000",
//       duration: "Ongoing",
//       color: "from-indigo-500 to-indigo-600"
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Services' },
//     { id: 'development', name: 'Development' },
//     { id: 'marketing', name: 'Marketing' },
//     { id: 'technology', name: 'Technology' },
//     { id: 'content', name: 'Content' },
//     { id: 'consulting', name: 'Consulting' }
//   ];

//   const filteredServices = activeTab === 'all' 
//     ? services 
//     : services.filter(service => service.category === activeTab);

//   return (
//     <div className="pt-20">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <AnimatedSection animation="fadeInUp" delay={0.2}>
//             <div className="text-center">
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//                 Our Services
//               </h1>
//               <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//                 Comprehensive digital solutions designed to drive growth, enhance brand presence, 
//                 and deliver measurable results for your business.
//               </p>
//             </div>
//           </AnimatedSection>
//         </div>
//       </section>

//       {/* Service Categories */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-wrap justify-center gap-4 mb-12">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setActiveTab(category.id)}
//                 className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
//                   activeTab === category.id
//                     ? 'bg-blue-600 text-white shadow-lg'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredServices.map((service) => (
//               <AnimatedSection key={service.id} animation="fadeInUp" delay={0.4 + (filteredServices.indexOf(service) * 0.1)}>
//                 <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
//                   <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
//                         {service.icon}
//                       </div>
//                       <div className="text-right">
//                         <div className="text-sm opacity-90">Starting from</div>
//                         <div className="text-lg font-bold">{service.price.split(' - ')[0]}</div>
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-bold mb-2">{service.title}</h3>
//                     <p className="text-white/90 text-sm">{service.description}</p>
//                   </div>

//                   <div className="p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center text-gray-600">
//                         <Clock className="w-4 h-4 mr-2" />
//                         <span className="text-sm">{service.duration}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <Users className="w-4 h-4 mr-2" />
//                         <span className="text-sm">Team of 3-5</span>
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
//                       <ul className="space-y-2">
//                         {service.features.slice(0, 4).map((feature, index) => (
//                           <li key={index} className="flex items-start">
//                             <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
//                             <span className="text-sm text-gray-600">{feature}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <Link
//                       to={`/contact?service=${service.id}`}
//                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
//                     >
//                       Get Quote
//                       <ArrowRight className="ml-2 w-4 h-4" />
//                     </Link>
//                   </div>
//                 </div>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Process Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               How We Work
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Our proven process ensures successful project delivery and exceptional results.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
//                 1
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Discovery</h3>
//               <p className="text-gray-600">
//                 We analyze your business, goals, and requirements to create a strategic plan.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
//                 2
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategy</h3>
//               <p className="text-gray-600">
//                 We develop a comprehensive strategy tailored to your specific needs and objectives.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
//                 3
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Execution</h3>
//               <p className="text-gray-600">
//                 Our expert team implements the strategy with regular updates and quality assurance.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
//                 4
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimization</h3>
//               <p className="text-gray-600">
//                 We continuously monitor, analyze, and optimize for maximum performance and ROI.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               What Our Clients Say
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Real feedback from businesses we've helped transform.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-gray-50 rounded-xl p-8">
//               <div className="flex items-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                 ))}
//               </div>
//               <p className="text-gray-700 mb-6 italic">
//                 "Avani Enterprises transformed our digital presence completely. Their SEO and content 
//                 marketing strategies helped us achieve 300% increase in organic traffic."
//               </p>
//               <div className="flex items-center">
//                 <img
//                   src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
//                   alt="Client"
//                   className="w-12 h-12 rounded-full mr-4"
//                 />
//                 <div>
//                   <div className="font-semibold text-gray-900">Priya Sharma</div>
//                   <div className="text-sm text-gray-600">CEO, TechStart India</div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-50 rounded-xl p-8">
//               <div className="flex items-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                 ))}
//               </div>
//               <p className="text-gray-700 mb-6 italic">
//                 "The team's expertise in web development and AI solutions helped us automate 
//                 70% of our customer service operations."
//               </p>
//               <div className="flex items-center">
//                 <img
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
//                   alt="Client"
//                   className="w-12 h-12 rounded-full mr-4"
//                 />
//                 <div>
//                   <div className="font-semibold text-gray-900">Rajesh Kumar</div>
//                   <div className="text-sm text-gray-600">Founder, EcoSolutions</div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-50 rounded-xl p-8">
//               <div className="flex items-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                 ))}
//               </div>
//               <p className="text-gray-700 mb-6 italic">
//                 "Their social media marketing campaigns increased our brand awareness by 200% 
//                 and generated 150% more leads for our business."
//               </p>
//               <div className="flex items-center">
//                 <img
//                   src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
//                   alt="Client"
//                   className="w-12 h-12 rounded-full mr-4"
//                 />
//                 <div>
//                   <div className="font-semibold text-gray-900">Anita Patel</div>
//                   <div className="text-sm text-gray-600">Marketing Director, HealthTech</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Ready to Get Started?
//           </h2>
//           <p className="text-xl mb-8 text-blue-100">
//             Let's discuss your project requirements and create a custom solution that fits your budget and timeline.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//              to="/get-consultation"
//               className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
//             >
//               Get Consultation
//             </Link>
//             <a
//               href="tel:+919253625099"
//               className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
//             >
//               Call Us Now
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Services; 

























import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Globe,
  Search,
  Share2,
  Brain,
  Mic,
  Calculator,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Star,
  Clock,
  Users,
  Briefcase,
  Landmark,
  ShieldCheck
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import RotatingText from '../components/RotatingText';
import { motion } from 'framer-motion';

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Add timeout to ensure DOM is fully ready
        setTimeout(() => {
          const navbarHeight = 100; // Approx 80px navbar + 20px padding
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, [location]);

  const services = [
    {
      id: 'web-development',
      category: 'development',
      icon: <Globe className="w-8 h-8" />,
      title: "Web & App Development",
      description: "Custom websites and mobile applications that drive conversions and user engagement.",
      features: [
        "Responsive design for all devices",
        "Custom CMS development",
        "E-commerce solutions",
        "Mobile app development",
        "API integration",
        "Performance optimization"
      ],
      price: "₹15,000 - ₹5,00,000",
      duration: "4-12 weeks",
      color: "from-blue-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      id: 'seo-content',
      category: 'marketing',
      icon: <Search className="w-8 h-8" />,
      title: "SEO & Content Marketing",
      description: "Data-driven SEO strategies and compelling content that ranks and converts.",
      features: [
        "Technical SEO audit",
        "Keyword research & strategy",
        "Content creation & optimization",
        "Link building campaigns",
        "Local SEO optimization",
        "Performance tracking"
      ],
      price: "₹10,000 - ₹2,00,000",
      duration: "3-6 months",
      color: "from-green-500 to-green-600",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop"
    },
    {
      id: 'social-media',
      category: 'marketing',
      icon: <Share2 className="w-8 h-8" />,
      title: "Social Media Marketing",
      description: "Strategic SMM campaigns that build brand awareness and drive engagement.",
      features: [
        "Platform-specific strategies",
        "Content calendar creation",
        "Community management",
        "Paid social campaigns",
        "Influencer partnerships",
        "Analytics & reporting"
      ],
      price: "₹15,000 - ₹1,50,000",
      duration: "Ongoing",
      color: "from-purple-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop"
    },
    {
      id: 'ai-solutions',
      category: 'technology',
      icon: <Brain className="w-8 h-8" />,
      title: "AI Solutions",
      description: "Cutting-edge AI integration for automation and intelligent decision-making.",
      features: [
        "Chatbot development",
        "Lead management automation",
        "WhatsApp text automation",
        "Predictive analytics",
        "Process automation",
        "Data analysis & insights"
      ],
      price: "₹30,000 - ₹10,00,000",
      duration: "6-16 weeks",
      color: "from-orange-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
    },
    {
      id: 'podcast-production',
      category: 'content',
      icon: <Mic className="w-8 h-8" />,
      title: "Podcast Production",
      description: "Professional podcast creation and distribution to amplify your brand voice.",
      features: [
        "Podcast strategy & planning",
        "Professional recording",
        "Audio editing & mixing",
        "Show notes & transcripts",
        "Distribution & promotion",
        "Analytics & optimization"
      ],
      price: "₹20,000 - ₹3,00,000",
      duration: "Ongoing",
      color: "from-red-500 to-red-600",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=400&fit=crop"
    },
    {
      id: 'financial-consulting',
      category: 'consulting',
      icon: <Calculator className="w-8 h-8" />,
      title: "Financial Consulting",
      description: "Strategic financial planning and investment guidance for business growth.",
      features: [
        "Financial planning",
        "Investment strategies",
        "Risk assessment",
        "Tax optimization",
        "Funding guidance",
        "Performance analysis"
      ],
      price: "₹10,000 - ₹5,00,000",
      duration: "Ongoing",
      color: "from-indigo-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
    },
    {
      id: 'business-consultation',
      category: 'consulting',
      icon: <Briefcase className="w-8 h-8" />,
      title: "Business Consultation",
      description: "Expert guidance to optimize detailed operations, strategy, and sustainable growth.",
      features: [
        "Strategic business planning",
        "Operational process optimization",
        "Market analysis & research",
        "Growth strategy development",
        "Change management",
        "Performance improvement"
      ],
      price: "₹20,000 - ₹5,00,000",
      duration: "Ongoing",
      color: "from-amber-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    },
    {
      id: 'business-loans',
      category: 'loans',
      icon: <Landmark className="w-8 h-8" />,
      title: "Business Loans",
      description: "Fast and flexible financing solutions tailored to fuel your business expansion.",
      features: [
        "Unsecured business loans",
        "Working capital finance",
        "Machinery & equipment loans",
        "Quick approval process",
        "Competitive interest rates",
        "Minimal documentation"
      ],
      price: "8.5% p.a - 18% p.a",
      duration: "3-7 Days",
      color: "from-indigo-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop"
    },
    {
      id: 'business-insurance',
      category: 'insurance',
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Business Insurance",
      description: "Comprehensive coverage options to protect your business assets and liabilities.",
      features: [
        "General liability insurance",
        "Property insurance",
        "Workers' compensation",
        "Professional liability",
        "Cyber insurance",
        "Keyman insurance"
      ],
      price: "₹999/mo - Custom",
      duration: "Annual",
      color: "from-emerald-500 to-green-500",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'development', name: 'Development' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'technology', name: 'Technology' },
    { id: 'content', name: 'Content' },
    { id: 'consulting', name: 'Consulting' },
    { id: 'loans', name: 'Loans' },
    { id: 'insurance', name: 'Insurance' }
  ];

  const filteredServices = activeTab === 'all'
    ? services
    : services.filter(service => service.category === activeTab);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="text-center">
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Expert{" "}
                <RotatingText
                  words={[
                    "Web Development",
                    "SEO & Content Marketing",
                    "Social Media Marketing",
                    "AI Solutions",
                    "Podcast Production",
                    "Financial Consulting",
                    "Business Consultation",
                    "Business Loans",
                    "Business Insurance"
                  ]}
                  interval={2500}
                  className="text-amber-500"
                />
              </motion.h1>
              <motion.p
                className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                Comprehensive digital solutions designed to drive growth, enhance brand presence,
                and deliver measurable results for your business.
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Categories */}
      <section className="relative py-24 bg-[#fefaf6] overflow-hidden">
        {/* Creative Background Design */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-transparent" />

          {/* Large Decorative Blobs */}
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/30 to-amber-200/30 blur-[120px] rounded-full" />

          {/* Subtle Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-2 md:gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-2 py-2.5 lg:px-6 lg:py-3 rounded-lg font-bold tracking-wide text-[10px] lg:text-base transition-all duration-300 ${activeTab === category.id
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg transform -translate-y-1'
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200 hover:border-amber-300'
                  }`}
              >
                <span className="line-clamp-1">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <AnimatedSection key={service.id} animation="fadeInUp" delay={0.1}>
                <div id={service.id} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl h-full flex flex-col group cursor-pointer hover:-translate-y-2 transition-all duration-300 border border-slate-100">
                  {/* Card Image */}
                  <div className="w-full h-48 rounded-xl bg-gray-100 mb-5 relative overflow-hidden shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                      {service.price.split(' - ')[0]}
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 px-1">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{service.title}</h3>
                      <div className="flex items-center text-xs font-medium text-gray-500">
                        <Clock className="w-3 h-3 mr-1" /> {service.duration}
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300`}>
                      {React.cloneElement(service.icon, { className: "w-5 h-5" })}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 px-1 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 bg-gray-50 rounded-xl p-4">
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-3.5 h-3.5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-xs font-medium text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <div className="mt-auto">
                    <Link
                      to={`/contact?service=${service.id}`}
                      className="w-full inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-white uppercase tracking-widest bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 rounded hover:shadow-lg transition-all duration-300"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 font-sans">
                How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Work</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our proven 4-step process ensures successful project delivery and exceptional results every time.
              </p>
            </motion.div>
          </div>

          {/* Desktop View - Horizontal Flow with Connecting Lines */}
          <div className="hidden lg:block relative">
            {/* Connecting Line */}
            <div className="absolute top-24 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 opacity-20" />

            <div className="grid grid-cols-4 gap-8 relative">
              {[
                {
                  number: "01",
                  title: "Discovery",
                  description: "We analyze your business, goals, and requirements to create a strategic plan.",
                  gradient: "from-blue-500 to-cyan-500",
                  delay: 0.2
                },
                {
                  number: "02",
                  title: "Strategy",
                  description: "We develop a comprehensive strategy tailored to your specific needs and objectives.",
                  gradient: "from-green-500 to-emerald-500",
                  delay: 0.4
                },
                {
                  number: "03",
                  title: "Execution",
                  description: "Our expert team implements the strategy with regular updates and quality assurance.",
                  gradient: "from-purple-500 to-pink-500",
                  delay: 0.6
                },
                {
                  number: "04",
                  title: "Optimization",
                  description: "We continuously monitor, analyze, and optimize for maximum performance and ROI.",
                  gradient: "from-amber-500 to-orange-500",
                  delay: 0.8
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: step.delay }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-amber-500 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10">
                    {/* Number Badge */}
                    <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center mt-8 group-hover:text-amber-600 transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Decorative Corner */}
                    <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${step.gradient} opacity-0 group-hover:opacity-10 rounded-tl-full transition-opacity duration-500`} />
                  </div>

                  {/* Arrow Connector (except for last item) */}
                  {index < 3 && (
                    <div className="absolute top-24 -right-4 z-20 text-amber-500 text-3xl">
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet View - Vertical Flow */}
          <div className="lg:hidden space-y-8">
            {[
              {
                number: "01",
                title: "Discovery",
                description: "We analyze your business, goals, and requirements to create a strategic plan.",
                gradient: "from-blue-500 to-cyan-500",
                delay: 0.2
              },
              {
                number: "02",
                title: "Strategy",
                description: "We develop a comprehensive strategy tailored to your specific needs and objectives.",
                gradient: "from-green-500 to-emerald-500",
                delay: 0.3
              },
              {
                number: "03",
                title: "Execution",
                description: "Our expert team implements the strategy with regular updates and quality assurance.",
                gradient: "from-purple-500 to-pink-500",
                delay: 0.4
              },
              {
                number: "04",
                title: "Optimization",
                description: "We continuously monitor, analyze, and optimize for maximum performance and ROI.",
                gradient: "from-amber-500 to-orange-500",
                delay: 0.5
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
                className="relative"
              >
                <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg`}>
                      {step.number}
                    </div>

                    <div className="flex-1">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vertical Connector Arrow */}
                {index < 3 && (
                  <div className="flex justify-center my-2">
                    <div className="text-amber-500 text-2xl">
                      ↓
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-110"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070&auto=format&fit=crop")' }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-sans">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Real results from real businesses. Here's how we've helped our clients achieve their goals.
            </p>
          </div>

          <div className="relative px-4 py-8">
            {/* Left Arrow */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + 6) % 6)}
              className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Previous testimonial"
            >
              <ChevronDown className="w-6 h-6 text-gray-900 rotate-90 group-hover:text-amber-600 transition-colors" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % 6)}
              className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
              aria-label="Next testimonial"
            >
              <ChevronDown className="w-6 h-6 text-gray-900 -rotate-90 group-hover:text-amber-600 transition-colors" />
            </button>

            {/* Coverflow Container */}
            <div className="relative h-[500px] md:h-[550px] flex items-center justify-center overflow-visible">
              {[
                {
                  name: "Dr. Rajesh Kumar",
                  position: "Principal, Indus Public School",
                  content: "Avani Enterprises delivered an outstanding website that perfectly captures our school's vision and values. The design is modern, intuitive, and makes it easy for parents and students to find information. Their team was professional, responsive, and delivered beyond our expectations.",
                  rating: 5,
                  image: "/indus.jpeg"
                },
                {
                  name: "Vikram Sharma",
                  position: "Managing Director, Rohtak Shoe Company",
                  content: "The e-commerce platform developed by Avani Enterprises transformed our business completely. Online sales increased by 250% in just 3 months. The website is fast, user-friendly, and our customers love the shopping experience. Highly recommended!",
                  rating: 5,
                  image: "/shoes.jpeg"
                },
                {
                  name: "Ankit Verma",
                  position: "Co-Founder, Policicue",
                  content: "Working with Avani Enterprises was a game-changer for our startup. They built a sophisticated platform that handles complex policy management with ease. The UI/UX is exceptional, and their technical expertise is top-notch. Our users are impressed!",
                  rating: 5,
                  image: "/policucue.jpeg"
                },
                {
                  name: "Amit Kapoor",
                  position: "Founder, FRD Nutrition",
                  content: "The team created a stunning website that perfectly showcases our nutrition products. The e-commerce integration is seamless, and we've seen a 180% increase in online orders. Their attention to detail and customer service is outstanding!",
                  rating: 5,
                  image: "/frd-nutrition-new.png"
                },
                {
                  name: "Aman Sharma",
                  position: "CEO, Hi-Tech Luxury Homes",
                  content: "We're thrilled with the elegant website that beautifully represents our luxury properties. The design is sophisticated, the property listings are easy to manage, and our clients love the virtual tour feature. Excellent work!",
                  rating: 5,
                  image: "/hitech.jpeg"
                },
                {
                  name: "Dr. Mohit Verma",
                  position: "Director, Sanjeevni Hospital",
                  content: "The hospital management portal developed by Avani Enterprises has streamlined our operations significantly. Patient appointment booking is now effortless, and the admin panel is incredibly user-friendly. A truly professional solution!",
                  rating: 5,
                  image: "/sanjeevni.jpeg"
                }
              ].map((testimonial, index) => {
                const isDark = index % 2 !== 0;
                const headerColor = isDark ? "bg-[#333333]" : "bg-[#FFA500]";
                const roleColor = isDark ? "text-[#333333]" : "text-[#FFA500]";
                const gradientColor = isDark ? "from-gray-500 to-gray-700" : "from-orange-500 to-amber-500";

                const position = index - currentTestimonial;
                let cardStyle = {};
                let cardClass = "absolute transition-all duration-700 ease-out";

                if (position === 0) {
                  cardStyle = { transform: 'translateX(-50%) scale(1)', left: '50%', opacity: 1, zIndex: 20 };
                } else if (position === -1 || (currentTestimonial === 0 && index === 5)) {
                  cardStyle = { transform: 'translateX(-50%) scale(0.85)', left: '25%', opacity: 0.5, zIndex: 10 };
                } else if (position === 1 || (currentTestimonial === 5 && index === 0)) {
                  cardStyle = { transform: 'translateX(-50%) scale(0.85)', left: '75%', opacity: 0.5, zIndex: 10 };
                } else {
                  cardStyle = { transform: 'translateX(-50%) scale(0.7)', left: position < 0 ? '0%' : '100%', opacity: 0, zIndex: 0 };
                }

                return (
                  <div key={index} className={cardClass} style={cardStyle}>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-80 md:w-96 h-full flex flex-col group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`} />
                      <div className={`${headerColor} h-32 md:h-36 flex flex-col items-center justify-start pt-6 md:pt-8 relative overflow-hidden`}>
                        <div className="text-center z-10 text-white relative">
                          <span className="block font-serif italic text-lg md:text-xl tracking-wider mb-1 opacity-90">Client</span>
                          <span className="block text-lg md:text-xl font-bold tracking-[0.2em] uppercase font-sans">TESTIMONIAL</span>
                        </div>
                      </div>
                      <div className="relative flex justify-center -mt-10 md:-mt-12 z-20">
                        <div className="p-1 bg-white rounded-full shadow-lg">
                          <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-sm object-contain bg-white p-1" />
                        </div>
                      </div>
                      <div className="px-6 pt-4 pb-6 text-center flex-grow flex flex-col items-center">
                        <h4 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-widest mb-1">{testimonial.name}</h4>
                        <p className={`${roleColor} text-xs font-bold uppercase tracking-widest mb-3 md:mb-4`}>{testimonial.position}</p>
                        <div className="flex justify-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />))}
                        </div>
                        <div className="relative">
                          <span className="opacity-10 text-4xl md:text-5xl leading-none font-serif absolute -top-3 left-0">"</span>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed px-4 italic">{testimonial.content}</p>
                          <span className="opacity-10 text-4xl md:text-5xl leading-none font-serif absolute -bottom-5 right-0">"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <button key={index} onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 rounded-full ${currentTestimonial === index ? "bg-amber-500 w-8 h-3" : "bg-white/40 hover:bg-white/60 w-3 h-3"}`}
                  aria-label={`Go to testimonial ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 md:py-16 bg-[#FBF9F4] overflow-hidden">

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-0 md:pt-4 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-2 md:mb-3 font-sans tracking-tight">
              Let's Build Your
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 font-sans tracking-tight">
              <RotatingText
                words={["Success Story", "Digital Future", "Growth Engine", "Next Big Move"]}
                interval={3000}
                className="text-orange-600 inline-block min-w-[280px] md:min-w-[400px]"
              /> <span className="text-slate-900">Together</span>
            </h2>

            <div className="w-full max-w-xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6 md:mb-8"></div>

            <p className="text-base md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-6 md:mb-12 px-2">
              Partner with us to unlock growth opportunities, streamline operations, and achieve your business vision with expert guidance every step of the way.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-row gap-3 md:gap-6 justify-center items-center w-full sm:w-auto"
          >
            <Link
              to="/get-consultation"
              className="flex-1 sm:flex-none px-4 py-3 md:px-10 md:py-4 bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-lg font-bold uppercase tracking-widest shadow-[0_4px_0_rgb(154,52,18)] active:shadow-none active:translate-y-1 transition-all duration-200 text-[10px] sm:text-xs md:text-sm whitespace-nowrap"
            >
              Get Consultation
            </Link>
            <Link
              to="/contact"
              className="flex-1 sm:flex-none px-4 py-3 md:px-10 md:py-4 bg-gradient-to-b from-slate-800 to-black hover:from-slate-700 hover:to-slate-900 text-white rounded-lg font-bold uppercase tracking-widest shadow-[0_4px_0_rgb(0,0,0)] active:shadow-none active:translate-y-1 transition-all duration-200 text-[10px] sm:text-xs md:text-sm border-t border-slate-700 whitespace-nowrap"
            >
              Talk to Expert
            </Link>
          </motion.div>
        </div>

        {/* Bottom Curved Shapes */}
        <div className="absolute bottom-0 left-0 w-full z-10 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-20 block" preserveAspectRatio="none">
            <path d="M0,0 C480,80 960,80 1440,0 V60 H0 V0 Z" fill="#f97316"></path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Services; 