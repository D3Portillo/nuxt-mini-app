import { verifySiweMessage, parseSiweMessage } from "@worldcoin/minikit-js"

export default defineEventHandler(async (event) => {
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
