import { z } from 'zod'

export const webEnvSchema = z.object({
  githubClientId: z.string(),
  serverUrl: z.string(),
})
