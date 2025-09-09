// 系統數據
let systemData = {
  systemTitle: "示範學校 - 獎品兌換清單",
  prizes: [
    {
      id: 1,
      name: "鎖匙扣",
      description: "",
      points: 5,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY2QjZCIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4cHgiPumOgcWocaKJ</text></svg>"
    },
    {
      id: 2,
      name: "小盲盒",
      description: "",
      points: 5,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOUMyN0IwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4cHgiPuWwj+ebsuebizwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 3,
      name: "八達通套",
      description: "",
      points: 10,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNERBQTU3Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2cHgiPuWFq+mBlumAmuWll+A8L3RleHQ+Cjwvc3ZnPgo="
    },
    {
      id: 4,
      name: "Lego",
      description: "",
      points: 10,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDI4NUY0Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPkxlZ288L3RleHQ+Cjwvc3ZnPgo="
    },
    {
      id: 5,
      name: "精品文具",
      description: "",
      points: 20,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY5ODAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2cHgiPua4rea3lOaWhei0hzwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 6,
      name: "文具套裝",
      description: "",
      points: 40,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRUY0NDQ0Ci8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2cHgiPuaWhei0heWll+ijozwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 7,
      name: "遊戲機",
      description: "",
      points: 40,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEI1Q0Y2Ci8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4cHgiPumBiuaIr+apnzwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 8,
      name: "玩具",
      description: "",
      points: 50,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTBCOTgxIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPueOqeWFtzwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 9,
      name: "模型",
      description: "",
      points: 50,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzY2MkY1Ci8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPuaoo+Wei+A8L3RleHQ+Cjwvc3ZnPgo="
    },
    {
      id: 10,
      name: "公仔",
      description: "",
      points: 70,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPuWFrOS+lzwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 11,
      name: "模型",
      description: "",
      points: 70,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDY5MUQ0Ci8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPuaoo+Wei+A8L3RleHQ+Cjwvc3ZnPgo="
    },
    {
      id: 12,
      name: "公仔",
      description: "",
      points: 80,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjU5RTBCIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPuWFrOS+lzwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 13,
      name: "公仔",
      description: "",
      points: 90,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjREMyNkE2Ci8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPuWFrOS+lzwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 14,
      name: "公仔",
      description: "",
      points: 150,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTE5RjJBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPuWFrOS+lzwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 15,
      name: "公仔",
      description: "",
      points: 150,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOTMzM0VBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPuWFrOS+lzwvdGV4dD4KPHN2Zz4K"
    },
    {
      id: 16,
      name: "公仔",
      description: "",
      points: 200,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRUM0ODk5Ci8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwcHgiPuWFrOS+lzwvdGV4dD4KPHN2Zz4K"
    }
  ],
  nextId: 17
};

// 圖片裁剪相關變數
let cropData = {
  canvas: null,
  ctx: null,
  originalImage: null,
  cropBox: { x: 0, y: 0, width: 100, height: 100 },
  isDragging: false,
  isResizing: false,
  dragStart: { x: 0, y: 0 },
  resizeHandle: null
};

// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM 載入完成，開始初始化系統');
  initializeSystem();
});

// 初始化系統
function initializeSystem() {
  console.log('初始化系統');
  
  // 確保所有模態框都是隱藏狀態
  hideAllModals();
  
  // 設置系統標題
  updateSystemTitle();
  
  // 自動按分數排序
  sortPrizesByPoints();
  
  // 更新統計數據
  updateStatistics();
  
  // 渲染獎品列表
  renderPrizesList();
  
  // 綁定事件
  bindEvents();
  
  console.log('系統初始化完成');
}

// 隱藏所有模態框
function hideAllModals() {
  const modals = ['prizeModal', 'printModal'];
  modals.forEach(modalId => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
    }
  });
}

// 更新系統標題
function updateSystemTitle() {
  const systemTitleInput = document.getElementById('systemTitle');
  if (systemTitleInput) {
    systemTitleInput.value = systemData.systemTitle;
  }
}

