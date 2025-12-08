export function getTimestampFromId(id: string): number {
  const DISCORD_EPOCH = 1420070400000
  const idBigInt = BigInt(id)
  // Shift bits เพื่อดึงเวลา + บวก Epoch ของ Discord
  return Number((idBigInt >> BigInt(22)) + BigInt(DISCORD_EPOCH))
}
