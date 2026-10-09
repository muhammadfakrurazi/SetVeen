// Dataset Utama 20 Mahasiswa
const INITIAL_STUDENTS = [
  // 6 Data Kelompok Format Awal
  { nim: "25210098", nama: "Muhammad Fakrurazi", nilai: 88, organisasi: "Ya", kehadiran: 95 },
  { nim: "25210109", nama: "Mohammad Aqmal", nilai: 85, organisasi: "Ya", kehadiran: 90 },
  { nim: "25210137", nama: "Padillah", nilai: 88, organisasi: "Ya", kehadiran: 90 },
  { nim: "25210397", nama: "Sakinah", nilai: 85, organisasi: "Ya", kehadiran: 88 },
  { nim: "25210386", nama: "Niswatul Khaira", nilai: 84, organisasi: "Ya", kehadiran: 85 },
  { nim: "25210105", nama: "Fajar Ramadhan", nilai: 81, organisasi: "Ya", kehadiran: 85 },
  
  // 14 Data Tambahan Acak / Simulasi
  { nim: "25210142", nama: "Andi Saputra", nilai: 92, organisasi: "Tidak", kehadiran: 82 },
  { nim: "25210155", nama: "Budi Santoso", nilai: 75, organisasi: "Ya", kehadiran: 91 },
  { nim: "25210168", nama: "Citra Dewi", nilai: 83, organisasi: "Ya", kehadiran: 72 },
  { nim: "25210173", nama: "Doni Kurniawan", nilai: 68, organisasi: "Tidak", kehadiran: 65 },
  { nim: "25210189", nama: "Eka Putri", nilai: 90, organisasi: "Tidak", kehadiran: 60 },
  { nim: "25210194", nama: "Farhan Maulana", nilai: 62, organisasi: "Ya", kehadiran: 78 },
  { nim: "25210201", nama: "Gita Gutawa", nilai: 70, organisasi: "Tidak", kehadiran: 88 },
  { nim: "25210212", nama: "Hendra Wijaya", nilai: 86, organisasi: "Ya", kehadiran: 84 },
  { nim: "25210225", nama: "Indah Permata", nilai: 78, organisasi: "Tidak", kehadiran: 70 },
  { nim: "25210238", nama: "Joko Susilo", nilai: 89, organisasi: "Tidak", kehadiran: 92 },
  { nim: "25210247", nama: "Kartika Sari", nilai: 74, organisasi: "Ya", kehadiran: 86 },
  { nim: "25210259", nama: "Lutfi Pratama", nilai: 82, organisasi: "Ya", kehadiran: 68 },
  { nim: "25210263", nama: "Monalisa", nilai: 65, organisasi: "Tidak", kehadiran: 75 },
  { nim: "25210271", nama: "Naufal Risky", nilai: 87, organisasi: "Ya", kehadiran: 94 }
];

let currentFilter = 'all';
let students = [];

// Fungsi Toggle Buka/Tutup Sidebar
function toggleSidebar() {
  const body = document.body;
  const isCurrentlyCollapsed = body.classList.contains('sidebar-collapsed');
  if (isCurrentlyCollapsed) {
    body.classList.remove('sidebar-collapsed');
    localStorage.setItem('setveen_sidebar_state', 'expanded');
  } else {
    body.classList.add('sidebar-collapsed');
    localStorage.setItem('setveen_sidebar_state', 'collapsed');
  }
}

