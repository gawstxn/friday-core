import { InteractionResponseType } from 'discord-interactions'
import type { Command } from '../lib/types'
import { EMOJIS } from '@/lib/contants'
import { createResponse } from '../lib/discord'

export const pingCommand: Command = {
  name: 'ping',
  description: 'ตรวจสอบการตอบสนองของ bot',
  type: 1,
  execute: async () => {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: createResponse(`${EMOJIS.PING} Pong!`),
    }
  },
}
