import nacl from 'tweetnacl'

export async function verifyDiscordRequest(body: string, signature: string, timestamp: string, clientPublicKey: string): Promise<boolean> {
  try {
    return nacl.sign.detached.verify(Buffer.from(timestamp + body), Buffer.from(signature, 'hex'), Buffer.from(clientPublicKey, 'hex'))
  } catch {
    return false
  }
}
