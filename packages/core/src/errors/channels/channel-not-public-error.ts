import { AuthError } from '../auth'

export class ChannelNotPublicError extends AuthError {
  constructor() {
    super('Channel is not public')
  }
}
