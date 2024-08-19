import { AppError } from '../global'

export class AuthError extends AppError {
  readonly message: string

  constructor(message: string) {
    super('Auth Error', message)
    this.message = message
  }
}
