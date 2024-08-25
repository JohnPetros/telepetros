import { AuthError } from './auth-error'

export class GoogleClientCodeNotFoundError extends AuthError {
  constructor() {
    super('Github client code not found')
  }
}
