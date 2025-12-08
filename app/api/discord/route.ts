import { NextRequest, NextResponse } from 'next/server'
import { verifyDiscordRequest } from '@/lib/discord-verify'
import { commands } from '@/commands'
import { APIInteraction, InteractionType, InteractionResponseType } from 'discord-api-types/v10'

export async function POST(req: NextRequest) {
  const bodyText = await req.text()
  const signature = req.headers.get('x-signature-ed25519') || ''
  const timestamp = req.headers.get('x-signature-timestamp') || ''

  const isValid = await verifyDiscordRequest(bodyText, signature, timestamp, process.env.DISCORD_PUBLIC_KEY!)
  if (!isValid) {
    return new NextResponse('Invalid request signature', { status: 401 })
  }
  const interaction = JSON.parse(bodyText) as APIInteraction

  if (interaction.type === InteractionType.Ping) {
    return NextResponse.json({
      type: InteractionResponseType.Pong,
    })
  }

  if (interaction.type === InteractionType.ApplicationCommand) {
    const commandName = interaction.data.name
    const command = commands[commandName]

    if (command) {
      try {
        const response = await command.execute(interaction)
        return NextResponse.json(response)
      } catch (error) {
        console.error('Command Error:', error)
        return NextResponse.json({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: { content: '❌ Internal Error' },
        })
      }
    }
  }

  return new NextResponse('Unknown Type', { status: 400 })
}
