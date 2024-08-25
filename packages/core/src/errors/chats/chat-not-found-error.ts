import { NotFoundError } from '../global'

export class ChatNoFoundError extends NotFoundError {
  constructor() {
    super('Chat not found')
  }
}
