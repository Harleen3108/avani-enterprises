import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import RotatingText from '../components/RotatingText';
import {
  //  GraduationCap, 
  //  Certificate, 
  Users,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Code,
  Palette,
  Briefcase,
  Brain,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal';
import AnimatedSection from '../components/AnimatedSection';

// Animated Counter Component
const StatCard = ({ end, suffix = '', label, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-amber-500/30 hover:border-amber-500 text-center overflow-hidden"
    >
      {/* Subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/50 transition-all duration-500" />

      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-black text-slate-900 mb-3">
          {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
          <span className="text-amber-500">{suffix}</span>
        </div>
        <div className="text-xs md:text-sm text-slate-600 font-bold uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = [
    { id: 'all', name: 'All Courses', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'development', name: 'Development', icon: <Code className="w-5 h-5" /> },
    { id: 'design', name: 'Design', icon: <Palette className="w-5 h-5" /> },
    { id: 'marketing', name: 'Marketing', icon: <Search className="w-5 h-5" /> },
    { id: 'business', name: 'Business', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'technology', name: 'Technology', icon: <Brain className="w-5 h-5" /> }
  ];

  const courses = [
    {
      id: 1,
      title: "Graphic Designing and Adobe Photoshop",
      category: "design",
      description: "Full step by step course about graphic design, Adobe Photoshop, and digital art creation with AI tools integration.",
      duration: "80 hours",
      price: "₹19,999",
      originalPrice: "₹29,999",
      rating: 4.8,
      students: 1250,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Assured paid 30-day internship",
        "Assured job in reputed firm",
        "MCQ test for course completion"
      ],
      instructor: "Priya Sharma",
      level: "Beginner to Advanced",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkAxEmxe6Ri9Et"
    },
    {
      id: 2,
      title: "100-Hour Digital Marketing Mastery",
      category: "marketing",
      description: "Unlock the power of digital marketing with our comprehensive 100-hour course covering all aspects of modern marketing.",
      duration: "100 hours",
      price: "₹19,999",
      originalPrice: "₹35,000",
      rating: 4.9,
      students: 2100,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Assured paid 30-day internship",
        "Assured job in reputed firm",
        "MCQ test for course completion"
      ],
      instructor: "Rahul Kumar",
      level: "Beginner to Advanced",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_Qj5b7hCG3D5e7H"
    },
    {
      id: 3,
      title: "Video Editing Course",
      category: "design",
      description: "Master video editing with professional tools and techniques for creating compelling content.",
      duration: "60 hours",
      price: "₹19,999",
      originalPrice: "₹25,000",
      rating: 4.7,
      students: 980,
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Assured paid 30-day internship",
        "Assured job in reputed firm",
        "MCQ test for course completion"
      ],
      instructor: "Amit Patel",
      level: "Beginner to Intermediate",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkAy1wWQmdhynn"
    },
    {
      id: 4,
      title: "Full Stack Website Development",
      category: "development",
      description: "Complete web development course covering frontend, backend, databases, and deployment strategies.",
      duration: "120 hours",
      price: "₹19,999",
      originalPrice: "₹40,000",
      rating: 4.9,
      students: 1850,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Assured paid 30-day internship",
        "Assured job in reputed firm",
        "MCQ test for course completion"
      ],
      instructor: "Neha Singh",
      level: "Beginner to Advanced",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkAz7ZhqFfLcXD"
    },
    {
      id: 5,
      title: "Android and iOS App Development",
      category: "development",
      description: "Learn mobile app development for both Android and iOS platforms with modern frameworks.",
      duration: "100 hours",
      price: "₹19,999",
      originalPrice: "₹35,000",
      rating: 4.8,
      students: 1450,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Assured paid 30-day internship",
        "Assured job in reputed firm",
        "MCQ test for course completion"
      ],
      instructor: "Rajesh Kumar",
      level: "Intermediate to Advanced",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkAzoc7SqJq6Fs"
    },
    {
      id: 6,
      title: "Hospital Management Course",
      category: "business",
      description: "Comprehensive hospital management course for healthcare administration and operations.",
      duration: "80 hours",
      price: "₹19,999",
      originalPrice: "₹30,000",
      rating: 4.6,
      students: 750,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Assured paid 30-day internship",
        "Assured job in reputed firm",
        "MCQ test for course completion"
      ],
      instructor: "Dr. Anjali Verma",
      level: "Beginner to Intermediate",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkB0ZuMTIzNQaF"
    },
    {
      id: 7,
      title: "Sales Manager Course",
      category: "business",
      description: "Master sales management techniques and strategies for business growth and revenue generation.",
      duration: "60 hours",
      price: "₹19,999",
      originalPrice: "₹25,000",
      rating: 4.7,
      students: 1100,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Assured paid 30-day internship",
        "Assured job in reputed firm",
        "MCQ test for course completion"
      ],
      instructor: "Vikram Singh",
      level: "Beginner to Advanced",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkD0vcwaw7q9N8"
    },
    {
      id: 8,
      title: "LLB and LLM Course",
      category: "business",
      description: "Legal analysis and corporate law course for aspiring lawyers and legal professionals.",
      duration: "100 hours",
      price: "₹19,999",
      originalPrice: "₹45,000",
      rating: 4.8,
      students: 650,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Assured paid 30-day internship",
        "Assured job in reputed firm",
        "MCQ test for course completion"
      ],
      instructor: "Adv. Meera Sharma",
      level: "Intermediate to Advanced",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkEWaTixFjaC5x"
    },
    {
      id: 9,
      title: "BSc Nursing Course",
      category: "business",
      description: "Comprehensive nursing course for mastering nursing jobs in Indian hospitals.",
      duration: "120 hours",
      price: "₹19,999",
      originalPrice: "₹35,000",
      rating: 4.9,
      students: 890,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Mock interviews and interview questions",
        "Assured paid 30-day internship",
        "Assured job in reputed firm"
      ],
      instructor: "Dr. Priya Patel",
      level: "Beginner to Advanced",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkEzYm9PTePejB"
    },
    {
      id: 10,
      title: "AI, Machine Learning, and Data Science",
      category: "technology",
      description: "Cutting-edge course on artificial intelligence, machine learning, and data science applications.",
      duration: "150 hours",
      price: "₹19,999",
      originalPrice: "₹50,000",
      rating: 4.9,
      students: 1650,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Mock interviews and interview questions",
        "Assured paid 30-day internship",
        "Assured job in reputed firm"
      ],
      instructor: "Dr. Amit Kumar",
      level: "Intermediate to Advanced",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkbfT6omfXOa6v"
    },
    {
      id: 11,
      title: "Cybersecurity and Ethical Hacking",
      category: "technology",
      description: "Learn cybersecurity fundamentals and ethical hacking techniques for digital security.",
      duration: "100 hours",
      price: "₹19,999",
      originalPrice: "₹40,000",
      rating: 4.8,
      students: 1200,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Mock interviews and interview questions",
        "Assured paid 30-day internship",
        "Assured job in reputed firm"
      ],
      instructor: "Rahul Verma",
      level: "Intermediate to Advanced",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkbVQMoRjk8O3c"
    },
    {
      id: 12,
      title: "Real Estate Course",
      category: "business",
      description: "Comprehensive real estate course for jobs in Dubai, Delhi NCR, Chandigarh, and Jaipur.",
      duration: "80 hours",
      price: "₹19,999",
      originalPrice: "₹30,000",
      rating: 4.7,
      students: 950,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      features: [
        "Certificate after completion",
        "Free AI tool assistance (Hindi & English)",
        "Mock interviews and interview questions",
        "Assured paid 30-day internship",
        "Assured job in reputed firm"
      ],
      instructor: "Kapil Sharma",
      level: "Beginner to Intermediate",
      language: "Hindi & English",
      paymentLink: "https://razorpay.com/payment-link/plink_QkuHfTcQCXSjNZ"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                Master{" "}
                <RotatingText
                  words={[
                    "Web Development",
                    "Digital Marketing",
                    "Graphic Design",
                    "Data Analytics",
                    "UI/UX Design",
                    "Content Writing"
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
                Master in-demand skills with our comprehensive training programs
                and secure your future with assured job placements.
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-900 placeholder-gray-400 bg-white"
              />
            </div>
            <div className="grid grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col lg:flex-row items-center justify-center space-y-1 lg:space-y-0 lg:space-x-2 px-2 py-2.5 lg:px-4 lg:py-2 rounded-lg font-bold transition-all duration-300 ${activeCategory === category.id
                    ? 'bg-amber-500 text-white shadow-lg transform -translate-y-0.5'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <div className="scale-75 lg:scale-100">{category.icon}</div>
                  <span className="text-[10px] lg:text-sm tracking-tight lg:tracking-normal line-clamp-1">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid with Creative Light Background */}
      <section className="relative py-24 overflow-hidden bg-[#fefaf6]">
        {/* Creative Background Design */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-transparent" />

          {/* Large Decorative Blobs */}
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/30 to-amber-200/30 blur-[120px] rounded-full" />

          {/* Subtle Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <AnimatedSection key={course.id} animation="fadeInUp" delay={0.4 + (course.id * 0.1)}>
                <div className="group flex flex-col bg-white rounded-[2rem] shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full">
                  {/* Thumbnail Section */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    {/* Category Overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                        {categories.find(cat => cat.id === course.category)?.name}
                      </span>
                    </div>

                    {/* Highly Visible Rating Overlay */}
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-xl px-2.5 py-1.5 shadow-xl border border-white/50">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-black text-slate-900 leading-none">{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight group-hover:text-amber-600 transition-colors h-14 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed mb-4 line-clamp-2 h-10 font-medium">
                      {course.description}
                    </p>

                    {/* Bento Info Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2 border border-slate-100">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{course.duration}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2 border border-slate-100">
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{course.students} Learners</span>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-100/50 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-amber-700">{course.price}</span>
                        <span className="text-sm text-amber-400/70 line-through font-bold">{course.originalPrice}</span>
                      </div>
                      <span className="bg-amber-600 text-white text-[9px] font-black uppercase px-2 py-1 rounded-lg">
                        {Math.round(((parseInt(course.originalPrice.replace('₹', '').replace(',', '')) - parseInt(course.price.replace('₹', '').replace(',', ''))) / parseInt(course.originalPrice.replace('₹', '').replace(',', ''))) * 100)}% OFF
                      </span>
                    </div>

                    {/* Mini Instructor & Features Footer */}
                    <div className="mt-auto space-y-4 pt-2 border-t border-slate-50">
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-slate-400">
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-emerald-500 mr-1.5" />
                          <span>Instructor: {course.instructor}</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-emerald-500 mr-1.5" />
                          <span>Level: {course.level}</span>
                        </div>
                      </div>

                      {/* Call to Actions */}
                      <div className="flex gap-2">
                        <Link
                          to={`/courses/${course.id}`}
                          className="flex-1 text-center py-2.5 px-3 rounded-xl text-[12px] font-black text-amber-600 border border-amber-100 hover:bg-amber-50 transition-all duration-300 uppercase tracking-wider"
                        >
                          View Details
                        </Link>
                        <a
                          href={course.paymentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-[1.5] text-center py-2.5 px-3 rounded-xl text-[12px] font-black text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:shadow-amber-200 transition-all duration-300 uppercase tracking-wider block"
                        >
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No courses found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Course Benefits - Creative Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-100/40 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                  Our Promise
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Why Choose Our Courses?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                We provide comprehensive training with guaranteed job placement and industry-recognized certifications.
              </p>
            </div>
          </AnimatedSection>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Benefit 1 */}
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                {/* Decorative Number */}
                <div className="absolute -top-6 -right-6 text-[120px] font-black text-amber-500/5 leading-none">01</div>

                <div className="relative z-10">
                  {/* Accent Bar */}
                  <div className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6" />

                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    Certified Courses
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Industry-recognized certificates upon completion that validate your expertise and boost your career prospects.
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-3xl transition-all duration-500" />
              </div>
            </AnimatedSection>

            {/* Benefit 2 */}
            <AnimatedSection animation="fadeInUp" delay={0.3}>
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                {/* Decorative Number */}
                <div className="absolute -top-6 -right-6 text-[120px] font-black text-amber-500/5 leading-none">02</div>

                <div className="relative z-10">
                  {/* Accent Bar */}
                  <div className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6" />

                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    Job Guarantee
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Assured job placement in reputed firms with our extensive network of hiring partners across industries.
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-3xl transition-all duration-500" />
              </div>
            </AnimatedSection>

            {/* Benefit 3 */}
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                {/* Decorative Number */}
                <div className="absolute -top-6 -right-6 text-[120px] font-black text-amber-500/5 leading-none">03</div>

                <div className="relative z-10">
                  {/* Accent Bar */}
                  <div className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6" />

                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    Paid Internship
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    30-day paid internship with real-world experience to apply your skills and build your professional portfolio.
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-3xl transition-all duration-500" />
              </div>
            </AnimatedSection>

            {/* Benefit 4 */}
            <AnimatedSection animation="fadeInUp" delay={0.5}>
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                {/* Decorative Number */}
                <div className="absolute -top-6 -right-6 text-[120px] font-black text-amber-500/5 leading-none">04</div>

                <div className="relative z-10">
                  {/* Accent Bar */}
                  <div className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6" />

                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    AI Assistance
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Free AI tools and assistance in Hindi & English to enhance your learning experience and productivity.
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 rounded-3xl transition-all duration-500" />
              </div>
            </AnimatedSection>
          </div>

          {/* Stats Bar */}
          <AnimatedSection animation="fadeInUp" delay={0.6}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard end={5000} suffix="+" label="Students Trained" />
              <StatCard end={95} suffix="%" label="Placement Rate" />
              <StatCard end={500} suffix="+" label="Hiring Partners" />
              <StatCard end={4.8} suffix="★" label="Average Rating" decimals={1} />
            </div>
          </AnimatedSection>
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

      {/* Payment Modal */}
      {selectedCourse && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          course={selectedCourse}
          onSuccess={(data: any) => console.log('Payment successful', data)}
        />
      )}
    </div>
  );
};

export default Courses;