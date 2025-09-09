// ===================== Prize Management System =====================
// 預設獎品資料
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

// SVG 顏色表
const colorList = [
  "#42A5F5","#FB8C00","#8BC34A","#E53935","#AB47BC",
  "#7E57C2","#26A69A","#F44336","#1976D2","#FFB300",
  "#C62828","#43A047","#283593","#EC407A","#009688","#616161"
];

// 預設SVG圖片
function getPrizeSVG(name,i) {
  const color = colorList[i % colorList.length];
  return `data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect fill="${color}" width="100" height="100"/><text x="50" y="55" font-size="19" font-family="Arial" fill="white" text-anchor="middle">${name}</text></svg>`;
}

// 全局狀態
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
      <!-- 頂部 -->
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
        <!-- 統計卡片 -->
        <div class="stats-section">
          <div class="stat-card">
            <h3 id="totalPrizes">${DATA.prizes.length}</h3>
            <p>總獎品數</p>
          </div>
        </div>
        <!-- 操作 -->
        <div class="actions-section">
          <div class="sort-info">
            <span class="sort-indicator">🔄 自動按分數排序（由小到大）</span>
          </div>
          <div class="action-buttons">
            <button class="btn btn--primary btn--lg" id="addPrizeBtn">➕ 新增獎品</button>
            <button class="btn btn--secondary btn--lg" id="clearAllBtn">🗑️ 清空所有</button>
          </div>
        </div>
        <!-- 表格 -->
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
    .map(prize=>`
      <tr>
        <td><img src="${prize.image}" alt="${prize.name}" style="width:50px;height:50px;border-radius:4px;object-fit:cover"></td>
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
  document.getElementById("printBtn").onclick = printPoster;
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

// ====== Modal + Canvas裁剪 ======
function showEditModal(prize=null) {
  const isEdit = !!prize;
  let cropedImage = prize ? prize.image : '';
  const iColor = prize ? DATA.prizes.findIndex(p=>p.id===prize.id)%colorList.length : 0;
  const tmpDefaultImg = prize ? prize.image : getPrizeSVG("獎品",iColor);

  document.getElementById('modal').innerHTML = `
  <div class="modal-overlay" style="display:flex">
    <div class="modal-content modal-large">
      <div class="modal-header">
        <h3>${isEdit?'編輯獎品':'新增獎品'}</h3>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <form id="editForm">
        <div class="form-group">
          <label>名稱*</label>
          <input id="e_name" type="text" value="${prize?prize.name:""}" required />
        </div>
        <div class="form-group">
          <label>描述</label>
          <input id="e_desc" type="text" value="${prize?prize.description:""}" />
        </div>
        <div class="form-group">
          <label>分數*</label>
          <input id="e_points" type="number" value="${prize?prize.points:""}" required min="1" />
        </div>
        <div class="form-group">
          <label>獎品圖片</label>
          <input type="file" id="e_img" accept="image/*"/>
          <div>
            <canvas id="cropCanvas" style="display:none;border:1px solid #aaa;margin:8px 0;max-width:230px"></canvas>
            <img id="imgPreview" src="${tmpDefaultImg}" style="width:80px;border-radius:6px;margin:7px 0">
          </div>
          <div style="margin-top:3px;">
            <label>裁剪比例：</label>
            <select id="cropRatio">
              <option value="1">正方形 1:1</option>
              <option value="1.33">4:3</option>
              <option value="0.75">3:4</option>
            </select>
            <button type="button" class="btn btn--sm" id="applyCrop">確認裁剪</button>
          </div>
        </div>
        <div style="text-align:right">
          <button class="btn btn--secondary" type="button" onclick="closeModal()">取消</button>
          <button class="btn btn--primary" type="submit">${isEdit?'儲存變更':'新增獎品'}</button>
        </div>
      </form>
    </div>
  </div>
  `;
  document.getElementById('modal').classList.remove('hidden');

  // canvas裁剪
  let imgData=null, loadedImg=null, startX=0, startY=0, isDown=false, cropBox={x:0,y:0,w:100,h:100};
  let ratio=1, scale=1;

  const imgInput=document.getElementById('e_img');
  const canvas=document.getElementById('cropCanvas');
  const ctx=canvas.getContext('2d');
  const cropRatioSelect=document.getElementById('cropRatio');
  let showImage=(img)=>{
    loadedImg=img;
    // 計算比例與顯示框大小
    scale = Math.min(230/img.width,230/img.height,1);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    // 預設裁剪框
    ratio = +cropRatioSelect.value;
    let minDim = Math.min(canvas.width, canvas.height);
    cropBox = {
      w: Math.round(minDim*0.7),
      h: Math.round(minDim*0.7/ratio),
      x: Math.round((canvas.width-minDim*0.7)/2),
      y: Math.round((canvas.height-minDim*0.7/ratio)/2)
    };
    redraw();
    canvas.style.display="";
  };
  cropRatioSelect.onchange = () => {
    if(loadedImg) showImage(loadedImg);
  };

  function redraw(){
    // 畫全圖
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(loadedImg,0,0,loadedImg.width,loadedImg.height,0,0,canvas.width,canvas.height);
    // 畫方框
    ctx.save();
    ctx.strokeStyle="#1976d2";
    ctx.lineWidth=2;
    ctx.strokeRect(cropBox.x,cropBox.y,cropBox.w,cropBox.h);
    ctx.restore();
  }

  // canvas拖拉裁切框
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
    // 計算原圖裁剪座標
    let rx = cropBox.x/scale, ry = cropBox.y/scale, rw = cropBox.w/scale, rh = cropBox.h/scale;
    let newC=document.createElement('canvas');
    newC.width=rw; newC.height=rh;
    newC.getContext('2d').drawImage(loadedImg,rx,ry,rw,rh,0,0,rw,rh);
    let cropBase64 = newC.toDataURL("image/png");
    document.getElementById('imgPreview').src = cropBase64;
    cropedImage = cropBase64;
  };

  imgInput.onchange = function(e){
    const file = e.target.files[0];
    if(!file) return;
    const r = new FileReader();
    r.onload = function(ev){
      let img=new window.Image();
      img.onload = function(){
        imgData=ev.target.result;
        showImage(img);
      };
      img.src = ev.target.result;
    };
    r.readAsDataURL(file);
  };

  // Submit
  document.getElementById('editForm').onsubmit = function(e){
    e.preventDefault();
    const n = document.getElementById('e_name').value.trim();
    const d = document.getElementById('e_desc').value.trim();
    const p = Number(document.getElementById('e_points').value)||1;
    const img = (cropedImage ? cropedImage : document.getElementById('imgPreview').src);
    if(!n){alert("必填名稱"); return;}
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
function printPoster(){
  const posterHtml = `
    <div style="padding:40px;">
      <h1 style="text-align:center;">${DATA.title}</h1>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:40px;">
        ${DATA.prizes.sort((a,b)=>a.points-b.points).map(
          p=>`
          <div style="page-break-inside:avoid;border:2px solid #eee;border-radius:12px;padding:18px;text-align:center;background:#fff;">
            <img src="${p.image}" style="width:150px;height:150px;object-fit:cover;border-radius:8px;"><br>
            <div style="font-size:1.3em;font-weight:bold;">${p.name}</div>
            <div style="color:#666;height:32px;">${p.description||""}</div>
            <div style="color:#1976D2;font-size:1.2em;margin-top:5px;">${p.points} 分</div>
          </div>`
        ).join("")}
      </div>
    </div>
  `;
  const win = window.open("","","width=900,height=1200");
  win.document.write(`
    <html>
      <head>
        <title>列印獎品海報</title>
        <style>
          body { margin:0; font-family:'Arial',sans-serif; background:#fff;}
          h1 { margin-bottom:30px;}
          @media print {
            body,html {background:#fff;}
            h1 { page-break-before: avoid; margin-top:0;}
            div[style*="page-break-inside:avoid"] { page-break-inside:avoid;}
          }
        </style>
      </head>
      <body>${posterHtml}</body>
      <script>setTimeout(()=>window.print(),200);<\/script>
    </html>
  `);
  win.document.close();
}
document.addEventListener("DOMContentLoaded", render);
// ===================== END =====================
