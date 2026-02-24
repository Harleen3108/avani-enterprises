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
