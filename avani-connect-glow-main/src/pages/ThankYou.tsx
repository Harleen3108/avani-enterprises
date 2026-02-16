import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, service } =
    (location.state as { name?: string; service?: string | string[] }) || {};

  const formattedService = Array.isArray(service) ? service.join(", ") : service;

  useEffect(() => {
    if (!name) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [name, navigate]);

  return (
    <main
      className="min-h-screen flex items-center justify-center relative overflow-hidden pb-3
      bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-4"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-background p-2 shadow-2xl flex items-center justify-center border-4 border-purple-200/80">
              <img
                src="./avani-logo.jpg"
                alt="Avani Enterprises"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-4 sm:p-6 card-shadow"
          >
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800"
            >
              Thank You{name ? `, ${name}` : ""}!
            </motion.h1>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mb-4 mt-4"
            >
              <div className="flex items-center gap-5">
                <a
                  href="https://wa.me/919311967319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 
                  rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                  text-white text-base font-semibold shadow-lg shadow-pink-500/40 
                  hover:from-purple-600 hover:to-pink-600 transition-all 
                  transform hover:-translate-y-0.5"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <img
                  src="./kapilsir.jpg"
                  alt="Kapil Sir"
                  className="w-20 h-20 rounded-full object-cover border-4 
                  border-purple-400 shadow-2xl shadow-purple-500/40"
                />
              </div>
            </motion.div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-black mb-4 max-w-lg mx-auto"
            >
              {formattedService ? (
                <>
                  Your inquiry for{" "}
                  <span className="text-purple-600 font-semibold">
                    {formattedService}
                  </span>{" "}
                  has been received. Our team will contact you within 24 hours
                  to discuss how we can help transform your business.
                </>
              ) : (
                <>
                  Your submission has been received successfully. Our team will
                  reach out to you shortly with the next steps.
                </>
              )}
            </motion.p>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center gap-6 mb-2"
            >
              <a
                href="mailto:kp@avanienterprises.in"
                className="flex items-center justify-center gap-2 text-blue-600 hover:text-purple-600 transition-colors py-2 px-4 rounded-lg hover:bg-white/60"
              >
                <Mail className="w-5 h-5" />
                <span>kp@avanienterprises.in</span>
              </a>
              <a
                href="tel:+919311967319"
                className="flex items-center justify-center gap-2 text-blue-600 hover:text-purple-600 transition-colors py-2 px-4 rounded-lg hover:bg-white/60"
              >
                <Phone className="w-5 h-5" />
                <span>+919311967319</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4"
          >
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Avani Enterprises. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default ThankYou;
