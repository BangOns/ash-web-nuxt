export const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Profile",
    href: "/profile",
    subLinks: [
      { name: "Visi Misi", href: "/profile/vision-mission" },
      {
        name: "Struktur Organisasi",
        href: "/profile/organizational-structure",
      },
      { name: "Tugas Pokok", href: "/profile/main-duties" },
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
