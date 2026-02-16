import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface RotatingTextProps {
    words: string[];
    interval?: number;
    className?: string;
}

/**
 * Rotating Text Component - ADKO-Inspired
 * Smoothly rotates through an array of words with vertical slide animation
 */
const RotatingText = ({
    words,
    interval = 3000,
    className = ""
}: RotatingTextProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, interval);

        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <span className={`inline-block ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1] // easeOut
                    }}
                    className="inline-block"
                >
                    {words[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default RotatingText;
