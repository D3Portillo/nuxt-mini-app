<script lang="ts" setup>
import { MiniKit } from "@worldcoin/minikit-js"
onMounted(async () => {
  // Setup MiniKit
  MiniKit.install()

  if (process.env.NODE_ENV == "development") {
    // Start Eruda for debugging
    const eruda = (await import("eruda")).default
    eruda.init()
  }
})
</script>

<template>
  <NuxtLoadingIndicator color="#000" />
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
