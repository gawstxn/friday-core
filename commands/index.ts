// commands/index.ts
import { Command } from '@/types/discord'
import { pingCommand } from './ping'

export const commands: Record<string, Command> = {
  [pingCommand.data.name]: pingCommand,
}
