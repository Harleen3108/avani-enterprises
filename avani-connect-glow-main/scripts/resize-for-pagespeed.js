import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');

const IMAGES_CONFIG = [
  {
    relPath: 'logo0.webp',
    displayedWidth: 32,
    variants: [64, 96]
  },
  {
    relPath: 'indus.webp',
    displayedWidth: 46,
    variants: [92, 138]
  },
  {
    relPath: 'whatwecreate/loans.webp',
    displayedWidth: 263,
    variants: [320, 640]
  },
  {
    relPath: 'whatwecreate/webdev.webp',
    displayedWidth: 263,
    variants: [320, 640]
  },
  {
    relPath: 'whatwecreate/insurance.webp',
    displayedWidth: 263,
    variants: [320, 640]
  },
  {
    relPath: 'whatwecreate/finance.webp',
    displayedWidth: 263,
    variants: [320, 640]
  },
  {
    relPath: 'whatwecreate/consultation.webp',
    displayedWidth: 263,
    variants: [320, 640]
  },
  {
    relPath: 'whatwecreate/podcast.webp',
    displayedWidth: 263,
    variants: [320, 640]
  },
  {
    relPath: 'assistant-v2.webp',
    displayedWidth: 95,
    variants: [190, 285]
  },
  {
    relPath: 'whatwecreate/socialmedia.webp',
    displayedWidth: 311,
    variants: [320, 640]
  },
  {
    relPath: 'whatwecreate/aisolutions.webp',
    displayedWidth: 373,
    variants: [400, 800]
  },
  {
    relPath: 'whatwecreate/seoandcontent.webp',
    displayedWidth: 263,
    variants: [320, 640]
  },
  {
    relPath: 'policucue.jpeg',
    displayedWidth: 46,
    variants: [92, 138]
  },
  {
    relPath: 'paragon.png',
    displayedWidth: 32,
    variants: [64, 96]
  },
  {
    relPath: 'kingspet.png',
    displayedWidth: 32,
    variants: [64, 96]
  },
  {
    relPath: 'redball.png',
    displayedWidth: 32,
    variants: [64, 96]
  },
  {
    relPath: 'thepage.png',
    displayedWidth: 32,
    variants: [64, 96]
  }
];

async function resizeImages() {
  console.log('🚀 Starting image resizing process...\n');
  let totalOrigSize = 0;
  let totalNewSize = 0;
  const results = [];

  for (const imgConfig of IMAGES_CONFIG) {
    const srcPath = path.join(publicDir, imgConfig.relPath);
    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️ File not found: ${srcPath}`);
      continue;
    }

    const origStats = fs.statSync(srcPath);
    const origSizeBytes = origStats.size;
    totalOrigSize += origSizeBytes;

    const metadata = await sharp(srcPath).metadata();
    const origWidth = metadata.width;
    const origHeight = metadata.height;

    const baseName = path.basename(imgConfig.relPath, path.extname(imgConfig.relPath));
    const dirName = path.dirname(imgConfig.relPath);

    console.log(`Processing: ${imgConfig.relPath} (${origWidth}x${origHeight}, ${(origSizeBytes / 1024).toFixed(1)} KB)`);

    const variantSizes = [];
    const generatedPaths = [];

    for (const width of imgConfig.variants) {
      if (width >= origWidth) {
        console.log(`  Skipping variant ${width}px because original width is ${origWidth}px (no upscaling).`);
        continue;
      }

      const outName = `${baseName}-${width}.webp`;
      const outRelPath = path.join(dirName, outName);
      const destPath = path.join(publicDir, outRelPath);

      // Resize and convert to WebP
      await sharp(srcPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(destPath);

      const destStats = fs.statSync(destPath);
      variantSizes.push(destStats.size);
      generatedPaths.push(outRelPath);

      console.log(`  Generated variant: ${outRelPath} (${width}px wide, ${(destStats.size / 1024).toFixed(1)} KB)`);
    }

    // Determine the largest variant generated to use as the fallback/default source
    // to estimate the savings against original.
    let maxVariantSize = origSizeBytes;
    if (variantSizes.length > 0) {
      maxVariantSize = Math.max(...variantSizes);
      totalNewSize += maxVariantSize;
    } else {
      totalNewSize += origSizeBytes;
    }

    const kbSaved = (origSizeBytes - maxVariantSize) / 1024;
    results.push({
      image: imgConfig.relPath,
      originalDim: `${origWidth}x${origHeight}`,
      originalSizeKB: (origSizeBytes / 1024).toFixed(1),
      variants: imgConfig.variants.join(', '),
      maxVariantSizeKB: variantSizes.length > 0 ? (maxVariantSize / 1024).toFixed(1) : (origSizeBytes / 1024).toFixed(1),
      kbSaved: kbSaved.toFixed(1)
    });
  }

  console.log('\n📊 Optimization Summary Table:\n');
  console.log('| Image | Original Dim | Original Size | Variants Generated | Max Variant Size | KB Saved |');
  console.log('| --- | --- | --- | --- | --- | --- |');
  for (const r of results) {
    console.log(`| ${r.image} | ${r.originalDim} | ${r.originalSizeKB} KB | ${r.variants} | ${r.maxVariantSizeKB} KB | ${r.kbSaved} KB |`);
  }

  const overallOrigKB = totalOrigSize / 1024;
  const overallNewKB = totalNewSize / 1024;
  const overallSavedKB = overallOrigKB - overallNewKB;

  console.log(`\n🎉 Process Complete!`);
  console.log(`Total Original Size: ${overallOrigKB.toFixed(1)} KB`);
  console.log(`Total New Size (using largest generated variants): ${overallNewKB.toFixed(1)} KB`);
  console.log(`Total Savings: ${overallSavedKB.toFixed(1)} KB (~${(overallSavedKB / overallOrigKB * 100).toFixed(1)}% reduction)`);
}

resizeImages().catch(err => {
  console.error('❌ Error during resizing:', err);
});
