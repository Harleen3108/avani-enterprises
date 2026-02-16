import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Target, TrendingUp, Users, Zap } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const LeadManagementProject = () => {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#fefaf6] overflow-hidden">
        {/* Creative Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-transparent" />
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/30 to-amber-200/30 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <Link
              to="/services/ai-solutions"
              className="inline-flex items-center text-slate-700 hover:text-amber-600 mb-6 transition-colors font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AI Solutions
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content Section */}
            <AnimatedSection animation="fadeInLeft" delay={0.3}>
              <div className="flex flex-col items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900">
                  Lead Management Automation
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed font-medium">
                  Intelligent AI-powered system that automates lead capture, scoring, nurturing, and distribution to maximize conversion rates
                </p>
              </div>
            </AnimatedSection>

            {/* Image/Illustration Section */}
            <AnimatedSection animation="fadeInRight" delay={0.4}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
                  alt="Lead Management Dashboard"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-slate-900/30"></div>
                {/* Stats Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                      <div className="text-3xl font-black mb-1 text-slate-900">45%</div>
                      <div className="text-sm text-slate-600 font-bold">Conversion Increase</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                      <Users className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                      <div className="text-3xl font-black mb-1 text-slate-900">3x</div>
                      <div className="text-sm text-slate-600 font-bold">Faster Response</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                      <Zap className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                      <div className="text-3xl font-black mb-1 text-slate-900">70%</div>
                      <div className="text-sm text-slate-600 font-bold">Time Saved</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                      <Target className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                      <div className="text-3xl font-black mb-1 text-slate-900">90%</div>
                      <div className="text-sm text-slate-600 font-bold">Lead Accuracy</div>
                    </div>
                  </div>
                </div>
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
                  Our Lead Management Automation system is an intelligent AI-powered solution designed to revolutionize how businesses handle their sales pipeline. The system automatically captures leads from multiple sources including websites, social media, email campaigns, and landing pages.
                </p>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  Using advanced machine learning algorithms, the platform scores each lead based on engagement behavior, demographic data, and interaction patterns. This ensures your sales team focuses on the most promising opportunities first, dramatically improving conversion rates.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The system features intelligent lead distribution, automated follow-up sequences, real-time notifications, and comprehensive analytics dashboards. It integrates seamlessly with popular CRM systems and provides actionable insights to optimize your sales process continuously.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" delay={0.4}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
                  alt="Lead Management System"
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
                Comprehensive automation to transform your sales pipeline
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Multi-Channel Lead Capture:</strong> Automatically collect leads from websites, landing pages, social media, email campaigns, and third-party platforms
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>AI Lead Scoring:</strong> Machine learning algorithms analyze behavior, demographics, and engagement to prioritize high-value leads
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Intelligent Distribution:</strong> Automatically assign leads to the right sales rep based on territory, expertise, and workload
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Automated Nurturing:</strong> Personalized email and SMS sequences triggered by lead behavior and engagement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Real-Time Notifications:</strong> Instant alerts to sales team when high-priority leads take action
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>CRM Integration:</strong> Seamless sync with Salesforce, HubSpot, Zoho, and other popular CRM platforms
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Analytics Dashboard:</strong> Comprehensive reporting on lead sources, conversion rates, and sales team performance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Lead Deduplication:</strong> Automatically identify and merge duplicate leads to maintain clean data
                    </span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Lead Management?</span>
            </h2>
            <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how our AI-powered lead management system can help you capture more leads, close more deals, and grow your business faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-consultation"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-black uppercase tracking-widest shadow-lg transition-all duration-300"
              >
                Get Started Today
              </Link>
              <a
                href="tel:+919253625099"
                className="bg-slate-100 text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-slate-200 hover:border-slate-300 transition-all duration-300"
              >
                Talk to Expert
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default LeadManagementProject;
