import type { FastifyReply, FastifyRequest } from 'fastify'

import type { IHttp } from '@telepetros/core/interfaces'
import type { ChatterDto } from '@telepetros/core/dtos'

import { HTTP_STATUS_CODE } from '@/constants'

export class FastifyHttp<Body = void, Params = void> implements IHttp<Body, Params> {
  constructor(
    private readonly request: FastifyRequest,
    private readonly reply: FastifyReply,
  ) {}

  send(response: unknown, statusCode = HTTP_STATUS_CODE.ok) {
    return this.reply.status(statusCode).send(response)
  }

  redirect(route: string) {
    return this.reply.redirect(route)
  }

  setCookie(key: string, value: string, duration: number): void {
    throw Error('Method not implemented')
  }

  async signJwt(chatterDto: ChatterDto): Promise<string> {
    const jwt = await this.reply.jwtSign(chatterDto, {
      sub: chatterDto.id,
      expiresIn: '30 days',
    })
    return jwt
  }

  async getChatter(): Promise<ChatterDto> {
    await this.request.jwtVerify()
    return this.request.user as ChatterDto
  }

  get body(): Body {
    return this.request.body as Body
  }

  get params(): Params {
    return this.request.query as Params
  }

  getQuery(key: string): string | null {
    const value = (this.request.query as Record<string, string>)[key]
    return value ?? null
  }
}