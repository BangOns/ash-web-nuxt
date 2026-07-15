# Product Requirements Document (PRD)

# Donasi / Sedekah Management

**Version:** 1.0  
**Status:** Draft

---

# 1. Overview

## Background

Website Company Profile Pondok Pesantren akan memiliki fitur **Donasi/Sedekah** yang bertujuan memudahkan masyarakat untuk ikut berdonasi kepada pondok pesantren.

Berbeda dengan platform donasi pada umumnya, fitur ini **tidak menyediakan sistem pembayaran online** maupun payment gateway. Seluruh proses pembayaran dilakukan secara langsung antara calon donatur dan pihak pondok pesantren melalui **WhatsApp**.

Dashboard Admin hanya berfungsi untuk mengelola campaign donasi, menampilkan progres donasi, dan memperbarui nominal donasi yang telah diterima secara manual.

---

# 2. Goals

- Mempermudah masyarakat untuk berdonasi.
- Mempermudah admin dalam membuka campaign donasi.
- Menampilkan progres donasi secara transparan.
- Tidak menggunakan payment gateway.
- Seluruh nominal donasi dikelola secara manual oleh admin.

---

# 3. Scope

## In Scope

- Membuat Campaign Donasi
- Mengelola Campaign Donasi
- Redirect ke WhatsApp
- Progress Donasi
- Riwayat Update Donasi
- Dashboard Admin

## Out of Scope

- Payment Gateway
- Midtrans
- Xendit
- QRIS
- Transfer Otomatis
- Konfirmasi Pembayaran Otomatis
- Upload Bukti Transfer
- Integrasi Bank

---

# 4. User Roles

## Visitor

Pengunjung dapat:

- Melihat daftar campaign donasi.
- Melihat detail campaign.
- Melihat target donasi.
- Melihat progres donasi.
- Menekan tombol **Sedekah Sekarang**.
- Dialihkan ke WhatsApp.

---

## Administrator

Administrator dapat:

- Membuat campaign donasi.
- Mengubah campaign.
- Menghapus campaign.
- Menutup campaign.
- Mengubah target donasi.
- Menginput nominal donasi yang telah diterima.
- Melihat histori update donasi.

---

# 5. Functional Requirements

---

# 5.1 Donasi Landing Page

Menampilkan seluruh campaign yang masih aktif.

Informasi yang ditampilkan:

- Banner
- Judul Campaign
- Deskripsi Singkat
- Target Donasi
- Total Donasi Terkumpul
- Persentase Progress
- Tanggal Berakhir
- Status Campaign

Button:

```
Sedekah Sekarang
```

---

# 5.2 Detail Campaign

Menampilkan informasi lengkap campaign.

Informasi:

- Banner
- Judul
- Deskripsi
- Target Donasi
- Dana Terkumpul
- Progress Bar
- Persentase
- Tanggal Dibuat
- Tanggal Berakhir
- Status

Button

```
Sedekah Sekarang
```

---

# 5.3 Redirect WhatsApp

Saat pengunjung menekan tombol **Sedekah Sekarang**, sistem akan langsung mengarahkan ke WhatsApp menggunakan nomor yang telah ditentukan oleh admin.

Pesan WhatsApp dibuat otomatis sehingga pengguna tidak perlu mengetik sendiri.

Contoh pesan:

```
Assalamu'alaikum.

Saya ingin berdonasi untuk program:

*Pembangunan Asrama Santri*

Mohon informasi mengenai tata cara penyaluran donasi.

Terima kasih.
```

Pesan tersebut akan otomatis menyesuaikan dengan judul campaign yang dipilih.

Contoh URL:

```
https://wa.me/{phone_number}?text={encoded_message}
```

---

# 5.4 Dashboard Donasi

Administrator memiliki halaman khusus untuk mengelola seluruh campaign donasi.

Menampilkan:

- Total Campaign
- Campaign Aktif
- Campaign Selesai
- Total Dana Terkumpul

Daftar Campaign:

- Banner
- Judul
- Target
- Dana Terkumpul
- Progress
- Status

Action

- Detail
- Edit
- Hapus

---

# 5.5 Membuat Campaign

Administrator dapat membuat campaign baru.

Field

## Informasi Campaign

- Judul Campaign
- Slug
- Banner
- Thumbnail
- Deskripsi
- Target Donasi
- Nomor WhatsApp
- Template Pesan WhatsApp
- Tanggal Mulai
- Tanggal Berakhir

