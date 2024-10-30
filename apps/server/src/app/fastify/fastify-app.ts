import Fastify, { type FastifyInstance } from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import Cors from '@fastify/cors'
import Jwt from '@fastify/jwt'
import Websocket from '@fastify/websocket'
import Cookies from '@fastify/cookie'
import Multipart from '@fastify/multipart'
import { ZodError } from 'zod'

import type { IServerApp } from '@telepetros/core/interfaces'
import {
  AlreadyExistsError,
  ApiError,
  AppError,
  AuthError,
  NotFoundError,
  ValidationError,
} from '@telepetros/core/errors'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'

import { ENV } from '@/constants'
import {
  AuthRoutes,
  ChannelsRoutes,
  ChatRoutes,
  ChattersRoutes,
  UploadRoutes,
} from './routes'
import { VerifyJwtController } from '@/api/controllers/auth/verify-jwt-controller'
import { FastifyHttp } from './fastify-http'

export class FastifyApp implements IServerApp {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()

    this.app.setSerializerCompiler(serializerCompiler)
    this.app.setValidatorCompiler(validatorCompiler)
    this.app.register(Cors, { origin: '*' })
    this.app.register(Cookies)
    this.app.register(Jwt, { secret: ENV.jwtSecret })
    this.app.register(Multipart)
    this.app.register(Websocket)
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
    this.app.register(ChatRoutes, { prefix: '/chat' })
    this.app.register(UploadRoutes, { prefix: '/upload' })
  }

  private setJwtPreHandler() {
    this.app.addHook('preHandler', async (request, response) => {
      const http = new FastifyHttp(request, response)
      new VerifyJwtController(true).handle(http)
    })
  }

  private setErrorHandler() {
    this.app.setErrorHandler((error, _, reply) => {
      if (error instanceof AppError) {
        console.error('Error title:', error.title)
        console.error('Error message:', error.message)

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

        if (error instanceof ValidationError)
          return reply.status(HTTP_STATUS_CODE.badRequest).send(response)

        if (error instanceof ApiError)
          return reply.status(error.statusCode).send(response)

        return
      }

      console.error(error)

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
