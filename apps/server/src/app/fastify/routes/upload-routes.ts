import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { FastifyHttp } from '../fastify-http'
import { UploadImageController } from '@/api/controllers/upload'

export const UploadRoutes = async (app: FastifyInstance) => {
  const uploadImageController = new UploadImageController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router
    .get(
      '/:folder/:filename',
      {
        schema: {
          params: z.object({
            folder: z.enum(['avatars', 'attachments']),
            filename: z.string(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return getFileController.handle(http)
      },
    )
    .post(
      '/image/:imageType',
      {
        schema: {
          params: z.object({
            imageType: z.enum(['avatars', 'emoticons']),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return uploadImageController.handle(http)
      },
    )
    .post(
      '/:folder',
      {
        schema: {
          params: z.object({
            folder: z.enum(['avatars', 'attachments']),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp(request, response)
        return uploadFileController.handle(http)
      },
    )
}
