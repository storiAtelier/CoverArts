import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../output');
const GALLERY_FILE = path.join(__dirname, '../index.html');

const pngFiles = fs.readdirSync(OUTPUT_DIR).filter(file => file.endsWith('.png')).sort();

const patterns = {
  'pattern1': { name: 'Pattern 1 - Geometric (Portrait)', files: [] },
  'pattern1-wide': { name: 'Pattern 1 - Geometric (Landscape)', files: [] },
  'pattern2': { name: 'Pattern 2 - Minimal Lines', files: [] },
  'pattern3': { name: 'Pattern 3 - Gradient Wave', files: [] },
  'pattern4': { name: 'Pattern 4 - Book Frame', files: [] },
  'pattern5': { name: 'Pattern 5 - Bookshelf (Portrait)', files: [] },
  'pattern5-wide': { name: 'Pattern 5 - Bookshelf (Landscape)', files: [] }
};

pngFiles.forEach(file => {
  for (const key of Object.keys(patterns)) {
    if (file.startsWith(key)) {
      patterns[key].files.push(file);
      break;
    }
  }
});

function getColorLabel(filename) {
  const colorMap = {
    'mono': 'モノトーン', 'blue-pastel': '淡いブルー', 'blue': '濃いブルー',
    'red-pastel': '淡いレッド', 'red': '濃いレッド', 'green-pastel': '淡いグリーン',
    'green': '濃いグリーン', 'purple-pastel': '淡いパープル', 'purple': '濃いパープル'
  };
  for (const [key, label] of Object.entries(colorMap)) {
    if (filename.includes('-' + key + '.png')) return label;
  }
  return filename.replace('.png', '');
}

function generatePatternSections() {
  let html = '';
  for (const [key, data] of Object.entries(patterns)) {
    if (data.files.length === 0) continue;
    html += '<section class="pattern-section">\n';
    html += '  <div class="pattern-header"><h2>' + data.name + '</h2><span>' + data.files.length + '個</span></div>\n';
    html += '  <div class="gallery">\n';
    for (const file of data.files) {
      html += '    <div class="gallery-item">\n';
      html += '      <img src="output/' + file + '" alt="' + file + '">\n';
      html += '      <div class="info"><div class="name">' + getColorLabel(file) + '</div>\n';
      html += '        <div class="filename">' + file + '</div>\n';
      html += '        <a href="output/' + file + '" download>Download</a>\n';
      html += '      </div>\n    </div>\n';
    }
    html += '  </div>\n</section>\n';
  }
  return html;
}

let html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>CoverArts Gallery</title></head><body>\n';
html += '<h1>CoverArts Gallery</h1>\n';
html += '<p>Total: ' + pngFiles.length + ' images</p>\n';
html += generatePatternSections();
html += '<footer><a href="https://github.com/storiAtelier/CoverArts">GitHub</a></footer>\n';
html += '</body></html>\n';

fs.writeFileSync(GALLERY_FILE, html, 'utf8');
console.log('Generated: ' + GALLERY_FILE);
