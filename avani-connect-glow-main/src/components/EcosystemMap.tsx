import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Globe,
    Search,
    Share2,
    Brain,
    Mic,
    Calculator,
    ArrowRight,
    Sparkles
} from 'lucide-react';

interface EcosystemItem {
    id: string;
    name: string;
    icon?: React.ReactNode;
    image?: string;
    link: string;
    type: 'service' | 'project' | 'casestudy';
    description?: string;
}

const EcosystemMap = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const services: EcosystemItem[] = [
        { id: 's1', name: 'Web Development', icon: <Globe className="w-6 h-6" />, link: '/services', type: 'service', description: 'Custom websites & apps' },
        { id: 's2', name: 'SEO & Content', icon: <Search className="w-6 h-6" />, link: '/services', type: 'service', description: 'Rank higher, grow faster' },
        { id: 's3', name: 'Social Media', icon: <Share2 className="w-6 h-6" />, link: '/services', type: 'service', description: 'Engage & convert' },
        { id: 's4', name: 'AI Solutions', icon: <Brain className="w-6 h-6" />, link: '/services', type: 'service', description: 'Intelligent automation' },
        { id: 's5', name: 'Podcast Production', icon: <Mic className="w-6 h-6" />, link: '/services', type: 'service', description: 'Professional audio content' },
        { id: 's6', name: 'Consulting', icon: <Calculator className="w-6 h-6" />, link: '/services', type: 'service', description: 'Strategic guidance' },
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
        switch (type) {
            case 'service':
                return 'from-blue-500/20 to-blue-600/20 border-blue-300/50';
            case 'project':
                return 'from-purple-500/20 to-purple-600/20 border-purple-300/50';
            case 'casestudy':
                return 'from-amber-500/20 to-amber-600/20 border-amber-300/50';
            default:
                return 'from-gray-500/20 to-gray-600/20 border-gray-300/50';
        }
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
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300/30 px-3 py-1.5 md:px-6 md:py-2 rounded-full mb-3 md:mb-4"
                >
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-amber-600" />
                    <span className="text-xs md:text-sm font-bold text-amber-900 uppercase tracking-wider">Our Digital Ecosystem</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-2 md:mb-3"
                >
                    How Everything Connects
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto"
                >
                    Explore our services, projects, and success stories - hover to see connections
                </motion.p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
                {/* Services Column */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 text-center">Services</h3>
                    {services.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                        >
                            <Link
                                to={item.link}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`block p-3 md:p-4 rounded-xl md:rounded-2xl border-2 bg-gradient-to-br ${getCardColor(item.type)} backdrop-blur-sm transition-all duration-300 ${isConnected(item.id) ? 'scale-105 shadow-lg shadow-blue-200' : 'hover:scale-105'
                                    } ${hoveredId && !isConnected(item.id) ? 'opacity-40' : 'opacity-100'}`}
                            >
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="p-2 bg-white/80 rounded-lg text-blue-600">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                                        <p className="text-xs text-slate-600 truncate">{item.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Projects Column */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-purple-600 uppercase tracking-widest mb-4 text-center">Projects</h3>
                    {projects.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                        >
                            <Link
                                to={item.link}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`block p-3 rounded-2xl border-2 bg-gradient-to-br ${getCardColor(item.type)} backdrop-blur-sm transition-all duration-300 ${isConnected(item.id) ? 'scale-105 shadow-lg shadow-purple-200' : 'hover:scale-105'
                                    } ${hoveredId && !isConnected(item.id) ? 'opacity-40' : 'opacity-100'}`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-white" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                                        <div className="flex items-center gap-1 text-xs text-purple-600">
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
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-amber-600 uppercase tracking-widest mb-4 text-center">Success Stories</h3>
                    {caseStudies.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                        >
                            <Link
                                to={item.link}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`block p-4 rounded-2xl border-2 bg-gradient-to-br ${getCardColor(item.type)} backdrop-blur-sm transition-all duration-300 ${isConnected(item.id) ? 'scale-105 shadow-lg shadow-amber-200' : 'hover:scale-105'
                                    } ${hoveredId && !isConnected(item.id) ? 'opacity-40' : 'opacity-100'}`}
                            >
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.name}</h4>
                                <p className="text-xs text-amber-700 font-semibold">{item.description}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-wrap justify-center gap-6 mt-12 text-xs"
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-slate-600 font-medium">Services</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-slate-600 font-medium">Projects</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-slate-600 font-medium">Case Studies</span>
                </div>
            </motion.div>
        </div>
    );
};

export default EcosystemMap;
