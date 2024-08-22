import { NotFoundError } from '../global'

export class ChatterNotFoundError extends NotFoundError {
  constructor() {
    super('Chatter not found')
  }
}