// 按分數排序（由小到大）
function sortPrizesByPoints() {
  systemData.prizes.sort((a, b) => a.points - b.points);
}

// 綁定事件
function bindEvents() {
  console.log('開始綁定事件');
  
  // 系統標題編輯
  const systemTitleInput = document.getElementById('systemTitle');
  if (systemTitleInput) {
    systemTitleInput.addEventListener('input', function() {
      systemData.systemTitle = this.value;
    });
    systemTitleInput.addEventListener('change', function() {
      systemData.systemTitle = this.value;
    });
  }
  
  // 新增獎品按鈕
  const addPrizeBtn = document.getElementById('addPrizeBtn');
  if (addPrizeBtn) {
    addPrizeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('點擊新增獎品按鈕');
      showPrizeModal();
    });
  }
  
  // 清空所有按鈕
  const clearAllBtn = document.getElementById('clearAllBtn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', function(e) {
      e.preventDefault();
      clearAllPrizes();
    });
  }
  
  // 匯出資料按鈕
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function(e) {
      e.preventDefault();
      exportData();
    });
  }
  
  // 匯入資料按鈕
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', function(e) {
      e.preventDefault();
      importFile.click();
    });
    
    importFile.addEventListener('change', function(e) {
      if (e.target.files[0]) {
        importData(e.target.files[0]);
      }
    });
  }
  
  // 列印按鈕
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('點擊列印按鈕');
      showPrintModal();
    });
  }
  
  // 設置模態框控制
  setupModalControls();
  
  // 設置表單提交
  const prizeForm = document.getElementById('prizeForm');
  if (prizeForm) {
    prizeForm.addEventListener('submit', handlePrizeSubmit);
  }
  
  // 設置圖片處理
  setupImageHandling();
  
  // 設置列印功能
  setupPrintFunctionality();
  
  // ESC 鍵關閉模態框
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideAllModals();
    }
  });
  
  console.log('事件綁定完成');
}

// 設置模態框控制
function setupModalControls() {
  const controls = [
    { id: 'closeModal', modal: 'prizeModal' },
    { id: 'cancelBtn', modal: 'prizeModal' },
    { id: 'closePrintModal', modal: 'printModal' },
    { id: 'cancelPrint', modal: 'printModal' }
  ];
  
  controls.forEach(control => {
    const element = document.getElementById(control.id);
    if (element) {
      element.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        hidePrizeModal();
        hidePrintModal();
      });
    }
  });
  
  // 背景點擊關閉
  ['prizeModal', 'printModal'].forEach(modalId => {
    const modal = document.getElementById(modalId);
    if (modal) {
      const backdrop = modal.querySelector('.modal__backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', function() {
          hidePrizeModal();
          hidePrintModal();
        });
      }
    }
  });
}

// 顯示獎品模態框
function showPrizeModal(prizeId = null) {
  console.log('顯示獎品模態框', prizeId);
  
  const prizeModal = document.getElementById('prizeModal');
  const modalTitle = document.getElementById('modalTitle');
  const prizeForm = document.getElementById('prizeForm');
  
  if (!prizeModal) {
    console.error('找不到prizeModal元素');
    return;
  }
  
  const isEdit = prizeId !== null;
  if (modalTitle) modalTitle.textContent = isEdit ? '編輯獎品' : '新增獎品';
  
  if (isEdit) {
    const prize = systemData.prizes.find(p => p.id === prizeId);
    if (prize) populatePrizeForm(prize);
  } else {
    if (prizeForm) prizeForm.reset();
    resetImageUpload();
  }
  
  if (prizeForm) prizeForm.dataset.prizeId = prizeId || '';
  
  // 強制移除隱藏類
  prizeModal.style.display = 'flex';
  prizeModal.classList.remove('hidden');
  
  console.log('獎品模態框已顯示');
}

// 隱藏獎品模態框
function hidePrizeModal() {
  const prizeModal = document.getElementById('prizeModal');
  if (prizeModal) {
    prizeModal.style.display = 'none';
    prizeModal.classList.add('hidden');
  }
}

