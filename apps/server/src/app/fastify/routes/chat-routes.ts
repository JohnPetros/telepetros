import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ChatSocket } from '@/realtime/sockets'
import { FastifyWs } from '../fastify-ws'

export const ChatRoutes = async (app: FastifyInstance) => {
  const router = app.withTypeProvider<ZodTypeProvider>()

  router.get(
    '/:chatId',
    {
      websocket: true,
    },
    async (socket) => {
      const chatSocket = new ChatSocket()
      const ws = new FastifyWs({ server: app, socket })
      return chatSocket.handle(ws)
    },
  )
}
