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
  "#42A5F5","#FB8C00","#8BC34A","#E53935","#AB47BC","#7E57C2","#26A69A","#F44336","#1976D2","#FFB300",
  "#C62828","#43A047","#283593","#EC407A","#009688","#616161"
];

function getPrizeSVG(name,i) {
  const color = colorList[i % colorList.length];
  return `data:image/svg+xml;utf8,<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg"><rect fill="${color}" height="100" width="100"></rect><text fill="white" font-family="Arial" font-size="19" text-anchor="middle" x="50" y="55">${name}</text></svg>`;
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
            <input class="system-title-input" id="systemTitle" type="text" value="${DATA.title}"/>
          </div>
          <div class="navbar__actions">
            <button class="btn btn--secondary" id="exportBtn">📤 匯出資料</button>
            <button class="btn btn--secondary" id="importBtn">📥 匯入資料</button>
            <input accept=".json" id="importFile" style="display:none" type="file"/>
            <button class="btn btn--primary" id="printBtn">🖨️ 列印</button>
          </div>
        </div>
      </nav>
      <div class="main-content container">
        <div class="stats-section">
          <div class="stat-card">
            <h3 id="totalPrizes">${DATA.prizes.length}</h3>
            總獎品數
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
    <div class="modal hidden" id="modal"></div>
  `;
  bind();
}

function getPrizesRows() {
  if (DATA.prizes.length === 0) {
    return `<tr><td class="no-data" colspan="5">請新增獎品…</td></tr>`;
  }
  return DATA.prizes
    .sort((a, b) => a.points - b.points)
    .map(prize => {
      let img = '';
      if (typeof prize.image === 'string' && prize.image.trim().startsWith('data:image/')) {
        img = `<td><img src="${prize.image}" alt="${prize.name||''}" style="width:50px;height:50px;border-radius:4px;object-fit:cover;background:#f6f6f6;"/></td>`;
      } else {
        img = `<td><div style="width:50px;height:50px;border-radius:4px;background:#f6f6f6;"></div></td>`;
      }
      return `
      <tr>
        ${img}
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
  };
  document.getElementById("addPrizeBtn").onclick = ()=>alert("新增/編輯功能示範請見完整版demo");
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
  document.getElementById("printBtn").onclick = ()=>alert('列印功能僅推薦電腦瀏覽器使用。');
}

window.editPrize = function(id) {
  alert("編輯功能請見完整版demo");
};

window.deletePrize = function(id) {
  if(confirm("確定要刪除？")) {
    DATA.prizes = DATA.prizes.filter(p=>p.id!==id);
    render();
  }
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