// 顯示列印模態框
function showPrintModal() {
  console.log('顯示列印模態框');
  
  const printModal = document.getElementById('printModal');
  
  if (!printModal) {
    console.error('找不到printModal元素');
    return;
  }
  
  updatePrintPreview();
  
  // 強制移除隱藏類
  printModal.style.display = 'flex';
  printModal.classList.remove('hidden');
  
  console.log('列印模態框已顯示');
}

// 隱藏列印模態框
function hidePrintModal() {
  const printModal = document.getElementById('printModal');
  if (printModal) {
    printModal.style.display = 'none';
    printModal.classList.add('hidden');
  }
}

// 設置圖片處理
function setupImageHandling() {
  const prizeImage = document.getElementById('prizeImage');
  if (prizeImage) {
    prizeImage.addEventListener('change', handleImageUpload);
  }
  
  const aspectRatio = document.getElementById('aspectRatio');
  if (aspectRatio) {
    aspectRatio.addEventListener('change', updateCropAspectRatio);
  }
  
  const resetCrop = document.getElementById('resetCrop');
  if (resetCrop) {
    resetCrop.addEventListener('click', resetCropBox);
  }
  
  const applyCrop = document.getElementById('applyCrop');
  if (applyCrop) {
    applyCrop.addEventListener('click', applyCropToImage);
  }
  
  const editImage = document.getElementById('editImage');
  if (editImage) {
    editImage.addEventListener('click', editExistingImage);
  }
  
  // 裁剪框事件
  setupCropHandling();
}

// 設置裁剪處理
function setupCropHandling() {
  const cropBox = document.getElementById('cropBox');
  if (cropBox) {
    cropBox.addEventListener('mousedown', startDragCrop);
  }
  
  const handles = document.querySelectorAll('.crop-handle');
  handles.forEach(handle => {
    handle.addEventListener('mousedown', function(e) {
      startResizeCrop(e, handle.className);
    });
  });
  
  document.addEventListener('mousemove', handleCropMove);
  document.addEventListener('mouseup', stopCropAction);
}

// 設置列印功能
function setupPrintFunctionality() {
  const executePrintBtn = document.getElementById('executePrint');
  if (executePrintBtn) {
    executePrintBtn.addEventListener('click', function(e) {
      e.preventDefault();
      executePrint();
    });
  }
  
  // 列印模式選擇
  document.addEventListener('change', function(e) {
    if (e.target.name === 'printMode') {
      updatePrintPreview();
    }
  });
  
  // 列印選項變更
  const printOptions = ['imageSize', 'columnsPerRow'];
  printOptions.forEach(optionId => {
    const element = document.getElementById(optionId);
    if (element) {
      element.addEventListener('change', updatePrintPreview);
    }
  });
}

// 統計數據更新
function updateStatistics() {
  const total = systemData.prizes.length;
  
  const totalElement = document.getElementById('totalPrizes');
  if (totalElement) totalElement.textContent = total;
}

// 渲染獎品列表
function renderPrizesList() {
  const prizesList = document.getElementById('prizesList');
  if (!prizesList) return;
  
  prizesList.innerHTML = '';
  
  systemData.prizes.forEach(prize => {
    const row = createPrizeRow(prize);
    prizesList.appendChild(row);
  });
}

function createPrizeRow(prize) {
  const row = document.createElement('tr');
  
  row.innerHTML = `
    <td class="prize-image-cell">
      <img src="${prize.image}" alt="${prize.name}" class="prize-image-small">
    </td>
    <td>
      <div class="prize-name">${prize.name}</div>
    </td>
    <td>
      <div class="prize-description">${prize.description || '無描述'}</div>
    </td>
    <td>
      <div class="prize-points">${prize.points}</div>
    </td>
    <td>
      <div class="prize-actions">
        <button class="btn btn--outline btn--sm edit-prize-btn" data-id="${prize.id}">編輯</button>
        <button class="btn btn--outline btn--sm delete-prize-btn" data-id="${prize.id}" style="color: var(--color-error); border-color: var(--color-error);">刪除</button>
      </div>
    </td>
  `;
  
  // 綁定編輯按鈕事件
  const editBtn = row.querySelector('.edit-prize-btn');
  if (editBtn) {
    editBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const prizeId = parseInt(this.dataset.id);
      showPrizeModal(prizeId);
    });
  }
  
  // 綁定刪除按鈕事件
  const deleteBtn = row.querySelector('.delete-prize-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const prizeId = parseInt(this.dataset.id);
      deletePrize(prizeId);
    });
  }
  
  return row;
}

