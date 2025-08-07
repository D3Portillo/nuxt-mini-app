<script setup lang="ts">
import { toast } from "vue-sonner"
import { useUser } from "~/atoms/user"
import { beautifyAddress } from "~/lib/utils"

const { copy } = useClipboard()
const { user, isConnected, connectWallet, disconnectWallet } = useUser()

const isModalOpen = ref(false)
const router = useRouter()

const handleVisitNFTCollection = () => {
  router.push("/collection")
  isModalOpen.value = false
}

const handleToggleConnectWallet = () => {
  if (isConnected.value) return disconnectWallet()
  connectWallet()
}

const handleCopyAddress = () => {
  const address = user.value.walletAddress
  if (address) {
    return copy(address), toast.success("Address copied to clipboard")
  }

  // Connect wallet if not connected
  connectWallet()
}
</script>

<template>
  <UDrawer
    :ui="{
      content: 'rounded-t-3xl',
    }"
    v-model:open="isModalOpen"
  >
    <button
      class="fixed top-4 right-4 flex flex-col items-center justify-center gap-1 size-8"
    >
      <div
        :class="[
          'h-0.5 bg-black w-5 transition-transform duration-300',
          isModalOpen && 'rotate-45 translate-y-[150%]',
        ]"
      />
      <div
        v-if="!isModalOpen"
        class="h-0.5 bg-black w-5 transition-opacity duration-300"
      />
      <div
        :class="[
          'h-0.5 bg-black w-5 transition-transform duration-300',
          isModalOpen && '-rotate-45 -translate-y-[150%]',
        ]"
      />
    </button>

    <template #content>
      <section
        class="flex min-h-[60vh] p-4 flex-col items-center justify-start gap-4"
      >
        <h2 class="font-semibold text-2xl">Manage Wallet</h2>
        <div
          class="mt-5 border-2 w-full flex items-center gap-4 rounded-2xl px-4 py-3"
        >
          <div class="size-10 bg-black rounded-xl" />
          <div>
            <p class="font-semibold">Connected</p>
            <p class="-mt-0.5">
              {{
                user.walletAddress
                  ? beautifyAddress(user.walletAddress, 9)
                  : "N/A"
              }}
            </p>
          </div>

          <div class="flex-grow" />
          <button @click="handleCopyAddress" class="group p-1">
            <UIcon
              name="i-cuida-copy-outline"
              class="size-6 group-active:scale-110"
            />
          </button>
        </div>

        <div class="flex-grow my-4" />

        <div class="w-full flex flex-col gap-3">
          <button
            @click="handleVisitNFTCollection"
            class="w-full h-11 bg-black/10 p-2 rounded-xl font-semibold"
          >
            NFT Collection
          </button>
          <button
            @click="handleToggleConnectWallet"
            class="w-full bg-black h-11 text-white p-2 rounded-xl font-semibold"
          >
            {{ isConnected ? `Disconnect Wallet` : `Connect Wallet` }}
          </button>
        </div>
      </section>
    </template>
  </UDrawer>
</template>
