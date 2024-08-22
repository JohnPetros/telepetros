import { AuthError } from './auth-error'

export class UnauthorizedError extends AuthError {
  constructor() {
    super('Unauthorized error')
  }
}
