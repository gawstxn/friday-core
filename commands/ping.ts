import { Command } from './index'
import { InteractionResponseType } from 'discord-api-types/v10'

const DISCORD_EPOCH = 1420070400000

function getTimestampFromSnowflake(id: string) {
  const snowflake = BigInt(id)
  const shifted = snowflake >> BigInt(22)
  return Number(shifted) + DISCORD_EPOCH
}

function snowflakeToDate(id: string) {
  const ts = getTimestampFromSnowflake(id)
  return new Date(ts)
}

export const definition = {
  name: 'ping',
  description: 'Checks the bot latency',
}

export const handler: Command['handler'] = async (interaction) => {
  const createdAt = snowflakeToDate(interaction.id)
  const latency = Date.now() - createdAt.getTime()

  const formattedDate = createdAt.toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  })

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `
      🏓 **Pong!**
      Latency: **${latency}ms**
      Created at: **${formattedDate}**`,
    },
  }
}
