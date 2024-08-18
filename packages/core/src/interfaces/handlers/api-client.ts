import type { HttpReponse } from '../../responses'

export type Request = {
  headers: unknown
  body: unknown
  params: unknown
}

export interface IApiClient {
  get<ResponseBody>(url: string, request?: Request): Promise<HttpReponse<ResponseBody>>
  post<ResponseBody>(url: string, request?: Request): Promise<HttpReponse<ResponseBody>>
  setHeader(key: string, value: string): void
  setParam(key: string, value: string): void
}
