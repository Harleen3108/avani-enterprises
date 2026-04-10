import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink, Instagram, Linkedin, Mail, MessageCircle, 
  FileText, ArrowRight, Download, Calendar, ArrowUpRight, Globe, 
  Briefcase, Layout, Zap, Search, Instagram as InstagramIcon, 
  Linkedin as LinkedinIcon, Mail as MailIcon, Phone, Sun, Moon
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from 'next-themes';

/* ─── Types and Interfaces ─── */
declare global {
  interface Window {
    instgrm: any;
  }
}

interface LinkData {
  _id: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  isActive: boolean;
}

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

/* ─── Default Data ─── */
const defaultLinks: LinkData[] = [
  { _id: 'def-site', title: 'Visit Our Website', url: 'https://www.avanienterprises.in', description: '', icon: 'globe', isActive: true },
  { _id: 'def-wa', title: 'Chat on WhatsApp', url: 'https://wa.me/919253625099', description: '', icon: 'whatsapp', isActive: true },
];

const defaultResources = [
  { id: 'res-1', title: 'Avani Enterprises Services', subtitle: 'PDF • 12.4 MB', url: '/Avani Enterprises Services ( Website, SMM and Ads )  (3).pdf' },
  { id: 'res-2', title: 'Avani Services Bundle', subtitle: 'WORKSHOP VIDEO', url: '/Avani services bundle (2).pdf' },
  { id: 'res-3', title: 'Digital Marketing Results', subtitle: 'PDF • CASE STUDY', url: '/Avani services bundle (2).pdf' },
];

const badges = ["MARKETING", "DEVELOPMENT", "BRANDING"];

const socialLinks = [
  { icon: LinkedinIcon, url: 'https://www.linkedin.com/company/avani-enterprises-india/', label: 'LINKEDIN' },
  { icon: InstagramIcon, url: 'https://www.instagram.com/avanienterprises.branding/', label: 'INSTAGRAM' },
  { icon: Phone, url: 'tel:+919253625099', label: 'CALL US' },
  { icon: MailIcon, url: 'mailto:kp@avanienterprises.in', label: 'EMAIL' },
];

const reels = [
  { id: 1, url: 'https://www.instagram.com/reel/DWktMxahybH/', reelId: 'DWktMxahybH' },
  { id: 2, url: 'https://www.instagram.com/reel/DUSvTB3Ez8f/', reelId: 'DUSvTB3Ez8f' },
  { id: 3, url: 'https://www.instagram.com/reel/DQD9u5dk8AQ/', reelId: 'DQD9u5dk8AQ' },
  { id: 4, url: 'https://www.instagram.com/reel/DSuLytME5AY/', reelId: 'DSuLytME5AY' },
  { id: 5, url: 'https://www.instagram.com/reel/DV0EPK-D85D/', reelId: 'DV0EPK-D85D' },
];

const reviews = [
  { id: 1, name: "Prateek Sharma", role: "Business Owner", rating: 5, text: "The digital branding strategies provided by Avani transformed our presence. Highly professional!" },
  { id: 2, name: "Ananya Iyer", role: "Founder, Luxe Decor", rating: 5, text: "Exceptional service and creative vision. Our social media engagement spiked within months." },
  { id: 3, name: "Vikram Malhotra", role: "CEO, TechStart", rating: 5, text: "Their website development and SEO approach are top-notch. Truly the best marketing agency." },
];

