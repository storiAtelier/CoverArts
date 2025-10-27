import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '../output');
const GALLERY_FILE = path.join(__dirname, '../index.html');

const pngFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png')).sort();
const patterns = {
  'pattern1': { name: 'Pattern 1 - Geometric (Portrait)', files: [] },
  'pattern1-wide': { name: 'Pattern 1 - Geometric (Landscape)', files: [] },
  'pattern2': { name: 'Pattern 2 - Minimal Lines', files: [] },
  'pattern3': { name: 'Pattern 3 - Gradient Wave', files: [] },
  'pattern4': { name: 'Pattern 4 - Book Frame', files: [] },
  'pattern5': { name: 'Pattern 5 - Bookshelf (Portrait)', files: [] },
  'pattern5-wide': { name: 'Pattern 5 - Bookshelf (Landscape)', files: [] }
};

pngFiles.forEach(f => {
  for (const k of Object.keys(patterns)) {
    if (f.startsWith(k)) { patterns[k].files.push(f); break; }
  }
});

function getColorLabel(fn) {
  const m = {'mono':'モノトーン','blue-pastel':'淡いブルー','blue':'濃いブルー','red-pastel':'淡いレッド','red':'濃いレッド','green-pastel':'淡いグリーン','green':'濃いグリーン','purple-pastel':'淡いパープル','purple':'濃いパープル'};
  for (const [k, v] of Object.entries(m)) { if (fn.includes('-'+k+'.png')) return v; }
  return fn.replace('.png', '');
}

function genSections() {
  let h = '';
  for (const [k, d] of Object.entries(patterns)) {
    if (d.files.length === 0) continue;
    h += '<section class="pattern-section"><div class="pattern-header"><h2>' + d.name + '</h2><span>' + d.files.length + '個</span></div><div class="gallery">';
    for (const f of d.files) {
      h += '<div class="gallery-item" onclick="openModal(\'output/'+f+'\')"><div class="img-cont"><img src="output/'+f+'" alt="'+f+'"></div><div class="info"><div class="name">'+getColorLabel(f)+'</div><div class="file">'+f+'</div><a href="output/'+f+'" download onclick="event.stopPropagation()">DL</a></div></div>';
    }
    h += '</div></section>';
  }
  return h;
}

let h = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>CoverArts Gallery</title><style>';
h += '*{margin:0;padding:0;box-sizing:border-box}';
h += 'body{font-family:sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px}';
h += '.container{max-width:1400px;margin:0 auto;background:white;border-radius:20px;padding:40px}';
h += 'h1{color:#667eea;text-align:center;margin-bottom:20px}';
h += '.stats{display:flex;justify-content:center;gap:20px;margin-bottom:40px}';
h += '.stat{background:#f5f7fa;padding:15px 25px;border-radius:10px;text-align:center}';
h += '.stat-number{font-size:2rem;font-weight:bold;color:#667eea}';
h += '.stat-label{color:#666;font-size:0.9rem}';
h += '.pattern-section{margin-bottom:40px}';
h += '.pattern-header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:15px 25px;border-radius:10px;margin-bottom:20px;display:flex;justify-content:space-between}';
h += '.gallery{display:flex;gap:20px;overflow-x:auto;padding-bottom:10px}';
h += '.gallery::-webkit-scrollbar{height:8px}';
h += '.gallery::-webkit-scrollbar-track{background:#f1f1f1;border-radius:10px}';
h += '.gallery::-webkit-scrollbar-thumb{background:#667eea;border-radius:10px}';
h += '.gallery-item{background:#f9f9f9;border-radius:10px;overflow:hidden;cursor:pointer;transition:transform 0.3s;flex:0 0 250px}';
h += '.gallery-item:hover{transform:translateY(-5px)}';
h += '.img-cont{height:300px;background:white;display:flex;align-items:center;justify-content:center;padding:15px}';
h += '.gallery-item img{max-width:100%;max-height:100%;object-fit:contain}';
h += '.info{padding:15px}';
h += '.name{font-weight:600;color:#667eea;margin-bottom:5px}';
h += '.file{font-size:0.85rem;color:#999;margin-bottom:10px}';
h += '.info a{display:inline-block;padding:8px 15px;background:#667eea;color:white;text-decoration:none;border-radius:5px;font-size:0.85rem}';
h += 'footer{text-align:center;margin-top:40px;padding-top:30px;border-top:2px solid #f0f0f0;color:#666}';
h += '.github-link{color:#667eea;text-decoration:none}';
h += '.modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.9);justify-content:center;align-items:center}';
h += '.modal.active{display:flex}';
h += '.modal-content{max-width:90%;max-height:90%}';
h += '.close-modal{position:absolute;top:20px;right:40px;color:white;font-size:40px;cursor:pointer}';
h += '</style></head><body><div class="container"><h1>🎨 CoverArts Gallery</h1><div class="stats">';
h += '<div class="stat"><div class="stat-number">'+Object.keys(patterns).length+'</div><div class="stat-label">パターン</div></div>';
h += '<div class="stat"><div class="stat-number">9</div><div class="stat-label">カラー</div></div>';
h += '<div class="stat"><div class="stat-number">'+pngFiles.length+'</div><div class="stat-label">デザイン総数</div></div>';
h += '</div>' + genSections();
h += '<footer><p><a href="https://github.com/storiAtelier/CoverArts" class="github-link">📦 GitHub Repository</a></p><p style="margin-top:10px">すべてのデザインはCC0（パブリックドメイン）で提供されています</p></footer></div>';
h += '<div id="modal" class="modal" onclick="closeModal()"><span class="close-modal">&times;</span><img id="modal-image" class="modal-content"></div>';
h += '<script>function openModal(s){document.getElementById("modal").classList.add("active");document.getElementById("modal-image").src=s}function closeModal(){document.getElementById("modal").classList.remove("active")}document.addEventListener("keydown",function(e){if(e.key==="Escape")closeModal()})</script></body></html>';

fs.writeFileSync(GALLERY_FILE, h, 'utf8');
console.log('Generated: ' + GALLERY_FILE + ' (' + pngFiles.length + ' images)');