function resetImageUpload() {
  const imageUploadArea = document.getElementById('imageUploadArea');
  const imagePreview = document.getElementById('imagePreview');
  
  if (imageUploadArea) imageUploadArea.classList.add('hidden');
  if (imagePreview) imagePreview.classList.add('hidden');
  
  cropData.originalImage = null;
}

function populatePrizeForm(prize) {
  const fields = {
    prizeName: prize.name,
    prizeDescription: prize.description,
    prizePoints: prize.points
  };
  
  Object.keys(fields).forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) field.value = fields[fieldId];
  });
  
  if (prize.image) {
    const previewImg = document.getElementById('previewImg');
    const imagePreview = document.getElementById('imagePreview');
    if (previewImg) previewImg.src = prize.image;
    if (imagePreview) imagePreview.classList.remove('hidden');
  }
}

function handlePrizeSubmit(e) {
  e.preventDefault();
  console.log('提交獎品表單');
  
  const prizeForm = document.getElementById('prizeForm');
  const prizeId = prizeForm.dataset.prizeId;
  
  const prizeData = {
    name: document.getElementById('prizeName')?.value || '',
    description: document.getElementById('prizeDescription')?.value || '',
    points: parseInt(document.getElementById('prizePoints')?.value || '0'),
    image: document.getElementById('previewImg')?.src || generateDefaultImage(document.getElementById('prizeName')?.value || 'Unknown')
  };
  
  if (prizeId) {
    // 編輯獎品
    const index = systemData.prizes.findIndex(p => p.id === parseInt(prizeId));
    if (index !== -1) {
      systemData.prizes[index] = { ...systemData.prizes[index], ...prizeData };
    }
  } else {
    // 新增獎品
    prizeData.id = systemData.nextId++;
    systemData.prizes.push(prizeData);
  }
  
  // 重新按分數排序
  sortPrizesByPoints();
  
  updateStatistics();
  renderPrizesList();
  
  hidePrizeModal();
}

function deletePrize(prizeId) {
  if (confirm('確定要刪除這個獎品嗎？此操作無法復原。')) {
    systemData.prizes = systemData.prizes.filter(p => p.id !== prizeId);
    updateStatistics();
    renderPrizesList();
  }
}

function clearAllPrizes() {
  if (confirm('確定要清空所有獎品嗎？此操作無法復原。')) {
    systemData.prizes = [];
    updateStatistics();
    renderPrizesList();
  }
}

