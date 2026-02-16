import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    {
        title: "Happy Clients",
        value: 150,
        suffix: "+",
        percent: 85,
        color: "#2563EB", // Blue
    },
    {
        title: "Projects Completed",
        value: 300,
        suffix: "+",
        percent: 90,
        color: "#7C3AED", // Purple
    },
    {
        title: "Average Growth",
        value: 85,
        suffix: "%",
        percent: 85,
        color: "#16A34A", // Green
    },
    {
        title: "Years Experience",
        value: 8,
        suffix: "+",
        percent: 75,
        color: "#EA580C", // Orange
    },
];

const DonutStat = ({ title, value, suffix, percent, color, index }) => {
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Animation state for the number
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepTime = duration / steps;
            let current = 0;
            const increment = value / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    // Calculate dynamic offset based on view status
    const strokeDashoffset = isInView
        ? circumference - (circumference * percent) / 100
        : circumference;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
        >
            <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {/* Background Circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#F1F5F9"
                        strokeWidth="20"
                        fill="none"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke={color}
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-[2000ms] ease-out"
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl font-bold leading-none text-center" style={{ color: color }}>
                        {count}{suffix}
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 tracking-tight">{title}</h3>
        </motion.div>
    );
};

const StatsSection = () => {
    return (
        <section id="stats-section" className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
                    >
                        Our Growth In Numbers
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        Measurable results that demonstrate our commitment to excellence and digital growth.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <DonutStat key={index} index={index} {...stat} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default StatsSection;
