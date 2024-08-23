import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { FastifyHttp } from '../fastify-http'
import { ListChattersByChatterController } from '@/api/controllers/chatters'

export const ChattersRoutes = async (app: FastifyInstance) => {
  const listChattersByChatterController = new ListChattersByChatterController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router.get(
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
}