// 圖片處理函數
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      loadImageForCropping(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

function loadImageForCropping(imageSrc) {
  const img = new Image();
  img.onload = function() {
    cropData.originalImage = img;
    setupCanvas(img);
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imagePreview = document.getElementById('imagePreview');
    if (imageUploadArea) imageUploadArea.classList.remove('hidden');
    if (imagePreview) imagePreview.classList.add('hidden');
  };
  img.src = imageSrc;
}

function setupCanvas(img) {
  const canvas = document.getElementById('cropCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // 設置畫布大小
  const maxWidth = 400;
  const maxHeight = 300;
  let { width, height } = img;
  
  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }
  
  canvas.width = width;
  canvas.height = height;
  
  // 繪製圖片
  ctx.drawImage(img, 0, 0, width, height);
  
  cropData.canvas = canvas;
  cropData.ctx = ctx;
  
  // 初始化裁剪框
  const size = Math.min(width, height) * 0.6;
  cropData.cropBox = {
    x: (width - size) / 2,
    y: (height - size) / 2,
    width: size,
    height: size
  };
  
  updateCropBoxDisplay();
}

function updateCropBoxDisplay() {
  const cropBox = document.getElementById('cropBox');
  if (!cropBox) return;
  
  const { x, y, width, height } = cropData.cropBox;
  cropBox.style.left = x + 'px';
  cropBox.style.top = y + 'px';
  cropBox.style.width = width + 'px';
  cropBox.style.height = height + 'px';
}

function updateCropAspectRatio() {
  const aspectRatio = document.getElementById('aspectRatio');
  if (!aspectRatio || !cropData.canvas) return;
  
  const ratio = parseFloat(aspectRatio.value);
  const { cropBox } = cropData;
  
  // 根據比例調整裁剪框
  if (ratio === 1) {
    // 正方形
    const size = Math.min(cropBox.width, cropBox.height);
    cropBox.width = size;
    cropBox.height = size;
  } else if (ratio > 1) {
    // 橫向
    cropBox.height = cropBox.width / ratio;
  } else {
    // 直向
    cropBox.width = cropBox.height * ratio;
  }
  
  // 確保裁剪框在畫布內
  cropBox.x = Math.max(0, Math.min(cropBox.x, cropData.canvas.width - cropBox.width));
  cropBox.y = Math.max(0, Math.min(cropBox.y, cropData.canvas.height - cropBox.height));
  
  updateCropBoxDisplay();
}

function resetCropBox() {
  if (!cropData.canvas) return;
  
  const size = Math.min(cropData.canvas.width, cropData.canvas.height) * 0.6;
  cropData.cropBox = {
    x: (cropData.canvas.width - size) / 2,
    y: (cropData.canvas.height - size) / 2,
    width: size,
    height: size
  };
  
  updateCropBoxDisplay();
}

function applyCropToImage() {
  if (!cropData.originalImage || !cropData.canvas) return;
  
  const { cropBox } = cropData;
  const { canvas } = cropData;
  
  // 計算原始圖片的裁剪區域
  const scaleX = cropData.originalImage.width / canvas.width;
  const scaleY = cropData.originalImage.height / canvas.height;
  
  const cropX = cropBox.x * scaleX;
  const cropY = cropBox.y * scaleY;
  const cropWidth = cropBox.width * scaleX;
  const cropHeight = cropBox.height * scaleY;
  
  // 創建新畫布進行裁剪
  const cropCanvas = document.createElement('canvas');
  const cropCtx = cropCanvas.getContext('2d');
  
  cropCanvas.width = cropWidth;
  cropCanvas.height = cropHeight;
  
  // 裁剪並繪製到新畫布
  cropCtx.drawImage(
    cropData.originalImage,
    cropX, cropY, cropWidth, cropHeight,
    0, 0, cropWidth, cropHeight
  );
  
  // 轉換為base64並顯示預覽
  const croppedImage = cropCanvas.toDataURL('image/jpeg', 0.9);
  
  const previewImg = document.getElementById('previewImg');
  const imagePreview = document.getElementById('imagePreview');
  const imageUploadArea = document.getElementById('imageUploadArea');
  
  if (previewImg) previewImg.src = croppedImage;
  if (imagePreview) imagePreview.classList.remove('hidden');
  if (imageUploadArea) imageUploadArea.classList.add('hidden');
}

function editExistingImage() {
  const previewImg = document.getElementById('previewImg');
  if (previewImg && previewImg.src) {
    loadImageForCropping(previewImg.src);
  }
}

// 裁剪框交互（簡化版本）
function startDragCrop(e) {
  e.preventDefault();
  cropData.isDragging = true;
}

function startResizeCrop(e, handleClass) {
  e.preventDefault();
  e.stopPropagation();
  cropData.isResizing = true;
  cropData.resizeHandle = handleClass;
}

function handleCropMove(e) {
  // 簡化的移動處理
  if (cropData.isDragging || cropData.isResizing) {
    e.preventDefault();
  }
}

function stopCropAction() {
  cropData.isDragging = false;
  cropData.isResizing = false;
  cropData.resizeHandle = null;
}

function generateDefaultImage(name) {
  const colors = ['#4285F4', '#FF6B6B', '#4DAA57', '#9C27B0', '#FF9800', '#EF4444', '#8B5CF6', '#10B981', '#3662F5', '#FF5722', '#0691D4', '#F59E0B', '#DC26A6', '#119F2A', '#9333EA', '#EC4899'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="${color}"/>
      <text x="100" y="100" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="18px">${name}</text>
    </svg>
  `)}`;
}

// 數據匯入匯出
function exportData() {
  try {
    const dataStr = JSON.stringify(systemData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${systemData.systemTitle.replace(/[^\w\s]/gi, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // 提供成功反饋
    alert('資料匯出成功！檔案已下載到您的下載資料夾。');
  } catch (error) {
    console.error('匯出錯誤:', error);
    alert('匯出失敗，請稍後再試。');
  }
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (importedData.prizes && Array.isArray(importedData.prizes)) {
        systemData = {
          ...systemData,
          ...importedData
        };
        // 重新按分數排序
        sortPrizesByPoints();
        updateSystemTitle();
        updateStatistics();
        renderPrizesList();
        alert('資料匯入成功！');
        
        // 清除檔案選擇
        const importFile = document.getElementById('importFile');
        if (importFile) importFile.value = '';
      } else {
        alert('匯入失敗：檔案格式不正確，請確保檔案包含有效的獎品資料。');
      }
    } catch (error) {
      console.error('匯入錯誤:', error);
      alert('匯入失敗：檔案格式不正確，請選擇有效的JSON檔案。');
    }
  };
  reader.readAsText(file);
}

function updatePrintPreview() {
  const modeRadio = document.querySelector('input[name="printMode"]:checked');
  const mode = modeRadio ? modeRadio.value : 'poster';
  
  // 顯示/隱藏海報模式選項
  const posterOptions = document.getElementById('posterOptions');
  const posterLayout = document.getElementById('posterLayout');
  const showPosterOptions = mode === 'poster';
  if (posterOptions) posterOptions.style.display = showPosterOptions ? 'block' : 'none';
  if (posterLayout) posterLayout.style.display = showPosterOptions ? 'block' : 'none';
  
  const prizes = systemData.prizes;
  
  if (mode === 'poster') {
    renderPosterMode(prizes);
  } else {
    renderListMode(prizes);
  }
}

function renderPosterMode(prizes) {
  const printPreview = document.getElementById('printPreview');
  if (!printPreview) return;
  
  const imageSize = document.getElementById('imageSize');
  const columnsPerRow = document.getElementById('columnsPerRow');
  const size = imageSize ? imageSize.value : '200';
  const columns = columnsPerRow ? columnsPerRow.value : '3';
  
  printPreview.innerHTML = `
    <div class="print-poster print-poster--${columns}-cols">
      ${prizes.map(prize => `
        <div class="print-poster-item">
          <img src="${prize.image}" alt="${prize.name}" class="size-${size}">
          <h4>${prize.name}</h4>
          <p>${prize.description || '無描述'}</p>
          <div class="points">${prize.points} 分</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderListMode(prizes) {
  const printPreview = document.getElementById('printPreview');
  if (!printPreview) return;
  
  printPreview.innerHTML = `
    <div class="print-list">
      <h2>${systemData.systemTitle}</h2>
      <p>列印日期: ${new Date().toLocaleDateString('zh-TW')}</p>
      <table>
        <thead>
          <tr>
            <th>圖片</th>
            <th>獎品名稱</th>
            <th>描述</th>
            <th>所需分數</th>
          </tr>
        </thead>
        <tbody>
          ${prizes.map(prize => `
            <tr>
              <td><img src="${prize.image}" alt="${prize.name}" class="prize-image-print"></td>
              <td><strong>${prize.name}</strong></td>
              <td>${prize.description || '無描述'}</td>
              <td><strong>${prize.points} 分</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function executePrint() {
  window.print();
}