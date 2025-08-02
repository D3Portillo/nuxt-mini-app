<script setup lang="ts">
import { ref, onMounted } from "vue"
import { MiniKit } from "@worldcoin/minikit-js"

// Reactive state
const walletAddress = ref("")
const username = ref("")

// Initialize MiniKit on component mount
onMounted(() => {
  if (typeof window !== "undefined") {
    MiniKit.install()

    // Check if already connected
    const user = MiniKit.user
    walletAddress.value = user?.walletAddress || ""
    username.value = user?.username || ""
  }
})

// Connect wallet function
const connectWallet = async () => {
  if (!MiniKit.isInstalled()) return alert("MiniKit Not Available")

  try {
    // Generate a nonce for the wallet auth
    const nonce = crypto.randomUUID().replace(/-/g, "")

    // Perform wallet authentication
    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
      nonce: nonce,
      expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
      notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      statement: "Confirm your wallet connection to Worldchain",
    })

    if (finalPayload.status === "success") {
      walletAddress.value = finalPayload.address

      // Get username and profile info
      if (MiniKit.user?.username) {
        username.value = MiniKit.user.username
      }

      console.log("Wallet connected successfully:", finalPayload)
    }
  } catch (error) {
    console.error(error)
  }
}

// Disconnect wallet function
const disconnectWallet = () => {
  // * TODO: Implement actual disconnect logic if needed
  // For now, just clear the state
  walletAddress.value = ""
  username.value = ""
}
</script>

<template>
  <NuxtRouteAnnouncer />
  <main class="p-6">
    <h2 class="font-bold text-2xl text-black">World Starter Template</h2>
    <p class="max-w-xs">
      A Nuxt flavored start pack for building Mini Apps for Worldchain
    </p>

    <div class="my-6" />

    <button
      v-if="!walletAddress"
      @click="connectWallet"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{
        walletAddress
          ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(
              -4
            )}`
          : "Connect Wallet"
      }}
    </button>

    <button
      v-else
      @click="disconnectWallet"
      class="bg-gray-300 text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-400"
    >
      Disconnect Wallet
    </button>

    <div
      v-if="walletAddress"
      class="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"
    >
      <p><strong>Wallet Address:</strong> {{ walletAddress }}</p>
      <p v-if="username"><strong>Username:</strong> @{{ username }}</p>
    </div>
  </main>
</template>
