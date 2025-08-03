import { useStorage } from "@vueuse/core"
import { computed } from "vue"

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

  return {
    user,
    setUser,
    isConnected,
    authPayload,
  } as const
}
