import { motion } from "framer-motion";
// import Logo from "@/assets/avani-logo.jpg";

export default function PageHeader() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
// fixed top-0 left-0 right-0 z-50
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=" bg-background/95 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="flex items-center gap-3 group"
          >
            <img
              src="./avani-logo.jpg"
              alt="Avani Enterprises Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-md border border-border/50 transition-transform group-hover:scale-105"
            />
            <span className="font-display text-xl sm:text-2xl font-semibold text-foreground">
              Avani Enterprises
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}

