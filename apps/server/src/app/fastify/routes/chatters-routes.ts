import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  ListChattersByChatterController,
  ListChattersByNameController,
} from '@/api/controllers/chatters'
import { ChatterSocket } from '@/realtime/sockets'
import { FastifyHttp } from '../fastify-http'
import { FastifyWs } from '../fastify-ws'

export const ChattersRoutes = async (app: FastifyInstance) => {
  const listChattersByChatterController = new ListChattersByChatterController()
  const listChattersByNameController = new ListChattersByNameController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router
    .get(
      '/chatter/:id',
      {
        schema: {
          params: z.object({
            id: z.string().uuid(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return listChattersByChatterController.handle(http)
      },
    )
    .get(
      '/name/:name',
      {
        schema: {
          params: z.object({
            name: z.string(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return listChattersByNameController.handle(http)
      },
    )
    .get('/connection', { websocket: true }, async (socket) => {
      const ws = new FastifyWs({ server: app, socket })
      const chatterSocket = new ChatterSocket('')
      return chatterSocket.handle(ws)
    })
}
