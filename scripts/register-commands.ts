import 'dotenv/config'
import { DISCORD_CONFIG } from '@/config/discord'
import { commands } from '@/commands'

// Config
const TOKEN = DISCORD_CONFIG.DISCORD_BOT_TOKEN
const APPLICATION_ID = DISCORD_CONFIG.DISCORD_APPLICATION_ID
const BASE_URL = DISCORD_CONFIG.DISCORD_API_BASE_URL

async function main() {
  const commandsData = Object.values(commands).map((cmd) => cmd.data)
  console.log(`\n🚀 Started refreshing ${commandsData.length} application commands...`)
  console.table(
    commandsData.map((cmd) => {
      const description = 'description' in cmd ? cmd.description : 'Context Menu (No Desc)'
      const optionsCount = 'options' in cmd ? cmd.options?.length || 0 : 0
      return {
        Command: `/${cmd.name}`,
        Description: description.length > 50 ? description.substring(0, 47) + '...' : description,
        Options: optionsCount,
      }
    })
  )
  const endpoint = `${BASE_URL}/applications/${APPLICATION_ID}/commands`

  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commandsData),
    })

    if (response.ok) {
      const data = await response.json()
      console.log(`\n✅ Success! Registered ${Array.isArray(data) ? data.length : 0} commands to Discord.`)
    } else {
      const errorData = await response.json()
      console.error('\n❌ Error registering commands:', JSON.stringify(errorData, null, 2))
    }
  } catch (error) {
    console.error('\n❌ Network or Server Error:', error)
  }
}

main()
