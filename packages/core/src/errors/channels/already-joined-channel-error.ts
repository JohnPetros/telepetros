import { AlreadyExistsError } from '../global'

export class AlreadyJoinedChannelError extends AlreadyExistsError {
  constructor() {
    super('Already joined channel')
  }
}
