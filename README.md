# Website Pondok Pesantren Ashhaburratib

Website Company Profile Pondok Pesantren Ashhaburratib dilengkapi dengan Content Management System (CMS) untuk pengelolaan konten secara dinamis melalui Dashboard Admin.

## Teknologi Utama

- **Frontend & Backend**: [Nuxt 4](https://nuxt.com/) (Vue 3, TypeScript, Tailwind CSS, Nuxt UI)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: SQLite (menggunakan `@prisma/adapter-better-sqlite3` dan `better-sqlite3`)

---

## Panduan Instalasi dan Setup Database

Ikuti langkah-langkah di bawah ini untuk memasang proyek dan mengonfigurasi database di lingkungan lokal Anda.

### 1. Prasyarat (Prerequisites)

Pastikan Anda sudah menginstal:

- [Node.js](https://nodejs.org/) (Versi 18.x atau yang lebih baru direkomendasikan)
- Package manager seperti `npm` (bawaan Node.js), `pnpm`, `yarn`, atau `bun`.

### 2. Instalasi Dependensi

Clone atau unduh repositori ini, lalu masuk ke direktori proyek dan jalankan perintah berikut untuk menginstal seluruh dependensi:

```bash
# Menggunakan npm
npm install

# Atau menggunakan pnpm
pnpm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan bun
bun install
```

### 3. Konfigurasi Environment Variables

Salin file konfigurasi lingkungan `.env.example` menjadi `.env` di direktori utama proyek:

```bash
cp .env.example .env
```

Buka file `.env` yang baru dibuat dan sesuaikan variabel jika diperlukan:

```env
# URL koneksi database SQLite
DATABASE_URL="file:./dev.db"

# Kunci rahasia sesi (ubah nilai ini untuk keamanan lebih pada produksi)
SESSION_SECRET="ashhaburratib-super-secure-long-session-secret-key-32-chars"
```

### 4. Setup & Inisialisasi Database (Prisma)

Karena proyek ini menggunakan Prisma dengan database SQLite lokal (`dev.db`), jalankan langkah-langkah berikut:

#### A. Jalankan Migrasi Database

Untuk membuat berkas database SQLite dan seluruh tabel berdasarkan skema Prisma (`prisma/schema.prisma`), jalankan perintah:

```bash
npx prisma migrate dev
```

_Perintah ini akan membaca folder `prisma/migrations`, menerapkan migrasi yang ada, dan membuat file `dev.db` di root direktori._

#### B. Seeding Data Awal (Default Data)

Untuk mengisi database dengan data awal (seperti akun Admin default, pengaturan landing page, struktur organisasi, berita, agenda, dll.), jalankan perintah:

```bash
npx prisma db seed
```

Setelah berhasil dijalankan, Anda akan mendapatkan akun Administrator default untuk login ke Dashboard Admin:

- **Email**: `admin@ashhaburratib.or.id`
- **Password**: `admin123`

> [!IMPORTANT]
> Sangat disarankan untuk segera mengubah password admin default ini setelah masuk pertama kali ke dashboard untuk alasan keamanan.

#### C. Membuka GUI Database (Opsional)

Jika Anda ingin melihat atau mengelola isi tabel database secara visual melalui browser, Anda dapat menggunakan Prisma Studio:

```bash
npx prisma studio
```

_Prisma Studio akan terbuka secara otomatis di browser Anda pada alamat `http://localhost:5555`._

---

## Mengubah Kredensial Admin (Email & Password)

Ada dua cara untuk mengubah email dan password akun administrator:

### Cara 1: Sebelum/Saat Seeding Pertama Kali
Sebelum menjalankan perintah `npx prisma db seed`, Anda dapat mengedit langsung data admin bawaan di file `prisma/seed.js` pada baris 32 dan 36:
```javascript
// prisma/seed.js
const adminPassword = hashPassword("PASSWORD_BARU_ANDA"); // Ganti password di sini
await prisma.admin.create({
  data: {
    name: "Administrator",
    email: "email_baru@domain.com", // Ganti email di sini
    password: adminPassword,
  },
});
```

### Cara 2: Menggunakan Script Interaktif (Kapan Saja)
Jika database sudah berjalan dan Anda ingin memperbarui email atau password admin yang sudah terdaftar tanpa menghapus data lain, jalankan script interaktif berikut:

```bash
node scripts/update-admin.js
```
Script ini akan menanyakan email dan password baru secara interaktif, meng-hash password baru Anda secara aman, lalu menyimpannya langsung ke database.

---

## Menjalankan Aplikasi

### Mode Pengembangan (Development)

Untuk menjalankan server pengembangan lokal:

```bash
npm run dev
```

Secara default, aplikasi akan berjalan di **`http://localhost:3002`** (sesuai konfigurasi `-p 3002` pada `package.json`).

### Mode Produksi (Production)

#### Cara A: Menjalankan Preview (Sederhana)
Untuk melakukan build dan menjalankan aplikasi dalam mode produksi secara interaktif:

```bash
# Build aplikasi
npm run build

# Menjalankan preview aplikasi hasil build
npm run preview
```

#### Cara B: Menggunakan PM2 (Direkomendasikan untuk Server/VPS)
Untuk menjalankan aplikasi di background pada server produksi menggunakan file konfigurasi PM2 yang sudah disediakan:

```bash
# 1. Build aplikasi terlebih dahulu
npm run build

# 2. Jalankan aplikasi menggunakan PM2
pm2 start ecosystem.config.cjs

# 3. Opsional: Mengatur agar PM2 otomatis menyala jika server restart
pm2 startup
pm2 save
```

Beberapa perintah PM2 yang berguna:
- Melihat log aplikasi: `pm2 logs ash-web-nuxt`
- Melihat status proses: `pm2 status`
- Menghentikan aplikasi: `pm2 stop ash-web-nuxt`
- Me-restart aplikasi: `pm2 restart ash-web-nuxt`

---

## Perintah Tambahan Prisma yang Berguna

- **Generate Client**: Jika Anda mengubah file `schema.prisma`, regenerasi Prisma client dengan:
  ```bash
  npx prisma generate
  ```
- **Reset Database**: Untuk menghapus semua data dan membuat ulang database dari awal:
  ```bash
  npx prisma migrate reset
  ```
