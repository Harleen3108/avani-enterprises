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
       address: '106, First Floor, Agro Mall, Rohtak',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
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
       address: 'Tower B, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, 122002',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
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
       address: 'Third Floor, Vasudev Chamber, 4RFX+QJ3, Teli Galli Cross Rd, Mogra Village, Mogra Pada, Natwar Nagar, Andheri East, Mumbai, Maharashtra 400069',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
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
       address: 'Australia',
       email: 'kp@avanienterprises.in',
       phone: '+91 9253625099'
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
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 lg:pt-52 lg:pb-40 overflow-hidden bg-[#FCFAFA] px-4 md:px-0">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
           <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-sky-500/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center relative z-10 w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 md:px-6 py-2 md:py-2.5 mb-8 md:mb-10 shadow-xl shadow-slate-200/40">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-amber-500 animate-spin-slow" />
                <span className="text-slate-900 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Worldwide Operations</span>
            </div>
            
            <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter mb-8 md:mb-10 leading-[1] md:leading-[0.85] uppercase w-full max-w-full break-words break-all sm:break-normal">
              Global <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                Connectivity
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium mb-12 md:mb-16 px-4 md:px-0">
              Delivering premium, high-tech networking solutions from our headquarters in Rohtak to our international hubs. We bridge continents with digital excellence and innovative enterprise strategies.
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-16 px-2">
               <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-black text-slate-900 leading-none">04</span>
                  <span className="text-[9px] md:text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">Major Hubs</span>
               </div>
               <div className="h-10 w-px bg-slate-200 hidden md:block" />
               <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-black text-slate-900 leading-none">02</span>
                  <span className="text-[9px] md:text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">Continents</span>
               </div>
               <div className="h-10 w-px bg-slate-200 hidden md:block" />
               <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-black text-slate-900 leading-none">∞</span>
                  <span className="text-[9px] md:text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">Digital reach</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Network Video */}
      <section className="py-12 md:py-24 bg-[#FCFAFA] relative border-b border-slate-100 px-4 md:px-0">
        <motion.div
           initial={{ opacity: 0, y: 40, scale: 0.98 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-[90rem] mx-auto sm:px-6 lg:px-8"
        >
          <div className="relative w-full aspect-square sm:aspect-video lg:h-[75vh] 2xl:h-[80vh] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-900/10 border border-slate-200/50 bg-slate-900 group">
            <img 
              src="/global2.png"
              alt="Global Network"
              className="absolute inset-0 w-full h-full object-cover object-[center_30%] md:object-top transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Subtle inner premium gradient over image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* Featured Office Collection - Premium Detailed Listing */}
      <section className="py-24 md:py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-16 md:mb-24">
              <div className="h-px bg-slate-200 w-full md:flex-1 hidden md:block" />
              <div className="text-center px-2 md:px-6">
                 <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Office Collection</h2>
                 <p className="text-amber-600 text-[10px] md:text-xs font-bold tracking-widest uppercase mt-2">Detailed Network Overview</p>
              </div>
              <div className="h-px bg-slate-200 w-full md:flex-1 hidden md:block" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
              {officeDetails.map((office, index) => (
                 <motion.div
                    key={office.city}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col group"
                 >
                    {/* Visual Container */}
                    <div className="relative aspect-[16/10] sm:aspect-video rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 mb-8 md:mb-10">
                       <img 
                          src={office.image} 
                          alt={office.city} 
                          className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-1000"
                       />
                       {/* Overlay Gradient */}
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                       
                       {/* Floating Stats or Tags */}
                       <div className="absolute top-4 left-4 md:top-8 md:left-8">
                           <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-3 border border-white/50">
                              <Target className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                              <span className="text-[9px] md:text-[10px] font-black text-slate-900 uppercase tracking-widest">{office.tagline}</span>
                           </div>
                       </div>

                       <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
                           <Link to="/contact" className="w-10 h-10 md:w-14 md:h-14 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-white hover:text-amber-500 transition-all duration-300">
                              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                           </Link>
                       </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-2 md:px-4 flex flex-col h-full flex-grow">
                        <div className="flex items-center gap-3 md:gap-4 mb-6">
                           <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center border border-slate-100 flex-shrink-0">
                              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-slate-800" />
                           </div>
                           <div className="min-w-0">
                              <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1] mb-1 truncate md:overflow-visible md:whitespace-normal">{office.city}</h3>
                              <p className="text-amber-600 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">{office.label}</p>
                           </div>
                        </div>

                        <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium mb-8 md:mb-10 flex-grow">
                           {office.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 border-t border-slate-100 pt-8 mt-auto md:pt-10">
                           <div className="space-y-3 md:space-y-4">
                              <div className="text-[9px] md:text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" /> Location
                              </div>
                              <div className="flex items-start h-full pb-2">
                                 <span className="text-xs font-bold text-slate-900 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100 w-full h-full block break-words">{office.contact.address}</span>
                              </div>
                           </div>
                           <div className="space-y-3 md:space-y-4">
                              <div className="text-[9px] md:text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" /> Contact Details
                              </div>
                              <div className="flex flex-col justify-center gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100 h-full pb-2">
                                 <div className="flex items-center gap-2 overflow-hidden">
                                    <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                    <span className="text-xs font-bold text-slate-900 truncate">{office.contact.email}</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                    <span className="text-xs font-bold text-slate-900">{office.contact.phone}</span>
                                 </div>
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
      <section className="py-24 md:py-40 bg-slate-950 relative overflow-hidden px-4 md:px-0">
         {/* Particles background effect (simulated with CSS dots) */}
         <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px'
         }} />
         
         <div className="max-w-5xl mx-auto px-2 md:px-4 relative z-10 text-center">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
            >
               <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 md:mb-10 uppercase leading-[1.1] md:leading-[0.85] break-words">
                  Start Your <span className="text-amber-500">Journey</span> <br className="hidden md:block"/>
                  Across Our Network
               </h2>
               
               <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed px-2">
                  Join forward-thinking enterprises that leverage our global expertise and innovative connectivity solutions to scale new heights.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-md md:max-w-none mx-auto">
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto px-8 md:px-16 py-5 md:py-7 bg-amber-500 text-slate-900 rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-2xl shadow-amber-500/30 text-center"
                  >
                    Partner With Us
                  </Link>
                  <Link
                    to="/get-consultation"
                    className="w-full sm:w-auto px-8 md:px-16 py-5 md:py-7 bg-transparent text-white border-2 border-slate-700 rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:border-amber-500 hover:text-amber-500 transition-all duration-500 text-center"
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
