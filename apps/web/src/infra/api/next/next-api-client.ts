import type { IApiClient } from '@telepetros/core/interfaces'
import { handleApiError } from './utils/handle-api-error'
import { addUrlParams } from './utils'
import { AppError } from '@telepetros/core/errors'
import { ApiResponse } from '@telepetros/core/responses'

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

      return new ApiResponse<ResponseBody>({
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

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async put<ResponseBody>(url: string, body: unknown) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      })
      const data = await response.json()

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async sendFile<ResponseBody>(url: string, body: FormData) {
      const response = await fetch(`${baseUrl}${addUrlParams(url, params)}`, {
        method: 'POST',
        body: body,
      })
      const data = await response.json()

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async loadFile(url: string, filename: string) {
      const response = await fetch(url)
      const data = await response.blob()
      const file = new File([data], filename, { type: data.type })

      if (!response.ok) {
        return handleApiError(data, response.status)
      }

      return new ApiResponse({
        body: file,
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
      headers[key] = value
    },

    setParam(key: string, value: string) {
      params[key] = value
    },
  }
}
