import Fastify, { type FastifyInstance } from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import Cors from '@fastify/cors'
import Jwt from '@fastify/jwt'
import { ZodError } from 'zod'

import type { IServerApp } from '@telepetros/core/interfaces'

import {
  AlreadyExistsError,
  ApiError,
  AppError,
  AuthError,
  NotFoundError,
} from '@telepetros/core/errors'

import { HTTP_STATUS_CODE } from '@telepetros/core/constants'

import { ENV } from '@/constants'
import { AuthRoutes, ChannelsRoutes, ChattersRoutes } from './routes'
import { VerifyJwtController } from '@/api/controllers/auth/verify-jwt-controller'
import { FastifyHttp } from './fastify-http'

export class FastifyApp implements IServerApp {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()

    this.app.register(Cors, { origin: '*' })
    this.app.setSerializerCompiler(serializerCompiler)
    this.app.setValidatorCompiler(validatorCompiler)
    this.app.register(Jwt, { secret: ENV.jwtSecret })
    this.registerRoutes()

    this.setErrorHandler()
  }

  startServer() {
    this.app.listen({ port: ENV.port }).then(() => {
      console.log(`Server running on port: ${ENV.port}`)
    })
  }

  stopServer() {}

  private registerRoutes() {
    this.app.register(AuthRoutes, { prefix: '/auth' })
    this.app.register(ChannelsRoutes, { prefix: '/channels' })
    this.app.register(ChattersRoutes, { prefix: '/chatters' })
  }

  private setJwtPreHandler() {
    this.app.addHook('preHandler', async (request, response) => {
      const http = new FastifyHttp(request, response)
      new VerifyJwtController(true).handle(http)
    })
  }

  private setErrorHandler() {
    this.app.setErrorHandler((error, _, reply) => {
      console.error(`Server error: ${error}`)
      if (error instanceof AppError) {
        const response = {
          title: error.title,
          message: error.message,
        }

        error.statusCode

        if (error instanceof AuthError)
          return reply.status(HTTP_STATUS_CODE.unauthorized).send(response)

        if (error instanceof NotFoundError)
          return reply.status(HTTP_STATUS_CODE.notFound).send(response)

        if (error instanceof AlreadyExistsError)
          return reply.status(HTTP_STATUS_CODE.conflict).send(response)

        if (error instanceof ApiError)
          return reply.status(error.statusCode).send(response)
      }

      if (error instanceof ZodError)
        return reply
          .status(HTTP_STATUS_CODE.badRequest)
          .send({ title: 'Validation Error', message: error.issues })

      return reply.status(HTTP_STATUS_CODE.serverError).send({
        title: 'Server Error',
        message: error.message,
      })
    })
  }
}
