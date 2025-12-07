import { Command } from './index'
import { InteractionResponseType } from 'discord-api-types/v10'

export const definition = {
  name: 'ping',
  description: 'Checks the bot latency',
}

export const handler: Command['handler'] = async () => {
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: 'Pong! 🏓 (from separated file)',
    },
  }
}
