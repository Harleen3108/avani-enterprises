const fs = require('fs');
const path = require('path');

const indexPath = path.join(process.cwd(), 'dist', 'index.html');
const templatePath = path.join(process.cwd(), 'dist', 'template.html');

if (fs.existsSync(indexPath)) {
  fs.renameSync(indexPath, templatePath);
  console.log('✅ Successfully renamed dist/index.html to dist/template.html');
} else {
  console.error('❌ Error: dist/index.html not found!');
  process.exit(1);
}
