import { commands } from '@/commands'

const DISCORD_API_URL = 'https://discord.com/api/v10'

async function registerCommands() {
  const token = process.env.DISCORD_BOT_TOKEN
  const appId = process.env.DISCORD_APP_ID

  if (!token || !appId) {
    console.error('Missing env vars')
    process.exit(1)
  }

  // แปลง Object commands เป็น Array ของ definitions
  const commandsList = Object.values(commands).map((cmd) => cmd.definition)

  console.log(`Registering ${commandsList.length} commands...`)

  try {
    const response = await fetch(
      `${DISCORD_API_URL}/applications/${appId}/commands`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bot ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commandsList),
      }
    )

    if (response.ok) {
      console.log('✅ Successfully registered commands!')
      // แสดงรายชื่อคำสั่งที่ลงทะเบียนไป
      commandsList.forEach((c) => console.log(` - /${c.name}`))
    } else {
      const text = await response.text()
      console.error('❌ Failed:', text)
    }
  } catch (error) {
    console.error(error)
  }
}

registerCommands()
