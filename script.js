/**
 * MoneyNote — Catatan Pengeluaran Harian
 * File: script.js
 * Role: Anggota 2 (JavaScript / Fungsionalitas)
 *
 * Fitur:
 * - F-01: Input & validasi pengeluaran
 * - F-02: Tampilkan daftar transaksi
 * - F-03: Kategori pengeluaran
 * - F-04: Hitung total pengeluaran bulanan
 * - F-05: Rekap berdasarkan filter bulan & tahun
 * - F-06: Hapus transaksi
 * - F-07: Edit transaksi (Fitur pelengkap / opsional)
 * - Persistensi data menggunakan localStorage
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Konstanta & Kamus Data
  // ==========================================================================
  const STORAGE_KEY = 'moneynote_expenses';

  const MONTH_NAMES = {
    '01': 'Januari',
    '02': 'Februari',
    '03': 'Maret',
    '04': 'April',
    '05': 'Mei',
    '06': 'Juni',
    '07': 'Juli',
    '08': 'Agustus',
    '09': 'September',
    '10': 'Oktober',
    '11': 'November',
    '12': 'Desember'
  };

  const SHORT_MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  // ==========================================================================
  // 2. State Aplikasi
  // ==========================================================================
  let expenses = [];
  let editingId = null; // Menyimpan ID transaksi saat mode edit aktif

  // ==========================================================================
  // 3. Selektor Elemen DOM (Sesuai kesepakatan dengan index.html)
  // ==========================================================================
  const form = document.getElementById('expense-form');
  const descInput = document.getElementById('expense-description');
  const amountInput = document.getElementById('expense-amount');
  const dateInput = document.getElementById('expense-date');
  const categorySelect = document.getElementById('expense-category');
  const formError = document.getElementById('form-error');
  const submitBtn = document.getElementById('submit-btn');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');

  const filterMonth = document.getElementById('filter-month');
  const filterYear = document.getElementById('filter-year');
  const summaryPeriod = document.getElementById('summary-period');
  const monthlyTotal = document.getElementById('monthly-total');
  const transactionCount = document.getElementById('transaction-count');

  const emptyState = document.getElementById('empty-state');
  const expenseList = document.getElementById('expense-list');

  // ==========================================================================
  // 4. Utilitas & Helper Functions
  // ==========================================================================

  /**
   * Format angka integer menjadi format mata uang Rupiah (contoh: Rp15.000)
   * @param {number} amount
   * @returns {string}
   */
  function formatRupiah(amount) {
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);

    // Mengganti spasi tipis (narrow non-breaking space) bawaan Intl jika ada
    return formatted.replace(/\s+/g, '');
  }

  /**
   * Format tanggal YYYY-MM-DD menjadi format yang ramah pengguna (contoh: 26 Nov 2026)
   * @param {string} dateString - Format YYYY-MM-DD
   * @returns {string}
   */
  function formatDateDisplay(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const monthLabel = SHORT_MONTHS[monthIndex] || parts[1];
    return `${day} ${monthLabel} ${year}`;
  }

  /**
   * Menampilkan pesan error validasi form
   * @param {string} message
   */
  function showError(message) {
    if (!formError) return;
    formError.textContent = message;
    formError.hidden = false;
  }

  /**
   * Menyembunyikan pesan error validasi form
   */
  function hideError() {
    if (!formError) return;
    formError.textContent = '';
    formError.hidden = true;
  }

  // ==========================================================================
  // 5. Pengelolaan LocalStorage
  // ==========================================================================

  /**
   * Membaca data transaksi dari localStorage
   * @returns {Array}
   */
  function loadExpenses() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Gagal membaca data dari localStorage:', err);
      return [];
    }
  }

  /**
   * Menyimpan data transaksi ke localStorage
   */
  function saveExpenses() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (err) {
      console.error('Gagal menyimpan data ke localStorage:', err);
      showError('Gagal menyimpan data ke penyimpanan lokal browser.');
    }
  }

  // ==========================================================================
  // 6. Logika Render & Tampilan
  // ==========================================================================

  /**
   * Menghitung dan merender ulang daftar transaksi, total bulanan, dan ringkasan
   */
  function render() {
    const selectedMonth = filterMonth ? filterMonth.value : '11';
    const selectedYear = filterYear ? filterYear.value : '2026';
    const periodPrefix = `${selectedYear}-${selectedMonth}`;

    // 1. Perbarui label periode ringkasan
    if (summaryPeriod) {
      const monthLabel = MONTH_NAMES[selectedMonth] || selectedMonth;
      summaryPeriod.textContent = `${monthLabel} ${selectedYear}`;
    }

    // 2. Filter transaksi sesuai bulan dan tahun yang dipilih
    const filteredExpenses = expenses.filter(item => {
      return item.date && item.date.startsWith(periodPrefix);
    });

    // Urutkan transaksi: tanggal terbaru di atas, jika tanggal sama urutkan ID terbesar (terbaru diinput)
    filteredExpenses.sort((a, b) => {
      if (b.date !== a.date) {
        return b.date.localeCompare(a.date);
      }
      return b.id - a.id;
    });

    // 3. Hitung total nominal pengeluaran periode ini
    const totalAmount = filteredExpenses.reduce((sum, item) => {
      const val = Number(item.amount);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

    // 4. Update elemen total pengeluaran & jumlah transaksi
    if (monthlyTotal) {
      monthlyTotal.textContent = formatRupiah(totalAmount);
    }
    if (transactionCount) {
      transactionCount.textContent = `${filteredExpenses.length} transaksi pada periode ini`;
    }

    // 5. Render Daftar Transaksi & Empty State
    if (!expenseList || !emptyState) return;

    if (filteredExpenses.length === 0) {
      emptyState.style.display = 'flex';
      expenseList.hidden = true;
      expenseList.innerHTML = '';
    } else {
      emptyState.style.display = 'none';
      expenseList.hidden = false;

      // Buat elemen item transaksi
      const itemsHtml = filteredExpenses.map(item => {
        const safeDesc = escapeHtml(item.description);
        const safeCat = escapeHtml(item.category);
        const formattedDate = formatDateDisplay(item.date);
        const formattedNominal = formatRupiah(Number(item.amount));

        return `
          <li class="expense-item" data-id="${item.id}">
            <div class="expense-item-main">
              <p class="expense-title">${safeDesc}</p>
              <div class="expense-meta">
                <span class="expense-badge">${safeCat}</span>
                <span class="expense-date">${formattedDate}</span>
              </div>
            </div>
            <div class="expense-item-actions">
              <span class="expense-amount">${formattedNominal}</span>
              <button type="button" class="btn-edit" data-id="${item.id}" aria-label="Edit transaksi ${safeDesc}">Edit</button>
              <button type="button" class="btn-delete" data-id="${item.id}" aria-label="Hapus transaksi ${safeDesc}">Hapus</button>
            </div>
          </li>
        `;
      }).join('');

      expenseList.innerHTML = itemsHtml;
    }
  }

  /**
   * Mencegah serangan XSS pada string yang dirender ke innerHTML
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // 7. Event Handlers (Tambah, Edit, Hapus, Filter)
  // ==========================================================================

  /**
   * Menangani pengiriman formulir (Tambah transaksi baru / Simpan hasil edit)
   * @param {Event} e
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    hideError();

    const description = descInput ? descInput.value.trim() : '';
    const amountVal = amountInput ? amountInput.value.trim() : '';
    const dateVal = dateInput ? dateInput.value : '';
    const categoryVal = categorySelect ? categorySelect.value : '';

    // Validasi Kolom Wajib
    if (!description) {
      showError('Catatan / nama transaksi wajib diisi.');
      descInput && descInput.focus();
      return;
    }

    if (!amountVal) {
      showError('Nominal transaksi wajib diisi.');
      amountInput && amountInput.focus();
      return;
    }

    const amountNum = Number(amountVal);
    if (isNaN(amountNum) || amountNum <= 0) {
      showError('Nominal harus berupa angka yang lebih dari nol.');
      amountInput && amountInput.focus();
      return;
    }

    if (!dateVal) {
      showError('Tanggal transaksi wajib dipilih.');
      dateInput && dateInput.focus();
      return;
    }

    if (!categoryVal) {
      showError('Kategori pengeluaran wajib dipilih.');
      categorySelect && categorySelect.focus();
      return;
    }

    if (editingId !== null) {
      // MODE EDIT: Perbarui data yang ada
      const targetIndex = expenses.findIndex(item => item.id === editingId);
      if (targetIndex !== -1) {
        expenses[targetIndex] = {
          ...expenses[targetIndex],
          description,
          amount: Math.round(amountNum),
          category: categoryVal,
          date: dateVal
        };
      }
      resetFormToCreateMode();
    } else {
      // MODE TAMBAH: Buat transaksi baru
      const newTransaction = {
        id: Date.now(),
        description,
        amount: Math.round(amountNum),
        category: categoryVal,
        date: dateVal
      };
      expenses.push(newTransaction);
      resetFormInputs();
    }

    // Sinkronkan filter periode jika transaksi baru berada di bulan yang sedang diinput
    const [transYear, transMonth] = dateVal.split('-');
    if (filterYear && filterMonth && (filterYear.value !== transYear || filterMonth.value !== transMonth)) {
      // Jika pengguna memasukkan transaksi di luar filter saat ini, sesuaikan filter agar transaksi langsung terlihat
      const hasYearOption = Array.from(filterYear.options).some(opt => opt.value === transYear);
      if (hasYearOption) {
        filterYear.value = transYear;
      }
      filterMonth.value = transMonth;
    }

    saveExpenses();
    render();
  }

  /**
   * Menangani aksi klik pada daftar transaksi (Event Delegation untuk Edit & Hapus)
   * @param {Event} e
   */
  function handleListClick(e) {
    const target = e.target;
    if (!target) return;

    // Hapus Transaksi
    if (target.classList.contains('btn-delete')) {
      const id = Number(target.dataset.id);
      handleDelete(id);
      return;
    }

    // Edit Transaksi
    if (target.classList.contains('btn-edit')) {
      const id = Number(target.dataset.id);
      handleStartEdit(id);
      return;
    }
  }

  /**
   * Menghapus transaksi berdasarkan ID
   * @param {number} id
   */
  function handleDelete(id) {
    const targetItem = expenses.find(item => item.id === id);
    const itemDesc = targetItem ? `"${targetItem.description}"` : 'transaksi ini';

    const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus ${itemDesc}?`);
    if (!confirmed) return;

    // Jika yang sedang diedit adalah item yang dihapus, batalkan mode edit
    if (editingId === id) {
      resetFormToCreateMode();
    }

    expenses = expenses.filter(item => item.id !== id);
    saveExpenses();
    render();
  }

  /**
   * Memasuki mode edit untuk transaksi tertentu
   * @param {number} id
   */
  function handleStartEdit(id) {
    const targetItem = expenses.find(item => item.id === id);
    if (!targetItem) return;

    editingId = id;

    // Isi formulir dengan data transaksi yang dipilih
    if (descInput) descInput.value = targetItem.description;
    if (amountInput) amountInput.value = targetItem.amount;
    if (dateInput) dateInput.value = targetItem.date;
    if (categorySelect) categorySelect.value = targetItem.category;

    hideError();

    // Perbarui status tombol form
    if (submitBtn) {
      submitBtn.textContent = 'Perbarui Transaksi';
    }
    if (cancelEditBtn) {
      cancelEditBtn.hidden = false;
    }

    // Scroll form ke tampilan agar pengguna menyadarinya
    form && form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    descInput && descInput.focus();
  }

  /**
   * Membatalkan mode edit dan kembali ke mode tambah
   */
  function resetFormToCreateMode() {
    editingId = null;
    resetFormInputs();

    if (submitBtn) {
      submitBtn.textContent = 'Simpan';
    }
    if (cancelEditBtn) {
      cancelEditBtn.hidden = true;
    }
    hideError();
  }

  /**
   * Reset isi input form ke kondisi default
   */
  function resetFormInputs() {
    if (descInput) descInput.value = '';
    if (amountInput) amountInput.value = '';
    if (categorySelect) categorySelect.selectedIndex = 0;
    // Setel tanggal kembali ke hari ini
    setDefaultTodayDate();
    hideError();
  }

  /**
   * Set nilai input tanggal ke tanggal hari ini (format YYYY-MM-DD)
   */
  function setDefaultTodayDate() {
    if (!dateInput) return;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
  }

  /**
   * Sinkronisasi pilihan filter bulan & tahun ke tanggal hari ini saat awal dibuka
   */
  function syncFilterToCurrentDate() {
    const now = new Date();
    const currentYear = String(now.getFullYear());
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');

    if (filterYear) {
      const hasYear = Array.from(filterYear.options).some(opt => opt.value === currentYear);
      if (hasYear) {
        filterYear.value = currentYear;
      }
    }
    if (filterMonth) {
      filterMonth.value = currentMonth;
    }
  }

  // ==========================================================================
  // 8. Inisialisasi Aplikasi
  // ==========================================================================
  function init() {
    // 1. Muat data dari localStorage
    expenses = loadExpenses();

    // 2. Set default form tanggal & filter
    setDefaultTodayDate();
    syncFilterToCurrentDate();

    // 3. Pasang Event Listeners
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', resetFormToCreateMode);
    }

    if (filterMonth) {
      filterMonth.addEventListener('change', render);
    }

    if (filterYear) {
      filterYear.addEventListener('change', render);
    }

    if (expenseList) {
      expenseList.addEventListener('click', handleListClick);
    }

    // 4. Render tampilan awal
    render();
  }

  // Jalankan inisialisasi saat DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
