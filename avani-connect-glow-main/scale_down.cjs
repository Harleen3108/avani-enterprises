const fs = require('fs');
const path = require('path');

const dir = '/Users/kuhunarang/avani-enterprises/avani-connect-glow-main/src/components/dummy/';
const files = fs.readdirSync(dir);

const scale = 0.75; // Reduce sizes by 25%

files.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.jsx') || file.endsWith('.js')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Scale down clamp(Xpx, Yvw, Zpx) or similar
    content = content.replace(/clamp\(\s*([\d\.]+)px\s*,\s*([\d\.]+)vw\s*,\s*([\d\.]+)px\s*\)/g, (match, min, vw, max) => {
        return `clamp(${Math.round(parseFloat(min) * scale)}px, ${(parseFloat(vw) * scale).toFixed(1)}vw, ${Math.round(parseFloat(max) * scale)}px)`;
    });

    // Scale down clamp(Xrem, Yvw, Zrem)
    content = content.replace(/clamp\(\s*([\d\.]+)rem\s*,\s*([\d\.]+)vw\s*,\s*([\d\.]+)rem\s*\)/g, (match, min, vw, max) => {
        return `clamp(${(parseFloat(min) * scale).toFixed(1)}rem, ${(parseFloat(vw) * scale).toFixed(1)}vw, ${(parseFloat(max) * scale).toFixed(1)}rem)`;
    });
    
    // Also scale down plain font sizes that are quite large (e.g. 40px to 80px)
    content = content.replace(/fontSize:\s*'(\d{2})px'/g, (match, size) => {
        const val = parseInt(size);
        if (val > 24) {
            return `fontSize: '${Math.round(val * scale)}px'`;
        }
        return match;
    });

    // Scale down padding in DummyServices.tsx
    if (file === 'DummyServices.tsx') {
        content = content.replace(/padding:\s*'80px\s+0'/g, "padding: '40px 0'");
        content = content.replace(/marginBottom:\s*'60px'/g, "marginBottom: '40px'");
        content = content.replace(/padding:\s*'1.5rem\s+0'/g, "padding: '1rem 0'");
        // Ensure the font sizes for h3 and h2 are even smaller
        content = content.replace(/clamp\(20px,\s*3.4vw,\s*42px\)/g, "clamp(18px, 2.5vw, 32px)");
        content = content.replace(/clamp\(21px,\s*3.0vw,\s*32px\)/g, "clamp(18px, 2.5vw, 28px)");
    }
    
    fs.writeFileSync(filePath, content);
  }
});

console.log("All sizes scaled down successfully!");
