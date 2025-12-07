import { InteractionResponseType } from 'discord-interactions'
import type { Command } from '../lib/types'
import { COLORS, EMOJIS } from '@/lib/constants'
import { createEmbed } from '@/lib/discord'

export const infoCommand: Command = {
  name: 'info',
  description: 'แสดงข้อมูล bot',
  type: 1,
  execute: async () => {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          createEmbed({
            title: `${EMOJIS.INFO} ข้อมูล Bot`,
            description:
              'Discord Bot สร้างด้วย Next.js และ Discord Interactions',
            color: COLORS.INFO,
            fields: [
              {
                name: 'เวอร์ชัน',
                value: '1.0.0',
                inline: true,
              },
              {
                name: 'Framework',
                value: 'Next.js 15',
                inline: true,
              },
              {
                name: 'Library',
                value: 'discord-interactions',
                inline: true,
              },
              {
                name: 'จำนวนคำสั่ง',
                value: '4 คำสั่ง',
                inline: true,
              },
            ],
            timestamp: true,
          }),
        ],
      },
    }
  },
}
