# MoneyNote — Catatan Pengeluaran Harian

MoneyNote adalah aplikasi web pencatatan pengeluaran pribadi sehari-hari yang ringan, cepat, dan mudah digunakan. Dibuat sebagai proyek kolaborasi dua orang untuk konteks **Project Collaborator SIKOKI** dengan fokus pada versi MVP (*Minimum Viable Product*).

---

## 🚀 Fitur Utama (MVP)

1. **Input Pengeluaran (F-01):** Formulir cepat untuk mencatat deskripsi transaksi, nominal, tanggal, dan kategori dengan validasi input.
2. **Daftar Transaksi (F-02):** Menampilkan seluruh riwayat pengeluaran yang terkelompok rapi.
3. **Kategori Pengeluaran (F-03):** Pengelompokan transaksi ke kategori standar (*Makanan & Minuman*, *Transportasi*, *Kebutuhan Kuliah*, *Belanja*, *Hiburan*, dan *Lainnya*).
4. **Total Pengeluaran Otomatis (F-04):** Menghitung akumulasi seluruh pengeluaran pada periode bulan dan tahun yang sedang dipilih secara real-time.
5. **Rekap & Filter Bulanan (F-05):** Pengguna dapat memilih bulan dan tahun untuk melihat rekapitulasi pengeluaran pada periode tertentu.
6. **Hapus Transaksi (F-06):** Menghapus data pengeluaran yang keliru atau tidak diperlukan.
7. **Edit Transaksi (F-07 - Opsional/Bonus):** Memperbarui data transaksi yang sudah dicatat dengan mudah.
8. **Penyimpanan Lokal (localStorage):** Data transaksi tersimpan aman di browser pengguna tanpa membutuhkan backend atau database server.

---

## 🛠️ Teknologi yang Digunakan

* **HTML5:** Struktur semantik halaman web.
* **CSS3:** Desain antarmuka modern, *mobile-first*, dan responsif.
* **JavaScript (ES6+):** Logika manipulasi DOM, validasi data, kalkulasi otomatis, dan interaksi.
* **Browser localStorage:** Penyimpanan data persisten pada sisi klien (*client-side*).
* **Git & GitHub:** Pengelolaan versi kode dan kolaborasi berbasis fitur (*feature branches* & *Pull Requests*).

---

## 📁 Struktur Direktori

```text
Project-2-Kolaborasi/
├── index.html          # Struktur halaman utama (Single Page Application)
├── style.css           # Styling antarmuka dan responsivitas
├── script.js           # Logika aplikasi, validasi, dan pengelolaan data localStorage
├── PRD_MoneyNote.md    # Dokumen Product Requirements Document (PRD)
└── README.md           # Dokumentasi proyek dan panduan penggunaan
```

---

## 👥 Pembagian Tugas & Kolaborasi Tim

| Anggota | Peran | File Utama | Tanggung Jawab |
| :--- | :--- | :--- | :--- |
| **Anggota 1** | **UI / Frontend** | `index.html`<br>`style.css` | Struktur halaman, layouting responsif, tema warna, komponen visual, dan *empty state*. |
| **Anggota 2** | **JavaScript / Fungsionalitas** | `script.js` | Logika kalkulasi, validasi form, filter periode, integrasi *localStorage*, operasi CRUD transaksi, dan format Rupiah. |
| **Bersama** | **Integrasi & Dokumentasi** | `README.md` | Penyelarasan ID elemen HTML, pengujian menyeluruh (QA), *code review*, dan dokumentasi proyek. |

---

## 💻 Cara Menjalankan Aplikasi

Aplikasi ini bersifat murni *client-side* (tanpa dependensi eksternal atau build tools), sehingga sangat mudah dijalankan:

1. **Clone repository ini:**
   ```bash
   git clone <URL_REPOSITORY_ANDA>
   cd Project-2-Kolaborasi
   ```
2. **Buka file `index.html`:**
   * Cukup klik dua kali berkas `index.html` untuk membukanya langsung di browser modern (Chrome, Edge, Firefox, Safari), **atau**
   * Gunakan ekstensi *Live Server* di VS Code / editor pilihan Anda.

---

## 🧪 Kriteria Pengujian (Acceptance Criteria)

* [x] Halaman utama MoneyNote dapat dibuka tanpa error di konsol browser.
* [x] Pengguna dapat menambahkan transaksi dengan data yang valid.
* [x] Sistem menolak nominal kosong, bernilai negatif, atau nol.
* [x] Transaksi yang ditambahkan langsung muncul pada daftar dan tersimpan di `localStorage`.
* [x] Data tetap ada setelah halaman dimuat ulang (*refresh*).
* [x] Pengguna dapat menghapus dan memperbarui transaksi.
* [x] Total pengeluaran otomatis terhitung sesuai periode bulan & tahun yang dipilih.
* [x] Tampilan responsif di layar ponsel maupun desktop.
