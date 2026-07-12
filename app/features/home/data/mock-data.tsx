import {
  BookOpen,
  Building,
  GraduationCap,
  ShieldCheck,
  Users,
} from "@lucide/vue";
const features = [
  {
    icon: <BookOpen class="w-8 h-8 mx-auto mb-4 text-[#0B4A3F]" />,
    title: "Tahfidz",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu.",
  },
  {
    icon: <GraduationCap class="w-8 h-8 mx-auto mb-4 text-[#0B4A3F]" />,
    title: "Akademik",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu.",
  },
  {
    icon: <ShieldCheck class="w-8 h-8 mx-auto mb-4 text-[#0B4A3F]" />,
    title: "Karakter",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu.",
  },
  {
    icon: <Building class="w-8 h-8 mx-auto mb-4 text-[#0B4A3F]" />,
    title: "Fasilitas",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu.",
  },
];

const programs = [
  {
    id: "tahfidz",
    icon: <BookOpen class="w-8 h-8 text-[#0B4A3F]" />,
    title: "Tahfidz Al-Quran",
    desc: "Program unggulan hafalan Al-Quran dengan metode mutqin, bersanad, dan berkesinambungan.",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "kitab",
    icon: <Users class="w-8 h-8 text-[#0B4A3F]" />,
    title: "Kajian Kitab Kuning",
    desc: "Pengkajian literatur klasik Islam terpadu dengan manhaj ahlussunnah wal jama'ah.",
    image:
      "https://images.unsplash.com/photo-1584364028682-1dd3543d41ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "formal",
    icon: <GraduationCap class="w-8 h-8 text-[#0B4A3F]" />,
    title: "Pendidikan Formal",
    desc: "Kurikulum terintegrasi antara ilmu agama dan sains teknologi untuk menjawab tantangan zaman.",
    image:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop",
  },
];

const newsData = [
  {
    id: 1,
    title: "Penerimaan Santri Baru Tahun Pelajaran 2026-2027",
    date: "12 Mar 2026",
    category: "Pendaftaran",
    image:
      "https://images.unsplash.com/photo-1588661706689-54881d77a288?q=80&w=800&auto=format&fit=crop",
    excerpt:
      "Penerimaan Santri Baru Tahun Pelajaran 2026-2027 resmi dibuka. Segera daftarkan putra-putri Anda untuk masa depan Islami gemilang.",
  },
  {
    id: 2,
    title: "Kajian Kitab Kuning Spesial Ramadhan Bersama Masyaikh",
    date: "10 Mar 2026",
    category: "Kegiatan",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop",
    excerpt:
      "Menyambut bulan suci Ramadhan, pesantren mengadakan kajian kilatan kitab tafsir dan hadits harian.",
  },
  {
    id: 3,
    title: "Santri Ashhaburratib Juara 1 Lomba MQK Nasional",
    date: "5 Mar 2026",
    category: "Prestasi",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
    excerpt:
      "Alhamdulillah, delegasi dari pondok berhasil membawa trofi kemenangan di Musabaqah Qira'atil Kutub Nasional 2026.",
  },
];

const galleryData = [
  "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588661706689-54881d77a288?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512404021703-0ed8d2274431?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400&auto=format&fit=crop",
];

const testimonials = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    role: "Alumni",
    quote:
      "Pondok Pesantren Ashhaburratib tidak hanya memberikan saya ilmu agama yang kuat, tetapi juga membentuk karakter dan kemandirian yang mengakar.",
  },
  {
    id: 2,
    name: "Siti Rahmawati",
    role: "Wali Santri",
    quote:
      "Sangat bersyukur bisa menyekolahkan anak kami di sini. Perkembangan akhlak dan kedisiplinan anak kami sangat terlihat.",
  },
  {
    id: 3,
    name: "M. Rizky",
    role: "Mahasiswa",
    quote:
      "Metode pembelajaran kitab kuning yang saya dapatkan di Ashhaburratib sangat membantu saya dalam melanjutkan studi.",
  },
];
const MockData = {
  features,
  programs,
  newsData,
  galleryData,
  testimonials,
};

export default MockData;
