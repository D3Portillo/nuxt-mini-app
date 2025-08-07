<script setup lang="ts">
import { useUser } from "~/atoms/user"

const { user, connectWallet, isConnected } = useUser()
</script>

<template>
  <main class="p-6">
    <nav class="flex items-center justify-between">
      <h2 class="font-bold text-2xl">Claim Your Unicorn NFT</h2>
    </nav>

    <p class="max-w-xs">
      This badge represents your first step into building on Worldchain.
    </p>

    <div class="my-6" />

    <template v-if="isConnected">
      <div class="my-8 h-[2px] bg-black rounded-full" />
      <ExampleSignMessage :user="user" />
    </template>

    <button
      v-else
      @click="connectWallet"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Connect Wallet
    </button>
  </main>
</template>
