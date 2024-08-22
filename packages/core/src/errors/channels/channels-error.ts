import { AppError } from '../global'

export class ChannelsError extends AppError {
  readonly message: string

  constructor(message: string) {
    super('Channel Error', message)
    this.message = message
  }
}
