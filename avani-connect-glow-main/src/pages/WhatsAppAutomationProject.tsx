import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MessageCircle, Zap, Users, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const WhatsAppAutomationProject = () => {
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
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900">
                  WhatsApp Text Automation
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed font-medium">
                  WhatsApp Business API integration for automated customer support, marketing campaigns, and instant notifications
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight" delay={0.4}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&fit=crop"
                  alt="WhatsApp Business Automation"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-slate-900/30"></div>
                {/* Stats Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                      <div className="text-3xl font-black mb-1 text-slate-900">10k+</div>
                      <div className="text-sm text-slate-600 font-bold">Messages/Day</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                      <Zap className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                      <div className="text-3xl font-black mb-1 text-slate-900">Instant</div>
                      <div className="text-sm text-slate-600 font-bold">Response Time</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                      <Users className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                      <div className="text-3xl font-black mb-1 text-slate-900">85%</div>
                      <div className="text-sm text-slate-600 font-bold">Open Rate</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                      <div className="text-3xl font-black mb-1 text-slate-900">24/7</div>
                      <div className="text-sm text-slate-600 font-bold">Availability</div>
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
                  Our WhatsApp Text Automation solution leverages the official WhatsApp Business API to enable businesses to communicate with customers at scale. The platform automates customer support, marketing campaigns, order notifications, and appointment reminders through the world's most popular messaging app.
                </p>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  With over 2 billion active users worldwide, WhatsApp offers unparalleled reach and engagement rates. Our automation system allows you to send personalized messages, handle customer queries with AI-powered chatbots, and manage unlimited conversations efficiently from a single dashboard.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The platform features intelligent message routing, automated responses based on keywords, rich media support (images, videos, documents), broadcast campaigns, and comprehensive analytics. It integrates seamlessly with your existing CRM and business systems.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" delay={0.4}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&fit=crop"
                  alt="WhatsApp Automation System"
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
                Comprehensive WhatsApp automation for modern businesses
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
                      <strong>WhatsApp Business API Integration:</strong> Official API access for reliable, scalable messaging
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>AI-Powered Chatbot:</strong> Intelligent bot handles customer queries, FAQs, and support tickets automatically
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Broadcast Campaigns:</strong> Send promotional messages, updates, and announcements to unlimited contacts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Automated Notifications:</strong> Order confirmations, shipping updates, appointment reminders, and payment alerts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Rich Media Support:</strong> Send images, videos, documents, location, and interactive buttons
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Contact Management:</strong> Organize contacts with tags, segments, and custom fields
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Multi-Agent Dashboard:</strong> Team inbox for managing customer conversations efficiently
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Analytics & Reporting:</strong> Track message delivery, open rates, response times, and campaign performance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>CRM Integration:</strong> Sync with Salesforce, HubSpot, Zoho, and custom systems
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">
                      <strong>Template Management:</strong> Create and manage pre-approved message templates for compliance
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
              Ready to Automate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">WhatsApp Communication?</span>
            </h2>
            <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how WhatsApp automation can help you engage customers better, reduce support costs, and scale your business communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-consultation"
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl font-black uppercase tracking-widest shadow-lg transition-all duration-300"
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

export default WhatsAppAutomationProject;
