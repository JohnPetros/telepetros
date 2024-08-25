import { z } from 'zod'

export const webEnvSchema = z.object({
  githubClientId: z.string(),
  googleClientId: z.string(),
  apiUrl: z.string(),
  appUrl: z.string(),
  realTimeUrl: z.string(),
})
