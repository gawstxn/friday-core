import { InteractionType, InteractionResponseType } from 'discord-interactions'
import { NextRequest, NextResponse } from 'next/server'
import { verifyDiscordRequest } from '@/lib/discord'
import { commands } from '@/commands'
import type { CommandContext } from '@/lib/types'

export async function POST(request: NextRequest) {
  // Verify Discord request
  const isValid = await verifyDiscordRequest(request)

  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid request signature' },
      { status: 401 }
    )
  }

  const body = await request.json()
  const { type, data, member, user } = body

  // Handle PING
  if (type === InteractionType.PING) {
    return NextResponse.json({
      type: InteractionResponseType.PONG,
    })
  }

  // Handle Application Commands
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data
    const command = commands[name]

    if (!command) {
      return NextResponse.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '❌ ไม่พบคำสั่งนี้',
          flags: 64, // Ephemeral
        },
      })
    }

    try {
      // Create context
      const ctx: CommandContext = {
        interaction: body,
        user: {
          id: (member?.user || user).id,
          username: (member?.user || user).username,
          globalName: (member?.user || user).global_name,
        },
        guild: body.guild_id ? { id: body.guild_id } : undefined,
        channel: body.channel_id ? { id: body.channel_id } : undefined,
      }

      // Execute command
      const response = await command.execute(ctx)
      return NextResponse.json(response)
    } catch (error) {
      console.error('Command execution error:', error)
      return NextResponse.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '❌ เกิดข้อผิดพลาดในการประมวลผลคำสั่ง',
          flags: 64,
        },
      })
    }
  }

  return NextResponse.json(
    { error: 'Unknown interaction type' },
    { status: 400 }
  )
}
