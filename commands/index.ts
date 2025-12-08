// commands/index.ts
import { Command } from '@/types/discord'
import { ping } from './ping'

export const commands: Record<string, Command> = {
  [ping.data.name]: ping,
}
