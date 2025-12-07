import type { CommandRegistry } from '../lib/types'
import { helloCommand } from './hello'
import { pingCommand } from './ping'
import { infoCommand } from './info'

// Command Registry - เพิ่มคำสั่งใหม่ที่นี่
export const commands: CommandRegistry = {
  [helloCommand.name]: helloCommand,
  [pingCommand.name]: pingCommand,
  [infoCommand.name]: infoCommand,
}

// Export สำหรับ registration
export const commandsList = Object.values(commands).map((cmd) => ({
  name: cmd.name,
  description: cmd.description,
  type: cmd.type || 1,
  options: cmd.options || [],
}))
