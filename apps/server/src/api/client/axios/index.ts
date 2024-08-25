import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

import type { IApiClient } from '@telepetros/core/interfaces'
import { ApiResponse } from '@telepetros/core/responses'

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
      const response = await this.axios.get(url)
      return this.sendResponse<ResponseBody>(response)
    } catch (error) {
      return handleAxiosError<ResponseBody>(error)
    }
  }

  async post<ResponseBody>(
    url: string,
    body: unknown,
  ): Promise<ApiResponse<ResponseBody>> {
    try {
      const response = await this.axios.post(url, body)
      return this.sendResponse(response)
    } catch (error) {
      return handleAxiosError<ResponseBody>(error)
    }
  }

  setHeader(key: string, value: string): void {
    this.axios.defaults.headers[key] = value
  }

  setParam(key: string, value: string): void {
    this.axios.defaults.params = {
      [key]: value,
      ...this.axios.defaults.params,
    }
  }

  setBaseUrl(url: string): void {
    this.axios.defaults.baseURL = url
  }

  setJwt(jwt: string): void {
    this.setHeader('Authorization', `Bearer ${jwt}`)
  }

  private sendResponse<ResponseBody>(response: AxiosResponse) {
    this.clearParams()
    return new ApiResponse<ResponseBody>({
      body: response.data,
      statusCode: response.status,
    })
  }

  private clearParams() {
    this.axios.defaults.params = {}
  }
}
