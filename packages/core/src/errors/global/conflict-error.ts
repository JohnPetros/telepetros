import { AppError } from './app-error'

export class ConflictError extends AppError {
  constructor(message: string) {
    super('Conflict error', message)
  }
}
