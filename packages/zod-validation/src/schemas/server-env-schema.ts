import { z } from 'zod'

export const serverEnvSchema = z.object({
  port: z.coerce.number().default(3333),
  mode: z.enum(['dev', 'prod']).default('dev'),
})
