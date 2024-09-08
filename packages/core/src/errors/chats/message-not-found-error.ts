import { NotFoundError } from '../global'

export class MessageNoFoundError extends NotFoundError {
  constructor() {
    super('Message not found')
  }
}
