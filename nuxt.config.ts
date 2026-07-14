// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  site: {
    url: "https://ashhaburratib.or.id", // Ganti dengan domain produksi Anda nanti
    name: "Pondok Pesantren Ashhaburratib",
    description: "Official Website of Pondok Pesantren Ashhaburratib",
    defaultLocale: "id",
  },
  sitemap: {
    exclude: [
      "/admin/**",
      "/login/**"
    ],
  },
  app: {
    head: {
      title: "Pondok Pesantren Ashhaburratib",
      titleTemplate: "%s",
      meta: [
        {
          name: "description",
          content: "Official Website of Pondok Pesantren Ashhaburratib",
        },
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          name: "google-site-verification",
          content: "hligCcWWDDhfPqc5dDbnIMkQxABEX_NlVlEcDaLa4qk",
        },
        // Open Graph / Facebook Meta Tags
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://ashhaburratib.or.id" },
        { property: "og:title", content: "Pondok Pesantren Ashhaburratib" },
        { property: "og:description", content: "Official Website of Pondok Pesantren Ashhaburratib" },
        { property: "og:image", content: "https://ashhaburratib.or.id/bg-ash.jpg" },
        { property: "og:image:alt", content: "Pondok Pesantren Ashhaburratib" },
        { property: "og:site_name", content: "Pondok Pesantren Ashhaburratib" },

        // Twitter Card Meta Tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:url", content: "https://ashhaburratib.or.id" },
        { name: "twitter:title", content: "Pondok Pesantren Ashhaburratib" },
        { name: "twitter:description", content: "Official Website of Pondok Pesantren Ashhaburratib" },
        { name: "twitter:image", content: "https://ashhaburratib.or.id/bg-ash.jpg" },
      ],
    },
  },
  components: {
    dirs: [
      {
        path: "~/features/navigation/navbar",
        prefix: "Navbar",
      },
      {
        path: "~/components/layout",
        prefix: "Layout",
      },
      {
        path: "~/features/home",
        prefix: "HomePage",
      },
      {
        path: "~/features/home/components",
        prefix: "HomeComponents",
      },
      // Profile/Visi
      {
        path: "~/features/profile/visi",
        prefix: "VisiPage",
      },
      {
        path: "~/features/profile/visi/components",
        prefix: "VisiComponents",
      },
      // Profile/Struktur
      {
        path: "~/features/profile/struktur",
        prefix: "StrukturPage",
      },
      {
        path: "~/features/profile/struktur/components",
        prefix: "StrukturComponents",
      },
      // Profile/Tugas
      {
        path: "~/features/profile/tugas",
        prefix: "TugasPage",
      },
      {
        path: "~/features/profile/tugas/components",
        prefix: "TugasComponents",
      },
      // Berita
      {
        path: "~/features/news",
        prefix: "NewsPage",
      },
      {
        path: "~/features/news/components",
        prefix: "NewsComponents",
      },
      // Gallery/Photos
      {
        path: "~/features/gallery/photos",
        prefix: "GalleryPhotosPage",
      },
      {
        path: "~/features/gallery/photos/components",
        prefix: "GalleryPhotosComponents",
      },
      // Gallery/Videos
      {
        path: "~/features/gallery/videos",
        prefix: "GalleryVideosPage",
      },
      {
        path: "~/features/gallery/videos/components",
        prefix: "GalleryVideosComponents",
      },
      // Information/Services
      {
        path: "~/features/information/services",
        prefix: "InfoServicesPage",
      },
      {
        path: "~/features/information/services/components",
        prefix: "InfoServicesComponents",
      },
      // Information/Announcements
      {
        path: "~/features/information/announcements",
        prefix: "InfoAnnouncementsPage",
      },
      {
        path: "~/features/information/announcements/components",
        prefix: "InfoAnnouncementsComponents",
      },
      // Information/Agenda
      {
        path: "~/features/information/agenda",
        prefix: "InfoAgendaPage",
      },
      {
        path: "~/features/information/agenda/components",
        prefix: "InfoAgendaComponents",
      },
      // Information/Infographics
      {
        path: "~/features/information/infographics",
        prefix: "InfoInfographicsPage",
      },
      {
        path: "~/features/information/infographics/components",
        prefix: "InfoInfographicsComponents",
      },
      // Interaction/Survey
      {
        path: "~/features/interaction/survey",
        prefix: "InteractSurveyPage",
      },
      {
        path: "~/features/interaction/survey/components",
        prefix: "InteractSurveyComponents",
      },
      // Interaction/Guest Book
      {
        path: "~/features/interaction/guest-book",
        prefix: "InteractGuestBookPage",
      },
      {
        path: "~/features/interaction/guest-book/components",
        prefix: "InteractGuestBookComponents",
      },
      // Interaction/Your Voice
      {
        path: "~/features/interaction/your-voice",
        prefix: "InteractYourVoicePage",
      },
      {
        path: "~/features/interaction/your-voice/components",
        prefix: "InteractYourVoiceComponents",
      },
      // Interaction/Suggestions & Reviews
      {
        path: "~/features/interaction/suggestions-reviews",
        prefix: "InteractSuggestionsReviewsPage",
      },
      {
        path: "~/features/interaction/suggestions-reviews/components",
        prefix: "InteractSuggestionsReviewsComponents",
      },
      // Admin Features
      {
        path: "~/features/admin/dashboard",
        prefix: "AdminDashboardPage",
      },
      {
        path: "~/features/admin/gallery",
        prefix: "AdminGalleryPage",
      },
      {
        path: "~/features/admin/information",
        prefix: "AdminInformationPage",
      },
      {
        path: "~/features/admin/landing",
        prefix: "AdminLandingPage",
      },
      {
        path: "~/features/admin/login",
        prefix: "AdminLoginPage",
      },
      {
        path: "~/features/admin/messages",
        prefix: "AdminMessagesPage",
      },
      {
        path: "~/features/admin/profile",
        prefix: "AdminProfilePage",
      },
      {
        path: "~/features/admin/news",
        prefix: "AdminNewsPage",
      },
      {
        path: "~/features/admin/news/editor",
        prefix: "AdminNewsEditorPage",
      },
    ],
  },
  css: ["./app/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss(), vueJsxPlugin()],
  },
  modules: [
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/seo",
    "nuxt-tiptap-editor",
    "@pinia/nuxt",
    "motion-v/nuxt",
    "nuxt-swiper",
    "@nuxt/eslint",
  ],
});