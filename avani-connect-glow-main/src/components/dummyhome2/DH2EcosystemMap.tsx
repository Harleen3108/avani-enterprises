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

    const isConnected = (itemId: string) => {
        if (!hoveredId) return false;
        return connections.some(
            conn => (conn.from === hoveredId && conn.to === itemId) ||
                (conn.to === hoveredId && conn.from === itemId) ||
                itemId === hoveredId
        );
    };

    return (
        <div className="relative py-4 md:py-8">
            {/* Header */}
            <div className="text-center mb-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
                    style={{ border: '1px solid var(--border-s)', background: 'var(--bg-base)' }}
                >
                    <Sparkles size={14} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Digital Ecosystem</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '.8rem' }}
                >
                    HOW EVERYTHING CONNECTS
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ fontSize: '.9rem', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto' }}
                >
                    Explore our services, projects, and success stories. Hover over an element to reveal its strategic connections.
                </motion.p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                {/* Services Column */}
                <div className="space-y-3">
                    <h3 style={{ fontSize: '.65rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.15em', textAlign: 'center', marginBottom: '1.5rem' }}>Core Services</h3>
                    {services.map((item, index) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}>
                            <Link
                                to={item.link}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`block p-4 rounded-xl border transition-all duration-300 ${isConnected(item.id) ? 'border-[var(--accent)]' : 'border-[var(--border-s)] hover:border-[var(--border-f)]'}`}
                                style={{ background: 'var(--bg-surface)', opacity: hoveredId && !isConnected(item.id) ? 0.4 : 1, transform: isConnected(item.id) ? 'translateX(4px)' : 'translateX(0)' }}
                            >
                                <div className="flex items-center gap-3">
                                    <div style={{ color: 'var(--text-dim)' }}>{item.icon}</div>
                                    <div className="flex-1 min-w-0">
                                        <h4 style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '.9rem' }} className="truncate">{item.name}</h4>
                                        <p style={{ fontSize: '.75rem', color: 'var(--text-muted)' }} className="truncate">{item.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Projects Column */}
                <div className="space-y-3">
                    <h3 style={{ fontSize: '.65rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.15em', textAlign: 'center', marginBottom: '1.5rem' }}>Active Projects</h3>
                    {projects.map((item, index) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}>
                            <Link
                                to={item.link}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`block p-3 rounded-xl border transition-all duration-300 ${isConnected(item.id) ? 'border-[var(--text-main)]' : 'border-[var(--border-s)] hover:border-[var(--border-f)]'}`}
                                style={{ background: 'var(--bg-surface)', opacity: hoveredId && !isConnected(item.id) ? 0.4 : 1, transform: isConnected(item.id) ? 'translateX(4px)' : 'translateX(0)' }}
                            >
                                <div className="flex items-center gap-3">
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover filter grayscale" style={{ filter: isConnected(item.id) ? 'grayscale(0)' : 'grayscale(100%)', transition: 'filter .4s' }} />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '.9rem' }} className="truncate">{item.name}</h4>
                                        <div className="flex items-center gap-1 mt-1" style={{ fontSize: '.7rem', color: 'var(--text-dim)' }}>
                                            <span>View Build</span>
                                            <ArrowRight size={10} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Case Studies Column */}
                <div className="space-y-3">
                    <h3 style={{ fontSize: '.65rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.15em', textAlign: 'center', marginBottom: '1.5rem' }}>Success Stories</h3>
                    {caseStudies.map((item, index) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}>
                            <Link
                                to={item.link}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`block p-4 rounded-xl border transition-all duration-300 ${isConnected(item.id) ? 'border-[var(--accent)]' : 'border-[var(--border-s)] hover:border-[var(--border-f)]'}`}
                                style={{ background: 'var(--bg-surface)', opacity: hoveredId && !isConnected(item.id) ? 0.4 : 1, transform: isConnected(item.id) ? 'translateX(-4px)' : 'translateX(0)' }}
                            >
                                <h4 style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '.9rem', marginBottom: '.2rem' }}>{item.name}</h4>
                                <p style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>{item.description}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default DH2EcosystemMap;
