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

## Menjalankan Aplikasi

### Mode Pengembangan (Development)

Untuk menjalankan server pengembangan lokal:

```bash
npm run dev
```

Secara default, aplikasi akan berjalan di **`http://localhost:3002`** (sesuai konfigurasi `-p 3002` pada `package.json`).

### Mode Produksi (Production)

Untuk melakukan build dan menjalankan aplikasi dalam mode produksi:

```bash
# Build aplikasi
npm run build

# Menjalankan preview aplikasi hasil build
npm run preview
```

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
