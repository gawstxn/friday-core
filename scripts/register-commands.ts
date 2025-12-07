import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import { commands } from '@/commands'
const DISCORD_API_URL = process.env.DISCORD_API_URL

async function registerCommands() {
  const token = process.env.DISCORD_BOT_TOKEN
  const appId = process.env.DISCORD_APPLICATION_ID
  if (!token || !appId) {
    console.error('❌ Missing env vars: DISCORD_BOT_TOKEN or DISCORD_APPLICATION_ID')
    process.exit(1)
  }
  const commandsList = Object.values(commands).map((cmd) => cmd.definition)
  console.log(`Registering ${commandsList.length} commands to App ID: ${appId}...`)

  try {
    const response = await fetch(`${DISCORD_API_URL}/applications/${appId}/commands`, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commandsList),
    })

    if (response.ok) {
      console.log('✅ Successfully registered commands!')
      commandsList.forEach((c) => console.log(` - /${c.name}`))
    } else {
      // อ่าน Error text ให้ละเอียดขึ้น
      const errorData = await response.json()
      console.error('❌ Failed:', JSON.stringify(errorData, null, 2))
    }
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

registerCommands()
