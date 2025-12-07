// src/app/api/interactions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyDiscordRequest } from '@/lib/discord' // (ใช้จากโค้ดชุดก่อนหน้า)
import { commands } from '@/commands' // Import registry เข้ามา
import {
  InteractionType,
  InteractionResponseType,
  APIInteraction,
} from 'discord-api-types/v10'

export async function POST(req: NextRequest) {
  const appID = process.env.DISCORD_APP_ID
  const publicKey = process.env.DISCORD_PUBLIC_KEY

  if (!appID || !publicKey)
    return NextResponse.json({ error: 'Config missing' }, { status: 500 })

  // 1. Verify Request
  const signature = req.headers.get('x-signature-ed25519')
  const timestamp = req.headers.get('x-signature-timestamp')
  const body = await req.text()

  if (
    !signature ||
    !timestamp ||
    !(await verifyDiscordRequest(body, signature, timestamp, publicKey))
  ) {
    return NextResponse.json(
      { error: 'Invalid request signature' },
      { status: 401 }
    )
  }

  // 2. Process Interaction
  const interaction: APIInteraction = JSON.parse(body)

  // Handle Ping
  if (interaction.type === InteractionType.Ping) {
    return NextResponse.json({ type: InteractionResponseType.Pong })
  }

  // Handle Commands
  if (interaction.type === InteractionType.ApplicationCommand) {
    const { name } = interaction.data
    const command = commands[name] // ค้นหา Command จาก Registry

    if (command) {
      try {
        // เรียกใช้ function handler ที่แยกไฟล์ไว้
        const response = await command.handler(interaction)
        return NextResponse.json(response)
      } catch (error) {
        console.error(error)
        return NextResponse.json({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: { content: '❌ Something went wrong executing this command.' },
        })
      }
    }
  }

  return NextResponse.json({ error: 'Unknown command' }, { status: 400 })
}
