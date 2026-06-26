const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'dist', 'index.html');
const templatePath = path.join(__dirname, 'dist', 'template.html');

if (fs.existsSync(indexPath)) {
  fs.renameSync(indexPath, templatePath);
  console.log('✅ Successfully renamed dist/index.html to dist/template.html');
} else if (fs.existsSync(templatePath)) {
  console.log('ℹ️ dist/template.html already exists, skipping rename.');
} else {
  console.error('❌ Error: index.html not found in dist/ folder!');
  process.exit(1);
}

// Modify stylesheet links in dist/template.html to load asynchronously
if (fs.existsSync(templatePath)) {
  let content = fs.readFileSync(templatePath, 'utf8');
  const regex = /<link rel="stylesheet"\s+crossorigin\s+href="([^"]+)">/g;
  if (regex.test(content)) {
    content = content.replace(regex, (match, href) => {
      console.log(`Converting render-blocking stylesheet to async preload: ${href}`);
      return `<link rel="preload" href="${href}" as="style" crossorigin onload="this.onload=null;this.rel='stylesheet';window.mainCssLoaded=true;document.dispatchEvent(new Event('css-loaded'))"><noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`;
    });
    fs.writeFileSync(templatePath, content, 'utf8');
    console.log('✅ Successfully converted stylesheet link in dist/template.html to async preload.');
  } else {
    console.log('⚠️ No stylesheet link matched in dist/template.html!');
  }
}

