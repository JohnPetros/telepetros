import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { FastifyHttp } from '../fastify-http'
import { ListChattersByChatterController } from '@/api/controllers/chatters'
import { FastifyWs } from '../fastify-ws'
import { ChatterSocket } from '@/realtime/sockets'

export const ChattersRoutes = async (app: FastifyInstance) => {
  const listChattersByChatterController = new ListChattersByChatterController()
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
        return listChattersByChatterController.handle(http)
      },
    )
    .get(
      '/:channelId/connect',
      {
        schema: {
          params: z.object({
            channelId: z.string().uuid(),
          }),
        },
        websocket: true,
      },
      async (socket, request) => {
        const ws = new FastifyWs({ server: app, socket })
        const chatterSocket = new ChatterSocket(request.params.channelId)
        return chatterSocket.handle(ws)
      },
    )
}
