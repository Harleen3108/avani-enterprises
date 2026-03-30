import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, CheckCircle } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, service } =
    (location.state as { name?: string; service?: string | string[] }) || {};

  const formattedService = Array.isArray(service) ? service.join(", ") : service;

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="min-h-screen flex items-center justify-center relative overflow-hidden pb-3 bg-black text-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E1AD01]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#E1AD01]/10 rounded-full blur-[100px]" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: "60px 60px" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#E1AD01]/10 flex items-center justify-center border border-[#E1AD01]/30 shadow-[0_0_30px_rgba(225,173,1,0.2)]">
              <CheckCircle className="w-10 h-10 text-[#E1AD01]" />
            </div>
          </motion.div>

          {/* Card Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0A0A0A] border border-[#E1AD01]/20 rounded-xl p-8 sm:p-12 relative overflow-hidden"
            style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E1AD01] to-transparent" />

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white font-display"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}
            >
              PAYMENT SUCCESSFUL{name ? `, ${name.toUpperCase()}` : ""}
            </motion.h1>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed"
            >
              {formattedService ? (
                <>
                  Your request for <span className="text-[#E1AD01] font-medium">{formattedService}</span> has been successfully processed. Our growth team will contact you shortly to begin the onboarding process.
                </>
              ) : (
                <>
                  Your order has been confirmed successfully. Welcome to Avani Enterprises. Our growth team will reach out to schedule your session.
                </>
              )}
            </motion.p>

            {/* CTA Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 pt-8 border-t border-white/5"
            >
              <p className="text-sm font-semibold tracking-widest text-[#E1AD01] mb-6 uppercase">Next Steps</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-4">
                  <a
                    href="https://wa.me/919311967319"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#E1AD01] text-black text-sm font-bold tracking-widest uppercase transition-all hover:bg-[#FFD700] hover:-translate-y-1"
                    style={{ borderRadius: "1px", boxShadow: "0 10px 30px rgba(225,173,1,0.2)" }}
                  >
                    <span>Message Us</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center gap-8 mt-10 pt-6"
            >
              <a href="mailto:kp@avanienterprises.in" className="flex items-center justify-center gap-2 text-gray-500 hover:text-[#E1AD01] transition-colors text-sm font-medium">
                <Mail className="w-4 h-4" />
                <span>kp@avanienterprises.in</span>
              </a>
              <a href="tel:+919311967319" className="flex items-center justify-center gap-2 text-gray-500 hover:text-[#E1AD01] transition-colors text-sm font-medium">
                <Phone className="w-4 h-4" />
                <span>+91 93119 67319</span>
              </a>
            </motion.div>

          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <p className="text-xs tracking-wider text-gray-600 uppercase">
              © {new Date().getFullYear()} Avani Enterprises. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default ThankYou;
