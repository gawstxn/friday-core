import { Command } from './index'
import { InteractionResponseType } from 'discord-api-types/v10'

export const definition = {
  name: 'hello',
  description: 'Say hello to the user',
}

export const handler: Command['handler'] = async (interaction) => {
  // เราสามารถดึงข้อมูล User ได้จาก interaction.member.user
  const user = interaction.member?.user

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Hello there, ${user?.username || 'user'}! 👋`,
    },
  }
}
