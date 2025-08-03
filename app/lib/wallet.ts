import { useUser } from "~/atoms/user"

export const disconnectWallet = () => {
  const { setUser } = useUser()

  setUser({
    walletAddress: "",
    username: "",
    authPayload: null,
  })
}
