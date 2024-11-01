import type { FastifyReply, FastifyRequest } from 'fastify'

import type { IHttp } from '@telepetros/core/interfaces'
import type { ChatterDto } from '@telepetros/core/dtos'
import { HTTP_STATUS_CODE, MAX_FILE_SIZE } from '@telepetros/core/constants'
import { FileMaxSizeError, ImageFileInvalidFormatError } from '@telepetros/core/errors'

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
    this.reply.setCookie(key, value, {
      path: '/',
      expires: new Date(Date.now() + duration),
    })
  }

  getCookie(key: string): string | null {
    return this.request.cookies[key] ?? null
  }

  hasCookie(key: string): boolean {
    throw new Error('Method not implemented.')
  }

  next(): unknown {
    throw new Error('Method not implemented.')
  }

  async signJwt(chatterDto: ChatterDto): Promise<string> {
    const jwt = await this.reply.jwtSign(chatterDto, {
      sub: chatterDto.id,
      expiresIn: '30 days',
    })
    return jwt
  }

  async verifyJwt(): Promise<boolean> {
    try {
      await this.request.jwtVerify()
      return true
    } catch (error) {
      return false
    }
  }

  async destroyJwt(): Promise<void> {
    this.reply.clearCookie('access_token')
  }

  async getChatter(): Promise<ChatterDto> {
    await this.verifyJwt()
    return this.request.user as ChatterDto
  }

  getQuery(key: string): string | null {
    const value = (this.request.query as Record<string, string>)[key]
    return value ?? null
  }

  async getImageFile(): Promise<Buffer> {
    const file = await this.request.file({ limits: { fileSize: MAX_FILE_SIZE } })

    if (!file) {
      throw new FileMaxSizeError()
    }

    const imageMimeTypeRegex = /^(image)\/[a-zA-Z]+/
    const isValidMimeType = imageMimeTypeRegex.test(file.mimetype)

    if (!isValidMimeType) {
      throw new ImageFileInvalidFormatError()
    }

    return file.toBuffer()
  }

  async getFile(): Promise<{ extension: string; buffer: Buffer }> {
    const file = await this.request.file({ limits: { fileSize: MAX_FILE_SIZE } })

    if (!file) {
      throw new FileMaxSizeError()
    }

    const buffer = await file.toBuffer()

    return {
      buffer: buffer,
      extension: String(file.filename.split('.').pop()),
    }
  }

  get body(): Body {
    return this.request.body as Body
  }

  get params(): Params {
    return this.request.params as Params
  }
}
