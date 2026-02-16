import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const HiTechHomesProject = () => {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="relative bg-[#fefaf6] overflow-hidden">
        {/* Creative Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-transparent" />
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/30 to-amber-200/30 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <Link
              to="/"
              className="inline-flex items-center text-slate-700 hover:text-amber-600 mb-6 transition-colors font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Video Section */}
            <AnimatedSection animation="fadeInLeft" delay={0.3}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <video
                  className="w-full aspect-video object-cover"
                  src="/hitech.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/hitech.jpeg"
                />
              </div>
            </AnimatedSection>

            {/* Content Section */}
            <AnimatedSection animation="fadeInRight" delay={0.4}>
              <div className="flex flex-col items-start gap-4">
                <img
                  src="/hitech.jpeg"
                  alt="Hi-tech Homes Logo"
                  className="h-16 md:h-20 object-contain bg-white p-3 rounded-xl shadow-md"
                />
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                  Hi-tech Homes
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 max-w-xl font-medium leading-relaxed">
                  A professional property management portal designed to centralize real estate operations and showcase properties
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeInLeft" delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Project Overview
                </h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  Hi-tech Property is a professional, full-service property management portal designed to centralize real estate operations.
                  The platform features an extensive listing module for showcasing available properties with high-quality media, making it
                  easy for potential buyers and renters to explore options.
                </p>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  The system includes robust lead capture tools to streamline client inquiries and follow-ups effectively. Dedicated admin
                  tools are provided to ensure efficient management of all listings, client data, and operational workflows.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Built with modern web technologies, the platform offers an optimized layout for branding and business presentation,
                  creating a professional and trustworthy digital presence in the real estate industry.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" delay={0.4}>
              <div className="relative">
                <img
                  src="/hitech1.png"
                  alt="Property Management Portal"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-[#FBF9F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Key Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive functionality for property management
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-100">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Extensive property listings</strong> with high-quality media and detailed descriptions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Robust lead capture tools</strong> to streamline client inquiries and follow-ups
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Dedicated admin tools</strong> for efficient management of listings and client data
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Easy navigation</strong> for users to explore properties and services
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Contact and inquiry sections</strong> for lead generation and customer engagement
                    </span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Project Images Gallery */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Project Screenshots
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visual showcase of the platform's key features and design
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="relative rounded-xl overflow-hidden shadow-lg group">
                <img
                  src="/hitech2.png"
                  alt="Property Listings"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="relative rounded-xl overflow-hidden shadow-lg group">
                <img
                  src="/hitech3.png"
                  alt="Property Details"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.3}>
              <div className="relative rounded-xl overflow-hidden shadow-lg group">
                <img
                  src="/hitech4.png"
                  alt="Admin Dashboard"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HiTechHomesProject;

