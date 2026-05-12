const fs = require('fs');

const cssPath = '/Users/kuhunarang/avani-enterprises/avani-connect-glow-main/src/components/dummy/DummyHome.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const beigeTheme = `
.theme-beige {
  --bg-primary: #F0EAD6;
  --bg-secondary: #E6DFCB;
  --bg-tertiary: #DCD4C0;
  
  --text-primary: #2c1e16;
  --text-secondary: rgba(44, 30, 22, 0.8);
  --text-tertiary: rgba(44, 30, 22, 0.6);
  
  --accent-primary: #a16b1e;
  --accent-light: #C4913A;
  --accent-hover: rgba(161, 107, 30, 0.1);
  
  --border-light: rgba(44, 30, 22, 0.2);
  --border-faint: rgba(44, 30, 22, 0.08);
  
  --card-bg: rgba(255, 255, 255, 0.3);
}

.theme-brown {
  --bg-primary: #0A0705;
  --bg-secondary: #0F0C09;
  --bg-tertiary: #1A1410;
  
  --text-primary: #F5EDD8;
  --text-secondary: rgba(245,237,216,0.7);
  --text-tertiary: rgba(245,237,216,0.45);
  
  --accent-primary: #C4913A;
  --accent-light: #E8B96A;
  --accent-hover: rgba(196,145,58,0.1);
  
  --border-light: rgba(196,145,58,0.15);
  --border-faint: rgba(245,237,216,0.07);
  
  --card-bg: rgba(255,255,255,0.02);
}
`;

if (!cssContent.includes('.theme-beige')) {
  cssContent += beigeTheme;
  fs.writeFileSync(cssPath, cssContent);
}

// Now apply these themes to the TSX files by replacing the root section class or style.
const dir = '/Users/kuhunarang/avani-enterprises/avani-connect-glow-main/src/components/dummy/';
const components = {
  beige: ['DummyServices.tsx', 'DummyCaseStudies.tsx', 'Dummyglobalpresence.tsx', 'DummyTestimonials.tsx', 'DummyAwards.tsx', 'DummyBlog.tsx', 'DummyFAQ.tsx', 'DummyLogoMarquee.tsx', 'DummyProjects.tsx'],
  brown: ['DummyHero.tsx', 'DummyImpactBar.tsx', 'DummyProcess.tsx', 'DummyIndustries.tsx', 'DummyTeam.tsx', 'DummyTimeline.tsx', 'DummyAnnouncement.tsx', 'DummyCTA.tsx', 'DummyFooter.tsx']
};

// Actually the user said: "brown then in what we create it turns beige ... then industries we serve again brown and this format over all the page"
// So we alternate.
// Let's list all components in order of DummyHome.tsx and assign alternating themes.
const order = [
  'DummyHero.tsx',           // Brown
  'DummyLogoMarquee.tsx',    // Brown
  'DummyImpactBar.tsx',      // Beige
  'DummyServices.tsx',       // Beige (what we create)
  'DummyProcess.tsx',        // Brown
  'DummyCaseStudies.tsx',    // Beige
  'DummyIndustries.tsx',     // Brown (industries we serve)
  'Dummyglobalpresence.tsx', // Beige
  'DummyProjects.tsx',       // Brown
  'DummyTestimonials.tsx',   // Beige
  'DummyTeam.tsx',           // Brown
  'DummyAwards.tsx',         // Beige
  'DummyTimeline.tsx',       // Brown
  'DummyBlog.tsx',           // Beige
  'DummyAnnouncement.tsx',   // Brown
  'DummyFAQ.tsx',            // Beige
  'DummyCTA.tsx',            // Brown
];

const beigeComps = ['DummyImpactBar.tsx', 'DummyServices.tsx', 'DummyCaseStudies.tsx', 'Dummyglobalpresence.tsx', 'DummyTestimonials.tsx', 'DummyAwards.tsx', 'DummyBlog.tsx', 'DummyFAQ.tsx'];

// Apply classes
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(dir + file, 'utf8');
    
    // Determine target class
    const isBeige = beigeComps.includes(file);
    const themeClass = isBeige ? 'theme-beige' : 'theme-brown';
    
    // Inject the class into the top-level element. Most use <section style={{...}}> or <section className="...">
    // If it doesn't have className, add it. If it has, append it.
    // For simplicity, we can just replace `<section ` with `<section className="${themeClass}" `
    
    if (content.includes('<section ') && !content.includes('theme-beige') && !content.includes('theme-brown')) {
      content = content.replace(/<section /g, `<section className="${themeClass}" `);
    } else if (file === 'DummyHero.tsx' && !content.includes('theme-brown')) {
      // DummyHero might not have a <section, it has <section ref=
      if (content.includes('<section')) {
         content = content.replace(/<section/, `<section className="${themeClass}"`);
      }
    }
    
    fs.writeFileSync(dir + file, content);
  }
});
console.log('Themes applied');
