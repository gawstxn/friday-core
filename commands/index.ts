/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIApplicationCommandInteraction, APIInteractionResponse } from 'discord-api-types/v10'
import * as ping from './ping'
import * as hello from './hello'

export interface Command {
  definition: {
    name: string
    description: string
    type?: number
    options?: any[]
  }
  handler: (interaction: APIApplicationCommandInteraction) => Promise<APIInteractionResponse> | APIInteractionResponse
}

export const commands: Record<string, Command> = {
  ping,
  hello,
}
