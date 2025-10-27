import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

async function svgToPng() {
  const svgsDir = path.join(rootDir, 'svgs');
  const outputDir = path.join(rootDir, 'output');
  await fs.mkdir(outputDir, { recursive: true });

  // Get all SVG files from svgs folder
  const svgFiles = (await fs.readdir(svgsDir)).filter(f => f.endsWith('.svg'));

  console.log(`Converting ${svgFiles.length} SVG files to PNG...`);

  for (const svgFile of svgFiles) {
    const svgPath = path.join(svgsDir, svgFile);
    const pngFile = svgFile.replace('.svg', '.png');
    const pngPath = path.join(outputDir, pngFile);

    await sharp(svgPath)
      .png()
      .toFile(pngPath);

    console.log(`  Created ${pngFile}`);
  }

  console.log('\nAll PNGs generated successfully!');
}

svgToPng().catch(console.error);
