import { Command } from '@/types/discord'
import { InteractionResponseType } from 'discord-api-types/v10'
import { getTimestampFromId } from '@/lib/snowflake'

export const pingCommand: Command = {
  data: {
    name: 'ping',
    description: 'Check bot latency and server time',
  },
  execute: async (interaction) => {
    const createdTimestamp = getTimestampFromId(interaction.id)
    const currentTimestamp = Date.now()
    const latency = currentTimestamp - createdTimestamp

    const formattedDate = new Date().toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      dateStyle: 'medium',
      timeStyle: 'medium',
    })

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `🏓 **Pong!**\n\`\`\`yml\nLatency: ${latency}ms\nTime:    ${formattedDate}\n\`\`\``,
      },
    }
  },
}
