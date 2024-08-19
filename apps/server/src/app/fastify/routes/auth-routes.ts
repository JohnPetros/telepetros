import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { LoginWithGithubController } from '@/api/controllers/auth'
import { FastifyHttp } from '../fastify-http'

export const AuthRoutes = async (app: FastifyInstance) => {
  const loginWithGithubController = new LoginWithGithubController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router.post(
    '/register',
    {
      schema: {
        body: z.object({ githubClientCode: z.string() }),
      },
    },
    async (request, response) => {
      const http = new FastifyHttp<typeof request.body>(request, response)
      return loginWithGithubController.handle(http)
    },
  )
}
