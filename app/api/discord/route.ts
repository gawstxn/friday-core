import { NextRequest, NextResponse } from 'next/server'
import { verifyDiscordRequest } from '@/lib/discord'
import { commands } from '@/commands'
import { InteractionType, InteractionResponseType, APIInteraction } from 'discord-api-types/v10'

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-signature-ed25519')
    const timestamp = req.headers.get('x-signature-timestamp')
    const body = await req.text()

    if (!signature || !timestamp) return NextResponse.json({ error: 'Missing request headers' }, { status: 401 })
    const isValidRequest = await verifyDiscordRequest(body, signature, timestamp, process.env.DISCORD_CLIENT_PUBLIC_KEY!)

    if (!isValidRequest) return NextResponse.json({ error: 'Invalid request signature' }, { status: 401 })
    const interaction: APIInteraction = JSON.parse(body)

    if (interaction.type === InteractionType.Ping) return NextResponse.json({ type: InteractionResponseType.Pong })
    if (interaction.type === InteractionType.ApplicationCommand) {
      const { name } = interaction.data
      const command = commands[name]
      if (command) {
        const response = await command.handler(interaction)
        return NextResponse.json(response)
      }
    }

    return NextResponse.json({ error: 'Unknown command' }, { status: 400 })
  } catch (error) {
    console.error('💥 SERVER ERROR:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
