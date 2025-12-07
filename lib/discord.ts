import { verifyKey } from 'discord-interactions'
import { NextRequest } from 'next/server'

export async function verifyDiscordRequest(
  request: NextRequest
): Promise<boolean> {
  const signature = request.headers.get('x-signature-ed25519')
  const timestamp = request.headers.get('x-signature-timestamp')
  const publicKey = process.env.DISCORD_PUBLIC_KEY

  if (!signature || !timestamp || !publicKey) {
    return false
  }

  const body = await request.clone().text()
  return verifyKey(body, signature, timestamp, publicKey)
}

export function createEmbed(options: {
  title?: string
  description?: string
  color?: number
  fields?: Array<{ name: string; value: string; inline?: boolean }>
  footer?: { text: string }
  timestamp?: boolean
}) {
  return {
    title: options.title,
    description: options.description,
    color: options.color,
    fields: options.fields,
    footer: options.footer,
    timestamp: options.timestamp ? new Date().toISOString() : undefined,
  }
}

export function createResponse(content: string, ephemeral: boolean = false) {
  return {
    content,
    flags: ephemeral ? 64 : undefined,
  }
}
