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
    .map(prize => `
      <tr>
        <td>
          <img src="${prize.image}" alt="${prize.name}" style="width:50px;height:50px;border-radius:4px;object-fit:cover;">
        </td>
        <td class="prize-name">${prize.name}</td>
        <td class="prize-description">${prize.description||""}</td>
        <td class="prize-points">${prize.points}</td>
        <td>
          <div class="prize-actions">
            <button class="btn btn--sm btn--secondary" onclick="editPrize(${prize.id})">編輯</button>
            <button class="btn btn--sm btn--danger" onclick="deletePrize(${prize.id})">刪除</button>
          </div>
        </td>
      </tr>
    `).join("");
}


function bind() {
  document.getElementById("systemTitle").oninput = function(){
    DATA.title = this.value;
    document.title = this.value;
  };
  document.getElementById("addPrizeBtn").onclick = ()=>showEditModal();
  document.getElementById("clearAllBtn").onclick = ()=>{
    if(confirm("確定清空所有獎品？")) {
      DATA.prizes = [];
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
    render();
  }
};

// ====== 修正版編輯Modal ======
function showEditModal(prize=null) {
  const isEdit = !!prize;
  const iColor = prize ? DATA.prizes.findIndex(p=>p.id===prize.id)%colorList.length : 0;
  const defaultImg = prize ? prize.image : getPrizeSVG("獎品",iColor);

  // 使用物件來追蹤裁剪後的圖片
  const editState = {
    croppedImage: prize ? prize.image : defaultImg
  };

  document.getElementById('modal').innerHTML = `
  <div class="modal-content modal-large">
    <div class="modal-header">
      <h3>${isEdit?'編輯獎品':'新增獎品'}</h3>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">
      <form id="editForm">
        <div class="form-layout">
          <div class="form-left">
            <div class="form-group">
              <label>獎品名稱 *</label>
              <input id="e_name" type="text" value="${prize?prize.name:""}" required placeholder="請輸入獎品名稱" />
            </div>
            <div class="form-group">
              <label>描述 (可選)</label>
              <textarea id="e_desc" placeholder="請輸入獎品描述...">${prize?prize.description:""}</textarea>
            </div>
            <div class="form-group">
              <label>所需分數 *</label>
              <input id="e_points" type="number" value="${prize?prize.points:""}" required min="1" placeholder="請輸入所需分數" />
            </div>
          </div>
          <div class="form-right">
            <div class="form-group">
              <label>獎品圖片</label>
              <div class="image-upload-section">
                <input type="file" id="e_img" accept="image/*" style="margin-bottom:10px"/>
                <div class="image-preview">
                  <img id="imgPreview" src="${defaultImg}" alt="預覽">
                </div>
                <div class="crop-section" id="cropSection" style="display:none">
                  <canvas id="cropCanvas" class="crop-canvas"></canvas>
                  <div class="crop-controls">
                    <label>裁剪比例：</label>
                    <select id="cropRatio">
                      <option value="1">正方形 1:1</option>
                      <option value="1.33">橫向 4:3</option>
                      <option value="0.75">直向 3:4</option>
                    </select>
                    <button type="button" class="btn btn--sm btn--primary" id="applyCrop">確認裁剪</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" type="button" onclick="closeModal()">取消</button>
      <button class="btn btn--primary" type="button" id="saveBtn">${isEdit?'儲存獎品':'新增獎品'}</button>
    </div>
  </div>
  `;
  document.getElementById('modal').classList.remove('hidden');

  // Canvas裁剪功能
  setupImageCropping(editState);
  
  // 保存按鈕
  document.getElementById('saveBtn').onclick = function() {
    const n = document.getElementById('e_name').value.trim();
    const d = document.getElementById('e_desc').value.trim();
    const p = Number(document.getElementById('e_points').value)||1;
    const img = editState.croppedImage; // 使用修正後的圖片
    
    if(!n){alert("請填寫獎品名稱"); return;}
    if(!Number.isFinite(p)||p<1){alert("分數必填且>=1"); return;}
    
    if(isEdit) {
      prize.name=n; prize.description=d; prize.points=p; prize.image=img;
    } else {
      DATA.prizes.push({id:DATA.nextId++,name:n,description:d,points:p,image:img});
    }
    closeModal();
    render();
  };
}

function setupImageCropping(editState) {
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
  
  // 修正裁剪確認功能
  document.getElementById('applyCrop').onclick = function() {
    if(!loadedImg) return;
    let rx = cropBox.x/scale, ry = cropBox.y/scale, rw = cropBox.w/scale, rh = cropBox.h/scale;
    let newC=document.createElement('canvas');
    newC.width=rw; newC.height=rh;
    newC.getContext('2d').drawImage(loadedImg,rx,ry,rw,rh,0,0,rw,rh);
    const croppedBase64 = newC.toDataURL("image/png");
    
    // 更新預覽和狀態
    imgPreview.src = croppedBase64;
    editState.croppedImage = croppedBase64; // 正確更新到外層狀態
    
    // 隱藏裁剪區域
    cropSection.style.display = "none";
    
    console.log('裁剪完成，圖片已更新'); // 調試用
  };
  
  imgInput.onchange = function(e){
    const file = e.target.files[0];
    if(!file) return;
    const r = new FileReader();
    r.onload = function(ev){
      let img = new window.Image();
      img.onload = function(){
        showImage(img);
        // 同時更新預覽圖片
        imgPreview.src = ev.target.result;
        editState.croppedImage = ev.target.result;
      };
      img.src = ev.target.result;
    };
    r.readAsDataURL(file);
  };
}

// ====== 列印Modal ======
function showPrintModal() {
  document.getElementById('modal').innerHTML = `
  <div class="modal-content modal-xlarge">
    <div class="modal-header">
      <h3>列印設定</h3>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">
      <div class="print-options">
        <div class="option-group">
          <h4>列印模式</h4>
          <div class="radio-group">
            <label class="radio-option">
              <input type="radio" name="printMode" value="poster" checked>
              <span>海報模式 (大圖片)</span>
            </label>
            <label class="radio-option">
              <input type="radio" name="printMode" value="list">
              <span>清單模式</span>
            </label>
          </div>
        </div>
        <div class="option-group">
          <h4>圖片大小</h4>
          <select id="imageSize">
            <option value="150">標準 (150px)</option>
            <option value="200" selected>大 (200px)</option>
            <option value="250">超大 (250px)</option>
          </select>
        </div>
        <div class="option-group">
          <h4>每行顯示</h4>
          <select id="columnsPerRow">
            <option value="2">2個獎品</option>
            <option value="3" selected>3個獎品</option>
            <option value="4">4個獎品</option>
          </select>
        </div>
      </div>
      <div class="print-preview" id="printPreview">
        ${generatePrintPreview()}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn--secondary" onclick="closeModal()">取消</button>
      <button class="btn btn--primary" onclick="executePrint()">🖨️ 列印</button>
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
      <div class="poster-preview" style="grid-template-columns: repeat(${columns}, 1fr)">
        ${DATA.prizes.sort((a,b)=>a.points-b.points).map(p=>`
          <div class="poster-item">
            <img src="${p.image}" style="width:${imageSize}px;height:${imageSize}px">
            <h4>${p.name}</h4>
            <p>${p.description||'無描述'}</p>
            <div class="points">${p.points} 分</div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    return `
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:#f0f0f0">
            <th style="border:1px solid #ddd;padding:8px">圖片</th>
            <th style="border:1px solid #ddd;padding:8px">名稱</th>
            <th style="border:1px solid #ddd;padding:8px">描述</th>
            <th style="border:1px solid #ddd;padding:8px">分數</th>
          </tr>
        </thead>
        <tbody>
          ${DATA.prizes.sort((a,b)=>a.points-b.points).map(p=>`
            <tr>
              <td style="border:1px solid #ddd;padding:8px;text-align:center">
                <img src="${p.image}" style="width:${Math.min(+imageSize,80)}px;height:${Math.min(+imageSize,80)}px;object-fit:cover">
              </td>
              <td style="border:1px solid #ddd;padding:8px">${p.name}</td>
              <td style="border:1px solid #ddd;padding:8px">${p.description||'無描述'}</td>
              <td style="border:1px solid #ddd;padding:8px;text-align:center;font-weight:bold">${p.points} 分</td>
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
