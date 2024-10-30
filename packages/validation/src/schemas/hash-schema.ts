import z from 'zod'

export const hashSchema = z.string().min(16)
