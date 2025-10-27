const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../output');
const GALLERY_FILE = path.join(__dirname, '../index.html');

// PNGファイルを取得
const pngFiles = fs.readdirSync(OUTPUT_DIR)
  .filter(file => file.endsWith('.png'))
  .sort();

// パターンごとにグループ化
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

// カラー名を日本語に変換
function getColorLabel(filename) {
  const colorMap = {
    'mono': 'モノトーン',
    'blue-pastel': '淡いブルー',
    'blue': '濃いブルー',
    'red-pastel': '淡いレッド',
    'red': '濃いレッド',
    'green-pastel': '淡いグリーン',
    'green': '濃いグリーン',
    'purple-pastel': '淡いパープル',
    'purple': '濃いパープル'
  };

  for (const [key, label] of Object.entries(colorMap)) {
    if (filename.includes(`-${key}.png`)) {
      return label;
    }
  }
  return filename.replace('.png', '');
}

// HTMLテンプレート生成 (省略のため最小版)
const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoverArts Gallery</title>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f5f5f5; }
    .container { max-width: 1400px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; }
    h1 { color: #667eea; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
    .gallery-item { background: #f9f9f9; border-radius: 10px; overflow: hidden; }
    .gallery-item img { width: 100%; height: auto; display: block; }
    .image-info { padding: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>CoverArts Gallery</h1>
    <p>Total: ${pngFiles.length} designs</p>
    ${Object.entries(patterns).map(([key, data]) => {
      if (data.files.length === 0) return '';
      return `
        <h2>${data.name}</h2>
        <div class="gallery">
          ${data.files.map(file => `
            <div class="gallery-item">
              <img src="output/${file}" alt="${file}">
              <div class="image-info">
                <div>${getColorLabel(file)}</div>
                <small>${file}</small>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('')}
  </div>
</body>
</html>`;

fs.writeFileSync(GALLERY_FILE, html, 'utf8');
console.log(`✅ Gallery generated: ${GALLERY_FILE}`);
console.log(`📊 Total images: ${pngFiles.length}`);
