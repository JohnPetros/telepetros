import type { IApiClient } from '@telepetros/core/interfaces'
import { handleApiError } from './utils/handle-api-error'
import { HttpReponse } from '@telepetros/core/responses'
import { addUrlParams } from './utils'
import { AppError } from '@telepetros/core/errors'

export const NextApiClient = (): IApiClient => {
  let baseUrl: string
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  const params: Record<string, string> = {}

  return {
    async get<ResponseBody>(url: string, body: unknown) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        method: 'GET',
        headers,
        body: JSON.stringify(body),
      })
      const data = await response.json()

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new HttpReponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async post<ResponseBody>(url: string, body: unknown) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })
      const data = await response.json()

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new HttpReponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    setBaseUrl(url: string) {
      baseUrl = url
    },

    setJwt(jwt: string) {
      throw new AppError('Method not implemented')
    },

    setHeader(key: string, value: string) {
      if (!(key in headers)) headers[key] = value
    },

    setParam(key: string, value: string) {
      params[key] = value
    },
  }
}
