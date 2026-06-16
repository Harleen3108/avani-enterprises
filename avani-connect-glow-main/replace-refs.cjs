const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
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

const allWebp = walk(publicDir).filter(f => f.endsWith('.webp'));
const allTsx = walk(srcDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

// Extract basenames without extension
const webpBasenames = allWebp.map(f => path.basename(f, '.webp'));

console.log(`Found ${webpBasenames.length} webp files to replace references for.`);

let replacedCount = 0;

for (const file of allTsx) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  for (const base of webpBasenames) {
    // Replace .png
    content = content.replace(new RegExp(`/${base}\\.png`, 'g'), `/${base}.webp`);
    // Replace .jpg
    content = content.replace(new RegExp(`/${base}\\.jpg`, 'g'), `/${base}.webp`);
    // Replace .jpeg
    content = content.replace(new RegExp(`/${base}\\.jpeg`, 'g'), `/${base}.webp`);
    
    // Also replace without leading slash if they are used relatively or directly
    // Be careful with this, so we use word boundaries if possible
    content = content.replace(new RegExp(`['"\`]${base}\\.png['"\`]`, 'g'), (match) => match.replace('.png', '.webp'));
    content = content.replace(new RegExp(`['"\`]${base}\\.jpg['"\`]`, 'g'), (match) => match.replace('.jpg', '.webp'));
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    replacedCount++;
    console.log(`Updated references in ${path.relative(srcDir, file)}`);
  }
}

console.log(`Successfully updated ${replacedCount} files.`);
