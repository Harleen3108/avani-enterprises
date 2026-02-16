import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Users, Target, Award, TrendingUp } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Policicue = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <Link
              to="/"
              className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Policicue
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
              Empowering businesses with innovative digital solutions and strategic growth strategies
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeInLeft" delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  About Policicue
                </h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  Policicue is a forward-thinking digital solutions company dedicated to helping businesses
                  transform their operations through cutting-edge technology and strategic innovation. We specialize
                  in creating comprehensive digital ecosystems that drive growth, efficiency, and competitive advantage.
                </p>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  Our team of experts combines deep industry knowledge with technical excellence to deliver
                  solutions that not only meet current needs but also anticipate future challenges. We believe
                  in building long-term partnerships with our clients, ensuring sustainable success and continuous improvement.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With a focus on user-centric design and data-driven decision making, Policicue helps organizations
                  navigate the digital landscape with confidence and achieve their strategic objectives.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" delay={0.4}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team Collaboration"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-xl hidden lg:block">
                  <div className="text-3xl font-bold mb-1">8+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions designed to elevate your business
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Reach</h3>
                <p className="text-gray-600">
                  Expanding your business presence across international markets with scalable solutions
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
                <p className="text-gray-600">
                  Skilled professionals dedicated to delivering excellence in every project
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.3}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategic Focus</h3>
                <p className="text-gray-600">
                  Data-driven strategies aligned with your business objectives and goals
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth Focused</h3>
                <p className="text-gray-600">
                  Solutions designed to drive measurable growth and sustainable success
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                End-to-end solutions for your digital transformation journey
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                  alt="Web Development"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Web Development</h3>
                  <p className="text-blue-100">
                    Custom websites and web applications built with modern technologies
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop"
                  alt="Digital Marketing"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Digital Marketing</h3>
                  <p className="text-blue-100">
                    Strategic marketing campaigns that drive engagement and conversions
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.3}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                  alt="Business Consulting"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Business Consulting</h3>
                  <p className="text-blue-100">
                    Expert guidance to optimize operations and accelerate growth
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedSection animation="scaleIn" delay={0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
                <div className="text-blue-100">Happy Clients</div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scaleIn" delay={0.2}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">300+</div>
                <div className="text-blue-100">Projects Completed</div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scaleIn" delay={0.3}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">85%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scaleIn" delay={0.4}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">8+</div>
                <div className="text-blue-100">Years Experience</div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how Policicue can help you achieve your digital transformation goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Get in Touch
              </Link>
              <Link
                to="/case-studies"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                View Our Work
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Policicue;

