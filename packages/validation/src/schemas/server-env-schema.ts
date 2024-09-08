import { z } from 'zod'

export const serverEnvSchema = z.object({
  port: z.coerce.number().default(3210),
  mode: z.enum(['dev', 'prod']).default('dev'),
  googleClientId: z.string(),
  googleClientSecret: z.string(),
  githubClientId: z.string(),
  githubClientSecret: z.string(),
  jwtSecret: z.string(),
  webUrl: z.string(),
  supabaseUrl: z.string(),
  supabaseAnonKey: z.string(),
  cloudinaryApiKey: z.string(),
  cloudinaryApiSecret: z.string(),
  cloudinaryCloundName: z.string(),
})
