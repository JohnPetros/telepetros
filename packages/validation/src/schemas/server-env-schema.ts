import { z } from 'zod'

export const serverEnvSchema = z.object({
  port: z.coerce.number().default(3210),
  mode: z.enum(['dev', 'prod']).default('dev'),
  githubClientId: z.string(),
  githubClientSecret: z.string(),
})
