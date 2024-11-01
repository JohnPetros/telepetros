import { z } from 'zod'
import { stringSchema } from './string-schema'
import { urlSchema } from './url-schema'

export const webEnvSchema = z.object({
  githubClientId: stringSchema,
  googleClientId: stringSchema,
  apiUrl: urlSchema,
  appUrl: urlSchema,
  realTimeUrl: urlSchema,
})
