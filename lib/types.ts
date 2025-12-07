import type {
  APIInteraction,
  APIChatInputApplicationCommandInteraction,
  APIUser,
  APIGuildMember,
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
  APIInteractionResponseChannelMessageWithSource,
  APIInteractionResponsePong,
  APIInteractionResponseDeferredChannelMessageWithSource,
  APIInteractionResponseDeferredMessageUpdate,
  APIInteractionResponseUpdateMessage,
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
export type InteractionResponse =
  | APIInteractionResponsePong
  | APIInteractionResponseChannelMessageWithSource
  | APIInteractionResponseDeferredChannelMessageWithSource
  | APIInteractionResponseDeferredMessageUpdate
  | APIInteractionResponseUpdateMessage

export interface Command {
  name: string
  description: string
  type?: number
  options?: APIApplicationCommandOption[]
  execute: (ctx: CommandContext) => Promise<InteractionResponse> | InteractionResponse
}

export interface CommandRegistry {
  [key: string]: Command
}

export type { APIInteraction, APIChatInputApplicationCommandInteraction, APIUser, APIGuildMember, ApplicationCommandOptionType, APIInteractionResponseChannelMessageWithSource }
