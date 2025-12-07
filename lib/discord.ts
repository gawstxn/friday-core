import { verifyKey } from 'discord-interactions'

export async function verifyDiscordRequest(body: string, signature: string, timestamp: string, clientPublicKey: string): Promise<boolean> {
  return verifyKey(body, signature, timestamp, clientPublicKey)
}
