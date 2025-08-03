<script lang="ts" setup>
import "vue-sonner/style.css"
import { Toaster } from "vue-sonner"
import { MiniKit } from "@worldcoin/minikit-js"
import { useUser } from "./atoms/user"

const { authPayload, user, isConnected } = useUser()
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

      console.debug({
        isValid,
        user: user.value,
        authPayload: authPayload.value,
      })
      if (!isValid) {
        console.warn("Session validation failed, disconnecting wallet")
      }
    } catch (_) {}
  }
})
</script>

<template>
  <Toaster position="top-center" />
  <NuxtLoadingIndicator color="#000" />
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
