import { verifyKey } from 'discord-interactions'

export async function verifyDiscordRequest(
  body: string,
  signature: string,
  timestamp: string,
  clientPublicKey: string
): Promise<boolean> {
  // verifyKey จะ return true ถ้า signature ถูกต้อง
  return verifyKey(body, signature, timestamp, clientPublicKey)
}
