import { randomBytes, randomUUID } from 'node:crypto'

export class Encryptor {
  generateHash() {
    return randomBytes(16).toString('hex')
  }

  generateRandomId() {
    return randomUUID()
  }
}
