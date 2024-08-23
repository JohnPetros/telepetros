import { ChannelsError } from '../channels/channels-error'

export class ListChattersByChatterError extends ChannelsError {
  constructor() {
    super('List chatters by chatter error')
  }
}