Status

- Draft
- Published
- Closed

---

# 5.6 Edit Campaign

Administrator dapat mengubah seluruh data campaign.

Field yang dapat diubah:

- Judul
- Banner
- Deskripsi
- Target
- Nomor WhatsApp
- Template Pesan
- Status

---

# 5.7 Update Nominal Donasi

Karena sistem tidak memiliki payment gateway, administrator akan memperbarui nominal donasi secara manual setelah menerima donasi dari calon donatur.

Administrator dapat:

- Menambahkan nominal donasi baru.
- Mengurangi nominal jika terjadi kesalahan input.
- Mengoreksi data.

Setiap perubahan akan memperbarui:

- Dana Terkumpul
- Progress Bar
- Persentase Donasi

Secara otomatis.

---

# 5.8 Riwayat Update Donasi

Setiap perubahan nominal donasi akan disimpan sebagai histori.

Field

| Field   | Keterangan                             |
| ------- | -------------------------------------- |
| Tanggal | Waktu perubahan                        |
| Nominal | Nilai yang ditambahkan/dikurangi       |
| Jenis   | Penambahan / Pengurangan               |
| Catatan | Keterangan perubahan                   |
| Admin   | Administrator yang melakukan perubahan |

Histori ini hanya dapat dilihat oleh administrator.

---

# 5.9 Menutup Campaign

Administrator dapat menutup campaign apabila:

- Target telah tercapai.
- Campaign telah selesai.
- Campaign dibatalkan.

Status:

- Active
- Closed

Campaign yang telah ditutup tetap dapat dilihat oleh pengunjung sebagai arsip, namun tombol **Sedekah Sekarang** akan dinonaktifkan.

---

# 6. User Flow

## Admin Flow

```
Login
    │
    ▼
Dashboard
    │
    ▼
Donasi
    │
    ▼
Buat Campaign
    │
    ▼
Publish
    │
    ▼
Campaign tampil di Website
```

---

## Visitor Flow

```
Membuka Halaman Donasi
          │
          ▼
Melihat Campaign
          │
          ▼
Klik "Sedekah Sekarang"
          │
          ▼
Redirect ke WhatsApp
          │
          ▼
Mengirim Pesan Otomatis
          │
          ▼
Berkomunikasi dengan Admin
          │
          ▼
Melakukan Donasi
```

---

## Admin Setelah Donasi Diterima

```
Menerima Donasi
        │
        ▼
Login Dashboard
        │
        ▼
Pilih Campaign
        │
        ▼
Tambah Nominal Donasi
        │
        ▼
Progress Campaign Bertambah
        │
        ▼
Riwayat Update Tersimpan
```

---

# 7. Database (High Level)

## donation_campaigns

| Field             | Type      |
| ----------------- | --------- |
| id                | UUID      |
| title             | String    |
| slug              | String    |
| banner            | String    |
| description       | Text      |
| target_amount     | Decimal   |
| collected_amount  | Decimal   |
| whatsapp_number   | String    |
| whatsapp_template | Text      |
| start_date        | Date      |
| end_date          | Date      |
| status            | Enum      |
| created_at        | Timestamp |
| updated_at        | Timestamp |

---

## donation_histories

| Field       | Type                      |
| ----------- | ------------------------- |
| id          | UUID                      |
| campaign_id | UUID                      |
| amount      | Decimal                   |
| type        | Enum(Addition, Reduction) |
| note        | Text                      |
| created_by  | Admin ID                  |
| created_at  | Timestamp                 |

---

# 8. Non Functional Requirements

## Performance

- Halaman Donasi responsive.
- Progress bar diperbarui secara real-time setelah admin menyimpan perubahan.
- Optimasi gambar banner.

## Security

- Hanya administrator yang dapat mengubah nominal donasi.
- Seluruh endpoint dashboard memerlukan autentikasi.
- Validasi input pada seluruh form.

---

# 9. Success Metrics

Fitur dianggap berhasil apabila:

- Administrator dapat membuat campaign donasi tanpa bantuan developer.
- Pengunjung dapat menghubungi admin melalui WhatsApp hanya dengan satu klik.
- Pesan WhatsApp terisi otomatis sesuai campaign yang dipilih.
- Progress donasi diperbarui melalui dashboard admin.
- Riwayat perubahan nominal donasi tersimpan dengan baik.
- Pengunjung dapat melihat perkembangan donasi secara transparan tanpa adanya integrasi payment gateway.
