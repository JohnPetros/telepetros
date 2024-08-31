import { cookies } from 'next/headers'
import type { ZodSchema } from 'zod'

import type { IHttp } from '@telepetros/core/interfaces'
import type { ChatterDto } from '@telepetros/core/dtos'
import { HTTP_STATUS_CODE } from '@telepetros/core/constants'
import { type NextRequest, NextResponse } from 'next/server'

type Cookie = {
  key: string
  value: string
  duration: number
}

type NextHttpProps<Params> = {
  request: NextRequest
  bodySchema?: ZodSchema
  params?: Params
}

export const NextHttp = <Body = void, Params = void>({
  request,
  bodySchema,
  params,
}: NextHttpProps<Params>): IHttp<Body, Params> => {
  let cookie: Cookie | null

  return {
    send(data: unknown, statusCode = HTTP_STATUS_CODE.ok) {
      const response = NextResponse.json(data, { status: statusCode })

      if (cookie) {
        response.cookies.set(cookie.key, cookie.value, {
          path: '/',
          httpOnly: true,
          maxAge: cookie.duration,
        })
      }
      return response
    },

    next() {
      return
    },

    redirect(route) {
      const url = new URL(route, request.url)
      const response = NextResponse.redirect(url)

      if (cookie) {
        response.cookies.set(cookie.key, cookie.value, {
          path: '/',
          httpOnly: false,
          maxAge: cookie.duration,
        })
      }

      return response
    },

    setCookie(key: string, value: string, duration: number) {
      cookie = {
        key,
        value,
        duration,
      }
    },

    getCookie(key) {
      return cookies().get(key)?.value ?? null
    },

    hasCookie(key: string) {
      return cookies().has(key)
    },

    async signJwt(chatterDto: ChatterDto): Promise<string> {
      throw new Error('Method not implemented')
    },

    async getChatter(): Promise<ChatterDto> {
      throw new Error('Method not implemented')
    },

    getQuery(key: string): string | null {
      return new URL(request.url).searchParams.get(key)
    },

    verifyJwt() {
      throw new Error('Method not implemented')
    },

    async getImageFile() {
      throw new Error('Method not implemented')
    },

    get body(): Body {
      const body = bodySchema?.parse(request.body)
      return body as Body
    },

    get params() {
      if (!params) throw new Error('Next request params are void')
      return params
    },
  }
}