function initSidebarState() {
  try {
    const savedState = localStorage.getItem('setveen_sidebar_state');
    if (savedState === 'collapsed') {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  } catch (e) {
    document.body.classList.remove('sidebar-collapsed');
  }
}

function initData() {
  initSidebarState();
  students = [...INITIAL_STUDENTS];
  localStorage.setItem('setclassify_students', JSON.stringify(students));
  updateUI();
}

function inSetA(s) { return s.nilai >= 80; }
function inSetB(s) { return s.organisasi === 'Ya'; }
function inSetC(s) { return s.kehadiran >= 80; }

function getStudentSets(s) {
  const sets = [];
  if (inSetA(s)) sets.push('A');
  if (inSetB(s)) sets.push('B');
  if (inSetC(s)) sets.push('C');
  return sets;
}

function updateUI() {
  const countU = students.length;
  const countA = students.filter(inSetA).length;
  const countB = students.filter(inSetB).length;
  const countC = students.filter(inSetC).length;
  const countNone = students.filter(s => !inSetA(s) && !inSetB(s) && !inSetC(s)).length;

  const abcList = students.filter(s => inSetA(s) && inSetB(s) && inSetC(s));
  const onlyA = students.filter(s => inSetA(s) && !inSetB(s) && !inSetC(s)).length;
  const onlyB = students.filter(s => !inSetA(s) && inSetB(s) && !inSetC(s)).length;
  const onlyC = students.filter(s => !inSetA(s) && !inSetB(s) && inSetC(s)).length;

  document.getElementById('stat-total-u').innerText = countU;
  document.getElementById('stat-total-a').innerText = countA;
  document.getElementById('stat-total-b').innerText = countB;
  document.getElementById('stat-total-c').innerText = countC;

  document.getElementById('header-data-badge').innerText = `${countU} Data Mahasiswa`;
  document.getElementById('dashboard-semesta-badge').innerText = `Total Semesta U : ${countU}`;
  document.getElementById('dashboard-venn-subtitle').innerText = `3 Himpunan: A (${countA}), B (${countB}), C (${countC}) · Irisan A ∩ B ∩ C = ${abcList.length} Mahasiswa`;

  document.getElementById('svg-text-u').textContent = `U (Semesta = ${countU})`;
  document.getElementById('venn-semesta-text').innerText = `U = ${countU}`;
  document.getElementById('venn-num-only-a').textContent = onlyA;
  document.getElementById('venn-num-only-b').textContent = onlyB;
  document.getElementById('venn-num-only-c').textContent = onlyC;
  document.getElementById('venn-num-abc').textContent = abcList.length;
  document.getElementById('venn-num-outside').textContent = `Luar: ${countNone}`;

  document.getElementById('legend-a-count').innerText = `A: Nilai ≥ 80 (${countA})`;
  document.getElementById('legend-b-count').innerText = `B: Aktif Org (${countB})`;
  document.getElementById('legend-c-count').innerText = `C: Hadir ≥ 80% (${countC})`;

  document.getElementById('insight-count-abc').innerText = abcList.length;
  const percentABC = countU > 0 ? Math.round((abcList.length / countU) * 100) : 0;
  document.getElementById('insight-cardinality-text').innerText = `Kardinalitas: |A ∩ B ∩ C| = ${abcList.length}/${countU} (${percentABC}%)`;

  document.getElementById('venn-intersection-title').innerText = `Irisan A ∩ B ∩ C (${abcList.length} Mahasiswa)`;
  document.getElementById('venn-intersection-percent').innerText = `${percentABC}% Semesta`;

  const listContainer = document.getElementById('venn-intersection-list');
  if (abcList.length === 0) {
    listContainer.innerHTML = `<p class="text-xs text-slate-400 italic text-center py-4">Tidak ada mahasiswa pada irisan A ∩ B ∩ C.</p>`;
  } else {
    listContainer.innerHTML = abcList.map((s, idx) => `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
        <div class="flex items-center gap-2.5">
          <span class="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">${idx + 1}</span>
          <div>
            <p class="font-bold text-xs text-slate-800">${s.nama}</p>
            <p class="text-[10px] text-slate-400 font-medium">NIM: ${s.nim} · Nilai ${s.nilai}</p>
          </div>
        </div>
        <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200/60">${s.kehadiran}% Hadir</span>
      </div>
    `).join('');
  }

  document.getElementById('filter-all').innerText = `Semua (${countU})`;
  document.getElementById('filter-A').innerText = `Himpunan A (${countA})`;
  document.getElementById('filter-B').innerText = `Himpunan B (${countB})`;
  document.getElementById('filter-C').innerText = `Himpunan C (${countC})`;
  document.getElementById('filter-none').innerText = `Tidak di A, B, C (${countNone})`;

  document.getElementById('himpunan-count-u').innerText = countU;
  document.getElementById('himpunan-count-a').innerText = countA;
  document.getElementById('himpunan-count-b').innerText = countB;
  document.getElementById('himpunan-count-c').innerText = countC;
  document.getElementById('himpunan-sub-u').innerText = `${countU} Mahasiswa`;

  renderHimpunanTab();
  renderTable();
}

function renderHimpunanTab() {
  const listU = document.getElementById('himpunan-list-u');
  if (listU) {
    listU.innerHTML = students.map(s => `
      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-100">
        <span class="font-medium text-slate-800 truncate">${s.nama}</span>
        <span class="text-[10px] text-slate-400 font-medium ml-1.5 shrink-0">${s.nim}</span>
      </div>
    `).join('');
  }

  const listA = document.getElementById('himpunan-list-a');
  if (listA) {
    const arrA = students.filter(inSetA);
    listA.innerHTML = arrA.length ? arrA.map(s => `
      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-100">
        <span class="font-medium text-slate-800">${s.nama} (${s.nim})</span>
        <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-100">Nilai ${s.nilai}</span>
      </div>
    `).join('') : `<p class="text-xs text-slate-400 italic">Kosong</p>`;
  }

  const listB = document.getElementById('himpunan-list-b');
  if (listB) {
    const arrB = students.filter(inSetB);
    listB.innerHTML = arrB.length ? arrB.map(s => `
      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-100">
        <span class="font-medium text-slate-800">${s.nama} (${s.nim})</span>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">Aktif (Ya)</span>
      </div>
    `).join('') : `<p class="text-xs text-slate-400 italic">Kosong</p>`;
  }

  const listC = document.getElementById('himpunan-list-c');
  if (listC) {
    const arrC = students.filter(inSetC);
    listC.innerHTML = arrC.length ? arrC.map(s => `
      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-100">
        <span class="font-medium text-slate-800">${s.nama} (${s.nim})</span>
        <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-100">${s.kehadiran}%</span>
      </div>
    `).join('') : `<p class="text-xs text-slate-400 italic">Kosong</p>`;
  }
}

function switchTab(tabId) {
  const tabs = ['dashboard', 'dataset', 'himpunan', 'operasi', 'panduan', 'tentang'];
  tabs.forEach(t => {
    const sec = document.getElementById(`section-${t}`);
    const nav = document.getElementById(`nav-${t}`);
    if (sec) sec.classList.add('hidden');
    if (nav) {
      nav.className = 'nav-item-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent group';
    }
  });

  const activeSec = document.getElementById(`section-${tabId}`);
  const activeNav = document.getElementById(`nav-${tabId}`);
  if (activeSec) activeSec.classList.remove('hidden');
  if (activeNav) {
    activeNav.className = 'nav-item-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 bg-[#eff6ff] text-[#1d4ed8] font-semibold border-l-4 border-[#2563eb] shadow-xs group';
  }

  const titles = {
    dashboard: 'Dashboard',
    dataset: 'Dataset Mahasiswa',
    himpunan: 'Pembentukan Himpunan',
    operasi: 'Operasi Himpunan',
    panduan: 'Panduan Penggunaan',
    tentang: 'Tentang Proyek'
  };
  const titleElem = document.getElementById('page-header-title');
  if (titleElem) {
    titleElem.innerText = titles[tabId] || 'SetVeen';
  }

  if (tabId === 'operasi') {
    executeOperation();
  }
}

function setDatasetFilter(filter) {
  currentFilter = filter;
  const filters = ['all', 'A', 'B', 'C', 'none'];
  filters.forEach(f => {
    const btn = document.getElementById(`filter-${f}`);
    if (!btn) return;
    if (f === filter) {
      btn.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-xs transition-colors";
    } else {
      btn.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors";
    }
  });
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById('student-table-body');
  if (!tbody) return;

  let filtered = students.filter(s => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'A') return inSetA(s);
    if (currentFilter === 'B') return inSetB(s);
    if (currentFilter === 'C') return inSetC(s);
    if (currentFilter === 'none') return !inSetA(s) && !inSetB(s) && !inSetC(s);
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-400 italic">Tidak ada data yang ditemukan.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((s, idx) => {
    const sets = getStudentSets(s);
    const setBadges = sets.length > 0 ? sets.map(setName => {
      let colorClass = setName === 'A' ? 'badge-a' : setName === 'B' ? 'badge-b' : 'badge-c';
      return `<span class="inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold ${colorClass}">${setName}</span>`;
    }).join(' ') : `<span class="text-xs text-slate-400 italic">-</span>`;

    return `
      <tr class="hover:bg-blue-50/40 transition-colors">
        <td class="py-3 px-4 text-center text-slate-400 font-medium">${idx + 1}</td>
        <td class="py-3 px-4 font-semibold text-slate-800">${s.nim}</td>
        <td class="py-3 px-4 text-slate-700 font-medium">${s.nama}</td>
        <td class="py-3 px-4 text-slate-700 font-semibold">${s.nilai}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full text-[11px] font-medium ${s.organisasi === 'Ya' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : 'bg-slate-100 text-slate-600'}">
            ${s.organisasi}
          </span>
        </td>
        <td class="py-3 px-4 text-slate-700 font-medium">${s.kehadiran}%</td>
        <td class="py-3 px-4"><div class="flex items-center gap-1.5">${setBadges}</div></td>
        <td class="py-3 px-4 text-right">
          <button onclick="deleteStudent('${s.nim}')" class="text-slate-400 hover:text-red-600 transition-colors font-medium p-1 rounded hover:bg-red-50" title="Hapus">✕</button>
        </td>
      </tr>
    `;
  }).join('');
}

