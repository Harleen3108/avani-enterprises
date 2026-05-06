import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Search, Share2, Brain, Mic, Calculator, ArrowRight, Sparkles } from 'lucide-react';

interface EcosystemItem {
    id: string;
    name: string;
    icon?: React.ReactNode;
    image?: string;
    link: string;
    type: 'service' | 'project' | 'casestudy';
    description?: string;
}

const DH2EcosystemMap = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const services: EcosystemItem[] = [
        { id: 's1', name: 'Web Development', icon: <Globe className="w-5 h-5" />, link: '/services', type: 'service', description: 'Custom websites & apps' },
        { id: 's2', name: 'SEO & Content', icon: <Search className="w-5 h-5" />, link: '/services', type: 'service', description: 'Rank higher, grow faster' },
        { id: 's3', name: 'Social Media', icon: <Share2 className="w-5 h-5" />, link: '/services', type: 'service', description: 'Engage & convert' },
        { id: 's4', name: 'AI Solutions', icon: <Brain className="w-5 h-5" />, link: '/services', type: 'service', description: 'Intelligent automation' },
        { id: 's5', name: 'Podcast Production', icon: <Mic className="w-5 h-5" />, link: '/services', type: 'service', description: 'Professional audio content' },
        { id: 's6', name: 'Consulting', icon: <Calculator className="w-5 h-5" />, link: '/services', type: 'service', description: 'Strategic guidance' },
    ];

    const projects: EcosystemItem[] = [
        { id: 'p1', name: 'Indus Group', image: '/indus.jpeg', link: '/projects/indus', type: 'project' },
        { id: 'p2', name: 'Policicue', image: '/policucue.jpeg', link: '/projects/policicue', type: 'project' },
        { id: 'p3', name: 'FRD Nutrition', image: '/frd-nutrition-new.png', link: '/projects/frd-nutrition', type: 'project' },
        { id: 'p4', name: 'Hi-Tech Homes', image: '/hitech.jpeg', link: '/projects/hitech-homes', type: 'project' },
        { id: 'p5', name: 'Sanjeevni Hospital', image: '/sanjeevni.jpeg', link: '/projects/sanjeevni-hospital', type: 'project' },
        { id: 'p6', name: 'Rohtak Shoe Co', image: '/shoes.jpeg', link: '/projects/rohtak-shoe', type: 'project' },
    ];

    const caseStudies: EcosystemItem[] = [
        { id: 'c1', name: 'E-commerce Success', link: '/case-studies', type: 'casestudy', description: '300% traffic growth' },
        { id: 'c2', name: 'SEO Ranking #1', link: '/case-studies', type: 'casestudy', description: '15 keywords ranked' },
        { id: 'c3', name: 'Social Campaign', link: '/case-studies', type: 'casestudy', description: '200% followers boost' },
        { id: 'c4', name: 'AI Automation', link: '/case-studies', type: 'casestudy', description: '70% queries automated' },
        { id: 'c5', name: 'Podcast Growth', link: '/case-studies', type: 'casestudy', description: '50K+ downloads/mo' },
        { id: 'c6', name: 'Funding Success', link: '/case-studies', type: 'casestudy', description: '₹10Cr Series A' },
    ];

    const connections = [
        { from: 's1', to: 'p1' }, { from: 'p1', to: 'c1' },
        { from: 's2', to: 'p2' }, { from: 'p2', to: 'c2' },
        { from: 's3', to: 'p3' }, { from: 'p3', to: 'c3' },
        { from: 's4', to: 'p4' }, { from: 'p4', to: 'c4' },
        { from: 's5', to: 'p5' }, { from: 'p5', to: 'c5' },
        { from: 's6', to: 'p6' }, { from: 'p6', to: 'c6' },
    ];

    const getCardColor = (type: string) => {
        // Return minimal subtle borders instead of loud gradients
        return 'border border-slate-800 bg-black/40 hover:border-lime-400/50';
    };

    const isConnected = (itemId: string) => {
        if (!hoveredId) return false;
        return connections.some(
            conn => (conn.from === hoveredId && conn.to === itemId) ||
                (conn.to === hoveredId && conn.from === itemId) ||
                itemId === hoveredId
        );
    };

    return (
        <div className="relative py-6 md:py-12">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 border border-slate-800 px-3 py-1.5 md:px-6 md:py-2 rounded-full mb-3 md:mb-4 bg-black/50"
                >
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-lime-400" />
                    <span className="text-xs md:text-sm font-bold text-lime-400 uppercase tracking-wider">Our Digital Ecosystem</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2 md:mb-3 tracking-tight"
                >
                    How Everything Connects
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto"
                >
                    Explore our services, projects, and success stories - hover to see connections
                </motion.p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
                {/* Services Column */}
                <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 text-center">Services</h3>
                    {services.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                        >
                            <Link
                                to={item.link}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`block p-3 md:p-4 rounded-xl ${getCardColor(item.type)} transition-all duration-300 ${isConnected(item.id) ? 'border-lime-400' : ''
                                    } ${hoveredId && !isConnected(item.id) ? 'opacity-30' : 'opacity-100'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-gray-400">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-200 text-sm truncate tracking-wide">{item.name}</h4>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">{item.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Projects Column */}
                <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 text-center">Projects</h3>
                    {projects.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                        >
                            <Link
                                to={item.link}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`block p-3 rounded-xl ${getCardColor(item.type)} transition-all duration-300 ${isConnected(item.id) ? 'border-lime-400' : ''
                                    } ${hoveredId && !isConnected(item.id) ? 'opacity-30' : 'opacity-100'}`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover grayscale opacity-80" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-200 text-sm truncate tracking-wide">{item.name}</h4>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                                            <span>View Project</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Case Studies Column */}
                <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 text-center">Success Stories</h3>
                    {caseStudies.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                        >
                            <Link
                                to={item.link}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`block p-4 rounded-xl ${getCardColor(item.type)} transition-all duration-300 ${isConnected(item.id) ? 'border-lime-400' : ''
                                    } ${hoveredId && !isConnected(item.id) ? 'opacity-30' : 'opacity-100'}`}
                            >
                                <h4 className="font-semibold text-gray-200 text-sm mb-1 tracking-wide">{item.name}</h4>
                                <p className="text-xs text-lime-400/80 tracking-wide">{item.description}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DH2EcosystemMap;
