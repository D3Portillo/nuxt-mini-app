<script setup lang="ts">
import { useUser } from "~/atoms/user"

const { user } = useUser()
// TODO: Render user claimed NFTs
</script>

<template>
  <main class="p-6">
    <nav class="flex items-center justify-between">
      <h2 class="font-bold text-2xl">Claim Your Unicorn NFT</h2>
    </nav>

    <p class="max-w-xs">
      Claim a unique badge that represents your first step into building on
      Worldchain.
    </p>

    <div class="my-6" />

    <NFTClaimButton />

    <div class="mt-8 mb-4 h-[2px] bg-black rounded-full" />
    <nav class="flex mb-4 items-center justify-between">
      <strong>Claimed NFTs</strong>
      <span class="text-lg">{{ 0 }}</span>
    </nav>

    <div
      class="h-40 grid place-items-center rounded-xl border border-dashed border-black/25"
    >
      <UIcon class="size-12 opacity-30" name="i-fa-star-half-empty" />
    </div>
  </main>
</template>
