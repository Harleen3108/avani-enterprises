import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, MapPin, Zap, ChevronRight, ChevronLeft, X } from 'lucide-react';

interface GlobalPresenceSectionProps {
  compact?: boolean;
}

/* ─── Location data ─── */
const offices = [
  {
    city: 'Rohtak',
    country: 'India',
    label: 'Headquarters',
    tagline: 'Where it all began',
    description: 'Our founding office and operational hub: 106, First Floor, Agro Mall, Rohtak.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    cx: 645, cy: 208,
    color: '#f59e0b',
  },
  {
    city: 'Gurgaon',
    country: 'India',
    label: 'NCR Office',
    tagline: 'Corporate powerhouse',
    description: "Strategic presence in India's corporate capital serving enterprise clients.",
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop',
    cx: 660, cy: 232,
    color: '#fb923c',
  },
  {
    city: 'Mumbai',
    country: 'India',
    label: 'West India Office',
    tagline: 'Financial nerve center',
    description: "Our western hub: Third Floor, Vasudev Chamber, Teli Galli Cross Rd, Andheri East, Mumbai, 400069.",
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop',
    cx: 640, cy: 254,
    color: '#ef4444',
  },
  {
    city: 'Australia',
    country: 'Australia',
    label: 'APAC Office',
    tagline: 'Crossing oceans',
    description: 'Serving clients across the Asia-Pacific region from Australia.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop',
    cx: 820, cy: 370,
    color: '#3b82f6',
  },
];

const connections = [
  { from: offices[0], to: offices[1] },
  { from: offices[0], to: offices[2] },
  { from: offices[0], to: offices[3] },
];

function getCurvePath(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const midY = Math.min(y1, y2) - dist * 0.18;
  return `M${x1},${y1} Q${midX},${midY} ${x2},${y2}`;
}

