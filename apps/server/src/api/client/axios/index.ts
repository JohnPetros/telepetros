import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

import type { IApiClient } from '@telepetros/core/interfaces'
import { HttpReponse } from '@telepetros/core/responses'

import { handleAxiosError } from './utils'

export class AxiosApiClient implements IApiClient {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  async get<ResponseBody>(url: string) {
    try {
      const response = await axios.get(url)
      return new HttpReponse<ResponseBody>({ body: response.data })
    } catch (error) {
      return handleAxiosError<ResponseBody>(error)
    }
  }

  async post<ResponseBody>(
    url: string,
    body: unknown,
  ): Promise<HttpReponse<ResponseBody>> {
    try {
      const response = await axios.post(url, body)
      return this.sendResponse(response)
    } catch (error) {
      return handleAxiosError<ResponseBody>(error)
    }
  }

  setHeader(key: string, value: string): void {
    this.axios.defaults.headers[key] = value
  }

  setParam(key: string, value: string): void {
    this.axios.defaults.params[key] = value
  }

  private sendResponse<ResponseBody>(response: AxiosResponse) {
    this.clearParams()
    return new HttpReponse<ResponseBody>({
      body: response.data,
      statusCode: response.status,
    })
  }

  private clearParams() {
    this.axios.defaults.params = {}
  }
}
