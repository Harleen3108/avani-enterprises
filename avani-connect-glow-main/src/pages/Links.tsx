import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Heart,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Mail,
  Globe,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

interface Link {
  _id: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  clickCount: number;
  animation?: 'bounce' | 'pulse' | 'shake' | 'tada' | 'wobble' | 'glow';
}

// Floating particle component
const FloatingParticle = ({ delay, duration, x, y, size }: {
  delay: number; duration: number; x: number; y: number; size: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)`,
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
    }}
    animate={{
      y: [-20, -60, -20],
      x: [-10, 10, -10],
      opacity: [0, 0.6, 0],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Social media icon button
const SocialIcon = ({
  href,
  icon: Icon,
  label,
  hoverColor,
  onIconClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  hoverColor: string;
  onIconClick?: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onIconClick) {
      onIconClick();
    }
    window.open(href, '_blank');
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className="group relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: 'rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.06)',
      }}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon
        className="w-5 h-5 transition-colors duration-300"
        style={{ color: 'rgba(71, 85, 105, 0.8)' }}
      />
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${hoverColor}33 0%, transparent 70%)`,
          border: `1px solid ${hoverColor}55`,
        }}
      />
      <Icon
        className="w-5 h-5 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: hoverColor }}
      />
    </motion.a>
  );
};

