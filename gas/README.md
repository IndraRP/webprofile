# Panduan Setup Backend Google Apps Script — Wahana Kantin

Panduan ini menjelaskan langkah-langkah untuk menyiapkan Google Spreadsheet dan Google Apps Script (GAS) Web App sebagai backend penyimpanan form transaksi Wahana Kantin.

---

## 1. Struktur Google Spreadsheet

Buat Google Spreadsheet baru (misalnya dengan nama `Database Wahana Kantin`) yang memiliki 2 sheet:

### Sheet 1: `Products` (Master Data Produk)
Menyimpan daftar produk yang dijual di kantin.

| Kolom | Tipe | Contoh Nilai | Keterangan |
|---|---|---|---|
| `product_id` | Teks | `PROD001` | ID unik produk |
| `product_name` | Teks | `Milo` | Nama produk |
| `unit` | Teks | `pcs` | Satuan (pcs, cup, dll) |
| `price` | Angka | `5000` | Harga jual per unit (wajib diisi admin) |
| `is_active` | Boolean | `TRUE` | `TRUE` jika dijual, `FALSE` jika dinonaktifkan |
| `created_at` | Waktu/Teks | `2026-11-02T10:00:00Z` | Waktu pembuatan master |

> **Catatan Admin:**
> - Hanya produk dengan `is_active = TRUE` dan `price > 0` yang akan muncul di dropdown form transaksi.
> - Admin dapat menambahkan produk baru atau mengubah harga sewaktu-waktu langsung di sheet ini tanpa perlu mengubah kode frontend.

### Sheet 2: `Transactions` (Pencatatan Transaksi)
Menyimpan riwayat transaksi yang dikirim dari form.

| Kolom | Keterangan |
|---|---|
| `transaction_id` | ID unik transaksi (contoh: `TRX-20261102-1234`) |
| `transaction_date` | Tanggal transaksi yang diinput |
| `created_at` | Timestamp saat transaksi tersimpan di server |
| `inputter_name` | Nama admin / staf penginput transaksi |
| `product_id` | ID produk |
| `product_name` | Snapshot nama produk saat transaksi |
| `quantity` | Jumlah item yang terjual |
| `unit_price` | Snapshot harga satuan dari master saat transaksi |
| `total_price` | Total harga hasil perhitungan server (`quantity * unit_price`) |
| `notes` | Catatan transaksi (opsional) |
| `status` | Status transaksi (default: `SUBMITTED`) |

---

## 2. Cara Memasang Google Apps Script

1. Buka spreadsheet yang telah Anda buat di Google Sheets.
2. Pada menu atas, klik **Extensions** (Ekstensi) > **Apps Script**.
3. Hapus kode default di file `Code.gs`, lalu salin seluruh isi dari file [`Code.gs`](./Code.gs) ke editor Apps Script.
4. Klik ikon **Save** (Simpan) atau tekan `Ctrl + S`.
5. Di bagian toolbar atas Apps Script, pilih fungsi **`setupWahanaKantinSpreadsheet`** lalu klik **Run** (Jalankan).
   - Saat pertama kali dijalankan, Google akan meminta izin otorisasi (*Review Permissions*).
   - Pilih akun Google Anda, klik *Advanced*, lalu klik *Go to ... (unsafe)* dan klik *Allow*.
   - Fungsi ini akan otomatis membuat sheet `Products` dan `Transactions` beserta header dan 5 produk awal (Milo, Nescafé, Gelas, Teh, Energen).
6. Buka kembali spreadsheet Anda dan pastikan sheet `Products` dan `Transactions` sudah terbuat. Admin dapat menyesuaikan kolom `price` pada sheet `Products`.

---

## 3. Cara Deploy Menjadi Web App

Agar form React dapat berkomunikasi dengan script:

1. Di halaman Apps Script, klik tombol **Deploy** di pojok kanan atas > pilih **New deployment**.
2. Klik ikon gerigi (Select type) > pilih **Web app**.
3. Isi konfigurasi sebagai berikut:
   - **Description**: `Wahana Kantin API v1`
   - **Execute as**: **Me (emailanda@gmail.com)** *(Sangat penting)*
   - **Who has access**: **Anyone** *(Sangat penting agar form dapat mengirim data tanpa login Google akun staf)*
4. Klik tombol **Deploy**.
5. Salin **Web app URL** yang dihasilkan (formatnya biasanya: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 4. Menghubungkan ke Project Frontend

1. Di direktori project React ini, buat file `.env` (atau duplikasi dari `.env.example`).
2. Masukkan URL Web App yang Anda salin tadi:
   ```env
   VITE_WAHANA_KANTIN_API_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
3. Restart server pengembangan Vite (`npm run dev`) jika sedang berjalan.
4. Buka route:
   ```text
   http://localhost:5173/wahanakantin-form
   ```
5. Form akan otomatis memuat master produk aktif dari Google Spreadsheet dan siap digunakan untuk mencatat penjualan.

