import { Command } from '@/types/discord'
import {
  InteractionResponseType,
  ApplicationCommandOptionType,
  MessageFlags,
  APIChatInputApplicationCommandInteractionData,
  APIApplicationCommandInteractionDataBasicOption,
} from 'discord-api-types/v10'
import { prisma } from '@/lib/prisma'
import { TransactionType } from '@/prisma/generated/prisma/enums'

export const TransactionCommand: Command = {
  data: {
    name: 'tx',
    description: 'บันทึกรายรับ-รายจ่าย',
    options: [
      {
        name: 'type',
        description: 'ประเภทรายการ (รายรับ / รายจ่าย)',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          { name: '📈 รายรับ (Income)', value: 'INCOME' },
          { name: '💸 รายจ่าย (Expense)', value: 'EXPENSE' },
        ],
      },
      {
        name: 'amount',
        description: 'จำนวนเงิน (บาท)',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: 'description',
        description: 'รายละเอียด (ค่าอะไร)',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  execute: async (interaction) => {
    const data = interaction.data as APIChatInputApplicationCommandInteractionData
    const options = (data.options || []) as APIApplicationCommandInteractionDataBasicOption[]

    const typeValue = options.find((opt) => opt.name === 'type')?.value as TransactionType
    const amountValue = options.find((opt) => opt.name === 'amount')?.value as number
    const descValue = options.find((opt) => opt.name === 'description')?.value as string
    const discordId = interaction.member?.user?.id || interaction.user?.id

    if (!discordId) {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: { content: '❌ ไม่พบข้อมูล User ID' },
      }
    }

    try {
      const user = await prisma.user.findUnique({
        where: { discordId },
      })

      if (!user) {
        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            content: '⚠️ **คุณยังไม่ได้ลงทะเบียน!**\nกรุณาพิมพ์ `/reg` เพื่อลงทะเบียนก่อนใช้งานครับ',
            flags: MessageFlags.Ephemeral,
          },
        }
      }

      const transaction = await prisma.transaction.create({
        data: {
          type: typeValue,
          amount: amountValue,
          description: descValue,
          userId: user.id,
        },
      })
      console.log('Transaction created:', transaction)

      const icon = typeValue === 'INCOME' ? '📈' : '💸'
      const color = typeValue === 'INCOME' ? 0x57f287 : 0xed4245

      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          embeds: [
            {
              title: `${icon} บันทึกสำเร็จ!`,
              color: color,
              fields: [
                { name: 'รายการ', value: descValue, inline: true },
                // ใช้ interpolation เพื่อกัน error กรณี undefined (แม้ required จะ true)
                { name: 'จำนวนเงิน', value: `${amountValue?.toLocaleString()} บาท`, inline: true },
                { name: 'ประเภท', value: typeValue === 'INCOME' ? 'รายรับ' : 'รายจ่าย', inline: true },
              ],
              footer: { text: `บันทึกเมื่อ: ${new Date().toLocaleString('th-TH')}` },
            },
          ],
        },
      }
    } catch (error) {
      console.error('Transaction Error:', error)
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: '❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล',
          flags: MessageFlags.Ephemeral,
        },
      }
    }
  },
}
