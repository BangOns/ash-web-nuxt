# Product Requirements Document (PRD)

**Project:** Website Company Profile Pondok Pesantren dengan Content Management System (CMS)  
**Version:** 1.0  
**Status:** Draft  
**Author:** Syahroni  
**Last Updated:** July 2026

---

# 1. Overview

## 1.1 Background

Website Company Profile Pondok Pesantren saat ini masih bersifat statis, sehingga setiap perubahan informasi harus dilakukan melalui source code. Hal ini menyulitkan administrator dalam memperbarui informasi secara cepat dan mandiri.

Untuk mengatasi hal tersebut, akan dikembangkan sebuah **Content Management System (CMS)** yang terintegrasi dengan website sehingga seluruh konten dapat dikelola melalui Dashboard Admin tanpa perlu mengubah kode aplikasi.

---

## 1.2 Goals

- Membangun website Company Profile yang mudah dikelola.
- Menyediakan Dashboard Admin sebagai pusat pengelolaan seluruh konten website.
- Mempermudah administrator dalam memperbarui informasi.
- Menyediakan statistik sederhana mengenai aktivitas website.
- Menyediakan media komunikasi antara pengunjung dan pihak pondok pesantren.

---

## 1.3 Objectives

- Seluruh konten website dapat dikelola melalui dashboard.
- Tidak diperlukan perubahan source code ketika mengubah isi website.
- Admin dapat melakukan CRUD terhadap seluruh data.
- Website tetap memiliki performa yang baik dan SEO-friendly.

---

# 2. Target Users

## Visitor

Pengunjung website dapat:

- Melihat informasi pondok pesantren.
- Membaca berita.
- Melihat agenda.
- Melihat galeri foto maupun video.
- Mengirim kritik, saran, atau pertanyaan.

---

## Administrator

Administrator dapat:

- Login ke Dashboard.
- Mengelola seluruh konten website.
- Mengelola berita.
- Mengelola galeri.
- Mengelola informasi.
- Mengelola struktur organisasi.
- Melihat statistik website.
- Melihat seluruh pesan yang dikirim pengunjung.

---

# 3. Technology Stack

## Frontend

- Nuxt.js
- Vue 3
- TypeScript
- Tailwind CSS

## Backend

Backend tetap menggunakan Nuxt.js (Fullstack).

Menggunakan:

- Nuxt Server API (Nitro)
- Route Rules
- Middleware
- Authentication
- ORM (Prisma / Drizzle ORM)
- JWT Authentication
- File Upload

## Database

Relational Database

Contoh:

- PostgreSQL
- MySQL

---

# 4. Scope

## In Scope

- Dashboard Admin
- Authentication
- Landing Page Management
- Profile Management
- News Management
- Information Management
- Gallery Management
- Visitor Messages
- Dashboard Statistics

## Out of Scope (Version 1)

- PPDB Online
- Multi-language
- Payment Gateway
- Mobile Application
- Live Chat
- Email Notification

---

# 5. Functional Requirements

---

# 5.1 Authentication

## Login

Administrator dapat login menggunakan:

- Email
- Password

### Features

- Login
- Logout
- Protected Route
- Session Authentication

---

## Registration

### Decision

Tidak menyediakan halaman registrasi publik.

### Reason

Administrator hanya dibuat oleh developer atau Super Admin sehingga lebih aman dibandingkan memberikan akses registrasi kepada pengguna umum.

Flow:

```
Developer
      │
      ▼
Create Admin Account
      │
      ▼
Admin Login
      │
      ▼
Dashboard
```

Apabila di masa depan diperlukan banyak administrator, maka akan ditambahkan halaman **User Management** tanpa membuka registrasi publik.

---

# 5.2 Dashboard

Dashboard merupakan halaman pertama setelah administrator login.

## Statistics

Menampilkan informasi:

- Total Berita
- Total Pengunjung Berita
- Total Pengumuman
- Total Agenda
- Total Galeri
- Total Pesan Masuk
- Berita Terpopuler
- Pesan Terbaru

---

# 5.3 Landing Page Management

Administrator dapat mengubah seluruh isi halaman Home.

## Hero Section

Field:

- Judul
- Sub Judul
- Background Image
- Button Text
- Button Link

---

## Program Pendidikan

CRUD

Field:

- Nama Program
- Deskripsi
- Icon
- Urutan Tampil

---

## Berita / Kegiatan

Menampilkan berita terbaru.

Administrator dapat:

- Memilih berita yang tampil.
- Mengatur jumlah berita.
- Mengubah urutan.

---

## Gallery Preview

Administrator dapat memilih foto/video yang akan muncul pada landing page.

---

## Testimoni

CRUD

Field:

- Nama
- Jabatan
- Foto
- Isi Testimoni

---

# 5.4 Profile Management

Administrator dapat mengelola halaman profil pondok.

## Section

- Sejarah
- Visi
- Misi
- Sambutan Pimpinan
- Struktur Organisasi

---

## Struktur Organisasi

CRUD

Field

- Nama
- Jabatan
- Foto
- Urutan

---

