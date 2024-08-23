import { AppError } from './app-error'

export class AlreadyExistsError extends AppError {
  constructor(message: string) {
    super('Not exists error', message)
  }
}
