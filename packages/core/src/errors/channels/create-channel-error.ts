import { ChannelsError } from './channels-error'

export class CreateChannelError extends ChannelsError {
  constructor() {
    super('Create channel error')
  }
}
