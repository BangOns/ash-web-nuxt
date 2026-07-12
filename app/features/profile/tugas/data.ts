import { BookOpen, ShieldCheck, Briefcase, GraduationCap } from "@lucide/vue";
export const dutiesList = [
  {
    title: "Penyelenggaraan Pendidikan Formal",
    desc: "Menyelenggarakan jenjang pendidikan mulai dari Madrasah Tsanawiyah (MTs) hingga Madrasah Aliyah (MA) dengan memadukan kurikulum Kementerian Agama dan kurikulum kekhasan pesantren.",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    title: "Pengajian Kitab Kuning",
    desc: "Menyelenggarakan kajian kitab-kitab turats (kitab kuning) secara berjenjang sebagai fondasi utama pendalaman keilmuan Islam khas pesantren salaf.",
    icon: BookOpen,
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    title: "Pengasuhan & Pembinaan Karakter",
    desc: "Membina disiplin, kemandirian, tanggung jawab, dan akhlakul karimah santri dalam kehidupan berasrama selama 24 jam sehari penuh.",
    icon: ShieldCheck,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    title: "Pengembangan Keterampilan",
    desc: "Menyelenggarakan program ekstrakurikuler meliputi muhadlarah (latihan pidato), bahasa asing (Arab & Inggris), tahfidzul Qur'an, kaligrafi, dan keterampilan IT.",
    icon: Briefcase,
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
];