/* ═══════════════════════════════════════════════════ */
/*  FULL MODE — for /global-presence page (static)    */
/* ═══════════════════════════════════════════════════ */
const FullMapSection: React.FC = () => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<typeof offices[0] | null>(null);
  return (
    <section className="py-16 md:py-24 bg-[#FCFAFA]">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative w-full aspect-[2/1] min-h-[400px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#080c1a] via-[#0d1427] to-[#0a1020] shadow-2xl border border-white/[0.06]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-500/[0.08] rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-orange-500/[0.06] rounded-full blur-[60px] pointer-events-none" />
          
          <img 
            src="/global2.png"
            alt="Global Network"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none z-0"
          />



          {/* Cinematic Overlay Modal for Click Interaction */}
          <AnimatePresence>
            {activeCity && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-[#080c1a]/70 backdrop-blur-sm p-4"
                onClick={() => setActiveCity(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                  className="relative w-full max-w-md bg-[#0a0f1e] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <div className="absolute top-4 right-4 z-10">
                    <button onClick={() => setActiveCity(null)} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  
                  {/* Image Header */}
                  <div className="h-48 md:h-56 relative overflow-hidden group">
                    <motion.img 
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      src={activeCity.image} 
                      alt={activeCity.city} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/40 to-transparent" />
                    
                    {/* Embedded Location Badge */}
                    <div className="absolute bottom-5 left-6 flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeCity.color }} />
                       <span className="text-white/90 text-xs font-bold tracking-widest uppercase">{activeCity.country}</span>
                    </div>
                  </div>
                  
                  {/* Content Body */}
                  <div className="p-6 md:p-8 pt-2 relative">
                    <div className="mb-4">
                      <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-2">{activeCity.city}</h3>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: activeCity.color }}>{activeCity.label}</span>
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">
                      {activeCity.description}
                    </p>
                    
                    {/* Animated Progress / Decorative Line */}
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
                        className="h-full rounded-full" 
                        style={{ backgroundColor: activeCity.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0f1e] to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/*  COMPACT MODE — Interactive Cinematic Section (Homepage)       */
/* ═══════════════════════════════════════════════════════════════ */
const InteractiveMapSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeOffice = offices[activeIndex];

  const navigate = useCallback((dir: number) => {
    setDirection(dir);
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return offices.length - 1;
      if (next >= offices.length) return 0;
      return next;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  // Touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <section id="global-presence" className="relative py-20 md:py-32 bg-gradient-to-b from-[#FCFAFA] via-white to-[#FCFAFA] overflow-hidden">
      {/* Ambient blurs (static CSS, no JS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-orange-100/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/50 rounded-full px-5 py-2 mb-6 shadow-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-700 text-[10px] font-black uppercase tracking-[0.2em]">Our Global Footprint</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-[0.9]">
            From Roots{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">to Reach</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            Explore our journey across continents — tap or swipe to discover each location
          </p>
        </motion.div>

        {/* ── Main content: Map + Active Placard ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12">

          {/* LEFT: Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="relative w-full aspect-[2/1] min-h-[350px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#080c1a] via-[#0d1427] to-[#0a1020] shadow-2xl shadow-slate-900/50 border border-white/[0.06]">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '35px 35px' }} />
              {/* Radial vignette for depth */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 65% 50%, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />

              <img 
                src="/global2.png"
                alt="Global Network"
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none z-0"
              />



              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0a0f1e] to-transparent pointer-events-none z-20" />
            </div>
          </motion.div>

          {/* RIGHT: Active Location Placard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div
              ref={carouselRef}
              className="relative overflow-hidden rounded-[2rem] min-h-[420px] md:min-h-[480px]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/40"
                >
                  {/* Background image */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={activeOffice.image}
                      alt={activeOffice.city}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                    {/* Location badge */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: activeOffice.color }} />
                        <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{activeOffice.tagline}</span>
                      </div>
                    </div>

                    {/* Counter */}
                    <div className="absolute top-6 right-6">
                      <span className="text-white/60 text-xs font-black tracking-wider">
                        {String(activeIndex + 1).padStart(2, '0')}/{String(offices.length).padStart(2, '0')}
                      </span>
                    </div>

                    {/* City name on image */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-1">
                        {activeOffice.city}
                      </h3>
                      <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{activeOffice.country}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: activeOffice.color + '15' }}>
                        <MapPin className="w-4 h-4" style={{ color: activeOffice.color }} />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{activeOffice.label}</span>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium mb-6">
                      {activeOffice.description}
                    </p>

                    {/* Visual indicator bar */}
                    <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: activeOffice.color }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'linear' }}
                        key={activeIndex}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => navigate(-1)}
                className="group w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 transition-all duration-300"
                aria-label="Previous location"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {offices.map((office, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                    className="group relative p-1"
                    aria-label={`Go to ${office.city}`}
                  >
                    <div
                      className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 h-3' : 'w-3 h-3 hover:scale-125'}`}
                      style={{ background: i === activeIndex ? office.color : '#e2e8f0' }}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                className="group w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 transition-all duration-300"
                aria-label="Next location"
              >
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom: Quick Location Cards (thumbnail strip) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10"
        >
          {offices.map((office, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={office.city}
                onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                className={`group relative text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'bg-slate-900 border-slate-800 shadow-xl shadow-slate-900/20'
                    : 'bg-white border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                      style={{ background: office.color, boxShadow: isActive ? `0 0 12px ${office.color}` : 'none' }}
                    />
                    <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-slate-400' : 'text-slate-300'}`}>
                      {office.label}
                    </span>
                  </div>
                  <h4 className={`text-lg font-black tracking-tight transition-colors ${isActive ? 'text-white' : 'text-slate-900 group-hover:text-amber-600'}`}>
                    {office.city}
                  </h4>
                  <p className={`text-[10px] font-bold mt-1 transition-colors ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                    {office.tagline}
                  </p>
                </div>
                {/* Active indicator bar */}
                <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} style={{ background: office.color }} />
              </button>
            );
          })}
        </motion.div>

        {/* Stats + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900 rounded-2xl md:rounded-[1.5rem] p-6 md:p-8 shadow-2xl shadow-slate-900/30"
        >
          <div className="flex items-center gap-6 md:gap-10">
            {[
              { value: '04', label: 'Hubs' },
              { value: '02', label: 'Continents' },
              { value: '∞', label: 'Reach' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="text-2xl md:text-3xl font-black text-white leading-none">{s.value}</span>
                <span className="block text-[8px] font-bold text-amber-500 uppercase tracking-widest mt-1">{s.label}</span>
              </div>
            ))}
          </div>
          <Link
            to="/global-presence"
            className="group inline-flex items-center gap-3 bg-amber-500 text-slate-900 px-8 py-3.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            Explore Network
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════ */
/*  Main Export                            */
/* ═══════════════════════════════════════ */
const GlobalPresenceSection: React.FC<GlobalPresenceSectionProps> = ({ compact = false }) => {
  return compact ? <InteractiveMapSection /> : <FullMapSection />;
};

export default GlobalPresenceSection;
