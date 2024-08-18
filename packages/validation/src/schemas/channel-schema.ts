import { z } from 'zod'

export const channelSchema = z.object({
  ownerId: z.string().uuid(),
  name: z.string(),
  hash: z.string(),
  isPublic: z.boolean().default(false),
})
