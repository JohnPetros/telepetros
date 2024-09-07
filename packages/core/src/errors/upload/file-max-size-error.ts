import { ValidationError } from '../global/validation-error'

export class FileMaxSizeError extends ValidationError {
  constructor() {
    super('File max size exceeded (5MB)')
  }
}
