import { NotFoundError } from '../global'

export class ChannelNotFoundError extends NotFoundError {
  constructor() {
    super('Channel not found')
  }
}
