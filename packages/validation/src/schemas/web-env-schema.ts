import { z } from 'zod'

export const webEnvSchema = z.object({
  githubClientId: z.string(),
  apiUrl: z.string(),
  realTimeUrl: z.string(),
})
