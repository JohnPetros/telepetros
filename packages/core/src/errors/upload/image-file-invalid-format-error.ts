import { ValidationError } from '../global/validation-error'

export class ImageFileInvalidFormatError extends ValidationError {
  constructor() {
    super('Image file invalid format error')
  }
}
