import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { LoginWithGithubController } from '@/api/controllers/auth'
import { FastifyHttp } from '../fastify-http'
import { VerifyJwtController } from '@/api/controllers/auth/verify-jwt-controller'

export const AuthRoutes = async (app: FastifyInstance) => {
  const verifyJwtController = new VerifyJwtController()
  const loginWithGithubController = new LoginWithGithubController()
  const router = app.withTypeProvider<ZodTypeProvider>()

  router
    .get('/jwt', async (request, response) => {
      const http = new FastifyHttp(request, response)
      return verifyJwtController.handle(http)
    })
    .post(
      '/github',
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
