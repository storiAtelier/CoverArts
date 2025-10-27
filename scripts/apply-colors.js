import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

async function applyColors() {
  const templatesDir = path.join(rootDir, 'templates');
  const patterns = await fs.readdir(templatesDir);

  for (const pattern of patterns) {
    const patternDir = path.join(templatesDir, pattern);
    const stat = await fs.stat(patternDir);

    if (!stat.isDirectory()) continue;

    console.log(`Processing ${pattern}...`);

    // Read base SVG
    const baseSvgPath = path.join(patternDir, 'base.svg');
    const baseSvg = await fs.readFile(baseSvgPath, 'utf-8');

    // Read colors YAML
    const colorsYamlPath = path.join(patternDir, 'colors.yml');
    const colorsYaml = await fs.readFile(colorsYamlPath, 'utf-8');
    const colors = yaml.load(colorsYaml);

    // Create output directory
    const outputDir = path.join(rootDir, 'svgs');
    await fs.mkdir(outputDir, { recursive: true });

    // Generate colored SVGs
    let isFirst = true;
    for (const [colorName, colorValues] of Object.entries(colors)) {
      let svg = baseSvg;

      // Replace all placeholders
      for (const [key, value] of Object.entries(colorValues)) {
        const placeholder = `{{${key}}}`;
        svg = svg.replaceAll(placeholder, value);
      }

      // Write to svgs output folder
      const outputPath = path.join(outputDir, `${pattern}-${colorName}.svg`);
      await fs.writeFile(outputPath, svg, 'utf-8');
      console.log(`  Created ${pattern}-${colorName}.svg`);

      // Also write first variant (sample) to templates folder
      if (isFirst) {
        const templateSamplePath = path.join(patternDir, `${pattern}-${colorName}.svg`);
        await fs.writeFile(templateSamplePath, svg, 'utf-8');
        console.log(`  Created sample in templates: ${pattern}-${colorName}.svg`);
        isFirst = false;
      }
    }
  }

  console.log('\nAll colored SVGs generated successfully!');
}

applyColors().catch(console.error);
