import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/main.css"],
  modules: ["@nuxt/fonts"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow access to the dev server from Cloudflare Tunnel
      // Used for local development
      allowedHosts: [".trycloudflare.com"],
    },
  },
})
