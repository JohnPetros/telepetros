import { z } from 'zod'
import { stringSchema } from './string-schema'
import { urlSchema } from './url-schema'

export const serverEnvSchema = z.object({
  port: z.coerce.number().default(3210),
  mode: z.enum(['dev', 'prod']).default('dev'),
  googleClientId: stringSchema,
  googleClientSecret: stringSchema,
  githubClientId: stringSchema,
  githubClientSecret: stringSchema,
  jwtSecret: stringSchema,
  webUrl: stringSchema,
  supabaseUrl: urlSchema,
  supabaseAnonKey: stringSchema,
  cloudinaryApiKey: stringSchema,
  cloudinaryApiSecret: stringSchema,
  cloudinaryCloundName: stringSchema,
})
