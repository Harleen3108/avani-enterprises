import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const MAX_WIDTH = 1920;
const MIN_SIZE_BYTES = 20 * 1024; // 20KB

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
  const targets = files.filter((f) => {
    const p = f.path.toLowerCase();
    const isImage = p.endsWith('.png') || p.endsWith('.jpg') || p.endsWith('.jpeg');
    const isLogoOrIcon = p.includes('logo') || 
                         p.includes('icon') || 
                         p.includes('favicon') || 
                         p.includes('avatar') || 
                         p.includes('android-chrome') || 
                         p.includes('apple-touch-icon') || 
                         p.includes('placeholder') ||
                         p.includes('redball') ||
                         p.includes('thepage') ||
                         p.includes('kingspet') ||
                         p.includes('paragon') ||
                         p.includes('avani_enter');
    return isImage && !isLogoOrIcon && f.size >= MIN_SIZE_BYTES;
  });

  console.log(`Found ${targets.length} images to optimize.`);

  for (const file of targets) {
    const ext = path.extname(file.path);
    const baseName = path.basename(file.path, ext);
    const dirName = path.dirname(file.path);
    const webpPath = path.join(dirName, `${baseName}.webp`);

    console.log(`Optimizing: ${path.relative(publicDir, file.path)} (${(file.size / 1024).toFixed(2)} KB)`);

    try {
      const metadata = await sharp(file.path).metadata();
      const options = { quality: 85 };
      
      let transform = sharp(file.path);
      
      if (metadata.width > MAX_WIDTH) {
        transform = transform.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
      
      await transform.webp(options).toFile(webpPath);
      
      const newStat = fs.statSync(webpPath);
      console.log(`✅ Converted to WebP: ${(newStat.size / 1024).toFixed(2)} KB`);
      
    } catch (e) {
      console.error(`❌ Error optimizing ${file.path}:`, e.message);
    }
  }
}

compressImages();
