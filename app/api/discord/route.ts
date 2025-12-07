import { NextRequest, NextResponse } from 'next/server'
import { verifyDiscordRequest } from '@/lib/discord'
import { commands } from '@/commands'
import {
  InteractionType,
  InteractionResponseType,
  APIInteraction,
} from 'discord-api-types/v10'

export async function POST(req: NextRequest) {
  try {
    // 1. Debug Env Vars (อย่าลืมลบออกตอน Production ถ้ารู้สึกว่าไม่ปลอดภัย)
    const appID = process.env.DISCORD_APPLICATION_ID
    const publicKey = process.env.DISCORD_PUBLIC_KEY

    if (!appID || !publicKey) {
      console.error('❌ Missing Environment Variables: Check Vercel Settings')
      return NextResponse.json(
        { error: 'Missing Environment Variables' },
        { status: 500 }
      )
    }

    // 2. อ่าน Headers และ Body
    const signature = req.headers.get('x-signature-ed25519')
    const timestamp = req.headers.get('x-signature-timestamp')
    const body = await req.text() // อ่าน Raw Text ครั้งเดียว

    console.log('📨 Request received:', {
      signature,
      timestamp,
      bodyLength: body.length,
    })

    if (!signature || !timestamp) {
      console.error('❌ Missing Headers')
      return NextResponse.json(
        { error: 'Missing request headers' },
        { status: 401 }
      )
    }

    // 3. Verify Signature
    const isValidRequest = await verifyDiscordRequest(
      body,
      signature,
      timestamp,
      publicKey
    )

    if (!isValidRequest) {
      console.error('❌ Invalid Signature')
      return NextResponse.json(
        { error: 'Invalid request signature' },
        { status: 401 }
      )
    }

    // 4. Parse JSON
    const interaction: APIInteraction = JSON.parse(body)

    // --- HANDLE PING (สำคัญมากสำหรับการ Save URL ครั้งแรก) ---
    if (interaction.type === InteractionType.Ping) {
      console.log('🏓 PING received from Discord')
      return NextResponse.json({ type: InteractionResponseType.Pong })
    }

    // Handle Commands
    if (interaction.type === InteractionType.ApplicationCommand) {
      const { name } = interaction.data
      console.log(`🚀 Command received: ${name}`)

      const command = commands[name]

      if (command) {
        const response = await command.handler(interaction)
        return NextResponse.json(response)
      }
    }

    return NextResponse.json({ error: 'Unknown command' }, { status: 400 })
  } catch (error) {
    // จับ Error ที่ทำให้เกิด Status 500
    console.error('💥 SERVER ERROR:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
