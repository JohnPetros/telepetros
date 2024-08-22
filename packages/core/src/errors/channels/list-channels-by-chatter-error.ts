import { ChannelsError } from './channels-error'

export class ListChannelsByChatterError extends ChannelsError {
  constructor() {
    super('List channels by chatter error')
  }
}