function openModal() {
  const modal = document.getElementById('modal-add-data');
  if (modal) modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('modal-add-data');
  if (modal) modal.classList.add('hidden');
  const form = document.getElementById('form-tambah-mahasiswa');
  if (form) form.reset();
}

function saveStudent(e) {
  e.preventDefault();
  const nim = document.getElementById('input-nim').value.trim();
  const nama = document.getElementById('input-nama').value.trim();
  const nilai = parseInt(document.getElementById('input-nilai').value);
  const kehadiran = parseInt(document.getElementById('input-kehadiran').value);
  const organisasi = document.querySelector('input[name="organisasi"]:checked').value;

  if (!nim || !nama) return;

  students.push({ nim, nama, nilai, kehadiran, organisasi });
  localStorage.setItem('setclassify_students', JSON.stringify(students));
  closeModal();
  updateUI();
}

function deleteStudent(nim) {
  if (confirm(`Yakin ingin menghapus data dengan NIM ${nim}?`)) {
    students = students.filter(s => s.nim !== nim);
    localStorage.setItem('setclassify_students', JSON.stringify(students));
    updateUI();
  }
}

function resetDataset() {
  if (confirm('Kembalikan dataset ke kondisi awal (20 record)?')) {
    students = [...INITIAL_STUDENTS];
    localStorage.setItem('setclassify_students', JSON.stringify(students));
    updateUI();
  }
}

