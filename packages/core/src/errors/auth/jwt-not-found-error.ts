import { AuthError } from './auth-error'

export class JwtNotFoundError extends AuthError {
  constructor() {
    super('Jwt not found')
  }
}
