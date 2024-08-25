import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyWs } from '../fastify-ws'
import z from 'zod'

import { ChatSocket } from '@/realtime/sockets'
import type { Server } from 'socket.io'

declare module 'fastify' {
  interface FastifyInstance {
    io: Server
  }
}

export const ChatRoutes = async (app: FastifyInstance) => {
  const router = app.withTypeProvider<ZodTypeProvider>()

  router.get(
    '/:chatId',
    {
      schema: {
        params: z.object({
          chatId: z.string().uuid(),
        }),
      },
      websocket: true,
    },
    (socket, request) => {
      const chatSocket = new ChatSocket(request.params.chatId)
      const ws = new FastifyWs(socket, app)
      return chatSocket.handle(ws)
    },
  )
}
