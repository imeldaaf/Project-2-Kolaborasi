# Product Requirements Document (PRD)

## MoneyNote --- Catatan Pengeluaran Harian

**Jenis proyek:** Aplikasi web sederhana\
**Tim:** 2 orang (kolaborasi GitHub)\
**Konteks:** Project Collaborator SIKOKI\
**Target versi:** MVP (Minimum Viable Product)\
**Target pengerjaan:** 1--2 hari untuk versi dasar, menyesuaikan waktu
dan ketentuan tim

------------------------------------------------------------------------

## 1. Ringkasan Produk

MoneyNote adal aplikasi web sederhana untuk membantu pengguna mencatat
dan memantau pengeluaran pribadi sehari-hari. Pengguna dapat menambahkan
transaksi, mengelompokkan pengeluaran berdasarkan kategori, melihat
total pengeluaran dan memantau rekap pengeluaran per bulan.

Aplikasi dibuat dengan antarmuka yang sederhana agar mudah digunakan
tanpa proses yang rumit. Fokus utama versi awal adalah pencatatan dan
ringkasan pengeluaran, bukan pengelolaan keuangan yang kompleks.

## 2. Latar Belakang dan Masalah

Pengeluaran kecil yang terjadi setiap hari sering kali terlupakan atau
tidak tercatat. Akibatnya, pengguna kesulitan mengetahui ke mana uang
mereka digunakan dan berapa jumlah pengeluaran dalam satu bulan.

MoneyNote hadir sebagai alat pencatatan ringan yang memungkinkan
pengguna menyimpan transaksi dan melihat ringkasannya dalam satu
halaman.

## 3. Tujuan Produk

1.  Memudahkan pengguna mencatat pengeluaran harian.
2.  Membantu pengguna mengelompokkan pengeluaran berdasarkan kategori.
3.  Menampilkan total pengeluaran secara otomatis.
4.  Menyediakan rekap pengeluaran berdasarkan bulan yang dipilih.
5.  Menjadi proyek kolaborasi GitHub yang memiliki pembagian tugas dan
    alur kerja jelas.

## 4. Target Pengguna

Pengguna umum yang ingin mencatat pengeluaran pribadi, khususnya
mahasiswa atau individu yang ingin memantau pengeluaran sehari-hari
tanpa aplikasi keuangan yang kompleks.

## 5. Ruang Lingkup

### 5.1 Fitur utama (MVP)

  -----------------------------------------------------------------------
  ID                Fitur             Deskripsi         Prioritas
  ----------------- ----------------- ----------------- -----------------
  F-01              Input pengeluaran Pengguna mengisi  Wajib
                                      nama/catatan      
                                      transaksi,        
                                      nominal,          
                                      kategori, dan     
                                      tanggal.          

  F-02              Daftar transaksi  Menampilkan       Wajib
                                      transaksi yang    
                                      sudah             
                                      ditambahkan.      

  F-03              Kategori          Mengelompokkan    Wajib
                    pengeluaran       transaksi,        
                                      misalnya Makanan, 
                                      Transportasi,     
                                      Kebutuhan Kuliah, 
                                      Hiburan, dan      
                                      Lainnya.          

  F-04              Total pengeluaran Menghitung jumlah Wajib
                                      seluruh transaksi 
                                      pada bulan yang   
                                      sedang dipilih.   

  F-05              Rekap bulanan     Menampilkan total Wajib
                                      pengeluaran untuk 
                                      bulan dan tahun   
                                      yang dipilih.     

  F-06              Hapus transaksi   Menghapus         Wajib
                                      transaksi yang    
                                      tidak diperlukan. 

  F-07              Edit transaksi    Memperbarui data  Opsional jika
                                      transaksi yang    waktu cukup
                                      sudah dicatat.    
  -----------------------------------------------------------------------

### 5.2 Di luar ruang lingkup versi awal

