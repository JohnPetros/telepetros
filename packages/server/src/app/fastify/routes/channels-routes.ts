import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { CreateChannelController } from '@/api/controllers/channels'
import { FastifyHttp } from '../http'

export const ChannelsRoutes = async (app: FastifyInstance) => {
  const createChannelController = new CreateChannelController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router
    .get('/', async (request, response) => {
      const http = new FastifyHttp<typeof request.body>(request, response)
      return http.send({ message: 'Telepetros' })
    })
    .post(
      '/channel',
      { schema: { body: z.object({ name: z.string() }) } },
      async (request, response) => {
        const http = new FastifyHttp<typeof request.body>(request, response)
        return createChannelController.handle(http)
      },
    )
}
