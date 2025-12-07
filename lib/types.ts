import type {
  APIInteraction,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIUser,
  APIGuildMember,
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
} from 'discord-api-types/v10'

export interface CommandContext {
  interaction: APIChatInputApplicationCommandInteraction
  user: {
    id: string
    username: string
    globalName?: string
  }
  guild?: {
    id: string
  }
  channel?: {
    id: string
  }
}

export interface Command {
  name: string
  description: string
  type?: number
  options?: APIApplicationCommandOption[]
  execute: (
    ctx: CommandContext
  ) => Promise<APIInteractionResponse> | APIInteractionResponse
}

export interface CommandRegistry {
  [key: string]: Command
}

// Re-export useful types
export type {
  APIInteraction,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIUser,
  APIGuildMember,
  ApplicationCommandOptionType,
}
