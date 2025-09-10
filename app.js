// ===================== Prize Management System =====================
const defaultPrizes = [
  { name: "鎖匙扣", points: 5 },
  { name: "小盲盒", points: 5 },
  { name: "八達通套", points: 10 },
  { name: "Lego", points: 10 },
  { name: "精品文具", points: 20 },
  { name: "文具套裝", points: 40 },
  { name: "遊戲機", points: 40 },
  { name: "玩具", points: 50 },
  { name: "模型", points: 50 },
  { name: "公仔", points: 70 },
  { name: "模型", points: 70 },
  { name: "公仔", points: 80 },
  { name: "公仔", points: 90 },
  { name: "公仔", points: 150 },
  { name: "公仔", points: 150 },
  { name: "公仔", points: 200 }
];
const colorList = [
  "#42A5F5","#FB8C00","#8BC34A","#E53935","#AB47BC",
  "#7E57C2","#26A69A","#F44336","#1976D2","#FFB300",
  "#C62828","#43A047","#283593","#EC407A","#009688","#616161"
];
function getPrizeSVG(name,i) {
  const color = colorList[i % colorList.length];
  return `data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect fill="${color}" width="100" height="100"/><text x="50" y="55" font-size="19" font-family="Arial" fill="white" text-anchor="middle">${name}</text></svg>`;
}

// ====== 本地儲存功能 ======
function saveToLocal() {
  try {
    localStorage.setItem('prizeManagementData', JSON.stringify(DATA));
  } catch(e) {
    console.warn('無法保存到本地儲存:', e);
  }
}

function loadFromLocal() {
  try {
    const saved = localStorage.getItem('prizeManagementData');
    if (saved) {
      const parsedData = JSON.parse(saved);
      if (parsedData.title && Array.isArray(parsedData.prizes)) {
        DATA.title = parsedData.title;
        DATA.prizes = parsedData.prizes.map((x,i)=>({
          id: x.id || i+1,
          name: x.name || `獎品${i+1}`,
          description: x.description || "",
          points: Number(x.points) || 1,
          image: x.image || getPrizeSVG(x.name || `獎品${i+1}`, i)
        }));
        DATA.nextId = parsedData.nextId || (DATA.prizes.reduce((max,p)=>Math.max(max,p.id),0)+1);
        return true;
      }
    }
  } catch(e) {
    console.warn('無法從本地儲存載入:', e);
  }
  return false;
}

let DATA = {
  title: "示範學校 - 獎品兌換清單",
  prizes: defaultPrizes.map((x,i)=>({
    id: i+1,
    name: x.name,
    description: "",
    points: x.points,
    image: getPrizeSVG(x.name,i)
  })),
  nextId: 17
};

