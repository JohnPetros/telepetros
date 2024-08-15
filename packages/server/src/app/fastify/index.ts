import Fastify, { type FastifyInstance } from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import type { ServerApp } from '@telepetros/core/interfaces'

import { ENV } from '@/constants'
import { ChannelsRoutes } from './routes'

export class FastifyApp implements ServerApp {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()

    this.app.setSerializerCompiler(serializerCompiler)
    this.app.setValidatorCompiler(validatorCompiler)

    this.app.register(ChannelsRoutes)
  }

  startServer() {
    this.app.listen({ port: ENV.port }).then(() => {
      console.log(`Server running on port: ${ENV.port}`)
    })
  }

  stopServer() {}
}
