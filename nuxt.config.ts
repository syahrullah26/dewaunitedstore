export default defineNuxtConfig({
  nitro: {
    preset: "vercel",
  },

  css: ["~/assets/css/global.css", "~/components/index/hero/hero-fan.css"],
  compatibilityDate: "2025-07-15",

  devServer: {
    port: 3001,
  },

  debug: true,

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        "https://backend-dewaunited-production.up.railway.app/api/v2",
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "dark",
  },

  plugins: ["~/plugins/pinia.ts"],

  app: {
    head: {
      title: "Dewa United Store",
      titleTemplate: "%s | Dewa United Store",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/du-universal.png",
        },
      ],
      meta: [
        {
          name: "Dewa United Store",
          content: "Official Dewa United Merchandise Store",
        },
      ],
    },
  },
});
