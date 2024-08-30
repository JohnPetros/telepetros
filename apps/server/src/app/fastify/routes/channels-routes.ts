import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  CreateChannelController,
  GetChannelChatController,
  JoinChannelByNameController,
} from '@/api/controllers/channels'
import { ListChatterChannelsController } from '@/api/controllers/channels'
import { FastifyHttp } from '../fastify-http'
export const ChannelsRoutes = async (app: FastifyInstance) => {
  const getChannelChatController = new GetChannelChatController()
  const createChannelController = new CreateChannelController()
  const listChatterChannelsController = new ListChatterChannelsController()
  const joinChannelByNameController = new JoinChannelByNameController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router
    .get(
      '/:channelId',
      {
        schema: {
          params: z.object({
            channelId: z.string().uuid(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return getChannelChatController.handle(http)
      },
    )
    .get(
      '/join/:channelName',
      {
        schema: {
          params: z.object({
            channelName: z.string(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return joinChannelByNameController.handle(http)
      },
    )
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
            avatar: z.string(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<typeof request.body>(request, response)
        return createChannelController.handle(http)
      },
    )
}
