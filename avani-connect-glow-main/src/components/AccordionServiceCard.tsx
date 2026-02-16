import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionServiceCardProps {
    service: {
        icon: React.ReactNode;
        title: string;
        description: string;
        color: string;
        bgImage: string;
    };
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}

/**
 * Accordion Service Card - ADKO-Inspired
 * Expandable service cards with background images
 */
const AccordionServiceCard = ({ service, index, isOpen, onToggle }: AccordionServiceCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${isOpen ? 'row-span-2' : 'row-span-1'
                }`}
            onClick={onToggle}
        >
            {/* Background Image (visible when expanded) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.bgImage})` }}
                    />
                )}
            </AnimatePresence>

            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} ${isOpen ? 'opacity-90' : 'opacity-100'}`} />

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="text-white opacity-90">
                            {service.icon}
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-wide">
                            {service.title}
                        </h3>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-white opacity-70"
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <p className="text-white/90 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Hover Effect Overlay */}
            <motion.div
                className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-colors duration-300 pointer-events-none"
            />
        </motion.div>
    );
};

export default AccordionServiceCard;
