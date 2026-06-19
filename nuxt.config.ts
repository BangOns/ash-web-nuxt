// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Pondok Pesantren Ashhaburratib",
      meta: [
        {
          name: "description",
          content: "Official Website of Pondok Pesantren Ashhaburratib",
        },
      ],
    },
  },
  components: {
    dirs: [
      {
        path: "~/features/navigation/navbar",
        prefix: "Navbar",
      },
    ],
  },
  css: ["./app/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/seo",
    "nuxt-tiptap-editor",
    "@pinia/nuxt",
    "motion-v/nuxt",
  ],
});