# 5.5 News Management

CRUD Berita

Field

- Judul
- Slug
- Thumbnail
- Konten
- Penulis
- Kategori
- Tag
- Status
- Publish Date

Status:

- Draft
- Published

Features

- CRUD
- Search
- Pagination
- Preview
- Publish
- Draft

Statistic

- Total Views

---

# 5.6 Information Management

## Pengumuman

CRUD

Field

- Judul
- Isi
- Tanggal

---

## Agenda

CRUD

Field

- Nama Agenda
- Deskripsi
- Lokasi
- Tanggal
- Jam

---

# 5.7 Gallery Management

CRUD Gallery

Support:

- Image
- Video

Field

- Judul
- Deskripsi
- Thumbnail
- File
- Type
- Created Date

Features

- Upload
- Preview
- Search
- Filter
- Pagination

---

# 5.8 Visitor Interaction

Pengunjung dapat mengirimkan:

- Kritik
- Saran
- Pertanyaan

Field

- Nama
- Email
- Nomor HP (Optional)
- Judul
- Isi Pesan

Dashboard Admin

- Daftar Pesan
- Detail Pesan
- Status Pesan

Status

- Belum Dibaca
- Sudah Dibaca

Administrator juga dapat menghapus pesan.

---

# 6. Non Functional Requirements

## Performance

- Responsive Mobile
- Responsive Tablet
- Responsive Desktop
- Image Optimization
- Lazy Loading
- Fast Page Load

---

## Security

- JWT Authentication
- Password Hashing
- Middleware Authentication
- Authorization
- Input Validation
- CSRF Protection
- API Rate Limiting

---

## SEO

- Meta Title
- Meta Description
- Sitemap
- Robots.txt
- Open Graph
- Friendly URL

---

# 7. Database Design (High Level)

## Admin

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | String    |
| email      | String    |
| password   | String    |
| created_at | Timestamp |

---

## News

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| title       | String    |
| slug        | String    |
| thumbnail   | String    |
| content     | Text      |
| category    | String    |
| status      | Enum      |
| total_views | Integer   |
| created_at  | Timestamp |

---

## Program Pendidikan

| Field       | Type    |
| ----------- | ------- |
| id          | UUID    |
| title       | String  |
| description | Text    |
| icon        | String  |
| order       | Integer |

---

## Testimoni

| Field       | Type   |
| ----------- | ------ |
| id          | UUID   |
| name        | String |
| position    | String |
| photo       | String |
| testimonial | Text   |

---

## Struktur Organisasi

| Field    | Type    |
| -------- | ------- |
| id       | UUID    |
| name     | String  |
| position | String  |
| photo    | String  |
| order    | Integer |

---

## Pengumuman

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| title       | String    |
| description | Text      |
| created_at  | Timestamp |

---

## Agenda

| Field       | Type     |
| ----------- | -------- |
| id          | UUID     |
| title       | String   |
| description | Text     |
| location    | String   |
| start_date  | Datetime |
| end_date    | Datetime |

---

## Gallery

| Field       | Type               |
| ----------- | ------------------ |
| id          | UUID               |
| title       | String             |
| description | Text               |
| type        | Enum(Image, Video) |
| file        | String             |
| thumbnail   | String             |

---

## Visitor Message

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | String    |
| email      | String    |
| phone      | String    |
| subject    | String    |
| message    | Text      |
| status     | Enum      |
| created_at | Timestamp |

---

# 8. Future Enhancements

Versi berikutnya dapat menambahkan fitur:

- Multi Admin
- Role & Permission
- Banner Management
- FAQ Management
- Alumni Management
- Teacher Management
- Download Center
- PPDB Online
- Email Notification
- WhatsApp Integration
- Dashboard Analytics
- Audit Log
- Backup & Restore
- Multi Language

---

# 9. Success Metrics

Project dianggap berhasil apabila:

- Seluruh halaman website dapat dikelola melalui Dashboard Admin.
- Administrator tidak perlu mengubah source code untuk memperbarui konten.
- Website responsive pada seluruh ukuran perangkat.
- Halaman memiliki waktu muat yang cepat.
- Pengunjung dapat mengirim kritik dan saran dengan baik.
- Administrator dapat mengelola seluruh data secara mudah melalui CMS.

---

# 10. Development Roadmap

## Phase 1

- Authentication
- Dashboard
- Layout CMS

## Phase 2

- Landing Page CMS
- Profile CMS
- News CMS

## Phase 3

- Information CMS
- Gallery CMS
- Visitor Messages

## Phase 4

- Dashboard Statistics
- SEO
- Optimization

---

# 11. Notes

- Project menggunakan **Nuxt.js Fullstack** sehingga frontend dan backend berada dalam satu repository.
- Seluruh API akan dibuat menggunakan **Nuxt Server API (Nitro)**.
- Dashboard Admin hanya dapat diakses oleh administrator yang telah dibuat sebelumnya.
- Tidak tersedia fitur registrasi publik demi menjaga keamanan sistem.
- Arsitektur project akan dirancang modular agar mudah dikembangkan pada versi berikutnya.