Agar proyek tetap sederhana dan realistis untuk dua orang, versi awal
tidak mencakup: - Login, registrasi, dan pengelolaan akun. -
Sinkronisasi data antarperangkat. - Integrasi rekening bank atau
e-wallet. - Pengelolaan pemasukan, utang, dan anggaran. - Ekspor laporan
PDF atau Excel. - Notifikasi otomatis.

Fitur di luar ruang lingkup dapat dipertimbangkan sebagai pengembangan
berikutnya.

## 6. Alur Penggunaan

1.  Pengguna membuka halaman MoneyNote.
2.  Aplikasi menampilkan ringkasan pengeluaran bulan berjalan.
3.  Pengguna mengisi formulir transaksi: nama/catatan, nominal,
    kategori, dan tanggal.
4.  Pengguna menekan tombol **Simpan**.
5.  Transaksi muncul pada daftar dan total pengeluaran diperbarui.
6.  Pengguna dapat memilih bulan dan tahun untuk melihat rekap periode
    tersebut.
7.  Pengguna dapat menghapus transaksi yang salah atau tidak diperlukan.

## 7. Kebutuhan Fungsional

-   Sistem dapat menerima data transaksi berupa nama/catatan, nominal,
    kategori, dan tanggal.
-   Sistem memvalidasi agar kolom wajib tidak kosong.
-   Nominal harus berupa angka lebih dari nol.
-   Sistem menampilkan transaksi yang tersimpan.
-   Sistem menghitung total nominal transaksi sesuai bulan dan tahun
    yang dipilih.
-   Sistem menyediakan pilihan bulan dan tahun untuk melihat rekap.
-   Sistem memungkinkan pengguna menghapus transaksi.
-   Jika fitur edit dikerjakan, sistem memungkinkan pengguna memperbarui
    transaksi.

## 8. Kebutuhan Nonfungsional

-   Tampilan sederhana, mudah dipahami, dan responsif di desktop maupun
    ponsel.
-   Format nominal menggunakan Rupiah (Rp).
-   Data tetap tersedia setelah halaman dimuat ulang pada browser yang
    sama.
-   Kode ditulis dengan struktur yang rapi dan nama variabel yang mudah
    dipahami.
-   Aplikasi dapat dijalankan melalui browser modern.
-   Repository GitHub memiliki README yang menjelaskan aplikasi dan cara
    menjalankannya.

## 9. Rancangan Halaman

Versi MVP cukup menggunakan satu halaman utama dengan beberapa bagian:

1.  **Header:** nama/logo MoneyNote dan deskripsi singkat.
2.  **Ringkasan:** total pengeluaran pada bulan terpilih.
3.  **Form tambah transaksi:** input catatan, nominal, kategori, dan
    tanggal.
4.  **Filter periode:** pilihan bulan dan tahun.
5.  **Daftar transaksi:** tanggal, catatan, kategori, nominal, dan
    tombol hapus.

### Contoh kategori awal

-   Makanan & Minuman
-   Transportasi
-   Kebutuhan Kuliah
-   Belanja
-   Hiburan
-   Lainnya

Kategori dapat dibuat tetap (hard-coded) untuk menjaga implementasi
tetap sederhana.

## 10. Aturan Perhitungan

-   Total pengeluaran bulanan adalah penjumlahan nominal seluruh
    transaksi pada bulan dan tahun yang dipilih.
-   Transaksi dengan tanggal di luar periode terpilih tidak masuk ke
    total periode tersebut.
-   Setelah transaksi ditambah, diubah, atau dihapus, ringkasan dan
    daftar transaksi harus diperbarui.
-   Format tampilan nominal menggunakan format Rupiah, misalnya
    `Rp25.000`.

## 11. Teknologi yang Disarankan

