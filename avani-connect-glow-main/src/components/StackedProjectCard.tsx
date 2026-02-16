import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

interface StackedProjectCardProps {
    project: {
        name: string;
        logo: string;
        link: string;
    };
    index: number;
    totalCards: number;
}

/**
 * Stacked Project Card - Premium Agency-Style
 * Cards stack and overlap as you scroll, with smooth scale/fade effects
 */
const StackedProjectCard = ({ project, index, totalCards }: StackedProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "start start"]
    });

    // Scale down previous cards as new ones come in
    const scale = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0.95, 0.98, 1]
    );

    // Fade out previous cards slightly
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0.6, 0.8, 1]
    );

    // Calculate sticky position offset
    const stickyTop = index * 40; // Each card sticks 40px lower than the previous

    const gradients = [
        "from-blue-600 via-purple-600 to-pink-600",
        "from-emerald-500 via-teal-500 to-cyan-500",
        "from-orange-500 via-red-500 to-pink-500",
        "from-indigo-600 via-purple-600 to-pink-600",
        "from-amber-500 via-orange-500 to-red-500",
        "from-green-500 via-emerald-500 to-teal-500"
    ];

    return (
        <div
            ref={cardRef}
            className="sticky"
            style={{ top: `${stickyTop}px` }}
        >
            <motion.div
                style={{ scale, opacity }}
                className="relative mb-8"
            >
                {/* Card Container - Full Width Landscape */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl group">
                    <div className="grid md:grid-cols-2 gap-0 min-h-[400px]">
                        {/* Left: Logo/Visual Section */}
                        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-12 overflow-hidden">
                            {/* Gradient Overlay (visible on hover) */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-90 transition-opacity duration-700 z-10`} />

                            {/* Logo */}
                            <motion.img
                                src={project.logo}
                                alt={project.name}
                                className="max-w-[60%] max-h-[60%] object-contain relative z-20 group-hover:brightness-0 group-hover:invert transition-all duration-500"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Animated Background Pattern */}
                            <motion.div
                                className="absolute inset-0 opacity-5"
                                animate={{
                                    backgroundPosition: ["0% 0%", "100% 100%"]
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                style={{
                                    backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                                    backgroundSize: "30px 30px"
                                }}
                            />

                            {/* Project Number Badge */}
                            <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg z-30">
                                <span className="text-2xl font-black text-slate-900">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        {/* Right: Content Section */}
                        <div className="relative p-12 flex flex-col justify-between bg-white z-20">
                            {/* Category Tag */}
                            <div className="mb-6">
                                <span className="inline-block px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-full">
                                    Digital Transformation
                                </span>
                            </div>

                            {/* Project Title */}
                            <div className="flex-grow">
                                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                                    {project.name}
                                </h3>

                                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                    We partnered with {project.name} to deliver a comprehensive digital transformation, creating innovative solutions that drive growth and enhance user experience.
                                </p>

                                {/* Key Highlights */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div>
                                        <div className="text-3xl font-black text-slate-900 mb-1">150%</div>
                                        <div className="text-sm text-slate-600 uppercase tracking-wide">Growth</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-slate-900 mb-1">50K+</div>
                                        <div className="text-sm text-slate-600 uppercase tracking-wide">Users</div>
                                    </div>
                                </div>
                            </div>

                            {/* View Project Button */}
                            <Link
                                to={project.link}
                                className="inline-flex items-center gap-3 text-slate-900 font-black text-lg group-hover:gap-5 transition-all duration-300"
                            >
                                <span>View Case Study</span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-12 h-12 rounded-full bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 flex items-center justify-center text-white transition-all duration-300"
                                >
                                    <ArrowRight size={20} />
                                </motion.div>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-slate-50 to-transparent opacity-50 pointer-events-none" />
                </div>

                {/* Glow Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 -z-10`} />
            </motion.div>
        </div>
    );
};

export default StackedProjectCard;
