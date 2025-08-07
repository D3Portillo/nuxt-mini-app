<script lang="ts" setup>
import "vue-sonner/style.css"

import { Toaster } from "vue-sonner"
import { MiniKit } from "@worldcoin/minikit-js"

import { useUser } from "./atoms/user"

const { authPayload, user, isConnected, disconnectWallet } = useUser()
onMounted(async () => {
  // Setup MiniKit
  MiniKit.install()

  if (process.env.NODE_ENV == "development") {
    // Start Eruda for debugging
    const eruda = (await import("eruda")).default
    eruda.init()
  }

  if (isConnected && authPayload.value) {
    // We validate current session
    try {
      const { isValid } = await $fetch("/api/validate-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          address: user.value.walletAddress,
          signature: authPayload.value.signature,
          message: authPayload.value.message,
          version: authPayload.value.version,
        },
      })

      if (!isValid) {
        // If session is invalid, we disconnect the wallet
        console.warn("Session validation failed, disconnecting wallet")
        disconnectWallet()
      }
    } catch (_) {}
  }
})

useHead({
  title: "Mini App Starter",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    {
      name: "description",
      content:
        "A Nuxt flavored start pack for building Mini Apps for Worldchain",
    },
    {
      property: "og:image",
      content: "https://movies.nuxt.space/social-card.png",
    },
    { name: "twitter:card", content: "summary_large_image" },
  ],
})
</script>

<template>
  <Toaster position="top-center" />
  <NuxtLoadingIndicator color="#000" />
  <NuxtRouteAnnouncer />

  <div class="max-w-2xl flex-col overflow-hidden h-dvh mx-auto">
    <TopNavigation />
    <NuxtPage class="h-full" />
    <BottomNavigation />
  </div>
</template>
