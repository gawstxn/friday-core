// commands/index.ts
import { Command } from '@/types/discord'
import { pingCommand } from './ping'
import { RegisterCommand } from './register'

export const commands: Record<string, Command> = {
  [pingCommand.data.name]: pingCommand,
  [RegisterCommand.data.name]: RegisterCommand,
}