Untuk versi sederhana yang dapat dipublikasikan melalui GitHub Pages:

  Teknologi      Kegunaan
  -------------- --------------------------------------
  HTML5          Struktur halaman
  CSS3           Tampilan dan responsivitas
  JavaScript     Interaksi, validasi, dan perhitungan
  localStorage   Menyimpan data transaksi di browser
  Git & GitHub   Kolaborasi dan version control

**Catatan:** localStorage dipilih agar versi awal tidak memerlukan
backend atau database server. Data tersimpan pada browser/perangkat yang
digunakan dan tidak otomatis tersinkron ke perangkat lain. Jika
ketentuan tugas mewajibkan database server, rancangan penyimpanan perlu
disesuaikan.

## 12. Pembagian Jobdesk Tim

Pembagian berikut dibuat agar pekerjaan dapat berjalan paralel dan
tanggung jawab masing-masing anggota jelas.

### Anggota 1 --- UI/Frontend

**Tanggung jawab utama:** struktur halaman dan tampilan aplikasi.

Tugas: - Membuat rancangan sederhana tampilan MoneyNote. - Membuat
struktur HTML halaman utama. - Membuat styling CSS untuk header,
ringkasan, formulir, filter, dan daftar transaksi. - Memastikan tampilan
responsif. - Menyiapkan tampilan kosong ketika belum ada transaksi. -
Menulis atau memperbarui dokumentasi bagian tampilan jika diperlukan.

**File utama yang dikerjakan:** - `index.html` - `style.css`

### Anggota 2 --- JavaScript/Fungsionalitas

**Tanggung jawab utama:** logika aplikasi dan pengelolaan data.

Tugas: - Membuat fungsi untuk menambahkan transaksi. - Membuat validasi
input. - Menyimpan dan membaca data menggunakan localStorage. - Membuat
fungsi hapus transaksi. - Membuat fungsi filter bulan dan tahun. -
Menghitung total pengeluaran bulanan. - Memformat nominal menjadi
Rupiah. - Menguji perhitungan dan penyimpanan data.

**File utama yang dikerjakan:** - `script.js`

### Tugas bersama

-   Menyepakati desain, kategori, dan struktur data sebelum mulai
    coding.
-   Mengintegrasikan HTML, CSS, dan JavaScript.
-   Melakukan pengujian akhir.
-   Memperbaiki bug hasil integrasi.
-   Membuat README dan menyiapkan repository GitHub.
-   Melakukan review pull request satu sama lain.

**Catatan pembagian:** Anggota 1 perlu menyiapkan ID elemen HTML yang
disepakati bersama (misalnya `expense-form`, `expense-list`, dan
`monthly-total`) agar Anggota 2 dapat menghubungkan JavaScript tanpa
mengubah struktur halaman secara berulang.

## 13. Struktur Data Transaksi

Setiap transaksi disimpan dengan struktur data seperti berikut:

``` json
{
  "id": 1,
  "description": "Makan siang",
  "amount": 15000,
  "category": "Makanan & Minuman",
  "date": "2026-11-26"
}
```

`id` digunakan sebagai identitas unik transaksi. `amount` disimpan
sebagai angka agar mudah dijumlahkan. Tanggal menggunakan format
`YYYY-MM-DD`.

## 14. Rencana Pengerjaan

  -----------------------------------------------------------------------
  Tahap                   Aktivitas               Penanggung jawab
  ----------------------- ----------------------- -----------------------
  1                       Membuat repository,     Bersama
                          menyepakati fitur,      
                          kategori, dan struktur  
                          data                    

  2                       Membuat HTML dan CSS    Anggota 1
                          halaman utama           

  3                       Membuat fungsi          Anggota 2
                          transaksi,              
                          localStorage, dan       
                          perhitungan             

  4                       Menghubungkan tampilan  Bersama
                          dengan JavaScript       

  5                       Menguji tambah, hapus,  Bersama
                          filter bulan, dan total 

  6                       Membuat README dan      Bersama
                          merapikan repository    
  -----------------------------------------------------------------------

## 15. Strategi Kolaborasi GitHub

