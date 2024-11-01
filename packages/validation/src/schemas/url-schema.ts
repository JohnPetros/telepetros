import { stringSchema } from './string-schema'

export const urlSchema = stringSchema.url('Invalid url')
