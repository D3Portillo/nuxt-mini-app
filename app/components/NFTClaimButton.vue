<script lang="ts" setup>
import { MiniKit } from "@worldcoin/minikit-js"
import { toast } from "vue-sonner"
import { useUser } from "~/atoms/user"

const { user, connectWallet, isConnected } = useUser()

const EXAMPLE_MESSAGE = "Hello, World! This is a sample message."

const handleClaimNFT = async () => {
  if (!user.value.walletAddress) return connectWallet()

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
  <div
    class="bg-gradient-to-tl from-pink-300 to-pink-500 w-full p-4 rounded-2xl"
  >
    <button
      @click="handleClaimNFT"
      class="bg-black group flex items-center justify-between outline-2 w-full outline-black/25 text-white font-bold py-4 px-5 rounded-xl"
    >
      {{ isConnected ? "Claim my NFT 🦄" : "Connect Wallet" }}
      <UIcon
        class="size-5 scale-115 group-active:translate-x-px"
        name="i-gridicons-arrow-right"
      />
    </button>

    <p class="mt-4 text-sm text-black">
      <strong>NOTE:</strong> You can use this method to authenticate an NFT
      claim. This is a simple example of how to use MiniKit to sign a message
    </p>
  </div>
</template>
