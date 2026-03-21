import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Globe, Zap } from 'lucide-react';

interface GlobalPresenceSectionProps {
  /** If true, shows a compact version for the Home page */
  compact?: boolean;
}

const offices = [
  {
    city: 'Rohtak',
    country: 'India',
    label: 'Headquarters',
    description: 'Our founding office and operational hub driving innovation across India.',
    mapPosition: { top: '38%', left: '62.5%' },
  },
  {
    city: 'Gurgaon',
    country: 'India',
    label: 'NCR Office',
    description: 'Strategic presence in India\'s corporate capital serving enterprise clients.',
    mapPosition: { top: '37%', left: '63.2%' },
  },
  {
    city: 'Mumbai',
    country: 'India',
    label: 'West India Office',
    description: 'Expanding our reach across western India\'s thriving business ecosystem.',
    mapPosition: { top: '44%', left: '62.1%' },
  },
  {
    city: 'Australia',
    country: 'Australia',
    label: 'APAC Office',
    description: 'Serving clients across the Asia-Pacific region with dedicated support.',
    mapPosition: { top: '68%', left: '83%' },
  },
];

const GlobalPresenceSection: React.FC<GlobalPresenceSectionProps> = ({ compact = false }) => {
  return (
    <section className={`relative overflow-hidden ${compact ? 'py-24' : 'py-32'} bg-[#FCFAFA]`}>
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px]" />
        
        {/* Subtle Dots Pattern */}
        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/50 rounded-full px-5 py-2 mb-8 shadow-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-700 text-[10px] font-black uppercase tracking-[0.2em]">Regional Hubs & Global Reach</span>
          </div>
          
          <h2 className={`${compact ? 'text-5xl md:text-6xl' : 'text-6xl md:text-8xl'} font-black text-slate-900 tracking-tighter mb-6 leading-[0.9]`}>
            Our Global <br />
            <span className="relative inline-block mt-2">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Presence</span>
               {/* Underline aesthetic */}
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '100%' }}
                 viewport={{ once: true }}
                 transition={{ duration: 1, delay: 0.5 }}
                 className="absolute -bottom-2 left-0 h-2 bg-amber-200/50 rounded-full -z-10"
               />
            </span>
          </h2>
        </motion.div>

        {/* World Map Section - Dot Matrix Style (High Tech) */}
        <div className="relative mb-24 lg:mb-32 group/map">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-5xl mx-auto aspect-[16/8] bg-white/40 backdrop-blur-sm rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
          >
             {/* Dot Matrix World Map (Simplified visual dots) */}
             <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply flex items-center justify-center p-12">
                <svg viewBox="0 0 1000 500" className="w-full h-full fill-slate-900">
                    {/* A conceptual world map made of small circles for premium look */}
                    {/* (This is a simplified representation of the dot-matrix technique) */}
                    <path d="M150,150 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M200,100 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M300,200... (etc)" />
                    <rect x="0" y="0" width="1000" height="500" fill="url(#dotPattern)" />
                    <defs>
                        <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" className="fill-slate-400 opacity-20" />
                        </pattern>
                    </defs>
                    {/* The "Map" Mask (Conceptual) */}
                    <image 
                       href="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop" 
                       width="1000" height="500" 
                       className="grayscale opacity-10"
                       preserveAspectRatio="xMidYMid slice"
                    />
                </svg>
             </div>

             {/* Connection Lines (Glowing Curves) */}
             <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
                <defs>
                   <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                   </linearGradient>
                </defs>
                {/* Curved line from India to Australia */}
                <motion.path
                   d="M625,185 Q750,220 830,340"
                   stroke="url(#lineGradient)"
                   strokeWidth="2"
                   strokeDasharray="10,10"
                   fill="none"
                   initial={{ pathLength: 0, opacity: 0 }}
                   whileInView={{ pathLength: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
             </svg>

             {/* Pin Points with Advanced Glow */}
             {offices.map((office, index) => (
                <motion.div
                   key={office.city}
                   className="absolute z-20"
                   style={{ top: office.mapPosition.top, left: office.mapPosition.left }}
                   initial={{ opacity: 0, scale: 0 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                   <div className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin">
                      {/* Animated Glow Rings */}
                      <div className="absolute inset-0 rounded-full bg-amber-500/20 scale-[4] blur-xl animate-pulse" />
                      <div className="absolute inset-0 rounded-full bg-amber-500/40 scale-[2] animate-ping opacity-20" />
                      
                      {/* Central Point */}
                      <div className="relative h-6 w-6 bg-white rounded-full border-[3px] border-amber-500 shadow-xl shadow-amber-500/50 flex items-center justify-center group-hover/pin:scale-125 transition-transform duration-300">
                         <div className="h-2 w-2 bg-amber-500 rounded-full" />
                      </div>

                      {/* Floating Label */}
                      <div className="absolute -top-12 opacity-0 group-hover/pin:opacity-100 group-hover/pin:-translate-y-2 transition-all duration-300 pointer-events-none whitespace-nowrap">
                         <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                            {office.city}
                         </div>
                         <div className="w-2 h-2 bg-slate-900 absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45" />
                      </div>
                   </div>
                </motion.div>
             ))}
          </motion.div>
        </div>

        {/* High-End Feature Cards (Glassmorphism) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {offices.map((office, index) => (
              <motion.div
                 key={office.city}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: index * 0.15 }}
                 className="group relative bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-3 transition-all duration-500 overflow-hidden"
              >
                 {/* Background Glow */}
                 <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />
                 
                 <div className="relative z-10">
                    <div className="w-16 h-16 bg-amber-50 rounded-[1.25rem] flex items-center justify-center mb-8 border border-amber-100/50 group-hover:bg-amber-500 group-hover:rotate-[10deg] transition-all duration-300">
                       <MapPin className="w-8 h-8 text-amber-500 group-hover:text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-amber-600 transition-colors">
                       {office.city}
                    </h3>
                    <div className="flex items-center gap-2 mb-6">
                       <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                          {office.label}
                       </span>
                    </div>
                    
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                       {office.description}
                    </p>
                 </div>

                 {/* Bottom Accent */}
                 <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600 group-hover:w-full transition-all duration-700" />
              </motion.div>
           ))}
        </div>

        {/* Bottom CTA for Section */}
        {compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-24"
          >
            <Link
              to="/global-presence"
              className="group relative inline-flex items-center gap-6 bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all duration-500 shadow-2xl shadow-slate-900/30 hover:shadow-amber-500/40"
            >
              Discover Our Network
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-amber-600 transition-all duration-300">
                 <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
