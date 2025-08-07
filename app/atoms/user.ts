import { computed } from "vue"
import { useStorage } from "@vueuse/core"

import { MiniKit } from "@worldcoin/minikit-js"
import { toast } from "vue-sonner"

import { SIGN_IN_STATEMENT } from "~/lib/constants"

const APP_NAME = "__YOUR_APP_NAME__" // Replace with your actual app name
const user = useStorage(`${APP_NAME}.user`, {
  walletAddress: "",
  username: "",
  authPayload: null as {
    message: string
    signature: string
    version: number
  } | null,
})

export const useUser = () => {
  const setUser = (newUser: Partial<typeof user.value>) => {
    user.value = { ...user.value, ...newUser }
  }

  const isConnected = computed(() => Boolean(user.value.walletAddress))

  const authPayload = computed(() =>
    user.value.authPayload?.signature ? user.value.authPayload : null
  )

  // Connect wallet function
  const connectWallet = async () => {
    if (!MiniKit.isInstalled()) return toast.error("MiniKit Not Available")

    try {
      // Generate a nonce for the wallet auth
      const nonce = crypto.randomUUID().replace(/-/g, "")

      // Perform wallet authentication
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: nonce,
        expirationTime: new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        ), // 7 days
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 1 day ago
        statement: SIGN_IN_STATEMENT,
      })

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

  const disconnectWallet = () => {
    user.value = {
      walletAddress: "",
      username: "",
      authPayload: null,
    }
  }

  return {
    user,
    setUser,
    isConnected,
    connectWallet,
    disconnectWallet,
    authPayload,
  } as const
}
