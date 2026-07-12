import { Settings, Target, Users } from "@lucide/vue";
import type { Component } from "vue"; // Wajib di-import untuk tipe data icon

// 1. Definisikan bentuk data untuk Sub-menu
export interface SubLink {
  name: string;
  href: string;
  icon?: Component; // Tanda '?' artinya properti ini boleh kosong (opsional)
}

// 2. Definisikan bentuk data untuk Menu Utama
export interface NavLink {
  name: string;
  href: string;
  subLinks?: SubLink[]; // Tanda '?' artinya menu ini belum tentu punya sub-menu
}

// 3. Terapkan tipe 'NavLink[]' ke dalam array Anda
export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "Profile",
    href: "/profile",
    subLinks: [
      {
        name: "Visi Misi",
        href: "/profile/vision-mission",
        icon: Target,
      },
      {
        name: "Struktur Organisasi",
        href: "/profile/organizational-structure",
        icon: Users,
      },
      {
        name: "Tugas Pokok",
        href: "/profile/main-tasks",
        icon: Settings,
      },
    ],
  },
  { name: "Berita", href: "/news" },
  {
    name: "Informasi",
    href: "/information",
    subLinks: [
      { name: "Layanan", href: "/information/services" },
      { name: "Pengumuman", href: "/information/announcements" },
      { name: "Agenda", href: "/information/agenda" },
      { name: "Infografis", href: "/information/infographics" },
    ],
  },
  {
    name: "Galeri",
    href: "/gallery",
    subLinks: [
      { name: "Photos", href: "/gallery/photos" },
      { name: "Videos", href: "/gallery/videos" },
    ],
  },
  {
    name: "Interaksi",
    href: "/interaction",
    subLinks: [
      { name: "Survey", href: "/interaction/survey" },
      { name: "Guest Book", href: "/interaction/guest-book" },
      { name: "Your Voice", href: "/interaction/your-voice" },
      {
        name: "Suggestions & Reviews",
        href: "/interaction/suggestions-reviews",
      },
    ],
  },
];
