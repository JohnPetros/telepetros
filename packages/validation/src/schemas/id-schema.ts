import { z } from 'zod'

export const idSchema = z.string().uuid('id is not valid')
