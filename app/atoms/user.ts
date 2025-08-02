import { useStorage } from "@vueuse/core"
import { computed, readonly } from "vue"

const APP_NAME = "__YOUR_APP_NAME__" // Replace with your actual app name
const user = useStorage(`${APP_NAME}.user`, {
  walletAddress: "",
  username: "",
})

export const useUser = () => {
  const setUser = (newUser: Partial<typeof user.value>) => {
    user.value = { ...user.value, ...newUser }
  }

  const isConnected = computed(() => Boolean(user.value.walletAddress))

  return {
    user: readonly(user), // Prevent external mutations
    setUser,
    isConnected,
  }
}
