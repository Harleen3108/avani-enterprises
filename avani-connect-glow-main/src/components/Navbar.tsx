import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If mobile menu is open, don't use this click-outside logic 
      // as it conflicts with mobile dropdown toggles.
      if (isOpen) return;

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Cleanup dropdown state when mobile menu closes
  useEffect(() => {
    if (!isOpen) {
      setOpenDropdown(null);
    }
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    {
      name: "Our Products",
      path: "/our-products",
      subItems: [
        { name: "HR Portal", path: "/our-products", scrollTo: "hr-portal", external: "https://hrportal.avanienterprises.in/" },
        { name: "School Management", path: "/our-products", scrollTo: "school-management", external: "https://indus-school-page.vercel.app/admission" },
        { name: "Project CRM", path: "/our-products", scrollTo: "crm-portal", external: "https://team-lead-gamma.vercel.app/" },
        { name: "Custom E-commerce", path: "/our-products", scrollTo: "ecommerce-web", external: "https://shoes-ecommerce-iota.vercel.app/" },
      ]
    },
    {
      name: "Resources",
      dropdown: [
        { name: "Blog", path: "/blog" },
        { name: "Courses", path: "/courses" },
        { name: "Case Studies", path: "/case-studies" },
      ],
    },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const isActiveDropdown = (dropdown: any[]) => {
    return dropdown.some((item) => location.pathname === item.path);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out font-sans
        ${isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm py-2"
          : "bg-transparent py-4"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* LEFT: Logo Section */}
          <div className="flex-1 flex items-center justify-start min-w-0">
            <Link to="/" className="flex items-center space-x-3 group min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src="/logo0.jpg"
                  alt="Avani Enterprises"
                  className="h-10 w-10 md:h-11 md:w-11 rounded-xl shadow-md transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white shadow-sm" />
              </div>
              <span className="text-[22px] font-black tracking-tight truncate transition-colors duration-300 text-amber-500">
                Avani Enterprises
              </span>
            </Link>
          </div>

          {/* CENTER: Navigation Links with Dropdowns */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0" ref={dropdownRef}>
            <div className="flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                // Special Case: Projects (Integrated Mega-style Sub-menu)
                if (item.subItems) {
                  const isActive = location.pathname === item.path;
                  return (
                    <div key={item.name} className="relative group/mega">
                      <Link
                        to={item.path}
                        className={`relative px-2 xl:px-4 py-2 group whitespace-nowrap flex items-center gap-1 text-[13px] font-bold tracking-wide transition-all duration-300 ${isActive ? "text-amber-600" : "text-amber-500 hover:text-amber-600"}`}
                      >
                        {item.name}
                        <motion.div
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-amber-600 rounded-full"
                          initial={{ width: isActive ? "4px" : 0 }}
                          animate={{ width: isActive ? "100%" : 0 }}
                          whileHover={{ width: "100%" }}
                        />
                      </Link>
                      {/* Horizontal Expansion Panel */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-4 transition-all duration-300 z-50 
                        ${isActive
                          ? "opacity-100 visible"
                          : "opacity-0 invisible group-hover/mega:opacity-100 group-hover/mega:visible"
                        }
                      `}>
                        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-amber-100 p-2 flex items-center gap-1 whitespace-nowrap min-w-max">
                          {item.subItems.map((sub: any) => (
                            <div key={sub.name} className="flex items-center">
                              <Link
                                to={sub.path}
                                state={sub.scrollTo ? { scrollTo: sub.scrollTo } : undefined}
                                className={`px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all ${location.state?.scrollTo === sub.scrollTo ? "bg-amber-100 text-amber-700" : "text-slate-600 hover:bg-amber-50 hover:text-amber-600"}`}
                              >
                                {sub.name}
                              </Link>
                              {sub.external && (
                                <a href={sub.external} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-900 hover:text-amber-600">
                                  <ExternalLink size={12} />
                                </a>
                              )}
                              <div className="w-px h-4 bg-slate-100 last:hidden mx-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Standard Case: Custom Dropdowns (Resources)
                if (item.dropdown) {
                  const isActive = isActiveDropdown(item.dropdown);
                  return (
                    <div key={item.name} className="relative">
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`relative px-2 xl:px-4 py-2 group whitespace-nowrap flex items-center gap-1 text-[13px] font-bold tracking-wide transition-all duration-300 ${isActive || openDropdown === item.name ? "text-amber-600" : "text-amber-500 hover:text-amber-600"}`}
                      >
                        {item.name}
                        <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : ""}`} />
                        <motion.div
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-amber-600 rounded-full"
                          initial={{ width: isActive ? "4px" : 0 }}
                          animate={{ width: openDropdown === item.name ? "100%" : isActive ? "4px" : 0 }}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                          >
                            {item.dropdown.map((sub: any) => (
                              <Link key={sub.path} to={sub.path} onClick={() => setOpenDropdown(null)} className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-amber-600">
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Simple Link Case
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-2 xl:px-4 py-2 group whitespace-nowrap text-[13px] font-bold tracking-wide transition-all duration-300 ${isActive ? "text-amber-600" : "text-amber-500 hover:text-amber-600"}`}
                  >
                    {item.name}
                    <motion.div
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-amber-600 rounded-full"
                      initial={{ width: isActive ? "4px" : 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Actions Section */}
          <div className="hidden lg:flex flex-1 items-center justify-end space-x-6 min-w-0">

            <motion.a
              href="tel:+919253625099"
              className="p-2.5 bg-amber-50 text-amber-600 rounded-full hover:bg-amber-100 transition-all duration-300 shadow-sm border border-amber-100"
              title="Call Us"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Phone size={18} />
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/get-consultation"
                className="bg-gradient-to-r from-amber-400 to-orange-500 
                text-white px-7 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap
                shadow-[0_4px_12px_rgba(245,158,11,0.15)] hover:shadow-[0_8px_20px_rgba(245,158,11,0.3)]
                transition-all duration-300 inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center ml-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl transition-all duration-300 bg-slate-100 text-slate-900 shadow-sm"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE OVERLAY */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[70px] mx-4 bg-white shadow-2xl rounded-3xl border border-slate-100 overflow-hidden animate-fadeInDown max-h-[80vh] overflow-y-auto">
            <div className="p-5 space-y-1">
              {navItems.map((item) => {
                // Projects (Always expanded on mobile)
                if (item.subItems) {
                  const isActive = location.pathname === item.path;
                  return (
                    <div key={item.name} className="py-1">
                      <Link
                        to={item.path}
                        onClick={() => {
                          setIsOpen(false);
                          setOpenDropdown(null);
                        }}
                        className={`flex items-center justify-between px-6 py-4 rounded-2xl text-[15px] font-bold transition-all ${isActive ? "bg-amber-50 text-amber-600" : "text-slate-500 hover:bg-slate-50"}`}
                      >
                        {item.name}
                        {isActive && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                      </Link>
                      <div className="space-y-1 ml-4 border-l-2 border-amber-50">
                        {item.subItems.map((sub: any) => (
                          <div key={sub.name} className="flex items-center justify-between px-6 rounded-xl hover:bg-slate-50 group/item">
                            <Link
                              to={sub.path}
                              state={sub.scrollTo ? { scrollTo: sub.scrollTo } : undefined}
                              onClick={() => setIsOpen(false)}
                              className={`flex-1 py-3 text-sm font-bold transition-all ${location.state?.scrollTo === sub.scrollTo ? "text-amber-700" : "text-slate-500"}`}
                            >
                              {sub.name}
                            </Link>
                            {sub.external && (
                              <a href={sub.external} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-900 hover:text-amber-600 transition-colors">
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Resources (Toggleable on mobile)
                if (item.dropdown) {
                  const isDropdownActive = isActiveDropdown(item.dropdown);
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[15px] font-semibold transition-all ${isDropdownActive || openDropdown === item.name ? "bg-amber-50 text-amber-600" : "text-slate-500 hover:bg-slate-50"}`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={18} className={`transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-4"
                          >
                            {item.dropdown.map((sub: any) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => {
                                  setIsOpen(false);
                                  setOpenDropdown(null);
                                }}
                                className={`block px-6 py-3 rounded-xl text-sm font-semibold ${location.pathname === sub.path ? "text-amber-700" : "text-slate-400"}`}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Simple Links
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between px-6 py-4 rounded-2xl text-[15px] font-semibold transition-all ${isActive ? "bg-amber-50 text-amber-600" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    {item.name}
                    {isActive && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 flex flex-col gap-3">

                <a
                  href="tel:+919253625099"
                  className="flex items-center justify-center space-x-3 text-slate-500 font-medium text-sm py-4 border-t border-slate-50"
                >
                  <Phone size={16} className="text-amber-500" />
                  <span>Talk to Experts</span>
                </a>

                <Link
                  to="/get-consultation"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-gradient-to-r from-amber-400 to-orange-500 
                  text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-amber-100"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
