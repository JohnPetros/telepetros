import type { IApiClient } from '@telepetros/core/interfaces'
import { handleNextApiError } from './utils/handle-next-api-error'
import { HttpReponse } from '@telepetros/core/responses'
import { addUrlParams } from './utils'

export const NextApiClient = (): IApiClient => {
  let baseUrl: string
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  const params: Record<string, string> = {}

  return {
    async get<ResponseBody>(url: string, body: unknown) {
      let statusCode = 500
      try {
        const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
          method: 'GET',
          headers,
          body: JSON.stringify(body),
        })
        statusCode = response.status
        const data = await response.json()

        return new HttpReponse<ResponseBody>({ body: data, statusCode })
      } catch (error) {
        return handleNextApiError<ResponseBody>(error, statusCode)
      }
    },

    async post<ResponseBody>(url: string, body: unknown) {
      let statusCode = 500
      try {
        const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        })
        statusCode = response.status
        const data = await response.json()

        return new HttpReponse<ResponseBody>({ body: data, statusCode })
      } catch (error) {
        return handleNextApiError<ResponseBody>(error, statusCode)
      }
    },

    setBaseUrl(url: string) {
      baseUrl = url
    },

    setHeader(key: string, value: string) {
      headers[key] = value
    },

    setParam(key: string, value: string) {
      params[key] = value
    },
  }
}
