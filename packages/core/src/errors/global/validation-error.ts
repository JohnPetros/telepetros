import { AppError } from './app-error'

export class ValidationError extends AppError {
  constructor(message: string, statusCode?: number) {
    super('Validation Error', message)
  }
}
