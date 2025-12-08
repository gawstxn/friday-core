// commands/general/register.ts
import { Command } from '@/types/discord'
import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10'
import { prisma } from '@/lib/prisma'

export const RegisterCommand: Command = {
  data: {
    name: 'reg',
    description: 'Register a new account to the system',
  },
  execute: async (interaction) => {
    const user = interaction.member?.user || interaction.user
    if (!user) {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: { content: '❌ ไม่พบข้อมูลผู้ใช้', flags: MessageFlags.Ephemeral },
      }
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { discordId: user.id },
      })

      if (existingUser) {
        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            content: `⚠️ **คุณลงทะเบียนไปแล้ว!** (ตั้งแต่ ${existingUser.createdAt.toLocaleDateString('th-TH')})`,
            flags: MessageFlags.Ephemeral,
          },
        }
      }

      const newUser = await prisma.user.create({
        data: {
          discordId: user.id,
          username: user.username,
        },
      })

      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `✅ **ลงทะเบียนสำเร็จ!**\nยินดีต้อนรับคุณ <@${newUser.discordId}> เข้าสู่ระบบ`,
        },
      }
    } catch (error) {
      console.error('Database Error:', error)
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: '❌ เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล',
          flags: MessageFlags.Ephemeral,
        },
      }
    }
  },
}
