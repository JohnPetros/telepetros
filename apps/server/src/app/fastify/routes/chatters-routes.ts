import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { jwtDecode } from 'jwt-decode'

import { ChatterNotFoundError, JwtNotFoundError } from '@telepetros/core/errors'
import type { ChatterDto } from '@telepetros/core/dtos'
import { Chatter } from '@telepetros/core/entities'

import { ListChattersByChatterController } from '@/api/controllers/chatters'
import { ChatterSocket } from '@/realtime/sockets'
import { FastifyHttp } from '../fastify-http'
import { FastifyWs } from '../fastify-ws'

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
    .get('/connection', { websocket: true }, async (socket) => {
      const ws = new FastifyWs({ server: app, socket })
      const chatterSocket = new ChatterSocket('')
      return chatterSocket.handle(ws)
    })
}
