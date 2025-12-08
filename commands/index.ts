import { Command } from '@/types/discord'
import { pingCommand } from './ping'
import { RegisterCommand } from './register'
import { TransactionCommand } from './transaction'

export const commands: Record<string, Command> = {
  [pingCommand.data.name]: pingCommand,
  [RegisterCommand.data.name]: RegisterCommand,
  [TransactionCommand.data.name]: TransactionCommand,
}
