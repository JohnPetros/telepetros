import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  LoginWithGithubController,
  LoginWithGoogleController,
  VerifyJwtController,
} from '@/api/controllers/auth'
import { FastifyHttp } from '../fastify-http'

export const AuthRoutes = async (app: FastifyInstance) => {
  const verifyJwtController = new VerifyJwtController()
  const loginWithGithubController = new LoginWithGithubController()
  const loginWithGoogleController = new LoginWithGoogleController()
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
    .post(
      '/google',
      {
        schema: {
          body: z.object({ googleClientCode: z.string() }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<typeof request.body>(request, response)
        return loginWithGoogleController.handle(http)
      },
    )
}
