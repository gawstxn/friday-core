/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
} from 'discord-api-types/v10'
import * as ping from './ping'
import * as hello from './hello'

// Define Interface สำหรับ Command
export interface Command {
  definition: {
    name: string
    description: string
    type?: number // 1 = Chat Input
    options?: any[] // สำหรับรับ arguments
  }
  handler: (
    interaction: APIApplicationCommandInteraction
  ) => Promise<APIInteractionResponse> | APIInteractionResponse
}

// รวม Commands ทั้งหมดไว้ใน Object เดียว (Map)
export const commands: Record<string, Command> = {
  ping,
  hello,
}
