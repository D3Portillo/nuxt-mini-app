import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  theme: "light",
  ui: {
    colorMode: false,
  },
  css: ["./app/assets/main.css"],
  modules: ["@nuxt/fonts", "@vueuse/nuxt", "@nuxt/ui"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow access to the dev server from Cloudflare Tunnel
      // Used for local development
      allowedHosts: [".trycloudflare.com"],
    },
  },
})
