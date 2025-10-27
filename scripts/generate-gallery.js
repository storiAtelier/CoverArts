import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '../output');
const GALLERY_FILE = path.join(__dirname, '../index.html');

const pngFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png')).sort();

// Portrait patterns
const portraitPatterns = {
  'pattern1': { name: 'Pattern 1 - 幾何学的抽象デザイン', files: [] },
  'pattern2': { name: 'Pattern 2 - ミニマルライン', files: [] },
  'pattern3': { name: 'Pattern 3 - グラデーションウェーブ', files: [] },
  'pattern4': { name: 'Pattern 4 - 二重枠（本風）', files: [] },
  'pattern5': { name: 'Pattern 5 - 本棚風', files: [] }
};

// Landscape patterns
const landscapePatterns = {
  'pattern1-wide': { name: 'Pattern 1 Wide - 幾何学的抽象デザイン（横長）', files: [] },
  'pattern5-wide': { name: 'Pattern 5 Wide - 本棚風（横長）', files: [] }
};

pngFiles.forEach(f => {
  // Check landscape first (more specific)
  for (const k of Object.keys(landscapePatterns)) {
    if (f.startsWith(k)) { landscapePatterns[k].files.push(f); return; }
  }
  // Then check portrait
  for (const k of Object.keys(portraitPatterns)) {
    if (f.startsWith(k)) { portraitPatterns[k].files.push(f); return; }
  }
});

function getColorLabel(fn) {
  const m = {'mono':'モノトーン','blue-pastel':'淡いブルー','blue':'濃いブルー','red-pastel':'淡いレッド','red':'濃いレッド','green-pastel':'淡いグリーン','green':'濃いグリーン','purple-pastel':'淡いパープル','purple':'濃いパープル'};
  for (const [k, v] of Object.entries(m)) { if (fn.includes('-'+k+'.png')) return v; }
  return fn.replace('.png', '');
}

function genSections(patterns, sectionTitle) {
  let h = '<h2 class="section-title">' + sectionTitle + '</h2>';
  for (const [k, d] of Object.entries(patterns)) {
    if (d.files.length === 0) continue;
    h += '<section class="pattern-section"><div class="pattern-header"><h3>' + d.name + '</h3><span>' + d.files.length + '個</span></div><div class="gallery">';
    for (const f of d.files) {
      h += '<div class="gallery-item" onclick="openModal(\'output/'+f+'\')"><div class="img-cont"><img src="output/'+f+'" alt="'+f+'"></div><div class="info"><div class="name">'+getColorLabel(f)+'</div><div class="file">'+f+'</div><a href="output/'+f+'" download onclick="event.stopPropagation()">DL</a></div></div>';
    }
    h += '</div></section>';
  }
  return h;
}

let h = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>カバーアートギャラリー</title><style>';
h += '*{margin:0;padding:0;box-sizing:border-box}';
h += 'body{font-family:sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px}';
h += '.container{max-width:1400px;margin:0 auto;background:white;border-radius:20px;padding:40px}';
h += 'header{text-align:center;margin-bottom:40px;padding-bottom:30px;border-bottom:3px solid #667eea}';
h += 'h1{color:#667eea;font-size:2.5rem;margin-bottom:15px}';
h += '.intro{color:#666;line-height:1.8;margin-bottom:10px}';
h += '.intro a{color:#667eea;text-decoration:none;font-weight:600}';
h += '.intro a:hover{text-decoration:underline}';
h += '.section-title{color:#667eea;font-size:1.8rem;margin:50px 0 30px 0;padding-bottom:10px;border-bottom:2px solid #e0e0e0}';
h += '.pattern-section{margin-bottom:40px}';
h += '.pattern-header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:15px 25px;border-radius:10px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center}';
h += '.pattern-header h3{font-size:1.2rem}';
h += '.gallery{display:flex;gap:20px;overflow-x:auto;padding-bottom:10px}';
h += '.gallery::-webkit-scrollbar{height:8px}';
h += '.gallery::-webkit-scrollbar-track{background:#f1f1f1;border-radius:10px}';
h += '.gallery::-webkit-scrollbar-thumb{background:#667eea;border-radius:10px}';
h += '.gallery-item{background:#f9f9f9;border-radius:10px;overflow:hidden;cursor:pointer;transition:transform 0.3s;flex:0 0 250px}';
h += '.gallery-item:hover{transform:translateY(-5px);box-shadow:0 8px 16px rgba(0,0,0,0.2)}';
h += '.img-cont{height:300px;background:white;display:flex;align-items:center;justify-content:center;padding:15px}';
h += '.gallery-item img{max-width:100%;max-height:100%;object-fit:contain}';
h += '.info{padding:15px}';
h += '.name{font-weight:600;color:#667eea;margin-bottom:5px}';
h += '.file{font-size:0.85rem;color:#999;margin-bottom:10px}';
h += '.info a{display:inline-block;padding:8px 15px;background:#667eea;color:white;text-decoration:none;border-radius:5px;font-size:0.85rem}';
h += '.info a:hover{background:#764ba2}';
h += 'footer{text-align:center;margin-top:60px;padding-top:30px;border-top:2px solid #f0f0f0;color:#666}';
h += '.github-link{color:#667eea;text-decoration:none;font-weight:600}';
h += '.github-link:hover{text-decoration:underline}';
h += '.modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.9);justify-content:center;align-items:center}';
h += '.modal.active{display:flex}';
h += '.modal-content{max-width:90%;max-height:90%}';
h += '.close-modal{position:absolute;top:20px;right:40px;color:white;font-size:40px;cursor:pointer}';
h += '</style></head><body><div class="container">';
h += '<header><h1>カバーアートギャラリー</h1>';
h += '<p class="intro">この画像はCC0（パブリックドメイン）で提供されているので自由に利用ができます。<br>';
h += 'もしクレジットが必要なら<a href="https://storiatelier.net/" target="_blank">すとりあとりえ</a>にリンクしてね。</p>';
h += '</header>';
h += genSections(portraitPatterns, '📱 縦長デザイン（800×1200）');
h += genSections(landscapePatterns, '🖼️ 横長デザイン（1200×800）');
h += '<footer><p><a href="https://github.com/storiAtelier/CoverArts" class="github-link">📦 GitHub Repository</a></p></footer></div>';
h += '<div id="modal" class="modal" onclick="closeModal()"><span class="close-modal">&times;</span><img id="modal-image" class="modal-content"></div>';
h += '<script>function openModal(s){document.getElementById("modal").classList.add("active");document.getElementById("modal-image").src=s}function closeModal(){document.getElementById("modal").classList.remove("active")}document.addEventListener("keydown",function(e){if(e.key==="Escape")closeModal()})</script></body></html>';

fs.writeFileSync(GALLERY_FILE, h, 'utf8');
console.log('Generated: ' + GALLERY_FILE + ' (' + pngFiles.length + ' images)');
