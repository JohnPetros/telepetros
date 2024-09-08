import { AppError } from './app-error'

export class StorageError extends AppError {
  constructor(message: string) {
    super('Storage error', message)
  }
}
