import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  GetChatterChatController,
  JoinChatterChatController,
  ListChattersByChatterController,
  ListChattersByNameController,
} from '@/api/controllers/chatters'
import { ChatterSocket } from '@/realtime/sockets'
import { FastifyHttp } from '../fastify-http'
import { FastifyWs } from '../fastify-ws'
import { GetChatterChatUseCase } from '@telepetros/core/use-cases'

export const ChattersRoutes = async (app: FastifyInstance) => {
  const listChattersByChatterController = new ListChattersByChatterController()
  const listChattersByNameController = new ListChattersByNameController()
  const joinChatterChatController = new JoinChatterChatController()
  const getChatterChatUseCase = new GetChatterChatController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router
    .get(
      '/:chatterId/chat',
      {
        schema: {
          params: z.object({
            chatterId: z.string().uuid(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<void, typeof request.params>(request, response)
        return getChatterChatUseCase.handle(http)
      },
    )
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
    .post(
      '/join',
      {
        schema: {
          body: z.object({
            chatterId: z.string(),
          }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<typeof request.body>(request, response)
        return joinChatterChatController.handle(http)
      },
    )
}
