import type { FastifyReply, FastifyRequest } from 'fastify'

import type { IHttp } from '@telepetros/core/interfaces'

import { HTTP_STATUS_CODE } from '@/constants'

export class FastifyHttp<Body = void, Query = void> implements IHttp<Body, Query> {
  constructor(
    private readonly request: FastifyRequest,
    private readonly reply: FastifyReply,
  ) {}

  send(response: unknown, statusCode = HTTP_STATUS_CODE.ok) {
    return this.reply.status(statusCode).send(response)
  }

  get body(): Body {
    return this.request.body as Body
  }

  get query(): Query {
    return this.request.query as Query
  }
}