const ReelsMarquee = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const duplicatedReels = [...reels, ...reels, ...reels];

  useEffect(() => {
    // Inject Instagram embed script if not already present
    if (!window.instgrm) {
      const script = document.createElement('script');
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      if (window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    }
  }, []);

  return (
    <div className="w-full overflow-hidden py-10">
      <h3 className="text-center text-[10px] font-black text-slate-400 tracking-widest uppercase mb-10">Trending Reels</h3>
      <motion.div
        className="flex gap-4 lg:gap-6"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60, // Slower duration for iframes
            ease: "linear"
          }
        }}
        style={{ width: "max-content" }}
      >
        {duplicatedReels.map((reel, index) => (
          <div
            key={`${reel.id}-${index}`}
            className="group relative w-64 h-[400px] lg:w-72 lg:h-[450px] rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:border-amber-400 transition-all flex-shrink-0 bg-white"
          >
            <iframe
              src={`https://www.instagram.com/reel/${reel.reelId}/embed`}
              className="w-full h-full border-0 rounded-2xl pointer-events-auto"
              scrolling="no"
              allowTransparency={true}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <div className="py-16">
      <h3 className="text-center text-[10px] font-black text-slate-400 tracking-widest uppercase mb-12">What Clients Say</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <motion.div 
            key={rev.id}
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex gap-1 mb-4 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Zap key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'opacity-20'}`} />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-8 italic leading-relaxed">
              "{rev.text}"
            </p>
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 dark:text-slate-500">
                  {rev.name[0]}
               </div>
               <div>
                  <h4 className="text-[11px] font-black text-slate-900 dark:text-slate-100 tracking-tight">{rev.name}</h4>
                  <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">{rev.role}</p>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Links() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  const ThemeToggle = () => (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:border-amber-400 transition-all group"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-slate-400 group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/links`);
        const activeLinks = response.data.filter((l: LinkData) => l.isActive);
        setLinks(activeLinks.length > 0 ? activeLinks : defaultLinks);
      } catch (err) {
        setLinks(defaultLinks);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-slate-950 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden transition-colors duration-500">
      {/* Header Spacer for standard Navbar */}
      <div className="h-20 lg:h-24" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 lg:space-y-12"
        >
          {/* ────── DESKTOP HERO SECTION ────── */}
          <section className="hidden lg:flex justify-between items-end">
            <motion.div className="max-w-2xl" variants={itemVariants}>
               <div className="mb-6 flex items-center gap-4">
                  <ThemeToggle />
                  <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">LINK DIRECTORY</span>
               </div>
              <h1 className="text-6xl xl:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-6">
                Digital <span className="text-amber-500">Elegance</span><br />
                Crafted.
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-lg mb-8">
                Avani Enterprises: Architecting digital curate experiences for high-end global brands.
              </p>
              <div className="flex gap-4">
                {badges.map((badge) => (
                  <span key={badge} className="px-5 py-2 bg-slate-100 dark:bg-slate-900 text-[10px] font-black tracking-widest text-slate-900 dark:text-slate-100 rounded-full border border-slate-200 dark:border-slate-800">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
               <a 
                href="/get-consultation"
                className="inline-block px-10 py-5 bg-gradient-to-br from-amber-400 to-orange-500 text-white font-black text-xs tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all"
               >
                 BOOK A CONSULTATION
               </a>
               <div className="mt-4 text-right">
                  <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase cursor-pointer hover:text-amber-500 transition-colors">VIEW PORTFOLIO</span>
               </div>
            </motion.div>
          </section>

          {/* ────── MOBILE HERO SECTION ────── */}
          <section className="lg:hidden flex flex-col items-center text-center pt-8">
             {/* Removed extra logo for mobile */}

             <motion.div variants={itemVariants}>
                <div className="mb-6 scale-90">
                   <ThemeToggle />
                </div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Avani Enterprises</h1>
                <p className="text-[10px] font-black text-amber-600 tracking-[0.2em] uppercase mb-6">India's #1 Digital Marketing Agency</p>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {badges.map((badge) => (
                    <span key={badge} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-900 text-[9px] font-black text-slate-900 dark:text-slate-100 rounded-full border border-slate-200 dark:border-slate-800 uppercase">
                      {badge}
                    </span>
                  ))}
                </div>
             </motion.div>

             <motion.a
                variants={itemVariants}
                href="/get-consultation"
                className="w-full bg-gradient-to-br from-amber-400 to-orange-500 p-[1px] rounded-2xl active:scale-95 transition-all mb-8 overflow-hidden group"
              >
                <div className="bg-white/10 backdrop-blur-sm p-6 flex flex-col items-center text-white text-center">
                  <div className="mb-3 p-3 bg-white/20 rounded-xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black mb-1">Book a Free Consultation</h3>
                  <p className="text-xs font-medium text-white/90">Elevate your brand's digital presence</p>
                </div>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
              </motion.a>
          </section>

          {/* ────── MAIN GRID CONTENT ────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Resources Card (Top Row Left) */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-sm h-full"
            >
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-xs font-black text-slate-400 tracking-widest uppercase flex items-center gap-2">
                   RESOURCES <Download className="w-4 h-4" />
                 </h3>
              </div>
              <div className="space-y-4">
                {defaultResources.map((res) => (
                  <a 
                    key={res.id} 
                    href={res.url} 
                    className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/10 group transition-all"
                  >
                    <div className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                      <FileText className="w-6 h-6 text-amber-500" />
                      <div>
                        <h4 className="font-black text-sm">{res.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 tracking-wider mt-0.5">{res.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Connect Card (Top Row Right) */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-4 bg-gradient-to-br from-white dark:from-slate-900 via-[#FFFDF5] dark:via-slate-900/50 to-[#FFF9E5] dark:to-slate-900 rounded-3xl p-6 lg:p-8 border border-[#F5E6BD]/30 dark:border-slate-800 shadow-sm flex flex-col h-full"
            >
              <h3 className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-6">CONNECT WITH US</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                 {socialLinks.map((social) => (
                   <a 
                    key={social.label}
                    href={social.url}
                    className="flex flex-col items-center justify-center aspect-square p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-amber-50 hover:border-amber-200 dark:hover:bg-amber-900/10 group transition-all text-slate-900 dark:text-slate-100"
                   >
                     <social.icon className="w-5 h-5 group-hover:text-amber-500 group-hover:scale-110 transition-all mb-2" />
                     <span className="text-[8px] font-black tracking-widest uppercase">{social.label}</span>
                   </a>
                 ))}
              </div>

              <div className="mt-auto">
                <button 
                  onClick={() => window.open('https://wa.me/919253625099', '_blank')}
                  className="w-full py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black text-slate-900 dark:text-slate-100 tracking-widest hover:bg-emerald-50 hover:border-emerald-200 dark:hover:bg-emerald-900/10 hover:text-emerald-600 transition-all flex items-center justify-center gap-3 uppercase"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-500" />
                  CHAT ON WHATSAPP
                </button>
              </div>
            </motion.div>

            {/* Quote Section (Bottom Row Left/Right depending on col-span) */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-4 relative bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-sm h-full"
            >
              <div className="absolute left-0 top-10 bottom-10 w-1.5 bg-amber-500 rounded-r-full" />
              <div className="pl-6 pt-2">
                 <p className="text-xl lg:text-2xl font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed mb-10 font-serif">
                  “Design is not just what it looks like and feels like. Design is how it works. We curate digital ecosystems that transcend utility to become legacy.”
                 </p>
                 <p className="text-[10px] font-black text-slate-900 dark:text-slate-100 tracking-widest uppercase">AVANI MANAGEMENT TEAM</p>
              </div>
            </motion.div>

            {/* Visit Website Card (Bottom Row Right) */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-8 relative h-[300px] lg:h-[400px] rounded-3xl overflow-hidden group shadow-sm border border-slate-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                alt="Office" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end text-white">
                <h3 className="text-3xl lg:text-4xl font-black mb-2">Visit Website</h3>
                <p className="text-sm lg:text-base font-medium text-white/80 max-w-md mb-8">
                  Explore our full suite of premium digital solutions and high-end case studies.
                </p>
                <button onClick={() => window.open('https://www.avanienterprises.in', '_blank')} className="flex items-center gap-3 text-sm lg:text-base font-black tracking-widest hover:text-amber-400 transition-colors">
                  LAUNCH EXPERIENCE <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ────── REELS MARQUEE ────── */}
          <motion.div variants={itemVariants} className="-mx-4 sm:-mx-6 lg:-mx-8">
            <ReelsMarquee />
          </motion.div>

          {/* ────── REVIEWS SECTION ────── */}
          <motion.div variants={itemVariants}>
            <ReviewsSection />
          </motion.div>

        </motion.div>
      </main>

      {/* ────── FOOTER ────── */}
      <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[9px] font-black text-slate-400 tracking-[0.3em] uppercase">
            AVANI ENTERPRISES © 2026 ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* ────── MOBILE BOTTOM NAV ────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden">
        <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-2 flex items-center justify-between shadow-2xl">
          <RouterLink to="/services" className="flex flex-col items-center justify-center flex-1 py-1 rounded-2xl hover:bg-white/5 text-amber-400 group">
             <div className="p-2 bg-amber-400/10 rounded-xl mb-1 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                <Layout className="w-5 h-5" />
             </div>
             <span className="text-[9px] font-black uppercase tracking-wider">Services</span>
          </RouterLink>
          <RouterLink to="/get-consultation" className="flex flex-col items-center justify-center flex-1 py-1 rounded-2xl hover:bg-white/5 text-white group">
             <div className="p-2 bg-white/5 rounded-xl mb-1 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                <Briefcase className="w-5 h-5" />
             </div>
             <span className="text-[9px] font-black uppercase tracking-wider">Consult</span>
          </RouterLink>
          <RouterLink to="/newsletters" className="flex flex-col items-center justify-center flex-1 py-1 rounded-2xl hover:bg-white/5 text-white group">
             <div className="p-2 bg-white/5 rounded-xl mb-1 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                <Search className="w-5 h-5" />
             </div>
             <span className="text-[9px] font-black uppercase tracking-wider">Resources</span>
          </RouterLink>
          <button onClick={() => window.open('https://wa.me/919253625099', '_blank')} className="flex flex-col items-center justify-center flex-1 py-1 rounded-2xl hover:bg-white/5 text-white group">
             <div className="p-2 bg-white/5 rounded-xl mb-1 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                <Zap className="w-5 h-5" />
             </div>
             <span className="text-[9px] font-black uppercase tracking-wider">Chat</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -100%; transition-property: left; }
          100% { left: 100%; transition-property: left; }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
