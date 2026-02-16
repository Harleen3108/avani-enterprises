import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LogoMarqueeProps {
    logos: Array<{
        name: string;
        logo: string;
        link?: string;
    }>;
    speed?: number;
    direction?: "left" | "right";
    className?: string;
}

/**
 * Logo Marquee Component - ADKO-Inspired
 * Infinite horizontal scroll for client logos
 */
const LogoMarquee = ({
    logos,
    speed = 20,
    direction = "left",
    className = ""
}: LogoMarqueeProps) => {
    // Duplicate logos for seamless loop
    const duplicatedLogos = [...logos, ...logos];

    const animationDirection = direction === "left" ? -1000 : 1000;

    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                className="flex gap-16 items-center"
                animate={{ x: [0, animationDirection] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear"
                    }
                }}
            >
                {duplicatedLogos.map((logo, index) => (
                    <div
                        key={`${logo.name}-${index}`}
                        className="flex-shrink-0 transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110"
                    >
                        {logo.link ? (
                            <a href={logo.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={logo.logo}
                                    alt={logo.name}
                                    className="h-12 w-auto object-contain"
                                />
                            </a>
                        ) : (
                            <img
                                src={logo.logo}
                                alt={logo.name}
                                className="h-12 w-auto object-contain"
                            />
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default LogoMarquee;
