<script setup lang="ts">
import { MiniKit } from "@worldcoin/minikit-js"
import { toast } from "vue-sonner"
import { useUser } from "~/atoms/user"

import { SIGN_IN_STATEMENT } from "~/lib/constants"

const { user, setUser, isConnected } = useUser()

// Connect wallet function
const connectWallet = async () => {
  if (!MiniKit.isInstalled()) return toast.error("MiniKit Not Available")

  try {
    // Generate a nonce for the wallet auth
    const nonce = crypto.randomUUID().replace(/-/g, "")

    // Perform wallet authentication
    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
      nonce: nonce,
      expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
      notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      statement: SIGN_IN_STATEMENT,
    })

    console.debug({ finalPayload })

    if (finalPayload.status === "success") {
      // Set user state with wallet address and username
      setUser({
        walletAddress: finalPayload.address,
        username: MiniKit?.user?.username || "",
        authPayload: {
          // Store the auth payload for future use
          // to validate the session and it's expiration
          signature: finalPayload.signature,
          message: finalPayload.message,
          version: finalPayload.version,
        },
      })

      console.log("Wallet connected successfully:", finalPayload)
    }
  } catch (error) {
    console.error(error)
  }
}

// Disconnect wallet function
const disconnectWallet = () => {
  setUser({
    walletAddress: "",
    username: "",
    authPayload: null,
  })
}
</script>

<template>
  <main class="p-6">
    <h2 class="font-bold text-2xl">World Starter Template</h2>
    <p class="max-w-xs">
      A Nuxt flavored start pack for building Mini Apps for Worldchain
    </p>

    <div class="my-6" />

    <button
      v-if="!isConnected"
      @click="connectWallet"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{
        user.walletAddress
          ? `Connected: ${user.walletAddress.slice(
              0,
              6
            )}...${user.walletAddress.slice(-4)}`
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
      v-if="user.walletAddress"
      class="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg"
    >
      <p><strong>Wallet Address:</strong> {{ user.walletAddress }}</p>
      <p v-if="user.username">
        <strong>Username:</strong> @{{ user.username }}
      </p>
    </div>

    <template v-if="isConnected">
      <div class="my-8 h-[2px] bg-black rounded-full" />
      <ExampleSignMessage :user="user" />
    </template>
  </main>
</template>
