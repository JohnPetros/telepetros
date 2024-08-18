import { randomBytes } from 'node:crypto'

export class Encryptor {
  generateHash() {
    return randomBytes(16).toString('hex')
  }
}
