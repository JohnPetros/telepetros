import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  DeleteAccountController,
  LoginWithGithubController,
  LoginWithGoogleController,
  LogoutController,
  VerifyJwtController,
} from '@/api/controllers/auth'
import { FastifyHttp } from '../fastify-http'
import { stringSchema } from '@telepetros/validation/schemas'

export const AuthRoutes = async (app: FastifyInstance) => {
  const verifyJwtController = new VerifyJwtController()
  const loginWithGithubController = new LoginWithGithubController()
  const loginWithGoogleController = new LoginWithGoogleController()
  const logoutController = new LogoutController()
  const deleteAccountController = new DeleteAccountController()
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
          body: z.object({ githubClientCode: stringSchema }),
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
          body: z.object({ googleClientCode: stringSchema }),
        },
      },
      async (request, response) => {
        const http = new FastifyHttp<typeof request.body>(request, response)
        return loginWithGoogleController.handle(http)
      },
    )
    .delete('/logout', async (request, response) => {
      const http = new FastifyHttp(request, response)
      return logoutController.handle(http)
    })
    .delete('/account', async (request, response) => {
      const http = new FastifyHttp(request, response)
      return deleteAccountController.handle(http)
    })
}
