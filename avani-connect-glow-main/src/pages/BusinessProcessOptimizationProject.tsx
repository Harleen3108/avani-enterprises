import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Workflow, Clock, Bot, TrendingUp, Mail, FileSpreadsheet } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const BusinessProcessOptimizationProject = () => {
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
                                    <Workflow className="w-12 h-12 text-white" />
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900">
                                    Business Process Optimization Agent
                                </h1>
                                <p className="text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed font-medium">
                                    An AI system that reads daily business work, understands patterns, identifies waste, and automates repeatable tasks
                                </p>
                            </div>
                        </AnimatedSection>

                        {/* Image/Illustration Section */}
                        <AnimatedSection animation="fadeInRight" delay={0.4}>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop"
                                    alt="Business Process Optimization Dashboard"
                                    className="w-full aspect-video object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-slate-900/30"></div>
                                {/* Stats Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="grid grid-cols-2 gap-4 p-8">
                                        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                                            <Clock className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                                            <div className="text-3xl font-black mb-1 text-slate-900">60%</div>
                                            <div className="text-sm text-slate-600 font-bold">Time Saved</div>
                                        </div>
                                        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                                            <Bot className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                                            <div className="text-3xl font-black mb-1 text-slate-900">80%</div>
                                            <div className="text-sm text-slate-600 font-bold">Tasks Automated</div>
                                        </div>
                                        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                                            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                                            <div className="text-3xl font-black mb-1 text-slate-900">40%</div>
                                            <div className="text-sm text-slate-600 font-bold">Cost Reduction</div>
                                        </div>
                                        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-center border-2 border-amber-200 shadow-lg">
                                            <Workflow className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                                            <div className="text-3xl font-black mb-1 text-slate-900">5x</div>
                                            <div className="text-sm text-slate-600 font-bold">Faster Processing</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Objective Section */}
            <section className="py-16 bg-gradient-to-r from-orange-50 to-amber-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeInUp" delay={0.2}>
                        <div className="text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Our Objective
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                                Reduce manual work, save operational time, and automate repeatable business tasks — so your team can focus on what truly matters.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Project Overview */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection animation="fadeInLeft" delay={0.2}>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    What We're Building
                                </h2>
                                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                                    Our Business Process Optimization Agent is an intelligent AI system that observes and analyzes your daily business operations — reading emails, support tickets, spreadsheets, and task management systems to understand what people are doing every day.
                                </p>
                                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                                    The AI identifies patterns, spots inefficiencies, and recognizes tasks that are repeatable and rule-based. Once it understands these workflows, it automatically suggests or implements automation solutions to eliminate manual, time-consuming work.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Think of it as having an AI assistant that constantly watches for waste in your operations and proactively fixes it — saving hours of manual effort every single day while reducing human error and ensuring consistent process execution.
                                </p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInRight" delay={0.4}>
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop"
                                    alt="AI Process Automation"
                                    className="rounded-2xl shadow-2xl w-full"
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeInUp" delay={0.2}>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                How It Works
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Our AI agent follows a systematic approach to optimize your business processes
                            </p>
                        </div>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <AnimatedSection animation="fadeInUp" delay={0.1}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg text-center h-full">
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Mail className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Observe & Learn</h3>
                                <p className="text-gray-600">
                                    The AI reads and analyzes your emails, tickets, spreadsheets, and daily workflows to understand how your team operates and where time is being spent.
                                </p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={0.2}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg text-center h-full">
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <FileSpreadsheet className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Identify Waste</h3>
                                <p className="text-gray-600">
                                    Using pattern recognition and machine learning, the AI identifies repetitive tasks, bottlenecks, and inefficiencies that are costing your business time and money.
                                </p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={0.3}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg text-center h-full">
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Bot className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Automate & Optimize</h3>
                                <p className="text-gray-600">
                                    The system implements intelligent automation for repeatable tasks, creates workflow optimizations, and continuously improves processes over time.
                                </p>
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
                                Comprehensive AI capabilities to transform your business operations
                            </p>
                        </div>
                    </AnimatedSection>
                    <div className="max-w-4xl mx-auto">
                        <AnimatedSection animation="fadeInUp" delay={0.1}>
                            <div className="bg-slate-50 rounded-xl p-8 shadow-lg">
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">
                                            <strong>Email Analysis & Auto-Response:</strong> AI reads incoming emails, categorizes them, drafts responses, and handles routine inquiries automatically
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">
                                            <strong>Support Ticket Automation:</strong> Automatically triage, categorize, and route support tickets; provide instant responses to common issues
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">
                                            <strong>Spreadsheet Data Processing:</strong> AI monitors spreadsheets for updates, performs calculations, generates reports, and syncs data across systems
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">
                                            <strong>Workflow Pattern Recognition:</strong> Identifies recurring task patterns and suggests automation rules based on observed behavior
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">
                                            <strong>Task Scheduling & Reminders:</strong> Automatically schedules follow-ups, sends reminders, and ensures nothing falls through the cracks
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">
                                            <strong>Document Generation:</strong> Auto-generate reports, invoices, proposals, and other documents based on templates and data
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">
                                            <strong>Cross-Platform Integration:</strong> Connects with Gmail, Outlook, Slack, Google Sheets, Excel, Notion, Trello, and other business tools
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">
                                            <strong>Performance Analytics:</strong> Dashboard showing time saved, tasks automated, and ROI metrics to measure the impact
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeInUp" delay={0.2}>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Business Use Cases
                            </h2>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                                See how different teams can benefit from AI process optimization
                            </p>
                        </div>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatedSection animation="fadeInUp" delay={0.1}>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold mb-3 text-orange-400">Customer Support</h3>
                                <p className="text-slate-300">Auto-respond to FAQs, route complex tickets, track SLAs, and generate support reports automatically.</p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={0.15}>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold mb-3 text-orange-400">Sales Operations</h3>
                                <p className="text-slate-300">Automate lead follow-ups, update CRM records, schedule meetings, and generate quotes/proposals.</p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={0.2}>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold mb-3 text-orange-400">HR & Recruiting</h3>
                                <p className="text-slate-300">Screen resumes, schedule interviews, send onboarding materials, and track employee requests.</p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={0.25}>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold mb-3 text-orange-400">Finance & Accounting</h3>
                                <p className="text-slate-300">Process invoices, reconcile transactions, generate expense reports, and send payment reminders.</p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={0.3}>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold mb-3 text-orange-400">Project Management</h3>
                                <p className="text-slate-300">Update task statuses, send deadline reminders, generate progress reports, and track team workloads.</p>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInUp" delay={0.35}>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold mb-3 text-orange-400">Marketing</h3>
                                <p className="text-slate-300">Schedule social posts, analyze campaign metrics, generate content reports, and manage influencer outreach.</p>
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
                            Ready to Eliminate <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Manual Work?</span>
                        </h2>
                        <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Let's discuss how our Business Process Optimization Agent can save your team hours every day and transform your operations.
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

export default BusinessProcessOptimizationProject;
