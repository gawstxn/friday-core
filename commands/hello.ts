import { InteractionResponseType } from 'discord-interactions'
import type { Command } from '../lib/types'
import { EMOJIS } from '@/lib/contants'

export const helloCommand: Command = {
  name: 'hello',
  description: 'ทักทายจาก bot',
  type: 1,
  execute: async (ctx) => {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `${EMOJIS.PARTY} สวัสดีครับ คุณ ${ctx.user.username}! ยินดีต้อนรับ`,
      },
    }
  },
}
