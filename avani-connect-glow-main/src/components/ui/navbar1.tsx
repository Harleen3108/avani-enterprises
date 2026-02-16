import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#05050A] border-b border-white/10"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-center items-center">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                            <img
                                src="/logo0.jpg"
                                alt="Avani Enterprises"
                                className="w-12 h-12 rounded-xl object-cover relative z-10"
                            />
                        </div>
                        <span className="font-display text-2xl font-bold text-white tracking-wide">
                            Avani Enterprises
                        </span>
                    </a>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
