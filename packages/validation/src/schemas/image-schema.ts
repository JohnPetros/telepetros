import { z } from 'zod'

export const imageSchema = z.instanceof(File, { message: 'Imagem inválida' })
