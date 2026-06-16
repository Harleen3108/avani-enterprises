const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

const allTsx = walk(srcDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

let replacedCount = 0;
let imgCount = 0;

for (const file of allTsx) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Regex to match <img ... /> or <img ... >
  // We need to parse attributes to ensure we don't duplicate.
  content = content.replace(/<img\s([^>]+)>/g, (match, attrs) => {
    // If it already has loading attr or fetchPriority, skip it
    if (attrs.includes('loading=') || attrs.includes('fetchPriority=') || attrs.includes('fetchpriority=')) {
      return match;
    }
    
    // If it's the hero image in HeroSection or Hero, skip it
    // We can guess it's a hero image if it has 'Hero' in the component name, but let's be safe.
    // It's safer to just add loading="lazy" decoding="async" to all standard images.
    // If we want to be safe, we can just append it before the closing slash/bracket
    imgCount++;
    
    if (match.endsWith('/>')) {
      return `<img ${attrs.slice(0, -2)} loading="lazy" decoding="async" />`;
    } else if (match.endsWith('>')) {
      return `<img ${attrs.slice(0, -1)} loading="lazy" decoding="async" >`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    replacedCount++;
  }
}

console.log(`Successfully updated ${replacedCount} files with ${imgCount} lazy load tags.`);
