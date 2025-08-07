import { verifySiweMessage, parseSiweMessage } from "@worldcoin/minikit-js"

export default defineEventHandler(async (event) => {
  /**
   * Ideally you want to validate the session using a secure method
   * Like a server-side session or a secure cookie.
   * This is a simplified example - still good for simple use cases.
   */
  const { address, signature, message, version } = await readBody(event)
  const { nonce } = parseSiweMessage(message)

  let isValid = false

  try {
    const result = await verifySiweMessage(
      {
        address,
        signature,
        status: "success",
        version: Number(version),
        message,
      },
      nonce
    )

    isValid = result.isValid
  } catch (_) {}

  return {
    isValid,
  }
})
