import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    if (filename.includes(\`-\${key}.png\`)) {
      return label;
    }
  }
  return filename.replace('.png', '');
}

// HTMLテンプレート生成
const html = \`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoverArts Gallery</title>
  <meta name="description" content="シンプルで美しい本の表紙デザインギャラリー">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    h1 { color: #667eea; text-align: center; margin-bottom: 40px; }
    .pattern-section { margin-bottom: 60px; }
    .pattern-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 25px; border-radius: 10px; margin-bottom: 25px; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 25px; }
    .gallery-item { background: #f9f9f9; border-radius: 15px; overflow: hidden; transition: all 0.3s; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .gallery-item:hover { transform: translateY(-5px); box-shadow: 0 12px 20px rgba(0,0,0,0.2); }
    .image-container { height: 350px; background: white; display: flex; align-items: center; justify-content: center; padding: 15px; }
    .gallery-item img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .image-info { padding: 15px; }
    .image-name { font-weight: 600; color: #667eea; }
    .image-filename { font-size: 0.85rem; color: #999; font-family: monospace; }
    .download-btn { display: inline-block; margin-top: 10px; padding: 8px 15px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-size: 0.85rem; }
    .download-btn:hover { background: #764ba2; }
    footer { text-align: center; margin-top: 60px; padding-top: 30px; border-top: 2px solid #f0f0f0; color: #666; }
    .github-link { color: #667eea; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 CoverArts Gallery</h1>
    \${Object.entries(patterns).map(([key, data]) => {
      if (data.files.length === 0) return '';
      return \`
    <section class="pattern-section">
      <div class="pattern-header"><h2>\${data.name}</h2></div>
      <div class="gallery">
        \${data.files.map(file => \`
        <div class="gallery-item">
          <div class="image-container">
            <img src="output/\${file}" alt="\${file}" loading="lazy">
          </div>
          <div class="image-info">
            <div class="image-name">\${getColorLabel(file)}</div>
            <div class="image-filename">\${file}</div>
            <a href="output/\${file}" download class="download-btn">ダウンロード</a>
          </div>
        </div>
        \`).join('')}
      </div>
    </section>
      \`;
    }).join('')}
    <footer>
      <p><a href="https://github.com/storiAtelier/CoverArts" class="github-link">📦 GitHub Repository</a></p>
      <p style="margin-top: 10px;">すべてのデザインはCC0（パブリックドメイン）で提供されています</p>
    </footer>
  </div>
</body>
</html>\`;

fs.writeFileSync(GALLERY_FILE, html, 'utf8');
console.log(\`✅ Gallery HTML generated: \${GALLERY_FILE}\`);
console.log(\`📊 Total images: \${pngFiles.length}\`);
console.log(\`📁 Patterns: \${Object.keys(patterns).length}\`);
