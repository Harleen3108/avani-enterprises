const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const MAX_WIDTH = 1920;
const MIN_SIZE_BYTES = 500 * 1024; // 500KB

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push({ path: filePath, size: stat.size });
    }
  });
  return results;
}

async function compressImages() {
  const files = walk(publicDir);
  const targets = files.filter(
    (f) =>
      f.size >= MIN_SIZE_BYTES &&
      (f.path.toLowerCase().endsWith('.png') || f.path.toLowerCase().endsWith('.jpg') || f.path.toLowerCase().endsWith('.jpeg'))
  );

  console.log(`Found ${targets.length} large images to optimize.`);

  for (const file of targets) {
    const ext = path.extname(file.path);
    // Keep the same base name, but with .webp extension
    const baseName = path.basename(file.path, ext);
    const dirName = path.dirname(file.path);
    const webpPath = path.join(dirName, `${baseName}.webp`);

    console.log(`Optimizing: ${path.relative(publicDir, file.path)} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

    try {
      const metadata = await sharp(file.path).metadata();
      const options = { quality: 80 };
      
      let transform = sharp(file.path);
      
      if (metadata.width > MAX_WIDTH) {
        transform = transform.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
      
      await transform.webp(options).toFile(webpPath);
      
      const newStat = fs.statSync(webpPath);
      console.log(`✅ Converted to WebP: ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
      
    } catch (e) {
      console.error(`❌ Error optimizing ${file.path}:`, e.message);
    }
  }
}

compressImages();
