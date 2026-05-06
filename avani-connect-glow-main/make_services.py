import os

with open('ds.jsx', 'r') as f:
    content = f.read()

jsx = """import React from 'react';

const Services = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .glass-panel {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
        }
        .grain-bg {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.04;
            pointer-events: none;
        }
        .grid-texture {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        }
        .text-gradient {
            background: linear-gradient(135deg, #4f46e5, #ec4899);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .font-headline-md { font-family: 'Space Grotesk', sans-serif; font-size: 32px; line-height: 1.2; letter-spacing: -0.01em; font-weight: 500; }
        .font-body-lg { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; line-height: 1.6; font-weight: 400; }
        .font-headline-sm { font-family: 'Space Grotesk', sans-serif; font-size: 24px; line-height: 1.3; font-weight: 500; }
        .font-display-xl { font-family: 'Space Grotesk', sans-serif; font-size: 88px; line-height: 1.0; letter-spacing: -0.04em; font-weight: 800; }
        .font-label-caps { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; line-height: 1.0; letter-spacing: 0.1em; font-weight: 700; }
        .font-body-sm { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; line-height: 1.5; font-weight: 400; }
        .font-display-lg { font-family: 'Space Grotesk', sans-serif; font-size: 64px; line-height: 1.1; letter-spacing: -0.03em; font-weight: 700; }
        .font-body-md { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; line-height: 1.6; font-weight: 400; }
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }

        @media (max-width: 768px) {
          .font-display-xl { font-size: 48px; }
          .font-display-lg { font-size: 36px; }
          .font-headline-md { font-size: 24px; }
        }
      `}</style>
""" + "\n" + content + "\n" + """
    </>
  );
};

export default Services;
"""

with open('src/pages/Services.tsx', 'w') as f:
    f.write(jsx)

