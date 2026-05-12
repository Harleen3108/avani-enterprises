const fs = require('fs');
const path = require('path');
const dir = '/Users/kuhunarang/avani-enterprises/avani-connect-glow-main/src/components/dummy/';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.jsx') || file.endsWith('.js')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace Clash Display & Satoshi with Outfit & Inter
    content = content.replace(/'Clash Display',\s*Impact,\s*sans-serif/g, "'Outfit', sans-serif");
    content = content.replace(/"'Clash Display',\s*Impact,\s*sans-serif"/g, "\"'Outfit', sans-serif\"");
    
    content = content.replace(/'Clash Display',\s*sans-serif/g, "'Outfit', sans-serif");
    content = content.replace(/"'Clash Display',\s*sans-serif"/g, "\"'Outfit', sans-serif\"");
    
    content = content.replace(/'Satoshi',\s*sans-serif/g, "'Inter', sans-serif");
    content = content.replace(/"'Satoshi',\s*sans-serif"/g, "\"'Inter', sans-serif\"");

    // Specifically make hero fonts bigger in DummyHero.tsx
    if (file === 'DummyHero.tsx') {
      content = content.replace(/clamp\(24px,\s*8vw,\s*88px\)/g, "clamp(40px, 11vw, 130px)");
      content = content.replace(/clamp\(24px,\s*8vw,\s*82px\)/g, "clamp(40px, 11vw, 120px)");
    }
    
    fs.writeFileSync(filePath, content);
  }
});

// Also replace in DummyHome.css
const cssPath = '/Users/kuhunarang/avani-enterprises/avani-connect-glow-main/src/components/dummy/DummyHome.css';
if (fs.existsSync(cssPath)) {
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  cssContent = cssContent.replace(/'Syne',\s*sans-serif/g, "'Outfit', sans-serif");
  cssContent = cssContent.replace(/'Satoshi',\s*sans-serif/g, "'Inter', sans-serif");
  if (!cssContent.includes('Outfit')) {
      cssContent = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap');\n" + cssContent;
  }
  fs.writeFileSync(cssPath, cssContent);
}

console.log("Fonts replaced successfully!");
