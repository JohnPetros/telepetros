import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { FastifyHttp } from '../fastify-http'
import { UploadImageController } from '@/api/controllers/upload'

export const UploadRoutes = async (app: FastifyInstance) => {
  const uploadImageController = new UploadImageController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router.post(
    '/image/:imageType',
    {
      schema: {
        params: z.object({
          imageType: z.string(),
        }),
      },
    },
    async (request, response) => {
      const http = new FastifyHttp<void, typeof request.params>(request, response)
      return uploadImageController.handle(http)
    },
  )
}
