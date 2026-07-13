import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { scryptSync, randomBytes } from "crypto";
import readline from "readline";

// Menginisialisasi Prisma dengan adapter SQLite
const dbUrl = process.env.DATABASE_URL || "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

// Fungsi hashing password (sama seperti di seed dan auth)
function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("\n==============================================");
  console.log("   CMS ASHHABURRATIB - UPDATE ADMIN CREDENTIALS");
  console.log("==============================================\n");
  
  try {
    // Cari admin pertama di database
    const admin = await prisma.admin.findFirst();
    if (!admin) {
      console.log("❌ Error: Akun Admin tidak ditemukan di database.");
      console.log("Silakan jalankan perintah seeding terlebih dahulu: npx prisma db seed\n");
      process.exit(1);
    }

    console.log(`Email Admin Saat Ini: ${admin.email}`);
    console.log("----------------------------------------------");
    
    const emailInput = await question("Masukkan email baru (kosongkan jika tidak ingin diubah): ");
    const passwordInput = await question("Masukkan password baru (kosongkan jika tidak ingin diubah): ");

    const updateData = {};
    
    if (emailInput.trim()) {
      updateData.email = emailInput.trim();
    }
    
    if (passwordInput.trim()) {
      updateData.password = hashPassword(passwordInput.trim());
    }

    if (Object.keys(updateData).length === 0) {
      console.log("\n⚠️ Tidak ada perubahan yang dimasukkan.");
    } else {
      await prisma.admin.update({
        where: { id: admin.id },
        data: updateData,
      });
      console.log("\n✅ Email / Password admin berhasil diperbarui!");
      if (emailInput.trim()) console.log(`👉 Email baru: ${emailInput.trim()}`);
      if (passwordInput.trim()) console.log(`👉 Password baru telah di-hash dan disimpan.`);
    }
  } catch (error) {
    console.error("\n❌ Terjadi kesalahan saat memperbarui admin:", error);
  } finally {
    await prisma.$disconnect();
    rl.close();
    console.log("");
  }
}

main();
