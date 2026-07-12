import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { scryptSync, randomBytes } from "crypto";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.admin.deleteMany();
  await prisma.news.deleteMany();
  await prisma.program.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.agenda.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.visitorMessage.deleteMany();
  await prisma.heroSettings.deleteMany();
  await prisma.profileSettings.deleteMany();

  // Create Admin
  const adminPassword = hashPassword("admin123");
  await prisma.admin.create({
    data: {
      name: "Administrator",
      email: "admin@ashhaburratib.or.id",
      password: adminPassword,
    },
  });
  console.log(
    "- Admin account created (admin@ashhaburratib.or.id / admin123)"
  );

  // Hero settings
  await prisma.heroSettings.create({
    data: {
      id: "hero",
      title: "Pondok Pesantren Ashhaburratib",
      subtitle:
        "Membentuk Generasi Qur'ani, Berakhlak Mulia, dan Berwawasan Luas",
      bgImage:
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
      btnText: "Daftar Sekarang",
      btnLink: "/information/services",
    },
  });

  // Profile settings
  await prisma.profileSettings.create({
    data: {
      id: "profile",
      sejarah:
        "Pondok Pesantren Ashhaburratib didirikan dengan tekad mulia untuk melestarikan khazanah keilmuan Islam klasik dan memadukannya dengan keilmuan modern agar melahirkan generasi yang bertakwa dan berwawasan luas.",
      visi: "Terwujudnya generasi Rabbani yang unggul dalam ilmu agama, kokoh dalam moralitas, dan mandiri dalam kehidupan.",
      misi: "1. Menyelenggarakan pendidikan pesantren salafiyah berbasis kitab kuning.\n2. Mengintegrasikan kurikulum formal kemenag untuk mencetak insan akademis berdaya saing.\n3. Membina akhlakul karimah dan karakter disiplin tinggi.",
      sambutan:
        "Assalamu'alaikum Wr. Wb. Selamat datang di website resmi Pondok Pesantren Ashhaburratib. Kami berkomitmen untuk terus mencetak kader ulama dan pemimpin bangsa yang berintegritas tinggi.",
    },
  });

  // Programs
  await prisma.program.createMany({
    data: [
      {
        title: "Madrasah Tsanawiyah (MTs)",
        description:
          "Pendidikan formal tingkat menengah dengan kurikulum Kemenag dikombinasikan dengan kajian keislaman terpadu.",
        icon: "GraduationCap",
        order: 1,
      },
      {
        title: "Madrasah Aliyah (MA)",
        description:
          "Pendidikan tingkat menengah atas yang berfokus pada persiapan akademik perguruan tinggi dan kemandirian keilmuan.",
        icon: "BookOpen",
        order: 2,
      },
      {
        title: "Program Tahfidzul Qur'an",
        description:
          "Program khusus pembimbingan hafalan Al-Qur'an 30 juz secara intensif dengan metode talaqqi dan takror berkesinambungan.",
        icon: "ShieldCheck",
        order: 3,
      },
    ],
  });

  // Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Ahmad Zainuddin",
        position: "Alumni 2018",
        photo:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
        testimonial:
          "Belajar di pesantren Ashhaburratib bukan hanya mendapatkan ilmu agama yang mendalam, tapi juga kedisiplinan dan bekal hidup mandiri.",
      },
      {
        name: "Budi Santoso",
        position: "Wali Santri",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
        testimonial:
          "Perkembangan karakter anak saya sangat terasa setelah mondok di sini. Manajemen asrama dan ustadz sangat peduli.",
      },
    ],
  });

  // Organization members
  await prisma.organization.createMany({
    data: [
      {
        name: "KH. Ahmad Syafi'i",
        position: "Dewan Pengasuh",
        photo:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
        order: 1,
      },
      {
        name: "Ustadz Muhammad Shodiq",
        position: "Pimpinan Pesantren",
        photo:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
        order: 2,
      },
    ],
  });

  // News items
  await prisma.news.createMany({
    data: [
      {
        title: "Penerimaan Santri Baru Tahun Pelajaran 2026-2027",
        slug: "penerimaan-santri-baru-2026-2027",
        thumbnail:
          "https://images.unsplash.com/photo-1588661706689-54881d77a288?q=80&w=800&auto=format&fit=crop",
        excerpt:
          "Penerimaan Santri Baru Tahun Pelajaran 2026-2027 resmi dibuka. Segera daftarkan putra-putri Anda.",
        content:
          "<p>Pondok Pesantren Ashhaburratib dengan bangga mengumumkan pembukaan pendaftaran santri baru untuk tahun pelajaran 2026-2027. Kami menyambut putra-putri terbaik bangsa untuk bergabung dalam lingkungan pendidikan yang mengedepankan pembentukan karakter, penguasaan ilmu agama (tafaqquh fiddin), dan integrasi dengan ilmu sains modern.</p><p>Pendaftaran gelombang pertama akan dibuka mulai tanggal 15 Maret 2026 hingga 15 April 2026. Calon santri wajib mengikuti ujian seleksi yang meliputi tes baca Al-Quran, tes potensi akademik dasar, dan wawancara kepribadian bersama wali santri.</p><h3>Fasilitas Pendidikan & Asrama Unggulan</h3><ul><li>Asrama yang nyaman dengan standar kelayakan optimal</li><li>Laboratorium komputer, sains, dan bahasa asing terpadu</li><li>Perpustakaan rujukan berbasis digital (E-Library)</li><li>Masjid jami' pusat kajian yang nyaman dan progresif</li></ul><p>Mari bergabung bersama kami membangun generasi Rabbani yang berakhlak mulia. Pendaftaran dapat dilakukan secara online melalui portal administrasi website kami atau datang langsung ke sekretariat pendaftaran di area administrasi pesantren pada jam kerja.</p>",
        category: "Pendaftaran",
        status: "PUBLISHED",
        totalViews: 142,
      },
      {
        title: "Kajian Kitab Kuning Spesial Ramadhan Bersama Masyaikh",
        slug: "kajian-kitab-kuning-ramadhan",
        thumbnail:
          "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop",
        excerpt:
          "Menyambut bulan suci Ramadhan, pesantren mengadakan kajian kilatan kitab tafsir dan hadits harian.",
        content:
          "<p>Dalam rangka mengisi bulan suci Ramadhan 1447 H dengan amaliyah bernilai tinggi, Pondok Pesantren Ashhaburratib kembali menyelenggarakan program kajian kilatan kitab kuning. Program tahunan ini bertujuan untuk memperdalam pemahaman dan penguasaan literasi santri terhadap literatur klasik Islam (turats) di bawah bimbingan langsung para masyaikh tingkat tinggi.</p><p>Kajian tahun ini akan difokuskan untuk membelah isi kitab-kitab fundamental di bidang fiqih (Fathul Mu'in), tafsir (Tafsir Jalalain), dan kitab pilar moral tasawuf. Seluruh santri, baik tingkat dasar mukim maupun tingkat ulya, diwajibkan mengikuti agenda ini yang padat berlangsung dari waktu pasca-sahur hingga malam menjelang tarawih.</p><p>Semoga atmosfer keilmuan ini mengantar keberkahan dan melipatgandakan pahala untuk seluruh pimpinan keluarga besar pesantren.</p>",
        category: "Kegiatan",
        status: "PUBLISHED",
        totalViews: 98,
      },
    ],
  });

  // Announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: "Pengumuman Hasil Seleksi Tes Masuk Gelombang 1",
        description:
          "Diberitahukan kepada seluruh calon santri baru yang telah mengikuti tes masuk Gelombang 1, bahwa hasil seleksi dapat dilihat melalui portal pendaftaran atau mengambil langsung surat kelulusan di kantor tata usaha.",
        createdAt: new Date("2026-03-10T00:00:00Z"),
      },
      {
        title: "Edaran Libur Awal Ramadhan 1447 H",
        description:
          "Dalam rangka menyambut bulan suci Ramadhan, kegiatan belajar mengajar (KBM) akan diliburkan mulai tanggal 1 hingga 5 Ramadhan. Santri diwajibkan kembali ke pondok pada tanggal 6 Ramadhan maksimal pukul 17.00 WIB.",
        createdAt: new Date("2026-03-05T00:00:00Z"),
      },
    ],
  });

  // Agendas
  await prisma.agenda.createMany({
    data: [
      {
        title: "Ujian Semester Ganjil Tingkat MTs & MA",
        description:
          "Pelaksanaan evaluasi belajar santri semester pertama untuk jenjang formal.",
        location: "Aula & Kelas Pesantren",
        startDate: new Date("2026-03-01T07:00:00Z"),
        endDate: new Date("2026-03-07T12:00:00Z"),
        time: "07:00 - 12:00 WIB",
      },
      {
        title: "Pembukaan Pendaftaran Santri Baru Gelombang 2",
        description:
          "Penerimaan administrasi untuk gelombang pendaftaran berikutnya.",
        location: "Sekretariat Pendaftaran PSB",
        startDate: new Date("2026-03-15T08:00:00Z"),
        endDate: new Date("2026-03-15T17:00:00Z"),
        time: "08:00 WIB - Selesai",
      },
    ],
  });

  // Gallery items
  await prisma.gallery.createMany({
    data: [
      {
        title: "Gedung Asrama Putra",
        description: "Fasilitas asrama putra Pondok Pesantren Ashhaburratib",
        type: "IMAGE",
        file: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
        thumbnail:
          "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Profil Lengkap Pondok Pesantren Ashhaburratib 2026",
        description:
          "Video pengenalan fasilitas, kurikulum, dan visi misi pesantren.",
        type: "VIDEO",
        file: "https://images.unsplash.com/photo-1588661706689-54881d77a288?q=80&w=800&auto=format&fit=crop",
        thumbnail:
          "https://images.unsplash.com/photo-1588661706689-54881d77a288?q=80&w=800&auto=format&fit=crop",
      },
    ],
  });

  // Messages
  await prisma.visitorMessage.createMany({
    data: [
      {
        name: "Ahmad Zainuddin",
        email: "zainuddin@gmail.com",
        phone: "08123456789",
        subject: "Tanya pendaftaran santri baru",
        message:
          "Assalamu'alaikum, mohon info apakah pendaftaran gelombang 2 sudah dibuka secara online?",
        status: "UNREAD",
      },
    ],
  });

  console.log("Seeding completed successfully!");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
