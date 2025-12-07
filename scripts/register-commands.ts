const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN
const APPLICATION_ID = process.env.DISCORD_APPLICATION_ID

const commands = [
  {
    name: 'hello',
    description: 'ทักทายจาก bot',
    type: 1,
  },
  {
    name: 'ping',
    description: 'ตรวจสอบการตอบสนองของ bot',
    type: 1,
  },
  {
    name: 'สวัสดี',
    description: 'ทักทายภาษาไทย',
    type: 1,
  },
  {
    name: 'info',
    description: 'ข้อมูล bot',
    type: 1,
  },
]

async function registerCommands() {
  const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
    body: JSON.stringify(commands),
  })

  if (response.ok) {
    console.log('✅ Commands registered successfully!')
    const data = await response.json()
    console.log(data)
  } else {
    console.error('❌ Failed to register commands')
    const error = await response.text()
    console.error(error)
  }
}

registerCommands()