// Ripple effect on click
const RippleButton = ({
  children,
  onClick,
  className,
  style,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
      onClick();
    },
    [onClick]
  );

  return (
    <button
      onClick={handleClick}
      className={className}
      style={{
        ...style,
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 16px 32px rgba(0, 0, 0, 0.1)' 
          : '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
            background: 'rgba(0,0,0,0.08)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </button>
  );
};

// Social links data for Avani Enterprises
const socialLinks = [
  { href: 'https://www.instagram.com/avanienterprises.branding/', icon: Instagram, label: 'Instagram', hoverColor: '#E1306C' },
  { href: 'https://www.linkedin.com/company/avani-enterprises-india/', icon: Linkedin, label: 'LinkedIn', hoverColor: '#0A66C2' },
  { href: 'https://www.facebook.com/share/1DKFWQiBe4/', icon: Facebook, label: 'Facebook', hoverColor: '#1877F2' },
  { href: 'https://wa.me/919253625099', icon: MessageCircle, label: 'WhatsApp', hoverColor: '#25D366' },
  { href: 'mailto:kp@avanienterprises.in', icon: Mail, label: 'Email', hoverColor: '#06B6D4' },
  { href: 'tel:+919253625099', icon: Phone, label: 'Call Us', hoverColor: '#10B981' },
];

// Particles data
const particles = Array.from({ length: 15 }, (_, i) => ({
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 4,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 20 + Math.random() * 60,
}));

// Map icon names to Lucide icons
const getIconForLink = (icon: string, url: string) => {
  const lower = (icon || '').toLowerCase();
  const urlLower = (url || '').toLowerCase();

  if (lower.includes('instagram') || urlLower.includes('instagram')) return Instagram;
  if (lower.includes('linkedin') || urlLower.includes('linkedin')) return Linkedin;
  if (lower.includes('twitter') || urlLower.includes('twitter') || urlLower.includes('x.com')) return Twitter;
  if (lower.includes('youtube') || urlLower.includes('youtube')) return Youtube;
  if (lower.includes('facebook') || urlLower.includes('facebook')) return Facebook;
  if (lower.includes('whatsapp') || urlLower.includes('whatsapp') || urlLower.includes('wa.me')) return MessageCircle;
  if (lower.includes('phone') || lower.includes('call') || urlLower.includes('tel:')) return Phone;
  if (lower.includes('mail') || lower.includes('email') || urlLower.includes('mailto:')) return Mail;
  if (lower.includes('web') || lower.includes('site') || lower.includes('globe')) return Globe;
  return ExternalLink;
};

// Default hardcoded links — always shown as fallback, also add these in admin backend
const defaultLinks: Link[] = [
  {
    _id: 'default-website',
    title: '🌐 Visit Our Website',
    url: 'https://www.avanienterprises.in',
    description: 'Explore our full range of services',
    icon: 'globe',
    color: '#06B6D4',
    isActive: true,
    clickCount: 0,
  },
  {
    _id: 'default-consultation',
    title: '📞 Book a Free Consultation',
    url: 'https://www.avanienterprises.in/get-consultation',
    description: 'Let\'s discuss your business goals',
    icon: 'phone',
    color: '#10B981',
    isActive: true,
    clickCount: 0,
  },
  {
    _id: 'default-services',
    title: '💼 Our Services',
    url: 'https://www.avanienterprises.in/services',
    description: 'Digital Marketing, Web Dev, SEO & more',
    icon: 'web',
    color: '#6366F1',
    isActive: true,
    clickCount: 0,
  },
  {
    _id: 'default-case-studies',
    title: '📊 Case Studies',
    url: 'https://www.avanienterprises.in/case-studies',
    description: 'See the results we deliver',
    icon: 'external',
    color: '#F59E0B',
    isActive: true,
    clickCount: 0,
  },
  {
    _id: 'default-blog',
    title: '📰 Read Our Blog',
    url: 'https://www.avanienterprises.in/blog',
    description: 'Insights, tips & industry trends',
    icon: 'external',
    color: '#EC4899',
    isActive: true,
    clickCount: 0,
  },
  {
    _id: 'default-careers',
    title: '👥 We\'re Hiring — Careers',
    url: 'https://www.avanienterprises.in/careers',
    description: 'Join our growing team',
    icon: 'external',
    color: '#8B5CF6',
    isActive: true,
    clickCount: 0,
  },
  {
    _id: 'default-whatsapp',
    title: '💬 Chat on WhatsApp',
    url: 'https://wa.me/919253625099',
    description: 'Quick response guaranteed',
    icon: 'whatsapp',
    color: '#25D366',
    isActive: true,
    clickCount: 0,
    animation: 'pulse',
  },
  {
    _id: 'default-pdf-services',
    title: '📄 Avani Enterprises Services',
    url: '/Avani Enterprises Services ( Website, SMM and Ads )  (3).pdf',
    description: 'Website, SMM & Ads Services',
    icon: 'external',
    color: '#D946EF',
    isActive: true,
    clickCount: 0,
  },
  {
    _id: 'default-pdf-bundle',
    title: '📦 Avani Services Bundle',
    url: '/Avani services bundle (2).pdf',
    description: 'Complete services package',
    icon: 'external',
    color: '#EC4899',
    isActive: true,
    clickCount: 0,
  },
];

export default function Links() {
  const [links, setLinks] = useState<Link[]>(defaultLinks);
  const [loading, setLoading] = useState(true);
  const [hoveredLinkId, setHoveredLinkId] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/links`);
      const apiLinks = response.data.filter((link: Link) => link.isActive);
      setLinks(apiLinks.length > 0 ? apiLinks : defaultLinks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching links:', error);
      setLinks(defaultLinks);
      setLoading(false);
    }
  };

  const handleLinkClick = async (link: Link) => {
    console.log('🖱️ Link clicked:', link);
    // Track clicks for all backend links (including PDFs)
    if (!link._id.startsWith('default-')) {
      try {
        await axios.post(`${API_BASE_URL}/api/links/${link._id}/click`, {
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        });
      } catch (error) {
        console.error('Error tracking click:', error);
      }
    }
    window.open(link.url, '_blank');
  };

  const handleSocialClick = async (label: string) => {
    console.log('🖱️ Social link clicked:', label);
    // Track social media clicks
    try {
      await axios.post(`${API_BASE_URL}/api/social-clicks`, {
        platform: label,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });
    } catch (error) {
      console.error('Error tracking social click:', error);
      // Don't block navigation if tracking fails
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2a1810 0%, #3d2417 50%, #4a2f20 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Animated gradient orbs - Orange */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(255, 140, 0, 0.45) 0%, transparent 60%)',
          filter: 'blur(60px)',
          animation: 'float1 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(255, 165, 0, 0.4) 0%, transparent 60%)',
          filter: 'blur(60px)',
          animation: 'float2 10s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(255, 120, 0, 0.4) 0%, transparent 60%)',
          filter: 'blur(80px)',
          animation: 'float3 12s ease-in-out infinite',
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '440px',
          margin: '0 auto',
          padding: '48px 20px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {/* Profile Avatar */}
        <motion.div
           initial={{ opacity: 0, scale: 0.5, y: -20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
           style={{ marginBottom: '28px', position: 'relative' }}
        >
          {/* Continuous Float Animation Wrapper */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            {/* Glow ring */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #06b6d4, #10b981, #6366f1, #06b6d4)',
                padding: '3px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#ffffff' }} />
            </motion.div>

            {/* Avatar image */}
            <div
              style={{
                position: 'relative',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #ffffff',
              }}
            >
              <img
                src="/avani-logo.jpg"
                alt="Avani Enterprises"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Online indicator */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#10b981',
                border: '3px solid #ffffff',
                zIndex: 5,
              }}
              title="Available"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'transparent',
            background: 'linear-gradient(135deg, #ffc87c 0%, #ffb347 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '6px',
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          Avani Enterprises
        </motion.h1>

        {/* Bio / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: '0.88rem',
            color: '#e8d5c4',
            fontWeight: 500,
            textAlign: 'center',
            marginBottom: '24px',
            lineHeight: 1.6,
            maxWidth: '320px',
          }}
        >
          No.1 Digital Marketing Agency in India 🇮🇳
          <br />
          <span style={{ fontSize: '0.8rem', color: '#d4a574' }}>
            SEO • PPC • Social Media • Web Dev • Branding
          </span>
        </motion.p>

        {/* Social Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {socialLinks.map((social, i) => (
            <motion.div
              key={social.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 300 }}
            >
              <SocialIcon 
                {...social} 
                onIconClick={() => handleSocialClick(social.label)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)',
            marginBottom: '28px',
            borderRadius: '1px',
          }}
        />

        {/* Links Section */}
        <div style={{ width: '100%' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
              <motion.div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(16, 185, 129, 0.2)',
                  borderTopColor: '#10b981',
                  borderRadius: '50%',
                }}
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          ) : links.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                padding: '48px 0',
                color: '#64748b',
                fontSize: '0.9rem',
              }}
            >
              <Sparkles style={{ width: 24, height: 24, margin: '0 auto 12px', color: 'rgba(6, 182, 212, 0.4)' }} />
              Links coming soon...
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.7 },
                },
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {links.map((link) => {
                const LinkIcon = getIconForLink(link.icon, link.url);
                const linkColor = link.color || '#06b6d4';
                const isHovered = hoveredLinkId === link._id;

                return (
                  <motion.div
                    key={link._id}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                      },
                    }}
                  >
                    <div 
                      className={link.animation ? `anim-wrapper anim-${link.animation}` : 'anim-wrapper'}
                      style={{ position: 'relative' }}
                      onMouseEnter={() => setHoveredLinkId(link._id)}
                      onMouseLeave={() => setHoveredLinkId(null)}
                    >
                      {/* Glow background on hover */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: '-1px',
                          borderRadius: '14px',
                          background: `radial-gradient(circle, ${linkColor}20 0%, ${linkColor}05 70%)`,
                          pointerEvents: 'none',
                          zIndex: -1,
                        }}
                        animate={{ 
                          opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <RippleButton
                        onClick={() => handleLinkClick(link)}
                        style={{
                          position: 'relative',
                          width: '100%',
                          padding: '16px 20px',
                          borderRadius: '14px',
                          border: '1px solid rgba(255, 200, 124, 0.3)',
                          background: 'rgba(139, 69, 19, 0.4)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 200, 124, 0.2)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          color: '#f5e6d3',
                          textAlign: 'left',
                          overflow: 'hidden',
                          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          fontSize: '0.95rem',
                          fontFamily: 'inherit',
                          outline: 'none',
                        }}
                      >
                        {/* Icon */}
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            background: `linear-gradient(135deg, ${linkColor}25, ${linkColor}08)`,
                            border: `1px solid ${linkColor}40`,
                            boxShadow: `inset 0 2px 4px rgba(255,255,255,0.1)`,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <LinkIcon style={{ width: 20, height: 20, color: linkColor }} />
                        </div>

                        {/* Text */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              color: '#f5e6d3',
                              marginBottom: link.description ? '2px' : 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {link.title}
                          </div>
                          {link.description && (
                            <div
                              style={{
                                fontSize: '0.78rem',
                                color: '#d4a574',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {link.description}
                            </div>
                          )}
                        </div>

                        {/* Arrow */}
                        <ArrowUpRight
                          style={{
                            width: 18,
                            height: 18,
                            color: 'rgba(212, 165, 116, 0.6)',
                            flexShrink: 0,
                            transition: 'all 0.3s ease',
                          }}
                        />
                      </RippleButton>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            marginTop: 'auto',
            paddingTop: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Visit website link */}
          <motion.a
            href="https://www.avanienterprises.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.78rem',
              color: '#d4a574',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.3s ease',
            }}
            whileHover={{ color: 'rgba(255, 160, 60, 0.9)' }}
          >
            <Globe style={{ width: 12, height: 12 }} />
            avanienterprises.in
          </motion.a>

          {/* Made with love */}
          <p
            style={{
              fontSize: '0.75rem',
              color: '#b8956a',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart style={{ width: 12, height: 12, color: '#10b981', fill: '#10b981' }} />
            </motion.span>{' '}
            by Avani Enterprises
          </p>
        </motion.div>
      </div>

      {/* CSS animations for background orbs */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -20px); }
        }

        /* Continuous Animations */
        .anim-wrapper {
          width: 100%;
          border-radius: 14px;
        }
        .anim-wrapper:hover {
          animation-play-state: paused !important;
        }
        
        .anim-bounce { animation: link-bounce 2.5s infinite cubic-bezier(0.28, 0.84, 0.42, 1); }
        .anim-pulse { animation: link-pulse 2s infinite ease-in-out; }
        .anim-shake { animation: link-shake 3s infinite ease-in-out; }
        .anim-tada { animation: link-tada 2.5s infinite ease-in-out; }
        .anim-wobble { animation: link-wobble 3s infinite ease-in-out; }
        .anim-glow { animation: link-glow 2s infinite ease-in-out; }

        @keyframes link-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-7px); }
          60% { transform: translateY(-3px); }
        }
        @keyframes link-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        @keyframes link-shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        @keyframes link-tada {
          0%, 100% { transform: scale(1) rotate(0); }
          10%, 20% { transform: scale(0.97) rotate(-1deg); }
          30%, 50%, 70%, 90% { transform: scale(1.02) rotate(1deg); }
          40%, 60%, 80% { transform: scale(1.02) rotate(-1deg); }
        }
        @keyframes link-wobble {
          0%, 100% { transform: translateX(0%); }
          15% { transform: translateX(-4px) rotate(-1.5deg); }
          30% { transform: translateX(3px) rotate(1deg); }
          45% { transform: translateX(-2px) rotate(-1deg); }
          60% { transform: translateX(1px) rotate(0.5deg); }
        }
        @keyframes link-glow {
          0%, 100% { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.5); }
          50% { box-shadow: 0 0 20px rgba(6,182,212,0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.8); }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.2);
        }
      `}
      </style>
    </div>
  );
}