Agar perubahan tidak saling menimpa, gunakan alur kerja berikut:

1.  Buat satu repository GitHub bernama `moneynote`.
2.  Tambahkan rekan tim sebagai collaborator.
3.  Gunakan branch `main` sebagai versi utama yang stabil.
4.  Masing-masing anggota bekerja pada branch sendiri:
    -   `feature/ui-layout`
    -   `feature/expense-logic`
5.  Lakukan commit secara bertahap dengan pesan yang menjelaskan
    perubahan.
6.  Push branch ke GitHub dan buat Pull Request ke `main`.
7.  Rekan tim melakukan review sebelum Pull Request di-merge.
8.  Setelah integrasi, uji aplikasi dari branch `main`.

Contoh pesan commit: - `feat: add main expense form` -
`style: create responsive dashboard layout` -
`feat: add expense storage` - `feat: calculate monthly expenses` -
`fix: validate expense amount` - `docs: add project README`

## 16. Kriteria Keberhasilan (Acceptance Criteria)

Proyek dianggap memenuhi target MVP apabila:

-   [ ] Halaman utama MoneyNote dapat dibuka tanpa error.
-   [ ] Pengguna dapat menambahkan transaksi dengan data yang valid.
-   [ ] Sistem menolak nominal kosong, bukan angka, atau kurang
    dari/sama dengan nol.
-   [ ] Transaksi yang ditambahkan muncul pada daftar.
-   [ ] Data tetap tersimpan setelah halaman dimuat ulang pada browser
    yang sama.
-   [ ] Pengguna dapat menghapus transaksi.
-   [ ] Total pengeluaran dihitung sesuai bulan dan tahun yang dipilih.
-   [ ] Pengguna dapat melihat rekap bulan lain.
-   [ ] Tampilan dapat digunakan pada desktop dan ponsel.
-   [ ] Repository berisi kode, README, dan riwayat kolaborasi kedua
    anggota.

## 17. Risiko dan Antisipasi

  -----------------------------------------------------------------------
  Risiko                              Antisipasi
  ----------------------------------- -----------------------------------
  Konflik perubahan file              Pisahkan file kerja utama dan
                                      gunakan branch masing-masing.

  Struktur HTML dan JavaScript tidak  Sepakati ID elemen dan struktur
  cocok                               data sejak awal.

  Waktu pengerjaan terbatas           Dahulukan fitur wajib; fitur edit
                                      menjadi opsional.

  Data localStorage terhapus oleh     Jelaskan bahwa data hanya tersimpan
  pengguna/browser                    lokal dan bukan penyimpanan cloud.

  Perhitungan bulanan keliru          Uji transaksi dari bulan yang sama
                                      dan berbeda.
  -----------------------------------------------------------------------

## 18. Pengembangan Berikutnya (Opsional)

Jika MVP sudah selesai dan masih ada waktu, tim dapat
mempertimbangkan: - Grafik pengeluaran berdasarkan kategori. - Fitur
edit transaksi. - Pencarian transaksi. - Batas anggaran bulanan. -
Ekspor data ke CSV.

Pengembangan tambahan tidak perlu dikerjakan apabila mengganggu
penyelesaian fitur utama.

------------------------------------------------------------------------

## Kesimpulan

MoneyNote merupakan aplikasi pencatatan pengeluaran pribadi dengan ruang
lingkup yang sengaja dibatasi agar realistis dikerjakan oleh dua orang.
Fokus MVP adalah menambahkan transaksi, mengelompokkan kategori,
menyimpan data, menghitung total, dan menampilkan rekap bulanan.

Pembagian kerja dilakukan berdasarkan tanggung jawab UI/frontend dan
JavaScript/fungsionalitas, dengan integrasi, pengujian, serta
dokumentasi dikerjakan bersama. Dengan pendekatan ini, kedua anggota
dapat berkontribusi secara jelas melalui GitHub.
