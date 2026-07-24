import { readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, 'public');

// Files to compress: name → target width (px), quality
const targets = [
  { file: 'before-fungal.png',   width: 900,  quality: 78 },
  { file: 'before-neut.png',     width: 900,  quality: 78 },
  { file: 'before-insect.png',   width: 900,  quality: 78 },
  { file: 'after-fungal.png',    width: 900,  quality: 78 },
  { file: 'after-neut.png',      width: 900,  quality: 78 },
  { file: 'after-insect.png',    width: 900,  quality: 78 },
  { file: 'hero-image.png',      width: 1200, quality: 80 },
  { file: 'awareness-camps.png', width: 900,  quality: 78 },
  { file: 'ma-card.png',         width: 900,  quality: 78 },
  { file: 'apple-stages.png',    width: 900,  quality: 80 },
  { file: 'apple-scab.png',      width: 800,  quality: 80 },
  { file: 'brown-rot.png',       width: 800,  quality: 80 },
  { file: 'filpostar.png',       width: 700,  quality: 82 },
  { file: 'superstar.png',       width: 700,  quality: 82 },
  { file: 'safety-guide.png',    width: 800,  quality: 80 },
  { file: 'tingo.png',           width: 700,  quality: 82 },
  { file: 'cyclone.png',         width: 700,  quality: 82 },
];

let totalSaved = 0;

for (const { file, width, quality } of targets) {
  const input = join(publicDir, file);
  const outName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const output = join(publicDir, outName);

  try {
    const before = statSync(input).size;
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(output);
    const after = statSync(output).size;
    const saved = before - after;
    totalSaved += saved;
    console.log(`✓ ${file} → ${outName}  (${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB, saved ${(saved/1024).toFixed(0)}KB)`);
  } catch (e) {
    console.log(`✗ Skipped ${file}: ${e.message}`);
  }
}

console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
