import { ValidationError } from '../global/validation-error'

export class ImageFileMaxSizeError extends ValidationError {
  constructor() {
    super('Image file max size exceeded (5MB)')
  }
}
