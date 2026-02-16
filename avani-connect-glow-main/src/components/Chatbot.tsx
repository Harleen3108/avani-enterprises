import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ChevronRight, Minimize2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ type: 'bot' | 'user'; text: string; options?: string[] }[]>([
        {
            type: 'bot',
            text: "Hi there! 👋 I'm your Avani Assistant.",
        },
        {
            type: 'bot',
            text: "How can I help you today?",
            options: ['View Services', 'Book a Consultation', 'Contact Support']
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const services = [
        "Web & App Development",
        "SEO and Content Marketing",
        "Social Media Marketing",
        "AI Solutions",
        "Podcast Production",
        "Financial Consulting"
    ];

    const handleOptionClick = async (option: string) => {
        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: option }]);
        setIsTyping(true);

        // Simulate delay
        setTimeout(() => {
            setIsTyping(false);

            if (option === 'View Services') {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: "Here are the services we offer. Select one to proceed with booking:",
                    options: services
                }]);
            } else if (services.includes(option)) {
                // Map service names to IDs
                const serviceIdMap: { [key: string]: string } = {
                    "Web & App Development": "web-development",
                    "SEO and Content Marketing": "seo-content",
                    "Social Media Marketing": "social-media",
                    "AI Solutions": "ai-solutions",
                    "Podcast Production": "podcast-production",
                    "Financial Consulting": "financial-consulting"
                };

                const serviceId = serviceIdMap[option];

                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: `Great choice! I'm taking you to the ${option} section.`
                }]);
                setTimeout(() => {
                    setIsOpen(false);
                    if (serviceId) {
                        navigate('/services', { state: { scrollTo: serviceId } });
                    } else {
                        navigate('/services');
                    }
                }, 1500);
            } else if (option === 'Book a Consultation') {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: "Sure! Let's get you connected. Redirecting to our contact page..."
                }]);
                setTimeout(() => {
                    setIsOpen(false);
                    navigate('/contact');
                }, 1500);
            } else if (option === 'Contact Support') {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: "You can reach us at +91 9253625099 or email kp@avanienterprises.in."
                }]);
            }
        }, 1000);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-4 md:right-6 w-[calc(100%-2rem)] md:w-96 bg-card rounded-2xl shadow-2xl border border-[#ff9d00]/30 overflow-hidden z-50 flex flex-col mb-4 md:mb-0 glass"
                        style={{ maxHeight: 'calc(100vh - 120px)', height: 'min(500px, 70vh)' }}
                    >
                        {/* Header */}
                        <div className="bg-[#ffb133] p-4 flex items-center justify-between text-black">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#ff9d00]">
                                    <img src="/assistant-v2.jpg" alt="Chat" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Ask Avani Assistant</h3>
                                    <p className="text-xs text-black/70 flex items-center font-medium">
                                        <span className="w-2 h-2 bg-green-600 rounded-full mr-1 animate-pulse"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <Minimize2 size={18} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fefaf6]">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.type === 'bot' && (
                                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 mt-1 border border-[#ff9d00]">
                                            <img src="/assistant-v2.jpg" alt="Chat" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] space-y-2`}>
                                        <div className={`p-3 rounded-2xl text-sm ${msg.type === 'user'
                                            ? 'bg-[#ff9d00] text-white rounded-tr-none'
                                            : 'bg-white text-black shadow-sm border border-[#ff9d00]/30 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        {msg.options && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {msg.options.map((opt, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleOptionClick(opt)}
                                                        className="text-xs bg-white border border-[#ff9d00]/30 text-black px-3 py-1.5 rounded-full hover:bg-[#ff9d00]/20 hover:border-[#ff9d00]/50 transition-colors shadow-sm"
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 mt-1 border border-[#ff9d00]">
                                        <img src="/assistant-v2.jpg" alt="Assistant" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-[#ff9d00]/30 w-16">
                                        <div className="flex space-x-1 justify-center items-center h-full">
                                            <div className="w-2 h-2 bg-[#ff9d00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-[#ff9d00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-[#ff9d00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area (Mock) */}
                        <div className="p-3 bg-card border-t border-[#ff9d00]/30">
                            <div className="flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 border border-[#ff9d00]/30">
                                <input
                                    type="text"
                                    placeholder="Select an option above..."
                                    disabled
                                    className="flex-1 bg-transparent text-sm focus:outline-none text-muted-foreground cursor-not-allowed"
                                />
                                <Send size={16} className="text-gray-400" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 md:right-6 w-14 h-14 bg-[#0a0b11] rounded-full shadow-lg flex items-center justify-center text-white z-50 hover:shadow-[0_0_15px_rgba(255,157,0,0.3)] transition-all duration-300 transform-gpu border border-[#ff9d00]"
                style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
            >
                <AnimatePresence mode='wait'>
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: [0, -5, 0]
                                }}
                                transition={{
                                    opacity: { delay: 0.5, duration: 0.5 },
                                    x: { delay: 0.5, duration: 0.5 },
                                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="absolute right-full mr-4 bg-[#ff9d00] text-white px-4 py-2 rounded-full shadow-lg whitespace-nowrap text-xs md:text-sm font-medium border border-[#ff9d00]/20 block"
                            >
                                Ask Avani Assistant
                                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#ff9d00] border-r border-t border-[#ff9d00]/20 rotate-45"></div>
                            </motion.div>
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <img src="/assistant-v2.jpg" alt="Chat" className="w-full h-full object-cover" />
                                <motion.div
                                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                    className="absolute -top-1 -right-2"
                                >
                                    <Sparkles size={12} className="text-yellow-200" />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notification Dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-[#ff9d00] flex items-center justify-center">
                        <span className="w-full h-full rounded-full bg-red-500 animate-ping opacity-75 absolute"></span>
                    </span>
                )}
            </motion.button>
        </>
    );
};

export default Chatbot;
