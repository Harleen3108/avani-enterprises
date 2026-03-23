import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, ArrowUpRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';


const officeDetails = [
  {
    city: 'Rohtak',
    country: 'India',
    label: 'Corporate Headquarters',
    description: 'Our flagship innovation center where strategy meets execution. As our founding hub, Rohtak continues to drive our core values across the nation.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    tagline: 'The Heart of Innovation',
    contact: {
       address: 'Main HQ, Rohtak, Haryana 124001',
       email: 'info@avanienterprises.com',
       phone: '+91 98XXX XXXXX'
    }
  },
  {
    city: 'Gurgaon',
    country: 'India',
    label: 'Strategic NCR Hub',
    description: 'Located in the steel-and-glass heart of Cyber City, our Gurgaon office bridges the gap between digital vision and enterprise reality.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Enterprise Connectivity',
    contact: {
       address: 'DLF Cyber City, Gurgaon, Haryana 122002',
       email: 'gurgaon@avanienterprises.com',
       phone: '+91 98XXX XXXXX'
    }
  },
  {
    city: 'Mumbai',
    country: 'India',
    label: 'Western India Operations',
    description: 'In the financial capital of India, we empower businesses with cutting-edge tech solutions that drive real commercial growth.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Scale & Growth Center',
    contact: {
       address: 'Bandra Kurla Complex, Mumbai, MH 400051',
       email: 'mumbai@avanienterprises.com',
       phone: '+91 98XXX XXXXX'
    }
  },
  {
    city: 'Australia',
    country: 'Australia',
    label: 'APAC Regional Office',
    description: 'Extending our reach across the Pacific, our Australian presence ensures global support and local expertise for our international partners.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Global Outreach',
    contact: {
       address: 'Sydney CBD, NSW, Australia',
       email: 'apac@avanienterprises.com',
       phone: '+61 X XXXX XXXX'
    }
  },
];

const GlobalPresence = () => {


  return (
    <div className="bg-white min-h-screen font-sans">
      <Helmet>
        <title>Global Presence | High-Tech Network | Avani Enterprises</title>
        <meta name="description" content="Discover Avani Enterprises' premium global network. From our Rohtak HQ to our Australia regional office, we serve clients with excellence." />
      </Helmet>

      {/* High-Impact Hero Section */}
      <section className="relative pt-44 pb-32 lg:pt-52 lg:pb-40 overflow-hidden bg-[#FCFAFA]">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
           <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-sky-500/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-6 py-2.5 mb-10 shadow-xl shadow-slate-200/40">
                <Globe className="w-5 h-5 text-amber-500 animate-spin-slow" />
                <span className="text-slate-900 text-xs font-black uppercase tracking-[0.3em]">Worldwide Operations</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.85] uppercase">
              Global <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                Connectivity
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium mb-16 px-4 italic">
              "Aesa kuch" — premium high-tech networking from Rohtak to our international hubs. We bridge continents with digital excellence.
            </p>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
               <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-900 leading-none">04</span>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">Major Hubs</span>
               </div>
               <div className="h-10 w-px bg-slate-200 hidden md:block" />
               <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-900 leading-none">02</span>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">Continents</span>
               </div>
               <div className="h-10 w-px bg-slate-200 hidden md:block" />
               <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-900 leading-none">∞</span>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">Digital reach</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Network Video */}
      <section className="py-16 md:py-24 bg-[#FCFAFA] relative border-b border-slate-100">
        <motion.div
           initial={{ opacity: 0, y: 40, scale: 0.98 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative w-full aspect-square md:aspect-video lg:h-[75vh] 2xl:h-[80vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-900/10 border border-slate-200/50 bg-slate-900 group">
            <img 
              src="/global2.png"
              alt="Global Network"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Subtle inner premium gradient over image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* Featured Office Collection - Premium Detailed Listing */}
      <section className="py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center gap-6 mb-24">
              <div className="h-px bg-slate-200 flex-1" />
              <div className="text-center px-6">
                 <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Office Collection</h2>
                 <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mt-2">Detailed Network Overview</p>
              </div>
              <div className="h-px bg-slate-200 flex-1" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
              {officeDetails.map((office, index) => (
                 <motion.div
                    key={office.city}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col group"
                 >
                    {/* Visual Container */}
                    <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 mb-10">
                       <img 
                          src={office.image} 
                          alt={office.city} 
                          className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-1000"
                       />
                       {/* Overlay Gradient */}
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                       
                       {/* Floating Stats or Tags */}
                       <div className="absolute top-8 left-8">
                           <div className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl shadow-xl flex items-center gap-3 border border-white/50">
                              <Target className="w-4 h-4 text-amber-500" />
                              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{office.tagline}</span>
                           </div>
                       </div>

                       <div className="absolute bottom-8 right-8">
                           <Link to="/contact" className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-white hover:text-amber-500 transition-all duration-300">
                              <ArrowUpRight className="w-6 h-6" />
                           </Link>
                       </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-4">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                              <MapPin className="w-6 h-6 text-slate-800" />
                           </div>
                           <div>
                              <h3 className="text-4xl font-black text-slate-900 leading-none mb-1">{office.city}</h3>
                              <p className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.2em]">{office.label}</p>
                           </div>
                        </div>

                        <p className="text-lg text-slate-500 leading-relaxed font-medium mb-10 mb-auto">
                           {office.description}
                        </p>

                        <div className="grid grid-cols-2 gap-8 border-t border-slate-50 pt-10">
                           <div className="space-y-4">
                              <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Location</div>
                              <div className="flex items-start gap-3">
                                 <span className="text-xs font-bold text-slate-700 leading-snug">{office.contact.address}</span>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Contact Detail</div>
                              <div className="flex flex-col gap-2">
                                 <span className="text-xs font-bold text-slate-700">{office.contact.email}</span>
                                 <span className="text-xs font-bold text-amber-600">{office.contact.phone}</span>
                              </div>
                           </div>
                        </div>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Futuristic Final CTA Section */}
      <section className="py-40 bg-slate-950 relative overflow-hidden">
         {/* Particles background effect (simulated with CSS dots) */}
         <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px'
         }} />
         
         <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
            >
               <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10 uppercase leading-[0.85]">
                  Start Your <span className="text-amber-500">Journey</span> <br />
                  Across Our Network
               </h2>
               
               <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
                  Join hundreds of forward-thinking brands that leverage our global expertise and "premium high-tech" connectivity to scale new heights.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto px-16 py-7 bg-amber-500 text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-2xl shadow-amber-500/30"
                  >
                    Partner With Us
                  </Link>
                  <Link
                    to="/get-consultation"
                    className="w-full sm:w-auto px-16 py-7 bg-transparent text-white border-2 border-slate-700 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:border-amber-500 hover:text-amber-500 transition-all duration-500"
                  >
                    Book Deep-Dive
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>
    </div>
  );
};

export default GlobalPresence;
