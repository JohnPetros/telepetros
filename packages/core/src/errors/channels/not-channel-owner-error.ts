import { ChannelsError } from './channels-error'

export class NotChannelOwnerError extends ChannelsError {
  constructor() {
    super('Not channel owner error')
  }
}
