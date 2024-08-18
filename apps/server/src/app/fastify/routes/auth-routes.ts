import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { LoginUserWithGithubController } from '@/api/controllers/auth'
import { FastifyHttp } from '../http'

export const AuthRoutes = async (app: FastifyInstance) => {
  const loginUserWithGithubController = new LoginUserWithGithubController()
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
      return loginUserWithGithubController.handle(http)
    },
  )
}