if (!loadFromLocal()) {
  saveToLocal();
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="main-system">
      <nav class="navbar">
        <div class="navbar__content container">
          <div class="navbar__title">
            <input type="text" class="system-title-input" id="systemTitle" value="${DATA.title}" />
          </div>
          <div class="navbar__actions">
            <button id="exportBtn" class="btn btn--secondary">📤 匯出資料</button>
            <button id="importBtn" class="btn btn--secondary">📥 匯入資料</button>
            <input id="importFile" style="display:none" type="file" accept=".json"/>
            <button id="printBtn" class="btn btn--primary">🖨️ 列印</button>
          </div>
        </div>
      </nav>
      <div class="main-content container">
        <div class="stats-section">
          <div class="stat-card">
            <h3 id="totalPrizes">${DATA.prizes.length}</h3>
            <p>總獎品數</p>
          </div>
        </div>
        <div class="actions-section">
          <div class="sort-info">
            <span class="sort-indicator">🔄 自動按分數排序（由小到大）</span>
          </div>
          <div class="action-buttons">
            <button class="btn btn--primary btn--lg" id="addPrizeBtn">➕ 新增獎品</button>
            <button class="btn btn--secondary btn--lg" id="clearAllBtn">🗑️ 清空所有</button>
          </div>
        </div>
        <div class="table-section">
          <table class="prizes-table">
            <thead>
              <tr>
                <th width="80">圖片</th>
                <th>名稱</th>
                <th>描述</th>
                <th width="100">分數</th>
                <th width="120">操作</th>
              </tr>
            </thead>
            <tbody id="prizesTableBody">
              ${getPrizesRows()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="modal" class="modal hidden"></div>
  `;
  bind();
}

function getPrizesRows() {
  if (DATA.prizes.length === 0) {
    return `<tr><td colspan="5" class="no-data">請新增獎品…</td></tr>`;
  }
  return DATA.prizes
    .sort((a,b)=>a.points-b.points)
    .map(prize => {
      // 徹底解決圖片顯示問題
      let imgCell = '';
      if (prize.image && typeof prize.image === 'string' && prize.image.trim().startsWith('data:image/')) {
        // 有效的base64圖片
        imgCell = `<img src="${prize.image}" style="width:50px;height:50px;border-radius:4px;object-fit:cover;">`;
      } else {
        // 無圖片時顯示空的div
        imgCell = `<div style="width:50px;height:50px;border-radius:4px;background:#f6f6f6;border:1px solid #e0e0e0;"></div>`;
      }
      
      return `
        <tr>
          <td>${imgCell}</td>
          <td class="prize-name">${prize.name||''}</td>
          <td class="prize-description">${prize.description||""}</td>
          <td class="prize-points">${prize.points||''}</td>
          <td>
            <div class="prize-actions">
              <button class="btn btn--sm btn--secondary" onclick="editPrize(${prize.id})">編輯</button>
              <button class="btn btn--sm btn--danger" onclick="deletePrize(${prize.id})">刪除</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
}

function bind() {
  document.getElementById("systemTitle").oninput = function(){
    DATA.title = this.value;
    document.title = this.value;
    saveToLocal();
  };
  document.getElementById("addPrizeBtn").onclick = ()=>showEditModal();
  document.getElementById("clearAllBtn").onclick = ()=>{
    if(confirm("確定清空所有獎品？此操作無法復原！")) {
      DATA.prizes = [];
      saveToLocal();
      render();
    }
  };
  document.getElementById("exportBtn").onclick = exportData;
  document.getElementById("importBtn").onclick = ()=>document.getElementById("importFile").click();
  document.getElementById("importFile").onchange = function() {
    if(this.files[0]) importData(this.files[0]);
    this.value = "";
  };
  document.getElementById("printBtn").onclick = showPrintModal;
}

window.editPrize = function(id) {
  const prize = DATA.prizes.find(p=>p.id===id);
  showEditModal(prize);
};

window.deletePrize = function(id) {
  if(confirm("確定要刪除？")) {
    DATA.prizes = DATA.prizes.filter(p=>p.id!==id);
    saveToLocal();
    render();
  }
};

function showEditModal(prize=null) {
  const isEdit = !!prize;
  const iColor = prize ? DATA.prizes.findIndex(p=>p.id===prize.id)%colorList.length : 0;
  const defaultImg = prize ? prize.image : getPrizeSVG("獎品",iColor);
  
  let croppedImage = prize ? prize.image : defaultImg;
  
  document.getElementById('modal').innerHTML = `
    <div class="modal-content modal-large" style="background:white;border-radius:12px;max-width:800px;width:90%;margin:50px auto;padding:0;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
      <div class="modal-header" style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:20px 30px;border-radius:12px 12px 0 0;display:flex;justify-content:space-between;align-items:center;">
        <h3 style="margin:0;font-size:20px;">${isEdit?'編輯獎品':'新增獎品'}</h3>
        <button onclick="closeModal()" style="background:rgba(255,255,255,0.2);border:none;border-radius:50%;width:32px;height:32px;color:white;cursor:pointer;font-size:18px;">×</button>
      </div>
      <div class="modal-body" style="padding:30px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;">
          <div>
            <div style="margin-bottom:20px;">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:#333;">獎品名稱 *</label>
              <input id="e_name" type="text" value="${prize?prize.name:""}" required placeholder="請輸入獎品名稱" style="width:100%;padding:12px;border:2px solid #e1e5e9;border-radius:8px;font-size:15px;" />
            </div>
            <div style="margin-bottom:20px;">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:#333;">描述 (可選)</label>
              <textarea id="e_desc" placeholder="請輸入獎品描述..." style="width:100%;padding:12px;border:2px solid #e1e5e9;border-radius:8px;font-size:15px;min-height:80px;resize:vertical;">${prize?prize.description:""}</textarea>
            </div>
            <div style="margin-bottom:20px;">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:#333;">所需分數 *</label>
              <input id="e_points" type="number" value="${prize?prize.points:""}" required min="1" placeholder="請輸入所需分數" style="width:100%;padding:12px;border:2px solid #e1e5e9;border-radius:8px;font-size:15px;" />
            </div>
          </div>
          <div>
            <label style="display:block;margin-bottom:8px;font-weight:600;color:#333;">獎品圖片</label>
            <div style="background:#f8f9fa;border-radius:12px;padding:20px;border:2px dashed #dee2e6;">
              <input type="file" id="e_img" accept="image/*" style="margin-bottom:10px;width:100%;" />
              <div style="text-align:center;margin:15px 0;">
                <img id="imgPreview" src="${defaultImg}" alt="預覽" style="max-width:200px;max-height:200px;border-radius:8px;border:1px solid #dee2e6;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
              </div>
              <div id="cropSection" style="display:none;background:white;border-radius:8px;padding:15px;margin-top:15px;border:1px solid #dee2e6;">
                <canvas id="cropCanvas" style="border:2px solid #1976d2;border-radius:4px;cursor:move;max-width:100%;"></canvas>
                <div style="margin-top:10px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
                  <label>裁剪比例：</label>
                  <select id="cropRatio" style="padding:6px;border-radius:4px;border:1px solid #dee2e6;">
                    <option value="1">正方形 1:1</option>
                    <option value="1.33">橫向 4:3</option>
                    <option value="0.75">直向 3:4</option>
                  </select>
                  <button type="button" id="applyCrop" style="padding:6px 12px;background:#1976d2;color:white;border:none;border-radius:4px;cursor:pointer;">確認裁剪</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer" style="padding:20px 30px;background:#f8f9fa;border-radius:0 0 12px 12px;text-align:right;">
        <button onclick="closeModal()" style="padding:10px 20px;margin-right:10px;background:#6c757d;color:white;border:none;border-radius:7px;cursor:pointer;">取消</button>
        <button id="saveBtn" style="padding:10px 20px;background:#1976d2;color:white;border:none;border-radius:7px;cursor:pointer;">${isEdit?'儲存獎品':'新增獎品'}</button>
      </div>
    </div>
  `;
  
  document.getElementById('modal').classList.remove('hidden');
  
  setupImageCropping();
  
  document.getElementById('saveBtn').onclick = function() {
    const n = document.getElementById('e_name').value.trim();
    const d = document.getElementById('e_desc').value.trim();
    const p = Number(document.getElementById('e_points').value)||1;
    const img = croppedImage;
    
    if(!n){alert("請填寫獎品名稱"); return;}
    if(!Number.isFinite(p)||p<1){alert("分數必填且>=1"); return;}
    
    if(isEdit) {
      prize.name=n; prize.description=d; prize.points=p; prize.image=img;
    } else {
      DATA.prizes.push({id:DATA.nextId++,name:n,description:d,points:p,image:img});
    }
    
    saveToLocal();
    closeModal();
    render();
  };
  
  function setupImageCropping() {
    let loadedImg=null, startX=0, startY=0, isDown=false, cropBox={x:0,y:0,w:100,h:100};
    let scale=1;
    
    const imgInput=document.getElementById('e_img');
    const canvas=document.getElementById('cropCanvas');
    const ctx=canvas.getContext('2d');
    const cropSection=document.getElementById('cropSection');
    const cropRatioSelect=document.getElementById('cropRatio');
    const imgPreview=document.getElementById('imgPreview');
    
    function showImage(img) {
      loadedImg=img;
      scale = Math.min(300/img.width, 300/img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      let ratio = +cropRatioSelect.value;
      let minDim = Math.min(canvas.width, canvas.height);
      cropBox = {
        w: Math.round(minDim*0.8),
        h: Math.round(minDim*0.8/ratio),
        x: Math.round((canvas.width-minDim*0.8)/2),
        y: Math.round((canvas.height-minDim*0.8/ratio)/2)
      };
      
      redraw();
      cropSection.style.display = "block";
    }
    
    function redraw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(loadedImg,0,0,loadedImg.width,loadedImg.height,0,0,canvas.width,canvas.height);
      
      ctx.save();
      ctx.strokeStyle="#1976d2";
      ctx.lineWidth=3;
      ctx.strokeRect(cropBox.x,cropBox.y,cropBox.w,cropBox.h);
      ctx.fillStyle="rgba(25,118,210,0.1)";
      ctx.fillRect(cropBox.x,cropBox.y,cropBox.w,cropBox.h);
      ctx.restore();
    }
    
    cropRatioSelect.onchange = () => {
      if(loadedImg) showImage(loadedImg);
    };
    
    canvas.onmousedown=function(e){
      let x=e.offsetX, y=e.offsetY;
      if(x>=cropBox.x && x<=cropBox.x+cropBox.w && y>=cropBox.y && y<=cropBox.y+cropBox.h){
        isDown=true;
        startX=x-cropBox.x; startY=y-cropBox.y;
      }
    };
    
    canvas.onmousemove=function(e){
      if(!isDown) return;
      let x=e.offsetX-startX, y=e.offsetY-startY;
      x=Math.max(0,Math.min(x,canvas.width-cropBox.w));
      y=Math.max(0,Math.min(y,canvas.height-cropBox.h));
      cropBox.x=x; cropBox.y=y; redraw();
    };
    
    document.onmouseup=function(){ isDown=false; };
    
    document.getElementById('applyCrop').onclick = function() {
      if(!loadedImg) return;
      let rx = cropBox.x/scale, ry = cropBox.y/scale, rw = cropBox.w/scale, rh = cropBox.h/scale;
      let newC=document.createElement('canvas');
      newC.width=rw; newC.height=rh;
      newC.getContext('2d').drawImage(loadedImg,rx,ry,rw,rh,0,0,rw,rh);
      const croppedBase64 = newC.toDataURL("image/png");
      
      imgPreview.src = croppedBase64;
      croppedImage = croppedBase64;
      cropSection.style.display = "none";
    };
    
    imgInput.onchange = function(e){
      const file = e.target.files[0];
      if(!file) return;
      const r = new FileReader();
      r.onload = function(ev){
        let img = new window.Image();
        img.onload = function(){
          showImage(img);
          imgPreview.src = ev.target.result;
          croppedImage = ev.target.result;
        };
        img.src = ev.target.result;
      };
      r.readAsDataURL(file);
    };
  }
}

// ====== 完整列印Modal ======
function showPrintModal() {
  document.getElementById('modal').innerHTML = `
  <div class="modal-content modal-xlarge" style="background:white;border-radius:12px;max-width:1000px;width:95%;margin:30px auto;padding:0;box-shadow:0 15px 35px rgba(0,0,0,0.3);">
    <div class="modal-header" style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:20px 30px;border-radius:12px 12px 0 0;display:flex;justify-content:space-between;align-items:center;">
      <h3 style="margin:0;font-size:20px;">列印設定</h3>
      <button onclick="closeModal()" style="background:rgba(255,255,255,0.2);border:none;border-radius:50%;width:32px;height:32px;color:white;cursor:pointer;font-size:18px;">×</button>
    </div>
    <div class="modal-body" style="padding:30px;">
      <div class="print-options" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:20px;">
        <div class="option-group" style="background:white;padding:15px;border-radius:8px;border:1px solid #dee2e6;">
          <h4 style="margin-bottom:10px;color:#333;font-size:14px;">列印模式</h4>
          <div class="radio-group" style="display:flex;flex-direction:column;gap:8px;">
            <label class="radio-option" style="display:flex;align-items:center;gap:8px;cursor:pointer;">
              <input type="radio" name="printMode" value="poster" checked style="margin:0;">
              <span>海報模式 (大圖片)</span>
            </label>
            <label class="radio-option" style="display:flex;align-items:center;gap:8px;cursor:pointer;">
              <input type="radio" name="printMode" value="list" style="margin:0;">
              <span>清單模式</span>
            </label>
          </div>
        </div>
        <div class="option-group" style="background:white;padding:15px;border-radius:8px;border:1px solid #dee2e6;">
          <h4 style="margin-bottom:10px;color:#333;font-size:14px;">圖片大小</h4>
          <select id="imageSize" style="width:100%;padding:8px;border-radius:4px;border:1px solid #dee2e6;">
            <option value="150">標準 (150px)</option>
            <option value="200" selected>大 (200px)</option>
            <option value="250">超大 (250px)</option>
          </select>
        </div>
        <div class="option-group" style="background:white;padding:15px;border-radius:8px;border:1px solid #dee2e6;">
          <h4 style="margin-bottom:10px;color:#333;font-size:14px;">每行顯示</h4>
          <select id="columnsPerRow" style="width:100%;padding:8px;border-radius:4px;border:1px solid #dee2e6;">
            <option value="2">2個獎品</option>
            <option value="3" selected>3個獎品</option>
            <option value="4">4個獎品</option>
          </select>
        </div>
      </div>
      <div class="print-preview" id="printPreview" style="background:#f8f9fa;border-radius:8px;padding:20px;max-height:400px;overflow-y:auto;border:1px solid #dee2e6;">
        ${generatePrintPreview()}
      </div>
    </div>
    <div class="modal-footer" style="padding:20px 30px;background:#f8f9fa;border-radius:0 0 12px 12px;text-align:right;">
      <button onclick="closeModal()" style="padding:10px 20px;margin-right:10px;background:#6c757d;color:white;border:none;border-radius:7px;cursor:pointer;">取消</button>
      <button onclick="executePrint()" style="padding:10px 20px;background:#1976d2;color:white;border:none;border-radius:7px;cursor:pointer;">🖨️ 列印</button>
    </div>
  </div>
  `;
  document.getElementById('modal').classList.remove('hidden');
  
  // 綁定預覽更新事件
  ['printMode', 'imageSize', 'columnsPerRow'].forEach(name => {
    document.addEventListener('change', function(e) {
      if(e.target.name === 'printMode' || e.target.id === 'imageSize' || e.target.id === 'columnsPerRow') {
        document.getElementById('printPreview').innerHTML = generatePrintPreview();
      }
    });
  });
}

function generatePrintPreview() {
  const mode = document.querySelector('input[name="printMode"]:checked')?.value || 'poster';
  const imageSize = document.getElementById('imageSize')?.value || '200';
  const columns = document.getElementById('columnsPerRow')?.value || '3';
  
  if(mode === 'poster') {
    return `
      <div class="poster-preview" style="display:grid;gap:20px;grid-template-columns:repeat(${columns}, 1fr);">
        ${DATA.prizes.sort((a,b)=>a.points-b.points).map(p=>`
          <div class="poster-item" style="background:white;border:2px solid #1976d2;border-radius:12px;padding:15px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            <img src="${p.image}" style="width:${imageSize}px;height:${imageSize}px;object-fit:cover;border-radius:8px;margin-bottom:10px;">
            <h4 style="font-size:16px;margin-bottom:5px;color:#333;">${p.name}</h4>
            <p style="font-size:12px;color:#666;margin-bottom:8px;min-height:32px;">${p.description||'無描述'}</p>
            <div class="points" style="font-size:18px;font-weight:bold;color:#1976d2;">${p.points} 分</div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    return `
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f0f0f0;">
            <th style="border:1px solid #ddd;padding:8px;">圖片</th>
            <th style="border:1px solid #ddd;padding:8px;">名稱</th>
            <th style="border:1px solid #ddd;padding:8px;">描述</th>
            <th style="border:1px solid #ddd;padding:8px;">分數</th>
          </tr>
        </thead>
        <tbody>
          ${DATA.prizes.sort((a,b)=>a.points-b.points).map(p=>`
            <tr>
              <td style="border:1px solid #ddd;padding:8px;text-align:center;">
                <img src="${p.image}" style="width:${Math.min(+imageSize,80)}px;height:${Math.min(+imageSize,80)}px;object-fit:cover;">
              </td>
              <td style="border:1px solid #ddd;padding:8px;">${p.name}</td>
              <td style="border:1px solid #ddd;padding:8px;">${p.description||'無描述'}</td>
              <td style="border:1px solid #ddd;padding:8px;text-align:center;font-weight:bold;">${p.points} 分</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}

function executePrint() {
  const mode = document.querySelector('input[name="printMode"]:checked').value;
  const imageSize = document.getElementById('imageSize').value;
  const columns = document.getElementById('columnsPerRow').value;
  
  const printContent = document.getElementById('printPreview').innerHTML;
  const win = window.open("","","width=900,height=1200");
  win.document.write(`
    <html>
      <head>
        <title>列印 - ${DATA.title}</title>
        <style>
          body { margin:0; padding:20px; font-family:'Microsoft JhengHei',Arial,sans-serif; }
          h1 { text-align:center; margin-bottom:20px; }
          .poster-preview { display:grid; gap:20px; grid-template-columns:repeat(${columns}, 1fr); }
          .poster-item { page-break-inside:avoid; border:2px solid #1976d2; border-radius:8px; padding:15px; text-align:center; }
          .poster-item img { border-radius:4px; margin-bottom:10px; }
          .poster-item h4 { margin:5px 0; }
          .poster-item p { margin:5px 0; color:#666; }
          .points { font-size:18px; font-weight:bold; color:#1976d2; }
          table { width:100%; border-collapse:collapse; }
          th,td { border:1px solid #ddd; padding:8px; }
          th { background:#f0f0f0; font-weight:bold; }
          @media print {
            .poster-item { page-break-inside:avoid; }
          }
        </style>
      </head>
      <body>
        <h1>${DATA.title}</h1>
        <p style="text-align:center;color:#666;margin-bottom:30px">列印日期：${new Date().toLocaleDateString('zh-TW')}</p>
        ${printContent}
      </body>
      <script>setTimeout(()=>window.print(),300);<\/script>
    </html>
  `);
  win.document.close();
  closeModal();
}

window.closeModal = function(){
  document.getElementById('modal').classList.add('hidden');
};

function exportData(){
  const json = JSON.stringify({
    title: DATA.title,
    prizes: DATA.prizes,
    exportedAt: new Date().toISOString()
  },null,2);
  const blob = new Blob([json],{type:"application/json"});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `prizes_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

function importData(file){
  const reader = new FileReader();
  reader.onload = e=>{
    try {
      const obj = JSON.parse(e.target.result);
      if(!obj.prizes||!Array.isArray(obj.prizes)) throw new Error("格式錯誤");
      DATA.title=obj.title||DATA.title;
      DATA.prizes=obj.prizes.map((x,i)=>({
        id: x.id||i+1,
        name: x.name||`獎品${i+1}`,
        description: x.description||"",
        points: Number(x.points)||1,
        image: x.image||getPrizeSVG(x.name||`獎品${i+1}`,i)
      }));
      DATA.nextId=DATA.prizes.reduce((max,p)=>Math.max(max,p.id),0)+1;
      saveToLocal();
      alert("匯入成功！");
      render();
    }catch(err){
      alert("匯入失敗: "+err.message);
    }
  };
  reader.readAsText(file);
}

document.addEventListener("DOMContentLoaded", render);
// ===================== END =====================