function getSetArray(identifier) {
  if (identifier === 'U') return [...students];
  if (identifier === 'A') return students.filter(inSetA);
  if (identifier === 'B') return students.filter(inSetB);
  if (identifier === 'C') return students.filter(inSetC);
  return [];
}

function handleOpTypeChange() {
  const op = document.getElementById('op-type').value;
  const g2 = document.getElementById('group-set-2');
  const g1Label = document.querySelector('#group-set-1 label');
  const sym = document.getElementById('op-symbol-view');
  const compNote = document.getElementById('complement-note');

  if (op === 'complement') {
    g2.classList.add('hidden');
    sym.classList.add('hidden');
    compNote.classList.remove('hidden');
    if (g1Label) g1Label.innerText = 'Himpunan';
  } else {
    g2.classList.remove('hidden');
    sym.classList.remove('hidden');
    compNote.classList.add('hidden');
    if (g1Label) g1Label.innerText = 'Himpunan Pertama';

    if (op === 'union') sym.innerText = '∪';
    else if (op === 'intersection') sym.innerText = '∩';
    else if (op === 'diff_ab') sym.innerText = '−';
    else if (op === 'diff_ba') sym.innerText = '−';
  }
}

let lastOperationResult = [];

function executeOperation() {
  const opElem = document.getElementById('op-type');
  if (!opElem) return;
  const op = opElem.value;
  let set1Key = document.getElementById('op-set-1').value;
  let set2Key = document.getElementById('op-set-2').value;

  let set1 = getSetArray(set1Key);
  let set2 = getSetArray(set2Key);
  let result = [];
  let formulaText = '';
  let descText = '';

  if (op === 'union') {
    formulaText = `${set1Key} ∪ ${set2Key}`;
    descText = `Union — gabungan semua anggota ${set1Key} dan ${set2Key}`;
    const map = new Map();
    set1.forEach(s => map.set(s.nim, s));
    set2.forEach(s => map.set(s.nim, s));
    result = Array.from(map.values());
  } else if (op === 'intersection') {
    formulaText = `${set1Key} ∩ ${set2Key}`;
    descText = `Intersection — anggota yang ada di ${set1Key} dan ${set2Key}`;
    const s2Nims = new Set(set2.map(s => s.nim));
    result = set1.filter(s => s2Nims.has(s.nim));
  } else if (op === 'diff_ab') {
    formulaText = `${set1Key} − ${set2Key}`;
    descText = `Difference — anggota ${set1Key} yang tidak ada di ${set2Key}`;
    const s2Nims = new Set(set2.map(s => s.nim));
    result = set1.filter(s => !s2Nims.has(s.nim));
  } else if (op === 'diff_ba') {
    formulaText = `${set2Key} − ${set1Key}`;
    descText = `Difference — anggota ${set2Key} yang tidak ada di ${set1Key}`;
    const s1Nims = new Set(set1.map(s => s.nim));
    result = set2.filter(s => !s1Nims.has(s.nim));
  } else if (op === 'complement') {
    formulaText = `${set1Key}ᶜ`;
    descText = `Complement — anggota Semesta U yang tidak ada di ${set1Key}`;
    const s1Nims = new Set(set1.map(s => s.nim));
    result = students.filter(s => !s1Nims.has(s.nim));
  }

  lastOperationResult = result;
  const percentSemesta = students.length > 0 ? ((result.length / students.length) * 100).toFixed(1) : 0;
  
  const resTitle = document.getElementById('result-title');
  if (resTitle) resTitle.innerText = formulaText;
  const resSubtitle = document.getElementById('result-subtitle');
  if (resSubtitle) resSubtitle.innerText = descText;
  const resBadge = document.getElementById('result-count-badge');
  if (resBadge) resBadge.innerText = `${result.length} mahasiswa (${percentSemesta}% Semesta)`;

  const rTbody = document.getElementById('result-table-body');
  if (rTbody) {
    if (result.length === 0) {
      rTbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-slate-400 italic">Himpunan hasil operasi ini kosong.</td></tr>`;
    } else {
      rTbody.innerHTML = result.map((s, idx) => {
        const sets = getStudentSets(s);
        const setBadges = sets.map(setName => {
          let colorClass = setName === 'A' ? 'badge-a' : setName === 'B' ? 'badge-b' : 'badge-c';
          return `<span class="inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold ${colorClass}">${setName}</span>`;
        }).join(' ');

        return `
          <tr class="hover:bg-blue-50/40 transition-colors">
            <td class="py-2.5 px-3 text-slate-400 font-semibold">${idx + 1}</td>
            <td class="py-2.5 px-3 font-semibold text-slate-800">${s.nim}</td>
            <td class="py-2.5 px-3 text-slate-700 font-medium">${s.nama}</td>
            <td class="py-2.5 px-3 text-slate-700 font-semibold">${s.nilai}</td>
            <td class="py-2.5 px-3 text-slate-700">
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium ${s.organisasi === 'Ya' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : 'bg-slate-100 text-slate-600'}">
                ${s.organisasi}
              </span>
            </td>
            <td class="py-2.5 px-3 text-slate-700">${s.kehadiran}%</td>
            <td class="py-2.5 px-3"><div class="flex items-center gap-1">${setBadges}</div></td>
          </tr>
        `;
      }).join('');
    }
  }
}

function copyResults() {
  if (!lastOperationResult || lastOperationResult.length === 0) {
    alert('Tidak ada data hasil operasi untuk disalin.');
    return;
  }
  const text = lastOperationResult.map(s => `${s.nim}\t${s.nama}\t${s.nilai}\t${s.organisasi}\t${s.kehadiran}%`).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    alert('Data hasil operasi berhasil disalin ke clipboard!');
  });
}

function exportCSV() {
  if (!lastOperationResult || lastOperationResult.length === 0) {
    alert('Tidak ada data hasil operasi untuk diunduh.');
    return;
  }
  let csvContent = "data:text/csv;charset=utf-8,NIM,Nama,Nilai,Organisasi,Kehadiran\n" 
    + lastOperationResult.map(e => `"${e.nim}","${e.nama}",${e.nilai},"${e.organisasi}","${e.kehadiran}%"`).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "operasi_himpunan.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

window.addEventListener('DOMContentLoaded', () => {
  initData();
});
