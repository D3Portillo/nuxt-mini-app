<script lang="ts" setup>
import { MiniKit } from "@worldcoin/minikit-js"
import { toast } from "vue-sonner"

defineProps<{
  user: {
    walletAddress: string
    username: string
  }
}>()

const EXAMPLE_MESSAGE = "Hello, World! This is a test message."

const handleClaimNFT = async () => {
  if (!MiniKit.isInstalled()) return alert("MiniKit Not Available")

  try {
    // We request to sign the example message
    const { finalPayload } = await MiniKit.commandsAsync.signMessage({
      message: EXAMPLE_MESSAGE,
    })

    if (finalPayload.status === "success") {
      console.log("Message signed successfully:", finalPayload)
      toast.success("NFT claimed successfully! Check your wallet.")
    }
  } catch (_) {}
}
</script>

<template>
  <button
    @click="handleClaimNFT"
    class="bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 mt-4"
  >
    Claim Unicorn NFT
  </button>
  <p class="mt-4 text-sm text-black/60">
    <strong>Note:</strong> This is a demo message. Replace it with your own
    message or transaction details.
  </p>
</template>
