import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { channelSchema } from '@telepetros/validation/schemas'

import { FastifyHttp } from '../fastify-http'
import { CreateChannelController } from '@/api/controllers/channels'
import { ListChatterChannelsController } from '@/api/controllers/channels'

export const ChannelsRoutes = async (app: FastifyInstance) => {
  const createChannelController = new CreateChannelController()
  const listChatterChannelsController = new ListChatterChannelsController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router
    .get(
      '/chatter/:chatterId',
      {
        schema: {
          params: z.object({
            chatterId: z.string().uuid(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return listChatterChannelsController.handle(http)
      },
    )
    .post(
      '/',
      {
        schema: {
          body: z.object({
            ownerId: z.string().uuid(),
            name: z.string(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<typeof request.body>(request, response)
        return createChannelController.handle(http)
      },
    )
}
