// 系統數據
let systemData = {
  systemTitle: "示範學校 - 獎品兌換清單",
  prizes: [
    {id: 1, name: "鎖匙扣", description: "", points: 5, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0ZGNkI2QiI+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPumOgcWpcj+PC90ZXh0Pjwvc3ZnPg=="},
    {id: 2, name: "小盲盒", description: "", points: 5, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzlDMjdCMCI+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPuWwj+eiujwvdGV4dD48L3N2Zz4="},
    {id: 3, name: "八達通套", description: "", points: 10, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzREQUE1NyI+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPuWFpWVODwvdGV4dD48L3N2Zz4="},
    {id: 4, name: "Lego", description: "", points: 10, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzQyODVGNCI+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjIwIiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkxlZ288L3RleHQ+PC9zdmc+"},
    {id: 5, name: "精品文具", description: "", points: 20, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0ZGOTgwMCI+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPua4rWXGPC90ZXh0Pjwvc3ZnPg=="}
  ],
  nextId: 17
};

function sortPrizesByPoints() {
  systemData.prizes.sort((a, b) => a.points - b.points);
}

function initSystem() {
  sortPrizesByPoints();
  bindEvents();
  renderPrizesTable();
  updateStats();
}

function bindEvents() {
  document.getElementById('systemTitle').addEventListener('input', function() {
    systemData.systemTitle = this.value;
  });
  document.getElementById('addPrizeBtn').addEventListener('click', () => showAddPrizeModal());
  document.getElementById('clearAllBtn').addEventListener('click', clearAllPrizes);
  document.getElementById('printBtn').addEventListener('click', () => window.print());
}

function updateStats() {
  document.getElementById('totalPrizes').textContent = systemData.prizes.length;
}

function renderPrizesTable() {
  const tbody = document.getElementById('prizesTableBody');
  tbody.innerHTML = systemData.prizes.map(prize => `
    <tr>
      <td><img src="${prize.image}" alt="${prize.name}" style="width:50px;height:50px;border-radius:4px;"></td>
      <td>${prize.name}</td>
      <td>${prize.description}</td>
      <td>${prize.points}</td>
      <td>
        <button onclick="editPrize(${prize.id})">編輯</button>
        <button onclick="deletePrize(${prize.id})">删除</button>
      </td>
    </tr>
  `).join('');
}

function deletePrize(id) {
  if(confirm('確定刪除？')) {
    systemData.prizes = systemData.prizes.filter(p => p.id !== id);
    renderPrizesTable();
    updateStats();
  }
}

function clearAllPrizes() {
  if(confirm('確定清空所有？')) {
    systemData.prizes = [];
    renderPrizesTable();
    updateStats();
  }
}

document.addEventListener('DOMContentLoaded', initSystem);
